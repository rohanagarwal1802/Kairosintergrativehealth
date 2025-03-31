import React from "react";
import { Box, Typography, Stack,Grid } from "@mui/material";
import { useState,useEffect } from "react";
import useUserStore from "@/components/useUserStore";

const data = [
  {
    title: "Mood Disorders",
    items: ["Major Depressive Disorder", "Dysthymia", "Bipolar Disorder"]
  },
  {
    title: "Anxiety Disorders",
    items: ["Generalized Anxiety Disorder", "Panic Disorder", "Social Anxiety Disorder","Agoraphobia"]
  },
  {
    title: "Obsessive-Compulsive and Related Disorders",
    items: ["Obsessive Compulsive Disorder", "Trichotillomania","Excoriation"]
  },
  {
    title: "Trauma-Stress Related Disorders",
    items: ["PTSD", "Adjustment Disorders"]
  },
  {
    title: "Neurodevelopmental Disorders",
    items: ["ADHD"]
  },
  {
    title: "Substance Use Disorders",
    items: ["AUD", "OUD","Cannabis Use Disorder","Smoking Cessation"]
  },

  {
    title: "Psychotic Disorders",
    items: ["Schizophrenia", "Schizoaffective"]
  }
];


const FounderDesk = () => {
  const { preferedLocation } = useUserStore();
  return (
    <><Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", p: 4,  backgroundColor:"#C8AF8F",zIndex:-2, }}>
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
        {/* #6F7863 Decorative Boxes Behind Image */}
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            left: "-15%",
            width: "80%",
            height: "35%",
            backgroundColor: "#6F7863",
            zIndex: 0,
            borderRadius: 2,
          }} />

        {/* Dotted Box */}
        <Box
          sx={{
            position: "absolute",
            top: "15%", // Aligned vertically with some padding
            left: "-5%", // Positioned on the left of the #6F7863 box
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
            backgroundColor: "#6F7863",
            zIndex: 0,
            borderRadius: 2,
          }} />
        {/* Image */}
        <Box
          component="img"
          src="/founder.jpg"
          alt="Founder"
          sx={{
            height: "79%",
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
            height: "fit-content", // Less height for the rectangle
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
          textAlign: { xs: "left", md: "left" },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: "black", fontWeight: 600 }}>
        Mark Merritt 

MSN, MBA, PMHNP-BC
        </Typography>
      {preferedLocation==='Alabama' &&  <Typography variant="body1" sx={{ color: "black", fontSize: 16 }}>
          Mark Merritt is a dedicated Psychiatric Mental Health Nurse Practitioner (PMHNP) <b>born</b>, <b>raised</b>,
          and <b>practicing</b> in Birmingham, Alabama, with a passion for enhancing the well-being of his
          community. With an extensive educational background, including a Master of Science in Nursing specializing and psychiatric – mental health nursing, a Master of Business Administration, and a Bachelor of
          Science in Public Health, Mark utilizes his training and experience in population and individual
          based settings to provide a diverse understanding to each individual’s unique presentation as well as enhance the well-being of his community.
        </Typography>}

        {preferedLocation==='North Carolina' &&  <Typography variant="body1" sx={{ color: "black", fontSize: 16 }}>
        Mark Merritt is a dedicated Psychiatric Mental Health Nurse Practitioner (PMHNP). <b>He has practiced in the triangle are for over 3 years.</b>
         With an extensive educational background, including a Master of Science in Nursing specializing and psychiatric – mental health nursing, a Master of Business Administration, and a Bachelor of Science in Public Health, Mark utilizes his training and experience in population and individual based settings to provide a diverse understanding to each individual’s unique presentation as well as enhance the well-being of his community. 
        </Typography>}
      </Stack>
   
    <Box
  sx={{
   
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 4, // Adds padding around the content
    borderRadius: 2, // Optional: Adds rounded corners for a softer look
    height: 'auto', // Dynamically adjusts height to fit content
    width: '100%', // Ensures it spans the full width
  }}
>
    <Box
  sx={{
    width: '100%',
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
  <Typography variant="h4" sx={{ color: 'black', mb: 2, fontWeight: 'bold',textAlign:"center" }}>
    Meet Mark
  </Typography>

  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
  Mark’s vast experience in our healthcare system spans:
  </Typography>
  <div
  style={{
    display: 'flex', // Enables Flexbox
    flexWrap: 'wrap', // Allows wrapping to the next line
    gap: '10px', // Space between items
    justifyContent: 'flex-start', // Align items to the left
    backgroundColor: '#6F7863',
color:"white", // Light blue with transparency
    borderRadius: '10px', // Rounded corners
    padding: '20px', // Padding inside the box
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for better visibility
    width: '100%', // Make the box take up full width of its parent container
    boxSizing: 'border-box', // Includes padding in width calculations
    marginLeft: '0', // Aligns the box to the left
    marginBottom: 10,
  }}
>
  {[ 
    'Emergency Departments', 
    'Inpatient Psychiatry', 
    'Outpatient Psychiatry', 
    'Substance Abuse Centers' 
  ].map((item, index) => (
    <div
      key={index}
      style={{
        flex: '1 1 45%', // Flex-grow, shrink, and basis (roughly 45% of parent width)
        minWidth: '150px', // Minimum width to ensure proper wrapping
        textAlign: 'left', // Center-align text
        color: 'white',
        lineHeight: 1.5,
      }}
    >
        <li key={index} style={{ marginBottom: '10px' }}>
      {item}
      </li>
    </div>
  ))}
</div>





  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
  Mark has extensive experience across various healthcare settings, including <b>Emergency Departments,
   Inpatient Psychiatry, Outpatient Psychiatry, and Substance Abuse Centers.</b> This diverse background 
   provides him with a comprehensive understanding of the challenges patients face at different levels of 
  care, fueling his commitment to continuity of care and improving patient outcomes.  
  </Typography>
{/* <Box sx={{backgroundColor: '#6F7863',
color:"white", // Light blue with transparency
    borderRadius: '10px', // Rounded corners
    padding: '20px', // Padding inside the box
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for better visibility
    maxWidth: '400px', // Restrict width to avoid stretching
    marginLeft: '0', // Aligns the box to the left
}}>
  <Typography variant="h5" sx={{ color: '#333', mb: 2, fontWeight: 'bold' }}>
    Career Highlights
  </Typography>
  </Box> */}
  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
    {/* <b>St. Vincent’s East:</b>  */}
    {/* &nbsp; */}
    Mark began his career as a <strong>registered nurse</strong> in one of the busiest Emergency Departments in Alabama. He later transitioned to working in an inpatient Acute Behavioral Health Unit. His dedication earned him the role of <b>Charge Nurse</b>, where he focused on:
  </Typography>

  <div
  style={{
    display: 'flex', // Enables Flexbox
    flexWrap: 'wrap', // Allows wrapping to the next line
    gap: '10px', // Space between items
    justifyContent: 'flex-start', // Align items to the left
    backgroundColor: '#6F7863',
color:"white", // Light blue with transparency
    borderRadius: '10px', // Rounded corners
    padding: '20px', // Padding inside the box
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for better visibility
    width: '100%', // Make the box take up full width of its parent container
    boxSizing: 'border-box', // Includes padding in width calculations
    marginLeft: '0', // Aligns the box to the left
    marginBottom: 10,
  }}
>
  {[ 
    'Patient Care', 
    'Advocacy', 
    'Process Improvement', 
    'Staff Education' 
  ].map((item, index) => (
    <div
      key={index}
      style={{
        flex: '1 1 45%', // Flex-grow, shrink, and basis (roughly 45% of parent width)
        minWidth: '150px', // Minimum width to ensure proper wrapping
        textAlign: 'left', // Center-align text
        color: 'white',
        lineHeight: 1.5,
      }}
    >
        <li key={index} style={{ marginBottom: '10px' }}>
      {item}
      </li>
    </div>
  ))}
  </div>



  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
  As a Psychiatric Mental Health Nurse Practitioner, Mark has worked alongside Duke and Yale-trained psychiatrists and addictionologists, while practicing in both general psychiatry and addiction. 
  </Typography>

 

  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
  Mark treats a wide range of mental health challenges, including
  </Typography>

  <Grid container spacing={3}>
      {data.map((box, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>
           <Box
        sx={{
          backgroundColor: '#6F7863',
color:"white", // Light blue with transparency
          borderRadius: '10px', // Rounded corners
          padding: '20px', // Padding inside the box
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for better visibility
          maxWidth: '100%', // Ensure it stays within the grid
          height: '250px', // Fixed height for all boxes
          overflow: 'hidden', // Prevents content from spilling
          textOverflow: 'ellipsis', // For long text
          mb:2
        }}
      >
           <Typography
  variant="h6"
  component="div"
  sx={{
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'white',
    overflow: 'hidden', // Allows the content to wrap but hides overflow outside container
    whiteSpace: 'normal', // Allows the text to wrap
    wordWrap: 'break-word', // Ensures long words are wrapped properly
  }}
>
  {box.title}
</Typography>

            <ul
          style={{
            paddingLeft: '20px',
            color: 'white',
            lineHeight: 1.8,
            maxHeight: 'calc(100% - 40px)', // Adjust for the title
            overflowY: 'auto', // Scrollable if too many items
            wordWrap: 'break-word', // Break long text
          }}
        >
              {box.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Box>
        </Grid>
      ))}
    </Grid>

<Typography variant="body1" sx={{ color: 'black', lineHeight: 1.8, mb: 3 }}>
An educator and mentor, Mark has been featured in alumni panels for the <b>UAB Ryals School of Public Health</b>,
 hosted <b>educational sessions for the Birmingham BAR Association</b>, and <b>developed and executed curriculum
  for high school students.</b> He has also served as a <b>clinical instructor</b>, specializing in psychiatric 
  and addiction nursing, inspiring the next generation of healthcare professionals through education
   and mentorship.
  </Typography>
  {/* <Box sx={{backgroundColor: '#6F7863',
color:"white", // Light blue with transparency
    borderRadius: '10px', // Rounded corners
    padding: '20px', // Padding inside the box
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for better visibility
    maxWidth: '400px', // Restrict width to avoid stretching
    marginLeft: '0', // Aligns the box to the left
}}>
  <Typography variant="h5" sx={{ color: '#333', mb: 2, fontWeight: 'bold' }}>
    Educator & Mentor
  </Typography>
  </Box> */}

  {/* <Box sx={{backgroundColor: '#6F7863',
color:"white", // Light blue with transparency
    borderRadius: '10px', // Rounded corners
    padding: '20px', // Padding inside the box
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for better visibility
    maxWidth: '400px', // Restrict width to avoid stretching
    marginLeft: '0', // Aligns the box to the left
}}>
  <Typography variant="h5" sx={{ color: '#333', mb: 2, fontWeight: 'bold' }}>
    Life Beyond Work
  </Typography>
  </Box>
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
  </Typography> */}
</Box>
</Box>
</Box> 
       </>
  );
};

export default FounderDesk;
