import React from "react";
import Settings from "../static/Settings";

export function TabName(props) {
  const url = props.url;
  let tabName;
  if (url == `${Settings.parentRoute}/CPAC`) {
    tabName = "Centrally Priced Account Center";
  } else if (url == `${Settings.parentRoute}/PriceContact`) {
    tabName = "Pricing Contact";
  } else if (url === `${Settings.parentRoute}/Standards`) {
    tabName = "Standards";
  } else if (url === `${Settings.parentRoute}/hotelPricing/Seasons`) {
    tabName = "Seasons";
  } else if (url === `${Settings.parentRoute}/DepthOfSale`) {
    tabName = "Depth Of Sales";
  } else if (url === `${Settings.parentRoute}/Blackout`) {
    tabName = "Blackouts";
  } else if (url === `${Settings.parentRoute}/eligibilityAmenity`) {
    tabName = "Eligibilities and Amenities";
  } else if (url === `${Settings.parentRoute}/GroupsMeetings`) {
    tabName = "Groups & Meetings";
  } else if (url === `${Settings.parentRoute}/SCPT`) {
    tabName = "SCPT";
  } else if (url === `${Settings.parentRoute}/multipleBlackout`) {
    tabName = "Account Blackouts";
  } else if (url === `${Settings.parentRoute}/btAccountRates`) {
    tabName = "All BT Account Specific Rates";
  } else if (url === `${Settings.parentRoute}/Seasons`) {
    tabName = Settings.tabNames.fixedSeason;
  } else if (url === `${Settings.parentRoute}/GeneralPricing`) {
    tabName = "General Pricing";
  } else if (url === `${Settings.parentRoute}/HotelAccountQuestions`) {
    tabName = "Account Specific Questions";
  }
  return (
    <span style={props.styles ? { ...props.styles } : null}>{tabName}</span>
  );
}
