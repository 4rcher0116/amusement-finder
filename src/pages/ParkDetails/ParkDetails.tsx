import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { 
  fetchReviewsByLocation,
  selectParks,
  selectReviews,
  selectReviewsStatus,
  selectReviewsError
} from '../../app/slices/homePageSlice';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress,
  TextField,
  Button,
  Rating,
  Alert,
  Paper,
  Stack,
  Divider 
} from '@mui/material';
import { Park, ReviewRequest } from '../../models/dtos';
import { addReview } from '../../app/parkAPI';
import { v4 as uuidv4 } from 'uuid';

const ParkDetails: React.FC = () => {
  const { parkLocationId } = useParams<{ parkLocationId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const reviews = useSelector(selectReviews);
  const park = useSelector(selectParks).find(p => p.parkLocationId === parkLocationId);
  
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const reviewsStatus = useSelector(selectReviewsStatus);
  const reviewsError = useSelector(selectReviewsError);

  useEffect(() => {
    if (parkLocationId) {
      console.log('Fetching reviews for parkLocationId:', parkLocationId);
      dispatch(fetchReviewsByLocation(parkLocationId));
    }
  }, [dispatch, parkLocationId]);

  useEffect(() => {
    console.log('Reviews status:', reviewsStatus);
    console.log('Current reviews:', reviews);
  }, [reviews, reviewsStatus]);

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      setErrorMessage('Please enter a review');
      setSubmitStatus('error');
      return;
    }

    if (!rating) {
      setErrorMessage('Please select a rating');
      setSubmitStatus('error');
      return;
    }

    const userId = localStorage.getItem('userid');
    if (!userId) {
      navigate('/');
      return;
    }

    if (!park?.parkId || !parkLocationId) {
      setErrorMessage('Invalid park information');
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('loading');
    try {
      const reviewData: ReviewRequest = {
        id: uuidv4(),
        review: reviewText.trim(),
        userId,
        ratingScore: rating,
        themeParkId: park.parkId,
        themeParkLocationId: parkLocationId
      };

      console.log('Submitting review:', reviewData);
      await addReview(reviewData);
      console.log('Review submitted successfully');
      
      setSubmitStatus('success');
      setReviewText('');
      setRating(5);
      dispatch(fetchReviewsByLocation(parkLocationId));
    } catch (error) {
      console.error('Review submission failed:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit review. Please try again.');
    }
  };

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
        
        <Paper elevation={2} sx={{ p: 3, mt: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Write a Review
          </Typography>
          <Stack spacing={2}>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue || 5)}
              size="large"
            />
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Share your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            {submitStatus === 'error' && (
              <Alert severity="error">{errorMessage}</Alert>
            )}
            {submitStatus === 'success' && (
              <Alert severity="success">Review submitted successfully!</Alert>
            )}
            <Button 
              variant="contained" 
              onClick={handleSubmitReview}
              disabled={submitStatus === 'loading'}
              startIcon={submitStatus === 'loading' ? <CircularProgress size={20} /> : null}
            >
              {submitStatus === 'loading' ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Stack>
        </Paper>

        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        <Stack spacing={2}>
          {reviewsStatus === 'loading' && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          
          {reviewsStatus === 'failed' && (
            <Alert severity="error">
              Failed to load reviews: {reviewsError}
            </Alert>
          )}
          
          {reviewsStatus === 'succeeded' && reviews.length === 0 && (
            <Typography color="text.secondary">
              No reviews yet. Be the first to review!
            </Typography>
          )}
          
          {reviewsStatus === 'succeeded' && reviews.map(review => (
            <Paper key={review.id} elevation={1} sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Rating value={review.rating} readOnly size="small" />
              </Stack>
              <Typography variant="body1">{review.comment}</Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default ParkDetails;