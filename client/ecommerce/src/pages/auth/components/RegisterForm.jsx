import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../../../validation/zodValidation'
import { toast } from 'react-toastify'
import { registerService } from '../../../services/auth.service'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, touchedFields, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema)
    })


    const registerSave = async (data) => {

        try {
            const res = await registerService(data)
            toast.success(res?.data?.message);
            reset()
            setTimeout(() => {
                navigate("/")
            }, 2000)

        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message)
        }

    }

    return (
        <form onSubmit={handleSubmit(registerSave)} className="space-y-5">

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                </label>

                <input
                    type="text"
                    name='name'
                    {...register("name")}
                    placeholder="Enter your full name"
                    className={`w-full rounded-2xl border border-gray-300 ${touchedFields.name && errors.name?.message && 'border-red-500'} px-4 py-4 text-sm outline-none focus:border-black`}
                />
                <p className='text-red-500'>{touchedFields.name && errors.name?.message}</p>
            </div>
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                </label>

                <input
                    type="email"
                    name='email'
                    {...register("email")}
                    placeholder="Enter your email"
                    className={`w-full rounded-2xl border border-gray-300 ${touchedFields.email && errors.email?.message && 'border-red-500'} px-4 py-4 text-sm outline-none focus:border-black`}
                />

                <p className='text-red-500'>
                    {touchedFields.email && errors.email?.message}
                </p>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                </label>

                <input
                    type="text"
                    name='phone'
                    {...register("phone")}
                    placeholder="Enter your phone number"
                    className={`w-full rounded-2xl border border-gray-300 ${touchedFields.phone && errors.phone?.message && 'border-red-500'} px-4 py-4 text-sm outline-none focus:border-black`}
                />

                <p className='text-red-500'>
                    {touchedFields.phone && errors.phone?.message}
                </p>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                </label>

                <input
                    type="password"
                    name='password'
                    {...register("password")}
                    placeholder="Create password"
                    className={`w-full rounded-2xl border border-gray-300 ${touchedFields.password && errors.password?.message && 'border-red-500'} px-4 py-4 text-sm outline-none focus:border-black`}
                />

                <p className='text-red-500'>
                    {touchedFields.password && errors.password?.message}
                </p>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>

                <input
                    type="password"
                    name='confirmPassword'
                    {...register("confirmPassword")}
                    placeholder="Confirm password"
                    className={`w-full rounded-2xl border border-gray-300 ${touchedFields.confirmPassword && errors.confirmPassword?.message && 'border-red-500'} px-4 py-4 text-sm outline-none focus:border-black`}
                />

                <p className='text-red-500'>
                    {touchedFields.confirmPassword && errors.confirmPassword?.message}
                </p>
            </div>


            <button disabled={isSubmitting} className={`w-full ${isSubmitting ? 'cursor-progress  ' : 'cursor-pointer'} rounded-2xl bg-black py-4 text-sm font-medium text-white hover:bg-gray-800`}>
                Create Account
            </button>
        </form>
    )
}
