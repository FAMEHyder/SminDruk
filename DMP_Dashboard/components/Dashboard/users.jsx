'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, Skeleton
} from '@mui/material';

const ConnectedPages = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  // ✅ API CALL
  useEffect(() => {
    axios
      .get("https://sat-tara-backend.vercel.app/api/user/getAllUsers")
      .then((res) => {
        setUsers(res.data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Date Format Function
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB"); 
    // format: 21/08/2003
  };

  return (
    <Box m={3}>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: "2px 2px 2px 2px gray" }}
      >
        <Table
          sx={{
            border: '1px solid #ccc',
            borderCollapse: 'collapse',
            '& th, & td': {
              border: '1px solid black',
            },
          }}
        >

          {/* HEADER */}
          <TableHead>

            <TableRow>
              <TableCell
                colSpan={7}
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  backgroundColor: '#09362f',
                  color: "white"
                }}
              >
                Active Users
              </TableCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: "#09362f" }}>
              {["S No.", "Full Name", "User Name", "DOB", "Email", "Ph_No.", "Address"].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>

          </TableHead>

          {/* BODY */}
          <TableBody>

            {/* ✅ LOADING SKELETON */}
            {loading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  {[...Array(7)].map((_, i) => (
                    <TableCell key={i}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                    '&:hover': { backgroundColor: '#e3f2fd' },
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{user.fullName}</TableCell>
                  <TableCell align="center">{user.userName}</TableCell>

                  {/* ✅ FIXED DOB FORMAT */}
                  <TableCell align="center">
                    {formatDate(user.dob)}
                  </TableCell>

                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phoneNumber}</TableCell>
                  <TableCell align="center">{user.address}</TableCell>
                </TableRow>
              ))
            )}

          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default ConnectedPages;