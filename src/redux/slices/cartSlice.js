/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL.js";

// initial state for cart
const initialState = {
    cart: [],
    productMsg: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

// cart actions

export const getCartDataAction = createAsyncThunk("cart/getCartData", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.get(`${baseURL}/cart/get-cart`, config);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }
})

export const addToCartAction = createAsyncThunk("cart/addToCart", async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload)
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        console.log(token)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.post(`${baseURL}/cart/addToCart`, payload, config);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCartDataAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.cart = [];
        });
        builder.addCase(getCartDataAction.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        });
        builder.addCase(getCartDataAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.cart = [];
        });

        builder.addCase(addToCartAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isAdded = false;
            state.productMsg = {};
        });
        builder.addCase(addToCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAdded = true;
            state.productMsg = action.payload;
        });
        builder.addCase(addToCartAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.productMsg = {};
        });
    },
})

export default cartSlice.reducer