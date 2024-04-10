/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import baseURL from "../../utils/baseURL.js"

const initialState = {
    orders: [],
    order: {},
    orderStats: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
}

export const createOrderAction = createAsyncThunk("order/createOrder", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.post(`${baseURL}/orders/create-order`, payload, config);
        return window.open(data?.url, "_self");
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})

export const getAllOrders = createAsyncThunk("order/getAllOrders", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.get(`${baseURL}/orders/getAll`, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

export const updateOrderAction = createAsyncThunk("order/updateOrder", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.put(`${baseURL}/orders/update/${payload._id}`, payload, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

export const getOrderStats = createAsyncThunk("order/getOrderStats", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.get(`${baseURL}/orders/sales/stats`, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createOrderAction.pending, (state, action) => {
            state.loading = true;
            state.isAdded = false;
            state.error = null;
            state.order = {};
        });
        builder.addCase(createOrderAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAdded = true;
            state.order = action?.payload;
        });
        builder.addCase(createOrderAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
            state.isAdded = false;
            state.order = {};
        });


        builder.addCase(getAllOrders.pending, (state, action) => {
            state.loading = true;
            state.orders = [];
            state.error = null;
        });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action?.payload;
        });
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
            state.orders = [];
        });

        builder.addCase(updateOrderAction.pending, (state, action) => {
            state.loading = true;
            state.isUpdated = false;
            state.error = null;
            state.orders = [];
        });
        builder.addCase(updateOrderAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = true;
            state.orders = action?.payload;
        });
        builder.addCase(updateOrderAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
            state.isUpdated = false;
            state.orders = [];
        });

        builder.addCase(getOrderStats.pending, (state, action) => {
            state.loading = true;
            state.orderStats = {};
            state.error = null;
        });
        builder.addCase(getOrderStats.fulfilled, (state, action) => {
            state.loading = false;
            state.orderStats = action?.payload;
        });
        builder.addCase(getOrderStats.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
            state.orderStats = {};
        })
    }
})

export default orderSlice.reducer