import * as soap from 'soap';
import getTokenFromCookie from '../utils/access';

export default async function handler(req, res) {
  const token = await getTokenFromCookie(req);

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const WSDL_URL = "https://webservice.kareo.com/services/soap/2.1/KareoServices.svc?singleWsdl";

  if (!process.env.KAREO_CUSTOMER_KEY || !process.env.KAREO_USERNAME || !process.env.KAREO_PASSWORD) {
    return res.status(500).json({
      status: "error",
      message: "Required environment variables are missing!",
    });
  }

  const { service, location, appointmentDate, patientId } = req.body;

  if (!service || !location || !appointmentDate || !patientId) {
    return res.status(403).json({
      status: "error",
      message: "Required credentials are missing!",
    });
  }

  let PSYCIATRY_ID = process.env.PSYCIATRY_ID;
  let THERAPY_ID = process.env.THERAPY_ID;
  let ADDICTION_ID = process.env.ADDICTION_ID;
  let GENETICTESTING_ID = process.env.GENETICTESTING_ID;
  let CNVS_ID = process.env.CNVS_ID;

  let appointment_reasonId = 0;

  if (service === "Phyciatry") {
    appointment_reasonId = PSYCIATRY_ID;
  } else if (service === "Therapy") {
    appointment_reasonId = THERAPY_ID;
  } else if (service === "Addiction") {
    appointment_reasonId = ADDICTION_ID;
  } else if (service === "Genetic Testing") {
    appointment_reasonId = GENETICTESTING_ID;
  } else if (service === "CNS-VS Testing") {
    appointment_reasonId = CNVS_ID;
  }

  let location_id = 1;
  if (location === "Tele Health") {
    location_id = 2;
  }

  try {
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
          PatientID: parseInt(patientId),
        },
      },
    };

    const [result] = await client.GetPatientAsync(getPatientRequestArgs);

    const result_res = result.GetPatientResult;

    if (!result_res || !result_res.SecurityResponse || !result_res.SecurityResponse.CustomerId) {
      throw new Error("Required patient data is missing in the SOAP response.");
    }

    const formattedDOB = new Date(result_res.Patient.DOB).toISOString().replace(/\.\d{3}Z$/, '');

    const stDate = new Date(appointmentDate);
    stDate.setHours(12, 0, 0, 0);
    const startTimeISO = stDate.toISOString().replace(/\.\d{3}Z$/, '');

    const end_time = new Date(stDate.getTime() + 90 * 60 * 1000);
    const endTimeISO = end_time.toISOString().replace(/\.\d{3}Z$/, '');

    const current_date = new Date();
    const createdAtISO = current_date.toISOString().replace(/\.\d{3}Z$/, '');

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
          AppointmentReasonId: appointment_reasonId,
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
          PatientSummary: {
            DateofBirth: formattedDOB,
            Email: result_res.Patient.EmailAddress,
            FirstName: result_res.Patient.FirstName,
            LastName: result_res.Patient.LastName,
            MobilePhone: result_res.Patient.MobilePhone,
            PatientId: result_res.Patient.ID,
            PracticeId: result_res.Patient.PracticeId,
          },
          PracticeId: result_res.Patient.PracticeId,
          ProviderId: 1,
          ResourceId: location_id,
          ServiceLocationId: location_id,
          StartTime: startTimeISO,
          UpdatedAt: createdAtISO,
          UpdatedBy: 1,
          WasCreatedOnline: true,
        },
      },
    };

    const [appointmentResult] = await client.CreateAppointmentAsync(requestArgs);

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
