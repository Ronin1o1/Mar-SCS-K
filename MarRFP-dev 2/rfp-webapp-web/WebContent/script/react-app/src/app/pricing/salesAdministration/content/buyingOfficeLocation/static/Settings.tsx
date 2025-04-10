const Settings = {
  api: {
    getAcctLocations: "/acctlocations/getAcctLocations",
    getEditLoaction: "/editLocation/getEditLocation",
    updateLocation: "/editLocation/updateLocation",
    deleteLocation: "/editLocation/deleteLocation",
    updateAcctLocations:
      "/acctlocations/updateAcctLocations?nextUrl=/acctlocations/view",
  },
  common: {
    numberRegex: /^[0-9\b]+$/,
  },
};
export default Settings;
