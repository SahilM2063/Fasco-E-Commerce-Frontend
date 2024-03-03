/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import ArrivalProductCard from "./ArrivalProductCard";
import collectionAd from "../../assets/collectionAd.png";
import f1 from "../../assets/f1.svg";
import f2 from "../../assets/f2.svg";
import f3 from "../../assets/f3.svg";
import f4 from "../../assets/f4.svg";
import ig1 from "../../assets/ig1.png";
import ig2 from "../../assets/ig2.png";
import ig3 from "../../assets/ig3.png";
import ig4 from "../../assets/ig4.png";
import ig5 from "../../assets/ig5.png";
import ig6 from "../../assets/ig6.png";
import ig7 from "../../assets/ig7.png";

const arrivalsBtns = [
  "Men's Fashion",
  "Women's Fashion",
  "Men's Accessories",
  "Women's Accessories",
  "Kid's Fashion",
];

const featuresArray = [
  {
    title: "High Quality",
    desc: "crafted from top materials",
    img: f1,
  },
  {
    title: "Warranty Protection",
    desc: "Over 2 years",
    img: f2,
  },
  {
    title: "Free Shipping",
    desc: "Order over 150 $",
    img: f3,
  },
  {
    title: "24 / 7 Support",
    desc: "Dedicated support",
    img: f4,
  },
];

const HomePage = () => {
  const [arrivalBtnActiveIndex, setArrivalBtnActiveIndex] = useState(0);

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

      {/* Arrivals section */}

      <div className="arrivals_sec w-full px-32 sm:px-8 md:px-10 py-4">
        <h1 className="text-3xl font-semibold tracking-wide font-[Volkhov] text-center mb-4 mt-12">
          New Arrivals
        </h1>
        <p className="w-full lg:max-w-[58%] m-auto text-center md:text-sm sm:text-[10px] mb-12 sm:mb-8 font-[Poppins] text-gray-400 leading-6">
          Discover the latest and greatest additions to our collection, curated
          just for you. Stay ahead of the trends with our newest arrivals,
          handpicked to elevate your shopping experience.
        </p>
        <div className="selection_line w-full flex sm:flex-wrap justify-center items-center gap-9 md:gap-4">
          {arrivalsBtns.map((btn, i) => {
            return (
              <button
                key={i}
                onClick={() => setArrivalBtnActiveIndex(i)}
                className={
                  arrivalBtnActiveIndex === i
                    ? `py-3 md:py-2 px-6 md:px-3 md:text-[12px] bg-black text-white rounded-lg select-none transition-all`
                    : `py-3 md:py-2 px-6 md:px-3 md:text-[12px] bg-[#FAFAFA] text-gray-500 rounded-lg select-none transition-all`
                }
              >
                {btn}
              </button>
            );
          })}
        </div>

        <div className="arr_section_cards sm:my-4 md:my-6 lg:my-8 w-full grid sm:flex sm:flex-col md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 sm:gap-4">
          <ArrivalProductCard />
          <ArrivalProductCard />
          <ArrivalProductCard />
        </div>

        <div className="w-full flex items-center justify-center mt-4">
          <button className="py-3 md:py-2 px-10 md:px-4 bg-black text-white rounded-lg">
            View more
          </button>
        </div>
      </div>

      {/* collection section */}

      <div className="collection_ad w-full h-[60vh] md:h-auto flex md:flex-col justify-between items-center mt-10 bg-[#DADADA]">
        <div className="clipped_part w-[60%] h-full clip-polygon pl-32 bg-[#F8F8F8] overflow-hidden md:hidden sm:hidden">
          <img
            src={collectionAd}
            alt="collection_ad_img"
            className="h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start justify-center flex-1 py-10 px-4 font-[Poppins] pr-32 md:w-full md:items-center md:pr-0 sm:w-full sm:items-center sm:pr-0">
          <span className="text-[12px] text-[#8A8A8A] mb-2">
            Women collection
          </span>
          <h1 className="text-3xl font-semibold font-[Volkhov] tracking-wide mt-4 text-[#484848]">
            Peaky Blinders
          </h1>
          <span className="text-[12px] font-medium mb-2 tracking-wide underline underline-offset-4 mt-4">
            DESCRIPTION
          </span>
          <p className="text-[12px] text-[#8A8A8A] mb-2 w-[80%]">
            Transport yourself to the gritty streets of post-war Birmingham with
            our Peaky Blinders-inspired collection. Embody the razor-sharp style
            of Tommy Shelby and his gang with meticulously crafted suits, rugged
            outerwear, and vintage accessories.{" "}
          </p>
          <button className="py-3 text-sm md:py-2 px-10 md:px-4 bg-black text-white rounded-lg mt-6">
            Explore now
          </button>
        </div>
      </div>

      {/* Feature Stripe */}

      <div className="feature_stripe px-32 md:px-10 sm:px-4 py-6 w-full grid grid-cols-4 place-content-center place-items-center gap-24 md:grid-cols-2 md:gap-10 sm:gap-6 md:place-items-start sm:grid-cols-2 sm:place-items-start">
        {featuresArray.map((feature, i) => {
          return (
            <div key={i} className="flex items-center gap-4 sm:gap-1">
              <img
                src={feature.img}
                alt="feature"
                className="w-[16%] md:w-[14%] sm:w-[30%]"
              />
              <div className="font-[Poppins]">
                <span className="text-[#484848] text-sm sm:text-[10px] font-semibold">
                  {feature.title}
                </span>
                <p className="text-[12px] text-[#484848] sm:text-[10px]">
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instagram sec */}
      <div className="insta_sec w-full">
        <h1 className="text-3xl font-semibold tracking-wide font-[Volkhov] text-center mb-4 my-16">
          Follow Us On Instagram
        </h1>
        <p className="w-full lg:max-w-[58%] md:max-w-[80%] m-auto text-center md:text-sm sm:text-[10px] mb-20 sm:mb-8 font-[Poppins] text-gray-400 leading-6">
          Follow us on Instagram for an inside look at our latest collections,
          style tips, and exclusive promotions. Join our fashion-forward
          community and stay inspired with every scroll.
        </p>
        <div className="gallery_stripe w-full flex items-center justify-center">
          <img src={ig2} alt="ig" className="w-[14.57%]" />
          <img src={ig3} alt="ig" className="w-[14.57%]" />
          <img src={ig4} alt="ig" className="w-[14.57%]" />
          <img src={ig5} alt="ig" className="w-[14.57%]" />
          <img src={ig6} alt="ig" className="w-[14.57%]" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
