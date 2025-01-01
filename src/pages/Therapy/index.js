import { Box, Typography, List, ListItem, Grid } from "@mui/material";

const TherapyPage = () => {
  const causes = [
    { title: "Genetics", description: "A family history of anxiety problems may increase the likelihood of developing anxiety disorders." },
    { title: "Brain Chemistry", description: "Imbalances in neurotransmitters, such as serotonin and dopamine, can contribute to anxiety." },
    { title: "Trauma", description: "Experiences like abuse, accidents, or natural disasters may heighten the risk of developing anxiety." },
    { title: "Stressful Life Events", description: "Events like moving, starting a new job, or relationship challenges can trigger anxiety." },
    { title: "Medical Conditions", description: "Chronic illnesses or hormonal imbalances are often associated with elevated anxiety levels." },
  ];

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
            Zindex:-1,
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
                zIndex: -4,
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
                zIndex: 1,
                borderRadius: 2,
              }}
            />
            {/* Image */}
            <Box
              component="img"
              src="/therapy.jpeg"
              alt="Founder"
              sx={{
                height: "70%",
                width: "70%",
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
              zIndex:2,
              borderRadius: 2,
              boxShadow: 3,
              order: { xs: 2, sm: 1 }, // Content comes after the first image on small screens
            }}
          >
            {/* Highlight Section */}
      <Box sx={{ p: 1, backgroundColor: "#DCEFEF", display: "inline-block", ml: "5%", mt: 3 }}>
        <Typography variant="body1" sx={{ color: "#043149", fontWeight: "bold" }}>
          Therapy
        </Typography>
      </Box>

      {/* Content Section */}
      <Box>
        <Box sx={{ ml: "5%", mt: "1%" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Therapy Services 
          </Typography>
        </Box>

        <Box sx={{ ml: "5%" }}>
          <Typography variant="body2" sx={{ color: "black" }}>
            At Kairos Integrative Health, we utilize psychotherapies when appropriate. In many cases, best outcomes result from a combination of psychotherapy with medication management. Psychotherapies utilized by our providers can include but are not limited to:
          </Typography>
        </Box>

        {/* List Section */}
        <Box sx={{ ml: "10%" }}>
          <List>
            {[
              "Cognitive Behavioral Therapy",
              "Supportive Psychotherapy",
              "Motivational Interviewing",
            ].map((therapy, index) => (
              <ListItem
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
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Note Section */}
        <Box
          sx={{
            // width: "90%",
            margin: "auto",
            // mt: 4,
            p: 3,
            borderRadius: 2,
            // boxShadow: 3,
            // bgcolor: "#f5f5f5",
            mb: 4,
            color: "black",
          }}
        >
          In the setting where you would benefit from more consistent psychotherapy or a psychotherapeutic modality that is not available from our provider(s), we may refer you out to a colleague to obtain appropriate care.
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
                backgroundColor: "#6F7863",
                 zIndex: 1,
                borderRadius: 2,
              }}
            />
            {/* Image */}
            <Box
              component="img"
              src="/therapy2.jpeg"
              alt="Founder"
              sx={{
                height: "70%",
                width: "70%",
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
                zIndex: 1,
              }}
            />
          </Box>
        </Box>
    

     
    </>
  );
};

export default TherapyPage;
