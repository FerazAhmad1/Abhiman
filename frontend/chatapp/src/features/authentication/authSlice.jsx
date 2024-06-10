import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("initialState")) || {
  isLoggedin: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state = initialState, action) => {
      const isLoggedin = (state.isLoggedin = !!action.payload.token);
      const token = (state.token = action.payload.token);

      localStorage.setItem(
        "initialState",
        JSON.stringify({ isLoggedin, token })
      );
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.token = "";

      localStorage.clear();
    },
  },
});
export const authState = (state) => state.auth;
export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
