/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import productSvg from "./assets/product 5.jpg";
import editSvg from "./assets/edit.svg";
import deleteSvg from "./assets/delete.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCategoryAction,
  getAllCategoriesAction,
} from "../../redux/slices/categorySlice.js";
import { useNotification } from "../../hooks";

const Manage = () => {
  const dispatch = useDispatch();
  const updateNotifications = useNotification();
  const { categories } = useSelector((state) => state?.categories?.categories);
  console.log(categories);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(id));
    }
    return;
  };

  const { loading, error, isDeleted } = useSelector(
    (state) => state?.categories
  );

  useEffect(() => {
    if (isDeleted) {
      updateNotifications("success", "Category deleted successfully");
      dispatch(getAllCategoriesAction());
    }
    if (error) {
      updateNotifications("error", error?.message);
      dispatch(getAllCategoriesAction());
    }
  }, [isDeleted, error]);

  return (
    <div className="w-full h-full">
      <h1 className="text-xl font-bold font-[Poppins] mb-4">Manage Category</h1>
      <div className="w-full grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 md:gap-4 sm:gap-2 font-[Poppins] overflow-hidden">
        {categories?.map((category, index) => {
          return (
            <div
              key={index}
              className="card p-4 h-[280px] border border-black/20 flex flex-col justify-between items-center rounded-lg"
            >
              <img
                src={productSvg}
                alt="product"
                className="w-full h-[80%] object-cover rounded-lg"
              />
              <div className="content w-full backdrop-blur-lg flex justify-between items-center">
                <h1 className="text-md font-bold">{category?.name}</h1>
                <div className="flex items-center gap-2">
                  <button>
                    <img src={editSvg} alt="edit" className="w-5" />
                  </button>
                  <button onClick={() => handleDeleteCategory(category._id)}>
                    <img src={deleteSvg} alt="delete" className="w-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Manage;
