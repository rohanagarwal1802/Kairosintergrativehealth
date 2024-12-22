import jwt from 'jsonwebtoken';
import { serialize } from "cookie";
import Patients from '../../../lib/models/PatientDetails';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables
dotenv.config();

/**
 * Helper function to hash a secret key to ensure it is 32 bytes.
 * @param {string} key - The secret key to hash.
 * @returns {string} - A hashed and truncated key.
 */
const hashSecretKey = (key) => {
  return crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);
};

/**
 * Helper function to create a cookie for JWT.
 * @param {string} token - JWT token.
 * @param {boolean} isLocalhost - Whether the environment is localhost.
 * @param {number} maxAge - Max age of the cookie in seconds.
 * @returns {string} - Serialized cookie.
 */
const createJwtCookie = (token, isLocalhost, maxAge) => {
  console.log("Creating cookie with token:", token);
  return serialize('userToken', token, {
    httpOnly: true,
    secure: !isLocalhost,  // Secure only in production
    maxAge,
    sameSite: 'strict',
    path: '/',
  });
};

/**
 * API handler for login functionality.
 * Supports both Admin and Patient login.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;
  const { EMAIL_USER, EMAIL_PASS, secretKey } = process.env;

  // Validate presence of environment variables
  if (!EMAIL_USER || !EMAIL_PASS || !secretKey) {
    console.error('Environment variables are missing. Ensure .env is properly configured.');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  // Hash the secret key to ensure it is 32 bytes
  const hashedSecretKey = hashSecretKey(secretKey);

  const isLocalhost = req.headers.host.includes('localhost');

  // Admin Login
  if (email === EMAIL_USER && password === EMAIL_PASS) {
    try {
      const payload = { email, role: 'admin' };
      const bearerToken = jwt.sign(payload, hashedSecretKey, { expiresIn: '8h' });

      const jwtCookie = createJwtCookie(bearerToken, isLocalhost, 8 * 60 * 60); // 8 hours

      res.setHeader('Set-Cookie', jwtCookie);
      return res.status(200).json({ message: 'Admin login successful' });
    } catch (error) {
      console.error('Error generating JWT for admin:', error);
      return res.status(500).json({ message: 'Error generating admin JWT' });
    }
  }

  // Patient Login
  try {
    const response = await Patients.loginPatient(email, password);

    if (response === 'Wrong Password' || response === 'Patient Not Found') {
      return res.status(403).json({ message: response });
    }

    const keyHash=hashSecretKey(secretKey)
        
            const token = jwt.sign({ email: data.email }, keyHash, {
              expiresIn: "24h",
            });

            const jwtCookie = createJwtCookie(token, isLocalhost, 24 * 60 * 60); // 24 hours


    res.setHeader('Set-Cookie', jwtCookie);
    return res.status(200).json({ message: 'Patient login successful' });
  } catch (error) {
    console.error('Error during patient login:', error);
    const statusCode = error.response ? error.response.status : 500;
    const errorMessage = error.response ? error.response.data : 'Internal Server Error';
    return res.status(statusCode).json({ message: errorMessage });
  }
}
