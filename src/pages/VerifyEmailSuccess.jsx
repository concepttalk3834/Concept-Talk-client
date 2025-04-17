import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../Redux/slices/authSlice';
import { toast } from 'react-toastify';

const VerifyEmailSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    console.log(token)
    
    if (!token) {
      setVerificationStatus('error');
      setIsVerifying(false);
      toast.error('Invalid verification link');
      return;
    }

    const verifyEmailToken = async () => {
      try {
        const result = await dispatch(verifyEmail(token)).unwrap();
        console.log(result)
        setVerificationStatus('success');
        toast.success('Email verified successfully!');
      } catch (error) {
        setVerificationStatus('error');
        toast.error(error.message || 'Failed to verify email');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmailToken();
  }, [dispatch, searchParams]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-8 text-center">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Verifying Your Email...
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your email address.
          </p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Verification Failed
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't verify your email. The link may have expired or is invalid.
          </p>
          <Link
            to="/auth"
            className="inline-block bg-yellow-400 text-white px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Email Verified Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Your email has been verified successfully. You can now login to your account.
        </p>
        <Link
          to="/auth"
          className="inline-block bg-yellow-400 text-white px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
        >
          Login Now
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailSuccess;