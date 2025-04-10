import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import RoomDescription from "./content/RoomDescription";
import RoomDescriptionView from "./content/RoomDescriptionView";
import CopyRules from "./content/CopyRules";
import { RoomDescriptionContextProvider } from "./context/RoomDescriptionContext";

const RoomDescriptionRules: React.FC = () => {
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
        <Route path={`${path}/RoomDescription`} component={RoomDescription} />
        <Route
          path={`${path}/RoomDescriptionView`}
          component={RoomDescriptionView}
        />
        <Route path={`${path}/CopyRules`} component={CopyRules} />
      </Switch>
    </RoomDescriptionContextProvider>
  );
};
export default RoomDescriptionRules;
