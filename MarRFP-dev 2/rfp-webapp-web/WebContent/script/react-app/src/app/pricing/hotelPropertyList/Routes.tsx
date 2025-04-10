import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";

import { PropertyList } from "./content/PropertyList";
import { PropertyListContextProvider } from "./context/PropertyListContext";
const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <PropertyListContextProvider>
        <Redirect from="/" to="/propertylist" />
        <Route path="/propertylist" component={PropertyList} />
      </PropertyListContextProvider>{" "}
    </BrowserRouter>
  );
};
export default Routes;
