import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import UserDropdown from './UserDropdown';
import { cloudinaryConfig } from '../config/cloudinary';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user } = useSelector((state) => state.auth);

  const getCloudinaryImageUrl = (publicId) => {
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${publicId}`;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleDashboardClick = () => {
    if (isAdmin) {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Services", path: "/services" },
    {title: "Counselling", path: "/counselling-process"}
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-yellow-300/95 backdrop-blur-sm shadow-md"
            : "py-4 bg-yellow-300"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              {/* <span className="text-xl font-bold text-yellow-500">CT</span> */}
              <img src={getCloudinaryImageUrl("docs/models")} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-black font-medium relative group ${
                    location.pathname === link.path ? "font-bold" : ""
                  }`}
                >
                  {link.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Auth Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              {/* {!isAuthenticated ? (
                <Link
                  to="/auth"
                  className="
                    bg-pink-400 text-white font-bold 
                    py-2 px-6 rounded-full 
                    transform transition-all 
                    hover:scale-105 hover:shadow-lg
                    active:scale-95
                  "
                >
                  Login
                </Link>
              ) : (
                <UserDropdown user={user} />
              )} */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 h-screen w-[250px] bg-yellow-300 z-40 pt-20 px-4 shadow-2xl md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <motion.div key={link.path} variants={itemVariants}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-4 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? "bg-yellow-400 font-bold"
                        : "hover:bg-yellow-400"
                    }`}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              {isAuthenticated && (
                <motion.div variants={itemVariants}>
                  <UserDropdown user={user} />
                </motion.div>
              )}
              <motion.div
                variants={itemVariants}
                className="pt-4 border-t border-yellow-400"
              >
                <p className="text-sm text-gray-700 px-4">Need help?</p>
                <Link
                  to="/auth"
                  className="block mt-2 py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  📞 Contact Support
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
