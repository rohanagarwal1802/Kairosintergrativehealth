import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography,List,ListItem,ListItemText  } from '@mui/material';
import Image from "next/image";
import ContactForm from "@/components/Contact/contactForm";
const TherapyPage=()=>{
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
    
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center",mb:-12}}>
  {/* Image */}
  <Box>
    <Image
      src="/therapy.png"
      alt="Mental Well-being"
      width={500} // Adjust as needed
      height={500}
      style={{ borderRadius: "8px",marginLeft:"1%" }} // Optional: Add rounded corners
    />
 

</Box>
 </Box>
 </Box>
<Box sx={{ p: 1, backgroundColor: "#DCEFEF", display: 'inline-block', ml: "5%" }}>
        <Typography variant="body1" sx={{ color: "#043149", fontWeight: "bold" }}>
        Therapy
        </Typography>
      </Box>
      

      <Box >
      <Box sx={{ ml: "5%", mt: "1%" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
        Therapy Services :
        </Typography>
      </Box>
      <Box sx={{ ml: "5%",}}>
        <Typography variant="body2" sx={{ color: "black" }}>
        At Kairos Integrative Health, we do utilized psychotherapies when
appropriate. In many cases, best outcomes result from a
combination of psychotherapy with medication management.
Psychotherapies utilized by our providers can include but are not
limited to:
        </Typography>
      </Box>

      <Box sx={{ ml: "10%" }}>
  <List >
    <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
      <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
      Cognitive Behavioral Therapy
      </Typography>
    </ListItem>
    <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
      <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
      Supportive Psychotherapy
      </Typography>
    </ListItem>

    <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
      <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
      Motivational Interviewing
      </Typography>
    </ListItem>
  </List>
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
        mb:4,
        color:"black"
      }}
    >
     
     In the setting where you would benefit from more
consistent psychotherapy or a psychotherapeutic
modality that is not available from our provider(s), we
may refer you out to a colleague to obtain appropriate
care.
    </Box>
        </Box>



</>);
}
export default TherapyPage;