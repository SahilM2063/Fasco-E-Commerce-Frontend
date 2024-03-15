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

const colorSlice = createSlice({
    name: "colors",
    initialState,
    extraReducers: (builder) => {
        // create color
        builder.addCase(createColorAction.pending, (state, action) => {
            state.loading = true;
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
        })
    },
})


export default colorSlice.reducer