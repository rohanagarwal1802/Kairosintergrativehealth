import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

const CNSVSTESTINGPAGE = () => {
  return (

  
      <>
        {/* Background Section */}
       
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger screens
              justifyContent: "space-between",
              alignItems: "center",
              p: 4,
              gap: 2, // Space between elements
            }}
          >
            {/* Left Image Section for Small Screens (Top Image) and Large Screens (Left Image) */}
            <Box
              sx={{
                position: "relative",
                height: { xs: 250, sm: 350, md: 450 }, // Adjusted for responsiveness
                width: { xs: "100%", sm: 300, md: 400 }, // Full width for small screens, fixed size for large screens
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 1, sm: 0 }, // Image on top on small screens, left on larger screens
                mb: { xs: 3, sm: 0 }, // Margin for small screens to space from other elements
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
                src="/cnvs.jpeg"
                alt="Founder"
                sx={{
                  height: "70%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: 3,
                  zIndex: 1,
                }}
              />
            </Box>
          
            {/* Main Content Section */}
            <Box
              sx={{
                maxWidth: "500px",
                textAlign: "left",
                backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                order: { xs: 2, sm: 1 }, // Content comes after the first image on small screens
              }}
            >
              {/* Highlight Section */}
        <Box sx={{ p: 1, backgroundColor: "#DCEFEF", display: "inline-block", ml: "5%", mt: 3 }}>
          <Typography variant="body1" sx={{ color: "#043149", fontWeight: "bold" }}>
          CNS-VS Testing
          </Typography>
        </Box>
  
        {/* Content Section */}
        <Box>
         
  
          <Box sx={{ ml: "5%" ,mt:"5%"}}>
          <Typography variant="body2" sx={{ color: "black" }}>
          Central Nervous System (CNS) Vital Signs testing is a comprehensive assessment that evaluates cognitive functioning, neurological health, and overall brain performance. This testing measures various domains, including attention, memory, language, and processing speed, providing a detailed overview of cognitive abilities. By tracking changes in CNS function over time, healthcare providers can develop tailored treatment plans and monitor progress effectively.
          </Typography>
        </Box>
  
        
         
        </Box>
            </Box>
          
            {/* Right Image Section for Small Screens (Bottom Image) and Large Screens (Right Image) */}
            <Box
              sx={{
                position: "relative",
                height: { xs: 250, sm: 350, md: 450 }, // Adjusted for responsiveness
                width: { xs: "100%", sm: 300, md: 400 }, // Full width for small screens, fixed size for large screens
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 3, sm: 2 }, // Image on bottom for small screens, right for large screens
                mt: { xs: 3, sm: 0 }, // Margin for small screens to space from other elements
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
                src="/cnvs2.jpeg"
                alt="Founder"
                sx={{
                  height: "70%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: 3,
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
      
  
       
      </>
    );
  
  
};

export default CNSVSTESTINGPAGE;
