import { getAppointmentByPatientId } from "../../../lib/models/appointmentOperations";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }




    

  if (!getAppointmentByPatientId) {
    return res.status(500).json({ error: "getAppointmentByPatientId function not found." });
  }


  try {
    const patientId=req.query.patientId
    if(!patientId)
    {
        return res.status(403).json({ error: "Please provide patient id" });
    }
    const result = await getAppointmentByPatientId(patientId);
    console.log(result)
    return res.status(200).json({
      message: "Appointments Retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error getting Appointments:", error.message);
    return res.status(500).json(
     "Internal Server Error" 
    );
  }
}
