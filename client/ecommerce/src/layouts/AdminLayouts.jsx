import React, { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logOut } from '../slice/userSlice'
import { useDispatch } from 'react-redux'
import { useAuth } from '../hooks/useAuth'

export default function AdminLayouts({ userRole }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useAuth()

    const [openSidebar, setOpenSidebar] = useState(false)

    useEffect(() => {

        if (!user) {
            navigate("/")
        }
        else if (!userRole.includes(user.role)) {
            navigate("/unauthorized")
        }

    }, [user, navigate])

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="flex">

                <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-black px-4 py-4 lg:hidden">

                    <h1 className="text-2xl font-bold text-white">
                        Admin
                    </h1>

                    <button
                        onClick={() => setOpenSidebar(true)}
                        className="text-white"
                    >
                        <FiMenu className="text-3xl" />
                    </button>

                </div>

                <div
                    className={`fixed inset-0 z-50 bg-black/40 transition-all duration-300 lg:hidden
                    ${openSidebar ? "visible opacity-100" : "invisible opacity-0"}
                `}
                >

                    <div
                        className={`min-h-screen w-72 bg-black p-6 text-white transition-all duration-300
                        ${openSidebar ? "translate-x-0" : "-translate-x-full"}
                    `}
                    >

                        <div className="mb-10 flex items-center justify-between">

                            <h1 className="text-3xl font-bold">
                                Admin
                            </h1>

                            <button
                                onClick={() => setOpenSidebar(false)}
                            >
                                <FiX className="text-3xl" />
                            </button>

                        </div>

                        <div className="flex flex-col gap-3">

                            <NavLink
                                to={'/admin/dashboard'}
                                onClick={() => setOpenSidebar(false)}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                            >
                                Dashboard
                            </NavLink>


                            <NavLink
                                to={'/admin/product/add'}
                                onClick={() => setOpenSidebar(false)}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                            >
                                Products Add
                            </NavLink>

                            <NavLink
                                to={'/admin/product/view'}
                                onClick={() => setOpenSidebar(false)}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                            >
                                Products View
                            </NavLink>

                            <NavLink
                                to={'/admin/order/view'}
                                onClick={() => setOpenSidebar(false)}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                            >
                                Orders
                            </NavLink>

                            <NavLink
                                to={'/admin/customer/view'}
                                onClick={() => setOpenSidebar(false)}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                            >
                                Customers
                            </NavLink>

                            <button
                                onClick={() => {

                                    if (confirm("Are You Want To Logout ? ")) {
                                        dispatch(logOut())
                                    }

                                }}
                                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

                <div className="hidden min-h-screen w-72 bg-black p-6 text-white lg:block">

                    <h1 className="mb-10 text-3xl font-bold">
                        Admin
                    </h1>

                    <div className="flex flex-col gap-3">

                        <NavLink
                            to={'/admin/dashboard'}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to={'/admin/category/add'}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                        >
                            Category Add
                        </NavLink>

                        <NavLink
                            to={'/admin/category/view'}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                        >
                            Category View
                        </NavLink>

                        <NavLink
                            to={'/admin/product/add'}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                        >
                            Products Add
                        </NavLink>

                        <NavLink
                            to={'/admin/product/view'}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                        >
                            Products View
                        </NavLink>

                        <NavLink
                            to={'/admin/order/view'}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                        >
                            Orders
                        </NavLink>

                        <NavLink
                            to={'/admin/customer/view'}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                        >
                            Customers
                        </NavLink>

                        <button
                            onClick={() => {

                                if (confirm("Are You Want To Logout ? ")) {
                                    dispatch(logOut())
                                }

                            }}
                            className="rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-300 hover:bg-white hover:text-black"
                        >
                            Logout
                        </button>

                    </div>

                </div>

                <div className="w-full pt-[72px] lg:pt-0">
                    <Outlet />
                </div>

            </div>

        </div>
    )
}