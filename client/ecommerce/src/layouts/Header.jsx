import React, { useState } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../slice/userSlice';
import { useCart } from '../hooks/useCart';
export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, token } = useAuth()
    const { cart } = useCart()


    return (
        <header className="w-full border-b sticky top-0 z-1 border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
                <h1 className="text-2xl font-bold text-black">
                    ShopNest
                </h1>

                <nav className="hidden items-center gap-8 md:flex">
                    <Link to={'/home'} className="text-sm font-medium text-gray-700 hover:text-black">
                        Home
                    </Link>

                    <Link to={'/products'} className="text-sm font-medium text-gray-700 hover:text-black">
                        Shop
                    </Link>

                    <Link to={'/order'} className="text-sm font-medium text-gray-700 hover:text-black">
                        Orders
                    </Link>

                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-black">
                        Contact
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to={'/cart'} className="hidden rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-black hover:text-white md:block">
                        Cart  ({cart.length})
                    </Link>
                    {
                        user ? (
                            <button
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to logout?")) {
                                        dispatch(logOut());

                                    }
                                }}
                                className="hidden cursor-pointer rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 md:block"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/"
                                className="hidden cursor-pointer rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 md:block"
                            >
                                Login
                            </Link>
                        )
                    }

                    <button
                        onClick={() => setShowMenu(true)}
                        className="md:hidden"
                    >
                        <CiMenuBurger className="text-3xl" />
                    </button>
                </div>
            </div>

            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${showMenu
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                    }`}
                onClick={() => setShowMenu(false)}
            ></div>

            <div
                className={`fixed left-0 top-0 z-50 h-full w-72 bg-white p-6 transition-transform duration-300 ${showMenu ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Menu
                    </h2>

                    <button onClick={() => setShowMenu(false)}>
                        <IoCloseOutline className="text-4xl" />
                    </button>
                </div>

                <div className="flex flex-col gap-5">
                    <a href="#" className="text-base font-medium text-gray-700 hover:text-black">
                        Home
                    </a>

                    <a href="#" className="text-base font-medium text-gray-700 hover:text-black">
                        Shop
                    </a>

                    <a href="#" className="text-base font-medium text-gray-700 hover:text-black">
                        Categories
                    </a>

                    <a href="#" className="text-base font-medium text-gray-700 hover:text-black">
                        Contact
                    </a>
                </div>

                <div className="mt-10 flex flex-col gap-3">
                    <button className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium">
                        Cart
                    </button>

                    <button className="rounded-lg cursor-pointer bg-black px-4 py-3 text-sm font-medium text-white">
                        Login
                    </button>

                </div>
            </div>
        </header >
    )
}
