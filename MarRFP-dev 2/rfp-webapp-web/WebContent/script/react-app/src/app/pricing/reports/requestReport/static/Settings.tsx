const Settings = {
  api: {
    getRequestReportFindFilter : "/pricingreportfilterfindfilter/getPricingReportFilterFindFilter.action",
    getRequestReportFilter : "/pricingreportfiltered/getPricingReportFilter.action",
    getFilteredHotelList : "/pricingreportfilterlist/getHotelFilteredList.action",
    runReport : "/pricingreportfilterlist/runReport.action",
    getFilterViewLists: "/pricingreportfiltered/getFilterViewLists.action",
    getCognosUrl: "/reports/getAppEnvDetails.action"
  },
  banner : "banner",
  RunDynamicReport : "/CognosMarRFP/RunDynamicReport",
  componentName : "requestReport",
  title : "Pricing Reports: Request a Report",
  urlencode : "application/x-www-form-urlencoded",
  noCache : "no-cache",
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
  },
  messagePage: {
    line1: "The request was successfully submitted to run.",
    line2: "View Reports",
    line21: "Goto ",
    line22: " to view the report.",
    line3: "Press the back button to go back to the hotel list."
  },
  tableColumns: {
    marshacode: {
      field: "marshaCode",
      header: "MARSHA",
    },
    hotelid: {
      field: "hotelid",
    },
    hotelidCheckbox: {
      field: "hotelidCheckbox",
    },
    hotelName: {
      field: "hotelName",
      header: "Name"
    },
    city: {
      field: "city",
      header: "City"
    },
    state: {
      field: "state",
      header: "State/</br>Province"
    },
    country: {
      field: "country",
      header: "Country/</br>Region"
    },
    futureopening: {
      field: "futureopening",
      header: "Pre-Opening"
    },
  },
  width630 : "625px",
  width631 : "630px",
  height540 : "583px",
  height510 : "551px",
  gridTR : "gridTR",
  quickSelectObject :  {
    label: "Hotel List:",
    textareaId: "hotellist2",
    row: 10,
    cols: 100,
    textareaName: "hoteldlist2"
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input"
  },
  hotelList: "hotelList",
  quickSelect : "Quick Select",
  requestReport : "requestReport"
};
export default Settings;