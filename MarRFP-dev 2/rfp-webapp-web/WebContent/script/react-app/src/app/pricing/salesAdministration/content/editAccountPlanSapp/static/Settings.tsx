const Settings = {
  api: {
    getPeriods: "/acctselect/getAcctSelect",
    getAccounts: "/sappaccounteditlist/findAccounts",
    selectSappAccount: "/acctoverview/getAcctOverview",
  },
  parentRoute: "/editaccountplansapp",
  accountSappDetails: {
    componentName: "EditAccountPlan",
    heading: "SAPP : Select an Account",
    modalHeading: "Alert Message",
    invalidMessage: "Invalid Account",
    requiredMessage: "This value is required.",
    submitButton: { label: "Submit" },
    pageSize: 20,

    formFields: {
      year: {
        id: "year",
        label: "Year:",
        keyField: "period",
      },
      account: {
        id: "account",
        label: "Account:",
      },
    },

    validAccount: "Please select valid Account.",
    nextUrl: "/acctoverview/getAcctOverview",
  },
};
export default Settings;
