import React from "react";
import ReactDOM from "react-dom";

// Prime React CSS
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";

import { Route, Redirect, BrowserRouter } from "react-router-dom";
import ProfileList from "./profileList/content/profileList";
import EditProfile from "./editProfile/content/editProfile";
import AddProfile from "./addProfile/content/addProfile";
ReactDOM.render(
  <BrowserRouter>
    <Redirect from="/" to="/profileList" />
    <Route path="/profileList" component={ProfileList} />
    <Route path="/editProfile/:id" component={EditProfile} />
    <Route path="/addProfile" component={AddProfile} />
  </BrowserRouter>,
  document.getElementById("fieldProfile")
);
