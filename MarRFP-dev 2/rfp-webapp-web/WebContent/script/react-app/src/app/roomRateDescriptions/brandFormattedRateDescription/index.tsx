import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import ModifyRateDescriptions from "./content/ModifyRateDescriptions";
import { BrandFormattedRateContextProvider } from "./context/BrandFormattedRateContext";
import BrandSelection from "./content/BrandSelection";
import Settings from "./static/Settings";
import RateProductBrandDefinition from "./content/RateProductBrandDefinition";

const BrandFormattedRateDescriptions: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <BrandFormattedRateContextProvider>
      <Switch>
        <Route path={`${path}/select`} component={BrandSelection} />
        <Route
          path={`${Settings.routingUrl.parentRoute}${Settings.routingUrl.modifyRateDesc}`}
          component={ModifyRateDescriptions}
        />
        <Route
          path={`${Settings.routingUrl.defineProductParentRoute}/defineProduct`}
          component={RateProductBrandDefinition}
        />
      </Switch>
    </BrandFormattedRateContextProvider>
  );
};
export default BrandFormattedRateDescriptions;
