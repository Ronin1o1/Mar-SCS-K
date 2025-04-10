const Settings = {
  api: {
    getPeriodList: "/cbcpricingperiodmaintenance/getCBCPricingPeriod.action",
    getPeriod: "/cbcpricingperiodmaintenance/getEditCBCDueDate.action",
    updateDueDate: "/cbcpricingperiodmaintenance/updateCBCDueDate.action",
    deleteDueDate: "/cbcpricingperiodmaintenance/deleteCBCDueDate.action",
    updateHotelView: "/cbcpricingperiodmaintenance/updateHotelView.action",
    addPeriod: "/pricingperiodmaintenance/addCBCPeriod.action",
  },
  errorMessage: "There has been a technical Error. Please try again later.",
  headings: {
    periodMaintenance: "Pricing Administration : CBC Period Maintenance",
  },
  labelForNo: "N",
  labelForYes: "Y",
  pageTitle: "Pricing Administration : CBC Period Maintenance",
  periodMaintenanceList: {
    deleteImgAltText: "Delete",
    accountViewableoptions: ["Yes", "No"],
    newAddFlag: "newAddFlag",
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
        field: "duedate",
        header: "Due Dates",
      },
    },
  },
  editPeriodMaintenance: {
    title: "Edit Due Date",
    formFields: {
      date: {
        id: "duedate",
        label: "Date:",
      },
      longDueDate: {
        label: "longDueDate",
      },
      shortDueDate: {
        label: "shortDueDate",
      },
    },
    updateBtnAltText: "Update News",
  },
};
export default Settings;
