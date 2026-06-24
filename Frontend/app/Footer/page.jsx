"use client";

import { Box, Typography, Grid } from "@mui/material";
import { Facebook, WhatsApp, Instagram } from "@mui/icons-material";
import Link from "next/link";

const Footer = () => {
  return (
    <Box sx={{
      bgcolor: "#07332cff",
      color: "white", padding: "20px",
      mt:2,
    }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2">
            SminDruk DIGITAL MARKETING SERVER
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Typography variant="body2">
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link
              href="/Contact"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Contact Us
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link
              href="/About"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              About Us
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">
            Phone: +92-3417405991 & +92 3554526991
          </Typography>
          <Typography variant="body2">
            Email: famehyder9999@gmail.com
          </Typography>
          <Typography variant="body2">
            Address: Roundu Skardu, Gilgit-Baltistan
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1 }}>
            <Link
              href="https://www.facebook.com/fame.hyder"
              target="_blank"
              style={{ color: "inherit" }}
            >
              <Facebook />
            </Link>
            <Link
              href="https://chat.whatsapp.com/LTdgqmbPcUi5JBqLqvN8qp"
              target="_blank"
              style={{ color: "inherit" }}
            >
              <WhatsApp />
            </Link>
            <Link
              href="https://www.instagram.com/fame_hyder/"
              target="_blank"
              style={{ color: "inherit" }}
            >
              <Instagram />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="body2" align="center">
          © 2024 SminDruk DIGITAL MARKETING SERVER. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
