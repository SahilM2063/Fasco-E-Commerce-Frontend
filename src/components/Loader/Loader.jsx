/* eslint-disable no-unused-vars */
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen absolute top-0 left-0  backdrop-blur-sm flex justify-center items-center">
      <span className="loading loading-spinner loading-md"></span>
    </div>
  );
};

export default Loader;
