import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "./userSlice"
export const store = configureStore({
  reducer: {
    user: userReducer
  },
});

// dispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// selector
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
