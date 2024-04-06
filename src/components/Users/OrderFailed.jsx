/* eslint-disable no-unused-vars */
import React from "react";
import failed from "../../assets/remove.png";
import { Link } from "react-router-dom";

const OrderFailed = () => {
  return (
    <div className="w-full h-[calc(100vh-140px)] px-32 pb-6 md:px-10 sm:px-6 mt-8 flex justify-center items-center">
      <div className="card border-[2px] border-red-400/75 p-12 md:p-6 sm:p-4 max-w-[50%] md:max-w-[76%] sm:max-w-full flex flex-col items-center justify-end gap-2">
        <img src={failed} alt="tickMark" className="w-14 md:w-10 sm:w-8 mb-2" />
        <h1 className="text-red-500 font-[Poppins] font-semibold text-xl md:text-lg tracking-wide mb-4 md:mb-2 sm:mb-1">
          Order Failed !
        </h1>
        <p className="text-sm md:text-xs sm:text-[10px] leading-6 md:leading-5 sm:leading-4 tracking-wide  text-gray-600 font-[Poppins] text-center">
          We regret to inform you that your order at FASCO has failed to
          process. Kindly note your order number{" "}
          <span className="font-semibold text-gray-600/95"> 1234ABCD56EF </span>
          for reference. We apologize for any inconvenience caused. and keep it
          with you.
        </p>
        <Link
          to={"/user/cart"}
          className="px-4 mt-4 md:px-3 sm:px-3 py-3 md:py-2 sm:py-1.5 bg-red-500 rounded-md text-sm md:text-xs sm:text-[10px] sm:tracking-wide text-white "
        >
          Back to cart
        </Link>
      </div>
    </div>
  );
};

export default OrderFailed;
