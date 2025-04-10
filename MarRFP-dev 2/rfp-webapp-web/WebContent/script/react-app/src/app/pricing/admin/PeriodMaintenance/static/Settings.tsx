const Settings = {
  api: {
    getPricingPeriod: "/pricingperiodmaintenance/getPricingPeriod.action",
    getEditDueDate: "/pricingperiodmaintenance/getEditDueDate.action",
    updateDueDate: "/pricingperiodmaintenance/updateDueDate.action",
    deleteDueDate: "/pricingperiodmaintenance/deleteDueDate.action",
    updateHotelView: "/pricingperiodmaintenance/updateHotelView.action",
    addPeriod: "/pricingperiodmaintenance/addPeriod.action",
  },
  pageTitle: "Pricing Administration : Period Maintenance",
  labelForNo: "N",
  labelForYes: "Y",
  headings: {
    periodMaintenance: "Pricing Administration : Period Maintenance",
  },
  periodMaintenanceList: {
    deleteImgAltText: "Delete",
    yesNoList: [
      {
        keyField: "Y",
        valField : "Yes"
      },
      {
        keyField: "N",
        valField : "No"
      }
    ],
    accountViewableoptions : {
      key : "keyField",
      value : "valField"
    },
    newAddFlag: "newAddFlag",
    selectedHotelView: "selectedHotelView",
    period: "period",
    tableColumns: {
      id: {
        field: "periodmaintenanceid",
      },
      year: {
        field: "year",
        header: "Year",
      },
      accviewable: {
        field: "periodaccviewable",
        header: "Account Viewable?",
      },
      duedate: {
        field: "periodduedate",
        header: "Due Dates",
      },
    },
  },
  editPeriodMaintenance: {
    title: "Edit Due Date",
    formFields: {
      date: {
        id: "shortDueDate",
        label: "Date:",
      },
    },
    updateBtnAltText: "Update News",
  },
};
export default Settings;
