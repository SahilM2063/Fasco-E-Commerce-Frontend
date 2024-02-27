/* eslint-disable no-unused-vars */
import React from "react";
import h1 from "../../assets/h1.png";
import h2 from "../../assets/h2.png";
import h3 from "../../assets/h3.png";
import h4 from "../../assets/h4.png";
import main from "../../assets/main.svg";
import brand1 from "../../assets/brand1.svg";
import brand2 from "../../assets/brand2.svg";
import brand3 from "../../assets/brand3.svg";
import brand4 from "../../assets/brand4.svg";
import brand5 from "../../assets/brand5.svg";

const HomePage = () => {
  return (
    <>
      <div className="w-full h-[calc(100vh-100px)] px-32 py-4 flex justify-center gap-8 select-none">
        <img src={h1} alt="No img" className="w-[24%]" />

        <div className="w-[26%] flex flex-col justify-between h-full">
          <img src={h3} alt="No img" />
          <div className="w-full flex flex-col items-center gap-6 mt">
            <img src={main} alt="No img" className="w-full" />
            <button className="py-2 px-8 bg-black text-white rounded-lg">
              Shop Now
            </button>
          </div>
          <img src={h4} alt="No img" />
        </div>

        <img src={h2} alt="No img" className="w-[24%]" />
      </div>
      <div className="brand-stripe w-full h-[100px] flex items-center gap-20 justify-center">
        <img src={brand1} alt="brand1" className="w-[8%]" />
        <img src={brand2} alt="brand2" className="w-[8%]" />
        <img src={brand3} alt="brand3" className="w-[8%]" />
        <img src={brand4} alt="brand4" className="w-[8%]" />
        <img src={brand5} alt="brand5" className="w-[8%]" />
      </div>
    </>
  );
};

export default HomePage;
