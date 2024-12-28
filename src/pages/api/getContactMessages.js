import { getAllMessages } from "../../../lib/models/contactMessage";
import getTokenFromCookie from "../utils/access";
import jwt from "jsonwebtoken";
import hashSecretKey from "../utils/hashedSecretKey";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }


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

    

  if (!getAllMessages) {
    return res.status(500).json({ error: "getAllMessages function not found." });
  }


  try {
    const result = await getAllMessages();
    return res.status(200).json({
      message: "Message Retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding message:", error.message);
    return res.status(500).json(
     "Internal Server Error" 
    );
  }
}
