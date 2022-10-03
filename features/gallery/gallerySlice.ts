import { AppDispatch } from "./../../app/store";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../../app/store";
import { AppError } from "@lib/types";
import { HYDRATE } from "next-redux-wrapper";

interface IGalleryProps {
  requestStatus: string;
  success: boolean;
  loading: boolean;
  error: AppError | null;
  uploading: boolean;
  image: string | null;
  message: null;
}

const initialGalleryState: IGalleryProps = {
  requestStatus: "",
  success: false,
  loading: false,
  error: null,
  uploading: false,
  image: "",
  message: null,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState: initialGalleryState,
  reducers: {
    setImage: (state, { payload }: PayloadAction<string | null>) => {
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

export const { setImage, setError } = gallerySlice.actions;
export const gallerySelector = (state: RootState) => state.gallery;
export default gallerySlice.reducer;
