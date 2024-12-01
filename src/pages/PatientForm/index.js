import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleCreatePatient = async () => {
    try {
      const res = await fetch('/api/createPatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
      console.error('Error creating patient:', err);
    }
  };

  return (
    <div>
      <h1>Patient Creation</h1>
      <button onClick={handleCreatePatient}>Create Patient</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
