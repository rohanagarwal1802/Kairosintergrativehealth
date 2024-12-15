import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DiamondIcon from "@mui/icons-material/Diamond";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AboutSection from "@/components/about/aboutSection";
import { useRouter } from "next/router";

const featureArray = [
  {
    feature: "Compassionate",
    icon: <DiamondIcon />,
    content: "Meeting you where you are and working together to craft a better you, for You!",
  },
  {
    feature: "Competent",
    icon: <InsertChartIcon />,
    content: "We provide evidence-based treatments tailored to create a holistic plan that supports your unique needs, helping you achieve your goals pland improve your overall well-being.",
  },
  {
    feature: "Centered",
    icon: <DiamondIcon />,
    content: "We take a grounded approach in bringing each individual back to their center, fostering self-awareness, and delivering compassionate, evidence-based care to guide them toward healing and personal growth within a supportive environment.",
  },
  {
    feature: "Clear",
    icon: <InsertChartIcon />,
    content: "We prioritize clarity and transparency with each individual we work with, providing a compassionate and approachable atmosphere that fosters a sense of community and trust in our mental health services.",
  },
  {
    feature: "Climbing",
    icon: <DiamondIcon />,
    content: "While we work to help our patients grow and heal, we are also dedicated to continuously improving ourselves. By evolving alongside the needs of our community, we strive to provide an even higher quality of care, ensuring a brighter, healthier future for all.",
  },
];

const About = () => {
    const router=useRouter()
  return (
    <>
    
    <Box
  sx={{
    padding: { xs: 2, sm: 4 },
    backgroundImage: "url(/about.jpg)",
    backgroundSize: "cover", // Ensures the image covers the entire area while maintaining aspect ratio
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents tiling
    minHeight: "fit-content", // Ensures the box takes up at least the full viewport height
  }}
>
  {/* Heading */}
  <Box
    sx={{
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      color: "#333",
      mt: "3%",
      pl: 1,
      pr: 2,
      width: "fit-content",
      borderRadius: 2,
      boxShadow: 3,
      fontWeight: "bold",
      display: "flex",
      flexDirection: "column",
    }}
  >
     <Typography
    variant="subtitle1"
    sx={{
      color: "green",
      fontWeight: "bold",
      mb: 1,
      mt: 1,
      fontSize:25,
      textAlign: { xs: "center", md: "left" }, // Center on small screens
    }}
  >
        “When it’s time, we’re here.” <br />
    </Typography>
    <Typography
    variant="subtitle1"
    sx={{
      color: "black",
      mb: 4,
      mt: 1,
      textAlign: { xs: "center", md: "left" }, // Center on small screens
    }}
  >
      
        Taking the first step toward seeking mental health care can feel overwhelming, and it’s completely normal to feel uncertain or uneasy about the process. At Kairos Integrative Health, we understand that reaching out for help is a big decision, and we’re here to support you each step of the way. Our team is dedicated to making your experience as comfortable and clear as possible.
    </Typography>
  </Box>

 

  {/* Grid for 4 Boxes */}
  <Grid container spacing={2} justifyContent="center">
    

    {/* Transparent White Boxes */}
{featureArray.map((feature, index) => (
  <Grid item xs={12} sm={6} md={4} key={index}>
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        color: "#333",
        padding: 2,
        mt: "5%",
        width: "100%", // Ensures full width on all screens
        height: 300, // Fixed height
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3,
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", // Centers text inside the box
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      {feature.icon}
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
        {feature.feature}
      </Typography>
      <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
        {feature.content}
      </Typography>
    </Box>
  </Grid>
))}

{/* First Box (Green) */}
<Grid item xs={12} sm={6} md={4}>
  <Box
    sx={{
      backgroundColor: "#66BB6A",
      color: "#fff",
      padding: 2,
      mt: "5%",
      width: "100%", // Ensures full width on all screens
      height: 300, // Fixed height
      textAlign: "center",
      borderRadius: 2,
      boxShadow: 3,
      fontWeight: "bold",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center", // Centers text inside the box
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      },
    }}
  >
       <Typography sx={{ color: "white", fontSize: "0.9rem",mb:"5%" }}>
      “When it’s time, we’re here.”
      <br />
      “Taking action to craft a better you, for you.”
    </Typography>
    
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        size="small"
        sx={{
          width: "fit-content",
          paddingLeft: 2,
          paddingRight: 2,
          borderRadius: "50px",
          textTransform: "capitalize",
        }}
        onClick={()=>router.push('/bookanappointment')}
        endIcon={<ArrowForwardIosIcon />}
      >
        Schedule Now
      </Button>
    </Box>
  </Box>
</Grid>

  </Grid>

</Box>

      
      <AboutSection /></>
  );
};

export default About;
