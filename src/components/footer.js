import React from "react";
import { Box, Typography, Container, IconButton, Link, Grid } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Phone, Email } from "@mui/icons-material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ResourcesOptions from "./resourcesDropdown";
import ServicesOptions from "./servicesDropdown";
// import LinkedInIcon from '@mui/icons-material/X';
import FaxIcon from '@mui/icons-material/Fax';
import { useRouter } from "next/router";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const servicesOptions = ServicesOptions();
  const resourcesOptions = ResourcesOptions();
  const router=useRouter()

  return (
    <Box>
      {/* Wide Box Above Footer */}
      <Box
        sx={{
          backgroundColor: "#2A3923",
          color: "#FFFFFF",
          padding: "20px 0",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: { xs: "center", lg: "space-between" },  // Center on small screens, space-between on large
              flexDirection: { xs: "column", lg: "row" },  // Stack on small screens, align in a row on large screens
              alignItems: { xs: "center", lg: "flex-start" },  // Align to center on small screens
            }}
          >
            {/* Logo and Social Media Links */}
            <Grid item xs={12} lg={3} sx={{ textAlign: "center", mb: { xs: 3, lg: 0 } }}>
              <img
                src="/logo.png"
                alt="Kairos Integrative Health Logo"
                onClick={()=>router.push("/")}
                style={{ width: "200px", height: "200px",cursor:"pointer" }}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: "12px",
                  mr:"5px",
                  marginTop: "8px",
                  justifyContent: "center",  // Center the social icons on small screens
                }}
              >
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/company/kairosintegrativehealth/"
                  target="_blank"
                  color="inherit"
                  sx={{ fontSize: "small" }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.instagram.com/kairosintegrativehealth?igsh=bmh4dzJ6NXZ1cjRo"
                  target="_blank"
                  color="inherit"
                  sx={{ fontSize: "small" }}
                >
                  <Instagram fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.facebook.com/profile.php?id=61568307689433"
                  target="_blank"
                  color="inherit"
                  sx={{ fontSize: "small" }}
                >
                  <Facebook fontSize="small" />
                </IconButton>
              </Box>
            </Grid>

            {/* SERVICES Section */}
            <Grid item xs={12} lg={2} sx={{ textAlign: { xs: "center", lg: "left" }, mb: { xs: 3, lg: 0 } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "8px", fontSize: "18px" }}>
                SERVICES
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {servicesOptions.map((item, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", paddingLeft: "16px" }}>
                    <ChevronRightIcon sx={{ color: "white", fontSize: "20px", marginRight: "8px" }} />
                    <Link href={item.path} underline="none" sx={{ color: "white", fontSize: "16px" }}>
                      {item.title}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* RESOURCES Section */}
            <Grid item xs={12} lg={2} sx={{ textAlign: { xs: "center", lg: "left" }, mb: { xs: 3, lg: 0 } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "8px", fontSize: "18px" }}>
                RESOURCES
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {resourcesOptions.map((item, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", paddingLeft: "16px" }}>
                    <ChevronRightIcon sx={{ color: "white", fontSize: "20px", marginRight: "8px" }} />
                    <Link href={item.path} underline="none" sx={{ color: "white", fontSize: "16px" }}>
                      {item.title}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* CONTACT Section */}
            <Grid item xs={12} lg={3} sx={{ textAlign: { xs: "center", lg: "left" } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "8px", fontSize: "18px" }}>
                CONTACT
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Typography variant="body2" sx={{ marginBottom: "6px", fontSize: "16px" }}>
                  <Phone sx={{ verticalAlign: "middle", marginRight: "8px", fontSize: "20px" }} />
                  Call :{" "}
                  <Link href="tel:256-980-0620" color="inherit" sx={{ fontSize: "16px" }}>
                    256-980-0620
                  </Link>
                  <br/>
                 &nbsp; &nbsp;  &nbsp;  {/* <FaxIcon sx={{ verticalAlign: "middle", marginRight: "8px", fontSize: "20px" }} /> */}
                  Fax :{" "}
                  <Link href="tel:919-918-0622" color="inherit" sx={{ fontSize: "16px" }}>
                    919-918-0622
                  </Link>
                  <br />
                 
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "6px", fontSize: "16px" }}>
                  <Email sx={{ verticalAlign: "middle", marginRight: "8px", fontSize: "20px" }} />
                  Mail :{" "}
                  <Link href="mailto:info@kairosintegrativehealth.com" color="inherit" sx={{ fontSize: "16px" }}>
                    info@kairosintegrativehealth.com
                  </Link>
                </Typography>
                {/* <Typography variant="body2" sx={{ marginBottom: "6px", fontSize: "16px" }}>
                  <FaxIcon sx={{ verticalAlign: "middle", marginRight: "8px", fontSize: "20px" }} />
                  Fax :{" "}
                  <Link href="tel:919-918-0622" color="inherit" sx={{ fontSize: "16px" }}>
                    919-918-0622
                  </Link>
                </Typography> */}
                <Typography variant="body2" sx={{ marginBottom: "6px", fontSize: "16px" }}>
                The Walker Building: 400 Vestavia Parkway, Suite 406 Vestavia Hills, AL 35216
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

       {/* Copyright Section */}
       <Box
        sx={{
          backgroundColor: "#2A3923",
          color: "white",
          padding: "10px 0", // Space above and below the line
          textAlign: "center",
        }}
      >
        <hr style={{ borderColor: "white", borderWidth: "1px", margin: "0 0 8px" }} />
        <Typography variant="body2" sx={{ fontSize: "12px" }}>
        © Copyright 2024, Kairos Integrative Health | All Rights Reserved
        </Typography>
      </Box>
    
    </Box>
  );
};

export default Footer;
