import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const featureData = [
  {
    id: 1,
    title: "Personalized Counseling",
    description: "Get one-on-one attention from expert mentors tailored to your needs and learning style. Our experienced counselors work closely with you to understand your goals.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    color: "#FFD700"
  },
  {
    id: 2,
    title: "Expert Faculty",
    description: "Learn from the best in the field with our team of experienced IIT alumni and subject matter experts who know exactly what it takes to succeed.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
    color: "#FF6B6B"
  },
  {
    id: 3,
    title: "Proven Track Record",
    description: "Join thousands of successful students who have achieved their dreams through our comprehensive JEE preparation program.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    color: "#4ECDC4"
  }
];

const FeatureCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featureData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[calc(100vh-12rem)] relative overflow-hidden bg-gradient-to-br from-yellow-50 to-pink-50 rounded-xl shadow-lg"
    >
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-0">
        {/* Cards Stack Section */}
        <div className="w-full md:w-1/2 h-[250px] md:h-full relative flex items-center justify-center mb-8 md:mb-0">
          <div className="relative w-full max-w-[250px] md:max-w-[300px] h-[250px] md:h-[400px]">
            {featureData.map((feature, index) => {
              const isActive = index === activeIndex;
              const zIndex = featureData.length - Math.abs(activeIndex - index);
              
              return (
                <motion.div
                  key={feature.id}
                  className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    zIndex,
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    y: isActive ? 0 : (index - activeIndex) * 30,
                    rotateY: isActive ? 0 : -15,
                    opacity: Math.max(1 - Math.abs(activeIndex - index) * 0.3, 0.3),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                >
                  <div 
                    className="w-full h-full relative group cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${feature.image})` }}
                    />
                    <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{feature.title}</h4>
                      <p className="text-xs md:text-sm opacity-90">Click to learn more</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg p-4 md:p-8 text-center md:text-left"
            >
              <motion.h3 
                className="text-2xl md:text-4xl font-bold mb-3 md:mb-6"
                style={{ color: featureData[activeIndex].color }}
              >
                {featureData[activeIndex].title}
              </motion.h3>
              <motion.p 
                className="text-base md:text-xl text-gray-600 leading-relaxed"
              >
                {featureData[activeIndex].description}
              </motion.p>
              <motion.div 
                className="mt-4 md:mt-8 flex gap-2 justify-center md:justify-start"
              >
                {featureData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-yellow-400 w-5 md:w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards; 