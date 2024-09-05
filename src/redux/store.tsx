import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./auth/authReducer";
import { examsSlice } from "./exams/examsReducer";
import { offersSlice } from "./offers/offersReducer";
import { userSlice } from "./user/userReducer";
import { examSessionSlice } from "./examSession/sessionReducer";

import refreshUserMiddleware from "../utils/refreshUserMiddleware";

const persistConfigAuth = {
  key: "userAuth",
  storage,
  whitelist: ["refresh_token", "isAuth", "user_id"],
};

const persistConfigUser = {
  key: "user",
  storage,
  whitelist: ["user"],
};

const persistConfigExams = {
  key: "exams",
  storage,
  whitelist: ["activeExamLoadTime"],
};

const persistConfigExamSession = {
  key: "examSession",
  storage,
  whitelist: [
    "isActiveSession",
    "userSession",
    "isTerminalPage",
    "activeSetsExamIndex",
    // "decsriptions",
    // "solutions",
    // "taskData",
    // "examScore",
  ],
};

const persistedAuth = persistReducer(persistConfigAuth, authSlice.reducer);
const persistedUser = persistReducer(persistConfigUser, userSlice.reducer);
const persistedExams = persistReducer(persistConfigExams, examsSlice.reducer);
const persistedExamSession = persistReducer(
  persistConfigExamSession,
  examSessionSlice.reducer
);

const rootReducer = combineReducers({
  auth: persistedAuth,
  user: persistedUser,
  // examSession: examSessionSlice.reducer,
  examSession: persistedExamSession,

  exams: persistedExams,
  offers: offersSlice.reducer,
});

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(refreshUserMiddleware);

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
