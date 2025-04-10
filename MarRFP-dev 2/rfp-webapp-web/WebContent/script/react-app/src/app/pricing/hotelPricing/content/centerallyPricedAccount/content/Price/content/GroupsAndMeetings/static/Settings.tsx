const Settings = {
  api: {
    getHotelAccountSpecificGeneralGroupsTab:
      "/accountgenspecgroups/getHotelAccountSpecificGeneralGroupsTab.action",
    updateHotelAccountBlackout: "/accountspecblack/updateBlackouts",
    updateGenGroups: "/accountgenspecgroups/updateGenGroups.action",
    urlencode: "application/x-www-form-urlencoded",
  },
  alerts: {
    fillAllGroupMeetingDetails:
      "You must fill in all Groups & Meetings question fields",
    errorOnFill: "Error when saving General Groups and Meetings",
  },
  labels: {
    maxNegotiatedRate_10To50:
      "If accepted into the client’s preferred hotel program, what is the maximum negotiated rate per sleeping room for groups of 10-50 rooms per night?",
    maxNegotiatedRate_51To100:
      "If accepted into the client’s preferred hotel program, what is the maximum negotiated rate per sleeping room for groups of 51-100 rooms per night?",
    specialNegotiatedTransRate:
      " If accepted into the client's preferred hotel program, will hotel honor the special negotiated transient rate as the highest rate that the client will pay for group rooms?",
    compRooms_label1: "Hotel will offer 1 complimentary room for every ",
    compRooms_label2: " rooms actualized.",
    discountBeverageCharges:
      "Will hotel offer a guaranteed discount off of Food & Beverage charges?",
    dayMeetingTitle:
      "Day Meeting Packages or Day Delegate rates are Full or Half Day, per-person packaged meeting pricing, including but not limited to food, beverage, AV and meeting space, not including guest room.",
    dayMeetingOffered: "Day Meeting Packages/Delegate Rates offered?",
    yes_label: "Yes",
    no_label: "No",
    maxFullDayDelegate:
      "What is the maximum full Day Delegate rate per person for groups of 10-50 participants?",
    maxHalfDayDelegate:
      "What is the maximum half Day Delegate rate per person for groups of 10-50 participants?",
    maxFullDayDelegate_51To100:
      "What is the maximum full Day Delegate rate per person for groups of 51-100 participants?",
    maxHalfDayDelegate_51To100:
      "What is the maximum half Day Delegate rate per person for groups of 51-100 participants?",
    maxCostBreakOut_10:
      "What is the maximum cost for a 10 person breakout room?",
    maxCostBreakOut_25:
      "What is the maximum cost for a 25 person breakout room?",
    highSpeedInternetCost:
      "Is the cost for high speed internet in the general session meeting room included in the Day Delegate rate?",
    lcdCost: "Is the LCD cost per day included in the Day Delegate rate?",
    standardScreen:
      "Is the standard screen cost per day included in the Day Delegate rate?",
  },
};
export default Settings;
