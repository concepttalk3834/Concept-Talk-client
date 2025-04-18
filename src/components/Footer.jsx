import React from "react";
import { FaYoutube, FaTelegram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cloudinaryConfig } from '../config/cloudinary';

const Footer = () => {
  const getCloudinaryImageUrl = (publicId) => {
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${publicId}`;
  };
  
  return (
    <footer className="bg-gray-900 text-white h-[550px] md:h-[350px] flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* First Column - Logo and Tagline */}
          <div className="mb-6 md:mb-0 md:pr-16 flex flex-col justify-center items-center pt-12">
            <div className="text-3xl font-bold bg-yellow-400 text-gray-900 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              {/* CT */}
              <img src={getCloudinaryImageUrl("docs/models")} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <p className="text-xl">Let's Learn with Fun</p>
          </div>

          {/* First Divider */}
          <div className="hidden md:block w-[1px] h-48 bg-gradient-to-b from-transparent via-yellow-400 to-transparent mx-8"></div>

          {/* Second Column - Links */}
          <div className="flex flex-col space-y-3 mb-6 md:mb-0 md:px-8 items-center">
            <Link
              to="/about"
              className="hover:text-yellow-400 transition-colors underline decoration-yellow-400"
            >
              About
            </Link>
            <Link
              to="/terms"
              className="hover:text-yellow-400 transition-colors underline decoration-yellow-400"
            >
              terms of services
            </Link>
            <Link
              to="/privacy"
              className="hover:text-yellow-400 transition-colors underline decoration-yellow-400"
            >
              privacy policy
            </Link>
            <Link
              to="/contact"
              className="hover:text-yellow-400 transition-colors underline decoration-yellow-400"
            >
              contact us
            </Link>
          </div>

          {/* Second Divider */}
          <div className="hidden md:block w-[1px] h-48 bg-gradient-to-b from-transparent via-yellow-400 to-transparent mx-8"></div>

          {/* Third Column - Social Media Icons */}
          <div className="flex flex-col md:pl-16">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Join our Family</h2>
            <div className="flex space-x-8">
              <a
                href="https://youtube.com/@concepttalk834?si=3YB63sLSfXNfPoTP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href="https://t.me/concepttalk19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <FaTelegram />
              </a>
              <a
                href="https://x.com/Rakeshnita"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
