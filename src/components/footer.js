import React from "react";
import { Box, Typography, Container, IconButton, Link } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Phone, Email } from "@mui/icons-material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ServicesOptions from "./servicesDropdown";
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  const servicesOptions = ServicesOptions();

  return (
    <Box>
      {/* Wide Box Above Footer */}
      <Box
        sx={{
          backgroundColor: "rgba(29,39,56, 1)",
          color: "#FFFFFF",
          padding: "20px 0",  // Reduced padding
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0 10px",  // Reduced padding
              flexWrap: "wrap",
              gap: "16px",  // Reduced gap between sections
              "@media (max-width: 900px)": {
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
              },
            }}
          >
            {/* Logo and Social Media Links */}
            <Box sx={{ textAlign: "center", flex: 1 }}>
              <img
                src="/images/logo.jpg"
                alt="Kairos Integrative Health Logo"
                style={{ width: "80px", height: "auto" }}  // Smaller logo
              />
              <Box
                sx={{
                  display: "flex",
                  gap: "12px",  // Reduced gap between icons
                  marginTop: "8px",  // Reduced margin-top
                  justifyContent: "center",
                }}
              >
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/saahil2109"
                  target="_blank"
                  color="inherit"
                  sx={{ fontSize: "small" }}  // Smaller icon size
                >
                  <XIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.instagram.com/hippiebull"
                  target="_blank"
                  color="inherit"
                  sx={{ fontSize: "small" }}
                >
                  <Instagram fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.facebook.com"
                  target="_blank"
                  color="inherit"
                  sx={{ fontSize: "small" }}
                >
                  <Facebook fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* SITEMAP Section */}
            <Box sx={{ textAlign: "left", flex: 1, "@media (max-width: 900px)": { textAlign: "center" } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}>
                SITEMAP
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>  {/* Reduced gap */}
                {[
                  { title: "Home", path: "/" },
                  { title: "Our Team", path: "/blogs" },
                  { title: "Psychiatry & Therapy", path: "/" },
                  { title: "Complementary & Alternative Medicine", path: "/" },
                  { title: "Consumer Notices", path: "/" },
                  { title: "Refer A Patient", path: "/" },
                ].map((item, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                    <ChevronRightIcon sx={{ color: "white", fontSize: "small", marginRight: "4px" }} />
                    <Link href={item.path} underline="none" sx={{ color: "white", fontSize: "12px" }}>
                      {item.title}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* RESOURCES Section */}
            <Box sx={{ textAlign: "left", flex: 1, "@media (max-width: 900px)": { textAlign: "center" } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}>
                RESOURCES
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>  {/* Reduced gap */}
                {servicesOptions.map((item, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                    <ChevronRightIcon sx={{ color: "white", fontSize: "small", marginRight: "4px" }} />
                    <Link href={item.path} underline="none" sx={{ color: "white", fontSize: "12px" }}>
                      {item.title}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* CONTACT Section */}
            <Box sx={{ textAlign: "left", flex: 1, "@media (max-width: 900px)": { textAlign: "center" } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}>
                CONTACT
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "6px", fontSize: "12px" }}>
                <Phone sx={{ verticalAlign: "middle", marginRight: "4px", fontSize: "small" }} />
                Call to:{" "}
                <Link href="tel:+917339977720" color="inherit">
                  +91 73399 77720
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "6px", fontSize: "12px" }}>
                <Email sx={{ verticalAlign: "middle", marginRight: "4px", fontSize: "small" }} />
                Mail to:{" "}
                <Link href="mailto:markmerritt@kairosintegrativehealth.com" color="inherit">
                  markmerritt@kairosintegrativehealth.com
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Copyright Section */}
      <Box
        sx={{
          backgroundColor: "rgba(29,39,56, 1)",
          color: "white",
          padding: "10px 0", // Space above and below the line
          textAlign: "center",
        }}
      >
        <hr style={{ borderColor: "white", borderWidth: "1px", margin: "0 0 8px" }} />
        <Typography variant="body2" sx={{ fontSize: "12px" }}>
          © Copyright 2022 - 2024, Integrative Behavioral Health & Medicine, Inc. | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
