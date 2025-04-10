import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import Routes from "./Routes";
import PricingHotelDepthOfSales from "./content/pricingHotelDepthOfSales";

ReactDOM.render(

  <BrowserRouter>
    <PricingHotelDepthOfSales />
  </BrowserRouter>,
  document.getElementById("deapthofsale")
);

