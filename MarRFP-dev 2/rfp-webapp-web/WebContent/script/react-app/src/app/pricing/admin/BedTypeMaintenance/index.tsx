import React from "react";
import ReactDOM from "react-dom";

// Prime React CSS
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import BedTypeMaintenance from "./content/BedTypeMaintenance";

ReactDOM.render(
  <BedTypeMaintenance />,
  document.getElementById("bedTypeMaintenanceList")
);
