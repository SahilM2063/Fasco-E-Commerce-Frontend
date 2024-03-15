/* eslint-disable no-unused-vars */
import { fromJSON } from "postcss";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCategoriesAction } from "../../redux/slices/categorySlice";
import { getAllBrandsAction } from "../../redux/slices/brandSlice";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  // sizes handling
  const sizes = ["S", "M", "L", "XL", "XXL", "8", "9", "10", "11", "12"];
  const [sizeOption, setSizeOption] = useState([]);
  const handleSizeChange = (sizes) => {
    setSizeOption(sizes);
  };
  const sizeOptionsConverted = sizes?.map((size) => {
    return { value: size, label: size };
  });

  // categories handling
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);
  const { categories, loading, error } = useSelector(
    (state) => state?.categories?.categories
  );

  // brands handling
  useEffect(() => {
    dispatch(getAllBrandsAction());
  }, [dispatch]);

  const onChangeHandler = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sizeOption);
  };

  return (
    <div className="w-full h-full">
      <form>
        <div className="wrapper flex md:flex-col sm:flex-col justify-between gap-4">
          <div className="img-container w-[40%] space-y-1">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Product Image
            </label>
            <img src={""} alt="no_img" className="img-preview w-full" />
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Enter product name"
              type="file"
              name="image"
              onChange={onChangeHandler}
            />
          </div>
          <div className="input-boxes flex-1 space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter product name"
                type="text"
                name="name"
                value={""}
                onChange={onChangeHandler}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Description
              </label>
              <textarea
                className="flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y"
                placeholder="Enter product description"
                type="text"
                name="description"
                value={""}
                onChange={onChangeHandler}
                rows={4}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Brand
              </label>
              <select
                className="flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y"
                placeholder="Enter product description"
                type="text"
                name="brand"
                value={""}
                onChange={onChangeHandler}
              >
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
                <option value="gucci">Gucci</option>
                <option value="channel">Channel</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Categories
              </label>
              <select
                className="flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                type="text"
                name="category"
              >
                <option defaultValue>Select category</option>
                {categories?.map((category) => {
                  return (
                    <option key={category?._id} value={category?.name}>
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Sizes
              </label>
              <Select
                isMulti
                className="basic-multi-select w-full bg-background text-sm"
                classNamePrefix="select"
                placeholder="Select sizes"
                options={sizeOptionsConverted}
                isClearable={true}
                isSearchable={true}
                closeMenuOnSelect={false}
                onChange={(item) => handleSizeChange(item)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Colors
              </label>
              <input
                className="flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter colors separated by comma"
                type="text"
                name="colors"
                value={""}
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1 w-full">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Price (INR)
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Enter product price"
                  type="number"
                  name="price"
                  value={""}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="space-y-1 w-full">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Total Quantity
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Enter product quantity"
                  type="number"
                  name="totalQty"
                  value={""}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg border-[1px] border-black"
            >
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Products;
