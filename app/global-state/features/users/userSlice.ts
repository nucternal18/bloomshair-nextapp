import { AppDispatch } from "../../store";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../../store";
import { AppError, AuthState, UserInfoProps } from "@lib/types";
import { HYDRATE } from "next-redux-wrapper";

const initialState: AuthState = {
  image: "",
  token: "",
  categoryOptions: ["Customer", "Admin", "SuperAdmin"],
  currentUser: null,
  error: { name: "", message: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (
      state,
      {
        payload: { token, currentUser },
      }: PayloadAction<{ token: string; currentUser: UserInfoProps }>
    ) => {
      state.token = token;
      state.currentUser = currentUser;
    },
    resetUserState: (state) => {
      state.token = null;
      state.currentUser = null;
    },
    setImage: (state, { payload }: PayloadAction<string>) => {
      state.image = payload;
    },
    setError: (state, { payload }: PayloadAction<AppError>) => {
      state.error = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        state = action.payload;
      }
    },
  },
});

export const { setUserState, resetUserState, setError, setImage } =
  userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
