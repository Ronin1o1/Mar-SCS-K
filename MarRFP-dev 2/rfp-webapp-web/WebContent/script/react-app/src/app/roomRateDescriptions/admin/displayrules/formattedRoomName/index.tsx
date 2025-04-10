import React, { useEffect } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import RoomDescription from "./content/RoomDescription";
import RoomDescriptionView from "./content/RoomDescriptionView";
import CopyRules from "./content/CopyRules";
import { RoomDescriptionContextProvider } from "./context/RoomDescriptionContext";

const FormattedRoomNameRules: React.FC = () => {
  const { path } = useRouteMatch();

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("channelNames");
      sessionStorage.removeItem("listViewDatas");
    };
  }, []);

  return (
    <RoomDescriptionContextProvider>
      <Switch>
        <Route path={`${path}/formattedRoom`} component={RoomDescription} />
        <Route
          path={`${path}/formattedRoomView`}
          component={RoomDescriptionView}
        />
        <Route path={`${path}/CopyRules`} component={CopyRules} />
      </Switch>
    </RoomDescriptionContextProvider>
  );
};
export default FormattedRoomNameRules;
