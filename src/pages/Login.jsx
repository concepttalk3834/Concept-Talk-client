import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/slices/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

// Dummy user data for testing
const DUMMY_USERS = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    phone: "1234567890",
  },
  {
    email: "user@example.com",
    password: "user123",
    role: "user",
    name: "Regular User",
    phone: "9876543210",
    rank: "1000",
    percentile: "95",
  },
];

const Login = ({ isLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      // Try API call first
      try {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
          formData
        );
      } catch (error) {
        console.log("API call failed, using dummy data");
        // Find matching dummy user
        const dummyUser = DUMMY_USERS.find(
          (user) =>
            user.email === formData.email && user.password === formData.password
        );

        if (dummyUser) {
          // Create dummy response
          response = {
            data: {
              token: "dummy-jwt-token",
              user: {
                ...dummyUser,
                id: "dummy-id",
              },
            },
          };
        } else {
          throw new Error("Invalid credentials");
        }
      }

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Dispatch the user data to Redux store
      dispatch(
        setUser({
          ...response.data.user,
          role: response.data.user.role || "user", // Default to user role if not specified
        })
      );

      // Show success message
      toast.success("Login successful!");

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(error.message || "Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Left Section - Yellow Background with Text */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-yellow-400 to-yellow-500 items-center justify-center rounded-r-3xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center p-8"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Welcome Back!</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Your journey to success starts here.
            <br />
            Let's make your dreams come true.
          </p>
          <div className="mt-8">
            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-yellow-500">CT</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Section - Login Form */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full md:w-1/2 p-6 md:p-8 flex flex-col items-center justify-center"
      >
        <div className="w-full max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            Sign In
          </motion.h1>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                required
              />
            </div>

            <div className="space-y-2">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                required
              />
              <div className="text-right">
                <a
                  href="#"
                  className="text-yellow-500 hover:text-yellow-600 transition"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full p-4 bg-yellow-400 text-white rounded-full font-medium hover:bg-yellow-500 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>

            <div className="text-center space-y-4">
              <Link
                to="/auth"
                className="text-gray-600 hover:text-yellow-500 transition"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                }}
              >
                Don't have an Account? Sign Up
              </Link>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full p-4 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-red-500" />
              Sign In with Google
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
