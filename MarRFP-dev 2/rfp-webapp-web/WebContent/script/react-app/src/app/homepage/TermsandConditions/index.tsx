import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import TermsAndConditions from "./content/TermsAndConditions";

ReactDOM.render(
  <BrowserRouter>
    <TermsAndConditions />
  </BrowserRouter>,

  document.getElementById("termsAndConditions")
);
