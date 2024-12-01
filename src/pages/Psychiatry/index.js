import GoogleMap from "../../components/Contact/googleMap";
import { Box, Typography,List,ListItem,ListItemText  } from '@mui/material';
import Image from "next/image";
const PTSDPage=()=>{
    const causes = [
        { title: 'Comprehensive Approach:', description: 'Integrative psychiatry looks at all aspects of a person’s well-being, recognizing that mental health disorders can be influenced by physical health, lifestyle, trauma, social context,and emotional balance.' },
        { title: 'Combination of Conventional and Alternative Treatments:', description: 'While traditional psychiatric methods like psychotherapy and medication are often used, integrative psychiatry also incorporates oter treatments such as:',Options:['Nutritional and dietary interventions','Mind-body techniques',
          'Herbal supplements and vitamins','Exercise and physical activity'] },
        { title: 'TFocus on Personalized Care:', description: 'Integrative psychiatry takes a highly personalized approach to treatment, tailoring interventions to meet the unique needs of the individual. It seeks to create a holistic treatment plan based on the person;s specific symptoms, lifestyle, genetic predispositions, and personal preferences.' },
        { title: 'Prevention and Wellness:', description: 'This approach emphasizes not only treating mental health issues but also promoting long-term wellness and preventing mental health problems from arising in the first place. This could involve lifestyle adjustments, stress management techniques, and cultivating resilience.' },
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
      src="/ptsd.png"
      alt="Mental Well-being"
      width={400} // Adjust as needed
      height={400}
      style={{ borderRadius: "8px" }} // Optional: Add rounded corners
    />
  </Box>

  {/* Text */}
  <Box sx={{ textAlign: "center", maxWidth: "1000px" }}>
   
    <Typography variant="h6" sx={{color:"black"}}>
    At Kairos Integrative Health, we are dedicated to supporting your goals through a
comprehensive and integrative approach. Our clinic offers a range of services
designed to meet your individual needs, ensuring that you receive care that helps
you meet your goals.
    </Typography>
  </Box>
</Box>
</Box>
<Box sx={{ p: 1, backgroundColor: "#DCEFEF", display: 'inline-block', ml: "5%" }}>
        <Typography variant="body1" sx={{ color: "#043149", fontWeight: "bold" }}>
        Psychiatry
        </Typography>
      </Box>
     
      
      <Box >
      <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
  <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
    Complementary Phone Call
  </Typography>
</Box>

      <Box sx={{ ml: "10%" }}>
  <List >
    <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
      <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
        Once we receive your interest form, we will have a provider review it and reach out to you for a 15-minute phone call. This phone call is to allow you to ask questions and get a better understanding of our mission at Kairos Integrative Health, as well as allow you and our provider to determine if we are the best team to help you meet your goals.
      </Typography>
    </ListItem>
  </List>
</Box>


<Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
  <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
  Initial Comprehensive Evaluation.
  </Typography>
</Box>
      <Box sx={{ ml: "10%" }}>
  <List >
    <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
      <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
Our initial comprehensive evaluation allows us to assess your
unique situation, history, and goals. This thorough assessment
forms the foundation for personalized treatment tailored to your
needs. Initial evaluations typically take between 60-120 minute
and in some cases may involve two separate visits. Initial visits are
scheduled in-person, at 400 Vestavia Parkway suite 406, Vestavia
Hills, AL.
      </Typography>
    </ListItem>
    <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
      <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
    Please note that the initial consultation does not guarantee
specific medications, treatments, or documentation. Certain

paperwork, such as disability
      </Typography>
    </ListItem>
  </List>
</Box>

<Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
  <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
  Medication Management
  </Typography>
</Box>
      <Box sx={{ ml: "10%" }}>
  <List >
    <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
      <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
      If discovered through the initial evaluation that medication is
needed, our providers will work with you to safely initiate
treatment. Typically, we will meet every 2-4 weeks if a medication
is being started to review, adjust, and discuss any benefits or side
effects with the medication. Typically, appointment will be
stretched out to every 1-3 months as appropriate. Typical follow
ups will last 20-40 minutes as appropriate.
      </Typography>
    </ListItem>
    <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
      <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
      *At this time Kairos Integrative Health does not prescribe
controlled substances. Familiar types of medications this includes
are benzodiazepines (clonazepam, alprazolam, lorazepam, etc.),
stimulants (amphetamines, methylphenidates, etc.), and hypnotics
(zolpidem, eszopiclone, etc.), and other medications like
gabapentin and pregabalin. For a full list of controlled substances
please review the updated controlled substance list on the Drug
Enforcement Agency (DEA) website. If you have questions about
whether a provider can prescribe a specific medication, you are
encouraged to ask in the complimentary phone call.
      </Typography>
    </ListItem>
  </List>
</Box>
<Box sx={{ ml: "5%", mt: "1%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
        What is Integrative psychiatry ?
        </Typography>
      </Box>
      <Box sx={{ ml: "5%", mt: "1%" }}>
        <Typography variant="body2" sx={{ color: "black" }}>
        Integrative psychiatry is an approach to mental health care that
combines traditional psychiatric practices with alternative,
complementary, and holistic therapies to treat the whole person—body,
mind, and spirit. It aims to address not only the symptoms of mental health
conditions but also the root causes, considering the interplay between
psychological, biological, emotional, and environmental factors.
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
     <Box sx={{ mt: "1%", display: "flex", alignItems: "center" }}>
  <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
  Key Features of Integrative Psychiatry:
  </Typography>
</Box>
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
          <>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              {cause.description}
            </Typography>
            {cause.Options && (
  <Box sx={{ ml: "10%" }}>
    <List>
      {cause.Options.map((value, index) => (
        <ListItem
          key={index}
          sx={{
            display: 'list-item',
            p: 0,
            '&::before': {
              content: '"•"',
              color: 'black',
              fontSize: '1.5rem',
              position: 'absolute',
              left: '-1.5rem',
            },
          }}
        >
          <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
            {value}
          </Typography>
        </ListItem>
      ))}
    </List>
  </Box>
)}

          </>
        }
      />
    </ListItem>
  ))}
</List>

    </Box>
        </Box>



</>);
}
export default PTSDPage;