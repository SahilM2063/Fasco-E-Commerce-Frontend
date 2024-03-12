/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Users/HomePage.jsx";
import Login from "./components/Users/Forms/Login.jsx";
import AdminDashBoard from "./components/Admin/AdminDashBoard.jsx";
import CustomerProfile from "./components/Users/CustomerProfile.jsx";
import Navbar from "./components/Users/Navbar.jsx";
import AuthRoutes from "./routing/AuthRoutes.jsx";
import AdminRoutes from "./routing/AdminRoutes.jsx";
import Register from "./components/Users/Forms/Register.jsx";
import NotFound from "./components/NotFound.jsx";
import ResetPassEmail from "./components/Users/Forms/assets/ResetPassEmail.jsx";

function App() {
  return (
    <div className="w-full min-h-[100vh]">
      {/* Homepage/Hero component */}
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/resetPassEmail" element={<ResetPassEmail />} />
        </Route>
        <Route path="/CustomerProfile" element={<CustomerProfile />} />
        <Route element={<AdminRoutes />}>
          <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
