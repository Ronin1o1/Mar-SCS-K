import React from "react";
import ReactDOM from "react-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import MarriottTeamMembers from "./content/MarriottTeamMembers";

ReactDOM.render(
  <MarriottTeamMembers />,
  document.getElementById("marriottTeamMembersId")
);
