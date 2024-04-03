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
    isUpdated: false,
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

export const updateUserProfileAction = createAsyncThunk("users/updateUserProfile", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }

        console.log(payload)

        // form data
        const formData = new FormData();
        formData.append("firstName", payload.firstName);
        formData.append("lastName", payload.lastName);
        formData.append("email", payload.email);
        formData.append("gender", payload.gender);
        formData.append("pfp", payload.pfp);

        console.log(formData)

        const { id } = payload
        const { data } = await axios.put(`${baseURL}/users/${id}`, payload, config)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data)
    }
})

// update user address

export const updateUserAddressAction = createAsyncThunk("users/updateUserAddress", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { id } = payload;
        const { data } = await axios.put(`${baseURL}/users/update-shipping/${id}`, payload, config)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data)
    }
})

// get user profile
export const getSingleUserProfile = createAsyncThunk("users/getSingleUserProfile", async (_, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`${baseURL}/users/profile`, config)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data)
    }
})

export const userDeleteAction = createAsyncThunk("users/userDelete", async (id, { rejectWithValue, getState, dispatch }) => {
    try {

        const token = getState()?.users?.userAuth?.userInfo?.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`${baseURL}/users/${id}`, config)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data)
    }
})

// user self delete account

export const userSelfDeleteAction = createAsyncThunk("users/userSelfDelete", async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.delete(`${baseURL}/users/${id}`, config)
        localStorage.removeItem("userInfo");
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data)
    }
})


export const logoutUserAction = createAsyncThunk("users/logoutUser", async (_, { rejectWithValue, getState, dispatch }) => {
    try {
        localStorage.removeItem("userInfo");
        return true
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data)
    }
})

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

        // Reset password
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

        // get user profile
        builder.addCase(getSingleUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = {};
            state.isUpdated = false;
        });
        builder.addCase(getSingleUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isUpdated = false;
        });
        builder.addCase(getSingleUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
            state.isUpdated = false;
        })

        // update user profile
        builder.addCase(updateUserProfileAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            // state.user = {};
            state.isUpdated = false;
        });
        builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isUpdated = true;
        })
        builder.addCase(updateUserProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
            state.isUpdated = false;
        })

        // update user address
        builder.addCase(updateUserAddressAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            // state.user = {};
            state.isUpdated = false;
        });
        builder.addCase(updateUserAddressAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isUpdated = true;
        });
        builder.addCase(updateUserAddressAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
            state.isUpdated = false;
        })

        // delete user
        builder.addCase(userDeleteAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = {};
        });
        builder.addCase(userDeleteAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(userDeleteAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
        })

        // suicide 
        builder.addCase(userSelfDeleteAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = {};
        });
        builder.addCase(userSelfDeleteAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = false;
        });
        builder.addCase(userSelfDeleteAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
        })

        // logout user
        builder.addCase(logoutUserAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = {};
            state.userAuth.error = null
            state.userAuth.loading = false
            state.userAuth.userInfo = null
        });
        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = {};
            state.userAuth.error = null
            state.userAuth.loading = false
            state.userAuth.userInfo = null
        })
        builder.addCase(logoutUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.userAuth.error = null
            state.userAuth.loading = false
            state.userAuth.userInfo = null
        })
    }
})

export default userSlice.reducer;