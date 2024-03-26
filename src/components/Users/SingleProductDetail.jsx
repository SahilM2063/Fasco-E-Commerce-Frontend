/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAction } from "../../redux/slices/productSlice";


const SingleProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProductAction(id));
  }, [dispatch]);

  const { product } = useSelector((state) => state?.products?.product);
  console.log(product)

  return <div>
    Single Product : {product?.name}
  </div>;
};

export default SingleProductDetail;
