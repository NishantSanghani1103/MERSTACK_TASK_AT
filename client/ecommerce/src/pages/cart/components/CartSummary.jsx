import React from 'react'
import { Link } from 'react-router-dom'

export default function CartSummary({ cartTotal }) {
    return (
        <div className="h-fit rounded-3xl bg-white p-6 shadow-sm lg:w-[380px]">
            <h2 className="text-2xl font-bold text-black">
                Order Summary
            </h2>

            <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        Subtotal
                    </span>

                    <span className="text-sm font-semibold text-black">
                        ₹{cartTotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        Shipping
                    </span>

                    <span className="text-sm font-semibold text-black">
                        ₹0
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        Tax
                    </span>

                    <span className="text-sm font-semibold text-black">
                        ₹0
                    </span>
                </div>

                <div className="border-t border-gray-200 pt-5">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-black">
                            Total
                        </span>

                        <span className="text-2xl font-bold text-black">
                            ₹{cartTotal.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <Link to={'/checkout'} className="mt-8 block w-full text-center rounded-2xl bg-black py-4 text-sm font-medium text-white hover:bg-gray-800">
                Proceed to Checkout
            </Link>
        </div>
    )
}
