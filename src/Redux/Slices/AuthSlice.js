import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || "",
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") != undefined
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

// .....signup.........
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create an account",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// .....Login.........
export const login = createAsyncThunk("/auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("user/login", data);
    toast.promise(Promise.resolve(res), {
      loading: "Wait! authentication in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });
    return res.data; // Return the response data if successful
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return rejectWithValue(error.response.data); // Return the error data if failed
  }
});

// .....Logout.........
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("user/logout");
    toast.promise(res, {
      loading: "Wait! logout in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log out",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// .....update user data.........
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Wait! profile update in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// .....get user data.........
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error?.message);
  }
});

// .....change user password.......
export const changePassword = createAsyncThunk(
  "/auth/user/changePassword",
  async (userPassword) => {
    const loadingMessage = toast.loading("Changing password...");
    try {
      const res = await axiosInstance.post(
        "/user/change-password",
        userPassword
      );
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingMessage });
      throw error;
    }
  }
);

// .....forget user password.....
export const forgetPassword = createAsyncThunk(
  "auth/user/forgetPassword",
  async (data) => {
    const loadingMessage = toast.loading("Please Wait! sending email...");
    try {
      const res = await axiosInstance.post("/user/reset", {
        email: data.email,
      });
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingMessage });
      throw error;
    }
  }
);

// .......reset the user password......
export const resetPassword = createAsyncThunk(
  "/user/reset",
  async ({ resetToken, password }) => {
    const loadingMessage = toast.loading(
      "Please Wait! resetting your password..."
    );
    try {
      const res = await axiosInstance.post(`/user/reset/${resetToken}`, {
        password,
      });
      toast.success(res?.data?.message, { id: loadingMessage });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message, { id: loadingMessage });
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for login
    builder
       // Handle login success
       .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem("data", JSON.stringify(action.payload.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action.payload.user?.role);
          state.isLoggedIn = true;
          state.data = action.payload.user;
          state.role = action.payload.user?.role;
        }
      })
      // Handle login failure
      .addCase(login.rejected, (state) => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("data");
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })
      // for logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      // for get user data
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
