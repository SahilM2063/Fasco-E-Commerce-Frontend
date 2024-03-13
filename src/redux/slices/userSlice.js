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
        //save the user into localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data)
    }
})

export const registerUserAction = createAsyncThunk("users/register", async ({ firstName, lastName, email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.post(`${baseURL}/users/register`, {
            firstName, lastName, email, password
        })
        //save the user into localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data)
    }
})

export const sendResetPassEmail = createAsyncThunk("users/sendResetPassEmail", async (email, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.post(`${baseURL}/users/reset-password-link`, {
            email
        })
        return data;
    } catch (error) {
        console.log(error);
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
        });
        // Register action
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });

        // Reset password
        builder.addCase(sendResetPassEmail.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(sendResetPassEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
        })
        builder.addCase(sendResetPassEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default userSlice.reducer;