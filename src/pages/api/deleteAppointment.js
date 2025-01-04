import { deleteAppointment } from "../../../lib/models/appointmentOperations";
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
        // Expecting an array of id in the request body
        const { id } = req.body;
  console.log(id)
        // Ensure id is an array and not empty
        if (!id) {
          return res.status(400).json({ error: 'Please provide an id.' });
        }
  
        // Call the deleteAppointment function
        const result = await deleteAppointment(id);
  
        // Respond with success
        return res.status(200).json(result);
      } catch (error) {
        console.error('Error in deleting appointment:', error);
        return res.status(500).json({ error: 'Failed to delete appointment.' });
      }
    } else {
      // Method not allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }