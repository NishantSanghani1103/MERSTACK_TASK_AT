import { api } from "./api.client"

export const categoryViewService = () => {
    return api.get("/category/view")
}

export const categoryAddController = (name) => {
    return api.post("/category/add", { name })
}

export const categoryDeleteService = (id) => {
    return api.delete(`category/delete/${id}`)
}
export const categorySingleViewService = (id) => {
    return api.get(`/category/view/${id}`)
}

export const categoryEditService = (id, name) => {
    return api.put(`/category/edit/${id}`, { name })
}