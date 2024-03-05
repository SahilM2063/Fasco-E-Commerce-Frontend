/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import baseURL from "../../utils/baseURL.js"

const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: {}
    }
}

export const loginUserAction = createAsyncThunk("users/login", async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.post(`${baseURL}/users/login`, {
            email,
            password
        })
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})

const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        // handle actions
        // Login action
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.loading = false;
            state.userAuth.userInfo = action.payload
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userAuth.loading = false;
            state.userAuth.error = action.payload
        })
    }
})

export default userSlice.reducer;