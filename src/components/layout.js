import React, { useState, useEffect } from "react";
import { Box, ThemeProvider, Fab } from "@mui/material";
import Header from "./header";
import Footer from "./footer";
import GoToTopIcon from "./goToTop"; // Import GoToTopIcon component
import theme from "./ThemeProvider";
import useUserStore from "./useUserStore";
import Loader from "./Loader"; // Make sure to import the loader component
import MessageIcon from "@mui/icons-material/Message"; // Import the message icon
import Link from "next/link";

const Layout = ({ children, userDetails }) => {
  const [showGoToTop, setShowGoToTop] = useState(false);
  const { loadLoader, setLoadLoader } = useUserStore();

  console.log("children ==>", userDetails);

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
      <Header sx={{ mb: 1 }} userDetails={userDetails} />
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
      
      {/* Go To Top Button */}
      {showGoToTop && <GoToTopIcon />}
      
      {/* Floating message icon at the bottom-left corner */}
      <Link href="/contact" style={{ position: "fixed", bottom: 20, left: 20 }}>
        <Fab color="primary" aria-label="message">
          <MessageIcon />
        </Fab>
      </Link>
    </>
  );
};

export default Layout;
