import React from 'react'

export default function OrderRow({ value }) {
    console.log(value);
    const { id, status, totalAmount, items, createdAt } = value
    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-5 border-b border-gray-200 pb-6 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <h2 className="text-xl font-bold text-black">
                        Order #{id?.split("-")[4]}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Placed On {createdAt?.split("T")[0]}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">

                    <span
                        className={`rounded-full px-5 py-2 text-sm font-medium capitalize
                            ${status === "shipped" && "bg-blue-100 text-blue-600"}
                            ${status === "pending" && "bg-yellow-100 text-yellow-600"}
                            ${status === "cancelled" && "bg-red-100 text-red-600"}
                            ${status === "delivered" && "bg-green-100 text-green-600"}
                        `}>
                        {status}
                    </span>

                    <span className="text-2xl font-bold text-black">
                        ₹{totalAmount}
                    </span>

                </div>

            </div>
            {
                items?.map((orderItem, index) => {
                    return (
                        <div key={index} className="py-6">

                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                <img
                                    src={orderItem?.product?.imagesUrl[0]}
                                    alt="product"
                                    className="h-36 w-full rounded-3xl object-cover sm:w-36"
                                />

                                <div className="flex-1">

                                    <h3 className="text-xl font-semibold text-black">
                                        {orderItem?.product?.name}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-gray-500">
                                        {orderItem?.product?.description}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-6">

                                        <span className="text-sm text-gray-500">
                                            Quantity:
                                            <span className="ml-2 font-semibold text-black">
                                                {orderItem?.quantity}
                                            </span>
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>
                    )
                })
            }


        </div>
    )
}