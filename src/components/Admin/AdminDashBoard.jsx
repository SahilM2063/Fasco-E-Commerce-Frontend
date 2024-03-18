/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const sideBarLinks = [
  {
    label: "Home",
    path: "/admin/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    label: "Customers",
    path: "/admin/dashboard/customers",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    label: "Products",
    path: "/admin/dashboard/products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="m7.5 4.27 9 5.15"></path>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
        <path d="m3.3 7 8.7 5 8.7-5"></path>
        <path d="M12 22V12"></path>
      </svg>
    ),
  },
  {
    label: "Orders",
    path: "/admin/dashboard/orders",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="8" cy="21" r="1"></circle>
        <circle cx="19" cy="21" r="1"></circle>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>
    ),
  },
  {
    label: "Categories",
    path: "/admin/dashboard/categories",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="m7.5 4.27 9 5.15"></path>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
        <path d="m3.3 7 8.7 5 8.7-5"></path>
        <path d="M12 22V12"></path>
      </svg>
    ),
  },
  {
    label: "Coupons",
    path: "/admin/dashboard/coupons",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
        <path d="M7 7h.01"></path>
      </svg>
    ),
  },
];

const AdminDashBoard = () => {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const savedActiveLinkIndex = localStorage.getItem("activeLinkIndex");
    if (savedActiveLinkIndex !== null) {
      setActiveLinkIndex(parseInt(savedActiveLinkIndex));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeLinkIndex", activeLinkIndex.toString());
  }, [activeLinkIndex]);

  useEffect(() => {
    const index = sideBarLinks.findIndex(
      (link) => link.path === location.pathname
    );
    if (index !== -1) {
      setActiveLinkIndex(index);
    }
  }, [location.pathname]);

  return (
    <div>
      <div className="w-full min-h-screen px-32 md:px-6 sm:px-2 flex md:flex-col sm:flex-col">
        <div className="border lg:flex-1 rounded-sm">
          <div className="flex flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6 font-[Poppins] md:hidden sm:hidden">
              <Link className="flex items-center gap-2 font-semibold" href="#">
                <span className="text-xl">Fasco</span>
              </Link>
            </div>
            <div className="flex-1 py-2">
              <nav className="grid md:flex sm:flex items-start px-4 gap-3 text-sm font-medium md:overflow-x-scroll sm:overflow-x-scroll scrollbar-hide">
                {sideBarLinks.map((link, index) => {
                  return (
                    <Link
                      to={link.path}
                      key={index}
                      onClick={() => setActiveLinkIndex(index)}
                      className={
                        activeLinkIndex === index
                          ? `flex items-center gap-3 rounded-lg text-gray-100 px-3 py-2 bg-black transition-all`
                          : `flex items-center gap-3 rounded-lg px-3 py-2 text-[#484848] transition-all`
                      }
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[84%] md:w-full sm:w-full min-h-screen h-auto border rounded-sm">
          <div className="flex h-14 lg:h-[60px] justify-between items-center gap-4 border-b px-6">
            <div className="flex items-center gap-2">
              {sideBarLinks[activeLinkIndex].icon}
              <h1 className="font-semibold text-lg">
                {sideBarLinks[activeLinkIndex].label}
              </h1>
            </div>
            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              admin
            </div>
          </div>
          <main className="h-full flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
