import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography,useMediaQuery  } from '@mui/material';
import Image from "next/image";
import ContactForm from "@/components/Contact/contactForm";
import OfficeImageGallery from "@/components/Contact/officeImages";
import useUserStore from "@/components/useUserStore";
const Contact=()=>{
  const isSmallScreen = useMediaQuery("(max-width: 768px)"); // Adjust the breakpoint as needed
  const { preferedLocation, setPreferedLocation } = useUserStore();
return (
    <>
    
    <Box
  sx={{
    backgroundColor: `#ECE7E2`,
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
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on larger screens
      alignItems: "center",
      gap: { xs: 2, md: 4 }, // Adjusts the gap between elements based on screen size
      textAlign: { xs: "center", md: "left" }, // Center text on small screens, left-aligned on larger screens
      mt:2
    }}
  >
   <Box sx={{ flex: "1", display: "flex", justifyContent: "center" }}>
  <Image
    src="/Contact1.jpg"
    alt="Mental Well-being"
    layout="responsive" // Ensures the image is responsive
    width={200}  // Base width for layout calculations
    height={500} // Base height to maintain aspect ratio
    sx={{
      borderRadius: "8px", // Optional: Add rounded corners
      objectFit: "cover",  // Ensures the image scales proportionally
      width: "50%",       // Makes the image responsive and fills container width
      height: "calc(100vh - 200px)", // Adjust height relative to viewport
      maxHeight: "400px",  // Caps the maximum height to avoid oversized images
    }}
  />
</Box>



    <Box sx={{ flex: "2" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          color: "black",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Adjust font size based on screen size
        }}
      >
        Contact
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" ,textAlign:"left",color:"black"}, // Adjust font size for readability
        }}
      >
        {/* Have questions or need support?
        <br />
        We're here to help! Reach out to us for personalized assistance on your journey to wellness.
        <br /> */}
        Call us, email us, or fill out the form below, and we'll get back to you promptly. At Kairos Integrative Health, your well-being is our priority. Let’s connect and take the first step toward a healthier you!
      </Typography>
    </Box>
  </Box>
</Box>


<OfficeImageGallery/>

<Box
      sx={{
       
    backgroundColor: `#ECE7E2`,
        backgroundSize: 'cover', // Ensures the image scales to cover the container
        backgroundPosition: 'bottom', // Focuses on the bottom part of the image
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row', // Stack elements vertically on small screens
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4, // Adds padding around the content
        borderRadius: 2, // Optional: Adds rounded corners for a softer look
        height: 'auto', // Dynamically adjusts height to fit content
        width: '100%', // Ensures it spans the full width
        gap: isSmallScreen ? 2 : 2, // Adjust gap between elements on small screens
      }}
    >
      <Box
        sx={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          flexDirection: isSmallScreen ? 'column' : 'row', // Stack content vertically on small screens
          gap: isSmallScreen ? 2 : 4, // Adjust gap on small screens
        }}
      >
        <ContactForm />
        <GoogleMap />
      </Box>
    </Box>

</>);
}
export default Contact;