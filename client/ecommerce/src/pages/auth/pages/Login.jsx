import React from 'react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-black">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Login to your account
                    </p>
                </div>

                <LoginForm />



                <p className="mt-8 text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <Link to={'/register'}

                        className="font-semibold text-black hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )
}
