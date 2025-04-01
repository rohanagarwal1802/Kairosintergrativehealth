import React from "react";
import { Box, Typography, Stack, List, ListItem, ListItemIcon } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Link from "next/link";

const CommunityOutreach = () => {
  return (
    <>
  <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger screens
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:"#C8AF8F",
    p: 4,
    gap: 2, // Space between elements
  }}
>
  {/* Left Image Section for Small Screens (Top Image) and Large Screens (Left Image) */}
  <Box
    sx={{
      position: "relative",
      height: { xs: 250, sm: 350, md: 450 }, // Adjusted for responsiveness
      width: { xs: "100%", sm: 300, md: 400 }, // Full width for small screens, fixed size for large screens
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      order: { xs: 1, sm: 0 }, // Image on top on small screens, left on larger screens
      mb: { xs: 3, sm: 0 }, // Margin for small screens to space from other elements
    }}
  >
    {/* Decorative Boxes */}
    <Box
      sx={{
        position: "absolute",
        top: "8%",
        left: "-15%",
        width: "80%",
        height: "35%",
        backgroundColor: "#535945",
        zIndex: 1,
        borderRadius: 2,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: "15%",
        left: "-5%",
        width: "10%",
        height: "20%",
        backgroundImage: "radial-gradient(white 10%, transparent 10%)",
        backgroundSize: "10px 10px",
        zIndex: 1,
        borderRadius: 1,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: "8%",
        right: "5%",
        width: "60%",
        height: "50%",
        backgroundColor: "#535945",
        zIndex: 1,
        borderRadius: 2,
      }}
    />
    {/* Image */}
    <Box
      component="img"
      src="/RRImage2.jpg"
      alt="Founder"
      sx={{
        height: "70%",
        width: "100%",
        objectFit: "cover",
        borderRadius: 2,
        boxShadow: 3,
        zIndex: 1,
      }}
    />
  </Box>

  {/* Main Content Section */}
  <Box
    sx={{
      maxWidth: "500px",
      textAlign: "left",
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
      p: 3,
      borderRadius: 2,
      boxShadow: 3,
      zIndex:2,
      order: { xs: 2, sm: 1 }, // Content comes after the first image on small screens
    }}
  >
    <Typography variant="h4" sx={{ mb: 2, color: "black", fontWeight: 600 ,textAlign:"center"}}>
      Community PartnerShips
    </Typography>
     <List sx={{ paddingLeft: "20px" }}>
     <ListItem
        sx={{ 
          display: "list-item",  // Ensures it behaves like a list item
          listStyleType: "disc", // Forces bullet points to appear
          paddingLeft: "10px",
          "&::marker": { color: "black", fontSize: "1.2rem" }, // Ensures bullet points are black
        }}
      >
    <Typography variant="body1" sx={{ color: "text.secondary", fontSize: 16,color:"black" }}>
      After working in North Carolina with Duke and Yale trained Psychiatrists/Addictionologists,
      Mark returned to Birmingham to open his own practice, Kairos Integrative Health. Two key areas
      of focus for the practice are to return knowledge and experience he acquired as well as help build
      resilience in others to reach the ultimate goal of improving our communities' quality of life now
      and in the future.
    </Typography>
    </ListItem>

    <ListItem
        sx={{ 
          display: "list-item",  // Ensures it behaves like a list item
          listStyleType: "disc", // Forces bullet points to appear
          paddingLeft: "10px",
          "&::marker": { color: "black", fontSize: "1.2rem" }, // Ensures bullet points are black
        }}
      >
    <Typography variant="body1" sx={{ color: "text.secondary", fontSize: 16,color:"black" }}>
    Interested in bringing the Resilience Roundtable to your organisation?{" "}
    <Link href="mailto:info@kairosintegrativehealth.com">
      <Typography
        component="span"
        sx={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        email us
      </Typography>
    </Link>
    </Typography>
      </ListItem>
    </List>
  
  </Box>

  {/* Right Image Section for Small Screens (Bottom Image) and Large Screens (Right Image) */}
  <Box
    sx={{
      position: "relative",
      height: { xs: 250, sm: 350, md: 450 }, // Adjusted for responsiveness
      width: { xs: "100%", sm: 300, md: 400 }, // Full width for small screens, fixed size for large screens
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      order: { xs: 3, sm: 2 }, // Image on bottom for small screens, right for large screens
      mt: { xs: 3, sm: 0 }, // Margin for small screens to space from other elements
    }}
  >
    {/* Decorative Boxes */}
    <Box
      sx={{
        position: "absolute",
        top: "8%",
        left: "-15%",
        width: "80%",
        height: "35%",
        backgroundColor: "#535945",
        zIndex: 1,
        borderRadius: 2,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: "15%",
        left: "-5%",
        width: "10%",
        height: "20%",
        backgroundImage: "radial-gradient(white 10%, transparent 10%)",
        backgroundSize: "10px 10px",
        zIndex: 1,
        borderRadius: 1,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: "8%",
        right: "5%",
        width: "60%",
        height: "50%",
        backgroundColor: "#535945",
        zIndex: 1,
        borderRadius: 2,
      }}
    />
    {/* Image */}
    <Box
      component="img"
      src="/RRImage1.jpg"
      alt="Founder"
                sx={{
                  height: "70%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: 3,
                  zIndex: 1,
                }}
    />
  </Box>
</Box>


      {/* Community Outreach Content */}
      <Box
        sx={{
          backgroundColor:"#C8AF8F",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          borderRadius: 2,
          mt: -2,
          minHeight: 'auto',
         
        }}
      >
         
        <Box
          sx={{
            // width: { xs: '95%', md: '70%' },
            margin: 'auto',
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            boxShadow: 6,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #ddd',
          }}
        >
          <Typography variant="h4" sx={{ mb: 0, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
           Current Partnership
          </Typography>
          <List sx={{ fontSize: 18, pl: 2 }}>
            <ListItem sx={{ color: 'black' }}>
              {/* <ListItemIcon sx={{ minWidth: 'auto', color: 'black', mr: 1 }}>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon> */}
              A core mission of KIH is to share knowledge with others, which is being achieved in our
              community through two main initiatives:
            </ListItem>
            <ListItem sx={{ color: 'black' }}>
              {/* <ListItemIcon sx={{ minWidth: 'auto', color: 'black', mr: 1 }}>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon> */}
             1. The Resilience RoundTable – Virtual RoundTable adults can join (anonymously if they choose) to
              gain information on a variety of mental health topics.
            </ListItem>
            <ListItem sx={{ color: 'black' }}>
              {/* <ListItemIcon sx={{ minWidth: 'auto', color: 'black', mr: 1 }}>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon> */}
             2. Community Outreach – KIH is currently working on partnerships with local nonprofits and high
              schools to equip those in our community with education to help develop resilience.
            </ListItem>
            {/* <ListItem sx={{ color: 'black' }}>
              <ListItemIcon sx={{ minWidth: 'auto', color: 'black', mr: 1 }}>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              Both of these initiatives allow for KIH to return knowledge and experiences to our community in
              hopes of building our communities' quality of life.
            </ListItem> */}
          </List>
        </Box>

        <Box
          sx={{
            // width: { xs: '95%', md: '70%' },
            margin: 'auto',
            mt: 1,
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            boxShadow: 6,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #ddd',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
            Resilience Roundtable
          </Typography>

          <Typography sx={{ fontSize: 18, pl: 2, mb: 2,color:"black"}}>
          KIH focuses on returning knowledge to the community and helping build resilience to enhance individuals’ quality of life. 
          </Typography>

          <Typography sx={{ fontSize: 18, pl: 2, mb: 2 ,color:"black"}}>
          The flagship initiative is the Resilience Roundtable, which started as a monthly virtual discussion covering various mental health topics. Although it has continued in this way, the Resilience Roundtable has been featured as an opportunity for teenagers through partnerships with local schools, and adult professional organizations in the form of continuing education. 
          </Typography>

          <Typography sx={{ fontSize: 18, pl: 2, mb: 2 ,color:"black"}}>
          Created by Mark to address the gap in mental health education, the Resilience Roundtable provides
           expert-driven, evidence-based information on topics like “Neuroreceptors in mental health” and “Mental Health in the family: Genetics and language.” These sessions offer valuable insights,
           empowering individuals to improve their well-being and build resilience.
          </Typography>

          <Typography sx={{ fontSize: 18, pl: 2,color:"black" }}>
            Interested in joining The Resilience Roundtable?{" "}
            <Link href="/Roundtable" passHref>
              <Typography
                component="span"
                sx={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Click here
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CommunityOutreach;
