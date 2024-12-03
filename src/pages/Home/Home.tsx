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
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Container,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { AppDispatch } from '../../app/store';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const parks = useSelector(selectParks);
  const status = useSelector(selectHomePageStatus);
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    dispatch(fetchParks());
  }, [dispatch]);

  const handleSelectPark = (park: Park) => {
    setSelectedPark(park);
  };

  const getFilteredAndSortedParks = () => {
    return parks
      .filter(park => {
        return park.parkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               park.parkLocation.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        const compareResult = sortBy === 'name' 
          ? a.parkName.localeCompare(b.parkName)
          : a.parkLocation.localeCompare(b.parkLocation);
        return sortDirection === 'asc' ? compareResult : -compareResult;
      });
  };

  if (status === 'loading') {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
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
    <Container maxWidth="lg">
      <Box 
        padding={4} 
        sx={{
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
          borderRadius: 3,
          minHeight: '100vh'
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center" 
          sx={{ 
            mb: 4,
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Theme Parks
        </Typography>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ 
              backgroundColor: 'white',
              p: 2,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search parks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
              sx={{ flexGrow: 1 }}
            />
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="location">Location</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Direction</InputLabel>
              <Select
                value={sortDirection}
                label="Direction"
                onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
              >
                <MenuItem value="asc">A to Z</MenuItem>
                <MenuItem value="desc">Z to A</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {getFilteredAndSortedParks().map((park) => (
            <Grid item xs={12} sm={6} md={4} key={park.parkLocationId}>
              <Card
                elevation={1}
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  border: '1px solid',
                  borderColor: selectedPark?.parkLocationId === park.parkLocationId 
                    ? 'primary.main' 
                    : 'divider',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    borderColor: theme => 
                      selectedPark?.parkLocationId === park.parkLocationId 
                        ? 'primary.main' 
                        : theme.palette.grey[300],
                  },
                  position: 'relative',
                }}
              >
                <CardActionArea 
                  onClick={() => handleSelectPark(park)}
                  sx={{ 
                    height: '100%',
                    '&:focus-visible': {
                      outline: 'none',
                      boxShadow: theme => `0 0 0 2px ${theme.palette.primary.main}`,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 700,
                        color: 'text.primary',
                        mb: 2
                      }}
                    >
                      {park.parkName}
                    </Typography>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      gap={1} 
                      mb={2.5}
                      sx={{ opacity: 0.85 }}
                    >
                      <LocationOnIcon 
                        color="action" 
                        fontSize="small" 
                      />
                      <Typography variant="body2" color="text.secondary">
                        {park.parkLocation}
                      </Typography>
                    </Box>
                    <Chip
                      label={selectedPark?.parkLocationId === park.parkLocationId ? 'Selected' : 'Click to select'}
                      color={selectedPark?.parkLocationId === park.parkLocationId ? 'primary' : 'default'}
                      size="small"
                      variant={selectedPark?.parkLocationId === park.parkLocationId ? "filled" : "outlined"}
                      sx={{
                        borderRadius: '16px',
                        fontWeight: 500,
                        '& .MuiChip-label': {
                          px: 2
                        }
                      }}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedPark && (
          <Box 
            mt={4} 
            p={4} 
            bgcolor="#ffffff"
            borderRadius={2}
            boxShadow="0 2px 12px rgba(0,0,0,0.08)"
            border="1px solid"
            borderColor="divider"
            sx={{
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Selected Park Details
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <LocationOnIcon color="primary" />
              <Typography variant="body1" sx={{ color: 'text.primary' }}>
                {selectedPark.parkName} - {selectedPark.parkLocation}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;