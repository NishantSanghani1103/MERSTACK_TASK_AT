/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { FiEye, FiSearch } from 'react-icons/fi'
import { orderStatusChangeService, orderViewAllService } from '../../../../../services/order.service'
import { toast } from 'react-toastify'
import OrderListingRow from '../components/OrderListingRow'

export default function OrderListing() {
    const [orderData, setorderData] = useState([])
    const [loading, setloading] = useState(true)
    const [statusValue, setstatusValue] = useState([null, null])
    console.log(statusValue);

    const orderView = async () => {
        try {
            const res = await orderViewAllService()
            setorderData(res?.data?.data)
            setloading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message)
        }
    }

    const orderStatusChnage = async (id, value) => {
        try {
            const res = await orderStatusChangeService(statusValue)
            toast.success(res?.data?.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message)
        }
    }

    useEffect(() => {
        if (!statusValue.includes(null)) {
            orderStatusChnage()
            orderView()
        }
        orderView()


    }, [statusValue])

    useEffect(() => {
        console.log(statusValue);

    }, [statusValue])
    return (

        <div className="flex-1 p-4 lg:p-8">

            <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
                <h1 className="text-3xl font-bold text-black">
                    Orders
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage customer orders
                </p>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm lg:p-6">

                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="border-b border-gray-200 text-left">

                                <th className="pb-4 pr-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Order ID
                                </th>

                                <th className="pb-4 pr-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Customer
                                </th>



                                <th className="pb-4 pr-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Amount
                                </th>

                                <th className="pb-4 pr-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Current Status
                                </th>

                                <th className="pb-4 pr-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Update Status
                                </th>

                                <th className="pb-4 pr-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Date
                                </th>

                                <th className="pb-4 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody>
                            {
                                loading
                                    ?
                                    <p>Loading....</p>
                                    :
                                    orderData.length == 0
                                        ?
                                        <p>Order Not Found...</p>
                                        :
                                        orderData?.map((value, index) => <OrderListingRow
                                            key={value.id}
                                            value={value}
                                            setstatusValue={setstatusValue}
                                        />)
                            }


                            {/* <tr className="border-b border-gray-100">

                                <td className="py-5 pr-6 text-sm font-semibold text-black whitespace-nowrap">
                                    #ORD1026
                                </td>

                                <td className="min-w-[220px] py-5 pr-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-black">
                                            Sarah Smith
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            sarah@example.com
                                        </p>
                                    </div>
                                </td>

                                <td className="py-5 pr-6 text-sm text-gray-600 whitespace-nowrap">
                                    Headphones
                                </td>

                                <td className="py-5 pr-6 text-sm font-semibold text-black whitespace-nowrap">
                                    ₹2,499
                                </td>

                                <td className="py-5 pr-6 whitespace-nowrap">
                                    <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-medium text-blue-600">
                                        Shipped
                                    </span>
                                </td>

                                <td className="py-5 pr-6 whitespace-nowrap">
                                    <select className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black">
                                        <option>Shipped</option>
                                        <option>Pending</option>
                                        <option>Delivered</option>
                                        <option>Cancelled</option>
                                    </select>
                                </td>

                                <td className="py-5 pr-6 text-sm text-gray-600 whitespace-nowrap">
                                    18 May 2026
                                </td>

                                <td className="py-5 whitespace-nowrap">
                                    <button className="flex size-10 items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100">
                                        <FiEye className="text-lg" />
                                    </button>
                                </td>

                            </tr>

                            <tr className="border-b border-gray-100">

                                <td className="py-5 pr-6 text-sm font-semibold text-black whitespace-nowrap">
                                    #ORD1027
                                </td>

                                <td className="min-w-[220px] py-5 pr-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-black">
                                            Michael Lee
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            michael@example.com
                                        </p>
                                    </div>
                                </td>

                                <td className="py-5 pr-6 text-sm text-gray-600 whitespace-nowrap">
                                    Smart Watch
                                </td>

                                <td className="py-5 pr-6 text-sm font-semibold text-black whitespace-nowrap">
                                    ₹5,999
                                </td>

                                <td className="py-5 pr-6 whitespace-nowrap">
                                    <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-medium text-green-600">
                                        Delivered
                                    </span>
                                </td>

                                <td className="py-5 pr-6 whitespace-nowrap">
                                    <select className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black">
                                        <option>Delivered</option>
                                        <option>Pending</option>
                                        <option>Shipped</option>
                                        <option>Cancelled</option>
                                    </select>
                                </td>

                                <td className="py-5 pr-6 text-sm text-gray-600 whitespace-nowrap">
                                    17 May 2026
                                </td>

                                <td className="py-5 whitespace-nowrap">
                                    <button className="flex size-10 items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100">
                                        <FiEye className="text-lg" />
                                    </button>
                                </td>

                            </tr>

                            <tr>

                                <td className="py-5 pr-6 text-sm font-semibold text-black whitespace-nowrap">
                                    #ORD1028
                                </td>

                                <td className="min-w-[220px] py-5 pr-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-black">
                                            Emma Watson
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            emma@example.com
                                        </p>
                                    </div>
                                </td>

                                <td className="py-5 pr-6 text-sm text-gray-600 whitespace-nowrap">
                                    Backpack
                                </td>

                                <td className="py-5 pr-6 text-sm font-semibold text-black whitespace-nowrap">
                                    ₹1,999
                                </td>

                                <td className="py-5 pr-6 whitespace-nowrap">
                                    <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-medium text-red-600">
                                        Cancelled
                                    </span>
                                </td>

                                <td className="py-5 pr-6 whitespace-nowrap">
                                    <select className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black">
                                        <option>Cancelled</option>
                                        <option>Pending</option>
                                        <option>Shipped</option>
                                        <option>Delivered</option>
                                    </select>
                                </td>

                                <td className="py-5 pr-6 text-sm text-gray-600 whitespace-nowrap">
                                    16 May 2026
                                </td>

                                <td className="py-5 whitespace-nowrap">
                                    <button className="flex size-10 items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100">
                                        <FiEye className="text-lg" />
                                    </button>
                                </td>

                            </tr> */}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}