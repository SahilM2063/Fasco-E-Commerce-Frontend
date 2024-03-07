/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoutes = ({ ...rest }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin;
  const isLoggedIn = user?.token ? true : false;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/AdminDashBoard");
    }
  });

  return <>{!isLoggedIn && <Outlet {...rest} />}</>;
};

export default AuthRoutes;
