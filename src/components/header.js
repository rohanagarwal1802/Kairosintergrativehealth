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
import AboutOptions from "./aboutDropdown";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu"; // Mobile menu icon
import { useTheme,useMediaQuery } from "@mui/material"; // To handle media queries

const Header = () => {
  const router = useRouter();
  const options = Options();
  const resourcesOptions = ResourcesOptions();
  const servicesOptions=ServicesOptions()
  const aboutOptions=AboutOptions()

  // State for controlling the dropdown menu for "RESOURCES"
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const isResourcesMenuOpen = Boolean(anchorE2);
  const isServicesMenuOpen=Boolean(anchorEl)
  const isAboutMenuOpen=Boolean(anchorE3)
  const isMobile = useMediaQuery("(max-width:900px)"); // Media query for responsiveness
console.log(options)



const [menuAnchor, setMenuAnchor] = useState(null);
const [currentMenu, setCurrentMenu] = useState(null); // "RESOURCES" or "SERVICES"

const handleMenuOpen = (event, menuType) => {
  setMenuAnchor(event.currentTarget);
  setCurrentMenu(menuType);
};

const handleMenuClose = () => {
  setMenuAnchor(null);
  setCurrentMenu(null);
};

  // Handle opening the dropdown
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnterForResources = (event) => {
    setAnchorE2(event.currentTarget);
  };

  // Handle closing the dropdown
  const handleCloseForResources = () => {
    setAnchorE2(null);
  };

  const handleMouseEnterForAbout = (event) => {
    setAnchorE2(event.currentTarget);
  };

  // Handle closing the dropdown
  const handleCloseForAbout = () => {
    setAnchorE2(null);
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

       
          <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    gap: "16px", // Consistent spacing between menu items
  }}
>
  {/* Request Appointment Button */}
 

  {/* Menu Options */}
  {!isMobile &&
  options.map((option, index) => {
    if (option.title === "RESOURCES" || option.title === "SERVICES" || option.title === "ABOUT") {
      return (
        <Box
          key={index}
          onMouseEnter={(e) => handleMenuOpen(e, option.title)}
          onMouseLeave={handleMenuClose}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center", // Align with other menu items
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              padding: "6px 12px",
              borderBottom: isSelected(option.path) ? "2px solid green" : "none",
              color: isSelected(option.path) ? "green" : "inherit",
              "&:hover": { backgroundColor: "lightgray" },
              fontSize: "0.75rem",
            }}
          >
            {option.title}
          </Box>

          <Menu
            anchorEl={menuAnchor}
            open={currentMenu === option.title}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            PaperProps={{
              sx: {
                backgroundColor: "black",
                color: "white",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              },
            }}
          >
            {(option.title === "RESOURCES" ? resourcesOptions :option.title === "SERVICES"? servicesOptions:aboutOptions).map((subOption, idx) => (
              <MenuItem
                key={idx}
                onClick={() => handleMenuItemClick(subOption.path)}
                sx={{ "&:hover": { color: "lightblue" }, fontSize: "0.75rem" }}
              >
                <ChevronRightIcon sx={{ marginRight: 0.5 }} />
                {subOption.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      );
    }

    return (
      <Button
        key={index}
        color="inherit"
        onClick={() => option.path && router.push(option.path)}
        sx={{
          padding: "6px 12px",
          borderBottom: isSelected(option.path) ? "2px solid green" : "none",
          color: isSelected(option.path) ? "green" : "inherit",
          "&:hover": { backgroundColor: "lightgray" },
          fontSize: "0.75rem",
        }}
      >
        {option.title}
      </Button>
    );
  })
}
{!isMobile &&
<Button
        color="inherit"
        // onClick={() => }
        sx={{
          padding: "6px 12px",
          // borderBottom: isSelected(option.path) ? "2px solid green" : "none",
          // color: isSelected(option.path) ? "green" : "inherit",
          "&:hover": { backgroundColor: "lightgray" },
          color:"green",
          fontSize: "0.75rem",
        }}
      >
        Patient Portal
      </Button>
}
   <Box
    component="button"
    sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "green",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "6px 12px",
      cursor: "pointer",
      "&:hover": { backgroundColor: "green" },
      fontSize: "0.75rem",
    }}
    onClick={() => {
      router.push('/bookanappointment')
      // Define the action for button click
    }}
  >
    <Typography variant="body2" sx={{ marginRight: 1 }}>
      Request Appointment
    </Typography>
  </Box>
{isMobile &&
  <IconButton color="inherit" edge="end" onClick={toggleMobileMenu}>
    <MenuIcon />
  </IconButton>
}

  {/* Mobile Menu */}
  {mobileMenuOpen && isMobile &&(
    <Box
      sx={{
        position: "absolute",
        top: 90,
        right: 0,
        backgroundColor: "white",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
{options.map((option, index) => {
  // If option is RESOURCES or SERVICES, render a dropdown
  if (option.title === "RESOURCES" || option.title === "SERVICES" || option.title === "ABOUT") {
    return (
      <Box
        key={index}
        onMouseEnter={(e) => handleMenuOpen(e, option.title)} // Show the menu on hover
        onMouseLeave={handleMenuClose} // Close the menu when mouse leaves
        sx={{
          position: "relative",
          display: "flex",
          justifyContent:"center",
          alignItems: "center", // Ensure it's aligned like the other items
          cursor: "pointer",
          fontWeight:"bold"
        }}
      >
        <Box
          sx={{
            padding: "6px 12px",
            borderBottom: isSelected(option.path) ? "2px solid green" : "none",
            color: isSelected(option.path) ? "green" : "inherit",
            "&:hover": { backgroundColor: "lightgray" },
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center", // Ensure alignment is consistent
          }}
        >
          {option.title}
        </Box>

        {/* // Mobile Menu Dropdown */}
        <Menu
  anchorEl={menuAnchor}
  open={currentMenu === option.title}
  onClose={handleMenuClose}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Center the dropdown on mobile
  transformOrigin={{ vertical: "top", horizontal: "center" }} // Align from the center
  PaperProps={{
    sx: {
      backgroundColor: "black",
      color: "white",
      boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
      width: "auto", // Ensure it's not too wide for mobile
      maxWidth: "90%", // Limit width on small screens
      marginTop: "5px", // Add some spacing between menu and button
      left: "50%", // Center the dropdown horizontally
      transform: "translateX(-50%)", // Center the dropdown horizontally by shifting it
    },
  }}
>
  {(option.title === "RESOURCES" ? resourcesOptions :option.title === "SERVICES"? servicesOptions:aboutOptions).map((subOption, idx) => (
    <MenuItem
      key={idx}
      onClick={() => { router.push(subOption.path); handleMenuClose(); toggleMobileMenu(); }}
      sx={{ "&:hover": { color: "lightblue" }, fontSize: "0.75rem" }}
    >
      <ChevronRightIcon sx={{ marginRight: 0.5 }} />
      {subOption.title}
    </MenuItem>
  ))}
</Menu>


      </Box>
    );
  }

  // For all other options, render a normal button
  return (
    <Button
      key={index}
      color="inherit"
      onClick={() => {(option.path && router.push(option.path));toggleMobileMenu()}} // Navigate directly for normal options
      sx={{
        padding: "6px 12px",
        borderBottom: isSelected(option.path) ? "2px solid green" : "none",
        color: isSelected(option.path) ? "green" : "inherit",
        "&:hover": { backgroundColor: "lightgray" },
        fontSize: "0.75rem",
        display: "flex", // Ensure consistent display with the other items
        alignItems: "center", // Align with the other items
      }}
    >
      {option.title}
    </Button>
  );
})}

<Button
      color="inherit"
      onClick={() => console.log("login")} // Navigate directly for normal options
      sx={{
        padding: "6px 12px",
        color: "green",
        "&:hover": { backgroundColor: "lightgray" },
        fontSize: "0.75rem",
        display: "flex", // Ensure consistent display with the other items
        alignItems: "center", // Align with the other items
      }}
    >
      Patient Portal
    </Button>

    </Box>
  )}
</Box>


        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
