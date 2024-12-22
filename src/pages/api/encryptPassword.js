import crypto from 'crypto';
import Patients from "../../../lib/models/PatientDetails";

const algorithm = 'aes-256-ctr';
let secretKey = process.env.secretKey;

if (!secretKey) {
  throw new Error('Secret key is not set in environment variables');
}

// Ensure the secret key is 32 bytes (256 bits)
if (secretKey.length !== 32) {
  // If it's shorter, hash the key to make it 32 bytes
  console.log('Secret key is not 32 bytes, hashing it to get 32 bytes');
  secretKey = crypto.createHash('sha256').update(secretKey).digest();
} else {
  // If it's already 32 bytes, convert to Buffer
  secretKey = Buffer.from(secretKey, 'utf-8');
}

function encryptPassword(password) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv); // Use the correct 32-byte secret key
  const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { password, verifiedToken } = req.body;

    // Early return if verifiedToken is missing
    if (!verifiedToken) {
      return res.status(400).json({ message: "Please provide verifiedToken" });
    }

    console.log('Incoming request body:', req.body);  // Log the incoming request body

    try {
      // Encrypt the password
      const hashedPassword = encryptPassword(password);
      console.log('Encrypted password:', hashedPassword); // Log the encrypted password

      // Prepare data for database update
      const data = {
        password: hashedPassword,
        verifiedToken: verifiedToken,
        isRegistered:true
      };

      console.log('Data prepared for database update:', data); // Log the data sent to update

      // Update the patient record in the database
      const result = await Patients.updatePatient(data, verifiedToken);

      console.log('Database update result:', result); // Log result from database

      if (!result) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      res.status(201).json({ message: 'Patient password set successfully' });
    } catch (error) {
      console.error('Error updating patient password:', error); // Log full error details
      res.status(500).json({ error: 'Failed to update patient password' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
