import { createAsyncThunk } from "@reduxjs/toolkit";
import APIs from "../../services/API/API";

export const startSessionThunk = createAsyncThunk(
  "examSession/startSession",
  async (
    { exam_id, set_index }: { exam_id: string; set_index: number },
    thunkAPI
  ) => {
    try {
      const response = await APIs.postUserStartSessionRequest(
        exam_id,
        set_index
      );
      return { response: response.data, set_index: set_index };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const stopSessionThunk = createAsyncThunk(
  "examSession/stopSession",
  async (_, thunkAPI) => {
    try {
      const response = await APIs.postUserStopSessionRequest();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSessionThunk = createAsyncThunk(
  "examSession/getSession",
  async (_, thunkAPI) => {
    try {
      const response = await APIs.getUserSessionRequest();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//2 func session task
export const getTaskData = createAsyncThunk(
  "examSession/getTaskData",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const BASE_URL_IP_ADDRESS = state.examSession.userSession.ipaddress;

    try {
      const [tasksDescriptions, tasksSolutions] = await Promise.all([
        APIs.getUserTasksDecsriptionsRequest(BASE_URL_IP_ADDRESS),
        APIs.getUserTasksSolutionsRequest(BASE_URL_IP_ADDRESS),
      ]);

      return {
        tasksDescriptions: tasksDescriptions.data,
        tasksSolutions: tasksSolutions.data,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkOneTaskResultThunk = createAsyncThunk(
  "examSession/checkOneTaskResult",
  async (set_index: number, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const BASE_URL_IP_ADDRESS = state.examSession.userSession.ipaddress;

    try {
      const response = await APIs.postOneTasksCheckResult(
        BASE_URL_IP_ADDRESS,
        set_index
      );

      return response.data.result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkAllTaskResultThunk = createAsyncThunk(
  "examSession/checkAllResult",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const BASE_URL_IP_ADDRESS = state.examSession.userSession.ipaddress;

    try {
      const response = await APIs.postAllTasksCheckResult(BASE_URL_IP_ADDRESS);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTerminalThunk = createAsyncThunk(
  "examSession/getTerminal",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const BASE_URL_IP_ADDRESS = state.examSession.userSession.ipaddress;

     // if (BASE_URL_IP_ADDRESS === "") {
     //   return thunkAPI.rejectWithValue({
     //     message: "BASE_URL_IP_ADDRESS is empty",
    //   });
    // }

    let retries = 0;
    const maxRetries = 22;

    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const response = await APIs.getUserTasksTerminalRequest(
            BASE_URL_IP_ADDRESS
          );
          clearInterval(interval);
          resolve(response.data);
        } catch (error: any) {
          retries++;
          if (retries >= maxRetries) {
            clearInterval(interval);
            reject(error.message);
          }
        }
      }, 10000);
    });
  }
);
