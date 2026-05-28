/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { categoryDeleteService, categoryViewService } from '../../../../../services/category.service';
import { toast } from 'react-toastify';
import CategoryRow from '../components/CategoryRow';

export default function CategoryView() {
    const [categoryData, setcategoryData] = useState([])
    const [loading, setloading] = useState(true)

    const categoryView = async () => {
        try {
            const res = await categoryViewService();

            setcategoryData(res?.data?.data);
            setloading(false);

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const categoryDelete = async (id) => {
        try {
            const res = await categoryDeleteService(id)
            toast.success(res?.data?.message);
            categoryView()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        categoryView()
    }, [])
    return (
        <div className="flex-1 p-4 lg:p-8">

            <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">

                <h1 className="text-3xl font-bold text-black">
                    Categories
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage all product categories
                </p>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">

                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">



                </div>

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="border-b border-gray-200 text-left">

                                <th className="pb-4 pr-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    ID
                                </th>

                                <th className="pb-4 pr-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Category Name
                                </th>

                                <th className="pb-4 pr-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Created Date
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
                                    categoryData.length == 0
                                        ?
                                        <p>Category Not Found...</p>
                                        :
                                        categoryData?.map((value) => <CategoryRow
                                            key={value.id}
                                            value={value}
                                            onDelete={categoryDelete}
                                        />)
                            }


                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}
