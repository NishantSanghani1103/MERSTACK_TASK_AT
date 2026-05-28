import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { toast } from 'react-toastify'
import { cartAddService, cartDeleteService } from '../../../services/cart.service'
import { useCart } from '../../../hooks/useCart'
import { useDispatch } from 'react-redux'
import { fetchCart } from '../../../slice/cartSlice'

export default function HomeProductRow({ value }) {
    const { id, name, imagesUrl, description, category, stock, price, slug } = value
    const { user, token } = useAuth()
    const [isLoading, setisLoading] = useState(true)
    const { cart, loading } = useCart()
    const dispatch = useDispatch()
    const addToCart = async (id) => {
        try {
            const res = await cartAddService({
                productId: id,
                productPrice: price,
                quantity: "1"
            }, token)
            toast.success(res?.data?.message)
            dispatch(fetchCart())
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }

    }

    const checkCart = cart.filter((items) => items.productId == id)
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <img
                src={imagesUrl[0]}
                alt="product"
                className="h-72 w-full object-cover"
            />

            <div className="p-5">
                <Link to={`/product/${slug}`}>
                    <h3 className="text-lg line-clamp-1 font-semibold capitalize text-black">
                        {name}
                    </h3>
                </Link>

                <p className="mt-2 grid grid-cols-[50%_auto] justify-between text-sm  capitalize text-gray-500">
                    <p className='line-clamp-1'>{description}</p>
                    
                    <span>{
                        stock == 0
                            ?
                            <p className='text-red-500'>Out Of Stock</p>
                            :
                            <p className='text-green-500'>{`In Stock : ${stock}`}</p>
                    }</span>
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-black">
                        ₹ {price}
                    </span>
                    {
                        stock == 0
                            ?
                            <button
                                disabled={true}

                                className={`rounded-lg bg-gray-600 px-4 py-2 text-sm cursor-not-allowed
                                 text-white`}>
                               Out Of Stock
                            </button>
                            :
                            checkCart.length == 1
                                ?
                                <button

                                    className="rounded-lg bg-red-500 px-4 py-2 text-sm
                        cursor-pointer
                        text-white">
                                    Added
                                </button>


                                :
                                <button
                                    disabled={loading}
                                    onClick={() => addToCart(id)}
                                    className={`rounded-lg bg-black px-4 py-2 text-sm
                        ${loading ? 'cursor-progress' : 'cursor-pointer'}
                        text-white`}>
                                    Add
                                </button>
                    }

                </div>
            </div>
        </div>
    )
}
