const Settings = {
  api: {
    getEdieHotelProfiles: "/ediehotelprofilelist/getEdieHotelProfiles.action",
    deleteProfile: "/ediehotelprofilelist/deleteProfile.action",
    addProfile: "/ediehotelprofileadd/addProfile.action",
    updateProfileName: "/ediehotelprofilename/updateProfileName.action",

    showFilterOptions: "/ediehotelprofile/getEdieHotelProfileFilter.action",
    getFilterViewLists: "/ediehotelprofile/getFilterViewLists.action",
    getHotelProfileEdie: "/ediehotelprofile/getHotelProfileEdie.action",
    getEdieHotelProfileNames:
      "/ediehotelprofilename/getEdieHotelProfileNames.action",

    getHotelProfileAvail: "/ediehotelprofileavail/getHotelProfileAvail.action",
    getHotelProfileAvailFilter:
      "/ediehotelprofileavail/getHotelProfileAvail.action",
    getEdieHotelProfileFindFilter:
      "/ediehotelprofilefindfilter/getEdieHotelProfileFindFilter.action",
    getHotelProfileSelect:
      "/ediehotelprofileselect/getHotelProfileSelect.action", //Get
    getHotelProfileSelectSelected:
      "/ediehotelprofileselect/getHotelProfileSelect.action", // Post
    setEdieHotelProfileAvailUpdate: "/ediehotelprofileavail/update.action",
    setEdieHotelProfileselectUpdate: "/ediehotelprofileselect/update.action",
  },

  edieHotelProfileList: {
    pageTitle: "Pricing / EDIE : EDIE Hotel Profile List",

    tableColumns: {
      profileName: {
        id: "profile_id",
        fieldName: "profile_name",
        header: "Profile Name",
      },
    },
    edieHotelProfileListPath: "/edieHotelProfileList",
    edieHotelProfileAddPath: "/edieHotelProfileAdd",
    edieHotelProfileNamePath: "/edieHotelProfileName",
    edieHotelProfileViewPath: "/edieHotelProfileView",
    editediehotelprofile: "/editediehotelprofile",
  },
  addProfile: {
    pageTitle: "Pricing / EDIE : EDIE Hotel Profile Add",
    formField: {
      profile_id: "profile_id",
    },
  },
  changeProfileName: {
    pageTitle: "Pricing / EDIE : EDIE Hotel Profile Change Name",
  },
  viewHotelProfile: {
    pageTitle: "Pricing / EDIE : Hotel Profile",
  },
  hotelProfileAvail: {
    getHotelProfileAvail: "getHotelProfileAvail",
    getHotelProfileSelect: "getHotelProfileSelect",
  },
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
  },
  tableColumns: {
    hotelid: {
      field: "hotelid",
    },
    hotelidCheckbox: {
      field: "hotelid",
    },
    marshacode: {
      field: "marshacode",
      header: "MARSHA",
    },
    hotelname: {
      field: "hotelname",
      header: "Name",
    },
    city: {
      field: "city",
      header: "City",
    },
    state: {
      field: "state",
      header: "State/</br>Province",
    },
    country: {
      field: "country",
      header: "Country/</br>Region",
    },
  },
  componentName: "EdieHotelProfileList",
  gridTR: "gridTR",
  selectedValue: "selectedValue",
  availableValue: "availableValue",
  quickSelectObject: {
    label: "Hotel List:",
    textareaId: "hotellist2",
    rows: 10,
    cols: 100,
    textareaName: "hoteldlist2",
  },
  // availGridHeight: "200px",
  availGridHeight: "175px",
  availGridWidth: "589px",
  scrollAvailGridHeight: "200px",
  //selectGridHeight: "200px",
  selectGridHeight: "175px",
  selectGridWidth: "589px",
  scrollSelectGridHeight: "200px",
  success: "success",
  topGridLabel: "Hotels matching criteria",
  bottomGridLabel: "Hotels in profile for ",

  urlencode: "application/x-www-form-urlencoded",
  noCache: "no-cache",
};
export default Settings;
