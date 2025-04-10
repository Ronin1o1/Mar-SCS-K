import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";

import { HotelPGOOSMaintenance } from "./content/HotelPGOOSMaintenance";
import { HotelPGOOSMaintenanceContextProvider } from "./context/HotelPGOOSMaintenanceContext";
const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <HotelPGOOSMaintenanceContextProvider>
        <Redirect from="/" to="/hotelPGOOSMaintenance" />
        <Route
          path="/hotelPGOOSMaintenance"
          component={HotelPGOOSMaintenance}
        />
      </HotelPGOOSMaintenanceContextProvider>{" "}
    </BrowserRouter>
  );
};
export default Routes;
