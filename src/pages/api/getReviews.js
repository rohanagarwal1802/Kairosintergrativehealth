import { getPrivateReviews } from "../../../lib/models/ClientReview";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }




    

  if (!getPrivateReviews) {
    return res.status(500).json({ error: "getPrivateReviews function not found." });
  }


  try {
    const result = await getPrivateReviews();
    return res.status(200).json({
      message: "Message Retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding message:", error.message);
    return res.status(500).json(
     "Internal Server Error" 
    );
  }
}
