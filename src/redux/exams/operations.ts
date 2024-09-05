import { createAsyncThunk } from "@reduxjs/toolkit";
import APIs from "../../services/API/API";

export const getExams = createAsyncThunk(
  "exams/getExams",
  async (_, thunkAPI) => {
    try {
      const response = await APIs.getAllExamsRequest();
      return response.data.exams;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
