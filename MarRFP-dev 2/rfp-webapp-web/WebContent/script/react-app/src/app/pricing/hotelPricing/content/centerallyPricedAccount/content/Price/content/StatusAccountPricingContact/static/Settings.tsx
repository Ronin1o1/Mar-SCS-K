const Settings = {
  api: {
    getStatusAccountDetails: "/accountspecstatus/getAccountSpecficStatusTab",
    updateStatusAccountDetails: "/accountspecstatus/updateStatus",
  },
  pricingContact: {
    name: {
      label: "Contact Name",
      id: "hotelRFPRespondent.personname",
      name: "hotelRFPRespondent.personname",
    },
    email: {
      label: "Contact Email",
      id: "hotelRFPRespondent.email",
      name: "hotelRFPRespondent.email",
    },
    countryCode: {
      label: "Contact Country Code",
      id: "hotelRFPRespondent.countrycode",
      name: "hotelRFPRespondent.countrycode",
    },
    cityCode: {
      label: "Contact Area/City Code",
      id: "hotelRFPRespondent.areacitycode",
      name: "hotelRFPRespondent.areacitycode",
    },
    contactPhone: {
      label: "Contact Phone",
      id: "hotelRFPRespondent.phonenumber",
      name: "hotelRFPRespondent.phonenumber",
    },
  },
  tabList: [
    { id: "statusAccount", label: "Status & Account\nPricing Contact" },
    { id: "rateRules", label: "Rates &\nRules" },
    { id: "eligibilityAmenity", label: "Eligibility &\nAmenities" },
    { id: "CompellingBusiness", label: "Compelling\nBusiness Case" },
    { id: "btAndGroupAccount", label: "BT &Group\nAccount Questions" },
    { id: "blackouts", label: "Blackouts" },
    { id: "rateNotes", label: "Rate Notes\n& Facility" },
  ],
  alertMessage: "Please enter all of the sales contact information.",
};
export default Settings;
