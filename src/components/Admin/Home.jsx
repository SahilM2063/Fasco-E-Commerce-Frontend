/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderStats } from "../../redux/slices/orderSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderStats());
  }, [dispatch]);

  return (
    <div>
      <div className="statsLine w-full grid grid-cols-4 gap-6">
        <div className="p-6 bg-[#E3F5FF] rounded-2xl flex flex-col justify-between items-start gap-3">
          <h1 className="font-[Poppins] font-semibold">Total Sales</h1>
          <span className="font-[Poppins] text-3xl font-bold">₹ 100K</span>
        </div>
        <div className="p-6 bg-[#E5ECF6] rounded-2xl flex flex-col justify-between items-start gap-3">
          <h1 className="font-[Poppins] font-semibold">Total Orders</h1>
          <span className="font-[Poppins] text-3xl font-bold">456</span>
        </div>
        <div className="p-6 bg-[#E3F5FF] rounded-2xl flex flex-col justify-between items-start gap-3">
          <h1 className="font-[Poppins] font-semibold">Avg. Order</h1>
          <span className="font-[Poppins] text-3xl font-bold">₹ 879.89</span>
        </div>
        <div className="p-6 bg-[#E5ECF6] rounded-2xl flex flex-col justify-between items-start gap-3">
          <h1 className="font-[Poppins] font-semibold">Active Users</h1>
          <span className="font-[Poppins] text-3xl font-bold">340</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
