/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAction } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import downSvg from "../../assets/down.svg";
import filterSVg from "../../assets/filter.svg";
import closeMenu from "../../assets/closeMenu.svg";
import { getAllCategoriesAction } from "../../redux/slices/categorySlice";
import { getAllBrandsAction } from "../../redux/slices/brandSlice";
import { getAllColorsAction } from "../../redux/slices/colorSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting all brands, categories, colors and products dynamically
  useEffect(() => {
    dispatch(getAllProductsAction());
    dispatch(getAllCategoriesAction());
    dispatch(getAllBrandsAction());
    dispatch(getAllColorsAction());
  }, [dispatch]);

  // state for mobile sized filter option
  const [showFilter, setShowFilter] = useState(false);

  // fetching all data from states
  const { products } = useSelector((state) => state?.products?.products);
  const { categories } = useSelector((state) => state?.categories?.categories);
  const { brands } = useSelector((state) => state?.brands?.brands);
  const { colors } = useSelector((state) => state?.colors?.colors);
  // some hardcoded data
  const sizes = ["S", "M", "L", "XL", "XXL", "8", "9", "10", "11", "12"];
  const priceOptions = [
    {
      amount: "0-500",
    },
    {
      amount: "500-1000",
    },
    {
      amount: "1000-2500",
    },
    {
      amount: "2500-5000",
    },
    {
      amount: "5000 above",
    },
  ];
  const sortOptions = [
    {
      label: "Price: Low to High",
    },
    {
      label: "Price: High to Low",
    },
    {
      label: "Newest",
    },
    {
      label: "Oldest",
    },
    {
      label: "Best Rating",
    },
  ];

  // dropdown state for category and brand
  const [showCategory, setShowCategory] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  // state for selected filters
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(15);

  // handle selected  filters change

  const handleSizeSelect = (size) => {
    setSelectedSizes((prevSizes) => {
      const newSizes = prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size];
      console.log("Previous Sizes:", prevSizes);
      console.log("New Sizes:", newSizes);
      return newSizes;
    });
  };

  const handleColorSelect = (color) => {
    setSelectedColors((prevColors) => {
      const newColors = prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color];
      console.log("Previous Colors:", prevColors);
      console.log("New Colors:", prevColors);
      return newColors;
    });
  };

  const handlePriceRangeSelect = (priceRange) => {
    selectedPriceRange === priceRange
      ? setSelectedPriceRange("")
      : setSelectedPriceRange(priceRange);
  };

  const handleBrandSelect = (brand) => {
    selectedBrand === brand ? setSelectedBrand("") : setSelectedBrand(brand);
  };

  const handleCategorySelect = (category) => {
    selectedCategory === category
      ? setSelectedCategory("")
      : setSelectedCategory(category);
  };

  // filtering products - main logic -----------------------------------------------------------------------------------
  const filteredProducts = products?.filter((product) => {
    if (selectedPriceRange === "") {
      if (
        selectedSizes.length > 0 ||
        selectedColors.length > 0 ||
        selectedBrand !== "" ||
        selectedCategory !== ""
      ) {
        return (
          (selectedSizes.length === 0 ||
            selectedSizes.every((size) => product?.sizes?.includes(size))) &&
          (selectedColors.length === 0 ||
            selectedColors.every((color) =>
              product?.colors?.includes(color)
            )) &&
          (selectedBrand === "" || product.brand === selectedBrand) &&
          (selectedCategory === "" || product.category === selectedCategory)
        );
      } else {
        return true;
      }
    } else {
      if (selectedPriceRange === "5000 above") {
        return (
          product.price >= 5000 &&
          (selectedSizes.length === 0 ||
            selectedSizes.every((size) => product?.sizes?.includes(size))) &&
          (selectedColors.length === 0 ||
            selectedColors.every((color) =>
              product?.colors?.includes(color)
            )) &&
          (selectedBrand === "" || product.brand === selectedBrand) &&
          (selectedCategory === "" || product.category === selectedCategory)
        );
      } else {
        const [min, max] = selectedPriceRange.split("-").map(Number);
        return (
          product.price >= min &&
          product.price <= max &&
          (selectedSizes.length === 0 ||
            selectedSizes.every((size) => product?.sizes?.includes(size))) &&
          (selectedColors.length === 0 ||
            selectedColors.every((color) =>
              product?.colors?.includes(color)
            )) &&
          (selectedBrand === "" || product.brand === selectedBrand) &&
          (selectedCategory === "" || product.category === selectedCategory)
        );
      }
    }
  });

  // reset filters
  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPriceRange("");
    setSelectedBrand("");
    setSelectedCategory("");
    setShowBrand(false);
    setShowCategory(false);
  };

  // sort state for products
  const [selectedSortOption, setSelectedSortOption] = useState("");

  // handle sort change
  const handleSortChange = (selectedOption) => {
    setSelectedSortOption(selectedOption);
  };

  // sort products - second main logic ---------------------------------------------------------------------------------
  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (selectedSortOption === "Price: Low to High") {
      return a.price - b.price;
    } else if (selectedSortOption === "Price: High to Low") {
      return b.price - a.price;
    } else if (selectedSortOption === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (selectedSortOption === "Oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (selectedSortOption === "Best Rating") {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  // pagination logic and handling changes
  const totalPages = Math.ceil(sortedProducts?.length / perPageLimit);

  const startIndex = (currentPage - 1) * perPageLimit;
  const endIndex = startIndex + perPageLimit;

  const paginatedProducts = sortedProducts?.slice(startIndex, endIndex);

  // handling pagination change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full min-h-screen px-32 md:px-10 sm:px-6 my-6 flex">
      <div
        className={`filter-sec min-h-screen sm:shadow-lg sm:min-h-auto pb-20 bg-white w-[20%] sm:w-full sm:absolute sm:right-0 sm:z-10 sm:px-4 sm:${
          showFilter ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-[Volkhov] font-semibold tracking-wide">
            Filters
          </h1>
          <img
            onClick={() => setShowFilter(false)}
            src={closeMenu}
            alt="close"
            className="cursor-pointer w-8 h-8 sm:block hidden"
          />
        </div>
        <div className="space-y-8">
          <div className="filter space-y-3">
            <h1 className="text-md font-[Volkhov] font-semibold tracking-wide">
              Sizes
            </h1>
            <div className="flex w-full items-center justify-start gap-2 flex-wrap">
              {sizes.map((size, index) => {
                return (
                  <span
                    key={index}
                    className={`text-xs text-[#8A8A8A] hover:border-[#484848] hover:text-black rounded-[5px] cursor-pointer font-[Poppins] border-[1px] border-black w-8 h-8 flex items-center justify-center ${
                      selectedSizes.includes(size) &&
                      "bg-[#000] text-white hover:text-white"
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="filter space-y-3">
            <h1 className="text-md font-[Volkhov] font-semibold tracking-wide">
              Colors
            </h1>
            <div className="flex w-full items-center justify-start gap-2 flex-wrap">
              {colors?.map((color, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => handleColorSelect(color?.name)}
                    className={`text-xs rounded-full cursor-pointer shadow-md w-8 h-8 ${
                      selectedColors.includes(color?.name) &&
                      "border-2 border-[#000] "
                    }`}
                    title={color?.name}
                    style={{ backgroundColor: color?.name }}
                  ></span>
                );
              })}
            </div>
          </div>
          <div className="filter space-y-3">
            <h1 className="text-md font-[Volkhov] font-semibold tracking-wide">
              Prices
            </h1>
            <div className="flex flex-col w-full items-start justify-start gap-2 flex-wrap">
              {priceOptions.map((price, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 cursor-pointer ${
                    price.amount === selectedPriceRange
                      ? "font-semibold text-black"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="price"
                    id={`price-${index}`}
                    className="radio w-4 h-4"
                    checked={price.amount === selectedPriceRange}
                    onChange={() => handlePriceRangeSelect(price.amount)}
                  />
                  <label
                    htmlFor={`price-${index}`}
                    className={`text-md text-[#8A8A8A] font-[Poppins] cursor-pointer ${
                      selectedPriceRange === price.amount
                        ? "font-semibold text-black"
                        : ""
                    }`}
                  >
                    {price.amount === 0 ? "All Prices" : `$${price.amount}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="filter space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-md font-[Volkhov] font-semibold tracking-wide">
                Brands
              </h1>
              <img
                onClick={() => setShowBrand(!showBrand)}
                src={downSvg}
                alt=""
                className={
                  showBrand
                    ? "rotate-180 w-6 h-6 cursor-pointer"
                    : "rotate-0 w-6 h-6 cursor-pointer"
                }
              />
            </div>
            {showBrand && (
              <div className="flex w-full items-start justify-start gap-2 flex-wrap">
                {brands.map((brand, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => handleBrandSelect(brand?.name)}
                      className={`text-sm hover:text-black text-[#8A8A8A] cursor-pointer font-[Poppins] capitalize ${
                        selectedBrand === brand?.name &&
                        "text-black font-semibold"
                      }`}
                    >
                      {brand?.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <div className="filter space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-md font-[Volkhov] font-semibold tracking-wide">
                Categories
              </h1>
              <img
                onClick={() => setShowCategory(!showCategory)}
                src={downSvg}
                alt=""
                className={
                  showCategory
                    ? "rotate-180 w-6 h-6 cursor-pointer"
                    : "rotate-0 w-6 h-6 cursor-pointer"
                }
              />
            </div>
            {showCategory && (
              <div className="flex w-full flex-col items-start justify-start gap-2 flex-wrap transition-all">
                {categories.map((category, index) => {
                  return (
                    <span
                      onClick={() => handleCategorySelect(category?.name)}
                      key={index}
                      className={`text-sm hover:text-black  text-[#8A8A8A] cursor-pointer font-[Poppins] capitalize ${
                        selectedCategory === category?.name &&
                        "text-black font-semibold"
                      }`}
                    >
                      {category?.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <button
            onClick={() => resetFilters()}
            className="w-full bg-black p-2 text-white rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="main flex-1 min-h-screen h-full pl-8 sm:pl-1">
        <div className="w-full mb-4 flex justify-between items-center">
          <select
            onChange={(e) => handleSortChange(e.target.value)}
            className="font-[Poppins] text-sm border outline-none p-1 rounded-sm cursor-pointer"
          >
            <option>Sort</option>
            {sortOptions?.map((option, index) => {
              return (
                <option value={option.label} key={index}>
                  {option.label}
                </option>
              );
            })}
          </select>
          <img
            onClick={() => setShowFilter(true)}
            src={filterSVg}
            alt="filter"
            className="w-5 h-5 cursor-pointer sm:block hidden"
          />
        </div>
        <div className="cards grid grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-12 sm:gap-x-4 sm:gap-y-4">
          {paginatedProducts?.length === 0 && (
            <h1 className="w-full text-center text-xl font-bold">
              No Products Found
            </h1>
          )}
          {paginatedProducts?.map((product, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/product/${product?._id}`)}
                className="card w-full h-[400px] sm:h-[300px] flex flex-col justify-between items-center font-[Poppins] rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={product?.images[0]}
                  alt="product_img"
                  className="w-full h-[300px] sm:h-[200px] object-cover"
                />
                <div className="w-full flex-1 items-start justify-between mt-4">
                  <div>
                    <h5 className="font-bold sm:text-sm tracking-wide text-[#484848]">
                      {product?.name}
                    </h5>
                    <span className="text-sm sm:text-xs text-[#8A8A8A]">
                      {product?.brand}
                    </span>
                  </div>
                </div>
                <div className="price_stocks w-full flex justify-between items-center ">
                  <h2 className="text-2xl sm:text-lg font-extrabold text-[#484848]">
                    ${product?.price}
                  </h2>
                  <span className="text-sm sm:text-[10px] text-red-500">
                    Almost Sold Out
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* pagination */}
        <div className="join w-full flex justify-center items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`join-item btn border-none rounded-l-md ${
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
                className={`join-item btn border-none w-10 h-10 font-[Poppins] font-semibold flex items-center justify-center ${
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
            className={`join-item btn border-none rounded-r-md ${
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

export default Shop;
