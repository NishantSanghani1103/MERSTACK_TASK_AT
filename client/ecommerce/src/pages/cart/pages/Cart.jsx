/* eslint-disable no-useless-assignment */
import React from 'react'
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import CartTable from '../components/CartTable';
import { useCart } from '../../../hooks/useCart';
import CartSummary from '../components/CartSummary';
export default function Cart() {
    const { cart, loading, error } = useCart()
    console.log(cart);

    const cartTotal = cart.reduce((acc, cuu) => acc += cuu.productPrice * cuu.quantity, 0)


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-black">
                        Shopping Cart
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Review your selected products
                    </p>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1 space-y-6">
                        {
                            loading
                                ?
                                <p>Loading....</p>
                                :
                                cart?.length > 0
                                    ? cart.map((value) => (
                                        <CartTable key={value.id} value={value} />
                                    ))
                                    : <p>Your Cart Is Empty....</p>

                        }
                    </div>

                    <CartSummary cartTotal={cartTotal} />

                </div>
            </div>
        </div >
    )
}
