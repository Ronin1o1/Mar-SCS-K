const Settings = {
  api: {
    getEdieReportFindFilter:
      "/ediereportfilterfindfilter/getEdieReportFindFilter.action",
    getEdieReportFilter: "/ediereportfiltered/getEdieReportFilter.action",
    getFilteredHotelList: "/ediereportfilterlist/getFilteredHotelList.action",
    runReport: "/ediereportfilterlist/runReport.action",
    getFilterViewLists: "/ediereportfiltered/getFilterViewLists",
    getCognosUrl: "/reports/getAppEnvDetails.action",
  },
  banner: "banner",
  RunDynamicReport: "/CognosMarRFP/RunDynamicReport",
  componentName: "requestEdie",
  title: "Pricing Reports :EDIE",
  urlencode: "application/x-www-form-urlencoded",
  noCache: "no-cache",
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
  },
  messagePage: {
    line1: "The request was successfully submitted to run.",
    line2: "View Reports",
    line21: "Goto ",
    line22: " to view the report.",
    line3: "Press the back button to go back to the hotel list.",
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
      header: "Name",
    },
    city: {
      field: "city",
      header: "City",
    },
    state: {
      field: "state",
      header: "State/</br>Province",
    },
    country: {
      field: "country",
      header: "Country/</br>Region",
    },
    futureopening: {
      field: "futureopening",
      header: "Pre-Opening",
    },
  },
  width630: "658px",
  height540: "440px",
  height510: "470px",
  gridTR: "gridTR",
  quickSelectObject: {
    label: "Hotel List:",
    textareaId: "hotellist2",
    rows: 10,
    cols: 100,
    textareaName: "hoteldlist2",
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
  },
  hotelList: "hotelList",
  quickSelect: "Quick Select",
  requestEdie: "requestEdie",
};
export default Settings;
