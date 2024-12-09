import Patients from "../../../lib/models/PatientDetails";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const patients = await Patients.findAll();
      res.status(200).json(patients);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
