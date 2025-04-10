import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

import UpdateMultipleHotels from "./content/UpdateMultipleHotels";
import UpdateMultipleHotelsContextProvider from "./context/UpdateMultipleHotelsContextProvider";
const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <UpdateMultipleHotelsContextProvider>
        <Redirect from="/" to="/multihotelaccountcenter" />
        <Route
          path="/multihotelaccountcenter"
          component={UpdateMultipleHotels}
        />
      </UpdateMultipleHotelsContextProvider>{" "}
    </BrowserRouter>
  );
};
export default Routes;
