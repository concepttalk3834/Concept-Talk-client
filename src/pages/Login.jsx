import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ isLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    // Here you would typically handle authentication
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Yellow Background with Text */}
      <div className="hidden md:flex md:w-1/3 bg-yellow-300 items-center justify-center rounded-r-3xl text-center p-8">
        <div>
          <p className="text-2xl font-bold">
            Run Video related to
            <br />
            counselling
            <br />
            or
            <br />
            interaction video with
            <br />
            student
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Welcome Back !!!
          </h1>

          {/* Profile Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-black rounded-full w-24 h-24 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">CT</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-full"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-full"
                required
              />
              <div className="text-right mt-2">
                <a href="#" className="text-black">
                  Forget Password ?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-pink-400 text-white rounded-full font-medium hover:bg-pink-500 transition"
            >
              Login
            </button>

            <div className="text-center mt-2">
              <Link
                to="/auth"
                className="text-black"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                }}
              >
                Don't have an Account?
              </Link>
              <div className="border-t border-gray-300 my-6"></div>
            </div>

            <button
              type="button"
              className="w-full p-4 bg-pink-400 text-white rounded-full font-medium hover:bg-pink-500 transition"
            >
              Sign In with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
