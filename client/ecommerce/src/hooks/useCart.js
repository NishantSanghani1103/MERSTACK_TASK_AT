import { useSelector } from "react-redux"

export const useCart = () => {
    const cart = useSelector((store) => store.cart)
    return cart
}