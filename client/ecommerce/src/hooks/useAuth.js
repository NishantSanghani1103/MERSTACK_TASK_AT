import { useSelector } from "react-redux"

export const useAuth = () => {
    const user = useSelector((store) => store.user)
    return user
}