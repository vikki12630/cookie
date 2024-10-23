import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ILoadingState {
  loading: boolean;
  loadingPageReload: boolean;
}

const initialState: ILoadingState = {
  loading: true,
  loadingPageReload: true,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoadingPageReload: (state, action: PayloadAction<boolean>) => {
      state.loadingPageReload = action.payload;
    },
  },
});

export const { setLoading, setLoadingPageReload } = loadingSlice.actions;
export default loadingSlice.reducer;
