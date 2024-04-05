/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import remove from "../../assets/closeMenu.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartDataAction,
  removeFromCart,
  updateCartAction,
} from "../../redux/slices/cartSlice";
import emptyCartIllustration from "../../assets/empty_cart_illustration.svg";
import { toast } from "react-toastify";
import couponSvg from "../../assets/coupon.svg";
import { Link } from "react-router-dom";
import { getCouponByName } from "../../redux/slices/couponSlice";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartDataAction());
  }, [dispatch]);
  const [quantities, setQuantities] = useState({});

  const { cart, loading, productMsg, error, isDeleted } = useSelector(
    (state) => state?.cart
  );
  const cartData = cart?.user?.cart;

  const [totalCartValue, setTotalCartValue] = useState(
    cart?.user?.totalCartValue
  );
  const [discountedCartValue, setDiscountedCartValue] = useState(
    cart?.user?.totalCartValue
  );

  const handleRemoveFromCart = (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      dispatch(removeFromCart(id));
    }
    return;
  };

  useEffect(() => {
    if (isDeleted) {
      dispatch(getCartDataAction());
      toast.success(productMsg?.message);
    }
    if (error) {
      toast.error(error?.message);
      dispatch(getCartDataAction());
    }
  }, [isDeleted, error]);

  // handling quantities
  const handleQtyIncr = (product) => {
    const currentQuantity = quantities[product?._id] || product?.quantity;
    const updatedQuantity = Math.min(currentQuantity + 1, 8); // Limit increment to 8
    setQuantity(product?._id, updatedQuantity);
    dispatch(
      updateCartAction({
        id: product._id,
        quantity: updatedQuantity,
      })
    );
  };

  const handleQtyDecr = (product) => {
    const currentQuantity = quantities[product?._id] || product?.quantity;
    if (currentQuantity > 1) {
      const updatedQuantity = currentQuantity - 1;
      setQuantity(product?._id, updatedQuantity);
      dispatch(
        updateCartAction({
          id: product._id,
          quantity: updatedQuantity,
        })
      );
    }
  };

  const setQuantity = (id, quantity) => {
    setQuantities({
      ...quantities,
      [id]: quantity,
    });
  };

  // coupon management
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const applyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) {
      return toast.error("Please enter coupon code");
    }
    // console.log(couponCode);
    dispatch(getCouponByName({ code: couponCode }));
  };
  const { coupon, error: couponError } = useSelector((state) => state?.coupons);

  useEffect(() => {
    if (couponError) {
      toast.error(couponError?.message);
    }
    if (coupon?.coupon && !coupon?.coupon?.isExpired) {
      toast.success(coupon?.message);
      setAppliedCoupon(coupon?.coupon);
    }
  }, [coupon, couponError]);

  console.log(appliedCoupon);

  // for updating cart total with appliedCoupon
  useEffect(() => {
    if (cartData) {
      let newTotal = cartData.reduce((acc, product) => {
        const quantity = quantities[product._id] || product.quantity;
        return acc + product.price * quantity;
      }, 0);
      setTotalCartValue(newTotal.toFixed(2)); // Update total cart value

      // Check if a coupon is applied and not expired
      if (appliedCoupon && !appliedCoupon.isExpired) {
        const discountAmount = newTotal * (appliedCoupon.discount / 100);
        const discountedValue = newTotal - discountAmount;
        setDiscountedCartValue(discountedValue.toFixed(2)); // Update discounted cart value
      } else {
        setDiscountedCartValue(newTotal.toFixed(2)); // If no coupon, discounted value is the same as total
      }
    }
  }, [cartData, quantities, appliedCoupon]);

  return (
    <div className="w-full px-32 pb-6 md:px-10 sm:px-6 mt-8">
      <h1 className="font-[Volkhov] text-3xl text-center">Shopping Cart</h1>
      <div className="cartProducts mt-4">
        {cartData?.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center gap-4 items-center bg-white select-none">
            <img
              src={emptyCartIllustration}
              alt="cart_empty"
              className="w-1/3 md:w-1/2 sm:w-1/2"
            />
            <p className="text-sm font-[poppins]">Your cart is empty!</p>
          </div>
        ) : (
          // for medium and bigger screen size devices

          <>
            <table className="w-full whitespace-nowrap sm:hidden">
              <thead>
                <tr className="h-20 w-full text-sm leading-none border-b-2 border-black">
                  <th className="text-left pl-4 font-[poppins] font-semibold">
                    No.
                  </th>
                  <th className="text-left font-[poppins] font-semibold">
                    Product
                  </th>
                  <th className="text-left pl-4 font-[poppins] font-semibold">
                    Price(₹)
                  </th>
                  <th className="text-left pl-4 font-[poppins] font-semibold">
                    Quantity
                  </th>
                  <th className="text-left pl-4 font-[poppins] font-semibold">
                    Total
                  </th>
                  <th className="text-left pl-4 font-[poppins] font-semibold"></th>
                </tr>
              </thead>
              <tbody className="w-full">
                {cartData?.map((product, index) => (
                  <tr key={index} className="w-full h-40 md:h-28">
                    <td className="pl-4 font-semibold">{index + 1}</td>
                    <td className="">
                      <div className="flex items-start gap-4">
                        <img
                          className="shadow-md rounded-sm object-cover h-32 w-32 md:h-20 md:w-20"
                          alt="product image"
                          src={product?.productId?.images[0]}
                        />
                        <div className="content flex items-start flex-col space-y-2">
                          <Link
                            to={`/product/${product?.productId?._id}`}
                            className="font-[Volkhov] text-xl md:text-base tracking-tight text-[#484848] "
                          >
                            {product?.productId?.name}
                          </Link>
                          <div className="space-y-1">
                            <p className="text-sm md:text-xs font-[Poppins] tracking-wide text-[#8A8A8A]">
                              Color : {product?.color}
                            </p>
                            <p className="text-sm md:text-xs font-[Poppins] tracking-wide text-[#8A8A8A]">
                              Size: {product?.size}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="pl-4 font-[Poppins] md:text-sm">
                      ₹ {product?.price}
                    </td>
                    <td className="pl-4">
                      <div className="counter w-[100px] h-[40px] md:w-[70px] md:h-[30px]  border-[1px] border-[#d5d5d5] rounded-md flex justify-between items-center">
                        <button
                          onClick={() => handleQtyDecr(product)}
                          className="flex-1 text-lg md:text-sm h-full font-[poppins] flex justify-center items-center"
                        >
                          -
                        </button>
                        <span className="flex-1 md:text-sm h-full font-[poppins] font-semibold flex justify-center items-center text-[#484848]">
                          {quantities[product?._id] || product?.quantity}
                        </span>
                        <button
                          onClick={() => handleQtyIncr(product)}
                          className="flex-1 text-lg md:text-sm h-full font-[poppins] flex justify-center items-center"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="pl-4 font-semibold font-[Poppins] md:text-sm">
                      ₹{" "}
                      {product?.price *
                        (quantities[product?._id] || product?.quantity)}
                    </td>
                    <td>
                      <img
                        onClick={() => handleRemoveFromCart(product?._id)}
                        src={remove}
                        alt="remove"
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="w-full space-y-8 md:hidden lg:hidden mt-10">
              {cartData?.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start space-x-3"
                >
                  <div className="w-1/4">
                    <img
                      src={product?.productId?.images[0]}
                      alt="image"
                      className="w-full"
                    />
                  </div>
                  <div className="content flex-1 flex flex-col gap-1 justify-between">
                    <Link
                      to={`/product/${product?.productId?._id}`}
                      className="font-[Poppins] font-semibold text-md"
                    >
                      {product?.productId?.name}
                    </Link>
                    <span className="text-[10px] font-semibold font-[Poppins]">
                      Color : {product?.color}
                    </span>
                    <span className="text-[10px] font-semibold font-[Poppins]">
                      Size : {product?.size}
                    </span>
                    <div className="counter w-[60px] h-[26px] border-[1px] border-[#d5d5d5] rounded-sm flex justify-between items-center">
                      <button
                        onClick={() => handleQtyDecr(product)}
                        className="flex-1 text-xs h-full font-[poppins] flex justify-center items-center"
                      >
                        -
                      </button>
                      <span className="flex-1 text-xs h-full font-[poppins] font-semibold flex justify-center items-center text-[#484848]">
                        {quantities[product?._id] || product?.quantity}
                      </span>
                      <button
                        onClick={() => handleQtyIncr(product)}
                        className="flex-1 text-xs h-full font-[poppins] flex justify-center items-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex h-full flex-col justify-between items-center gap-2">
                    <span className="text-md font-semibold font-[Poppins]">
                      ₹{" "}
                      {product?.price *
                        (quantities[product?._id] || product?.quantity)}
                    </span>
                    <img
                      onClick={() => handleRemoveFromCart(product?._id)}
                      src={remove}
                      alt="remove"
                      className="cursor-pointer w-8 self-end"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {cartData?.length === 0 ? null : (
          <>
            <hr className="w-full my-4 outline-none border-black" />
            <div className="w-full mt-8 md:gap-6 flex sm:flex-col sm:gap-3 justify-between items-start">
              <div className="coupon-details space-y-2 sm:space-y-4 sm:w-full">
                <h1 className="font-[Volkhov] font-semibold text-lg">
                  Have a coupon ?
                </h1>
                <p className="text-[13px] md:text-[10px] font-[Poppins] text-[#6C7275]">
                  Add your code for an instant cart discount
                </p>
                <div
                  className={`flex gap-3 px-3 justify-between items-center border border-[#6C7275] rounded-md font-[Poppins] ${
                    appliedCoupon && "border border-green-500"
                  }`}
                >
                  <img src={couponSvg} alt="couponSvg" className="w-6 md:w-4" />
                  <input
                    type="text"
                    className="flex-1 h-full py-3 md:py-2 bg-transparent outline-none border-none text-sm md:text-xs placeholder:text-[#6C7275] uppercase "
                    placeholder="Coupon Code"
                    value={couponCode || appliedCoupon?.code}
                    disabled={appliedCoupon && true}
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                  />
                  {!appliedCoupon && (
                    <button
                      onClick={applyCoupon}
                      className="text-sm md:text-xs"
                    >
                      Apply
                    </button>
                  )}
                  {appliedCoupon && (
                    <button
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode("");
                      }}
                      className="text-sm md:text-xs"
                    >
                      remove
                    </button>
                  )}
                </div>
              </div>
              <div className="cart-summery w-[40%] md:flex-1 sm:w-full border border-[#6C7275] rounded-md p-4">
                <h1 className="font-[Volkhov] font-semibold text-xl mb-4">
                  Cart Summery
                </h1>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-[Poppins] text-black/70 tracking-wide text-sm">
                      Total Items
                    </span>
                    <span className="font-[Poppins] font-semibold text-sm">
                      {cartData?.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-[Poppins] text-black/70 tracking-wide text-sm">
                      Shipping
                    </span>
                    <span className="font-[Poppins] font-semibold text-sm">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-[Poppins] text-black/70 tracking-wide text-sm">
                      SubTotal
                    </span>
                    <span className="font-[Poppins] font-semibold text-sm">
                      ₹ {totalCartValue}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between items-center w-full">
                      <span className="font-[Poppins] text-black/70 tracking-wide text-sm">
                        {appliedCoupon?.code}
                      </span>
                      <span className="font-[Poppins] font-semibold text-sm text-green-400">
                        - ₹ {totalCartValue - discountedCartValue}
                      </span>
                    </div>
                  )}
                  <hr className="w-full my-4 outline-none border-black" />
                  <div className="flex justify-between items-center w-full">
                    <span className="font-[Poppins] text-black/70 tracking-wide font-semibold text-lg">
                      Total
                    </span>
                    <span className="font-[Poppins] font-semibold text-xl">
                      ₹ {discountedCartValue}
                    </span>
                  </div>
                  <Link
                    to={"/user/checkout"}
                    className="w-full text-center bg-black rounded-md text-white py-2 font-[Poppins] mt-2"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
