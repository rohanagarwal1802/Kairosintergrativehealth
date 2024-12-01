import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar, Grid } from "@mui/material";

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
      <Box
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
        {/* Animated Image */}
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

        {/* Name */}
        <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 3 }}>
          Mark Merritt
        </Typography>

        {/* Designation */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "gray", marginTop: 1 }}>
          Lead Physiotherapist
        </Typography>

        {/* Qualifications */}
        <Typography variant="body1" sx={{ color: "#555", marginTop: 1 }}>
          BPT, MPT (Orthopedics), Certified Dry Needling Specialist
        </Typography>
      </Box>

 {/* HOW WE STARTED Section */}
 <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 4,
          backgroundColor: "#01796F",
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
                  align:"center"
                }}
              >
                Executive Summary
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "120%",
                  color: "white",
                  marginTop: 2,
                  textAlign:"left"
                }}
              >
                 

After years of experience in both inpatient and outpatient corporate healthcare organizations, our founder, Mark, recognized that the pressure to meet quotas and benchmarks often compromised the quality of care he could provide to his patients. As the healthcare industry continues to adopt a more corporate model, Kairos Integrative Health takes a different approach—one that prioritizes the needs of both patients and healthcare providers. Our clinic offers the community access to high-quality, timely, and evidence-based care. Furthermore, we strive to empower our providers to focus on what truly matters: delivering patient-centered care, free from the constraints of corporate structures. At Kairos Integrative Health, we believe that by placing patient care at the forefront and supporting our providers, we can create a healing environment that benefits everyone.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "120%",
                  color: "white",
                  marginTop: 3,
                  textAlign:"left"
                }}
              >
                At the same time, I was working as a psychologist, and my schedule
                filled up very quickly. I hired a few therapists so I could connect
                people to them, and even their slots got full.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "120%",
                  color: "white",
                  marginTop: 3,
                  textAlign:"left"
                }}
              >
                This showed me that there was a big need for professional support out
                there, and that’s the story of how The Friendly Couch was created. I am
                fortunate to have had Amod alongside me from the beginning. Together, we
                work to ensure that people get the professional support they deserve!
              </Typography>
            </Box>
          </Grid>

         
        </Grid>
      </Box>
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
          backgroundColor: "green",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          ...(isVisionVisible && { opacity: 1, transform: "translateY(0)" }),
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginTop: 1 }}>
        Mission Statement
        </Typography>
        <Typography variant="text" sx={{ color: "white", marginTop: 1 }}>
  Our mission is to deliver{" "}
  <Typography component="span" sx={{ fontWeight: "bold" ,color:"white"}}>comprehensive</Typography> and{" "}
  <Typography component="span" sx={{ fontWeight: "bold",color:"white" }}>integrative</Typography> mental health services that empower individuals and strengthen the resilience of our{" "}
  <Typography component="span" sx={{ fontWeight: "bold" ,color:"white"}}>community</Typography>. By prioritizing holistic care and fostering enduring patient-provider relationships, we aim to become a trusted pillar of support in our community, improving quality of life and promoting mental wellness for all.
</Typography>

      </Box>

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
          backgroundColor: "#01796F",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          ...(isStoryVisible && { opacity: 1, transform: "translateY(0)" }),
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginTop: 1 }}>
        Vision
        </Typography>
        <Typography variant="text" sx={{ fontWeight: "text", color: "white", marginTop: 1 }}>
        Our{" "}  <Typography component="span" sx={{ fontWeight: "bold" ,color:"white"}}>vision</Typography> is to be a recognized and{" "} 
        <Typography component="span" sx={{ fontWeight: "bold" ,color:"white"}}>trusted leader</Typography> in the community, providing accessible, integrative mental health care that prioritizes open communication, holistic treatment, and efficient, personalized care. We aspire to be the go-to resource for individuals seeking a comprehensive approach to mental well-being, while also empowering healthcare providers to practice with autonomy, free from corporate constraints, and in alignment with their patients' best interests.


        </Typography>
      </Box>

     
    </>
  );
};

export default AboutSection;
