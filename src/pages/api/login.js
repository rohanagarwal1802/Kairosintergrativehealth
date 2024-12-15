import jwt from "jsonwebtoken";
import axios from "axios";
import cookie from "cookie";

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
  const payload = { email };  // Avoid storing password in JWT payload
  try {
    const bearerToken = jwt.sign(payload, process.env.secretKey);
    const eightHoursInSeconds = 8 * 60 * 60;

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.HOST}/login`,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 201) {
      const jwtCookie = cookie.serialize("userToken", bearerToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: eightHoursInSeconds,
        sameSite: "strict",
        path: "/",
      });
      res.setHeader("Set-Cookie", jwtCookie);
      return res.status(response.status).json(response.data);  // Send data directly
    } else if (response.status === 200) {
      const tokenFromResponse = response.data;
      const tenDaysInSeconds = 10 * 24 * 60 * 60;
      const jwtCookie = cookie.serialize("auth_token", tokenFromResponse, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: tenDaysInSeconds,
        sameSite: "strict",
        path: "/",
      });
      res.setHeader("Set-Cookie", jwtCookie);
      return res.status(response.status).json(response.data);  // Send data directly
    } else {
      console.error("Unexpected response status:", response.status);
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    // Improved error logging
    console.error("API call failed:", error);  // Log the entire error object
    const statusCode = error.response ? error.response.status : 500;
    const errorMessage = error.response ? error.response.data : "Internal Server Error";
    return res.status(statusCode).json({ message: errorMessage });
  }
}
