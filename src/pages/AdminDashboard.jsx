import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getAllPayments, clearError } from '../Redux/slices/adminSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { 
    users, 
    payments, 
    loading, 
    paymentsLoading, 
    error, 
    paymentsError 
  } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('users');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (activeTab === 'users') {
      dispatch(getUsers());
    } else {
      dispatch(getAllPayments());
    }
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (paymentsError) {
      toast.error(paymentsError);
      dispatch(clearError());
    }
  }, [error, paymentsError, dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderUsersTable = () => (
    
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-20"
>
  <h2 className="text-xl sm:text-2xl font-bold mb-6">Users List</h2>

  {loading ? (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
    </div>
  ) : users?.length === 0 ? (
    <p className="text-gray-500 text-center py-8">No users found.</p>
  ) : (
    <div className="w-80 md:w-[700px] lg:w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs leading-normal">
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Rank</th>
            <th className="py-3 px-4 text-left">Percentile</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {users?.map((user) => (
            <tr
              key={user.id}
              className="border-b hover:bg-gray-50 transition-all duration-200"
            >
              <td className="py-3 px-4 break-words">{user.name}</td>
              <td className="py-3 px-4 break-words">{user.email}</td>
              <td className="py-3 px-4 break-words">{user.phoneNumber}</td>
              <td className="py-3 px-4 break-words">{user.category}</td>
              <td className="py-3 px-4">{user.userrank}</td>
              <td className="py-3 px-4">{user.percentile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</motion.div>

  );

  const renderPaymentsTable = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4 sm:p-6"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-6">All Payments</h2>
      {paymentsLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : payments?.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No payments found.</p>
      ) : (
        <div className="w-80 lg:w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">User Email</th>
                <th className="py-2 px-4 border-b text-left">Payment ID</th>
                <th className="py-2 px-4 border-b text-left">Order ID</th>
                <th className="py-2 px-4 border-b text-left">Amount</th>
                <th className="py-2 px-4 border-b text-center">Status</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments
                ?.filter(payment => payment.status !== 'created')
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((payment) => (
                <tr key={payment.order_id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{payment.user.email}</td>
                  <td className="py-2 px-4 border-b">{payment.paymentId}</td>
                  <td className="py-2 px-4 border-b">{payment.transactionId}</td>
                  <td className="py-2 px-4 border-b">₹{payment.amount/100}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      payment.status === 'success' 
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'failure'
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {dayjs(payment.timestamp).format('DD-MM-YYYY')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 mt-20">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-20`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('users');
                      if (window.innerWidth < 1024) setIsSidebarOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-left transition duration-300 flex items-center ${
                      activeTab === 'users'
                        ? 'bg-pink-400 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Users
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('payments');
                      if (window.innerWidth < 1024) setIsSidebarOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-left transition duration-300 flex items-center ${
                      activeTab === 'payments'
                        ? 'bg-pink-400 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Payments
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-2 py-8 lg:p-8">
          {activeTab === 'users' ? renderUsersTable() : renderPaymentsTable()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 