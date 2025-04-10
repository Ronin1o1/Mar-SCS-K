/* eslint-disable prettier/prettier */
import React from "react";
import Settings from "../static/Settings";

export function TabName(props) {
  const url = props.url;
  let tabName;
  if (url == `${Settings.parentRoute}/accBtProfileList`) {
    tabName = "SAPP - BT/Business Transient - Profile";
  } else if (url === `${Settings.parentRoute}/accBTOverview`) {
    tabName = "SAPP - BT/Business Transient -  Overview";
  }else if (url === `${Settings.parentRoute}/cityMarkets`) {
    tabName = "SAPP - BT/Business Transient - City/Markets";
  } else if (url === `${Settings.parentRoute}/reports/printBTAccount`) {
    tabName = "Print BT Account Plan Overview";
  } else if (url === `${Settings.parentRoute}/reports/printBTAccountMarket`) {
    tabName = "Print BT Account Plan Overview /w Market";
  }else if (url === `${Settings.parentRoute}/groupProfile`) {
    tabName = "SAPP - Groups - Profile";
  } else if(url === `${Settings.parentRoute}/marriottteamMember`) {
    tabName = Settings.accountTabs.sapMarriottTeamMembers
  } else if(url === `${Settings.parentRoute}/accountInitiatives`) {
    tabName = Settings.tabNames.accInitiatives;
  }else if(url === `${Settings.parentRoute}/extendedStay`) {
    tabName = Settings.tabNames.extendedStay;
  } else if(url === `${Settings.parentRoute}/buyingOfficeLocation`) {
    tabName = Settings.accountTabs.sapBuyingOfficeLocation;
  } else if(url === `${Settings.parentRoute}/editBuyingOfficeLocation`) {
    tabName = Settings.accountTabs.sappEditOfficeLocation;
  } else if(url === `${Settings.parentRoute}/catering`) {
    tabName = Settings.tabNames.catering;
  } else if (url === `${Settings.parentRoute}/acctoverview`) {
    tabName = Settings.tabNames.generalOverview;
  } else if(url === `${Settings.parentRoute}/groupsIntermediaries`) {
    tabName = Settings.tabNames.groupIntermediaries
  } else if(url === `${Settings.parentRoute}/keyContacts`) {
    tabName = Settings.tabNames.keyContacts
  }else if(url === `${Settings.parentRoute}/accountPerspective`) {
    tabName = Settings.tabNames.accountPerspective
  }else if(url === `${Settings.parentRoute}/leisure`) {
    tabName = Settings.tabNames.leisure
  } else if(url === `${Settings.parentRoute}/groupsOverview`) {
    tabName = Settings.tabNames.sappGroupsOverview
  }
  return <>{tabName}</>;
}
