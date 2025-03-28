import { deleteReview } from "../../../lib/models/ClientReview";
import getTokenFromCookie from "../utils/access";
import jwt from "jsonwebtoken";
import hashSecretKey from "../utils/hashedSecretKey";
export default async function handler(req, res) {
    if (req.method === 'POST') {
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
        // Expecting an array of ids in the request body
        const { ids } = req.body;
  console.log(ids)
        // Ensure ids is an array and not empty
        if (!Array.isArray(ids) || ids.length === 0) {
          return res.status(400).json({ error: 'Invalid input. Please provide an array of ids.' });
        }
  
        // Call the deleteReview function
        const result = await deleteReview(ids);
  
        // Respond with success
        return res.status(200).json(result);
      } catch (error) {
        console.error('Error in deleting reviews:', error);
        return res.status(500).json({ error: 'Failed to delete reviews.' });
      }
    } else {
      // Method not allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }