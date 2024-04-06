/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Users/HomePage.jsx";
import Login from "./components/Users/Forms/Login.jsx";
import AdminDashBoard from "./components/Admin/AdminDashBoard.jsx";
import Navbar from "./components/Users/Navbar.jsx";
import Register from "./components/Users/Forms/Register.jsx";
import NotFound from "./components/NotFound.jsx";
import AdminRoutes from "./routing/AdminRoutes.jsx";
import AuthRoutes from "./routing/AuthRoutes.jsx";
import ResetPassEmail from "./components/Users/Forms/ResetPassEmail.jsx";
import ResetPassword from "./components/Users/Forms/ResetPassword.jsx";
import Home from "./components/Admin/Home.jsx";
import Products from "./components/Admin/Products.jsx";
import Orders from "./components/Admin/Orders.jsx";
import Customers from "./components/Admin/Customers.jsx";
import Coupons from "./components/Admin/Coupons.jsx";
import Manage from "./components/Admin/Manage.jsx";
import Shop from "./components/Users/Shop.jsx";
import SingleProductDetail from "./components/Users/SingleProductDetail.jsx";
import Cart from "./components/Users/Cart.jsx";
import AboutUs from "./components/Users/AboutUs.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerDashboard from "./components/Users/CustomerDashboard.jsx";
import Profile from "./components/Users/Profile.jsx";
import OrderHistory from "./components/Users/OrderHistory.jsx";
import OrderComponent from "./components/Users/OrderComponent.jsx";
import OrderSuccess from "./components/Users/OrderSuccess.jsx";

function App() {
  return (
    <div className="w-full min-h-[100vh] ">
      {/* Homepage/Hero component */}
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        theme="dark"
      />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/product/:id" element={<SingleProductDetail />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />

        <Route element={<AuthRoutes />}>
          <Route path="/user/customer" element={<CustomerDashboard />}>
            <Route path="" element={<Profile />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/user/checkout" element={<OrderComponent />} />
          <Route path="/user/payment/success" element={<OrderSuccess />} />
        </Route>

        <Route path="/user/resetPassEmail" element={<ResetPassEmail />} />
        <Route
          path="/user/reset-password/:id/:token"
          element={<ResetPassword />}
        />
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashBoard" element={<AdminDashBoard />}>
            <Route path="" element={<Home />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="manage" element={<Manage />} />
            <Route path="coupons" element={<Coupons />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
