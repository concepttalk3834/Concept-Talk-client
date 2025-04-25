import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    return {
      user: user && user !== 'undefined' ? JSON.parse(user) : null,
      isAuthenticated: !!token && token !== 'undefined',
      isAdmin: false,
      loading: false,
      error: null,
      message: null,
    };
  } catch (error) {
    console.error('Error loading initial state:', error);
    // Clear invalid data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return {
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      loading: false,
      error: null,
      message: null,
    };
  }
};

// Async thunks
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.signUp(userData);
      const user = { name: response.name, email: response.email ,role: response.role};

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(user));
      return { ...response, user };
    } catch (error) {
      return rejectWithValue(error.message || 'Sign up failed');
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.signIn(credentials);
      const user = { name: response.name, email: response.email ,role: response.role };
      // console.table(user)

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(user));

      return { ...response, user };
    } catch (error) {
      return rejectWithValue(error.message || 'Sign in failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  }
);

export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.forgetPassword(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to send reset link');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await authAPI.resetPassword(token, newPassword);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to reset password');
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyEmail(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to verify email');
    }
  }
);

export const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async (_, { rejectWithValue }) => {
    try {
      // Return early while feature is disabled
      return rejectWithValue('Google authentication is currently unavailable');
      
      // The following code will not execute while feature is disabled
      const apiUrl = import.meta.env.VITE_APP_API_URI || 'https://api.concepttalk.in';
      window.location.href = `${apiUrl}/oauth2/authorization/google`;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to initiate Google authentication');
    }
  }
);

export const updateOAuthUser = createAsyncThunk(
  'auth/updateOAuthUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateOAuthUser(userData);
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

export const getOAuthUser = createAsyncThunk(
  'auth/getOAuthUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getOAuthUser();
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch OAuth user data');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setAuth(state, action) {
      const { token, user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.isAdmin = user?.role === 'admin';
    },
    
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Registration successful! Please check your email for verification.';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAdmin = action.payload.user.role === 'ADMIN';
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Forget Password
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Password reset link sent to your email.';
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Password reset successful!';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Email verified successfully!';
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Google Auth
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(googleAuth.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Google authentication initiated successfully';
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update OAuth User
      .addCase(updateOAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateOAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.message = 'Profile updated successfully';
      })
      .addCase(updateOAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get OAuth User
      .addCase(getOAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getOAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, clearMessage,setAuth } = authSlice.actions;
export default authSlice.reducer;
