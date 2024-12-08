import Head from "next/head";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

import PeoplePreferUs from "@/components/Home/peoplePreferUs";
import FeedbackClients from "@/components/Home/feedback";
import ServicesBox from "@/components/Home/services";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kairos Integrative Health</title>
        <meta name="description" content="Opening Late November 2024. A place to nurture your health." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Kairos Integrative Health" />
        <meta property="og:description" content="Opening Late November 2024. A place to nurture your health." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <br />
      <br />

      {/* Background Image Container */}
      <Box
  sx={{
    position: "relative",
    width: "100%", // Adjust width as needed
    aspectRatio: "16/9", // Keeps the aspect ratio
    overflow: "hidden",
    margin: "0 auto", // Centers the Box horizontally
  }}
>
  <Image
    src="/title.jpg"
    alt="Kairos Integrative Health Background"
    layout="fill"
    objectFit="contain" // Ensures the entire image is visible
    quality={100}
    priority
    style={{
      objectPosition: "center", // Centers the image to avoid cutting from any side
    }}
  />
</Box>






      {/* Other Components */}
      <ServicesBox />
      <PeoplePreferUs />
      <FeedbackClients />
    </>
  );
}
