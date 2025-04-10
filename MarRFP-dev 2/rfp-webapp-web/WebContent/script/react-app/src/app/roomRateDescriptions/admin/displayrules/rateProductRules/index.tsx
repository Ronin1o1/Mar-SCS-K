import React, { useEffect } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import RateProduct from "./content/RateProduct";
import RateProductView from "./content/RateProductView";
import CopyRules from "./content/CopyRules";

const RateProductRules: React.FC = () => {
  const { path } = useRouteMatch();
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("channelNames");
      sessionStorage.removeItem("listViewDatas");
    };
  }, []);
  return (
    <Switch>
      <Route path={`${path}/RateProduct`} component={RateProduct} />
      <Route path={`${path}/RateProductView`} component={RateProductView} />
      <Route path={`${path}/CopyRules`} component={CopyRules} />
    </Switch>
  );
};
export default RateProductRules;
