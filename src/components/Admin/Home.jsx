/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderStats } from "../../redux/slices/orderSlice";
import { getAllUsersAction } from "../../redux/slices/userSlice";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";

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

  const productsByDateData =
    orderStats?.productsSoldByDate?.length > 0
      ? [
          {
            id: "Products Sold By Date",
            data: [...orderStats.productsSoldByDate] // Shallow copy the array
              .sort((a, b) => b._id.date - a._id.date) // Sort the copied array
              .map((item) => ({
                x: item._id.date,
                y: item.totalProductsSold,
              })),
          },
        ]
      : [];

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

      <div className="middle-graphs w-full grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 md:gap-0 sm:gap-0">
        <div className="h-[330px] border rounded-lg mt-4 px-3 py-2">
          <span className="font-[Poppins] font-semibold tracking-wide text-xs">
            Products sold by category
          </span>
          {quantityChartData && quantityChartData.length > 0 && (
            <MyResponsivePie data={quantityChartData} />
          )}
        </div>
        <div className="h-[330px] border rounded-lg mt-4 px-3 py-2">
          <span className="font-[Poppins] font-semibold tracking-wide text-xs">
            Products sold by category
          </span>
          {productsByDateData && productsByDateData?.length > 0 && (
            <MyResponsiveLine data={productsByDateData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.6}
    padAngle={0.5}
    cornerRadius={5}
    arcLinkLabelsColor={{
      from: "color",
    }}
    arcLinkLabelsThickness={3}
    arcLinkLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 1.2]],
    }}
    activeOuterRadiusOffset={8}
    colors={{ scheme: "purple_orange" }}
    borderWidth={0}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor="#FFFFFF"
  />
);

const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    curve="monotoneX"
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    pointSize={10}
    colors={{ scheme: "purple_orange" }}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    useMesh={true}
  />
);
