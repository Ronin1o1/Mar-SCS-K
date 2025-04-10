import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { MasterFarmattedRoomNamesContextProvider } from "./context/MasterFormattedRoomNamesContext";
import { MasterFarmattedRoomNames } from "./content/MasterFormattedRoomNames";
import MasterFormatedRoomPoolDefinition from "./content/masterFormatedRoomPoolDefinition";
import finishProduct from "./content/finishProduct";
import Settings from "../masterFarmattedRoomNames/settings/Settings";
const MasterFormattedRoomNames: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <MasterFarmattedRoomNamesContextProvider>
      <Switch>
        <Route
          path={`${path + Settings.routingUrl.getRoomPools}`}
          component={MasterFarmattedRoomNames}
        />
        <Route
          path={`${path + Settings.routingUrl.defineRoomName}`}
          component={MasterFormatedRoomPoolDefinition}
        />
        <Route
          path={`${path + Settings.routingUrl.finishProduct}`}
          component={finishProduct}
        />
      </Switch>
    </MasterFarmattedRoomNamesContextProvider>
  );
};
export default MasterFormattedRoomNames;
