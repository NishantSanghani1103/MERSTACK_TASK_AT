import { api } from "./api.client"

export const orderAddService = (data, token) => {
    return api.post("/order/add", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
export const orderViewByIdService = (token) => {
    return api.get("/order/view", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const orderViewAllService = () => {
    return api.get("/order/view-all")
}
export const orderStatusChangeService = (array) => {
    const id = array[0]
    const value=array[1]
    return api.put(`/order/edit-status/${id}`, {}, {
        params: {
            status: value
        }
    })
}