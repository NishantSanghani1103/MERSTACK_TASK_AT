import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AuthLayout() {
    const { user, token } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (user?.role === "ADMIN") {
            navigate("/admin/dashboard")
        }
        else if (user?.role === "CUSTOMER") {
            navigate("/home")
        }
    }, [user, navigate])
    return (
        <Outlet />
    )
}
