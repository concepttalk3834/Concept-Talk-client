import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk for requesting password reset
export const requestPasswordReset = createAsyncThunk(
  'passwordReset/request',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/forgot-password', null, {
        params: { email }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to send reset email');
    }
  }
);

// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
  'passwordReset/reset',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/reset-password', {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to reset password');
    }
  }
);

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = passwordResetSlice.actions;
export default passwordResetSlice.reducer; 