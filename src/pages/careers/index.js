import React from "react";
import { Box, Typography ,List,ListItem,ListItemText,ListItemIcon } from "@mui/material";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'; // Icon for filled radio button

const Careers = () => {
    const causes = [
        'Cover Letter ',
        'Current CV or resume',
        'Relevant licensure and certifications',
        
      ];
  return (
    <>
    <Box
  sx={{
    backgroundImage: `url('/careerBackground.jpg')`,
    backgroundSize: 'cover', // Ensures the image covers the entire box
    backgroundPosition: 'top', // Focuses on the upper part of the image
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4, // Adds padding around the content
    borderRadius: 2, // Optional: Adds rounded corners for a softer look
    height: 'auto', // Dynamically adjusts height to fit content
    width: '100%', // Ensures it spans the full width
    zIndex:-50
  }}
>
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", p: 4 }}>
          {/* Transparent Box Section */}
          <Box
              sx={{
                  position: "relative",
                  height: { md: 500 }, // Responsive height
                  width: { md: 1000 }, // Responsive width
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 0, // Ensure it is below the transparent box
              }}
          >
              {/* Rectangular Box at Top Left */}
              <Box
                  sx={{
                      position: "absolute",
                      top: "5%",
                      left: "5%",
                      backgroundColor: "lightgreen",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      boxShadow: 2,
                      zIndex: 2,
                  }}
              >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Careers at Kairos Integrative Health
                  </Typography>
              </Box>

              {/* #66BB6A Decorative Boxes Behind Transparent Box */}
              <Box
                  sx={{
                      position: "absolute",
                      top: "8%",
                      left: "-15%",
                      width: "80%",
                      height: "35%",
                      backgroundColor: "#66BB6A",
                      zIndex: -1,
                      borderRadius: 2,
                  }} />

              {/* Dotted Box */}
              <Box
                  sx={{
                      position: "absolute",
                      top: "15%", // Aligned vertically with some padding
                      left: "-5%", // Positioned on the left of the #66BB6A box
                      width: "10%", // Narrower width for the dotted box
                      height: "20%", // Taller height for the dotted box
                      backgroundImage: "radial-gradient(white 10%, transparent 10%)",
                      backgroundSize: "10px 10px", // Adjust the size of dots
                      zIndex: -1,
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                  }} />

              <Box
                  sx={{
                      position: "absolute",
                      bottom: "8%",
                      right: "-11%",
                      width: "80%",
                      height: "50%",
                      backgroundColor: "#66BB6A",
                      zIndex: 0, // Ensure it is below the transparent box
                      borderRadius: 2,
                  }} />

              {/* Transparent Box with Text */}
              <Box
                  sx={{
                      height: "50%",
                      width: "80%",
                      backgroundColor: "rgba(255, 255, 255, 0.9)", // Transparent white background
                      borderRadius: 2,
                      boxShadow: 3,
                      zIndex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                  }}
              >
                  <Typography
                      variant="body1"
                      sx={{
                          color: "#333", // Dark text color for contrast
                          textAlign: "left",
                          px: 2, // Padding inside the box
                      }}
                  >
                      We are always looking to expand our team with dedicated professionals who are
                      passionate about providing holistic, patient-centered care. We accept applications on
                      a rolling basis from MDs, DOs, NPs, PAs, MSWs, and Psychologists. If you think you
                      have a talent or skill (administrative skills, advertising background, etc.) that can
                      help expand our ability to serve the Birmingham community, feel free to reach out—we
                      would love to hear from you as well!
                  </Typography>
              </Box>
          </Box>
          
      </Box>
      <Box
  sx={{
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column", // Stack elements vertically
    alignItems: "center", // Center items horizontally
    gap: 2, // Add spacing between the elements
    mb: 4,
    mt:-4
  }}
>
  {/* Title Section */}
  <Box
    sx={{
      width: "90%",
      backgroundColor: "white", // Change to a visible background if needed
      color: "black",
      padding: "8px 16px",
      borderRadius: "8px",
      boxShadow: 2,
      textAlign: "center", // Align text in the center
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
    If you're interested in joining our team, please submit the following:
    </Typography>
  </Box>

  {/* List Section */}

  



<Box
  sx={{
    width: "90%",
    bgcolor: "#f5f5f5",
    p: 3,
    borderRadius: 2,
    boxShadow: 3,
    display: "flex",
    flexDirection: "column", // Keeps the list in a column
    gap: 2, // Space between each list item
  }}
>
  <List
    sx={{
      display: "flex", // Set display to flex for horizontal layout
      flexDirection: "row", // Align all items in a row
      flexWrap: "wrap", // Allow wrapping if the content exceeds the width
      gap: 2, // Space between each list item horizontally
      padding: 0, // Remove padding for a more compact layout
    }}
  >
    {causes.map((cause, index) => (
      <ListItem
        key={index}
        sx={{
          display: "flex", // Flexbox ensures the radio button and text are in a row
          alignItems: "center", // Center the items vertically
          gap: 1, // Space between the radio button and text
          p: 0, // Remove padding for a compact layout
        }}
      >
        {/* Radio Button Icon */}
        <RadioButtonCheckedIcon sx={{ color: "black" }} />
        {/* Cause Text */}
        <ListItemText
          primary={
            <Typography
              variant="subtitle1"
              sx={{
                color: "black",
                wordWrap: "break-word", // Prevent text overflow
              }}
            >
              {cause}
            </Typography>
          }
        />
      </ListItem>
    ))}
  </List>
</Box>

<Box
    sx={{
      width: "90%",
      backgroundColor: "white", // Change to a visible background if needed
      color: "black",
      padding: "8px 16px",
      borderRadius: "8px",
      boxShadow: 2,
      textAlign: "left", // Align text in the center
    }}
  >
   <Typography>
  Due to our applications being on a rolling basis, we do not request reference letters until we are reviewing for specific positions.
  <br />
  All documents can be emailed to <strong>careers@kairosintegrativehealth.com</strong>.
  <br />
  We look forward to hearing from you and learning more about how you could contribute to improving the quality of life of our community.
</Typography>

  </Box>

</Box>
</Box>
          
          </>
  );
};

export default Careers;
