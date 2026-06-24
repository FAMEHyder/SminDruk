"use client";

import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
const BusinessImpact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      sx={{
        height: { xs: "420vh", sm: "350vh", md: "135vh", lg: "140vh" },
        background:
          "linear-gradient(to top right, rgb(8, 39, 33), rgb(8, 39, 33), rgb(4, 75, 63), rgb(30, 147, 46))",
      }}
    >
      <Typography
        fontSize={{ xs: 28, sm: 36, md: 50 }}
        fontWeight={600}
        color="white"
        textAlign="center"
        mb={2}
      >
        Driving business impact should be easier
      </Typography>

      <Box
        fontSize={{ xs: 18, sm: 22, md: 28, lg: 32 }}
        color="white"
        textAlign="center"
        px={{ xs: 2, md: 6 }}
        mb={4}
      >
        SminDruk unified social media management platform enables your team to
        extract real business value, strengthen your market position and drive
        revenue—quickly.
      </Box>

      <Box
        display="flex"
        gap={4}
        justifyContent="space-around"
        flexDirection={isMobile ? "column" : "row"}
        alignItems="center"
        mb={4}
      >
        {[
          {
            title: "See value faster",
            text: "Get the insights your team has been waiting for—now. You won’t spend months onboarding, wondering how much of your budget went to learning how to use our platform.",
          },
          {
            title: "Capture insights with ease",
            text: "Accelerate business processes with AI-powered workflows designed to save marketers valuable time, and allow your team to focus on more strategic thinking.",
          },
          {
            title: "Transition seamlessly",
            text: "Elevate your business without rebuilding your tech stack. Our Salesforce partnership and social integrations make it easy to work within your current processes.",
          },
        ].map((card, index) => (
          <Box
            key={index}
            sx={{
              height: 300,
              width: { xs: 280, sm: 300, md: 350 },
              borderRadius: 5,
              backgroundColor: "whitesmoke",
              p: 3,
              fontSize: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "all 0.3s ease",
              ":hover": {
                transform: "scale(0.98)",
                boxShadow: "2px 2px 2px 2px black",
                backgroundColor: "lightblue",
                cursor: "pointer",
                zIndex: 10,
              },
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={2}>
              {card.title}
            </Typography>
            <Typography>{card.text}</Typography>
          </Box>
        ))}
      </Box>

      {/* Image */}
      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src={'/dec.png'}
          alt="Business impact illustration"
          height={200}
          width={500}
          style={{
            width: "100%",
            maxWidth: "1400px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />
      </Box>
    </Grid>
  );
};

export default BusinessImpact;
