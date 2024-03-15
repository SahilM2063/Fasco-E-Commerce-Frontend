/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL.js";

// initial state for product
const initialState = {
    brands: [],
    brand: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

// brand actions
export const createBrandAction = createAsyncThunk(
    "brands/createBrand",
    async ({ name }, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const { data } = await axios.post(`${baseURL}/brands/create-brand`, {
                name
            }, config);
            return data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const getAllBrandsAction = createAsyncThunk("brands/getAllBrands", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.get(`${baseURL}/brands/getAll`);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }
});

const brandSlice = createSlice({
    name: "brands",
    initialState,
    extraReducers: (builder) => {
        // create brand
        builder.addCase(createBrandAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createBrandAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAdded = true;
            state.brand = action.payload;
        });
        builder.addCase(createBrandAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.brand = {};
        });

        // get all brands
        builder.addCase(getAllBrandsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllBrandsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.brands = action.payload;
            state.isAdded = true;
        });
        builder.addCase(getAllBrandsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.brands = [];
            state.isAdded = false;
        })
    },
})


export default brandSlice.reducer