import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaHeadset, FaGraduationCap, FaHandshake,FaUserTie } from 'react-icons/fa';

const Process = () => {
  const steps = [
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Data Analysis",
      description: "We analyze the past 5-7 years of JEE cutoffs and trends.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "Personalized Counseling",
      description: "24/7 availability via calls and texts for all your queries.",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "Branch and College Selection",
      description: "Guiding you to the best college and branch based on your rank and preferences.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "Ongoing Support",
      description: "Continuous guidance during the entire counseling process, ensuring the best results.",
      color: "from-green-500 to-green-600",
    },
    {
        icon: <FaUserTie className="w-8 h-8" />,
        title: "One Student : One Mentor",
        description: "One dedicated mentor for every student, offering personalized guidance, strategy, and support throughout the entire JEE counseling journey.",
        color: "from-purple-500 to-purple-600",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center my-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Counseling Process
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive approach to guide you through your college selection journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-500 to-green-500 hidden lg:block">
          </div>

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative lg:flex lg:items-center lg:justify-between"
              >
                {/* Left side content (even index) */}
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`bg-pink-200 rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl ${
                      index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                    } relative`}
                  >
                    {/* Connecting line to timeline dot */}
                    <div className="hidden lg:block absolute top-1/2 w-32 h-1 bg-pink-500" style={{
                      right: index % 2 === 0 ? '-8rem' : 'auto',
                      left: index % 2 === 0 ? 'auto' : '-8rem'
                    }}></div>
                    
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-6`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-pink-500 z-10" />

                {/* Right side content (odd index) */}
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Process;