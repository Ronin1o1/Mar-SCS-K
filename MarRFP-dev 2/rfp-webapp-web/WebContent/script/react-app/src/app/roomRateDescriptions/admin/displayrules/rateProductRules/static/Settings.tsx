const Settings = {
  api: {
    // this is for dropdown API
    getRooms: "/roomdefrules/getRulesChannel.action",
    // this is for table data API
    roomentries: "/rateproductrules/getRoomEntries.action",
    // this is for delete table data API
    roomdelete: "/rateproductrules/deleteRules.action",
    // this is for soring API left and right side
    availableElementRules: "/rateproductrulesentry/getRules.action",
    copyGetRooms: "/rateproductrules/getRulesChannel.action",
    // this is for uppdate API in the sorting page
    upDataElementRules: "/rateproductrulesentry/updateRules.action",
    getcopyRooms: "/rateproductrulescopy/copyIntoRules.action",
  },

  rateProductTitles: {
    pageTitle:
      "Room / Rate Description -  Administration - Display Rules : Rate Product - Channels and Entries",
    title: "Available Elements",
    channel: "Channel:",
    booking: "Booking.com",
    entry: "Entry",
    kordefault: "KOR: Default Display",
    maxnumberlines: "Max Number of Lines",
    maxnumbercol: "Max Number of Columns",
    mode: "Mode",
    list: "List",
    concatenated: "Concatenated",
    rules: "Rules",
    loading: "Retrieving entries ...",
    pleaseSelectaChannel: "Please select a channel",
    selectEntry: "Please select an entry",
  },
  copyRulesPage: {
    pageTitle:
      "Room / Rate Description - Administration - Display Rules : Rate Product - Copy Rules",
    channel: "Channel:",
    entry: "Entry:",
    createBlankDisplayRules:
      "Create blank Display Rules or copy the Display Rules from an existing channel and entry",
    createNewDisplayRules: "Create New Display Rules",
    copyDisplayRulesFromChannel: "Copy Display Rules From Channel:",
    selectInput: "please select the input",
    selectChannel:
      "You must select the channel from which the display rules are to be copied.",
    selectEntry:
      "You must select the entry from which the display rules are to be copied.",
  },
  productViewPage: {
    pageTitle:
      "Room / Rate Description - Administration - Display Rules : Rate Product - Rule Entry",
  },
  modalContent: "You must fill in the maximum number of lines",
  modalContent1: "You must fill in the maximum number of columns",
  modalXPosition: -200,
  modalYPosition: -70,
  tableDelete: "Are you sure that you want to delete the rules for",
};
export default Settings;
