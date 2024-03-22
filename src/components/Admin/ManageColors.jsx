/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../../hooks";
import {
  createColorAction,
  getAllColorsAction,
  updateColorAction,
} from "../../redux/slices/colorSlice";

export const AddColor = ({ setShowAddColor, showAddColor }) => {
  const dispatch = useDispatch();
  const updateNotification = useNotification();

  const [colorFormData, setColorFormData] = useState({ name: "" });

  const { name } = colorFormData;

  const handleColorSubmit = (e) => {
    e.preventDefault();
    console.log(colorFormData);
    dispatch(createColorAction(colorFormData));
  };

  const { loading, error, isAdded, color } = useSelector(
    (state) => state?.colors
  );

  useEffect(() => {
    if (isAdded) {
      updateNotification("success", color?.message);
      dispatch(getAllColorsAction());
      setShowAddColor(false);
      setColorFormData({ name: "" });
    }
    if (error) {
      updateNotification("error", error?.message);
      dispatch(getAllColorsAction());
      setShowAddColor(false);
      setColorFormData({ name: "" });
    }
  }, [isAdded, error]);

  return (
    showAddColor && (
      <div className="w-full h-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm ">
        <div className="w-[40%] md:w-[80%] sm:w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-black/20 rounded-lg">
          <form>
            <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
              Add Color
            </h1>
            <div className="wrapper flex flex-col justify-between gap-4 mt-6">
              <div className="input-boxes flex-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Color
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter color name"
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setColorFormData({
                        ...colorFormData,
                        name: e.target.value,
                      })
                    }
                    name="category"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleColorSubmit}
                    className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                  >
                    {loading ? "Loading..." : "Add"}
                  </button>
                  <button
                    onClick={() => setShowAddColor(false)}
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

export const UpdateColor = ({
  setShowUpdateColor,
  showUpdateColor,
  currentColor,
}) => {
  const dispatch = useDispatch();
  const updateNotification = useNotification();

  const [colorFormData, setColorFormData] = useState({ name: "" });

  useEffect(() => {
    if (currentColor) {
      setColorFormData({ ...currentColor });
    }
  }, [currentColor]);

  const { name } = colorFormData;

  const handleColorUpdateSubmit = (e) => {
    e.preventDefault();
    console.log(colorFormData);
    dispatch(updateColorAction(colorFormData));
  };

  const { loading, error, isUpdated, color } = useSelector(
    (state) => state?.colors
  );

  useEffect(() => {
    if (isUpdated) {
      updateNotification("success", color?.message);
      dispatch(getAllColorsAction());
      setShowUpdateColor(false);
      setColorFormData({ name: "" });
    }
    if (error) {
      updateNotification("error", error?.message);
      dispatch(getAllColorsAction());
      setShowUpdateColor(false);
      setColorFormData({ name: "" });
    }
  }, [isUpdated, error]);

  return (
    showUpdateColor && (
      <div className="w-full h-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm ">
        <div className="w-[40%] md:w-[80%] sm:w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-black/20 rounded-lg">
          <form>
            <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
              Update Color
            </h1>
            <div className="wrapper flex flex-col justify-between gap-4 mt-6">
              <div className="input-boxes flex-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Color
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    type="text"
                    name="category"
                    value={name}
                    onChange={(e) =>
                      setColorFormData({
                        ...colorFormData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleColorUpdateSubmit}
                    className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button
                    onClick={() => setShowUpdateColor(false)}
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
