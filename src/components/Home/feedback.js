import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { Typography, Grid, Box } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import StarIcon from '@mui/icons-material/Star';

 function FeedbackClients() {
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
          Feedback from our clients
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
                 <Box display="flex">
      {[...Array(5)].map((_, index) => (
        <StarIcon  sx={{ color: "yellow" }} />
      ))}
    </Box>
               
                <Typography variant="body2" sx={{ marginTop: "10px", color: "#0a0a0a" }}>
                  Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a0a0a" ,mt:2}}>
                  Elvira Montanez
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
                 <Box display="flex">
      {[...Array(5)].map((_, index) => (
        <StarIcon  sx={{ color: "yellow" }} />
      ))}
    </Box>
               
                <Typography variant="body2" sx={{ marginTop: "10px", color: "#0a0a0a" }}>
                  Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a0a0a" ,mt:2}}>
                  Elvira Montanez
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
                 <Box display="flex">
      {[...Array(5)].map((_, index) => (
        <StarIcon  sx={{ color: "yellow" }} />
      ))}
    </Box>
               
                <Typography variant="body2" sx={{ marginTop: "10px", color: "#0a0a0a" }}>
                  Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a0a0a" ,mt:2}}>
                  Elvira Montanez
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
export default FeedbackClients