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
            name: "Priya S.,NIT Trichy",
            content: "I was completely confused with the counseling rounds, but Concept Talk guided me like a big brother. I got into NIT Trichy, and I couldn't have done it without their support!",
          },
          {
            id: 2,
            name: "Rahul M.,IIT Kharagpur",
            content:
              "Their data-driven strategy helped me secure a top branch even though I wasn’t confident about my score. The 24/7 guidance was a lifesaver!",
          },
          {
            id: 3,
            name: "Ananya K.,IIEST Shibpur",
            content:
              "I never expected counseling to be so complicated. Thankfully, Concept Talk made it simple, personal, and effective.",
          },
          {
            id: 4,
            name: "Vikram P.,IIIT Hyderabad",
            content: "I had a decent rank but was really unsure about which IIIT would be best for my goals. Concept Talk helped me break down the options, and now I’m pursuing CS at IIIT Hyderabad—best decision ever!",
          },
          {
            id: 5,
            name: "Deepak R.,NIT Rourkela",
            content: "I was about to make a major mistake by locking in a lower branch at a higher-ranked college. Thanks to Concept Talk’s data-driven counseling, I landed in a much better-fit program at NIT Rourkela.",
          },
          {
            id: 6,
            name: "Shreya T.,IIT Indore", 
            content: "Being the first in my family to go through the JEE process, we were totally lost. Concept Talk made everything smooth and stress-free—from mock counseling to final choice locking. Grateful beyond words.",
          },
          {
            id: 7,
            name: "Arjun N.,NIT Calicut",
            content: "What I loved the most was how approachable and responsive the mentors were. I messaged them at 11 PM before a counseling deadline, and they helped me right away. That’s rare to find.",
          },
          {
            id: 8,
            name: "Neha G.,IIIT Gwalior",
            content: "I didn’t score high enough for IITs, and I was disappointed. But Concept Talk helped me realize that the right branch and placement matter more. I ended up in IIIT Gwalior and couldn’t be happier!",
          },
          {
            id: 9,
            name: "Rajeev T.,NIT Warangal",
            content: "The data analysis and mentorship were spot on. I got a branch I didn’t even know was possible for my rank!",
          },
          {
            id: 10,
            name: "Simran ,IIIT Delhi",
            content: "I tried figuring it out myself, but it was too confusing. Concept Talk made the process simple and stress-free.",
          },
          {
            id: 11,
            name: "Aditya ,NIT Calicut",
            content: "Concept Talk was like having an elder brother during counseling. Always available, super calm, and knew exactly what to do. Thank you!",
          },
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
            Why Choose <span className="text-yellow-400">Concept Talk</span> ?
          </h2>
          <p className="text-gray-600 mb-8 text-xl md:text-3xl text-wrap w-full md:w-1/2 mx-auto px-4">
          Your trusted partner in cracking JEE and securing the best seat, branch, and future.
          </p>
        </div>
        <FeatureCards />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <p className="text-center text-gray-700 text-lg md:text-xl lg:text-4xl font-bold leading-relaxed">
            We guide <span className="text-yellow-500">JEE</span> students to select their <span className="text-yellow-500">dream college</span> based on their <span className="text-pink-400">scores and preferences</span>.
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
