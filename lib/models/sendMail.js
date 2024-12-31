const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const nodemailer=require("nodemailer")

// Path to your credentials and token
// const filePath = path.resolve(process.cwd(), "lib/json/appointments.json");
// const credentialsPath = path.resolve(process.cwd(), "../../lib/json/credentials.json");
// const tokenPath =  path.resolve(process.cwd(), "../../lib/json/token.json");

// console.log('Before credentialsPath');
// console.log(credentialsPath);
// console.log('After credentialsPath');

// const credentialsData = fs.readFileSync(credentialsPath, 'utf8');

// // Parse the JSON data into a JavaScript object
// const credentials = JSON.parse(credentialsData);

// const tokenData = fs.readFileSync(tokenPath, 'utf8');

// // Parse the JSON data into a JavaScript object
// const token = JSON.parse(tokenData);
// const oAuth2Client = new google.auth.OAuth2(
//   credentials.web.client_id,
//   credentials.web.client_secret,
//   credentials.web.redirect_uris[0]
// );

// oAuth2Client.setCredentials(token);

async function sendMail() {
  try {
    const credentials = {
        client_email: '193623159823-compute@developer.gserviceaccount.com',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCsCI32YEUbb4q0\nHlaVeFQFbmVDGGVwG2flOiYKWflmhNaimDPq3HhKq+3czxzbtc5p/wXBIHqTUAxa\nTQqBvuoydS9dhQS2bOsDCkwYTvjIcPRYyuQg3D+QUwXBCpI5a41YauONKgr1Xl0Q\nx9HRgo6sqTSTZUIss9++jGFOpFCyvoHG3KqH4mTlI43oOLDHaEgil98B4rtrIDMv\nRii6NIq3GHYUqy8Tx6IQjBIzBgTbxrAVF2GWoqzG1+tjALWNDK4T0hWZ8WCAJ6ly\nL0KTNlbfWZUeY3YMJ2Y/5gkMXB9eZibmfRXnsa4HU/7RaXXzEsdU3RHpHr/EJB64\njhTTcFmPAgMBAAECggEABOGTQZfWriIakeTAeSo6XBMXTXGOQ0GLz524QZfu8yE2\nw9NEude6lAfPznGT9InyiuBhBetJfw+I4jEIaMkFdRwNFX62NQTfIC11HkVzWqCV\n1kUfdu044nvwkFsf7gAmuQkDXtiAChk808KPqf2l1bFRXBNF7uXFpe7uvd/8qC2i\nsCSlM0b+G4qjrQjD/jAZlg9VP6G+VzNJKczM7OX9EPL6rByjIEHALRFYk1cHDgl8\nev1KiWGQuADzWIiU86jwUC+cELdQd+l5sz+eeOplBS+XSYSlBO2EhX+WRCthOyRY\n+ykdkWFbIGYnafo7TO6JEhKKtSIMvQq/JJ3CoN6zeQKBgQDXz1HBw0D81m5mnkaa\n6TJYHnZn/R6LtAb8ZKyRre9l3Lt/8sUsAz5qLLaG9fQMJJslgn7Q4SchYcNvCJoH\n/Fohv6gtZqga2xlVIFhRMdmseYDwVzkOn8ScW9S6rvIyXmcPoxpeaQW9/17aVam4\nxee51wuZFE2W5zWzva7elWN4GQKBgQDMEjR5IJGFchKImUCfi7uUKtPYODAORNBV\n9lDMtl/+qGHVAokerqsp31tXPfNsSCHm4noRRTKQneo9yJ30gGYBrS3Ly5E/sZeA\n5PdnJ0hvzryP+X5yfvdpcyl/9cvBSUuwJW3Ekv0YDvCxpbf9uMohtt4ZZqT8G2+q\ndyI5ZBIz5wJ/N6M7cLjmCElALTSg/08fq5gu7qBTP7EqG+fYlbZCAgDmVhZAvxgW\n/0iHxkOip37IgOMjzrY9YF3UBMwy6dwlYI4Izaupq0LRRSERo902QUER/OR/0UVf\navBB598ykcnEyENEiRKKaHFuAtwS5ZAgLclDNDQHzN/O+IfujXP2MQKBgEJj1dBm\nSRF5+A+alAyTwBXHDR51wSSTPJgKx2SiHH7Ttug+p+9kcejwcl3imLPsj6L2oTHH\nKlkkFtW80658qzL2bUS02G85Tomvc9GKVSWSw4OvbnS/W6xhu+mWRJCAUPBgbOKb\n010lVybkPAR+PrxTKtRmsVwXbO+vTGIRbV6XAoGALGok2AkpYNj02EXEdLD8MbE2\ni0bz1Q+ShIraPgp30tIEUWT3COOnlaC+A9DqbRUt18N3FYuzEIl0W0fSr0X2yx/r\n6Q84FV0PCN6eUlikVrpwP/cFbza6LZR9WiVuXhn2YJ6DNY4sPA6QtJoOoRHz4azf\nFu5mRr3NWv0QkLbG448=\n-----END PRIVATE KEY-----\n'
      };

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     type: 'OAuth2',
    //     user: 'kairosintegrativehealth@gmail.com', // Your Gmail address
    //     clientId: credentials.web.client_id,
    //     clientSecret: credentials.web.client_secret,
    //     refreshToken: token.refresh_token,
    //     accessToken: accessToken.token,
    //     streamTransport: true,
    //     newline: "unix",
    //     buffer: true
    //   },
    // });

    const mailTransport = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true
      });

      const mailOptions = {
        from: 'kairosintegrativehealth@gmail.com',
      to: 'rohan.agarwal7568@gmail.com',
        subject: 'Test Email via Gmail API',
        text: 'Hello! This is a test email sent via Gmail API with a service account.',
        html: '<p> Hello. This is using <strong>Gmail API</strong></p>'
      };

    // const mailOptions = {
    //   from: 'info@kairosintegrativehealth.com',
    //   to: 'rohan.agarwal7568@gmail.com',
    //   subject: 'Test Email',
    //   text: 'Hello! This is a test email sent using OAuth2.',
    // };

    // const result = await transporter.sendMail(mailOptions);

    async function sendMimeMessage(mimeMessage) {
        const gmail = google.gmail({ version: 'v1' });
        const jwtClient = new google.auth.JWT(
          credentials.client_email,
          null,
          credentials.private_key,
          ['https://www.googleapis.com/auth/gmail.send'],
          // Specify the email address of the user the service account is impersonating.
          // Ensure the service account has domain-wide authority to impersonate this user.
          'kairosintegrativehealth@gmail.com'
        );
        // Authorize the JWT client and get a token to make API calls
        await jwtClient.authorize();
        // Send the email using the Gmail API
        const response = await gmail.users.messages.send({
          auth: jwtClient,
          userId: 'me',
          resource: { raw: mimeMessage }
        });
        console.log('Email sent:', response.data);
      }
      // Generate MIME message and send email
      mailTransport.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.error('Failed to send mail:', err);
        }
        const mimeMessage = info.message.toString('base64');
        sendMimeMessage(mimeMessage)
          .then(() => console.log('Email sent successfully.'))
          .catch(error => console.error('Error sending email:', error));
      });
    
    // console.log('Email sent:', result.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendMail();
