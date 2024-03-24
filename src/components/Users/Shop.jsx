/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAction } from "../../redux/slices/productSlice";
import downSvg from "../../assets/down.svg";
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

  const { products } = useSelector((state) => state?.products?.products);
  const { categories } = useSelector((state) => state?.categories?.categories);
  const { brands } = useSelector((state) => state?.brands?.brands);
  const { colors } = useSelector((state) => state?.colors?.colors);
  const sizes = ["S", "M", "L", "XL", "XXL", "8", "9", "10", "11", "12"];

  const [showCategory, setShowCategory] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  return (
    <div className="w-full min-h-screen px-32 md:px-10 sm:px-6 my-6 flex">
      <div className="filter-sec min-h-screen h-full bg-white w-[20%]">
        <h1 className="text-2xl font-[Volkhov] font-semibold tracking-wide mb-8">
          Filters
        </h1>
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
              <span className="text-md  text-[#8A8A8A] cursor-pointer font-[Poppins]">
                $0-$50
              </span>
              <span className="text-md  text-[#8A8A8A] cursor-pointer font-[Poppins]">
                $50-$100
              </span>
              <span className="text-md  text-[#8A8A8A] cursor-pointer font-[Poppins]">
                $1000-$500
              </span>
              <span className="text-md  text-[#8A8A8A] cursor-pointer font-[Poppins]">
                $500-$1000
              </span>
              <span className="text-md  text-[#8A8A8A] cursor-pointer font-[Poppins]">
                $1000-$5000
              </span>
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

      <div className="main flex-1 min-h-screen h-full pl-8">
        <div className="w-full mb-4">
          <select className="font-[Poppins] text-sm border outline-none p-1 rounded-sm cursor-pointer">
            <option>Sort</option>
            <option value="by price">By price</option>
            <option value="by price">By price</option>
            <option value="by price">By price</option>
            <option value="by price">By price</option>
          </select>
        </div>
        <div className="cards grid grid-cols-3 gap-12">
          {products?.map((product, index) => {
            return (
              <div
                key={index}
                className="card w-full h-[420px] flex flex-col items-center pb-4 font-[Poppins] rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={product?.images[0]}
                  alt="product_img"
                  className="w-full h-[80%] object-cover"
                />
                <div className="w-full flex-1 items-start justify-between mt-4">
                  <div>
                    <h5 className="font-bold tracking-wide text-[#484848]">
                      {product?.name}
                    </h5>
                    <span className="text-sm text-[#8A8A8A]">
                      {product?.brand}
                    </span>
                  </div>
                </div>
                <div className="price_stocks w-full flex justify-between items-center mt-2">
                  <h2 className="text-2xl font-extrabold text-[#484848]">
                    ${product?.price}
                  </h2>
                  <span className="text-sm text-red-500">Almost Sold Out</span>
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
