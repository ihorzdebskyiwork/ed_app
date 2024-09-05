import { createSlice } from "@reduxjs/toolkit";
import { getOffers, buyExamsThunk } from "./operations";

export interface IOffers {
  id: string;
  tittle: string;
  description: string;
  price: number;
  stripe_id: string;
  display_number: number;
  exams: Exam[];
  created_at: string;
  updated_at: string;
}

interface Exam {
  id: string;
  quantity: number;
}

interface IOffer {
  offers: IOffers[];
  offersFetched: boolean;
  isBuySuccess: boolean;

  isLoadingOffers: boolean;
  isLoadingBuy: boolean;
  error: string | null;
  // buyResponse: string;
}

const initialState: IOffer = {
  offers: [],
  offersFetched: false,
  isBuySuccess: false,

  isLoadingOffers: false,
  isLoadingBuy: false,
  error: null,
  // buyResponse: "",
};

export const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all offers
    builder
      .addCase(getOffers.pending, (state) => {
        state.isLoadingOffers = true;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersFetched = true;

        state.isLoadingOffers = false;
        state.error = null;
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoadingOffers = false;
      });

    //buy exams
    builder
      .addCase(buyExamsThunk.pending, (state) => {
        state.isLoadingBuy = true;
      })
      .addCase(buyExamsThunk.fulfilled, (state, action) => {
        state.isLoadingBuy = false;
        state.isBuySuccess = true;
        // state.buyResponse = action.payload;
      })
      .addCase(buyExamsThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoadingBuy = false;
      });
  },
});
