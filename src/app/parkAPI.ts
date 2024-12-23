import { createApiClient } from '../config/apiClient';
import { ReviewRequest } from '../models/dtos';

const apiClient = createApiClient('Park');

// Fetch all parks
export const getParks = async () => {
  const response = await apiClient.get('/parks');
  return response.data;
};

// Fetch all locations
export const getLocations = async () => {
  const response = await apiClient.get('/locations');
  return response.data;
};

// Fetch parks by location
export const getParksByLocation = async (locationId: string) => {
  const response = await apiClient.get(`/parks/location/${locationId}`);
  return response.data;
};

// Add a review
export const addReview = async (reviewData: ReviewRequest) => {
  const response = await apiClient.post('/review', reviewData);
  return response.data;
};

// Update a review
export const updateReview = async (reviewData: ReviewRequest) => {
  const response = await apiClient.put('/review', reviewData);
  return response.data;
};

// Get reviews by location
export const getReviewsByLocation = async (parkLocationId: string) => {
  const response = await apiClient.get(`/reviews/${parkLocationId}`);
  return response.data;
};

// Delete a review
export const deleteReview = async (reviewId: string) => {
  const response = await apiClient.delete(`/review/${reviewId}`);
  return response.data;
};

// Get parks by search term
export const getParksBySearch = async (searchTerm: string) => {
  const response = await apiClient.get('/GetParksBySearch', {
    params: { searchTerm }
  });
  return response.data;
};

// Get reviews by user
export const getReviewsByUser = async (userId: string) => {
  const response = await apiClient.get(`/reviews/user/${userId}`);
  return response.data;
};