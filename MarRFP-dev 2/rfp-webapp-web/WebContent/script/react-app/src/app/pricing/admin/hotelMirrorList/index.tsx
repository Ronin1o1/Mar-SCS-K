import React from "react";
import ReactDOM from "react-dom";
import HotelMirrorList from "./content/HotelMirrorList";
// Prime React CSS
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";

ReactDOM.render(
  <HotelMirrorList />,
  document.getElementById("hotelMirrorList")
);
