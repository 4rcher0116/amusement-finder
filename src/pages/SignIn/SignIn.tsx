import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Box, TextField, Button, Typography } from '@mui/material';

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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      padding={2}
    >
      <Typography variant="h4" gutterBottom>
        Set Anonymous Username:
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        sx={{ maxWidth: 400, marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ maxWidth: 400 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SignIn;
