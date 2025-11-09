"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Dialog,
  DialogContent,
  IconButton,
  AppBar,
  Toolbar,
  Slide,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import useUserStore from "@/components/useUserStore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TherapyDialog = ({open,setOpen}) => {
  const { preferedLocation } = useUserStore();
 
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

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
              Therapy
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
                     display: "flex",
                     flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger screens
                     justifyContent: "space-between",
                     alignItems: "center",
                     backgroundColor:"#Ece7E2",
                     Zindex:-1,
                     p: 4,
                     gap: 2, // Space between elements
                   }}
                 >
                   {/* Left Image Section for Small Screens (Top Image) and Large Screens (Left Image) */}
                   <Box
                     sx={{
                       position: "relative",
                       height: { xs: 250, sm: 350, md: 450 }, // Adjusted for responsiveness
                       width: { xs: "100%", sm: 300, md: 400 }, // Full width for small screens, fixed size for large screens
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                       order: { xs: 1, sm: 0 }, // Image on top on small screens, left on larger screens
                       mb: { xs: 3, sm: 0 }, // Margin for small screens to space from other elements
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
                          zIndex: 1,
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
                         zIndex: -4,
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
                         zIndex: 1,
                         borderRadius: 2,
                       }}
                     />
                     {/* Image */}
                     <Box
                       component="img"
                       src="/therapy.jpg"
                       alt="Founder"
                       sx={{
                         height: "70%",
                         width: "70%",
                         objectFit: "cover",
                         borderRadius: 2,
                         boxShadow: 3,
                         zIndex: 1,
                       }}
                     />
                   </Box>
                 
                   {/* Main Content Section */}
                   <Box
                     sx={{
                       maxWidth: "500px",
                       textAlign: "left",
                       backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
                       p: 3,
                       zIndex:2,
                       borderRadius: 2,
                       boxShadow: 3,
                       order: { xs: 2, sm: 1 }, // Content comes after the first image on small screens
                     }}
                   >
                     {/* Highlight Section */}
               {/* <Box sx={{ p: 1, backgroundColor: "#535945", display: "inline-block", ml: "5%", mt: 3 }}>
                 <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                   Therapy
                 </Typography>
               </Box> */}
         
               {/* Content Section */}
               <Box>
                 <Box sx={{ ml: "5%", mt: "1%" }}>
                   <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
                     Therapy Services 
                   </Typography>
                 </Box>
         
                 <Box sx={{ ml: "5%" }}>
                   <Typography variant="body2" sx={{ color: "black" }}>
                     At Kairos Integrative Health, we utilize psychotherapies when appropriate. In many cases, best outcomes result from a combination of psychotherapy with medication management. Psychotherapies utilized by our providers can include but are not limited to:
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
                         <Typography variant="body2" sx={{ color: "black" }}>
                           {therapy}
                         </Typography>
                       </ListItem>
                     ))}
                   </List>
                 </Box>
         
                 {/* Note Section */}
                 <Typography variant="body2" sx={{ color: "black" }}>
                   In the setting where you would benefit from more consistent psychotherapy or a psychotherapeutic modality that is not available from our provider(s), we may refer you to a colleague to obtain appropriate care.
                 </Typography>
               </Box>
                   </Box>
                 
                   {/* Right Image Section for Small Screens (Bottom Image) and Large Screens (Right Image) */}
                   <Box
                     sx={{
                       position: "relative",
                       height: { xs: 250, sm: 350, md: 450 }, // Adjusted for responsiveness
                       width: { xs: "100%", sm: 300, md: 400 }, // Full width for small screens, fixed size for large screens
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                       order: { xs: 3, sm: 2 }, // Image on bottom for small screens, right for large screens
                       mt: { xs: 3, sm: 0 }, // Margin for small screens to space from other elements
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
                          zIndex: 1,
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
                          zIndex: 1,
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
                          zIndex: 1,
                         borderRadius: 2,
                       }}
                     />
                     {/* Image */}
                     <Box
                       component="img"
                       src="/therapy2.jpeg"
                       alt="Founder"
                       sx={{
                         height: "70%",
                         width: "70%",
                         objectFit: "cover",
                         borderRadius: 2,
                         boxShadow: 3,
                         zIndex: 1,
                       }}
                     />
                   </Box>
                 </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TherapyDialog;
