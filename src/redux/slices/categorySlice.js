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
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const { name, image } = payload
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
            const { data } = await axios.post(`${baseURL}/categories/create-category`, {
                name, image
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

export const deleteCategoryAction = createAsyncThunk("category/deleteCategory", async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.delete(`${baseURL}/categories/${id}`, config);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }

})

const categorySlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        // create category
        builder.addCase(createCategoryAction.pending, (state, action) => {
            state.loading = true;
            state.isAdded = false;
            state.error = null;
            state.category = {};
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

        // delete category
        builder.addCase(deleteCategoryAction.pending, (state, action) => {
            state.loading = true;
            state.isDeleted = false;
            state.error = null;
        });
        builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = true;
        });
        builder.addCase(deleteCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isDeleted = false;
        })
    },
})


export default categorySlice.reducer