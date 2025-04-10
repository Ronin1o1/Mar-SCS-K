const Settings = {
  title: "BT Pricing : Update Multiple Hotels",
  api: {
    getRoomTypeList: "/roomtypemaintenance/getRoomTypes.action",
    getFilterViewLists: "/hotelpgoosmaint/getFilterViewLists.action",
    getMultiHotelAccountCenter:
      "/multihotelaccountcenter/getMultiHotelAccountCenter.action",
    getNobidReson:
      "/hotelnobidreason/getNobidReason.action?&currentNobidReasonid=0&currentHaccid=158859688",
    postUpdate: "/multihotelaccountcenter/updateHotelAccountCenter",
    urlencode: "application/x-www-form-urlencoded",
    hotelAccountQuestions : "/pricinghotelselect/HotelAccountQuestions",
    getAccountOverViewReport:
    "/hotelaccountoverview/getHotelAccountOverviewReport.action",
  },
  parentRoute: "/pricinghotelselect",
};
export default Settings;
