import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cartViewService } from "../services/cart.service"
import { logOut } from "./userSlice"

export const fetchCart = createAsyncThunk(
    '/cart/fetchById',
    async (_, { rejectWithValue }) => {
        try {
            const res = await cartViewService(localStorage.getItem("TOKEN") ?? '')
            console.log(res);

            return res?.data
        } catch (error) {
            const message = error?.response?.data?.message || error?.message
            // toast.error(message)
            return rejectWithValue(message)
        }
    }
)


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        loading: true,
        cart: [],
        error: ""

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cart = action.payload.data
            state.loading = false
        })
            .addCase(fetchCart.pending, (state, action) => {
                state.loading = false
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.error = action.payload.message,
                    state.loading = false
            })
            .addCase(logOut, (state, action) => {
                state.cart = []
                state.cartImagePath = ""
            })

    }
})

export default cartSlice.reducer