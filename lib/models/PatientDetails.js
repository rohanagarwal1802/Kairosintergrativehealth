'use strict';

const fs = require('fs').promises;
const path = require('path');

// Define the path to the JSON file
const filePath = path.resolve(process.cwd(), "lib/json/patientDetails.json");

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
    await fs.writeFile(filePath, JSON.stringify(patients, null, 2), 'utf8');
  } catch (err) {
    throw new Error('Error writing to file: ' + err.message);
  }
}

// Define the Patient model operations (CRUD)
const Patients = {
  // Create a new patient
  async createPatient(data) {
    const patients = await readPatientsData();

    // Generate a new ID for the patient
    const newId = patients.length > 0 ? patients[patients.length - 1].id + 1 : 1;

    // Create a new patient object
    const newPatient = {
      id: newId,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    patients.push(newPatient);

    // Write the updated patients array to the JSON file
    await writePatientsData(patients);

    return newPatient;
  },

  // Update a patient by ID
  async updatePatient(id, data) {
    const patients = await readPatientsData();

    const patientIndex = patients.findIndex((patient) => patient.id === id);
    if (patientIndex === -1) {
      throw new Error('Patient not found');
    }

    // Update the patient details
    patients[patientIndex] = {
      ...patients[patientIndex],
      ...data,
      updated_at: new Date().toISOString(),
    };

    // Write the updated data to the JSON file
    await writePatientsData(patients);

    return patients[patientIndex];
  },

  // Get all patients
  async getAllPatients() {
    return await readPatientsData();
  },

  // Get a patient by ID
  async getPatientById(id) {
    const patients = await readPatientsData();

    const patient = patients.find((patient) => patient.id === id);
    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  },

  // Delete a patient (soft delete)
  async deletePatient(id) {
    const patients = await readPatientsData();

    const patientIndex = patients.findIndex((patient) => patient.id === id);
    if (patientIndex === -1) {
      throw new Error('Patient not found');
    }

    // Soft delete by setting the deleted_at field
    patients[patientIndex].deleted_at = new Date().toISOString();

    // Write the updated data to the JSON file
    await writePatientsData(patients);

    return patients[patientIndex];
  },
};

module.exports = Patients;
