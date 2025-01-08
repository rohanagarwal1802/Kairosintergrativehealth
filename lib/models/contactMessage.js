const fs = require('fs/promises');
const path = require('path');

// Adjust the file path to point to the `json` folder outside the current folder
const filePath = path.resolve(process.cwd(), "lib/json/contactMessages.json");

// Read all messages from the JSON file
const getAllMessages = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data); // Parse JSON string into an array
  } catch (error) {
    console.error('Error reading messages:', error);
    throw error;
  }
};

// Add a new Message to the JSON file
const addMessage = async (newMessage) => {
  try {
    const messages = await getAllMessages();
    const id = messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;
    const messagewithID = { id, ...newMessage, created_at: new Date() };
    messages.push(messagewithID);

    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf8');
    return messagewithID;
  } catch (error) {
    console.error('Error adding Message:', error);
    throw error;
  }
};

// Update an existing Message
const updateMessage = async (id, updatedData) => {
  try {
    const messages = await getAllMessages();
    const index = messages.findIndex((Message) => Message.id === id);

    if (index === -1) throw new Error('Message not found');

    messages[index] = { ...messages[index], ...updatedData, updatedAt: new Date() };

    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf8');
    return messages[index];
  } catch (error) {
    console.error('Error updating Message:', error);
    throw error;
  }
};

// Delete a Message
const deleteMessage = async (ids) => {
  try {
    const messages = await getAllMessages();
    const filteredMessages = messages.filter((Message) => !ids.includes(Message.id));

    // const filteredReviews = reviews.filter((review) => !ids.includes(review.id));
    await fs.writeFile(filePath, JSON.stringify(filteredMessages, null, 2), 'utf8');
    return { message: 'Message deleted successfully' };
  } catch (error) {
    console.error('Error deleting Message:', error);
    throw error;
  }
};

module.exports = {
  getAllMessages,
  addMessage,
  updateMessage,
  deleteMessage,
};
