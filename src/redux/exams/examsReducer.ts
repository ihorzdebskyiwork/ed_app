import { createSlice } from "@reduxjs/toolkit";
import { getExams } from "./operations";

export interface IExam {
  id: string;
  tittle: string;
  isfree: boolean;
  duration_min: number;
  description: string;
  created_at: string;
  updated_at: string;
  sets: Set[];
  in_implementation: boolean;
}

interface Set {
  ami: string;
  duration_min: number;
  number_of_questions: number;
  loading_time_sec: number;
}

interface ExamsState {
  exams: IExam[];
  examsFetched: boolean;

  activeExamLoadTime: number | null;

  loading: boolean;
  error: string | null;
}

const initialState: ExamsState = {
  exams: [],
  examsFetched: false,

  activeExamLoadTime: null,

  loading: false,
  error: null,
};

export const examsSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    setActiveExamLoadTime: (state: ExamsState, action) => {
      state.activeExamLoadTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExams.fulfilled, (state, action) => {
        state.exams = action.payload;
        state.examsFetched = true;

        state.loading = false;
        state.error = null;
      })
      .addCase(getExams.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setActiveExamLoadTime } = examsSlice.actions;
