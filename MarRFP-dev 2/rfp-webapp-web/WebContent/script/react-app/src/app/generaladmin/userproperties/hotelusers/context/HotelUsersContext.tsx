/* eslint-disable @typescript-eslint/no-inferrable-types */
//import { isNull } from "lodash";
import React, { useEffect, useState } from "react";
//import { UserDetailsContextData } from "../../../../homepage/home/context/UserContext";
import API from "../service/API";
import Settings from "../static/Settings";

// Set state variables and function
const HotelUsersContext = React.createContext({});

export const HotelUsersContextProvider = (props) => {
  const getRefreshObjHotelUsers =
    sessionStorage.refreshObjHotelUsers !== undefined &&
    JSON.parse(sessionStorage.refreshObjHotelUsers);
  const [hotelUsersData, setHotelUsersData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [postData, setPostData] = useState({
    userSearchCriteria: {
      searchBy: "ALL",
      filterString: "",
      userRole: "MFPUSER",
      orderby: 1,
      strPage: {
        page: 1,
        maxpagelen: 20,
      },
    },
  });

  const [totalPages, setTotalPages] = useState(-1);
  const [showStartingWithFilter, setShowStartingWithFilter] = useState(true);
  const [pNumber, setPNumber] = useState(1);
  const [resetInput, setResetInput] = useState(false);
  const [refreshObjUserSearchCriteria, setRefreshObjUserSearchCriteria] =
    useState(null);
  const [onChangeTrigger, setOnChangeTrigger] = useState(false);
  const [onFilterchangeTrigger, setOnFilterchangeTrigger] = useState(false);
  const [onSortbychangeTrigger, setOnSortbychangeTrigger] = useState(false);
  useEffect(() => {
    setIsLoaded(false);
    updateHotelUsersGridData();
  }, []);
  const onClickSearch = (pageNumber: number = 1) => {
    sessionStorage.setItem("hotelUsersPageNo", pageNumber);
    updateHotelUsersGridData(pageNumber);
    const searchData = { ...postData };
    sessionStorage.setItem("refreshObjHotelUsers", JSON.stringify(searchData));
    if (
      searchData.userSearchCriteria.filterString.length == 0 &&
      (searchData.userSearchCriteria.searchBy ==
        Settings.tableColumns.eid.header ||
        searchData.userSearchCriteria.searchBy == Settings.labels.lastNameValue)
    ) {
      searchData.userSearchCriteria.searchBy = Settings.labels.allValue;
      setPostData(searchData);
    }
  };

  const setHotelFilterStringData = (event) => {
    const filterData = { ...postData };
    filterData.userSearchCriteria.filterString = event.target.value;
    if (
      event.target.value.length > 0 &&
      filterData.userSearchCriteria.searchBy == Settings.labels.allValue
    ) {
      filterData.userSearchCriteria.searchBy = Settings.tableColumns.eid.header;
    }
    setPostData(filterData);
  };

  const updateHotelUsersGridData = (pageNumber: number = 1) => {
    setIsLoaded(false);
    let finalPageNo;
    const sessionPageNo = sessionStorage.getItem("hotelUsersPageNo");
    if (sessionPageNo == false || sessionPageNo === undefined) {
      finalPageNo = pageNumber;
    } else {
      finalPageNo = sessionPageNo;
    }

    let apiData;
    if (
      getRefreshObjHotelUsers !== null &&
      getRefreshObjHotelUsers !== false &&
      !onChangeTrigger &&
      !onFilterchangeTrigger &&
      !onSortbychangeTrigger
    ) {
      //Session is not empty and none of the evenets was filred on page
      apiData = getRefreshObjHotelUsers.userSearchCriteria;
    } else if (
      onChangeTrigger ||
      onFilterchangeTrigger ||
      onSortbychangeTrigger
    ) {
      //Call when onChange event occurs on page if session exist also
      if (
        !onChangeTrigger &&
        getRefreshObjHotelUsers !== false &&
        getRefreshObjHotelUsers !== null
      ) {
        postData.userSearchCriteria.searchBy =
          getRefreshObjHotelUsers.userSearchCriteria.searchBy;
      } else {
        postData.userSearchCriteria.searchBy =
          postData.userSearchCriteria.searchBy;
      }
      if (
        !onFilterchangeTrigger &&
        getRefreshObjHotelUsers !== false &&
        getRefreshObjHotelUsers !== null
      ) {
        postData.userSearchCriteria.filterString =
          getRefreshObjHotelUsers.userSearchCriteria.filterString;
      } else {
        postData.userSearchCriteria.filterString =
          postData.userSearchCriteria.filterString;
      }
      if (
        !onSortbychangeTrigger &&
        getRefreshObjHotelUsers !== false &&
        getRefreshObjHotelUsers !== null
      ) {
        postData.userSearchCriteria.orderby =
          getRefreshObjHotelUsers.userSearchCriteria.orderby;
      } else {
        postData.userSearchCriteria.orderby =
          postData.userSearchCriteria.orderby;
      }
      if (onChangeTrigger && !onFilterchangeTrigger) {
        postData.userSearchCriteria.filterString = "";
      }
      apiData = postData.userSearchCriteria;
    } else {
      //Intial call when session storage empty
      apiData = postData.userSearchCriteria;
    }
    API.getHotelUsersData(apiData, finalPageNo).then((data) => {
      data?.userlist.forEach((i) => {
        i.chg = "N";
        if (i.enhanced_reporting === "Y") {
          i.enhanced_reporting = "X";
        } else {
          i.enhanced_reporting = "";
        }
      });

      setHotelUsersData(data?.userlist);
      setTotalPages(data?.totelPages);
      setIsLoaded(true);
    });
  };

  const saveHotelUsersGridData = async () => {
    const strInternalnotesMap = {};
    if (hotelUsersData) {
      Object.values(hotelUsersData).filter(function (item) {
        Object.assign(strInternalnotesMap, {
          [item.cn_userid]: {
            user_internalnotes: item.user_internalnotes,
            cn_userid: item.cn_userid,
            group: "MFPUSER",
            eid: item.eid,
            chg: item.chg,
          },
        });
      });
      await API.postHotelUsersData(strInternalnotesMap).then((res) => {
        if (res === "success") {
          alert(Settings.labels.changesSaved);
          return true;
        } else {
          return false;
        }
      });
    }
  };

  const setInternalText = (event, data) => {
    const hotelData = { ...hotelUsersData };

    Object.values(hotelData).filter(function (item) {
      if (data == item.eid) {
        item.chg = "Y";
        item.user_internalnotes = event.target.value;
      }
    });
    setHotelUsersData(Object.values(hotelData));
  };

  const validateInternalText = (event, data, max) => {
    const hotelData = { ...hotelUsersData };
    if (event.target.value.length > max) {
      alert(Settings.alerts.enterHundredCharsOnly);
      event.target.value = event.target.value.substr(0, max - 1);
    }
    Object.values(hotelData).filter(function (item) {
      if (data == item.eid) {
        item.chg = "Y";
        item.user_internalnotes = event.target.value;
      }
    });
    setHotelUsersData(Object.values(hotelData));
  };

  const hotelUsersContext = {
    postData,
    totalPages,
    pNumber,
    resetInput,
    showStartingWithFilter,
    hotelUsersData,
    isLoaded,
    setIsLoaded,
    onClickSearch,
    saveHotelUsersGridData,
    setPostData,
    setShowStartingWithFilter,
    setTotalPages,
    setPNumber,
    setResetInput,
    setHotelUsersData,
    setInternalText,
    setHotelFilterStringData,
    refreshObjUserSearchCriteria,
    setRefreshObjUserSearchCriteria,
    onChangeTrigger,
    setOnChangeTrigger,
    onFilterchangeTrigger,
    setOnFilterchangeTrigger,
    onSortbychangeTrigger,
    setOnSortbychangeTrigger,
    validateInternalText,
  };
  return (
    <HotelUsersContext.Provider value={hotelUsersContext}>
      {props.children}
    </HotelUsersContext.Provider>
  );
};

export const HotelUsersConsumer = HotelUsersContext.Consumer;
export default HotelUsersContext;
