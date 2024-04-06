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
        console.log(payload)
        const { data } = await axios.post(`${baseURL}/orders/create-order`, payload, config);
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
        })
    }
})

export default orderSlice.reducer