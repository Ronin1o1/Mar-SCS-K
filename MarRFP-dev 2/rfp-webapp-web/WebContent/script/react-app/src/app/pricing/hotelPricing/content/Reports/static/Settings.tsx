const Settings = {
  api: {
    getCognosUrl: "/reports/getAppEnvDetails.action",
    getAcceptancestatusReport:
      "/hotelacceptancestatusreport/hotelAcceptanceStatusReportParams.action",
    getAcceptancestatusReportExcel:
      "/hotelacceptancestatusexcelreport/hotelAcceptanceStatusExcelReportParams.action",
    getAddendumQuestions:
      "/hoteladdendumquestionelectronic/addendumQuestionParams.action",
    getAccountPricing:
      "/hotelaccountpricingreport/hotelAcountPricingReportParams.action",
    getTopTravelMarket: "/toptravelmarkets/topMarketReportParams.action",
    getAccountDirectory: "/hotelacctdirelectronic/adirReportParams.action",
    getRebidReport: "/hotelrebidreport/rebidReportParams.action",
    getScptDetailExtract: "/hotelscptdetailelectronic/scptDetailParams.action",
    getScptSummaryExtract:
      "/hotelscptpsumelectronic/scptPricingSummaryParams.action",
    getSummaryTax: "/hotelsummarytaxreport/summaryTaxReportParams.action",

    postAcceptanceStatusReport:
      "/hotelacceptancestatusreport/getHotelAcceptanceStatusReport.action",
    postAcceptanceStatusReportExcel:
      "/hotelacceptancestatusexcelreport/getHotelElectronicReport.action",
    postAddendumQuestions:
      "/hoteladdendumquestionelectronic/getHotelElectronicReport.action",
    postAccountPricing:
      "/hotelaccountpricingreport/getHotelElectronicReport.action",
    postAccoutDirectory:
      "/hotelacctdirelectronic/getHotelElectronicReport.action",
    postTopTravelMarket: "/toptravelmarkets/getHotelTopMarketReport.action",
    postRebidREport: "/hotelrebidreport/rebidReportParams",
    postScptDetailExtract:
      "/hotelscptdetailelectronic/getHotelElectronicReport.action",
    postScptSummaryExtract: "/hotelscptpsumelectronic/getHotelElectronicReport",
    postSummaryTax: "/hotelsummarytaxreport/getHotelElectronicReport.action",
    postScptSummaryReport:
      "/scptsummaryreport/getSCPTHotelSummaryReport.action",
    getHotelSelfAuditParams: "/hotelselfauditelectronic/hotelSelfAuditParams",
    getHotelCSRSelfAuditParam:
      "/hotelselfauditcsrelectronic/hotelSelfAuditParams",
    postHotelSelfAuditParams:
      "/hotelselfauditelectronic/getHotelElectronicReport",
    postHotelCSRSelfAuditParam:
      "/hotelselfauditcsrelectronic/getHotelElectronicReport",
    roomReport: "/roomdefdefinitionreport/getReport.action",
  },
  reportTabs: {
    acceptanceStatus: "Acceptance Status",
    acceptanceStatusExcel: "Acceptance Status Excel",
    addendumQuestions: "Addendum Questions",
    accountPricing: "Account Pricing",
    accountDirectory: "Account Directory",
    nearestAccountFacilities: "Nearest Account Facilities",
    nearestAccountFacilitiesExcel: "Nearest Account Facilities (Excel)",
    topTravelMarkets: "Top Travel Markets",
    rebidReport: "Rebid Report",
    SpecialCorporatePricing: "Special Corporate Pricing",
    SpecialCorporatePricing1: "Summary",
    SCPTDetailExtract: "SCPT Detail Extract",
    SCPTSummaryExtract: "SCPT Summary Extract",
    SummaryTax: "Summary Tax",
  },
  reportTabsHeader: {
    acceptanceStatus: "Acceptance Status Report",
    acceptanceStatusExcel: "Acceptance Status Excel Report",
    addendumQuestions: "Hotel Addendum Questions Report",
    accountPricing: "Account Pricing Excel Report",
    accountDirectory: "Account Directory Report",
    nearestAccountFacilities: "Nearest Account Facilities Report",
    nearestAccountFacilitiesExcel: "Nearest Account Facilities Excel Report",
    topTravelMarkets: "Top Travel Market Report",
    rebidReport: "Rebid Report",
    SpecialCorporatePricing: "Special Corporate Pricing Summary Report",
    SCPTDetailExtract: "SCPT Detail Extract",
    SCPTSummaryExtract: "SCPT Summary Extract",
    SummaryTax: "Summary Tax Report",
  },
  toolsTabs: {
    BTBookingCost: "BT Booking Cost",
    GPPAccountList: "GPP Account List",
    HotelTraining: "Hotel Training",
    HotelSelf: "Hotel Self Audit – Amenities,",
    HotelSelf1: "Safety & Security",
    HotelCSR: "Hotel Self Audit – CSR, Groups",
    HotelCSR1: "& Meetings",
    HotelSelfReport: "HotelSelfAuditAmenities",
    HotelCSRReport: "HotelSelfAuditCSRGroups",
  },
  labels: {
    AcceptanceStatus: "Acceptance Status",
    QuickSelect: "Quick Select",
    Numberofhotelsavailable: "Number of hotels available:",
    Numberofhotelsselected: "Number of hotels selected:",
    PickUp: "Pick up to",
    hotels: "hotels.",
    selfAuditAmenities: "Hotel Self Audit – Amenities, Safety & Security",
    selfAuditCSR: "Hotel Self Audit – CSR, Groups & Meetings",
  },
  alerts: {
    maxHotels: "Please enter only 200 hotels at a time.",
  },
  topTravelMarket: {
    header: "Top Travel Markets",
    instructions:
      " Pick up to 3 states and/or 3 countries/regions to run the Top Travel Markets for.",
    states: "States",
    andor: "And/Or",
    countriesRegion: "Countries/Regions",
  },
  cognosUrl:
    "https://extranetdev.marriott.com/ibmcognos/bi/v1/disp?b_action=cognosViewer&",
  popupParms:
    "height=440,width=790,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
  toolsPopupParms:
    "popupParms:'height=0,width=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
};
export default Settings;
