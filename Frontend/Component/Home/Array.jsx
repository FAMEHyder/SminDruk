"use client";

import React, { useState } from "react";
import {
    Box,
    Grid,
    Button,
    useTheme,
    useMediaQuery,
    Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PublishIcon from "@mui/icons-material/Publish";
import BarChartIcon from "@mui/icons-material/BarChart";
import HearingIcon from "@mui/icons-material/Hearing";
import CampaignIcon from "@mui/icons-material/Campaign";
import PeopleIcon from "@mui/icons-material/People";

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [buttonItems, setButtonItems] = useState("Engagement");

    const contentMap = {
        Engagement: {
            text:
                "Engagement is the heartbeat of successful social media strategy. It reflects how actively your audience interacts with your content — through likes, comments, shares, and messages. High engagement not only boosts your visibility in platform algorithms but also builds trust, loyalty, and a sense of community around your brand. It's not just about posting — it's about starting conversations, responding authentically, and creating content that resonates. In the attention economy, engagement is currency. Engagement fuels reach (because platforms prioritise content people interact with), helps turn casual viewers into customers, and gives you direct qualitative feedback on what your audience cares about. Measure it, nurture it, and design content to invite participation — not just passive consumption.",
            image: "/Engagement.png",
            bgcolor: "linear-gradient(120deg,#e6f9e9,#d9f0d9)",
            icon: <MailIcon />,
            color: "#4caf50",
        },
        Publishing: {
            text:
                "Publishing is the foundation of your brand’s voice in the digital world. It involves strategically planning, creating, and distributing content across your social media channels to reach the right audience at the right time. Effective publishing goes beyond simply posting — it ensures consistency, aligns with your goals, and leverages scheduling, automation, and platform insights to maximize impact. Whether it’s a product update, a behind-the-scenes video, or a trending meme, smart publishing keeps your presence active, relevant, and connected. Good publishing pipelines include content calendars, approval flows, templated assets, and replayable processes so teams can move faster without sacrificing quality.",
            image: "/Publishing.png",
            bgcolor: "linear-gradient(120deg,#e8f2ff,#dfefff)",
            icon: <PublishIcon />,
            color: "#2196f3",
        },
        Analytics: {
            text:
                "Analytics turns raw data into actionable insights. It helps you understand what’s working, what’s not, and where to pivot. From reach and impressions to click-through rates and audience demographics, analytics provides a clear picture of your performance across platforms. It empowers you to make informed decisions, refine your content strategy, and prove ROI. In short, analytics isn't just numbers — it's the compass guiding your social media success. Use cohort analysis, funnel metrics and attribution models to link social activity to business outcomes. Track trends over time, set hypothesis-driven experiments, and let data inform creative direction.",
            image: "/Analytics.png",
            bgcolor: "linear-gradient(120deg,#ffeaf6,#ffdff0)",
            icon: <BarChartIcon />,
            color: "#9c27b0",
        },
        Listening: {
            text:
                "Listening is about more than just hearing — it’s about understanding the conversations happening around your brand, industry, and competitors in real time. Social listening tracks mentions, keywords, hashtags, and sentiment to uncover what your audience truly thinks and feels. It helps you spot trends, address concerns before they escalate, and engage meaningfully with your community. In a world where reputation moves at the speed of a tweet, listening gives you the power to stay proactive, not reactive. Build alerts for spikes, map sentiment over campaign windows, and route urgent signals to customer care or PR so issues are resolved fast.",
            image: "/Listening.png",
            bgcolor: "linear-gradient(120deg,#fff7e6,#fff3d9)",
            icon: <HearingIcon />,
            color: "#ff9800",
        },
        Advocacy: {
            text:
                "Advocacy harnesses the power of people to amplify your brand message. Whether it’s employees, loyal customers, or passionate fans, advocates help extend your reach through authentic, word-of-mouth promotion. Unlike paid ads, advocacy feels genuine — it builds trust, credibility, and community. Empowering advocates with shareable content, recognition, and incentives turns them into brand champions who speak louder than any marketing campaign ever could. In today’s trust-driven market, advocacy isn’t optional — it’s essential. Create clear advocacy programs, provide easy content shares, and recognize top contributors to keep the flywheel spinning.",
            image: "/Advocacy.png",
            bgcolor: "linear-gradient(120deg,#f2f2f2,#e9e9e9)",
            icon: <CampaignIcon />,
            color: "#f44336",
        },
        Influencer_Marketing: {
            text:
                "Influencer Marketing is about leveraging trusted voices to tell your brand’s story. By partnering with individuals who already have the attention and trust of your target audience, you can cut through the noise and deliver messages that feel personal, not promotional. It’s not just about follower count — it’s about alignment, authenticity, and impact. The right influencer can spark engagement, build credibility, and drive real results, turning influence into action. Focus on long-term relationships, clear briefs, and measurement frameworks to turn influencer activity into measurable business outcomes.",
            image: "/Influencer_Marketing.png",
            bgcolor: "linear-gradient(120deg,#e6f7ff,#dff3ff)",
            icon: <PeopleIcon />,
            color: "#3f51b5",
        },
    };

    return (
        <Grid
            container
            width="100%"
            sx={{
                minHeight: "100vh",
                p: { xs: 2, md: 6 },
            }}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                mb={4}
                width="100%"
            >
                {Object.keys(contentMap).map((key) => (
                    <Button
                        key={key}
                        startIcon={contentMap[key].icon}
                        onClick={() => setButtonItems(key)}
                        sx={{
                            minWidth: "160px",
                            color: contentMap[key].color,
                            border: "1px solid",
                            borderColor: contentMap[key].color,
                            fontWeight: buttonItems === key ? "800" : "500",
                            background:
                                buttonItems === key ? "rgba(255,255,255,0.06)" : "transparent",
                            transition: "all 0.25s ease",
                            "&:hover": {
                                transform: "scale(0.98)",
                                backgroundColor: contentMap[key].color + "20",
                            },
                        }}
                    >
                        {key.replace("_", " ")}
                    </Button>
                ))}
            </Box>

            <Grid
                
                sx={{
                    p: 3,
                    borderRadius: 4,
                    width:'100%',
                    display:'flex',
                    background: contentMap[buttonItems].bgcolor,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
            >
                <Grid 
                sx={{
                    width:'50%'
                }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="800"
                        gutterBottom
                        sx={{ color: "#071014" }}
                    >
                        {buttonItems.replace("_", " ")}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: 14, sm: 16, md: 18 },
                            lineHeight: 1.8,
                            color: "#071014",
                        }}
                    >
                        {contentMap[buttonItems].text}
                    </Typography>
                </Grid>

                <Grid>
                    <Box
                        component="img"
                        src={contentMap[buttonItems].image}
                        alt={buttonItems}
                        sx={{
                            width: "100%",
                            height: { xs: "220px", sm: "320px", md: "420px" },
                            objectFit: "cover",
                            borderRadius: 3,
                            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Home;
