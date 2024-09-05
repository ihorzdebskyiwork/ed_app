import { createSlice } from "@reduxjs/toolkit";
import { logOutUserThunk } from "../auth/operations";
import { getUserInfoThunk } from "./operations";
export interface IUserInfo {
  email: string;
  firstname: string;
  products: [
    {
      id: string;
      json: number;
    }
  ];
  secondname: string;
}
export interface IUser {
  user: IUserInfo[];

  isLoading: boolean;
  error: string | null;
}

const initialState: IUser = {
  user: [],

  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //user info
    builder.addCase(getUserInfoThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUserInfoThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });

    //logOut
    builder.addCase(logOutUserThunk.fulfilled, (state, action) => {
      state.user = [];
      state.error = null;
    });
    builder.addCase(logOutUserThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});
