export const selectIsAuth = (state: any) => state.auth.isAuth;
export const selectUserData = (state: any) => state.auth.user;

export const selectIsConfirmRegistration = (state: any) =>
  state.auth.isConfirmRegistration;
export const selectIsConfirmEmail = (state: any) => state.auth.isConfirmEmail;

export const selectIsSuccesResetConfrmEmail = (state: any) =>
  state.auth.isSuccesResetConfrmEmail;
export const selectIsSuccesResetPassword = (state: any) =>
  state.auth.isSuccesResetPassword;

export const selectIsErrorRegistration = (state: any) => state.auth.error;
export const selectIsLoading = (state: any) => state.auth.isLoading;
