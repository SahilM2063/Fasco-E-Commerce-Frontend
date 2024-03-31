/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAction } from "../../redux/slices/productSlice";
import filledStar from "../../assets/filledStar.svg";
import emptyStar from "../../assets/emptyStar.svg";
import { addToCartAction } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const SingleProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const rating = 1;

  useEffect(() => {
    dispatch(getSingleProductAction(id));
    setProductData({
      productId: product?._id,
      quantity: countVal,
      price: product?.price,
      size: selectedSize,
      color: selectedColor,
    });
  }, [dispatch]);

  const { product } = useSelector((state) => state?.products?.product);
  // console.log(product);

  const [countVal, setCountVal] = useState(1);
  const [mainProductImage, setMainProductImage] = useState(0);

  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [productData, setProductData] = useState({
    productId: "",
    quantity: "",
    price: "",
    size: "",
    color: "",
  });

  useEffect(() => {
    setProductData({
      productId: product?._id,
      quantity: countVal,
      price: product?.price,
      size: selectedSize,
      color: selectedColor,
    });
  }, [countVal, selectedSize, selectedColor, product]);

  console.log(productData);

  const handleAddToCart = () => {
    console.log(productData);
    dispatch(addToCartAction(productData));
  };

  const { loading, error, isAdded, productMsg } = useSelector(
    (state) => state?.cart
  );

  useEffect(() => {
    if (isAdded) {
      toast.success(productMsg?.message);
      setCountVal(1);
      setSelectedSize();
      setSelectedColor();
      setProductData({
        productId: "",
        quantity: "",
        price: "",
        size: "",
        color: "",
      });
      navigate("/user/cart");
      dispatch(getSingleProductAction(id));
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [isAdded, error]);

  return (
    <div className="w-full px-32 pb-6 md:px-10 sm:px-6 mt-8">
      <div className="product w-full flex md:flex-col sm:flex-col justify-between md:gap-8 sm:gap-8">
        <div className="image-container max-h-[500px] pr-20 md:px-10 sm:px-4 w-full flex sm:flex-col-reverse justify-between gap-4">
          {product?.images.length > 1 && (
            <div className="side-img w-[20%] md:w-[18%] h-full sm:w-full flex flex-col sm:flex-row gap-4 sm:gap-3 sm:justify-center sm:px-4">
              {product?.images?.map((img, index) => {
                return (
                  <img
                    key={index}
                    onMouseEnter={() => setMainProductImage(index)}
                    src={img}
                    alt="noImage"
                    className="w-full md:h-1/6 sm:w-1/4 h-1/4 hover:border-[2px] hover:border-black p-[1px] cursor-pointer rounded-md object-top object-cover "
                  />
                );
              })}
            </div>
          )}
          <div className="main-img flex-1">
            <img
              src={product?.images[mainProductImage]}
              alt="noImage"
              className="w-full h-full object-cover rounded-md transition-all"
            />
          </div>
        </div>

        <div className="content w-full pl-20 md:px-10 sm:px-4 space-y-5 flex flex-col justify-start">
          <p className="text-[#8a8a8a] text-xs capitalize font-[Poppins] italic">
            {product?.category}
          </p>
          <div className="flex sm:flex-col justify-between items-center sm:items-start sm:gap-4">
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
            <h1 className="text-2xl font-semibold text-[#484848]">
              ₹ {product?.price}.00
            </h1>
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
                  Only{" "}
                  <span className="font-semibold text-[#484848]">
                    {product?.qtyLeft}
                  </span>{" "}
                  left in stock
                </span>
              ) : (
                <>
                  <span className="font-semibold text-[#484848]">
                    {product?.qtyLeft}
                  </span>{" "}
                  left in stock
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
            <label className="font-[Poppins] font-semibold text-[#484848]">
              Size : {selectedSize}
            </label>
            <div className="flex items-center gap-2">
              {product?.sizes.map((size, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs text-[#8A8A8A] border-[#8A8A8A] hover:font-semibold hover:border-black hover:text-black rounded-[5px] cursor-pointer font-[Poppins] border-[1px]  w-8 h-8 flex items-center justify-center ${
                      selectedSize === size &&
                      "font-semibold bg-black text-white hover:text-white hover:bg-black"
                    }`}
                  >
                    {size}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="colors space-y-2">
            <label className="font-[Poppins] font-semibold text-[#484848]">
              Color : {selectedColor}
            </label>
            <div className="flex items-center gap-2">
              {product?.colors.map((color, index) => {
                return (
                  <span
                    key={index}
                    className={`text-xs rounded-full cursor-pointer shadow-md w-8 h-8 ${
                      selectedColor === color && "border-[2px] border-black"
                    } flex items-center justify-center`}
                    style={{ backgroundColor: color }}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                  ></span>
                );
              })}
            </div>
          </div>

          <div className="buttons w-full space-y-2">
            <label className="font-[Poppins] font-semibold text-[#484848]">
              Quantity
            </label>
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
                <span className="flex-1 h-full font-[poppins] font-semibold flex justify-center items-center text-[#484848]">
                  {countVal}
                </span>
                <button
                  onClick={() => {
                    if (countVal >= 8 && countVal < product?.qtyLeft) {
                      return setCountVal(8);
                    }
                    if (countVal >= product?.qtyLeft) {
                      return setCountVal(product?.qtyLeft);
                    }
                    setCountVal(countVal + 1);
                  }}
                  className="flex-1 h-full font-[poppins] flex justify-center items-center"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="addtocart flex-1 h-[40px] text-white bg-black rounded-md font-[Poppins]"
              >
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
