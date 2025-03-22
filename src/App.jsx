import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth";
import About from "./pages/About";
import Services from "./pages/Services";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        {/* Routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
