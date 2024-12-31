import { updateReview } from "../../../lib/models/ClientReview";

export default async function handler(req, res) {
  console.log(req.method)
  if (req.method === "PATCH") {
   
    try {
      console.log("req.body ==>",req.body)
      if(!req.body.id)
      {
        res.status(400).json({ message: "Please provide Id" });
      }
      const result = await updateReview(req.body.id,req.body);
      console.log(result)
      return res.status(201).json({ message: "Review updated successfully", data: result })
    } catch (error) {
      console.error("Error registering patient:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
