/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const ShowAlert = ({ msg, alertType, time = 2000, key }) => {
  const [isVisible, setIsVisible] = useState(true);
  let icon;
  let alertclass;
  switch (alertType) {
    case "error":
      alertclass = "alert-error";
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
      break;
    case "success":
      alertclass = "alert-success";
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
      break;
    case "warning":
      alertclass = "alert-warning";
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
      break;
    default:
      alertclass = "alert-info";
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      );
  }

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, time);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          role="alert"
          className={`font-[Poppins] alert z-50 absolute max-w-md sm:max-w-[90%] sm:text-sm sm:flex rounded-md text-white top-8 left-1/2 -translate-x-1/2 select-none + ${alertclass}`}
        >
          {icon}
          <span>{msg}</span>
        </div>
      )}
    </>
  );
};

export default ShowAlert;
