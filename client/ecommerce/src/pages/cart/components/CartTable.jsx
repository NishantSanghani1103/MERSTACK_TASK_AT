import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  cartDeleteService,
  cartUpdateService,
} from "../../../services/cart.service";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../../slice/cartSlice";

export default function CartTable({ value }) {
  const { id, productPrice, quantity, name, slug, product } = value;
  const { token } = useAuth();
  const dispatch = useDispatch();
  const removeFromCart = async (id) => {
    try {
      const res = await cartDeleteService(id, token);
      toast.success(res?.data?.message);
      dispatch(fetchCart());
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleQtyChnage = async (id, qty) => {
    console.log(id, qty);
    try {
      const res = await cartUpdateService(id, qty, token);
      // toast.success(res?.data?.message);
      dispatch(fetchCart()); // refresh cart
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-sm sm:flex-row">
      <img
        src={product.imagesUrl[0]}
        alt="product"
        className="h-40 w-full rounded-2xl object-cover sm:w-40"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-black capitalize">
            {product.name}
          </h2>

          <span className="mt-4 block text-2xl font-bold text-black">
            ₹{productPrice}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center rounded-xl border border-gray-300">
            <button
              className="px-4 py-2 cursor-pointer"
              onClick={() => {
                if (quantity == 1) {
                  removeFromCart(id);
                } else {
                  handleQtyChnage(id, quantity - 1);
                }
              }}
            >
              <FiMinus />
            </button>

            <span className="px-5 text-sm font-medium">{quantity}</span>

            <button
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleQtyChnage(id, quantity + 1)}
            >
              <FiPlus />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(id)}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <FiTrash2 />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
