import React, { useState ,useEffect} from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import axios from "axios";

const MessageInfoDialog = ({ open, onClose, state , locationDialogClose}) => {
  const [addToDatabase, setAddToDatabase] = useState(false);
  const router = useRouter()

  const handleCheckboxChange = (event) => {
    setAddToDatabase(event.target.checked);
    console.log("Checkbox State:", event.target.checked);
  
    // Here, you can call a function to update the database when checked
  };

const handleRoundTableButton=()=>{
  router.push("/");onClose();
  if(locationDialogClose)
  locationDialogClose(false)
}

  useEffect(()=>{
    if(addToDatabase)
    {
      axios.post('/api/updateLocation',{state:state}).then(
        (res)=>{console.log(res);
          router.push("/");onClose();
          if(locationDialogClose)
          locationDialogClose(false)

        }
      );
    }
  },[addToDatabase])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
          backdropFilter: "blur(5px)", // Adds the blur effect
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <CloseIcon sx={{ color: "black" }} />
      </IconButton>

      <DialogContent>
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            At this time, we do not offer services in your state.
          </Typography>

        
          <Button
  variant="contained"
  color="primary"
  onClick={handleRoundTableButton}
  sx={{
    textTransform: "none",
    fontSize: "16px",
    backgroundColor: "#535945", // Set button background color
    color: "white", // Ensure text is readable
    px: 3,
    py: 1,
    mb: 2,
    "&:hover": { backgroundColor: "#414833" } // Darker shade on hover
  }}
>
            Home Page
          </Button>
        

          {/* Checkbox */}
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={addToDatabase}
                onChange={handleCheckboxChange}
                color="#535945"
              />
            }
            label="I want these services in my state!"
          /> */}
         
        </Box>
       
      </DialogContent>
    </Dialog>
  );
};

export default MessageInfoDialog;
