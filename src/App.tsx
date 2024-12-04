import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemText, Fab, Divider, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import ParkDetails from './pages/ParkDetails/ParkDetails';

// Define drawer width
const drawerWidth = 240;

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    window.history.replaceState(null, '', '/'); 
    window.location.reload(); 
  };

  return (
    <Router>
      <Box sx={{ position: 'relative', height: '100vh' }}>
        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1300, 
          }}
        >
          {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
        </Fab>

        {/* Drawer */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'fixed', 
              display: 'flex',
              flexDirection: 'column', 
              justifyContent: 'space-between',
            },
          }}
        >
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/home">
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/park/1">
                  <ListItemText primary="Park Details" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/">
                  <ListItemText primary="Sign In" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Divider />
          {/* Sign Out Button */}
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Button variant="contained" onClick={handleSignOut} sx={{backgroundColor: 'red'}}>
              Sign Out
            </Button>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/park/:parkLocationId" element={<ParkDetails />} />
          </Routes>
        </Box>
      </Box>
      <CssBaseline />
    </Router>
  );
}

export default App;
