import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserData {
  _id: string | null;
  username: string | null;
  email: string | null;
  name: string | null;
  profileImg: string | null;
  followers: string[] | null;
  following: string[] | null;
}

export interface IUserState {
  userData: IUserData;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const defaultUserData: IUserData = {
  _id: null,
  username: null,
  email: null,
  name: null,
  profileImg: null,
  followers: null,
  following: null,
};

const initialState: IUserState = {
  userData: defaultUserData,
  accessToken: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },

    updateUserData: (state, action: PayloadAction<IUserData>) => {
      state.userData = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      state.userData = defaultUserData;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthStatus, setAccessToken, updateUserData, logout } =
  userSlice.actions;

export default userSlice.reducer;
