import React from 'react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import RegisterForm from '../components/RegisterForm'

export default function Register() {



    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-black">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Register to get started
                    </p>
                </div>

                <RegisterForm />


            </div>
        </div>
    )
}
