import { isValidPatient } from "../../../lib/models/PatientDetails";
import jwt from "jsonwebtoken";
import hashSecretKey from "../utils/hashedSecretKey";



function isTokenValid(token) {
  try {
    const hashKey=hashSecretKey( process.env.secretKey)
   const decoded = jwt.verify(token, hashKey, { algorithms: ['HS256'] });
    return !!decoded;
  } catch (error) {
    return false;
  }
}
export default async function handler(req, res) {
  try {
    const token = req.body["/?verify"];

    if (token) {
      console.log("token ==>", token, isTokenValid(token));
    }
    if (!token) {
      return res.status(209).end();
    }
    if (!isTokenValid(token)) {
      // Token is expired or invalid
      // Return a response and end the function here
      return res.status(209).end();
    }

   
const isTokenMatched=await isValidPatient(token)


    // Send the response after processing
    res.status(200).send({"hasVerified":isTokenMatched,"token":token});
  } catch (error) {
    console.log("Error in verifyToken", error);
    // Send an error response if something goes wrong
    res.status(500).send("Internal Server Error");
  }
}