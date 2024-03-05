/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import HomePage from "./components/Users/HomePage.jsx";
import menuSvg from "./assets/menu.svg";
import closeMenu from "./assets/closeMenu.svg";
import rightArr from "./assets/rightArr.svg";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Users/Forms/Login.jsx";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "Category",
    href: "/category",
  },
  {
    title: "New Arrivals",
    href: "/new-arrivals",
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-[100vh] ">
      {/* Navbar Component */}

      <div className="w-full h-[80px] flex justify-between items-center px-32 md:px-10 font-[Poppins] text-[#484848]">
        <div className="logo cursor-pointer">
          <h1 className="text-3xl font-normal font-[Volkhov]">FASCO</h1>
        </div>
        <div className="links flex gap-12 md:gap-6 text-sm md:text-xs md:hidden">
          {links.map((link, i) => {
            return (
              <Link key={i} to={link.href} className="cursor-pointer">
                {link.title}
              </Link>
            );
          })}
        </div>
        <div className="buttons flex items-center gap-6 md:gap-4 text-sm md:text-sm md:hidden">
          <Link to={"/login"}>
            <button>Sign In</button>
          </Link>
          <Link to={"/register"}>
            <button className="py-3 md:py-2 px-6 md:px-4 bg-black text-white rounded-lg">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="menuBtn hidden md:block">
          <img
            onClick={() => setIsMenuOpen(true)}
            src={menuSvg}
            alt="menu"
            className="w-[30px] h-[30px] cursor-pointer"
          />
        </div>
      </div>

      {/* Sidebar component */}

      <div
        className={
          isMenuOpen
            ? `sideBar visible md:w-full md:h-full md:fixed md:top-0 md:right-0 md:bg-black/5 md:backdrop-blur-sm z-[900]`
            : `-right-full hidden`
        }
      >
        <section className="w-[40%] sm:w-[60%] h-full bg-white absolute top-0 right-0 p-8 flex flex-col justify-between gap-6 lg:hidden">
          <div className="menuBtn self-end">
            <img
              onClick={() => setIsMenuOpen(false)}
              src={closeMenu}
              alt="menu"
              className="w-[36px] h-[36px] cursor-pointer"
            />
          </div>
          <div className="links flex flex-col gap-12 md:gap-6">
            {links.map((link, i) => {
              return (
                <Link
                  key={i}
                  to={link.href}
                  className="cursor-pointer hover:pl-2 hover:font-semibold transition-all"
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
          <div className="buttons flex items-center sm:flex-col sm:items-start gap-6">
            <Link to={"/login"} className="flex-1 sm:w-full">
              <button className="w-full">Sign In</button>
            </Link>
            <Link to={"/register"} className="flex-1 sm:w-full">
              <button className="w-full py-3 md:py-2 bg-black text-white rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </section>
      </div>

      {/* Homepage/Hero component */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
