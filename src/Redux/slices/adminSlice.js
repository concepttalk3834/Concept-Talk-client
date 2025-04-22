import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminAPI } from '../../services/api';

// Async thunks
export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getUsers();
      // console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getAllPayments = createAsyncThunk(
  'admin/getAllPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getPayments();
      // console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  users: [],
  payments: [],
  loading: false,
  error: null,
  paymentsLoading: false,
  paymentsError: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.paymentsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Payments
      .addCase(getAllPayments.pending, (state) => {
        state.paymentsLoading = true;
        state.paymentsError = null;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.paymentsLoading = false;
        state.payments = action.payload;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.paymentsLoading = false;
        state.paymentsError = action.payload;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer; 