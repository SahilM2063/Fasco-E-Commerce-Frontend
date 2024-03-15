/* eslint-disable no-unused-vars */
import { fromJSON } from "postcss";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCategoriesAction } from "../../redux/slices/categorySlice";
import { getAllBrandsAction } from "../../redux/slices/brandSlice";
import { getAllColorsAction } from "../../redux/slices/colorSlice";
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
  const {
    brands: { brands },
  } = useSelector((state) => state?.brands);

  // colors handling
  const [colorOption, setColorOption] = useState([]);
  const {
    colors: { colors },
  } = useSelector((state) => state?.colors);
  useEffect(() => {
    dispatch(getAllColorsAction());
  }, [dispatch]);
  const handleColorChange = (colors) => {
    setColorOption(colors);
  };
  const colorOptionsConverted = colors?.map((color) => {
    return { value: color?.name, label: color?.name };
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    brand: "",
    category: "",
    color: "",
    totalQty: "",
  });

  const { name, description, price, brand, category, totalQty } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
                value={name}
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
                value={description}
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
                value={brand}
                onChange={onChangeHandler}
              >
                <option defaultValue>Select brand</option>
                {brands?.map((brand) => {
                  return (
                    <option key={brand?._id} value={brand?.name}>
                      {brand?.name}
                    </option>
                  );
                })}
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
                value={category}
                onChange={onChangeHandler}
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
              <Select
                isMulti
                className="basic-multi-select w-full bg-background text-sm"
                classNamePrefix="select"
                placeholder="Select colors"
                options={colorOptionsConverted}
                isClearable={true}
                isSearchable={true}
                closeMenuOnSelect={false}
                onChange={(item) => handleColorChange(item)}
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
                  value={price}
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
                  value={totalQty}
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
