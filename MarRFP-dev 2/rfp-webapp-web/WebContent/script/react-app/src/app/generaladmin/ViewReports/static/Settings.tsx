const Settings = {
  api: {
    getReportTypes: "/generalreportview/getGeneralReportView",
    getCognosUrl: "/reports/getAppEnvDetails.action",
  },
  reportUrl: "/ViewReport",
  Labels: {
    instructions:
      "For a list of reports for a specific account, please select the account below.",
    period: "Period: ",
    account: "Account: ",
    instructionsline1:
      "Reports will remain on MarRFP for 3 days after they have successfully been run.",
    instructionsline2:
      " Please Note: You will need to re-run a report to reflect any changes.",
    report: "  ",
  },
  banner: "banner",
  ControlKeyValues: {
    cSelectKeyField: "report_name",
    cSelectValueField: "report_title",
  },

  RecordDropDown: {
    name: "currentReport",
    id: "currentReport",
  },
  accountrecid: "accountrecid",

  accountNameList: {
    keyField: "accountrecid",
    valField: "accountname",
  },
  period: {
    id: "searchperiod",
    label: "Period: ",
    keyField: "period",
    valField: "period",
  },
};

export default Settings;
