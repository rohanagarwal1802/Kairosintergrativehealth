import { addRoundTableDetails } from "../../../lib/models/roundTableOperations";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }




    

  if (!addRoundTableDetails) {
    return res.status(500).json({ error: "addRoundTableDetails function not found." });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid input data. Expected a JSON object." });
  }

  try {
    console.log("Request Body:", req.body);
    const result = await addRoundTableDetails(req.body);
    return res.status(201).json({
      message: "Message added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding message:", error.message);
    return res.status(500).json({
      error: process.env.NODE_ENV === "production" 
        ? "Internal Server Error" 
        : error.message,
    });
  }
}
