/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoutes = ({ ...rest }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;
  const isAdmin = user?.userFound?.isAdmin ? true : false;

  useEffect(() => {
    // Redirect to login page if not logged in
    if (isLoggedIn && window.location.pathname === "/login") {
      isAdmin ? navigate("/AdminDashBoard") : navigate("/CustomerProfile");
    }
  }, [isLoggedIn, navigate]);

  return <Outlet {...rest} />;
};

export default AuthRoutes;
