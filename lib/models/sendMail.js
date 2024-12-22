const {google} = require('googleapis');
const path = require('path');
const fs = require('fs');

// Path to your service account JSON key file
const keyPath = path.resolve(__dirname, '../json/token.json');
const scopes = ['https://www.googleapis.com/auth/gmail.send'];

const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: scopes,
});

// Impersonate a specific user
async function sendEmail() {
  try {
    // Initialize the auth client
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: scopes,
    });

    // Get the authenticated client
    const client = await auth.getClient();

    // Get the Gmail API client
    const gmail = google.gmail({ version: 'v1', auth: client });

    const messageParts = [
      'From: "info@kairosintegrativehealth.com"',
      'To: "info@kairosintegrativehealth.com"',
      'Subject: Test Email',
      'Content-Type: text/plain; charset="UTF-8"',
      '',
      'This is a test email sent using a service account.',
    ];
    
    // Encode the message to base64url format
    const message = messageParts.join('\r\n');
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, ''); // Remove any trailing '='

    // Send the email
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('Email sent:', res.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendEmail();