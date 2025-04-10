const Settings = {
  api: {
    getCBCRequestPricingFilter: "/cbcrequest/getCBCRequestPricingFilter.action",
    getCBCRequestFindFilter:
      "/cbcrequestfindfilter/getCBCRequestFindFilter.action",
    getCBCRequestAvail: "/cbcrequestavail/getCBCRequestAvail.action",
    getCBCRequestSelected: "/cbcrequestselect/getCBCRequestSelected.action",
    getFilterViewLists: "/cbcrequest/getFilterViewLists.action",
    cbcrequestavailAvailUpdate:
      "/cbcrequestavail/update.action?nextUrl=/cbcrequestavail/refresh.action",
    cbcrequestavailSelectUpdate:
      "/cbcrequestselect/update.action?nextUrl=/cbcrequestselect/refresh.action",
  },
  title: "Pricing : CBC Request",
  CBCRequest: {
    getCBCRequestAvail: "getCBCRequestAvail",
    getCBCRequestSelected: "getCBCRequestSelected",
  },
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
  },
  tableColumns: {
    hotelid: {
      field: "hotelid",
    },
    hotelidCheckbox: {
      field: "hotelid",
    },
    marshacode: {
      field: "marshacode",
      header: "MARSHA",
    },
    hotelname: {
      field: "hotelname",
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

    status_CBC: {
      field: "status_CBC",
      header: "CBC</br>Rejection",
    },
    status: {
      field: "statusdescription",
      header: "Status",
    },
  },
  componentName: "CBCrequest",
  checkAvail: "checkAvail",
  solicitSelect: "cbcSelect",
  valueYN: {
    Yes: "Yes",
    No: "No",
    Y: "Y",
    N: "N",
  },
  move: "move",
  gridTR: "gridTR",
  selectedValue: "selectedValue",
  availableValue: "availableValue",
  quickSelectObject: {
    label: "Hotel List:",
    textareaId: "hotellist2",
    row: 10,
    cols: 100,
    textareaName: "hoteldlist2",
  },
  width730: "559px",
  width180: "250px",
  width220: "282px",
  width210: "282px",
  width98: "608px",
  success: "success",

  urlencode: "application/x-www-form-urlencoded",
  noCache: "no-cache",
  hotelsAvailCriteria: "Hotels matching criteria",
  hotelsSelectedCriteria: "Hotels requested to provide a CBC for",
};
export default Settings;
