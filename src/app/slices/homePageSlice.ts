import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getParks, getLocations, getReviewsByLocation } from '../parkAPI';
import { Park, Location, ReviewResponse } from '../../models/dtos';

// Define the initial state
interface HomePageState {
  parks: Park[];
  locations: Location[];
  reviews: ReviewResponse[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HomePageState = {
  parks: [],
  locations: [],
  reviews: [],
  status: 'idle',
  error: null,
};

// Thunks for async API calls
export const fetchParks = createAsyncThunk('homePage/fetchParks', async () => {
  return await getParks();
});

export const fetchLocations = createAsyncThunk(
  'homePage/fetchLocations',
  async () => {
    return await getLocations();
  }
);

export const fetchReviewsByLocation = createAsyncThunk(
  'homePage/fetchReviewsByLocation',
  async (parkLocationId: string) => {
    return await getReviewsByLocation(parkLocationId);
  }
);

// Create the slice
const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchParks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parks = action.payload;
      })
      .addCase(fetchParks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch parks';
      })
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch locations';
      })
      .addCase(fetchReviewsByLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviewsByLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch reviews';
      });
  },
});

export default homePageSlice.reducer;

// Selectors
export const selectParks = (state: RootState) => state.homePage.parks;
export const selectLocations = (state: RootState) => state.homePage.locations;
export const selectReviews = (state: RootState) => state.homePage.reviews;
export const selectHomePageStatus = (state: RootState) =>
  state.homePage.status;
