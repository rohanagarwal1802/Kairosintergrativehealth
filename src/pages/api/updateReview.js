import { updateReview } from "../../../lib/models/ClientReview";
import getTokenFromCookie from "../utils/access";
import jwt from "jsonwebtoken";
import hashSecretKey from "../utils/hashedSecretKey";

export default async function handler(req, res) {
  console.log(req.method)
  if (req.method === "PATCH") {
   
    try {

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
