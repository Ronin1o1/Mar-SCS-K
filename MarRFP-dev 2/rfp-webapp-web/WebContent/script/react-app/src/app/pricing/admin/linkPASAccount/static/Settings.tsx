const Settings = {
  api: {
    getLinkPasAccounts: "/linkpasaccounts/getLinkPasAccounts.action",
    getLinkPasAccountsPasManager:
      "/linkpasaccounts/getLinkPasAccounts.action?period=:period&pasManager=:pasManager",
    getLinkPasAccountsWithFilter:
      "/linkpasaccounts/getLinkPasAccounts-with filter.action",
    updatePasAccount: "/linkpasaccounts/updatePasAccounts.action",
    getUserDetails: "/user/getUserDetails.action",
  },
  alertMessage: "Alert Message",
  okClose: "OK - Close Message Box",
  pasAccount: {
    header: "Pricing : Link Accounts",
    title: "Please choose the year and identify accounts for PAS Manager.",
    PASManager: "PAS Manager",

    primary: "Available Accounts as Primary Contact: ",
    selectedAccount: "Selected Accounts as Primary Contact: ",
    AMCNetworks: "AMC Networks",
    secondary: "Available Accounts as Secondary Contact:",
    selectedAccountSecond: "Selected Accounts as Secondary Contact:",
    Year: "Year",
    pasManager: "pasManager",
    personName: "personName",
    adminRespondent: "adminRespondent",
    periodList: "periodList",
    period: "period",
    pasManagerList: "pasManagerList",
    eid: "eid",
    fullName: "fullName",
    AlertMessage:
      "Same user cannot be a Primary and Secondary Contact for the account(s): ",
    Alerttitle: "Alert Message",
    closeImgTitle: "OK - Close Message Box",
    nextUrl: "/linkpasaccounts/view.action",
    origPeriod: 2022,
    data: `request_locale:en`,
    contextType: "application/x-www-form-urlencoded",
  },
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
  },
};
export default Settings;
