import React, { useContext, useEffect, useState } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import Settings from "../static/Settings";

const HotelPricingContext = React.createContext({});
export const HotelPricingContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    header: true,
    selectedYear: "",
    hotelName: "",
    hotelRfpid: "",
    period: "",
    marshaCode: "",
    stDate: "",
    endDate: "",
    orderBy: "Account",
    orderById: 1,
    nobidAlert: false,
    displayString: "MY",
    filterString: "",
    gridData: {
      list: {},
    },
    selecthotellist: [],
    showScreenLoader: false,
    userDetails: {
      list: {},
    },
    pricingMsg: "",
    dosMsgList: "",
    standardList: Settings.alert.gppQuestion,
    dosMsgFlag: false,
    pricingAlert: false,
    standardFlag: true,
    saveResult: {
      data: {},
    },
  });
  const [completionState, setCompletionState] = useState({
    PricingContact: "N",
    Standards: "N",
    Seasons: "N",
    DepthOfSales: "N",
    Blackout: "N",
    EligAmen: "N",
    GroupsMeeting: "N",
  });
  const [selectedHotelRfpId, setSelectedHotelRfpId] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [isHotelSelectionChanged, setIsHotelSelectionChanged] = useState(false);

  const urlDetails = { ...state };
  const seturlDetails = (data) => {
    urlDetails.period = data.period;
    urlDetails.marshaCode = data.marshaCode;
    setState({
      ...state,
      hotelName: data.hotelName,
      period: data.period,
      marshaCode: data.marshaCode,
      selectedYear: data.period,
    });
  };

  useEffect(() => {
    sessionStorage.setItem(
      "selectedHotelParams",
      JSON.stringify({
        marshaCode: state?.marshaCode,
        period: state?.period,
        hotelName: state?.hotelName,
      })
    );
  }, [state?.marshaCode, state?.period, state?.hotelName]);

  const headerChange = (e) => {
    setState({
      ...state,
      header: e,
    });
  };
  const getUserDetails = (data) => {
    if (data) {
      const getUserDetails = { ...state.userDetails };
      getUserDetails.list = data;
      setState({
        ...state,
        userDetails: getUserDetails,
      });
    }
  };

  const setGridDataList = (data) => {
    sessionStorage.setItem("isGroupsAndMeetingFlag", "false");
    if (data) {
      if (data.menu.pricingmenuList) {
        data.menu.pricingmenuList.map((obj) => {
          if (obj.screenname === "Groups & Meetings") {
            appContext.setIsGroupsAndMeetingFlag(true);
            sessionStorage.setItem("isGroupsAndMeetingFlag", "true");
          }
        });
      }

      const gridData = { ...state.gridData };
      gridData.list = data;
      setState({
        ...state,
        gridData: gridData,
      });
    }
  };

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const setFilterString = (display, filter) => {
    setState({
      ...state,
      displayString: display,
      filterString: filter,
    });
  };
  const setSelectedYear = (selectedObj) => {
    if (selectedObj) {
      const selectedyear = selectedObj.period;
      const hotelRfpid = selectedObj.hotelrfpid;
      setState({
        ...state,
        selectedYear: selectedyear,
        period: selectedObj.period,
        hotelRfpid: hotelRfpid,
      });
    }
  };
  const setnoBidAlert = (alert: boolean) => {
    setState({
      ...state,
      nobidAlert: alert,
    });

    appContext.setNoBidAlert(alert);
  };
  const cpacsetOrderBy = (value) => {
    setState({
      ...state,
      orderBy: value.name,
      orderById: value.id,
    });
  };
  const setStDate = (value) => {
    setState({
      ...state,
      stDate: value,
    });
  };
  const setEndDate = (value) => {
    setState({
      ...state,
      endDate: value,
    });
  };
  const setPricingAlert = (alert: boolean, message: string) => {
    setState({
      ...state,
      pricingAlert: alert,
      pricingMsg: message,
    });
  };
  const onCPACSave = (data) => {
    delete data[""];
    let res = { ...state.saveResult };
    res.data = data;
    if (Array.isArray(res)) {
      res = res[0];
    }
    if (data) {
      setState({
        ...state,
        saveResult: res,
      });
    }
  };

  const setAlertData = (checkval, data) => {
    state.dosMsgList = data;
    state.dosMsgFlag = checkval;
    setState({
      ...state,
      dosMsgList: state.dosMsgList,
      dosMsgFlag: state.dosMsgFlag,
    });
  };

  const setStandardsAlertData = (alert: boolean, message: string) => {
    state.standardList = message;
    state.standardFlag = alert;
    setState({
      ...state,
      standardFlag: alert,
      standardList: message,
    });
  };

  useEffect(() => {
    if (state?.gridData?.list?.menu) {
      const totalAPIData = localStorage.getItem("totalAPIData")
        ? JSON.parse(localStorage.getItem("totalAPIData"))
        : null;
      if (
        totalAPIData != null &&
        totalAPIData != undefined &&
        totalAPIData != ""
      ) {
        totalAPIData.menu = state?.gridData?.list?.menu;
        localStorage.setItem("totalAPIData", JSON.stringify(totalAPIData));
      }
    }
  }, [state?.gridData?.list?.menu]);

  const setPricingMenuList = (data) => {
    if (data?.menu) {
      setState({
        ...state,
        gridData: {
          ...state.gridData,
          list: {
            ...state.gridData.list,
            menu: data?.menu,
          },
        },
      });
    }
  };

  const pricingContext = {
    state,
    setState,
    setGridDataList,
    getUserDetails,
    setLoader,
    seturlDetails,
    setSelectedYear,
    headerChange,
    setFilterString,
    setnoBidAlert,
    cpacsetOrderBy,
    setStDate,
    setEndDate,
    setPricingAlert,
    onCPACSave,
    setAlertData,
    setStandardsAlertData,
    selectedHotelRfpId,
    setSelectedHotelRfpId,
    showLoader,
    setShowLoader,
    completionState,
    setCompletionState,
    isHotelSelectionChanged,
    setIsHotelSelectionChanged,
    setPricingMenuList,
  };

  return (
    <HotelPricingContext.Provider value={pricingContext}>
      {props.children}
    </HotelPricingContext.Provider>
  );
};
export const RateProgramContextConsumer = HotelPricingContext.Consumer;
export default HotelPricingContext;
