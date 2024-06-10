import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
