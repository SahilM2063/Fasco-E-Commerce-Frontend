/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isValidEmail } from "../../../utils/helper";
import { useNotification } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { sendResetPassEmail } from "../../../redux/slices/userSlice";

const validateEmailInfo = (email) => {
  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email" };
  return { ok: true };
};

const ResetPassEmail = () => {
  const [email, setEmail] = useState("");
  const updateNotification = useNotification();
  const dispatch = useDispatch();
  const { error, user, loading } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ok, error } = validateEmailInfo(email);
    if (!ok) return updateNotification("warning", error);
    dispatch(sendResetPassEmail(email));
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      updateNotification("error", error?.message);
    }
    if (user?.msg) {
      updateNotification("success", user?.msg);
    }
  }, [error, user]);

  return (
    <div className="w-full h-[calc(100vh-104px)] px-32 md:px-10 sm:px-2 py-4 flex items-center justify-center font-[Poppins]">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto"
        data-v0-t="card"
      >
        <div className="flex flex-col p-6 space-y-4">
          <h3 className="font-[Volkhov] tracking-wide text-2xl font-bold">
            Forgot Password
          </h3>
          <p className="text-sm">
            Enter your email below to reset your password
          </p>
        </div>
        <div className="py-4 px-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="m@example.com"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Link
              to={"/login"}
              className="hover:underline w-full mt-2 text-[12px] "
            >
              Sign in
            </Link>
            <button
              className="w-full sm:w-full py-2 bg-black text-white rounded-lg border-[1px] border-black"
              type="submit"
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Send Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassEmail;
