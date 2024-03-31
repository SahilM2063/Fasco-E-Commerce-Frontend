/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "./assets/loginImg.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/userSlice.js";
import googleSvg from "./assets/google.svg";
import baseURL from "../../../utils/baseURL.js";
import { toast } from "react-toastify";
import { isValidEmail } from "../../../utils/helper.js";

const defaultData = {
  email: "",
  password: "",
};

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email" };
  if (!password.trim()) return { ok: false, error: "Password is missing" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long" };
  return { ok: true };
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(defaultData);
  const { email, password } = formData;
  const { error, loading, userInfo } = useSelector(
    (state) => state.users.userAuth
  );

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(formData);
    if (!ok) return toast.warn(error);
    dispatch(loginUserAction(formData));
    setFormData(defaultData);
  };

  useEffect(() => {
    if (userInfo?.msg) {
      toast.success(userInfo?.msg);
      if (userInfo.userFound.isAdmin) {
        return navigate("/admin/dashboard");
      } else {
        return navigate("/user/customerProfile");
      }
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [error, userInfo]);

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
        <div className="text_content w-[50%] h-full md:w-[80%] sm:w-full p-4 py-10 sm:p-4 sm:px-6 flex flex-col justify-center items-start">
          <Link to={"/"} className="logo cursor-pointer sm:hidden md:hidden">
            <h1 className="text-4xl font-semibold font-[Volkhov]">FASCO</h1>
          </Link>
          <h5 className="text-xl font-[Volkhov] my-6 sm:w-full sm:text-lg sm:text-center md:w-full md:text-center">
            Sign in to FASCO
          </h5>
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
              className="w-full outline-none border-b-2 border-gray-400 py-2 text-sm text-[#484848]"
            />
            <p className="w-full text-[12px] mt-4">
              <Link to={"/user/resetPassEmail"} className="hover:underline">
                Forget password ?
              </Link>
            </p>
            <p className="w-full text-[12px] mt-2 mb-6 sm:mb-8">
              Don&#39;t have an account ?{" "}
              <Link to={"/user/register"} className="hover:underline">
                Sign up now
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
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
