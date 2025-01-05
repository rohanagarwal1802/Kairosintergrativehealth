import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

const GeneticTestingPage = () => {
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
              backgroundColor:"#Ece7E2",
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
                  backgroundColor: "#6F7863",
                 zIndex:1,
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
                 zIndex:2,
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
                  backgroundColor: "#6F7863",
                 zIndex:1,
                  borderRadius: 2,
                }}
              />
              {/* Image */}
              <Box
                component="img"
                src="/Gtest.jpeg"
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
          
            {/* Main Content Section */}
            <Box
              sx={{
                maxWidth: "500px",
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                zIndex:2,
                order: { xs: 2, sm: 1 }, // Content comes after the first image on small screens
              }}
            >
              {/* Highlight Section */}
        <Box sx={{ p: 1, backgroundColor: "#535945", display: "inline-block", ml: "5%", mt: 3,textAlign:"center" }}>
          <Typography variant="body1" sx={{ color: "white", fontWeight: "bold",alignItems:"center" }}>
          Genetic Testing
          </Typography>
        </Box>
  
        {/* Content Section */}
        <Box>
         
  
          <Box sx={{ ml: "5%" ,mt:"5%"}}>
          <Typography variant="body2" sx={{ color: "black",textAlign:"left" }}>
          In psychiatry, we utilize genetic testing to analyze specific
            genes related to mental health medications. This tool can be helpful in
            determining treatment options for individuals. By assessing how a person's
            genetic makeup affects their response to various psychiatric medications, genetic
            testing can help clinicians select medications that are more likely to be effective
            and have fewer side effects. This personalized approach aims to enhance treatment
            outcomes and reduce the trial-and-error process often associated with psychiatric
            care. Ultimately, genetic testing used at Kairos Integrative Health is a tool
            to empower patients and providers to make informed decisions about medication
            management, leading to more tailored and effective mental health treatment.
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
                  backgroundColor: "#6F7863",
                 zIndex:1,
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
                 zIndex:1,
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
                  backgroundColor: "#6F7863",
                 zIndex:1,
                  borderRadius: 2,
                }}
              />
              {/* Image */}
              <Box
                component="img"
                src="/Gtest2.jpeg"
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
      
  
       
      </>
    );
  
  
};

export default GeneticTestingPage;
