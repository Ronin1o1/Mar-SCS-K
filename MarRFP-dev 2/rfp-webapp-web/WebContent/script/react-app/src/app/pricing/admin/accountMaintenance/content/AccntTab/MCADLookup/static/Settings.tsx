const Settings = {
  api: {
    getMcadList: "/accountmcadmaint/getAccountMCAD.action",
    getAccountMCADdetails: "/accountmcaddetail/getAccountMCADDetails.action",
    getAccountMCADResult: "/accountmcadresultmaint/getAccountMCADResult.action",
    updateMCAD: "/accountmcadmaint/update.action",
  },
  sappRole: "MFPAPADM",
  adminRole: "MFPADMIN",
  accTypeP: "P",
  searchAccount: {
    searchByName: {
      id: "searchByName",
      label: "Search by Name",
    },
    searchByID: {
      id: "searchByID",
      label: "Search by ID",
    },
    lblBusinessName: {
      id: "businessName",
      label: "Business Name Like:",
    },
    ddnBusinessLevel: {
      id: "businessLevel",
      label: "Business Level:",
    },
    ddnBusinessLevellbl: {
      id: "businessLevelID",
      label: "Business Level:",
    },
    ddnCountryRegion: {
      id: "countryRegion",
      label: "Country/Region:",
    },
    ddnBusinessId: {
      id: "businessID",
      label: "Business Id:",
    },
    ddnBusinessIdlbl: {
      id: "ddnbusinessID",
      label: "Business Id:",
    },
    businessLevelList: {
      businessLevelval: "businessLevelval",
      businessLeveltext: "businessLeveltext",
    },
    countries: {
      countries: "country",
      countryname: "countryname",
    },
    deleteImgAltText: "delete",
    viewBtn: "view",

    btnClose: "Close",
    Alerttitle: "Alert Message",
    onBusinessNameEmpty: "Please enter a Business Name!",
    onBusinessLevelEmpty: "Please select a valid Business Level!",
    onBusinessIDvalidation: "Business ID should be in Digits!",
    downArrow: "downArrow",
    upArrow: "upArrow",
    completed: "completed",
    CurrentDeployedLevel: "Current Deployed Level: ",
    Ultimate: "Ultimate",
    Search: "Search",
    mcadValidation: "You may only select up to ",
    mcadsNo: " MCADs",
    searchTitle: "Click to open the search box",

    Button1: {
      id: "Button1",
      label: "Search",
    },
  },

  MCADlookupscreen: {
    sameBusinessAlert:
      "The Business Level of the account you're copying is not the same as your previous selections. \nDo you want to delete your previous selections before proceeding?",
    BusinessName: "Business Name:",
    BusinessID: "Business ID:",
    BusinessLevel: "Business Level:",
    ParentBusinessName: "Parent Business Name:",
    ParentBusinessID: "Parent Business ID:",
    UltimateBusinessName: "Ultimate Business Name:",
    UltimateBusinessID: "Ultimate Business ID:",
    GlobalBusinessID: "Global Business ID:",
    StreetAddress: "Street Address:",
    City: "City: ",
    StateProvince: "State/Province:",
    Zipcode: "Zip code:",
    PrimarySICDescription: "Primary SIC Description:",
    SiteEmployeeNumber: "Site Employee Number: ",
    AreaCode: "Area Code: ",
    PhoneNumber: "Phone Number:",
    duplicateDataAlert: "already copied",
    PrimaryNAICSDescription: "Primary NAICS Description:",
    LocationDescription: "Location Description:",
    CompanyType: "Company Type:",
    CBSACodeDescription: "CBSA Code Description:",
    searchForName: "search_for_name",
    closeImgTitle: "OK - Close Message Box",
    ContentType: "application/x-www-form-urlencoded",
    noResultDetailsFound: "Error when retrieving data from the server!",
    loadingMcadDetailMessage: "Please wait loading ",
  },

  MCADResultData: {
    tableColumns: {
      CompanyName: {
        field: "businessname",
        header: "Company Name",
      },
      CompanyType: {
        field: "siccode1desc",
        header: "Company Name",
      },
      Parent: {
        field: "child_count",
        header: "Parent(s)",
      },
      Sites: {
        field: "child_count",
        header: "Site(s)",
      },
      Location: {
        field: "location",
        header: "Location",
      },
    },
  },

  SearchData: {
    tableColumns: {
      id: {
        field: "infoid",
      },
      CompanyName: {
        field: "CompanyName",
        header: "Company Name",
      },
      CompanyType: {
        field: "CompanyType",
        header: "Company Type",
      },
      Parents: {
        field: "Parents",
        header: "Parent(s)",
      },
      Location: {
        field: "Location",
        header: "Location",
      },
    },
  },
  initialState: {
    accounts: [
      {
        infoid: null,
        id: "",
        CompanyName: "",
        CompanyType: "",
        BusinessLevel: "",
        Country: "",
        BusinessName: "",
        Parents: "",
        Location: "",
      },
    ],

    McadResult: {
      McadResultList: [
        {
          accountrecid: 0,
          businessid: null,
          businessname: null,
          parentbusinessid: 0,
          ultimatebusinessid: null,
          globalbusinessid: 0,
          cityname: null,
          stateabbrev: null,
          state: null,
          countrycode: null,
          siccode1desc: null,
          account_nat_key: 0,
          child_count: 0,
          businesslevelcode: null,
          location: null,
          childbusinesslevelcode: null,
          childbusinessleveldesc: null,
          businessleveldesc: null,
          isSelected: false,
          isMoved: false,
        },
      ],
    },
    MCADlookupInfo: {
      accountInfo: {
        data: {},
      },
      mcadDropDowns: {
        countries: [
          {
            data: [],
          },
        ],
      },
      mcadOracleDataList: [],

      maxMCADLink: {},
      mcadSearch: {
        data: [],
      },
      businessLevelDropDowns: {
        businessLevelList: {
          data: [],
        },
      },
    },

    updatedCheckedState: [],

    mcadAccountDetails: {
      mcadAccountDetaisList: {
        streetaddress: null,
        zipcode: null,
        zipfourcode: null,
        latitude: null,
        longitude: null,
        siccode1: null,
        siteemployeenumber: null,
        areacode: null,
        phonenumber: null,
        lastupdated: null,
        suite: null,
        empalllocations: null,
        primarynaicsdesc: null,
        primarynaicscode: null,
        fortune100flag: null,
        locationcode: null,
        locationdesc: null,
        companytypecode: null,
        companytypedesc: null,
        cbsacodeid: null,
        cbsacodedesc: null,
        businessid: null,
        businessname: null,
        parentbusinessid: null,
        ultimatebusinessid: null,
        globalbusinessid: null,
        cityname: null,
        state: null,
        countrycode: null,
        siccode1desc: null,
        account_nat_key: null,
      },
    },

    McadResultValue: [],

    McadResultValueListFinal: {
      McadResultValue: [],
    },
    leftTableData: {},

    isCheckedData: [],

    onRightClickedValueList: {
      onRightClickedValue: [],
    },
    businessLevelDropDowns: {
      businessLevelList: [
        {
          businessLevelval: 0,
          businessLeveltext: "*",
        },
        {
          businessLevelval: "U",
          businessLeveltext: "Ultimate",
        },
        {
          businessLevelval: "P",
          businessLeveltext: "Parent",
        },
      ],
    },
    businessLevelDropDownsID: {
      businessLevelList: [
        {
          businessLevelval: 0,
          businessLeveltext: "*",
        },
        {
          businessLevelval: "P",
          businessLeveltext: "Parent",
        },
        {
          businessLevelval: "U",
          businessLeveltext: "Ultimate",
        },
      ],
    },
    newChecked: [],
    selected: [],

    setMcadData: {
      searchtype: "search_for_name",
      businessName: null,
      businessLevel: null,
      businessLevelID: null,
      countryRegion: "US",
      ddnBusinessId: null,
      ddnbusinessID: null,
    },
    modalTitle: null,
    isCompleteMcadAccountDetails: false,
    onshowModal: false,
    renderLoading: null,
    isComplete: false,
    isSearchFlag: true,
    isMcadLookUpComplete: false,
    radio: "searchByName",
    onSearchButtonClicked: false,
    onShowMcadAccountDetails: false,
    onShowParentLinkData: false,
    onRightSideData: false,
    ondatatableVisible: false,
    isbusinessNameEmpty: false,
    isBusinessLevelEmpty: false,
    onValidation: false,
    //@ts-ignore
    showDownArrow: true,
    isAlphabet: false,
    searchParent: false,
    mcadItemCounter: 0,
    onshowModalError: false,
    MCADCounter: false,
    onUltimateVisisble: false,
    period: 0,
    isDataSaved: false,
    McadResultValueData: [],
    accountrecid: null,
    postDataResult: {},
    onArrowBtnClicked: false,
    mcadDetailLoad: false,
    noData: false,
    currentLevel: null,
  },
};
export default Settings;
