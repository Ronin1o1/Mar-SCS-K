const Settings = {
  popupParms:
    "height=440,width=790,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
  api: {
    getPeriods: "/sappview/getSAPPView",
    getAccounts: "/sappaccountviewlist/viewAccounts",
    getReport: "/sappreport/getSAPPReport.action",
    getModules: "/sappmodulelist/getSAPPModule",
  },
  validationMessage: {
    account: "You must select an account.",
    module: "You must select a module.",
  },
  accountSappDetails: {
    heading: "Pricing : Account Plan (SAPP) Report",
    pageSize: 21,
    invalidMessage: "Invalid Account",
    submitButton: { label: "Submit" },
    CModalTitle: "Alert Message",
    CModalCloseImgTitle: "OK - Close Message Box",
    cModalxPosition: "-113",
    cModalyPosition: "-97",
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
      module: {
        id: "module",
        label: "Module:",
        keyField: "moduleid",
        valueField: "modulename",
      },
    },
  },
};

export default Settings;
