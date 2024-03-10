/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import googleSvg from "./assets/google.svg";
import registerImg from "./assets/registerImg.png";
import { useDispatch, useSelector } from "react-redux";
import ShowAlert from "../../../utils/ShowAlert";
import { registerUserAction } from "../../../redux/slices/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(registerUserAction(formData));
  };

  const { user, error, loading } = useSelector((state) => state?.users);

  return (
    <div className="wrapper w-full h-[calc(100vh-104px)] px-32 md:px-10 sm:p-0 py-4">
      <div className="w-full h-full flex justify-center items-center border rounded-3xl md:rounded-2xl sm:rounded-xl">
        <div className="img_container w-[50%] h-full md:hidden sm:hidden">
          <img
            src={registerImg}
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
        <div className="text_content w-[50%] h-full md:w-[80%] sm:w-[100%] p-4 py-10 md:py-4 sm:py-4 sm:px-0 flex flex-col justify-between md:justify-center items-start">
          <Link to={"/"} className="logo cursor-pointer sm:hidden md:hidden">
            <h1 className="text-4xl font-semibold font-[Volkhov] md:text-3xl">
              FASCO
            </h1>
          </Link>
          <h5 className="text-xl font-[Volkhov] my-6 sm:text-lg sm:w-full sm:text-center md:w-full md:text-center">
            Sign up to FASCO
          </h5>
          <button className="w-[70%] md:w-full sm:w-full flex items-center justify-center gap-6 py-3 md:py-2 border-[#484848] text-sm text-[#484848] font-[Poppins] border-[1px] rounded-lg">
            <img src={googleSvg} alt="google" className="w-4" />
            Sign up with google
          </button>
          <p className="w-[70%] md:w-full sm:w-full text-center text-[#484848] font-bold my-3  tracking-wider">
            Or
          </p>
          <form
            onSubmit={onSubmitHandler}
            className="font-[Poppins] w-[70%] md:w-full sm:w-full"
          >
            <div className="inp-group flex items-center gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="FirstName"
                value={firstName}
                onChange={onChangeHandler}
                autoFocus
                className="w-full outline-none border-b-2 border-gray-400 py-2 mb-8 sm:mb-6 text-sm text-[#484848]"
              />
              <input
                type="text"
                name="lastName"
                placeholder="LastName"
                value={lastName}
                onChange={onChangeHandler}
                className="w-full outline-none border-b-2 border-gray-400 py-2 mb-8 sm:mb-6 text-sm text-[#484848]"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChangeHandler}
              className="w-full outline-none border-b-2 border-gray-400 py-2 mb-8 sm:mb-6 text-sm text-[#484848]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChangeHandler}
              className="w-full outline-none border-b-2 border-gray-400 py-2 mb-14 sm:mb-8 text-sm text-[#484848]"
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
                  Sign Up
                </button>
              )}
              <button
                type="button"
                className="w-[50%] sm:w-full py-2 bg-white text-[#484848] border-[1px] border-[#484848] rounded-lg"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
