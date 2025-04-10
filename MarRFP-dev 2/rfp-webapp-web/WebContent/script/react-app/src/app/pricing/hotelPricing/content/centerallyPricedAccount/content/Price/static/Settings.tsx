const Settings = {
  api: {
    getHotelaccountspeccentralrates:
      "/hotelaccountspeccentralrates/getAccSpecRates.action",
    getHotelFinalPrintRepost: "/hotelfinalprintreport/getFinalPrintReport",
    getCognosUrl: "/reports/getAppEnvDetails.action",
    getAccountOverViewReport:
      "/hotelaccountoverview/getHotelAccountOverviewReport.action",
    getPeriodList: "/hotelfinalprintreport/getDisplay.action",
    getMultiHotelAccountSpecificRates:
      "/multihotelaccountspecrates/getMultiHotelAccountSpecificRates.action",
  },
  y: "Y",
  n: "N",
  tabList: [
    { id: "statusAccount", label: "Status & Account\nPricing Contact" },
    { id: "rateRules", label: "Rates &\nRules" },
    { id: "eligibilityAmenity", label: "Eligibility &\n Amenities" },
    {
      id: "CompellingBusiness",
      label: "Compelling\nBusiness Case",
      width: "93px",
    },
    { id: "blackouts", label: "Blackouts" },
    { id: "rateNotes", label: "Rate Notes\n& Facility" },
  ],
  rateLoadStatusTitle: "Rate Load Status",
  parentRoute: "/pricinghotelselect",
  searchResult: {
    generatePrintReportMessage:
      "You will not be able to generate the Summary Report since the hotel is not in the account's portfolio for the selected year. Please try another year.",
  },
  accountNamePopupParams: `"MENUBAR=0,SCROLLBARS=1,RESIZABLE=1,HEIGHT=400,WIDTH=800"`,
  popupParams:
    "height=440,width=790,,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
  emptryAlert: "You must fill in all question fields",
  alerts: {
    accountSpecQuestNotFilled:
      "You must visit the Account Specific Questions  tab and fill out the appropriate information.",
    fillRatesAndRulesAlert:
      "You must visit the Rates and Rules tab and fill out the appropriate information .",
    rateNoteFacility:
      "You must  complete all required fields for the nearest facility.",
    groupsandMeetings:
      "You must complete all required fields for Groups and Meetings. ",
    AccountGroupsAndMeetings:
      "You must complete all required fields for Account Groups and Meetings. ",
    rebidAlert: "You must Submit or Decline the rebid.",
    statusAndAccountPricing:
      "You must visit the Status and Account Pricing Contact tab and fill out the appropriate information. ",
    rateRulesAlert:
      "You must visit the Rates and Rules tab and fill out the appropriate information ",
    rateRulesRoomNight:
      " You must enter the number of room nights produced from Jan 1 through Jun 30",
    rateRulesIncludingRm:
      " including the number of room nights produced from Jan 1 through Jun 30",
    amenitySection1: "rate and amenity",
    amenitySection2: "rate,  amenity and account question",
    sectionAlert1: "You have selected to submit a rebid. All ",
    sectionAlert2: "changes MUST be made in the appropriate",
    sectionAlert3:
      "sections. If you offered an FCR rate, you will have to update your pricing product to VP in order to adjust the rate.",
    groupsAndMeetingAlert:
      "You must complete all required fields for Groups and Meetings.",
    fillAllDetails: "You must fill in all question fields",
    fillAllGroupMeetingDetails:
      "You must fill in all Groups & Meetings question fields",
  },
};
export default Settings;
