import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';

const TestimonialScroll = ({ testimonials }) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(testimonials[0]);
  const containerRef = useRef(null);
  const controls = useAnimation();

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  // console.log(selectedTestimonial);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (testimonials.findIndex(t => t.id === selectedTestimonial.id) + 1) % testimonials.length;
      setSelectedTestimonial(testimonials[nextIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedTestimonial, testimonials]);

  // Animation for the scrolling list
  const scrollAnimation = {
    y: [-1000, -2000],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 25,
        ease: "linear"
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            What Our Students Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Featured Testimonial */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTestimonial?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-xl relative z-10"
              >
                <FaQuoteLeft className="text-4xl text-purple-200 absolute top-4 left-4" />
                <div className="mt-8 mb-6">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    {selectedTestimonial?.content}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedTestimonial?.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{selectedTestimonial?.name}</h4>
                    <div className="flex gap-1 text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <FaQuoteRight className="text-4xl text-purple-200 absolute bottom-4 right-4" />
              </motion.div>
            </AnimatePresence>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl -z-10 opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl -z-20 opacity-20"></div>
          </div>

          {/* Scrolling Testimonials */}
          <div className="relative h-[600px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-50 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-purple-50 z-10"></div>
            <motion.div
              className="relative pt-8"
              animate={scrollAnimation}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className={`p-6 mb-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    selectedTestimonial?.id === testimonial?.id
                      ? 'bg-white shadow-lg scale-105'
                      : 'bg-white/80'
                  } rounded-xl mx-4`}
                  onClick={() => setSelectedTestimonial(testimonial)}
                  whileHover={{ y: -5 }}
                >
                  <p className="text-gray-600 mb-4">{testimonial?.content}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                      {testimonial?.name?.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800">{testimonial?.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialScroll; 