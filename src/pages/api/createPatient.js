import * as soap from 'soap';

import { format } from "date-fns";
import { Emergency } from '@mui/icons-material';

export default async function handler(req, res) {
  const WSDL_URL = "https://webservice.kareo.com/services/soap/2.1/KareoServices.svc?singleWsdl";

  // Validate environment variables
  if (!process.env.KAREO_CUSTOMER_KEY || !process.env.KAREO_USERNAME || !process.env.KAREO_PASSWORD) {
    return res.status(500).json({
      status: "error",
      message: "Required environment variables are missing!",
    });
  }
  // val.firstname = firstname;
  // val.lastname = lastname;
  // val.mobile = mobile;
  // val.email = email;
  // val.dob = dob;
  // val.insurance = insurance;
  // val.gender=gender;
  // val.marital_status=marital_status;
  // val.emergency_contact_name=emergency_contact_name;
  // val.ssn=ssn;
  // val.address=address;
  // val.=
  const { firstname, lastname, dob, email, mobile, insurance ,emergencyName,employmentStatus,gender,
    marital_status,emergency_contact_name,address,emergency_contact_number
  } = req.body;

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
        await processRequest(client, req, res, firstname, lastname, formattedDob, email, mobile, insurance ,emergencyName,employmentStatus,gender,
          marital_status,emergency_contact_name,address,emergency_contact_number);
      });
    } else {
      console.log("Using createClientAsync in development");
      client = await soap.createClientAsync(WSDL_URL, options);
      await processRequest(client, req, res, firstname, lastname, formattedDob, email, mobile, insurance ,emergencyName,employmentStatus,gender,
        marital_status,emergency_contact_name,address,emergency_contact_number);
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

async function processRequest(client, req, res, firstname, lastname, formattedDob, email, mobile, insurance ,emergencyName,employmentStatus,gender,
  marital_status,emergency_contact_name,address,emergency_contact_number) {
  try {
    // Construct Request Arguments
    const requestArgs = {
      request: {
        RequestHeader: {
          CustomerKey: process.env.KAREO_CUSTOMER_KEY,
          Password: process.env.KAREO_PASSWORD,
          User: process.env.KAREO_USERNAME,
        },
        Patient: {
        AddressLine1:address,
          Cases: insurance
          ? {
              PatientCaseCreateReq: {
                Active: true,
                // Authorizations: {
                //   InsurancePolicyAuthorizationCreateReq: {
                //     InsurancePlanName: insurance,
                //   },
                // },
              },
            }
          : undefined,
          DateofBirth: formattedDob,
          EmailAddress: email,
          EmergencyName:emergency_contact_name,
          EmergencyPhone:emergency_contact_number,
          // Employer:{
          //   EmploymentStatus:"Employeed",
          // },
          FirstName: firstname,
          Gender:gender,
          LastName: lastname,
          MaritalStatus:marital_status,
         
          // DOB: 2012-12-12,
         
          MobilePhone: mobile,
          
        
          Practice: {
            PracticeID: 3,
          },
          // PrimaryCarePhysician:,
          // SocialSecurityNumber:ssn,
        },
      },
    };

    console.log("Calling CreatePatient with args:", JSON.stringify(requestArgs, null, 2));

    // Call the CreatePatient method
    const [result] = await client.CreatePatientAsync(requestArgs);
    console.log("SOAP Response:", JSON.stringify(result, null, 2));

    const patientId = result || "unknown";

    res.status(200).json({
      status: "success",
      patientId,
      message: "Patient created successfully!",
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