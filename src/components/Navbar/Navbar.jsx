/* eslint-disable no-unused-vars */
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-[80px] flex justify-between items-center px-32 font-[Poppins] text-[#484848]">
      <div className="logo">
        <h1 className="text-3xl font-normal font-[Volkhov]">FASCO</h1>
      </div>
      <div className="links flex gap-12 text-sm">
        <a className="cursor-pointer">Home</a>
        <a className="cursor-pointer">Shop</a>
        <a className="cursor-pointer">Categories</a>
        <a className="cursor-pointer">New Arrivals</a>
      </div>
      <div className="buttons flex gap-6 text-sm">
        <button>Sign In</button>
        <button className="py-3 px-6 bg-black text-white rounded-lg">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
