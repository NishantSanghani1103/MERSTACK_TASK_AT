import { api } from "./api.client"

export const userViewService = () => {
    return api.get("/user/view")
}

export const userDeleteService = (id) => {
    return api.delete(`/user/delete/${id}`)
}