/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCategoriesAction } from "../../redux/slices/categorySlice";
import { getAllBrandsAction } from "../../redux/slices/brandSlice";
import { getAllColorsAction } from "../../redux/slices/colorSlice";
import {
  createProductAction,
  deleteProductAction,
  getAllProductsAction,
} from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../../hooks";
import editSvg from "./assets/edit.svg";
import deleteSvg from "./assets/delete.svg";
import UpdateProduct from "./UpdateProduct";

const Products = () => {
  const dispatch = useDispatch();
  const updateNotification = useNotification();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

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
  const { categories } = useSelector((state) => state?.categories?.categories);

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

  // images handling
  const [images, setImages] = useState([]);
  const [imgErrs, setImgErrs] = useState([]);
  const [productPoster, setProductPoster] = useState("");
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileErrs = [];
    files.forEach((file) => {
      if (file?.size > 1000000) {
        fileErrs.push(`${file.name} is too large!`);
      }
      if (!file?.type?.startsWith("image/")) {
        fileErrs.push(`${file.name} is not an image!`);
      }
    });
    setImages(files);
    setImgErrs(fileErrs);
    const url = URL.createObjectURL(files[0]);
    setProductPoster(url);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    sizes: "",
    brand: "",
    category: "",
    colors: "",
    totalQty: "",
  });

  const { name, description, price, brand, category, totalQty } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imgErrs.length > 0) {
      return updateNotification("error", imgErrs[0]);
    }
    dispatch(
      createProductAction({
        ...formData,
        sizes: sizeOption?.map((size) => size.label),
        colors: colorOption?.map((color) => color.label),
        images,
      })
    );
    // console.log({
    //   ...formData,
    //   sizes: sizeOption?.map((size) => size.value),
    //   colors: colorOption?.map((color) => color.label),
    //   images,
    // });
  };

  const { loading, isAdded, product, error, isDeleted } = useSelector(
    (state) => state?.products
  );

  // Getting All Products
  const { products } = useSelector((state) => state?.products.products);
  // console.log(products);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAction(id));
    }
    return;
  };

  useEffect(() => {
    dispatch(getAllProductsAction());
    if (isAdded) {
      updateNotification("success", "Product created successfully");
      setFormData({
        name: "",
        description: "",
        price: "",
        sizes: "",
        brand: "",
        category: "",
        colors: "",
        totalQty: "",
      });
      setImages([]);
      setProductPoster("");
      setSizeOption([]);
      setColorOption([]);
      setShowAddProduct(false);
    }
    if (isDeleted) {
      dispatch(getAllProductsAction());
      updateNotification("success", "Product deleted successfully");
    }
    if (error) {
      updateNotification("error", error?.message);
      setFormData({
        name: "",
        description: "",
        price: "",
        sizes: "",
        brand: "",
        category: "",
        colors: "",
        totalQty: "",
      });
      setImages([]);
      setProductPoster("");
      setSizeOption([]);
      setColorOption([]);
      setShowAddProduct(false);
    }
  }, [isAdded, error, isDeleted]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(10);

  // pagination logic
  const totalPages = Math.ceil(products?.length / perPageLimit);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * perPageLimit;
  const endIndex = startIndex + perPageLimit;

  const paginatedProducts = products?.slice(startIndex, endIndex);

  return (
    <div className="sm:overflow-x-scroll scrollbar-hide">
      <div className="w-full flex sm:flex-col justify-center items-center gap-6 md:gap-4 sm:gap-2">
        <div className="w-full flex-1 px-4 py-1 border rounded-lg">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-[Poppins]">Add product</span>
              <input
                type="checkbox"
                className="toggle"
                onChange={() => setShowAddProduct(!showAddProduct)}
              />
            </label>
          </div>
        </div>
        <div className="w-full flex-1 px-4 py-1 border rounded-lg">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-[Poppins]">Update product</span>
              <input
                type="checkbox"
                className="toggle"
                checked={showUpdateModal}
                onChange={() => setShowUpdateModal(!showUpdateModal)}
              />
            </label>
          </div>
        </div>
      </div>
      {showAddProduct && (
        <div className=" mt-8">
          <form>
            <h1 className="text-xl font-bold font-[Poppins] text-center mt-4 underline underline-offset-8">
              Add Product
            </h1>
            <div className="wrapper flex md:flex-col sm:flex-col justify-between gap-4 mt-6">
              <div className="img-container w-[40%] md:w-full space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Product Image
                </label>
                <img
                  src={productPoster}
                  alt="no_img"
                  className="img-preview w-full rounded-md"
                />
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Enter product name"
                  type="file"
                  multiple
                  accept="image/*"
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
                    name="sizes"
                    options={sizeOptionsConverted}
                    value={sizeOption}
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
                    value={colorOption}
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
                  {loading ? "Loading..." : "Add Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <UpdateProduct
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        brands={brands}
        categories={categories}
        sizeOptionsConverted={sizeOptionsConverted}
        colorOptionsConverted={colorOptionsConverted}
        sizeOption={sizeOption}
        colorOption={colorOption}
        currentProduct={currentProduct}
      />

      <div className="bg-white mt-4 rounded-lg border overflow-x-auto scrollbar-hide">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-20 w-full text-sm leading-none bg-slate-100/90">
              <th className="text-left pl-4 font-[poppins] font-semibold">#</th>
              <th className="text-left pl-4 font-[poppins] font-semibold">
                Name
              </th>
              <th className="text-left pl-10 font-[poppins] font-semibold">
                Category
              </th>
              <th className="text-left pl-4 font-[poppins] font-semibold">
                Price(₹)
              </th>
              <th className="text-left font-[poppins] font-semibold">Status</th>
              <th className="text-left font-[poppins] font-semibold">
                Quantity
              </th>
              <th className="text-left font-[poppins] font-semibold">Sold</th>
              <th className="text-left font-[poppins] font-semibold">
                Qty. Left
              </th>
              <th className="text-left w-32 font-[poppins] font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {paginatedProducts?.map((product, index) => {
              return (
                <TrComponent
                  product={product}
                  key={product?._id}
                  id={index}
                  handleDeleteProduct={handleDeleteProduct}
                  setShowUpdateModal={setShowUpdateModal}
                  setCurrentProduct={setCurrentProduct}
                />
              );
            })}
          </tbody>
        </table>
        {/* pagination */}
        <div className="join w-full flex justify-center items-center mt-8 mb-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`join-item btn btn-sm border-none rounded-l-md ${
              currentPage === 1 && "bg-gray"
            }`}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`join-item btn btn-sm border-none font-[Poppins] font-semibold text-xs flex items-center justify-center ${
                  currentPage === pageNum &&
                  "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a] hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`join-item btn btn-sm border-none rounded-r-md ${
              currentPage === totalPages && "bg-gray"
            }`}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;

export const TrComponent = ({
  id,
  product,
  handleDeleteProduct,
  setShowUpdateModal,
  setCurrentProduct,
}) => {
  const {
    _id,
    name,
    category,
    brand,
    price,
    totalQty,
    qtyLeft,
    images,
    totalSold,
  } = product;

  return (
    <tr className="h-16 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100 font-[Poppins]">
      <td className="pl-4 font-semibold">{id + 1}</td>
      <td className="pl-4">
        <div className="flex items-center">
          <img
            className="shadow-md rounded-lg object-cover w-10 h-10 mr-3"
            alt="product image"
            src={images ? images[0] : ""}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <p className="text-sm">{name}</p>
            <span className="text-[11px] opacity-85">{brand}</span>
          </div>
        </div>
      </td>
      <td>
        <p className="pl-10 text-xs">{category}</p>
      </td>
      <td>
        <p className="mr-8 pl-4">{price}</p>
      </td>
      <td>
        {qtyLeft > 0 ? (
          <div className="flex items-center justify-center w-20 h-6 bg-green-100 rounded-full mr-8">
            <p className="text-xs leading-3 text-green-600">In stock</p>
          </div>
        ) : (
          <div className="flex items-center justify-center w-20 h-6 bg-red-100 rounded-full mr-8">
            <p className="text-xs leading-3 text-red-600">Out of stock</p>
          </div>
        )}
      </td>
      <td>
        <p className="mr-16">{totalQty}</p>
      </td>
      <td>
        <p className="mr-16">{totalSold}</p>
      </td>
      <td>
        <p className="mr-16">{qtyLeft}</p>
      </td>
      <td>
        <div className="flex items-center gap-8 md:gap-4 sm:gap-4">
          <button
            onClick={() => {
              setCurrentProduct(product);
              setShowUpdateModal(true);
            }}
            className="rounded-md focus:outline-none"
          >
            <img src={editSvg} alt="editSvg" className="w-5" />
          </button>
          <button
            onClick={() => handleDeleteProduct(_id)}
            className="rounded-md focus:outline-none"
          >
            <img src={deleteSvg} alt="deleteSvg" className="w-6" />
          </button>
        </div>
      </td>
    </tr>
  );
};
