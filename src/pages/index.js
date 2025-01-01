import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";

import PeoplePreferUs from "@/components/Home/peoplePreferUs";
// import FeedbackClients from "@/components/Home/feedback";
import ServicesBox from "@/components/Home/services";
import Loader from "@/components/Loader";
import useUserStore from "@/components/useUserStore";
import ComplimentaryCallBox from "@/components/Home/complemetaryPhone";
import ImageGallery from "@/components/Home/reviewImages";
import { useRouter } from "next/router";

export default function Home() {
  const { loadLoader, setLoadLoader } = useUserStore();
  const router=useRouter()

  const handlePhoneCallClick = () => {
    // Add logic to trigger the phone call box/modal
    router.push('/bookanappointment')
  };

  return (
    <>
      <Head>
        <title>Kairos Integrative Health</title>
        <meta
          name="description"
          content="Opening Late November 2024. A place to nurture your health."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Kairos Integrative Health" />
        <meta
          property="og:description"
          content="Opening Late November 2024. A place to nurture your health."
        />
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
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <Image
          src="/title.png"
          alt="Kairos Integrative Health Background"
          layout="fill"
          objectFit="contain"
          quality={100}
          priority
          style={{ objectPosition: "center" }}
        />
      </Box>

      {/* <ComplimentaryCallBox /> */}
      <ServicesBox />
      <PeoplePreferUs />
      <ImageGallery />
      {/* <FeedbackClients /> */}

      {/* Sticky Button */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "white",
          textAlign: "center",
          padding: "10px 0",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handlePhoneCallClick}
          sx={{
            padding: "12px 24px",
            fontSize: "16px",
          }}
        >
          Complimentary Phone Call
        </Button>
      </Box>
    </>
  );
}
