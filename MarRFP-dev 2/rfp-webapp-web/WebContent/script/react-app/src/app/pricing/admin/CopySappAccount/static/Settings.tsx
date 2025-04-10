const Settings = {
  api: {
    getPeriods: "/copysappaccount/getSappPeriodList.action",
    getSourceAccounts: "/sappaccount/findFromAccounts.action",
    getTargetAccounts: "/sappaccount/findToAccounts.action",
    copySappAccount: "/copysappaccount/update.action",
  },

  accountSappDetails: {
    heading: "Pricing :Copy SAPP To New Account",
    modalHeading: "Alert Message",
    invalidMessage: "Invalid Account",
    requiredMessage: "This value is required.",
    componentName: "copySapp",
    submitButton: { label: "Submit" },
    pageSize: 19,
    keyField: "period",
    formFields: {
      fromYear: {
        id: "fromYear",
        label: "From Year:",
      },
      accountFrom: {
        id: "accountFrom",
        label: "Account:",
      },
      toYear: {
        id: "toYear",
        label: "To Year:",
      },
      accountTo: {
        id: "accountTo",
        label: "Account:",
      },
    },
    validFromAccount: "Please select valid From Account",
    validToAccount: "Please select valid To Account",
    nextUrl: "/home",
  },
};
export default Settings;
