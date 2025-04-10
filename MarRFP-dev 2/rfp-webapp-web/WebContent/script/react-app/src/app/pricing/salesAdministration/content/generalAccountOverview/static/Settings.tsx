const Settings = {
  api: {
    selectSappAccount: "/acctoverview/getAcctOverview",
    updateAcctOverview: "/acctoverview/updateAcctOverview",
    getUserDetails: "/user/getUserDetails.action",
  },

  generalAccountOverviewDetails: {
    RequiredField: "* Required Fields are in red",
    AccountSegment: "Account Segment",
    AccountHdqInfo: "Account Headquarters Information",
    AccountLeaderTooltip:
      "Name of Account Leader (s) responsible for overall management of the account",
    AcountLeader: "Account Leader",
    ClickHere: "Click here",
    MoreInfo: "for more information.",
    AccountAddressToolTip: "Physical location of Accounts Global Headquarters",
    AccountAddress: "Account Address",
    Address: "Address:",
    City: "City:",
    State: "State:",
    Province: "Province:",
    Country_Region: "Country/Region:",
    ZIP_Postal: "Zip/Postal Code:",
    Phone: "Phone:",
    AccountMailingAddTooltip:
      "Mailing Address - only enter if different from Corporate address Global Headquarters Address",
    AccountMailingAddress: "Account Mailing Address",
    AccountInformation: "Account Information",
    ChairmanExecutive: " Chairman/CEO or Executive Director, President:",
    AccountAcronymTooltip:
      "Possible other names for the account (i.e. PWC for PriceWaterhouseCoopers)",
    AccountAcronym: "Account Acronym:",
    AccountWebsiteURL: "Account Website URL:",
    AccountWebsiteURLTooltip: "Accounts main URL: www.example.com",
    AccountNYCSymbol: "Account NYSE Symbol:",
    AccountNYCSymbolTooltip: "Symbol found on NYSE.com",
    ClaritasID: "UAI ID:",
    AssociationType: "Type of Association:",
    AssociationTypeTooltip:
      "Please select either: Individual, Trade, Philanthropic",
    Name: "Name: ",
    Title: "Title: ",
    Email: "Email: ",
    SharedAccountLeaderToolTip:
      "Name of Account Leader (s) responsible for overall management of the account",
    SharedAccountLeader: "Shared Account Leader",
    CorpInfo: "Corp Info",
    TotalGlobalEmployeeTooltip:
      "Number of employees that are employed globally by the account (find the info on Hoovers)",
    TotalGlobalEmployee: "Total # of Global Employees:",
    TotalGlobalTravellerTooltip:
      "Number of employees that travel for the account per year",
    TotalGlobalTraveller: "Total # of Global Travelers:",
    TotalAssociationMembersToolTip:
      "Number of members that belong to the association",
    TotalAssociationMembers: "Total # of Association Members:",
    AnnualAccountRevenueToolTip: "Company total revenue for previous year",
    AnnualAccountRevenue: "Annual Account Revenue:",
    TotalRevenueToolTip:
      "Total revenue that Marriott received from Conventions, meetings and events",
    TotalRevenue: " Total MI Revenue from Conventions, Meetings and Events:",
    AnnualLodgingSpendTooltip: "Account's annual spend on Travel and Expenses",
    AnnualLodgingSpend: " Estimated Annual Lodging Spend:",
    FinancialTracking: "Financial & Tracking",
    MarriottTacking: "Marriott Tracking:",
    TotalMarriottGlobalSpend: " Total Marriott Global Actual Spend [MRDW]:",
    Region: "Region",
    RevenueUSD: "Revenue (USD)",
    TotalMarriott: "Total Marriott",
    TotalGrpHotelSpend: " Total Group Hotel Spend",
    MIShare: "MI Share of Total BT Actual Revenue (%)",
    CompleteBelowData: "Complete below if you receive CC/Share data:",
    SupplierName: "Supplier Name",
    SupplierNameTooltip:
      "If the account shares ccard data - what are the other top lodging competitors that the account uses?",
    Share: "Share %",
    ShareTooltip: "What percentage of the total do that top competitors have?",
    HeaderInfo: "MarRFP-Account Headquarters Information",
    modalHeading: "Alert Message",
  },
  message: {
    CountryChange:
      "State cannot be selected for country/region other than USA. \n\n(Please click OK to Change Country/Region and State as blank, CANCEL to remain)",
  },
  validation: {
    email: "Please enter a valid email.",
    name: "Please select the Account Leader Name.",
    title: "Please enter the Account Leader title.",
    phone: "Please enter the Account Leader phone.",
    emailEmpty: "Please enter the Account Leader Email.",
    AlertMessage: "Please enter a value between 0 and 100",
  },
  commonContent: {
    numberRegex: /^[0-9\b]+$/,
    re_phone_number: /(^[0-9]+$|[-]$|[0-9]+$|^$)/,
  },
};
export default Settings;
