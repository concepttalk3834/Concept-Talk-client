import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const CounterAnimation = ({ end, duration = 2 }) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef(null);
  const inView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    if (inView) {
      window.requestAnimationFrame(step);
    }
  }, [end, duration, inView]);

  return <span ref={countRef}>{count}</span>;
};

const statsData = [
  {
    count: 2500,
    label: "Views",
    description: "Monthly Active Users"
  },
  {
    count: 1200,
    label: "Students Connected",
    description: "Success Stories"
  },
  {
    count: 800,
    label: "Last Year",
    description: "Growing Community"
  }
];

const StatsCounter = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Auto scroll effect for mobile
  useEffect(() => {
    if (!scrollRef.current || window.innerWidth >= 768) return; // Only run on mobile

    const scrollContainer = scrollRef.current;
    let autoScrollInterval;
    let touchStartX = 0;
    let isTouching = false;

    const startAutoScroll = () => {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(() => {
        if (!isTouching) {
          setCurrentIndex((prev) => {
            const next = (prev + 1) % statsData.length;
            const cardWidth = scrollContainer.offsetWidth * 0.85; // 80vw + margins
            scrollContainer.scrollTo({
              left: next * cardWidth,
              behavior: 'smooth'
            });
            return next;
          });
        }
      }, 3000);
    };

    const handleTouchStart = (e) => {
      isTouching = true;
      touchStartX = e.touches[0].clientX;
      if (autoScrollInterval) clearInterval(autoScrollInterval);
    };

    const handleTouchEnd = () => {
      isTouching = false;
      startAutoScroll();
    };

    const handleScroll = () => {
      if (!isTouching) {
        const cardWidth = scrollContainer.offsetWidth * 0.85;
        const newIndex = Math.round(scrollContainer.scrollLeft / cardWidth);
        setCurrentIndex(newIndex);
      }
    };

    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    scrollContainer.addEventListener('scroll', handleScroll);
    startAutoScroll();

    return () => {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full py-16 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent"></div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative max-w-6xl mx-auto px-4"
      >
        {/* Mobile Scroll Indicators */}
        <div className="md:hidden w-full flex justify-center gap-3 mb-6">
          {statsData.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-600' 
                  : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Stats Container */}
        <div 
          ref={scrollRef}
          className="
            flex md:grid md:grid-cols-3 md:gap-16
            overflow-x-auto md:overflow-x-visible
            snap-x md:snap-none
            -mx-4 px-4 md:mx-0 md:px-0
            pb-4 md:pb-0
            scrollbar-hide
            relative
          "
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="
                flex-shrink-0 w-[85vw] md:w-auto
                snap-center
                text-center group
                first:pl-4 last:pr-4 md:first:pl-0 md:last:pr-0
                mx-2 md:mx-0
              "
            >
              <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-0 md:bg-transparent">
                {/* Animated Number */}
                <h3 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative z-10">
                  <CounterAnimation end={stat.count} />
                  <span className="text-3xl">+</span>
                </h3>

                {/* Label */}
                <p className="text-xl font-semibold text-gray-800 mb-1 relative z-10">{stat.label}</p>
                <p className="text-sm text-gray-500 relative z-10">{stat.description}</p>

                {/* Animated Underline - Only show on desktop */}
                <div className="hidden md:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ease-out"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements - Only show on desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent transform -translate-y-1/2 -z-10"></div>
      </motion.div>
    </div>
  );
};

export default StatsCounter; 