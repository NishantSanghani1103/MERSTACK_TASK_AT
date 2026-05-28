/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { FiBox, FiDollarSign, FiShoppingCart, FiUsers } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { productViewService } from '../../../../../services/product.serivce'
import { orderViewAllService } from '../../../../../services/order.service'
import { userViewService } from '../../../../../services/user.service'

export default function AdminDashBoard() {
    const [productCountData, setproductCountData] = useState({
        productCount: null,
        orderCount: [],
        customerRes: []
    })
    const [loading, setloading] = useState(true)
    const coundItems = async () => {
        try {
            const res = await productViewService()
            const orderRes = await orderViewAllService()
            const customerRes = await userViewService()
            setproductCountData({
                ...productCountData,
                productCount: res?.data?.count,
                orderCount: orderRes?.data?.data,
                customerRes: customerRes?.data?.data
            })
            setloading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
    useEffect(() => {
        coundItems()
    }, [])

    return (
        <>
            {
                loading
                    ?
                    <p>Loading.....</p>
                    :
                    <div className="flex-1 p-4 lg:p-8">

                        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-black">
                                    Dashboard
                                </h1>

                                <p className="mt-2 text-sm text-gray-500">
                                    Welcome back, Admin
                                </p>
                            </div>


                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            <div className="rounded-3xl bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Total Products
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold text-black">
                                            {productCountData?.productCount}
                                        </h2>
                                    </div>

                                    <div className="rounded-2xl bg-gray-100 p-4">
                                        <FiBox className="text-2xl text-black" />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Total Orders
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold text-black">
                                            {productCountData?.orderCount?.length}
                                        </h2>
                                    </div>

                                    <div className="rounded-2xl bg-gray-100 p-4">
                                        <FiShoppingCart className="text-2xl text-black" />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Customers
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold text-black">
                                            {productCountData?.customerRes?.length}
                                        </h2>
                                    </div>

                                    <div className="rounded-2xl bg-gray-100 p-4">
                                        <FiUsers className="text-2xl text-black" />
                                    </div>
                                </div>
                            </div>



                        </div>



                    </div>
            }


        </>
    )
}
