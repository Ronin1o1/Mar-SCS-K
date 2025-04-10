/* eslint-disable prettier/prettier */
const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    getUserDetails: "/user/getUserDetails.action",
    getReportUrl: "/acctPlanOverviewReport/getAcctPlanOverviewReport.action",
  },
  accountTabs: {
    selectAccount: "Select an Account",
    sapAcctPlanProfile: "SAPP - Strategic Acct Plan & Profile",
    sapMarriottTeamMembers:
      "SAPP - General Account Overview - Marriott Team Members",
    sapBuyingOfficeLocation: "SAPP - Buying/Office Locations",
    sappEditOfficeLocation: "SAPP - Edit Buying/Office Location",
    reports: "Reports",
    reportTabs: {
      printBTAccount: "Print BT Account Plan Overview",
      printBTAccountwithMarket: "Print BT Account Plan Overview",
      printBTAccountwithMarket1: "w/Market",
    },
    sapAcctPlanProfileTabs: {
      generalAccOverview: "General Account Overview",
      buyoffLoc: "Buying/Office Locations",
      BTbusinessTransiet: "BT/Business Transient",
      groups: "Groups",
      catering: "Catering",
      extendedStay: "Extended Stay",
      leisure: "Leisure",
      accountkeyContacts: "Account Key Contacts",
      accountInitiatives: "Account Initiatives",
    },
    gnlAccOverViewTab: {
      profile: "Account Profile",
      team: "Marriott Team Members",
      account: "Account Perspective",
    },
    groupsTab: {
      profile: "Groups Profile",
      overview: "Groups Overview",
      intermed: "Intermediaries",
    },
    busTransTab: {
      profile: "Business Transient Profile",
      overview: "Business Transient Overview",
      city: "City/Markets",
    },
  },

  tabs: [
    { id: "selectAccount", label: "Select an Account" },
    { id: "sapAcctPlanProfile", label: "SAPP - Strategic Acct Plan & Profile" },
    { id: "reports", label: "Reports" },
  ],
  header: {
    Period: "Year: ",
    lastUpdateLabel: "	Last Update: ",
  },
  onNavigationViewName: {
    AccountBTProfile: "accBtProfileList",
    AccountBTOverview: "accBTOverview",
    cityMarkets: "cityMarkets",
    GroupProfile: "groupProfile",
    MarriottTeamMember: "marriottteamMember",
    AccountInitiatives: "accountInitiatives",
    EditBuyingOfficeLocation: "editBuyingOfficeLocation",
    BuyingOfficeLocation: "buyingOfficeLocation",
    Catering: "catering",
    GroupsIntermediaries: "groupsIntermediaries",
    AccountOverView: "acctoverview",
    ExtendedStay: "extendedStay",
    KeyContacts: "keyContacts",
    AccountPerspective: "accountPerspective",
    Leisure: "leisure",
    GroupsOverview: "groupsOverview",
  },
  tabNames: {
    accInitiatives: "SAPP - Account Initiatives",
    extendedStay: "SAPP - Extended Stay",
    catering: "SAPP - Catering",
    GroupProfile: "groupProfile",
    AcctOverview: "acctoverview",
    generalOverview: "SAPP - General Account Overview - Profile",
    groupIntermediaries: "SAPP - Groups - Intermediaries",
    keyContacts: "SAPP - Account Key Contacts",
    accountPerspective: "SAPP - General Account Overview - Perspective",
    leisure: "SAPP - Leisure",
    sappGroupsOverview: "SAPP - Groups - Overview",
  },
  alertMsgs: {
    maxLength1024ValidationAlert:
      "'Intermediary Strategy' text cannot exceed 1024 characters.",
    extendedStayNeedsMaxLengthAlert:
      "'What is Majority of Extended Stay Needs?' text cannot exceed 1024 characters.",
    orgStructureMaxLengthAlert:
      "'Organizational Structure for buying' text cannot exceed 1024 characters.",
    extendedStaySolutionsMaxLengthAlert:
      "'What extended stay solutions, services and initiative have you considered and/or implemented' text cannot exceed 1024 characters.",
    accountPoliciesMaxLengthAlert:
      "'Account Policies, Procedures and/or Mandates' text cannot exceed 1024 characters.",
    prefrredMarriottBrandsMaxLengthAlert:
      "'Preferred Marriott Brands' text cannot exceed 1024 characters.",
    topExtStayMaxLengthAlert:
      "'Top Ext Stay Competitors (by brand)' text cannot exceed 1024 characters.",
    totRevenueRangeAlert:
      "Please enter a value between 0 and 100 for Share of Total Rm Nts (Marriott mix)",
  },
  loadingMsg: "Please wait loading...",
  parentRoute: "/editaccountplansapp",
  pathname: "rfptc/rfp-webapp-web/home/home.action/",
  replaceStr: "/home/home.action/",
  popupParms:
    "height=440,width=790,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
  /** end of Price Contact*************** */
};
export default Settings;
