import React from 'react';
import { Link } from 'react-router-dom';

const VerifyEmailSuccess = () => {
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