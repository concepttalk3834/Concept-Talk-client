import axios from 'axios';

const API_URL = 'https://concepttalkjee.ap-south-1.elasticbeanstalk.com' || import.meta.env.VITE_APP_API_URI;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Store token if it exists in the response
    if (response.data?.token) {
      try {
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        console.error('Error storing token:', error);
      }
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error clearing auth data:', error);
      }
      window.location.href = '/auth';
    }
    return Promise.reject(error.response?.data || error.message || 'An error occurred');
  }
);

export const authAPI = {
  signUp: (userData) => api.post('/api/auth/signup', userData),
  signIn: (credentials) => api.post('/api/auth/signin', credentials),
  logout: () => api.post('/api/auth/logout'),
  forgetPassword: (email) => api.post('/auth/forget-password', { email }),
  resetPassword: (token, newPassword) => 
    api.post('/api/auth/reset-password', { token, newPassword }),
  verifyEmail: (token) => api.get(`/auth/verify-email?token=${token}`),
  getOAuthUser: () => api.get('/api/auth/oauth/user'),
  updateOAuthUser: (userData) => api.post('/api/auth/oauth/update', userData),
};

export const adminAPI = {
  getUsers: () => api.get('/api/admin/getusers'),
  getPayments: () => api.get('/api/admin/get-all-payments'),
};

export const dashboardAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (profileData) => api.post('/user/profile/update', profileData),
};

export const verificationAPI = {
    // Using query parameters (current approach)
    sendOtp: (phoneNumber) => {
      if (!phoneNumber) {
        return Promise.reject(new Error('Phone number is required'));
      }
      return api.post(`/sendOtp?phoneNumber=${encodeURIComponent(phoneNumber)}`);
    },
    validateOtp: (phoneNumber, verificationCode) => {
      if (!phoneNumber || !verificationCode) {
        return Promise.reject(new Error('Phone number and verification code are required'));
      }
      return api.post(`/validateOtp?phoneNumber=${encodeURIComponent(phoneNumber)}&verificationCode=${encodeURIComponent(verificationCode)}`);
    },
  };
  

export const paymentAPI = {
  createOrder: (amount) => api.post('/api/user/create', { 
    amount: amount,
    message: "Payment for the service"
  }),
  updatePayment: (paymentData) => api.post('/api/user/update_payment', {
    payment_id: paymentData.payment_id,
    order_id: paymentData.order_id,
    status: paymentData.status,
    plan_id: paymentData.plan_id,
    signature: paymentData.signature
  }),
  getUserPayments: (email) => api.get(`/api/user/${email}`),
};

export default api; 