const Settings = {
  api: {
    getBlackoutList: "/hotelblackout/getHotelRFPBlackout.action",
    postBlackoutList: "/hotelblackout/updateHotelBlackout.action",
  },
  seasonId: 1,
  periodstart: "01/01/",
  periodend: "12/31/",
  dateFormat: /^[0-9\.\-\/]+$/,
  RequiredEndDate: "You must enter the ending date for the blackout.",
  RequiredStartDate: "You must enter the starting date for the blackout.",
  RequiredReason: "You must enter the reason for the blackout.",
  DateTitle: "Enter the starting Blackout day in the format: mm/dd/yyyy",
  totalTitle: "Total number of blackout days",
  ReasonTitle: "Blackout",
  ReasonName: "Name",
  longDateFormat: "MMMM DD, YYYY",
  mmddyyyy: "MM/DD/YYYY",
  fields: {
    description: `Enter up to ten date ranges to define your hotel's blackout dates. 
      Rates quoted will not apply during this period. Please refer to the Account 
      Overviews for the account blackout date requirements.`,
    fromText: "From",
    toText: "To",
    reasonText: "Reason",
    longDateText: "Long Date",
    totalDays: "Total Days:",
    noCache: "no-cache",
    urlencode: "application/x-www-form-urlencoded",
  },
};

export default Settings;
