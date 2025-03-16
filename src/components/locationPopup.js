import React, { useState } from "react";
import { Button, Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserStore from "./useUserStore";
import locationOptions from "./Location/LocationOptions";
import LocationFormComponent from "./Location/locationForm";

export default function LocationPage() {
  const navigate = useNavigate(); // Navigation Hook
  const { preferedLocation, setPreferedLocation } = useUserStore();
  const [locationCheck, setLocation] = useState(preferedLocation);
  const LocationOptions = locationOptions();

  const handleSelect = (value) => {
    setLocation(value);
  };

  const handleSubmit = () => {
    setPreferedLocation(locationCheck);
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Centered Heading */}
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>KAIROS INTEGRATIVE HEALTH</h3>

      {/* Page Title */}
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "20px" }}>
        Which location do you prefer?
      </Typography>

      {/* Grid for Locations */}
      <Grid container spacing={2} sx={{ maxWidth: "900px" }}>
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

      {/* Action Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Done
        </Button>
      </div>

      {/* Additional Form Component */}
      <LocationFormComponent />
    </div>
  );
}
