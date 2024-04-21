/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import filledStar from "../../assets/filledStar.svg";
import emptyStar from "../../assets/emptyStar.svg";

const ArrivalProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`product/${product?._id}`)}
      className="card w-full border flex flex-col items-center p-5 font-[Poppins] rounded-lg select-none cursor-pointer"
    >
      <img
        src={product?.images[0]}
        alt="product_img"
        className="w-full rounded-lg"
      />
      <div className="w-full flex items-start justify-between my-4">
        <div>
          <h5 className="font-bold tracking-wide text-[#484848]">
            {product?.name}
          </h5>
          <span className="text-sm text-[#8A8A8A]">{product?.brand}</span>
        </div>
      </div>
      <p className="w-full text-left text-[#484848] text-[12px] font-[600] opacity-90 mb-2">
        (4.1k) Customer Reviews
      </p>
      <div className="price_stocks w-full flex justify-between items-center mt-2">
        <h2 className="text-2xl font-extrabold text-[#484848]">
          ₹ {product?.price}
        </h2>
        <span className="text-sm text-red-500">
          {renderStars(Math.floor(product?.averageRating))}
        </span>
      </div>
    </div>
  );
};

export default ArrivalProductCard;

const renderStars = (rating) => {
  const filledStars = Array.from({ length: rating }, (_, index) => (
    <img
      key={`filled_${index}`}
      src={filledStar}
      alt="Filled Star"
      className="md:w-3 sm:w-3"
    />
  ));
  const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
    <img
      key={`empty_${index}`}
      src={emptyStar}
      alt="Empty Star"
      className="md:w-3 sm:w-3"
    />
  ));
  return [...filledStars, ...emptyStars];
};
