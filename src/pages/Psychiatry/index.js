import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import Image from "next/image";
import useUserStore from '@/components/useUserStore';
import { useState,useEffect } from 'react';

const PTSDPage = () => {
    const { preferedLocation, setPreferedLocation } = useUserStore();
    const [address,setAddress]=useState('')
  const causes = [
    { title: 'Comprehensive Approach:', description: 'Integrative psychiatry looks at all aspects of a person’s well-being, recognizing that mental health disorders can be influenced by physical health, lifestyle, trauma, social context, and emotional balance.' },
    { title: 'Combination of Conventional and Alternative Treatments:', description: 'While traditional psychiatric methods like psychotherapy and medication are often used, integrative psychiatry also incorporates other treatments such as:', Options: ['Nutritional and dietary interventions', 'Mind-body techniques', 'Herbal supplements and vitamins', 'Exercise and physical activity'] },
    { title: 'Focus on Personalized Care:', description: 'Integrative psychiatry takes a highly personalized approach to treatment, tailoring interventions to meet the unique needs of the individual. It seeks to create a holistic treatment plan based on the person’s specific symptoms, lifestyle, genetic predispositions, and personal preferences.' },
    { title: 'Prevention and Wellness:', description: 'This approach emphasizes not only treating mental health issues but also promoting long-term wellness and preventing mental health problems from arising in the first place. This could involve lifestyle adjustments, stress management techniques, and cultivating resilience.' },
  ];
 useEffect(()=>{
    if(preferedLocation==='Alabama')
    {
      setAddress('400 Vestavia Parkway suite 406, Vestavia Hills, AL')

    }
    else if(preferedLocation==='North Carolina')
    {
      setAddress('523 Keisler Drive Suite 202 Cary, NC 27518523 Keisler Drive Suite 202 Cary, NC 27518')
    
    }})
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
              src="/psychiatry.jpg"
              alt="Mental Well-being"
              width={400} // Adjust as needed
              height={300}
              style={{ borderRadius: "8px", width: '100%', height: 'auto' }}
            />
          </Box>

          <Box sx={{ textAlign: "left", maxWidth: "1000px" }}>
            <Typography variant="h6" sx={{ color: "black", '@media (max-width: 768px)': { fontSize: '1rem' } }}>
              At Kairos Integrative Health, we are dedicated to supporting your goals through a
              comprehensive and integrative approach. Our practice offers a range of services
              designed to meet your individual needs, ensuring that you receive care that helps
              you meet your goals.
            </Typography>
          </Box>
          
        </Box>
        <Box sx={{  mt: "5%" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
            What is Integrative Psychiatry?
          </Typography>
        </Box>

        <Box sx={{ mt: "1%",mb:"1%" }}>
          <Typography variant="body2" sx={{ color: "black" }}>
            Integrative psychiatry is an approach to mental health care that combines traditional psychiatric practices with alternative, complementary, and holistic therapies to treat the whole person, body, mind, and spirit. It aims to address not only the symptoms of mental health conditions but also the root causes, considering the interplay between psychological, biological, emotional, and environmental factors.
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
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

      
      <Box
        sx={{
          backgroundColor: `#Ece7E2`,
          // mb:-3.5
          // backgroundSize: 'cover',
          // backgroundPosition: 'top',
          // backgroundRepeat: 'no-repeat',
          // height: 'auto',
        }}
      >
      <Box sx={{ p: 1, backgroundColor: "#535945", display: 'inline-block', ml: "5%" }}>
        <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
        How our process works
        </Typography>
      </Box>

      <Box>

      {/* <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
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
this page). This allows you to be able to schedule your
complimentary phone call.
              </Typography>
            </ListItem>
          </List>
        </Box> */}

        {/* <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          After filling out the interest form
          </Typography>
        </Box> */}

        

        {/* <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              You will receive an
email from Kairos Integrative Health to create a password with KIH through Tebra, where
you will be able to schedule your complimentary phone call.
              </Typography>
            </ListItem>
          </List>
        </Box> */}

        {/* <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          After creating your password
          </Typography>
        </Box>    

         <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              You can login into Kairos Integrative Health with your registered email and created password to schedule your complimentary phone call.
              </Typography>
            </ListItem>
          </List>
        </Box> */}

       
        {/* <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          Our team will confirm the complimentary phone
          call appointment
          </Typography>
        </Box>   */}
        <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              Click <b>"Request Appointment"</b> to schedule a 
              <b>"Complimentary Phone Call"</b> or <b>"Initial Visit Appointment."</b> Our team will confirm your requested time or suggest an alternative.
              </Typography>
            </ListItem>
          </List>
        </Box>

        <Box sx={{ ml: "5%", mt: "1%", display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Once Confirmed : 
          </Typography>
        </Box>

        <Box sx={{ ml: "10%" }}>
          <List>
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              For a "Complimentary Phone Call," we’ll call you to answer questions and determine if KIH is the right fit. 
              </Typography>
            </ListItem>

            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
              For an "Initial Visit Appointment," you'll receive new patient paperwork to complete 24 hours before your appointment. If you chose a telehealth appointment, you will also receive a link to use to enter the appointment.  
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
                Our initial comprehensive evaluation allows us to assess your unique situation, history, and goals. This thorough assessment forms the foundation for personalized treatment tailored to your needs. Initial evaluations typically take between 1-2 sessions and in some cases may involve two separate visits. Initial visits are scheduled via telehealth or in-person at {address}.
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
                If discovered through the initial evaluation that medication is appropriate, our providers will work with you to safely initiate treatment. Typically, we will meet every 2-4 weeks if a medication is being started to review, adjust, and discuss any benefits or side effects with the medication. Often, appointments will be stretched out to every 1-3 months as appropriate. Usually follow-ups will last 15-30 minutes as appropriate.
              </Typography>
            </ListItem>
            {preferedLocation==='Alabama' &&
            <ListItem sx={{ display: 'list-item', p: 0, '&::before': { content: '"•"', color: 'black', fontSize: '1.5rem', position: 'absolute', left: '-1.5rem' } }}>
              <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
                At this time, Kairos Integrative Health does not prescribe controlled substances. Familiar types of medications this includes are benzodiazepines (clonazepam, alprazolam, lorazepam, etc.), stimulants (amphetamines, methylphenidates, etc.), and hypnotics (zolpidem, eszopiclone, etc.), and other medications like gabapentin and pregabalin.
              </Typography>
            </ListItem>
}
          </List>
        </Box>

      

        
     
      </Box>
      </Box>
    </>
  );
};

export default PTSDPage;
