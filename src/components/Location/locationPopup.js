import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationFormComponent from "./locationForm";
import locationOptions from "./LocationOptions";
import useUserStore from "../useUserStore";
import MessageInfoDialog from "./locationMessage";

const LocationSelectionDialog = ({ open, onClose }) => {
  const LocationOptions = locationOptions();
 const { preferedLocation, setPreferedLocation } = useUserStore();
  const [locationCheck, setLocation] = useState(preferedLocation);
  const handleSelect = (value) => {
    setLocation(value);
  };

  const handleSubmit = (value) => {
    handleSelect(value)
    if(value!=='Choose your location')
    {
      setPreferedLocation(value);
      onClose(false); // Close dialog
    }
   

    // navigate(-1); // Navigate back to the previous page
  };


  // const handleSubmit = (location) => {
 
  //   if(location!=="Choose your location"){
  //     setPreferedLocation(location);
   
  //   }
  // };
  return (
    <>
      {/* Backdrop to blur background */}
      {open && (
        <Backdrop
          open={true}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer - 1,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        />
      )}

      <Dialog open={open}  maxWidth="md" fullWidth>
        {/* Dialog Title */}
        <DialogTitle
    sx={{
      textAlign: "center",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",  // Center-aligns vertically
    }}
  >
    Please select the state you are located in.
    <IconButton onClick={()=>handleSubmit("Alabama")} sx={{ position: "absolute", right: 8, top: 8 }}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
        {/* Dialog Content */}
        <DialogContent>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              color: "#333",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Grid for Locations */}
            <Grid container spacing={2} sx={{ maxWidth: "100%" }}>
              {LocationOptions.map((location) => (
                <Grid item xs={12} sm={4} key={location.value} sx={{ display: "flex" }}>
                  <Card
                    onClick={() => handleSubmit(location.value)}
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      border: locationCheck === location.value ? "3px solid #1976D2" : "1px solid #ddd",
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      height: "100%",
                      background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
                      boxShadow: 2,
                      "&:hover": {
                        boxShadow: 6,
                        transform: "scale(1.05)",
                        background: "#2A3923",
                        color: "white",
                      },
                    }}
                  >
                    <CardActionArea sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#6F7863",
                            fontWeight: "bold",
                            transition: "color 0.3s ease-in-out",
                            "&:hover": { color: "white" },
                          }}
                        >
                          {location.label}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}

              {/* Additional Form Component */}
              {locationCheck === "Choose your location" && (
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <LocationFormComponent setLocation={setLocation}/>
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationSelectionDialog;