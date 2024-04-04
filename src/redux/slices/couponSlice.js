/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL.js";

// initial state for product
const initialState = {
    coupons: [],
    coupon: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

export const geAllCouponsAction = createAsyncThunk(
    "coupons/getAllCoupons", async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const { data } = await axios.get(`${baseURL}/coupons/getAll`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)


const couponSlice = createSlice({
    name: "brands",
    initialState,
    extraReducers: (builder) => {
        // get all coupons
        builder.addCase(geAllCouponsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(geAllCouponsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.coupons = action?.payload;
        });
        builder.addCase(geAllCouponsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
        })
    }
})


export default couponSlice.reducer