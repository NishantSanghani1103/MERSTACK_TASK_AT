import { useDispatch } from "react-redux";
import { cartAddService } from "../services/cart.service";
import { toast } from "react-toastify";
import { fetchCart } from "../slice/cartSlice";

export const useAddToCart = () => {
    const dispatch = useDispatch();

    const addToCart = async (obj) => {
        try {
            // console.log(obj);

            const res = await cartAddService(obj);

            toast.success(res?.data?.message);

            dispatch(fetchCart());

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    return addToCart;
};