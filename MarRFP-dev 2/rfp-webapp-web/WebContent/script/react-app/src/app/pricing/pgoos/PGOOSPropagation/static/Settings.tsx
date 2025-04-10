const Settings = {
  api: {
    getPgoosPropagationPricingFilter:
      "/pgoospropagation/getPgoosPropagationPricingFilter.action",
    getPgoosPropagationFindFilter:
      "/pgoospropagationfindfilter/getPGOOSPropagationFindFilter.action",
    getPgoosPropagationAvail:
      "/pgoospropagationavail/getPGOOSPropagationAvail.action",
    getPgoosPropagationSelected:
      "/pgoospropagationselect/getPGOOSPropagationSelection.action",
    getFilterViewLists: "/pgoospropagation/getFilterViewLists.action",
    getPgoosPropagationAvailUpdate:
      "/pgoospropagationavail/update.action?nextUrl=/pgoospropagationavail/refresh.action",
    getPgoosPropagationSelectUpdate:
      "/pgoospropagationselect/delete.action?nextUrl=/pgoospropagationselect/refresh.action",
    getPgoospropagationselectBatchId:
      "/pgoospropagationselect/propagate.action",
    getPgoospropagationrun: "/pgoospropagationrun/run.action",
    getPgoosStatus: "/pgoospropagationrun/getPGOOSPropagationRun.action",
    getPropagationFinish: "/pgoospropagationfinish/getPropagationFinish.action",
    getPgoosBatchReset: "/pgoospropagationrun/batchreset.action",
  },
  title: "Pricing : PGOOS Propagate",
  finishTitle: "Pricing Administration : PGOOS Propagate Finish",
  PgoosPropagation: {
    getPgoosPropagationAvail: "getPgoosPropagationAvail",
    getPgoosPropagationSelected: "getPgoosPropagationSelected",
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
      field: "name",
      header: "Name",
    },
    accountname: {
      field: "accountname",
      header: "Account Name",
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
    preOpening: {
      field: "preopening",
      header: "Pre-Opening",
    },
    status_CBC: {
      field: "status_CBC",
      header: "CBC</br>Rejection",
    },
    status: {
      field: "statusdescription",
      header: "Status",
    },
    report: {
      field: "rpgms",
      header: "Rate Programs",
    },
  },
  componentName: "PGOOSPropagation",
  checkAvail: "checkAvail",
  solicitSelect: "cbcSelect",
  valueYN: {
    Yes: "Yes",
    No: "No",
    Y: "Y",
    N: "N",
  },
  move: "move",
  gridView: "gridView1",
  selectedGridView: "selectedGridView",
  selectedValue: "selectedValue",
  availableValue: "availableValue",
  quickSelectObject: {
    label: "Hotel List:",
    textareaId: "hotellist2",
    rows: 10,
    cols: 100,
    textareaName: "hoteldlist2",
  },
  width730: "705px",
  width180: "250px",
  width220: "282px",
  width210: "282px",
  width98: "680px",
  success: "success",
  heightSelected: " 90%",
  urlencode: "application/x-www-form-urlencoded",
  noCache: "no-cache",
  hotelsAvailCriteria: "Hotels matching criteria",
  hotelsSelectedCriteria: "Hotels requested to provide a CBC for",
  jsonutf8: "application/json;charset=UTF-8",
};
export default Settings;
