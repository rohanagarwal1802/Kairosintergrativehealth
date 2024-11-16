import axios from "axios";

const BASE_URL=`${process.env.HOST}/api/reviews`


export default async function handler(req, res) {
  try {
    if(req.method!=='GET')
    {
        return res.status(401).json({message:"Method not allowed"})
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: BASE_URL,
    };

    const response = await axios.request(config);

    // Send the response after processing
    res.status(response.status).send(response.data);
  } catch (error) {
    
    console.log("Error in register partner", error);
    // Send an error response if something goes wrong
    res.status(500).send("Internal Server Error");
  }
}