import React from "react";

const Services = () => {
  const services = [
    {
      title: "Online Tutoring",
      description:
        "One-on-one personalized tutoring sessions with expert teachers",
      icon: "📚",
    },
    {
      title: "Study Materials",
      description:
        "Comprehensive study materials and resources for all subjects",
      icon: "📝",
    },
    {
      title: "Practice Tests",
      description: "Regular practice tests and assessments to track progress",
      icon: "✍️",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
