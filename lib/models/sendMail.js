const axios = require('axios');
const msal = require('@azure/msal-node');
require('dotenv').config();


// Azure AD App Credentials
// const CLIENT_ID = "35c31c72-8ba3-4a51-8509-8cf425d34f1b"; // Replace with your Azure AD Client ID
// const CLIENT_SECRET = "8q_8Q~4jg5Uf4LVrK9G.mTr0S~6yf~OhJA4.Gbq-"; // Replace with your Client Secret
// const TENANT_ID = "077ff1cd-deb5-4ebf-bc0c-6359b35d7ada"; // Replace with your Tenant ID

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID.trim();; // Replace with your Azure AD Client ID
const CLIENT_SECRET =  process.env.NEXT_PUBLIC_CLIENT_SECRET.trim();; // Replace with your Client Secret
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID.trim();; // Replace with your Tenant ID

// MSAL Configuration
const cca = new msal.ConfidentialClientApplication({
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    clientSecret: CLIENT_SECRET,
  },
});

// Function to Get Access Token
async function getAccessToken() {
  const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"], // Use the default Graph API scope
  };

  try {
    const authResponse = await cca.acquireTokenByClientCredential(tokenRequest);
    return authResponse.accessToken;
  } catch (error) {
    console.error("Error acquiring token:", error);
    throw error;
  }
}

// Function to Send Email
async function sendEmail(subject,template,email) {

  const accessToken = await getAccessToken();
  const url = "https://graph.microsoft.com/v1.0/users/info@kairosintegrativehealth.com/sendMail"; // Replace with the sender's email address

  const emailData = {
    message: {
      subject: subject,
      body: {
        contentType: "html",
        content:template,
      },
      toRecipients: [
        {
          emailAddress: {
            address: email, // Replace with recipient's email
          },
        },
      ],
    },
    saveToSentItems: "true",
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error.response ? error.response.data : error.message);
  }
}

module.exports = {
  sendEmail
};
// Call the Function
// sendEmail();