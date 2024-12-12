import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography, List, ListItem, Grid } from "@mui/material";
import Image from "next/image";
import ContactForm from "@/components/Contact/contactForm";

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
          backgroundImage: `url('/depressionBackground.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          borderRadius: 2,
          height: "auto",
          width: "100%",
        }}
      >
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box>
              <Image
                src="/therapy.jpg"
                alt="Mental Well-being"
                width={500}
                height={300}
                style={{ borderRadius: "8px", width: "100%", height: "auto" }}
              />
            </Box>
          </Grid>

          {/* Title Section */}
          {/* <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
                Therapy Services
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
      </Box>

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
            Therapy Services :
          </Typography>
        </Box>

        <Box sx={{ ml: "5%" }}>
          <Typography variant="body2" sx={{ color: "black" }}>
            At Kairos Integrative Health, we do utilize psychotherapies when appropriate. In many cases, best outcomes result from a combination of psychotherapy with medication management. Psychotherapies utilized by our providers can include but are not limited to:
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
            width: "90%",
            margin: "auto",
            mt: 4,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "#f5f5f5",
            mb: 4,
            color: "black",
          }}
        >
          In the setting where you would benefit from more consistent psychotherapy or a psychotherapeutic modality that is not available from our provider(s), we may refer you out to a colleague to obtain appropriate care.
        </Box>
      </Box>
    </>
  );
};

export default TherapyPage;
