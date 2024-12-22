import soap from "soap";
import { format } from "date-fns";

export default async function handler(req, res) {
  const WSDL_URL = "https://webservice.kareo.com/services/soap/2.1/KareoServices.svc?singleWsdl";

  // Validate environment variables
  if (!process.env.KAREO_CUSTOMER_KEY || !process.env.KAREO_USERNAME || !process.env.KAREO_PASSWORD) {
    return res.status(500).json({
      status: "error",
      message: "Required environment variables are missing!",
    });
  }

  const { firstname, lastname, dob, email, mobile, insurance } = req.body;

  try {
    // Validate and format the Date of Birth
    if (!dob) {
      return res.status(400).json({
        status: "error",
        message: "Date of Birth (dob) is required!",
      });
    }

    const date = new Date(dob);
      
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    const date_of_birth= `${year}-${month}-${day}`;
  
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



    console.log("Initializing SOAP client...");
    const client = await soap.createClientAsync(WSDL_URL, options);
    console.log("SOAP Client Created:", JSON.stringify(client.describe(), null, 2));

    const getPatientRequestArgs = {
      request: {
        RequestHeader: {
          ClientVersion: 1.0,
          CustomerKey: process.env.KAREO_CUSTOMER_KEY,
          Password: process.env.KAREO_PASSWORD,
          User: process.env.KAREO_USERNAME,
        },
        Fields:{},
        Filter: {
          // PatientID: 1,
        },
      },
    };

    // Call the GetPatient method
    const [PatientResult] = await client.GetAllPatientsAsync(getPatientRequestArgs);
    console.log("SOAP Response of Patient Details:", JSON.stringify(PatientResult, null, 2));
// return PatientResult
    // Construct Request Arguments
    const requestArgs = {
      request: {
        RequestHeader: {
          CustomerKey: process.env.KAREO_CUSTOMER_KEY,
          Password: process.env.KAREO_PASSWORD,
          User: process.env.KAREO_USERNAME,
        },
        Patient: {
          FirstName: firstname,
          LastName: lastname,
          DateofBirth: date_of_birth,
          EmailAddress: email,
          MobilePhone: mobile,
          Alert: {
            Message: "Patient Created Successfully",
            ShowWhenDisplayingPatientDetails: true,
            ShowWhenEnteringEncounters: true,
            ShowWhenPostingPayments: true,
            ShowWhenPreparingPatientStatements: true,
            ShowWhenSchedulingAppointments: true,
            ShowWhenViewingClaimDetails: true,
          },
          Cases: insurance
            ? {
                PatientCaseCreateReq: {
                  Active: true,
                  Authorizations: {
                    InsurancePolicyAuthorizationCreateReq: {
                      InsurancePlanName: insurance,
                    },
                  },
                },
              }
            : undefined,
          Practice: {
            PracticeID: 1,
          },
        },
      },
    };

    console.log("Calling CreatePatient with args:", JSON.stringify(requestArgs, null, 2));

    // Call the CreatePatient method
    const [result] = await client.CreatePatientAsync(requestArgs);

    console.log("SOAP Response:", JSON.stringify(result, null, 2));

    // const patientId = result?.CreatePatientResponse?.Patient?.PatientID || "unknown";

    res.status(200).json({
      status: "success",
      result,
      message: "Patient created successfully!",
    });
  } catch (error) {
    console.error("Error during SOAP operation:", {
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
