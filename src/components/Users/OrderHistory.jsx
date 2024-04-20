/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import card from "../../components/Admin/assets/card.svg";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const userId = useSelector(
    (state) => state?.users?.userAuth?.userInfo?.userFound?._id
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state?.orders?.orders);

  const filteredOrders = orders?.filter((order) => order?.user?._id === userId);
  console.log(filteredOrders);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(10);

  // pagination logic
  const totalPages = Math.ceil(filteredOrders?.length / perPageLimit);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * perPageLimit;
  const endIndex = startIndex + perPageLimit;

  const paginatedOrders = filteredOrders?.slice(startIndex, endIndex);

  return (
    <div>
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="h-20 w-full text-sm leading-none bg-slate-100/90">
            <th className="text-left pl-4 font-[poppins] font-semibold">#</th>
            <th className="text-left pl-4 font-[poppins] font-semibold">
              OrderNo
            </th>
            <th className="text-left pl-4 font-[poppins] font-semibold">
              Date
            </th>
            <th className="text-left font-[poppins] font-semibold">
              Price (INR)
            </th>
            <th className="text-left font-[poppins] font-semibold">Quantity</th>
            <th className="text-left font-[poppins] font-semibold">
              Payment Status
            </th>
            <th className="text-left font-[poppins] font-semibold">
              Payment mode
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {paginatedOrders?.map((order, index) => {
            return <TrComponent order={order} key={order?._id} id={index} />;
          })}
        </tbody>
      </table>

      {/* pagination */}
      
      {paginatedOrders?.length < perPageLimit && currentPage === 1 ? null : (
        <div className="join w-full flex justify-center items-center mt-8 mb-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`join-item btn btn-sm border-none rounded-l-md ${
              currentPage === 1 && "bg-gray"
            }`}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`join-item btn btn-sm border-none font-[Poppins] font-semibold text-xs flex items-center justify-center ${
                  currentPage === pageNum &&
                  "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a] hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`join-item btn btn-sm border-none rounded-r-md ${
              currentPage === totalPages && "bg-gray"
            }`}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

export const TrComponent = ({ order, id }) => {
  const renderPaymentStatus = (paymentStatus) => {
    switch (paymentStatus) {
      case "paid":
        return (
          <div className="flex items-center justify-center w-20 h-6 bg-green-500 rounded-full mr-8">
            <p className="text-xs leading-3 text-white">Paid</p>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center justify-center w-20 h-6 bg-yellow-500 rounded-full mr-8">
            <p className="text-[11px] leading-3 text-white">Pending</p>
          </div>
        );
      case "shipped":
        return (
          <div className="flex items-center justify-center w-20 h-6 bg-blue-500 rounded-full mr-8">
            <p className="text-[11px] leading-3 text-white">Shipped</p>
          </div>
        );
      case "delivered":
        return (
          <div className="flex items-center justify-center w-20 h-6 bg-green-500 rounded-full mr-8">
            <p className="text-[11px] leading-3 text-white">Delivered</p>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-20 h-6 bg-red-500 rounded-full mr-8">
            <p className="text-[11px] leading-3 text-white">Cancelled</p>
          </div>
        );
    }
  };

  return (
    <tr className="h-16 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100 font-[Poppins]">
      <td className="pl-4 font-semibold">{id + 1}</td>
      <td className="pl-4">#{order?.orderNumber}</td>
      <td>
        <p className="mr-8 pl-4">{order?.createdAt.slice(0, 10)}</p>
      </td>
      <td>
        <p className="mr-16 ">{order?.totalPrice}</p>
      </td>
      <td>
        <p className="mr-16 ">
          {order?.orderItems?.reduce((acc, item) => acc + item?.quantity, 0)}
        </p>
      </td>
      <td>
        <p className="mr-8">{renderPaymentStatus(order?.status)}</p>
      </td>
      <td>
        <p className="mr-8">
          {" "}
          {order?.paymentMethod === "card" ? (
            <p className="mr-4 flex items-center gap-2">
              {" "}
              <img src={card} alt="card" className="w-5" />{" "}
              {order?.paymentMethod}
            </p>
          ) : (
            <p className="mr-4 flex items-center gap-2">
              {order?.paymentMethod}
            </p>
          )}
        </p>
      </td>
    </tr>
  );
};
