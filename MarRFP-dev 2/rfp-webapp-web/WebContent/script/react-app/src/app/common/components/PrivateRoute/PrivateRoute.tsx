import { Route, Redirect } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
