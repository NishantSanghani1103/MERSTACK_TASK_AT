/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { FiEye, FiSearch, FiTrash2 } from 'react-icons/fi'
import CustomerRow from '../components/CustomerRow'
import { toast } from 'react-toastify'
import { userDeleteService, userViewService } from '../../../../../services/user.service'

export default function CustomerView() {
    const [userData, setuserData] = useState([])
    const [loading, setloading] = useState(true)
    const userView = async () => {
        try {
            const res = await userViewService()
            setuserData(res?.data?.data)
            setloading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const userDelete = async (id) => {
        try {
            const res = await userDeleteService(id)
            toast.success(res?.data?.message)
            userView()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
    useEffect(() => {
        userView()
    }, [])
    return (
        <div className="flex-1 p-4 lg:p-8">

            <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
                <h1 className="text-3xl font-bold text-black">
                    Customers
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage all registered customers
                </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">



                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px] border-collapse">

                        <thead>
                            <tr className="border-b border-gray-200 text-left">
                                <th className="pb-4 text-sm font-semibold text-gray-600">
                                    Customer
                                </th>

                                <th className="pb-4 text-sm font-semibold text-gray-600">
                                    Phone
                                </th>



                                <th className="pb-4 text-sm font-semibold text-gray-600">
                                    Joined
                                </th>



                                <th className="pb-4 text-sm font-semibold text-gray-600">
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
                                    userData?.map((value, index) => <CustomerRow
                                        key={value.id}
                                        value={value} 
                                        userDelete={userDelete}
                                        />)
                            }




                        </tbody>

                    </table>

                </div>

            </div>

        </div>


    )
}
