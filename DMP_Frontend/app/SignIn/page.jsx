"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../StateManagment/Zustand.jsx";

const SignIn = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const [role, setRole] = useState("Tutor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://sat-tara-backend.vercel.app/api/user/login", {
      // const response = await axios.post("http://localhost:8000/user/login", {
    
        email,
        password,
      });

      if (response.status === 200) {
        login(response.data);
        router.push("/Dashboard");
      }
    } catch (err) {
      console.log(err.response);
      console.log(err.message);
      setError(err.response?.data?.message || err.message || "Login failed.");
    }
  }

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
          justifyContent: 'center',
          mt: 8,
          mb: 2,
          width: "70%",
          height: "78vh",
          display: "flex",
          boxShadow: "2px 2px 2px 2px",
          mx: "auto",
          bgcolor:"white"
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
            Work
          </Typography>
          <Typography fontSize={45} fontWeight={800} mt={-1}>
            From Home
          </Typography>

          <Typography mt={3} textAlign="center" fontSize={16} width="100%">
            By Using our application you can get better marketing results for Your
            products and better compagining for the political parties and rest.just
            login to our app and use its features with any training required
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
          <Typography variant="h4" fontWeight={700} fontFamily={'cambria'} mb={3} color={"#095145ff"} textAlign={'center'}>
            Sign In
          </Typography>

          <Typography mb={1} color="grey.600">
            By using our Server you can post on
          </Typography>

          <ToggleButtonGroup

            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="Student">Facebook</ToggleButton>
            <ToggleButton value="Tutor">Twitter</ToggleButton>
            <ToggleButton value="Parent">Instagram</ToggleButton>
          </ToggleButtonGroup>

          <form onSubmit={handleLogin}>
            {error && (
              <Typography color="error" mb={1} textAlign="center">
                {error}
              </Typography>
            )}

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.2, bgcolor: "#095145ff" }}
            >
              Login
            </Button>
          </form>

          <Typography
            mt={2}
            sx={{ cursor: "pointer" }}
            color="primary"
            textAlign="center"
            onClick={() => router.push("/SignUp")}
          >
            Don&apos;t have an account? Sign up now
          </Typography>

          <Typography
            mt={1}
            textAlign="center"
            color="grey.600"
            sx={{ cursor: "pointer" }}
          >
            Forgot your password?
          </Typography>
        </Container>
      </Box>
      </Box>
    );
  };

  export default SignIn;
