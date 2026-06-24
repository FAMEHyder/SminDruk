"use client";

import React from "react";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import {
  FaTiktok,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function TrustedBrands() {
  const brands = [
    { name: "TikTok", icon: <FaTiktok />, color: "#000000" },
    { name: "Instagram", icon: <FaInstagram />, color: "#E1306C" },
    { name: "Facebook", icon: <FaFacebook />, color: "#1877F2" },
    { name: "LinkedIn", icon: <FaLinkedin />, color: "#0077B5" },
    { name: "YouTube", icon: <FaYoutube />, color: "#FF0000" },
    { name: "Twitter", icon: <FaTwitter />, color: "#1DA1F2" },
  ];

  return (
    <Grid
      container
      sx={{
        width: "100%",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <Grid item xs={12} mb={4}>
        <Typography
          fontFamily="cambria"
          fontSize={{ xs: 24, sm: 32, md: 40 }}
          fontWeight={700}
          gutterBottom
        >
          Trusted by Leading Platforms
        </Typography>
        <Typography
          fontSize={{ xs: 14, sm: 18, md: 20 }}
          color="text.secondary"
          maxWidth="700px"
          mx="auto"
        >
          We are connected with the world’s top social platforms to deliver
          seamless integrations and unmatched performance.
        </Typography>
      </Grid>

      {/* Brand Logos */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        {brands.map((brand, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 30px ${brand.color}50`,
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 4,
                  fontSize: { xs: 32, sm: 40, md: 50 },
                  color: brand.color,
                }}
              >
                {brand.icon}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
