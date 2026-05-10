'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Skeleton,
  Button,
} from '@mui/material';

const ConnectedPages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // 🔥 FETCH PAGES (FIXED)
  // =========================
  const fetchPages = async () => {
    try {
      const res = await axios.get(
        // "http://localhost:8000/api/facebook",
          "https://sat-tara-backend.vercel.app/api/pages/facebook",

        {
          params: { t: Date.now() }, // cache buster
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );

      console.log("🔥 API RESPONSE:", res.data);

      const data =
        res.data?.pages ||
        res.data?.data ||
        res.data ||
        [];

      setPages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // =========================
  // 🔥 ROTATE TOKEN
  // =========================
  const handleRotate = async (pageId) => {
    try {
      await axios.post(
        `https://sat-tara-backend.vercel.app/api/pages/facebook/rotatenow/${pageId}`
      );

      alert("Token Rotated Successfully 🔥");
      fetchPages(); // no reload (better UX)
    } catch (error) {
      console.error("Rotate Error:", error);
      alert("Rotation Failed ❌");
    }
  };

  return (
    <Box m={3}>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table
          sx={{
            border: '1px solid #ccc',
            '& th, & td': { border: '1px solid black' },
          }}
        >

          {/* ================= TITLE ================= */}
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={7}
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  backgroundColor: '#09362f',
                  color: 'white',
                }}
              >
                Connected Facebook Pages
              </TableCell>
            </TableRow>

            {/* ================= HEADER ================= */}
            <TableRow sx={{ backgroundColor: '#09362f' }}>
              {[
                "P-N",
                "Page Name",
                "Page ID",
                "Issued",
                "Expires",
                "Days Left",
                "Rotation Needed"
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* ================= SKELETON ================= */}
            {loading ? (
              [...Array(6)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(7)].map((_, j) => (
                    <TableCell key={j} align="center">
                      <Skeleton height={25} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : pages.length > 0 ? (
              pages.map((row, index) => (
                <TableRow key={row._id || index} hover>

                  <TableCell align="center">
                    {row.pageNumber ?? "-"}
                  </TableCell>

                  <TableCell align="center">
                    {row.pageName ?? "-"}
                  </TableCell>

                  <TableCell align="center">
                    {row.pageId ?? "-"}
                  </TableCell>

                  <TableCell align="center">
                    {row.tokenIssuedAt
                      ? new Date(row.tokenIssuedAt).toLocaleDateString()
                      : "-"}
                  </TableCell>

                  <TableCell align="center">
                    {row.tokenExpiresAt
                      ? new Date(row.tokenExpiresAt).toLocaleDateString()
                      : "-"}
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      label={`${row.daysLeft ?? 0} days`}
                      color={
                        (row.daysLeft ?? 0) <= 5
                          ? 'error'
                          : (row.daysLeft ?? 0) <= 15
                            ? 'warning'
                            : 'success'
                      }
                      size="small"
                    />
                  </TableCell>

                  {/* ================= STATUS ================= */}
                  <TableCell align="center">
                    {row.status &&
                      row.status.toLowerCase().replace(/\s|_/g, "-") === "rotation-needed" ? (
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => handleRotate(row.pageId)}
                      >
                        Rotate
                      </Button>
                    ) : (
                      <Chip
                        label={row.status ?? "unknown"}
                        color={
                          row.status?.toLowerCase() === "expired"
                            ? "error"
                            : row.status?.toLowerCase() === "active"
                              ? "success"
                              : "default"
                        }
                        size="small"
                      />
                    )}
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No pages connected
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default ConnectedPages;