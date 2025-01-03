import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography, List, ListItem, Grid } from "@mui/material";
import Image from "next/image";
import ContactForm from "@/components/Contact/contactForm";

const AddictionPage = () => {


  return (
    <>
      {/* Background Section */}
     
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger screens
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor:"#Ece7E2",
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
                backgroundColor: "#6F7863",
              zIndex: 2,
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
              zIndex: 4,
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
                backgroundColor: "#6F7863",
              zIndex: 2,
                borderRadius: 2,
              }}
            />
            {/* Image */}
            <Box
              component="img"
              src="/addict.jpeg"
              alt="Founder"
              sx={{
                height: "70%",
                width: "70%",
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
                zIndex: 4,
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
              zIndex:4,
              order: { xs: 2, sm: 1 }, // Content comes after the first image on small screens
            }}
          >
            {/* Highlight Section */}
      <Box sx={{ p: 1, backgroundColor: "#535945", display: "inline-block", ml: "5%", mt: 3 }}>
        <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
        Addiction
        </Typography>
      </Box>

      {/* Content Section */}
      <Box>
        <Box sx={{ ml: "5%", mt: "1%" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          Substance Use and Medication-Assisted Treatment (MAT)
          </Typography>
        </Box>

       

        {/* List Section */}
        <Box sx={{ ml: "10%" }}>
          <List>
            {[
              `Addiction is a complex, chronic condition that affects both the mind
and body, that can lead to destructive behaviors and strained
relationships. Whether it involves substances like alcohol,
prescription medications, or illicit drugs, addiction can feel
overwhelming, but recovery is possible. At KIH we are committed to
providing compassionate, evidence-based care tailored to each
individual's needs. We work together to develop a personalized
treatment plan that addresses the underlying causes of addiction
and promotes long-term recovery.`,
            
              `Please note we do not currently offer treatment with Suboxone or other
medications containing buprenorphine as it is a controlled substance.`,
            ].map((therapy, index) => (
              <><ListItem
                key={index}
                sx={{
                  display: "list-item",
                  p: 0,
                  "&::before": {
                    content: '"•"',
                    color: "black",
                    fontSize: "1.5rem",
                    position: "absolute",
                    left: "-1.5rem",
                  },
                }}
              >
                <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
                  {therapy}
                </Typography>
              </ListItem><br /></>
            ))}
          </List>
        </Box>

       
      </Box>
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
                backgroundColor: "#6F7863",
              zIndex: 2,
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
              zIndex: 4,
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
                backgroundColor: "#6F7863",
              zIndex: 2,
                borderRadius: 2,
              }}
            />
            {/* Image */}
            <Box
              component="img"
              src="/addiction2.jpeg"
              alt="Founder"
              sx={{
                height: "70%",
                width: "70%",
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
                zIndex: 4,
              }}
            />
          </Box>
        </Box>
    

     
    </>
  );
};

export default AddictionPage;
