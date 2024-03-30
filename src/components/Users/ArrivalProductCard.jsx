/* eslint-disable no-unused-vars */
import React from "react";
import ac1 from "../../assets/ac1.png";
import ratingStar from "../../assets/ratingStar.svg";

const rating_star = (
  <>
    <img src={ratingStar} alt="star" />
    <img src={ratingStar} alt="star" />
    <img src={ratingStar} alt="star" />
    <img src={ratingStar} alt="star" />
    <img src={ratingStar} alt="star" />
  </>
);

const ArrivalProductCard = () => {
  return (
    <div className="card w-full border flex flex-col items-center p-5 font-[Poppins] rounded-lg select-none">
      <img src={ac1} alt="product_img" className="w-full rounded-lg" />
      <div className="w-full flex items-start justify-between my-4">
        <div>
          <h5 className="font-bold tracking-wide text-[#484848]">
            Shiny dress
          </h5>
          <span className="text-sm text-[#8A8A8A]">Channel</span>
        </div>
        <div className="stars flex">{rating_star}</div>
      </div>
      <p className="w-full text-left text-[#484848] text-[12px] font-[600] opacity-90 mb-2">
        (4.1k) Customer Reviews
      </p>
      <div className="price_stocks w-full flex justify-between items-center mt-2">
        <h2 className="text-2xl font-extrabold text-[#484848]">₹ 95.50</h2>
        <span className="text-sm text-red-500">Almost Sold Out</span>
      </div>
    </div>
  );
};

export default ArrivalProductCard;
