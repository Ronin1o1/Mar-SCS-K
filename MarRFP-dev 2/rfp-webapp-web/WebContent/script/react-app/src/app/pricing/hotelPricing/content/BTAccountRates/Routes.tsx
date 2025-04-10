import React from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";
import  BTGroup  from "./content/BTGroup";

const Routes: React.FC = () => {
  return (
    <HashRouter>
        <Redirect from="/" to="/btGroup"/>
        <Route
          path="/ratesRules"
          component={BTGroup}
        />
    </HashRouter>
  );
};
export default Routes;
