const Settings = {
  api: {
    getRFPSettingsData: "/accountmaintedit/getContentOnlyTab3.action",
    updateRFPData: "/accountmaintedit/updateTab3.action",
  },
  RFPFieldData: {
    modulesHeading: "Modules to be Included:",
    blankValue: {
      colvalue: 0,
      coldesc: "",
      profile_name: null,
      name: null,
      phone: null,
    },
  },

  yesNoOptions: [
    {
      id: "",
      value: "",
    },
    {
      id: "Y",
      value: "Yes",
    },
    {
      id: "N",
      value: "No",
    },
  ],
  MPBoptions: [
    {
      id: "",
      value: "",
    },
    {
      id: "Y",
      value: "Yes",
    },
    {
      id: "N",
      value: "No",
    },
    {
      id: "Complex",
      value: "Complex",
    },
        {
      id: "RPP",
      value: "RPP",
    },
    {
      id: "Special (VR)",
      value: "Special (VR)",
    },
  ],

  GBTAFormat: {
    id: "gbtaformat",
    label: "GBTA Format: ",
    keyField: "colvalue",
    valField: "coldesc",
  },
  checkboxLabel: {
    PB: {
      id: "pb",
      value: "pb",
      label: "PB",
    },
    CS: {
      id: "cs",
      value: "cs",
      label: "CS",
    },
    SS: {
      id: "ss",
      value: "ss",
      label: "SS",
    },
    BD: {
      id: "bd",
      value: "bd",
      label: "BD",
    },
    ES: {
      id: "es",
      value: "es",
      label: "ES",
    },
    GM: {
      id: "gm",
      value: "gm",
      label: "GM",
    },
    CSR: {
      id: "csr",
      value: "csr",
      label: "CSR",
    },
  },
  fieldsHeading: {
    label: "Number of Required Fields in RFP:",
    id: "num_requiredfields",
  },
  userDefinedHeading: {
    label: "Contains User Defined Questions (UDQ):",
    id: "contain_userdefques",
    keyField: "id",
    valField: "value",
  },
  maxSeasonsHeading: {
    id: "maxseason",
    label: "Maximum Number of Seasons:",
    keyField: "colvalue",
    valField: "coldesc",
  },
  addendumHeading: {
    label: "Addendum Questions (AQ) Notes:",
    id: "addquestnotes",
  },
  submissionNotesHeading: {
    label: " File Submission Notes:",
    id: "filesubmission",
  },
  presentfcrHeading: {
    label: "MPB Account (USAS Pilot):",
    id: "presentfcr",
    keyField: "id",
    valField: "value",
  },
  additionalNotesHeading: {
    label: " Additional Notes on RFP Settings:",
    id: "addnotes_rfp",
  },
  hiddenTaxFieldsHeading: {
    label: "Tax Fields Hidden:",
    id: "taxfields",
    keyField: "id",
    valField: "value",
  },
  maxBlackoutPeriodsHeading: {
    label: "Maximum Number of Blackout Periods Allowed:",
    id: "maxnum_blackoutperiod",
  },
  maxBlackoutDatesHeading: {
    label: "Maximum Number of Blackout Dates Allowed:",
    id: "maxnum_blackoutdates",
  },
  blackoutFieldsHiddenHeading: {
    label: "Blackout Dates Module/Fields Hidden:",
    id: "blackoutdateshidden",
    keyField: "id",
    valField: "value",
  },
  rateVisibleHeading: {
    label: "Room Occupancy Rates Visible:",
    id: "ratevisible",
    keyField: "colvalue",
    valField: "coldesc",
  },
  ratesTypeHeading: {
    label: "Rate Types Allowed:",
    id: "rtallowed",
    keyField: "colvalue",
    valField: "coldesc",
  },
  maxRoomTypesHeading: {
    label: "Maximum Number of Room Types:",
    id: "maxrt",
    keyField: "colvalue",
    valField: "coldesc",
  },

  addReportsHeading: {
    label: "Additional Reports Needed for Formatting:",
    id: "addrepformat",
  },
  ediegmHeading: {
    label: "EDIE for GM AQ:",
    id: "edieaq",
    keyField: "colvalue",
    valField: "profile_name",
  },
  ediebtHeading: {
    label: "EDIE for BT AQ:",
    id: "ediebt",
    keyField: "colvalue",
    valField: "profile_name",
  },
  edieRfpHeading: {
    label: "EDIE for RFP File:",
    id: "edierfp",
    keyField: "colvalue",
    valField: "profile_name",
  },
  btamPhoneHeading: {
    label: "BTAM Phone:",
    // id: "",
  },
  btamNameHeading: {
    label: "BTAM Name:",
    //  id: "",
  },
  sleaderPhoneHeading: {
    label: "Shared Account Leader Phone:",
    //  id: "",
  },
  sleaderNameHeading: {
    label: "Shared Account Leader Name:",
    // id: "",
  },
  aleaderNameHeading: {
    label: "Account Leader Name:",
    //id: "",
  },
  aleaderPhoneHeading: {
    label: "Account Leader Phone:",
    // id: "",
  },
  salesHeading: {
    label: "Sales Team:",
    //  id: "",
  },
};
export default Settings;
