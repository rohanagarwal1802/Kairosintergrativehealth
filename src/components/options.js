import { Divider, Typography, Box } from "@mui/material";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'; // Import the icon you want to use
import { useRouter } from "next/router";
//
const Options = () => {
  const router=useRouter()
  return [
    {
      title: "Home",
      src: "/images/dashboard.png",
      icon: <div />,
      path: "/",
    },
    {
      title: "About",
      src: "/images/users.png",
      icon: <div />,
      path: "/about",
    },
    {
      title: "SERVICES",
      src: "/images/promotions.png",
      icon: <div />,
      path: "/services",
      openInNewTab: false,
    },
    {
      title: "RESOURCES",
      src: "/images/affiliate.png",
      icon: <div />,
      path: "/blogs",
      openInNewTab: false,
    },
    {
      title: "Contact",
      src: "/images/social.png",
      icon: <div />,
      path: "/contact",
      openInNewTab: false,
    },
    // {
    //   title: "Request Appointment",
    //   icon: (
    //     <Box
    //       component="button"
    //       sx={{
    //         display: "flex",
    //         alignItems: "center",
    //         backgroundColor: "#FFD700", // Golden yellow background
    //         color: "white", // White text
    //         border: "none",
    //         borderRadius: "4px",
    //         padding: "8px 16px",
    //         cursor: "pointer",
    //         "&:hover": { backgroundColor: "#FFC300" }, // Slightly darker on hover
    //       }}
    //       onClick={() => {
    //         router.push('/bookanappointment')
    //         // Define the action when the button is clicked (e.g., navigate to a different page or open a modal)
    //       }}
    //     >
    //       <Typography variant="body1" sx={{ marginRight: 1 }}>
    //         Request Appointment
    //       </Typography>
    //       <AccessAlarmIcon /> {/* Icon after the text */}
    //     </Box>
    //   ),
    // },
  ];
};

export default Options;
