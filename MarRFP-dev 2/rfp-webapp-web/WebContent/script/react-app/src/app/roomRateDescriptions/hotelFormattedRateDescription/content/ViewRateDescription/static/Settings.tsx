const Settings = {
  api: {
    url_encoded: "application/x-www-form-urlencoded",
    getHotelRateProductSelectList:
      "/rateproducthotelselect/getHotelRateProductSelect",
    getRateProductHotelView:
      "/rateproducthotelview/getRateProductViewDescription",
    getSearchList: "/rateproductbrandselect/select.action",
    getassignments: "/rateproducthotelview/getAssignments.action",
    getRateDescription: "/rateproducthotelview/getRateDescription",
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
    viewDescription: "viewDescription",
  },
  alert: {
    onlyOneService: "Only 1 Services Type can be selected.",
    invalidMarshaCode:
      "Invalid Marshacode.  Please enter a marshacode that you have access to.",
    selectProperty: "Please select a property",
  },
  label: {
    HotelSelection: "Room / Rate Description: Hotel - Selection",
    HotelRateViewDescription:
      "Room / Rate Description: Hotel - View Rate Description",
    ModifyRateViewDesription:
      "Room / Rate Description: Hotel - Modify Rate Description",
    selectProperty: "Please select a Property:",
    propertyCodeInter: "Or enter a Property code:",
    HotelRoomPool: "Formatted Room Names: Hotel - Room Pool List",
    HotelRoomPoolServiceType:
      "Formatted Room Names: Hotel - Room Pool Name Definition",
    ServiceType: "Service Type",
    AccommodationType: "Accommodation Type",
    Hotel: "Hotel:",
    rateProgramCodeLabel: "Rate Program Code:",
    rateProgramNameLabel: "Rate Program Name:",
    ChannelList: "Channel:",
    LanguageList: "Language:",
    EntryList: "Entry:",
    NewText: "New Text Description",
    rateDescription: " View Rate Description",
    FinishAndSave:
      "Formatted Room Names: Hotel - Finish Room Pool Name Definition",
  },
  tabNames: {
    SelectHotelTab: "Select Hotel",
    ViewRateDescription: "View Rate Description",
    ModifyRateDescription: "Modify Rate Description",
    PrintAssignments: "Print Assignments",
  },
  SelectHotel: "SelectHotel",
  SelectRoomPool: "SelectRoomPool",
  ViewDescription: "ViewDescription",
  ModifyRateDescription: "ModifyRateDescription",
  getRoomNameDefine: "getRoomNameDefine",
  parentRoute: "/rateproducthotelselect",
  viewparentRoute: "/rateproducthotelview",
  modifyRateparentRoute: "/modifyRateDescription",
  viewStaticContent:
    "To search for a rate program type at least one character of the rate program code or the rate program name in the fields below and click search. To search for all rate programs leave fields blank and click search.",
  viewStaticContentList:
    "Once the rate programs are listed in the box below click on view to review the new formatted rate description and the current MARSHA rate description.",
  viewStaticContentChannel:
    "To view a different channel or language click on the drop down box below and select.",
  viewStaticContentInfo:
    "To modify or add a new formatted rate description click on the products tab above.",
  rateProgramSearch: "Rate Program Search:",
  rateProgramSearchRules:
    "Type at least one character of the rate program code or the rate program name",
  searchRateProgram: "Please search for a rate program",
  searchLoading: "Searching....",
  rateProductHotelViewStaticContent:
    "To search for a rate program type at least one character of the rate program code or the rate program name click search. Once the rate programs are listed in the box below click on view to review the new formatted rate description. To view a diffenet channel or language click on the drop down box below and select. To modify or add a new formatted rate description click on the product tabs above.",
  tableViewBtn: "View",
  firstProduct: "AAAA",
  entryLevel: "Hotel",
  navPageSearch: "SEARCH",
  navPagePrevious: "PREVIOUS",
  navPageNext: "NEXT",
  programNameAlert: "The Rate Program Name must start with a letter.",
  rateDescription: {
    tableColumns: {
      rateProgramCode: {
        field: "ratePlanCode",
        header: "RPGM",
      },
      rateProgramName: {
        field: "ratePlanName",
        header: "RPGM Name",
      },
      ProductCode: {
        field: "productCode",
        header: "Product Code",
      },
      ProductName: {
        field: "productName",
        header: "Product Name",
      },
      viewBtn: {
        field: "",
        header: "",
      },
    },
  },
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
};
export default Settings;
