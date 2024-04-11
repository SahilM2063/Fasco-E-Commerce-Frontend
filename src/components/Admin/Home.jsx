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
        qty: item?.totalQuantity,
        label: item?._id?.category,
      };
    }
  );
  const transformedData = quantityChartData?.map((item, index) => ({
    id: `item-${index}`,
    label: item.label,
    value: item.qty,
  }));

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
        {transformedData && transformedData.length > 0 && (
          <MyResponsivePie data={transformedData} />
        )}
      </div>
    </div>
  );
};

export default Home;

export const MyResponsivePie = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};
