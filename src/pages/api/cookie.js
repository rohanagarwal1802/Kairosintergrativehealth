import getTokenFromCookie from "../utils/access";
import jwt from "jsonwebtoken";
import Patients from "../../../lib/models/PatientDetails";
import hashSecretKey from "../utils/hashedSecretKey";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log("Request Method: GET");

      // Get the token from the cookie
      const token = await getTokenFromCookie(req);
      console.log("Token from Cookie:", token);

      if (!token) {
        // Token doesn't exist, clear cookies and return a response
        console.log("No token found. Clearing cookies...");
        res.setHeader("Set-Cookie", [
          "userToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Ensure the path is correct
          "anotherCookie=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Add all cookies you need to clear
        ]);
        return res.status(204).json({
          message: "Cookies cleared, please clear local storage on the client side.",
        });
      }

      console.log("Token is present, verifying...");

      // Debugging: Log secret key and token format
      console.log("Secret Key:", process.env.secretKey);
const hashedKey=hashSecretKey( process.env.secretKey)
      // Ensure token is in the expected format
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.error("Invalid token format:", token);
        return res.status(400).json({ message: "Invalid token format" });
      }

      console.log("Token Parts:", tokenParts);

      // Verify the token with the secret key from environment variables
      const decodedToken = jwt.verify(token, hashedKey, { algorithms: ['HS256'] });
      console.log("Decoded Token:", decodedToken);

      // Check the role of the decoded token
      if (decodedToken.role === "admin") {
        console.log("Admin role detected. Returning admin info...");
        let adminInfo = {
          email: decodedToken.email,
          role: decodedToken.role,
        };
        return res.status(200).send(adminInfo);
      }

      // If role is not 'admin', fetch the user data
      console.log("Fetching patient data...");
      const response = await Patients.getPatientByEmail(decodedToken.email);
      console.log("Response from getPatientsByToken:", response);

      if (!response.status) {
        // User not found, clear cookies and return an error
        console.log("User not found, clearing cookies...");
        res.setHeader("Set-Cookie", [
          "userToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Ensure the path is correct
          "anotherCookie=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", // Add other cookies if needed
        ]);
        return res.status(500).json({
          message: "User Not Found.",
        });
      } else {
        console.log("User found, sending response...");
        return res.status(200).send(response.patient);
      }
    } catch (error) {
      console.error("Error during token verification:", error); // Full error log

      // Handle TokenExpiredError separately
      if (error.name === "TokenExpiredError") {
        console.log("Token expired, returning 401...");
        return res.status(401).json({ message: "Token expired, please login again." });
      }

      // General error handling, clearing cookies in case of failure
      console.log("Unexpected error, clearing cookies...");
      res.setHeader("Set-Cookie", [
        "userToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", 
        "anotherCookie=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;", 
      ]);
      return res.status(500).json({
        message: "Internal Server Error. Clear local storage on the client side.",
      });
    }
  }
}
