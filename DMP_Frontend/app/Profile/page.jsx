"use client";

import React, { useState } from "react";
import { Box, Typography, Avatar, Button, Stack, Paper } from "@mui/material";

// REAL components (fix paths according to your project)
import Feed from "../Channal/page";
import SeeFBpost from "../SeeFBpost/page";
// import Posture from "../posture/page";
// import Schedule from "../schedule/page";

const SocialDashboard = () => {
  const [activeTab, setActiveTab] = useState("feed");

  const navItems = [
    { label: "Feed", key: "feed" },
    { label: "See Pages Post", key: "SeeFBpost" },
    { label: "Posture", key: "posture" },
    { label: "Schedule", key: "schedule" },
  ];

  const renderComponent = () => {
    switch (activeTab) {
      case "feed":
        return <Feed />;
      case "SeeFBpost":
        return <SeeFBpost />;
      case "posture":
        return <Posture />;
      case "schedule":
        return <Schedule />;
      default:
        return <Feed />;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>

      {/* TOP BANNER */}
      <Box
        sx={{
          mt: 5,
          height: 220,
          background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "#fff", fontSize: 22, fontWeight: 600 }}>
          Cover Photo
        </Typography>
      </Box>

      {/* PROFILE */}
      <Paper  sx={{ maxWidth: "100%", mx: "auto", mt: -6, p: 3 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar src="/profile.jpg" sx={{ width: 110, height: 110 }} />

          <Box>
            <Typography variant="h5" fontWeight="bold">
              M.Khan
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, maxime a. Libero voluptatem nostrum ipsam expedita tempore repudiandae, autem temporibus sequi, quod atque, iste dolore. Dicta sed cum ducimus facilis nesciunt dolores architecto ea sapiente sit accusamus laudantium quos repellat voluptas quia id tenetur blanditiis deleniti omnis, provident explicabo iure.
            </Typography>
          </Box>
        </Stack>

        {/* NAV */}
        <Stack direction="row" spacing={1} sx={{ mt: 4, flexWrap: "wrap" }}>
          {navItems.map((item) => (
            <Button
              key={item.key}
              variant={activeTab === item.key ? "contained" : "outlined"}
              onClick={() => setActiveTab(item.key)}
              sx={{ borderRadius: 10, textTransform: "none" }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Paper>

      {/* CONTENT */}
      <Box>
        {renderComponent()}
      </Box>

    </Box>
  );
};

export default SocialDashboard;