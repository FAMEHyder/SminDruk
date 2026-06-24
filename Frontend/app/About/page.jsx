import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';

const About = () => {
    const titles = [
        'Software Overview',
        'Account Managment',
        'Insights',
        'Security & Privacy',
        'Payment Methods',
        'Terms & Conditions',
        'Customer Support',
        'Data Management',
        'User Interface',
        'Integration Options',
        'Updates & Maintenance',
        'Scalaibilty',
    ];

    const descriptions = [
        'Our software delivers a seamless and user-friendly experience that is easy to understand and use for everyone. With smart automation features, repetitive tasks are handled automatically, reducing manual effort and errors. This enables teams to work faster, more efficiently, and achieve better results with minimal manual input.',
        'Effortlessly connect and manage all your Facebook pages from a single, centralized dashboard. Schedule posts in advance, automate repetitive tasks, and streamline your social media workflow. Easily control team access and permissions, ensuring smooth collaboration and efficient management.',
        'Get real-time analytics on your posts’ performance, audience engagement, and overall growth. Track key metrics and monitor trends to understand what works best for your audience. Make informed, data-driven decisions using intuitive visual reports and actionable insights.',
        'We implement top-tier security protocols to protect your data at every step, ensuring maximum safety. We use encrypted data storage and advanced safeguards to prevent unauthorized access. Our GDPR-compliant policies guarantee that your information is handled responsibly and stays fully secure.',
        'Enjoy the convenience of making payments locally through JazzCash or Easypaisa, tailored for your region. You can also pay internationally using trusted platforms like Stripe, PayPal, and direct bank transfers. This flexible payment system ensures smooth and secure transactions for every user.',
        'All users are required to adhere to our platform’s fair use and anti-abuse policies at all times. Respectful and compliant behavior ensures a safe and positive experience for everyone. Continued access to the platform depends on following these guidelines consistently.',
        'Our round-the-clock customer support team is always available to assist you with any questions or issues. We ensure that your queries are addressed promptly and efficiently, minimizing downtime. With dedicated support, you can rely on seamless assistance whenever you need it.',
        'We manage your data with the highest level of integrity, ensuring it is safe and well-organized. Our platform allows seamless export and import of information for easy accessibility. Regular backups guarantee that your data is always protected and readily recoverable.',
        'Our clean and responsive user interface is crafted to enhance productivity and streamline your workflow. It ensures a smooth and intuitive experience across all devices, from desktops to smartphones. With easy navigation and thoughtful design, managing tasks becomes simple and efficient.',
        'Easily integrate your favorite tools and APIs to create a seamless, unified workflow. Connect different platforms effortlessly to streamline tasks and data management. This integration ensures a smooth, efficient, and productive experience across all your applications.',
        'We deliver regular updates and maintenance to ensure the platform remains fast, secure, and reliable. Continuous improvements keep features up-to-date and optimized for performance. This commitment guarantees a smooth and dependable experience for all users.',
        'Our software is highly scalable, capable of handling a large number of users interacting with it simultaneously. It efficiently manages high traffic without compromising performance or speed. This ensures a smooth and reliable experience even as your user base grows.',
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
                backgroundImage: `linear-gradient(rgba(0,0,0,.1)), url('/com.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                px: { xs: 3, md: 10 },
                py: 10,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
          background: "linear-gradient(rgba(26, 87, 74, 0.5), rgba(26, 87, 74, 0.5))",
                    zIndex: 0,
                }}
            />

            <Grid container spacing={6} sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} md={5}>
                    <Box sx={{ borderLeft: '5px solid #f5b335', pl: 3 }}>
                        <Typography variant="h3" fontWeight={800} gutterBottom>
                            About  <br /> Our Application
                        </Typography>
                    </Box>

                    <Typography sx={{ mt: 3, color: '#ddd', lineHeight: 1.8 }}>
                        Our platform is designed to empower businesses with automation,
                        insights, and scalable tools. We focus on performance, security,
                        and ease of use.
                    </Typography>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{ color: '#f5b335', mb: 3 }}
                    >
                        What We Do
                    </Typography>

                    <Grid container spacing={3} alignItems="stretch">
                        {titles.map((title, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}                       
                                key={index}
                                sx={{
                                    display: 'flex',
                                    maxWidth: '100%',            
                                }}
                            >
                                <Paper
                                    sx={{
                                        width: '100%',            
                                        height: '100%',            
                                        boxSizing: 'border-box',   
                                        p: 3,
                                        background: 'rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: 2,
                                        display: 'flex',
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            border: '2px solid #f5b335',
                                            borderRadius: 1,
                                            flexShrink: 0,
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1,
                                            width: '100%',        
                                        }}
                                    >
                                        <Typography fontWeight={700} color="white" gutterBottom>
                                            {title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                                color: '#ccc',
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {descriptions[index]}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>




            </Grid>
        </Box>
    );
};

export default About;
