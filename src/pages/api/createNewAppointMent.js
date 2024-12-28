
import { addAppointments } from "../../../lib/models/appointmentOperations";
import getTokenFromCookie from "../utils/access";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = await getTokenFromCookie(req);

  if (!token) {
    return res.status(401).json({ error: "Authentication required" }); // 401 for unauthenticated
  }
  


    

  if (!addAppointments) {
    return res.status(500).json({ error: "addAppointments function not found." });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid input data. Expected a JSON object." });
  }

  try {
    console.log("Request Body:", req.body);
    const result = await addAppointments(req.body);
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
