/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { categoryAddController, categoryEditService, categorySingleViewService } from '../../../../../services/category.service'
import { useNavigate, useParams } from 'react-router-dom'

export default function CategoryAdd() {
    const [categoryValue, setcategoryValue] = useState("")
    const [loading, setloading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    const categorySave = async (event) => {
        event.preventDefault()
        let res
        try {
            if (categoryValue.length <= 2) {
                toast.error("Category Must Be More Than 2 Character")
            }
            else {
                if (id) {
                    res = await categoryEditService(id, categoryValue)
                }
                else {
                    res = await categoryAddController(categoryValue)
                }
                toast.success(res?.data?.message)
                setTimeout(() => {
                    navigate("/admin/category/view")
                }, 200)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const singleView = async () => {
        try {
            const res = await categorySingleViewService(id)
            setcategoryValue(res?.data?.data?.name)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
    useEffect(() => {
        if (id) {
            singleView()
        }
    }, [])
    return (
        <div className="flex-1 p-4 lg:p-8">

            <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">

                <h1 className="text-3xl font-bold text-black">
                    Add Category
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Add new category details
                </p>

            </div>

            <form onSubmit={categorySave}>

                <div className="rounded-3xl bg-white p-6 shadow-sm">

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Category Name
                            </label>

                            <input
                                type="text"
                                value={categoryValue}
                                onChange={(e) => setcategoryValue(e.target.value)}
                                placeholder="Enter category name"
                                className="w-full rounded-2xl border px-4 py-4 text-sm"
                            />
                        </div>

                    </div>

                    <div className="mt-8">

                        <button

                            type="submit"
                            className={`rounded-2xl bg-black px-8 py-4 text-white hover:bg-gray-800`}
                        >
                            {id ? 'Update' : 'Add'} Category
                        </button>

                    </div>

                </div>

            </form>

        </div>
    )
}
