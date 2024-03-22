/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL.js";

// initial state for product
const initialState = {
    colors: [],
    color: {},
    loading: false,
    error: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

// brand actions
export const createColorAction = createAsyncThunk(
    "colors/createColor",
    async ({ name }, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const { data } = await axios.post(`${baseURL}/colors/create-color`, {
                name
            }, config);
            return data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const getAllColorsAction = createAsyncThunk("colors/getAllColors", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.get(`${baseURL}/colors/getAll`);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }
});

export const updateColorAction = createAsyncThunk("colors/updateColor", async (payload, { rejectWithValue, getState, dispatch }) => {
    const { _id, name } = payload;
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.put(`${baseURL}/colors/${_id}`, {
            name
        }, config);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }
})

export const deleteColorAction = createAsyncThunk("colors/deleteColor", async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.delete(`${baseURL}/colors/${id}`, config);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data);
    }
})

const colorSlice = createSlice({
    name: "colors",
    initialState,
    extraReducers: (builder) => {
        // create color
        builder.addCase(createColorAction.pending, (state, action) => {
            state.loading = true;
            state.isAdded = false;
            state.error = null;
            state.color = {};
        });
        builder.addCase(createColorAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAdded = true;
            state.color = action.payload;
        });
        builder.addCase(createColorAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAdded = false;
            state.color = {};
        });

        // get all colors
        builder.addCase(getAllColorsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllColorsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.colors = action.payload;
            state.isAdded = true;
        });
        builder.addCase(getAllColorsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.colors = [];
            state.isAdded = false;
        });

        // update color
        builder.addCase(updateColorAction.pending, (state, action) => {
            state.loading = true;
            state.isUpdated = false;
            state.error = null;
        });
        builder.addCase(updateColorAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = true;
            state.color = action.payload;
            state.error = null;
        });
        builder.addCase(updateColorAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isUpdated = false;
            state.color = {};
        });

        // delete color
        builder.addCase(deleteColorAction.pending, (state, action) => {
            state.loading = true;
            state.isDeleted = false;
            state.error = null;
        });
        builder.addCase(deleteColorAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = true;
            state.color = action.payload;
        });
        builder.addCase(deleteColorAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isDeleted = false;
        })
    },
})


export default colorSlice.reducer