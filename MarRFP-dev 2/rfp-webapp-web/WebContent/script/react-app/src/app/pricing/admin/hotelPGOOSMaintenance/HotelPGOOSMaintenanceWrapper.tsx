import React from "react";
import { HotelPGOOSMaintenance } from "./content/HotelPGOOSMaintenance";
import { HotelPGOOSMaintenanceContextProvider } from "./context/HotelPGOOSMaintenanceContext";
const HotelPGOOSMaintenanceWrapper: React.FC = () => {
  return (
    <HotelPGOOSMaintenanceContextProvider>
      <HotelPGOOSMaintenance />
    </HotelPGOOSMaintenanceContextProvider>
  );
};
export default HotelPGOOSMaintenanceWrapper;
