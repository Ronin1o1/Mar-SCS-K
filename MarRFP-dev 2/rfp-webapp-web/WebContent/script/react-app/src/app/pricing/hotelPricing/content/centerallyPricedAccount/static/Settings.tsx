const Settings = {
  api: {
    getAnticipatedAccount:
      "/infoAccountNotViewable/getHotelAccountNotViewable.action",
    getAccountOffCycle:
      "/infoAccountOffcycleNotViewable/getHotelAccountOffcycleNotViewable.action",
    getAccountGridList: "/hotelcentralaccountcenter/getHotelAccountCenter",
    getNobidReson:
      "/hotelnobidreason/getNobidReason.action?&currentNobidReasonid=0&currentHaccid=158859688&dojo.preventCache=1629277381654",
    postUpdate: "/hotelcentralaccountcenter/updateHotelAccountCenter",
    urlencode: "application/x-www-form-urlencoded",
    getAccountOverViewReport:
      "/hotelaccountoverview/getHotelAccountOverviewReport.action",
    updatePublish: "/hotelaccountspeccentralrates/updatePublish.action",
    updateAction: "/hotelaccountspeccentralrates/update.action",
  },

  TabNames: {
    information: "Information",
    accountLegend: "Account Legend",
    accountOverview: "Account Overview?",
    bestFinalSubmission: "Best & Final Submission?",
    rateTypes: "Rate Types?",
    yellowTriangles: "(Yellow triangles)?",
    anticipatedAccounts: "Anticipated Accounts?",
    anticipatedOffcycleAccounts: "Anticipated Off-cycle Accounts?",
    showmyAccounts: "Show my Accounts?",
  },

  TabTitles: {
    accountLegend: "Account Legend Information",
    accountOverview: "Account Overview Information",
    bestFinalSubmission: "Final Submission Information",
    rateTypes: "Rate Type Information",
    showmyAccounts: "Show My Accounts Information",
    yellowTriangles: "Revisit Information",
    anticipatedAccounts: "Anticipated ",
    anticipatedAccounts1: " Centrally Priced Accounts",
    anticipatedOffcycleAccounts: " Centrally Priced Off-cycle Accounts",
  },
  accountLegend: {
    completionStatus: " Completion Status",
    completedScreen: "Completed Screen",
    revisitScreen: "Revisit Screen",
    compellingBusinessCase: "Compelling Business Case",
    requested: "Requested",
    hotelCompleted: "Hotel Completed",
    accepted: " Accepted",
    declined: "Declined",
    pending: "Pending",
    accountStatus: "Account Status",
    rebidStatus: "Rebid Status",
    tobeRebid: "To be Rebid",
    submitRebid: "Submit Rebid",
    declinedRebid: "Declined Rebid",
    tobeRebid2: "To be Rebid 2",
    submitRebid2: "Submit Rebid 2",
    declinedRebid2: "Declined Rebid 2",
    toberebid3: "To be rebid 3",
    submitRebid3: "Submit Rebid 3",
    declinedRebid3: "Declined Rebid 3",
    accountInformation: "Account Information",
    gPPGlobalPartner: "GPP Global Partner",
    gPPGlobalRecognition: "GPP Global Recognition",
    newAccount: " New Account",
    noSquatter: "No Squatter",
    notViewablebyHotels: " Not Viewable by Hotels",
    offCyclePricing: "Off Cycle Pricing",
    twoYearPricing: "Two Year Pricing",
    topAccount: "Top Account - Eligible for Free",
    bTBookingCostAccount: "BT Booking Cost Account",
    rollOverAccount: "Roll Over Account",
  },
  data: {
    list: [
      {
        id: null,
        hotelRateEntityId: 1,
        rateOfferRateEntityId: null,
        rateProgram: "REGA",
        roomPool: "KING",
        markedForDeletion: false,
      },
      {
        id: null,
        hotelRateEntityId: 2,
        rateOfferRateEntityId: null,
        rateProgram: "REGB",
        roomPool: "TWIN",
        markedForDeletion: false,
      },
      {
        id: null,
        hotelRateEntityId: 4,
        rateOfferRateEntityId: null,
        rateProgram: "REGD",
        roomPool: "EXEC",
        markedForDeletion: false,
      },
      {
        id: null,
        hotelRateEntityId: 3,
        rateOfferRateEntityId: null,
        rateProgram: "REGC",
        roomPool: "CLBL",
        markedForDeletion: false,
      },
    ],
  },
  sortBy: [
    {
      id: "1",
      name: "Account",
    },
    {
      id: "2",
      name: "Sales Group",
    },
    {
      id: "3",
      name: "Due Date",
    },
    {
      id: "4",
      name: "Best & Final Submission",
    },
    {
      id: "5",
      name: "Pricing Products",
    },
    {
      id: "6",
      name: "Completion Status",
    },
    {
      id: "7",
      name: "Account Status",
    },
    {
      id: "8",
      name: "Rebid Status",
    },
    {
      id: "9",
      name: "CBC Status",
    },
  ],
  pleaseWait: "Please wait loading...",
  errorUrl: "/errors/errors.action",
  searchResult: {
    invalidDate: "Invalid Date",
    nodataFound: "No Data Found!!",
    dateTooltip: "Enter the due date from in the format: mm/dd/yyyy",
    dateToTooltip: "Enter the due date to in the format: mm/dd/yyyy",
    dateFormat: /^[0-9\.\-\/]+$/,
    validateDateFormat:
      /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/,
    dateFieldHover: "Enter the due date from in the format: mm/dd/yyyy",
    accoutReportUrl:
      "https://extranetdev.marriott.com/rfptc/rfp-webapp-web/hotelaccountoverview/overviewReport.action?paccount=",
    popupParms:
      "height=440,width=790,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
    cpacTabsContent: {
      accountLegend: {
        str1: '"To view an',
        str2: "Account's Overview,",
        str3: "click on the account's name below. The Account Overview will provide detailed information, requirements, and requests for the account.\"",
      },
      bestAndFinalSubmission: {
        str1: '"Click on the',
        str2: " Best and Final Submission",
        str3: 'box to request not to be contacted for renegotiations unless a compelling reason is established by the Global Account Director."',
      },
      showMyAccount: {
        str1: ' "Click on the',
        str2: "Show My Accounts",
        str3: 'button to view the accounts that your property has been selected for consideration or if you have volume produced an account first."',
      },
      yellowTriangles: {
        str1: "can mean 1 of 2 things:",
        str2: "1) a new addendum question has been added for an account",
        str3: "2) an account has modified an existing question, so please go into the account and review your responses.",
      },
      rateTypes: {
        str1: "You have the ability to choose one rate product for each account.",
        str2: "Fixed Corporate Rate (FCR)",
        str3: "- This product will be made available to any account that requests your property unless the account qualifies for the GPP product or the Volume Producer rate product is offered.",
        str4: "GPP",
        str5: "- The GPP radio button will automatically be selected for any account that qualifies as a GPP account. GPP rates will float at either 10% or 15% off your Retail Rate in HPP / MARSHA, will be account specific, and will not have a ceiling. These rates are non-commissionable and have Last Room Availability .",
        str51:
          "represents the 15% discount and the 2-line description in Marsha will say Global Partner Rate",
        str52:
          "represents the 10% discount and the 2-line description will say Global Recognition Rate.",
        str6: "Volume Producer (VP)",
        str7: "-  If you choose to offer an account a Volume Producer rate, click on the VP radio button. The rate offered to the account must be at least one currency unit off the Fixed Corporate Rate. The rate offered becomes the ceiling for the account. If you offer a Volume Producer rate to a GPP account the discount must be at least 10% or 15% off the Fixed Corporate Rate, depending on the GPP level. This rate will become the ceiling for the account.",
        str8: " No Bid",
        str9: " - If you prefer not to offer any rate to a specific account, please select the No Bid radio button.",
        str10: "Float VP (% Discount)",
        str11:
          " - These rates will float at a designated % off your prevailing Retail Rate in HPP / MARSHA  and ",
        str12: "will not have a ceiling",
        str13: "No OC Pricing",
        str14:
          "-This is the default product when an account is identified as having an off-cycle pricing request.  This can constitute a rate request for 2-year pricing or pricing that overlaps into 2 different calendar years.  If the radio button is selected as “No OC Pricing”, then your hotel currently has not offered any rates to that account.  You must click on the VP radio button to price the account.",
      },
    },
    CPACtabHeader: {
      Period: "Period:",
      currencyusedinQuotations: "Currency used in Quotations:",
      currency: "U S Doller",
    },

    Grid: {
      selectNobidReason: "Select a No Bid Reason",
      pleaseWait: "Please wait loading...",
    },
    colName: {
      viewNoPricing: "viewNoPricing",
      viewFixedPricing: "viewFixedPricing",
      viewGPPPricing: "viewGPPPricing",
      viewVPPricing: "viewVPPricing",
      viewGovvpPricing: "viewGovvpPricing",
      viewFloatVPPricing: "viewFloatVPPricing",
      viewNBPricing: "viewNBPricing",
      viewVPPricingleve: "viewVPPricingleve",
      viewProductOffered: "viewProductOffered",
    },
    tableHeader: {
      status: "Completion Status",
      cbcStatus: "CBC Status",
      accountStatus: "Account Status",
      rebidStatus: "Rebid Status",
      accountName: "Account Name",
      dueDate: "Due Date",
      salesGroup: "Sales Group",
      product: "Product Offered",
      price: "Price Button",
      why: "?'s",
      bestAndFinal: "Best & Final Submission",
      noBidReason: "No Bid Reason",
      noOcpricing: "No OC Pricing",
      FCR: "FCR",
      GPP: "GPP",
      VP: "VP",
      GovVp: "Gov VP",
      Float: "Float",
      noBid: "No Bid",
      POVP: "Volume Producer",
      POFloat: "Float Volume Producer",
      productOffered: "Select Pricing Product To Be Offered",
    },
    popupAlert: {
      str1: "Are you sure that you want to change the product for ",
      str2: " to ",
      str3: "\n\n Press OK to continue, CANCEL to return to the original product.",
    },
    searchBlock: {
      showMyAccounts: "Show My Accounts",
      dueDateFrom: "Due Date From :",
      to: "To :",
      accountsOnly: "Accounts Only",
      sortBy: "Sort By :",
      showALLAccounts: "Show ALL Accounts",
      showAccountsContaining: "Show Accounts Containing:",
      calStartDate: "calStartDate",
      calEndDate: "calEndDate",
    },
    cbcBlock: {
      openRequests: "Open Requests:",
      pending: "Pending:",
      accepted: "Accepted:",
      declined: "Declined:",
    },
    noBidPopupAlert:
      "\n\nFor GPP accounts, even if you select No Bid, the GPP non-preferred floating 10/15% rates will still be loaded for your property per the MI GPP agreement.",

    noBidAlert: "Please select the No Bid Reason for each highlighted row.",
    bestAndFinalAlert:
      "Checking this box indicates that you have completed your MarRFP account pricing offer and do not want to receive additional requests from the Account Leader in regards to this account unless more compelling information is provided.\nAre you sure you want to proceed?",
    bestAndFinalAlertUpdateHotels:
      "This indicates that you do not want to receive additional requests from the Account Leader, unless they have more compelling information regarding the Account. Are you sure you want to proceed?",
    yesrSelectAlert:
      "You will not be able to switch to the Pricing year since the Hotel has not completed the General Pricing for the year",
    savedSuccessfullyAlert: "Changes saved successfully!",
    apiErrorAlert: "Error when retrieving data from the server!",
    pleaseSelectValidNobid: "Please select a valid no bid reason",
    noGeneralPricing: "Hotel has not completed General Pricing screens",
  },

  cmodelclose: "Cancel",

  anticipatedAccountTab: {
    accountName: "Account Name",
    accountSegment: "Account Segment",
    GPP: "GPP",
    globalTeamLeader: "Global Team Leader",
    emailAddress: "Email Address",
    contractEndDate: "Contract End Date",
  },

  offAccountHeader:
    "The following accounts price off-cycle. They are still active in the previous pricing period.These accounts will be added to this pricing period once the start of their pricing cycle approaches.",
  parentRoute: "/pricinghotelselect",
};

export default Settings;
