import React from 'react'

export default function CheckoutSummary({ value }) {
    const { product, productPrice, quantity } = value
    return (
        <div className="flex items-center gap-4">
            <img
                src={product.imagesUrl[0]}
                alt="product"
                className="size-20 rounded-2xl object-cover"
            />

            <div className="flex-1">
                <h3 className="text-sm font-semibold text-black">
                    {product.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                    Qty: {quantity}
                </p>
            </div>

            <span className="text-sm font-semibold text-black">
                ₹{productPrice}
            </span>
        </div>
    )
}
