import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const RoundTable = () => {
  return (
    <>
   <Box
  sx={{
    display: "flex",
    flexDirection: "row", // Horizontal layout
    justifyContent: "space-between",
    alignItems: "center",
    p: 4,
  }}
>
  {/* Image Section */}
  <Box
    sx={{
      position: "relative",
      height: { xs: 300, sm: 400, md: 500 }, // Responsive height
      width: { xs: 300, sm: 400, md: 500 }, // Responsive width
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* Decorative Boxes */}
    <Box
      sx={{
        position: "absolute",
        top: "8%",
        left: "-15%",
        width: "80%",
        height: "35%",
        backgroundColor: "#66BB6A",
        zIndex: -1,
        borderRadius: 2,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: "15%",
        left: "-5%",
        width: "10%",
        height: "20%",
        backgroundImage: "radial-gradient(white 10%, transparent 10%)",
        backgroundSize: "10px 10px",
        zIndex: -1,
        borderRadius: 1,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: "8%",
        right: "5%",
        width: "60%",
        height: "50%",
        backgroundColor: "#66BB6A",
        zIndex: -1,
        borderRadius: 2,
      }}
    />
    {/* Image */}
    <Box
      component="img"
      src="/RRImage2.jpg"
      alt="Founder"
      sx={{
        height: "70%",
        width: "70%",
        objectFit: "cover",
        borderRadius: 2,
        boxShadow: 3,
        zIndex: 1,
      }}
    />
  </Box>

 {/* Text Section */}
<Box
  sx={{
    ml: 4,
    maxWidth: "500px",
    textAlign: "left",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
    p: 3, // Padding for spacing
    borderRadius: 2, // Rounded corners
    boxShadow: 3, // Subtle shadow for depth
  }}
>
  <Typography variant="h4" sx={{ mb: 2, color: "black", fontWeight: 600 }}>
  Resilience Roundtable
  </Typography>
  <Typography variant="body1" sx={{ color: "text.secondary", fontSize: 16 }}>
  At our clinic, we offer{" "} <strong>Resilience Roundtable</strong>, a once per month virtual
educational session designed to address a wide variety of mental health topics in a
safe and anonymous space. The idea for this program came from{" "}<strong> Mark’s
recognition of the significant gap in mental health education within the
community.</strong>
  </Typography>
</Box>

  <Box
    sx={{
      position: "relative",
      height: { xs: 300, sm: 400, md: 500 }, // Responsive height
      width: { xs: 300, sm: 400, md: 500 }, // Responsive width
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* Decorative Boxes */}
    <Box
      sx={{
        position: "absolute",
        top: "8%",
        left: "-15%",
        width: "80%",
        height: "35%",
        backgroundColor: "#66BB6A",
        zIndex: -1,
        borderRadius: 2,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: "15%",
        left: "-5%",
        width: "10%",
        height: "20%",
        backgroundImage: "radial-gradient(white 10%, transparent 10%)",
        backgroundSize: "10px 10px",
        zIndex: -1,
        borderRadius: 1,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: "8%",
        right: "5%",
        width: "60%",
        height: "50%",
        backgroundColor: "#66BB6A",
        zIndex: -1,
        borderRadius: 2,
      }}
    />
    {/* Image */}
    <Box
      component="img"
      src="/RRImage1.jpg"
      alt="Founder"
      sx={{
        height: "70%",
        width: "70%",
        objectFit: "cover",
        borderRadius: 2,
        boxShadow: 3,
        zIndex: 1,
      }}
    />
  </Box>
</Box>

<Box
  sx={{
    backgroundImage: `url('/fdBackground.jpg')`,
    backgroundSize: 'cover', // Ensures the image covers the entire box
    backgroundPosition: 'center', // Center the image for a balanced focus
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: 3, // Responsive padding for mobile and desktop
    borderRadius: 2, // Adds rounded corners
    width: '100%', // Full-width container
    mt:-2,
    minHeight: 'auto', // Full viewport height for a grand feel
  }}
>
  <Box
    sx={{
      width: { xs: '95%', md: '70%' }, // Adjust width for responsiveness
      margin: 'auto',
    //   mt: { xs: 3, md: 6 }, // Adjust top margin
      p: { xs: 3, md: 4 }, // Padding for content
      borderRadius: 3, // More pronounced rounded corners
      boxShadow: 6, // Slightly stronger shadow for depth
      bgcolor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white background
      border: '1px solid #ddd', // Subtle border
    }}
  >
   

    <Typography
      variant="body1"
      sx={{
        color: '#555',
        lineHeight: 1.8,
        fontSize: { xs: '14px', md: '16px' }, // Scalable font size
        mb: 3,
        textAlign: 'justify', // Better readability
      }}
    >
      As a dedicated mental health professional, Mark saw firsthand how a lack of
      accessible, evidence-based information often leads to misunderstanding and stigma
      surrounding mental health issues. Driven by a passion to bridge this gap, the
      Resilience Roundtable was created to offer practical, expert-driven discussions on
      topics ranging from “Neuroreceptors and their role in mental health” to “Mental
      Health in the family: Genetics and cross-generational language.” These sessions
      provide individuals with valuable insights and tools to enhance their mental
      well-being, all while maintaining privacy and anonymity.
    </Typography>

    <Typography
      variant="body1"
      sx={{
        color: '#555',
        lineHeight: 1.8,
        fontSize: { xs: '14px', md: '16px' },
        textAlign: 'justify',
      }}
    >
      We believe that by fostering open, informed conversations, we can empower people
      to take control of their mental health and build resilience for the challenges ahead.
    </Typography>
  </Box>
</Box>

       
       </>
  );
};

export default RoundTable;
 