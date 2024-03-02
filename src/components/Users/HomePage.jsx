/* eslint-disable no-unused-vars */
import React from "react";
import h1 from "../../assets/h1.png";
import h2 from "../../assets/h2.png";
import h3 from "../../assets/h3.png";
import h4 from "../../assets/h4.png";
import main from "../../assets/main.svg";
import Marquee from "react-fast-marquee";
import brand1 from "../../assets/brand1.svg";
import brand2 from "../../assets/brand2.svg";
import brand3 from "../../assets/brand3.svg";
import brand4 from "../../assets/brand4.svg";
import brand5 from "../../assets/brand5.svg";

const HomePage = () => {
  return (
    <>
      <div className="w-full sm:h-[calc(100vh-100px)] md:h-[calc(100vh-100px)] grid grid-cols-3 sm:grid-cols-1 sm:place-content-center px-32 md:px-10 py-4 gap-8 select-none">
        <div className="img__Container h-full rounded-lg overflow-hidden sm:hidden">
          <img src={h1} alt="No image" className="w-full h-full object-cover" />
        </div>
        <div className="main__Container h-full flex flex-col justify-between gap-2">
          <div className="sub_img_Container sm:hidden">
            <img src={h3} alt="No image" />
          </div>
          <div className="sub_main_Container flex flex-col items-center gap-4">
            <img src={main} alt="No image" />
            <button className="py-3 px-12 bg-black text-white rounded-lg uppercase text-sm tracking-wide">
              Shop now
            </button>
          </div>
          <div className="sub_img_Container sm:hidden">
            <img src={h4} alt="No image" />
          </div>
        </div>
        <div className="img__Container h-full rounded-lg overflow-hidden sm:hidden">
          <img src={h2} alt="No image" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="brand-stripe w-full h-[80px] flex items-center gap-20 justify-center">
        <Marquee play pauseOnHover autoFill gradient speed={200}>
          <img src={brand1} alt="brand1" className="mx-10 w-[40%]" />
          <img src={brand2} alt="brand2" className="mx-10 w-[40%]" />
          <img src={brand3} alt="brand3" className="mx-10 w-[40%]" />
          <img src={brand4} alt="brand4" className="mx-10 w-[40%]" />
          <img src={brand5} alt="brand5" className="mx-10 w-[40%]" />
        </Marquee>
      </div>
    </>
  );
};

export default HomePage;
