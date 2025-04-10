import React, { useContext, useEffect, useState, useRef } from "react";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import { useHistory, useLocation } from "react-router-dom";
import API from "../service/API";
import Settings from "../static/Settings";
import parentSettings from "../../../static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";

const PriceRebidContext = React.createContext({});

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const PriceRebidContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const [state, setState] = useState({
    rebid: {
      accountrecid: null,
      hotel_accountinfoid: null,
      hotelid: null,
      hotelrfpid: null,
      rebid_due: null,
      rebid_due2: null,
      rebid_due3: null,
      rebid_notes: null,
      rebid_notes2: null,
      rebid_notes3: null,
      rebidstatus: null,
      rebidstatus2: null,
      rebidstatus3: null,
      rebidstatus_desc: null,
      rebidstatus_desc2: null,
      rebidRound: null,
      hasRebidViewInfo: {
        rebidRound: null,
        showRebid: null,
        rebidstatusidedit: null,
        rebidNotesedit: null,
        rebidDueDateedit: null,
        rebidpastdue: null,
        rebidStatusList: [
          {
            rebidstatus_id: null,
            rebidstatus_desc: null,
          },
        ],
      },
      last_updatedrebid1: null,
      last_updatedrebid2: null,
      last_updatedrebid3: null,
      lastupdaterebid1eid: null,
      lastupdaterebid2eid: null,
      lastupdaterebid3eid: null,
      lastupdaterebid1email: null,
      lastupdaterebid2email: null,
      lastupdaterebid3email: null,
    },
    acctRebidChg: "N",
    cancelStatus: false,
    hideText: false,
    roleDetails: {
      eid: null,
      role: null,
      fullName: null,
      email: null,
    },
    showLoader: false,
  });

  const accountCenterTabsContext = useContext(AccountCenterTabsContext);
  const [formEdited, setFormEdited] = useState(false);
  const [initialValidation, setInitialValidation] = useState(false);
  const [rebidCheckStatus, setRebidCheckStatus] = useState("complete");
  const [prevRebidStatus, setPrevRebidStatus] = useState(0);
  const [isFormChanged, setIsFormChanged] = useState("N");

  const mounted = useRef();
  const prevFormEdited = usePrevious(formEdited);
  const prevInitialValidation = usePrevious(initialValidation);
  const prevState = usePrevious(state);
  const history = useHistory();
  const urlParms = useLocation().search;
  const accountSpecData =
    useLocation()?.accountSpecDetail != null
      ? useLocation()?.accountSpecDetail
      : history?.location?.data?.accountSpecDetail;
  const isUpdateHotel = new URLSearchParams(urlParms).get("isUpdateHotel");
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const period = new URLSearchParams(urlParms).get("Period");
  const accountInfoid = new URLSearchParams(urlParms).get("AccountInfoId");
  const hotelName = new URLSearchParams(urlParms).get("hotelName");
  const hotelId = new URLSearchParams(urlParms).get("hotelrfpid");
  const HotelIdData = new URLSearchParams(urlParms).get("HotelId");
  const prevAccCenterTabsContext = usePrevious(accountCenterTabsContext);

  const setRebidData = (data) => {
    setState({
      ...state,
      rebid: data,
      roleDetails: appContext.user,
    });
  };
  const setLoader = (show) => {
    setState({
      ...state,
      showLoader: show,
    });
  };
  const text_onclickrebid = (e, max_len) => {
    const rebid = { ...state.rebid };
    rebid.hasRebidViewInfo.rebidNotesedit = e.target.value;
    const storedRebidData = sessionStorage.getItem("priceRebidTabData")
      ? JSON.parse(sessionStorage.getItem("priceRebidTabData"))
      : null;
    if (storedRebidData) {
      storedRebidData.hasRebidViewInfo.rebidNotesedit = e.target.value;
      sessionStorage.setItem(
        "priceRebidTabData",
        JSON.stringify(storedRebidData)
      );
    }
    setState({
      ...state,
      rebid: rebid,
      acctRebidChg: "Y",
    });
    setFormEdited(!formEdited);
    setIsFormChanged("Y");
    return true;
  };

  const text_onKeyPress = (e, max_len) => {
    const rebid = { ...state.rebid };
    rebid.hasRebidViewInfo.rebidNotesedit = e.target.value;
    if (rebid.hasRebidViewInfo.rebidNotesedit.length > max_len) {
      alert(
        Settings.alertMsg.maxCharAllowed +
          max_len +
          Settings.alertMsg.characters
      );
      rebid.hasRebidViewInfo.rebidNotesedit =
        rebid.hasRebidViewInfo.rebidNotesedit.substr(0, max_len - 1);
      setState({
        ...state,
        rebid: rebid,
        acctRebidChg: "Y",
      });
      setFormEdited(!formEdited);
      return false;
    }

    setState({
      ...state,
      rebid: rebid,
      acctRebidChg: "Y",
    });
    setFormEdited(!formEdited);
    return true;
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (prevInitialValidation != initialValidation) {
        const status = rebid_check();
        if (status == "complete" || status == "continue") {
          if (status == "complete") {
            accountCenterTabsContext.setRebidStatus("C");
          } else {
            accountCenterTabsContext.setRebidStatus(null);
          }
          let prevRebidStatus =
            prevState.rebid.hasRebidViewInfo.rebidstatusidedit;
          sessionStorage.setItem("prevRebidStatus", prevRebidStatus);
          if (!state.roleDetails?.isPASorAnySales) {
            if (
              state.rebid.hasRebidViewInfo?.rebidstatusidedit == 3 &&
              prevRebidStatus &&
              prevRebidStatus != 3
            ) {
              prevRebidStatus = state.rebid.hasRebidViewInfo?.rebidstatusidedit;
              accountCenterTabsContext.setRebidStatus("R");
            }
          }
        } else {
          accountCenterTabsContext.setRebidStatus(null);
        }
      }
      if (state.acctRebidChg == "Y" && prevFormEdited != formEdited) {
        rebid_check();
      }
    }
  });

  const conversionForUpdate = (data) => {
    const convertedJson = {};
    const jsonA = {};

    jsonA[`${Settings.rebidRound}`] = data.rebid.hasRebidViewInfo?.rebidRound;
    jsonA[`${Settings.rebidstatus}`] =
      data.rebid.hasRebidViewInfo?.rebidstatusidedit;
    jsonA[`${Settings.rebid_notes}`] =
      data.rebid.hasRebidViewInfo?.rebidNotesedit;

    convertedJson[`${data.rebid.hotel_accountinfoid}`] = jsonA;

    return convertedJson;
  };
  const updateRebit = async () => {
    const stateData = { ...state };
    const convertedData = conversionForUpdate(stateData);
    setLoader(true);
    const res = await API.updateRebid(
      convertedData,
      stateData.acctRebidChg,
      stateData.rebid.hotel_accountinfoid
    );
    setLoader(false);
    return res;
  };

  const rebidOnChange = (e) => {
    setPrevRebidStatus(prevState.rebid.hasRebidViewInfo.rebidstatusidedit);
    sessionStorage.setItem(
      "prevRebidStatus",
      prevState.rebid.hasRebidViewInfo.rebidstatusidedit
    );
    setRevisitFlag(e.target.value);
    const storedRebidData = sessionStorage.getItem("priceRebidTabData")
      ? JSON.parse(sessionStorage.getItem("priceRebidTabData"))
      : null;
    if (storedRebidData) {
      storedRebidData.hasRebidViewInfo.rebidstatusidedit = e.target.value;
      sessionStorage.setItem(
        "priceRebidTabData",
        JSON.stringify(storedRebidData)
      );
    }
    let cancelStatus = false;
    let hotelAccSpecificData = localStorage.getItem("hotelAccountSpecificData");
    hotelAccSpecificData =
      typeof hotelAccSpecificData == "string"
        ? JSON.parse(hotelAccSpecificData)
        : hotelAccSpecificData;
    if (e.target.value === 2 || e.target.value === "2") {
      accountCenterTabsContext.setIsRebidDeclined(true);
      alert(Settings.alertMsg.rebidNotesDecline);
      if (
        appContext.user.role === Settings.isHotelUser ||
        appContext.user.role === Settings.isLimitedSalesUser ||
        appContext?.user?.isSalesUser
      ) {
        appContext.setPriceRebidScreenFlags({
          rebidTab: "C",
          eligAmenityTab: "",
          ratesRulesTab: "",
        });
      }
    } else if (
      (e.target.value == 3 || e.target.value == "3") &&
      (prevState.rebid.hasRebidViewInfo.rebidstatusidedit == 1 ||
        prevState.rebid.hasRebidViewInfo.rebidstatusidedit == "1")
    ) {
      if (
        (appContext.user.role === Settings.isHotelUser ||
          appContext.user.role === Settings.isSalesUser ||
          appContext.user.role === Settings.isLimitedSalesUser) &&
        (hotelAccSpecificData?.ratetype_selected === 1 ||
          hotelAccSpecificData?.ratetype_selected === 18)
      ) {
        accountCenterTabsContext.setIsRebidDeclined(true);
        if (!confirm(Settings.alertMsg.submitRebidGPPALert)) {
          cancelStatus = true;
          if (isUpdateHotel) {
            history.push({
              pathname: `/multihotelaccountcenter`,
              search: `?&navigateToMultipleHotel=true`,
              MarshaCode: marshaCode,
            });
          } else {
            history.push({
              pathname: `${parentSettings.parentRoute}/CPAC`,
              search: `?&MarshaCode=${marshaCode}&Period=${period}&HotelName=${history.location.hotelName}&Hotelrfpid=${history.location.Hotelrfpid}`,
              data: history.location.accountSpecDetail,
              HotelIdData: HotelIdData,
              returnScreen: true,
            });
          }
        }
      } else if (
        appContext.user.role === Settings.isHotelUser ||
        appContext.user.role === Settings.isLimitedSalesUser ||
        appContext?.user?.isSalesUser
      ) {
        appContext.setPriceRebidScreenFlags({
          rebidTab: "C",
          eligAmenityTab: "R",
          ratesRulesTab: "R",
          BtQuestionTab: hotelAccSpecificData?.allow_qmodify === "Y" ? "R" : "",
        });
      }
    } else {
      accountCenterTabsContext.setIsRebidDeclined(false);
    }
    // changedRebid = true;
    setState({
      ...state,
      acctRebidChg: "Y",
      rebid: {
        ...state.rebid,
        hasRebidViewInfo: {
          ...state.rebid.hasRebidViewInfo,
          rebidstatusidedit: e.target.value,
        },
      },
    });
    setFormEdited(!formEdited);
    setIsFormChanged("Y");
  };

  const setRevisitFlag = (rebidValue) => {
    API.getRebidData(state.rebid.hotel_accountinfoid).then((data) => {
      if (data != "error") {
        let prevRebidStatus =
          prevState.rebid?.hasRebidViewInfo?.rebidstatusidedit;
        if (
          state.roleDetails?.isSalesUser ||
          state.roleDetails?.isHotelUser ||
          state.roleDetails?.isLimitedSalesUser
        ) {
          if (rebidValue == 3 && prevRebidStatus && prevRebidStatus !== 3) {
            prevRebidStatus = rebidValue;
            appContext.setPriceRebidScreenFlags({
              rebidTab: "C",
              eligAmenityTab: "R",
              ratesRulesTab: "R",
            });
          } else {
            appContext.setRatesRulesAndEligibilityTick("C");
          }
        }
      }
    });
  };
  const getFormattedDate = (strDate: any) => {
    const date = strDate.replace(/[^\x00-\x7F]/g, "");
    const parts = date.split("/");
    let month_num = parts[0];
    const months = Settings.months;
    let iyear = parseInt(parts[2]);
    if (iyear < 100) {
      if (iyear > 90) iyear += 1900;
      else iyear += 2000;
    }
    month_num = parseInt(month_num);
    month_num = month_num - 1;
    const selectedMonthName = months[month_num];
    const mydate = selectedMonthName + " " + parts[1] + "," + " " + iyear;
    return mydate;
  };

  useEffect(() => {
    if (
      accountCenterTabsContext?.rebidAction !=
      prevAccCenterTabsContext?.rebidAction
    ) {
      rebid_check();
    }
  }, [accountCenterTabsContext?.rebidAction]);

  const rebid_check = () => {
    const stateData = { ...state };
    let bOK = true;
    let rebidcheckstatus = "complete";
    let msg = "";
    let msgRebidNotes = "";
    if (
      stateData.rebid.hasRebidViewInfo.rebidstatusidedit == 1 ||
      stateData.rebid.hasRebidViewInfo.rebidstatusidedit == "1"
    ) {
      msg = Settings.alertMsg.submitOrDeclineRebid;
      bOK = false;
    } else if (
      (stateData.rebid.hasRebidViewInfo.rebidstatusidedit == 2 ||
        stateData.rebid.hasRebidViewInfo.rebidstatusidedit == "2") &&
      (stateData.rebid.hasRebidViewInfo.rebidNotesedit == null ||
        stateData.rebid.hasRebidViewInfo.rebidNotesedit.trim().length === 0)
    ) {
      msgRebidNotes = Settings.alertMsg.declineRebid;
      stateData.rebid.hasRebidViewInfo.rebidNotesedit = "";
      bOK = false;
    }
    if (!bOK) {
      if (msgRebidNotes != "") {
        if (
          appContext.user.role === Settings.isHotelUser ||
          appContext.user.role === Settings.isSalesUser ||
          appContext.user.role === Settings.isLimitedSalesUser
        ) {
          accountCenterTabsContext.setErrorMessage(msgRebidNotes);
        }
      }
      if (
        appContext.user.role === Settings.isPASAdmin ||
        appContext.user.role === Settings.isSalesUser
      ) {
        rebidcheckstatus = "continue";
        if (msgRebidNotes == "") {
          accountCenterTabsContext.setErrorMessage("");
        }
      } else {
        if (accountCenterTabsContext.rebidAction == "tabnavigation") {
          rebidcheckstatus = "failed";
          if (msg != "") {
            accountCenterTabsContext.setTabNavError(msg);
          } else {
            accountCenterTabsContext.setTabNavError("");
          }
          if (msgRebidNotes == "") {
            accountCenterTabsContext.setErrorMessage("");
          }
        } else {
          rebidcheckstatus = "continue";
          if (msgRebidNotes == "") {
            accountCenterTabsContext.setErrorMessage("");
          }
        }
      }
    } else {
      rebidcheckstatus = "complete";
      accountCenterTabsContext.setErrorMessage("");
      accountCenterTabsContext.setTabNavError("");
    }
    setRebidCheckStatus(rebidcheckstatus);
    return rebidcheckstatus;
  };

  const priceRebidContext = {
    state,
    setState,
    setRebidData,
    rebidOnChange,
    text_onclickrebid,
    updateRebit,
    rebid_check,
    text_onKeyPress,
    initialValidation,
    setInitialValidation,
    rebidCheckStatus,
    setRebidCheckStatus,
    prevState,
    getFormattedDate,
    prevRebidStatus,
    setPrevRebidStatus,
    isFormChanged,
    setIsFormChanged,
  };

  return (
    <PriceRebidContext.Provider value={priceRebidContext}>
      {props.children}
    </PriceRebidContext.Provider>
  );
};

export const PriceRebidContextConsumer = PriceRebidContext.Consumer;
export default PriceRebidContext;
