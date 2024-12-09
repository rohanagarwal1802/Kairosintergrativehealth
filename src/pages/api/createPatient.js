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

    const formattedDob = format(new Date(dob), "yyyy-MM-dd");
    console.log("Formatted DOB:", formattedDob);

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
    console.log("SOAP Client Created:", client.describe());

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
          DOB: dob,
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
            PracticeID: 2,
          },
        },
      },
    };

    console.log("Calling CreatePatient with args:", requestArgs);

    // Call the CreatePatient method
    const [result] = await client.CreatePatientAsync(requestArgs);

    console.log("SOAP Response:", result);

    const patientId = result?.CreatePatientResponse?.Patient?.PatientID || "unknown";

    res.status(200).json({
      status: "success",
      patientId,
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
