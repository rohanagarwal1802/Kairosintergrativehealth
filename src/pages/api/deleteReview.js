import { deleteReview } from "../../../lib/models/ClientReview";
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Expecting an array of ids in the request body
        const { ids } = req.body;
  console.log(ids)
        // Ensure ids is an array and not empty
        if (!Array.isArray(ids) || ids.length === 0) {
          return res.status(400).json({ error: 'Invalid input. Please provide an array of ids.' });
        }
  
        // Call the deleteReview function
        const result = await deleteReview(ids);
  
        // Respond with success
        return res.status(200).json(result);
      } catch (error) {
        console.error('Error in deleting reviews:', error);
        return res.status(500).json({ error: 'Failed to delete reviews.' });
      }
    } else {
      // Method not allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }