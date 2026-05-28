/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { categoryViewService } from '../../../services/category.service'

export default function ProductFilter({ filterProducts, setfilterProducts, setskip }) {
    const [categoryData, setcategoryData] = useState([])
    const getCategory = async () => {
        try {
            const res = await categoryViewService()
            setcategoryData(res?.data?.data)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const checkedCategory = (event) => {
        if (event.target.checked) {
            setskip(1)
            setfilterProducts({
                ...filterProducts,
                categoryFilter: [...filterProducts.categoryFilter, event.target.value]
            })
        }
        else {
            setfilterProducts({
                ...filterProducts,
                categoryFilter: filterProducts.categoryFilter.filter((value) => value != event.target.value)
            })
        }

    }
    useEffect(() => {
        getCategory()
    }, [])
    return (
        <div className="h-fit rounded-3xl bg-white p-6 shadow-sm lg:w-[280px]">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-black">
                    Filters
                </h2>
            </div>

            <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-black">
                    Categories
                </h3>

                <div className="flex flex-col gap-3">
                    {
                        categoryData?.map((value, index) => {
                            return (
                                <label key={value.id} className="flex items-center gap-3 text-sm text-gray-700">
                                    <input onChange={(e) => checkedCategory(e)} type="checkbox" value={value.id} />
                                    {value.name}
                                </label>
                            )
                        })
                    }



                </div>
            </div>

            <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-black">
                    Price Range
                </h3>

                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input type="radio" name="price" onClick={() => {
                            setskip(1)
                            setfilterProducts({
                                ...filterProducts,
                                priceFilter: [0, 1000]
                            })
                        }} />
                        Under ₹1,000
                    </label>

                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input type="radio" name="price"
                            onClick={() => {
                                setskip(1)
                                setfilterProducts({
                                    ...filterProducts,
                                    priceFilter: [1000, 5000]
                                })
                            }}
                        />
                        ₹1,000 - ₹5,000
                    </label>

                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input type="radio" name="price"
                            onClick={() => {
                                setskip(1)
                                setfilterProducts({
                                    ...filterProducts,
                                    priceFilter: [5000, 10000]
                                })
                            }}
                        />
                        ₹5,000 - ₹10,000
                    </label>

                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input type="radio" name="price"
                            onClick={() => {
                                setskip(1)
                                setfilterProducts({
                                    ...filterProducts,
                                    priceFilter: [10000, Infinity]
                                })
                            }}
                        />
                        Above ₹10,000
                    </label>
                </div>
            </div>
        </div>
    )
}
