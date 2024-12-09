import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Styled component for blank layout
const BlankLayoutWrapper = styled(Box)(() => ({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const BlankLayout = ({ children }) => {
  return (
    <BlankLayoutWrapper className="layout-wrapper">
      {children}
    </BlankLayoutWrapper>
  );
};

export default BlankLayout;
