import React from 'react';

const Login = () => {
  const clientId = process.env.QUICKBOOKS_CLIENT_ID;
  const redirectUri = '/'; // Make sure to define in .env.local
  const scope = 'com.intuit.quickbooks.accounting'; // Adjust the scope as needed

  const redirectToQuickBooks = () => {
    const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Login with QuickBooks</h1>
      <button onClick={redirectToQuickBooks}>Login</button>
    </div>
  );
};

export default Login;
