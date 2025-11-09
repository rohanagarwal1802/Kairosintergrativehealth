import AddictionPage from "./Services/addictionDialog";
import TherapyDialog from "./Services/TherapyDialog";
import PhysciatryPage from "./Services/phychaitryDialog";
import GeneticTestingDialog from "./Services/geneticTestingDialog";
import CNVSTestingDialog from "./Services/cnvsTestingDialog";
import CommunityPartnershipsDialog from "./Services/communityPartnershipsDialog";

const ServicesOptions = () => {
  return [
    {
      title: "Psychiatry",
      path: "/Psychiatry",
      image: "/phyciatry_icon.png",
      component: PhysciatryPage,
    },
    {
      title: "Therapy",
      path: "/Therapy",
      image: "/therapy_icon.png",
      component: TherapyDialog,
    },
    {
      title: "Addiction",
      path: "/Addiction",
      image: "/addiction_icon.png",
      component: AddictionPage,
    },
    {
      title: "Genetic Testing",
      path: "/GTesting",
      image: "/genetic_icon.png",
      component: GeneticTestingDialog,
    },
    {
      title: "CNS-VS testing",
      path: "/CNVSTesting",
      image: "/cnvs_icon.png",
      component: CNVSTestingDialog,
    },
    {
      title: "Community Partnerships",
      path: "/communityOutreach",
      image: "/communityPartnerships_icon.png",
      component: CommunityPartnershipsDialog,
    },
  ];
};

export default ServicesOptions;
