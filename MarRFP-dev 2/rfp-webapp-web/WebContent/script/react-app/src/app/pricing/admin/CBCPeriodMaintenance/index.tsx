import React from "react";
import ReactDOM from "react-dom";
//import NewsList from "./content/NewsList";
// Prime React CSS
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import CBCPeriodMaintenance from "./content/CBCPeriodMaintenance";

ReactDOM.render(
  <CBCPeriodMaintenance />,
  document.getElementById("cbcperiodMaintenanceList")
);
