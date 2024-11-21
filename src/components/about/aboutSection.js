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
          VISION & MISSION
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "white", marginTop: 1 }}>
          Content of Vision and Mission ....
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
          backgroundColor: "lightgreen",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          ...(isStoryVisible && { opacity: 1, transform: "translateY(0)" }),
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginTop: 1 }}>
          OUR STORY
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "white", marginTop: 1 }}>
          This is our journey, tracing our path from the very beginning to where we stand today.
        </Typography>
      </Box>

      {/* HOW WE STARTED Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 4,
          backgroundColor: "green",
        }}
      >
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          {/* Left Column - Text Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "left", color: "white" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 2,
                }}
              >
                HOW WE STARTED
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "120%",
                  color: "white",
                  marginTop: 2,
                }}
              >
                I’ve always been drawn to thinking outside the box. While I can help
                individuals in therapy, I know that to truly bring change I need to
                reach more people. This prompted me to start creating short Instagram
                videos on topics like culture, parenting, gender, and education which
                are closely tied to mental health. People said they felt validated
                watching the content which encouraged me.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "120%",
                  color: "white",
                  marginTop: 3,
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
                }}
              >
                This showed me that there was a big need for professional support out
                there, and that’s the story of how The Friendly Couch was created. I am
                fortunate to have had Amod alongside me from the beginning. Together, we
                work to ensure that people get the professional support they deserve!
              </Typography>
            </Box>
          </Grid>

          {/* Right Column - Image with Irregular Border */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "300px",
                overflow: "hidden",
              }}
            >
              {/* Image with Irregular Border */}
              <Box
                sx={{
                  position: "absolute",
                  top: "-15px",
                  left: "-15px",
                  width: "calc(100% + 30px)",
                  height: "calc(100% + 30px)",
                  background: "linear-gradient(45deg, red, yellow, green, cyan)",
                  clipPath:
                    "polygon(0 10%, 10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%)",
                  zIndex: -1,
                  animation: "rotateBorder 6s infinite linear",
                }}
              />
              <img
                src="/founder.jpg"
                alt="Founder"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AboutSection;
