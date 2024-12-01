import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography,List,ListItem,ListItemText,Link  } from '@mui/material';
import Image from "next/image";
import ContactForm from "@/components/Contact/contactForm";
const HelpLinesPage=()=>{
    const causes = [
        { title: 'The National Suicide Prevention Lifeline (Now 988)', website:'https://988lifeline.org',description: 'By dialing 988, individuals in crisis can access immediate support for suicide prevention and mental health emergencies.\n The lifeline connects individuals with trained counselors who can provide assistance and direct them to local resources.' },
        { title: 'National Alliance on Mental Illness (NAMI) Alabama', website:'https://www.namialabama.orgNAMI', description: 'Alabama provides advocacy, education, and support for individuals living with mental health conditions and their families.\n It also offers local chapters across the state for peer support and resources.' },
        { title: 'Alabama Crisis Center', website:'https://www.alabamacrisiscenter.org', description: 'Are you facing difficult times and don’t know where to turn?\n Are you looking for help with everyday needs?\n Are you wanting to volunteer?\n Dialing 2-1-1 is your first step.\n 2-1-1 is a free, easy to remember number to dial for information about health and human service organizations in your community.\n By dialing 2-1-1, information is much easier to find.' },
        { title: 'Alabama 2-1-1 (United Way of Central Alabama)', website:'https://www.al211.org', description: 'A free, confidential service that connects individuals with health and human services, including mental health resources, across the state.\n 2-1-1 provides information and referrals for a wide range of community services.' },
        { title: 'DHR Alabama – Division of Behavioral Health',website:'https://www.dhr.alabama.gov', description: 'The Alabama Department of Human Resources provides mental health and behavioral health services, focusing on children, families, and individuals in need of psychological and psychiatric support.' },
        { title: 'The Alzheimer’s Association',website:'https://www.alz.org', description: 'For individuals and families affected by Alzheimer’s disease or other dementia-related conditions, the Alzheimer’s Association offers support groups, education, and resources for mental health and caregiving.' },
        { title: 'Birmingham AIDS Outreach (BAO) – Behavioral Health Services',website:'https://www.birminghamaidsoutreach.org', description: 'BAO offers behavioral health services with a focus on individuals living with HIV, providing counseling, therapy, and mental health support for marginalized populations in Alabama.' },
        { title: 'Alabama Mental Health',website:'https://www.alabamamentalhealth.org', description: 'This coalition offers advocacy for mental health professionals and individuals with mental health conditions, working to improve access to care and promote mental wellness throughout the state.' },
        { title: 'The Autism Society of Alabama',website:'https://www.autism-alabama.org', description: 'The Autism Society of Alabama provides support and resources for individuals with autism and related disorders, including mental health services, community programs, and advocacy efforts.' },
        { title: 'The National Helpline for Substance Abuse and Mental Health Services (SAMHSA)',website:'https://www.samhsa.gov/find-help', description: 'SAMHSA provides a national helpline (1-800-662-HELP) and a directory of treatment centers across the U.S., including Alabama, to help individuals find resources for addiction treatment and recovery.' },
        { title: 'DBT Self Help',website:'https://www.dbtselfhelp.com', description: 'DBTselfhelp.com is one of the most well-known resources for individuals seeking self-help materials for Dialectical Behavior Therapy.\n The website offers free worksheets, skills training resources, and detailed explanations of DBT concepts.\n It\'s a great starting point for those who want to learn and practice DBT skills on their own or supplement their therapy.' },
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
      src="/helpline.png"
      alt="Mental Well-being"
      width={400} // Adjust as needed
      height={400}
      style={{ borderRadius: "8px" }} // Optional: Add rounded corners
    />  
  </Box>

 
</Box>


      <Box sx={{ ml: "5%", mt: "1%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
        Some Importamt Headlines
        </Typography>
      </Box>
      
      <Box >
     
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
                <><Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'black' }}>
                            {index + 1}. {cause.title}
                        </Typography>
                        
                        
<Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'black' }}>
  Website: <Link href={cause.website} target="_blank" rel="noopener noreferrer">{cause.website}</Link>
</Typography>

                            
                            </>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'gray', whiteSpace: 'pre-line' }}>
                {cause.description}
              </Typography>
              
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
        </Box>


        </Box>
</>);
}
export default HelpLinesPage;