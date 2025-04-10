const Settings = {
  api: {
    getRooms: "/roomdefrules/getRulesChannel.action",
    roomentries: "/roomdefrules/getRoomEntries.action",
    roomdelete: "/roomdefrules/getDeleteRules.action",
    availableElementRules: "/roomdefrulesentry/getRules.action",
    getcopyRooms: "/roomdefrulescopy/copyIntoRules.action",
    copyGetRooms: "/roomdefrulescopy/getRulesCopy.action",
    upDataElementRules: "/roomdefrulesentry/updateRules.action",
  },

  roomDescriptionTitles: {
    pageTitle:
      "Room / Rate Description -  Administration - Display Rules : Room Description - Channels and Entries",
    title: "Available Elements",
    channel: "Channel:",
    booking: "Booking.com",
    entry: "Entry:",
    kordefault: "KOR: Default Display",
    maxnumberlines: "Max Number of Lines:",
    maxnumbercol: "Max Number of Columns:",
    mode: "Mode:",
    list: "List",
    concatenated: "Concatenated",
    rules: "Rules",
    loading: "Retrieving entries ...",
    pleaseSelectaChannel: "Please select a channel",
    pleaseSelectanEntry: "Please select an entry",
  },
  roomDescriptionTable: {
    title: "Channel:",
    entry: "Entry",
    roomDescriptionView: "RoomDescriptionView",
  },
  copyRulesPage: {
    pageTitle:
      "Room / Rate Description - Administration - Display Rules : Room Description - Copy Rules",
    channel: "Channel:",
    entry: "Entry:",
    createBlankDisplayRules:
      "Create blank Display Rules or copy the Display Rules from an existing channel and entry",
    createNewDisplayRules: "Create New Display Rules",
    copyDisplayRulesFromChannel: "Copy Display Rules From Channel:",
    selectInput: "please select the input",
    selectChannel:
      "You must select the channel from which the display rules are to be copied",
    selectEntry:
      "You must select the entry from which the display rules are to be copied",
  },

  alertMsgMaxLines: "You must fill in the maximum number of lines",
  alertMsgMaxColumns: "You must fill in the maximum number of columns",
  modalXPosition: -200,
  modalYPosition: -70,
  tableDelete: "Are you sure that you want to delete the rules for",
};
export default Settings;
