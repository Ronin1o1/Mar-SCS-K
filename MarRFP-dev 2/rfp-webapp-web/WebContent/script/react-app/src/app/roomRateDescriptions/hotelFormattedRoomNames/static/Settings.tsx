const Settings = {
  api: {
    url_encoded: "application/x-www-form-urlencoded",
    getSelectHotelList: "/roomtypenamehotelselect/getRDHotelSelect.action",
    getRoomPoolHotelList:
      "/roomtypenamehotelroompool/getRetrieveRoomPoolList.action",
    getRoomNameDefineData: "/roomtypenamehoteldefinition/getRoomNameDefine",
    updateDefinition: "/roomtypenamehoteldefinition/updateDefinition",
  },
  serviceTypeMsg: {
    conciergeLevel: " If rooms are on concierge level, select that option.",
    nonConciergeLevel:
      "If rooms are not on concierge level, but guests  have lounge access, select that option.",
  },
  routingUrl: {
    defineRoomName: "/getRoomNameDefine",
    getRoomPools: "/getRoomPools",
    defineRoomNamePath: "/roomtypenamehotelselect/getRoomNameDefine",
    finishProduct: "/finishProduct",
    finishProductPath: "/roomtypenamehotelselect/finishProduct",
    SelectFormattedRoomNames: "MasterFormattedRoomNames",
    roomTypeNameHotelSelect: "/roomtypenamehotelselect/select",
  },
  alert: {
    onlyOneService: "Only 1 Services Type can be selected.",
    invalidMarshaCode:
      "Invalid Marshacode.  Please enter a marshacode that you have access to.",
    selectProperty: "Please select a property",
  },
  label: {
    HotelSelection: "Formatted Room Names: Hotel - Selection",
    selectProperty: "Please select a Property:",
    propertyCodeInter: "Or enter a Property code:",
    HotelRoomPool: "Formatted Room Names: Hotel - Room Pool List",
    HotelRoomPoolServiceType:
      "Formatted Room Names: Hotel - Room Pool Name Definition",
    ServiceType: "Service Type",
    AccommodationType: "Accommodation Type",
    Hotel: "Hotel",
    FinishAndSave:
      "Formatted Room Names: Hotel - Finish Room Pool Name Definition",
  },
  tabNames: {
    SelectHotelTab: "Select Hotel",
    SelectRoomPoolTab: "Select Room Pool",
    ServiceTypeTab: "Service Type",
    AccommodationTypeTab: "Accommodation Type",
    LandmarkViewTab: "Landmark View",
    ViewTypeTab: "View Type",
    LocationTypeTab: "Location Type",
    SpecialityTab: "Speciality",
    RoomNameTab: "Room Name",
    AllInclusiveTypeTab: "All-Inclusive Type",
    FinishSaveTab: "Finish And Save",
  },
  SelectHotel: "SelectHotel",
  SelectRoomPool: "SelectRoomPool",
  getRoomNameDefine: "getRoomNameDefine",
  finishProduct: "finishProduct",
  pleaseSelect: "Please Select a Property",
  invalidAlert:
    "Invalid Marshacode.  Please enter a marshacode that you have access to.",
  selectProperty: "Please select a property",
  loaderMessage: "Please wait loading...",
  noData: "Currently not linked to any property. Please contact ",
  roomPoolInstruction: "To update a room pool name:",
  hotelRoomPoolInstruction:
    "Use the View button to select a room pool. Navigate by clicking Next or Previous at the top of each section. Changes are automatically saved and are available immediately in MARSHA ",
  parentRoute: "/roomtypenamehotelselect",
  hotelRoomPoolServiceTypeInstruction:
    "If rooms are on concierge level, select that option.",
  roomPoolServiceTypeInstruction:
    " If rooms are not on concierge level, but guests have lounge access, select that option.",
  queryParam: {
    marshaCode: "?marshaCode=",
    roomPool: "&roomPool=",
    hotelName: "&hotelName=",
    screenId: "&screenid=",
  },
  queryId: {
    marshaCode: "marshaCode",
    hotelName: "hotelName",
    roomPool: "roomPool",
    screenid: "screenid",
  },
  landMarkMsg: {
    landmarkInput:
      "Enter name of well known landmark (e.g. Times  Square). Do not include word 'view'.",
  },
  screenId: {
    ServiceType: "0101",
    AccommodationType: "0102",
    LandmarkView: "0104",
    ViewType: "0105",
    LocationType: "0106",
    Speciality: "0107",
    RoomName: "0108",
    AllInclusiveType: "0109",
  },
  formattedRoomNames: " Formatted Room Names: - Room Pool Name Definition",
  finishMsg: "Congratulations! You have completed all information for",
  roomPoolDefinitionOne: "Formatted Room Names: - Room Pool Name Definition - ",
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
