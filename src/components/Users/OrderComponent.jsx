/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartDataAction } from "../../redux/slices/cartSlice";
import cross from "../../assets/cross.svg";
import { Link } from "react-router-dom";
import { updateUserAddressAction } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { createOrderAction } from "../../redux/slices/orderSlice";

const OrderComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartDataAction());
  }, [dispatch]);

  const { userFound } = useSelector(
    (state) => state?.users?.userAuth?.userInfo
  );
  const { cart } = useSelector((state) => state?.cart);
  const cartData = cart?.user?.cart;

  const coupon = useSelector((state) => state?.coupons?.coupon);
  const couponData = coupon?.coupon;
  // console.log(couponData);

  const totalValue = cartData?.reduce(
    (acc, item) => acc + item?.productId?.price * item?.quantity,
    0
  );
  const offedValue = totalValue * (couponData?.discount / 100);
  const discountedValue = totalValue - (offedValue || 0);
  // console.log(totalValue, offedValue, discountedValue);

  // shipping address
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });
  const { address, city, state, postalCode, country, phoneNumber } =
    shippingAddress;

  const handleShippingAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleShippingAddressSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserAddressAction({
        ...shippingAddress,
        firstName: userFound?.firstName,
        lastName: userFound?.lastName,
        id: userFound?._id,
      })
    );
  };

  const { error, isUpdated } = useSelector((state) => state?.users);
  useEffect(() => {
    if (isUpdated) {
      toast.success("Address updated successfully");
      dispatch(getCartDataAction());
      setShippingAddress({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
      });
    }
    if (error) {
      toast.error(error);
      dispatch(getCartDataAction());
      setShippingAddress({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
      });
    }
  }, [error, isUpdated]);

  const handlePayment = (e) => {
    e.preventDefault();
    if (!cart?.user?.hasShippingAddress) {
      return toast.error("Please add a shipping address first");
    }
    console.log({
      shippingAddress: cart?.user?.shippingAddress,
      orderItems: cartData,
      totalValue: discountedValue.toFixed(2),
    });
    dispatch(
      createOrderAction({
        shippingAddress: cart?.user?.shippingAddress,
        orderItems: cartData,
        totalValue: discountedValue.toFixed(2),
      })
    );
  };

  return (
    <div className="w-full px-32 pb-6 md:px-10 sm:px-6 mt-8">
      <h1 className="font-[Volkhov] text-3xl text-center">Order Summery</h1>
      <div className="w-full flex md:flex-col sm:flex-col justify-between items-start gap-6 pt-8">
        {cart?.user?.hasShippingAddress ? (
          <div className="address w-full font-[Poppins] bg-[#F9F9F9] border border-[#8A8A8A] rounded-lg px-6 py-8">
            <div className="w-full flex items-center justify-between mb-6">
              <h1 className="font-[Volkhov] font-semibold text-xl">
                Shipping Address
              </h1>
              <Link
                to={"/user/customer"}
                className="px-3 py-1.5 bg-black text-white rounded-md text-[13px]"
              >
                Manage
              </Link>
            </div>
            <div className="space-y-1 ">
              <p className="text-sm">
                {cart?.user?.shippingAddress?.firstName +
                  " " +
                  cart?.user?.shippingAddress?.lastName}
              </p>
              <p className="text-sm">{userFound?.email}</p>
              <p className="text-sm">{userFound?.shippingAddress?.address}</p>
              <p className="text-sm">
                {cart?.user?.shippingAddress?.postalCode +
                  " , " +
                  cart?.user?.shippingAddress?.city +
                  " , " +
                  cart?.user?.shippingAddress?.state +
                  " , " +
                  cart?.user?.shippingAddress?.country}
              </p>
              <p className="text-sm">{}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Contact no.</span>
                <p className="text-sm">
                  {cart?.user?.shippingAddress?.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="address-form w-full font-[Poppins] bg-[#F9F9F9] border border-[#8A8A8A] rounded-lg p-4">
            <h1 className="font-[Volkhov] text-center font-semibold text-lg mb-4">
              Shipping Address
            </h1>
            <form>
              <div className=" input-boxes flex sm:flex-col items-center justify-between gap-4 sm:gap-1 mb-2">
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Address
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={address}
                    onChange={handleShippingAddressChange}
                  />
                </div>
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    City
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="text"
                    placeholder="Enter city"
                    name="city"
                    value={city}
                    onChange={handleShippingAddressChange}
                  />
                </div>
              </div>
              <div className="input-boxes flex sm:flex-col items-center justify-between gap-4 sm:gap-1">
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Postal Code
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="number"
                    placeholder="Enter postal code"
                    name="postalCode"
                    value={postalCode}
                    onChange={handleShippingAddressChange}
                  />
                </div>
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Phone Number
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="number"
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleShippingAddressChange}
                  />
                </div>
              </div>
              <div className="input-boxes flex sm:flex-col items-center justify-between gap-4 sm:gap-1">
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    State
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="text"
                    placeholder="Enter state"
                    name="state"
                    value={state}
                    onChange={handleShippingAddressChange}
                  />
                </div>
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Country
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="text"
                    placeholder="Enter country"
                    name="country"
                    value={country}
                    onChange={handleShippingAddressChange}
                  />
                </div>
              </div>
              <button
                onClick={handleShippingAddressSubmit}
                className="w-full py-3 bg-black rounded-md text-white mt-4 sm:mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* order summery */}
        <div className="w-full rounded-lg px-8 py-6 bg-[#F9F9F9] border border-[#8A8A8A] ">
          <h1 className="font-[Volkhov] font-semibold text-xl mb-6">
            Order Details
          </h1>
          <div className="space-y-2 font-[Poppins]">
            {cartData?.map((item) => (
              <div
                key={item?._id}
                className="w-full flex justify-between items-center"
              >
                <p className="flex items-center">
                  {item?.productId?.name}{" "}
                  <img src={cross} alt="X" className="w-6" /> {item?.quantity}
                </p>
                <span className="text-sm font-semibold">
                  ₹ {item?.productId?.price * item?.quantity}
                </span>
              </div>
            ))}
            {couponData ? (
              <div className="w-full flex justify-between items-center">
                <p className="flex items-center">{couponData?.code}</p>
                <span className="text-sm font-semibold text-green-400">
                  - ₹{offedValue}
                </span>
              </div>
            ) : null}
          </div>
          <hr className="w-full my-4 outline-none border-black" />
          <div className="w-full flex justify-between items-center font-[Poppins]">
            <p className="text-lg font-semibold">Total</p>
            <span className="text-lg font-semibold">₹ {(discountedValue).toFixed(2)}</span>
          </div>
          <button
            onClick={handlePayment}
            className="w-full py-3 bg-black rounded-md text-white mt-4 sm:mt-2"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
