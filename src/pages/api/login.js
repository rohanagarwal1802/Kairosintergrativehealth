import jwt from "jsonwebtoken";
import axios from "axios";
import cookie from "cookie";
import Patients from "../../../lib/models/PatientDetails";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  // Check if the email and password match the admin credentials
  if (email === process.env.EMAIL_USER && password === process.env.EMAIL_PASS) {
    // Create payload indicating it's an admin
    const payload = { email, role: "admin" };
    try {
      const bearerToken = jwt.sign(payload, process.env.secretKey);
      const eightHoursInSeconds = 8 * 60 * 60;

      // Set the token as a cookie
      const jwtCookie = cookie.serialize("userToken", bearerToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Set secure flag conditionally
        maxAge: eightHoursInSeconds,
        sameSite: "strict",  // Can be 'Lax' if cross-site issues arise
        path: "/",
      });

      // Set the cookie and return success response (no need to send the token in body)
      res.setHeader("Set-Cookie", jwtCookie);
      return res.status(200).json({ message: "Admin login successful" });
    } catch (error) {
      console.error("Error generating JWT:", error);
      return res.status(500).json({ message: "Error generating JWT" });
    }
  }

  // If the email and password don't match, proceed with the usual API call
  try {


   

    const response = await Patients.loginPatient(email,password);
if(response==="Wrong Password" || response==="Patient Not Found")
{
  return res.status(403).json({message:response});
}
   
      // const tokenFromResponse = response.data;
      console.log("response ==>",response)
      const tenDaysInSeconds = 10 * 24 * 60 * 60;
      const jwtCookie = cookie.serialize("userToken", response, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: tenDaysInSeconds,
        sameSite: "strict",
        path: "/",
      });
     await res.setHeader("Set-Cookie", jwtCookie);
      return res.status(200).json(response);  // Send data directly
    
  } catch (error) {
    // Improved error logging
    console.error("API call failed:", error);  // Log the entire error object
    const statusCode = error.response ? error.response.status : 500;
    const errorMessage = error.response ? error.response.data : "Internal Server Error";
    return res.status(statusCode).json({ message: errorMessage });
  }
}
