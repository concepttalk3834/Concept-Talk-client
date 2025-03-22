import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" text-white m-0" style={{ background: "#ffe371" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold bg-black text-gray-50 w-10 h-10 rounded-full flex items-center justify-center">
              CT
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8 font-bold ">
            <Link
              to="/"
              className="text-black hover:text-gray-800 transition-colors border-b-2 border-black"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-gray-800 transition-colors border-b-2 border-black"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-black hover:text-gray-800 transition-colors border-b-2 border-black"
            >
              Services
            </Link>
          </div>

          {/* Auth Button */}
          <Link
            to="/auth"
            className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
