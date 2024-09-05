import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { resetPasswordThunk } from "../redux/auth/operations";
import { selectIsSuccesResetPassword } from "../redux/auth/selectors";
import { resetAuthState } from "../redux/auth/authReducer";

import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "../assets/practicert_logo.png";

interface IResetPassword {}

export const ResetPassword: React.FC<IResetPassword> = () => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const history = useHistory();
  const іsSuccesResetPassword = useSelector(selectIsSuccesResetPassword);

  const params = useRouteMatch<any>("/reset-password/:id");
  const confirmPasswordToken = params?.params?.id;

  useEffect(() => {
    if (іsSuccesResetPassword) {
      history.push("/login");

      const message =
        "Your password has been successfully changed. Please log in to your account.";
      window.alert(message);

      dispatch(
        resetAuthState({ field: "isSuccesResetPassword", value: false })
      );
    }
  }, [іsSuccesResetPassword, history, dispatch]);

  const validationSchema = Yup.object({
    password: Yup.string().min(8).max(32).required("This field is required."),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .min(8)
      .max(32)
      .required("This field is required."),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordRepeat: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: { password: string; passwordRepeat: string }) => {
      const data = {
        password: values.password,
        password_repeat: values.passwordRepeat,
        token: confirmPasswordToken,
      };

      dispatch(resetPasswordThunk(data));
    },
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-4">
            <img src={logo} alt="logo" className="mx-auto h-10 w-168px" />
            <h1 className="text-xl font-semibold">Reset password</h1>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="********"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="passwordRepeat"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                autoComplete="password"
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.passwordRepeat && formik.touched.passwordRepeat
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="********"
                value={formik.values.passwordRepeat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.passwordRepeat &&
                formik.touched.passwordRepeat && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.passwordRepeat}
                  </div>
                )}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-3 rounded-md font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
