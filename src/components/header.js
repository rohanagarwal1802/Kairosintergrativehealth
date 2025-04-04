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
  Avatar
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import AdminOptions from "./adminDropdown";
import useUserStore from "./useUserStore";
import LogOutDialog from "./logoutDialog";
import useCustomSnackbarStore from "@/pages/utils/useCustomSnackbarStore";
import DefaultLocationModal from "./Location/defaultLocationModal";

const Header = ({userDetails}) => {
  const router = useRouter();
  const options = Options();
  const resourcesOptions = ResourcesOptions();
  const servicesOptions=ServicesOptions()
  const aboutOptions=AboutOptions()
  const adminOptions=AdminOptions()
  const {setLogin,setResetPassword,toResetPassword,preferedLocation}=useUserStore()
  const [openLogout,setOpenLogout]=useState(false)
  const [openLocationModal,setLocationModal]=useState(false)

  const currentPath=router.pathname

  // State for controlling the dropdown menu for "RESOURCES"
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const isResourcesMenuOpen = Boolean(anchorE2);
  const isServicesMenuOpen=Boolean(anchorEl)
  const isAboutMenuOpen=Boolean(anchorE3)
  const {setSnackbar}=useCustomSnackbarStore()

  const isMobile = useMediaQuery("(max-width:900px)"); // Media query for responsiveness
console.log(options)



const [menuAnchor, setMenuAnchor] = useState(null);
const [currentMenu, setCurrentMenu] = useState(null); // "RESOURCES" or "SERVICES"

const [anchorE4, setAnchorE4] = useState(null);

const locationLink={
  Alabama:"https://practice.kareo.com/kih",
  "North Carolina":"https://practice.kareo.com/kihnc"
}

  const handleMenuOpen1 = (event) => {
    setAnchorE4(event.currentTarget);
  };

  const handleMenuClose1 = () => {
    setAnchorE4(null);
  };

  const handleLogout = async () => {
    // Define logout functionality
    try{
      await axios.get('/api/logout').then(async ()=>{
    localStorage.removeItem("login"); // Example: Clear login token
  // await  router.push("/"); // Redirect to login page
    setLogin(false)
    handleMenuClose1();
    setResetPassword(!toResetPassword)
    await setSnackbar("success","Logged out successfully")
    router.reload()
    })
    }
    catch(error)
    {
      console.log(error)
    }
  };

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
    <>
    <AppBar position="fixed" elevation={1} sx={{ background: "#f8f9fa", color: "black", borderBottom: "1px solid #dee2e6" ,}}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={()=>router.push("/")}>
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
  {!isMobile && (
  <>
  

    {userDetails?.role==='admin' && (

<Box
onMouseEnter={(e) => handleMenuOpen(e, "Admin Details")}
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
    borderBottom: userDetails?.role==='admin' && currentPath==="Admin"
      ? "2px solid #535945"
      : "none",
    color: userDetails?.role==='admin' && currentPath==="Admin" ? "#535945" : "inherit",
    "&:hover": { backgroundColor: "lightgray" },
    fontSize: "0.75rem",
  }}
>
ADMIN DETAILS
</Box>

<Menu
  anchorEl={menuAnchor}
  open={currentMenu === "Admin Details"}
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
  {(
    adminOptions
  ).map((subOption, idx) => (
    <MenuItem
      key={idx}
      onClick={() => handleMenuItemClick(subOption.path)}
      sx={{
        "&:hover": { color: "lightblue" },
        fontSize: "0.75rem",
      }}
    >
      <ChevronRightIcon sx={{ marginRight: 0.5 }} />
      {subOption.title}
    </MenuItem>
  ))}
</Menu>
</Box>
      // <Button
      //   color="inherit"
      //   onClick={() => router.push('/admin')}
      //   sx={{
      //     padding: "6px 12px",
      //     borderBottom: "2px solid #535945",
      //     color: "#535945",
      //     "&:hover": { backgroundColor: "lightgray" },
      //     fontSize: "0.75rem",
      //   }}
      // >
      //   Admin Panel
      // </Button>
    )}

{userDetails && userDetails.password!=null && userDetails.patientId!=null && (
      <Button
        color="inherit"
        onClick={() => router.push('/userAppointments')}
        sx={{
          padding: "6px 12px",
          borderBottom: currentPath==="/userAppointments" && "2px solid #535945",
          color: currentPath==="/userAppointments" && "#535945",
          "&:hover": { backgroundColor: "lightgray" },
          fontSize: "0.75rem",
        }}
      >
        Appointments
      </Button>
    )}


    {/* Dynamically rendered options */}
    {options.map((option, index) => {
   
      if (
        option.title === "RESOURCES" ||
        option.title === "SERVICES" ||
        option.title === "ABOUT"
      ) {
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
                borderBottom: isSelected(option.path)
                  ? "2px solid #535945"
                  : "none",
                color: isSelected(option.path) ? "#535945" : "inherit",
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
              {(
                option.title === "RESOURCES"
                  ? resourcesOptions
                  : option.title === "SERVICES"
                  ? servicesOptions
                  : aboutOptions
              ).map((subOption, idx) => (
                <MenuItem
                  key={idx}
                  onClick={() => handleMenuItemClick(subOption.path)}
                  sx={{
                    "&:hover": { color: "lightblue" },
                    fontSize: "0.75rem",
                  }}
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
            borderBottom: isSelected(option.path)
              ? "2px solid #535945"
              : "none",
            color: isSelected(option.path) ? "#535945" : "inherit",
            "&:hover": { backgroundColor: "lightgray" },
            fontSize: "0.75rem",
          }}
        >
          {option.title}
        </Button>
      );
    })}
  </>
)}

{!isMobile && !userDetails &&
<Button
        color="inherit"
        onClick={() => window.open("https://portal.kareo.com/app/new/login", "_blank", "noopener,noreferrer") }
        sx={{
          padding: "6px 12px",
          // borderBottom: isSelected(option.path) ? "2px solid #535945" : "none",
          // color: isSelected(option.path) ? "#535945" : "inherit",
          "&:hover": { backgroundColor: "lightgray" },
          color:"#535945",
          fontSize: "0.75rem",
        }}
      >
        Patient Portal
      </Button>
}
{!userDetails &&
   <Box
    component="button"
    sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#535945",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "6px 12px",
      cursor: "pointer",
      "&:hover": { backgroundColor: "#535945" },
      fontSize: "0.75rem",
    }}
    onClick={() => {
      // router.push('/bookanappointment')
      window.open(locationLink[preferedLocation], "_blank", "noopener,noreferrer");
      // Define the action for button click
    }}
  >
    <Typography variant="body2" sx={{ marginRight: 1 }}>
      Request Appointment
    </Typography>
  </Box>
}

{/* {!isMobile && preferedLocation!=="Alabama" && 
  <Box
    component="button"
    sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#535945",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "6px 12px",
      cursor: "pointer",
      "&:hover": { backgroundColor: "#535945" },
      fontSize: "0.75rem",
    }}
    onClick={() => {
      // router.push('/bookanappointment')
      setLocationModal(true)
      // Define the action for button click
    }}
  >
    <Typography variant="body2" sx={{ marginRight: 1 }}>
      Back
    </Typography>
  </Box>} */}
  {!isMobile && userDetails &&
  <Box sx={{ display: "flex", alignItems: "center" }}>
  <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#535945",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "6px 12px",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#535945" },
          fontSize: "0.75rem",
        
        }}
        onClick={handleMenuOpen1}
      >
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          {userDetails?.role==='admin'?'Admin':userDetails?.firstname+" "+userDetails?.lastname}
        </Typography>
        <ArrowDropDownIcon sx={{ marginLeft: "8px", fontSize: "1rem" }} />
      </Box>

      <Menu
        anchorEl={anchorE4}
        open={Boolean(anchorE4)}
        onClose={handleMenuClose1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
      <MenuItem onClick={()=>setOpenLogout(true)}>
  <LogoutIcon sx={{ width: 24, height: 24, marginRight: 1, color: "red" }} />
  Logout
</MenuItem>
      </Menu>
    </Box>
}
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
 {userDetails?.role==='admin' && (
<Box
        onMouseEnter={(e) => handleMenuOpen(e, "Admin Details")} // Show the menu on hover
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
            borderBottom: userDetails?.role==='admin' && currentPath==="Admin"
      ? "2px solid #535945"
      : "none",
    color: userDetails?.role==='admin' && currentPath==="Admin" ? "#535945" : "inherit",
            "&:hover": { backgroundColor: "lightgray" },
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center", // Ensure alignment is consistent
          }}
        >
         Admin Details
        </Box>

        {/* // Mobile Menu Dropdown */}
        <Menu
  anchorEl={menuAnchor}
  open={currentMenu === "Admin Details"}
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
  {adminOptions.map((subOption, idx) => (
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
)}
       {userDetails && userDetails.password!=null && userDetails.patientId!=null &&
       <Button
  // key={index}
  color="inherit"
  onClick={() => {
    try {
      router.push('/userAppointments');
      toggleMobileMenu();
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  }}
  sx={{
    padding: "6px 12px",
    borderBottom: currentPath==="/userAppointments" ? "2px solid #535945" : "none",
    color: currentPath==="/userAppointments" ? "#535945" : "inherit",
    "&:hover": { backgroundColor: "lightgray" },
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
  }}
  aria-label="Navigate to appointments"
  title="Appointments"
>
  Appointments
</Button>
}

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
            borderBottom: isSelected(option.path) ? "2px solid #535945" : "none",
            color: isSelected(option.path) ? "#535945" : "inherit",
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
        borderBottom: isSelected(option.path) ? "2px solid #535945" : "none",
        color: isSelected(option.path) ? "#535945" : "inherit",
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

{!userDetails &&
<Button
      color="inherit"
      onClick={() =>  window.open("https://portal.kareo.com/app/new/login", "_blank", "noopener,noreferrer")} // Navigate directly for normal options
      sx={{
        padding: "6px 12px",
        color: "#535945",
        "&:hover": { backgroundColor: "lightgray" },
        fontSize: "0.75rem",
        display: "flex", // Ensure consistent display with the other items
        alignItems: "center", // Align with the other items
      }}
    >
      Patient Portal
    </Button>
}
{userDetails &&
    <Button
      color="inherit"
      onClick={()=>setOpenLogout(true)}//Navigate directly for normal options
      sx={{
        padding: "6px 12px",
        color: "red",
        "&:hover": { backgroundColor: "lightgray" },
        fontSize: "0.75rem",
        display: "flex", // Ensure consistent display with the other items
        alignItems: "center", // Align with the other items
      }}
    >
        <LogoutIcon sx={{ width: 24, height: 24, marginRight: 1 }} />
     Log Out
    </Button>
}
{/* {preferedLocation!=="Alabama" && 
  <Box
    component="button"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center", // Ensures content inside is centered
      backgroundColor: "#535945",
      color: "white",
      width: "fit-content",
      border: "none",
      borderRadius: "4px",
      padding: "6px 12px",
      cursor: "pointer",
      fontSize: "0.75rem",
      "&:hover": { backgroundColor: "#535945" },
      margin: "auto", // Centers the button horizontally
    }}
    
    onClick={() => {
      // router.push('/bookanappointment')
      setLocationModal(true)
      // Define the action for button click
    }}
  >
    <Typography variant="body2" sx={{ marginRight: 1 }}>
      Back
    </Typography>
  </Box>} */}
    </Box>
  )}
</Box>


        
      </Toolbar>
    </AppBar>
    {openLogout && <LogOutDialog setOpen={setOpenLogout} open={openLogout} handleLogout={handleLogout}/>}
    {openLocationModal && <DefaultLocationModal onClose={()=>setLocationModal(false)}/>}
    </>
  );
};

export default Header;