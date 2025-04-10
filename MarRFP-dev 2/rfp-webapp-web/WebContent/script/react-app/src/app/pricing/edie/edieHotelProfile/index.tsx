import React from "react";
import ReactDOM from "react-dom";

import { Route, Redirect, BrowserRouter } from "react-router-dom";
import EdieHotelProfileList from "./content/EdieHotelProfileList";
import EdieHotelProfileAdd from "./content/EdieHotelProfileAdd";
import EdieHotelProfileName from "./content/EdieHotelProfileName";
import { EdieHotelProfileView } from "./content/EdieHotelProfileView";


ReactDOM.render(
<BrowserRouter> 
    <Redirect from="/" to="/edieHotelProfileList" />
    <Route path="/edieHotelProfileList" component={EdieHotelProfileList} />   
    <Route path="/edieHotelProfileAdd" component={EdieHotelProfileAdd} />                                
    <Route path="/edieHotelProfileName" component={EdieHotelProfileName} />    
    <Route path="/edieHotelProfileView/:profile_id/:profile_name" component={EdieHotelProfileView} />
  </BrowserRouter>,
  document.getElementById("edieHotelProfileList")
);
