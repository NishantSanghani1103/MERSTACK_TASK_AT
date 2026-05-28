/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import HomeProductRow from '../components/HomeProductRow'
import { productViewService } from '../../../services/product.serivce'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Home() {
    const [productData, setproductData] = useState([])
    const [loading, setloading] = useState(true)

    const productView = async () => {
        try {
            const res = await productViewService()
            setproductData(res?.data?.data)
            setloading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        productView()
    }, [])
    return (
        <div className="w-full bg-gray-50">
            <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-2 lg:px-8 lg:py-16">
                <div className="flex flex-col justify-center">
                    <span className="mb-4 w-fit rounded-full bg-black px-4 py-2 text-xs font-medium text-white">
                        New Collection 2026
                    </span>

                    <h1 className="mb-5 text-4xl font-bold leading-tight text-black lg:text-6xl">
                        Discover Amazing Products For Your Lifestyle
                    </h1>

                    <p className="mb-8 text-base text-gray-600">
                        Explore premium quality products with modern style and affordable prices.
                    </p>

                    <div className="flex items-center gap-4">
                        <button className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800">
                            Shop Now
                        </button>

                        <button className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium hover:bg-white">
                            Explore
                        </button>
                    </div>
                </div>

                <div>
                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                        alt="banner"
                        className="h-full w-full rounded-3xl object-cover"
                    />
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-black">
                            Featured Products
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Explore our latest products
                        </p>
                    </div>

                    <Link  to={'/products'} className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-black hover:text-white">
                        View All
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        loading
                            ?
                            <p>Loading....</p>
                            :
                            productData?.map((value, index) => <HomeProductRow
                                key={value.id}
                                value={value} />)
                    }


                    {/* <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                        <img
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                            alt="product"
                            className="h-72 w-full object-cover"
                        />

                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-black">
                                Headphones
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Wireless premium sound
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-bold text-black">
                                    ₹2,499
                                </span>

                                <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                        <img
                            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                            alt="product"
                            className="h-72 w-full object-cover"
                        />

                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-black">
                                Camera
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Professional photography
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-bold text-black">
                                    ₹18,999
                                </span>

                                <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                        <img
                            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                            alt="product"
                            className="h-72 w-full object-cover"
                        />

                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-black">
                                Smartphone
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Latest generation device
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-bold text-black">
                                    ₹29,999
                                </span>

                                <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
        </div>
    )
}
