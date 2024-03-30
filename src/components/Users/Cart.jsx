/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import remove from "../../assets/closeMenu.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartDataAction,
  removeFromCart,
  updateCartAction,
} from "../../redux/slices/cartSlice";
import { useNotification } from "../../hooks";
import emptyCartIllustration from "../../assets/empty_cart_illustration.svg";

const Cart = () => {
  const dispatch = useDispatch();
  const updateNotification = useNotification();

  useEffect(() => {
    dispatch(getCartDataAction());
  }, [dispatch]);

  const { cart, loading, productMsg, error, isDeleted } = useSelector(
    (state) => state?.cart
  );
  const cartData = cart?.user?.cart;

  const handleRemoveFromCart = (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      dispatch(removeFromCart(id));
    }
    return;
  };

  useEffect(() => {
    if (isDeleted) {
      dispatch(getCartDataAction());
      updateNotification("success", productMsg?.message);
    }
    if (error) {
      updateNotification("error", error?.message);
      dispatch(getCartDataAction());
    }
  }, [isDeleted, error]);

  // handling quantities
  const handleQtyIncr = (product) => {
    const currentQuantity = quantities[product?._id] || product?.quantity;
    const updatedQuantity = Math.min(currentQuantity + 1, 8); // Limit increment to 8
    setQuantity(product?._id, updatedQuantity);
    dispatch(
      updateCartAction({
        id: product._id,
        quantity: updatedQuantity,
      })
    );
  };

  const handleQtyDecr = (product) => {
    const currentQuantity = quantities[product?._id] || product?.quantity;
    if (currentQuantity > 1) {
      const updatedQuantity = currentQuantity - 1;
      setQuantity(product?._id, updatedQuantity);
      dispatch(
        updateCartAction({
          id: product._id,
          quantity: updatedQuantity,
        })
      );
    }
  };

  const [quantities, setQuantities] = useState({});

  const setQuantity = (id, quantity) => {
    setQuantities({
      ...quantities,
      [id]: quantity,
    });
  };

  const { isUpdated } = useSelector((state) => state?.cart);

  return (
    <div className="w-full px-32 pb-6 md:px-10 sm:px-6 mt-8">
      <h1 className="font-[Volkhov] text-3xl text-center">Shopping Cart</h1>
      <div className="cartProduct mt-4">
        {cartData?.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center gap-4 items-center bg-white select-none">
            <img
              src={emptyCartIllustration}
              alt="cart_empty"
              className="w-1/3"
            />
            <p className="text-sm font-[poppins]">Your cart is empty!</p>
          </div>
        ) : (
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-20 w-full text-sm leading-none border-b-2 border-black">
                <th className="text-left pl-4 font-[poppins] font-semibold">
                  No.
                </th>
                <th className="text-left font-[poppins] font-semibold">
                  Product
                </th>
                <th className="text-left pl-4 font-[poppins] font-semibold">
                  Price(₹)
                </th>
                <th className="text-left pl-4 font-[poppins] font-semibold">
                  Quantity
                </th>
                <th className="text-left pl-4 font-[poppins] font-semibold">
                  Total
                </th>
                <th className="text-left pl-4 font-[poppins] font-semibold"></th>
              </tr>
            </thead>
            <tbody className="w-full">
              {cartData?.map((product, index) => (
                <tr key={index} className="w-full h-40 md:h-28">
                  <td className="pl-4 font-semibold">{index + 1}</td>
                  <td className="">
                    <div className="flex items-start gap-4">
                      <img
                        className="shadow-md rounded-sm object-cover h-32 w-32 md:h-20 md:w-20"
                        alt="product image"
                        src={product?.productId?.images[0]}
                      />
                      <div className="content flex items-start flex-col space-y-2">
                        <p className="font-[Volkhov] text-xl md:text-base tracking-tight text-[#484848] ">
                          {product?.productId?.name}
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm md:text-xs font-[Poppins] tracking-wide text-[#8A8A8A]">
                            Color : {product?.color}
                          </p>
                          <p className="text-sm md:text-xs font-[Poppins] tracking-wide text-[#8A8A8A]">
                            Size: {product?.size}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="pl-4 font-[Poppins] md:text-sm">
                    ₹ {product?.price}
                  </td>
                  <td className="pl-4">
                    <div className="counter w-[100px] h-[40px] md:w-[70px] md:h-[30px]  border-[1px] border-[#d5d5d5] rounded-md flex justify-between items-center">
                      <button
                        onClick={() => handleQtyDecr(product)}
                        className="flex-1 text-lg md:text-sm h-full font-[poppins] flex justify-center items-center"
                      >
                        -
                      </button>
                      <span className="flex-1 md:text-sm h-full font-[poppins] font-semibold flex justify-center items-center text-[#484848]">
                        {quantities[product?._id] || product?.quantity}
                      </span>
                      <button
                        onClick={() => handleQtyIncr(product)}
                        className="flex-1 text-lg md:text-sm h-full font-[poppins] flex justify-center items-center"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="pl-4 font-semibold font-[Poppins] md:text-sm">
                    ₹{" "}
                    {product?.price *
                      (quantities[product?._id] || product?.quantity)}
                  </td>
                  <td>
                    <img
                      onClick={() => handleRemoveFromCart(product?._id)}
                      src={remove}
                      alt="remove"
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Cart;
