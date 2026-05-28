import React from 'react'
import { FiEye } from 'react-icons/fi'

export default function OrderListingRow({ value, setstatusValue }) {
    const { id, user, items, totalAmount, status, createdAt } = value
    return (
        <tr className="border-b border-gray-100">

            <td className="py-5 pr-6 text-sm font-semibold text-black whitespace-nowrap">
                #{id?.split("-")[4]}
            </td>

            <td className="min-w-[220px] py-5 pr-6">
                <div>
                    <h3 className="text-sm font-semibold text-black">
                        {user?.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        {user?.email}
                    </p>
                </div>
            </td>


            <td className="py-5 pr-6 text-sm font-semibold text-black whitespace-nowrap">
                ₹{totalAmount}
            </td>

            <td className="py-5 pr-6 whitespace-nowrap">
                <span
                    className={`rounded-full px-4 py-2 text-xs font-medium capitalize
        ${status === "pending" && "bg-yellow-100 text-yellow-600"}
        ${status === "shipped" && "bg-blue-100 text-blue-600"}
        ${status === "delivered" && "bg-green-100 text-green-600"}
        ${status === "cancelled" && "bg-red-100 text-red-600"}
    `}
                >
                    {status}
                </span>
            </td>

            <td className="py-5 pr-6 whitespace-nowrap">
                <select defaultValue={status} onChange={(e) => {
                    setstatusValue([id, e.target.value])

                }} className="rounded-xl capitalize border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black">
                    <option value={'pending'}>Pending</option>
                    <option value={'shipped'}>Shipped</option>
                    <option value={'delivered'}>Delivered</option>
                    <option value={'cancelled'}>Cancelled</option>
                </select>
            </td>

            <td className="py-5 pr-6 text-sm text-gray-600 whitespace-nowrap">
                {createdAt?.split("T")[0]}
            </td>

            <td className="py-5 whitespace-nowrap">
                <button className="flex size-10 items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100">
                    <FiEye className="text-lg" />
                </button>
            </td>

        </tr>
    )
}
