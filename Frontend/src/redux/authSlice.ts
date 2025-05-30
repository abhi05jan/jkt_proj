import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/api";

// Define the User type
interface User {
    id: string; // Adjust type based on your backend (e.g., string or number)
    username: string;
    email?: string;
}

// Define the AuthState type
interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

// Initial state with typed properties
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("access_token"),
    loading: false,
    error: null,
};

// Thunk for login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await login(credentials);
            localStorage.setItem("access_token", response.data.access);
            return response.data; // Expect { access: string, user: { id: string, username: string, email?: string } }
        } catch (error) {
            return rejectWithValue("Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("access_token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user; // Ensure backend returns user object
                state.token = action.payload.access;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;