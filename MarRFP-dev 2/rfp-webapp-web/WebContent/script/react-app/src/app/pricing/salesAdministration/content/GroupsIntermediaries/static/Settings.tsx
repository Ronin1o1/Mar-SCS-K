const Settings = {
  api: {
    getGroupsintermediaries: "/groupsintermediaries/getGroupsIntermediaries",
    updateGroupsIntermediaries:
      "/groupsintermediaries/updateGroupsIntermediaries",
  },

  groupsIntermediaries: {
    subHeading:
      "Please describe the account's use of traditional intermediaries in each area below.",
    contracting: "Contracting:",
    siteSection: "Site Selection:",
    housting: "Housing:",
    onSite: "Onsite:",
    fullService: "Full Service:",
    research: "Research:",
    other: "Other:",
  },
  validationMessages: {
    charExceedingAlert: "You are allowed to enter up to 1024 characters.",
    fullservice: "'Full Service' text cannot exceed 1024 characters.",
    contracting: "'Contracting' text cannot exceed 1024 characters.",
    siteselection: "'Site Selection' text cannot exceed 1024 characters.",
    housing: "'Housing' text cannot exceed 1024 characters.",
    onsite: "'Onsite' text cannot exceed 1024 characters.",
    research: "'Research' text cannot exceed 1024 characters.",
    other: "'Other' text cannot exceed 1024 characters.",
  },
  headingNames: {
    requiredFields: "* Required Fields are in red",
    modalHeading: "Alert Message",
    initiative: "Initiatives and Tasks:",
  },
};
export default Settings;
