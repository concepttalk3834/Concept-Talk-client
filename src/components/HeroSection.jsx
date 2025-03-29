import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link} from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { scrollY } = useScroll();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const heroRef = useRef(null);

  useEffect(() => {
    if (inView) {
      gsap.from('.hero-title', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
      });

      gsap.from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power4.out',
      });

      gsap.from('.hero-buttons', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power4.out',
      });
    }
  }, [inView]);

  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-yellow-50"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Logo Section */}
          <motion.div 
            ref={ref}
            className="flex flex-col items-center lg:items-start"
            style={{ y, opacity }}
          >
            <div className="relative">
              <div className="flex items-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  CONCEPT TALK
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="text-center lg:text-left"
            style={{ y, opacity }}
          >
            <div className="space-y-6 flex flex-col justify-center items-center">
              <div className="relative">
                <h2 className="hero-subtitle text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Get the Best College with{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">Expert</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-300 -z-10 transform -rotate-1"></span>
                  </span>
                  {' '}Counselling!
                </h2>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-200 rounded-full blur-2xl opacity-20"></div>
              </div>
              
              <p className="text-xl text-gray-600 font-medium">
                LET'S LEARN WITH FUN
              </p>
              
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-md"
                >
                  <Link to="/auth">JOIN US</Link>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-2">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mx-auto animate-scroll" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection; 