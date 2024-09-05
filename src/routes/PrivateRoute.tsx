import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<RouteComponentProps>;
  isAuthenticated: boolean;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  component: Component,
  isAuthenticated,
}) => (
  <Route
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
