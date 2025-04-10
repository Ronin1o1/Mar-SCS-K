/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useEffect, useState } from "react";
import API from "../service/API";
import Settings from "../static/Settings";

// Set state variables and function
const LimitedSalesUsersContext = React.createContext({});

export const LimitedSalesUsersContextProvider = (props) => {
  const getRefreshObjlimitedsalesUsers =
    sessionStorage.refreshObjlimitedsalesUsers !== undefined &&
    JSON.parse(sessionStorage.refreshObjlimitedsalesUsers);
  const [limitedSalesUsersData, setLimitedSalesUsersData] = useState({});
  const [postData, setPostData] = useState({
    userSearchCriteria: {
      searchBy: "ALL",
      filterString: "",
      userRole: "MFPFSALE",
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
  const [validateModal, setValidateModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshObjUserSearchCriteria, setRefreshObjUserSearchCriteria] =
    useState(null);
  const [onChangeTrigger, setOnChangeTrigger] = useState(false);
  const [onFilterchangeTrigger, setOnFilterchangeTrigger] = useState(false);
  const [onSortbychangeTrigger, setOnSortbychangeTrigger] = useState(false);
  useEffect(() => {
    updateLimitedSalesUsersGridData();
  }, []);

  const onClickSearch = (pageNumber: number = 1) => {
    sessionStorage.setItem("limitedsalesUsersPageNo", pageNumber);
    const searchData = { ...postData };
    sessionStorage.setItem(
      "refreshObjlimitedsalesUsers",
      JSON.stringify(searchData)
    );
    setResetInput(!resetInput);
    updateLimitedSalesUsersGridData(pageNumber);
  };

  const updateLimitedSalesUsersGridData = (pageNumber: number = 1) => {
    setIsLoaded(false);
    let finalPageNo;
    const sessionPageNo = sessionStorage.getItem("limitedsalesUsersPageNo");
    if (sessionPageNo == false || sessionPageNo === undefined) {
      finalPageNo = pageNumber;
    } else {
      finalPageNo = sessionPageNo;
    }

    let apiData;
    if (
      getRefreshObjlimitedsalesUsers !== null &&
      getRefreshObjlimitedsalesUsers !== false &&
      !onChangeTrigger &&
      !onFilterchangeTrigger &&
      !onSortbychangeTrigger
    ) {
      //Session is not empty and none of the evenets was filred on page
      apiData = getRefreshObjlimitedsalesUsers.userSearchCriteria;
    } else if (
      onChangeTrigger ||
      onFilterchangeTrigger ||
      onSortbychangeTrigger
    ) {
      //Call when onChange event occurs on page if session exist also
      if (
        !onChangeTrigger &&
        getRefreshObjlimitedsalesUsers !== false &&
        getRefreshObjlimitedsalesUsers !== null
      ) {
        postData.userSearchCriteria.searchBy =
          getRefreshObjlimitedsalesUsers.userSearchCriteria.searchBy;
      } else {
        postData.userSearchCriteria.searchBy =
          postData.userSearchCriteria.searchBy;
      }
      if (
        !onFilterchangeTrigger &&
        getRefreshObjlimitedsalesUsers !== false &&
        getRefreshObjlimitedsalesUsers !== null
      ) {
        postData.userSearchCriteria.filterString =
          getRefreshObjlimitedsalesUsers.userSearchCriteria.filterString;
      } else {
        postData.userSearchCriteria.filterString =
          postData.userSearchCriteria.filterString;
      }
      if (
        !onSortbychangeTrigger &&
        getRefreshObjlimitedsalesUsers !== false &&
        getRefreshObjlimitedsalesUsers !== null
      ) {
        postData.userSearchCriteria.orderby =
          getRefreshObjlimitedsalesUsers.userSearchCriteria.orderby;
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
    API.getLimitedSalesUsersData(apiData, finalPageNo).then((data) => {
      data?.userlist?.forEach((i) => {
        i.chg = "N";
        if (i.enhanced_reporting === "Y") {
          i.enhanced_reporting = "X";
        } else {
          i.enhanced_reporting = "";
        }
      });
      setLimitedSalesUsersData(data?.userlist);
      setTotalPages(data?.totelPages);
      setIsLoaded(true);
    });
  };

  const setInternalText = (event, data) => {
    const salesData = { ...limitedSalesUsersData };
    Object.values(salesData).filter(function (item) {
      if (data == item.eid) {
        item.chg = "Y";
        item.user_internalnotes = event.target.value;
      }
    });
    setLimitedSalesUsersData(Object.values(salesData));
  };

  const validateInternalText = (event, data, max) => {
    if (event.target.value.length > max) {
      setIsSaved(false);
      alert(Settings.labels.maxLengthAlertMessage);
      event.target.value = event.target.value.substr(0, max - 1);
    }
    const salesData = { ...limitedSalesUsersData };
    Object.values(salesData).filter(function (item) {
      if (data == item.eid) {
        item.chg = "Y";
        item.user_internalnotes = event.target.value;
      }
    });
    setLimitedSalesUsersData(Object.values(salesData));
  };

  const saveLimitedSalesUsersGridData = async () => {
    const strInternalnotesMap = {};
    if (limitedSalesUsersData) {
      Object.values(limitedSalesUsersData).filter(function (item) {
        Object.assign(strInternalnotesMap, {
          [item.cn_userid.toString()]: {
            user_internalnotes: item.user_internalnotes,
            cn_userid: item.cn_userid.toString(),
            group: "MFPFSALE",
            eid: item.eid,
            chg: item.chg,
          },
        });
      });
      await API.postLimitedSalesUsersData(strInternalnotesMap).then((res) => {
        if (res === "success") {
          setIsSaved(true);
          alert(Settings.labels.changesSaved);
          return true;
        } else {
          setIsSaved(false);
          setMessage(Settings.labels.errorMessage);
          setValidateModal(true);
          return false;
        }
      });
    }
  };

  const closeValidateModel = () => {
    setValidateModal(!validateModal);
  };

  const limitedSalesUsersContext = {
    postData,
    totalPages,
    pNumber,
    resetInput,
    showStartingWithFilter,
    limitedSalesUsersData,
    onClickSearch,
    saveLimitedSalesUsersGridData,
    setPostData,
    setShowStartingWithFilter,
    setTotalPages,
    setPNumber,
    setResetInput,
    setInternalText,
    closeValidateModel,
    validateModal,
    setValidateModal,
    message,
    setMessage,
    isSaved,
    setIsSaved,
    isLoaded,
    setIsLoaded,
    updateLimitedSalesUsersGridData,
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
    <LimitedSalesUsersContext.Provider value={limitedSalesUsersContext}>
      {props.children}
    </LimitedSalesUsersContext.Provider>
  );
};

export const LimitedSalesUsersConsumer = LimitedSalesUsersContext.Consumer;
export default LimitedSalesUsersContext;
