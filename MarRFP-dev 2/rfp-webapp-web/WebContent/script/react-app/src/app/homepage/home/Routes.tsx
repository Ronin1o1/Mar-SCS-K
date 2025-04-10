import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Home } from "./content/Home";
import { HomeContextProvider } from "./context/HomeContext";
const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <HomeContextProvider>
        <Route
          path="/"
          component={Home}
        />
      </HomeContextProvider>
    </BrowserRouter>
  );
};
export default Routes;
