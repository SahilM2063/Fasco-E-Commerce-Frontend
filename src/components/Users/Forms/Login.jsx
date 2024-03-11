/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "./assets/loginImg.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/userSlice.js";
import ShowAlert from "../../../utils/ShowAlert.jsx";
import googleSvg from "./assets/google.svg";
import baseURL from "../../../utils/baseURL.js";

const defaultData = {
  email: "",
  password: "",
};

const Login = () => {
  // dispatch instance
  const dispatch = useDispatch();
  // navigate instance
  const navigate = useNavigate();
  // state for form data
  const [formData, setFormData] = useState(defaultData);
  // destructuring
  const { email, password } = formData;
  const { error, loading, userInfo } = useSelector(
    (state) => state.users.userAuth
  );
  // onchange function
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // onsubmit function
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // dispatching the action
    dispatch(loginUserAction(formData));
    setFormData(defaultData);
  };

  useEffect(() => {
    if (userInfo?.userFound?.isAdmin) {
      navigate("/AdminDashBoard");
    }
    // else {
    //   navigate("/CustomerProfile");
    // }
  });

  return (
    <div className="wrapper w-full h-[calc(100vh-104px)] px-32 md:px-10 sm:px-6 py-4">
      <div className="w-full h-full flex justify-center items-center border rounded-3xl md:rounded-2xl sm:rounded-xl">
        <div className="img_container w-[50%] h-full md:hidden sm:hidden">
          <img
            src={loginImg}
            alt="loginImg"
            className="h-full object-cover md:hidden sm:hidden"
          />
        </div>
        {error && (
          <ShowAlert
            key={Math.random()}
            msg={error?.message}
            alertType={"error"}
            time={3000}
          />
        )}
        <div className="text_content w-[50%] h-full md:w-[80%] sm:w-full p-4 py-10 sm:p-4 sm:px-6 flex flex-col justify-between items-start">
          <Link to={"/"} className="logo cursor-pointer sm:hidden md:hidden">
            <h1 className="text-4xl font-semibold font-[Volkhov]">FASCO</h1>
          </Link>
          <h5 className="text-xl font-[Volkhov] my-6 sm:w-full sm:text-lg sm:text-center md:w-full md:text-center">
            Sign in to FASCO
          </h5>
          <Link
            to={`${baseURL}/users/login/google`}
            className="w-[70%] md:w-full sm:w-full flex items-center justify-center gap-6 py-3 md:py-2 border-[#484848] text-sm text-[#484848] font-[Poppins] border-[1px] rounded-lg"
          >
            <img src={googleSvg} alt="google" className="w-4" />
            Sign in with google
          </Link>
          <p className="w-[70%] md:w-full sm:w-full text-center text-[#484848] font-bold my-3 tracking-wider">
            Or
          </p>
          <form
            onSubmit={onSubmitHandler}
            className="font-[Poppins] w-[70%] md:w-full sm:w-full"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChangeHandler}
              autoFocus
              className="w-full outline-none border-b-2 border-gray-400 py-2 mb-8 text-sm text-[#484848]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChangeHandler}
              className="w-full outline-none border-b-2 border-gray-400 py-2 mb-14 text-sm text-[#484848]"
            />
            <div className="btn-group w-full flex sm:flex-col items-center justify-between gap-4 sm:gap-2">
              {loading ? (
                <button
                  type="submit"
                  className="w-[50%] sm:w-full py-2 bg-black text-white rounded-lg border-[1px] border-black"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-[50%] sm:w-full py-2 bg-black text-white rounded-lg border-[1px] border-black"
                >
                  Sign in
                </button>
              )}
              <button
                type="button"
                className="w-[50%] sm:w-full py-2 bg-white text-[#484848] border-[1px] border-[#484848] rounded-lg"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
