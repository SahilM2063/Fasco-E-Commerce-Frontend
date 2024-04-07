/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import tickMark from "../../assets/tick-mark.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCartAction } from "../../redux/slices/cartSlice";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  return (
    <div className="w-full h-[calc(100vh-140px)] px-32 pb-6 md:px-10 sm:px-6 mt-8 flex justify-center items-center">
      <div className="card border shadow-lg p-12 md:p-6 sm:p-4 max-w-[50%] md:max-w-[76%] sm:max-w-full flex flex-col items-center justify-end gap-2">
        <img
          src={tickMark}
          alt="tickMark"
          className="w-14 md:w-10 sm:w-8 mb-2"
        />
        <h1 className="font-[Poppins] font-semibold text-xl md:text-lg tracking-wide mb-4 md:mb-2 sm:mb-1">
          Order Placed Successfully
        </h1>
        <p className="text-sm md:text-xs sm:text-[10px] leading-6 md:leading-5 sm:leading-4 tracking-wide  text-gray-600/75 font-[Poppins] text-center">
          Thank&#39;s for your order at FASCO. Your order will be processed soon
          as possible. Make Sure you make note of your order number, which is
          <span className="font-semibold text-gray-600/95">
            {" "}
            1234ABCD56EF
          </span>{" "}
          and keep it with you.
        </p>
        <div className="flex items-center gap-4 md:gap-3 mt-4">
          <Link
            to={"/"}
            className="px-4 md:px-3 sm:px-3 py-3 md:py-2 sm:py-1.5 bg-[#000] rounded-md text-sm md:text-xs sm:text-[10px] sm:tracking-wide text-white "
          >
            Back to Home
          </Link>
          <Link
            to={"/shop"}
            className="px-4 md:px-3 sm:px-3 py-3 md:py-2 sm:py-1.5 bg-[#000] rounded-md text-sm md:text-xs sm:text-[10px] sm:tracking-wide text-white "
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
