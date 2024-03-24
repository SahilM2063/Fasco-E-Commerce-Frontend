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

  const { products } = useSelector((state) => state?.products);
  const { categories } = useSelector((state) => state?.categories?.categories);
  const { brands } = useSelector((state) => state?.brands?.brands);
  const { colors } = useSelector((state) => state?.colors?.colors);

  const [showCategory, setShowCategory] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showSize, setShowSize] = useState(false);

  return (
    <div className="w-full min-h-screen px-32 md:px-10 sm:px-6 my-6 ">
      <div className="filter-sec min-h-screen h-full bg-white w-[20%]">
        <h1 className="text-2xl font-[Volkhov] font-semibold tracking-wide mb-8">
          Filters
        </h1>
        <div className="space-y-8">
          <div className="filter space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-md font-[Volkhov] font-semibold tracking-wide">
                Sizes
              </h1>
              <img
                onClick={() => setShowSize(!showSize)}
                src={downSvg}
                alt=""
                className={
                  showSize
                    ? "rotate-180 w-6 h-6 cursor-pointer"
                    : "rotate-0 w-6 h-6 cursor-pointer"
                }
              />
            </div>
            {showSize && (
              <div className="flex w-full items-center justify-start gap-2 flex-wrap">
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  S
                </span>
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  M
                </span>
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  L
                </span>
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  XL
                </span>
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  XXL
                </span>
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  8
                </span>
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  9
                </span>
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  10
                </span>
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  11
                </span>
                <span className="text-xs text-[#8A8A8A] hover:text-[#484848] hover:border-[#484848] rounded-[5px] cursor-pointer font-[Poppins] border border-[#8A8A8A] w-8 h-8 flex items-center justify-center">
                  12
                </span>
              </div>
            )}
          </div>

          <div className="filter space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-md font-[Volkhov] font-semibold tracking-wide">
                Colors
              </h1>
              <img
                onClick={() => setShowColor(!showColor)}
                src={downSvg}
                alt=""
                className={
                  showColor
                    ? "rotate-180 w-6 h-6 cursor-pointer"
                    : "rotate-0 w-6 h-6 cursor-pointer"
                }
              />
            </div>
            {showColor && (
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
            )}
          </div>

          <div className="filter space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-md font-[Volkhov] font-semibold tracking-wide">
                Prices
              </h1>
              <img
                onClick={() => setShowPrice(!showPrice)}
                src={downSvg}
                alt=""
                className={
                  showPrice
                    ? "rotate-180 w-6 h-6 cursor-pointer"
                    : "rotate-0 w-6 h-6 cursor-pointer"
                }
              />
            </div>
            {showPrice && (
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
            )}
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
    </div>
  );
};

export default Shop;
