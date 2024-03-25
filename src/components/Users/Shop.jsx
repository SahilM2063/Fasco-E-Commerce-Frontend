/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAction } from "../../redux/slices/productSlice";
import downSvg from "../../assets/down.svg";
import filterSVg from "../../assets/filter.svg";
import closeMenu from "../../assets/closeMenu.svg";
import { getAllCategoriesAction } from "../../redux/slices/categorySlice";
import { getAllBrandsAction } from "../../redux/slices/brandSlice";
import { getAllColorsAction } from "../../redux/slices/colorSlice";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsAction());
    dispatch(getAllCategoriesAction());
    dispatch(getAllBrandsAction());
    dispatch(getAllColorsAction());
  }, [dispatch]);

  const [showFilter, setShowFilter] = useState(false);

  const { products } = useSelector((state) => state?.products?.products);
  const { categories } = useSelector((state) => state?.categories?.categories);
  const { brands } = useSelector((state) => state?.brands?.brands);
  const { colors } = useSelector((state) => state?.colors?.colors);
  const sizes = ["S", "M", "L", "XL", "XXL", "8", "9", "10", "11", "12"];
  const priseOptions = [
    {
      amount: "0-500",
    },
    {
      amount: "500-1000",
    },
    {
      amount: "1000-1500",
    },
    {
      amount: "1500-2000",
    },
    {
      amount: "2000-2500",
    },
  ];
  const sortOOptions = [
    {
      href: "#",
      label: "Price: Low to High",
    },
    {
      href: "#",
      label: "Price: High to Low",
    },
    {
      href: "#",
      label: "Newest",
    },
    {
      href: "#",
      label: "Most Popular",
    },
    {
      href: "#",
      label: "Best Rating",
    },
  ];

  const [showCategory, setShowCategory] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

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
                    className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center"
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
                    className="text-xs rounded-full cursor-pointer shadow-md w-8 h-8"
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
              {priseOptions?.map((price, index) => {
                return (
                  <span
                    key={index}
                    className="text-md  text-[#8A8A8A] cursor-pointer font-[Poppins]"
                  >
                    {price?.amount}
                  </span>
                );
              })}
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
                      className="text-sm hover:text-black  text-[#8A8A8A] cursor-pointer font-[Poppins] capitalize"
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
                      key={index}
                      className="text-sm hover:text-black  text-[#8A8A8A] cursor-pointer font-[Poppins] capitalize"
                    >
                      {category?.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="main flex-1 min-h-screen h-full pl-8 sm:pl-1">
        <div className="w-full mb-4 flex justify-between items-center">
          <select className="font-[Poppins] text-sm border outline-none p-1 rounded-sm cursor-pointer">
            <option>Sort</option>
            {sortOOptions?.map((option, index) => {
              return <option key={index}>{option.label}</option>;
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
          {products?.map((product, index) => {
            return (
              <div
                key={index}
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
      </div>
    </div>
  );
};

export default Shop;
