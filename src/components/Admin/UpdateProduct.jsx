/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Select from "react-select";

const UpdateProduct = ({
  showUpdateModal,
  currentProduct,
  brands,
  categories,
  sizeOptionsConverted,
  colorOptionsConverted,
  handleSizeChange,
  handleColorChange,
}) => {
  console.log(currentProduct);
  const [formData, setFormData] = useState({...currentProduct});
  console.log(formData);
  const handleChangeUpdateProduct = (e) => {
    const { name, value } = e.target;
    setFormData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  //   const {
  //     name,
  //     description,
  //     category,
  //     brand,
  //     price,
  //     totalQty,
  //     images,
  //     sizes,
  //     colors,
  //   } = formData;

  return (
    showUpdateModal && (
      <div className="w-full h-auto mt-4">
        <form>
          <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
            Update Product
          </h1>
          <div className="wrapper flex md:flex-col sm:flex-col justify-between gap-4 mt-4">
            <div className="img-container w-[40%] md:w-full space-y-1">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Product Image
              </label>
              <img
                src={formData.images ? formData.images[0] : ""}
                alt="no_img"
                className="img-preview w-full rounded-md"
              />
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                type="file"
                multiple
                onChange={handleChangeUpdateProduct}
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
                  value={formData.name}
                  onChange={handleChangeUpdateProduct}
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
                  value={formData.description}
                  onChange={handleChangeUpdateProduct}
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
                  value={formData.brand}
                  onChange={handleChangeUpdateProduct}
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
                  value={formData.category}
                  onChange={handleChangeUpdateProduct}
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
                  name="sizes"
                  value={formData.sizes?.map((size) =>
                    sizeOptionsConverted?.find((item) => item.value === size)
                  )}
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
                  name="colors"
                  options={colorOptionsConverted}
                  value={formData.colors?.map((color) =>
                    colorOptionsConverted?.find((item) => item.value === color)
                  )}
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
                    value={formData.price}
                    onChange={handleChangeUpdateProduct}
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
                    value={formData.totalQty}
                    onChange={handleChangeUpdateProduct}
                  />
                </div>
              </div>
              <button className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg border-[1px] border-black">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default UpdateProduct;
