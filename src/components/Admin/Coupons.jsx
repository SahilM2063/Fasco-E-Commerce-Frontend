/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import editSvg from "./assets/edit.svg";
import deleteSvg from "./assets/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  createCouponAction,
  geAllCouponsAction,
  updateCouponAction,
} from "../../redux/slices/couponSlice.js";
import { toast } from "react-toastify";

const Coupons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(geAllCouponsAction());
  }, [dispatch]);

  const { coupons } = useSelector((state) => state?.coupons?.coupons);

  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [showUpdateCoupon, setShowUpdateCoupon] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState();

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(10);

  // pagination logic
  const totalPages = Math.ceil(coupons?.length / perPageLimit);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * perPageLimit;
  const endIndex = startIndex + perPageLimit;

  const paginatedCoupons = coupons?.slice(startIndex, endIndex);

  return (
    <div className="sm:overflow-x-scroll scrollbar-hide">
      <div className="w-full flex justify-between items-center">
        <span>Coupons</span>
        <button
          onClick={() => setShowAddCoupon(true)}
          className="px-4 text-sm bg-black rounded-md text-white py-2 font-[Poppins] mt-2"
        >
          Create Coupon
        </button>
      </div>
      <AddCoupon
        setShowAddCoupon={setShowAddCoupon}
        showAddCoupon={showAddCoupon}
      />
      <UpdateCoupon
        setShowUpdateCoupon={setShowUpdateCoupon}
        showUpdateCoupon={showUpdateCoupon}
        currentCoupon={currentCoupon}
      />
      <div className="bg-white mt-4 rounded-lg border overflow-x-auto scrollbar-hide">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-20 w-full text-sm leading-none bg-slate-100/90">
              <th className="text-left pl-4 font-[poppins] font-semibold">#</th>
              <th className="text-left pl-11 font-[poppins] font-semibold">
                Coupon Code
              </th>
              <th className="text-left pl-10 font-[poppins] font-semibold">
                Discount
              </th>
              <th className="text-left font-[poppins] font-semibold">Status</th>
              <th className="text-left font-[poppins] font-semibold">
                Duration
              </th>
              <th className="text-left font-[poppins] font-semibold">
                Start Date
              </th>
              <th className="text-left font-[poppins] font-semibold">
                End Date
              </th>
              <th className="text-left w-32 font-[poppins] font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {paginatedCoupons?.map((coupon, index) => {
              return (
                <TrComponent
                  coupon={coupon}
                  key={coupon?._id}
                  id={index}
                  setShowUpdateCoupon={setShowUpdateCoupon}
                  setCurrentCoupon={setCurrentCoupon}
                />
              );
            })}
          </tbody>
        </table>
        {/* pagination */}
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
      </div>
    </div>
  );
};

export default Coupons;

export const TrComponent = ({
  id,
  coupon,
  setShowUpdateCoupon,
  setCurrentCoupon,
}) => {
  return (
    <tr className="h-16 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100 font-[Poppins]">
      <td className="pl-4 font-semibold">{id + 1}</td>
      <td className="pl-11">
        <p>{coupon?.code}</p>
      </td>
      <td>
        <p className="mr-16 pl-10">{coupon?.discount}%</p>
      </td>
      <td>
        <div className="">
          {coupon?.isExpired ? (
            <div className="flex items-center justify-center w-20 h-6 bg-red-100 rounded-full mr-8">
              <p className="text-xs leading-3 text-red-600">Expired</p>
            </div>
          ) : (
            <div className="flex items-center justify-center w-20 h-6 bg-green-100 rounded-full mr-8">
              <p className="text-xs leading-3 text-green-600">Active</p>
            </div>
          )}
        </div>
      </td>
      <td>
        <p className="mr-16">4 days</p>
      </td>
      <td>
        <p className="mr-16">{coupon?.startDate.slice(0, 10)}</p>
      </td>
      <td>
        <p className="mr-16">{coupon?.endDate.slice(0, 10)}</p>
      </td>
      <td>
        <div className="flex items-center gap-8 md:gap-4 sm:gap-4">
          <button
            onClick={() => {
              setShowUpdateCoupon(true);
              setCurrentCoupon(coupon);
            }}
            className="rounded-md focus:outline-none"
          >
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

export const AddCoupon = ({ showAddCoupon, setShowAddCoupon }) => {
  const dispatch = useDispatch();
  const [couponFormData, setCouponFormData] = useState({
    code: "",
    discount: 0,
    startDate: "",
    endDate: "",
  });

  const { code, discount, startDate, endDate } = couponFormData;

  const handleAddCouponChange = (e) => {
    setCouponFormData({
      ...couponFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCouponSubmit = (e) => {
    e.preventDefault();
    dispatch(createCouponAction(couponFormData));
  };

  const { loading, isAdded, coupon, error } = useSelector(
    (state) => state?.coupons
  );

  useEffect(() => {
    if (isAdded) {
      toast.success(coupon?.message);
      setShowAddCoupon(false);
      setCouponFormData({
        code: "",
        discount: 0,
        startDate: "",
        endDate: "",
      });
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [isAdded, coupon, error]);

  return (
    showAddCoupon && (
      <div className="w-full h-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="w-[40%] md:w-[80%] sm:w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-black/20 rounded-lg">
          <form>
            <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
              Add Coupon
            </h1>
            <div className="wrapper flex flex-col justify-between gap-2 mt-6">
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Coupon Code
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter coupon code"
                    type="text"
                    name="code"
                    value={code}
                    onChange={handleAddCouponChange}
                    autoFocus
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Discount
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter discount"
                    type="number"
                    name="discount"
                    value={discount}
                    onChange={handleAddCouponChange}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Start Date
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleAddCouponChange}
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    End Date
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={handleAddCouponChange}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={handleAddCouponSubmit}
                  className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                >
                  {loading ? "Adding..." : "Add"}
                </button>
                <button
                  onClick={() => {
                    setShowAddCoupon(false);
                  }}
                  className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export const UpdateCoupon = ({
  showUpdateCoupon,
  setShowUpdateCoupon,
  currentCoupon,
}) => {
  const dispatch = useDispatch();
  const [couponFormData, setCouponFormData] = useState({});
  useEffect(() => {
    if (currentCoupon) {
      const formattedStartDate = new Date(currentCoupon.startDate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(currentCoupon.endDate)
        .toISOString()
        .split("T")[0];
      setCouponFormData({
        ...currentCoupon,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    }
  }, [currentCoupon]);

  const { code, discount, startDate, endDate } = couponFormData;

  const handleUpdateCouponChange = (e) => {
    setCouponFormData({
      ...couponFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateCouponSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCouponAction(couponFormData));
  };

  const { loading, error, isUpdated, coupon } = useSelector(
    (state) => state?.coupons
  );

  useEffect(() => {
    if (isUpdated) {
      toast.success(coupon?.message);
      setShowUpdateCoupon(false);
      dispatch(geAllCouponsAction());
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [isUpdated, coupon, error]);

  return (
    showUpdateCoupon && (
      <div className="w-full h-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="w-[40%] md:w-[80%] sm:w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-black/20 rounded-lg">
          <form>
            <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
              Update Coupon
            </h1>
            <div className="wrapper flex flex-col justify-between gap-2 mt-6">
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Coupon Code
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter coupon code"
                    type="text"
                    name="code"
                    value={code}
                    onChange={handleUpdateCouponChange}
                    autoFocus
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Discount
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter discount"
                    type="text"
                    name="discount"
                    value={discount}
                    onChange={handleUpdateCouponChange}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Start Date
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleUpdateCouponChange}
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    End Date
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={handleUpdateCouponChange}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={handleUpdateCouponSubmit}
                  className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => setShowUpdateCoupon(false)}
                  className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
