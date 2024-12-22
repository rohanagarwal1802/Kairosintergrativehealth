import Patients from "../../../lib/models/PatientDetails";

export default async function handler(req, res) {
  if (req.method === "patch") {
   
    try {
      console.log("req.body ==>",req.body)
      if(!req.body.id)
      {
        res.status(400).json({ message: "Please provide Id" });
      }
      const result = await Patients.updatePatient(req.body);
      console.log(result)
      return res.status(201).json({ message: "Patient updated successfully", data: result })
    } catch (error) {
      console.error("Error registering patient:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
