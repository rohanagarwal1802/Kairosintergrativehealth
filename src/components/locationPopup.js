import * as React from "react";
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import useUserStore from "./useUserStore";
import locationOptions from "./Location/LocationOptions";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LocationPopup({ open, setOpen }) {
  const { preferedLocation, setPreferedLocation } = useUserStore();
  const [locationCheck,setLocation]=useState(preferedLocation)
  const LocationOptions = locationOptions();

  const handleSelect = (value) => {
    setLocation(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      aria-describedby="alert-dialog-slide-description"
      sx={{ height: "90vh" }} // Make dialog take most of the screen height
    >
      {/* Centered Heading */}
      <h3 style={{ textAlign: "center", marginTop: "16px" }}>KAIROS INTEGRATIVE HEALTH</h3>

      {/* Centered Dialog Title */}
      <DialogTitle sx={{ textAlign: "center" }}>Which location do you prefer?</DialogTitle>

      {/* Full-width and full-height grid container */}
      <DialogContent sx={{ flexGrow: 1, display: "flex", height: "100%" }}>
        <Grid container spacing={2} sx={{ flex: 1, height: "100%", margin: 0 }}>
          {LocationOptions.map((location) => (
            <Grid item xs={12} sm={4} key={location.value} sx={{ display: "flex" }}>
              <Card
                onClick={() => handleSelect(location.value)}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  border: locationCheck === location.value ? "3px solid #1976D2" : "1px solid #ddd",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 3 },
                  height: "100%",
                }}
              >
                <CardActionArea sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  {/* <CardMedia component="img" image={location.img} alt={location.label} sx={{ height: "70%", objectFit: "cover" }} /> */}
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
  <Typography variant="h6">{location.label}</Typography>
  <Typography sx={{ color: "black", fontSize: "0.9rem", marginTop: "4px" }}>
    {location.content}
  </Typography>
</CardContent>

                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={()=>{setPreferedLocation(locationCheck);handleClose()}}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}
