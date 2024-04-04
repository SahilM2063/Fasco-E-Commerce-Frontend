/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL.js";

// initial state for reviews
const initialState = {
    review: {},
    loading: false,
    error: null,
    isAdded: false,
};

// review actions
export const createReviewAction = createAsyncThunk(
    "reviews/createReview",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const { productId } = payload
            const { data } = await axios.post(`${baseURL}/reviews/${productId}`, payload, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createReviewAction.pending, (state) => {
                state.loading = true;
                state.isAdded = false;
                state.review = {};
                state.error = null;
            })
            .addCase(createReviewAction.fulfilled, (state, action) => {
                state.loading = false;
                state.isAdded = true;
                state.review = action?.payload;
            })
            .addCase(createReviewAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
                state.isAdded = false;
                state.review = {};
            })
    },
})

export default reviewSlice.reducer