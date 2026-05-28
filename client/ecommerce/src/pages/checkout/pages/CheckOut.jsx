import React from 'react'
import { useCart } from '../../../hooks/useCart'
import CheckoutSummary from '../components/CheckoutSummary'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '../../../validation/zodValidation'
import { orderAddService } from '../../../services/order.service'
import { toast } from 'react-toastify'
import { useAuth } from '../../../hooks/useAuth'
import { fetchCart } from '../../../slice/cartSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function CheckOut() {

    const { loading, cart, error } = useCart()
    const { token } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartTotal = cart.reduce(
        (acc, cuu) => acc + cuu.productPrice * cuu.quantity,
        0
    )

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            touchedFields
        },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
    })

    const orderSubmit = async (data) => {
        // const finalData = {
        //     ...data,
        //     cartItems: cart,
        //     totalAmount: cartTotal
        // }
        // console.log(finalData)

        await orderAdd(data)
    }

    const orderAdd = async (data) => {
        try {

            const res = await orderAddService(data, token)

            toast.success(res?.data?.message)

            dispatch(fetchCart())

            setTimeout(() => {
                navigate("/order")
            }, 1000)

        } catch (error) {

            toast.error(
                error?.response?.data?.message || error.message
            )
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-black">
                        Checkout
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Complete your order details
                    </p>
                </div>

                <form onSubmit={handleSubmit(orderSubmit)}>

                    <div className="flex flex-col gap-6 lg:flex-row">

                        <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm">

                            <div className="mb-10">

                                <h2 className="mb-6 text-2xl font-bold text-black">
                                    Shipping Address
                                </h2>

                                <div className="grid gap-5 md:grid-cols-2">

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            {...register("firstName")}
                                            className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                                        />

                                        {touchedFields.firstName && errors.firstName &&
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.firstName.message}
                                            </p>
                                        }
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            {...register("lastName")}
                                            className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                                        />

                                        {touchedFields.lastName && errors.lastName &&
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.lastName.message}
                                            </p>
                                        }
                                    </div>

                                    <div className="md:col-span-2">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            {...register("email")}
                                            className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                                        />

                                        {touchedFields.email && errors.email &&
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.email.message}
                                            </p>
                                        }
                                    </div>

                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            placeholder="Phone Number"
                                            {...register("phone")}
                                            className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                                        />

                                        {touchedFields.phone && errors.phone &&
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.phone.message}
                                            </p>
                                        }
                                    </div>

                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            placeholder="Street Address"
                                            {...register("address")}
                                            className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                                        />

                                        {touchedFields.address && errors.address &&
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.address.message}
                                            </p>
                                        }
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            {...register("city")}
                                            className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                                        />

                                        {touchedFields.city && errors.city &&
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.city.message}
                                            </p>
                                        }
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="State"
                                            {...register("state")}
                                            className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                                        />

                                        {touchedFields.state && errors.state &&
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.state.message}
                                            </p>
                                        }
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="ZIP Code"
                                            {...register("postalCode")}
                                            className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                                        />

                                        {touchedFields.postalCode && errors.postalCode &&
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.postalCode.message}
                                            </p>
                                        }
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Country"
                                            {...register("country")}
                                            className="w-full rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                                        />

                                        {touchedFields.country && errors.country &&
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.country.message}
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div>

                                <h2 className="mb-6 text-2xl font-bold text-black">
                                    Payment Method
                                </h2>

                                <div className="space-y-4">

                                    <label className="flex items-center gap-3 rounded-2xl border border-gray-300 p-4">
                                        <input
                                            type="radio"
                                            value="Credit / Debit Card"
                                            {...register("paymentMethod")}
                                        />

                                        <span className="text-sm font-medium text-gray-700">
                                            Credit / Debit Card
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-3 rounded-2xl border border-gray-300 p-4">
                                        <input
                                            type="radio"
                                            value="UPI Payment"
                                            {...register("paymentMethod")}
                                        />

                                        <span className="text-sm font-medium text-gray-700">
                                            UPI Payment
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-3 rounded-2xl border border-gray-300 p-4">
                                        <input
                                            type="radio"
                                            value="Cash on Delivery"
                                            {...register("paymentMethod")}
                                        />

                                        <span className="text-sm font-medium text-gray-700">
                                            Cash on Delivery
                                        </span>
                                    </label>

                                    {touchedFields.paymentMethod && errors.paymentMethod &&
                                        <p className="text-sm text-red-500">
                                            {errors.paymentMethod.message}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="h-fit rounded-3xl bg-white p-6 shadow-sm lg:w-[380px]">

                            <h2 className="text-2xl font-bold text-black">
                                Order Summary
                            </h2>

                            <div className="mt-8 space-y-5">

                                {
                                    cart.length == 0 ?
                                        <p>Loading...</p>
                                        : error ?
                                            <p>{error.message}</p>
                                            :
                                            cart.map((value) => (
                                                <CheckoutSummary
                                                    key={value.id}
                                                    value={value}
                                                />
                                            ))

                                }

                                <div className="border-t border-gray-200 pt-5">

                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Subtotal
                                        </span>

                                        <span className="text-sm font-semibold text-black">
                                            ₹{cartTotal.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Shipping
                                        </span>

                                        <span className="text-sm font-semibold text-black">
                                            ₹0
                                        </span>
                                    </div>

                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Tax
                                        </span>

                                        <span className="text-sm font-semibold text-black">
                                            ₹0
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-200 pt-5">
                                        <span className="text-lg font-bold text-black">
                                            Total
                                        </span>

                                        <span className="text-2xl font-bold text-black">
                                            ₹{cartTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className={`mt-8 w-full rounded-2xl bg-black py-4 text-sm font-medium text-white hover:bg-gray-800 ${isSubmitting
                                        ? "cursor-progress"
                                        : "cursor-pointer"
                                        }`}
                                >
                                    {isSubmitting
                                        ? "Processing..."
                                        : "Place Order"}
                                </button>

                            </div>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}