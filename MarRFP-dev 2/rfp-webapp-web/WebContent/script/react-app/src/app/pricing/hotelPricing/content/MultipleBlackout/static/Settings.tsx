const Settings = {
  api: {
    getHotelAccountBlackout:
      "/hotelaccountblackout/getHotelAccountBlackoutUpdate",
    updateMultipleBlackoutsUrl: "/hotelaccountblackout/update",
  },
  alertMessage: {
    enterEndDate: "You must enter the ending date for the blackout.",
    enterStartDate: "You must enter the start date for the blackout.",
    enterBlackoutName: "You must enter the reason for the blackout.",
    invalidDate:
      "  is not a valid date.  Please enter the date in the format mm/dd/yyyy",
    startDateOnOrAfter:
      "The start date must be on or after the contract start date.",
    startDateOnOrBefore:
      "The start date must be on or before the contract end date.",
    endDateOnOrAfter:
      "The end date must be on or before the contract end date.",
    mustNotInBetween: " must not be between any blackout dates",
    dateOverlap:
      "The blackout dates must not overlap any other blackout dates.",
    endDateOnAfterStartDate: "The end date must be after the start date.",
    endDateOnOrAfterStartDate:
      "The end date must be on or after the contract start date.",
    endDateOnOrBeforeOriginalDate:
      "The end date must be on or before the original end date. ( ",
    startDateOnOrAfterOriginalDate:
      "The start date must be on or after the original startdate. ( ",
  },
  mmddyyyy: "MM/DD/YYYY",
  mdyyyy: "m/d/yyyy",
  mdyy: "m/d/yy",
  mmddyy: "MM/DD/YY",
  mmddyyy: "MM/DD/YYY",
  mdyy: "M/D/YY",
  mdyyyy: "M/D/YYYY",
  mdyyy: "M/D/YYY",
  mddyyy: "M/DD/YYY",
  startDate: "startdate",
  endDate: "endDate",
  startDateWithSpace: "start date",
  endDateWithSpace: "end date",
  name: "name",
  searchtype: "searchtype",
  filterString: "filterString",
  MarshaCode: "MarshaCode",
  HotelName: "HotelName",
  Period: "Period",
  Hotelrfpid: "Hotelrfpid",
  max_blackouts: 10,
  timeZone: "America/New_York",
};
export default Settings;
