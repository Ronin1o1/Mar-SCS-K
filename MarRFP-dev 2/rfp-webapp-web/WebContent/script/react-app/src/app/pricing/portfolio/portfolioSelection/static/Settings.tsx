const Settings = {
  api: {
    /**getPortfolioSelectionAvailOnLoad:
      "/portfolioselectionavail/getPortfolioSelectionAvail.action",
    getPortfolioSelectionSelectOnLoad:
      "/portfolioselectionselect/getPortfolioSelectionSelected.action",*/
    getPortfolioSelectionAvail:
      "/portfolioselectionavail/getPortfolioSelectionAvail.action",
    getPortfolioSelectionSelect:
      "/portfolioselectionselect/getPortfolioSelectionSelected.action",
    setPortfolioSelectionAvailUpdate: "/portfolioselectionavail/update.action",
    setPortfolioSelectionSelectUpdate:
      "/portfolioselectionselect/delete.action",
    getPortfolioSelectionFindFilter:
      "/portfolioselectionfindfilter/getPortfolioSelectionFindFilter.action",
    showFilterOptions: "/portfolioselection/getPortfolioPricingFilter.action",
    getFilterViewLists: "/portfolioselection/getFilterViewLists.action",
  },
  title: "Pricing : Portfolio Selection",
  portfolioSelectionAvail: {
    getPortfolioSelectionAvail: "getPortfolioSelectionAvail",
    getPortfolioSelectionSelect: "getPortfolioSelectionSelect",
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
    subset: {
      field: "subsetname",
      header: "Subset",
    },
    ratetype_selected: {
      field: "ratetype_selected",
      header: "ratetype_selected",
    },
    volunteered: {
      field: "volunteered",
      header: "volunteered",
    },
    hasgenpricing: {
      field: "hasgenpricing",
      header: "hasgenpricing",
    },
  },
  componentName: "PortfolioSelection",
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
  width600: "608px",
  width726: "733px",
  width730: "597px",
  width180: "168px",
  width220: "202px",
  width210: "246px",
  width98: "719px",
  success: "success",
  topGridLabel: "Hotels matching criteria",
  bottomGridLabel: "Portfolio for ",
  urlencode: "application/x-www-form-urlencoded",
  noCache: "no-cache",
  popup: {
    PorpertiesAlert:
      "Properties with no General or Off-Cycle Pricing and Properties who selected No Bid or have no rates inserted were not added into the portfolio.",
    HotelAddition:
      "By adding hotels to the portfolio, this account will be weblocked for presented hotels. \n\n(Please click OK to continue, CANCEL to stop)",
    AllHotelConfirm:
      "Are you sure you want to ADD ALL HOTELS matching the criteria into the portfolio? \n\n (Please click OK to continue, CANCEL to stop)",
  },
};
export default Settings;
