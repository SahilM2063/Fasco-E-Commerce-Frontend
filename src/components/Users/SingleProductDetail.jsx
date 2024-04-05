/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAction } from "../../redux/slices/productSlice";
import filledStar from "../../assets/filledStar.svg";
import emptyStar from "../../assets/emptyStar.svg";
import { addToCartAction } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { createReviewAction } from "../../redux/slices/reviewSlice";
import defaultPfp from "../../assets/default_user.png";

const SingleProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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
  const { userFound } = useSelector(
    (state) => state?.users?.userAuth?.userInfo
  );
  console.log(product?.reviews);
  console.log(userFound);

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

  // console.log(productData);

  const handleAddToCart = () => {
    // console.log(productData);
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

  // check is user already reviewed this project
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);
  useEffect(() => {
    const reviewed = product?.reviews?.find(
      (review) => review?.user?._id === userFound?._id
    );
    if (reviewed) {
      setIsAlreadyReviewed(true);
    }
  }, [product, userFound]);

  console.log(isAlreadyReviewed);

  // rating box
  const [ratingData, setRatingData] = useState({
    rating: 0,
    comment: "",
  });
  const { rating, comment } = ratingData;
  // rating star selection
  const [selectedStar, setSelectedStar] = useState(0);

  const handleStarClick = (index) => {
    setSelectedStar(index);
    setRatingData({
      ...ratingData,
      rating: index,
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (comment === "") {
      toast.error("Please enter a comment");
      return;
    }
    dispatch(createReviewAction({ ...ratingData, productId: id }));
  };

  const {
    loading: reviewLoading,
    error: reviewError,
    isAdded: reviewIsAdded,
    review,
  } = useSelector((state) => state?.reviews);

  useEffect(() => {
    if (reviewIsAdded) {
      toast.success(review?.message);
      setRatingData({
        rating: 0,
        comment: "",
      });
      setSelectedStar(0);
      dispatch(getSingleProductAction(id));
    }
    if (reviewError) {
      toast.error(reviewError?.message);
    }
  }, [reviewIsAdded, reviewError]);

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
              {renderStars(product?.rating)}
              <span className="ml-3 text-sm font-semibold font-[Poppins]">
                ({product?.reviews?.length})
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

      <div className="reviews w-full mt-14 pt-4 border-t-[1px] border-[#484848]/70 md:px-10">
        <h1 className="font-[Volkhov] text-xl font-semibold">
          Customer Reviews
        </h1>

        {isAlreadyReviewed ? null : (
          <div className="review_form w-full mt-4">
            <form className="space-y-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <img
                    key={index}
                    src={index < selectedStar ? filledStar : emptyStar}
                    alt={`Star ${star}`}
                    onClick={() => handleStarClick(index + 1)}
                    className="star w-6 cursor-pointer sm:w-4"
                  />
                ))}
              </div>
              <textarea
                className="w-full outline-none border-[1px] focus:border-black border-gray-300 p-4 sm:p-2 rounded-md sm:text-xs sm:placeholder:text-xs resize-none placeholder:font-[Poppins]"
                rows={4}
                value={comment}
                onChange={(e) =>
                  setRatingData({ ...ratingData, comment: e.target.value })
                }
                placeholder={"Write a review..."}
              ></textarea>
              <button
                type="submit"
                onClick={handleReviewSubmit}
                className="text-white bg-black px-4 py-3 sm:py-2 sm:text-xs rounded-md text-sm"
              >
                {reviewLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        )}
        {product?.reviews?.length ? (
          product?.reviews?.map((review) => (
            <>
              <ReviewComponent key={review._id} review={review} />
              <hr />
            </>
          ))
        ) : (
          <p className="text-center text-xl sm:text-sm font-[Poppins] font-semibold">
            No reviews yet
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleProductDetail;

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

export const ReviewComponent = ({ review }) => {
  return (
    <div className="w-full flex justify-between items-start md:gap-2 sm:gap-2 my-4 py-4 md:py-2">
      <div className="pfp-container w-[10%]">
        <img
          src={review?.user?.pfp || defaultPfp}
          alt="pfp"
          className="size-20 md:size-12 sm:size-10 object-cover rounded-full"
        />
      </div>
      <div className="review-details flex-1 flex flex-col items-start gap-4 md:gap-2 sm:gap-2 font-[Poppins]">
        <span className="font-semibold text-xl md:text-lg sm:text-sm">
          {review?.user?.firstName + " " + review?.user?.lastName}
        </span>
        <p className="w-full text-sm md:text-xs sm:text-[10px]">
          {review?.comment}
        </p>
      </div>
      <div className="flex items-center gap-1 sm:gap-0 md:gap-0">
        {renderStars(review?.rating)}
      </div>
    </div>
  );
};
