// src/components/UserLogin.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
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
    <Grid container height="100vh" sx={{ bgcolor: "#110054" }}>
      {/* Left half - Image */}
      <Grid item xs={12} md={6} sx={{ bgcolor: "#110054" }}>
        <Box
          sx={{
            height: "100%",
            backgroundImage: `url(${require("../../assets/images/slowedFerrisWheel.gif")})`,
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
        sx={{ padding: 4, bgcolor: "#110054" }}
      >
        <Typography
          align="center"
          variant="h1"
          color="#fff"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.1rem",
            marginBottom: "1rem",
          }}
        >
          Amusement Finder
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="calc(100%)"
          width="100%"
          gap="10%"
          // Forgive this inline style, it's just for the sake of the demo
          sx={{ transform: "translateY(-5%)" }}
        >
          <Box width="fit-content" height="20vh">
            <Typography
              variant="h2"
              gutterBottom
              align="center"
              color="#fff"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.05rem",
                marginBottom: "1rem",
              }}
            >
              Set Anonymous Username
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#fff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                  '& input': {
                    color: '#fff',
                    fontSize: '1.5rem',
                  },
                  height: '56px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
                '& .MuiInputLabel-root': {
                  color: '#fff',
                  fontSize: '1.5rem',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#fff',
                },
                paddingBottom: '10px',
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              sx={{
                marginTop: '1rem',
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                color: '#fff',
                fontSize: '1.25rem',
                fontWeight: "bold",
                padding: '0.75rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                },
              }}
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
