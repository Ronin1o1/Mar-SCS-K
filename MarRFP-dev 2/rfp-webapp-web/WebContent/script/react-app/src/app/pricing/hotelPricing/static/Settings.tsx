const Settings = {
  api: {
    gethotelrespondent: "/hotelrespondent/getHotelRespondent.action",
    updatehotelrespondent: "/hotelrespondent/updateHotelRespondent.action",
    urlencode: "application/x-www-form-urlencoded",
    getUserDetails: "/user/getUserDetails.action",
    postScptSummaryReport:
      "/scptsummaryreport/getSCPTHotelSummaryReport.action",
    postScptHistoryReport:
      "/scptaccounthistoryreport/getSCPTAccountHistoryReport.action",
    getGPPAccountList: "/gppaccountlist/getGppAccountList",
    getCognosUrl: "/reports/getAppEnvDetails.action",
    getHotelNearestFacilityReport:
      "/hotelnearestfacilityreport/getHotelNearestFacilityReport",
    getHotelNearestFacilityReportExcel:
      "/hotelnearestfacilityelectronic/getHotelNearestFacilityElectronicReport",
    btBookingCostUrl:
      "https://mgscloud.marriott.com/common/sales-mktg-and-rev-mgmt/programs-and-initiatives/bt-booking-costs.html",
    hotelTrainingUrl:
      "https://mgscloud.marriott.com/common/sales-mktg-and-rev-mgmt/pricing-account-services/pas-tools-and-resources/hotel-pricing-contacts.html",
  },
  pricingTabs: {
    selectHotel: "Select",
    selectHotel1: "Hotel/Period",
    general: "General ",
    Pricing: "Pricing",
    scpt: "Special Corporate",
    scpt1: "Pricing Tool",
    cpac: "Centrally Priced",
    cpac1: "Account Center",
    bTAccountRates: "BT Account",
    bTAccountRates1: "Rates",
    multipleBlackout: "Multiple Blackout",
    multipleBlackout1: "Dates Editor",
    finishandSave: "Finish and Save",
    reports: "Reports",
    popup: "Report",
    tools: "Tools/Resources",
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
    toolsTabs: {
      BTBookingCost: "BT Booking Cost",
      GPPAccountList: "GPP Account List",
      HotelTraining: "Hotel Training",
      HotelSelfReport: "HotelSelfAuditAmenities",
      HotelCSRReport: "HotelSelfAuditCSRGroups",
      HotelSelf: "Hotel Self Audit – Amenities,",
      HotelSelf1: "Safety & Security",
      HotelCSR: "Hotel Self Audit – CSR, Groups",
      HotelCSR1: "& Meetings",
    },
  },

  tabs: [
    { id: "criticalFields", label: "Select Hotel/Period" },
    { id: "generalPricing", label: "General Pricing" },
    { id: "cpac", label: "Centrally Priced Account Center" },
    {
      id: "BTAccountRates",
      label: "BT Account Rates",
    },
    {
      id: "multipleBlackoutDatesEditor",
      label: "Multiple Blackout Dates Editor",
    },
    { id: "finishandSave", label: "Finish and Save" },
    { id: "Reports", label: "Reports" },
    { id: "Tools/Resources", label: "Tools/Resources" },
  ],
  header: {
    Period: "Period: ",
    currencyusedinQuotations: "Currency used in Quotations: ",
    currency: "U S Doller",
  },
  loadingMsg: "Please wait loading...",
  parentRoute: "/pricinghotelselect",
  pathname: "rfptc/rfp-webapp-web/home/home.action/",
  replaceStr: "/home/home.action",
  popupParms: `height=${window.screen.height},width=${window.screen.width},resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes`,
  noBidAlert: "Please select the No Bid Reason for each highlighted row.",
  routes: {
    finishandsave: "/pricinghotelselect/finishAndSave",
    blackout: "/pricinghotelselect/multipleBlackout",
    CPAC: "/pricinghotelselect/CPAC",
    PriceContact: "/pricinghotelselect/PriceContact",
    Standards: "/pricinghotelselect/Standards",
    FixedSeason: "/pricinghotelselect/Seasons",
    DepthOfSale: "/pricinghotelselect/DepthOfSale",
    Blackout: "/pricinghotelselect/Blackout",
    EligibilityAmenity: "/pricinghotelselect/eligibilityAmenity",
    GroupsMeetings: "/pricinghotelselect/GroupsMeetings",
    Reports: "/pricinghotelselect/hotelPricingreport",
    btAccountRates: "/pricinghotelselect/btAccountRates",
  },
  tabNames: {
    fixedSeason: "Seasons",
  },
  alert: {
    gppQuestion: "The GPP dropdown question must be answered.",
    rowAlert: "Please select the No Bid Reason for each highlighted row.",
    InvalidEmail: "Please enter a valid email address for the Pricing Contact",
    InvalidEmail1:
      "Please enter a valid email address for the Pricing Contact.",
    emptyField: "You must fill in all Pricing Contact fields.",
    emptyStartDate: "You must enter the starting date for the blackout.",
    emptyEndDate: "You must enter the ending date for the blackout.",
    rangeAlert: "Please enter values for the selected ranges.",
    pricingContactMandatory: "Pricing Contact 5 Information Must be Filled Out",
    seasonalertscpt:
      "You must first review the Seasons screen and update as necessary.",
    standardalertscpt:
      "You must first review the Standards screen and update as necessary.",
    standardalertscptInfo:
      "You must enter the information on the Standards screen first.",
    cpacalert:
      "Hotel user cannot access CPAC screen until all General Pricing screens have been completed.",
    // PASAlert:
    //   "You must select if PAS is to delete old rate programs for this hotel",
    GPPAlert: "The GPP dropdown question must be answered.",
    sameRoomPoolAlert:
      "You cannot have the same room pool across room pool groups ",
    commonSeasonAlert: "You must enter the seasons first.",
    emtrySecondaryField:
      "You must fill in all information of a Pricing Contact",
    rpgonerponeSelected:
      "You must select Room Pool for Room Pool Group 1 - Room Pool 1 before selecting Room Type",
    rpgonerptwoSelected:
      "You must select Room Pool for Room Pool Group 1 - Room Pool 2 before selecting Room Type",
    rpgtworponeSelected:
      "You must select Room Pool for Room Pool Group 2 - Room Pool 1 before selecting Room Type",
    rpgtworptwoSelected:
      "You must select Room Pool for Room Pool Group 2 - Room Pool 2 before selecting Room Type",
    rpgthreerponeSelected:
      "You must select Room Pool for Room Pool Group 3 - Room Pool 1 before selecting Room Type",
    rpgthreerptwoSelected:
      "You must select Room Pool for Room Pool Group 3 - Room Pool 2 before selecting Room Type",
    rtrpgonerponeSelected:
      "You must enter your Room Type for Room Pool Group 1 - Room Pool 1",
    rtrpgonerptwoSelected:
      "You must enter your Room Type for Room Pool Group 1 - Room Pool 2",
    rtrpgtworponeSelected:
      "You must enter your Room Type for Room Pool Group 2 - Room Pool 1",
    rtrpgtworptwoSelected:
      "You must enter your Room Type for Room Pool Group 2 - Room Pool 2",
    rtrpgthreerponeSelected:
      "You must enter your Room Type for Room Pool Group 3 - Room Pool 1",
    rtrpgthreerptwoSelected:
      "You must enter your Room Type for Room Pool Group 3 - Room Pool 2",
    rponerpgoneMustAlsoSelected:
      "You must also select Room Pool 1 of Room Pool Group 1 ",
    rponerpgtwoMustAlsoSelected:
      "You must also select Room Pool 1 of Room Pool Group 2 ",
    rponerpgoneMustSelected: "You must select Room Pool 1 of Room Pool Group 1",
    rponerpgthreeMustAlsoSelected:
      "You must also select Room Pool 1 of Room Pool Group 3 ",
    fillRatesAndRulesAlert:
      "You must visit the Rates and Rules tab and fill out the appropriate information .",
    emptryAlert: "You must fill in all question fields",
    rateRulesAlert:
      "You must visit the Rates and Rules tab and fill out the appropriate information ",
    accountSpecQuestNotFilled:
      "You must visit the Account Specific Questions  tab and fill out the appropriate information.",
    groupsAndMeetingAlert:
      "You must complete all required fields for Groups and Meetings.",
  },
  /** end of Price Contact*************** */
};
export default Settings;
