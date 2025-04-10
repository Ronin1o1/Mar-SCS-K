/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from "react";
import SalesAdministartionContext from "../context/salesAdministartionContextProvider";
import { GlobalHeader } from "./salesAdminRouting";
import Settings from "../static/Settings";

export function Layout(props: any) {
  const [setvalues, propsvalues] = useState("");
  const lastUpdateDateValue = props.getlastUpdateDate;
  const updatedDatevalue = props.onUpdateValue;

  useEffect(() => {
    propsvalues(lastUpdateDateValue);
  }, [props.getlastUpdateDate]);

  useEffect(() => {
    propsvalues(updatedDatevalue);
  }, [props.onUpdateValue]);

  const globalHeaderContext = useContext(SalesAdministartionContext);
  const UpdateSave = (e, tabNameValue) => {
    if (tabNameValue === Settings.onNavigationViewName.AccountBTProfile) {
      props.IsDataUpdate(e);
    } else if (
      tabNameValue === Settings.onNavigationViewName.AccountBTOverview
    ) {
      props.IsDataUpdate(e);
    } else if (tabNameValue === Settings.onNavigationViewName.GroupProfile) {
      props.IsProfileDataUpdate(e);
    } else if (
      tabNameValue === Settings.onNavigationViewName.MarriottTeamMember
    ) {
      props.IsAcctContactsUpdate(e);
    } else if (
      tabNameValue === Settings.onNavigationViewName.AccountInitiatives
    ) {
      props.IsAccountInitiativeUpdated();
    } else if (
      tabNameValue === Settings.onNavigationViewName.EditBuyingOfficeLocation
    ) {
      props.IsAcctLocationsUpdate(e);
    } else if (tabNameValue === Settings.onNavigationViewName.Catering) {
      props.IsCateringDataUpdate();
    } else if (tabNameValue === Settings.onNavigationViewName.AccountOverView) {
      props.IsDataUpdate(e);
    } else if (tabNameValue === Settings.onNavigationViewName.cityMarkets) {
      props.IsDataUpdate(e);
    } else if (tabNameValue === Settings.onNavigationViewName.ExtendedStay) {
      props.IsExtendedStayDataUpdate();
    } else if (
      tabNameValue === Settings.onNavigationViewName.BuyingOfficeLocation
    ) {
      props.IsAcctLocationsUpdate(e);
    } else if (
      tabNameValue === Settings.onNavigationViewName.GroupsIntermediaries
    ) {
      props.IsGroupsIntermediariesUpdate();
    } else if (tabNameValue === Settings.onNavigationViewName.KeyContacts) {
      props.IsKeyContactsUpdate();
    } else if (
      tabNameValue === Settings.onNavigationViewName.AccountPerspective
    ) {
      props.IsAcctPerpspectiveDataUpdate();
    } else if (tabNameValue === Settings.onNavigationViewName.Leisure) {
      props.IsLeisureUpdate();
    } else if (tabNameValue === Settings.onNavigationViewName.GroupsOverview) {
      props.IsGroupsOverviewUpdate();
    }
  };
  return (
    <>
      <GlobalHeader
        contextData={globalHeaderContext}
        setevent={UpdateSave}
        setnewDate={setvalues}
        IsAcctContactsUpdate={() => props.IsAcctContactsUpdate()}
        IsAcctContactsDelete={() => props.IsAcctContactsDelete()}
        ShowDeleteButton={props.ShowDeleteButton}
        ShowPreviousButton={props.ShowPreviousButton}
        PrevButtonClick={props.PrevButtonClick}
        UpdateGeneralAcctOverview={() => props.IsDataUpdate()}
        nextBtnClick={() => props.nextBtnClick()}
        editBuyingOfficeLocation={props.editBuyingOfficeLocation ? true : false}
      />
      {props.children}
    </>
  );
}
