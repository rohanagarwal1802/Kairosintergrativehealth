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

const AddictionPage = ({open,setOpen}) => {
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
              Addiction
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
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#Ece7E2",
              p: 4,
              gap: 2,
            }}
          >
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
                src="/addict.jpg"
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
              <Box
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
              </Box>

              <Box sx={{ ml: "5%", mt: "1%" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
                  Substance Use and Medication-Assisted Treatment (MAT)
                </Typography>
              </Box>

              <Box sx={{ ml: "10%" }}>
                <List sx={{ paddingLeft: "20px" }}>
                  {[
                    `Addiction is a complex, chronic condition that affects both the mind
                    and body, leading to destructive behaviors and strained relationships. 
                    Whether it involves substances like alcohol, prescription medications, 
                    or illicit drugs, addiction can feel overwhelming, but recovery is possible. 
                    At KIH, we are committed to providing compassionate, evidence-based care 
                    tailored to each individual's needs. We work together to develop a personalized 
                    treatment plan that addresses the underlying causes of addiction and promotes long-term recovery.`,

                    preferedLocation === "Alabama" &&
                      `Please note we do not currently offer treatment with Suboxone or other 
                      medications containing buprenorphine as it is a controlled substance.`,
                  ]
                    .filter(Boolean)
                    .map((therapy, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          display: "list-item",
                          listStyleType: "disc",
                          paddingLeft: "10px",
                          "&::marker": { color: "black", fontSize: "1.2rem" },
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "black", lineHeight: 1.8 }}>
                          {therapy}
                        </Typography>
                      </ListItem>
                    ))}
                </List>
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
                src="/addiction2.jpeg"
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddictionPage;
