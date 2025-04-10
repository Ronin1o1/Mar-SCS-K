import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import DepthofSales from "./content/hotelDepthOfSales";
const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Redirect from="/" to="/deapthofsale" />
      <Route path="/deapthofsale" component={DepthofSales} />{" "}
    </BrowserRouter>
  );
};
export default Routes;
