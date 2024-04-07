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

export const updateCartAction = createAsyncThunk("cart/updateCart", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { id, quantity } = payload
        console.log(id, quantity)
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.put(`${baseURL}/cart/updateCart/${id}`, payload, config);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }
})

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.delete(`${baseURL}/cart/removeFromCart/${id}`, config);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }
})

export const clearCartAction = createAsyncThunk("cart/clearCart", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.delete(`${baseURL}/cart/clearCart`, config);
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
            state.isAdded = false;
            state.isDeleted = false;
            state.cart = [];
        });
        builder.addCase(getCartDataAction.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            state.isAdded = false;
            state.isDeleted = false;
        });
        builder.addCase(getCartDataAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.isDeleted = false;
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

        builder.addCase(updateCartAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isUpdated = false
            state.productMsg = {};
        });
        builder.addCase(updateCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = true;
            state.productMsg = action.payload;
        });
        builder.addCase(updateCartAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isUpdated = false
            state.productMsg = {};
        })


        builder.addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isDeleted = false;
            state.productMsg = {};
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = true;
            state.productMsg = action.payload;
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isDeleted = false;
            state.productMsg = {};
        });

        // clear whole cart
        builder.addCase(clearCartAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isDeleted = false;
            state.cart = [];
        });
        builder.addCase(clearCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = true;
            state.cart = action.payload;
        });
        builder.addCase(clearCartAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isDeleted = false;
            state.cart = [];
        })
    },
})

export default cartSlice.reducer