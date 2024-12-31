import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import MemberPage from "./pages/MemberPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Role-Based Pages */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/member-page" element={<MemberPage />} />
      </Routes>
    </Router>
  );
};

export default App;
