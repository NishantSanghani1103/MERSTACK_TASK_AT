/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { productSchema } from "../../../../../validation/zodValidation";
import { toast } from "react-toastify";
import {
  poductEditService,
  productAddService,
  productViewBySlug,
} from "../../../../../services/product.serivce";
import { useAuth } from "../../../../../hooks/useAuth";
import { categoryViewService } from "../../../../../services/category.service";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductAdd() {
  const { token } = useAuth();
  const { slug } = useParams();

  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [singleProductData, setsingleProductData] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, touchedFields },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const handleImageChange = (e) => {
    const filesArray = Array.from(e.target.files);

    setValue("images", filesArray, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const productSave = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("categoryId", data.categoryId);
      formData.append("stock", data.stock);
      formData.append("description", data.description);

      if (data.images?.length) {
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
      }

      let res;

      if (slug) {
        res = await poductEditService(singleProductData?.id, formData, token);
      } else {
        res = await productAddService(formData, token);
      }

      toast.success(res?.data?.message);

      reset();

      setTimeout(() => {
        navigate("/admin/product/view");
      }, 2000);

    } catch (error) {
      console.log(error?.response);

      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const categoryView = async () => {
    try {
      const res = await categoryViewService();

      setCategoryData(res?.data?.data);
      setLoading(false);

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    categoryView();

  }, []);

  const singleProductView = async () => {
    try {
      const res = await productViewBySlug(slug);

      setsingleProductData(res?.data?.data);

      setValue("name", res?.data?.data?.name);
      setValue("price", res?.data?.data?.price);
      setValue("categoryId", res?.data?.data?.category?.id);
      setValue("stock", String(res?.data?.data?.stock));
      setValue("description", res?.data?.data?.description);

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {

    if (slug) {
      singleProductView();
    }



  }, []);


  return (
    <div className="flex-1 p-4 lg:p-8">

      <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-black">
          Add Product
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Add new product details
        </p>
      </div>

      <form onSubmit={handleSubmit(productSave)}>

        <div className="rounded-3xl bg-white p-6 shadow-sm">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                {...register("name")}
                className="w-full rounded-2xl border px-4 py-4 text-sm"
              />

              {touchedFields.name && errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Price
              </label>

              <input
                type="text"
                placeholder="Enter product price"
                {...register("price")}
                className="w-full rounded-2xl border px-4 py-4 text-sm"
              />

              {touchedFields.price && errors.price && (
                <p className="text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                {...register("categoryId")}
                className="w-full rounded-2xl border px-4 py-4 text-sm"
              >

                {loading && (
                  <option value="">
                    Loading...
                  </option>
                )}

                <option value="">
                  Select category
                </option>

                {categoryData.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}

              </select>

              {touchedFields.categoryId && errors.categoryId && (
                <p className="text-sm text-red-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Stock
              </label>

              <input
                type="text"
                placeholder="Enter stock quantity"
                {...register("stock")}
                className="w-full rounded-2xl border px-4 py-4 text-sm"
              />

              {touchedFields.stock && errors.stock && (
                <p className="text-sm text-red-500">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                rows="6"
                placeholder="Enter product description"
                {...register("description")}
                className="w-full rounded-2xl border px-4 py-4 text-sm"
              />

              {touchedFields.description && errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Product Images
              </label>

              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full"
              />

              {touchedFields.images && errors.images && (
                <p className="text-sm text-red-500">
                  {errors.images.message}
                </p>
              )}
            </div>

          </div>

          <div className="mt-8">

            <button
              disabled={isSubmitting}
              type="submit"
              className={`rounded-2xl bg-black px-8 py-4 text-white ${isSubmitting ? "cursor-progress" : "cursor-pointer"}`}
            >

              {slug
                ? isSubmitting
                  ? "Updating..."
                  : "Update Product"
                : isSubmitting
                  ? "Adding..."
                  : "Add Product"}

            </button>

          </div>

        </div>

      </form>

    </div>
  );
}