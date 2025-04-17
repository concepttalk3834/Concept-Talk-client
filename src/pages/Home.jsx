import React, { useState, useEffect } from "react";
import FeatureCards from "../components/FeatureCards";
import TestimonialScroll from "../components/TestimonialScroll";
import StatsCounter from "../components/StatsCounter";
import HeroSection from "../components/HeroSection";
import JeeNotifications from '../components/JeeNotifications';

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setTimeout(() => {
        const mockServices = [
          {
            id: 1,
            title: "Personalized Counseling",
            description: "One-on-one guidance tailored to your needs",
          },
          {
            id: 2,
            title: "College Insights",
            description:
              "Deep data on admission trends and college requirements",
          },
          {
            id: 3,
            title: "Guaranteed Satisfaction",
            description: "We ensure you're happy with our services",
          },
        ];
        setServices(mockServices);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load services");
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    try {
      setTimeout(() => {
        const mockTestimonials = [
          {
            id: 1,
            name: "Priya S.",
            content: "Got into my dream IIT thanks to Concept Talk's guidance!",
          },
          {
            id: 2,
            name: "Rahul M.",
            content:
              "The counselors helped me choose the perfect branch for my interests.",
          },
          {
            id: 3,
            name: "Ananya K.",
            content:
              "Clear strategies and personalized attention made all the difference.",
          },
          {
            id: 4,
            name: "Vikram P.",
            content: "From confusion to clarity - thank you Concept Talk!",
          },
          {
            id: 5,
            name: "Deepak R.",
            content: "The mock tests and analysis helped me improve my weak areas significantly.",
          },
          {
            id: 6,
            name: "Shreya T.", 
            content: "Concept Talk's study strategies helped me crack JEE Advanced in my first attempt!",
          },
          {
            id: 7,
            name: "Arjun N.",
            content: "The mentors are highly experienced and provide excellent guidance. Highly recommended!",
          },
          {
            id: 8,
            name: "Neha G.",
            content: "From basics to advanced concepts, they helped me build a strong foundation.",
          }
        ];
        setTestimonials(mockTestimonials);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load testimonials");
      setLoading(false);
    }
  };

  // Handler for adding a new service
  const handleAddService = (newService) => {
    // Make an API call here
    setServices([
      ...services,
      {
        id: services.length + 1,
        ...newService,
      },
    ]);
  };
  // Handler for adding a new service
  const handleAddTestimonial = (newTestimonial) => {
    // Make an API call here
    setTestimonials([
      ...testimonials,
      {
        id: testimonials.length + 1,
        ...newTestimonial,
      },
    ]);
  };

  useEffect(() => {
    fetchServices();
    fetchTestimonials();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-full mx-auto bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsCounter />

      {/* <div>
        <JeeNotifications />
      </div> */}

      {/* Second Section - Why Choose Us */}
      <section className="min-h-screen flex flex-col px-2 md:px-4 items-center justify-between py-8">
        <div className="text-center mb-8 w-full">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Why <span className="text-yellow-400">Choose Us</span> ?
          </h2>
          <p className="text-gray-600 mb-8 text-xl md:text-3xl text-wrap w-full md:w-1/2 mx-auto px-4">
            Take a step to clear IIT JEE with flying colors today
          </p>
        </div>
        <FeatureCards />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <p className="text-center text-gray-700 text-lg md:text-xl lg:text-4xl font-bold leading-relaxed">
            We guide <span className="text-yellow-300">JEE</span> students to select their <span className="text-yellow-300">dream college</span> based on their <span className="text-pink-400">scores and preferences</span>.
          </p>
        </div>
      </section>

      {/* Third Section - Testimonials */}
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      ) : (
        <TestimonialScroll testimonials={testimonials} />
      )}
    </div>
  );
};

export default Home;
