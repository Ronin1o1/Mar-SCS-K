import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import EligibilityAmenity from "./content/EligibilityAmenity";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { EligibilityAmenityContextProvider } from "./context/EligibilityAmenityContext";

ReactDOM.render(
  <EligibilityAmenityContextProvider>
    <BrowserRouter>
      <Redirect from="/" to="/eligibilityAmenity" />
      <Route path="/eligibilityAmenity" component={EligibilityAmenity} />
    </BrowserRouter>
  </EligibilityAmenityContextProvider>,
  document.getElementById("eligibilityAmenity")
);
