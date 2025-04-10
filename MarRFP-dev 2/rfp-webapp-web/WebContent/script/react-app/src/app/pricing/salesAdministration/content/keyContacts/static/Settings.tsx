const Settings = {
  api: {
    getKeyContacts: "/keycontacts/getKeyContacts.action",
    postKeyContacts: "/keycontacts/updateKeyContacts.action",
    getEditKeyContact: "/editKeyContact/getEditKeyContact.action",
    updateKeyContact: "/editKeyContact/updateKeyContact.action",
    deleteKeyContact: "/editKeyContact/deleteKeyContact.action",
  },
  screenText: {
    screenTitle: "SAPP: Key Contacts Buyer",
    revenueStream: "Revenue Stream",
    globalRegion: "Global Region",
    relationshipToAccount: "Relationship to the Account",
    companyName: "Company Name",
    name: "Name",
    title: "Title",
    address: "Address",
    city: "City",
    state: "State",
    province: "Province",
    countryRegion: "Country/Region",
    zipPostalCode: "Zip/Postal Code",
    phone: "Phone",
    email: "Email",
    typeOfBuyer: "Type of Buyer",
    areaOfResponsibility: "Area of Responsibility",
    industryMembership: "Industry Membership",
    comments: "Comments",
    contactName: "Contact Name",
    contactTitle: "Contact Title",
    stateProvice: "State/Province",
    US: "US",
    alertMessage: "Alert Message",
  },
  emailValidationRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  re_phone_number: /(^[0-9]+$|[-]$|[0-9]+$|^$)/,
  alert: {
    nameNotNull: `'Name' cannot be null.`,
    deleteConfirmation:
      "Are you sure you want to delete this data?\n\n(Please click OK to continue, CANCEL to stop)",
    countryChangeConfirmation:
      "State cannot be selected for country/region other than USA.\n\n(Please click OK to Change Country/Region and State as blank, CANCEL to remain)",
    areaOfResponsibilityValidation: `'Area of Responsibility' text cannot exceed 1024 characters.`,
    commentsValidation: `'Comments' text cannot exceed 1024 characters.`,
    membershipValidation: `'Industry Membership' text cannot exceed 150 characters.`,
  },
  accountRelationship: [
    {
      id: 0,
      value: "",
    },
    {
      id: "Internal Employee",
      value: "Internal Employee",
    },
    {
      id: "Outside Contractor",
      value: "Outside Contractor",
    },
  ],
  buyerType: [
    {
      id: 0,
      value: "",
    },
    {
      id: 1,
      value: "Central",
    },
    {
      id: 2,
      value: "Non-Central",
    },
  ],
};
export default Settings;
