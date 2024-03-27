/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAction } from "../../redux/slices/productSlice";
import filledStar from "../../assets/filledStar.svg";
import emptyStar from "../../assets/emptyStar.svg";
import ig1 from "../../assets/ig1.png";
import ig2 from "../../assets/ig2.png";
import ig3 from "../../assets/ig3.png";

const SingleProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const rating = 3;

  useEffect(() => {
    dispatch(getSingleProductAction(id));
  }, [dispatch]);

  const { product } = useSelector((state) => state?.products?.product);
  console.log(product);

  const [countVal, setCountVal] = useState(1);
  const [mainProductImage, setMainProductImage] = useState(0);

  return (
    <div className="w-full px-32 pb-6 md:px-10 sm:px-6 gap-12 mt-8">
      <div className="product w-full pr-20 flex justify-between">
        <div className="image-container w-full  flex justify-between gap-4">
          {product?.images.length > 1 && (
            <div className="side-img w-[20%] flex flex-col gap-4">
              {product?.images?.map((img, index) => {
                return (
                  <img
                    key={index}
                    onMouseEnter={() => setMainProductImage(index)}
                    src={img}
                    alt=""
                    className="w-full h-[100px] hover:border-[2px] hover:border-black p-[1px] cursor-pointer rounded-sm object-top object-cover "
                  />
                );
              })}
            </div>
          )}
          <div className="main-img flex-1">
            <img
              src={product?.images[mainProductImage]}
              alt="noImage"
              className="w-full object-cover rounded-md transition-all"
            />
          </div>
        </div>

        <div className="content w-full pl-20 space-y-5 flex flex-col justify-start">
          <p className="text-[#8a8a8a] text-xs capitalize font-[Poppins]">
            {product?.category}
          </p>
          <div className="flex justify-between items-center">
            <h1 className="font-[Volkhov] text-3xl leading-[30px]">
              {product?.name}
            </h1>
            <div className="flex items-center">
              {renderStars(rating)}
              <span className="ml-3 text-sm font-semibold font-[Poppins]">
                (3)
              </span>
            </div>
          </div>
          <div>
            <p className="text-[#8A8A8A] capitalize text-sm font-[Poppins]">
              {product?.brand}
            </p>
          </div>
          <div className="price flex gap-2 items-center  font-[Poppins]">
            <h1 className="text-2xl font-semibold">₹ {product?.price}.00</h1>
            <span className="text-lg text-[#8A8A8A] line-through">
              ₹ {(product?.price / (1 - 0.1)).toFixed(2)}
            </span>
          </div>
          <p className="description text-[#8A8A8A] text-xs font-[Poppins]">
            {product?.description}
          </p>
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-sm font-[Poppins]">
              {product?.qtyLeft <= Math.floor(product?.totalQty / 2) ? (
                <span>
                  Only <span className="font-semibold">{product?.qtyLeft}</span>{" "}
                  left in stock
                </span>
              ) : (
                <>
                  <span className="font-semibold">{product?.qtyLeft}</span> left
                  in stock
                </>
              )}
            </p>
            <progress
              className="progress  progress-[#8A8A8A] w-full bg-slate-300/55 h-1"
              value={product?.qtyLeft}
              max={product?.totalQty}
            ></progress>
          </div>
          <div className="sizes space-y-2">
            <label className="font-[Poppins] font-semibold">Size : M</label>
            <div className="flex items-center gap-2">
              {product?.sizes.map((size, index) => {
                return (
                  <span
                    key={index}
                    className={`text-xs text-[#8A8A8A] hover:border-[#484848] hover:text-black rounded-[5px] cursor-pointer font-[Poppins] border-[1px] border-black w-8 h-8 flex items-center justify-center`}
                  >
                    {size}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="colors space-y-2">
            <label className="font-[Poppins] font-semibold">Color : Red</label>
            <div className="flex items-center gap-2">
              {product?.colors.map((color, index) => {
                return (
                  <span
                    key={index}
                    className={`text-xs rounded-full cursor-pointer shadow-md w-8 h-8 `}
                    style={{ backgroundColor: color }}
                    title={color}
                  ></span>
                );
              })}
            </div>
          </div>

          <div className="buttons w-full space-y-2">
            <label className="font-[Volkhov]">Quantity</label>
            <div className="flex items-center gap-2">
              <div className="counter w-[120px] h-[40px] border-[1px] border-[#d5d5d5] rounded-md flex justify-between items-center">
                <button
                  onClick={() => {
                    if (countVal <= 1) {
                      return setCountVal(1);
                    }
                    setCountVal(countVal - 1);
                  }}
                  className="flex-1 h-full font-[poppins] flex justify-center items-center"
                >
                  -
                </button>
                <span className="flex-1 h-full font-[poppins] font-semibold flex justify-center items-center">
                  {countVal}
                </span>
                <button
                  onClick={() => {
                    if (countVal >= 8) {
                      return setCountVal(8);
                    }
                    setCountVal(countVal + 1);
                  }}
                  className="flex-1 h-full font-[poppins] flex justify-center items-center"
                >
                  +
                </button>
              </div>
              <button className="addtocart flex-1 h-[40px] text-white bg-black rounded-md font-[Poppins]">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetail;

const renderStars = (rating) => {
  const filledStars = Array.from({ length: rating }, (_, index) => (
    <img key={`filled_${index}`} src={filledStar} alt="Filled Star" />
  ));
  const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
    <img key={`empty_${index}`} src={emptyStar} alt="Empty Star" />
  ));
  return [...filledStars, ...emptyStars];
};
