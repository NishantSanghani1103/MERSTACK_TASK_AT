import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAddToCart } from '../../../utils/addTocart.utils';
import { useCart } from '../../../hooks/useCart';


export default function ProductRow({ value, cart }) {
    const { id, imagesUrl, name, price, description, slug, stock } = value
    console.log(cart);

    const addToCart = useAddToCart()

    const checkCart = cart.filter((value) => value.productId === id)
    console.log("dsds", checkCart);

    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <img
                src={imagesUrl[0]}
                alt="product"
                className="h-72 w-full object-cover"
            />

            <div className="p-5">

                <Link to={`/product/${slug}`}>
                    <h2 className="text-lg font-semibold text-black line-clamp-1">
                        {name}
                    </h2>
                </Link>

                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                    <span className="text-xl font-bold text-black">
                        ₹{price}
                    </span>
                    {
                        checkCart.length == 1
                            ?
                            <button

                                className="rounded-xl cursor-not-allowed bg-red-500  px-4 py-2 text-sm text-white">
                                Added
                            </button>
                            :
                            <button
                                disabled={stock == 0}
                                onClick={() => addToCart({
                                    productId: id,
                                    productPrice: price,
                                    quantity: "1"
                                })}
                                className={`rounded-xl ${stock == 0 ? 'cursor-not-allowed bg-gray-600' : ' cursor-pointer'} bg-black px-4 py-2 text-sm text-white`}>
                                {stock==0 ? 'Out Of Stock':'Add'}
                            </button>
                    }

                </div>
            </div>
        </div>
    )
}
