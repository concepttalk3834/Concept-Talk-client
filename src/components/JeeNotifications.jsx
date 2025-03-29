import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBell, HiSearch, HiFilter } from 'react-icons/hi';

const JeeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData = [
          {
            id: 1,
            title: "JEE Main 2024 Registration Open",
            source: "NTA",
            date: "2024-01-15",
            category: "registration",
            description: "Registration for JEE Main 2024 has started. Last date to apply is February 15, 2024.",
            link: "https://jeemain.nta.nic.in"
          },
          {
            id: 2,
            title: "JEE Advanced 2024 Exam Pattern Changed",
            source: "IIT",
            date: "2024-01-10",
            category: "exam_pattern",
            description: "IIT has announced changes in JEE Advanced 2024 exam pattern. Check the official website for details.",
            link: "https://jeeadv.ac.in"
          },
          {
            id: 3,
            title: "Important Dates for JEE Main 2024",
            source: "NTA",
            date: "2024-01-05",
            category: "dates",
            description: "NTA has released the complete schedule for JEE Main 2024 examinations.",
            link: "https://jeemain.nta.nic.in"
          }
        ];
        
        setNotifications(mockData);
        setFilteredNotifications(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const filters = [
    { id: 'all', label: 'All Updates' },
    { id: 'registration', label: 'Registration' },
    { id: 'exam_pattern', label: 'Exam Pattern' },
    { id: 'dates', label: 'Important Dates' },
    { id: 'results', label: 'Results' }
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = notifications.filter(notification =>
      notification.title.toLowerCase().includes(query) ||
      notification.description.toLowerCase().includes(query)
    );
    setFilteredNotifications(filtered);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'all') {
      setFilteredNotifications(notifications);
    } else {
      const filtered = notifications.filter(notification => notification.category === filter);
      setFilteredNotifications(filtered);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-300 to-white py-4 md:py-8">
      <div className="container px-3 md:px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-pink-300 p-4 md:p-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <HiBell className="text-2xl md:text-3xl text-white" />
              <h2 className="text-xl md:text-2xl font-bold text-white">JEE Notifications</h2>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="p-3 md:p-4 border-b">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="relative w-full">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm md:text-base"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilter(filter.id)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${
                      selectedFilter === filter.id
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y max-h-[400px] md:max-h-[600px] overflow-y-auto">
            <AnimatePresence>
              {loading ? (
                <div className="p-6 md:p-8 text-center">
                  <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-purple-600 mx-auto"></div>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-6 md:p-8 text-center text-gray-500 text-sm md:text-base">
                  No notifications found
                </div>
              ) : (
                filteredNotifications.map(notification => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-3 md:p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="mt-1 text-sm md:text-base text-gray-600">
                          {notification.description}
                        </p>
                        <div className="mt-2 flex items-center space-x-2 md:space-x-4 text-xs md:text-sm text-gray-500">
                          <span>{notification.source}</span>
                          <span>•</span>
                          <span>{new Date(notification.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <a
                        href={notification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-yellow-300 font-medium text-sm md:text-base whitespace-nowrap inline-block md:ml-4"
                      >
                        Read More
                      </a>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JeeNotifications; 