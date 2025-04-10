import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import modifyRateDescriptions from "./content/modifyRateDescriptions";
import createProduct from "./content/createProduct";
import Settings from "../masterFormattedRateDescriptions/settings/settings";

const MasterFarmattedRoomDescriptions: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route
        path={`${path + Settings.routingUrl.modifyRateDescriptions}`}
        component={modifyRateDescriptions}
      />
      <Route
        path={`${path + Settings.routingUrl.createProduct}`}
        component={createProduct}
      />
      <Route path={`${path + Settings.routingUrl.finishAndSave}`} />
    </Switch>
  );
};
export default MasterFarmattedRoomDescriptions;
