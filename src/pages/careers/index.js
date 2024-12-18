import React from "react";
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 2, sm: 4 },
          borderRadius: 2,
          minHeight: '100vh',
          width: '100%',
          zIndex: -50,
          overflow: 'visible',
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            width: '100%',
            gap: 4,
            overflow: 'visible',
          }}
        >
          {/* Left Image Section */}
          <Box
            sx={{
              height: { xs: 200, sm: 450 },
              width: { xs: "100%", sm: "50%" },
              backgroundImage: 'url("careerImage.jpeg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
              zIndex: 0,
              overflow: 'hidden',
            }}
          />
          
          {/* Text Section */}
          <Box
            sx={{
              width: { xs: "100%", sm: "50%" },
              padding: { xs: 2, sm: 4 },
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Title Section */}
            <Box
              sx={{
                backgroundColor: "lightgreen",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                boxShadow: 2,
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Careers at Kairos Integrative Health
              </Typography>
            </Box>

            {/* Text Content */}
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#333",
                  textAlign: "left",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                We are always looking to expand our team with dedicated professionals who are passionate about providing holistic, patient-centered care. We accept applications on a rolling basis from MDs, DOs, NPs, PAs, MSWs, and Psychologists. If you think you have a talent or skill (administrative skills, advertising background, etc.) that can help expand our ability to serve the Birmingham community, feel free to reach out—we would love to hear from you as well!
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Request List Section */}
        <Box
          sx={{
            width: "90%",
            backgroundColor: "white",
            color: "black",
            padding: "8px 16px",
            borderRadius: "8px",
            boxShadow: 2,
            textAlign: "center",
            mb: 4,
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
            flexDirection: "column",
            gap: 2,
            mb: 4,
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              gap: 2,
              padding: 0,
            }}
          >
            {causes.map((cause, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 0,
                }}
              >
                <ListItemIcon sx={{ minWidth: "24px" }}>
                  <RadioButtonCheckedIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "black",
                        wordWrap: "break-word",
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

        {/* Contact Section */}
        <Box
  sx={{
    width: "90%",
    backgroundColor: "white",
    color: "black",
    padding: "8px 16px",
    borderRadius: "8px",
    boxShadow: 2,
    textAlign: "left",
    mb: 4,
  }}
>
  <Typography>
    Due to our applications being on a rolling basis, we do not request reference letters until we are reviewing for specific positions.
    <br />
    All documents can be emailed to
    <strong
      style={{
        display: "inline-block",
        wordBreak: "break-word",
        whiteSpace: "normal",
        maxWidth: "100%", // Ensures it breaks into two lines if needed
      }}
    >
      careers@kairosintegrativehealth.com
    </strong>.
    <br />
    We look forward to hearing from you and learning more about how you could contribute to improving the quality of life of our community.
  </Typography>
</Box>

      </Box>
    </>
  );
};

export default Careers;
