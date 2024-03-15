/* eslint-disable no-unused-vars */
import { fromJSON } from "postcss";
import React, { useState } from "react";

const defaultData = {
  name: "",
  price: "",
  description: "",
  image: "",
  brand: "",
  sizes: "",
  colors: "",
  category: "",
  totalQty: "",
};

const Products = () => {
  const [formData, setFormData] = useState(defaultData);
  const {
    name,
    price,
    description,
    image,
    brand,
    sizes,
    colors,
    category,
    totalQty,
  } = formData;

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
            <img src={image} alt="no_img" className="img-preview w-full" />
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
                className="flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y"
                placeholder="Enter product description"
                type="text"
                name="category"
                value={category}
                onChange={onChangeHandler}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="men-accessories">Men-Accessories</option>
                <option value="women-accessories">Women-Accessories</option>
                <option value="kids">Kids fashion</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Sizes
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter sizes separated by comma"
                type="text"
                name="sizes"
                value={sizes}
                onChange={onChangeHandler}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Colors
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter colors separated by comma"
                type="text"
                name="colors"
                value={colors}
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
