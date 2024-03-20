/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllProductsAction, updateProductAction } from "../../redux/slices/productSlice";
import { useDispatch } from "react-redux";

const UpdateProduct = ({
  showUpdateModal,
  currentProduct,
  brands,
  categories,
  sizeOptionsConverted,
  colorOptionsConverted,
  // handleSizeChange,
  // handleColorChange,
}) => {
  console.log(currentProduct);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    sizes: [],
    colors: [],
    price: 0,
    totalQty: 0,
    images: [],
  });
  const [productUrl, setProductUrl] = useState("");

  useEffect(() => {
    setFormData({ ...currentProduct });
    if (
      currentProduct &&
      currentProduct.images &&
      currentProduct.images.length > 0
    ) {
      setProductUrl(currentProduct.images[0]); // Assuming the first image URL is what you want to display
    }
  }, [currentProduct]);

  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    price,
    totalQty,
    images,
  } = formData;

  const handleChangeUpdateProduct = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSizeChange = (selectedSizes) => {
    const sizes = selectedSizes ? selectedSizes.map((size) => size.value) : [];
    setFormData({
      ...formData,
      sizes: sizes,
    });
  };

  const handleColorChange = (selectedColors) => {
    const colors = selectedColors
      ? selectedColors.map((color) => color.value)
      : [];
    setFormData({
      ...formData,
      colors: colors,
    });
  };

  const handleImageChange = ({ target }) => {
    const files = target.files;
    const images = Array.from(files);
    setFormData({
      ...formData,
      images: images,
    });

    const firstProduct = target.files[0];
    if (firstProduct) {
      setProductUrl(URL.createObjectURL(firstProduct));
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateProductAction(formData));
    dispatch(getAllProductsAction());
    // dispatch(getSingleProductAction(currentProduct._id));
    // setFormData({
    //   name: "",
    //   description: "",
    //   brand: "",
    //   category: "",
    //   sizes: [],
    //   colors: [],
    //   price: 0,
    //   totalQty: 0,
    //   images: [],
    // });
    // setProductUrl("");
    // setShowUpdateModal(false);
  };

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
                src={productUrl}
                alt="no_img"
                className="img-preview w-full rounded-md"
              />
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                type="file"
                multiple
                onChange={handleImageChange}
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
                  value={description}
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
                  value={brand}
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
                  value={category}
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
                  value={sizes?.map((size) =>
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
                  value={colors?.map((color) =>
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
                    value={price}
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
                    value={totalQty}
                    onChange={handleChangeUpdateProduct}
                  />
                </div>
              </div>
              <button
                onClick={handleUpdateSubmit}
                className="w-full sm:w-full py-2 space-y-2 bg-black text-white rounded-lg border-[1px] border-black"
              >
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
