import soap from 'soap';

export default async function handler(req, res) {
  const WSDL_URL = 'https://webservice.kareo.com/services/soap/2.1/KareoServices.svc?singleWsdl';

  try {
    console.log('Initializing SOAP client...');
    
    // Define the options before usage
    const options = {
      wsdl_headers: {
        customerKey: process.env.KAREO_CUSTOMER_KEY,
      },
      wsdl_options: {
        headers: {
          customerKey: process.env.KAREO_CUSTOMER_KEY,
        },
      },
    };

    // Create the SOAP client
    const client = await soap.createClientAsync(WSDL_URL, options);

    console.log('SOAP Client Created:', client.describe());

    const requestArgs = {
      Patient: {
        FirstName: 'John',
        LastName: 'Doe',
        DOB: '1990-01-01',
        Address: '123 Main St',
        Phone: '1234567890',
        Email: 'john.doe@example.com',
      },
      Username: process.env.KAREO_USERNAME,
      Password: process.env.KAREO_PASSWORD,
      CustomerKey: process.env.KAREO_CUSTOMER_KEY,
    };

    console.log('Calling CreatePatientAsync with args:', requestArgs);

    // Call the CreatePatientAsync method
    const [result] = await client.CreatePatientAsync(requestArgs);

    console.log('SOAP Response:', result);

    res.status(200).json({
      status: 'success',
      patientId: result.patientId, // Adjust based on actual API response
      message: 'Patient created successfully!',
    });
  } catch (error) {
    console.error('Error during SOAP operation:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'An unexpected error occurred.',
    });
  }
}
