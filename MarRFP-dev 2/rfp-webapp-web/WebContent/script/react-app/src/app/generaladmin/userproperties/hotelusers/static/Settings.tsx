const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    getHotelUsersUrl: "/userhotelaccess/getUserHotelAccessList",
    updateHotelUsersUrl: "/userhotelaccess/updateStatus",
    getUserListDialog: "/userlistdialog/getUserListDialog",
    editHotelUser: {
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
    hotesUserHeading: "Current List of Authorized MarRFP Users:  Hotel Users",
    properties: "Properties",
    enhancedReporting: "Enhanced Reporting",
    radioSelect: "radioSel",
    region: "Region",
    brand: "Brand",
    franchise: "Franchise",
    allProperties: "All Properties",
    selectRegion: "Select Region(s):",
    hotellistAlt: "Add Hotel to User Access List.",
    selectBrand: "Select Brand(s):",
    selectFranchise: "Select a Franchise:",
    enhancedSalesContact: "Enhanced Sales Contact",
    selectProp: "Select Properties",
    noDataFound: "No Data Found!!",
    allPropertiesSelected: "ALL Properties Selected!!",
    totalProperties: "Total Properties: ",
    returnAccessList: "Return to User Access List",
    availProp: "Available Properties",
    unselectAllProp: "Unselect All Shown Properties.",
    quickSelect: "Quick Select",
    selectAll: "Select All",
    userList: "User List",
    currentAuthorizedList:
      "Current List of Authorized MarRFP Users - Hotel Users ",
    loadingMessage: "Please wait loading...",
    showAllUsers: "Show ALL Users",
    sortBy: "Sort by: ",
    startingWith: "starting with: ",
    changesSaved: "Changes saved successfully!",
    allValue: "ALL",
    lastNameValue: "LASTNAME",
    filterValue: "FILTER",
    marshaCodeListFor: "MARSHA Code List for ",
    brandShort: "B",
    regionShort: "R",
    franchiseShort: "F",
    allHotelsShort: "H",
    propertyShort: "P",
    availPropText: "availProperty",
    selectPropText: "selectProperty",
    showAllMarshaCodes: "Show ALL Marsha Codes",
    filterBy: "Filter By",
  },
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
    quickSelectMsg: "The following MARSHA codes were not found",
    switchToCopy:
      "Are you sure you want to Copy from other User? Any linked Regions, Brands and Franchises will be deleted. Click OK to continue, or Cancel to go back.",
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
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
    radio: "radio",
    hidden: "hidden",
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
    marshacode: {
      field: "marshacode",
      header: "MARSHA Code",
    },
    enhanced_reporting: {
      field: "enhanced_reporting",
      header: "Enhanced Reporting",
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
};
export default Settings;
