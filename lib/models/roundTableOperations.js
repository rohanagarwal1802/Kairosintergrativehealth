const fs = require('fs/promises');
const path = require('path');

// Adjust the file path to point to the `json` folder outside the current folder
const filePath = path.resolve(process.cwd(), "lib/json/roundTableDetails.json");

// Read all roundtableDetails from the JSON file
const getAllRoundTableDetails = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data); // Parse JSON string into an array
  } catch (error) {
    console.error('Error reading roundtableDetails:', error);
    throw error;
  }
};

// Add a new appointment to the JSON file
const addRoundTableDetails = async (newAppointment) => {
  try {
    const roundtableDetails = await getAllRoundTableDetails();
    const id = roundtableDetails.length > 0 ? roundtableDetails[roundtableDetails.length - 1].id + 1 : 1;
    const detailId = { id, ...newAppointment, created_at: new Date() };
    roundtableDetails.push(detailId);

    await fs.writeFile(filePath, JSON.stringify(roundtableDetails, null, 2), 'utf8');
    return detailId;
  } catch (error) {
    console.error('Error adding RoundTable Details:', error);
    throw error;
  }
};

// Update an existing appointment
const updateRoundTable = async (id, updatedData) => {
  try {
    const roundtableDetails = await getAllRoundTableDetails();
    const index = roundtableDetails.findIndex((appointment) => appointment.id === id);

    if (index === -1) throw new Error('RoundTable Details not found');

    roundtableDetails[index] = { ...roundtableDetails[index], ...updatedData, updatedAt: new Date() };

    await fs.writeFile(filePath, JSON.stringify(roundtableDetails, null, 2), 'utf8');
    return roundtableDetails[index];
  } catch (error) {
    console.error('Error updating RoundTable Details:', error);
    throw error;
  }
};

// Delete a appointment
const deleteRoundTableDetail = async (ids) => {
  try {
    const roundtableDetails = await getAllRoundTableDetails();
    const filteredAppointments = roundtableDetails.filter((appointment) => !ids.includes(appointment.id));

    await fs.writeFile(filePath, JSON.stringify(filteredAppointments, null, 2), 'utf8');
    return { message: 'RoundTable Details deleted successfully' };
  } catch (error) {
    console.error('Error deleting RoundTable Details:', error);
    throw error;
  }
};

module.exports = {
  getAllRoundTableDetails,
  addRoundTableDetails,
  updateRoundTable,
  deleteRoundTableDetail,
};
