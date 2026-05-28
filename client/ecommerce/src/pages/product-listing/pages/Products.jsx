/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import ProductFilter from "../components/ProductFilter";
import { toast } from "react-toastify";
import { productViewService } from "../../../services/product.serivce";
import ProductRow from "../components/ProductRow";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";
import { useCart } from "../../../hooks/useCart";
export default function Products() {
    const [productData, setproductData] = useState([]);
    const [skip, setskip] = useState(1)
    const [totalRecords, settotalRecords] = useState(null)
    const [loading, setloading] = useState(true);
    const { cart } = useCart()

    const [filterProducts, setfilterProducts] = useState({
        categoryFilter: [],
        sorting: null,
        name: "",
        priceFilter: [null, null],
    });
    const getProduct = async () => {
        try {
            const res = await productViewService(filterProducts, skip);
            setproductData(res?.data?.data);
            settotalRecords(res?.data?.totalRecords)
            setloading(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            getProduct()
        }, 1000)

        return () => clearTimeout(timer)
    }, [filterProducts, skip]);

    useEffect(() => {
        console.log(cart);

    }, [cart])


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 lg:flex-row lg:px-4">
                <ProductFilter
                    setskip={setskip}
                    setfilterProducts={setfilterProducts}
                    filterProducts={filterProducts}
                />

                <div className="flex-1">
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-black">All Products</h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Showing premium products
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="text"
                                name="name"
                                onChange={(e) =>
                                    setfilterProducts({
                                        ...filterProducts,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Search products..."
                                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                            />

                            <select
                                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                                onChange={(e) =>
                                    setfilterProducts({
                                        ...filterProducts,
                                        sorting: e.target.value,
                                    })
                                }
                            >
                                <option value={1}>Latest</option>
                                <option value={2}>Low to High</option>
                                <option value={3}>High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {loading ? (
                            <p>Loading....</p>
                        ) : productData.length == 0 ? (
                            <p>Product Not Found....</p>
                        ) : (
                            productData?.map((value, index) => (
                                <ProductRow
                                    key={value.id}
                                    value={value}
                                    cart={cart}
                                    />
                            ))
                        )}
                    </div>
                    <div className="my-5">
                        <ResponsivePagination
                            current={skip}
                            total={totalRecords}
                            onPageChange={setskip}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
