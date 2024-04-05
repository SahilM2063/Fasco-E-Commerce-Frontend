/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL.js";

// initial state for coupons
const initialState = {
    coupons: [],
    coupon: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

export const getAllCouponsAction = createAsyncThunk(
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

export const createCouponAction = createAsyncThunk("coupons/createCoupon", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.post(`${baseURL}/coupons/create-coupon`, payload, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})

export const updateCouponAction = createAsyncThunk("coupons/updateCoupon", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.put(`${baseURL}/coupons/${payload._id}`, payload, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})

export const deleteCouponAction = createAsyncThunk("coupons/deleteCoupon", async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.delete(`${baseURL}/coupons/${id}`, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})

export const getCouponByName = createAsyncThunk("coupons/getCouponByName", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.post(`${baseURL}/coupons`, payload, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})


const couponSlice = createSlice({
    name: "brands",
    initialState,
    extraReducers: (builder) => {
        // get all coupons
        builder.addCase(getAllCouponsAction.pending, (state, action) => {
            state.isAdded = false;
            state.isUpdated = false;
            state.isDeleted = false;
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllCouponsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.coupons = action?.payload;
        });
        builder.addCase(getAllCouponsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
        })

        // create coupon
        builder.addCase(createCouponAction.pending, (state, action) => {
            state.loading = true;
            state.isAdded = false;
            state.coupon = {};
            state.error = null;
        });
        builder.addCase(createCouponAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAdded = true;
            state.coupon = action?.payload;
        });
        builder.addCase(createCouponAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
            state.isAdded = false;
            state.coupon = {};
        })

        // update coupon
        builder.addCase(updateCouponAction.pending, (state, action) => {
            state.loading = true;
            state.isUpdated = false;
            state.coupon = {};
            state.error = null;
        });
        builder.addCase(updateCouponAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = true;
            state.coupon = action?.payload;
        });
        builder.addCase(updateCouponAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
            state.isUpdated = false;
            state.coupon = {};
        })

        // delete coupon
        builder.addCase(deleteCouponAction.pending, (state, action) => {
            state.loading = true;
            state.isDeleted = false;
            state.coupon = {};
            state.error = null;
        });
        builder.addCase(deleteCouponAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = true;
            state.coupon = action?.payload;
        });
        builder.addCase(deleteCouponAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
            state.isDeleted = false;
            state.coupon = {};
        });

        // get coupon by name
        builder.addCase(getCouponByName.pending, (state, action) => {
            state.loading = true;
            state.coupon = {};
            state.error = null;
        });
        builder.addCase(getCouponByName.fulfilled, (state, action) => {
            state.loading = false;
            state.coupon = action?.payload;
        });
        builder.addCase(getCouponByName.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload;
            state.coupon = {};
        })
    }
})


export default couponSlice.reducer