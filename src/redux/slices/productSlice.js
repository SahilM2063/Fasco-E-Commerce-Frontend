/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL.js";

// initial state for product
const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

// product actions

export const createProductAction = createAsyncThunk(
    "products/createProduct",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const {
                name,
                description,
                brand,
                category,
                sizes,
                colors,
                price,
                totalQty,
            } = payload;

            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            const { data } = await axios.post(`${baseURL}/products/create-product`, {
                name,
                description,
                brand,
                category,
                sizes,
                colors,
                price,
                totalQty,
            }, config);
            return data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createProductAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAdded = true;
            state.product = action.payload;
        });
        builder.addCase(createProductAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.product = {};
        });
    },
})


export default productSlice.reducer