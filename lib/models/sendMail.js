const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const nodemailer=require("nodemailer")

// Path to your credentials and token
const credentialsPath = path.resolve(__dirname, '../json/credentials.json');
const tokenPath = path.resolve(__dirname, '../json/token.json');

// OAuth2 client setup
const credentials = JSON.parse(fs.readFileSync(credentialsPath));
const oauth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Function to get a new token if needed
async function getNewToken() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/gmail.send',
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  // After user authorizes, you will receive a code
  const { tokens } = await oauth2Client.getToken('code_from_user');
  oauth2Client.setCredentials(tokens);
  fs.writeFileSync(tokenPath, JSON.stringify(tokens));
  console.log('Token stored to', tokenPath);
}

// Check if token file exists
if (fs.existsSync(tokenPath)) {
  const token = JSON.parse(fs.readFileSync(tokenPath));
  oauth2Client.setCredentials(token);
} else {
  console.log('Token does not exist. Getting new token...');
   getNewToken();
}

// Use oauth2Client to send email or refresh token if expired
async function sendMail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'your-email@gmail.com',
        clientId: credentials.web.client_id,
        clientSecret: credentials.web.client_secret,
        refreshToken: oauth2Client.credentials.refresh_token,
        accessToken: oauth2Client.credentials.access_token,
      },
      tls: {
        rejectUnauthorized: false,  // Disable SSL certificate verification (use only for testing)
      },
    });

    const mailOptions = {
      from: 'info@yourdomain.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'This is a test email using OAuth2 and Nodemailer.',
    };

    const info = transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

sendMail();
