// src/pages/ParkDetails/ParkDetails.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { 
  fetchReviewsByLocation,
  selectParks,
  selectReviews 
} from '../../app/slices/homePageSlice';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { Park, ReviewResponse } from '../../models/dtos';

const ParkDetails: React.FC = () => {
  const { parkLocationId } = useParams<{ parkLocationId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector(selectReviews);
  const park = useSelector(selectParks).find(p => p.parkLocationId === parkLocationId);
  
  useEffect(() => {
    if (parkLocationId) {
      dispatch(fetchReviewsByLocation(parkLocationId));
    }
  }, [dispatch, parkLocationId]);

  if (!park) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box padding={4}>
        <Typography variant="h4" gutterBottom>
          {park.parkName}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {park.parkLocation}
        </Typography>
        
        {/* Reviews section - to be implemented */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          {reviews.map(review => (
            <Box key={review.id} mt={2} p={2} border="1px solid" borderColor="divider" borderRadius={1}>
              <Typography variant="body1">{review.review}</Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {review.ratingScore}/5
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ParkDetails;