'use strict';

const fs = require('fs').promises;
const path = require('path');
const jwt = require("jsonwebtoken");
const crypto=require("crypto")
const { getAppointmentByPatientId } = require('./appointments');



const hashSecretKey = (key) => {
  return crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);
};



// Define the path to the JSON file
const filePath = path.resolve(process.cwd(), "lib/json/patientDetails.json");

// console.log("filepath==>",filePath)

// Helper function to read data from the JSON file
async function readPatientsData() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File doesn't exist, return an empty array
      return [];
    } else {
      throw err;
    }
  }
}

// Helper function to write data to the JSON file
async function writePatientsData(patients) {
  try {
    const existingData = await readPatientsData();
    console.log("existingData", existingData);

let details=null
    const updatedData = existingData.map((patient) => {
      const updatedPatient = patients.find((p) => p.id === patient.id);
      console.log(updatedPatient)
      return updatedPatient ? { ...patient, ...updatedPatient } : patient;
    });

    console.log("updatedData", updatedData);
    if(updatedData==[])
    {
      details=updatedData
    }
    else
    {
      details=patients
    }
    console.log("writing to file...");

    await fs.writeFile(filePath, JSON.stringify(details, null, 2), 'utf8');
    console.log("File write successful.");
  } catch (err) {
    console.error('Error writing to file:', err);
  }
}



// Define the Patient model operations (CRUD)
const Patients = {
  // Create a new patient
  async createPatient(data) {

    console.log("data ",data)
    const patients = await readPatientsData();

    console.log("patients",patients)

    // Check if a patient with the same email already exists
    // const existingPatient = patients.find(
    //   (patient) => patient.email === data.email && !patient.deleted_at
    // );

    // if (existingPatient) {
    //   throw new Error('Patient with this email already exists');
    // }

    // Generate a new ID for the patient
    const newId = patients.length > 0 ? patients[patients.length - 1].id + 1 : 1;

    // Create a new patient object
    const newPatient = {
      id: newId,
      ...data,
      isRegistered: "false",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

   
    
const keyHash=hashSecretKey(process.env.secretKey)
    
        const token = jwt.sign({ email: data.email }, keyHash, {
          expiresIn: "24h",
        });
        newPatient.whitelist = token; // Ensure you're modifying the user data correctly
    

    patients.push(newPatient);

    console.log("new Patients list ==>",patients)

    // Write the updated patients array to the JSON file
    await writePatientsData(patients);

    return {"result":newPatient,"passed":true};
  },

  // Update a patient by ID
  async updatePatient(data,verifiedToken) {
    const patients = await readPatientsData();

    console.log("verified Token ",verifiedToken)
  
    const patientIndex = patients.findIndex((patient) => verifiedToken?patient.whitelist === data.verifiedToken:patient.id === data.id);
    if (patientIndex === -1) {
      throw new Error('Patient not found');
    }
  
    // Update only the provided fields
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        patients[patientIndex][key] = data[key];
      }
    });
  
    patients[patientIndex].updated_at = new Date().toISOString();
  
    // Write the updated data to the JSON file
    await writePatientsData(patients);
  
    return patients[patientIndex];
  }
  ,

  // Get all patients
  async getAllPatients() {
    const patients = await readPatientsData(); // Fetch all patient data
  
    for (const subData of patients) { // Loop through patients array
      if (!subData.patientId) {
        subData.appointMents = [];
        continue
      }
  
      // Await the result of getAppointmentByPatientId
      const appointmentValues = await getAppointmentByPatientId(subData.patientId);
  
      // Add the fetched appointments to the patient record
      subData.appointMents = appointmentValues;
    }
  
    // Exclude specific fields from each patient record
    return patients.map(patient => {
      const { password, whitelist, ...rest } = patient; // Exclude 'password' and 'whitelist' fields
      return rest;
    });
  },
  

  // Get a patient by ID
  async getPatientById(id) {
    const patients = await readPatientsData();

    const patient = patients.find((patient) => patient.id === id);
    if (!patient) {
      throw new Error('Patient not found');
    }

   
      const { password,whitelist, ...rest } = patient; // Example: Exclude 'password' field
      return rest;
  },

   // Get a patient by ID
   async getPatientsByToken(token) {
    const patients = await readPatientsData();

    const patient = patients.find((patient) => patient.whitelist === token);
    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  },

    // Get a patient by ID
    async getPatientByEmail(email) {
      const patients = await readPatientsData();
  
      const patient = patients.find((patient) => patient.email === email && !patient.deleted_at);
     
  
      return {patient:patient,status:!!patient};
    },

    async getPatientByPatientId(patientId) {
      const patients = await readPatientsData();
  
      const patient = patients.find((patient) => patient.patientId === patientId && !patient.deleted_at);
     
    
      return {patient:patient,status:!!patient};
    },

      // Get a patient by ID
      async isValidPatient(token) {
        const patients = await readPatientsData();
    console.log(token)
        const patient = patients.find((patient) => patient.whitelist === token && !patient.deleted_at);
        
    
        return !!patient;
      },

  // Delete a patient (soft delete)
  async deletePatient(id) {
    const patients = await readPatientsData();

    // const patientIndex = patients.findIndex((patient) => patient.id === id);
    const filteredPatients = patients.filter((patient) => appointment.id !== id);
    // if (patientIndex === -1) {
    //   throw new Error('Patient not found');
    // }

    // // Soft delete by setting the deleted_at field
    // patients[patientIndex].deleted_at = new Date().toISOString();
await fs.writeFile(filePath, JSON.stringify(filteredPatients, null, 2), 'utf8');
    
    return { message: `Patient deleted successfully` };
    // Write the updated data to the JSON file
   
  },




  async decryptPassword(encryptedPassword) {
    const algorithm = 'aes-256-ctr';
    let secretKey = process.env.secretKey;
    
    if (!secretKey) {
      throw new Error('Secret key is not set in environment variables');
    }
  
    // Ensure the secret key is 32 bytes (256 bits)
    if (secretKey.length !== 32) {
      console.log('Secret key is not 32 bytes, hashing it to get 32 bytes');
      secretKey = crypto.createHash('sha256').update(secretKey).digest();
    } else {
      secretKey = Buffer.from(secretKey, 'utf-8');
    }
  
    // Split the string into iv and encrypted data
    const [ivString, encryptedString] = encryptedPassword.split(':');
    if (!ivString || !encryptedString) {
      throw new Error('Invalid encrypted password format');
    }
  
    const iv = Buffer.from(ivString, 'hex');
    const encryptedData = Buffer.from(encryptedString, 'hex');
  
    try {
      // Create decipher and decrypt the data
      const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
      const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
      return decrypted.toString();
    } catch (error) {
      throw new Error('Failed to decrypt password: ' + error.message);
    }
  },
  

  async loginPatient(email, password) {
    try {
      const patients = await readPatientsData();
  
      let patientByEmail = patients.find(
        (patient) => patient.email === email && !patient.deleted_at
      );
  
      if (!patientByEmail) {
        return "Patient Not Found";
      }
  
      // Ensure passwords are compared securely by decrypting the password
      const decryptedPassword = await this.decryptPassword(patientByEmail.password);
  
      const validPatient = decryptedPassword === password && !patientByEmail.deleted_at;
  
      if (!validPatient) {
        return "Wrong Password";
      }
  
      // Return the whitelist token on successful login
      return patientByEmail.whitelist;
    } catch (error) {
      console.error('Error logging in patient:', error);
      return "An error occurred during login";
    }
  }
  
};


module.exports = Patients;
