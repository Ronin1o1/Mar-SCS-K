const Settings = {
  api: {
    getColumnDescription: "/edieprofileedit/getColumnDescription.action",
    getEdieProfileDetails: "/edieprofileedit/getEdieProfileDetails.action",
    getAvailableColumnsList: "/edieprofileedit/getAvailableColumnsList.action",
    update: "/edieprofileedit/update.action",
  },

  route: {
    editProfile: "editProfile",
  },
  pageTitle: "Pricing / EDIE : EDIE Profile Edit",

  urlencode: "application/x-www-form-urlencoded",
  maxColumns: 850,
  title: "Alert Message",
  maxLengthValidation:
    "You may only select up to 850 for the EDIE report at one time",
  edieProfileNameList: {
    NewImgAltText: "New Button",
    tableColumns: {
      id: {
        field: "profile_id",
      },
      profileName: {
        field: "profile_name",
        header: "Profile Name",
      },
    },
  },
  editEdieProfileList: {
    title: "EDIE Profile Name",
  },
  quickSelect: "Quick Select",
  quickSelectObject: {
    label: "Edie # List:",
    textareaId: "seqlist",
    row: 10,
    cols: 100,
    textareaName: "seqlist",
  },
  showAll: {
    id: "c_1",
    label: "Show ALL Columns",
    name: "r_1",
  },
  showMatching: {
    id: "c_1",
    label: "Show Columns with Labels containing:",
    name: "r_1",
  },
  profileName: "Profile Name:",
  findEdie: "Find Edie #: ",
  nextURL: "editProfile",
  edieNotFound: `The following EDIE #'s were not found\n`,
  notFound: " was not found",
  maxEDIE: `Please enter only 200 EDIE #'s at a time.`,
  regexValidation: "Please enter only numbers seperated by a ,",
  mandatoryProfileName: "Please enter a profile name",
};
export default Settings;
