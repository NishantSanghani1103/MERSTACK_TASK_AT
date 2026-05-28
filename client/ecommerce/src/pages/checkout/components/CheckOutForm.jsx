import React from 'react'

export default function CheckOutForm() {
    return (
        <form action="">
            <div className="mb-10">
                <h2 className="mb-6 text-2xl font-bold text-black">
                    Shipping Address
                </h2>

                <div className="grid gap-5 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        className="rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black md:col-span-2"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black md:col-span-2"
                    />

                    <input
                        type="text"
                        placeholder="Street Address"
                        className="rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black md:col-span-2"
                    />

                    <input
                        type="text"
                        placeholder="City"
                        className="rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                    />

                    <input
                        type="text"
                        placeholder="State"
                        className="rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                    />

                    <input
                        type="text"
                        placeholder="ZIP Code"
                        className="rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                    />

                    <input
                        type="text"
                        placeholder="Country"
                        className="rounded-2xl border border-gray-300 px-4 py-4 text-sm outline-none focus:border-black"
                    />
                </div>
            </div>

            <div>
                <h2 className="mb-6 text-2xl font-bold text-black">
                    Payment Method
                </h2>

                <div className="space-y-4">
                    <label className="flex items-center gap-3 rounded-2xl border border-gray-300 p-4">
                        <input type="radio" name="payment" />
                        <span className="text-sm font-medium text-gray-700">
                            Credit / Debit Card
                        </span>
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-gray-300 p-4">
                        <input type="radio" name="payment" />
                        <span className="text-sm font-medium text-gray-700">
                            UPI Payment
                        </span>
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-gray-300 p-4">
                        <input type="radio" name="payment" />
                        <span className="text-sm font-medium text-gray-700">
                            Cash on Delivery
                        </span>
                    </label>
                </div>
            </div>
        </form>
    )
}
