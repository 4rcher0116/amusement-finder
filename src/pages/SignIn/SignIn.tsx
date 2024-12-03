import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import image from '../../assets/images/AmusementPark.webp'

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Check if user data already exists in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserID = localStorage.getItem('userID');

    if (storedUsername && storedUserID) {
      navigate('/home');
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = () => {
    if (username.trim()) {
      const userID = uuidv4();
      localStorage.setItem('username', username);
      localStorage.setItem('userID', userID);
      navigate('/home');
    } else {
      alert('Please enter a valid username.');
    }
  };

  return (
    <Grid container height="100vh">
      {/* Left half - Image */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: '100%',
            backgroundImage:  `url(${require('../../assets/images/AmusementPark.webp')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
        sx={{ padding: 4, bgcolor: '#f5f5f5' }}
      >
        <Typography variant='h2' align='center'>
          Amusement Finder
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height='100%'
          width='100%'
          gap='10%'
        >
          <Box width="100%" maxWidth={400}>
            <Typography variant="h4" gutterBottom align="center">
              Set Anonymous Username
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
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
