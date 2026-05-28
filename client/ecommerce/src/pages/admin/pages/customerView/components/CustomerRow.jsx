import React from 'react'
import { FiEye, FiTrash2 } from 'react-icons/fi'

export default function CustomerRow({ value, userDelete }) {
    const { id, name, email, phone, createdAt } = value
    return (
        <tr className="border-b border-gray-100">
            <td className="py-5">
                <div className="flex items-center gap-4">


                    <div>
                        <h3 className="text-sm font-semibold text-black">
                            {name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            {email}
                        </p>
                    </div>

                </div>
            </td>

            <td className="py-5 text-sm text-gray-600">
                +91 {phone}
            </td>


            <td className="py-5 text-sm text-gray-600">
                {createdAt.split("T")[0]}
            </td>



            <td className="py-5">
                <div className="flex items-center gap-3">



                    <button
                        onClick={() => {
                            if (confirm("Do You Want Delete Customer ? ")) {
                                userDelete(id)
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
