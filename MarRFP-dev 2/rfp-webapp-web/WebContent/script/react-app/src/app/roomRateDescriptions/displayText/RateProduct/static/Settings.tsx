const Settings = {
  api: {
    getDisplayText: "/rateproducttext/getDisplayText.action",
    getChannelLang: "/rateproducttext/getDisplayTextChannelLanguages.action",
    deleteChannelLang: "/rateproducttext/deleteText.action",
    copyDisplayText: "/rateproducttextcopy/copyIntoDisplayText.action",

    /**Data Elem --START */
    getProductDisplay:
      "/rateproducttextdata/getRateProductDisplayTextData.action",
    updateProductDisplay:
      "/rateproducttextdata/updateDisplayText.action?nextUrl=/rateproducttextdata/enterDataText.action",
    /**Enter Amenity */
    getAmenity: "/rateproducttextamenity/getRateProductNameTextAmenity.action",
    updateAmenity:
      "/rateproducttextamenity/updateAmenityText.action?nextUrl=/roomtypenametextamenity/enterAmenityText.action",
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
  customText: {
    copyText1:
      "Create a blank Display Text or copy the Display Text from an existing channel",
    copyText2:
      "Creation of a New, blank Display Text Table will result in NO text being displayed at ALL for this channel, until you have entered text for each item in the table.",
    warning: "Warning!",
    selectChannel: "Please select a channel",
    langLoader: "Retrieving Language....",
    headerText:
      "Room / Rate Description - Administration - Display Text : Rate Product -",
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
    dataElements: "/rateproducttext/dataElements",
  },
};
export default Settings;
