const Settings = {
  api: {
    getEdieProfileList: "/edieprofilelist/getEdieProfiles.action",
    deleteProfile: "/edieprofilelist/deleteProfile.action",
  },

  route: {
    editProfile: "editProfile",
  },
  title: "Pricing / EDIE : EDIE Profile List",

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
  confirmDelete: "Are you sure you want to delete this profile?",
};
export default Settings;
