import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography } from '@mui/material';
import Image from "next/image";
import ContactForm from "@/components/Contact/contactForm";
const Contact=()=>{
return (
    <>
    
    <Box
  sx={{
    backgroundImage: `url('/contactBackground.jpg')`,
    backgroundSize: 'cover', // Ensures the image covers the entire box
    backgroundPosition: 'top', // Focuses on the upper part of the image
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4, // Adds padding around the content
    borderRadius: 2, // Optional: Adds rounded corners for a softer look
    height: 'auto', // Dynamically adjusts height to fit content
    width: '100%', // Ensures it spans the full width
  }}
>
  {/* Content Section */}
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on larger screens
      alignItems: "center",
      gap: 4, // Adds spacing between items
    }}
  >
    {/* Left Side: Image */}
    <Box sx={{ flex: "1", display: "flex", justifyContent: "center" }}>
      <Image
        src="/Contact.png"
        alt="Mental Well-being"
        width={500} // Adjust as needed
        height={500}
        style={{ borderRadius: "8px" }} // Optional: Add rounded corners
      />
    </Box>

    {/* Right Side: Text */}
    <Box sx={{ flex: "2", textAlign: "left" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "black" }}>
        Contact
      </Typography>
      <Typography variant="body1">
        Have questions or need support?
        <br />
        We're here to help! Reach out to us for personalized assistance on your journey to wellness.
        <br />
        Call us, email us, or fill out the form below, and we'll get back to you promptly. At Kairos Integrative Health, your well-being is our priority. Let’s connect and take the first step toward a healthier you!
      </Typography>
    </Box>
  </Box>
</Box>



<Box
  sx={{
    backgroundImage: `url('/contactBackground2.jpg')`,
    backgroundSize: 'cover', // Ensures the image scales to cover the container
    backgroundPosition: 'bottom', // Focuses on the bottom part of the image
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4, // Adds padding around the content
    borderRadius: 2, // Optional: Adds rounded corners for a softer look
    height: 'auto', // Dynamically adjusts height to fit content
    width: '100%', // Ensures it spans the full width

}}
>
<Box sx={{ flex: "1", display: "flex", justifyContent: "center" }}>
    <ContactForm />
<GoogleMap />
</Box>
</Box>
</>);
}
export default Contact;