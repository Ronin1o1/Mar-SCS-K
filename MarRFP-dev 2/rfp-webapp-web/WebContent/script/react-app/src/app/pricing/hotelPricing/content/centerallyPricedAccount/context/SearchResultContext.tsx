import moment from "moment";
import React, { useContext, useState } from "react";
import Utils from "../../../../../common/utils/Utils";
//import Settings from "../static/Settings";
//import Util from "../../../../../common/utils/Utils";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
const CenterallyPricedAccountContext = React.createContext({});
export const CenterallyPricedContextProvider = (props) => {
  const getRefreshObjCpacSearch =
    sessionStorage.refreshObjCpacSearch !== undefined &&
    JSON.parse(sessionStorage.refreshObjCpacSearch);

  const [state, setState] = useState({
    selectedYear: "",
    rebidAlert: "",
    hotelRfpid: "",
    totalPages: 0,
    sortBy: "1",
    newStDate: "",
    saveData: "",
    newEndDate: "",
    noDataFound: false,
    showScreenLoader: false,
    isFilter: false,
    filterValue: "",
    nobidAlert: false,
    customSearch: {
      displayString: "My",
      dueDateFrom: "",
      dueDateTo: "",
      filterString: "",
      r1: "My",
    },
    searchResult: {
      accountCenterView: {},
    },
    nobidReason: {
      reason: {},
    },
    gridData: {
      list: [{}],
    },
  });
  const [resetInput, setResetInput] = useState(false);
  const [refreshObjCpacSearchState, setRefreshObjCpacSearchState] =
    useState(null);
  const [onchangeTrigger, setOnchangeTrigger] = useState(false);
  const [onDatechangeTrigger, setOnDatechangeTrigger] = useState(false);
  const [onEndDatechangeTrigger, setOnEndDatechangeTrigger] = useState(false);
  const [onAccountchangeTrigger, setOnAccountchangeTrigger] = useState(false);
  const [onFilterchangeTrigger, setOnFilterchangeTrigger] = useState(false);
  const parentContextType = useContext(HotelPricingContext);

  const setGridDataList = (data) => {
    if (data.accountCenterView) {
      const gridData = { ...state.gridData };
      let rebidAlert;
      let nodataFound;
      if (
        data.accountCenterView.rebidAlert !== "" &&
        data.accountCenterView.rebidAlert != null
      ) {
        rebidAlert = data.accountCenterView.rebidAlert;
      }
      if (!data.accountCenterView.hotelAccountCenterList.length) {
        nodataFound = true;
      } else {
        nodataFound = false;
      }
      gridData.list = data;

      const totalpage = data.accountCenterView.totalPages;
      setState({
        ...state,
        rebidAlert: rebidAlert,
        gridData: gridData,
        totalPages: totalpage,

        noDataFound: nodataFound,
      });
    }
  };

  const setSearchresult = (data) => {
    if (data) {
      setState({
        ...state,
        searchResult: data,
      });
    }
  };

  const setSelectedYear = (selectedObj) => {
    if (selectedObj) {
      const selectedyear = selectedObj.period;
      const hotelRfpid = selectedObj.hotelrfpid;
      setState({
        ...state,
        selectedYear: selectedyear,
        hotelRfpid: hotelRfpid,
      });
    }
  };

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const setOrderBy = (selectedObj) => {
    if (selectedObj) {
      const sortBy = selectedObj.id;
      setState({
        ...state,
        sortBy: sortBy,
      });
    }
  };

  const setAccountContaining = (value) => {
    setOnFilterchangeTrigger(true);
    state.filterValue = "";
    let customSearch = { ...state.customSearch };
    customSearch = {
      dueDateFrom: "",
      dueDateTo: "",
      filterString: "",
      displayString: "FILTER",
      r1: "FILTER",
    };
    setState({
      ...state,
      filterValue: value,
      isFilter: true,
      customSearch: customSearch,
    });
    parentContextType.setFilterString("FILTER", value);
  };

  const setnobidData = (data) => {
    if (data) {
      setState({
        ...state,
        nobidReason: data,
      });
    }
  };
  const setnoBidAlert = (alert: boolean) => {
    setState({
      ...state,
      nobidAlert: alert,
    });
  };
  const setCustomSearch = (selectedValue, value) => {
    setOnchangeTrigger(true);
    setOnFilterchangeTrigger(false);
    let displayString;
    let orderby;
    let filterString;
    let r1;
    let isfiletr;

    if (selectedValue === "ALL") {
      isfiletr = false;
      displayString = "ALL";
      r1 = "ALL";
      filterString = "";
    } else if (selectedValue === "MY") {
      isfiletr = false;
      r1 = "MY";
      displayString = "MY";
      filterString = "";
    } else if (selectedValue === "NEW") {
      displayString = "NEW";
      r1 = "NEW";
      filterString = "";
      isfiletr = false;
    } else if (selectedValue === "FILTER") {
      displayString = "FILTER";
      r1 = "FILTER";
      isfiletr = true;
    } else {
      isfiletr = false;
      displayString = "MY";
      r1 = "MY";
      filterString = "";
    }
    orderby = value.id;

    let customSearch = { ...state.customSearch };
    parentContextType.setFilterString(displayString, "");
    customSearch = {
      displayString: displayString,
      dueDateFrom: "",
      dueDateTo: "",
      filterString: filterString,
      r1: r1,
    };
    setState({
      ...state,
      customSearch: customSearch,
      isFilter: isfiletr,
      filterValue: filterString,
    });
    setRefreshObjCpacSearchState(getRefreshObjCpacSearch);
  };
  const dateRangeDate = { ...state };

  const onStartDateHideHandler = () => {
    let validDate = true;
    //Checks if entered start date is a valid date.
    const dateRangeDate = { ...state };
    validDate = Utils.isDate(dateRangeDate.newStDate);
    if (!validDate) {
      dateRangeDate.newStDate = "";
      // Util.navigateToUrl(Settings.errorUrl)
    } else {
      dateRangeDate.newStDate = Utils.setDatewithYYYY(dateRangeDate.newStDate);
    }
    if (validDate) {
      startEndDateValidation();
    }
    setState(dateRangeDate);
  };
  const onEndDateHideHandler = () => {
    let validDate = true;
    //Checks if entered start date is a valid date.
    const dateRangeDate = { ...state };
    validDate = Utils.isDate(dateRangeDate.newEndDate);
    if (!validDate) {
      dateRangeDate.newEndDate = "";
      // Util.navigateToUrl(Settings.errorUrl)
    } else {
      // dateRangeDate.newEndDate =
      Utils.setDatewithYYYY(dateRangeDate.newEndDate);
    }
    if (validDate) {
      startEndDateValidation();
    }
    setState(dateRangeDate);
  };
  const startEndDateValidation = () => {
    if (dateRangeDate.newStDate !== "" && dateRangeDate.newStDate !== "") {
      Utils.isValidDate(dateRangeDate.newStDate, dateRangeDate.newStDate);
    }
  };
  const onStartDateInputHandler = (event) => {
    if (event.target.value.length === 10 || event.target.value.length === 0) {
      dateRangeDate.newStDate = event.target.value;
      setState(dateRangeDate);
    }
  };
  const onEndDateInputHandler = (event) => {
    if (event.target.value.length === 10 || event.target.value.length === 0) {
      dateRangeDate.newEndDate = event.target.value;
      setState(dateRangeDate);
    }
  };
  const onChangeCalendar = (event) => {
    if (event.value !== null) {
      const date = moment(event.value).format("MM/DD/YYYY");
      if (event.target.id === "StatrtDate") {
        dateRangeDate.newStDate = date;
        setState(dateRangeDate);
        parentContextType.setStDate(dateRangeDate.newStDate);
      }
      if (event.target.id === "EndDate") {
        dateRangeDate.newEndDate = date;
        setState(dateRangeDate);
        parentContextType.setEndDate(dateRangeDate.newEndDate);
      }
    }
  };
  const centerallyPricedContext = {
    state,
    setState,
    onStartDateHideHandler,
    onStartDateInputHandler,
    onEndDateInputHandler,
    onEndDateHideHandler,
    onChangeCalendar,
    setnobidData,
    setOrderBy,
    setGridDataList,
    setAccountContaining,
    setSearchresult,
    setSelectedYear,
    setCustomSearch,
    setLoader,
    resetInput,
    setResetInput,
    setnoBidAlert,
    refreshObjCpacSearchState,
    setRefreshObjCpacSearchState,
    onchangeTrigger,
    setOnchangeTrigger,
    onDatechangeTrigger,
    setOnDatechangeTrigger,
    onEndDatechangeTrigger,
    setOnEndDatechangeTrigger,
    onAccountchangeTrigger,
    setOnAccountchangeTrigger,
    onFilterchangeTrigger,
    setOnFilterchangeTrigger,
  };

  return (
    <CenterallyPricedAccountContext.Provider value={centerallyPricedContext}>
      {props.children}
    </CenterallyPricedAccountContext.Provider>
  );
};
export const CenterallyPricedAccountConsumer =
  CenterallyPricedAccountContext.Consumer;
export default CenterallyPricedAccountContext;
