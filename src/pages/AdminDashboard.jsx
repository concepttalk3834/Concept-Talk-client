import React from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-medium">{user?.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Role</p>
              <p className="font-medium">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Admin Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">User Management</h2>
            <p className="text-gray-600">
              Manage user accounts and permissions
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Analytics</h2>
            <p className="text-gray-600">View system statistics and reports</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p className="text-gray-600">Configure system settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
