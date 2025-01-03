import { deleteAppointment } from "../../../lib/models/appointmentOperations";
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Expecting an array of id in the request body
        const { id } = req.body;
  console.log(id)
        // Ensure id is an array and not empty
        if (!id) {
          return res.status(400).json({ error: 'Please provide an id.' });
        }
  
        // Call the deleteAppointment function
        const result = await deleteAppointment(id);
  
        // Respond with success
        return res.status(200).json(result);
      } catch (error) {
        console.error('Error in deleting appointment:', error);
        return res.status(500).json({ error: 'Failed to delete appointment.' });
      }
    } else {
      // Method not allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }