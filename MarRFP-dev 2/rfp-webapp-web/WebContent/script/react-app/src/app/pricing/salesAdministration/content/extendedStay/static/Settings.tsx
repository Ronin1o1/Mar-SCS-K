const Settings = {
  api: {
    getExtendedStayList: "/extendedstay/getExtendedStay",
    updateExtendedStayList: "/extendedstay/updateExtendedStay",
  },
  route: {
    NextPage: "leisure",
    PreviousPage: "catering",
  },
  extendedStayDetails: {
    AlertRangeMessage: "Please enter a value between 0 and 100",
    ext_requirements_alert:
      "'What is Majority of Extended Stay Needs?' text cannot exceed 1024 characters.",
    inter_strategy_alert:
      "'Intermediary Strategy' text cannot exceed 1024 characters.",
    org_buying_struct_alert:
      "'Organizational Structure for buying' text cannot exceed 1024 characters.",
    solutions_alert:
      "'What extended stay solutions, services and initiative have you considered and/or implemented' text cannot exceed 1024 characters.",
    pref_brand_alert:
      "'Preferred Marriott Brands' text cannot exceed 1024 characters.",
    policies_alert:
      "'Account Policies, Procedures and/or Mandates' text cannot exceed 1024 characters.",
    competitors_bybrand_alert:
      "'Top Ext Stay Competitors (by brand)' text cannot exceed 1024 characters.",
    totalRevenue_alert:
      "Please enter a value between 0 and 100 for % of Total Revenue",
    total_rmnts_alert:
      "Please enter a value between 0 and 100 for Share of Total Rm Nts (Marriott mix)",
    totalExt_rmnts_alert:
      "Please enter a value between 0 and 100 for Share of Total Ext Stay Rm Nts (Total Account)",
    adoptionRate_alert:
      "Please enter a value between 0 and 100 for Adoption Rate of Booking Tool",
    relocationProvider_alert:
      "'Preferred Relocation Provider description' text cannot exceed 1024 characters.",
  },
  field: {
    ext_requirements: "ext_requirements",
    ext_desc_relocprovider: "ext_desc_relocprovider",
    adopt_rate_bkg_tool: "adopt_rate_bkg_tool",
  },
  label: {
    USD: "USD",
    percent: "%",
    businessInstruction: "Business and Spend",
    avgLength: "Average Length of Stay:",
    avgLengthTitle:
      "What is the Extended Stay average length of stay for this account?",
    estimatedStay: "Estimated Extended Stay % of total BT:",
    estimatedStayTitle:
      "What is the estimated Extended Stay total spending for this account this year?",
    estExtStay: "Est Ext Stay Total Rm Nts for next year:",
    estExtStayTitle:
      "What is the estimated Extended Stay total Rm Nts for this account next year?",
    marriottExtHeader: "Marriott Ext Stay History",
    marriottExtStay: "Marriott Ext Stay Revenue:",
    marriottExtStayTitle: "What was the extended stay revenue for prior year?",
    changePrevYear: "Change from Previous Year:",
    perTotalRevenue: "% of Total Revenue:",
    perTotalRevenueTitle: "What % of total revenue was extended stay revenue?",
    totalMarriottExt: "Total Marriott Ext Stay Rm Nts:",
    totalMarriottExtTitle:
      "What were the total ext stay Rm Nts from previous year?",
    marriottMix: "Share of Total Rm Nts (Marriott mix):",
    marriottMixTitle: "What % of Marriott Rm Nts were Extended stay Rm Nts?",
    totalAccount: "Share of Total Ext. Stay Rm Nts (Total Account):",
    totalAccountTitle:
      "What % of the accounts total Rm Nts were extended stay Rm Nts?",
    businessInfoHeader: "Business Information",
    pricingVehicle:
      "Pricing Vehicle (e.g., auction, centralized, website, 2-year, etc.):",
    pricingVehicleTitle:
      "What pricing vehicle is used ? i.e auction, centralized, website, 2-year, etc.",
    prefHotelProgram:
      "Do you need to be accepted into the preferred hotel program to capture Extended Stay business?:",
    onlineBookingTool: "Online Booking Tool:",
    onlineBookingToolTitle:
      "What online booking tool does the account utilize, if any?",
    relocation: "Relocation Intermediary:",
    relocationTitle:
      "What relocation intermediary does the account work with, if any?",
    adoptionRate: "Adoption Rate of Booking Tool:",
    adoptionRateTitle:
      "What % of extended stay business is booked through the account's booking tool?",
    prefRelocation: "Is there a preferred relocation provider?:",
    prefRelocationDesc:
      "If there is a preferred relocation provider, then describe:",
    prefRelocationDescTitle:
      "If preferred relocation provider is Yes the, describe",
    relocationStrategy: "Relocation Intermediary Strategy:",
    relocationStrategyTitle:
      "Does your account work with an intermediary? If yes, what is the intermediary's strategy towards booking extended stay rooms.",
    extendedStayNeeds: "What is Majority of Extended Stay Needs?",
    extendedStayNeedsTitle:
      "Provide detail on the majority of account's needs such as  relocation, contractual (i.e. consultants, project, retail opening, etc.),etc.",
    businessOverviewHeader: "Business Overview - Extended Stay",
    orgStructure: "Organizational Structure for buying:",
    orgStructureTitle:
      "Please describe how this customer buys or describe who has the final buying power.",
    extendedStaySolution:
      "What extended stay solutions, services and initiatives have you considered and/or implemented?:",
    extendedStaySolutionTitle:
      "Which solutions do the customer take advantage of. Have we offered any that they have refused and why? (i.e Breakaways, Custom web pages, Travel Spend, Extended Stay Website etc.)",
    accountPolicies: "Account Policies,Procedures and/or Mandates:",
    acoountPoliciesTitle:
      "Are there any specific policies or procedures that the properties need to follow regarding this account?",
    prefMarriottBrand: "Preferred Marriott Brands:",
    prefMarriottBrandTitle:
      "Which brands do the account's extended stay travelers prefer?",
    stayCompetitors: "Top Ext Stay Competitors (by brand):",
    stayCompetitorsTitle: "List the top Ext Stay competitors.",
  },
};
export default Settings;
