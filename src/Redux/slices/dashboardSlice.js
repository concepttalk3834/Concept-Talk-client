import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardAPI } from '../../services/api';

// Async thunks
export const getProfile = createAsyncThunk(
  'dashboard/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getProfile();
      // console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'dashboard/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.updateProfile(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
  message: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.message = 'Profile updated successfully!';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage } = dashboardSlice.actions;
export default dashboardSlice.reducer; 