import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import React from "react";

interface PublicRouteProps {
  component: React.ComponentType<RouteComponentProps>;
  isAuthenticated: boolean;
  path: string;
  exact?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  path,
  component: Component,
  isAuthenticated,
}) => (
  <Route
    render={(props) =>
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/setsCourse", state: { from: props.location } }}
        />
      )
    }
  />
);
