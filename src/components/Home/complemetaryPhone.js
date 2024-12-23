import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";


const ComplimentaryCallBox = () => {
    const router=useRouter()

    const handleClick=()=>{
    router.push('/bookanappointment')
    }
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        color: "#333",
        p: { xs: 2, sm: 3 }, // Responsive padding for smaller screens
        borderRadius: 2,
        boxShadow: 3,
        fontWeight: "bold",
        display: "flex",
        flexDirection: "row", // Make it row to align items in one line
        justifyContent: "space-between", // Align text and button at opposite ends
        alignItems: "center", // Vertically center items
        position: "relative", // For button positioning
        maxWidth: "100%", // Ensure it spans the full width
        margin: "auto", // Center horizontally on larger screens
        minHeight: "80px", // Set a minimum height for consistent layout
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: "black",
          textAlign: "left", // Align text to the left
          fontSize: { xs: "14px", sm: "16px", md: "18px" }, // Responsive font size
          flex: 1, // Allow text to take available space
        }}
      >
        Click here to schedule a complimentary phone call to see if KIH is a good fit for you
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#007BFF", // Custom button color
          color: "white",
          "&:hover": {
            backgroundColor: "#0056b3", // Hover effect
          },
          fontSize: { xs: "12px", sm: "14px" }, // Responsive font size for the button
          padding: "8px 16px", // Button padding for better touch area on mobile
        }}

        onClick={handleClick}
      >
        Complimentary Phone Call
      </Button>
    </Box>
  );
};

export default ComplimentaryCallBox;
