import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const founders = [
  {
    name: "John Doe",
    designation: "Founder",
    image: "src/assets/userImage.png",
  },
  {
    name: "Jane Smith",
    designation: "Co-founder",
    image: "src/assets/userImage.png",
  },
];

const About = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleJoinWhatsApp = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setMessage("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    try {
      // Replace this with your actual API endpoint
      const response = await fetch("/api/join-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        setMessage("Successfully joined the WhatsApp group!");
        setPhoneNumber("");
      } else {
        setMessage("Failed to join the group. Please try again.");
      }
    } catch (err) {
      console.error("Error joining WhatsApp group:", err);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Founders Section */}
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Our Founders
        </h2>
        <div className="max-w-3xl justify-around mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="bg-white p-4 justify-center items-center rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={founder.image}
                alt={founder.name}
                className="w-64 h-64 ml-6 object-cover rounded-full p-4"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {founder.name}
                </h3>
                <p className="text-gray-600">{founder.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Group Join Section */}
      <div className="max-w-4xl mx-auto mt-16 bg-yellow-200 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">
            Join Our WhatsApp Community
          </h3>
          <form
            onSubmit={handleJoinWhatsApp}
            className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
          >
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
                <FaWhatsapp className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto whitespace-nowrap px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Joining..." : "Join Group"}
            </button>
          </form>
        </div>
        {message && (
          <p
            className={`text-sm mt-2 text-center ${
              message.includes("Successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default About;
