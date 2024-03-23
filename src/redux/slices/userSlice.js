/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { useParams } from "react-router-dom"
import baseURL from "../../utils/baseURL.js"

const initialState = {
    isLoggedIn: false || localStorage.getItem("userInfo") ? true : false,
    loading: false,
    error: null,
    users: [],
    user: {},
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    }
}

export const getAllUsersAction = createAsyncThunk("users/getAllUsers", async (_, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.get(`${baseURL}/users/getAll`)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data)
    }
})

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

export const resetPassword = createAsyncThunk(
    "users/resetPassword",
    async ({ id, token, password, confirmPassword }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${baseURL}/users/reset-password/${id}/${token}`, {
                password,
                confirmPassword,
            }
            );
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        // handle actions
        // get all users
        builder.addCase(getAllUsersAction.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.users = [];
        });
        builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(getAllUsersAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
            state.users = [];
        })

        // Login action
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.userAuth.loading = false;
            state.userAuth.userInfo = action.payload
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.userAuth.loading = false;
            state.userAuth.error = action.payload
        });
        // Register action
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.isLoggedIn = false;
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

        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default userSlice.reducer;