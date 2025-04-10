import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SelectHotelComponent from "./content/SelectHotel/content/SelectHotelComponent";
import RoomPoolComponent from "./content/RoomPool/content/RoomPoolComponent";
import { SelectHotelContextProvider } from "./content/RoomPool/context/SelectHotelContext";
import RoomPoolView from "./content/RoomPool/content/RoomPoolView";
import SelectRateProgram from "./content/RateProgram/content/SelectRateProgram";
import RoomPoolFinishProduct from "./content/RoomPool/content/RoomPoolFinishProduct";

const HotelRoomDesc: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <SelectHotelContextProvider>
      <Switch>
        <Route path={`${path}/select`} component={SelectHotelComponent} />
        <Route path={`${path}/selectRoomPool`} component={RoomPoolComponent} />
        <Route path={`${path}/defineRoomPool`} component={RoomPoolView} />
        <Route
          path={`${path}/finishProduct`}
          component={RoomPoolFinishProduct}
        />
        <Route path={`${path}/getRateProgram`} component={RoomPoolView} />
        <Route
          path={`${path}/selectRateProgram`}
          component={SelectRateProgram}
        />
      </Switch>
    </SelectHotelContextProvider>
  );
};
export default HotelRoomDesc;
