const Settings = {
  api: {
    url_encoded: "application/x-www-form-urlencoded",
    getRetrieveRoomPoolList:
      "/roomtypenamemasterroompool/getRetrieveRoomPoolList.action",
    getRoomNameDefineData: "/roomtypenamemasterdefinition/getRoomNameDefine",
    updateDefinition: "/roomtypenamemasterdefinition/updateDefinition",
  },
  serviceTypeMsg: {
    conciergeLevel: " If rooms are on concierge level, select that option.",
    nonConciergeLevel:
      "If rooms are not on concierge level, but guests  have lounge access, select that option.",
  },
  routingUrl: {
    defineRoomName: "/defineRoomName",
    getRoomPools: "/getRoomPools",
    defineRoomNamePath: "/roomtypenamemasterroompool/defineRoomName",
    finishProduct: "/finishProduct",
    finishProductPath: "/roomtypenamemasterroompool/finishProduct",
    MasterFormattedRoomNames: "MasterFormattedRoomNames",
  },
  tabNames: {
    FinishSaveTab: "FinishSaveTab",
    HotelName: "HotelName",
    SelectRoomPool: "SelectRoomPool",
  },
  queryParam: {
    roomPool: "?roomPool=",
    screenId: "&screenid=",
  },
  queryId: { roomPool: "roomPool", screenid: "screenid" },
  landMarkMsg: {
    landmarkInput:
      "Enter name of well known landmark (e.g. Times  Square). Do not include word 'view'.",
  },
  getRoomPools: "getRoomPools",
  finishProduct: "finishProduct",
  selectRoomPoolTab: "Select Room Pool",
  finishSaveTab: "Finish And Save",
  parentRoute: "/roomtypenamemasterroompool",
  roomPoolListHeader: " Formatted Room Names: Master - Room Pool List",
  FinishAndSave:
    "Formatted Room Names: Master - Finish Room Pool Name Definition",
  formattedRoomNames:
    " Formatted Room Names: Master - Room Pool Name Definition",
  finishMsg: "Congratulations! You have completed all information for",
  roomPoolDefinitionOne:
    "Formatted Room Names: Master - Room Pool Name Definition - ",
  roomPoolDefinitionTwo: " - Services Type",
  optionalFieldStmt:
    "This is an optional field. Enter a specific room name if applicable. (e.g. Renaissance Suite, Royal Suite). ",
  doNotRepeatStmt:
    "Do not repeat the default room pool name or the room pool view. ",
  doNotEnterSubjective:
    "Do not enter subjective adjectives, such as 'Premium', 'Luxury', 'Deluxe', 'Superior', etc.  Research shows that subjective terms do not enable guests to differentiate between room types.",
  updateRoomPool: "To update a room pool name:",
  useViewButton:
    "Use the View button to select a room pool. Navigate by clicking Next or Previous at the top of each section. Changes are automatically saved and are available immediately in MARSHA",
};
export default Settings;
