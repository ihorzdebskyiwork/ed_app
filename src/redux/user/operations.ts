import { createAsyncThunk } from "@reduxjs/toolkit";
import APIs from "../../services/API/API";

export const getUserInfoThunk = createAsyncThunk(
  "user/getUserDetails",
  async (_, thunkAPI) => {
    try {
      const response = await APIs.getUserInfoRequest();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
