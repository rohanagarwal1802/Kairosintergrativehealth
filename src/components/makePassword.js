import React, { useState } from "react";
import {
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Checkbox,
  Card,
  CardContent,
  styled,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BlankLayout from "./blankLayout";
import { useRouter } from "next/router";
import useUserStore from "./useUserStore";
import axios from "axios";



export default function MakePassword({token}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {pageDisplay, setPageDisplay} = useUserStore()
  const router=useRouter()


  
const handleLogout = async () => {
    // Define logout functionality
    try{
      await axios.get('/api/logout').then(()=>{
    localStorage.removeItem("login"); // Example: Clear login token
    setPageDisplay('login')
    router.push("/login"); // Redirect to login page
    // router.reload()
    })
    }
    catch(error)
    {
      console.log(error)
    }
  };

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleToggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        let data={
            "password":password,
            "verifiedToken":token
        }
        const update=await axios.patch('/api/encryptPassword',data)
        if(update)
        {
           await handleLogout()
      alert("Passwords set Successfully");
    //   router.push("/login")
        }
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <Box
    sx={{
      minHeight: "100vh",
      maxHeight: "100vh", // Prevent scrolling
      overflow: "hidden", // Hide overflow
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "lightgreen", // Light green background
      padding: isMobile ? 2 : 4,
      width: "100vw",
    }}
  >
     <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card
          sx={{
            zIndex: 1,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <CardContent>
             {/* Logo */}
             <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src="/logo.png" alt="Logo" style={{ width:90 }} />
                </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      
      }}
    >
     

      {/* Title */}
      <Typography variant="h5" gutterBottom sx={{color:"black",fontWeight:"bold"}}>
        Create Your Password
      </Typography>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* Password Field */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password Field */}
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
    </CardContent>
</Card>
</Grid>
</Grid>
    </Box>
  );
}
MakePassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;