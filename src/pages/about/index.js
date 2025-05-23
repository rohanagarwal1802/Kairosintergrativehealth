import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DiamondIcon from "@mui/icons-material/Diamond";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AboutSection from "@/components/about/aboutSection";
import { useRouter } from "next/router";
import useUserStore from "@/components/useUserStore";

const featureArray = [
  {
    feature: "Compassionate ",
    icon: <DiamondIcon />,
    content: "We meet you where you are, with the understanding that life is difficult at times and work together to develop a path for you to reach your goals.",
  },
  {
    feature: "Competent",
    icon: <InsertChartIcon />,
    content: "We provide evidence-based treatment plans that support your unique needs, helping you achieve your goals and improve your overall well-being.",
  },
  {
    feature: "Centered",
    icon: <DiamondIcon />,
    content: "We take a grounded approach in bringing each individual back to their center, fostering self-awareness while guiding them toward healing and personal growth in a supportive environment.",
  },
  {
    feature: "Clear",
    icon: <InsertChartIcon />,
    content: "We prioritize clarity and transparency with each individual we work with, providing an approachable atmosphere that fosters community and trust in our mental health services.",
  },
  {
    feature: "Climbing",
    icon: <DiamondIcon />,
    content: "While we work to help our patients grow and heal, we are also dedicated to continuously improving ourselves. By evolving alongside the needs of our community, we strive to provide an even higher quality of care, ensuring a brighter, healthier future for all.",
  },
];

const About = () => {
    const router=useRouter()
      const {preferedLocation}=useUserStore()
      const locationLink={
  Alabama:"https://practice.kareo.com/kih",
  "North Carolina":"https://practice.kareo.com/kihnc"
}
  return (
    <>
    
    <Box
  sx={{
    padding: { xs: 2, sm: 4 },
    backgroundColor: "#C8AF8F",
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
      color: "#6F7863",
      fontWeight: "bold",
      mb: 1,
      mt: 1,
      fontSize:25,
      textAlign: { xs: "center", md: "center" }, // Center on small screens
    }}
  >
        About Kairos Integrative Health (KIH) <br />
    </Typography>
    <Typography
    variant="subtitle1"
    sx={{
      color: "black",
      mb: 4,
      mt: 1,
      textAlign: { xs: "center", md: "center" }, // Center on small screens
    }}
  >
      
        Taking the first step toward seeking mental health care can feel overwhelming, and it’s completely normal to feel uncertain or uneasy about the process. At Kairos Integrative Health, we understand that reaching out for help is a big decision, and we’re here to support you each step of the way. Our team is dedicated to making your experience as comfortable and clear as possible.
    </Typography>
  </Box>

 

  {/* Grid for 4 Boxes */}
  <Grid container spacing={2} justifyContent="center">

{/* First Row (3 items) */}
{featureArray.slice(0, 3).map((feature, index) => (
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
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#6F7863" }}>
        {feature.feature}
      </Typography>
      <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
        {feature.content}
      </Typography>
    </Box>
  </Grid>
))}

{/* Second Row (2 items) */}
<Grid container spacing={2} justifyContent="center" alignItems="center">

  {/* Second Row (2 items) */}
  {featureArray.slice(3, 5).map((feature, index) => (
    <Grid item xs={12} sm={4} md={4} key={index}>
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
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#6F7863" }}>
          {feature.feature}
        </Typography>
        <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
          {feature.content}
        </Typography>
      </Box>
    </Grid>
  ))}

</Grid>

<Grid item xs={12} sm={4} md={4}></Grid>
{/* Third Row (1 item) */}
<Grid container spacing={2} justifyContent="center" alignItems="center">
{featureArray.slice(5, 6).map((feature, index) => (
  <Grid item xs={12} sm={6} md={6} key={index}>
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
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#6F7863" }}>
        {feature.feature}
      </Typography>
      <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
        {feature.content}
      </Typography>
    </Box>
  </Grid>
))}
</Grid>

{/* First Box (#535945) */}
<Grid item xs={12} sm={6} md={3}>
<Box
      sx={{
        backgroundColor: "#2A3923",
        color: "#535945",
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
    <Typography sx={{ color: "white", fontSize: "0.9rem", mb: "5%" }}>
      “When it’s time, we’re here.”
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
          backgroundColor: "#C8AF8F",
        }}
        onClick={() =>    window.open(locationLink[preferedLocation], "_blank", "noopener,noreferrer")}
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