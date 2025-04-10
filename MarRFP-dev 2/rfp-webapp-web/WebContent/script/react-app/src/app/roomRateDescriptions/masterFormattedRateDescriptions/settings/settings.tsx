const Settings = {
  api: {
    url_encoded: "application/x-www-form-urlencoded",
    saveAndUpdateProductName: "/rateproductmasterdefinition/updateDefinition",
    getMasterProductName:
      "/rateproductmasterdefinition/getMasterProductDefinition",
    getMasterProductSearch: "/rateproductmastersearch/getMasterProductSearch",
    getSearchProduct: "/rateproductmastersearch/search",
    getQuickView: "/rateproductmastersearch/getQuickViewProduct",
  },
  routingUrl: {
    createProduct: "/createProduct",
    modifyRateDescriptions: "/modifyRateDescriptions",
    finishAndSave: "/finishAndSave",
    defineProduct: "/defineProduct",
  },
  queryParam: {
    screenId: "?screenid=",
    productCode: "&productCode=",
    finishAndSave: "RPROD_",
    urlStringUptoProdCode:
      "?marshaCode=&hotelName=&brandCode=&brandName=&productCode=",
    urlStringProdName: "&productName=",
    urlStringLevel: "&level=Master&entryLevel=Master",
  },
  tabNames: {
    FinishSaveTab: "Finish And Save",
    createProduct: "ProductName",
    ModifyRateDescription: "Modify Rate Descriptions",
  },
  labels: {
    pageTitle: "Room / Rate Description: Master - Product Definition",
    pageTitleFinish: "Room / Rate Description: Master - Finish Product Definition",
    okClose: "OK - Close Message Box",
    finishSaveTab: "Finish And Save",
    FinishAndSave:
      "Formatted Room Names: Master - Finish Room Pool Name Definition",
    rateProgramContent:
      "To modify a rate program description search by product code/name or product attributes (e.g. breakfast) and click on the search button.",
    viewProductDefinition:
      "To view the product definition click on the search icon.",
    clickToModifyContent:
      "From the products box click on the product name in Blue to modify.",
    searchByTitle: "Search by ",
    enterProductCode:
      "Enter the entire product code or the start of the product name to search for: ",
    productCodeTitle: "Product Code: ",
    productName: "Product Name: ",
    entryLevel: "Master",
    entryLevelBrand: "Brand",
    createProductAlt: "Click to create a new product.",
    radioSearchType: "rd_searchtype",
    productCodeName: " Product Code/Name or by ",
    productAttribute: " Product Attributes ",
    productAttibutesSubHeader:
      "Select attributes of the product to search for: ",
    unselectAll: "Click to search for product definitions.",
    searchAlt: "Click to search for product definitions.",
    productsTitle: "Products",
    previousDef: "Click to for previous product definitions.",
    nextDef: "Click to for next product definitions.",
    searchingTitle: "Searching ...",
    viewProdDef: "Click to view product definition.",
    noProdDef: "There is no product definition.",
    radioModifiable: "radio1",
    brandModifiable: "B",
    hotelModifiable: "H",
    statusYN: "A",
    brandModifiableText: "Brand Modifiable",
    hotelModifiableText: "Hotel Modifiable",
    statusYNText: "Status Y/N",
    selectAll: "Click to Select All.",
    blankAll: "Click to Blank All.",
    hotelTitle: "Hotel",
    modifiableBy: "Modifiable By",
    yesOption: "Yes",
    noOption: "No",
    typeSelectAll: "selectAll",
    typeUnSelectAll: "unselectAll",
    typeStatusYN: "statusYN",
    successMessage: "Congratulations! You have completed all information for ",
    quickViewLoadingMsg: "Please wait loading",
    noProductMessage:
      "There are no products that meet the criteria. Please try again.",
  },
  alert: {
    validProductCode: "Please enter a valid Product Code. (i.e. P00001)",
    validProductName: "Please enter a valid product name.",
    emptyProductName: "Please enter the name of the product.",
  },
  modifyRateDescription: {
    productCode: {
      id: "rateProductSearch.productCode",
      name: "rateProductSearch.productCode",
    },
    productName: {
      id: "rateProductSearch.productName",
      name: "rateProductSearch.productName",
    },
    formChg: {
      id: "formChg",
      name: "formChg",
      value: "N",
    },
    marshaCode: {
      id: "marshaCode",
      name: "marshaCode",
      value: "",
    },
    hotelName: {
      id: "hotelName",
      name: "hotelName",
      value: "",
    },
    brandCode: {
      id: "brandCode",
      name: "brandCode",
      value: "",
    },
    brandName: {
      id: "brandName",
      name: "brandName",
      value: "",
    },
    searchStartProduct: {
      id: "rateProductSearch.searchStartProduct",
      name: "rateProductSearch.searchStartProduct",
    },
    searchFirstProduct: {
      id: "rateProductSearch.searchFirstProduct",
      name: "rateProductSearch.searchFirstProduct",
    },
    nendProduct: {
      id: "rateProductSearch.nendProduct",
      name: "rateProductSearch.nendProduct",
    },
  },
  gridDetails: {
    columns: {
      search: {
        field: "productCode",
        header: "",
      },
      productCode: {
        field: "productCode",
        header: "Product Code",
      },
      productName: {
        field: "productName",
        header: "Product Name",
      },
    },
    NoDataMessage: "No Data Found",
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
    radio: "radio",
    hidden: "hidden",
    text: "text",
  },
  pageNo: {
    createProdscreenId: "0000",
    rateRulesScreenId: "0219",
  },
  prefixLabel: {
    brand: "bchk_",
    hotel: "hchk_",
  },
  validatePath: "/modifyRateDescriptions",
  FinishSaveTab: "Finish And Save",
  createProduct: "Product Name",
  ModifyRateDescriptions: "Modify Rate Descriptions",
  marketingInfo: "Marketing Info",
  foodAndBeverage: "Food and Beverage",
  marketingText: "Enter Marketing Tag (if required) in Text Box",
  marketingLabel: "Marketing Tag",
  rateLabel: "Rate Includes",
  checkVal: "true",
  brandRadio: "B",
  hotelRadio: "H",
  AvailRadio: "A",
  AvailYesCheck: "Y",
  AvailNoCheck: "N",
  defaultLevel: "Master",
  dropdownYes: "Yes",
  dropdownNo: "No",
  congratsText: "Congratulations! You have completed all information for",
};

export default Settings;
