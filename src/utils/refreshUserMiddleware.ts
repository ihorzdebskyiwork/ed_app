import { Middleware } from "@reduxjs/toolkit";
// import { refreshUserThunk } from "../redux/auth/operations";

const refreshUserMiddleware: Middleware =
  (store) => (next) => async (action) => {
    // console.log(action.type === refreshUserThunk.pending.type);
    //   if (action.type !== refreshUserThunk.pending.type) {
    //   }
    return next(action);
  };

export default refreshUserMiddleware;
