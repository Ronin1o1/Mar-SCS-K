const Settings = {
  api: {
    getEdieProfileList: "/edieprofileadd/getEdieProfilesList.action",
    addProfile: "/edieprofileadd/addProfile.action"
  },
  nextURL: '/editProfile',
  validation: 'Please enter a profile name.',
  title: 'Pricing / EDIE : EDIE Profile Add',

  edieProfileAdd: {
    title: "Edie Profile Add",
    blankProfile: "Make a blank profile",

    profileName: {
      label: "Profile Name :",
      id: "ProfileName",
    },
    copyFromExistingProfile: {
      label: "Copy from existing profile:",
      id: "CopyFormexistingProfile",
      keyField: "profile_id",
      valField: "profile_name",
    },
   

  },
};
export default Settings;