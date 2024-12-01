import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = () => {
  const router = useRouter();
  
  useEffect(() => {
    const { code, error } = router.query;

    if (error) {
      // Handle error (e.g., user denied access)
      console.error('OAuth error:', error);
    }

    if (code) {
      // Now you can exchange the authorization code for an access token
      fetchAccessToken(code);
    }
  }, [router.query]);

  const fetchAccessToken = async (code) => {
    const response = await fetch('/api/quickbooks', {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (data.access_token) {
      // Store the access token (e.g., in a cookie or session)
      console.log('Access Token:', data.access_token);
    }
  };

  return <div>Redirecting...</div>;
};

export default Callback;
