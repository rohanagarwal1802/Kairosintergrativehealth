import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar, Grid,Divider } from "@mui/material";

// Fade-in hook using Intersection Observer
const useFadeInOnScroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { isVisible, elementRef };
};

const AboutSection = () => {
  const { isVisible: isAboutVisible, elementRef: aboutRef } = useFadeInOnScroll();
  const { isVisible: isVisionVisible, elementRef: visionRef } = useFadeInOnScroll();
  const { isVisible: isStoryVisible, elementRef: storyRef } = useFadeInOnScroll();

  return (
    <>
      {/* About Section */}
      {/* <Box
        ref={aboutRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          textAlign: "center",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          ...(isAboutVisible && { opacity: 1, transform: "translateY(0)" }), // Fade-in effect
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "300px",
            height: "300px",
            borderRadius: "70%",
            overflow: "visible",
            "&::after": {
              content: '""',
              position: "absolute",
              top: "-8px",
              left: "-8px",
              width: "calc(100% + 16px)",
              height: "calc(100% + 16px)",
              background: "linear-gradient(45deg, #98BF64, #028A0F, green, #32612D)",
              borderRadius: "70%",
              animation: "morphBorder 4s infinite linear",
              zIndex: -1,
            },
          }}
        >
          <Avatar src="/profile.jpg" alt="Profile Picture" sx={{ width: "100%", height: "100%" }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 3 }}>
          Mark Merritt
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "gray", marginTop: 1 }}>
          Lead Physiotherapist
        </Typography>

        <Typography variant="body1" sx={{ color: "#555", marginTop: 1 }}>
          BPT, MPT (Orthopedics), Certified Dry Needling Specialist
        </Typography>
      </Box> */}

 {/* HOW WE STARTED Section */}
 <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 4,
          backgroundColor: "#66BB6A",
        }}
      >
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          {/* Left Column - Text Content */}
          <Grid item xs={12} md={12}>
            <Box sx={{ textAlign: "center", color: "white" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 2,
                  align:"center",
                  fontSize:"100%"
                }}
              >
                Executive Summary
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "80%",
                  color: "white",
                  marginTop: 2,
                  textAlign:"left"
                }}
              >
                 

                 : As the healthcare industry continues to adopt a more streamlined model, Kairos Integrative Health takes a different approach. Our approach prioritizes the needs of both our patients and our providers. KIH offers our community access to high-quality, timely, and evidence-based care while also striving to empower our providers to focus on what truly matters: delivering patient-centered care, free from the constraints of streamlined practices. 
                 Our belief is simple by placing patient care at the forefront and supporting our providers, we create a sustainable, healing environment that benefits everyone.
              </Typography>

             
            </Box>
          </Grid>

         
        </Grid>
      </Box>
      <Divider sx={{color:"white"}}/>
      {/* Vision & Mission Section */}
      <Box
        ref={visionRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          textAlign: "center",
          backgroundColor: "#66BB6A",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          ...(isVisionVisible && { opacity: 1, transform: "translateY(0)" }),
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginTop: 1,fontSize:"100%" }}>
        Mission Statement
        </Typography>
        <Typography variant="text" sx={{ color: "white", marginTop: 1 ,fontSize:"80%"}}>
  Our mission is to deliver{" "}
 comprehensive and{" "}
integrativemental health services that empower individuals and strengthen the resilience of our{" "}
 community. By prioritizing holistic care and fostering enduring patient-provider relationships, we aim to become a trusted pillar of support in our community, improving quality of life and promoting mental wellness for all.

 </Typography>
      </Box>
      <Divider sx={{color:"white"}}/>
      {/* Our Story Section */}
      <Box
        ref={storyRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          textAlign: "center",
          backgroundColor: "#66BB6A",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          ...(isStoryVisible && { opacity: 1, transform: "translateY(0)" }),
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginTop: 1,fontSize:"100%" }}>
        Vision
        </Typography>
        <Typography variant="text" sx={{ color: "white", marginTop: 1 ,fontSize:"80%"}}>
        Our{" "} vision is to be a recognized and{" "} 
       
       trusted leader in the community, providing accessible, integrative mental health care that prioritizes open communication, holistic treatment, and efficient, personalized care. We aspire to be the go-to resource for individuals seeking a comprehensive approach to mental well-being, while also empowering healthcare providers to practice with autonomy,and in alignment with their patients' best interests.
</Typography>

       
      </Box>

     
    </>
  );
};

export default AboutSection;
