const Settings = {
  api: {
    getaccPerspectiveList: "/acctperspective/getAllAcctPerspective",
    updateaccPerspectiveList: "/acctperspective/updateAcctPerspective",
  },
  route: {
    NextPage: "acctlocations",
    PreviousPage: "acctcontacts",
  },
  accPerspectiveAlerts: {
    healthtext_alert:
      "'Account Business Overview' text cannot exceed 1024 characters.",
    acct_acctindtrends_alert:
      "'Customer Travel Outlook' text cannot exceed 2000 characters.",
    divisions_alert: "'Regional Account Insights' text cannot exceed 2000 characters.",
    mar_acctstrategy_obj_alert:
      "'Current Account Business Environment' text cannot exceed 2000 characters.",
    mar_vulnerabilities_alert:
      "'Payments' text cannot exceed 1500 characters.",
  },
  labels: {
    accountBusinessOverview:
      "Business Overview - Account & Marriott Perspective",
    accountBusiness: "Account Business Overview:",
    accountBusinessTitle: "High level executive overview of account",
    marriottAccountLeader: "Customer Travel Outlook:",
    marriottAccountLeaderTitle:
      "What is going on in the account's industry - are there certain trends that can be identified?",
    divisions: "Regional Account Insights:",
    divisionsTitle:
      "List the divisions within the company that may have travel/meeting spend.",
    marriottPerspective:
      "Current Account Business Environment:",
    marriottPerspectiveTitle:
      "What is Marriott looking to accomplish with the account? (more Rm Nts/rev, partnership, etc.)",
    marriottPerspectiveIssues:
      "Payments:",
    marriottPerspectiveIssuesTitle:
      "What function could Marriott help this account with?",
    subsidiariesLabel: "Subsidiaries",
    subsidiariesLabelTitle:
      "A company whose controlling interest is owned by another company.",
  },
};
export default Settings;
