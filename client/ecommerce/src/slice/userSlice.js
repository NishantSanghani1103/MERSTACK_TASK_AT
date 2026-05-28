import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("USER")) ?? null,
        token: localStorage.getItem("TOKEN") ?? ""
    },
    reducers: {
        logIn: (state, action) => {
            console.log(action.payload);
            
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem("USER", JSON.stringify(state.user))
            localStorage.setItem("TOKEN", state.token)
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            localStorage.clear()
        }
    }
})

export const { logIn, logOut } = userSlice.actions
export default userSlice.reducer