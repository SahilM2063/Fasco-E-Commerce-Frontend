import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice.js"
import productReducer from "../slices/productSlice.js"
import categoryReducer from "../slices/categorySlice.js"
import brandReducer from "../slices/brandSlice.js"

const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer,
        categories: categoryReducer,
        brands: brandReducer
    },
})


export default store;