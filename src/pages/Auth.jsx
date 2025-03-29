import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-white">
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
