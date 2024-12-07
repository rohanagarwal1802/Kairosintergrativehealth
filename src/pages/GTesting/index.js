import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const GeneticTestingPage = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", p: 4 }}>
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, sm: 400, md: 500 },
          width: { xs: 300, sm: 400, md: 500 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: { xs: 0, md:-10 }, // Move image to the left
          mr: { xs: 2, md: 25 }, // Add right margin to give space between image and text
        }}
      >
        {/* #66BB6A Decorative Boxes Behind Image */}
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
            boxShadow: 4,
          }} 
        />
        
        {/* Dotted Box */}
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
          src="/founder.jpg"
          alt="Founder"
          sx={{
            height: "70%",
            width: "70%",
            objectFit: "cover",
            borderRadius: 2,
            boxShadow: 6,
            zIndex: 1,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }} 
        />
      </Box>

      {/* Text Section */}
      <Stack
        sx={{
          ml: { xs: 0, md: 4 },
          mt: { xs: 4, md: 0 },
          justifyContent: "center",
          maxWidth: "500px",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: "#333", fontWeight: 600 }}>
          Genetic Testing
        </Typography>
        
        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: 16, lineHeight: 1.7 }}>
          In psychiatry, we utilize a form of genetic testing that analyzes specific
          genes related to mental health medications. This tool can be helpful in
          determining treatment options for individuals. By assessing how a person&#39;s
          genetic makeup affects their response to various psychiatric medications, genetic
          testing can help clinicians select medications that are more likely to be effective
          and have fewer side effects. This personalized approach aims to enhance treatment
          outcomes and reduce the trial-and-error process often associated with psychiatric
          care. Ultimately, genetic testing used at Kairos Integrative Health is a tool
          to empower patients and providers to make informed decisions about medication
          management, leading to more tailored and effective mental health treatment.
        </Typography>
      </Stack>
    </Box>
  );
};

export default GeneticTestingPage;
