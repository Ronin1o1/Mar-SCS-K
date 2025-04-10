const Settings = {
  cmodelclose: "Cancel",
  TabTitles: {
    componentName: "cityMarket",
    ImportModalInt: "Import International Market",
    ImportModalUS: "Import US Market",
    EditMarket: "Edit Market",
    USA: "USA",
    currentAcc: "Current account activity in market:",
    additionalInfo:
      "(additional info, growth plans for local business, new locations, etc.)",
    notes: "Notes:",
    marketPotential: "Market Total Potential Rm Nts:",
    country: "Country:",
    countryRegion: "Country/Region:",
    marketName: "Market Name:",
    marketPotentialTitle:
      "What is your location’s total potential Rm Nts for this account",
    countryTitle: "Country",
    state: "State:",
    AddDisabled: "Alert Message",
  },
  alert: {
    csvAlert: "Only csv files can be imported.",
    missingFile: "Please choose a file to upload.",
    nameAlert:
      "Check whether the correct template (US / International) is being used.",
    addDisabled1: "You have reached maximum number of",
    addDisabled2: "allowed",
    marketname: "Market Name is a required field.",
    curractivity:
      "'Current account activity in market' text cannot exceed 1024 characters.",
    marketpotentialrn: "Market Total Potential Rm Nts is a required field.",
    notes: "'Notes' text cannot exceed 1024 characters.",
    state: "State is a required field.",
    country: "Country/Region is a required field.",
    marketExist: "Market/City already exists.",
  },
  api: {
    getAccMarkets: "/acctmarkets/getAcctMarkets.action",
    deleteAllUsMarkets: "/acctmarkets/deleteAllUSMarkets.action",
    deleteAllIntMarkets: "/acctmarkets/deleteAllIntlMarkets.action",
    downloadTemplate: "/acctmarkets/downloadtemplate.action",
    downloadInstruction: "/acctmarkets/download.action",
    exportTemplate: "/acctmarkets/export.action",
    locations: "/editMarket/getEditMarket.action",
    delete: "/acctmarkets/deleteMarket.action",
    update: "/editMarket/updateMarket.action",
    getEditDropDowns: "/editMarket/getEditMarket.action",
    importExcelData: "/acctmarkets/importExcelData.action",
  },
  fileName: {
    USinstruction: "US_States_and_Two_letter_abbreviations",
    INinstruction: "Countries_and_Two_letter_abbreviations",
    USTemplate: "Template_US_City-markets_Import",
    INTemplate: "Template_International_City-Markets_Import",
    USExport: "US_City-markets_Export",
    InExport: "International_City-markets_Export",
  },
  sortByUS: [
    { name: "City/Market", value: 1 },
    { name: "State/Country", value: 2 },
    { name: "Rm Nts", value: 3 },
    { name: "Sequence", value: 0 },
  ],
  sortByInt: [
    { name: "City/Market", value: 1 },
    { name: "Country/Region", value: 2 },
    { name: "Rm Nts", value: 3 },
    { name: "Sequence", value: 0 },
  ],
  marketListHeader: {
    us: "United States Markets and Rm Nts",
    int: "International Markets and Rm Nts",
  },
  marketListingTabs: {
    city: "City/Markets",
    state: "State",
    country: "Country/Region",
    rmNts: "Rm Nts",
  },
  deleteAll:
    "By selecting Delete you will be deleting all data below. Are you sure you would like to proceed?",
  delete:
    "Are you sure you want to delete this data? \n\n(Please click OK to continue, CANCEL to stop)",
};

export default Settings;
