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
          Why people prefer us
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
                  Expertly Trained Therapists
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", color: "#0a0a0a" }}>
                  Use this space to talk about your company's history, background,
                  mission, or vision. Talk about your philosophy and how it
                  affected your company's trajectory.
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
                  Expertly Trained Therapists
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", color: "#0a0a0a" }}>
                  Use this space to talk about your company's history, background,
                  mission, or vision. Talk about your philosophy and how it
                  affected your company's trajectory.
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
                  Expertly Trained Therapists
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", color: "#0a0a0a" }}>
                  Use this space to talk about your company's history, background,
                  mission, or vision. Talk about your philosophy and how it
                  affected your company's trajectory.
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