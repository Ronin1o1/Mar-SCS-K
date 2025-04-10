import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { AccountStatusListContextProvider } from "./context/AccountStatusListContext";
import AccountStatusList from "./content/AccountStatusList";

const AccountStatusListWrapper = () => {
  return(
  <AccountStatusListContextProvider>
    <AccountStatusList />
  </AccountStatusListContextProvider>
  )
}

export default AccountStatusListWrapper;
 