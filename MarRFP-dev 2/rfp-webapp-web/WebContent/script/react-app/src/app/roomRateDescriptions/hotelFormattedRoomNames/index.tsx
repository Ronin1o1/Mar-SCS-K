import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { SelectHotelContextProvider } from "./context/SelectHotelContext";
import SelectHotel from "./content/SelectHotel";
import SelectRoomPool from "./content/SelectRoomPool";
import SelectFormattedRoomPoolDefinition from "./content/SelectFormattedRoomPoolDefinition";
import Settings from "./static/Settings";
import FinishProduct from "./content/FinishProduct";

const HotelFormattedRoomNames: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <SelectHotelContextProvider>
      <Switch>
        <Route path={`${path}/select`} component={SelectHotel} />
        <Route path={`${path}/getRoomPools`} component={SelectRoomPool} />
        <Route
          path={`${path + Settings.routingUrl.defineRoomName}`}
          component={SelectFormattedRoomPoolDefinition}
        />
        <Route
          path={`${path + Settings.routingUrl.finishProduct}`}
          component={FinishProduct}
        />
      </Switch>
    </SelectHotelContextProvider>
  );
};
export default HotelFormattedRoomNames;
