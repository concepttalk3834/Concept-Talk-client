import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { paymentAPI } from '../../services/api';

// Async thunks
export const createOrder = createAsyncThunk(
  'payment/createOrder',
  async (amount, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.createOrder(amount);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updatePayment = createAsyncThunk(
  'payment/update',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.updatePayment(paymentData);
      console.log(response)
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.response?.data || error.message || 'Payment update failed';
      return rejectWithValue(errorMessage);
    }
  }
);


export const getUserPayments = createAsyncThunk(
  'payment/getUserPayments',
  async (email, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.getUserPayments(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  order: null,
  loading: false,
  error: null,
  message: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Payment
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Payment updated successfully';
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get User Payments
      .addCase(getUserPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(getUserPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage, clearOrder } = paymentSlice.actions;
export default paymentSlice.reducer; 