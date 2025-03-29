import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Founders from "../components/Founders";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Founders Section */}
      <Founders />

      {/* WhatsApp Group Join Section */}
      <div className="w-full mt-24 bg-yellow-200 p-6 shadow-lg ">
        <div className="flex items-center justify-center gap-6 md:gap-12">
          <FaWhatsapp className="h-16 w-16 text-green-600 rounded-lg" />
          <h3 className="text-xl md:text-4xl font-bold text-gray-900 whitespace-nowrap">
          <a
            href="https://chat.whatsapp.com/your-group-invite-link"
            target="_blank"
            rel="noopener noreferrer" 
            className="font-medium text-green-400 underline hover:text-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Join
          </a> Our WhatsApp Community
          </h3>
          
        </div>
      </div>
    </div>
  );
};

export default About;
