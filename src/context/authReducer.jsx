import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    role: null,
  },
  reducers: {
    setIsAuthenticatedUser: (state) => {
      // console.log("role", role);
      console.log("state", state);
      state.isAuthenticated = true;
      state.role = 'user';
    },
    setIsAuthenticatedRecruiter: (state) => {
      // console.log("role", role);
      console.log("state", state);
      state.isAuthenticated = true;
      state.role = 'recruiter';
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export default authSlice.reducer;
export const { setIsAuthenticatedUser,setIsAuthenticatedRecruiter, logout } = authSlice.actions;
