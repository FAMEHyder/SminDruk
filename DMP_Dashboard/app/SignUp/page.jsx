"use client";

import { useState } from "react";
import {
  Button,
  Container,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    dob: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://sat-tara-backend.vercel.app/api/user/register",
        formData
      );

      if (response.status === 201) {
        alert("Registration successful!");
        router.push("/SignIn");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.1)), url('/com.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Box
        sx={{
          justifyContent: "center",
          mt: 8,
          mb: 2,
          width: "70%",
          height: "125vh",
          display: "flex",
          boxShadow: "2px 2px 2px 2px",
          mx: "auto",
          bgcolor: "white"
        }}
      >

        <Box
          sx={{
            width: "50%",
            bgcolor: "#095145ff",
            color: "white",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: 6,
            backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('/library.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography fontSize={45} fontWeight={800}>
            Knowledge
          </Typography>
          <Typography fontSize={45} fontWeight={800} mt={-1}>
            From Home
          </Typography>

          <Typography mt={3} textAlign="center" fontSize={16}>
            Create your account and unlock a world of learning.
            No drama, no rocket science — just pure knowledge.
          </Typography>
        </Box>

        <Container
          maxWidth="sm"
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            fontFamily={"cambria"}
            mb={3}
            color={"#095145ff"}
            textAlign="center"
          >
            Sign Up
          </Typography>

          {error && (
            <Typography color="error" mb={1} textAlign="center">
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              margin="normal"
              required
              value={formData.fullName}
              onChange={handleChange}
            />

            <TextField
              name="userName"
              label="User Name"
              fullWidth
              margin="normal"
              required
              value={formData.userName}
              onChange={handleChange}
            />
            <TextField
              name="dob"
              label="Date of Birth"
              type="date"
              fullWidth
              margin="normal"
              required
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              margin="normal"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              name="address"
              label="Address"
              fullWidth
              margin="normal"
              required
              value={formData.address}
              onChange={handleChange}
            />



            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 2, py: 1.2, bgcolor: "#095145ff" }}
            >
              Register Now
            </Button>
          </form>

          <Typography
            mt={2}
            sx={{ cursor: "pointer" }}
            color="primary"
            textAlign="center"
            onClick={() => router.push("/SignIn")}
          >
            Already have an account? Click to Sign In
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default SignUp;
