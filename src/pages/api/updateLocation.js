import { updateLocationCount } from "../../../lib/models/newLocation";

export default async function handler(req, res) {
  if (req.method === "POST") {
   
    try {
      console.log("req.body ==>",req.body)
    //   if(!req.body.id)
    //   {
    //     res.status(400).json({ message: "Please provide Id" });
    //   }
      const result = await updateLocationCount(req.body.state);
      console.log(result)
      return res.status(201).json({ message: "Location updated successfully", data: result })
    } catch (error) {
      console.error("Error registering location:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
