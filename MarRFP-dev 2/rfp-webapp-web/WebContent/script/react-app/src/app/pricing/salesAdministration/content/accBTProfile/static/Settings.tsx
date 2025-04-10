const Settings = {
  api: {
    getBtProfile: "/acctbtprofile/getAcctBTProfile",
    updateBtProfile: "/acctbtprofile/updateAcctBTProfile", // "/sappaccountviewlist/findAccounts.action",
    // selectSappAccount: "/acctoverview/getAcctOverview"
  },
  route: {
    NextPage: "accBTProfileList",
    PreviousPage: "accBTProfileList",
  },
  validation_details: {
    regex: /^[0-9]*$/,
  },
  accountBTProfileDetails: {
    RequiredField: "* Required Fields are in red",
    GPPAccount: "GPP Account: Y/N ?",
    DefaultPercent: "Default Percent :",
    RequireComm: "Requires Commissionable:",
    RequireLRA: "Requires LRA:",
    PotentialRev: "Market Total Potential Revenue:",
    USD: "USD",
    PotentialRmnts: "Market Total Potential Rm Nts:",
    BTRev: "Marriott BT Revenue:",
    BTRmNts: "Total Marriott BT Rm Nts:",
    MIShare: "Estimated MI Share of Total Rm Nts:",
    ACTDirectoryList:
      "Does account directory list rates for all length of stay tiers?",
    sep_Stay: "Does account directory have a separate extended stay section?",
    PrefPrgrm: "Total Hotels in Preferred Program:",
    MarPrefPrgm: "Total Marriotts in Preferred Program:",
    PrefPrgmShare: "Preferred Program Share %:",
    MarrMembers: "Marriott Bonvoy Members (or %):",
    CorpDiscount: "Minimum discount required:",
    BlackoutPeriod: "Maximum number of Blackout Periods allowed:",
    CompInc: "Companies included in the RFP are:",
    ClusterCode: " Marriott.com Cluster Code:",
    BlackoutDaysPeriod: "Maximum number of Blackout Days allowed:",
    PricingMethods:
      "Pricing Method(s) (e.g.,auction, centralized,website, 2-year, etc.):",

    validAccount: "Please select valid Account.",
    nextUrl: "/acctoverview/getAcctOverview",
    BrandSegList: "Brand Segment Preference:",
    PrefAgency: "Preferred Agency",
    travelAgency1: "Travel Agency 1",
    travelAgency2: "Travel Agency 2",
    travelAgency3: "Travel Agency 3",
    travelAgency4: "Travel Agency 4",
    PerBooking: " % of Booking:",
    GDS: "GDS:",
    AlertRangeMessage: "Please enter a value between 0 and 100",
    RequirecomReq: "'Requires Commissionable' is a required field.",
    RequireLrareq: "'Requires LRA' is a required field.",
    MrktPtnReq: "'Market Total Potential Revenue' is a required field.",
    MrktPtnRmNtsReq: "'Market Total Potential Rm Nts' is a required field.",
    PrefPrgm: "'Total Hotels in Preferred Program' is a required field.",
    CorpDiscountReq:
      "'Minimum discount required' is a required field.",
    blackOutdaysReq:
      "'Maximum number of Blackout Days allowed' is a required field.",
    blackoutDaysRangeMessage:
      "'Maximum number of Blackout Days allowed' should be greater than or equal to 1",
    daysAllowed: "'Maximum number of Blackout Periods allowed' is ",
    BrandSegRequired:
      "Please select at least one value for 'Brand Segment Preference'",
    TravelAgency1req: "'Travel Agency 1' is a required field.",
    perBookingReq: "'% of Booking for Travel Agency 1' is a required field.",
    GDSReq: "'GDS for Travel Agency 1' is a required field.",
    GPPAccountTitle: "GPP Account: Y/N",
    DefaultPercentTitle: "What % ?",
    RequireCommTitle:
      "Does this account require that rates are commissionable?",
    RequireLRATitle: "Does this account require Last Room Availability?",
    PotentialRevTitle: "Potential revenue for BT travelers",
    PotentialRmntsTitle: "Potential Rmnts for BT Travelers",
    BTRevTitle: "What was the BT Revenue last year?",
    BTRmNtsTitle: "What were the Total BT rmnts from last year?",
    MIShareTitle: "What % of total Marriott rmnts is BT?",
    PrefPrgrmTitle:
      "How many properties (industry wide) are in the Preferred program?",
    MarPrefPrgmTitle:
      "How many Marriott properties did the account accept into the BT program?",
    PrefPrgmShareTitle: "What share of the Preferred Program is Marriott?",
    MarrMembersTitle:
      "What percentage of the accounts travelers are Marriott Bonvoy Members?",
    PreferredAgencyTitle:
      "Does the account have a preferred travel agency or intermediary that it uses?",
    CompIncTitle: "Which other hotel chains are included in the RFP?",
    travelAgencyTitle: "Travel Agency Name",
    PerBookingTitle:
      "What % of the accounts total bookings does this agency receive?",
    GDSTtitle: "What GDS does this agency use?",
    BrandSegmentTitle: "Which brands does the account prefer to utilize?",
    PricingMethodsTitle:
      "What pricing methods are used  i.e. auction, centralized, website, 2-year, etc.?",
  },
};
export default Settings;
