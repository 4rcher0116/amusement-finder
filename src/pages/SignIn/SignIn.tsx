// src/components/UserLogin.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import image from "../../assets/images/AmusementPark.webp";
import { getUserId } from "../../app/userAPI";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userid");

    if (storedUsername && storedUserId) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      return;
    }

    const user = await getUserId(username);

    // Save username and userId in localStorage
    localStorage.setItem("username", user.userName);
    localStorage.setItem("userid", user.id);

    // Redirect to the dashboard after successful login
    navigate("/home");
  };

  return (
    <Grid container height="100vh">
      {/* Left half - Image */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: "100%",
            backgroundImage: `url(${require("../../assets/images/AmusementPark.webp")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>

      {/* Right half - Form */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ padding: 4, bgcolor: "#f5f5f5" }}
      >
        <Typography align="center" variant="h1">
          Amusement Finder
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
          gap="10%"
        >
          <Box width="fit-content" height="20vh">
            <Typography variant="h2" gutterBottom align="center">
              Set Anonymous Username
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
