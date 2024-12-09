const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const credentials = require('./emailKeys.json');

// OAuth2 Scopes
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// File to store tokens
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Create an OAuth2 client instance
const createOAuthClient = () => {
  return new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    'http://localhost:3000/'  // Redirect URI
  );
};

// Refresh the access token using the refresh_token
async function refreshAccessToken(oAuth2Client) {
  try {
    const tokens = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    saveTokens(tokens);
  } catch (error) {
    console.error("Error while exchanging code for tokens:", error);
  }
  
}

// Check if the token exists and load it, otherwise start the OAuth flow
const getOAuth2ClientWithToken = async () => {
  const oAuth2Client = createOAuthClient();

  // Check if token file exists and set credentials if so
  if (fs.existsSync(TOKEN_PATH)) {
    const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(tokens);
    console.log("Tokens loaded from file.");
  } else {
    console.log("Token file not found. Starting OAuth flow...");
    await startOAuthFlow(oAuth2Client);
  }

  return oAuth2Client;
};

// Start the OAuth flow if no token is found
const startOAuthFlow = async (oAuth2Client) => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      redirect_uri: 'http://localhost:3000/', 
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    const code = await getCodeFromUser();

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    saveTokens(tokens);
    console.log("Tokens saved successfully.");
  } catch (error) {
    console.error('Error during OAuth flow:', error);
    throw error;
  }
};

// Function to prompt user for code (for first-time OAuth flow)
const getCodeFromUser = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter the code from the URL here: ', (code) => {
      rl.close();
      resolve(code);
    });
  });
};

// Save the tokens to the file
const saveTokens = (tokens) => {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
};

// Create a Nodemailer transporter using OAuth2 credentials
const createTransporter = (oAuth2Client) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'kairosintegrativehealth@gmail.com',
      clientId: credentials.client_id,
      clientSecret: credentials.client_secret,
      refreshToken: oAuth2Client.credentials.refresh_token,
      accessToken: oAuth2Client.credentials.access_token,
    },
  });
};

// Send an email using Nodemailer
const sendEmail = async () => {
  const oAuth2Client = await getOAuth2ClientWithToken();

  try {
    const userInfo = await oAuth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });

    // If user info is fetched successfully, proceed
    await sendEmailWithToken(oAuth2Client);
  } catch (error) {
    if (error.code === 401) {
      console.log('Token expired, refreshing...');
      const newAccessToken = await refreshAccessToken(oAuth2Client);
      if (newAccessToken) {
        await sendEmailWithToken(oAuth2Client); // Retry sending email
      } else {
        console.error('Failed to refresh token');
      }
    } else {
      console.error('Error fetching user info:', error);
    }
  }
};


// Send email after obtaining valid access token
async function sendEmailWithToken(oAuth2Client) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'kairosintegrativehealth@gmail.com',
      clientId: credentials.client_id,
      clientSecret: credentials.client_secret,
      refreshToken: oAuth2Client.credentials.refresh_token,
      accessToken: oAuth2Client.credentials.access_token,
    },
  });

  // Email details
  const mailOptions = {
    from: 'kairosintegrativehealth@gmail.com',
    to: 'rohan.agarwal7568@gmail.com',
    subject: 'Test Email with OAuth2',
    text: 'This is a test email using OAuth2.',
    html: '<h1>Hello!</h1><p>This is an email sent using OAuth2.</p>',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Call the function to send the email
sendEmail();
