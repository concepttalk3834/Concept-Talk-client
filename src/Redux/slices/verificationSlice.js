import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { verificationAPI } from '../../services/api';

// Async thunks
export const sendOtp = createAsyncThunk(
  'verification/sendOtp',
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response = await verificationAPI.sendOtp(phoneNumber);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const validateOtp = createAsyncThunk(
  'verification/validateOtp',
  async ({ phoneNumber, verificationCode }, { rejectWithValue }) => {
    try {
      const response = await verificationAPI.validateOtp(phoneNumber, verificationCode);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isVerified: false,
  loading: false,
  error: null,
  message: null,
  otpSent: false,
  countdown: 0,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    startCountdown: (state) => {
      state.countdown = 60;
    },
    decrementCountdown: (state) => {
      if (state.countdown > 0) {
        state.countdown -= 1;
      }
    },
    resetVerification: (state) => {
      state.isVerified = false;
      state.otpSent = false;
      state.countdown = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
        state.message = 'OTP sent successfully!';
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Validate OTP
      .addCase(validateOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateOtp.fulfilled, (state) => {
        state.loading = false;
        state.isVerified = true;
        state.message = 'Phone number verified successfully!';
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearMessage, 
  startCountdown, 
  decrementCountdown,
  resetVerification 
} = verificationSlice.actions;

export default verificationSlice.reducer; 