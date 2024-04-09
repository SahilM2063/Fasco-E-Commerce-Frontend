/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import card from "./assets/card.svg";
import dots from "./assets/dots.svg";

const orderStatusOptions = [
  {
    name: "Paid",
    value: "paid",
  },
  {
    name: "Pending",
    value: "pending",
  },
  {
    name: "Shipped",
    value: "shipped",
  },
  {
    name: "Delivered",
    value: "delivered",
  },
  {
    name: "Cancelled",
    value: "cancelled",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state?.orders?.orders);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(10);

  // pagination logic
  const totalPages = Math.ceil(orders?.length / perPageLimit);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * perPageLimit;
  const endIndex = startIndex + perPageLimit;

  const paginatedOrders = orders?.slice(startIndex, endIndex);

  const [openMenuId, setOpenMenuId] = useState(null);

  // Function to handle menu open
  const handleMenuOpen = (orderId) => {
    setOpenMenuId(orderId);
  };

  const updateOrderStatus = (orderId, status) => {
    console.log(orderId, status);
  };

  return (
    <div>
      <table className="w-full whitespace-nowrap overflow-hidden rounded-md ">
        <thead>
          <tr className="h-20 w-full text-sm leading-none bg-slate-100/90">
            <th className="text-left pl-4 md:pl-2 font-[poppins] font-semibold">
              #
            </th>
            <th className="text-left pl-4 md:pl-2 font-[poppins] font-semibold">
              OrderNo
            </th>
            <th className="text-left font-[poppins] font-semibold">Date</th>
            <th className="text-left leading-6 font-[poppins] font-semibold">
              Price <br /> (INR)
            </th>
            <th className="text-left font-[poppins] font-semibold">Quantity</th>
            <th className="text-left leading-6  font-[poppins] font-semibold">
              Payment <br /> Status
            </th>
            <th className="text-left leading-6  font-[poppins] font-semibold">
              Payment <br /> mode
            </th>
            <th className="text-left font-[poppins] font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {paginatedOrders?.map((order, index) => {
            return (
              <TrComponent
                order={order}
                key={order?._id}
                id={index}
                onMenuOpen={handleMenuOpen}
                isMenuOpen={openMenuId === order._id}
                updateOrderStatus={updateOrderStatus}
              />
            );
          })}
        </tbody>
      </table>

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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
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
        ))}
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
    </div>
  );
};

export default Orders;

export const TrComponent = ({
  order,
  id,
  onMenuOpen,
  isMenuOpen,
  updateOrderStatus,
}) => {
  return (
    <tr className="h-16 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100 font-[Poppins]">
      <td className="pl-4 md:pl-2 font-semibold">{id + 1}</td>
      <td className="pl-4 md:pl-2 md:text-xs">#{order?.orderNumber}</td>
      <td>
        <p className="mr-8">{order?.createdAt.slice(0, 10)}</p>
      </td>
      <td>
        <p className="mr-10 md:mr-6">{order?.totalPrice}</p>
      </td>
      <td>
        <p className="mr-12 ">
          {order?.orderItems?.reduce((acc, item) => acc + item?.quantity, 0)}
        </p>
      </td>
      <td>
        {order?.paymentStatus === "paid" ? (
          <div className="flex items-center justify-center w-20 h-6 bg-green-100 rounded-full mr-8">
            <p className="text-xs leading-3 text-green-600">Paid</p>
          </div>
        ) : (
          <div className="flex items-center justify-center w-20 h-6 bg-red-100 rounded-full mr-8">
            <p className="text-[11px] leading-3 text-red-600">Not paid</p>
          </div>
        )}
      </td>
      <td>
        {order?.paymentMethod === "card" ? (
          <p className="mr-4 flex items-center gap-2">
            {" "}
            <img src={card} alt="card" className="w-5" /> {order?.paymentMethod}
          </p>
        ) : (
          <p className="mr-4 flex items-center gap-2">{order?.paymentMethod}</p>
        )}
      </td>
      <td className="relative">
        <div
          onClick={() => {
            if (isMenuOpen) {
              onMenuOpen(null);
            } else {
              onMenuOpen(order._id);
            }
          }}
          className="cursor-pointer rounded-full w-8 h-8 bg-white shadow-lg flex items-center justify-center"
        >
          <img src={dots} alt="dots" className="w-4" />
        </div>
        {isMenuOpen && (
          <ul className="w-[100px] p-2 py-3 bg-white absolute top-0 right-full  z-[1] flex flex-col items-start gap-2 shadow-md rounded-md">
            {orderStatusOptions.map((option, index) => (
              <li
                onClick={() => {
                  onMenuOpen(null);
                  updateOrderStatus(order._id, option.value);
                }}
                key={index}
                className="text-[13px] w-full cursor-pointer"
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </td>
    </tr>
  );
};
