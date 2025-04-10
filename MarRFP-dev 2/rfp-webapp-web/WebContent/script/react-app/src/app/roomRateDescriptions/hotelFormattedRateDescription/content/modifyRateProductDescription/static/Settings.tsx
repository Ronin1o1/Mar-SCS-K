const Settings = {
  api: {
    url_encoded: "application/x-www-form-urlencoded",
    getHotelProductSearchList: "/rateproducthotelsearch/getHotelProductSearch",
    getRateProductHotelView:
      "/rateproducthotelview/getRateProductViewDescription",
    getSearchList: "/rateproducthotelsearch/search.action",
    getQuickViewProductList: "/rateproducthotelsearch/quickViewProduct",
    getproductDefinitionList:
      "/rateproducthoteldefinition/getHotelProductDefinition.action",
    updateproductDefinitionList: "/rateproducthoteldefinition/updateDefinition",
  },
  label: {
    ModifyRateViewDesription:
      "Room / Rate Description: Hotel - Modify Rate Descriptions :-",
    modifyStaticContent:
      "To modify a rate program description search by product code/name or product attributes (e.g. breakfast) and click on the search button.",
    modifyStaticContentList:
      "To view the product definition click on the search icon.",
    viewStaticContentInfo:
      "From the products box click on the product name in Blue to modify.",
    searchBy: "Search by",
    productNameOptn: "Product Code/Name or by",
    productAtrributeOptn: "Product Attributes",
    productNametext:
      "Enter the entire product code or the start of the product name to search for:",
    productAtrributeText: "Select attributes of the product to search for:",
    rateProductCodeLabel: "Product Code:",
    rateProductNameLabel: "Product Name:",
    ProductDefinitionLabel:
      "Room / Rate Description: Hotel - Product Definition",
    ProductDefinition: "There is no product definition.",
    FinishDefinitionLabel:
      "Room / Rate Description: Hotel - Finish Product Definition",
    ProductNameLabel: "Product Name:",
    ProductTable: "Products",
  },
  productNameValidation: "Please enter a valid Product Code. (i.e. P00001)",
  DataTableMessage:
    "There are no products that meet the criteria. Please try again.",

  navPagePrevious: "PREVIOUS",
  navPageNext: "NEXT",
  searchLoading: "Searching....",
  modifyrateDescription: {
    tableColumns: {
      viewBtn: {
        field: "",
        header: "",
      },
      ProductCode: {
        field: "productCode",
        header: "Product Code",
      },
      ProductName: {
        field: "productName",
        header: "Product Name",
      },
    },
  },
  alertMessage: "Please enter a valid product name.",
  SelectHotel: "SelectHotel",
  SelectRoomPool: "SelectRoomPool",
  ViewDescription: "ViewDescription",
  ModifyRateDescription: "ModifyRateDescription",
  getRoomNameDefine: "getRoomNameDefine",
  pleaseSelect: "Please Select a Property",
  pageMessageData: "Congratulations! You have completed all information for",
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
  modifyDescription: "rateproducthotelsearch",
  productDefinition: "/rateproducthoteldefinition",
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
    strBrandCode: "&strBrandCode=",
    productCode: "&productCode=",
    level: "&level=",
    brandCode: "&brandCode=",
    productName: "&productName=",
    entryLevel: "&entryLevel=",
    brandName: "&brandName=",
    screenid: "&screenid=",
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
};
export default Settings;
