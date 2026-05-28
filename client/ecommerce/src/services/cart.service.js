import { api } from "./api.client"

export const cartAddService = (data, token) => {
    return api.post("/cart/add", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const cartViewService = (token) => {
    return api.get("/cart/view", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const cartDeleteService = (id, token) => {
    return api.delete(`/cart/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const cartUpdateService = (id, quantity, token) => {
    return api.put(`/cart/update-qty/${id}`, {quantity}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

