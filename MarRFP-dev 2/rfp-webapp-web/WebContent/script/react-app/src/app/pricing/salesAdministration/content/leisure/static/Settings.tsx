const Settings = {
  api: {
    getLeisureList: "/leisure/getOverviewLeisure",
    updateLeisureList: "/leisure/updateLeisure",
  },
  route: {
    NextPage: "keycontacts",
    PreviousPage: "extendedStay",
  },
  leisureDetails: {
    strategicOverview: "Strategic Overview of Account– Leisure Perspective",
    marketing: "Marketing",
    marketingSubHeading:
      "Detail property opportunities (e.g. brochure contribution, breakaways); include feedback on ROI and best practices",
    strengths: "Strengths/Business case/Rules of engagement",
    strengthsSubHeading:
      "Include the principle strengths of the account (e.g. size, distribution, partners and source market).What best practices should be considered when working with the account?",
    leisureSegment: "Leisure Segment – FIT/GP",
    leisureSegmentSubHeading:
      "Which leisure segment modules does the account support (e.g. FIT Static, FIT Dynamic, Group Series, Group Adhoc)?",
    onwardDistribution: "Account Onward Distribution and Reach",
    onwardDistributionSubHeading:
      "Who does the account distribute to (e.g. direct To Consumer, via 3rd parties) and where are the Points of Sale based (Global/Regional/Country/City)?",
    contracting: "Contracting",
    contractingSubOne:
      "Where is the contracting team based (include if in market, at HQ, etc.)? What is the contracting cycle and timeline? Does the account contract hotels directly or",
    contractingSubTwo: "use 3rd party Wholesalers (list wholesalers if known)?",
    modalHeading: "Alert Message",
    closeTitle: "OK - Close Message Box",
  },
  validationMessages: {
    charExceedingAlert: "You are allowed to enter up to 1024 characters.",
    marketingExceedAlert: "You are allowed to enter up to 3072 characters.",
    stOverview: "'Strategic overview' text cannot exceed 1024 characters.",
    marketing: "'Marketing' text cannot exceed 3072 characters.",
    strengths: "'Lesiure Strength ' text cannot exceed 1024 characters.",
    leisureSegment: "'Lesiure Segment' text cannot exceed 1024 characters.",
    onwardDistribution:
      "'Account Onward Distribution' text cannot exceed 1024 characters.",
    contracting: "'Contracting' text cannot exceed 1024 characters.",
  },
};
export default Settings;
