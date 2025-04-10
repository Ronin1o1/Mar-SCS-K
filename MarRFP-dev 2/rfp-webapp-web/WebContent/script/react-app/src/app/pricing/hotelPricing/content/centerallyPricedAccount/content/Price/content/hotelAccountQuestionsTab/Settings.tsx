const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    accountspecquest: "/accountspecquest/getHotelAccountSpecificQandATab",
    hotelquestsave: "/accountspecquest/updateQuestion",
    accountspecgroups: "/accountspecgroups/getAccSpecGrp",
    hotelgroupquestsave: "/accountspecgroups/update",
  },
  instructions: {
    btHeader: "BT Account Specific Questions",
    accHeader: "Groups & Meetings Account Specific Questions",
    fillAllDetails: "You must fill in all question fields",
  },
  tabListBT: [{ id: "btQuestTabs", label: "Account Specific\n\nQuestions", tabStatus: ""}],
  tabListGroup: [{ id: "accQuestTab", label: "Account Groups &\nMeetings", tabStatus: "" }],
  tabListAll: [
    { id: "btQuestTabs", label: "Account Specific \nQuestions", tabStatus: "" },
    { id: "accQuestTab", label: "Account Groups &\nMeetings", tabStatus: "" },
  ],
};

export default Settings;
