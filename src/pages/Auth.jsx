import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-10 group"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isLogin ? (
          <Login key="login" isLogin={isLogin} setIsLogin={setIsLogin} />
        ) : (
          <SignUp key="signup" isLogin={isLogin} setIsLogin={setIsLogin} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;
