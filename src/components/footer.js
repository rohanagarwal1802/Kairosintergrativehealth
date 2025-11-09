import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  Link,
  Grid,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Phone,
  Email,
} from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FaxIcon from "@mui/icons-material/Fax";
import { useRouter } from "next/router";
import ResourcesOptions from "./resourcesDropdown";
import ServicesOptions from "./servicesDropdown";
import useUserStore from "./useUserStore";

const Footer = () => {
  const router = useRouter();
  const servicesOptions = ServicesOptions();
  const resourcesOptions = ResourcesOptions();

  const { preferedLocation, setPreferedLocation } = useUserStore();

  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);

  const handleServiceClick = (service) => {
    if (service?.component) {
      setSelectedService(() => service.component);
      setOpen(true);
    }
  };

  const locationData = {
    Alabama: {
      call: "256-980-0620",
      address:
        "The Walker Building: 400 Vestavia Parkway, Suite 406 Vestavia Hills, AL 35216",
    },
    "North Carolina": {
      call: "919-918-0620",
      address: "523 Keisler Drive Suite 202 Cary, NC 27518",
    },
  };

  const [info, setInfo] = useState(locationData["Alabama"]);

  useEffect(() => {
    if (!preferedLocation) {
      setInfo(locationData["Alabama"]);
    } else {
      setInfo(locationData[preferedLocation]);
    }
  }, [preferedLocation]);

  return (
    <>
      {/* ✅ Render modal/service component first (so it’s not below the footer) */}
      {selectedService && (() => {
        const Component = selectedService;
        return <Component open={open} setOpen={setOpen} />;
      })()}

      {/* ✅ Footer Section */}
      <Box>
        {/* Top Box */}
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
                justifyContent: {
                  xs: "center",
                  lg: "space-between",
                },
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
                alignItems: {
                  xs: "center",
                  lg: "flex-start",
                },
              }}
            >
              {/* LOGO + SOCIALS */}
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ textAlign: "center", mb: { xs: 3, lg: 0 } }}
              >
                <img
                  src="/logo.png"
                  alt="Kairos Integrative Health Logo"
                  onClick={() => router.push("/")}
                  style={{
                    width: "200px",
                    height: "200px",
                    cursor: "pointer",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "8px",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    component="a"
                    href="https://www.linkedin.com/company/kairosintegrativehealth/"
                    target="_blank"
                    color="inherit"
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://www.instagram.com/kairosintegrativehealth?igsh=bmh4dzJ6NXZ1cjRo"
                    target="_blank"
                    color="inherit"
                  >
                    <Instagram />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://www.facebook.com/profile.php?id=61568307689433"
                    target="_blank"
                    color="inherit"
                  >
                    <Facebook />
                  </IconButton>
                </Box>
              </Grid>

              {/* SERVICES Section */}
              <Grid
                item
                xs={12}
                lg={2}
                sx={{ textAlign: { xs: "center", lg: "left" }, mb: { xs: 3, lg: 0 } }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontSize: "18px",
                  }}
                >
                  SERVICES
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {servicesOptions.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "16px",
                      }}
                    >
                      <ChevronRightIcon
                        sx={{
                          color: "white",
                          fontSize: "20px",
                          marginRight: "8px",
                        }}
                      />
                      <Link
                        underline="none"
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleServiceClick(item)}
                      >
                        {item.title}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* RESOURCES Section */}
              <Grid
                item
                xs={12}
                lg={2}
                sx={{ textAlign: { xs: "center", lg: "left" }, mb: { xs: 3, lg: 0 } }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontSize: "18px",
                  }}
                >
                  RESOURCES
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {resourcesOptions.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "16px",
                      }}
                    >
                      <ChevronRightIcon
                        sx={{
                          color: "white",
                          fontSize: "20px",
                          marginRight: "8px",
                        }}
                      />
                      <Link
                        underline="none"
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        onClick={() => router.push(item.path)} // ✅ replaced href
                      >
                        {item.title}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* CONTACT Section */}
              <Grid
                item
                xs={12}
                lg={3}
                sx={{ textAlign: { xs: "center", lg: "left" } }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontSize: "18px",
                  }}
                >
                  CONTACT
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: "6px", fontSize: "16px" }}
                  >
                    <Phone
                      sx={{
                        verticalAlign: "middle",
                        marginRight: "8px",
                        fontSize: "20px",
                      }}
                    />
                    Call :{" "}
                    <Link
                      href={`tel:${info.call}`}
                      color="inherit"
                      sx={{ fontSize: "16px" }}
                    >
                      {info.call}
                    </Link>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp; Fax :{" "}
                    <Link
                      href="tel:919-918-0622"
                      color="inherit"
                      sx={{ fontSize: "16px" }}
                    >
                      919-918-0622
                    </Link>
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ marginBottom: "6px", fontSize: "16px" }}
                  >
                    <Email
                      sx={{
                        verticalAlign: "middle",
                        marginRight: "8px",
                        fontSize: "20px",
                      }}
                    />
                    Mail :{" "}
                    <Link
                      href="mailto:info@kairosintegrativehealth.com"
                      color="inherit"
                      sx={{ fontSize: "16px" }}
                    >
                      info@kairosintegrativehealth.com
                    </Link>
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ marginBottom: "6px", fontSize: "16px" }}
                  >
                    {info.address}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            backgroundColor: "#2A3923",
            color: "white",
            padding: "10px 0",
            textAlign: "center",
          }}
        >
          <hr
            style={{
              borderColor: "white",
              borderWidth: "1px",
              margin: "0 0 8px",
            }}
          />
          <Typography variant="body2" sx={{ fontSize: "12px" }}>
            © Copyright 2024, Kairos Integrative Health | All Rights Reserved
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
