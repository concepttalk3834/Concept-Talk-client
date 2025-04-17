import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signUp, googleAuth } from "../Redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  rank: yup
    .number()
    .typeError("Rank must be a number")
    .positive("Rank must be a positive number")
    .nullable(),
  percentile: yup
    .number()
    .typeError("Percentile must be a number")
    .min(0, "Percentile must be between 0 and 100")
    .max(100, "Percentile must be between 0 and 100")
    .nullable(),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(["General", "OBC", "SC", "ST", "EWS"], "Invalid category"),
});

const SignUp = ({ isLogin, setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phone,
        userRank: data.rank,
        percentile: data.percentile,
        category: data.category
      })).unwrap();
      reset();
      navigate("/auth");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await dispatch(googleAuth()).unwrap();
      // The user will be redirected to Google OAuth page
      // After successful authentication, they will be redirected back to your app
    } catch (error) {
      toast.error(error.message || 'Failed to initiate Google sign up');
    }
  };

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
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                  {...register("phone")}
                  className={`flex-1 p-4 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-r-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="w-1/2 space-y-2">
                <input
                  type="text"
                  placeholder="JEE Rank"
                  {...register("rank")}
                  className={`w-full p-4 border ${
                    errors.rank ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
                />
                {errors.rank && (
                  <p className="text-red-500 text-sm mt-1">{errors.rank.message}</p>
                )}
              </div>
              <div className="w-1/2 space-y-2">
                <input
                  type="text"
                  placeholder="Percentile"
                  {...register("percentile")}
                  className={`w-full p-4 border ${
                    errors.percentile ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition`}
                />
                {errors.percentile && (
                  <p className="text-red-500 text-sm mt-1">{errors.percentile.message}</p>
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
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div className="text-center space-y-4">
              <Link
                to="/auth"
                className="text-gray-600 hover:text-yellow-500 transition"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                }}
              >
                Already have an Account? Sign In
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
              type="submit"
              disabled={loading}
              className={`w-full p-4 bg-yellow-400 text-white rounded-full font-medium hover:bg-yellow-500 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="w-full p-4 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaGoogle className="text-red-500" />
                {loading ? 'Signing up...' : 'Sign Up with Google'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Section - Yellow Background with Text */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-yellow-300 to-amber-300 items-center justify-center rounded-l-3xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center p-8"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Community!
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Start your journey with us.
            <br />
            Together, we'll achieve your goals.
          </p>
          <div className="mt-8">
            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-yellow-500">CT</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
