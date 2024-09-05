import { createSlice } from "@reduxjs/toolkit";
import {
  signUpThunk,
  logInThunk,
  confirmEmailThunk,
  refreshUserThunk,
  logOutUserThunk,
  resetPasswConfrmEmailThunk,
  resetPasswordThunk,
} from "./operations";
export interface AuthState {
  user_id: string;
  refresh_token: string;
  isAuth: boolean;

  isConfirmRegistration: boolean;
  isConfirmEmail: boolean;

  isSuccesResetConfrmEmail: boolean;
  isSuccesResetPassword: boolean;

  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user_id: "",
  refresh_token: "",
  isAuth: false,

  isConfirmRegistration: false,
  isConfirmEmail: false,

  isSuccesResetConfrmEmail: false,
  isSuccesResetPassword: false,

  isLoading: false,
  error: null,
};

const resetAuthStateReducer = (
  state: any,
  action: { payload: { field: string; value: any } }
) => {
  const { field, value } = action.payload;

  state[field] = value;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: resetAuthStateReducer,
  },
  extraReducers: (builder) => {
    //sign up
    builder.addCase(signUpThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.isConfirmRegistration = true;
      state.isLoading = false;

      state.error = null;
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.error = "registration error";
      state.isLoading = false;
    });

    //confirmEmail
    builder.addCase(confirmEmailThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(confirmEmailThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isConfirmEmail = true;

      state.error = null;
    });
    builder.addCase(confirmEmailThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });

    //logIn
    builder.addCase(logInThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logInThunk.fulfilled, (state, action) => {
      state.refresh_token = action.payload.refresh_token;
      state.user_id = action.payload.user_id;

      state.isAuth = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(logInThunk.rejected, (state, action) => {
      state.error = "error login";
      state.isLoading = false;
    });

    //refresh user
    builder.addCase(refreshUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refreshUserThunk.fulfilled, (state, action) => {
      state.refresh_token = action.payload.refresh_token;

      state.isLoading = false;
      state.isAuth = true;
      state.error = null;
    });
    builder.addCase(refreshUserThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      state.refresh_token = "";
      state.user_id = "";

      state.isLoading = false;
      state.isAuth = false;
    });

    //logOut user
    builder.addCase(logOutUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logOutUserThunk.fulfilled, (state, action) => {
      state.refresh_token = "";
      state.user_id = "";
      state.error = null;

      state.isAuth = false;
      state.isLoading = false;
    });
    builder.addCase(logOutUserThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      state.refresh_token = "";
      state.user_id = "";

      state.isLoading = false;
      state.isAuth = false;
    });

    //reset Password Confrm Email
    builder.addCase(resetPasswConfrmEmailThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPasswConfrmEmailThunk.fulfilled, (state, action) => {
      state.isSuccesResetConfrmEmail = true;

      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(resetPasswConfrmEmailThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });

    //reset Password
    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
      state.isSuccesResetPassword = true;

      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(resetPasswordThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });
  },
});

export const { resetAuthState } = authSlice.actions;
