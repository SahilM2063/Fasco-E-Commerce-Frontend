/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderStats } from "../../redux/slices/orderSlice";
import { getAllUsersAction } from "../../redux/slices/userSlice";
import { ResponsivePie } from "@nivo/pie";

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
        id: `${item?._id?.category}`,
        label: item?._id?.category,
        value: item?.totalQuantity,
      };
    }
  );
  console.log(quantityChartData);

  const productsByDateData = orderStats?.productsSoldByDate?.map((item) => {
    return {
      Date: item?._id?.date,
      ProductsSold: item?.totalProductsSold,
    };
  });

  console.log(productsByDateData);

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

      <div className="middle-graphs w-full grid grid-cols-2 gap-6"></div>
      <div className="h-[300px]">
        {quantityChartData && quantityChartData.length > 0 && (
          <MyResponsivePie data={quantityChartData} />
        )}
      </div>
    </div>
  );
};

export default Home;

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ scheme: "blues" }}
    borderWidth={0}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#000"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
  />
);
