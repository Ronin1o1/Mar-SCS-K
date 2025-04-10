const Settings = {
  api: {
    getRateNotesFacilityDetails:
      "/accountspecfacility/getAccountSpecificFacility",
    updateRateNotesFacilityDetails: "/accountspecfacility/updatefacility",
    getSelectFacilityDetails:
      "/hotelaccountfacility/getHotelAccountFacilityInfoAction",
  },
  pricingContact: {
    facilityName: {
      label: "Facility Name",
      id: "facilityName",
      name: "facilityName",
    },
    streetAddress: {
      label: "Street Address",
      id: "streetAddress",
      name: "streetAddress",
    },
    city: {
      label: "City",
      id: "city",
      name: "city",
    },
    stateprovince: {
      label: "State / Province",
      id: "stateprovince",
      name: "stateprovince",
    },
    postalcode: {
      label: "Postal Code",
      id: "postalcode",
      name: "postalcode",
    },
    countryregion: {
      label: "Country / Region",
      id: "countryregion",
      name: "countryregion",
    },
    distance: {
      label: "Distance",
      id: "distance",
      name: "distance",
    },
    directions: {
      label: "Directions",
      id: "directions",
      name: "directions",
    },
    shuttleCostOneWay: {
      label: "Shuttle Cost One Way",
      id: "shuttlecostoneway",
      name: "shuttlecostoneway",
    },
  },
  labels: {
    rateNotes: "Rate Notes",
    internalUse:
      "Rate notes are typically for internal use only, used by the account manager to support your proposal. However, notes may be shared with a customer as appropriate. Please use this space to explain your bid, present any extra services or amenities that the hotel is interested in offering the account.",
    lastUpdated: "Last updated :",
    nearestFacility: "Nearest Facility",
    enterDetails:
      "Please enter the location, distance and directions to the nearest facility of this company.",
    possibleFacilities:
      "You may also click on the button below to view a list of possible facilities near your property, and from there you can choose the nearest facility.",
    nearestFacilityTitle: "Nearest Facilites",
    nearestFacilityReport: "Marriott International Nearest Facility Report",
    nearestFacilityInstruction:
      "Please select the location to populate the nearest facility information on the account specific screen.",
    nearestFacilityWarning:
      "Please be sure to complete the directions information as well.",
    loadingMessage: "Please wait loading...",
    cityStatePostal: "City, State, Postal Code",
    noOfEmp: "# of Employees",
    phoneNumber: "Phone Number",
    typeBusiness: "Type of Business",
    alertMsg: "Please enter all of the Nearest Facility information.",
  },
};
export default Settings;
