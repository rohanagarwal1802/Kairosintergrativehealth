import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MessageInfoDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth 
    BackdropProps={{
      sx: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
        backdropFilter: "blur(5px)", // Adds the blur effect
      }
    }}>
 <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <CloseIcon sx={{ color: "black" }} />
      </IconButton>
      <DialogContent>
        <Box
          sx={{
            
            textAlign: "center",
            p: 2,
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            At this time, we only offer attendance to our Resilience Roundtable in this state.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            href="/resilience-roundtable"
       
            sx={{
              textTransform: "none",
              fontSize: "16px",
              px: 3,
              py: 1,
            }}
          >
            Read More About Resilience Roundtable
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MessageInfoDialog;
