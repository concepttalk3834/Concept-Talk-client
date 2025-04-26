import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signUp, googleAuth, clearError } from "../Redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';
import { cloudinaryConfig } from '../config/cloudinary';

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
    .trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .trim(),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include: uppercase & lowercase letters, number, special character"
    ),
  rank: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .typeError("Please enter a valid JEE rank")
    .positive("Rank must be a positive number")
    .integer("Rank must be a whole number"),
  percentile: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .typeError("Please enter a valid percentile")
    .min(0, "Percentile must be between 0 and 100")
    .max(100, "Percentile must be between 0 and 100"),
  category: yup
    .string()
    .required("Please select your category")
    .oneOf(["General", "OBC", "SC", "ST", "EWS"], "Please select a valid category"),
});

const SignUp = ({ isLogin, setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Clear errors when component unmounts or when switching forms
  useEffect(() => {
    dispatch(clearError());
    return () => dispatch(clearError());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data) => {
    try {
      const userRank = data.rank ? parseInt(data.rank, 10) : null;
      const percentile = data.percentile ? parseFloat(data.percentile) : null;

      await dispatch(signUp({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
        phoneNumber: data.phone,
        userRank: userRank,
        percentile: percentile,
        category: data.category
      })).unwrap();
      
      toast.success("Account created successfully! Please verify your email.");
      reset();
      setIsLogin(true); // Switch to login form
    } catch (err) {
      toast.error(err.message || "Failed to create account. Please try again.");
    }
  };

  const getCloudinaryImageUrl = (publicId) => {
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${publicId}`;
  };

  const handleGoogleSignUp = async () => {
    // try {
    //   await dispatch(googleAuth()).unwrap();
    //   toast.info("Redirecting to Google Sign Up...");
    // } catch (error) {
    //   toast.error(error.message || 'Failed to initiate Google sign up');
    // }
    toast.info('Google sign-up is currently unavailable');
  };

  // Password requirements list
  const passwordRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /[a-z]/, text: "One lowercase letter" },
    { regex: /[0-9]/, text: "One number" },
    { regex: /[@$!%*?&]/, text: "One special character" },
  ];

  const password = watch("password");

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Left Section - Form */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full md:w-1/2 p-6 md:p-8 flex flex-col items-center justify-center"
      >
        <div className="w-full max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            Create Account
          </motion.h1>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className={`w-full p-4 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm ml-4">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`w-full p-4 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm ml-4">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex">
                <div className="bg-yellow-400 text-white p-4 rounded-l-full flex items-center justify-center min-w-16">
                  +91
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  maxLength="10"
                  {...register("phone")}
                  className={`flex-1 p-4 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-r-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm ml-4">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="w-1/2 space-y-2">
                <input
                  type="number"
                  placeholder="JEE Rank"
                  {...register("rank",{
                    setValueAs: value => value === "" ? null : parseInt(value, 10)
                  })}
                  className={`w-full p-4 border ${
                    errors.rank ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
                />
                {errors.rank && (
                  <p className="text-red-500 text-sm ml-4">{errors.rank.message}</p>
                )}
              </div>
              <div className="w-1/2 space-y-2">
                <input
                  type="number"
                  placeholder="Percentile"
                  step="0.01"
                  min="0"
                  max="100"
                  {...register("percentile", {
                    setValueAs: value => value === "" ? null : parseFloat(value)
                  })}
                  className={`w-full p-4 border ${
                    errors.percentile ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
                />
                {errors.percentile && (
                  <p className="text-red-500 text-sm ml-4">{errors.percentile.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`w-full p-4 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm ml-4">{errors.password.message}</p>
              )}
              {password && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
                  <ul className="space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <li
                        key={index}
                        className={`text-sm flex items-center ${
                          req.regex.test(password) ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        <span className="mr-2">
                          {req.regex.test(password) ? '✓' : '○'}
                        </span>
                        {req.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <select
                {...register("category")}
                className={`w-full p-4 border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="EWS">EWS</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm ml-4">{errors.category.message}</p>
              )}
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-700">Already have an Account?{' '}
                <Link
                  to="/auth"
                  className="text-pink-400 hover:text-pink-500 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(!isLogin);
                  }}
                >
                  Sign In
                </Link>
              </p>
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
              type="submit"
              disabled={loading || isSubmitting}
              className={`w-full p-4 bg-gradient-to-l from-yellow-400 to-pink-300 text-white rounded-full font-medium transition-colors ${
                (loading || isSubmitting) ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500"
              }`}
            >
              {(loading || isSubmitting) ? "Creating Account..." : "Create Account"}
            </motion.button>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoogleSignUp}
                disabled={true}
                className={`w-full p-4 bg-white border border-gray-300 cursor-not-allowed text-gray-700 rounded-full font-medium transition-colors flex items-center justify-center gap-2 ${
                  (loading || isSubmitting) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
              >
                <FaGoogle className="text-red-500" />
                <span>Sign Up with Google (Coming Soon)</span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Section - Pink Background with Text */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="hidden md:flex md:w-1/2 bg-pink-300 items-center justify-center rounded-l-3xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center p-8"
        >
          <h2 className="text-4xl font-bold text-black mb-6">
            Join Our Community!
          </h2>
          <p className="text-xl text-black/90 leading-relaxed">
            Start your journey with us.
            <br />
            Together, we'll achieve your goals.
          </p>
          <div className="mt-8">
            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <img src={getCloudinaryImageUrl("docs/models")} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
