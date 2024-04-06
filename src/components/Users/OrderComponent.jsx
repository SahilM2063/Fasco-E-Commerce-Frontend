/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartDataAction } from "../../redux/slices/cartSlice";
import cross from "../../assets/cross.svg";
import { Link } from "react-router-dom";

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
  console.log(couponData);

  return (
    <div className="w-full px-32 pb-6 md:px-10 sm:px-6 mt-8">
      <h1 className="font-[Volkhov] text-3xl text-center">Order Summery</h1>
      <div className="w-full flex justify-between items-start gap-6 pt-8">
        {userFound?.hasShippingAddress ? (
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
                {userFound?.shippingAddress?.firstName +
                  " " +
                  userFound?.shippingAddress?.lastName}
              </p>
              <p className="text-sm">{userFound?.email}</p>
              <p className="text-sm">{userFound?.shippingAddress?.address}</p>
              <p className="text-sm">
                {userFound?.shippingAddress?.postalCode +
                  " , " +
                  userFound?.shippingAddress?.city +
                  " , " +
                  userFound?.shippingAddress?.state +
                  " , " +
                  userFound?.shippingAddress?.country}
              </p>
              <p className="text-sm">{}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Contact no.</span>
                <p className="text-sm">
                  {userFound?.shippingAddress?.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="address-form w-full font-[Poppins] border rounded-lg p-4">
            <h1 className="font-[Volkhov] text-center font-semibold text-lg mb-4">
              Shipping Address
            </h1>
            <form>
              <div className=" input-boxes flex sm:flex-col items-center justify-between gap-4 mb-2">
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Address
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="text"
                    name="address"
                  />
                </div>
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    City
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="text"
                    name="city"
                  />
                </div>
              </div>
              <div className="input-boxes flex sm:flex-col items-center justify-between gap-4 mb-2">
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Postal Code
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="number"
                    name="postalCode"
                  />
                </div>
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Phone Number
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="number"
                    name="phoneNumber"
                  />
                </div>
              </div>
              <div className="input-boxes flex sm:flex-col items-center justify-between gap-4 mb-2">
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    State
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="text"
                    name="state"
                  />
                </div>
                <div className="space-y-1 flex-1 sm:w-full">
                  <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Country
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#8A8A8A] bg-background px-3 py-2 text-sm"
                    type="text"
                    name="country"
                  />
                </div>
              </div>
              <button className="w-full py-3 bg-black rounded-md text-white mt-2">
                Submit
              </button>
            </form>
          </div>
        )}

        {/* order summery */}
        <div className="w-full rounded-lg p-8 bg-[#F9F9F9] border border-[#8A8A8A] ">
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
                  - ₹{" "}
                  {(cart?.user?.totalCartValue * couponData?.discount) / 100}
                </span>
              </div>
            ) : null}
          </div>
          <hr className="w-full my-4 outline-none border-black" />
          <div className="w-full flex justify-between items-center font-[Poppins]">
            <p className="text-lg font-semibold">Total</p>
            <span className="text-lg font-semibold">
              ₹{" "}
              {cartData?.reduce(
                (acc, item) => acc + item?.productId?.price * item?.quantity,
                0
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
