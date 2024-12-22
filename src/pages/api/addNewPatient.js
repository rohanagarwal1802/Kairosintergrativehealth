import Patients from "../../../lib/models/PatientDetails";

export default async function handler(req, res) {
  if (req.method === "POST") {
   
    try {
      const result = await Patients.createPatient(req.body);
      console.log(result)
      return result?.passed
        ? res.status(201).json({ message: "Patient registered successfully", data: result })
        : res.status(400).json({ message: "Failed to register patient", data: result });
    } catch (error) {
      console.error("Error registering patient:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
