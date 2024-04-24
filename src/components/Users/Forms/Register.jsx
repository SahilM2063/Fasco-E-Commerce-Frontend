/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "./assets/registerImg.png";
import regimage from "../../../assets/signup.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { isValidEmail } from "../../../utils/helper";
import openEye from "../../../assets/openEye.svg";
import closeEye from "../../../assets/closeEye.svg";

const defaultData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validateUserInfo = ({ firstName, lastName, email, password }) => {
  var isValidName = /^[a-z A-Z]+$/; // name checking regex

  if (!firstName.trim()) return { ok: false, error: "firstName is missing" };
  if (!isValidName.test(firstName))
    return { ok: false, error: "Invalid firstName" };

  if (!lastName.trim()) return { ok: false, error: "lastName is missing" };
  if (!isValidName.test(lastName))
    return { ok: false, error: "Invalid lastName" };

  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email" };

  if (!password.trim()) return { ok: false, error: "Password is missing" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long" };

  return { ok: true };
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passFieldVisibility, setPassFieldVisibility] = useState(false);

  const [formData, setFormData] = useState(defaultData);

  const { firstName, lastName, email, password } = formData;
  const { user, error, loading } = useSelector((state) => state?.users);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(formData);
    if (!ok) return toast.warn(error);
    dispatch(registerUserAction(formData));
    setFormData(defaultData);
  };

  useEffect(() => {
    if (user?.msg) {
      toast.success(user?.msg);
      if (user?.userFound?.isAdmin) {
        return navigate("/admin/dashboard");
      } else {
        return navigate("/");
      }
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [error, user]);

  return (
    <div className="wrapper w-full h-[calc(100vh-104px)] px-32 md:px-10 sm:px-6 py-4">
      <div className="w-full h-full flex justify-center items-center border rounded-3xl md:rounded-2xl sm:rounded-xl overflow-hidden">
        <div className="img_container w-[50%] h-full md:hidden sm:hidden">
          <img
            src={regimage}
            alt="loginImg"
            className="h-full object-cover md:hidden sm:hidden"
          />
        </div>
        <div className="text_content w-[50%] h-full md:w-[80%] sm:w-[100%] p-4 py-10 md:py-4 sm:p-4 sm:px-6 flex flex-col justify-center items-start">
          <Link to={"/"} className="logo cursor-pointer sm:hidden md:hidden">
            <h1 className="text-4xl font-semibold font-[Volkhov] md:text-3xl">
              FASCO
            </h1>
          </Link>
          <h5 className="text-xl font-[Volkhov] my-6 sm:w-full sm:text-center md:w-full md:text-center">
            Sign up to FASCO
          </h5>
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
            <div className="w-full border-b-2 flex justify-between items-center border-gray-400 py-2 text-sm text-[#484848]">
              <input
                type={passFieldVisibility ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChangeHandler}
                className="flex-1 outline-none"
              />
              {password.length === 0 ? null : (
                <img
                  src={passFieldVisibility ? openEye : closeEye}
                  alt="eye"
                  className="w-5 cursor-pointer"
                  onClick={() => setPassFieldVisibility(!passFieldVisibility)}
                />
              )}
            </div>
            <p className="w-full text-[12px] mt-4 mb-6 sm:mb-8">
              Already have an account ?{" "}
              <Link to={"/user/login"} className="hover:underline">
                Sign in now
              </Link>
            </p>
            <div className="btn-group w-full flex sm:flex-col items-center justify-between gap-4 sm:gap-2">
              {loading ? (
                <button
                  type="submit"
                  className="w-full sm:w-full py-2 bg-black text-white rounded-lg border-[1px] border-black"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full sm:w-full py-2 bg-black text-white rounded-lg border-[1px] border-black"
                >
                  Sign Up
                </button>
              )}
              {/* <button
                type="button"
                className="w-[50%] sm:w-full py-2 bg-white text-[#484848] border-[1px] border-[#484848] rounded-lg"
              >
                Sign In
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
