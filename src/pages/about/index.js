import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DiamondIcon from "@mui/icons-material/Diamond";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AboutSection from "@/components/about/aboutSection";

const featureArray = [
  {
    feature: "Feature 1",
    icon: <DiamondIcon />,
    content: "“When it’s time, we’re here.” “Taking action to craft a better you, for you.”",
  },
  {
    feature: "Feature 2",
    icon: <InsertChartIcon />,
    content: "“When it’s time, we’re here.” “Taking action to craft a better you, for you.”",
  },
  {
    feature: "Feature 3",
    icon: <DiamondIcon />,
    content: "“When it’s time, we’re here.” “Taking action to craft a better you, for you.”",
  },
];

const About = () => {
  return (
    <><Box
          sx={{
              padding: { xs: 2, sm: 4 },
              backgroundImage: "url(/aboutBackground.jpg)",
              backgroundSize: "cover", // Ensures the image covers the entire area
              backgroundPosition: "center", // Centers the image
              backgroundRepeat: "no-repeat", // Prevents tiling
              minHeight: "100vh", // Ensures the box takes up at least the full viewport height
          }}
      >
          {/* Heading */}
          <Box
              sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  color: "#333",
                  // padding: 2,
                  mt: "3%",
                  pl: 1,
                  pr: 2,
                  width: "fit-content",
                  // height: "200px", // Adjusted height
                  // textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 3,
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center", // Center text inside the box
              }}
          >
              <Typography
                  variant="h4"
                  sx={{
                      fontWeight: "bold",
                      color: "darkgreen",
                      //   mb: 2, 
                      textAlign: { xs: "center", md: "left" }, // Center on small screens
                  }}
              >
                  Welcome to Kairos Integrative Health
              </Typography>
          </Box>

          {/* Subheading */}
          <Typography
              variant="subtitle1"
              sx={{
                  color: "black",
                  fontWeight: "bold",
                  mb: 4,
                  textAlign: { xs: "center", md: "left" }, // Center on small screens
              }}
          >
              “When it’s time, we’re here.” <br />
              “Taking action to craft a better you, for you.”
          </Typography>

          {/* Grid for 4 Boxes */}
          <Grid container spacing={2} justifyContent="center">
              {/* First Box (Green) */}
              <Grid item xs={12} sm={6} md={3}>
                  <Box
                      sx={{
                          backgroundColor: "#66BB6A",
                          color: "#fff",
                          padding: 3,
                          textAlign: "left",
                          width: { xs: "100%", sm: "300px" }, // Full width on small screens
                          height: "auto",
                          boxShadow: 3,
                          fontWeight: "bold",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: 2,
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-10px)",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                          },
                      }}
                  >
                      <Typography
                          variant="h5"
                          sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
                      >
                          Why choose us?
                      </Typography>
                      <Typography
                          variant="subtitle1"
                          sx={{
                              color: "#fff",
                              fontSize: "0.9rem",
                              lineHeight: 1.5,
                              mb: 2,
                          }}
                      >
                          “When it’s time, we’re here.”
                          “Taking action to craft a better you, for you.”
                      </Typography>
                      <Box
                          sx={{
                              display: "flex",
                              justifyContent: "center",
                          }}
                      >
                          <Button
                              variant="contained"
                              size="small"
                              sx={{
                                  width: "fit-content",
                                  paddingLeft: 2,
                                  paddingRight: 2,
                                  borderRadius: "50px",
                                  textTransform: "capitalize",
                              }}
                              endIcon={<ArrowForwardIosIcon />}
                          >
                              Learn More
                          </Button>
                      </Box>
                  </Box>
              </Grid>

              {/* Transparent White Boxes */}
              {featureArray.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                      <Box
                          sx={{
                              backgroundColor: "rgba(255, 255, 255, 0.7)",
                              color: "#333",
                              padding: 2,
                              mt: "5%",
                              width: { xs: "100%", sm: "300px" },
                              height: "200px", // Adjusted height
                              textAlign: "center",
                              borderRadius: 2,
                              boxShadow: 3,
                              fontWeight: "bold",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center", // Center text inside the box
                              transition: "transform 0.3s ease, box-shadow 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-10px)",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                              },
                          }}
                      >
                          {feature.icon}
                          <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
                          >
                              {feature.feature}
                          </Typography>
                          <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
                              {feature.content}
                          </Typography>
                      </Box>
                  </Grid>
              ))}
          </Grid>

      </Box><AboutSection /></>
  );
};

export default About;
