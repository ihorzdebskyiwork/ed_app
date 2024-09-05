import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { resetPasswConfrmEmailThunk } from "../redux/auth/operations";
import { selectIsSuccesResetConfrmEmail } from "../redux/auth/selectors";
import { resetAuthState } from "../redux/auth/authReducer";

import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "../assets/practicert_logo.png";

interface IConfirmEmailForm {
  isConfirmEmailFrom: boolean;
  setIsConfirmEmailFrom: any;
}

export const ConfirmEmailForm: React.FC<IConfirmEmailForm> = ({
  isConfirmEmailFrom,
  setIsConfirmEmailFrom,
}) => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const isSuccesConfirmEmail = useSelector(selectIsSuccesResetConfrmEmail);

  useEffect(() => {
    if (isSuccesConfirmEmail) {
      const message =
        "A confirmation email has been sent to your inbox. Please click the link in the email to verify your email address and proceed with the password reset process.";
      window.alert(message);

      setIsConfirmEmailFrom(!isConfirmEmailFrom);

      dispatch(
        resetAuthState({ field: "isSuccesResetConfrmEmail", value: false })
      );
    }
  }, [
    isSuccesConfirmEmail,
    isConfirmEmailFrom,
    setIsConfirmEmailFrom,
    dispatch,
  ]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Incorrect email format.")
      .required("This field is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: { email: string }) => {
      await dispatch(resetPasswConfrmEmailThunk(values.email));
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <img src={logo} alt="logo" className="mx-auto h-10 w-168px" />
          <h1 className="text-xl font-semibold">Confirm Email</h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="you@example.com"
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded-md font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Confirm Email
            </button>
          </div>

          <div className="flex justify-end items-center">
            <button
              type="button"
              onClick={() => setIsConfirmEmailFrom(!isConfirmEmailFrom)}
              className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center justify-center"
            >
              Back to login.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
