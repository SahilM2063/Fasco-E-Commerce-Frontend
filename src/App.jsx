/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Users/HomePage.jsx";
import Login from "./components/Users/Forms/Login.jsx";
import AdminDashBoard from "./components/Admin/AdminDashBoard.jsx";
import CustomerProfile from "./components/Users/CustomerProfile.jsx";
import Navbar from "./components/Users/Navbar.jsx";
import AuthRoutes from "./routing/AuthRoutes.jsx";

function App() {
  return (
    <div className="w-full min-h-[100vh]">
      {/* Homepage/Hero component */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
        <Route path="/CustomerProfile" element={<CustomerProfile />} />
      </Routes>
    </div>
  );
}

export default App;
