import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, clearError, clearMessage } from '../Redux/slices/dashboardSlice';
import { logout } from '../Redux/slices/authSlice';
import { getUserPayments } from '../Redux/slices/paymentSlice';
import dayjs from 'dayjs';

import { 
  sendOtp, 
  validateOtp, 
  startCountdown, 
  decrementCountdown,
  resetVerification 
} from '../Redux/slices/verificationSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { profile, loading, error, message } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);
  const { userPayments, loading: paymentsLoading } = useSelector((state) => state.payment);

  // console.log(profile)
  // console.log(user)

  const { 
    loading: verificationLoading, 
    error: verificationError, 
    message: verificationMessage,
    otpSent,
    countdown
  } = useSelector((state) => state.verification);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    userRank: '',
    percentile: '',
    category: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState('');

  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    dispatch(getProfile());
    if (profile?.email) {
      dispatch(getUserPayments(profile.email));
    }
  }, [dispatch, profile?.email]);

  useEffect(() => {
    if (userPayments) {
      // console.log('Payment data:', userPayments);
      userPayments.forEach(payment => {
        // console.log('Payment date:', payment.created_at, 'Type:', typeof payment.created_at);
      });
    }
  }, [userPayments]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phoneNumber: profile.phoneNumber || '',
        userRank: profile.userrank || '',
        percentile: profile.percentile || '',
        category: profile.category || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        dispatch(decrementCountdown());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (verificationError) {
      toast.error(verificationError);
    }
    if (verificationMessage) {
      toast.success(verificationMessage);
    }
  }, [error, message, verificationError, verificationMessage, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateProfile(formData));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSendOtp = () => {
    if (!formData.phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    dispatch(sendOtp(formData.phoneNumber));
    dispatch(startCountdown());
  };

  const handleVerifyOtp = () => {
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }

    if (!formData.phoneNumber) {
      toast.error('Phone number is required');
      return;
    }

    dispatch(validateOtp({
      phoneNumber: formData.phoneNumber,
      verificationCode
    }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
      dispatch(resetVerification());
    };
  }, [dispatch]);

  // Validation functions
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const numberRegex = /^[0-9]+$/;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.userRank.trim()) {
      errors.userRank = 'Rank is required';
    } else if (!numberRegex.test(formData.userRank)) {
      errors.userRank = 'Rank must be a number';
    }

    if (!formData.percentile.trim()) {
      errors.percentile = 'Percentile is required';
    } else if (!numberRegex.test(formData.percentile) || formData.percentile < 0 || formData.percentile > 100) {
      errors.percentile = 'Percentile must be a number between 0 and 100';
    }

    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderProfileSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-500 px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Profile Settings</h1>
            <p className="text-pink-100 mt-2">Manage your account information</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-500 font-bold text-xl">
              {profile?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-pink-100 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message Section */}
      <div className="bg-yellow-50 px-8 py-4 border-b border-yellow-200">
        <div className="max-w-xl mx-auto">
          <p className="text-gray-700 text-lg">
            Great! We are happy to connect with you. You can contact us at:
          </p>
          <div className="mt-2 flex items-center space-x-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-700 font-semibold">Concept Talk</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700 font-semibold">+91 8104391071</span>
              <span className="mx-2">||</span>
              <span className="text-gray-700 font-semibold">+91 7061545872</span>
              <span className="mx-2">||</span>
              <span className="text-gray-700 font-semibold">+91 7642010280</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 ${
                  formErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={profile?.emailVerified}
                  className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  } ${profile?.emailVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  required
                />
                {profile?.emailVerified && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
              {profile?.emailVerified && (
                <p className="text-sm text-green-600 mt-1">Email verified and locked</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex space-x-2">
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!profile?.phoneVerified}
                  className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 ${
                    formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  } ${profile?.phoneVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  required
                />
                {/* {!profile?.phoneVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={countdown > 0}
                    className={`px-4 py-2 rounded-xl font-sm transition duration-300 ${
                      countdown > 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-pink-400 text-white hover:bg-pink-500'
                    }`}
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : 'Send OTP'}
                  </button>
                )} */}
              </div>
              {formErrors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>
              )}
              {profile?.phoneVerified && (
                <div className="mt-2 flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Phone number verified and locked</span>
                </div>
              )}
            </div>

            {/* {otpSent && !profile?.phoneVerified && (
              <div className="form-group col-span-2">
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label> */}
                {/* <div className="flex space-x-2"> */}
                  {/* <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                    placeholder="Enter OTP"
                  /> */}
                  {/* <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition duration-300"
                  >
                    Verify
                  </button>
                </div> */}
              {/* </div>
            )} */}

            <div className="form-group">
              <label htmlFor="userRank" className="block text-sm font-medium text-gray-700 mb-1">
                Rank
              </label>
              <input
                type="number"
                id="userRank"
                name="userRank"
                value={formData.userRank}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 ${
                  formErrors.userRank ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.userRank && (
                <p className="mt-1 text-sm text-red-600">{formErrors.userRank}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="percentile" className="block text-sm font-medium text-gray-700 mb-1">
                Percentile
              </label>
              <input
                type="number"
                id="percentile"
                name="percentile"
                value={formData.percentile}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 ${
                  formErrors.percentile ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.percentile && (
                <p className="mt-1 text-sm text-red-600">{formErrors.percentile}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 ${
                  formErrors.category ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.category && (
                <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-3 bg-pink-400 text-white rounded-xl font-medium hover:bg-pink-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              Update Profile
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );

  const renderPaymentSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4 sm:p-6"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Payment History</h2>
      {paymentsLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : userPayments?.filter(payment => payment.status !== 'created').length === 0 ? (
        <p className="text-gray-600 text-center py-8">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Payment ID</th>
                <th className="py-2 px-4 border-b text-left">Order ID</th>
                <th className="py-2 px-4 border-b text-left">Amount</th>
                <th className="py-2 px-4 border-b text-center">Status</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {userPayments
                ?.filter(payment => payment.status !== 'created')
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((payment) => (
                <tr key={payment.order_id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{payment.paymentId}</td>
                  <td className="py-2 px-4 border-b">{payment.transactionId}</td>
                  <td className="py-2 px-4 border-b">₹{payment.amount/100}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      payment.status === 'success' 
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'failure'
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {dayjs(payment.timestamp).format('DD-MM-YYYY')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-xl font-medium transition duration-300 ${
                activeTab === 'profile'
                  ? 'bg-pink-400 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 rounded-xl font-medium transition duration-300 ${
                activeTab === 'payments'
                  ? 'bg-pink-400 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Payment History
            </button>
          </div>
        </div>

        {/* Content Section */}
        {activeTab === 'profile' ? renderProfileSection() : renderPaymentSection()}
      </div>
    </div>
  );
};

export default UserDashboard;