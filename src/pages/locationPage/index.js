import React, { useState } from "react";
import { Button, Grid, Card, CardActionArea, CardContent, Typography,Box ,Link} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import useUserStore from "@/components/useUserStore";
import locationOptions from "@/components/Location/LocationOptions";
import LocationFormComponent from "../../components/Location/locationForm";
import { useRouter } from "next/router";
import LocationVideo from "@/components/Location/locationVideo";

export default function LocationPage() {
//   const navigate = useNavigate(); // Navigation Hook
  const { preferedLocation, setPreferedLocation } = useUserStore();
  const [locationCheck, setLocation] = useState(preferedLocation);
  const LocationOptions = locationOptions();
  const router=useRouter();

  const handleSelect = (value) => {
    setLocation(value);
  };

  

  const handleSubmit = (value) => {
    handleSelect(value)

    if(value!=='Choose your location')
    {
      setPreferedLocation(value);
      router.push('/')
    }
   

    // navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box
      sx={{
    
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#C8AF8F",
        alignItems: "center",
        padding: "1%",
        maxWidth:'1600px',
        pb:0,
      }}
    >
 {/* Heading */}
  <Box
    sx={{
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      color: "#333",
      mt: "3%",
      pl: 1,
      pr: 2,
      // width: "90%",
      borderRadius: 2,
      boxShadow: 3,
      fontWeight: "bold",
      display: "flex",
      flexDirection: "column",
    }}
  >
     <Typography
    variant="subtitle1"
    sx={{
      color: "#6F7863",
      fontWeight: "bold",
      mb: 1,
      mt: 1,
      fontSize:25,
      textAlign: { xs: "center", md: "center" }, // Center on small screens
    }}
  >
        Welcome to Kairos Integrative Health <br />
    </Typography>
    <Typography
    variant="subtitle1"
    sx={{
      color: "black",
      mb: 4,
      mt: 1,
      textAlign: { xs: "center", md: "center" }, // Center on small screens
    }}
  >
      
      Our Vision: To be a recognized and trusted leader in the community, providing accessible, integrative mental health care that prioritizes open communication, holistic treatment, and efficient, personalized care.
    </Typography>
  </Box>
<LocationVideo/>
      {/* Page Title */}
      <Box
    sx={{
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      color: "#333",
      mt: "3%",
      mb:"3%",
      pl: 1,
      pr: 2,
      p:2,
      width: "100%",
      borderRadius: 2,
      boxShadow: 3,
      fontWeight: "bold",
      display: "flex",
      flexDirection: "column",
    }}
  >
      <Typography variant="h5" sx={{ textAlign: "center", color:"black" ,mb:"1%"}}>
      Please select the state you are located in. 
      </Typography>
    
      {/* Grid for Locations */}
      <Grid container spacing={2} sx={{ maxWidth: "1600px" }}>
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
      color: "white" // This affects child components if they inherit color
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
          "&:hover": { color: "white" } // Ensures text color changes on hover
        }}
      >
        {location.label}
      </Typography>
    </CardContent>
    
  </CardActionArea>
 
</Card>

          </Grid>
        ))}
        <Grid xs={12}>
         <Typography sx={{ fontSize: 18, pl: 2,color:"black",mt:2 }}>
         Click here to sign up for the Resilience Roundtable with link to Resilience Roundtable..{" "}
                <Link href="/Roundtable" passHref>
                  <Typography
                    component="span"
                    sx={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Click here
                  </Typography>
                </Link>
              </Typography>
              </Grid>
         <Grid item xs={12} key={location.value} sx={{ display: "flex" }}>
{/* Additional Form Component */}
{locationCheck==='Choose your location' &&
      <LocationFormComponent setLocation={setLocation}/>
          }
          
         </Grid>
          
      </Grid>
      </Box>
     

     
    </Box>
  );
}
