"use client";

import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  Settings,
  SyncAlt,
  Money,
  Description,
  ShoppingCart,
  Reviews,
  Assessment
} from '@mui/icons-material';
import Link from 'next/link';


const sidebarItems = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/Dashboard' },
  { label: 'Connected Facebook Pages', icon: <Inventory />, path: '/Pages' },
  { label: 'TRR Pages', icon: <Settings />, path: '/Tokens-rotation-required-pages' },
  { label: 'Post & Schedual', icon: <Money />, path: '/Post' },
  { label: 'Active Users', icon: <SyncAlt />, path: '/Users' },
  { label: 'Connect Channals', icon: <Description />, path: '/Channals' },
  { label: 'Suggestion', icon: <ShoppingCart />, path: '/purchase' },
  { label: 'Reviews', icon: <Reviews />, path: '/reviews' },
  { label: 'Reports', icon: <Assessment />, path: '/reports' },
];

const Sidebar = () => {
  return (
    <>
    <Box position={'fixed'}
      sx={{
        width: 250,
        bgcolor: "#ffffff",
        borderRight: '1px solid #09362f',
        height: '100vh',             // Use full viewport height
        overflowY: 'auto ', 
        mb:2          // Enable vertical scroll
      }}
    >
      <List>
        {sidebarItems.map((item) => (
          <Link key={item.label} href={item.path} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton
              sx={{
                flexDirection: 'column',
                textAlign: 'center',
                py: 2,
                cursor: 'pointer'
              }}
            >
              <ListItemIcon sx={{ justifyContent: 'center', mb: 0.5 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 12 }} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
    </>
  );
};

export default Sidebar;
