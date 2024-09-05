import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import APIs from "../../services/API/API";

export const token = {
  set(token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  unSet() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};

export const signUpThunk = createAsyncThunk(
  "auth/signUp",
  async (
    user: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    },
    thunkAPI
  ) => {
    try {
      await APIs.registrationRequest(user);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const confirmEmailThunk = createAsyncThunk(
  "auth/confirmEmail",
  async (token: string, thunkAPI) => {
    try {
      await APIs.confirmEmailRequest(token);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const logInThunk = createAsyncThunk(
  "auth/logIn",
  async (
    user: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const logIn = await APIs.logInRequest(user);
      token.set(logIn.data.access_token);
      return logIn.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const savedRefreshToken = thunkAPI.getState() as any;
    const persistedRefreshToken = savedRefreshToken.auth.refresh_token;

    if (persistedRefreshToken === "") {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      const refreshUser = await APIs.refreshRequest(persistedRefreshToken);
      token.set(refreshUser.data.access_token);

      return refreshUser.data;
    } catch (error: any) {
      token.unSet();
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const logOutUserThunk = createAsyncThunk(
  "auth/logOutUser",
  async (_, thunkAPI) => {
    const savedRefreshToken = thunkAPI.getState() as any;
    const refreshToken = savedRefreshToken.auth.refresh_token;

    try {
      token.unSet();
      await APIs.logOutRequest(refreshToken);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const resetPasswConfrmEmailThunk = createAsyncThunk(
  "auth/resetPasswConfrmEmail",
  async (confirmEmail: string, thunkAPI) => {
    try {
      await APIs.resetPasswConfrmEmailRequest(confirmEmail);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: {
      password: string;
      password_repeat: string;
      token: string;
    },
    thunkAPI
  ) => {
    try {
      await APIs.resetPasswordRequest(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
