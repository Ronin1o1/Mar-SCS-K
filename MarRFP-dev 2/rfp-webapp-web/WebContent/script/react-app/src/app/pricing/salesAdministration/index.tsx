import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import accBTProfileList from "./content/accBTProfile/content/accBTProfileList";
import BuyingOfficeLocation from "./content/buyingOfficeLocation/content/BuyingOfficeLocation";
import EditBuyingOffice from "./content/buyingOfficeLocation/content/editBuyingOfficeLocation/content/EditBuyingOffice";
import EditAccountPlanSapp from "./content/editAccountPlanSapp/content/EditAccountPlanSapp";
import GeneralAccountOverview from "./content/generalAccountOverview/content/GeneralAccountOverview";
import groupProfile from "./content/groupProfile/content/groupProfile";
import KeyContacts from "./content/keyContacts/content/KeyContacts";
import { SalesAdministartionContextProvider } from "./context/salesAdministartionContextProvider";
import MarriottTeamMembers from "./MarriottTeamMembers/content/MarriottTeamMembers";
import AccountInitiatives from "./content/accountInitiatives/content/AccountInitiatives";
import ExtendedStay from "./content/extendedStay/content/extendedStay";
import accBTOverview from "./content/accBTOverview/content/accBTOverview";
import Catering from "./content/catering/content/catering";
import GroupsIntermediaries from "./content/GroupsIntermediaries/Content/GroupsIntermediaries";
import CityMarketsWrapper from "./content/cityMarkets/index";
import GroupsOverview from "./content/GroupsOverview/Content/GroupsOverview";
import AccountPerspective from "./content/accountPerspective/content/accountPerspective";
import Leisure from "./content/leisure/content/leisure";

const SalesAdmin: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <SalesAdministartionContextProvider>
      <Switch>
        <Route exact path={`${path}`}>
          <Redirect to={`${path}/editaccountplansapp`} />
        </Route>
        <Route
          path={`${path}/editaccountplansapp`}
          component={EditAccountPlanSapp}
        />
        <Route path={`${path}/accBTProfileList`} component={accBTProfileList} />
        <Route path={`${path}/accBTOverview`} component={accBTOverview} />
        <Route
          path={`${path}/buyingOfficeLocation`}
          component={BuyingOfficeLocation}
        />
        <Route
          path={`${path}/editBuyingOfficeLocation`}
          component={EditBuyingOffice}
        />
        <Route path={`${path}/groupProfile`} component={groupProfile} />
        <Route path={`${path}/catering`} component={Catering} />
        <Route
          path={`${path}/marriottteamMember`}
          component={MarriottTeamMembers}
        />
        <Route
          path={`${path}/accountInitiatives`}
          component={AccountInitiatives}
        />
        <Route
          path={`${path}/acctoverview`}
          component={GeneralAccountOverview}
        />
        <Route path={`${path}/extendedStay`} component={ExtendedStay} />
        <Route
          path={`${path}/groupsIntermediaries`}
          component={GroupsIntermediaries}
        />
        <Route path={`${path}/cityMarkets`} component={CityMarketsWrapper} />
        <Route path={`${path}/keyContacts`} component={KeyContacts} />
        <Route path={`${path}/groupsOverview`} component={GroupsOverview} />
        <Route
          path={`${path}/accountPerspective`}
          component={AccountPerspective}
        />
        <Route path={`${path}/leisure`} component={Leisure} />
      </Switch>
    </SalesAdministartionContextProvider>
  );
};

export default SalesAdmin;
