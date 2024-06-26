/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../../redux/slices/userSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import openEye from "../../../assets/openEye.svg";
import closeEye from "../../../assets/closeEye.svg";

const defaultData = {
  password: "",
  confirmPassword: "",
};

const validatePasswordInfo = ({ password, confirmPassword }) => {
  if (!password.trim()) return { ok: false, error: "password is missing" };
  if (!confirmPassword.trim())
    return { ok: false, error: "confirmation password is missing" };
  if (password !== confirmPassword)
    return { ok: false, error: "passwords doesn't match" };
  return { ok: true };
};

const ResetPassword = () => {
  const [formData, setformData] = useState(defaultData);
  const [passFieldVisibility, setPassFieldVisibility] = useState(false);
  const { password, confirmPassword } = formData;
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.users);
  const { id, token } = useParams();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ok, error } = validatePasswordInfo(formData);
    if (!ok) return toast.warn(error);
    dispatch(resetPassword({ id, token, ...formData }));
    setformData(defaultData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (user?.msg) {
      toast.success(user?.msg);
      navigate("/user/login");
    }
  }, [error, user]);
  return (
    <div className="w-full h-[calc(100vh-104px)] px-32 md:px-10 sm:px-2 py-4 flex items-center justify-center font-[Poppins]">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto p-6">
        <div className="space-y-2 pb-8">
          <h1 className="font-bold text-2xl">Password Reset</h1>
          <p className="text-sm">
            Enter your new password below to reset your password
          </p>
        </div>
        <div className="space-y-2 pb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              New Password
            </label>
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
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Confirm Password
            </label>
            <div className="w-full border-b-2 flex justify-between items-center border-gray-400 py-2 text-sm text-[#484848]">
              <input
                type={passFieldVisibility ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={confirmPassword}
                onChange={onChangeHandler}
                className="flex-1 outline-none"
              />
              {confirmPassword.length === 0 ? null : (
                <img
                  src={passFieldVisibility ? openEye : closeEye}
                  alt="eye"
                  className="w-5 cursor-pointer"
                  onClick={() => setPassFieldVisibility(!passFieldVisibility)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full sm:w-full py-2 bg-black text-white rounded-lg border-[1px] border-black"
        >
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
