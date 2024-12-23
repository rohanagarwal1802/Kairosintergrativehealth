import { Divider, Typography, Box } from "@mui/material";
import CustomIcon from "./customIcon";

const ServicesOptions = () => {
  return [
    {
      title: "Psychiatry",
      path: "/Psychiatry",
      icon: (
        <CustomIcon
          src={"/phyciatry_icon.png"}
          alt="Psychiatry Icon"
          color={"white"}
          size={50}
        />
      ),
    },
    {
      title: "Therapy",
      path: "/Therapy",
      icon: (
        <CustomIcon
          src={"/therapy_icon.png"}
          alt="Therapy Icon"
          color={"white"}
          size={50}
        />
      ),
    },
    {
      title: "Addiction",
      path: "/Addiction",
      icon: (
        <CustomIcon
          src={"/addiction_icon.png"}
          alt="Addiction Icon"
          color={"white"}
          size={50}
        />
      ),
    },
    {
      title: "Resilience Roundtable",
      path: "/Roundtable",
      icon: (
        <CustomIcon
          src={"/roundtable_icon.png"}
          alt="Resilience Icon"
          color={"white"}
          size={50}
        />
      ),
    },
    {
      title: "Genetic Testing",
      path: "/GTesting",
      icon: (
        <CustomIcon
          src={"/genetic_icon.png"}
          alt="Genetic Icon"
          color={"white"}
          size={50}
        />
      ),
    },
    {
      title: "CNS-VS testing",
      path: "/CNVSTesting",
      icon: (
        <CustomIcon
          src={"/cnvs_icon.png"}
          alt="CNVS Icon"
          color={"white"}
          size={50}
        />
      ),
    },
  ];
};

export default ServicesOptions;
