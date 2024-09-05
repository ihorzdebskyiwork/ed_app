import { createSlice } from "@reduxjs/toolkit";

import {
  startSessionThunk,
  stopSessionThunk,
  getSessionThunk,
  getTerminalThunk,
  getTaskData,
  checkOneTaskResultThunk,
  checkAllTaskResultThunk,
} from "./operations";

interface ISession {
  instance_id: string;
  ipaddress: string;
  duration: string;
  dns_name: string;
  started_at: string;
  status: string;
}

export interface IExamSession {
  examSessionId: string;

  userSession: ISession[];
  activeSetsExamIndex: number | null;
  isActiveSession: boolean;

  isFetchDescripAndSolution: boolean;
  decsriptions: [];
  solutions: [];

  oneResultTask: [];
  allResultTask: [];

  examScore: number;

  terminal: [];
  isTerminalPage: boolean;
  isLoadingTerminal: boolean;
  errorTerminalReq: string | null;

  taskData: any[];

  isLoading: boolean;
  error: string | null;
}

const initialState: IExamSession = {
  examSessionId: "",

  userSession: [],
  activeSetsExamIndex: null,
  isActiveSession: false,

  isFetchDescripAndSolution: false,
  oneResultTask: [],
  allResultTask: [],

  decsriptions: [],
  solutions: [],

  examScore: 0,

  terminal: [],
  isTerminalPage: false,
  isLoadingTerminal: false,
  errorTerminalReq: null,

  taskData: [],

  isLoading: false,
  error: null,
};

export const examSessionSlice = createSlice({
  name: "examSession",
  initialState,
  reducers: {
    clearStateSessionExam: (state: IExamSession) => {
      state.decsriptions = [];
      state.solutions = [];
      state.oneResultTask = [];
      state.allResultTask = [];
      state.examScore = 0;
      state.terminal = [];
      state.examSessionId = "";
      state.activeSetsExamIndex = null;

      state.isActiveSession = false;

      state.isFetchDescripAndSolution = false;
      state.taskData = [];
      state.userSession = [];

      state.isTerminalPage = false;
    },
    setTaskData: (state: IExamSession, action) => {
      state.taskData = action.payload;
    },
  },
  extraReducers: (builder) => {
    //start user session
    builder
      .addCase(startSessionThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(startSessionThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.isActiveSession = true;
        state.examSessionId = action.payload.response.session_id;
        state.activeSetsExamIndex = action.payload.set_index;

        state.error = null;
      })
      .addCase(startSessionThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;

        state.isActiveSession = false;
        state.errorTerminalReq = "Something went wrong, please try again.";
      });

    //stop user session
    builder
      .addCase(stopSessionThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(stopSessionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isActiveSession = false;

        state.errorTerminalReq = null;
        state.error = null;
      })
      .addCase(stopSessionThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
        state.errorTerminalReq = null;
      });

    //get user session
    builder
      .addCase(getSessionThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userSession = action.payload;

        state.error = null;
      })
      .addCase(getSessionThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    //get exam terminal
    builder
      .addCase(getTerminalThunk.pending, (state) => {
        state.isLoadingTerminal = true;
      })
      .addCase(getTerminalThunk.fulfilled, (state, action) => {
        state.isLoadingTerminal = false;
        state.isTerminalPage = true;

        state.errorTerminalReq = null;
        state.error = null;
      })
      .addCase(getTerminalThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.errorTerminalReq = "Something went wrong, please try again.";

        state.isTerminalPage = false;
        state.isLoadingTerminal = false;
      });

    //task session requests: decsriptions, solutions
    builder
      .addCase(getTaskData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskData.fulfilled, (state, action) => {
        state.isLoading = false;

        state.isFetchDescripAndSolution = true;
        state.decsriptions = action.payload.tasksDescriptions;
        state.solutions = action.payload.tasksSolutions;

        state.error = null;
      })
      .addCase(getTaskData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    //get one tasks Result
    builder
      .addCase(checkOneTaskResultThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkOneTaskResultThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.oneResultTask = action.payload;

        state.error = null;
      })
      .addCase(checkOneTaskResultThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    //get all tasks Result
    builder
      .addCase(checkAllTaskResultThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAllTaskResultThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allResultTask = action.payload;
        state.examScore = action.payload.score;

        state.error = null;
      })
      .addCase(checkAllTaskResultThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { clearStateSessionExam, setTaskData } = examSessionSlice.actions;
