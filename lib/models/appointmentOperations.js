const fs = require('fs/promises');
const path = require('path');

// Adjust the file path to point to the `json` folder outside the current folder
const filePath = path.resolve(__dirname, '../json/appointments.json');

// Read all appointments from the JSON file
const getAllAppointments = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data); // Parse JSON string into an array
  } catch (error) {
    console.error('Error reading appointments:', error);
    throw error;
  }
};

// Add a new appointment to the JSON file
const addAppointments = async (newAppointment) => {
  try {
    const appointments = await getAllAppointments();
    const id = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 1;
    const appointmentWithId = { id, ...newAppointment, created_at: new Date() };
    appointments.push(appointmentWithId);

    await fs.writeFile(filePath, JSON.stringify(appointments, null, 2), 'utf8');
    return appointmentWithId;
  } catch (error) {
    console.error('Error adding appointment:', error);
    throw error;
  }
};

// Update an existing appointment
const updateAppointment = async (id, updatedData) => {
  try {
    const appointments = await getAllAppointments();
    const index = appointments.findIndex((appointment) => appointment.id === id);

    if (index === -1) throw new Error('Appointment not found');

    appointments[index] = { ...appointments[index], ...updatedData, updatedAt: new Date() };

    await fs.writeFile(filePath, JSON.stringify(appointments, null, 2), 'utf8');
    return appointments[index];
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

// Delete a appointment
const deleteAppointment = async (id) => {
  try {
    const appointments = await getAllAppointments();
    const filteredAppointments = appointments.filter((appointment) => appointment.id !== id);

    await fs.writeFile(filePath, JSON.stringify(filteredAppointments, null, 2), 'utf8');
    return { message: 'Appointment deleted successfully' };
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

module.exports = {
  getAllAppointments,
  addAppointments,
  updateAppointment,
  deleteAppointment,
};