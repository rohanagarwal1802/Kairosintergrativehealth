import { Divider, Typography, Box } from "@mui/material";


const ServicesOptions = () => {
  return [
    {
      title: "Psychiatry",
      path: "/Psychiatry",
      image:"/phyciatry_icon.png",
      
    },
    {
      title: "Therapy",
      path: "/Therapy",
      image:"/therapy_icon.png",
     
    },
    {
      title: "Addiction",
      path: "/Addiction",
      image:"/addiction_icon.png",
     
    },
    // {
    //   title: "Resilience Roundtable",
    //   path: "/Roundtable",
    //   image:"/roundtable_icon.png",
    
    // },
    {
      title: "Genetic Testing",
      path: "/GTesting",
      image:"/genetic_icon.png",
     
    },
    {
      title: "CNS-VS testing",
      path: "/CNVSTesting",
      image:"/cnvs_icon.png",
     
    },
    
    {
      title: "Community Partnerships",
      path: "/communityOutreach",
      // description: "Let us manage your investment portfolio for optimal returns.",
      image: "/images/client.jpg",
    },
  ];
};

export default ServicesOptions;
