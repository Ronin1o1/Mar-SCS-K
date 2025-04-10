import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import UpdateContactInfo from "./Admin/content/UpdateContactInfo";
import SalesUpdateContactInfo from "./Others/content/SalesUpdateContactInfo";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Redirect from="/" to="/home" />
      <Route path="/updateAdminContactInfo" component={UpdateContactInfo} />
      <Route path="/updateContactInfo" component={SalesUpdateContactInfo} />
    </BrowserRouter>
  );
};
export default Routes;
