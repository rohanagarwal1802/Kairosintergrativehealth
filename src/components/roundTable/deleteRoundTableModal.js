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

const DeleteRoundtableModal = ({ id, onClose, getRoundTableDetails }) => {
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useCustomSnackbarStore();

  const handleDelete = async () => {
    setLoading(true);
    try {
        let data={
            ids:id
        }
      // Use a config object to send the body with DELETE request
      const response = await axios.post("/api/deleteRoundTableDetails", data);
      console.log(response);
      setLoading(false);
      getRoundTableDetails();
      onClose();
      setSnackbar(
        "success",
        `Successfully deleted ${
          id.length === 1 ? "Round Table Detail" : "Round Table Details"
        } details.`
      );
    } catch (error) {
      console.error(
        "Error deleting content:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose} disableScrollLock>
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
          <CloseIcon sx={{color:"white"}}/>
        </IconButton>
        <Typography variant="h6" sx={{ marginBottom: 2,color:"white" }}>
          Confirm Deletion
        </Typography>
        <Typography sx={{ marginBottom: 4,color:"white" }}>
          Are you sure you want to delete {id.length === 1 ? "this" : "these"}{" "}
          {id.length === 1 ? "Round Table Detail" : "Round Table Details"} ? This action cannot be
          undone.
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
            sx={{ width: "45%",backgroundColor:"red" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={loading}
            sx={{ width: "45%" ,backgroundColor:"green"}}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Delete"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteRoundtableModal;