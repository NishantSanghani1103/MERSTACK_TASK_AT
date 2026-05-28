import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdminProductRow({ value, onDelete }) {
  const { id, name, imagesUrl, description, category, stock, price, slug } =
    value;
  return (
    <tr className="border-b border-gray-100">
      <td className="py-5">
        <div className="flex items-center gap-4">
          <img
            src={imagesUrl[0]}
            alt="product"
            className="size-16 rounded-2xl object-cover"
          />

          <div>
            <h3 className="text-sm font-semibold text-black">{name}</h3>

            <p className="mt-1 text-xs text-gray-500 line-clamp-1">{description}</p>
          </div>
        </div>
      </td>

      <td className="py-5 text-sm text-gray-600">{category?.name}</td>

      <td className="py-5 text-sm font-semibold text-black">₹ {price}</td>

      <td className="py-5  text-sm text-gray-600">{stock}</td>

      <td className="py-5">
        {stock != 0 ? (
          <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-medium text-green-600">
            In Stock
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-medium text-red-600">
            Out Of Stock
          </span>
        )}
      </td>

      <td className="py-5">
        <div className="flex items-center gap-3">
          <Link
            to={`/admin/product/edit/${slug}`}
            className="flex size-10 items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            <FiEdit className="text-lg" />
          </Link>

          <button
            onClick={() => {
              if (confirm("Are Your Want TO Delete Product ? ")) {
                onDelete(id);
              }
            }}
            className="flex cursor-pointer size-10 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50"
          >
            <FiTrash2 className="text-lg" />
          </button>
        </div>
      </td>
    </tr>
  );
}
