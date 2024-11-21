// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8b5e34", // Brown coffee color as primary
    },
    secondary: {
      main: "#cea3af", // Secondary accent color
    },
    background: {
      default: "#f2e0d2", // Light beige for the background
      paper: "#f6e6d9", // Lighter beige for paper elements
    },
    text: {
      primary: "#4b2e1e", // Dark brown for main text
      secondary: "#5e3d29", // Slightly lighter brown for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3rem",
      color: "#3b2311",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
      color: "#3b2311",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#3b2311",
    },
    h5: {
      fontWeight: "bold",
      fontSize: "1.25rem",
      color: "#8b5e34", // Darker brown for headings
    },
    body1: {
      fontSize: "1rem",
      color: "#5e3d29",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#5e3d29",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#f6e6d9", // Default background for Paper components
          color: "#4b2e1e",
          padding: "20px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "green",
          color: "#fff",
          "&:hover": {
            backgroundColor: "lightgreen", // Lighter hover color
          },
        },
      },
    },
  },
});

export default theme;
