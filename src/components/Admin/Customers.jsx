/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import editSvg from "./assets/edit.svg";
import deleteSvg from "./assets/delete.svg";
import { getAllUsersAction } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Customers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.users?.users);
  console.log(users);

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  return (
    <div className="sm:overflow-x-scroll scrollbar-hide">
      <div className="bg-white mt-4 rounded-lg border overflow-x-auto scrollbar-hide">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-20 w-full text-sm leading-none bg-slate-100/90">
              <th className="text-left pl-4 font-[poppins] font-semibold">#</th>
              <th className="text-left pl-11 font-[poppins] font-semibold">
                Name
              </th>
              <th className="text-left pl-10 font-[poppins] font-semibold">
                Email
              </th>
              <th className="text-left font-[poppins] font-semibold">
                Joined At
              </th>
              <th className="text-left font-[poppins] font-semibold">
                IsAdmin
              </th>
              <th className="text-left font-[poppins] font-semibold">
                Total <br /> Orders
              </th>
              <th className="text-left w-32 font-[poppins] font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {users?.map((user, index) => {
              return <TrComponent user={user} key={user?._id} id={index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;

export const TrComponent = ({ id, user }) => {
  return (
    <tr className="h-16 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100 font-[Poppins]">
      <td className="pl-4 font-semibold">{id + 1}</td>
      <td className="pl-11">
        <div className="flex items-center">
          <img
            className="shadow-md rounded-full object-cover w-10 h-10 mr-3"
            alt="product image"
            src={""}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <p>{user?.firstName + " " + user?.lastName}</p>
            <span className="text-[11px] opacity-85">{""}</span>
          </div>
        </div>
      </td>
      <td>
        <p className="mr-16 pl-10">
          {user?.email?.length > 12
            ? user?.email?.slice(0, 12) + "..."
            : user?.email}
        </p>
      </td>
      <td>
        <p className="mr-16">{user?.createdAt.slice(0, 10)}</p>
      </td>
      <td>
        <p className="mr-16">{user?.isAdmin ? "Admin" : "User"}</p>
      </td>
      <td>
        <p className="mr-16">{user?.orders?.length}</p>
      </td>
      <td>
        <div className="flex items-center gap-8 md:gap-4 sm:gap-4">
          <button className="rounded-md focus:outline-none">
            <img src={editSvg} alt="editSvg" className="w-5" />
          </button>
          <button className="rounded-md focus:outline-none">
            <img src={deleteSvg} alt="deleteSvg" className="w-6" />
          </button>
        </div>
      </td>
    </tr>
  );
};
