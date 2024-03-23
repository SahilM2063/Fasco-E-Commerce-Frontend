/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../../hooks";
import {
  createBrandAction,
  getAllBrandsAction,
  updateBrandAction,
} from "../../redux/slices/brandSlice";

export const AddBrand = ({ setShowAddBrand, showAddBrand }) => {
  const dispatch = useDispatch();
  const updateNotification = useNotification();

  const [brandFormData, setBrandFormData] = useState({ name: "" });

  const { name } = brandFormData;

  const handleBrandSubmit = (e) => {
    e.preventDefault();
    console.log(brandFormData);
    dispatch(createBrandAction(brandFormData));
  };

  const { loading, error, isAdded, brand } = useSelector(
    (state) => state?.brands
  );

  useEffect(() => {
    if (isAdded) {
      updateNotification("success", brand?.message);
      dispatch(getAllBrandsAction());
      setShowAddBrand(false);
      setBrandFormData({ name: "" });
    }
    if (error) {
      updateNotification("error", error?.message);
      dispatch(getAllBrandsAction());
      setShowAddBrand(false);
      setBrandFormData({ name: "" });
    }
  }, [isAdded, error]);

  return (
    showAddBrand && (
      <div className="w-full h-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm ">
        <div className="w-[40%] md:w-[80%] sm:w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-black/20 rounded-lg">
          <form>
            <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
              Add Brand
            </h1>
            <div className="wrapper flex flex-col justify-between gap-4 mt-6">
              <div className="input-boxes flex-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Brand
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter category name"
                    type="text"
                    autoFocus
                    value={name}
                    onChange={(e) =>
                      setBrandFormData({
                        ...brandFormData,
                        name: e.target.value,
                      })
                    }
                    name="category"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBrandSubmit}
                    className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                  >
                    {loading ? "Loading..." : "Add"}
                  </button>
                  <button
                    onClick={() => setShowAddBrand(false)}
                    className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export const UpdateBrand = ({
  setShowUpdateBrand,
  showUpdateBrand,
  currentBrand,
}) => {
  const dispatch = useDispatch();
  const updateNotification = useNotification();

  const [brandFormData, setBrandFormData] = useState({ name: "" });

  useEffect(() => {
    if (currentBrand) {
      setBrandFormData({ ...currentBrand });
    }
  }, [currentBrand]);

  const { name } = brandFormData;

  const handleBrandUpdateSubmit = (e) => {
    e.preventDefault();
    console.log(brandFormData);
    dispatch(updateBrandAction(brandFormData));
  };

  const { loading, error, isUpdated, brand } = useSelector(
    (state) => state?.brands
  );

  useEffect(() => {
    if (isUpdated) {
      updateNotification("success", brand?.message);
      dispatch(getAllBrandsAction());
      setShowUpdateBrand(false);
      setBrandFormData({ name: "" });
    }
    if (error) {
      updateNotification("error", error?.message);
      dispatch(getAllBrandsAction());
      setShowUpdateBrand(false);
      setBrandFormData({ name: "" });
    }
  }, [isUpdated, error]);

  return (
    showUpdateBrand && (
      <div className="w-full h-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm ">
        <div className="w-[40%] md:w-[80%] sm:w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-black/20 rounded-lg">
          <form>
            <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
              Update Brand
            </h1>
            <div className="wrapper flex flex-col justify-between gap-4 mt-6">
              <div className="input-boxes flex-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Brand
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter category name"
                    type="text"
                    name="category"
                    autoFocus
                    value={name}
                    onChange={(e) =>
                      setBrandFormData({
                        ...brandFormData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBrandUpdateSubmit}
                    className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button
                    onClick={() => setShowUpdateBrand(false)}
                    className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
