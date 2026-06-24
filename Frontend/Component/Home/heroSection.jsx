"use client";

import React, { useState } from "react";
import { Box, Grid, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRouter } from "next/navigation";
const animation = { duration: 354210, easing: (t) => t };
import { useAuthStore } from "@/StateManagment/Zustand";

export default function HeroSection() {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const {user} = useAuthStore();
    

    const handleClick = () => {
      
        if (user) {
          router.push("/Dashboard");
        } else {
          alert("Login required To See Products");
          router.push("/SignIn")
        }
      };

    const [sliderRef] = useKeenSlider({
        loop: true,
        renderMode: "performance",
        drag: false,
        created(s) {
            s.moveToIdx(5, true, animation);
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation);
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 0, true, animation);
        }

    });

    const slideStyles = {
        height: 60,
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        margin: '0!important',
        padding: '0!important',
        textTransform: 'uppercase'
    };

    return (
        <Grid
            container
            sx={{
                background:"linear-gradient(to bottom right, rgb(8, 39, 33), rgb(8, 39, 33), rgb(4, 75, 63), rgb(30, 147, 46))",
                px: { xs: 2, md: 4 },
                py: { xs: 4, md: 6 },
                height: "auto",
            }}
        >
            {/* Main Content Section */}
            <Grid
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                paddingInline={2}
                height="auto"
                alignItems="center"
            >
                {/* Left Content */}
                <Box>
                    <Box
                        sx={{
                            width: { xs: "100%", md: "400px" },
                            color: "white",
                            fontWeight: 800,
                            fontSize: { xs: 24, sm: 32, md: 40 },
                            textShadow: "3px 3px black",
                            mb: 2,
                            // mt: { xs: 18, sm: 10, md: 12 }
                        }}
                    >
                        A powerful tool for branding and compaigning that also helps you manage and post on your social media
                        platforms
                    </Box>

                    <Box
                        sx={{
                            width: { xs: "100%", md: "400px" },
                            color: "white",
                            fontSize: { xs: 14, md: 16 },
                            lineHeight: 1.6,
                        }}
                    >
                        Hi, I’m SaT-Tara — We are building a social media management tool that
                        takes the hassle out of social media management. Built with the NextJS express and Node
                        , my system connects directly with Facebook’s API to schedule
                        posts, target specific regions, and manage pages—all backed by a
                        MongoDB database that keeps everything organized. <br />
                        <br />
                        If you’re into marketing, or just tired of repetitive
                        tasks, let’s connect. We’d love to hear how you manage your
                        content—and maybe show you how to level it up.
                    </Box>

                    <Box
                        mt={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                        }}
                    >
                        <Button variant="contained" color="primary">
                            30 Days Free Trial
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ borderColor: "white", color: "white" }}
                            onClick={() => handleClick('/Dashboard')}
                        >
                            See the Products
                        </Button>
                    </Box>
                </Box>

                {/* Right Image */}
                <Box
                    component="img"
                    src={'/fb.png'}
                    alt="Social Media Tool"
                    sx={{
                        height: { xs: 250, sm: 350, md: 450 },
                        width: { xs: "100%", sm: 500, md: "140vh" },
                        ml: isMobile ? 0 : 12,
                        mt: { xs: 4, md: 10 },
                        borderRadius: "10px",
                        alignSelf: "center",
                    }}
                />
            </Grid>

            {/* Keen Slider Section */}
            <Grid
                container
                justifyContent="center"
                sx={{ mt: { xs: 10, sm: 12, md: 4 } }}
            >
                <Box ref={sliderRef} className="keen-slider">
                    {[
                        "Facebook",
                        "Instagram",
                        "X (Twitter)",
                        "TikTok",
                        "Telegram",
                        "YouTube",
                        "LinkedIn",
                        "GitHub",
                        "Thread",
                        "Bluesky",
                        "Mastodon",
                        "Pinterest",
                        "G Bussiness"
                    ].map((platform, index) => (
                        <Box
                            key={index}
                            className="keen-slider__slide"
                            sx={{
                                ...slideStyles,
                                width: "auto",
                                minWidth: "250px !important",
                                maxWidth: "100% !important",
                                flexShrink: 1,
                                display: "inline-flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {platform}
                        </Box>
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
}
