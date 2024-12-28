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
          alignItems: "left",
          flexDirection: "column",
          mb:2,
          // minHeight: "100vh",
          
            
        
          paddingX: { xs: 2, sm: 3, md: 5 }, // Responsive padding for mobile, tablet, and desktop
          marginTop: { xs: 4, sm: 6, md: 8 }, // Space at the top for smaller screens
        }}
      >
        <Typography
          ref={headingRef}
          variant="h4"
          className="heading" // Apply custom CSS class for transition
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#3b2311",
            fontSize: { xs: "24px", sm: "28px", md: "32px" }, // Responsive font size
          }}
        >
          Get to know us
        </Typography>

        <Grid
          container
          spacing={6}
          sx={{
            maxWidth: "100%", // Take full width
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
      <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                padding: "20px",
                textAlign: "left",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                borderRadius: 2,
                height:"100%",
                boxShadow: 2,
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
                We combine cutting-edge treatment with a warm, personal approach, offering evidence-based therapies while fostering long-lasting relationships with our patients.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                padding: "20px",
                textAlign: "left",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                borderRadius: 2,
                height:"100%",
                boxShadow: 2,
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
                Our practice makes mental health care convenient with online scheduling, secure messaging, and Telehealth services, making mental health support more accessible, efficient, and tailored to your busy lifestyle.
              </Typography>
            </Box>
          </Grid>

        
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                padding: "20px",
                textAlign: "left",
                height:"100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                borderRadius: 2,
                boxShadow: 2,
                
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
                Integrative psychiatry is an approach to mental health care that combines traditional psychiatric practices with alternative, complementary, and holistic therapies to treat the whole person's body, mind, and spirit.
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

export default PeoplePreferUs;
