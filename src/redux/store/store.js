import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice.js"
import productReducer from "../slices/productSlice.js"

const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer
    },
})


export default store;