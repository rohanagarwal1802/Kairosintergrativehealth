import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar, Grid,Divider ,List, ListItem, ListItemText} from "@mui/material";
import useUserStore from "../useUserStore";
// Fade-in hook using Intersection Observer
const useFadeInOnScroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { isVisible, elementRef };
};

const AboutSection = () => {
  const { isVisible: isAboutVisible, elementRef: aboutRef } = useFadeInOnScroll();
  const { isVisible: isVisionVisible, elementRef: visionRef } = useFadeInOnScroll();
  const { isVisible: isStoryVisible, elementRef: storyRef } = useFadeInOnScroll();
      const [address,setAddress]=useState('')
        const { preferedLocation, setPreferedLocation } = useUserStore();

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
      {/* About Section */}
      {/* <Box
        ref={aboutRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          textAlign: "center",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          ...(isAboutVisible && { opacity: 1, transform: "translateY(0)" }), // Fade-in effect
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "300px",
            height: "300px",
            borderRadius: "70%",
            overflow: "visible",
            "&::after": {
              content: '""',
              position: "absolute",
              top: "-8px",
              left: "-8px",
              width: "calc(100% + 16px)",
              height: "calc(100% + 16px)",
              background: "linear-gradient(45deg, #98BF64, #028A0F, #535945, #32612D)",
              borderRadius: "70%",
              animation: "morphBorder 4s infinite linear",
              zIndex: -1,
            },
          }}
        >
          <Avatar src="/profile.jpg" alt="Profile Picture" sx={{ width: "100%", height: "100%" }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 3 }}>
          Mark Merritt
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "gray", marginTop: 1 }}>
          Lead Physiotherapist
        </Typography>

        <Typography variant="body1" sx={{ color: "#555", marginTop: 1 }}>
          BPT, MPT (Orthopedics), Certified Dry Needling Specialist
        </Typography>
      </Box> */}

 {/* HOW WE STARTED Section */}
 <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 4,
          backgroundColor: "#6F7863",
        }}
      >
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          {/* Left Column - Text Content */}
          <Grid item xs={12} md={12}>
            <Box sx={{ textAlign: "center", color: "white" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 2,
                  align:"center",
                  fontSize:"100%"
                }}
              >
                Executive Summary
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "80%",
                  color: "white",
                  marginTop: 2,
                  textAlign:"center"
                }}
              >
                 

                 As the healthcare industry continues to adopt a more streamlined model, Kairos Integrative Health takes a different approach. Our approach prioritizes the needs of both our patients and our providers. KIH offers our community access to high-quality, timely, and evidence-based care while also striving to empower our providers to focus on what truly matters: delivering patient-centered care, free from the constraints of streamlined models. 
                 Our belief is simple. By placing patient care at the forefront and supporting our providers, we create a sustainable, healing environment that benefits everyone.
              </Typography>

             
            </Box>
          </Grid>

         
        </Grid>
      </Box>
      <Divider sx={{color:"white"}}/>
      {/* Vision & Mission Section */}
      <Box
        ref={visionRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          textAlign: "center",
          backgroundColor: "#6F7863",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          ...(isVisionVisible && { opacity: 1, transform: "translateY(0)" }),
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginTop: 1,fontSize:"100%" }}>
        Mission Statement
        </Typography>
       
        <Typography
                variant="body1"
                sx={{
                  fontSize: "80%",
                  color: "white",
                  marginTop: 2,
                  textAlign:"center"
                }}
              >
  Our mission is to deliver{" "}
 comprehensive and{" "}
integrative mental health services that empower individuals and strengthen the resilience of our{" "}
 community. By prioritizing holistic care and fostering enduring patient-provider relationships, we aim to become a trusted pillar of support in our community, improving quality of life and promoting mental wellness for all.

 </Typography>
      </Box>
      <Divider sx={{color:"white"}}/>
      {/* Our Story Section */}
      <Box
        ref={storyRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          textAlign: "center",
          backgroundColor: "#6F7863",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          ...(isStoryVisible && { opacity: 1, transform: "translateY(0)" }),
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginTop: 1,fontSize:"100%" }}>
        Vision
        </Typography>
       
        <Typography
                variant="body1"
                sx={{
                  fontSize: "80%",
                  color: "white",
                  marginTop: 2,
                  textAlign:"center"
                }}
              >
        Our{" "} vision is to be a recognized and{" "} 
       
       trusted leader in the community, providing accessible, integrative mental health care that prioritizes open communication, holistic treatment, and efficient, personalized care. We aspire to be the go-to resource for individuals seeking a comprehensive approach to mental well-being, while also empowering healthcare providers to practice with autonomy and in alignment with their patients' best interests.
</Typography>

       
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
      <Box sx={{ p: 1, backgroundColor: "#535945", display: 'inline-block', ml: "5%",   mt:"2%" }}>
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

export default AboutSection;
