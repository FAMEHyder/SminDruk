"use client";

import { Typography, Box, Grid, Card, CardContent, } from "@mui/material";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaPinterest, FaMapMarkerAlt, FaTwitter, } from "react-icons/fa";
import { SiBluesky, SiThreads, SiMastodon } from "react-icons/si";
import { useAuthStore } from "@/StateManagment/Zustand";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const menuItems = [
  {
    name: "Login with Facebook",
    icon: <FaFacebook size={28} />,
    action: (user) => {
      if (!user) {
        alert("User not logged in");
        return;
      }
      window.location.href = `https://sat-tara-backend.vercel.app/api/auth/facebook`;
    },
  },
  {
    name: "Login with Instagram",
    icon: <FaInstagram size={28} />,
    action: (user) => {
      if (!user) {
        alert("User not logged in");
        return;
      }
      window.location.href = `https://sat-tara-backend.vercel.app/api/auth/instagram`;
    },
  },
  { name: "Connect Instagram", icon: <FaInstagram size={28} /> },
  { name: "Connect LinkedIn", icon: <FaLinkedin size={28} /> },
  { name: "Connect X", icon: <FaTwitter size={28} /> },
  { name: "Connect Threads", icon: <SiThreads size={28} /> },
  { name: "Connect Bluesky", icon: <SiBluesky size={28} /> },
  { name: "Connect YouTube", icon: <FaYoutube size={28} /> },
  { name: "Connect TikTok", icon: <FaTiktok size={28} /> },
  { name: "Connect Mastodon", icon: <SiMastodon size={28} /> },
  { name: "Connect Pinterest", icon: <FaPinterest size={28} /> },
  { name: "Connect Google Business P.", icon: <FaMapMarkerAlt size={28} /> },
  { name: "Connect Start Page", icon: <FaFacebook size={28} /> },
];

export default function DashboardPage() { 
  const { user } = useAuthStore();
  console.log("Doo in user dashboarding : ", user)

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3, mt: { xs: 12, sm: 12, md: 6 } }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: "center", mb: 4 }}
      >
        Channels Dashboard
      </Typography>

      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
            <Card
              onClick={() => item.action && item.action(user)}
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                transition: "0.3s",
                opacity: item.action ? 1 : 0.6,
                "&:hover": {
                  transform: item.action ? "translateY(-5px)" : "none",
                  boxShadow: item.action ? 6 : 3,
                  cursor: item.action ? "pointer" : "not-allowed",
                },
              }}
            >
              <CardContent>
                <Box sx={{ fontSize: 40, color: "primary.main", mb: 1 }}>
                  {item.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  To avail this service, first connect your account.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
