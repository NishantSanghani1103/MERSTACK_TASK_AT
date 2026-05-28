import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useAuth } from '../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { fetchCart } from '../slice/cartSlice'

export default function MainLayout({ userRole }) {
    const { user } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        // console.log(user);
        dispatch(fetchCart())
        if (!user) {
            navigate("/")
        }

        else if (!userRole.includes(user?.role)) {
            navigate('/unauthorized')
        }

    }, [user, navigate])
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
