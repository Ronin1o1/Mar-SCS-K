import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { HotelRateProductSelectContextProvider } from "./context/HotelRateProductSelectContext";
import HotelRateProductSelect from "./content/HotelRateProductSelect";
import RateProductHotelView from "./content/ViewRateDescription/content/RateProductHotelView";
import ModifyRateDescription from "./content/modifyRateProductDescription/content/ModifyRateDescription";
import RateDescriptionProductDefinition from "./content/modifyRateProductDescription/content/RateDescriptionProductDefinition";

const HotelFormattedDescription: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <HotelRateProductSelectContextProvider>
      <Switch>
        <Route path={`${path}/select`} component={HotelRateProductSelect} />
        <Route
          path={`${path}/viewDescription`}
          component={RateProductHotelView}
        />
        <Route
          path={`${path}/searchAction`}
          component={ModifyRateDescription}
        />
        <Route
          path={`${path}/defineProduct`}
          component={RateDescriptionProductDefinition}
        />
      </Switch>
    </HotelRateProductSelectContextProvider>
  );
};
export default HotelFormattedDescription;
