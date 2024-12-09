import React, { useState, useEffect } from "react";
import Header from "./header";
import { Box, ThemeProvider } from "@mui/material";
import Footer from "./footer";
import GoToTopIcon from "./goToTop"; // Import GoToTopIcon component
import theme from "./ThemeProvider";
import useUserStore from "./useUserStore";
import Loader from "./Loader"; // Make sure to import the loader component

const Layout = ({ children }) => {
  const [showGoToTop, setShowGoToTop] = useState(false);
  const { loadLoader, setLoadLoader } = useUserStore();

  // Debugging: Check the initial value of loadLoader
  useEffect(() => {
    console.log("Initial loadLoader state:", loadLoader);
  }, [loadLoader]);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Simulate a loadLoader delay (e.g., 3 seconds) for testing
    console.log("Setting loadLoader to false in 3 seconds...");
    const timer = setTimeout(() => {
      setLoadLoader(false);
      console.log("loadLoader set to false");
    }, 3000); // Changed delay to 3 seconds for testing
    return () => clearTimeout(timer); // Cleanup timer
  }, [setLoadLoader]);

  if (loadLoader) {
    console.log("Loader is showing..."); // Debugging log
    return <Loader />;
  }

  console.log("Layout rendered without loader..."); // Debugging log

  return (
    <>
      <Header sx={{ mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Apply theme only to the main content area */}
        <ThemeProvider theme={theme}>
          <Box component="main" sx={{ flexGrow: 1, paddingTop: "64px" }}>
            {children}
          </Box>
        </ThemeProvider>
        <Footer sx={{ mt: 1 }} />
      </Box>
      {showGoToTop && <GoToTopIcon />}
    </>
  );
};

export default Layout;
