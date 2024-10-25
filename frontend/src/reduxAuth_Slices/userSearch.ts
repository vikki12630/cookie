import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISearchedUser {
  _id: string;
  name: string;
  username: string;
  profileImg: string;
}

export interface ISearchedUserState {
  searchedUsers: ISearchedUser[] | null;
}

const initialState: ISearchedUserState = {
  searchedUsers: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchUsers: (state, action: PayloadAction<ISearchedUser[] | null>) => {
      state.searchedUsers = action.payload;
    },
  },
});

export const { setSearchUsers } = searchSlice.actions;
export default searchSlice.reducer;
