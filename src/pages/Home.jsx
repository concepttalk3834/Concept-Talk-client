import React, { useState, useEffect } from "react";
import InfiniteScroll from "../components/InfiniteScroll";

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock fetch functions - replace these with your actual API calls
  const items = [
    { content: "Text Item 1" },
    { content: <p>Paragraph Item 2</p> },
    { content: "Text Item 3" },
    { content: <p>Paragraph Item 4</p> },
    { content: "Text Item 5" },
    { content: <p>Paragraph Item 6</p> },
    { content: "Text Item 7" },
    { content: <p>Paragraph Item 8</p> },
    { content: "Text Item 9" },
    { content: <p>Paragraph Item 10</p> },
    { content: "Text Item 11" },
    { content: <p>Paragraph Item 12</p> },
    { content: "Text Item 13" },
    { content: <p>Paragraph Item 14</p> },
  ];

  const fetchServices = async () => {
    try {
      // Simulate API call with setTimeout
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
      // Simulate API call with setTimeout
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

  // Load data on component mount
  useEffect(() => {
    fetchServices();
    fetchTestimonials();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-full mx-auto bg-white">
      {/* First Section - Concept Talk */}
      <section className="min-h-[100vh] flex flex-col">
        <div
          className="text-center flex flex-col md:flex-row max-w-full justify-around items-center pt-16 md:pt-32 px-4 md:px-0 h-[80vh]"
          style={{ background: "#ffd9f1" }}
        >
          <div className="max-w-2xl mx-auto p-8 md:p-28">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CONCEPT TALK
            </h1>
          </div>
          <div className="max-w-3xl mx-auto py-8 md:py-20 px-4 md:px-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Get the Best College with Expert Counseling!
            </h2>
            <p className="text-sm mb-4">LET'S LEARN WITH FUN</p>
            <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 px-6 rounded-full">
              JOIN US
            </button>
          </div>
        </div>
        <div className="w-full text-center text-sm text-gray-800 py-4">
          <p>
            VIEWS | Students Connected with US | LAST YEAR CONNECTED STUDENTS
          </p>
          <hr className="w-10/12 border-t-2 border-gray-400 mt-4 px-4 mx-auto" />
        </div>
      </section>

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

        <div className="w-full md:w-screen h-auto md:h-[60vh] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-gradient-to-b from-yellow-200 to-pink-200 p-4 md:p-8">
          <div className="w-full md:w-3/4 rounded-lg p-4 md:p-6 h-full flex items-center justify-center mx-auto">
            {loading ? (
              <p>Loading services...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="h-full flex flex-col justify-center w-full">
                <div className="space-y-4 flex flex-col justify-center items-center">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col justify-center items-center p-4 bg-white/90 rounded-lg shadow-md w-full md:w-5/6 transition-transform hover:scale-105"
                    >
                      <h3 className="font-bold text-lg md:text-xl text-center mb-2">
                        "{service.title}"
                      </h3>
                      <p className="text-sm md:text-base text-center text-gray-700">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-96 h-32 md:h-full bg-pink-300 rounded-lg flex flex-col items-center justify-center mx-auto">
            {/* <InfiniteScroll
              items={items}
              isTilted={false}
              tiltDirection="left"
              autoplay={true}
              autoplaySpeed={0.1}
              autoplayDirection="down"
              pauseOnHover={true}
            /> */}
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg mt-8 text-center w-full max-w-4xl mx-auto">
          <p className="text-lg font-bold md:text-lg">
            We guide <span className="text-yellow-400 font-bold">JEE</span>{" "}
            students to select their{" "}
            <span className="text-yellow-400 font-bold">dream college</span>{" "}
            based on their{" "}
            <span className="text-pink-400 font-bold">
              scores and preferences
            </span>
            .
          </p>
        </div>
      </section>

      {/* Third Section - Testimonials */}
      <section className="min-h-screen bg-pink-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold mb-2 p-4 border-b-2 sm:text-3xl border-black w-fit mx-auto">
            Testimonials
          </h2>
          <p className="text-gray-400 text-2xl font-semibold">
            What Our Students Say
          </p>
        </div>

        {loading ? (
          <p className="text-center">Loading testimonials...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-pink-300 rounded-full p-6 flex items-center "
              >
                <div className="bg-green-200 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <div className="bg-white w-8 h-8 rounded-full"></div>
                </div>
                <div className="text-white">
                  <div className="font-bold">{testimonial.name}</div>
                  <div>{testimonial.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
