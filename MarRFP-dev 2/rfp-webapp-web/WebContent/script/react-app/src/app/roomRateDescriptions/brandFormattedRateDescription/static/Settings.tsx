const Settings = {
  api: {
    url_encoded: "application/x-www-form-urlencoded",
    getBrands: "/rateproductbrandselect/getBrandRateProductSelect",
    getBrandProductSearch: "/rateproductbrandsearch/getBrandProductSearch",
    searchProduct: "/rateproductbrandsearch/search",
    getProductQuickView: "/rateproductbrandsearch/quickViewProduct",
    updateProductSearch: "/rateproductbrandsearch/update",
    defineProduct: "/rateproductbranddefinition/getBrandProductDefinition",
    updateProduct: "/rateproductbranddefinition/updateDefinition",
  },
  routingUrl: {
    selectBrand: "/select",
    modifyRateDesc: "/modifyRateDescription",
    finishProduct: "/finishProduct",
    parentRoute: "/rateproductbrandselect",
    defineProductParentRoute: "/rateproductbranddefinition",
    defineProduct: "/defineProduct",
  },
  alerts: {
    selectBrand: "Please select a brand",
    validProductCode: "Please enter a valid Product Code. (i.e. P00001)",
    validProductName: "Please enter a valid product name.",
  },
  headers: {
    roomRateDescription: "Room / Rate Description:",
    brand: " Brand -",
    brandSelection: " Selection",
    modifyRateDesc: " Modify Rate Descriptions",
    defineProduct: " Product Definition: ",
    finishProduct: " Finish Product Definition: ",
  },
  labels: {
    selectBrand: "Please select a brand:",
    selectBrandOption: "<Please Select a Brand>",
    searchByTitle: "Search by ",
    radioSearchType: "rd_searchtype",
    productCodeName: " Product Code/Name or by ",
    productAttribute: " Product Attributes ",
    enterProductCode:
      "Enter the entire product code or the start of the product name to search for: ",
    productCodeTitle: "Product Code: ",
    productAttibutesSubHeader:
      "Select attributes of the product to search for: ",
    unSelectAll: "Click to search for product definitions.",
    productName: "Product Name: ",
    searchAlt: "Click to search for product definitions.",
    productsTitle: "Products",
    searchingTitle: "Searching ...",
    previousDef: "Click to for previous product definitions.",
    nextDef: "Click to for next product definitions.",
    viewProdDef: "Click to view product definition.",
    noProdDef: "There is no product definition.",
    rateProgramContent:
      "To modify a rate program description search by product code/name or product attributes (e.g. breakfast) and click on the search button.",
    viewProductDefinition:
      "To view the product definition click on the search icon.",
    clickToModifyContent:
      "From the products box click on the product name in Blue to modify.",
    entryLevel: "Brand",
    quickViewLoadingMsg: "Please wait loading",
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
    entryLevelBrand: "Brand",
    unselectAll: "Click to search for product definitions.",
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
  tabNames: {
    selectBrandTab: "Select Brand",
    modifyRateDescTab: "Modify Rate Descriptions",
    defineProduct: "define product",
    finishSaveTab: "Finish And Save",
  },
  queryParam: {
    brandCode: "?brandCode=",
    brandName: "&brandName=",
    screenId: "&screenid=",
    productCode: "&productCode=",
    productName: "&productName=",
    level: "&level=",
    entryLevel: "&entryLevel=",
  },
  queryId: {
    brandCode: "brandCode",
    brandName: "brandName",
    screenid: "screenid",
    productCode: "productCode",
    productName: "productName",
    level: "level",
    entryLevel: "entryLevel",
  },
  pageNo: {
    createProdScreenId: "0000",
    rateRulesScreenId: "0219",
  },
  prefixLabel: {
    brand: "bchk_",
    hotel: "hchk_",
  },
  selectBrand: "SelectBrand",
  modifyRateDesc: "ModifyRateDescription",
  defineProduct: "defineProduct",
  finishProduct: "finishProduct",
  createProdscreenId: "0000",
  defaultLevel: "Brand",
  level: "Brand",
  navPagePrevious: "PREVIOUS",
  navPageNext: "NEXT",
  noProductsMessage:
    "There are no products that meet the criteria. Please try again.",
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
};
export default Settings;
