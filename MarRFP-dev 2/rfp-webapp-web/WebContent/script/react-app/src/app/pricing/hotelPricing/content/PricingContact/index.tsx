import React from "react";
import ReactDOM from "react-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import CPACTabs from "../centerallyPricedAccount/content/Tabs/CPACTabs";

ReactDOM.render(
  <BrowserRouter>
    {/* <Redirect from="/" to="/PriceContact" />
    <Route path="/CPAC" component={CPACTabs}/> */}
  </BrowserRouter>,
  document.getElementById("SelectHotelPricing")
);
