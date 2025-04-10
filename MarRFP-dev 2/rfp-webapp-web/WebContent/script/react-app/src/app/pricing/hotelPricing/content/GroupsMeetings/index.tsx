import React from "react";
import ReactDOM from "react-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import { HotelContextProvider } from "./context/groupMeetingContextProvider";

ReactDOM.render(
  <HotelContextProvider>
    <BrowserRouter>
      <Redirect from="/" to="/GroupsMeetings" />
    </BrowserRouter>
  </HotelContextProvider>,
  document.getElementById("SelectHotelPricing")
);
