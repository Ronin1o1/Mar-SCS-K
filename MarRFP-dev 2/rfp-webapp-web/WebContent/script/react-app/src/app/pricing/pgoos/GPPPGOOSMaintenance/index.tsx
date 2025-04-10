import React from "react";
import { GPPPGOOSMaintenance } from "./content/GPPPGOOSMaintenance";
import { GPPPGOOSMaintenanceContextProvider } from "./context/GPPPGOOSMaintenanceContext";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";

const GPPPGOOSMaintenanceWrapper: React.FC = () => {
  return (
    <GPPPGOOSMaintenanceContextProvider>
      <GPPPGOOSMaintenance />
    </GPPPGOOSMaintenanceContextProvider>
  );
};
export default GPPPGOOSMaintenanceWrapper;
