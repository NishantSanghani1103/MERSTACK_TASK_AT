import React from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

export default function CategoryRow({ value, onDelete }) {
    const { id, name, createdAt } = value
    const navigate = useNavigate()
    return (
        <tr className="border-b border-gray-100">

            <td className="py-5 pr-6 text-sm font-semibold text-black whitespace-nowrap">
                #CAT{id?.split("-")[4]}
            </td>

            <td className="py-5 pr-6 text-sm text-gray-700 whitespace-nowrap">
                {name}
            </td>

            <td className="py-5 pr-6 text-sm text-gray-600 whitespace-nowrap">
                {createdAt?.split("T")[0]}
            </td>

            <td className="py-5 whitespace-nowrap">

                <div className="flex items-center gap-3">

                    <Link to={`/admin/category/edit/${id}`} className="flex size-10 items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100">
                        <FiEdit className="text-lg" />
                    </Link>

                    <button
                        onClick={() => {
                            if (confirm("Are You Want To Sure For Delete Category ? ")) {
                                onDelete(id)
                            }
                        }}
                        className="flex size-10 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50">
                        <FiTrash2 className="text-lg" />
                    </button>

                </div>

            </td>

        </tr>

    )
}
