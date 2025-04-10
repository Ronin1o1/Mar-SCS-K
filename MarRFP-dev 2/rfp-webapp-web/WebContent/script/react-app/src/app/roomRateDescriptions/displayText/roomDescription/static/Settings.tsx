const Settings = {
  api: {
    getDisplayText: "/roomdeftext/getDisplayText.action",
    getChannelLang: "/roomdeftext/getDisplayTextChannelLanguages.action",
    deleteChannelLang: "/roomdeftext/deleteText.action",
    copyDisplayText: "/roomdeftextcopy/copyIntoDisplayText.action",
    roomDisplay: "/roomdeftextdata/getRoomDefDisplayData.action",
    /**Data Elem --START */
    getRoomDisplayElem: "/roomdeftextdata/getRoomDefDisplayData.action",
    updateRoomDisplay:
      "/roomdeftextdata/updateDisplayText.action?nextUrl=/roomdeftextdata/enterDataText.action",
    copyText: "/roomdeftextcopy/copyIntoDisplayText.action",
    /**Enter Amenity */
    getAmenity: "/roomdeftextamenity/getRoomDefDisplayTextAmenity.action",
    updateAmenity:
      "/roomdeftextamenity/updateAmenityText.action?nextUrl=/roomtypenametextamenity/enterAmenityText.action",
  },
  popUp: {
    channelAlert: "Please select a channel first",
    copyChannelAlert:
      "You must select the channel from which the display text is to be copied",
    copyLanguageAlert:
      "You must select the language from which the display text is to be copied",
    deleteChanel: "Are you sure that you want to delete the rules for ",
    emptyText:
      "The display text on this page is blank and will not be saved.  Press OK to continue, or CANCEL to stay",
    charLength: "You are allowed to enter up to 500 characters.",
  },
  customeText: {
    copyText1:
      "Create a blank Display Text or copy the Display Text from an existing channel",
    copyText2:
      "Creation of a New, blank Display Text Table will result in NO text being displayed at ALL for this channel, until you have entered text for each item in the table.",
    warning: "Warning!",
    selectChannel: "Please select a channel",
    langLoader: "Retrieving Language....",
    headerText:
      "Room / Rate Description - Administration - Display Text : Room Description -",
  },
  dataList: {
    tableColumns: {
      element: {
        field: "elementTypeName",
        header: "Entry",
      },
      callOut: {
        field: "calloutInd",
        header: "Call Out",
      },
      text: {
        field: "elementCodeName",
        header: "Text",
      },
    },
  },
  url: {
    dataElements: "/roomdeftext/dataElements",
    roomDesc: "/roomdeftext/roomDescription",
    amenities: "/roomdeftext/enterAmenity",
  },
  windowUrl: {
    dataElements: "/rfptc/rfp-webapp-web/roomdeftext/dataElements",
    roomDesc: "/rfptc/rfp-webapp-web/roomdeftext/roomDescription",
    amenities: "/rfptc/rfp-webapp-web/roomdeftext/enterAmenity",
  },
};
export default Settings;
