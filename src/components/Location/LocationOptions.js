import { Divider, Typography, Box } from "@mui/material";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'; // Import the icon you want to use
import { useRouter } from "next/router";
// import LocationPopup from "./locationPopup";
import { useState } from "react";
//
const locationOptions = () => {
  const router=useRouter()
  const [open,setOpen]=useState(false)
  return [
    { value: "Alabama", label: "Alabama", img: "https://via.placeholder.com/200x150?text=Alabama" ,
        content: "We meet you where you are, with the understanding that life is difficult at times and work together to develop a path for you to reach your goals.",
    },

  { value: "North Carolina", label: "North Carolina",
     img: "https://via.placeholder.com/200x150?text=North+Carolina" ,
     content: "We meet you where you are, with the understanding that life is difficult at times and work together to develop a path for you to reach your goals.",},

  { value: "Choose your location", label: "Choose your location",
     img: "https://via.placeholder.com/200x150?text=Choose+Your+Location",
     content: "We meet you where you are, with the understanding that life is difficult at times and work together to develop a path for you to reach your goals.", }
  ];
};

export default locationOptions;
