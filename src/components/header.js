import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Options from "./options";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ResourcesOptions from "./resourcesDropdown";
import ServicesOptions from "./servicesDropdown";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu"; // Mobile menu icon
import { useMediaQuery } from "@mui/material"; // To handle media queries

const Header = () => {
  const router = useRouter();
  const options = Options();
  const resourcesOptions = ResourcesOptions();
  const servicesOptions=ServicesOptions()

  // State for controlling the dropdown menu for "RESOURCES"
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const isServicesMenuOpen = Boolean(anchorEl);
  const isMobile = useMediaQuery("(max-width:900px)"); // Media query for responsiveness
console.log(options)

  // Handle opening the dropdown
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    console.log(path)
    handleClose();
    if (path && path!=='/services') {

      router.push(path);
    }
  };

  const isSelected = (path) => router.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="fixed" elevation={1} sx={{ background: "#f8f9fa", color: "black", borderBottom: "1px solid #dee2e6" ,}}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <Image src="/logo.png" alt="Icon" height={100} width={100} />
        </Box>

        {/* Desktop Menu */}
        {!isMobile ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexGrow: 1,
                maxWidth: "700px", // Reduced max width
              }}
            >
              {options.map((option, index) => (
                <React.Fragment key={index}>
                  {option.title === "RESOURCES" ? (
                    <Box
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleClose}
                      sx={{ position: "relative", cursor: "pointer" }}
                    >
                      <Box
                        sx={{
                          padding: "6px 12px", // Reduced padding
                          borderBottom: isSelected(option.path)
                            ? "2px solid green"
                            : "none",
                          color: isSelected(option.path) ? "green" : "inherit",
                          "&:hover": { backgroundColor: "lightgray" },
                          fontSize: "0.75rem", // Smaller font size
                        }}
                      >
                        RESOURCES
                      </Box>

                      <Menu
                        anchorEl={anchorEl}
                        open={isServicesMenuOpen}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        PaperProps={{
                          sx: {
                            backgroundColor: "black",
                            color: "white",
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                            transition: "transform 0.5s ease, opacity 0.5s ease",
                          },
                        }}
                      >
                        {resourcesOptions.map((service, index) => (
                          <MenuItem
                            key={index}
                            onClick={() => handleMenuItemClick(service.path)}
                            sx={{ "&:hover": { color: "lightblue" }, fontSize: "0.75rem" }} // Smaller font size
                          >
                            <ChevronRightIcon sx={{ marginRight: 0.5 }} /> {/* Reduced margin */}
                            {service.title}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : (
                    option.title === "SERVICES" ? (
                      <Box
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleClose}
                        sx={{ position: "relative", cursor: "pointer" }}
                      >
                        <Box
                          sx={{
                            padding: "6px 12px", // Reduced padding
                            borderBottom: isSelected(option.path)
                              ? "2px solid green"
                              : "none",
                            color: isSelected(option.path) ? "green" : "inherit",
                            "&:hover": { backgroundColor: "lightgray" },
                            fontSize: "0.75rem", // Smaller font size
                          }}
                        >
                          SERVICES
                        </Box>
  
                        <Menu
                          anchorEl={anchorEl}
                          open={isServicesMenuOpen}
                          onClose={handleClose}
                          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                          PaperProps={{
                            sx: {
                              backgroundColor: "black",
                              color: "white",
                              boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                              transition: "transform 0.5s ease, opacity 0.5s ease",
                            },
                          }}
                        >
                          {servicesOptions.map((service, index) => (
                            <MenuItem
                              key={index}
                              onClick={() => handleMenuItemClick(service.path)}
                              sx={{ "&:hover": { color: "lightblue" }, fontSize: "0.75rem" }} // Smaller font size
                            >
                              <ChevronRightIcon sx={{ marginRight: 0.5 }} /> {/* Reduced margin */}
                              {service.title}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Box>
                    ):
                    <Button
                      key={index}
                      color="inherit"
                      onClick={() => option.path && option.title!=="RESOURCES" && 
                         router.push(option.path)}
                      sx={{
                        padding: "6px 12px", // Reduced padding
                        borderBottom: isSelected(option.path)
                          ? "2px solid green"
                          : "none",
                        color: isSelected(option.path) ? "green" : "inherit",
                        "&:hover": { backgroundColor: "lightgray" },
                        fontSize: "0.75rem", // Smaller font size
                      }}
                    >
                      {option.title}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </Box>
            <Box
              component="button"
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFD700", // Golden yellow background
                color: "white", // White text
                border: "none",
                borderRadius: "4px",
                padding: "6px 12px", // Reduced padding
                cursor: "pointer",
                "&:hover": { backgroundColor: "#FFC300" }, // Slightly darker on hover
                fontSize: "0.75rem", // Smaller font size
              }}
              onClick={() => {
                router.push('/bookanappointment')
                // Define the action when the button is clicked (e.g., navigate to a different page or open a modal)
              }}
            >
              <Typography variant="body2" sx={{ marginRight: 1 }}> {/* Smaller variant */}
                Request Appointment
              </Typography>
            </Box>
          </>
        ) : (
          // Mobile Menu
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="button"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#FFD700", // Golden yellow background
                  color: "white", // White text
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 12px", // Reduced padding
                  cursor: "pointer",
                  marginRight: 1, // Space between button and icon
                  "&:hover": { backgroundColor: "#FFC300" }, // Slightly darker on hover
                  fontSize: "0.75rem", // Smaller font size
                }}
                onClick={() => {
                  // Define the action when the button is clicked (e.g., navigate to a different page or open a modal)
                }}
              >
                <Typography variant="body2" sx={{ marginRight: 1 }}> {/* Smaller variant */}
                  Request Appointment
                </Typography>
              </Box>
              <IconButton color="inherit" edge="end" onClick={toggleMobileMenu}>
                <MenuIcon />
              </IconButton>
            </Box>
            {mobileMenuOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: 60,
                  right: 0,
                  backgroundColor: "white",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                  width: "100%",
                  padding: "8px", // Reduced padding
                }}
              >
                {options.map((option, index) => option.title === "RESOURCES" ? (
                  <Box
                    key={index}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleClose}
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "6px 12px", // Reduced padding
                        borderBottom: isSelected(option.path) ? "2px solid green" : "none",
                        color: isSelected(option.path) ? "green" : "inherit",
                        "&:hover": { backgroundColor: "lightgray" },
                        textAlign: "center",
                        width: "100%",
                        fontSize: "0.75rem", // Smaller font size
                      }}
                    >
                      RESOURCES
                    </Box>

                    <Menu
                      anchorEl={anchorEl}
                      open={isServicesMenuOpen}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      PaperProps={{
                        sx: {
                          backgroundColor: "black",
                          color: "white",
                          boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                          transition: "transform 0.5s ease, opacity 0.5s ease",
                        },
                      }}
                    >
                      {resourcesOptions.map((service, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => handleMenuItemClick(service.path)}
                          sx={{ "&:hover": { color: "lightblue" }, fontSize: "0.75rem" }} // Smaller font size
                        >
                          <ChevronRightIcon sx={{ marginRight: 0.5 }} /> {/* Reduced margin */}
                          {service.title}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (

                  option.title === "SERVICES" ? (
                    <Box
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleClose}
                      sx={{ position: "relative", cursor: "pointer" }}
                    >
                      <Box
                        sx={{
                          padding: "6px 12px", // Reduced padding
                          borderBottom: isSelected(option.path)
                            ? "2px solid green"
                            : "none",
                          color: isSelected(option.path) ? "green" : "inherit",
                          "&:hover": { backgroundColor: "lightgray" },
                          fontSize: "0.75rem", // Smaller font size
                        }}
                      >
                        SERVICES
                      </Box>

                      <Menu
                        anchorEl={anchorEl}
                        open={isServicesMenuOpen}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        PaperProps={{
                          sx: {
                            backgroundColor: "black",
                            color: "white",
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                            transition: "transform 0.5s ease, opacity 0.5s ease",
                          },
                        }}
                      >
                        {servicesOptions.map((service, index) => (
                          <MenuItem
                            key={index}
                            onClick={() => handleMenuItemClick(service.path)}
                            sx={{ "&:hover": { color: "lightblue" }, fontSize: "0.75rem" }} // Smaller font size
                          >
                            <ChevronRightIcon sx={{ marginRight: 0.5 }} /> {/* Reduced margin */}
                            {service.title}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ):
                  <Button
                    key={index}
                    fullWidth
                    onClick={() => {
                      option.path && router.push(option.path);
                      setMobileMenuOpen(false);
                    }}
                    sx={{
                      padding: "6px", // Reduced padding
                      textAlign: "left",
                      borderBottom: isSelected(option.path)
                        ? "2px solid green"
                        : "none",
                      color: isSelected(option.path) ? "green" : "inherit",
                      fontSize: "0.75rem", // Smaller font size
                    }}
                  >
                    {option.title}
                  </Button>
                ))}
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
