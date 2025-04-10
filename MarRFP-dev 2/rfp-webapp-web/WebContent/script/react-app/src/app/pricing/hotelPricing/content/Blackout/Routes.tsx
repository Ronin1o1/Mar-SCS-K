import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Blackout from "./content/Blackout";
const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Redirect from="/" to="/blackout" />
      <Route path="/blackout" component={Blackout} />
    </BrowserRouter>
  );
};
export default Routes;
