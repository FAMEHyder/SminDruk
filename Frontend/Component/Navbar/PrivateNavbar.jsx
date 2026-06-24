"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthStore } from "../../StateManagment/Zustand.jsx"; // ✅ import store

const Navbar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  // ✅ Zustand state & actions
  const { user, logout } = useAuthStore();

  const navItems = ["Create", "Publish", "Engage", "Analyze", "Start Page"];

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  // ✅ Handle Logout
  const handleLogout = () => {
    logout(); // clear user from Zustand
    handleMenuClose();
    router.push("/SignIn"); // redirect to SignIn
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        {/* ✅ Top Welcome Bar */}
        <Box
          sx={{
            fontSize: "18px",
            color: "black",
            fontFamily: "poppins,sans-serif",
            fontWeight: 900,
            textAlign: "center",
            py: 1,
            borderBottom: "1px solid #ddd",
          }}
        >
          WELCOME TO THE SAT-TARA DIGITAL MARKETING SERVER
        </Box>

        {/* ✅ Main Toolbar */}
        <Toolbar
          sx={{
            minHeight: "64px",
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "green",
          }}
        >
          {/* ✅ Logo (Left) */}
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <Box
              component="img"
              src={"/orignal.jpg"}
              alt="Logo"
              sx={{
                height: 45,
                width: 45,
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />
            <Typography
              sx={{
                fontFamily: "poppins,sans-serif",
                fontWeight: 800,
                fontSize: 18,
                color: "white",
              }}
            >
              SAT-TARA
            </Typography>
          </Box>

          {/* ✅ Desktop Nav */}
          {!isMobile && (
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 3,
              }}
            >
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => router.push(`/${item.replace(" ", "")}`)}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.15)",
                      borderRadius: "8px",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {/* ✅ Mobile Menu Icon */}
          {isMobile && (
            <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* ✅ Profile Avatar */}
          <Box>
            <IconButton onClick={handleMenuOpen}>
              <Avatar
                alt={user?.name || "Profile"}
                src={user?.avatar || "/default-avatar.png"}
                sx={{ width: 38, height: 38, cursor: "pointer" }}
              />
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Spacer */}
      <Box sx={{ height: "110px" }} />

      {/* ✅ Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => router.push(`/${item.replace(" ", "")}`)}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
