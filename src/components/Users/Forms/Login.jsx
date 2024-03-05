/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "./assets/loginImg.png";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../../redux/slices/userSlice.js";

const Login = () => {
  // dispatch instance
  const dispatch = useDispatch();
  // state for form data
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "12345",
  });
  // destructuring
  const { email, password } = formData;
  // onchange function
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // onsubmit function
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // dispatching the action
    dispatch(loginUserAction(formData));
  };

  return (
    <div className="wrapper w-full h-[calc(100vh-104px)] px-32 md:px-10 sm:px-0 py-4">
      <div className="w-full h-full flex justify-center items-center border rounded-3xl">
        <div className="img_container w-[50%] h-full md:hidden sm:hidden">
          <img
            src={loginImg}
            alt="loginImg"
            className="h-full object-cover md:hidden sm:hidden"
          />
        </div>
        <div className="text_content w-[50%] md:w-[80%] sm:w-full p-4 sm:p-4">
          <Link to={"/"} className="logo cursor-pointer">
            <h1 className="text-4xl font-semibold font-[Volkhov] mb-10">
              FASCO
            </h1>
          </Link>
          <h5 className="text-2xl font-[Volkhov] mb-10">Sign in to FASCO</h5>
          <form
            onSubmit={onSubmitHandler}
            className="font-[Poppins] flex flex-col w-[70%] md:w-full sm:w-full"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChangeHandler}
              autoFocus
              className="w-full outline-none border-b-2 border-gray-400 p-2 mb-6 text-[#484848]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChangeHandler}
              className="w-full outline-none border-b-2 border-gray-400 p-2 mb-8 text-[#484848]"
            />
            <button
              type="submit"
              className="w-full py-3 md:py-2 px-6 md:px-4 bg-black text-white rounded-lg mb-4 mt-6 border-[1px] border-white"
            >
              Sign in
            </button>
            <Link to={"/register"}>
              <button
                type="button"
                className="w-full py-3 md:py-2 px-6 md:px-4 bg-white rounded-lg border-[1px] border-black"
              >
                Sign up
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
