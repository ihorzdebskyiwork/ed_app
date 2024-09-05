import { createAsyncThunk } from "@reduxjs/toolkit";
import APIs from "../../services/API/API";

export const getOffers = createAsyncThunk(
  "offers/getOffers",
  async (_, thunkAPI) => {
    try {
      const response = await APIs.getAllOffersRequest();
      return response.data.offers;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const buyExamsThunk = createAsyncThunk(
  "offers/buyExams",
  async (stripe_price_id: string, thunkAPI) => {
    try {
      const response = await APIs.buyExamsRequest(stripe_price_id);
      const payExamUrl = response.data.url;

      window.open(payExamUrl);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
