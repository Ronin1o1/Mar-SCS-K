import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import RatesRules from "./content/RatesRules";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Redirect from="/" to="/ratesRules" />
      <Route path="/ratesRules" component={RatesRules} />
    </BrowserRouter>
  );
};
export default Routes;
