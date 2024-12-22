import React from "react";
import Box from "@mui/material/Box";
import { AlignVerticalBottom } from "@mui/icons-material";

// Helper function to determine alignment based on text length
const getAlignment = (text, maxLength = 20) => {
  // Ensure text is a string and not null or undefined
  const textString = typeof text === "string" ? text : "";
  return textString.length < maxLength ? "normal" : "break-word";
};

// Custom component to handle text overflow based on length
const TextContainer = ({ children }) => {
  // Determine alignment based on text length
  const alignment = getAlignment(children);

  return (
    <Box
      sx={{
        whiteSpace: "normal",
        wordWrap: alignment,
        lineHeight: 1.2,
        paddingTop: 2, // Add padding if needed for spacing
        userSelect: "none",
        textAlign: "left",
      }}
    >
      {children}
    </Box>
  );
};

export default TextContainer;