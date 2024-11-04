import axios from "axios";
// import jwt from "jsonwebtoken";

const BASE_URL=`${process.env.HOST}/api/register_patients`


export default async function handler(req, res) {
  try {
    if(req.method!=='POST')
    {
        return res.status(401).json({message:"Method not allowed"})
    }

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: BASE_URL,
      data:req.body
    };

    const response = await axios.request(config);

    // Send the response after processing
    res.status(response.status).send(response.data);
  } catch (error) {
    if(error.status===400)
    {
      res.status(error.status).send(error.data);
      return
    }
    console.log("Error in register partner", error);
    // Send an error response if something goes wrong
    res.status(500).send("Internal Server Error");
  }
}