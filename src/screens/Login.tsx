import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { logInThunk } from "../redux/auth/operations";
import {
  selectIsConfirmEmail,
  selectIsErrorRegistration,
} from "../redux/auth/selectors";
import { resetAuthState } from "../redux/auth/authReducer";

import * as Yup from "yup";
import { useFormik } from "formik";

import { ConfirmEmailForm } from "../components/ConfirmEmailForm";
import { NavButton } from "../components/NavButton";
import logo from "../assets/practicert_logo.png";

type ModalType = {
  message: string;
  onClose: () => void;
};

export const Login: React.FC = () => {
  const [isConfirmEmailFrom, setIsConfirmEmailFrom] = useState<boolean>(false);
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const isConfirmEmail = useSelector(selectIsConfirmEmail);
  const isLoginError = useSelector(selectIsErrorRegistration);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (isConfirmEmail) {
      const message =
        "Your account has been successfully created, please log in to your account.";
      window.alert(message);

      dispatch(resetAuthState({ field: "isConfirmEmail", value: false }));
    }
  }, [isConfirmEmail, dispatch]);

  useEffect(() => {
    if (isLoginError === "error login") {
      setShowModal(true);
      dispatch(resetAuthState({ field: "error", value: null }));
    }
  }, [isLoginError, dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Incorrect email format.")
      .required("This field is required."),
    password: Yup.string().min(8).max(32).required("This field is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: { email: string; password: string }) => {
      await dispatch(logInThunk(values));
    },
  });

  return (
    <>
      {isConfirmEmailFrom ? (
        <ConfirmEmailForm
          isConfirmEmailFrom={isConfirmEmailFrom}
          setIsConfirmEmailFrom={setIsConfirmEmailFrom}
        />
      ) : (
        <>
          <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md">
              <div className="text-center mb-4">
                <img src={logo} alt="logo" className="mx-auto h-10 w-168px" />
                <h1 className="text-xl font-semibold">Login</h1>
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
                    Login
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setIsConfirmEmailFrom(!isConfirmEmailFrom)}
                    className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center justify-center"
                  >
                    Forgot your password?
                  </button>

                  <div className="flex justify-between items-center gap-2">
                    <p className="text-sm text-gray-700">
                      Don't have an account?
                    </p>
                    <NavButton
                      to={{
                        pathname: "/signUp",
                      }}
                      text="Register"
                      extraStyles="text-sm text-indigo-600 hover:text-indigo-500 flex items-center justify-center"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {showModal && (
            <Modal
              message="Invalid password. Please check your password and try again."
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
    </>
  );
};

function Modal({ message, onClose }: ModalType) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed inset-0 flex items-start justify-end">
      <div
        className="bg-black bg-opacity-30 absolute top-0 right-0 bottom-0 left-0"
        onClick={onClose}
      />
      <div className="modal bg-white rounded-lg p-6 m-4 absolute top-4 right-4">
        <span
          className={`close text-gray-600 text-2xl font-bold absolute top-0 right-0 p-2 transition-transform cursor-pointer ${
            isHovered ? "scale-125" : ""
          }`}
          onClick={onClose}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          &times;
        </span>
        <p className="pt-1">{message}</p>
      </div>
    </div>
  );
}
