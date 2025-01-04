import { sendEmail } from "../../../lib/models/sendMail";
import createBulkEmails from "../../../lib/createBulkEmails";

// const sendMail=()=>{
//      const mailBody = {
//           ...newApiKey.dataValues,
//           associated_partner_name: PartnerName[0]?.username,
//           associated_partner_email: PartnerName[0]?.email,
//           key: api_key, // Unmasked key for email purposes
//         };
    
//         console.log("newApiKey ==>", newApiKey);
       
//         const renewTemp = await createBulkEmails(
//           [mailBody],
//           "renew_api_mail_template"
//         );
    
//         // Configure the email request
//         const config = {
//           method: "post",
//           maxBodyLength: Infinity,
//           url: "https://bm8ghuf7sa.execute-api.ap-south-1.amazonaws.com/sgx-send-email",
//           headers: { "Content-Type": "application/json" },
//           data: { emails: reason === "create" ? [...temp7] : [...renewTemp] },
//         };
    
//         // Send email request
//          axios.request(config);
//   }
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }




    

  if (!sendEmail) {
    return res.status(500).json({ error: "sendEmail function not found." });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid input data. Expected a JSON object." });
  }
const {template}=req.body
if( !template)
{
    return res.status(404).json({ error: "Required credentials not provided" });
}
  try {
    console.log("Request Body:", req.body);
    const temp = await createBulkEmails([req.body], template);
    console.log("temp values",temp)
    for (const item of temp) { // Loop directly over elements in temp array
      const { email, subject, body } = item; // Destructure each item
      const result = await sendEmail(subject, body, email); // Await the asynchronous sendEmail function
      console.log(result); // Optionally log the result if needed
    }
    return res.status(200).json({
      message: "Email sent successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error sending mail:", error.message);
    return res.status(500).json({
      error: process.env.NODE_ENV === "production" 
        ? "Internal Server Error" 
        : error.message,
    });
  }
}
