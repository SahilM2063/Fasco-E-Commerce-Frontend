/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import pagenotfound from "../assets/pagenotfound.svg";

const NotFound = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-white">
      <img
        src={pagenotfound}
        alt="not-found"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="content sm:w-full md:w-[50%] absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 select-none font-[Poppins]">
        <h1 className="text-[8vw] leading-[8vw] sm:text-[15vw] sm:leading-[14vw] font-bold font-[Volkhov]">
          404
        </h1>
        <span className="text-[2.5vw] md:text-[3vw] leading-[3vw] sm:text-lg sm:leading-[100%] font-bold tracking-wide">
          Page not found
        </span>
        <p className="text-center sm:w-full md:w-full sm:text-sm md:text-[1.7vw] font-bold mb-2 sm:mb-0">
          we’re sorry. the page you requested could no be found <br /> Please go
          back to the home page
        </p>
        <Link to={"/"} className="py-3 md:py-2 sm:py-2 sm:text-sm px-6 md:px-4 bg-black text-white rounded-lg">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
