/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAction,
  getAllCategoriesAction,
  updateCategoryAction,
} from "../../redux/slices/categorySlice";

export const AddCategory = ({ setShowAddCategory, showAddCategory }) => {
  const dispatch = useDispatch();
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    image: "",
  });

  const { name, image } = categoryFormData;
  const [catPoster, setCatPoster] = useState("");

  const handleCategoryImageChange = ({ target }) => {
    const file = target.files[0];
    setCatPoster(URL.createObjectURL(file));
    setCategoryFormData({ ...categoryFormData, image: file });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    // console.log(categoryFormData);
    dispatch(createCategoryAction(categoryFormData));
  };

  const { loading, error, isAdded, category } = useSelector(
    (state) => state?.categories
  );

  useEffect(() => {
    if (isAdded) {
      toast.success(category?.message);
      setCategoryFormData({ name: "", image: "" });
      setShowAddCategory(false);
      setCatPoster("");
      dispatch(getAllCategoriesAction());
    }
    if (error) {
      toast.error(error?.message);
      setCategoryFormData({ name: "", image: "" });
      setShowAddCategory(false);
      setCatPoster("");
      dispatch(getAllCategoriesAction());
    }
  }, [isAdded, error]);

  return (
    showAddCategory && (
      <div className="w-full h-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm ">
        <div className="w-[40%] md:w-[80%] sm:w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-black/20 rounded-lg">
          <form>
            <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
              Add Category
            </h1>
            <div className="wrapper flex flex-col justify-between gap-4 mt-6">
              <div className="img-container w-full space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Category Image
                </label>
                <img
                  src={catPoster}
                  alt="no_img"
                  className="img-preview w-[40%] rounded-md"
                />
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleCategoryImageChange}
                />
              </div>
              <div className="input-boxes flex-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Category
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter category name"
                    type="text"
                    name="category"
                    autoFocus
                    value={name}
                    onChange={(e) =>
                      setCategoryFormData({
                        ...categoryFormData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleCategorySubmit}
                    className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                  >
                    {loading ? "Loading..." : "Add Category"}
                  </button>
                  <button
                    onClick={() => setShowAddCategory(false)}
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

export const UpdateCategory = ({
  setShowUpdateCategory,
  showUpdateCategory,
  currentCategory,
}) => {
  // console.log(currentCategory);
  const dispatch = useDispatch();

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    image: "",
  });
  const [categoryUrl, setCategoryUrl] = useState("");

  useEffect(() => {
    setCategoryFormData({
      ...currentCategory,
      name: currentCategory?.name,
      image: currentCategory?.image,
    });
    if (currentCategory?.image) {
      setCategoryUrl(currentCategory?.image);
    }
  }, [currentCategory]);

  const { name, image } = categoryFormData;

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryUrl(URL.createObjectURL(file));
    setCategoryFormData({ ...categoryFormData, image: file });
  };

  const handleUpdatedCategorySubmit = (e) => {
    e.preventDefault();
    console.log(categoryFormData);
    dispatch(updateCategoryAction(categoryFormData));
  };

  const { loading, error, isUpdated, category } = useSelector(
    (state) => state?.categories
  );

  useEffect(() => {
    if (isUpdated) {
      dispatch(getAllCategoriesAction());
      setShowUpdateCategory(false);
      toast.success(category?.message);
    }
    if (error) {
      dispatch(getAllCategoriesAction());
      setShowUpdateCategory(false);
      toast.error(error?.message);
    }
  }, [isUpdated, error]);

  return (
    showUpdateCategory && (
      <div className="w-full h-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm ">
        <div className="w-[40%] md:w-[80%] sm:w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-black/20 rounded-lg">
          <form>
            <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
              Update Category
            </h1>
            <div className="wrapper flex flex-col justify-between gap-4 mt-6">
              <div className="img-container w-full space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Category Image
                </label>
                <img
                  src={categoryUrl}
                  alt="no_img"
                  className="img-preview w-[40%] rounded-md"
                />
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleCategoryImageChange}
                />
              </div>
              <div className="input-boxes flex-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Category
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter category name"
                    type="text"
                    name="category"
                    autoFocus
                    value={name}
                    onChange={(e) =>
                      setCategoryFormData({
                        ...categoryFormData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleUpdatedCategorySubmit}
                    className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg "
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button
                    onClick={() => setShowUpdateCategory(false)}
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
