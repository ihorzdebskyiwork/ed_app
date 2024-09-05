import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { refreshUserThunk } from "./redux/auth/operations";
import { getUserInfoThunk } from "./redux/user/operations";
import { selectIsAuth } from "./redux/auth/selectors";

import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";

import { SignUp } from "./screens/SignUp";
import { ConfirmEmail } from "./screens/ConfirmEmail";
import { Login } from "./screens/Login";
import { ResetPassword } from "./screens/ResetPassword";
import { Home } from "./screens/Home";

import { SetsCoursePage } from "./screens/SetsCoursePage";
import { ExamsTask } from "./screens/ExamsTask";

const NotFound = () => <h1>NotFound</h1>;

const App: React.FC = () => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const isAuthenticated = useSelector(selectIsAuth);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(refreshUserThunk());

      //get user data
      if (isAuthenticated) {
        await dispatch(getUserInfoThunk());
      }
    };
    fetchData();
  }, [dispatch, isAuthenticated]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <PublicRoute
        path="/home"
        isAuthenticated={isAuthenticated}
        component={Home}
      />

      <PublicRoute
        path="/login"
        isAuthenticated={isAuthenticated}
        component={Login}
      />

      <PublicRoute
        path="/signUp"
        component={SignUp}
        isAuthenticated={isAuthenticated}
      />

      <PublicRoute
        path="/confirm-email/:id"
        component={ConfirmEmail}
        isAuthenticated={isAuthenticated}
      />

      <PublicRoute
        path="/reset-password/:id"
        component={ResetPassword}
        isAuthenticated={isAuthenticated}
      />

      <PrivateRoute
        path="/setsCourse"
        isAuthenticated={isAuthenticated}
        component={SetsCoursePage}
      />

      <PrivateRoute
        path="/examsTask"
        isAuthenticated={isAuthenticated}
        component={ExamsTask}
      />

      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
