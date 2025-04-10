const Settings = {
  api: {
    cbcRequest: "/accountstatuslist/cbcaccounts",
    pricingRequests: "/accountstatuslist/requestsaccounts",
    accountStatus: "/accountstatuslist/statusaccounts",
    rebidRequests: "/accountstatuslist/rebidaccounts",
    getUserDetails: "/user/getUserDetails",
    getMessageList: "/home/homeMessages",
    deleteNews: "/home/deleteInfoMsg",
    newAccounts: "/newaccountlist/newaccounts",
    overviewReport: "/hotelaccountoverview/getHotelAccountOverviewReport",
    getHotelList: "/pricinghotellist/findHotels",
    getHotelaccountspeccentralrates:
      "/hotelaccountspeccentralrates/getAccSpecRates.action",
    updateHomePrefs: "/home/update.action",
    getCognosUrl: "/reports/getAppEnvDetails.action",
    syncSession: "/home/syncSession",
  },
  homeInfo: {
    pageTitle: "Welcome to MarRFP",
    systemMessage: "System Messages",
    Messages: "Messages",
    accountsViewable: "Accounts Recently Made Viewable",
    accountStatusChanges: "Account Status Changes",
    cbcRequest: "CBC Requests",
    pricingRequests: "Pricing Requests",
    accountStatus: "Account Status",
    rebidRequests: "Rebid Request",
    accountName: "Account Name",
    segment: "Segment",
    dueDate: "Due Date",
  },
  accountGridDetails: {
    columns: {
      accountName: {
        field: "accountname",
        header: "Account Name",
      },
      segment: {
        field: "accounttypedescription",
        header: "Segment",
      },
      dueDate: {
        field: "duedate",
        header: "Due Date",
      },
    },
  },
  accountStatusRequestsGridDetails: {
    columns: {
      period: {
        field: "period",
        header: "Period",
      },
      cbcStatus: {
        field: "cbcstatus",
        header: "CBC <br> Status",
      },
      rebidStatus: {
        field: "rebidstatus",
        header: "Rebid <br> Status",
      },
      accountStatus: {
        field: "accountStatus",
        header: "",
      },
      accountName: {
        field: "accountname",
        header: "Account Name",
      },
      dueDate: {
        field: "strDuedate",
        header: "Due Date",
      },
      productOffered: {
        field: "productoffered",
        header: "Product Offered",
      },
      price: {
        field: "",
        header: "Price",
      },
      hasQuestions: {
        field: "",
        header: "?'s",
      },
    },
  },
  accountStatusChanges: "Account Status Changes",
  hotel: "Hotel: ",
  welcomeMessage: "Welcome to MarRFP",
  messages: "Messages",
  btPricingMessage: "BT Pricing  is down for Maintenance.",
  noDataMessage: "No Data Found",
  accountNamePopupParams: `"MENUBAR=0,SCROLLBARS=1,RESIZABLE=1,HEIGHT=400,WIDTH=800"`,
  noNewAccountListMessage:
    "There are no account status changes in the past 7 days.",
  noCbcRequestsMessage:
    "This hotel has no new compelling business case requests in the past 7 days.",
  noPricingRequestsMessage:
    "This hotel has no new pricing requests in the past 7 days.",
  noAccountStatusMessage:
    "This hotel has no account status changes in the past 7 days.",
  noRebidRequestsMessage: "This hotel has no pending rebid requests.",
  cbcRequestsTitle: "New compelling business case requests in the past 7 days.",
  pricingRequestsTitle: "New pricing requests in the past 7 days.",
  accountStatusTitle: "Account status changes in the past 7 days.",
  rebidRequestsTitle: "All pending rebid requests for this hotel.",
  invalidMessage: "this value is required",
  requiredMessage: "This value is required.",
  noGeneralPricing: "No General Pricing",
  invalidProperty: "Invalid Property",
  AccountCenter: "Account Center",
  hotelListOptions: {
    key: "marshacode",
    value: "name",
  },
  searchSelect: {
    width: "200px",
    height: 20,
    range: 4,
    startIndex: 0,
    id: "HotelList",
  },
  path: {
    updatecontactinfo: "/updatecontactinfo",
    salesupdatecontactinfo: "/salesupdatecontactinfo",
    terms: "/terms",
  },
  tabList: [
    { id: "cbcRequests", label: "CBC Requests" },
    { id: "pricingRequests", label: "Pricing Requests" },
    { id: "accountStatus", label: "Account Status" },
    { id: "rebidRequests", label: "Rebid Requests" },
  ],
  tabNames: {
    cbcRequests: "cbcRequests",
    pricingRequests: "pricingRequests",
    accountStatus: "accountStatus",
    rebidRequests: "rebidRequests",
  },
  signedOut:
    "<p>Your session has automatically timed out.</p> <p>You will need to  relogin to continue.</p>",
  toBeSignedOut1: "<p>You are about to be automatically timed out</p> <p>in ",
  toBeSignedOut2:
    " minutes. If you would like to continue</p><p> using MarRFP, click Continue below</p>",
  renewMessage: "Your MarRFP session has successfully been renewed.",
};
export default Settings;
