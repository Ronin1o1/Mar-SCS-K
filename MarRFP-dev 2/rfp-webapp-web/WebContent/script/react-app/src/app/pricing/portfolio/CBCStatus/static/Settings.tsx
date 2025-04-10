const Settings = {
  api: {
    getCBCReportFindFilter: "/cbcstatusfindfilter/getCBCStatusFindFilter.action",
    getCBCReportFilter: "/cbcstatus/getCBCStatusPricingFilter.action",
    getFilteredHotelList: "/cbcstatuslist/getCBCStatusList.action",
    getFilterViewLists: "/cbcstatus/getFilterViewLists.action",
    getRejectionResonList: "/cbcquickselect/getCBCRejectReasonList.action",
    updateAccept: "/cbcstatuslist/updateAccept.action",
    updateReject: "/cbcstatuslist/updateReject.action",
    acceptAll: "/cbcstatuslist/acceptAll.action",
    rejectAll: "/cbcstatuslist/rejectAll.action",
    update: "/cbcstatuslist/update.action",
    ajaxSave: "/cbcstatuslist/update.action",
  },
  RunDynamicReport: "/CognosMarRFP/RunDynamicReport",
  componentName: "portfolioCBCStatus",
  title: "Pricing Reports :CBC",
  urlencode: "application/x-www-form-urlencoded",
  noCache: "no-cache",
  viewObject: {
    viewHorizontal: "Horizontal",
    viewVertical: "Vertical",
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
    hotelName: {
      field: "hotelname",
      header: "Name"
    },
    status: {
      field: "status",
      header: "Status"
    },
    status_acc: {
      field: "acc",
      header: "Accepted"
    },
    status_rej: {
      field: "rej",
      header: "Rejected"
    },
    status_pen: {
      field: "pen",
      header: "Pending"
    },
    status_req: {
      field: "req",
      header: "Requested"
    },
    rejectionReason: {
      field: "rejectionreason",
      header: "Rejection Reason"
    },
    rejectreasonid: {
      field: "rejectreasonid",
      header: "Rejection Reason Id"
    },
    cbcCreateDate: {
      field: "strCbccreatedate",
      header: "CBC Create Date"
    },
    strCbc_softduedate: {
      field: "strCbc_softduedate",
      header: "CBC Soft Due Date"
    },
    city: {
      field: "city",
      header: "City"
    },
    state: {
      field: "state",
      header: "State"
    },
    country: {
      field: "country",
      header: "Country"
    },
    isSolicited: {
      field: "isSolicited",
      header: "IsSolicited"
    }
  },
  width630: "630px",
  height248: "410px",
  gridTR: "gridTR",
  quickSelectObject: {
    label: "Hotel List:",
    textareaId: "hotellist2",
    row: 10,
    cols: 60,
    textareaName: "hoteldlist2"
  },
  inputType: {
    checkbox: "checkbox",
    button: "button",
    input: "input",
    radio: 'radio'
  },
  hotelList: "hotelList",
  quickSelect: "CBC Quick Select",
  quickSelectLabel: "CBC Status - Actions",
  portfolioCBCStatus: "portfolioCBCStatus",
  marshacode: "marshacode",
  marshaCode: "marshaCode",
  enter200Hotels: "Please enter only 200 hotels at a time.",
  okClose: "OK - Close Message Box",
  alertMessage: "Alert Message",
  marshacodeSeparatedByComma: "Please enter only marshacodes seperated by a ,",
  QuickSelectPopupLabel: "Select the desired action, which will be applied to the indicated properties. Once you submit your request,</br> your changes will be made and automatically saved."
};
export default Settings;