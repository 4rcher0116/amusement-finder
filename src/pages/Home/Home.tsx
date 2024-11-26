import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchParks,
  selectParks,
  selectHomePageStatus,
} from '../../app/slices/homePageSlice';
import { Park } from '../../models/dtos';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { AppDispatch } from '../../app/store';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const parks = useSelector(selectParks);
  const status = useSelector(selectHomePageStatus);
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);

  useEffect(() => {
    // Fetch parks data on component mount
    dispatch(fetchParks());
  }, [dispatch]);

  const handleSelectPark = (park: Park) => {
    setSelectedPark(park);
  };

  if (status === 'loading') {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          Failed to load parks. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Select a Theme Park
      </Typography>

      <List>
        {parks.map((park) => (
          <ListItem key={park.parkId}>
            <ListItemButton
              selected={selectedPark?.parkId === park.parkId}
              onClick={() => handleSelectPark(park)}
            >
              <ListItemText
                primary={park.parkName}
                secondary={park.parkLocation}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {selectedPark && (
        <Box mt={4}>
          <Typography variant="h6">Selected Park:</Typography>
          <Typography>
            {selectedPark.parkName} - {selectedPark.parkLocation}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Home;
