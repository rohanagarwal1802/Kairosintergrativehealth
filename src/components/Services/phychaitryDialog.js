"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  IconButton,
  AppBar,
  Toolbar,
  Slide,
  Button,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import useUserStore from "@/components/useUserStore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PhysciatryPage = ({open,setOpen}) => {
  const { preferedLocation } = useUserStore();
 
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);
    const causes = [
    { title: 'Comprehensive Approach:', description: 'Integrative psychiatry looks at all aspects of a person’s well-being, recognizing that mental health disorders can be influenced by physical health, lifestyle, trauma, social context, and emotional balance.' },
    { title: 'Combination of Conventional and Alternative Treatments:', description: 'While traditional psychiatric methods like psychotherapy and medication are often used, integrative psychiatry also incorporates other treatments such as:', Options: ['Nutritional and dietary interventions', 'Mind-body techniques', 'Herbal supplements and vitamins', 'Exercise and physical activity'] },
    { title: 'Focus on Personalized Care:', description: 'Integrative psychiatry takes a highly personalized approach to treatment, tailoring interventions to meet the unique needs of the individual. It seeks to create a holistic treatment plan based on the person’s specific symptoms, lifestyle, genetic predispositions, and personal preferences.' },
    { title: 'Prevention and Wellness:', description: 'This approach emphasizes not only treating mental health issues but also promoting long-term wellness and preventing mental health problems from arising in the first place. This could involve lifestyle adjustments, stress management techniques, and cultivating resilience.' },
  ];

  return (
    <>
      {/* Button to Open Dialog */}
      {/* <Box sx={{ textAlign: "center", mt: 5 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#535945", "&:hover": { backgroundColor: "#6F7863" } }}
          onClick={handleOpen}
        >
          Open Addiction Info
        </Button>
      </Box> */}

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullScreen={isFullScreen}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: isFullScreen ? 0 : 3,
            overflow: "hidden",
            width:!isFullScreen?"80%":"100%",
            height:!isFullScreen?"80%":"100%"
          },
        }}
      >
        {/* AppBar with Close + Fullscreen */}
        <AppBar
          position="relative"
          sx={{
            backgroundColor: "#535945",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
              Phychaitry 
            </Typography>
            <Box>
              <IconButton color="inherit" onClick={toggleFullScreen} sx={{ color: "white" }}>
                {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
              <IconButton onClick={handleClose} sx={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Dialog Content */}
        <DialogContent sx={{ p: 0 }}>
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
                 {/* <Box sx={{ maxWidth: '500px', width: '100%' }}>
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
                 </Box> */}

                  {/* Left Image Section */}
                           <Box
                             sx={{
                               position: "relative",
                               height: { xs: 250, sm: 350, md: 450 },
                               width: { xs: "100%", sm: 300, md: 400 },
                               display: "flex",
                               justifyContent: "center",
                               alignItems: "center",
                               order: { xs: 1, sm: 0 },
                               mb: { xs: 3, sm: 0 },
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
                                 zIndex: 2,
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
                                 zIndex: 4,
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
                                 zIndex: 2,
                                 borderRadius: 2,
                               }}
                             />
                             <Box
                               component="img"
                               src="/psychiatry.jpg"
                               alt="Founder"
                               sx={{
                                 height: "70%",
                                 width: "70%",
                                 objectFit: "cover",
                                 borderRadius: 2,
                                 boxShadow: 3,
                                 zIndex: 4,
                               }}
                             />
                           </Box>
               
                           {/* Main Content */}
                           <Box
                             sx={{
                               maxWidth: "500px",
                               textAlign: "left",
                               backgroundColor: "rgba(255, 255, 255, 0.9)",
                               p: 3,
                               borderRadius: 2,
                               boxShadow: 3,
                               zIndex: 4,
                               order: { xs: 2, sm: 1 },
                             }}
                           >
                             {/* <Box
                               sx={{
                                 p: 1,
                                 backgroundColor: "#535945",
                                 display: "inline-block",
                                 ml: "5%",
                                 mt: 3,
                               }}
                             >
                               <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                 Addiction
                               </Typography>
                             </Box> */}
               
                          
                 <Box sx={{ textAlign: "left", maxWidth: "1000px" }}>
                   <Typography variant="h6" sx={{ color: "black", '@media (max-width: 768px)': { fontSize: '1rem' } }}>
                     At Kairos Integrative Health, we are dedicated to supporting your goals through a
                     comprehensive and integrative approach. Our practice offers a range of services
                     designed to meet your individual needs, ensuring that you receive care that helps
                     you meet your goals.
                   </Typography>
                 </Box> 
                           </Box>
               
                           {/* Right Image Section */}
                           <Box
                             sx={{
                               position: "relative",
                               height: { xs: 250, sm: 350, md: 450 },
                               width: { xs: "100%", sm: 300, md: 400 },
                               display: "flex",
                               justifyContent: "center",
                               alignItems: "center",
                               order: { xs: 3, sm: 2 },
                               mt: { xs: 3, sm: 0 },
                             }}
                           >
                             <Box
                               sx={{
                                 position: "absolute",
                                 top: "8%",
                                 left: "-15%",
                                 width: "80%",
                                 height: "35%",
                                 backgroundColor: "#6F7863",
                                 zIndex: 2,
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
                                 zIndex: 4,
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
                                 zIndex: 2,
                                 borderRadius: 2,
                               }}
                             />
                             <Box
                               component="img"
                               src="/physciatry2.jpeg"
                               alt="Founder"
                               sx={{
                                 height: "70%",
                                 width: "70%",
                                 objectFit: "cover",
                                 borderRadius: 2,
                                 boxShadow: 3,
                                 zIndex: 4,
                               }}
                             />
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhysciatryPage;
