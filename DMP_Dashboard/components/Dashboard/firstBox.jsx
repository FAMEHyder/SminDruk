'use client';

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import FacebookIcon from '@mui/icons-material/Facebook';
import ReplayIcon from '@mui/icons-material/Replay';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function FirstBox() {
    return (
        <Box sx={{boxShadow:"2px 2px 2px 2px gray",width:"95%",ml:3.5,mt:2,borderRadius:"2px"}}>
            <Typography sx={{fontSize:25, fontWeight:800,textAlign:"center", color:"gray"}}>Sat-Tara Dashboard Overview</Typography>

        <Box
            width={'97%'}

            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: 2,
                gap: 2,
            }}
        >
            {/* Left Column */}
            <Box sx={{ width: '48%', display: 'flex', flexDirection: 'column', gap: 2 , }}>
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        height: '15vh',
                        alignItems: 'center',
                        padding: 2,
                        gap: 2,
                        background: "#ffffff",
                        justifyContent: 'space-between',
                        border:" .5px solid gray"
                    }}
                >
                    <FacebookIcon fontSize="large" color="primary" />
                    <Box>
                        <Typography variant="subtitle1" color='primary' fontWeight={800}>Connected Facebook Pages</Typography>
                        <Typography variant="h6" sx={{ textAlign: 'end' }} color='primary' fontWeight={800}>15079</Typography>
                    </Box>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        height: '15vh',
                        alignItems: 'center',
                        padding: 2,
                        gap: 2,
                        background: "#ffffff",
                        justifyContent: 'space-between',
                        border:" .5px solid gray"


                    }}
                >
                    <ReplayIcon fontSize="large" color="secondary" />
                    <Box>
                        <Typography variant="subtitle1" color='purple' fontWeight={800}>Token Rotation Required Pages</Typography>
                        <Typography variant="h6" sx={{ textAlign: 'end' }} color='purple' fontWeight={800}>139</Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Right Column */}
            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        height: '15vh',
                        alignItems: 'center',
                        padding: 2,
                        gap: 2,
                        background: "#ffffff",
                        justifyContent: 'space-between',
                        border:" .5px solid gray"


                    }}
                >
                    <GroupsIcon fontSize="large" color="success" />
                    <Box >
                        <Typography variant="subtitle1" color='green' fontWeight={800}>Active Users</Typography>
                        <Typography variant="h6" sx={{ textAlign: 'end' }} color='green' fontWeight={800}>10014</Typography>
                    </Box>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        height: '15vh',
                        alignItems: 'center',
                        padding: 2,
                        gap: 2,
                        background: "#ffffff",
                        justifyContent: 'space-between',
                        border:" .5px solid gray"


                    }}
                >
                    <AccessTimeIcon fontSize="large" color="error" />
                    <Box>
                        <Typography variant="subtitle1" color='red' fontWeight={800}>Expired pages</Typography>
                        <Typography variant="h6" sx={{ textAlign: 'end' }} color='red' fontWeight={800}>75</Typography>
                    </Box>
                </Paper>
            </Box>

        </Box>
        </Box>
    );
}
