import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
// Prime React CSS
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import AccountList from "./content/AccountList";
import EditAccount from "./content/EditAccount";
import CopyAccountInfo from "./content/CopyAccountInfo";

import { AccountListContextProvider } from "./context/AccountListContext";
import { RFPSettingsContextProvider } from "./content/AccntTab/RFPSettings/context/RFPSettingsContext";
import { SpecificQuestionsContextProvider } from "./content/AccntTab/Questions/context/SpecificQuestionsContext";
import { GroupMeetingsContextProvider } from "./content/AccntTab/GroupMeetings/context/GroupMeetingsContext";
import { ComplexityMatrixContextProvider } from "./content/AccntTab/ComplexityMatrix/context/ComplexityMatrixContext";
import { McadlookupContextProvider } from "./content/AccntTab/MCADLookup/context/McadlookupContext";
import { CriticalFieldsContextProvider } from "./content/AccntTab/CriticalFields/context/CriticalFieldsContext";
import { RateLoadingContextProvider } from "./content/AccntTab/RateLoading/context/RateLoadingContext";
const AccountMaintenance = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <AccountListContextProvider>
        <RFPSettingsContextProvider>
          <SpecificQuestionsContextProvider>
            <GroupMeetingsContextProvider>
              <ComplexityMatrixContextProvider>
                <McadlookupContextProvider>
                  <CriticalFieldsContextProvider>
                    <RateLoadingContextProvider>
                      <Switch>
                        <Route exact path={`${path}`}>
                          <Redirect to={`${path}/accountList`} />
                        </Route>
                        <Route
                          exact
                          path={`${path}/accountList`}
                          component={AccountList}
                        />
                        <Route
                          exact
                          path={`${path}/accountEdit`}
                          component={EditAccount}
                        />
                        <Route
                          exact
                          path={`${path}/accountmaintcopy`}
                          component={CopyAccountInfo}
                        />
                      </Switch>
                    </RateLoadingContextProvider>
                  </CriticalFieldsContextProvider>
                </McadlookupContextProvider>
              </ComplexityMatrixContextProvider>
            </GroupMeetingsContextProvider>
          </SpecificQuestionsContextProvider>
        </RFPSettingsContextProvider>
      </AccountListContextProvider>
      ,
    </>
  );
};

export default AccountMaintenance;
