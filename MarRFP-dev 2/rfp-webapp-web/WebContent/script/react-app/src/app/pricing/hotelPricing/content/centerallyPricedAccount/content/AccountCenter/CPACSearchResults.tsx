import React, { useContext, useEffect, useState } from "react";

import styles from "./CPACSearchResults.css";
import classNames from "classnames";
import btnSearch from "../../../../../../common/assets/img/button/btnSearch.gif";
import newImg from "../../../../../../common/assets/img/new.gif";
import saveImg from "../../../../../../common/assets/img/button/btnSave.gif";
import btnGo from "../../../../../../common/assets/img/button/btnPageGo.gif";
import calandarIcon from "../../../../../../common/assets/img/calendar.gif";
import screenLoader from "../../../../../../common/assets/img/screenloader.gif";
import warning from "../../../../../../common/assets/img/warning_small.gif";
import { CPagination } from "../../../../../../common/components/CPagination";
import { useHistory } from "react-router-dom";
import Settings from "../../static/Settings";
import CResultGrid from "../grid/CResultGrid";
import API from "../../service/API";
import CenterallyPricedAccount, {
  CenterallyPricedContextProvider,
} from "../../context/SearchResultContext";

import Utils from "../../../../../../common/utils/Utils";
import HotelPricingContext from "../../../../context/hotelPricingContextProvider";
import Util from "../../../../../../common/utils/Utils";
import OutsideAlerter from "../../../../shared/OutsideAlerter";
import CCalendar from "../../../../../../common/components/CCalendar";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../common/components/ApplicationContext";

let contextType = null;
let parentContextType = null;
let currentTab;
let hotel_accountinfoid = null;
let selectYearObj;

function CPACSearchResults(parms) {
  const getRefreshObjCpacSearch =
    sessionStorage.refreshObjCpacSearch !== undefined &&
    JSON.parse(sessionStorage.refreshObjCpacSearch);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const yearObj = {
    period: parms.data.period,
    hotelrfpid:
      parms.data.hotelrfpid == 0 ||
      parms.data.hotelrfpid == "0" ||
      parms.data.hotelrfpid == null ||
      parms.data.hotelrfpid == undefined
        ? parentContextType?.selectedHotelRfpId
        : parms.data.hotelrfpid,
  };
  const history = useHistory();
  const hotelDetails = parms.data;

  let saveData;
  let isSaveNobid;

  let isRadioButtonSelected;
  const [isnoBid, setIsnoBid] = useState(false);
  const [showStDate, setshowStDate] = useState(false);
  const [showEndDate, setshowEndDate] = useState(false);
  const [period, setPeriod] = useState(parms.data.period);
  const [hotelrfpid, sethotelrfpid] = useState(
    parms.data.hotelrfpid == 0 ||
      parms.data.hotelrfpid == "0" ||
      parms.data.hotelrfpid == null ||
      parms.data.hotelrfpid == undefined
      ? parentContextType?.selectedHotelRfpId
      : parms.data.hotelrfpid
  );
  const [fromDate, setfromDate] = useState(null);
  const [loader, setloader] = useState(false);

  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    contextType.setRefreshObjCpacSearchState(getRefreshObjCpacSearch);
  }, []);

  const fetchCPACData = () => {
    const saveResult = {
      data: {},
    };
    parentContextType.onCPACSave(saveResult);
    contextType.setSelectedYear(yearObj);
    if (
      parentContextType.state.selectedYear &&
      parentContextType.state.hotelRfpid
    ) {
      setPeriod(parentContextType.state.selectedYear);
      sethotelrfpid(parentContextType.state.hotelRfpid);
    } else {
      setPeriod(hotelDetails.period);
      sethotelrfpid(
        parentContextType.state.gridData.list.hotelrfpid == 0 ||
          parentContextType.state.gridData.list.hotelrfpid == "0" ||
          parentContextType.state.gridData.list.hotelrfpid == null ||
          parentContextType.state.gridData.list.hotelrfpid == undefined
          ? parentContextType?.selectedHotelRfpId
          : parentContextType.state.gridData.list.hotelrfpid
      );
    }
    let param;
    if (getRefreshObjCpacSearch !== false && getRefreshObjCpacSearch !== null) {
      param = {
        marshaCode: hotelDetails.marshaCode,
        hotelName:
          hotelDetails.hotelName != "undefined"
            ? hotelDetails.hotelName
            : parentContextType.state.gridData.list?.hotelData?.hotelName,
        hotelrfpid:
          parentContextType.state.gridData.list.hotelrfpid == 0 ||
          parentContextType.state.gridData.list.hotelrfpid == "0" ||
          parentContextType.state.gridData.list.hotelrfpid == null ||
          parentContextType.state.gridData.list.hotelrfpid == undefined
            ? parentContextType?.selectedHotelRfpId
            : parentContextType.state.gridData.list.hotelrfpid,
        period: period != "undefined" ? period : hotelDetails.period,
        currtab: "",
        filterString: getRefreshObjCpacSearch?.filterString,
        displayString: getRefreshObjCpacSearch?.displayString,
        r_1: getRefreshObjCpacSearch?.r_1,
        dueDateFrom: getRefreshObjCpacSearch?.dueDateFrom,
        dueDateTo: getRefreshObjCpacSearch?.dueDateTo,
      };
    } else {
      param = {
        marshaCode: hotelDetails.marshaCode,
        hotelName:
          hotelDetails.hotelName != "undefined"
            ? hotelDetails.hotelName
            : parentContextType.state.gridData.list?.hotelData?.hotelName,
        hotelrfpid:
          parentContextType.state.gridData.list.hotelrfpid == 0 ||
          parentContextType.state.gridData.list.hotelrfpid == "0" ||
          parentContextType.state.gridData.list.hotelrfpid == null ||
          parentContextType.state.gridData.list.hotelrfpid == undefined
            ? parentContextType?.selectedHotelRfpId
            : parentContextType.state.gridData.list.hotelrfpid,
        period: period != "undefined" ? period : hotelDetails.period,
        currtab: "",
      };
    }

    getnobidReason();
    if (history.location?.returnScreen) {
      //updatePublish(history.location.data, "C");
    }

    if (parentContextType.state.displayString) {
      contextType.state.customSearch.displayString =
        parentContextType.state.displayString;
      contextType.state.filterValue = parentContextType.state.filterString;
      if (parentContextType.state.orderBy) {
        const value = Settings.sortBy.filter(function (item) {
          return item.name == parentContextType.state.orderBy;
        });

        contextType.setOrderBy(value[0]);
      }
      getCPACData();
    } else {
      getData(param, "");
    }
  };

  useEffect(() => {
    if (
      (history?.location?.prevPath &&
        !history?.location?.prevPath?.includes("GroupsMeetings")) ||
      history?.location?.prevPath == undefined ||
      history?.location?.prevPath == null ||
      history?.location?.prevPath == ""
    ) {
      fetchCPACData();
    } else if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("GroupsMeetings")
    ) {
      contextType.setLoader(true);
      setloader(true);
      appContext.setCpacLoader(true);
    }
  }, []);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("GroupsMeetings") &&
      appContext?.groupMeetingUpdation
    ) {
      fetchCPACData();
      appContext?.setGroupMeetingUpdation(false);
    }
  }, [appContext?.groupMeetingUpdation]);

  useEffect(() => {
    return () => {
      if (!currentTab) {
        onSave(false, "");
      }
    };
  }, []);

  const getData = (param, pageNumber) => {
    param.hotelrfpid =
      param.hotelrfpid != "undefined"
        ? param.hotelrfpid
        : parentContextType.state.gridData.list.hotelrfpid;
    param.displayString =
      param.displayString != undefined ? param.displayString : param.r_1;
    contextType.setLoader(true);
    setloader(true);
    appContext.setCpacLoader(true);
    const sessionPageNo = sessionStorage.getItem("cpacSearchPageNo");
    const pageno = pageNumber
      ? pageNumber
      : sessionPageNo !== undefined && sessionPageNo !== null
      ? sessionPageNo
      : 1;
    contextType.state.gridData.list.accountCenterView = [];
    const bodyParams = {
      orderby:
        contextType.onAccountchangeTrigger ||
        getRefreshObjCpacSearch?.orderby == undefined
          ? parentContextType.state.orderById
          : getRefreshObjCpacSearch?.orderby,
      pageNumber: pageno,
      maxPageLength: contextType.state.gridData.list?.Page?.maxpagelen
        ? contextType.state.gridData.list?.Page?.maxpagelen
        : 1200,
    };
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("printAccountContainer")
    ) {
      setTimeout(() => {
        API.getAccountGridData(param, bodyParams)
          .then((data) => {
            setloader(false);

            appContext.setCpacLoader(false);
            if (data === "error") {
              history.push({
                pathname: `/error`,
              });
            } else {
              parentContextType.setState({
                ...parentContextType.state,
                gridData: {
                  ...parentContextType.state.gridData,
                  list: {
                    ...parentContextType.state.gridData.list,
                    menu: data?.menu,
                    hotelData: data?.hotelData,
                  },
                },
              });
              contextType.setLoader(false);
              appContext.setCpacLoader(false);
              contextType.setGridDataList(data);
            }
          })
          .catch((error) => {
            contextType.setLoader(false);
            setloader(false);
            appContext.setCpacLoader(false);
          });
      }, 2000);
    } else {
      API.getAccountGridData(param, bodyParams)
        .then((data) => {
          setloader(false);

          appContext.setCpacLoader(false);
          if (data === "error") {
            history.push({
              pathname: `/error`,
            });
          } else {
            parentContextType.setState({
              ...parentContextType.state,
              gridData: {
                ...parentContextType.state.gridData,
                list: {
                  ...parentContextType.state.gridData.list,
                  menu: data?.menu,
                  hotelData: data?.hotelData,
                },
              },
            });
            contextType.setLoader(false);
            appContext.setCpacLoader(false);
            contextType.setGridDataList(data);
          }
        })
        .catch((error) => {
          contextType.setLoader(false);
          setloader(false);
          appContext.setCpacLoader(false);
        });
    }
  };

  const updatePublish = (rowdata, tabStatus) => {
    const bodyParams = {
      hotel_accountinfoid: hotel_accountinfoid
        ? hotel_accountinfoid
        : rowdata?.hotel_accountinfoid,

      strHassu: JSON.stringify({
        hotelid: history.location.HotelIdData,
        hotelrfpid:
          hotelrfpid != "undefined" ? hotelrfpid : hotelDetails.period,
        hotel_accountinfoid: rowdata?.hotel_accountinfoid,
        accountrecid: rowdata?.accountrecid,
        markComplete: "",
        tabstatus_status:
          tabStatus != null ? tabStatus : appContext.pricingTick,
        tabelig_status: appContext.eligibilitiesTick,
        tabcompel_status: appContext.compelBisTick,
        tabrebid_status: appContext.rebidTick,
        tabgroup_status: "",
        tabblackout_status: appContext.blackoutTick,
        tabfacility_status: appContext.facilityTick,
        tabquest_status: appContext.btgTick,
        tabgengroup_status: appContext.genGroupMeetingsTick,
        tabspecificquest_status: appContext.btgTick,
        tabrates_status: appContext.rateRulesTick,
      }),
    };
    contextType.setLoader(true);
    API.updatePublish(bodyParams)
      .then((data) => {})
      .catch((error) => {
        contextType.setLoader(false);
        setloader(false);
        appContext.setCpacLoader(false);
      });
  };
  const getnobidReason = () => {
    API.getNobidReason()
      .then((data) => {
        contextType.setnobidData(data);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((error) => {});
  };
  const onAccountSelect = (e) => {
    contextType.setOnAccountchangeTrigger(true);
    const value = Settings.sortBy.filter(function (item) {
      return item.name == e.target.value;
    });
    contextType.setOrderBy(value[0]);

    parentContextType.cpacsetOrderBy(value[0]);
  };
  const handleChange = (e) => {
    const value = contextType.state.gridData.list?.hotelPeriodData?.filter(
      function (item) {
        return item.period == e.target.value;
      }
    );
    selectYearObj = value[0];
    contextType.setSelectedYear(value[0]);
  };

  const onYearGobtn = () => {
    sessionStorage.setItem("cpacSearchPageNo", 1);
    const finalParam = returnFinalParamObj();
    if (contextType.state.nobidAlert) {
      alert(Settings.searchResult.noBidAlert);
    } else {
      if (selectYearObj?.nopricing === "Y") {
        alert(Settings.searchResult.yesrSelectAlert);
        contextType.setSelectedYear(yearObj);
      } else {
        parentContextType.setSelectedYear(selectYearObj);

        if (selectYearObj) {
          setPeriod(selectYearObj.period);
          sethotelrfpid(selectYearObj.hotelrfpid);
          parms.onYearChange(selectYearObj);

          const param = {
            marshaCode: hotelDetails.marshaCode,
            hotelName: "",
            hotelrfpid: selectYearObj.hotelrfpid,
            period: selectYearObj.period,
            currtab: "",
            filterString: finalParam?.filterString,
            displayString: finalParam?.displayString,
            r_1: finalParam?.r_1,
            orderby: finalParam?.orderby,
            dueDateFrom: finalParam?.dueDateFrom,
            dueDateTo: finalParam?.dueDateTo,
          };

          if (contextType.state.nobidAlert) {
            alert(Settings.searchResult.noBidAlert);
          } else {
            getData(param, "");
          }
        } else {
          window.location.reload();
        }
      }
    }
  };

  const getCPACData = () => {
    if (contextType.state.nobidAlert) {
      alert(Settings.searchResult.noBidAlert);
    } else {
      const rfpid = hotelrfpid ? hotelrfpid : parms.data.hotelrfpid;
      let param;
      if (
        getRefreshObjCpacSearch !== false &&
        getRefreshObjCpacSearch !== null &&
        !contextType.onchangeTrigger &&
        !contextType.onDatechangeTrigger &&
        !contextType.onAccountchangeTrigger &&
        !contextType.onFilterchangeTrigger
      ) {
        //Session is not empty and none of the evenets was filred on page
        param = {
          marshaCode: hotelDetails.marshaCode,
          hotelName: "",
          hotelrfpid: rfpid,
          period: period,
          currtab: "",
          filterString:
            getRefreshObjCpacSearch?.filterString === undefined
              ? ""
              : getRefreshObjCpacSearch?.filterString,
          displayString: getRefreshObjCpacSearch?.displayString,
          r_1: getRefreshObjCpacSearch?.r_1,
          orderby: getRefreshObjCpacSearch?.orderby,
          orderByText: getRefreshObjCpacSearch?.orderByText,
          dueDateFrom: getRefreshObjCpacSearch?.dueDateFrom,
          dueDateTo: getRefreshObjCpacSearch?.dueDateTo,
          switchAccountCenter: "1",
        };
      } else if (
        contextType.onchangeTrigger ||
        contextType.onDatechangeTrigger ||
        contextType.onAccountchangeTrigger ||
        contextType.onFilterchangeTrigger
      ) {
        //Call when onChange event occurs on page if session exist also
        param = {
          marshaCode: hotelDetails.marshaCode,
          hotelName: "",
          hotelrfpid: rfpid,
          period: period,
          currtab: "",
          filterString:
            contextType.onFilterchangeTrigger ||
            getRefreshObjCpacSearch?.filterString == undefined
              ? contextType.state.filterValue == undefined
                ? ""
                : contextType.state.filterValue
              : getRefreshObjCpacSearch?.filterString === undefined
              ? ""
              : getRefreshObjCpacSearch?.filterString,
          displayString:
            contextType.onchangeTrigger ||
            contextType.state.customSearch.displayString == undefined ||
            contextType.onFilterchangeTrigger
              ? contextType.state.customSearch.displayString
              : getRefreshObjCpacSearch.displayString,
          r_1:
            contextType.onchangeTrigger ||
            getRefreshObjCpacSearch?.r_1 == undefined ||
            contextType.onFilterchangeTrigger
              ? contextType.state.customSearch.r1
              : getRefreshObjCpacSearch?.r_1,
          orderby:
            contextType.onAccountchangeTrigger ||
            getRefreshObjCpacSearch?.orderby == undefined
              ? parentContextType.state.orderById
              : getRefreshObjCpacSearch?.orderby,
          orderByText:
            contextType.onAccountchangeTrigger ||
            getRefreshObjCpacSearch?.orderByText == undefined
              ? parentContextType.state.orderBy
              : getRefreshObjCpacSearch?.orderByText,
          dueDateFrom:
            contextType.onDatechangeTrigger ||
            getRefreshObjCpacSearch?.dueDateFrom == undefined
              ? parentContextType.state.stDate
              : getRefreshObjCpacSearch.dueDateFrom,
          dueDateTo:
            contextType.onDatechangeTrigger ||
            getRefreshObjCpacSearch?.dueDateTo == undefined
              ? parentContextType.state.endDate
              : getRefreshObjCpacSearch.dueDateTo,
          switchAccountCenter: "1",
        };
      } else {
        //Intial call when session storage empty
        param = {
          marshaCode: hotelDetails.marshaCode,
          hotelName: "",
          hotelrfpid: rfpid,
          period: period,
          currtab: "",
          filterString: contextType.state.filterValue,
          displayString: contextType.state.customSearch.displayString,
          r_1: contextType.state.customSearch.r1,
          dueDateFrom: parentContextType.state.stDate,
          dueDateTo: parentContextType.state.endDate,
          switchAccountCenter: "1",
        };
      }

      if (contextType.state.invalidDate) {
        Util.navigateToUrl(Settings.errorUrl);
      } else {
        getData(param, "");
      }

      contextType.setResetInput(true);
    }
  };
  const onSearch = () => {
    if (contextType.state.nobidAlert) {
      alert(Settings.searchResult.noBidAlert);
    } else {
      onSave(false, "");
      getCPACData();
    }
  };

  const onSave = (showAlert, editData) => {
    const rfpid = hotelrfpid ? hotelrfpid : parms.data.hotelrfpid;
    const saveObj = parentContextType.state.saveResult.data;
    const param = {
      hotel_accountinfoid: "",
    };
    let refreshObjCpacSearch;
    if (
      getRefreshObjCpacSearch !== false &&
      getRefreshObjCpacSearch !== null &&
      !contextType.onchangeTrigger &&
      !contextType.onDatechangeTrigger &&
      !contextType.onAccountchangeTrigger &&
      !contextType.onFilterchangeTrigger
    ) {
      //Session is not empty and none of the evenets was filred on page
      refreshObjCpacSearch = {
        filterString:
          getRefreshObjCpacSearch?.displayString === "FILTER"
            ? getRefreshObjCpacSearch?.filterString
            : "",
        displayString: getRefreshObjCpacSearch?.displayString,
        r_1: getRefreshObjCpacSearch?.r_1,
        orderby: getRefreshObjCpacSearch?.orderby,
        orderByText: getRefreshObjCpacSearch?.orderByText,
        dueDateFrom: getRefreshObjCpacSearch?.dueDateFrom,
        dueDateTo: getRefreshObjCpacSearch?.dueDateTo,
      };
    } else if (
      contextType.onchangeTrigger ||
      contextType.onDatechangeTrigger ||
      contextType.onAccountchangeTrigger ||
      contextType.onFilterchangeTrigger
    ) {
      //Call when onChange event occurs on page if session exist also
      refreshObjCpacSearch = {
        filterString:
          contextType.onFilterchangeTrigger ||
          getRefreshObjCpacSearch?.filterString == undefined
            ? contextType.state.customSearch.displayString === "FILTER"
              ? contextType.state.filterValue
              : ""
            : getRefreshObjCpacSearch?.filterString === "FILTER"
            ? getRefreshObjCpacSearch?.filterString
            : "",
        displayString:
          contextType.onchangeTrigger ||
          contextType.state.customSearch.displayString == undefined ||
          contextType.onFilterchangeTrigger
            ? contextType.state.customSearch.displayString
            : getRefreshObjCpacSearch.displayString,
        r_1:
          contextType.onchangeTrigger ||
          getRefreshObjCpacSearch?.r_1 == undefined ||
          contextType.onFilterchangeTrigger
            ? contextType.state.customSearch.r1
            : getRefreshObjCpacSearch?.r_1,
        orderby:
          contextType.onAccountchangeTrigger ||
          getRefreshObjCpacSearch?.orderby == undefined
            ? parentContextType.state.orderById
            : getRefreshObjCpacSearch?.orderby,
        orderByText:
          contextType.onAccountchangeTrigger ||
          getRefreshObjCpacSearch?.orderByText == undefined
            ? parentContextType.state.orderBy
            : getRefreshObjCpacSearch?.orderByText,
        dueDateFrom:
          contextType.onDatechangeTrigger ||
          getRefreshObjCpacSearch?.dueDateFrom == undefined
            ? parentContextType.state.stDate
            : getRefreshObjCpacSearch.dueDateFrom,
        dueDateTo:
          contextType.onDatechangeTrigger ||
          getRefreshObjCpacSearch?.dueDateTo == undefined
            ? parentContextType.state.endDate
            : getRefreshObjCpacSearch.dueDateTo,
      };
    } else {
      //Intial call when session storage empty
      refreshObjCpacSearch = {
        filterString:
          contextType.state.customSearch.displayString === "FILTER"
            ? contextType.state.filterValue
            : "",
        displayString: contextType.state.customSearch.displayString,
        r_1: contextType.state.customSearch.r1,
        dueDateFrom: parentContextType.state.stDate,
        dueDateTo: parentContextType.state.endDate,
        orderby: parentContextType.state.orderById,
        orderByText: parentContextType.state.orderBy,
      };
    }
    sessionStorage.setItem(
      "refreshObjCpacSearch",
      JSON.stringify(refreshObjCpacSearch)
    );
    sessionStorage.setItem("cpacSearchPageNo", 1);
    const bodyParam = {
      dueDateFrom: parentContextType.state.stDate,
      dueDateTo: parentContextType.state.endDate,
      strOrderby: JSON.stringify({
        orderby: parentContextType.state.orderById,
      }),
      r_1: contextType.state.customSearch.r1,
      filterString: contextType.state.filterValue,
      displayString: contextType.state.customSearch.displayString,
      switchAccountCenter: "2",
      strAccountCenterView: JSON.stringify({
        totalPages: contextType.state.totalPages,
      }),
      strPage: JSON.stringify({ page: 1 }),
      formChg: "Y",
      hotelrfpid: rfpid,
      period: period,
      marshaCode: hotelDetails.marshaCode,
      accountpricingtype: "C",
      switchHotelrfpid: selectYearObj?.hotelrfpid
        ? selectYearObj.hotelrfpid
        : window.sessionStorage.getItem("hotelrfpid"),
      switchPeriod: selectYearObj?.period
        ? selectYearObj.period
        : hotelDetails.period,
      strHotelAccountCenterUpdate: JSON.stringify(saveObj),
      strHotelPeriodData: JSON.stringify(
        contextType.state.gridData.list?.hotelPeriodData
      ),
    };

    contextType.state.selectedYear = period;
    contextType.state.hotelRfpid = hotelrfpid;
    if (contextType.state.nobidAlert) {
      alert(Settings.searchResult.noBidAlert);
    } else {
      API.updateAccountGridData(param, bodyParam)
        .then(() => {
          // if (hotel_accountinfoid) {
          //   updatePublish(history.location.data, "");
          // }

          if (isRadioButtonSelected) {
          } else {
            if (showAlert) {
              alert(Settings.searchResult.savedSuccessfullyAlert);
            }
          }
          if (editData) {
            navigaePriceTab(editData);
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((error) => {});
    }
  };
  const handleAjaxSave = (updateArray, showAlert, isRadiobutton, savenoBid) => {
    isSaveNobid = savenoBid;
    isRadioButtonSelected = isRadiobutton;

    // if (showAlert) {
    //   setIsnoBid(true);
    //   appContext.setNoBidAlert(true);
    // } else {
    //   setIsnoBid(false);
    //   appContext.setNoBidAlert(false);
    // }
  };
  // const onNobidAAlert = (nobidAlert) => {
  //   if (nobidAlert) {
  //     contextType.setnoBidAlert(true);
  //   } else {
  //     contextType.setnoBidAlert(false);
  //   }
  // };

  const returnFinalParamObj = () => {
    let param;
    if (
      getRefreshObjCpacSearch !== false &&
      getRefreshObjCpacSearch !== null &&
      !contextType.onchangeTrigger &&
      !contextType.onDatechangeTrigger &&
      !contextType.onAccountchangeTrigger &&
      !contextType.onFilterchangeTrigger
    ) {
      //Session is not empty and none of the evenets was filred on page
      param = {
        filterString:
          getRefreshObjCpacSearch?.filterString === undefined
            ? ""
            : getRefreshObjCpacSearch?.filterString,
        displayString: getRefreshObjCpacSearch?.displayString,
        r_1: getRefreshObjCpacSearch?.r_1,
        orderby: getRefreshObjCpacSearch?.orderby,
        orderByText: getRefreshObjCpacSearch?.orderByText,
        dueDateFrom: getRefreshObjCpacSearch?.dueDateFrom,
        dueDateTo: getRefreshObjCpacSearch?.dueDateTo,
      };
    } else if (
      contextType.onchangeTrigger ||
      contextType.onDatechangeTrigger ||
      contextType.onAccountchangeTrigger ||
      contextType.onFilterchangeTrigger
    ) {
      //Call when onChange event occurs on page if session exist also
      param = {
        filterString:
          contextType.onFilterchangeTrigger ||
          getRefreshObjCpacSearch?.filterString == undefined
            ? contextType.state.filterValue == undefined
              ? ""
              : contextType.state.filterValue
            : getRefreshObjCpacSearch?.filterString === undefined
            ? ""
            : getRefreshObjCpacSearch?.filterString,
        displayString:
          contextType.onchangeTrigger ||
          contextType.state.customSearch.displayString == undefined ||
          contextType.onFilterchangeTrigger
            ? contextType.state.customSearch.displayString
            : getRefreshObjCpacSearch.displayString,
        r_1:
          contextType.onchangeTrigger ||
          getRefreshObjCpacSearch?.r_1 == undefined ||
          contextType.onFilterchangeTrigger
            ? contextType.state.customSearch.r1
            : getRefreshObjCpacSearch?.r_1,
        orderby:
          contextType.onAccountchangeTrigger ||
          getRefreshObjCpacSearch?.orderby == undefined
            ? parentContextType.state.orderById
            : getRefreshObjCpacSearch?.orderby,
        orderByText:
          contextType.onAccountchangeTrigger ||
          getRefreshObjCpacSearch?.orderByText == undefined
            ? parentContextType.state.orderBy
            : getRefreshObjCpacSearch?.orderByText,
        dueDateFrom:
          contextType.onDatechangeTrigger ||
          getRefreshObjCpacSearch?.dueDateFrom == undefined
            ? parentContextType.state.stDate
            : getRefreshObjCpacSearch.dueDateFrom,
        dueDateTo:
          contextType.onDatechangeTrigger ||
          getRefreshObjCpacSearch?.dueDateTo == undefined
            ? parentContextType.state.endDate
            : getRefreshObjCpacSearch.dueDateTo,
      };
    } else {
      //Intial call when session storage empty
      param = {
        filterString: contextType.state.filterValue,
        displayString: contextType.state.customSearch.displayString,
        r_1: contextType.state.customSearch.r1,
        dueDateFrom: parentContextType.state.stDate,
        dueDateTo: parentContextType.state.endDate,
        orderby: parentContextType.state.orderById,
      };
    }
    return param;
  };

  const handlePaginationAPI = (pageNumber: number) => {
    const rfpid = hotelrfpid ? hotelrfpid : parms.data.hotelrfpid;
    contextType.setState({
      ...contextType.state,
      searchTerms: {
        ...contextType.state.searchTerms,
        page: pageNumber,
      },
    });
    sessionStorage.setItem("cpacSearchPageNo", pageNumber);
    const finalParam = returnFinalParamObj();
    const param = {
      marshaCode: hotelDetails.marshaCode,
      hotelName: "",
      hotelrfpid: rfpid,
      period: period,
      filterString: finalParam?.filterString,
      displayString: finalParam?.displayString,
      r_1: finalParam?.r_1,
      "orderby.orderby": finalParam?.orderby,
      dueDateFrom: finalParam?.dueDateFrom,
      dueDateTo: finalParam?.dueDateTo,
      pageNumber: pageNumber,
    };

    // if (contextType.state.nobidAlert) {
    //   alert(Settings.searchResult.noBidAlert);
    // } else {
    getData(param, pageNumber);
    // }
  };

  const getStratDate = (parentDate, stDate) => {
    const tempPeriod = parentContextType.state.selectedYear
      ? parentContextType.state.selectedYear
      : period;
    let stdate;
    const viewDate = Utils.convertStrToDate("01/01/" + tempPeriod);
    if (parentDate == "" && stDate !== "") {
      stdate = "";
    } else {
      if (stDate) {
        stdate = Utils.convertStrToDate(stDate);
      } else {
        stdate = parentContextType.state.stDate
          ? Utils.convertStrToDate(parentContextType.state.stDate)
          : viewDate;
        // stdate = Utils.convertStrToDate(parentContextType.state.stDate);
      }
    }

    const str1 = tempPeriod - 2;
    const str2 = parseInt(tempPeriod) + 2;
    const daterange = str1 + ":" + str2;

    return (
      <CCalendar
        id="StatrtDate"
        inputId="StatrtDate"
        inline={true}
        value={stdate}
        onHide={contextType.onStartDateHideHandler}
        onInput={contextType.onStartDateInputHandler}
        onChange={(e) => {
          contextType.onChangeCalendar(e), setshowStDate(false);
        }}
        compName="CpacSearchResults"
      />
    );
  };
  const getEndDate = (parentDate, endDate) => {
    let enddate;
    const tempPeriod = parentContextType.state.selectedYear
      ? parentContextType.state.selectedYear
      : period;

    const viewDate = Utils.convertStrToDate("01/01/" + tempPeriod);
    if (parentDate == "" && endDate !== "") {
      enddate = "";
    } else {
      if (endDate) {
        enddate = Utils.convertStrToDate(endDate);
      } else {
        enddate = parentContextType.state.endDate
          ? Utils.convertStrToDate(parentContextType.state.endDate)
          : viewDate;
      }
    }
    const str1 = tempPeriod - 2;
    const str2 = parseInt(tempPeriod) + 2;
    const daterange = str1 + ":" + str2;
    return (
      <CCalendar
        id="EndDate"
        inputId="EndDate"
        value={enddate}
        inline={true}
        onHide={contextType.onEndDateHideHandler}
        onInput={contextType.onEndDateInputHandler}
        onChange={(e) => {
          contextType.onChangeCalendar(e), setshowEndDate(false);
        }}
        compName="CpacSearchResults"
      />
    );
  };

  const onStDateChange = (e) => {
    const re = Settings.searchResult.dateFormat;
    contextType.setOnDatechangeTrigger(true);

    if (e.target.value === "" || re.test(e.target.value)) {
      parentContextType.setStDate(e.target.value);
      getStratDate(parentContextType.state.stDate, e.target.value);
    }
  };
  const onEndDateChange = (e) => {
    const re = Settings.searchResult.dateFormat;

    contextType.setOnEndDatechangeTrigger(true);
    if (e.target.value === "" || re.test(e.target.value)) {
      parentContextType.setEndDate(e.target.value);
      getStratDate(parentContextType.state.endDate, e.target.value);
    }
  };
  const onGotoPrintTab = (editData, isCurrentTab, singleRowArray) => {
    if (contextType.state.nobidAlert || isCurrentTab) {
      if (isCurrentTab) {
        onNoBidUpdate(editData, singleRowArray, isCurrentTab, false, false);
      }
      //  else {
      //   alert(Settings.searchResult.noBidAlert);
      // }
    } else {
      onNoBidUpdate(editData, singleRowArray, isCurrentTab, false, false);
    }
  };
  const onNoBidUpdate = (
    editData,
    rowData,
    iscurrntTab,
    navigationFlag,
    alertchange
  ) => {
    const rfpid = hotelrfpid ? hotelrfpid : parms.data.hotelrfpid;
    currentTab = true;
    let saveObj;
    if (rowData) {
      saveObj = rowData;
    } else {
      saveObj = parentContextType.state.saveResult.data;
    }

    const param = {
      hotel_accountinfoid: "",
    };
    const bodyParam = {
      dueDateFrom: parentContextType.state.stDate,
      dueDateTo: parentContextType.state.endDate,
      strOrderby: JSON.stringify({
        orderby: parentContextType.state.orderById,
      }),
      r_1: contextType.state.customSearch.r1,
      filterString: contextType.state.filterValue,
      displayString: contextType.state.customSearch.displayString,
      switchAccountCenter: "2",
      strAccountCenterView: JSON.stringify({
        totalPages: contextType.state.totalPages,
      }),
      strPage: JSON.stringify({ page: 1 }),
      formChg: "Y",
      hotelrfpid: rfpid,
      period: period,
      marshaCode: hotelDetails.marshaCode,
      accountpricingtype: "C",
      switchHotelrfpid: selectYearObj?.hotelrfpid
        ? selectYearObj.hotelrfpid
        : window.sessionStorage.getItem("hotelrfpid"),
      switchPeriod: selectYearObj?.period
        ? selectYearObj.period
        : hotelDetails.period,
      strHotelAccountCenterUpdate: JSON.stringify(saveObj),
      strHotelPeriodData: JSON.stringify(
        contextType.state.gridData.list?.hotelPeriodData
      ),
    };
    API.updateAccountGridData(param, bodyParam)
      .then(() => {
        if (alertchange) {
          alert(Settings.searchResult.savedSuccessfullyAlert);
        }
        navigaePriceTab(editData, navigationFlag);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((error) => {});
  };
  const navigaePriceTab = (editData, navigationFlag) => {
    hotel_accountinfoid = editData.hotel_accountinfoid;
    if (!navigationFlag) {
      const rfpid =
        parms.data.hotelrfpid == 0 ||
        parms.data.hotelrfpid == "0" ||
        parms.data.hotelrfpid == null ||
        parms.data.hotelrfpid == undefined
          ? parentContextType?.selectedHotelRfpId
          : parms.data.hotelrfpid;
      history.push({
        pathname: `${Settings.parentRoute}/printAccountContainer`,
        search:
          "?&MarshaCode=" +
          hotelDetails.marshaCode +
          "&Period=" +
          period +
          "&HotelId=" +
          contextType.state.gridData.list?.hotelData?.hotelid +
          "&AccountInfoId=" +
          editData.hotel_accountinfoid +
          "&Hotelrfpid=" +
          rfpid +
          "&AccountName=" +
          encodeURIComponent(editData.accountname) +
          "&vpRate=" +
          editData.volunteeredratetype +
          "&accountStatus=" +
          editData.accountStatus,

        Hotelrfpid: rfpid,
        hotelName: hotelDetails.hotelName,
        accountSpecDetail: editData,
        userDetailsRole: parentContextType.state.userDetails?.list,
        hotelPeriodData: contextType.state.gridData.list?.hotelPeriodData,
      });
    }
  };

  return (
    <HotelPricingContext.Consumer>
      {(hotelPricing) => {
        parentContextType = hotelPricing;

        return (
          <CenterallyPricedContextProvider>
            <CenterallyPricedAccount.Consumer>
              {(centerallyPricedAccount) => {
                contextType = centerallyPricedAccount;

                return (
                  <div className={styles.searchBlock}>
                    {loader ? (
                      <div className={styles.searchBlock2}>
                        <img
                          className={styles.loaderImg}
                          src={screenLoader}
                        ></img>
                      </div>
                    ) : (
                      ""
                    )}
                    <table className={styles.zero_Height}>
                      <tr style={{ display: "flex" }}>
                        <td
                          className={classNames(
                            styles.searchTable,
                            styles.zero_Height
                          )}
                          style={{ display: "block", marginBottom: "3px" }}
                        >
                          <table
                            className={classNames(
                              styles.Filter,
                              styles.zero_Height
                            )}
                          >
                            <tbody>
                              <tr
                                style={{ lineHeight: "0" }}
                                className={styles.myaccountrow}
                              >
                                <td className={styles.FilterFieldName}>
                                  <input
                                    type="radio"
                                    name="r_1"
                                    id="r_1"
                                    defaultChecked
                                    checked={
                                      contextType?.refreshObjCpacSearchState
                                        ?.displayString !== undefined &&
                                      !contextType.onchangeTrigger
                                        ? contextType?.refreshObjCpacSearchState
                                            ?.displayString === "MY"
                                        : parentContextType.state
                                            .displayString === "MY"
                                    }
                                    onClick={() => {
                                      contextType.setCustomSearch("MY", "");
                                    }}
                                  />
                                  {
                                    Settings.searchResult.searchBlock
                                      .showMyAccounts
                                  }
                                </td>
                                <td style={{ width: "10px" }}>&nbsp;</td>
                                <td
                                  className={styles.FilterFieldName}
                                  width="200px"
                                >
                                  <span className={styles.labelblock}>
                                    {
                                      Settings.searchResult.searchBlock
                                        .dueDateFrom
                                    }{" "}
                                  </span>
                                  &nbsp;
                                  <div
                                    className={classNames(
                                      styles.fromDate,
                                      styles.forcalender
                                    )}
                                  >
                                    {" "}
                                    <input
                                      className={styles.calInput}
                                      value={
                                        parentContextType.state.stDate === ""
                                          ? !contextType.onDatechangeTrigger
                                            ? contextType
                                                ?.refreshObjCpacSearchState
                                                ?.dueDateFrom
                                            : parentContextType.state.stDate
                                          : parentContextType.state.stDate
                                      }
                                      type="text"
                                      title={Settings.searchResult.dateTooltip}
                                      onChange={onStDateChange}
                                    ></input>
                                    <img
                                      tabIndex={0}
                                      className={styles.calIcon}
                                      src={calandarIcon}
                                      onClick={() => {
                                        if (showStDate) {
                                          setshowStDate(false);
                                        } else {
                                          setshowStDate(true);
                                        }
                                      }}
                                    ></img>
                                    {showStDate ? (
                                      <OutsideAlerter
                                        onOutsideClick={() => {
                                          setshowStDate(false);
                                        }}
                                      >
                                        <span>
                                          {" "}
                                          {getStratDate(
                                            parentContextType.state.endDate,
                                            ""
                                          )}
                                        </span>
                                      </OutsideAlerter>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </td>
                                <td
                                  className={styles.FilterFieldName}
                                  width="128px"
                                >
                                  <span className={styles.labelblock}>
                                    {Settings.searchResult.searchBlock.to}
                                  </span>
                                  &nbsp;
                                  <div
                                    className={classNames(
                                      styles.toDate,
                                      styles.forcalender
                                    )}
                                  >
                                    {" "}
                                    <input
                                      className={styles.calInput}
                                      value={
                                        parentContextType.state.endDate === ""
                                          ? !contextType.onEndDatechangeTrigger
                                            ? contextType
                                                ?.refreshObjCpacSearchState
                                                ?.dueDateTo
                                            : parentContextType.state.endDate
                                          : parentContextType.state.endDate
                                      }
                                      type="text"
                                      title={
                                        Settings.searchResult.dateToTooltip
                                      }
                                      onChange={onEndDateChange}
                                    ></input>
                                    <img
                                      tabIndex={0}
                                      className={styles.calIcon}
                                      src={calandarIcon}
                                      onClick={() => {
                                        if (showStDate) {
                                          setshowEndDate(false);
                                        } else {
                                          setshowEndDate(true);
                                        }
                                      }}
                                    ></img>
                                    {showEndDate ? (
                                      <OutsideAlerter
                                        onOutsideClick={() => {
                                          setshowEndDate(false);
                                        }}
                                      >
                                        <span>
                                          {" "}
                                          {getEndDate(
                                            parentContextType.state.endDate,
                                            ""
                                          )}
                                        </span>
                                      </OutsideAlerter>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </td>
                                <td style={{ width: "3px" }}>&nbsp;</td>
                              </tr>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  <input
                                    type="radio"
                                    name="r_1"
                                    id="r_1"
                                    defaultValue="NEW"
                                    checked={
                                      contextType?.refreshObjCpacSearchState
                                        ?.displayString !== undefined &&
                                      !contextType.onchangeTrigger
                                        ? contextType?.refreshObjCpacSearchState
                                            ?.displayString === "NEW"
                                        : parentContextType.state
                                            .displayString === "NEW"
                                    }
                                    onClick={() => {
                                      contextType.setCustomSearch("NEW", "");
                                    }}
                                  />
                                  Show&nbsp;
                                  <img src={newImg} />{" "}
                                  {
                                    Settings.searchResult.searchBlock
                                      .accountsOnly
                                  }{" "}
                                </td>
                                <td style={{ width: "10px" }}>&nbsp;</td>
                                <td className={styles.sortbyFieldName}>
                                  {Settings.searchResult.searchBlock.sortBy}
                                  &nbsp;
                                  <select
                                    defaultValue={""}
                                    onChange={onAccountSelect}
                                    value={
                                      contextType?.refreshObjCpacSearchState
                                        ?.orderByText !== undefined &&
                                      !contextType.onAccountchangeTrigger
                                        ? contextType?.refreshObjCpacSearchState
                                            ?.orderByText
                                        : parentContextType.state.orderBy
                                    }
                                    style={{
                                      fontSize: "11px",
                                      fontFamily: "Arial",
                                      fontWeight: "normal",
                                      width: "142px",
                                    }}
                                  >
                                    {Settings.sortBy.map((data) => (
                                      <option key={data.id} value={data.name}>
                                        {data.name}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td />
                              </tr>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  <input
                                    type="radio"
                                    name="r_1"
                                    id="r_1"
                                    checked={
                                      contextType?.refreshObjCpacSearchState
                                        ?.displayString !== undefined &&
                                      !contextType.onchangeTrigger
                                        ? contextType?.refreshObjCpacSearchState
                                            ?.displayString === "ALL"
                                        : parentContextType.state
                                            .displayString === "ALL"
                                    }
                                    defaultValue="ALL"
                                    onClick={() => {
                                      contextType.setCustomSearch("ALL", "");
                                    }}
                                  />
                                  {
                                    Settings.searchResult.searchBlock
                                      .showALLAccounts
                                  }
                                </td>
                                <td style={{ width: "10px" }}>&nbsp;</td>
                                <td
                                  className={styles.FilterFieldName}
                                  colSpan={2}
                                >
                                  {contextType.state.rebidAlert ? (
                                    <span className={styles.nowraptest}>
                                      {" "}
                                      <img src={warning}></img>
                                      {contextType.state.rebidAlert}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.FilterFieldName}>
                                  <input
                                    type="radio"
                                    name="r_1"
                                    id="r_1"
                                    checked={
                                      contextType?.refreshObjCpacSearchState
                                        ?.displayString !== undefined &&
                                      !contextType.onchangeTrigger
                                        ? contextType?.refreshObjCpacSearchState
                                            ?.displayString === "FILTER" ||
                                          contextType.onFilterchangeTrigger
                                        : parentContextType.state
                                            .displayString === "FILTER" ||
                                          contextType.onFilterchangeTrigger
                                    }
                                    defaultValue="FILTER"
                                    onClick={() => {
                                      contextType.setCustomSearch("FILTER", "");
                                    }}
                                  />
                                  {
                                    Settings.searchResult.searchBlock
                                      .showAccountsContaining
                                  }
                                  &nbsp;
                                  <input
                                    id="filterString"
                                    value={
                                      contextType?.refreshObjCpacSearchState
                                        ?.filterString &&
                                      !contextType.onFilterchangeTrigger
                                        ? contextType.onchangeTrigger
                                          ? contextType.state.filterValue
                                          : contextType
                                              ?.refreshObjCpacSearchState
                                              ?.filterString
                                        : contextType.state.filterValue
                                    }
                                    name="filterString"
                                    onChange={(event) => {
                                      contextType.setAccountContaining(
                                        event.target.value
                                      );
                                    }}
                                  />
                                </td>
                                <td style={{ width: "10px" }}>&nbsp;</td>
                                <td style={{ width: "70px", display: "flex" }}>
                                  <img
                                    style={{ marginLeft: "100px" }}
                                    src={btnSearch}
                                    onClick={() => {
                                      onSearch();
                                    }}
                                  />
                                </td>
                                <td />
                              </tr>
                              <input
                                type="hidden"
                                id="displayString"
                                name="displayString"
                              />
                            </tbody>
                          </table>
                        </td>
                        <td style={{ width: "10px" }} />
                        <td style={{ verticalAlign: "middle" }}>
                          <table
                            className={classNames(
                              styles.Filter,
                              styles.zero_Height
                            )}
                            style={{
                              width: "130px",
                              height: "100%",
                              borderTopWidth: "1px",
                              borderBottomStyle: "solid",
                              borderRightWidth: "1px",
                              borderLeftStyle: "solid",
                              borderTopStyle: "solid",
                              borderBottomWidth: "1px",
                              borderRightStyle: "solid",
                              borderLeftWidth: "1px",
                              borderColor: "#cccccc",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  colSpan={3}
                                  className="field_Name"
                                  style={{ fontWeight: "bold" }}
                                >
                                  CBC's
                                </td>
                              </tr>
                              <tr />
                              <tr>
                                <td style={{ fontWeight: "normal" }}>
                                  {Settings.searchResult.cbcBlock.openRequests}
                                </td>
                                <td />
                                <td>
                                  {
                                    contextType.state.gridData.list
                                      ?.accountCenterView?.cbc_requested
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "normal" }}>
                                  {Settings.searchResult.cbcBlock.pending}
                                </td>
                                <td />
                                <td>
                                  {
                                    contextType.state.gridData.list
                                      ?.accountCenterView?.cbc_completed
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "normal" }}>
                                  {Settings.searchResult.cbcBlock.accepted}
                                </td>
                                <td />
                                <td>
                                  {
                                    contextType.state.gridData.list
                                      ?.accountCenterView?.cbc_accepted
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: "normal" }}>
                                  {Settings.searchResult.cbcBlock.declined}
                                </td>
                                <td />
                                <td>
                                  {
                                    contextType.state.gridData.list
                                      ?.accountCenterView?.cbc_rejected
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td
                          style={{
                            verticalAlign: "bottom",
                            display: "flex",
                            marginBottom: "-3px",
                          }}
                        >
                          <table
                            className={`${styles.FilterFieldName} ${styles.cell1}${styles.space2Height}`}
                          >
                            <tbody>
                              <tr>
                                <td colSpan={8} align="center">
                                  <table
                                    className={classNames(
                                      styles.Filter,
                                      styles.zero_Height
                                    )}
                                    style={{
                                      borderTopWidth: "1px",
                                      borderBottomStyle: "solid",
                                      borderRightWidth: "1px",
                                      borderLeftStyle: "solid",
                                      borderTopStyle: "solid",
                                      borderBottomWidth: "1px",
                                      borderRightStyle: "solid",
                                      borderLeftWidth: "1px",
                                      borderColor: "#cccccc",
                                      left: "-50px",
                                      top: "8px",
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td colSpan={2} className="field_Name">
                                          Select Pricing Year
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="center">
                                          <select
                                            defaultValue={
                                              contextType.state.selectedYear
                                            }
                                            value={
                                              contextType.state.selectedYear
                                                ? contextType.state.selectedYear
                                                : period
                                            }
                                            onChange={handleChange}
                                            style={{
                                              fontSize: "11px",
                                              fontFamily: "Arial",
                                              fontWeight: "normal",
                                              width: "52px",
                                            }}
                                          >
                                            {contextType.state.gridData.list?.hotelPeriodData?.map(
                                              (data) => (
                                                <option
                                                  key={data.hotelrfpid}
                                                  value={data.period}
                                                >
                                                  {data.period}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </td>
                                        <td>
                                          <img
                                            src={btnGo}
                                            onClick={() => {
                                              onYearGobtn();
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr style={{ verticalAlign: "bottom" }}>
                                <td>
                                  <CPagination
                                    totalPages={contextType.state.totalPages}
                                    handlePaginationAPI={handlePaginationAPI}
                                    context={contextType}
                                    className={styles.paginator}
                                    width={655}
                                  />
                                </td>
                                <td>
                                  <img
                                    style={{
                                      marginLeft: "40px",
                                    }}
                                    src={saveImg}
                                    onClick={() => {
                                      onSave(true, "");
                                    }}
                                  ></img>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>{" "}
                      </tr>
                    </table>

                    <CResultGrid
                      data={contextType.state.gridData.list?.accountCenterView}
                      hotelData={contextType.state.gridData.list?.hotelData}
                      reason={contextType.state.nobidReason}
                      marshaCode={hotelDetails.marshaCode}
                      period={hotelDetails.period}
                      hotelrfpid={hotelDetails.hotelrfpid}
                      noDataFound={contextType.state.noDataFound}
                      ajaxSave={handleAjaxSave}
                      userDetails={parentContextType.state.userDetails?.list}
                      hotelPeriodData={
                        contextType.state.gridData.list?.hotelPeriodData
                      }
                      //onNobidAAlert={onNobidAAlert}
                      onGotoPrintTab={onGotoPrintTab}
                      onsavenobidreasonid={(
                        editData,
                        rowData,
                        iscurrntTab,
                        navigationFlag,
                        alert
                      ) =>
                        onNoBidUpdate(
                          editData,
                          rowData,
                          iscurrntTab,
                          navigationFlag,
                          alert
                        )
                      }
                    />

                    <style>
                      {`
                          .p-datepicker {
                            width: auto;
                            position: absolute;
                            top: 0px;
                            left: 0;
                            background: white;
                            z-index:999999;
                        }
                        .p-datepicker .p-datepicker-header .p-datepicker-prev, .p-datepicker .p-datepicker-header .p-datepicker-next {
                            width: 2rem;
                            height: 2rem;
                            color: #a6a6a6;
                            border: 0 none;
                            background: transparent;
                            border-radius: 50%;
                            transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
                        }
                          .p-datepicker-inline {
                            flex-direction: column;
                            position: absolute;
                          }
                          .p-datepicker-header{
                            background: #e9e9e9 !important;
                            border-radius: 3px !important;
                            padding: 0px !important
                          }
                          .p-datepicker-group{
                            padding: 3px !important;
                          }
                          .p-datepicker-month{
                            height: 20px;
                            margin-right: 0px !important;
                          }
                          .p-datepicker table{
                            font-size: 11px;
                            margin: 0px !important;
                            border-collapse: unset !important;
                          }
                          .p-datepicker table td {
                            padding: 0px !important;
                          }
                          .p-datepicker table td span{
                            border: 1px solid #c5c5c5 !important;
                            justify-content: flex-end !important;
                            border-radius : 0px !important;
                            width: 1.7rem !important;
                            height: 1.2rem !important;
                            padding 3px !important;                          
                          }
                          .p-datepicker table td.p-datepicker-today > span{
                            background: #fffa90;
                          }
                          .p-inputtext{
                            width: 75px !important;
                            height: 15px;
                            border-radius: 2px !important;
                            font-size: 11px !important;
                            padding: 0px;
                          }
                          .p-datepicker .p-datepicker-header .p-datepicker-prev:focus,
                          .p-datepicker .p-datepicker-header .p-datepicker-next:focus{
                            box-shadow: none !important;
                          }
                          .p-datepicker .p-datepicker-header .p-datepicker-prev:enabled:hover,
                          .p-datepicker .p-datepicker-header .p-datepicker-next:enabled:hover{
                            color: #e9e9e9 !important;
                          }
                          .p-datepicker .p-datepicker-header .p-datepicker-title select:focus{
                            box-shadow: none !important;
                            border-color: #000000 !important;
                          }
                          .pi-chevron-left:before{
                            content: "\\e928";
                            background: #000000;
                            border-color: transparent !important;
                            border-radius: 50%;
                          }
                          .pi-chevron-right:before{
                            content: "\\e92a";
                            background: #000000;
                            border-color: transparent !important;
                            border-radius: 50%;
                          }
                          .p-datepicker .p-datepicker-header {
                            padding: 0.5rem;
                            color: #333333;
                            background: #ffffff;
                            font-weight: 700;
                            margin: 0;
                            border-bottom: 0 none;
                            border-top-right-radius: 3px;
                            border-top-left-radius: 3px;
                        }
                        .p-datepicker-title{
                            display:inline;
                        }
                        .p-datepicker table td span {
                            border:none;
                        }
                        p-datepicker table td {
                            padding: 2px !important;
                            border: 1px solid #c5c5c5 !important;
                            justify-content: flex-end !important;
                            border-radius: 0px !important;
                            width: 1.7rem !important;
                            height: 1.2rem !important;
                        }
                        .pi-calendar:before {
                            content: "";
                        }
                        .p-button:active{
                            border:none;
                            outline:none;
                        }
                        .p-datepicker-month{
                          width:auto !important;
                        }
                        `}
                    </style>
                  </div>
                );
              }}
            </CenterallyPricedAccount.Consumer>
          </CenterallyPricedContextProvider>
        );
      }}
    </HotelPricingContext.Consumer>
  );
}

export default CPACSearchResults;
