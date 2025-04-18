import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cloudinaryConfig } from '../config/cloudinary';

const founders = [
  {
    name: "Rakesh Ranjan",
    designation: "Founder",
    image: "docs/models-2", 
    message: "Our mission is to revolutionize the way people learn and connect through technology.",
  },
  {
    name: "Sanskriti Kashyap",
    designation: "Co-Founder",
    image: "docs/models-3",
    message: "We're committed to creating an inclusive platform that empowers everyone to achieve their goals.",
  },
];

const teamMembers = [
  {
    name: "Ayush",
    designation: "Content Manager",
    image: "src/assets/userImage.png",
    message: "Passionate about creating innovative solutions.",
  },
  {
    name: "Arjun",
    designation: "Marketing Head",
    image: "src/assets/userImage.png",
    message: "Creating beautiful and intuitive user experiences.",
  }
];

const Founders = () => {
  const [activeFounder, setActiveFounder] = useState(null);
  const [showMobileMessage, setShowMobileMessage] = useState(null);
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  const [showMobileTeamMessage, setShowMobileTeamMessage] = useState(null);

  const getCloudinaryImageUrl = (publicId) => {
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${publicId}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Founders Section */}
      <h2 className="text-3xl pt-16 font-bold text-center text-gray-900 mb-16 italic underline underline-offset-8">
        Meet Founders
      </h2>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-4">
        {founders.map((founder, index) => (
          <div key={founder.name} className="relative flex flex-col items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setActiveFounder(index)}
              onHoverEnd={() => setActiveFounder(null)}
            >
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500">
                  <img
                    src={getCloudinaryImageUrl(founder.image)}
                    alt={founder.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                {/* Desktop Hover Message */}
                <div
                  className={`absolute inset-0 bg-black/70 rounded-full flex items-center justify-center p-6 transition-opacity duration-300 
                    ${activeFounder === index ? 'opacity-100' : 'opacity-0'} 
                    hidden md:flex`}
                >
                  <p className="text-white text-center text-lg font-light">
                    "{founder.message}"
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{founder.name}</h1>
                <h3 className="text-xl font-semibold text-purple-600">
                  {founder.designation}
                </h3>
                
                {/* Mobile Message Button */}
                <button
                  className="md:hidden mt-4 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-full 
                    transition-colors duration-300 text-sm font-medium"
                  onClick={() => setShowMobileMessage(showMobileMessage === index ? null : index)}
                >
                  {showMobileMessage === index ? 'Hide Message' : 'View Message'}
                </button>
                
                {/* Mobile Message */}
                {showMobileMessage === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden mt-4 p-4 bg-purple-50 rounded-lg"
                  >
                    <p className="text-gray-700">"{founder.message}"</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <h2 className="text-3xl pt-16 font-bold text-center text-gray-900 mb-16 italic underline underline-offset-8">
        Our Team
      </h2>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-4">
        {teamMembers.map((member, index) => (
          <div key={member.name} className="relative flex flex-col items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setActiveTeamMember(index)}
              onHoverEnd={() => setActiveTeamMember(null)}
            >
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-pink-500">
                  <img
                    src={getCloudinaryImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                {/* Desktop Hover Message */}
                <div
                  className={`absolute inset-0 bg-black/70 rounded-full flex items-center justify-center p-6 transition-opacity duration-300 
                    ${activeTeamMember === index ? 'opacity-100' : 'opacity-0'} 
                    hidden md:flex`}
                >
                  <p className="text-white text-center text-lg font-light">
                    "{member.message}"
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h1>
                <h3 className="text-xl font-semibold text-pink-600">
                  {member.designation}
                </h3>
                
                {/* Mobile Message Button */}
                <button
                  className="md:hidden mt-4 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-full 
                    transition-colors duration-300 text-sm font-medium"
                  onClick={() => setShowMobileTeamMessage(showMobileTeamMessage === index ? null : index)}
                >
                  {showMobileTeamMessage === index ? 'Hide Message' : 'View Message'}
                </button>
                
                {/* Mobile Message */}
                {showMobileTeamMessage === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden mt-4 p-4 bg-pink-50 rounded-lg"
                  >
                    <p className="text-gray-700">"{member.message}"</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Founders; 