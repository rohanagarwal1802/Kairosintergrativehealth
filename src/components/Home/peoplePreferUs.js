import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { Typography, Grid, Box } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

 function PeoplePreferUs() {
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
      // Trigger animation on page load
      headingRef.current.classList.add("visible");
    }

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  return (
    <>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Typography
          ref={headingRef}
          variant="h4"
          className="heading" // Apply custom CSS class for transition
          sx={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#3b2311",
          }}
        >
          Get to know us
        </Typography>

        <Grid
          container
          spacing={6}
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingX: "16px",
            justifyContent: "center",
          }}
        >
         
            <Grid item xs={12} sm={6} md={3} >
              <Box
                elevation={2}
                sx={{
                  padding: "20px",
                  textAlign: "left",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    marginBottom: "15px",
                    backgroundColor: "green",
                    borderRadius: "50%",
                    padding: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HealthAndSafetyIcon sx={{ color: "#0a0a0a" }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a0a0a" }}>
                Integrative Psychiatry 
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", color: "#0a0a0a" }}>
                Integrative psychiatry is an approach to mental health care that combines traditional psychiatric practices with alternative, complementary, and holistic therapies to treat the whole person—body, mind, and spirit. It aims to address not only the symptoms of mental health conditions but also the root causes, considering the interplay between psychological, biological, emotional, and environmental factors.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
              <Box
                elevation={2}
                sx={{
                  padding: "20px",
                  textAlign: "left",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    marginBottom: "15px",
                    backgroundColor: "green",
                    borderRadius: "50%",
                    padding: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HealthAndSafetyIcon sx={{ color: "#0a0a0a" }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a0a0a" }}>
                Convenience 
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", color: "#0a0a0a" }}>
                Our clinic makes mental health care convenient with online scheduling, allowing you to book appointments without calling. Secure messaging improves communication with your provider, and Telehealth services offer flexible, remote access to care from home. We're dedicated to making mental health support accessible, efficient, and tailored to your busy lifestyle.

                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
              <Box
                elevation={2}
                sx={{
                  padding: "20px",
                  textAlign: "left",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    marginBottom: "15px",
                    backgroundColor: "green",
                    borderRadius: "50%",
                    padding: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HealthAndSafetyIcon sx={{ color: "#0a0a0a" }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a0a0a" }}>
                Culture 
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", color: "#0a0a0a" }}>
                Our practice combines cutting-edge treatment with a warm, personal approach. We offer evidence-based therapies while fostering long-lasting relationships built on trust and genuine care with out patients. Our providers take the time to understand each patient’s unique needs, ensuring comprehensive support in a welcoming, approachable environment. We're dedicated to both advanced care and creating a comforting, lasting connection.

                </Typography>
              </Box>
            </Grid>
        </Grid>
      </Box>

      <style jsx>{`
        .heading {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .heading.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
export default PeoplePreferUs