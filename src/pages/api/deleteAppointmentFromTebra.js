import * as soap from 'soap';


export default async function handler(req, res) {
  const WSDL_URL = "https://webservice.kareo.com/services/soap/2.1/KareoServices.svc?singleWsdl";

  // Validate environment variables
  if (!process.env.KAREO_CUSTOMER_KEY || !process.env.KAREO_USERNAME || !process.env.KAREO_PASSWORD) {
    return res.status(500).json({
      status: "error",
      message: "Required environment variables are missing!",
    });
  }

  const { appointmentId } = req.body;

  try {
    // Validate and format the Date of Birth
  
    // SOAP Client Options
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

    console.log("Environment:", process.env.NODE_ENV);

    let client;

    // Check for `createClientAsync` and use appropriate client creation method
    if (process.env.NODE_ENV === "production") {
      console.log("Using callback-based createClient in production.");
      soap.createClient(WSDL_URL, options, async (err, soapClient) => {
        if (err) {
          console.error("Error creating SOAP client:", err);
          return res.status(500).json({
            status: "error",
            message: "SOAP client creation failed.",
          });
        }
        client = soapClient;
        await processRequest(client, req, res, appointmentId);
      });
    } else {
      console.log("Using createClientAsync in development");
      client = await soap.createClientAsync(WSDL_URL, options);
      await processRequest(client, req, res, appointmentId);
    }
  } catch (error) {
    console.error("Error during SOAP operation:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      status: "error",
      message: error.message || "An unexpected error occurred.",
    });
  }
}

async function processRequest(client, req, res, appointmentId) {
  try {
    // Construct Request Arguments
    const requestArgs = {
      request: {
        RequestHeader: {
          CustomerKey: process.env.KAREO_CUSTOMER_KEY,
          Password: process.env.KAREO_PASSWORD,
          User: process.env.KAREO_USERNAME,
        },
        Appointment: {
            AppointmentId:appointmentId,
        },
      },
    };

    console.log("Calling CreatePatient with args:", JSON.stringify(requestArgs, null, 2));

    // Call the CreatePatient method
    const [result] = await client.DeleteAppointmentAsync(requestArgs);
    console.log("SOAP Response:", JSON.stringify(result, null, 2));

    const patientId = result || "unknown";

    res.status(200).json({
      status: "success",
      patientId,
      message: "Appointment Deleted successfully!",
    });
  } catch (error) {
    console.error("Error during SOAP request processing:", {
      message: error.message,
      stack: error.stack,
      response: error.response,
    });

    res.status(500).json({
      status: "error",
      message: error.message || "An unexpected error occurred.",
    });
  }
}