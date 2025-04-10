const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    getLimitedSalesUsersUrl: "/userlimitedsalesaccess/getUserAccessList",
    updateLimitedSalesUsersUrl: "/userlimitedsalesaccess/updateStatus",
    getUserListDialog: "/userlistdialog/getUserListDialog",
    editAccountUser: {
      populateAccounts:
        "/usereditlimitedsalesaccess/getUserEditLimitedSalesAccess",
      updateAccount: "/useredit/updateAccount",
      deleteAccount: "/useredit/deleteAccount",
      updateSelAcct: "/useredit/updateSelAcctList",
      searchAvailAcctList: "/useredit/updateAvailAcctList",
    },
    editLimitedUser: {
      populateProperty: "/useredit/getUserEdit",
      updateProperty: "/useredit/updateProperty",
      deleteProperty: "/useredit/deleteProperty",
      resetRegions: "/useredit/resetRegionList",
      resetBrands: "/useredit/resetBrandList",
      resetFranchises: "/useredit/resetFranchiseList",
      searchAvailPropList: "/useredit/updateAvailPropList",
      updateBrands: "/useredit/updateBrndList",
      updateRegions: "/useredit/updateRegnList",
      updateFranchise: "/useredit/updateFranchList",
      updateAllProperties: "/useredit/updateAllProperties",
      updateSelPropList: "/useredit/updateSelPropList",
      userEditCopy: "/usereditcopy/getUserEditCopy",
      searchUserEditCopy: "/usereditcopy/getUserEditCopy",
      searchUserEditUpdate: "/usereditcopy/userEditCopyUpdate",
      populatePropertyList: "/useredit/populatePropList",
    },
  },
  labels: {
    titleLimitedSalesUsers:
      "Current List of Authorized MarRFP Users: Limited Sales Users",
    account: "Account",
    selectAccount: "Select Accounts",
    noDataFound: "No Data Found!!",
    allAccountsSelected: "ALL Accounts Selected!!",
    availAccount: "Available Accounts",
    totalAccounts: "Total Accounts: ",
    typeTitle: "Type: ",
    segmentTitle: "Segment: ",
    accountTypeParam: "All Account Types",
    accountSegmentParam: "All Account Segments",
    showAllAccounts: "Show ALL Accounts",
    showAccountsStart: "Show Accounts starting with: ",
    unselectAllAcct: "Unselect All Shown Accounts.",
    returnUserList: "Return to User List",
    userList: "User List",
    loadingMessage: "Please wait loading...",
    currentAuthorizedList:
      "Current List of Authorized MarRFP Users - Limited Sales Users ",
    changesSaved: "Changes saved successfully!",
    errorMessage: "Error in saving the record.",
    successMessage: "Success Message",
    alertMessage: "Alert Message",
    closeTitle: "OK - Close Message Box",
    maxLengthAlertMessage: "You are allowed to enter up to 100 characters.",
    marshaCodeOrAccountListFor: "MARSHA code/Account List for ",
    brandShort: "B",
    regionShort: "R",
    franchiseShort: "F",
    allHotelsShort: "H",
    propertyShort: "P",
    region: "Region",
    brand: "Brand",
    franchise: "Franchise",
    allProperties: "All Properties",
    accountName: "Account Name",
    marshaCode: "MARSHA Code",
    hotellistAlt: "Add Hotel to User Access List.",
    showAllUsers: "Show ALL Users",
    sortBy: "Sort by: ",
    startingWith: "starting with: ",
    allValue: "ALL",
    lastNameValue: "LASTNAME",
    filterValue: "FILTER",
    eid: "EID",
    lastName: "Last Name",
    properties: "Properties",
    enhancedReporting: "Enhanced Sales contact",
    radioSelect: "radioSel",
    selectRegion: "Select Region(s):",
    selectBrand: "Select Brand(s):",
    selectFranchise: "Select a Franchise:",
    enhancedSalesContact: "Enhanced Sales Contact",
    selectProp: "Select Properties",
    allPropertiesSelected: "ALL Properties Selected!!",
    totalProperties: "Total Properties: ",
    returnAccessList: "Return to User Access List",
    availProp: "Available Properties",
    unselectAllProp: "Unselect All Shown Properties.",
    quickSelect: "Quick Select",
    selectAll: "Select All",
    showAllMarshaCodes: "Show ALL Marsha Codes",
    showMarshaCodeStartsWith: " Show MARSHA Code starting with:",
    filterBy: "Filter By",
    availPropText: "availProperty",
    selectPropText: "selectProperty",
  },
  ids: {
    regionId: "hotelListRegionScrollContainer",
    hotelBasedOnBrandId: "hotelBasedOnBrandScrollContaner",
    hotelsBasedOnFranchiseId: "hotelsBasedOnFranchiseScrollContainer",
    PropertiesId: "hotelAllPropertiesScrollContainer",
    hotelListId: "hotellistScrollContainer",
    hotelListAllId: "hotellistAllScrollContainer",
    regionDivId: "regionDiv",
    userEditCopyListId: "userEditCopyList",
  },
  tableColumns: {
    eid: {
      field: "eid",
      header: "EID",
    },
    lname: {
      field: "cn_lastname",
      header: "Last Name",
    },
    fname: {
      field: "cn_firstname",
      header: "First Name",
    },
    city: {
      field: "cn_city",
      header: "City",
    },
    stateprovince: {
      field: "cn_state",
      header: "State/Province/\nCountry/Region",
    },
    companyname: {
      field: "companyname",
      header: "Company Name",
    },
    accountormarshacode: {
      field: "marshacode",
      header: "Accounts/\nMARSHA Code",
    },
    phoneno: {
      field: "cn_phone",
      header: "Phone Number",
    },
    email: {
      field: "cn_mail",
      header: "Email",
    },
    internalNotes: {
      field: "user_internalnotes",
      header: "Internal Notes",
    },
  },
  inputType: {
    checkbox: "checkbox",

    button: "button",

    input: "input",

    radio: "radio",

    hidden: "hidden",
  },
  dropDownOptions: [
    {
      id: "1",
      value: "EID",
    },
    {
      id: "2",
      value: "Last Name",
    },
    {
      id: "3",
      value: "First Name",
    },
    {
      id: "4",
      value: "City",
    },
    {
      id: "5",
      value: "State/Province/Country/Region",
    },
    {
      id: "8",
      value: "Company Name",
    },
  ],
  alerts: {
    switchToProperty:
      "Are you sure you want to switch to Properties? Any Franchise, Regions or Brands assigned will be deleted. Click OK to continue, or Cancel to go back.",
    switchToRegion:
      "Are you sure you want to switch to Region? Any Franchise, Properties or Brands assigned will be deleted. Click OK to continue, or Cancel to go back.",
    switchToBrand:
      "Are you sure you want to switch to Brand? Any Franchise, Regions or Properties assigned will be deleted. Click OK to continue, or Cancel to go back.",
    switchToFranchise:
      "Are you sure you want to switch to Franchise? Any Brands, Regions or Properties assigned will be deleted. Click OK to continue, or Cancel to go back.",
    switchToAllProperties:
      "Are you sure you want to select All Properties? Click OK to continue, or Cancel to go back.",
    switchToCopy:
      "Are you sure you want to Copy from other User? Any linked Regions, Brands and Franchises will be deleted. Click OK to continue, or Cancel to go back.",
    quickSelectMsg: "The following MARSHA codes were not found",
    onlyCommaSeperated: "Please enter only marshacodes seperated by a ,",
    enterHundredHotelsOnly: "Please enter only 100 hotels at a time.",
    enterHundredCharsOnly: "You are allowed to enter up to 100 characters.",
    showMarshaCodeStartsWith: " Show Marsha Code starting with:",
  },
  quickSelectObject: {
    label: "Hotel List:",
    quick_select: {
      id: "hoteldlist2",
      name: "hoteldlist2",
      value: "",
    },
    row: 10,
    cols: 100,
    textareaName: "hoteldlist2",
  },
  searchDropDownOptions: [
    {
      id: "1",
      value: "EID",
    },
    {
      id: "2",
      value: "Last Name",
    },
    {
      id: "3",
      value: "First Name",
    },
  ],
  marshaSearchDropdownOptions: [
    {
      id: "O",
      value: "*",
    },
    {
      id: "M",
      value: "Managed",
    },
    {
      id: "F",
      value: "Franchise",
    },
  ],
  defaultSortBy: 1,
};
export default Settings;
