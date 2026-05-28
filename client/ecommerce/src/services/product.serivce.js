import { api } from "./api.client"

export const productAddService = async (data, token) => {
    return api.post("/product/add", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const productViewService = (filterProducts=null, skip) => {
    // console.log(filterProducts.priceFilter[0]);
    console.log(filterProducts);
    
    if (filterProducts!=null || skip) {
        return api.get("/product/view", {
            params: {
                categoryId: filterProducts?.categoryFilter?.join(","),
                sorting: filterProducts?.sorting,
                name: filterProducts?.name,
                priceFrom: filterProducts?.priceFilter[0],
                priceTo: filterProducts?.priceFilter[1],
                skip
            }
        })
    }
    else {
        return api.get("/product/view")
    }

}

export const productViewBySlug = (slug) => {
    return api.get(`/product/view/${slug}`)
}

export const productDeleteService = (id, token) => {
    return api.delete(`/product/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const poductEditService = (id, data, token) => {
    return api.put(`/product/edit/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}