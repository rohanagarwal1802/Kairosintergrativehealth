import { Divider, Typography, Box } from "@mui/material";
const ServicesOptions = () => {
  return [
    {
      title: "Addiction",
      path: "/Anxiety",
      // description: "Explore various mutual fund options to grow your wealth.",
      image: "/images/faq.jpg",
    },
 
    {
      title: "Therapy",
      path: "/Therapy",
      // description: "Let us manage your investment portfolio for optimal returns.",
      image: "/images/client.jpg",
    },
   
    {
      title: "Psychiatry",
      path: "/Psychiatry",
      // description: "Achieve financial independence with our expert guidance.",
      image: "/images/terms.jpg",
    },
    {
      title: "GeneticTesting",
      path: "/GTesting",
      // description: "Achieve financial independence with our expert guidance.",
      image: "/images/privacy.jpg",
    },
    // {
    //     title: "Psychiatry and Therapy",
    //     path: "/Psychiatry",
    //     // description: "Achieve financial independence with our expert guidance.",
    //     image: "/images/privacy.jpg",
    //   },
  ];
};
export default ServicesOptions;
