/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderStats } from "../../redux/slices/orderSlice";
import { getAllUsersAction } from "../../redux/slices/userSlice";
import { Tiny } from "@ant-design/plots";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersAction());
    dispatch(getAllOrders());
    dispatch(getOrderStats());
  }, [dispatch]);

  const { orderStats } = useSelector((state) => state?.orders);
  const mainData = orderStats?.orderStats?.[0];
  // console.log(mainData);

  const { users } = useSelector((state) => state?.users?.users);

  // Quantity chart data
  const quantityChartData = orderStats?.quantityByProductAndCategory?.map(
    (item) => {
      return {
        qty: item?.totalQuantity,
        label: item?._id?.category,
      };
    }
  );

  console.log(quantityChartData);

  const config = {
    data: quantityChartData,
    width: 480,
    height: 80,
    padding: 8,
    shapeField: "smooth",
    xField: "label",
    yField: "qty",
    style: {
      fill: "linear-gradient(-90deg, white 0%, #E5ECF6 100%)",
      fillOpacity: 0.6,
    },
  };

  return (
    <div>
      <div className="statsLine w-full grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
        <div className="p-6 bg-[#E3F5FF] rounded-2xl flex flex-col justify-between items-start gap-3">
          <h1 className="font-[Poppins] font-semibold">Total Sales</h1>
          <span className="font-[Poppins] text-3xl font-bold">
            ₹ {mainData?.sumOfSales}
          </span>
        </div>
        <div className="p-6 bg-[#E5ECF6] rounded-2xl flex flex-col justify-between items-start gap-3">
          <h1 className="font-[Poppins] font-semibold">Total Orders</h1>
          <span className="font-[Poppins] text-3xl font-bold">
            {mainData?.totalOrders}
          </span>
        </div>
        <div className="p-6 bg-[#E3F5FF] rounded-2xl flex flex-col justify-between items-start gap-3">
          <h1 className="font-[Poppins] font-semibold">Avg. Order</h1>
          <span className="font-[Poppins] text-3xl font-bold">
            ₹ {mainData?.averageOrder?.toFixed(2)}
          </span>
        </div>
        <div className="p-6 bg-[#E5ECF6] rounded-2xl flex flex-col justify-between items-start gap-3">
          <h1 className="font-[Poppins] font-semibold">Active Users</h1>
          <span className="font-[Poppins] text-3xl font-bold">
            {users?.length}
          </span>
        </div>
      </div>

      <Tiny.Area {...config} />
    </div>
  );
};

export default Home;
