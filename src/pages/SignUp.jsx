import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = ({ isLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rank: "",
    percentile: "",
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
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full md:w-2/3 p-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Create an Account
        </h1>

        <div className="mb-6 bg-black rounded-full w-24 h-24 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">CT</span>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-full"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-full"
              required
            />
          </div>

          <div className="flex">
            <div className="bg-pink-400 text-white p-3 rounded-l-full flex items-center justify-center min-w-16">
              +91
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone No."
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 p-3 border border-gray-300 rounded-r-full"
              required
            />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="rank"
              placeholder="Rank"
              value={formData.rank}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-full"
            />
            <input
              type="text"
              name="percentile"
              placeholder="Percentile"
              value={formData.percentile}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-full"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-full"
              required
            />
          </div>
          <div className="text-center mt-4">
            <Link
              to="/auth"
              className="text-black underline"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(!isLogin);
              }}
            >
              Have an Account?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-pink-400 text-white rounded-full font-medium hover:bg-pink-500 transition"
          >
            Create Account
          </button>

          <div className="border-t border-gray-300 my-4 pt-4">
            <button
              type="button"
              className="w-full p-3 bg-pink-400 text-white rounded-full font-medium hover:bg-pink-500 transition"
            >
              Sign Up with Google
            </button>
          </div>
        </form>
      </div>

      <div className="hidden md:flex md:w-1/3 bg-yellow-300 items-center rounded-l-3xl justify-center p-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold">WELCOME TO</h2>
          <h1 className="text-7xl font-black mt-4">CONCEPT TALK</h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
