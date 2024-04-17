/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import profile from "../../assets/profile.svg";
import cartSvg from "../../assets/cart.svg";
import menuSvg from "../../assets/menu.svg";
import closeMenu from "../../assets/closeMenu.svg";
import { getCartDataAction } from "../../redux/slices/cartSlice";

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
    title: "Collection",
    href: "/collection",
  },
  {
    title: "About Us",
    href: "/about-us",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  // console.log(isLoggedIn)

  // getting cart items length
  const cart = useSelector((state) => state.cart?.cart?.user?.cart);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCartDataAction());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
      {/* Navbar Component */}
      <div className="w-full h-[80px] flex justify-between items-center px-32 sm:px-6 md:px-10 font-[Poppins] text-[#484848]">
        <Link to={"/"} className="logo cursor-pointer">
          <h1 className="text-3xl font-normal font-[Volkhov]">FASCO</h1>
        </Link>
        <div className="links flex gap-12 md:gap-6 text-sm md:text-xs md:hidden sm:hidden">
          {links.map((link, i) => (
            <Link key={i} to={link.href} className="cursor-pointer">
              {link.title}
            </Link>
          ))}
        </div>
        {isLoggedIn && (
          <div className="buttons flex items-center gap-6 md:gap-4 text-sm md:text-sm md:hidden sm:hidden">
            <Link to={"/user/customer"}>
              <img src={profile} alt="profile" className="w-6" />
            </Link>
            <Link to={"/user/cart"}>
              <button className="indicator p-3 md:p-2 bg-black text-white rounded-lg">
                {cart?.length > 0 && (
                  <span className="indicator-item size-4 text-black bg-white rounded-full shadow-lg text-[11px] font-semibold flex items-center justify-center">
                    {cart?.length}
                  </span>
                )}
                <img src={cartSvg} alt="profile" className="w-4" />
              </button>
            </Link>
          </div>
        )}
        {!isLoggedIn && (
          <div className="buttons flex items-center gap-6 md:gap-4 text-sm md:text-sm md:hidden sm:hidden">
            <Link to={"/user/login"}>
              <button>Sign In</button>
            </Link>
            <Link to={"/user/register"}>
              <button className="py-3 md:py-2 px-6 md:px-4 bg-black text-white rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        <div className="menuBtn hidden md:block sm:block">
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
            ? `sideBar visible md:w-full md:h-full md:fixed md:top-0 md:right-0 md:bg-black/5 md:backdrop-blur-sm z-50`
            : `-right-full hidden`
        }
      >
        <section className="w-[40%] sm:w-[60%] h-full bg-white absolute top-0 right-0 p-8 flex flex-col justify-between z-50 gap-6 lg:hidden">
          <div className="menuBtn self-end">
            <img
              onClick={() => setIsMenuOpen(false)}
              src={closeMenu}
              alt="menu"
              className="w-[36px] h-[36px] cursor-pointer"
            />
          </div>
          <div className="links flex flex-col gap-12 md:gap-6">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                className="cursor-pointer hover:pl-2 hover:font-semibold transition-all"
              >
                {link.title}
              </Link>
            ))}
          </div>
          {isLoggedIn && (
            <div className="buttons flex items-center gap-6 md:gap-8">
              <Link to={"/user/customer"}>
                <img src={profile} alt="profile" className="w-6" />
              </Link>
              <Link to={"/user/cart"}>
                <button className="indicator p-3 bg-black text-white rounded-lg">
                  {cart?.length > 0 && (
                    <span className="indicator-item size-4 text-black bg-white rounded-full shadow-md text-xs font-semibold flex items-center justify-center">
                      {cart?.length}
                    </span>
                  )}
                  <img src={cartSvg} alt="profile" className="w-4 md:w-5" />
                </button>
              </Link>
            </div>
          )}
          {!isLoggedIn && (
            <div className="buttons flex items-center sm:flex-col sm:items-start gap-6">
              <Link to={"/user/login"} className="flex-1 sm:w-full">
                <button className="w-full">Sign In</button>
              </Link>
              <Link to={"/user/register"} className="flex-1 sm:w-full">
                <button className="w-full py-3 md:py-2 bg-black text-white rounded-lg">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Navbar;
