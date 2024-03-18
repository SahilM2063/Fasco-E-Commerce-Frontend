/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL.js";

// initial state for products
const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

// product actions

export const createProductAction = createAsyncThunk(
    "products/createProduct",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        // console.log(payload)
        try {
            const {
                name,
                description,
                brand,
                category,
                sizes,
                images,
                colors,
                price,
                totalQty,
            } = payload;

            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }

            // formdata
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("totalQty", totalQty)
            sizes.forEach((size) => {
                formData.append("sizes", size)
            });
            colors.forEach((color) => {
                formData.append("colors", color)
            });
            images.forEach((image) => {
                formData.append("images", image);
            })
            // console.log(formData)
            const { data } = await axios.post(`${baseURL}/products/create-product`,
                formData, config);
            return data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data);
        }
    }
);

// get all products
export const getAllProductsAction = createAsyncThunk(
    "products/getAllProducts"
    , async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(`${baseURL}/products/getAll`);
            return data;
        } catch (error) {
            console.log(error)
            rejectWithValue(error?.response?.data)
        }
    })

// delete the product
export const deleteProductAction = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue, getState, dispatch }) => {
        console.log(id)
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            const { data } = await axios.delete(`${baseURL}/products/${id}`, config);
            console.log(data)
            return data;
        } catch (error) {
            console.log(error)
            rejectWithValue(error?.response?.data)
        }
    }
)

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        // create product
        builder.addCase(createProductAction.pending, (state, action) => {
            state.loading = true;
            state.isAdded = false;
        });
        builder.addCase(createProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAdded = true;
            state.product = action.payload;
        });
        builder.addCase(createProductAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.product = {};
        });

        // get all products
        builder.addCase(getAllProductsAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        builder.addCase(getAllProductsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.products = [];
        })

        // delete product
        builder.addCase(deleteProductAction.pending, (state, action) => {
            state.loading = true;
            state.isDeleted = false;
        });
        builder.addCase(deleteProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = true;
        });
        builder.addCase(deleteProductAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isDeleted = false;
        })
    },
})


export default productSlice.reducer