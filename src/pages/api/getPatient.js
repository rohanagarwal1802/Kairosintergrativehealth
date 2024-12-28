import Patients from "../../../lib/models/PatientDetails";
import getTokenFromCookie from "../utils/access";
import jwt from "jsonwebtoken";
import hashSecretKey from "../utils/hashedSecretKey";

export default async function handler(req, res) {
  // Restrict to GET requests only
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Retrieve token from cookies
   const token = await getTokenFromCookie(req);
    if (!token) {
      return res.status(401).json({ error: "Authentication required" }); // 401 for unauthenticated
    }
const hashKey=hashSecretKey(process.env.secretKey)
    // Verify token
    const decodedToken = jwt.verify(token,hashKey );
    if (
      !decodedToken ||
      (decodedToken.email !== process.env.EMAIL_USER && decodedToken?.role !== "admin")
    ) {
      return res.status(403).json({ error: "Access denied" }); // 403 for unauthorized
    }

    // Fetch patient details from the database
    const patients = await Patients.getAllPatients();
    return res.status(200).json(patients);
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ error: "Invalid token" });
    }

    // Log and return generic server error for other cases
    console.error("Error fetching patients:", error.stack || error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
