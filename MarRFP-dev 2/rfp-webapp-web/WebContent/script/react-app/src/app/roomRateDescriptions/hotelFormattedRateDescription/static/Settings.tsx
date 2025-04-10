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
    getRateProductAssignmentReport:
      "/rateproductassignmentreport/getRateProductAssignmentReport",
  },

  routingUrl: {
    defineRoomName: "/getRoomNameDefine",
    getRoomPools: "/getRoomPools",
    defineRoomNamePath: "/roomtypenamehotelselect/getRoomNameDefine",
    finishProduct: "/finishProduct",
    finishProductPath: "/roomtypenamehotelselect/finishProduct",
    SelectFormattedRoomNames: "MasterFormattedRoomNames",
    viewDescription: "viewDescription",
    modifyDescription: "rateproducthotelsearch",
    productDefinition: "defineProduct",
    select: "select",
    productDefinitionURL: "/rateproducthoteldefinition",
  },
  alert: {
    onlyOneService: "Only 1 Services Type can be selected.",
    invalidMarshaCode:
      "Invalid Marshacode. Please enter a marshacode that you have access to.",
    selectProperty: "Please select a property.",
    alertMessage: "Please enter a valid product name.",
  },
  label: {
    HotelSelection: "Room / Rate Description: Hotel - Selection",
    HotelRateViewDescription:
      "Room / Rate Description: Hotel - View Rate Description",
    ModifyRateViewDesription:
      "Room / Rate Description: Hotel - Modify Rate Descriptions",
    ProductDefinitionLabel:
      "Room / Rate Description: Hotel - Product Definition",
    selectProperty: "Please select a Property:",
    propertyCodeInter: "Or enter a Property code:",
    HotelRoomPool: "Formatted Room Names: Hotel - Room Pool List",
    HotelRoomPoolServiceType:
      "Formatted Room Names: Hotel - Room Pool Name Definition",

    Hotel: "Hotel",
    FinishAndSave:
      "Formatted Room Names: Hotel - Finish Room Pool Name Definition",
  },
  tabNames: {
    SelectHotelTab: "Select Hotel",
    ViewRateDescription: "View Rate Description",
    ModifyRateDescription: "Modify Rate Descriptions",
    FinishAndSave: "FinishAndSave",
    PrintAssignments: "Print Assignments",
  },
  SelectHotel: "SelectHotel",
  SelectRoomPool: "SelectRoomPool",
  ViewDescription: "ViewDescription",
  ModifyRateDescription: "ModifyRateDescription",
  getRoomNameDefine: "getRoomNameDefine",
  pleaseSelect: "Please Select a Property",
  invalidAlert:
    "Invalid Marshacode.  Please enter a marshacode that you have access to.",
  selectProperty: "Please select a property",
  loaderMessage: "Please wait loading...",
  noData: "Currently not linked to any property. Please contact ",
  roomPoolInstruction: "To update a room pool name:",
  hotelRoomPoolInstruction:
    "Use the View button to select a room pool. Navigate by clicking Next or Previous at the top of each section. Changes are automatically saved and are available immediately in MARSHA ",
  parentRoute: "/rateproducthotelselect",
  viewparentRoute: "/rateproducthotelview",
  modifyRateparentRoute: "/rateproducthotelsearch",
  modifyParentRoute: "/rateproducthotelsearch/searchProduct",
  rateProductHotelViewStaticContent:
    "To search for a rate program type at least one character of the rate program code or the rate program name click search. Once the rate programs are listed in the box below click on view to review the new formatted rate description. To view a diffenet channel or language click on the drop down box below and select. To modify or add a new formatted rate description click on the product tabs above.",
  modifyRateViewDescription:
    "Tp modify a rate program description search by product code/name or produnt attributes (e.g breakfast) and click on search button. To view on product definition click on search button. From the products box click on product name in blue to modify.",
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
    productName: "productName",
    productCode: "productCode",
    brandCode: "brandCode",
    level: "level",
    entryLevel: "entryLevel",
  },
  popupParms:
    "height=600,width=1030,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
};
export default Settings;
