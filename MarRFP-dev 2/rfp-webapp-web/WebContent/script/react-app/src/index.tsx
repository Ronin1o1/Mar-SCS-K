import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./app/common/assets/styles/calendar.css";

import "./index.css";
import "./app/common/assets/styles/navbar.css";
import { ApplicationContextProvider } from "./app/common/components/ApplicationContext";
import { requestInterceptor } from "./app/common/components/customaxios";
import { SignOutContextProvider } from "./app/homepage/signOut/context/SignOutContext";

requestInterceptor();

ReactDOM.render(
  <ApplicationContextProvider>
    <SignOutContextProvider>
      <Main />
    </SignOutContextProvider>
  </ApplicationContextProvider>,
  document.getElementById("root")
);
