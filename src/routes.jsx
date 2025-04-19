import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage"; 
import Dashboard from "./pages/Dashboard"; 
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
