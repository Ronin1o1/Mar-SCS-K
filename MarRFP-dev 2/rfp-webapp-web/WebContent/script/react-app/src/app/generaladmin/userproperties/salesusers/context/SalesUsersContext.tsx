/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useContext, useEffect, useState } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
import API from "../service/API";
import Settings from "../static/Settings";

// Set state variables and function
const SalesUsersContext = React.createContext({});

export const SalesUsersContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [salesUsersData, setSalesUsersData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [postData, setPostData] = useState({
    userSearchCriteria: {
      searchBy: "ALL",
      filterString: "",
      userRole: "MFPSALES",
      orderby: 1,
      strPage: {
        page: 1,
        maxpagelen: 20,
      },
      r_1: "ALL",
    },
  });

  const [totalPages, setTotalPages] = useState(-1);
  const [showStartingWithFilter, setShowStartingWithFilter] = useState(true);
  const [pNumber, setPNumber] = useState(1);
  const [resetInput, setResetInput] = useState(true);
  const [titlePadding, setTitlePadding] = useState(true);
  const [refreshObjUserSearchCriteria, setRefreshObjUserSearchCriteria] =
    useState(null);
  const [onChangeTrigger, setOnChangeTrigger] = useState(false);
  const [onFilterchangeTrigger, setOnFilterchangeTrigger] = useState(false);
  const [onSortbychangeTrigger, setOnSortbychangeTrigger] = useState(false);
  const getRefreshObjSalesUsers =
    sessionStorage.refreshObjSalesUsers !== undefined &&
    JSON.parse(sessionStorage.refreshObjSalesUsers);

  useEffect(() => {
    setIsLoaded(false);
    updateSalesUsersGridData();
  }, []);

  const onClickSearch = (pageNumber: number = 1) => {
    setResetInput(!resetInput);
    updateSalesUsersGridData(pageNumber);
    const searchData = { ...appContext.salesUserSearch };
    sessionStorage.setItem("refreshObjSalesUsers", JSON.stringify(searchData));
    sessionStorage.setItem("salesUsersPageNo", pageNumber);
    searchData.userSearchCriteria.filterString =
      searchData.userSearchCriteria.filterString;
    searchData.userSearchCriteria.orderby =
      searchData.userSearchCriteria.orderby;

    if (
      searchData.userSearchCriteria.filterString.length == 0 &&
      (searchData.userSearchCriteria.searchBy ==
        Settings.tableColumns.eid.header ||
        searchData.userSearchCriteria.searchBy == Settings.labels.lastNameValue)
    ) {
      searchData.userSearchCriteria.searchBy = Settings.labels.allValue;
      searchData.userSearchCriteria.r_1 = Settings.labels.allValue;
    } else {
      searchData.userSearchCriteria.searchBy =
        searchData.userSearchCriteria.searchBy;
      searchData.userSearchCriteria.r_1 = searchData.userSearchCriteria.r_1;
    }
    appContext.setSalesUserSearch(searchData);
  };

  const setFilterStringData = (event) => {
    const filterData = { ...appContext.salesUserSearch };
    filterData.userSearchCriteria.filterString = event.target.value;
    if (
      event.target.value.length > 0 &&
      filterData.userSearchCriteria.searchBy == Settings.labels.allValue
    ) {
      filterData.userSearchCriteria.searchBy = Settings.tableColumns.eid.header;
    }
    appContext.setSalesUserSearch(filterData);
  };

  const updateSalesUsersGridData = (pageNumber: number = 1) => {
    let apiData;
    const appContextData = { ...appContext.salesUserSearch };
    let finalPageNo;
    const sessionPageNo = sessionStorage.getItem("salesUsersPageNo");
    if (sessionPageNo == false || sessionPageNo === undefined) {
      finalPageNo = pageNumber;
    } else {
      finalPageNo = sessionPageNo;
    }
    if (
      getRefreshObjSalesUsers !== null &&
      getRefreshObjSalesUsers !== false &&
      !onChangeTrigger &&
      !onFilterchangeTrigger &&
      !onSortbychangeTrigger
    ) {
      //Session is not empty and none of the evenets was filred on page
      apiData = getRefreshObjSalesUsers.userSearchCriteria;
    } else if (
      onChangeTrigger ||
      onFilterchangeTrigger ||
      onSortbychangeTrigger
    ) {
      //Call when onChange event occurs on page if session exist also
      if (
        !onChangeTrigger &&
        getRefreshObjSalesUsers !== false &&
        getRefreshObjSalesUsers !== null
      ) {
        appContextData.userSearchCriteria.searchBy =
          getRefreshObjSalesUsers.userSearchCriteria.searchBy;
      } else {
        postData.userSearchCriteria.searchBy =
          postData.userSearchCriteria.searchBy;
      }
      if (
        !onFilterchangeTrigger &&
        getRefreshObjSalesUsers !== false &&
        getRefreshObjSalesUsers !== null
      ) {
        appContextData.userSearchCriteria.filterString =
          getRefreshObjSalesUsers.userSearchCriteria.filterString;
      } else {
        postData.userSearchCriteria.filterString =
          postData.userSearchCriteria.filterString;
      }
      if (
        !onSortbychangeTrigger &&
        getRefreshObjSalesUsers !== false &&
        getRefreshObjSalesUsers !== null
      ) {
        appContextData.userSearchCriteria.orderby =
          getRefreshObjSalesUsers.userSearchCriteria.orderby;
      } else {
        postData.userSearchCriteria.orderby =
          postData.userSearchCriteria.orderby;
      }
      if (onChangeTrigger && !onFilterchangeTrigger) {
        postData.userSearchCriteria.filterString = "";
      }
      apiData = appContextData.userSearchCriteria;
    } else {
      //Intial call when session storage empty
      apiData = appContextData.userSearchCriteria;
    }
    if (apiData?.searchBy === "ALL") {
      apiData.filterString = "";
    }
    setIsLoaded(false);
    API.getSalesUsersData(apiData, finalPageNo).then((data) => {
      data?.userlist?.forEach((i) => {
        i.chg = "N";
        if (i.enhanced_reporting === "Y") {
          i.enhanced_reporting = "X";
        } else {
          i.enhanced_reporting = "";
        }
      });
      setSalesUsersData(data?.userlist);
      setTotalPages(data?.totelPages);
      setIsLoaded(true);
      setOnChangeTrigger(false);
      setOnFilterchangeTrigger(false);
      setOnSortbychangeTrigger(false);
    });
  };

  const setInternalText = (event, data) => {
    const salesData = { ...salesUsersData };
    Object.values(salesData).filter(function (item) {
      if (data == item.eid) {
        item.chg = "Y";
        item.user_internalnotes = event.target.value;
      }
    });
    setSalesUsersData(Object.values(salesData));
  };

  const saveSalesUsersGridData = async () => {
    let isValid = true;
    const strInternalnotesMap = {};
    const salesData = { ...salesUsersData };
    if (salesData) {
      Object.values(salesData).filter(function (item) {
        if (item.user_internalnotes?.length > 100) {
          alert(Settings.alerts.enterHundredCharsOnly);
          isValid = false;
          item.user_internalnotes = item.user_internalnotes.substr(0, 100 - 1);
          item.chg = "Y";
          setSalesUsersData(Object.values(salesData));
        } else {
          Object.assign(strInternalnotesMap, {
            [item.cn_userid.toString()]: {
              user_internalnotes: item.user_internalnotes,
              cn_userid: item.cn_userid.toString(),
              group: "MFPADMIN",
              eid: item.eid,
              chg: item.chg,
            },
          });
        }
      });
      if (isValid !== false) {
        await API.postSalesUsersData(strInternalnotesMap).then((res) => {
          if (res === "success") {
            alert(Settings.labels.changesSaved);
            return true;
          } else {
            return false;
          }
        });
      } else {
        return false;
      }
    }
  };

  const checkLenText = (event, data, maxLen) => {
    const salesData = { ...salesUsersData };
    if (event.target.value.length > maxLen) {
      alert(Settings.alerts.enterHundredCharsOnly);
      Object.values(salesData).filter(function (item) {
        if (data == item.eid) {
          item.chg = "Y";
          item.user_internalnotes = event.target.value.substr(0, maxLen - 1);
        }
      });
      setSalesUsersData(Object.values(salesData));
    }
  };

  const resetAppContextSearchCriteria = (prevProps, currProps) => {
    if (prevProps.location.key != currProps.location.key) {
      const resetSearchData = { ...appContext.salesUserSearch };
      resetSearchData.userSearchCriteria.searchBy = "ALL";
      resetSearchData.userSearchCriteria.filterString = "";
      resetSearchData.userSearchCriteria.userRole = "MFPSALES";
      resetSearchData.userSearchCriteria.orderby = 1;
      resetSearchData.userSearchCriteria.strPage = {
        page: 1,
        maxpagelen: 20,
      };
      resetSearchData.userSearchCriteria.r_1 = "ALL";
      appContext.setSalesUserSearch(resetSearchData);
      setResetInput(true);
      setIsLoaded(false);
      setTimeout(() => {
        updateSalesUsersGridData();
      }, 1000);
    }
  };
  const resetFilterData = () => {
    const resetSearchData = { ...appContext.salesUserSearch };
    resetSearchData.userSearchCriteria.searchBy = "ALL";
    resetSearchData.userSearchCriteria.filterString = "";
    resetSearchData.userSearchCriteria.userRole = "MFPSALES";
    resetSearchData.userSearchCriteria.orderby = 1;
    resetSearchData.userSearchCriteria.strPage = {
      page: 1,
      maxpagelen: 20,
    };
    resetSearchData.userSearchCriteria.r_1 = "ALL";
    appContext.setSalesUserSearch(resetSearchData);
  };
  const salesUsersContext = {
    postData,
    totalPages,
    pNumber,
    resetInput,
    showStartingWithFilter,
    salesUsersData,
    onClickSearch,
    saveSalesUsersGridData,
    setPostData,
    setShowStartingWithFilter,
    setTotalPages,
    setPNumber,
    resetFilterData,
    setResetInput,
    setInternalText,
    setFilterStringData,
    updateSalesUsersGridData,
    checkLenText,
    titlePadding,
    setTitlePadding,
    isLoaded,
    setIsLoaded,
    resetAppContextSearchCriteria,
    refreshObjUserSearchCriteria,
    setRefreshObjUserSearchCriteria,
    onChangeTrigger,
    setOnChangeTrigger,
    onFilterchangeTrigger,
    setOnFilterchangeTrigger,
    onSortbychangeTrigger,
    setOnSortbychangeTrigger,
  };
  return (
    <SalesUsersContext.Provider value={salesUsersContext}>
      {props.children}
    </SalesUsersContext.Provider>
  );
};

export const SalesUsersConsumer = SalesUsersContext.Consumer;
export default SalesUsersContext;
