/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import productSvg from "./assets/product 5.jpg";
import editSvg from "./assets/edit.svg";
import deleteSvg from "./assets/delete.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategoryAction,
  deleteCategoryAction,
  getAllCategoriesAction,
} from "../../redux/slices/categorySlice.js";
import {
  deleteBrandAction,
  getAllBrandsAction,
} from "../../redux/slices/brandSlice.js";
import { useNotification } from "../../hooks";
import { AddCategory, UpdateCategory } from "./ManageCategory.jsx";
import { AddBrand, UpdateBrand } from "./ManageBrand.jsx";
import { AddColor, UpdateColor } from "./ManageColors.jsx";
import {
  getAllColorsAction,
  deleteColorAction,
} from "../../redux/slices/colorSlice.js";

const Manage = () => {
  const dispatch = useDispatch();
  const updateNotifications = useNotification();

  // console.log(categories);
  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllBrandsAction());
    dispatch(getAllColorsAction());
  }, [dispatch]);

  // handling categories
  const { categories } = useSelector((state) => state?.categories?.categories);

  const [currentCategory, setCurrentCategory] = useState({});
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(id));
    }
    return;
  };

  const { loading, error, isDeleted, category } = useSelector(
    (state) => state?.categories
  );

  useEffect(() => {
    if (isDeleted) {
      updateNotifications("success", category?.message);
      dispatch(getAllCategoriesAction());
    }
    if (error) {
      updateNotifications("error", error?.message);
      dispatch(getAllCategoriesAction());
    }
  }, [isDeleted, error]);

  // handling Brands ----------------------------------------------------------------------------------------------------------------------------------------------

  const [currentBrand, setCurrentBrand] = useState({});
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showUpdateBrand, setShowUpdateBrand] = useState(false);

  const { brands } = useSelector((state) => state?.brands?.brands);
  // console.log(brands);

  const handleDeleteBrand = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      dispatch(deleteBrandAction(id));
    }
    return;
  };

  const brandData = useSelector((state) => state?.brands);

  useEffect(() => {
    if (brandData?.isDeleted) {
      updateNotifications("success", brandData?.brand?.message);
      dispatch(getAllBrandsAction());
    }
    if (brandData?.error) {
      updateNotifications("error", brandData?.error?.message);
      dispatch(getAllBrandsAction());
    }
  }, [brandData?.isDeleted, brandData?.error]);

  // Handling categories -------------------------------------------------------------------------------------------------------------------------------------------

  const [currentColor, setCurrentColor] = useState({});
  const [showAddColor, setShowAddColor] = useState(false);
  const [showUpdateColor, setShowUpdateColor] = useState(false);

  const { colors } = useSelector((state) => state?.colors?.colors);
  // console.log(brands);

  const handleDeleteColor = (id) => {
    if (window.confirm("Are you sure you want to delete this color?")) {
      dispatch(deleteColorAction(id));
    }
    return;
  };

  const colorData = useSelector((state) => state?.colors);

  useEffect(() => {
    if (colorData?.isDeleted) {
      updateNotifications("success", colorData?.color?.message);
      dispatch(getAllColorsAction());
    }
    if (colorData?.error) {
      updateNotifications("error", colorData?.error?.message);
      dispatch(getAllColorsAction());
    }
  }, [colorData?.isDeleted, colorData?.error]);

  return (
    <div className="w-full h-full relative">
      <h1 className="text-xl font-bold font-[Poppins] mb-4">Manage Category</h1>
      <div className="w-full grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 md:gap-4 sm:gap-2 font-[Poppins] overflow-hidden">
        {categories?.map((category, index) => {
          return (
            <div
              key={index}
              className="card p-4 h-[280px] border border-black/20 flex flex-col justify-between items-center rounded-lg"
            >
              <img
                src={category?.image}
                alt="product"
                className="w-full h-[80%] object-cover rounded-lg"
              />
              <div className="content w-full backdrop-blur-lg flex justify-between items-center">
                <h1 className="text-sm font-bold">{category?.name}</h1>
                <div className="flex items-center gap-2">
                  <button>
                    <img
                      src={editSvg}
                      onClick={() => {
                        setShowUpdateCategory(true);
                        setCurrentCategory(category);
                      }}
                      alt="edit"
                      className="w-5"
                    />
                  </button>
                  <button onClick={() => handleDeleteCategory(category._id)}>
                    <img src={deleteSvg} alt="delete" className="w-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <button
          onClick={() => setShowAddCategory(true)}
          className="w-full p-4 bg-black/5 rounded-lg font-semibold text-black border"
        >
          Add Category
        </button>
      </div>
      <AddCategory
        setShowAddCategory={setShowAddCategory}
        showAddCategory={showAddCategory}
      />
      <UpdateCategory
        currentCategory={currentCategory}
        showUpdateCategory={showUpdateCategory}
        setShowUpdateCategory={setShowUpdateCategory}
      />

      <h1 className="text-xl font-bold font-[Poppins] mt-8 mb-4">
        Manage Brands
      </h1>
      <div className="w-full grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 md:gap-4 sm:gap-2 font-[Poppins] overflow-hidden">
        {brands?.map((brand, index) => {
          return (
            <div
              key={index}
              className="bg-transparent border-black border-[1px] rounded-lg p-3 flex items-center justify-between "
            >
              <h1 className="text-sm font-semibold">{brand?.name}</h1>
              <div className="btns flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowUpdateBrand(true);
                    setCurrentBrand(brand);
                  }}
                >
                  <img src={editSvg} alt="edit" className="w-5" />
                </button>
                <button onClick={() => handleDeleteBrand(brand._id)}>
                  <img src={deleteSvg} alt="delete" className="w-5" />
                </button>
              </div>
            </div>
          );
        })}
        <button
          onClick={() => setShowAddBrand(true)}
          className="kbd border-black border-[1px] rounded-lg font-semibold p-3 flex items-center justify-center"
        >
          Add Brand
        </button>
      </div>
      <AddBrand setShowAddBrand={setShowAddBrand} showAddBrand={showAddBrand} />
      <UpdateBrand
        currentBrand={currentBrand}
        setShowUpdateBrand={setShowUpdateBrand}
        showUpdateBrand={showUpdateBrand}
      />

      <h1 className="text-xl font-bold font-[Poppins] mt-8 mb-4">
        Manage Colors
      </h1>
      <div className="w-full grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 md:gap-4 sm:gap-2 font-[Poppins] overflow-hidden">
        {colors?.map((color, index) => {
          return (
            <div
              key={index}
              className="bg-transparent border-black border-[1px] rounded-lg p-3 flex items-center justify-between"
            >
              <div
                className={`w-7 h-7 border-black rounded-full bg-${color.name}-500 `}
              ></div>
              <h1 className="text-sm font-semibold">{color?.name}</h1>
              <div className="btns flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowUpdateColor(true);
                    setCurrentColor(color);
                  }}
                >
                  <img src={editSvg} alt="edit" className="w-5" />
                </button>
                <button onClick={() => handleDeleteColor(color._id)}>
                  <img src={deleteSvg} alt="delete" className="w-5" />
                </button>
              </div>
            </div>
          );
        })}
        <button
          onClick={() => setShowAddColor(true)}
          className="kbd border-black border-[1px] rounded-lg font-semibold p-3 flex items-center justify-center"
        >
          Add Color
        </button>
      </div>
      <AddColor setShowAddColor={setShowAddColor} showAddColor={showAddColor} />
      <UpdateColor
        currentColor={currentColor}
        setShowUpdateColor={setShowUpdateColor}
        showUpdateColor={showUpdateColor}
      />
    </div>
  );
};

export default Manage;
