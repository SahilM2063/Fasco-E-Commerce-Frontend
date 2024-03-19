/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAction } from "../../redux/slices/productSlice";

const Shop = () => {
  const dispatch = useDispatch();
  // Getting All Products
  const { products } = useSelector((state) => state?.products.products);
  console.log(products);

  useEffect(() => {
    dispatch(getAllProductsAction());
  });
  return (
    <div className="arr_section_cards sm:my-4 md:my-6 lg:my-8 w-full grid sm:flex sm:flex-col md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 sm:gap-4">
      {products &&
        products?.map((product, index) => {
          return (
            <div
              key={index}
              className="card w-full border flex flex-col items-center p-5 font-[Poppins] rounded-lg select-none"
            >
              <img
                src={product?.images[0]}
                alt="product_img"
                className="w-full rounded-lg"
              />
              <div className="w-full flex items-start justify-between my-4">
                <div>
                  <h5 className="font-bold tracking-wide text-[#484848]">
                    {product?.name}
                  </h5>
                  <span className="text-sm text-[#8A8A8A]">Channel</span>
                </div>
                <div className="stars flex">{product?.rating}</div>
              </div>
              <p className="w-full text-left text-[#484848] text-[12px] font-[600] opacity-90 mb-2">
                (4.1k) Customer Reviews
              </p>
              <div className="price_stocks w-full flex justify-between items-center mt-2">
                <h2 className="text-2xl font-extrabold text-[#484848]">
                  ${product?.price}
                </h2>
                <span className="text-sm text-red-500">
                  {product?.qtyleft < 10 ? "almost out of stock" : "in stock"}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Shop;
