const Settings = {
  api: {
    getHotelSelect: "/pricinghotelselect/getHotelSelect.action",
    gethotelrespondent:
      "/hotelrespondent/getHotelRespondent.action?marshaCode=ABCHI&hotelName=AB%20China&period=2020",

    getNobidReson:
      "/hotelnobidreason/getNobidReason.action?&currentNobidReasonid=0&currentHaccid=158859688&dojo.preventCache=1629277381654",
    getAccountGridList: "/hotelcentralaccountcenter/getHotelAccountCenter",

    urlencode: "application/x-www-form-urlencoded",
  },

  route: {
    priceContact: "hotelPricing",
  },

  marshaCode: {
    id: "marshaCode",
    name: "marshaCode",
  },

  marshaCodeFind: {
    id: "marshaCodeFind",
    name: "marshaCodeFind",
  },
  label: {
    btPrice: "BT Pricing",
    selectProperty: "Please select a Property:\n\n",
    propertySelectDefoultOption: "Please Select a Property\n\n",
    propertyCodeInter: "Or enter a Property code:",
  },
  period: {
    identifier: "period",
    items: [
      { period: 2022 },
      { period: 2021 },
      { period: 2020 },
      { period: 2019 },
      { period: 2018 },
      { period: 2017 },
      { period: 2016 },
      { period: 2015 },
    ],
    numRows: null,
    totalRecordsFound: null,
  },
  loaderMessage: "Please wait loading...",
  pleaseSelect: "Please Select a Property",
  year20202: "2020",
  alertMsgs: {
    alert1:
      "For the 2020 pricing period, the automated rate load functionality from MarRFP to HPP / MARSHA has been turned off.  \n\nThis means that any changes made in MarRFP for the 2020 pricing period will also need to be manually made in HPP / MARSHA, as necessary.",
    alert2: "Please select a period.",
    invalidAlert:
      "Invalid Marshacode.  Please enter a marshacode that you have access to.",
    selectProperty: "Please select a property",
  },
  parentRoute: "/pricinghotelselect",
};
export default Settings;
