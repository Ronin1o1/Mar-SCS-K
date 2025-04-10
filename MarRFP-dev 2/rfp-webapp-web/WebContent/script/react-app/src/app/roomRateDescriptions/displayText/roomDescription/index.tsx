import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// Prime React CSS
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import RoomDescription from "./content/RoomDescription";
import DataElements from "./content/DataElements/DataElements";
import EnterAmenity from "./content/DataElements/EnterAmenity";

import CopyText from "./content/CopyText/CopyText";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { RoomDescriptionContextProvider } from "./context/RoomDescriptionContextProvider";

const RoomDescriptionText: React.FC = () => {
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
        <Route path={`${path}/roomDescription`} component={RoomDescription} />
        <Route path={`${path}/dataElements`} component={DataElements} />
        <Route path={`${path}/copyText`} component={CopyText} />
        <Route path={`${path}/enterAmenity`} component={EnterAmenity} />
      </Switch>
    </RoomDescriptionContextProvider>
  );
};
export default RoomDescriptionText;
