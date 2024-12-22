import Patients from "../../../lib/models/PatientDetails";


export default async function handler(req, res) {
  // Restrict to GET requests only
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Retrieve token from cookies
  

    // Fetch patient details from the database
    const patients = await Patients.getPatientByEmail(req.body.email);
    
    return res.status(200).json({status:patients});
  } catch (error) {
    // Handle specific JWT errors

    // Log and return generic server error for other cases
    console.error("Error fetching patients:", error.stack || error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
