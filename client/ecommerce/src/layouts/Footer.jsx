import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="mt-16 border-t border-gray-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

                <div>
                    <h2 className="text-2xl font-bold text-black">
                        ShopNest
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-gray-600">
                        Discover premium products with modern style and best quality for your daily lifestyle.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-lg font-semibold text-black">
                        Quick Links
                    </h3>

                    <div className="flex flex-col gap-3">
                        <a href="#" className="text-sm text-gray-600 hover:text-black">
                            Home
                        </a>

                        <a href="#" className="text-sm text-gray-600 hover:text-black">
                            Shop
                        </a>

                        <a href="#" className="text-sm text-gray-600 hover:text-black">
                            Categories
                        </a>

                        <a href="#" className="text-sm text-gray-600 hover:text-black">
                            Contact
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 text-lg font-semibold text-black">
                        Support
                    </h3>

                    <div className="flex flex-col gap-3">
                        <a href="#" className="text-sm text-gray-600 hover:text-black">
                            Help Center
                        </a>

                        <a href="#" className="text-sm text-gray-600 hover:text-black">
                            Privacy Policy
                        </a>

                        <a href="#" className="text-sm text-gray-600 hover:text-black">
                            Terms & Conditions
                        </a>

                        <a href="#" className="text-sm text-gray-600 hover:text-black">
                            FAQs
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 text-lg font-semibold text-black">
                        Follow Us
                    </h3>

                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="flex size-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-black hover:text-white"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="#"
                            className="flex size-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-black hover:text-white"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="#"
                            className="flex size-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-black hover:text-white"
                        >
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 py-5 text-center">
                <p className="text-sm text-gray-500">
                    © 2026 ShopNest. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
