/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoutes = ({ ...rest }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin ? true : false;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  });
  return <>{isAdmin && <Outlet {...rest} />}</>;
};

export default AdminRoutes;
