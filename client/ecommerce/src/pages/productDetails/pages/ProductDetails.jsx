/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productViewBySlug } from '../../../services/product.serivce';
import { useAddToCart } from '../../../utils/addTocart.utils';
import { useCart } from '../../../hooks/useCart';
export default function ProductDetails() {
    const addToCart = useAddToCart()
    const { cart } = useCart()
    const { slug } = useParams()
    const [productSingleData, setproductSingleData] = useState({})
    const [img, setimg] = useState(null)
    const [isLoading, setisLoading] = useState(true)

    const singleProductView = async () => {
        try {
            const res = await productViewBySlug(slug)
            setproductSingleData(res?.data?.data)
            setimg(res?.data?.data?.imagesUrl[0])
            setisLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const checkCart = cart.filter((value) => value.productId === productSingleData?.id)
    console.log(checkCart);


    useEffect(() => {
        singleProductView()
    }, [slug])
    return (
        <>
            {
                isLoading
                    ?
                    <p>Loading....</p>
                    :
                    <div className="min-h-screen bg-gray-50">

                        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

                            <div className="grid gap-8 lg:grid-cols-2">

                                <div>

                                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                                        <img
                                            src={img}
                                            alt="product"
                                            className="h-[500px] w-full object-cover"
                                        />
                                    </div>

                                    <div className="mt-5 grid grid-cols-4 gap-4">
                                        {
                                            productSingleData?.imagesUrl?.map((value, index) => {
                                                return (
                                                    <div key={index} className="overflow-hidden cursor-pointer rounded-2xl border-2 border-black bg-white"
                                                        onClick={() => setimg(value)}
                                                    >
                                                        <img
                                                            src={value}
                                                            alt="product"
                                                            className="h-24 w-full object-cover"
                                                        />
                                                    </div>
                                                )
                                            })
                                        }




                                    </div>

                                </div>

                                <div className="rounded-3xl bg-white p-6 shadow-sm lg:p-8">
                                    <h1 className="text-4xl font-bold text-black">
                                        {productSingleData?.name}
                                    </h1>

                                    <p className="mt-5 text-base leading-7 text-gray-600">
                                        {productSingleData?.description}
                                    </p>

                                    <div className="mt-6 flex items-center gap-4">

                                        <span className="text-4xl font-bold text-black">
                                            ₹{productSingleData?.price}
                                        </span>
                                    </div>


                                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                        {
                                            checkCart.length == 1
                                                ?
                                                <button

                                                    className="flex
                                             flex-1 items-center cursor-not-allowed justify-center gap-3 rounded-2xl bg-red-500 px-6 py-4 text-sm font-medium text-white hover:bg-gray-800">
                                                    <FiShoppingCart className="text-lg" />
                                                    Added
                                                </button>

                                                :
                                                <button
                                                    disabled={productSingleData?.stock == 0}
                                                    onClick={() => addToCart({
                                                        productId: productSingleData?.id,
                                                        productPrice: productSingleData?.price,
                                                        quantity: "1"
                                                    })}
                                                    className={`flex
                                             flex-1 items-center ${productSingleData?.stock == 0 ? 'cursor-not-allowed bg-gray-600 ' : 'cursor-pointer'}  justify-center gap-3 rounded-2xl bg-black px-6 py-4 text-sm font-medium text-white hover:bg-gray-800`}>
                                                    {
                                                        productSingleData?.stock != 0
                                                        &&
                                                        <FiShoppingCart className="text-lg" />
                                                    }

                                                    {productSingleData?.stock == 0 ? 'Out Of Stock' : 'Add To Cart'}
                                                </button>
                                        }




                                    </div>

                                    <div className="mt-10 space-y-5 border-t border-gray-200 pt-8">

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                Category
                                            </span>

                                            <span className="text-sm font-semibold text-black">
                                                {productSingleData?.category?.name}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                Availability
                                            </span>
                                            {
                                                productSingleData?.stock != 0
                                                    ?
                                                    <span className="text-sm font-semibold text-green-600">
                                                        In Stock
                                                    </span>
                                                    :
                                                    <span className="text-sm font-semibold text-red-600">
                                                        Out Of Stock
                                                    </span>
                                            }

                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                Shipping
                                            </span>

                                            <span className="text-sm font-semibold text-black">
                                                Free Delivery
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="mt-12 rounded-3xl bg-white p-6 shadow-sm lg:p-8">

                                <h2 className="text-3xl font-bold text-black">
                                    Product Description
                                </h2>

                                <p className="mt-6 text-base leading-8 text-gray-600">
                                    {productSingleData?.description}
                                </p>

                            </div>

                        </div>

                    </div>
            }
        </>

    )
}
