import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { signUpThunk } from "../redux/auth/operations";
import {
  selectIsConfirmRegistration,
  selectIsErrorRegistration,
} from "../redux/auth/selectors";

import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "../assets/practicert_logo.png";
import { NavButton } from "../components/NavButton";
import { resetAuthState } from "../redux/auth/authReducer";

export const SignUp: React.FC = () => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const isConfirmRegistr = useSelector(selectIsConfirmRegistration);
  const isErrorRegistr = useSelector(selectIsErrorRegistration);

  useEffect(() => {
    if (isConfirmRegistr) {
      const message =
        "Thank you for registering! A confirmation email has been sent to your inbox. Please click the link in the email to confirm your account and complete the registration process.";
      window.alert(message);

      dispatch(
        resetAuthState({ field: "isConfirmRegistration", value: false })
      );
    }

    if (isErrorRegistr === "registration error") {
      const message =
        "Something went wrong during your registration process. Please try registering again.";
      window.alert(message);

      dispatch(resetAuthState({ field: "error", value: null }));
    }
  }, [isConfirmRegistr, isErrorRegistr, dispatch]);

  const validationSchema = Yup.object({
    firstname: Yup.string().min(3).max(30).required("This field is required."),
    lastname: Yup.string().min(3).max(30).required("This field is required."),
    email: Yup.string()
      .email("Incorrect email format.")
      .required("This field is required."),
    password: Yup.string().min(8).max(32).required("This field is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: {
      email: string;
      firstname: string;
      lastname: string;
      password: string;
    }) => {
      dispatch(signUpThunk(values));
    },

    //   onSubmit={(values, actions) => {
    //   actions.resetForm();
    // }}
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <img src={logo} alt="logo" className="mx-auto h-10 w-168px" />
          <h1 className="text-xl font-semibold">Registration</h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.errors.firstname && formik.touched.firstname
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
            />
            {formik.errors.firstname && formik.touched.firstname && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.firstname}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.errors.lastname && formik.touched.lastname
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
            />
            {formik.errors.lastname && formik.touched.lastname && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
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
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded-md font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Create an account
            </button>
          </div>

          <div className="flex items-center justify-end">
            <p className="text-sm text-gray-700 mr-2">
              Do you have an account?
            </p>
            <NavButton
              to={{
                pathname: "/login",
              }}
              text="Sign in"
              extraStyles="text-sm text-indigo-600 hover:text-indigo-500 flex items-center justify-center"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
