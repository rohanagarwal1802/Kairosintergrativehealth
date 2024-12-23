const { google } = require('googleapis');
const path = require('path');
const nodemailer = require('nodemailer');

const keyPath = path.resolve(__dirname, '../json/token.json');

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

async function sendMail() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/gmail.send'],
    });

    const client = await auth.getClient();
    const gmail = google.gmail({ version: 'v1', auth: client });

    // Nodemailer transport using the service account
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'kairosintegrativehealth@gmail.com',  // Impersonated user
        serviceClient: client.credentials.client_id,
        privateKey: client.credentials.private_key,
      },
    });

    const mailOptions = {
      from: 'kairosintegrativehealth@gmail.com',
      to: 'rohan.agarwal7568@gmail.com',
      subject: 'Service Account Email - No Token Refresh',
      text: 'Hello! This email is sent using a Google Service Account.',
      html: '<h1>Hello from a service account email</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    console.log('Email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log('Error:', error.message));
