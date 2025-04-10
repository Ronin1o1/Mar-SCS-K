import React from "react";
import ReactDOM from "react-dom";
//import NewsList from "./content/NewsList";
// Prime React CSS
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import PeriodMaintenance from "./content/PeriodMaintenance";

ReactDOM.render(
  <PeriodMaintenance />,
  document.getElementById("periodMaintenanceList")
);
