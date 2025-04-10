const Settings = {
  api: {
    getCateringList: "/catering/getCateringRevStream",
    updateCateringList: "/catering/updateCatering",
  },
  route: {
    PreviousPage: "groupsintermediaries",
    NextPage: "extendedstay",
  },
  validation_details: {
    regex: /^[0-9]*$/,
  },
  CateringDetails: {
    businessAndSpend: "Business and Spend",
    businessAndSpendTitle:
      "What is the estimated US Business spend for Catering by the account?",
    estSpend: "Est US Business Total Catering Spend:",
    usd: "USD",
    changeFromPrev: "Change from Previous Year:",
    percent: "%",
    leadingUSMarkets: "Leading US Catering Markets:",
    leadingUSMarketsTitle: "What are the top catering markets for Marriott?",
    estNonUSSpend: "Est Non US Business Total Catering Spend:",
    estNonUSSpendTitle:
      "What is the estimated Non US business total for Catering Spend at Marriotts?",
    changeFromNonUSPrev: "Change from Previous Year:",
    leadingNonUSMarkets: "Leading Non US Catering Markets:",
    leadingNonUSMarketsTitle:
      "What are the top catering markets for Marriott outside of the US?",
    marriottGrpHistory: "Marriott Group Catering History",
    marriottGrpCatering: "Marriott Group Catering Revenue:",
    marriottGrpCateringTitle:
      "What is the total group catering revenue for Marriott by the account?",
    changeFromGroupPrev: "Change from Previous Year:",
    percTotalRev: "% of Total Revenue:",
    percTotalRevTitle:
      "What is the % of Group catering revenue compared to total revenue from the account?",
    marriottLocalCatering: "Marriott Local Catering Revenue:",
    marriottLocalCateringTitle:
      "What is the Local Catering Revenue for the account?",
    changeFromLocalPrev: "Change from Previous Year:",
    totalSpendProjections: "Total Spend Projections:",
    totalSpendProjectionsTitle:
      "What is the estimated total catering spend for the account?",
    percenTotalRev: "% of Total Revenue:",
    percenTotalRevTitle:
      "What is the % of Group catering revenue compared to total revenue from the account?",
    bookingAgent: "Who is the booking agent?",
    bookingAgentTitle:
      "Is the buyer from an internal meeting/travel department, a 3rd party or an intermediary?",
    businessInfo: "Business Information",
    leadingCateringMarket: "Leading Catering Markets (MI Properties):",
    leadingCateringMarketTitle:
      "Which properties are leading catering properties for Marriott?",
    accountPlanOrLargeProd:
      "Does the account plan multi-city and or large production events?",
    avgMeetingSize: "Average Meeting Size:",
    avgMeetingSizeTitle: "What is the average meeting size for this account?",
    avgMeetingFreq: "Average Meeting Frequency:",
    avgMeetingFreqTitle: "How often does this account hold meetings?",
    holidayParties: "Does the account have Holiday Parties?",
    holidayPartiesYes: "Yes",
    holidayPartiesNo: "No",
    describeMarketsOrDetails: "if Yes, please describe markets/details:",
    describeMarketsOrDetailsTitle:
      "If account have holiday parties, describe Market/Details?",
    telepresenseCap: "Does the account have Telepresence Capabilities?",
    telepresenseCapYes: "Yes",
    telepresenseCapNo: "No",
    businessLocalCatering: "Business Overview - Local Catering",
    orgStructure: "Organizational Structure for buying:",
    orgStructureTitle:
      "Describe how the customer buys. i.e through a centralized, de-centralized, echannels,etc.",
    avgMeetings: "Average Type of Meeting(s):",
    avgMeetingsTitle:
      "Are the meetings usually for a product launch, annual meeting, training, conference, etc.?",
    acctPoliciesProcOrMandates: "Account Policies, Procedures and/or Mandates:",
    acctPoliciesProcOrMandatesTitle:
      "Provide details if there are space requirements, organization&#146s contractual clauses and addendums.",
    preferredMarriottBrands: "Preferred Marriott Brands:",
    preferredMarriottBrandsTitle:
      "What are the preferred Marriott catering brands?",
    topCompetitors: "Top Competitors:",
    topCompetitorsTitle:
      "Who are the top catering competitors to Marriott that this account utilizes?",
    alertRangeMessage: "Please enter a value between 0 and 100",
    totalRevenue_alert:
      "Please enter a value between 0 and 100 for % of Total Revenue",
    alertMessage: "Alert Message",
    closeTitle: "OK - Close Message Box",
    orgTextArea:
      "'Organizational Structure for buying' text cannot exceed 1024 characters.",
    avgMeetingsTextArea:
      "'Average Type of Meeting(s)' text cannot exceed 300 characters.",
    policiesTextArea:
      "'Account Policies, Procedures and/or Mandates' text cannot exceed 1024 characters.",
    prefMarriottTextArea:
      "'Preferred Marriott Brands' text cannot exceed 1024 characters.",
    topCompetitorsTextArea:
      "'Top Competitors' text cannot exceed 1024 characters.",
    holidayDetailsTextArea:
      "'if Yes, please describe markets/details' text cannot exceed 1024 characters.",
  },
};
export default Settings;
