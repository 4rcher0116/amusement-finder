import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  TextField,
  Autocomplete,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
} from '@mui/material';
import { getLocations, getParksByLocation } from '../../app/parkAPI';
import { Location, Park } from '../../models/dtos';
import { useNavigate } from 'react-router-dom';

const ParkSearch: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await getLocations();
        setLocations(locations);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchParks = async () => {
      if (selectedLocations.length === 0) {
        setParks([]);
        return;
      }

      setLoading(true);
      try {
        const parksPromises = selectedLocations.map((location) =>
          getParksByLocation(location.id)
        );
        const parksArray = await Promise.all(parksPromises);
        const allParks = parksArray.flat();
        setParks(allParks);
      } catch (error) {
        console.error('Failed to fetch parks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, [selectedLocations]);

  const filteredParks = parks.filter((park) =>
    park.parkName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPark = (park: Park) => {
    navigate(`/park/${park.parkLocationId}`);
  };

  return (
    <Container maxWidth="lg">
      <Box padding={4}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 600, color: 'primary.main' }}>
            Search by Location
        </Typography>
        <Stack spacing={3} sx={{ mb: 4 }}>
          <Autocomplete
            multiple
            options={locations}
            getOptionLabel={(option) => option.name}
            value={selectedLocations}
            onChange={(event, newValue) => setSelectedLocations(newValue)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Select Locations" placeholder="Locations" />
            )}
          />
        </Stack>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredParks.map((park) => (
              <Grid item xs={12} sm={6} md={4} key={park.parkId}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    transition: 'all 0.2s ease-in-out',
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      borderColor: 'primary.main',
                    },
                    position: 'relative',
                  }}
                >
                  <CardActionArea onClick={() => handleSelectPark(park)}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {park.parkName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {park.parkLocation}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default ParkSearch;