import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import useCustomSnackbarStore from "@/pages/utils/useCustomSnackbarStore";
import useUserStore from "../useUserStore";
import { useRouter } from "next/router";

const DefaultLocationModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useCustomSnackbarStore();
    const {setPreferedLocation} = useUserStore();
    const router=useRouter()

 
  const handleConfirm = async () => {
    setLoading(true);
    setPreferedLocation('Alabama')
    router.push("/")
      setLoading(false);
    
  };

  return (
    <Modal 
    open 
    onClose={onClose} 
    disableScrollLock
    BackdropProps={{
      sx: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
        backdropFilter: "blur(5px)", // Adds the blur effect
      }
    }}
  >
    <Box
      sx={{
        width: 400,
        maxWidth: "90%",
        padding: 4,
        bgcolor: "#535945",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: 24,
        overflow: "auto",
        outline: "none",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <CloseIcon sx={{ color: "white" }} />
      </IconButton>
  
      <Typography sx={{ marginBottom: 4, color: "white" }}>
        This will take you to the default Location - Alabama.
      </Typography>
  
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={onClose}
          sx={{ width: "45%", backgroundColor: "red" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleConfirm}
          disabled={loading}
          sx={{ width: "45%", backgroundColor: "green" }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Confirm"
          )}
        </Button>
      </Box>
    </Box>
  </Modal>
  
  );
};

export default DefaultLocationModal;