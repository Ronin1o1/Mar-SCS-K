const Settings = {
  api: {
    getHotelAccountBlackoutUpdate:
      "/hotelaccountblackout/getHotelAccountBlackoutUpdate",
    getHotelAccountBlackout: "/accountspecblack/getSpecificBlackoutData",
    updateHotelAccountBlackout: "/accountspecblack/updateBlackouts",
  },
  alertMessage: {
    enterEndDate: "You must enter the ending date for the blackout.",
    enterStartDate: "You must enter the starting date for the blackout.",
    enterBlackoutName: "You must enter the reason for the blackout.",
    invalidDate:
      "  is not a valid date.  Please enter the date in the format mm/dd/yyyy",
    startDateOnOrAfter:
      "The start date must be on or after the contract start date.",
    endDateOnOrAfter:
      "The end date must be on or before the contract end date.",
    startDateOnOrBefore:
      "The start date must be on or before the contract end date.",
    mustNotInBetween: " must not be between any blackout dates",
    endDateOnAfterStartDate: "The end date must be after the start date.",
    startDateMustNotBetween:
      "The start date must not be between any blackout dates.",
    endDateMustNotBetween:
      "The end date must not be between any blackout dates.",
    dateOverlap:
      "The blackout dates must not overlap any other blackout dates.",
    endDateOnOrBeforeOriginalDate:
      "The end date must be on or before the original end date. ( ",
    startDateOnOrAfterOriginalDate:
      "The start date must be on or after the original startdate. ( ",
  },
  errorMessage: "No response received from API.",
  errorResponse: "Error response received from API",
  waiveBlackout: "Waive blackouts for this account",
  periodstart: "01/01/",
  periodend: "12/31/",
  dateFormat: /^[0-9\.\-\/]+$/,
  fields: {
    fromText: "From",
    toText: "To",
    reasonText: "Reason",
    longDateText: "Long Date",
    totalDays: "Total Days:",
    noCache: "no-cache",
    urlencode: "application/x-www-form-urlencoded",
    content_Type: "content-type",
  },
  startDateTitle: "Enter the starting Blackout day in the format: mm/dd/yyyy",
  endDateTitle: "Enter the ending Blackout day in the format: mm/dd/yyyy",
  blackNameTitle: "Blackout 1 Name",
  longDateFormat: "MMMM DD, YYYY",
  shortDateFormat: "MM/DD/YYYY",
  startDate: "startDate",
  endDate: "endDate",
  strStartdate: "strStartdate",
  strEnddate: "strEnddate",
  startDateWithSpace: "start date",
  endDateWithSpace: "end date",
  name: "name",
  searchtype: "searchtype",
  filterString: "filterString",
  hotel_accountinfoid: "AccountInfoId",
  isLocked: "isLocked",
  Period: "Period",
  Hotelrfpid: "Hotelrfpid",
  MarshaCode: "MarshaCode",
  totalBlackouts: "totalBlackouts",
  blackoutid: "blackoutid",
  blackname: "blackname",
  hotelId: "HotelId",
  accountInfoId: "AccountInfoId",
  accountStatus: "accountStatus",
};
export default Settings;
