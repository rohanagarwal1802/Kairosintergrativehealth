import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography,List,ListItem,ListItemText  } from '@mui/material';
import Image from "next/image";
import ContactForm from "@/components/Contact/contactForm";
const AnxietyPage=()=>{
    const causes = [
        { title: 'Genetics', description: 'A family history of anxiety problems may increase the likelihood of developing anxiety disorders.' },
        { title: 'Brain Chemistry', description: 'Imbalances in neurotransmitters, such as serotonin and dopamine, can contribute to anxiety.' },
        { title: 'Trauma', description: 'Experiences like abuse, accidents, or natural disasters may heighten the risk of developing anxiety.' },
        { title: 'Stressful Life Events', description: 'Events like moving, starting a new job, or relationship challenges can trigger anxiety.' },
        { title: 'Medical Conditions', description: 'Chronic illnesses or hormonal imbalances are often associated with elevated anxiety levels.' },
      ];
return (
    <>
    
    
    <Box
  sx={{
    backgroundImage: `url('/depressionBackground.jpg')`,
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
    
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
  {/* Image */}
  <Box>
    <Image
      src="/anxious.png"
      alt="Mental Well-being"
      width={400} // Adjust as needed
      height={400}
      style={{ borderRadius: "8px" }} // Optional: Add rounded corners
    />  
  </Box>

  {/* Text */}
  <Box sx={{ textAlign: "center", maxWidth: "1000px" }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "black" }}>
    Anxiety Treatment in California
    </Typography>
    <Typography variant="body1">
    If you're struggling with anxiety, we have the best anxiety treatment in California that can help you take control of your life and manage your symptoms healthily.
    </Typography>
  </Box>
</Box>
</Box>
<Box sx={{ p: 1, backgroundColor: "#DCEFEF", display: 'inline-block', ml: "5%" }}>
        <Typography variant="body1" sx={{ color: "#043149", fontWeight: "bold" }}>
        Psychiatry
        </Typography>
      </Box>
      <Box sx={{ ml: "5%", mt: "1%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
        Best Anxiety Treatment in California
        </Typography>
      </Box>
      <Box sx={{ ml: "5%", mt: "1%" }}>
        <Typography variant="body2" sx={{ color: "black" }}>
        Anxiety is a prevalent and frequently devastating mental health disorder that affects millions of individuals throughout the world. While it is normal to feel anxious in reaction to stressful situations, anxiety disorders involve chronic and excessive concern or fear that interferes with daily life. Let us look at more in-depth answers about anxiety condition in the article below:
        </Typography>
      </Box>

      <Box >
      <Box sx={{ ml: "5%", mt: "1%" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
        Causes of Anxiety:
        </Typography>
      </Box>
      <Box sx={{ ml: "5%",}}>
        <Typography variant="body2" sx={{ color: "black" }}>
        Anxiety Disorders can be a result of several genetic, environmental, and psychological factors. Some of the common causes and risk factors are:
        </Typography>
      </Box>
      <Box
      sx={{
        width: '90%',
        margin: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: '#f5f5f5',
        mb:4
      }}
    >
     
      <List>
        {causes.map((cause, index) => (
          <ListItem key={index} sx={{ mb: 2 }}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'black' }}>
                  {index + 1}. {cause.title}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  {cause.description}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
        </Box>



</>);
}
export default AnxietyPage;