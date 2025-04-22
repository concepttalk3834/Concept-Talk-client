import React, { useState } from "react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import Founders from "../components/Founders";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-yellow-500">Concept Talk</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mb-8"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg font-semibold md:text-xl leading-relaxed mb-6">
            At Concept Talk, we don’t just give advice—we walk with you every step of the way. With a mission to empower students through accurate guidance, expert analysis, and constant support, we have helped over <span className="text-pink-500">25,000+ JEE aspirants in the last 3 years</span>  secure their dream colleges and branches in IITs, NITs, IIITs, and GFTIs. 
            </p>
            
            <p className="text-gray-600 text-lg font-semibold md:text-xl leading-relaxed mb-6">
            We blend data from the past <span className="text-pink-500">5–7 years of cutoffs</span> , paper difficulty trends, and personalized insights to make sure you never miss out on the opportunity you deserve. Whether it’s a late-night doubt or a last-minute college decision, we’re available <span className="text-pink-500">24/7</span> through calls and texts—because we know how crucial every second is during counseling.
            </p>
          </div>
        </div>
      </motion.div>
      {/* Founders Section */}
      <Founders />

      {/* WhatsApp Group Join Section */}
      <div className="w-full mt-24 bg-yellow-200 p-6 shadow-lg ">
        <div className="flex items-center justify-center gap-6 md:gap-6">
          <FaTelegram className="h-16 w-16 text-blue-600 rounded-lg" />
          <h3 className="text-xl md:text-4xl font-bold text-gray-900 whitespace-nowrap">
          <a
            href="https://t.me/concepttalk19"
            target="_blank"
            rel="noopener noreferrer" 
            className=" text-blue-400 underline hover:text-blue-700 transition-colors"
          >
            Join
          </a> Our Telegram Community
          </h3>
          
        </div>
      </div>
    </div>
  );
};

export default About;
