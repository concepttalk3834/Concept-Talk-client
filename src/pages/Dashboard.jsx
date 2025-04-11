import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  // Redirect based on user role
  if (isAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  } else {
    return <Navigate to="/user-dashboard" replace />;
  }
};

export default Dashboard;
