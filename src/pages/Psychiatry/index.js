import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import Image from "next/image";

const PTSDPage = () => {
  const causes = [
    { title: 'Comprehensive Approach:', description: 'Integrative psychiatry looks at all aspects of a person’s well-being, recognizing that mental health disorders can be influenced by physical health, lifestyle, trauma, social context, and emotional balance.' },
    { title: 'Combination of Conventional and Alternative Treatments:', description: 'While traditional psychiatric methods like psychotherapy and medication are often used, integrative psychiatry also incorporates other treatments such as:', Options: ['Nutritional and dietary interventions', 'Mind-body techniques', 'Herbal supplements and vitamins', 'Exercise and physical activity'] },
    { title: 'Focus on Personalized Care:', description: 'Integrative psychiatry takes a highly personalized approach to treatment, tailoring interventions to meet the unique needs of the individual. It seeks to create a holistic treatment plan based on the person’s specific symptoms, lifestyle, genetic predispositions, and personal preferences.' },
    { title: 'Prevention and Wellness:', description: 'This approach emphasizes not only treating mental health issues but also promoting long-term wellness and preventing mental health problems from arising in the first place. This could involve lifestyle adjustments, stress management techniques, and cultivating resilience.' },
  ];

  return (
    <>
    
      <Box
        sx={{
          backgroundColor: `#Ece7E2`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          borderRadius: 2,
          height: 'auto',
          width: '100%',
          '@media (max-width: 768px)': {
            padding: 2,
          },
          mt:"1%"
        }}
      >
         
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, '@media (max-width: 768px)': { flexDirection: 'column' } }}>
          <Box sx={{ maxWidth: '500px', width: '100%' }}>
            <Image
              src="/psychiatry.jpeg"
              alt="Mental Well-being"
              width={500} // Adjust as needed
              height={300}
              style={{ borderRadius: "8px", width: '100%', height: 'auto' }}
            />
          </Box>

          <Box sx={{ textAlign: "center", maxWidth: "1000px" }}>
            <Typography variant="h6" sx={{ color: "black", '@media (max-width: 768px)': { fontSize: '1rem' } }}>
              At Kairos Integrative Health, we are dedicated to supporting your goals through a
              comprehensive and integrative approach. Our clinic offers a range of services
              designed to meet your individual needs, ensuring that you receive care that helps
              you meet your goals.
            </Typography>
          </Box>
          
        </Box>
        <Box sx={{ ml: "5%", mt: "1%" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
            What is Integrative Psychiatry?
          </Typography>
        </Box>

        <Box sx={{ mt: "1%",mb:"1%" }}>
          <Typography variant="body2" sx={{ color: "black" }}>
            Integrative psychiatry is an approach to mental health care that combines traditional psychiatric practices with alternative, complementary, and holistic therapies to treat the whole person—body, mind, and spirit. It aims to address not only the symptoms of mental health conditions but also the root causes, considering the interplay between psychological, biological, emotional, and environmental factors.
          </Typography>
        </Box>

      </Box>
      <Box
        sx={{
          backgroundColor: `#Ece7E2`,
          mb:-3.5
          // backgroundSize: 'cover',
          // backgroundPosition: 'top',
          // backgroundRepeat: 'no-repeat',
          // height: 'auto',
        }}
      >
      <Box sx={{ p: 1, backgroundColor: "#DCEFEF", display: 'inline-block', ml: "5%" }}>
        <Typography variant="body1" sx={{ color: "#043149", fontWeight: "bold" }}>
        How our process works
        </Typography>
      </Box>

      <Box>

      <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          Interest form
          </Typography>
        </Box>

        <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              Complete the interest form by clicking on the
“Request Appointment” button (located on top right hand corner of
this page). This allows for you to be able to schedule your
complimentary phone call.
              </Typography>
            </ListItem>
          </List>
        </Box>

        <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          After filling out the interest form
          </Typography>
        </Box>

        

        <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              You will receive an
email from Kairos Integrative Health to create a password with Kairos Integrative
Health.
              </Typography>
            </ListItem>
          </List>
        </Box>

        <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          After creating your password,
          </Typography>
        </Box>    

         <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              You can login into Kairos Integrative Health with your registered email and created password.
              </Typography>
            </ListItem>
          </List>
        </Box>

       
        <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          Our team will confirm the complimentary phone
          call appointment
          </Typography>
        </Box>  
        <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              (keep an eye out on your email for
confirmation) and we will connect with you at the scheduled time
for a 10-minute phone call. This call will allow you to discuss with
our provider to see if KIH is a good fit for you.
              </Typography>
            </ListItem>
          </List>
        </Box>

        <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Complementary Phone Call
          </Typography>
        </Box>

        <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
             This phone call is to allow you to ask questions and get a better understanding of our mission at Kairos Integrative Health, as well as allow you and our provider to determine if we are the best team to help you meet your goals.
              </Typography>
            </ListItem>
          </List>
        </Box>


        <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Initial Comprehensive Evaluation
          </Typography>
        </Box>

        <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
                Our initial comprehensive evaluation allows us to assess your unique situation, history, and goals. This thorough assessment forms the foundation for personalized treatment tailored to your needs. Initial evaluations typically take between 1-2 sessions and in some cases may involve two separate visits. Initial visits are scheduled in-person, at 400 Vestavia Parkway suite 406, Vestavia Hills, AL.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
                Please note that the initial consultation does not guarantee specific medications, treatments, or documentation. 
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
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
                If discovered through the initial evaluation that medication is needed, our providers will work with you to safely initiate treatment. Typically, we will meet every 2-4 weeks if a medication is being started to review, adjust, and discuss any benefits or side effects with the medication. Typically, appointments will be stretched out to every 1-3 months as appropriate. Typical follow-ups will last 10-15 minutes as appropriate.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
                At this time, Kairos Integrative Health does not prescribe controlled substances. Familiar types of medications this includes are benzodiazepines (clonazepam, alprazolam, lorazepam, etc.), stimulants (amphetamines, methylphenidates, etc.), and hypnotics (zolpidem, eszopiclone, etc.), and other medications like gabapentin and pregabalin.
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
            mb: 4,
            '@media (max-width: 768px)': { width: '100%', padding: 2 }
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
                      <Typography variant="body2" sx={{ color: 'black' }}>
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
      </Box>
    </>
  );
};

export default PTSDPage;
