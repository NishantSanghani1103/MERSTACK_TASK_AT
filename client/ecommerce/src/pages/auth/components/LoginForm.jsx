import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../validation/zodValidation';
import { toast } from 'react-toastify';
import { loginService } from '../../../services/auth.service';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../slice/userSlice';
import { useNavigate } from 'react-router-dom';


export default function LoginForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const loginSave = async (data) => {
        try {
            const res = await loginService(data)
            console.log(res);
            toast.success(res?.data?.message)
            dispatch(logIn({
                user: res?.data?.data,
                token: res?.data?.token
            }))
            setTimeout(() => {
                if (res?.data?.data?.role == "ADMIN") {
                    return navigate("/admin/dashboard")
                }
                else {
                    return navigate("/home")
                }
            }, 2000)

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(loginSave)} className="space-y-5">

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                </label>

                <input
                    type="email"
                    name='email'
                    placeholder="Enter your email"
                    {...register("email")}
                    className={`w-full rounded-2xl border ${errors.email?.message && 'border-red-500'}  border-gray-300 px-4 py-4 text-sm outline-none focus:border-black`}
                />
                <p className='text-red-500'>{touchedFields.email && errors.email?.message}</p>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                </label>

                <input
                    type="password"
                    name='password'
                    {...register("password")}
                    placeholder="Enter your password"
                    className={`w-full rounded-2xl border ${touchedFields.password && errors.password?.message && 'border-red-500'}  border-gray-300 px-4 py-4 text-sm outline-none focus:border-black`}
                />
                <p className='text-red-500'>{touchedFields.password && errors.password?.message}</p>
            </div>
            <button disabled={isSubmitting} type='submit' className={`w-full ${isSubmitting ? 'cursor-progress  ' : 'cursor-pointer'} rounded-2xl bg-black py-4 text-sm font-medium text-white hover:bg-gray-800`}>
                Login
            </button>
        </form>
    )
}
