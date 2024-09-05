import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { confirmEmailThunk } from "../redux/auth/operations";
import { selectIsConfirmEmail } from "../redux/auth/selectors";

export const ConfirmEmail: React.FC = () => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const history = useHistory();
  const isConfirmEmail = useSelector(selectIsConfirmEmail);

  const params = useRouteMatch<any>("/confirm-email/:id");
  const confirmToken = params?.params?.id;

  useEffect(() => {
    dispatch(confirmEmailThunk(confirmToken));
  }, [dispatch, confirmToken]);

  useEffect(() => {
    if (isConfirmEmail) {
      history.push("/login");
    }
  }, [isConfirmEmail, history]);

  return (
    <div>
      <p>ConfirmEmail</p>
    </div>
  );
};
