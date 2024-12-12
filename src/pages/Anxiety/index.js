import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import Image from "next/image";
import ContactForm from "@/components/Contact/contactForm";

const AnxietyPage = () => {
  const causes = [
    { title: "Genetics", description: "A family history of anxiety problems may increase the likelihood of developing anxiety disorders." },
    { title: "Brain Chemistry", description: "Imbalances in neurotransmitters, such as serotonin and dopamine, can contribute to anxiety." },
    { title: "Trauma", description: "Experiences like abuse, accidents, or natural disasters may heighten the risk of developing anxiety." },
    { title: "Stressful Life Events", description: "Events like moving, starting a new job, or relationship challenges can trigger anxiety." },
    { title: "Medical Conditions", description: "Chronic illnesses or hormonal imbalances are often associated with elevated anxiety levels." },
  ];

  return (
    <>
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
          padding: { xs: 2, sm: 4 }, // Adjust padding for different screen sizes
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Column on small screens
            alignItems: "center",
            gap: 2,
            p: 2,
          }}
        >
          {/* Image */}
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Image
              src="/addiction.jpg"
              alt="Mental Well-being"
              width={500}
              height={300}
              style={{ borderRadius: "8px" }}
            />
          </Box>

          {/* Text */}
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "black" }}
            >
              Anxiety Treatment in California
            </Typography>
            <Typography variant="body1">
              If you're struggling with anxiety, we have the best anxiety treatment in California that can help you take control of your life and manage your symptoms healthily.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 1, backgroundColor: "#DCEFEF", display: "inline-block", ml: { xs: "5%", sm: "10%" }, mt: 2 }}>
        <Typography variant="body1" sx={{ color: "#043149", fontWeight: "bold" }}>
          Psychiatry
        </Typography>
      </Box>

      <Box sx={{ ml: { xs: "5%", sm: "10%" }, mt: "1%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
          Best Anxiety Treatment in California
        </Typography>
      </Box>

      <Box sx={{ ml: { xs: "5%", sm: "10%" }, mt: "1%" }}>
        <Typography variant="body2" sx={{ color: "black" }}>
          Anxiety is a prevalent and frequently devastating mental health disorder that affects millions of individuals throughout the world. While it is normal to feel anxious in reaction to stressful situations, anxiety disorders involve chronic and excessive concern or fear that interferes with daily life. Let us look at more in-depth answers about anxiety condition in the article below:
        </Typography>
      </Box>

      <Box sx={{ mt: 4, mx: "auto", width: "90%" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black", mb: 2 }}>
          Causes of Anxiety:
        </Typography>
        <Typography variant="body2" sx={{ color: "black", mb: 2 }}>
          Anxiety Disorders can be a result of several genetic, environmental, and psychological factors. Some of the common causes and risk factors are:
        </Typography>
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "#f5f5f5",
            mb: 4,
          }}
        >
          <List>
            {causes.map((cause, index) => (
              <ListItem key={index} sx={{ mb: 2 }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ color: "black" }}
                    >
                      {index + 1}. {cause.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {cause.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default AnxietyPage;
