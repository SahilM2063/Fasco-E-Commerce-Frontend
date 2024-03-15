/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL.js";

// initial state for product
const initialState = {
    categories: [],
    category: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

// category actions
export const createCategoryAction = createAsyncThunk(
    "category/createCategory",
    async ({ name }, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const { data } = await axios.post(`${baseURL}/categories/create-category`, {
                name
            }, config);
            return data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const getAllCategoriesAction = createAsyncThunk("category/getAllCategories", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.get(`${baseURL}/categories/getAll`);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }
});

const categorySlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        // create category
        builder.addCase(createCategoryAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAdded = true;
            state.category = action.payload;
        });
        builder.addCase(createCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.category = {};
        });

        // get all categories
        builder.addCase(getAllCategoriesAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllCategoriesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
            state.isAdded = true;
        });
        builder.addCase(getAllCategoriesAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.categories = [];
            state.isAdded = false;
        })
    },
})


export default categorySlice.reducer