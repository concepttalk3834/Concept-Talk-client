import React from "react";
import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 m-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Column - Logo */}
          <div className="flex items-center">
            <div className="text-3xl font-bold bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center">
              CT
            </div>
          </div>

          {/* Second Column - Links */}
          <div className="space-y-4">
            <Link
              to="/about"
              className="block hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link
              to="/terms"
              className="block hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="block hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="block hover:text-gray-300 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Third Column - Social Media Icons */}
          <div className="flex space-x-6 items-start">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-pink-500 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-400 transition-colors"
            >
              <FaTelegram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-500 transition-colors"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
