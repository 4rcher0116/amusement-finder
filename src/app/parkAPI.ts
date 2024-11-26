import axios from 'axios';
import { ReviewRequest } from '../models/dtos';

const apiClient = axios.create({
  baseURL: 'https://localhost:7282/api/Park',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
