const Settings = {
  api: {
    url_encoded: "application/x-www-form-urlencoded",
    getSelectHotelList: "/roomtypenamehotelselect/getRDHotelSelect.action",
    getRoomPoolHotelList: "/roomdefhotelroompool/getHotelRoomPool.action",
    getRoomPoolView: "/roomdefhoteldefinition/getHotelRoomDefDefinition.action",
    updateDefinitionPool: "/roomdefhoteldefinition/updateDefinition.action",
    defineRoomPool: "/roomdefhoteldefinition/defineRoomPool.action",
    updateDefinition: "/roomdefhotelrateprogramdefinition/updateDefinition",
    getDefinition: "/roomdefhotelrateprogramdefinition/getDefinition",
    report: "/roomdefdefinitionreport/getReport.action",
    finishProduct: "/roomdefhotelfinish/getFinishProduct",
  },
  errorMessage: "There has been a technical Error. Please try again later.",
  errorUrl: "/error",
  textTitle: "Please enter a number",
  popupParms:
    "popupParms:'height=300,width=700,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
  serviceTypeMsg: {
    conciergeLevel: " If rooms are on concierge level, select that option.",
    nonConciergeLevel:
      "If rooms are not on concierge level, but guests  have lounge access, select that option.",
  },
  routingUrl: {
    defineRoomName: "/defineRoomPool",
    getRoomPools: "/getRoomPools",
    defineRoomNamePath: "/roomdefhotelselect/getRoomNameDefine",
    finishProduct: "/finishProduct",
    finishProductPath: "/roomdefhotelselect/finishProduct",
    SelectFormattedRoomNames: "MasterFormattedRoomNames",
  },
  alert: {
    onlyOneService: "Only 1 Services Type can be selected.",
    roomPoolViewAlert1: "In bedroom ",
    roomPoolViewAlert2:
      ", you must answer Yes to at least one bedtype or Some to at least two bedtypes",
  },
  label: {
    HotelSelection: "Formatted Room Names: Hotel - Selection",
    selectProperty: "Please select a Property:",
    propertyCodeInter: "Or enter a Property code:",
    HotelRoomPool: "Room Pool Description: Hotel - Room Pool List",
    HotelRoomPoolOverview:
      "Room Pool Description: Hotel - Room Pool Definition- ",
    HotelRateProgramOverview:
      "Room Pool Description: Hotel - Rate Program Definition- ",
    HotelRoomPoolServiceType:
      "Formatted Room Names: Hotel - Room Pool Name Definition",
    ServiceType: "Service Type",
    AccommodationType: "Accommodation Type",
    Hotel: "Hotel",
    RoomPoolDescription:
      " Room Pool Description: Hotel - Finish Room Pool Definition- ",
    FinishAndSave:
      "Formatted Room Names: Hotel - Finish Room Pool Name Definition",
    PropertyName: "Property Level Room Elements",
    PrintHeader: "Print Room Definition",
    PrinDetail:
      "Click on the Print buttons below to print all data you have entered in MarRFP.",
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
  getRoomNameDefine: "defineRoomPool",
  getRoomNameDefineProgram: "getRoomNameDefineProgram",
  pleaseSelect: "Please Select a Property",
  invalidAlert:
    "Invalid Marshacode.  Please enter a marshacode that you have access to.",
  selectProperty: "Please select a property",
  loaderMessage: "Please wait loading...",
  noData: "Currently not linked to any property. Please contact ",
  roomPoolInstruction: "To update a room description:",
  hotelRoomPoolInstruction:
    "Use the View button to select a room pool. Navigate by clicking Next or Previous at the top of each section. Yellow triangles indicate an update is required. Follow the yellow triangles to verify the room pool has the correct information. Changes are automatically saved and are available immediately in MARSHA",
  parentRoute: "/roomdefhotelselect",
  hotelRoomPoolServiceTypeInstruction:
    "If rooms are on concierge level, select that option.",
  roomPoolServiceTypeInstruction:
    " If rooms are not on concierge level, but guests have lounge access, select that option.",
  queryParam: {
    marshaCode: "?marshaCode=",
    roomPool: "&roomPool=",
    hotelName: "&hotelName=",
    screenId: "&screenid=",
    rateProgram: "&rateProgram=",
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
  title: "Based upon data entered in EPIC",
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
  notCompletedMsg: "Not all screens have been completed",
  errorMsg: "Error Review",
  incompleteMsg:
    "You have not successfully completed entering your data. The following screen(s) need to be reviewed or completed:",
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

  Information: "DescriptionInformation",
  accountTabs: {
    general: "General",
  },
  cModal: {
    cancelImgTitle: "Cancel",
    uploadFileTitle: "Select the file to upload",
  },
  cDatatable: {
    emptyMessage: "No Data Found!!",
  },
  cCalendar: {
    yearOffset: 10,
  },
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
  },
  valueYN: {
    Yes: "Yes",
    No: "No",
    Y: "Y",
    N: "N",
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
  },
  cSearchFilter: {
    tooltip: "search",
    placeholder: "",
    previousChoices: {
      id: "previousChoices",
      label: "Previous choices",
    },
    moreChoices: {
      id: "moreChoices",
      label: "More choices",
    },
  },
  RunReport: "Run Report",
  getUserDetails: "/user/getUserDetails",
  roomDescInfo: {
    windowOpenProp1: "MarRFP",
    windowOpenProp2:
      "LOCATION=no,MENUBAR=yes,SCROLLBARS=yes,resizable=yes,status=no,toolbar=no,HEIGHT=400,WIDTH=800",
    overview: "Overview",
    instruction: "Instructions",
    worksheet: "Worksheet",
    faq: "FAQ",
  },
};
export default Settings;
