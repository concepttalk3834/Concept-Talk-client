import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import About from "./pages/About";
import Services from "./pages/Services";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VerifyEmailSuccess from "./pages/VerifyEmailSuccess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { useSelector } from "react-redux";

// Protected Route component
const ProtectedRoute = ({ children, isAdmin }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/verify-email-success" element={<VerifyEmailSuccess />} />

        {/* Dashboard Routes */}

        {/* Routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
