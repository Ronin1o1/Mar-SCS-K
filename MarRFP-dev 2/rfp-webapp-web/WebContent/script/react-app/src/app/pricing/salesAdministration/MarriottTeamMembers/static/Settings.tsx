const Settings = {
  api: {
    getPeriods: "/acctselect/getAcctSelect",
    getAcctContacts: "/acctcontacts/getAcctContacts",
    updateAcctContacts:
      "/acctcontacts/updateAcctContacts?nextUrl=/acctcontacts/view",
  },

  marriottTeamMembers: {
    modalHeading: "Alert Message",
    addAlert: "Please select the contact type to add",
    emailAlert: "Please enter a valid email.",
    availableContactTypes: "Available contact types:",
    nameHeader: "Name",
    titleHeader: "Title",
    phoneHeader: "Phone",
    emailHeader: "Email",
  },
  blankContact: {
    contactTypeID: "",
    heading: "",
  },
  commonContent: {
    re_phone_number: /(^[0-9]+$|[-]$|[0-9]+$|^$)/,
  },
};
export default Settings;
