"use client";

import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, useTheme, useMediaQuery, Skeleton, Menu, MenuItem,} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);

  const router = useRouter();
  const moreOpen = Boolean(moreAnchorEl);

  const handleClick = (path) => {
    setLoading(true);
    setTimeout(() => {
      router.push(path);
      setDrawerOpen(false);
      setLoading(false);
    }, 400);
  };

  const handleMoreOpen = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = (path) => {
    setMoreAnchorEl(null);
    if (path) handleClick(path);
  };

  // MAIN NAV ITEMS
  const navItems = [
    { label: "SIGN UP", path: "/SignUp" },
    { label: "SIGN IN", path: "/SignIn" },
    { label: "CONTACT US", path: "/Contact" },
    { label: "ABOUT US", path: "/About" },
  ];

  // MORE DROPDOWN ITEMS
  const moreItems = [

    { label: "PROFILE", path: "/Profile" },
    { label: "LOGOUT", path: "/logout" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {/* TOP BANNER */}
        <Box
          sx={{
            fontSize: "20px",
            color: "black",
            fontFamily: "poppins,sans-serif",
            fontWeight: 900,
            textAlign: "center",
            py: 1,
            borderBottom: "1px solid #ddd",
          }}
        >
          WELCOME TO THE SAT-TARA
        </Box>

        {/* MAIN TOOLBAR */}
        <Toolbar sx={{ height: "64px", bgcolor: "#09362f" }}>
          {/* LOGO */}
          <Box display="flex" alignItems="center" flexGrow={1}>
            {loading ? (
              <Skeleton variant="circular" width={50} height={50} />
            ) : (
              <Box
                component="img"
                src="/orignal.jpg"
                alt="Logo"
                onClick={() => handleClick("/")}
                sx={{
                  height: 55,
                  width: 55,
                  borderRadius: "50%",
                  border: "2px solid white",
                  cursor: "pointer",
                }}
              />
            )}

            <Typography
              onClick={() => handleClick("/")}
              sx={{
                ml: 1,
                color: "white",
                fontWeight: 800,
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              SAT-TARA
            </Typography>
          </Box>

          {/* MOBILE */}
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 260 }}>
                  <List>
                    {navItems.map((item, index) => (
                      <ListItem
                        button
                        key={index}
                        onClick={() => handleClick(item.path)}
                      >
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}

                    <ListItem>
                      <ListItemText primary="MORE" />
                    </ListItem>

                    {moreItems.map((item, index) => (
                      <ListItem
                        button
                        key={index}
                        sx={{ pl: 4 }}
                        onClick={() => handleClick(item.path)}
                      >
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            /* DESKTOP */
            <Box display="flex" alignItems="center">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  color="inherit"
                  onClick={() => handleClick(item.path)}
                >
                  {item.label}
                </Button>
              ))}

              {/* MORE DROPDOWN */}
              <Button color="inherit" onClick={handleMoreOpen}>
                MORE
              </Button>

              <Menu
                anchorEl={moreAnchorEl}
                open={moreOpen}
                onClose={() => handleMoreClose()}
               
              >
                {moreItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleMoreClose(item.path)}
                    
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* SPACER */}
      <Toolbar />
    </>
  );
};

export default Navbar;
