import React from "react";
import ReactDOM from "react-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { UpdateMultipleHotels } from "./content/UpdateMultipleHotels";
import { UpdateMultipleHotelsContextProvider } from "./context/UpdateMultipleHotelsContextProvider";

ReactDOM.render(
  <UpdateMultipleHotelsContextProvider >
    <UpdateMultipleHotels />
    </UpdateMultipleHotelsContextProvider>
  ,
  document.getElementById("updateMutipleHotels")
);
