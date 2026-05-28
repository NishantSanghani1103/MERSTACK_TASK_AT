/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { FiEye, FiDownload } from "react-icons/fi";
import { toast } from 'react-toastify';
import { orderViewByIdService } from '../../../services/order.service';
import { useAuth } from '../../../hooks/useAuth';
import OrderRow from '../components/OrderRow';
export default function Order() {
    const [orderData, setorderData] = useState([])
    const [loading, setloading] = useState(true)
    const { token } = useAuth()
    const orderView = async () => {
        try {
            const res = await orderViewByIdService(token)
            setorderData(res?.data?.data)
            setloading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message)
        }
    }
    useEffect(() => {
        orderView()
    }, [])
    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-black">
                        Order History
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        View all your previous orders
                    </p>
                </div>

                <div className="space-y-6">

                    {

                        loading
                            ?
                            <p>Loading....</p>
                            :
                            orderData?.length == 0
                                ?
                                <p>Order Not Found...</p>

                                :
                                orderData?.map((value, index) => <OrderRow key={value.id} value={value} />)
                    }


                </div>

            </div>

        </div>
    )
}
