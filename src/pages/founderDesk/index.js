import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const FounderDesk = () => {
  return (
    <><Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", p: 4 }}>
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, sm: 400, md: 500 }, // Responsive height
          width: { xs: 300, sm: 400, md: 500 }, // Responsive width
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: { xs: 0, md: -4 }, // Shifts the image to the left on medium and larger screens
        }}
      >
        {/* #66BB6A Decorative Boxes Behind Image */}
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
            right: "5%",
            width: "60%",
            height: "50%",
            backgroundColor: "#66BB6A",
            zIndex: -1,
            borderRadius: 2,
          }} />
        {/* Image */}
        <Box
          component="img"
          src="/founder.jpg"
          alt="Founder"
          sx={{
            height: "70%",
            width: "70%",
            objectFit: "cover",
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 1,
          }} />

        {/* Rectangular Text Box at Bottom Left */}
        <Box
          sx={{
            position: "absolute",
            left: 0, // Aligned to the left edge of the image
            bottom: 0, // Aligned to the bottom edge of the image
            width: "50%", // Rectangular shape
            height: "20%", // Less height for the rectangle
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
            padding: 2,
            borderRadius: "8px 8px 0 0", // Rounded corners at the top
            boxShadow: 3,
            zIndex: 2, // Above the image
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "black", fontWeight: 500, textAlign: "center" }}
          >
            Inspiring Leadership and Vision
          </Typography>
        </Box>
      </Box>

      {/* Text Section */}
      <Stack
        sx={{
          ml: { xs: 0, md: 4 },
          mt: { xs: 4, md: 0 },
          justifyContent: "center",
          maxWidth: "400px",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: "black", fontWeight: 600 }}>
          Welcome to the Founder’s Desk
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: 16 }}>
          Mark Merritt is a dedicated Psychiatric Mental Health Nurse Practitioner (PMHNP) born, raised,
          and practicing in Birmingham, Alabama, with a passion for enhancing the well-being of in his
          community. With an extensive educational background, including a Master of Science in
          Psychiatric Mental Health Nursing, a Master of Business Administration, and a Bachelor of
          Science in Public Health, Mark utilizes his training and experience in population and individual
          based settings to provide a diverse understanding to everyone’s unique presentation.
        </Typography>
      </Stack>
    </Box>
    <Box
  sx={{
    backgroundImage: `url('/fdBackground.jpg')`,
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
  }}
>
    <Box
  sx={{
    width: '90%',
    margin: 'auto',
    mt: 4,
    p: 4,
    borderRadius: 2,
    boxShadow: 3,
    bgcolor: '#ffffff', // Updated background for a cleaner look
    mb: 4,
    border: '1px solid #ddd',
  }}
>
  <Typography variant="h4" sx={{ color: 'black', mb: 2, fontWeight: 'bold' }}>
    Meet Mark
  </Typography>

  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
    Mark has vast experience in the healthcare industry, spanning:
  </Typography>
  <ul style={{ paddingLeft: '20px', color: 'black', lineHeight: 1.8 }}>
    <li>Emergency Departments</li>
    <li>Inpatient Psychiatry</li>
    <li>Outpatient Psychiatry</li>
    <li>Substance Abuse Centers</li>
  </ul>

  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
    His diverse background gives him a unique perspective on the healthcare system and a passion for preventing individuals from "falling through the cracks."
  </Typography>

  <Typography variant="h5" sx={{ color: '#333', mb: 2, fontWeight: 'bold' }}>
    Career Highlights
  </Typography>
  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
    <b>St. Vincent’s East:</b> Mark began his career in the fast-paced Emergency Department and Acute Behavioral Health Unit. His dedication earned him the role of <b>Charge Nurse</b>, where he focused on:
  </Typography>
  <ul style={{ paddingLeft: '20px', color: 'black', lineHeight: 1.8 }}>
    <li>Staff Education</li>
    <li>Patient Advocacy</li>
    <li>Process Improvement</li>
  </ul>

  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
    As a <b>Psychiatric Mental Health Nurse Practitioner</b>, Mark provides comprehensive assessments, diagnoses, and treatment for various mental health challenges, including substance use disorders. He collaborates with patients to create personalized treatment plans that foster resilience and improve quality of life.
  </Typography>

  <Typography variant="h5" sx={{ color: '#333', mb: 2, fontWeight: 'bold' }}>
    Educator & Mentor
  </Typography>
  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
    Mark is passionate about guiding the next generation of healthcare professionals. He has served as a clinical instructor, focusing on psychiatric and addiction nursing, while inspiring students through education and mentorship.
  </Typography>

  <Typography variant="h5" sx={{ color: '#333', mb: 2, fontWeight: 'bold' }}>
    Life Beyond Work
  </Typography>
  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8 }}>
    Outside of his professional life, Mark enjoys:
  </Typography>
  <ul style={{ paddingLeft: '20px', color: 'black', lineHeight: 1.8 }}>
    <li>Hiking</li>
    <li>Volleyball</li>
    <li>Exercising</li>
    <li>Pickleball</li>
    <li>Cooking</li>
    <li>Traveling</li>
    <li>Spending time with his nieces</li>
  </ul>
  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mt: 3 }}>
    Mark believes in the harmony of mind, body, and spirit, emphasizing that balancing these components is key to achieving overall mental wellness and a better quality of life.
  </Typography>
</Box>
</Box>
       
       </>
  );
};

export default FounderDesk;
