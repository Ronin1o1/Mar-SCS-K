import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// Prime React CSS
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import RateProduct from "./content/RateProduct";
import DataElements from "./content/DataElements/DataElements";
import EnterAmenity from "./content/DataElements/EnterAmenity";

import CopyText from "./content/CopyText/CopyText";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { RateProductContextProvider } from "./context/RateProductContextProvider";

const RateProductText: React.FC = () => {
  const { path } = useRouteMatch();
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("channelNames");
      sessionStorage.removeItem("listViewDatas");
    };
  }, []);
  return (
    <RateProductContextProvider>
      <Switch>
        <Route path={`${path}/rateProduct`} component={RateProduct} />
        <Route path={`${path}/dataElements`} component={DataElements} />
        <Route path={`${path}/copyText`} component={CopyText} />
        <Route path={`${path}/enterAmenity`} component={EnterAmenity} />
      </Switch>
    </RateProductContextProvider>
  );
};
export default RateProductText;
