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


const ReviewStatusChangeModal = ({
  id,
  onClose,
  row,
  getPatientData,
}) => {
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useCustomSnackbarStore();

  console.log("row==>", row);
  const handleStatus = async () => {
    setLoading(true);
    try {
      const data = {
        id:row.id,
        approval_status:row.status===false?"Rejected":"Approved"
        // public: row.public === true ?false :true,
      };

      const response = await axios.patch("/api/updateReview", data); // Pass data in the query params

        if (row.status === false) {
          setSnackbar("warning", "Successfully Rejected the Review");
        } else {
          setSnackbar("success", "Successfully Approved the Review");
        }
      await getPatientData();

     
      onClose();
    } catch (error) {
      console.error(
        "Error changing row.status:",
        error.response?.data || error.message
      );
    } finally {
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
          Confirm {row.status === true ? "Approval" : "Rejection"}
        </Typography>
        <Typography sx={{ marginBottom: 4 ,color:"white"}}>
          Are you sure you want to {row.status === true ? "approve" : "reject"}{" "}
          this the Review ?
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
            sx={{ width: "45%",
                backgroundColor:"red"
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleStatus}
            disabled={loading}
            sx={{
              width: "45%",
              backgroundColor: row.status === false ? "red":"green",
            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                }}
              />
            ) : (
              row.status === false ? "Reject" : "Approve"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReviewStatusChangeModal;