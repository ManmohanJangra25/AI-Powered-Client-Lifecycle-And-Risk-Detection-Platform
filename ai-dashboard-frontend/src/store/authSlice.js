import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

// 🔥 Async login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/login", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Login failed");
    }
  },
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/signup", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Signup failed");
    }
  },
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/auth/me");
      return res.data;
    } catch (err) {
      return rejectWithValue("Session expired");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;

        // store token
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
