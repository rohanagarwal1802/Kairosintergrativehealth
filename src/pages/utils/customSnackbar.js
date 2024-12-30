import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CustomSnackbar = ({ open, onClose, alertType, message }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(open);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [bgColor, setBgColor] = useState("#4CAF50"); // Default green color for success
  const [iconColor, setIconColor] = useState("#fff"); // Default icon color for better visibility

  useEffect(() => {
    setSnackbarOpen(open);
    setAlertMessage(message);

    // Map the alertType to MUI Snackbar severity, background color, and icon color
    switch (alertType) {
      case "success":
        setSeverity("success");
        setBgColor("#4CAF50"); // Green for success
        setIconColor("#fff"); // White icon color for better visibility
        break;
      case "error":
        setSeverity("error");
        setBgColor("#f44336"); // Red for error
        setIconColor("#fff"); // White icon color for better visibility
        break;
      case "info":
        setSeverity("info");
        setBgColor("#2196F3"); // Blue for info
        setIconColor("#fff"); // White icon color for better visibility
        break;
      case "warning":
        setSeverity("warning");
        setBgColor("#ffcc00"); // Yellow for warning
        setIconColor("#fff"); // Black text color for better visibility
        break;
      default:
        setSeverity("success");
        setBgColor("#4CAF50"); // Default to green for success
        setIconColor("#fff"); // Default icon color for better visibility
        break;
    }
  }, [open, alertType, message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    onClose();
  };

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    //   style={{ background: bgColor }} // Change background color
    >
      <Alert
  onClose={handleClose}
  severity={severity}
  sx={{
    width: "100%",
    borderRadius: 0,
    color: "#fff",
    backgroundColor: bgColor, // Apply dynamic background color here
    "& .MuiAlert-icon": { color: iconColor },
  }}
>

        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;