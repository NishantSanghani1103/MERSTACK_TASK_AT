/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
import AdminProductRow from "../components/AdminProductRow";
import { toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";
import {
  productDeleteService,
  productViewService,
} from "../../../../../services/product.serivce";
import { useAuth } from "../../../../../hooks/useAuth";
import { categoryViewService } from "../../../../../services/category.service";
import { Link } from "react-router-dom";

export default function ProductView() {
  const [productData, setproductData] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [skip, setskip] = useState(1)
  const [pages, setpages] = useState(null)
  const [loading, setloading] = useState(true);
  const { token } = useAuth();



  const productView = async () => {
    try {
      const res = await productViewService(null, skip);
      setproductData(res?.data?.data);
      setpages(res?.data?.totalRecords)
      setloading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await productDeleteService(id, token);
      toast.success(res?.data?.message);
      productView();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    productView();

  }, [skip]);
  return (
    <div className="flex-1 p-4 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Products</h1>

          <p className="mt-2 text-sm text-gray-500">Manage your products</p>
        </div>

        <Link to={'/admin/product/add'} className="rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800">
          Add Product
        </Link>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">


        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="pb-4 w-[58%] text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="pb-4 w-[9%] text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="pb-4 w-[9%] text-sm font-semibold text-gray-600">
                  Price
                </th>

                <th className="pb-4  w-[8%] text-sm font-semibold text-gray-600">
                  Stock
                </th>

                <th className="pb-4 w-[20%] text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="pb-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td>Loading....</td></tr>
              ) : (
                productData?.map((value, index) => (
                  <AdminProductRow
                    key={value.id}
                    value={value}
                    onDelete={handleDelete}
                  />
                ))
              )}

            </tbody>
          </table>
          <div className="my-5">
            <ResponsivePagination
              current={skip}
              total={pages}
              onPageChange={setskip}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
