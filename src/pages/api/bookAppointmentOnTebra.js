import soap from "soap";
import { parse, isValid } from 'date-fns';

export default async function handler(req, res) {
  const WSDL_URL = "https://webservice.kareo.com/services/soap/2.1/KareoServices.svc?singleWsdl";

  // Validate environment variables
  if (!process.env.KAREO_CUSTOMER_KEY || !process.env.KAREO_USERNAME || !process.env.KAREO_PASSWORD) {
    return res.status(500).json({
      status: "error",
      message: "Required environment variables are missing!",
    });
  }

  const { location,startDate } = req.body;

  console.log("start date ==>",startDate)
  let location_id = 1;
  if (location === "Tele Health") {
    location_id = 2;
  }

  try {
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

    const getPatientRequestArgs = {
      request: {
        RequestHeader: {
          ClientVersion: 1.0,
          CustomerKey: process.env.KAREO_CUSTOMER_KEY,
          Password: process.env.KAREO_PASSWORD,
          User: process.env.KAREO_USERNAME,
        },
        Filter: {
          PatientID: 1,
        },
      },
    };

    // Call the GetPatient method
    const [result] = await client.GetPatientAsync(getPatientRequestArgs);
    console.log("SOAP Response:", JSON.stringify(result, null, 2));

    const result_res = result.GetPatientResult;

    // Check if required fields exist
    if (!result_res || !result_res.SecurityResponse || !result_res.SecurityResponse.CustomerId) {
      throw new Error("Required patient data is missing in the SOAP response.");
    }

    // Get current time in the US Eastern Time Zone
    // const current_date = new Date();
    const date_options = { timeZone: "America/New_York" };
    const now = new Date();
    const currentUSDate = new Intl.DateTimeFormat('en-US', { ...date_options }).format(now);
    const currentDate = new Date(currentUSDate);

    // Function to format DOB to ISO
    function formatDOBToISO(dob) {
      console.log("Input dob ==> ", dob);

      let dateObject;

      // Handle the case where the input is a string
      if (typeof dob === "string") {
        // Attempt to parse a string in different formats
        dateObject = new Date(dob);

        // If the date is invalid (NaN), try additional parsing strategies
        if (isNaN(dateObject.getTime())) {
          // Try to parse dates with different formats
          let regexFormats = [
            /^\d{1,2}\/\d{1,2}\/\d{4}$/, // MM/DD/YYYY
            /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
            /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
            /^\d{2}\/\d{2}\/\d{2}$/, // DD/MM/YY
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, // ISO without milliseconds
          ];

          let validFormat = false;
          for (let regex of regexFormats) {
           
            if (regex.test(dob)) {
              dateObject = new Date(dob); // Try parsing with each format
              validFormat = true;
              if (regex == /^\d{1,2}\/\d{1,2}\/\d{4}$/) {
                console.log("Matched MM/DD/YYYY format");

                // Manually convert the date to YYYY-MM-DD format
                let [month, day, year] = dob.split('/');
                dateObject = new Date(`${year}-${month}-${day}`);
                break; // Exit loop after handling the format
            }
              break;
            }
          }

          if (!validFormat || isNaN(dateObject.getTime())) {
            throw new Error("Invalid date format. Could not parse the provided date.");
          }
        }
      }
      // Handle the case where dob is already a Date object
      else if (dob instanceof Date) {
        dateObject = dob;
      }
      // If the input is not a valid type, throw an error
      else {
        throw new Error("Invalid input: expected a string or Date object");
      }

      // Convert the Date object to ISO string (remove milliseconds if necessary)
      let isoDate = dateObject.toISOString(); // This includes milliseconds (e.g., 2024-12-21T09:30:00.000Z)
      isoDate = isoDate.replace(/\.\d{3}Z$/, 'Z'); // Remove milliseconds if needed

      return isoDate;
    }

    // Ensure `dob` is correctly parsed
    const formattedDOB = formatDOBToISO(result_res.Patient.DOB);
    console.log("Formatted DOB:", formattedDOB);

    function getNext90MinutesTime(inputTime) {
      const time = new Date(inputTime);
      if (isNaN(time)) {
        throw new Error("Invalid date. Please provide a valid date.");
      }
      time.setTime(time.getTime() + 90 * 60 * 1000);
      return time;
    }

    const start_time = currentDate.toLocaleString('en-US', { timeZone: "America/New_York" });
    const end_time = getNext90MinutesTime(start_time);

    const createdAtISO = formatDOBToISO(new Date());
    const startTimeISO = formatDOBToISO(start_time);
    const endTimeISO = formatDOBToISO(end_time);
    const current_date = formatDOBToISO(currentDate);

    console.log("Start Time:", start_time);
    console.log("End Time (90 minutes later):", end_time);

    // Construct Request Arguments for CreateAppointment
    const requestArgs = {
      request: {
        RequestHeader: {
          ClientVersion: 1.0,
          CustomerKey: process.env.KAREO_CUSTOMER_KEY,
          Password: process.env.KAREO_PASSWORD,
          User: process.env.KAREO_USERNAME,
          targetNSAlias: 'q4',
          targetNamespace: 'http://www.kareo.com/api/schemas/',
        },
        Appointment: {
          AppointmentId: 1,
          AppointmentName: "Consultation",
          AppointmentReasonId: 93,
          AppointmentStatus: "Tentative",
          AppointmentType: "P",
          CreatedAt: createdAtISO,
          CreatedBy: 1,
          CustomerId: result_res.SecurityResponse.CustomerId,
          EndTime: endTimeISO,
          IsDeleted: false,
          IsGroupAppointment: false,
          IsRecurring: false,
          Notes: "Patient needs follow-up appointment.",
          Alert: {
            Message: "Appointment Scheduled Successfully",
            ShowWhenDisplayingPatientDetails: true,
            ShowWhenEnteringEncounters: true,
            ShowWhenPostingPayments: true,
            ShowWhenPreparingPatientStatements: true,
            ShowWhenSchedulingAppointments: true,
            ShowWhenViewingClaimDetails: true,
          },
          PatientSummary: {
            DateOfBirth: formattedDOB,
            Email: result_res.Patient.EmailAddress,
            FirstName: result_res.Patient.FirstName,
            LastName: result_res.Patient.LastName,
            MobilePhone: result_res.Patient.MobilePhone,
            PatientId: result_res.Patient.ID,
            PracticeId: result_res.Patient.PracticeId,
            Status: "PRESENT",
          },
          PracticeId: result_res.Patient.PracticeId,
          ProviderId: 1,
          ResourceId: location_id,
          ServiceLocationId: 1,
          StartTime: startTimeISO,
          UpdatedAt: current_date,
          UpdatedBy: 1,
          WasCreatedOnline: true,
        },
      },
    };

    // Call CreateAppointment method
    const [appointmentResult] = await client.CreateAppointmentAsync(requestArgs);

    console.log("SOAP Response of appointment:", JSON.stringify(appointmentResult, null, 2));

    res.status(200).json({
      status: "success",
      appointmentResult,
      message: "Appointment Scheduled successfully!",
    });
  } catch (error) {
    console.error("Error during SOAP operation:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An unexpected error occurred.",
    });
  }
}
