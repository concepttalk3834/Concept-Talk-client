import React, { useState } from "react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import Founders from "../components/Founders";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
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
