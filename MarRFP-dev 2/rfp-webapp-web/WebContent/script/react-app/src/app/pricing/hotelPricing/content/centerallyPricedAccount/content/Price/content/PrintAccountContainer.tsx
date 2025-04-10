/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState, useRef } from "react";
import { Layout } from "../../../../../routing/Layout";
import btnSave from "../../../../../../../common/assets/img/button/btnSave.gif";
import screenLoader from "../../../../../../../common/assets/img/screenloader.gif";
import btnReturnAccountCenter from "../../../../../../../common/assets/img/button/btnReturnAccountCenter.gif";
import btnReturnHotelCenter from "../../../../../../../common/assets/img/button/btnReturnHotelCenter.gif";
import submittBtn from "../../../../../../../common/assets/img/button/btnSubmit.gif";
import cancelBtn from "../../../../../../../common/assets/img/button/btnCancel.gif";
import AccountCenterTabs from "./AccountCenterTabs";
import styles from "./PrintAccountContainer.css";
import API from "../service/API";
import { useLocation, useHistory } from "react-router-dom";
import _ from "lodash";
import AccountCenterTabsContext, {
  AccountCenterTabsContextProvider,
} from "../context/AccountCenterTabsContext";
import HotelPricingContext from "../../../../../context/hotelPricingContextProvider";
import RateLoadStatus from "../content/RateLoadStatus/content/RateLoadStatus";
import CModal from "../../../../../../../common/components/CModal";
import Settings from "../static/Settings";
import { PropertyList } from "../../../../../../hotelPropertyList/content/PropertyList";
//import StateManager from "react-select";
import RatesRulesContext, {
  RatesRulesContextProvider,
} from "./Rates&Rules/context/RatesRulesContextProvider";
//import { CLoader } from "../../../../../../../common/components/CLoader";
import requestImg from "../../../../../../../common/assets/img/requested.gif";
import acceptedImg from "../../../../../../../common/assets/img/accepted.gif";
import lockedImg from "../../../../../../../common/assets/img/locked.gif";
import rejected from "../../../../../../../common/assets/img/rejectedD.gif";
import wifi from "../../../../../../../common/assets/img/wifi.gif";
import isnew from "../../../../../../../common/assets/img/new.gif";
import rollOver from "../../../../../../../common/assets/img/roll_over.png";
import aer from "../../../../../../../common/assets/img/aer.gif";
import aerlevel1 from "../../../../../../../common/assets/img/aerlevel1.gif";
import noview from "../../../../../../../common/assets/img/noview.gif";
import offCycle from "../../../../../../../common/assets/img/off_cycle.gif";
import btBookingCost from "../../../../../../../common/assets/img/bt_booking_cost.png";
import noSquatter from "../../../../../../../common/assets/img/nosquatter.gif";
import toYear from "../../../../../../../common/assets/img/two_year.gif";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";
import CPACAPI from "../../../../../../hotelPricing/content/centerallyPricedAccount/service/API";

let contextType = null;
let contextValue = null;
let rateLoadStatus = null;
let congnosEndPointUrl;
let initialLoadData;

function PrintAccountContainer(): JSX.Element {
  const history = useHistory();
  const prevLocation = useLocation()?.state?.from;
  const acctStatus = useLocation()?.data?.accountStatus;
  const currentUrl = useLocation().pathname;
  const [locationKeys, setLocationKeys] = useState([]);
  const urlParms = useLocation().search;
  const accountSpecData =
    useLocation()?.accountSpecDetail != null
      ? useLocation()?.accountSpecDetail
      : history?.location?.data?.accountSpecDetail;

  const isUpdateHotel = new URLSearchParams(urlParms).get("isUpdateHotel");
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const period = new URLSearchParams(urlParms).get("Period");
  const accountName = new URLSearchParams(urlParms).get("AccountName");
  const accountInfoid = new URLSearchParams(urlParms).get("AccountInfoId");
  const hotelName =
    new URLSearchParams(urlParms).get("hotelName") !== null &&
    new URLSearchParams(urlParms).get("hotelName") !== undefined
      ? new URLSearchParams(urlParms).get("hotelName")
      : history?.location?.hotelName;
  const hotelId =
    new URLSearchParams(urlParms).get("Hotelrfpid") !== null &&
    new URLSearchParams(urlParms).get("Hotelrfpid") !== undefined
      ? new URLSearchParams(urlParms).get("Hotelrfpid")
      : history?.location?.Hotelrfpid;
  const HotelIdData = new URLSearchParams(urlParms).get("HotelId");
  const statusDecode = {
    FAIL: "Error",
    CMPL: "Pending",
    UNPB: "Pending",
    PUBL: "Success",
    VRPE: "Load",
    VRPX: "Unprotect",
    VRPK: "Delete",
  };
  const [rateLoadStatusPopupFlag, setRateLoadStatusPopupFlag] = useState(false);
  const [isViewPrint, setIsViewPrint] = useState(false);
  const [selectedViewYear, setSelectedViewYear] = useState(period);

  const [accountData, setaccountData] = useState({});
  const ratesandrulescontext = useContext(RatesRulesContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [displayAccountName, setDisplatAccountName] = useState(accountName);
  const [localRateRebidFlag, setLocalRateRebidFlag] = useState("");
  const rateRebidRef = useRef();
  rateRebidRef.current = localRateRebidFlag;
  const hasd = JSON.parse(localStorage.getItem("orginalRatesData"));

  useEffect(() => {
    appContext.setMarkAsCompleteErrorAlert({
      show: false,
      message: "",
      type: "browserAlert",
    });

    appContext.setGroupsAndMeetingError({
      show: false,
      msg: "",
    });

    appContext.setPriceRebidScreenFlags({
      rebidTab: "",
      eligAmenityTab: "",
      ratesRulesTab: "",
    });

    appContext.setNoRedirect(false);
    if (accountSpecData) {
      setaccountData(accountSpecData);
      sessionStorage.setItem("accountSpecDetails", JSON.stringify(accountSpecData));
    } else {
      if (prevLocation != "accountstatus") {
        getCPACData();
      }
    }
    getCognosUrl();

    contextValue?.seturlDetails({
      marshaCode: marshaCode,
      hotelName: hotelName,
      period: period,
    });
    contextValue?.setSelectedHotelRfpId(hotelId);
    appContext?.setHotelPricingUrlDetails({
      marshaCode: marshaCode,
      hotelName: hotelName,
      period: period,
      hotelRfpId: hotelId,
    });

    sessionStorage.setItem("tabratesStatus", "");
    sessionStorage.setItem("rebidStatus", "");
    sessionStorage.setItem("initialRebidStatus", "");
    sessionStorage.setItem("bussinessCase", "");
    sessionStorage.setItem("roomnight", "");
    sessionStorage.setItem("isrebid", "");
    localStorage.removeItem("ratesTableValidData");
    appContext.setIsMarkAsCompleteChecked(false);
    appContext.setSwitchTabFlag(false);
    appContext.setSwitchBlackoutTabFlag(false);
    appContext.setRebidTabSwitchFlag(false);

    const param = {
      marshaCode: marshaCode,
      hotelName:
        history.location.accountSpecDetail != null
          ? history.location.accountSpecDetail.hotelname
          : hotelName || history.location.HotelName,
      hotelrfpid:
        history.location.Hotelrfpid != null
          ? history.location.Hotelrfpid
          : hotelId,
      period: period,
      hotel_accountinfoid: accountInfoid,
    };
    contextType.setLoader(true);
    API.getHotelaccountspeccentralrates(param).then((data) => {
      initialLoadData = data;
      if (data?.menu?.pricingmenuList) {
        contextValue?.setState({
          ...contextValue?.state,
          gridData: {
            ...contextValue?.state?.gridData,
            list: {
              ...contextValue?.state?.gridData?.list,
              menu: data?.menu,
            },
          },
        });
      }
      setDisplatAccountName(
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.accountname
      );
      sessionStorage.setItem(
        "tabratesStatus",
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.tabrates_status
      );
      sessionStorage.setItem(
        "rebidStatus",
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.rebidstatus
      );
      sessionStorage.setItem("initialRebidStatus", data?.hotelAccountSpecific?.hotelAccountSpecificData?.rebidstatus);
      sessionStorage.setItem(
        "bussinessCase",
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.business_case
      );
      sessionStorage.setItem(
        "prevbussinessCase",
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.business_case
      );
      sessionStorage.setItem(
        "hassalescontact",
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.hassalescontact
      );
      sessionStorage.setItem(
        "hasfacility",
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.hasfacility
      );

      sessionStorage.setItem(
        "accountpricingtype",
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.accountpricingtype
      );

      sessionStorage.setItem(
        "roomnight",
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.rm_nights
      );
      if (
        data?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.tabrates_status === "C"
      ) {
        contextValue &&
          contextValue?.setRatesRulesStatus &&
          contextValue &&
          contextType?.setRatesRulesStatus("C");
      }
      if (
        data?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.tabrebid_status === "C" ||
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.rebidstatus ===
          2 ||
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.rebidstatus === 3
      ) {
        contextValue &&
          contextValue?.setRebidStatus &&
          contextValue &&
          contextType?.setRebidStatus("C");
        appContext && appContext.setRebidTick && appContext.setRebidTick("C");
      }
      contextType.setAccountCenterData(data);
      contextType.setLoader(false);
      contextType.setHotelData(data);
      localStorage.setItem(
        "accountId",
        data?.hotelAccountSpecific?.hotelAccountSpecificData?.accountid
      );
      localStorage.setItem(
        "hotelAccountSpecificData",
        JSON.stringify(data?.hotelAccountSpecific?.hotelAccountSpecificData)
      );
      localStorage.setItem("hotelData", JSON.stringify(data.hotelData));
      if (prevLocation == "accountstatus") {
        getCPACData(
          data?.hotelAccountSpecific?.hotelAccountSpecificData?.accountname
        );
      }
      if (
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.maxblackouts !== 0 &&
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.maxblackouts !== null
      ) {
        appContext.totalmaxBlackouts = true;
        appContext.setTotalMaxBlackouts(appContext.totalmaxBlackouts);
      } else {
        appContext.totalmaxBlackouts = false;
        appContext.setTotalMaxBlackouts(appContext.totalmaxBlackouts);
      }
      if (
        !appContext?.user?.isPASAdmin &&
        !appContext?.user?.isReadOnly && 
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.accountpricingtype  == "C" &&
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.maxblackouts !== 0 &&
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.maxblackouts !== null &&
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.numblackouts >
          initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
            ?.maxblackouts
      ) {
        appContext.hotelPricingBlackoutmsg = `Warning!!  You have entered ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.numblackouts}  blackout days.\n\nThe total number of blackout days for this account must be less than or equal to  ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.maxblackouts}.`;
        appContext.setHotelPricingBlackoutmsg(
          appContext.hotelPricingBlackoutmsg
        );
        alert(
          `Warning!!  You have entered ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.numblackouts}  blackout days.\n\nThe total number of blackout days for this account must be less than or equal to  ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.maxblackouts}.`
        );
      }
      if (
        !appContext?.user?.isPASAdmin &&
        !appContext?.user?.isReadOnly &&
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.accountpricingtype  == "C" &&
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.maxblackoutperiod != 0 &&
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.maxblackoutperiod != null &&
        initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.numblackoutperiods >
          initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
            ?.maxblackoutperiod
      ) {
        appContext?.setMaxBlackoutPeriodAlert(
          `Warning!!  You have entered ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.numblackoutperiods}  blackout periods.\n\nThe total number of blackout periods for this account must be less than or equal to  ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.maxblackoutperiod}.`
        );
        alert(
          `Warning!!  You have entered ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.numblackoutperiods}  blackout periods.\n\nThe total number of blackout periods for this account must be less than or equal to  ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.maxblackoutperiod}.`
        );
      }
    });

    if (isUpdateHotel) {
      contextType.setLoader(true);
      API.getMultiHotelAccountSpecificRates(param).then((data) => {
        contextType.setLoader(false);
        if (data && data.hotelAccountSpecificData) {
          setaccountData(data.hotelAccountSpecificData);
        }
        if (
          data?.hotelAccountSpecificData?.maxblackouts !== 0 &&
          data?.hotelAccountSpecificData?.maxblackouts !== null
        ) {
          appContext.totalmaxBlackouts = true;
          appContext.setTotalMaxBlackouts(appContext.totalmaxBlackouts);
        } else {
          appContext.totalmaxBlackouts = false;
          appContext.setTotalMaxBlackouts(appContext.totalmaxBlackouts);
        }
        if (
          !appContext?.user?.isPASAdmin &&
          !appContext?.user?.isReadOnly &&
          data?.hotelAccountSpecificData?.accountpricingtype  == "C" &&
          data?.hotelAccountSpecificData?.maxblackouts !== 0 &&
          data?.hotelAccountSpecificData?.maxblackouts !== null &&
          data?.hotelAccountSpecificData?.numblackouts >
            data?.hotelAccountSpecificData?.maxblackouts
        ) {
          appContext.hotelPricingBlackoutmsg = `Warning!!  You have entered ${data?.hotelAccountSpecificData?.numblackouts}  blackout days.\n\nThe total number of blackout days for this account must be less than or equal to  ${data?.hotelAccountSpecificData?.maxblackouts}.`;
          appContext.setHotelPricingBlackoutmsg(
            appContext.hotelPricingBlackoutmsg
          );
          alert(
            `Warning!!  You have entered ${data?.hotelAccountSpecificData?.numblackouts}  blackout days.\n\nThe total number of blackout days for this account must be less than or equal to  ${data?.hotelAccountSpecificData?.maxblackouts}.`
          );
        }
        if (
          !appContext?.user?.isPASAdmin &&
          !appContext?.user?.isReadOnly &&
          data?.hotelAccountSpecificData?.accountpricingtype  == "C" &&
          initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
            ?.maxblackoutperiod != 0 &&
          initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
            ?.maxblackoutperiod != null &&
          initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
            ?.numblackoutperiods >
            initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData
              ?.maxblackoutperiod
        ) {
          appContext?.setMaxBlackoutPeriodAlert(
            `Warning!!  You have entered ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.numblackoutperiods}  blackout periods.\n\nThe total number of blackout periods for this account must be less than or equal to  ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.maxblackoutperiod}.`
          );
          alert(
            `Warning!!  You have entered ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.numblackoutperiods}  blackout periods.\n\nThe total number of blackout periods for this account must be less than or equal to  ${initialLoadData?.hotelAccountSpecific?.hotelAccountSpecificData?.maxblackoutperiod}.`
          );
        }
      });
    }
    return () => {
      if (history.action !== "POP") {
        sessionStorage.setItem("ClickedTabs", null);
        appContext.umMountCPAC = true;
        appContext.setumMountCPAC(appContext.umMountCPAC);
        contextType.componentUnload();
      }
      sessionStorage.removeItem("changedAmenities");
      sessionStorage.removeItem("blackOutdataBackup");
      sessionStorage.removeItem("longDateDisplay");
      sessionStorage.removeItem("totalDays");
      sessionStorage.removeItem("accountSpecDetails");
      sessionStorage.removeItem("changedEligData");
      appContext?.setBtAccGrpMeetAllDataFilled(false);
      appContext?.setBtAccSpecAllDataFilled(false);
      appContext?.setAccSpecScreenAccountStatus(null);
      setTimeout(() => {
        sessionStorage.removeItem("changedQuestions");
      }, 1500);
    };
  }, []);
  useEffect(() => {
    setLocalRateRebidFlag(appContext.priceRebidScreenFlags);
  }, [appContext.priceRebidScreenFlags]);

  useEffect(() => {
    appContext.setIsPrintAccountContainerPage(true);
    return () => {
      appContext.setIsPrintAccountContainerPage(false);
    };
  }, []);

  const getCPACData = (localAccName?) => {
    localAccName = localAccName ? localAccName : displayAccountName;
    const param = {
      marshaCode: marshaCode,
      hotelName: hotelName,
      hotelrfpid: hotelId,
      period: period,
      currtab: "",
      filterString:
        accountName !== null && accountName !== undefined
          ? accountName
          : localAccName,
      displayString: "FILTER",
      r_1: "FILTER",
      orderby: 1,

      switchAccountCenter: "1",
    };
    CPACAPI.getAccountGridData(param, "")
      .then((data) => {
        if (data === "error") {
          history.push({
            pathname: `/error`,
          });
        } else {
          setaccountData(data.accountCenterView?.hotelAccountCenterList[0]);
          if (data?.hotelData) {
            contextValue.setState({
              ...contextValue.state,
              gridData: {
                ...contextValue.state?.gridData,
                list: {
                  ...contextValue.state?.gridData?.list,
                  hotelData: data?.hotelData,
                  menu: data?.menu,
                },
              },
            });
          }
          sessionStorage.setItem("accountSpecDetails", JSON.stringify(data.accountCenterView?.hotelAccountCenterList[0]));
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((error) => {});
  };
  const getViewPrintPeriodList = () => {
    const param = {
      marshaCode: marshaCode,
      hotelName:
        history.location.accountSpecDetail != null
          ? history.location.accountSpecDetail.hotelname
          : hotelName || history.location.HotelName,
      hotelid: HotelIdData,

      period: period,
      accountid:
        contextType.state.accountCenterData?.hotelAccSpecificData?.accountid,
    };
    API.getPeriodList(param)
      .then((data) => {
        contextType.setViewPrintList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if(appContext?.accSpecScreenAccountStatus !== null && appContext?.accSpecScreenAccountStatus !== undefined && appContext?.accSpecScreenAccountStatus != "") {
      let accDataTemp = {...accountData};
      accDataTemp.accountStatus = appContext?.accSpecScreenAccountStatus; 
      setaccountData(accDataTemp);
    }
  }, [appContext?.accSpecScreenAccountStatus])

  const getAccountStatus = (status) => {
    appContext && appContext.setAccStatus && appContext.setAccStatus(status);
    if (status === "A") {
      return (
        <td>
          {" "}
          <img src={acceptedImg}></img>
        </td>
      );
    } else if (status === "S") {
      return (
        <td>
          {" "}
          <img src={requestImg}></img>
        </td>
      );
    } else if (status === "L") {
      return (
        <td>
          {" "}
          <img src={lockedImg}></img>
        </td>
      );
    } else if (status === "R") {
      return (
        <td>
          {" "}
          <img src={rejected}></img>
        </td>
      );
    } else {
      return "";
    }
  };

  const getAccountStatusFromHome = (rowData) => {
    if (rowData?.isAccepted != null && rowData?.isAccepted === "Y") {
      return <img src={acceptedImg}></img>;
    } else if (rowData?.isAccepted != null && rowData?.isAccepted === "N") {
      return <img src={rejected}></img>;
    } else if (rowData?.isLocked != null && rowData?.isLocked === "Y") {
      return <img src={lockedImg}></img>;
    } else if (rowData?.isSolicited != null && rowData?.isSolicited === "Y") {
      return <img src={requestImg}></img>;
    } else {
      return "";
    }
  };

  const returnChange = (event) => {
    appContext.setFromSave(false);
    const clickedTabs = sessionStorage.getItem("ClickedTabs");
    const hotelspecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );

    if (
      hotelspecificData.showrebid === "Y" &&
      (appContext.user.isHotelUser ||
        appContext.user.isLimitedSalesUser ||
        appContext?.user?.isSalesUser)
    ) {
      if (appContext.priceRebidScreenFlags.rebidTab !== "") {
        appContext.setRebidTick(appContext.priceRebidScreenFlags.rebidTab);
        contextType.setRebidStatus(appContext.priceRebidScreenFlags.rebidTab);
      }
      if (appContext.priceRebidScreenFlags.ratesRulesTab !== "") {
        appContext.setRateRulesTick(
          appContext.priceRebidScreenFlags.ratesRulesTab
        );
        contextType.setRatesRulesStatus(
          appContext.priceRebidScreenFlags.ratesRulesTab
        );
      }
      if (appContext.priceRebidScreenFlags.eligAmenityTab !== "") {
        appContext.setEligibilitiesTick(
          appContext.priceRebidScreenFlags.eligAmenityTab
        );
        contextType.setEligibilityStatus(
          appContext.priceRebidScreenFlags.eligAmenityTab
        );
      }
      if (appContext.priceRebidScreenFlags.BtQuestionTab === "R") {
        appContext.setBtgTick(appContext.priceRebidScreenFlags.BtQuestionTab);
        contextType.setBtgStatus(
          appContext.priceRebidScreenFlags.BtQuestionTab
        );
      }
    }

    if (
      appContext.user.isHotelUser &&
      accountData.hasavnsweredquestions !== "Y" &&
      appContext.isActiveTab != "btAndGroupAccount" &&
      (appContext.noRedirect ||
        (sessionStorage.getItem("isValidAGM") == "false" &&
          sessionStorage.getItem("VisitedAccGroupMeet") &&
          JSON.parse(sessionStorage.getItem("VisitedAccGroupMeet")) != null &&
          sessionStorage.getItem("VisitedAccGroupMeet") != "true"))
    ) {
      alert(Settings.emptryAlert);
    } else if (appContext.errorMessageAlert.show) {
      appContext.setDisplayNavigationAlert(!appContext.displayNavigationAlert);
    } else if (appContext.noRedirect && appContext.user.isHotelUser) {
      appContext.setActiveTab("btAndGroupAccount");
      alert(Settings.emptryAlert);
    } else if (
      appContext.isActiveTab == "rateNotes" &&
      appContext.user.isHotelUser &&
      appContext.errorMessageAlert.message != ""
    ) {
      alert(appContext.errorMessageAlert.message);
    } else if (
      appContext.markAsCompleteErrorAlert.show &&
      ((isUpdateHotel && appContext.isActiveTab == "rateRules") ||
        appContext.isActiveTab != "rateRules")
    ) {
      if (appContext.markAsCompleteErrorAlert.message !== "") {
        alert(appContext.markAsCompleteErrorAlert.message);
      }
    } else if (
      appContext.oneTimeNavigationAlert.show &&
      appContext.isActiveTab != "rateRules"
    ) {
      if (appContext.oneTimeNavigationAlert.message !== "") {
        alert(appContext.oneTimeNavigationAlert.message);
      }
      appContext.setOneTimeNavigationAlert({
        show: false,
        message: "",
      });
    } else {
      if (isUpdateHotel && appContext.isActiveTab !== "rateRules") {
        history.push({
          pathname: `/multihotelaccountcenter`,
          search: `?&navigateToMultipleHotel=true`,
          MarshaCode: marshaCode,
          prevPath: currentUrl,
        });
      } else if (appContext.isActiveTab === "rateRules") {
        const reData = JSON.parse(localStorage.getItem("ratesData"));
        const hasdOrg = JSON.parse(localStorage.getItem("orginalRatesData"));
        const ratesObj = JSON.parse(localStorage.getItem("ratesData"));
        if (
          appContext.rateRulesValidationMsg !== "" ||
          appContext.rateRulesValidationdateMsg !== "" ||
          appContext.rateRulesValidationAccLockedMsg !== "" ||
          appContext.rateRulesValidationPercentMsg !== "" ||
          appContext.rateRulesValidAccDeleteMsg !== "" ||
          appContext.rateRulesanswerCancellation !== "" ||
          appContext.rateRulesStayTierMsg !== "" ||
          appContext.rateRulesLOSMsg !== "" ||
          appContext.accountLockedLowHighMsg !== "" ||
          appContext.rateRulesRejectionReasonMsg !== ""
        ) {
          if (appContext.rateRulesAllValidationMsg !== "") {
            alert(appContext.rateRulesAllValidationMsg);
          } else if (appContext.rateRulesRejectionReasonMsg !== "") {
            alert(appContext.rateRulesRejectionReasonMsg);
          }
        } else if (appContext.dateValidationMsg !== "") {
          alert(appContext.dateValidationMsg);
        } else if (
          appContext.oneTimeNavigationAlert.show &&
          !appContext.oneTimeNavigationAlert.navigate
        ) {
          if (appContext.oneTimeNavigationAlert.message !== "") {
            alert(appContext.oneTimeNavigationAlert.message);
          }
          appContext.setOneTimeNavigationAlert({
            show: false,
            message: "",
            navigate: false,
          });
        } else if (appContext.markAsCompleteErrorAlert.show) {
          if (appContext.markAsCompleteErrorAlert.message !== "") {
            alert(appContext.markAsCompleteErrorAlert.message);
          }
        } else {
          if (appContext.navigateWithAlert !== "") {
            alert(appContext.navigateWithAlert);
            appContext.setNavigateWithAlert("");
          } else if (
            appContext.oneTimeNavigationAlert.show &&
            appContext.oneTimeNavigationAlert.navigate
          ) {
            if (appContext.oneTimeNavigationAlert.message !== "") {
              alert(appContext.oneTimeNavigationAlert.message);
            }
            appContext.setOneTimeNavigationAlert({
              show: false,
              message: "",
              navigate: false,
            });
          }
          if (isUpdateHotel) {
            history.push({
              pathname: `/multihotelaccountcenter`,
              search: `?&navigateToMultipleHotel=true`,
              MarshaCode: marshaCode,
              prevPath: currentUrl,
            });
          } else {
            history.push({
              pathname: `${Settings.parentRoute}/CPAC`,
              search: `?&MarshaCode=${marshaCode}&Period=${period}&HotelName=${hotelName}&Hotelrfpid=${hotelId}`,
              data: history?.location?.accountSpecDetail
                ? history?.location?.accountSpecDetail
                : history?.location?.data?.accountSpecDetail,
              HotelIdData: HotelIdData,
              returnScreen: true,
              prevPath: currentUrl,
            });
          }
        }
      } else {
        history.push({
          pathname: `${Settings.parentRoute}/CPAC`,
          search: `?&MarshaCode=${marshaCode}&Period=${period}&HotelName=${hotelName}&Hotelrfpid=${hotelId}`,
          data: history?.location?.accountSpecDetail
            ? history?.location?.accountSpecDetail
            : history?.location?.data?.accountSpecDetail,
          HotelIdData: HotelIdData,
          returnScreen: true,
          prevPath: currentUrl,
        });
      }
    }
  };

  const isAdminOrLimitedSalesOrSalesUser = () => {
    return (
      appContext?.user?.isAdminRole ||
      appContext?.user?.isLimitedSalesUser ||
      appContext?.user?.isSalesUser
    );
  };

  const setRateLoadStatusPopup = (flag: boolean) => {
    setRateLoadStatusPopupFlag(flag);
  };
  const getCognosUrl = () => {
    congnosEndPointUrl = appContext?.cognosURL?.COGNOS_LOGIN_URL;
  };

  const handleChange = (e) => {
    const value = contextType.state.periodList?.list?.filter(function (item) {
      return item.period == e.target.value;
    });
    setSelectedViewYear(value[0]?.period);
  };

  const submitViewPrintAction = () => {
    const value = contextType.state.periodList?.list?.filter(function (item) {
      return item.period == selectedViewYear;
    });

    if (period == value[0].period || value[0].selected == "Y") {
      const param = {
        hotelrfpid: value[0]?.hotelrfpid || hotelId,
        accountrecid: value[0]?.accountrecid || accountInfoid,
      };
      API.getHotelFinalPrintReport(param).then((data) => {
        // const popupParams = Settings.popupParams;
        // const url = congnosEndPointUrl + "&" + data.queryString;
        // let printWindow = window.open(url, data.title, popupParams);
        // printWindow.document.title = "Finla Print";

        let rfpid = value[0]?.hotelrfpid || hotelId;
        // const parms = Settings.popupParams;
        const urlWindow =
          window.location.origin +
            window.location.pathname.substring(
              0,
              window.location.pathname.lastIndexOf("/")
            ) +
            "/hotelReports?&ReportName=" +
            "Final Print" +
            "&HotelRfpid=" +
            rfpid +
            "&Accountrecid=" +
            value[0]?.accountrecid || accountInfoid;

        window.open(urlWindow, "_blank");
      });
    } else {
      alert(Settings.searchResult.generatePrintReportMessage);
    }
  };

  const saveHandler = (e) => {
    const clickedTabs = sessionStorage.getItem("ClickedTabs");
    if (
      appContext.user.isHotelUser &&
      appContext.errorMessageAlert.show &&
      appContext.errorMessageAlert.message != "" &&
      appContext.isActiveTab === "blackouts"
    ) {
      alert(appContext.errorMessageAlert.message);
      e.preventDefault();
    }
    if (
      contextType.state.activeTab === "rateRules" ||
      appContext.isActiveTab === "rateRules"
    ) {
      const reData = JSON.parse(localStorage.getItem("ratesData"));
      const hasdOrg = JSON.parse(localStorage.getItem("orginalRatesData"));
      const ratesObj = JSON.parse(localStorage.getItem("ratesData"));
      if (
        appContext.rateRulesValidationMsg !== "" ||
        appContext.rateRulesValidationdateMsg !== "" ||
        appContext.rateRulesValidationAccLockedMsg !== "" ||
        appContext.rateRulesValidationPercentMsg !== "" ||
        appContext.rateRulesValidAccDeleteMsg !== "" ||
        appContext.rateRulesanswerCancellation !== "" ||
        appContext.rateRulesStayTierMsg !== "" ||
        appContext.rateRulesLOSMsg !== "" ||
        appContext.accountLockedLowHighMsg !== "" ||
        appContext.rateRulesRejectionReasonMsg !== ""
      ) {
        if (appContext.rateRulesAllValidationMsg !== "") {
          alert(appContext.rateRulesAllValidationMsg);
        } else if (appContext.rateRulesRejectionReasonMsg !== "") {
          alert(appContext.rateRulesRejectionReasonMsg);
        }
      } else if (appContext.dateValidationMsg !== "") {
        alert(appContext.dateValidationMsg);
      } else if (appContext.errorMessageAlert.show) {
        appContext.setDisplayNavigationAlert(
          !appContext.displayNavigationAlert
        );
      } else if (appContext.navigateWithAlert !== "") {
        alert(appContext.navigateWithAlert);
      } else if (
        appContext.oneTimeNavigationAlert.show &&
        !appContext.oneTimeNavigationAlert.navigate
      ) {
        if (appContext.oneTimeNavigationAlert.message !== "") {
          alert(appContext.oneTimeNavigationAlert.message);
        }
        appContext.setOneTimeNavigationAlert({
          show: false,
          message: "",
          navigate: false,
        });
      } else if (appContext.markAsCompleteErrorAlert.show) {
        if (appContext.markAsCompleteErrorAlert.message !== "") {
          alert(appContext.markAsCompleteErrorAlert.message);
        }
      } else {
        if (
          appContext.oneTimeNavigationAlert.show &&
          appContext.oneTimeNavigationAlert.navigate
        ) {
          if (appContext.oneTimeNavigationAlert.message !== "") {
            alert(appContext.oneTimeNavigationAlert.message);
          }
          appContext.setOneTimeNavigationAlert({
            show: false,
            message: "",
            navigate: false,
          });
        }
        let percentDiscount = document.getElementById(
          "hasd[${hotel_accountinfoid}].strPercentdiscount"
        )?.value;
        if (percentDiscount) {
          percentDiscount =
            percentDiscount && Number(percentDiscount).toFixed(2);
          if (Number.isInteger(Number(percentDiscount))) {
            document.getElementById(
              "hasd[${hotel_accountinfoid}].strPercentdiscount"
            ).value = Number(percentDiscount).toFixed(1);
          } else {
            let decimals = percentDiscount && percentDiscount.split(".")[1];
            if (decimals) {
              let str = Array.from(decimals);
              if (str[1] === "0") {
                document.getElementById(
                  "hasd[${hotel_accountinfoid}].strPercentdiscount"
                ).value = Number(percentDiscount).toFixed(1);
              } else {
                document.getElementById(
                  "hasd[${hotel_accountinfoid}].strPercentdiscount"
                ).value = Number(percentDiscount).toFixed(2);
              }
            }
          }
        }
        handleRatesRulesSave();
        if (appContext.isMarkAsCompleteChecked) {
          updateAfterSave();
        }
      }
    } else if (appContext.isActiveTab === "rateNotes") {
      contextType.state.showScreenLoader = true;
      appContext.setRateNotesClicked(true);
      contextType.state.showScreenLoader = false;
    } else if (appContext.isActiveTab === "btAndGroupAccount") {
      appContext.setSaveBTGClicked(true);
    } else if (appContext.isActiveTab === "statusAccount") {
      appContext.setSaveStatusAccountClicked(
        !appContext.saveStatusAccountClicked
      );
    } else if (appContext.isActiveTab === "rebidRequests") {
      appContext.setSaveRebidRequestsClicked(true);
    } else if (appContext.isActiveTab === "CompellingBusiness") {
      appContext.setSaveCompelStatusClicked(
        !appContext.saveCompelStatusClicked
      );
    } else if (appContext.isActiveTab === "blackouts") {
      appContext.setSaveBlackoutStatusClicked(true);
    } else if (appContext.isActiveTab === "eligibilityAmenity") {
      appContext.setSaveEligibilityStatusClicked(true);
    } else if (appContext.isActiveTab === "groupsMeetings") {
      appContext.setSaveGroupMeetingClicked(true);
    } else {
      contextType.setState({
        ...contextType.state,
        saveEvent: e,
      });
    }
    if (
      appContext.isActiveTab != "rateRules" &&
      appContext.isActiveTab != "eligibilityAmenity" &&
      appContext.isActiveTab != "btAndGroupAccount" &&
      appContext.isActiveTab != "rateNotes" &&
      appContext.isActiveTab != "statusAccount"
    ) {
      final_SaveCheck("");
    } else if (
      appContext.isActiveTab == "rateNotes" &&
      appContext.errorMessageAlert.message == "" &&
      !appContext?.user?.isHotelUser
    ) {
      final_SaveCheck("");
    } else if (
      appContext.isActiveTab == "statusAccount" &&
      appContext.errorMessageAlert.message == ""
    ) {
      final_SaveCheck("");
    } else if (
      appContext.isActiveTab == "rateRules" &&
      !appContext.isMarkAsCompleteChecked &&
      !appContext?.user?.isHotelUser
    ) {
      final_SaveCheck("");
    } else if (
      appContext.isActiveTab == "eligibilityAmenity" &&
      !appContext?.user?.isHotelUser
    ) {
      final_SaveCheck("");
    } else if (
      appContext.isActiveTab == "btAndGroupAccount" &&
      !appContext?.user?.isHotelUser
    ) {
      final_SaveCheck("");
    }
  };
  const final_SaveCheck = (msg) => {
    const hotelspecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );
    const checkValdation = contextType.validateDetails(hotelspecificData, msg);

    if (checkValdation) {
      //contextType.state.showScreenLoader=true;
      updateAfterSave();
    }
  };

  const updateAfterSave = () => {
    const hotelspecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );

    if (!appContext.markAsCompleteErrorAlert.show) {
      contextType.setState({
        ...contextType.state,
        accountCenterData: {
          ...contextType.state.accountCenterData,
          hotelAccSpecificData: {
            ...contextType.state.accountCenterData.hotelAccSpecificData,
            markComplete: "N",
          },
        },
      });
    }
    setTimeout(() => {
      const bodyParams = {
        hotel_accountinfoid: hotelspecificData?.hotel_accountinfoid,
        strHassu: JSON.stringify({
          hotelid: hotelspecificData?.hotelid,
          hotelrfpid: hotelspecificData?.hotelrfpid,
          hotel_accountinfoid: hotelspecificData?.hotel_accountinfoid,
          accountrecid: hotelspecificData?.accountrecid,
          markComplete: appContext.isMarkAsCompleteChecked ? "Y" : "",
          tabstatus_status: appContext.pricingTick,
          tabelig_status: appContext.eligibilitiesTick,
          tabcompel_status: appContext.compelBisTick,
          tabrebid_status: appContext.rebidTick,
          tabgroup_status: appContext.btAccGrpTick,
          tabblackout_status: appContext.blackoutTick,
          tabfacility_status: appContext.facilityTick,
          tabquest_status: appContext.accSpecificTick,
          tabgengroup_status: appContext.genGroupMeetingsTick,
          tabspecificquest_status: appContext.btgTick,
          tabrates_status: appContext.rateRulesTick,
        }),
      };

      CPACAPI.updateAction(bodyParams)
        .then((data) => {})
        .catch((error) => {});
    }, 1000);
  };

  const stringToBoolean = (stringVal) => {
    switch (stringVal) {
      case "Y":
        return true;
      case "N":
        return false;
      case null:
        return false;
    }
  };

  const handleRatesRulesSave = async () => {
    const reData = JSON.parse(localStorage.getItem("ratesData"));
    const hasdOrg = JSON.parse(localStorage.getItem("orginalRatesData"));
    const ratesObj = reData.accountRates;
    const ratesArr = [];
    Object.keys(ratesObj).map((keys) => {
      if (ratesObj[keys].productid === "1") {
        ratesArr.push(ratesObj[keys].rate);
      }
    });
    const isValidRate = validateIfRatesAreValid(ratesObj, reData);

    const isSelectedRateTypeGPP =
      reData.ratetype_selected === 18 ? true : false;
    const isFloatAccAndDiscountExist =
      reData.ratetype_selected === 20 && reData.percentdiscount !== "";
    if (
      (isValidRate ||
        isSelectedRateTypeGPP ||
        contextType?.ratesRulesStatus === "C" ||
        isFloatAccAndDiscountExist) &&
      appContext.isMarkAsCompleteChecked &&
      (appContext?.user?.isAdminRole ||
        appContext?.user?.isLimitedSalesUser ||
        appContext?.user?.isSalesUser)
    ) {
      if (appContext.eligibilitiesTick === "R") {
        contextType?.setEligibilityStatus("C");
        appContext.setEligibilitiesTick("C");
      }
      contextType &&
        contextType?.setRatesRulesStatus &&
        contextType &&
        contextType?.setRatesRulesStatus("C");
      hasdOrg.hotelAccountSpecific.hotelAccountSpecificData.tabrates_status =
        "C";
      appContext.setRateRulesTick("C");
    } else {
      contextType &&
        contextType?.setRatesRulesStatus &&
        contextType &&
        contextType?.setRatesRulesStatus("");
      hasdOrg.hotelAccountSpecific.hotelAccountSpecificData.tabrates_status =
        "";
      appContext.setRateRulesTick("");
    }
    const dynamicRowItems = JSON.parse(
      localStorage.getItem("ratesDynamicRows")
    );
    const accountUpdateLOS = {};
    const accountUpdateSeason = {};
    const accountSeasonSave = {};
    const accountUpdateRates = {};
    const accountUpdateFixedRates = {};

    if (dynamicRowItems && dynamicRowItems.length > 0) {
      let emptySeasonIndexCheck = dynamicRowItems
        .map((f, i) => {
          if (
            f.accountSeason.startdate == "" ||
            f.accountSeason.enddate == ""
          ) {
            return i;
          }
        })
        .filter((field) => !!field);

      if (emptySeasonIndexCheck.length > 0) {
        emptySeasonIndexCheck.forEach((idx) => {
          dynamicRowItems.splice(idx, 1);
        });
      }

      dynamicRowItems.slice().forEach((item, index) => {
        item.accountSeason.seasonid = index + 1;
        item.accountSeason.name = item.accountSeason.seasonid.toString();
        Object.assign(accountUpdateSeason, {
          [item.accountSeason.seasonid]: {
            ...item.accountSeason,
          },
        });
        if (item.accountLOS !== null && !_.isEmpty(item.accountLOS)) {
          Object.entries(item.accountLOS).forEach(([key, los], losIndex) => {
            let seasonKey = key.split("_")[0];
            let prevKey = key;
            let regex = new RegExp(seasonKey);
            key = key.replace(regex, item.accountSeason.seasonid.toString());
            item.accountLOS[key] = los;
            if (item.accountLOS[prevKey] && prevKey !== key) {
              delete item.accountLOS[prevKey];
            }
            if (
              item.accountLOS[key].hasOwnProperty("isRoomNightsFromChanged")
            ) {
              delete item.accountLOS[key].isRoomNightsFromChanged;
            }
            if (item.accountLOS[key].hasOwnProperty("isRoomNightsToChanged")) {
              delete item.accountLOS[key].isRoomNightsToChanged;
            }
          });
          Object.assign(accountUpdateLOS, {
            ...item.accountLOS,
          });
        }

        if (item.accountRates !== null && !_.isEmpty(item.accountRates)) {
          Object.entries(item.accountRates).forEach(
            ([key, accRates], accRatesIndex) => {
              let seasonKey = key.split("_")[0];
              let prevKey = key;
              let regex = new RegExp(seasonKey);
              key = key.replace(regex, item.accountSeason.seasonid.toString());
              item.accountRates[key] = accRates;
              item.accountRates[key].seasonid = item.accountSeason.seasonid;
              if (item.accountRates[prevKey] && prevKey !== key) {
                delete item.accountRates[prevKey];
              }
              if (item.accountRates[key].rate == "") {
                item.accountRates[key].rate = null;
              }
              if (item.accountRates[key].required) {
                delete item.accountRates[key].required;
              }
            }
          );
          Object.assign(accountUpdateRates, {
            ...item.accountRates,
          });
        }

        if (item.fixedRates !== null && !_.isEmpty(item.fixedRates)) {
          Object.entries(item.fixedRates).forEach(
            ([key, fixdRates], fixdRatesIndex) => {
              let seasonKey = key.split("_")[0];
              let prevKey = key;
              let regex = new RegExp(seasonKey);
              key = key.replace(regex, item.accountSeason.seasonid.toString());
              item.fixedRates[key] = fixdRates;
              item.fixedRates[key].seasonid = item.accountSeason.seasonid;
              if (item.fixedRates[prevKey] && prevKey !== key) {
                delete item.fixedRates[prevKey];
              }
              if (item.fixedRates[key].rate == "") {
                item.fixedRates[key].rate = null;
              }
            }
          );
          Object.assign(accountUpdateFixedRates, {
            ...item.fixedRates,
          });
        }
      });
    }

    reData.accountSeason = accountUpdateSeason;
    reData.accountLOS = accountUpdateLOS;
    reData.accountRates = accountUpdateRates;
    reData.fixedRates = accountUpdateFixedRates;

    await ratesandrulescontext.updateRates(
      reData,
      reData?.hotel_accountinfoid,
      hasdOrg?.hotelAccountSpecific?.hotelAccountSpecificData,
      appContext?.user
    );
    if (contextType.ratesRulesStatus === "C") {
      contextType &&
        contextType?.setRatesRulesStatus &&
        contextType &&
        contextType?.setRatesRulesStatus("C");
      appContext &&
        appContext?.setRatesRulesStatus &&
        appContext &&
        appContext?.setRatesRulesStatus("C");
    } else {
      appContext &&
        contextType?.setRatesRulesStatus &&
        appContext &&
        contextType.setRatesRulesStatus("");
      appContext &&
        appContext?.setRatesRulesStatus &&
        appContext &&
        appContext?.setRatesRulesStatus("");
    }
  };

  const validateIfRatesAreValid = (ratesObj, reData) => {
    const ratesLRAArrPoolWise = [];
    let isValidRate;
    const noOfRoomPools = reData.roompoolflags.length;
    const noOfLos = Object.entries(reData.accountLOS).length;
    const noOfSeasons = Object.entries(reData.accountSeason).length;
    if (
      (reData && noOfRoomPools && noOfSeasons && ratesObj) ||
      (reData && noOfRoomPools && noOfLos && ratesObj)
    ) {
      if (isRoomTypeThree(ratesObj)) {
        for (let j = 1; j <= noOfRoomPools; j++) {
          const ratesLRAArrSessionWise = [];
          for (let i = 1; i <= noOfLos; i++) {
            const newKey = [];
            newKey.push(1);
            newKey.push(i);
            newKey.push(j);
            newKey.push(1);
            newKey.push(3);
            const key = newKey.join("_");
            ratesLRAArrSessionWise.push(ratesObj[key]?.rate);
          }
          ratesLRAArrPoolWise.push(ratesLRAArrSessionWise);
        }
      } else {
        for (let j = 1; j <= noOfRoomPools; j++) {
          const ratesLRAArrSessionWise = [];
          for (let i = 1; i <= noOfSeasons; i++) {
            const newKey1 = [];
            newKey1.push(i);
            newKey1.push(1);
            newKey1.push(j);
            newKey1.push(1);
            newKey1.push(1);
            const key1 = newKey1.join("_");
            ratesLRAArrSessionWise.push(ratesObj[key1]?.rate);
            const newKey2 = [];
            newKey2.push(i);
            newKey2.push(1);
            newKey2.push(j);
            newKey2.push(1);
            newKey2.push(2);
            const key2 = newKey2.join("_");
            ratesLRAArrSessionWise.push(ratesObj[key2]?.rate);
          }
          ratesLRAArrPoolWise.push(ratesLRAArrSessionWise);
        }
      }
      const ratesCondition = (strValue) => strValue !== null;
      ratesLRAArrPoolWise.forEach((ratesLRASubArr) => {
        isValidRate =
          (ratesLRASubArr.length > 0 && ratesLRASubArr.every(ratesCondition)) ||
          isValidRate
            ? true
            : false;
      });
      return isValidRate;
    }
    return false;
  };

  const isRoomTypeThree = (ratesObj) => {
    return Object.keys(ratesObj).every((key) => ratesObj[key].roomtypeid === 3);
  };

  const accountNameClickHandler = (accountrecid) => {
    const parms = Settings.accountNamePopupParams;
    const url =
      window.location.origin +
      window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf("/")
      ) +
      "/hotelReports?&ReportName=" +
      "Account Overview Report." +
      "&AccountId=" +
      accountrecid;
    window.open(url, "_blank");
  };

  return (
    <Layout hideInfo={true}>
      <CModal
        title={Settings.rateLoadStatusTitle}
        onClose={() => {
          setRateLoadStatusPopup(false);
        }}
        show={rateLoadStatusPopupFlag}
        xPosition={-300}
        yPosition={-200}
      >
        <RateLoadStatus {...rateLoadStatus} />
      </CModal>
      {/* {ratesandrulescontext.pageLoader && <CLoader />} */}
      <HotelPricingContext.Consumer>
        {(pricingContext) => {
          contextValue = pricingContext;

          return (
            <div className={isUpdateHotel ? "updateHotelContainer" : ""}>
              <AccountCenterTabsContextProvider>
                <AccountCenterTabsContext.Consumer>
                  {(statusaccountpricingContext) => {
                    contextType = statusaccountpricingContext;

                    rateLoadStatus = {
                      rateLoadStatus: contextType.state?.rateLoadStatus,
                      initialload: contextType.state?.initialload,
                      rateOfferName: contextType.state?.rateOfferName,
                    };

                    return (
                      <>
                        {contextType.state.showScreenLoader ? (
                          <img
                            className={styles.loaderImg}
                            src={screenLoader}
                          ></img>
                        ) : (
                          <>
                            <div className={styles.HeaderTitle}>
                              {marshaCode} -{" "}
                              {contextType?.state?.hotelName != null
                                ? contextType?.state?.hotelName
                                : hotelName}
                              :{" "}
                              <span
                                className={styles.titleLink}
                                onClick={() => {
                                  accountNameClickHandler(
                                    accountData?.accountrecid
                                  );
                                }}
                              >
                                {accountName ? accountName : displayAccountName}
                              </span>
                              <span>
                                {prevLocation == "accountstatus"
                                  ? getAccountStatusFromHome(accountData)
                                  : getAccountStatus(
                                      accountData?.accountStatus != null
                                        ? accountData?.accountStatus
                                        : history?.location?.data?.accountStatus
                                    )}
                              </span>
                              <span>
                                {accountData?.aer_account != null &&
                                accountData?.aer_account === "Y" &&
                                (accountData?.excludeaer === null ||
                                  accountData?.excludeaer === "" ||
                                  (accountData?.excludeaer != null &&
                                    accountData?.excludeaer === "N")) ? (
                                  <span>
                                    {accountData?.ismaxaer &&
                                    accountData?.ismaxaer === "Y" ? (
                                      <img src={aerlevel1}></img>
                                    ) : (
                                      <img src={aer}></img>
                                    )}
                                  </span>
                                ) : (
                                  ""
                                )}

                                {accountData?.noSquatter === "Y" ? (
                                  <img src={noSquatter}></img>
                                ) : (
                                  ""
                                )}
                                {accountData?.hotel_display === "N" ? (
                                  <img src={noview}></img>
                                ) : (
                                  ""
                                )}
                                {accountData?.accountpricingcycleid == 2 ? (
                                  <img src={toYear}></img>
                                ) : (
                                  ""
                                )}
                                {accountData?.accountpricingcycleid == 3 ||
                                accountData?.offcycle === "Y" ? (
                                  <img src={offCycle}></img>
                                ) : (
                                  ""
                                )}
                                {accountData?.isNew === "Y" ? (
                                  <img src={isnew}></img>
                                ) : (
                                  ""
                                )}
                                {accountData?.top_account === "Y" ? (
                                  <img src={wifi}></img>
                                ) : (
                                  ""
                                )}
                                {accountData?.bt_booking_cost === "Y" ? (
                                  <img src={btBookingCost}></img>
                                ) : (
                                  ""
                                )}
                                {accountData?.roll_over === "Y" ||
                                accountData?.rollover === "Y" ? (
                                  <img src={rollOver}></img>
                                ) : (
                                  ""
                                )}
                              </span>
                            </div>
                            <table>
                              <tbody>
                                <tr className={styles.verticalAlignTop}>
                                  <td
                                    className={styles.field_Value}
                                    style={{ width: "80px" }}
                                  >
                                    <b>Period: </b>
                                    {period}
                                  </td>
                                  <td style={{ width: "5px" }} />
                                  <td
                                    className={styles.field_Value}
                                    style={{ width: "300px" }}
                                  >
                                    <b>Currency used in Quotations: </b>
                                    {contextType.state.currency !== null
                                      ? contextType.state.currency
                                      : contextType.state.accountCenterData.data
                                          .currency}
                                  </td>
                                  <td style={{ width: "10px" }} />
                                  <td>
                                    <img
                                      src={
                                        isUpdateHotel
                                          ? btnReturnHotelCenter
                                          : btnReturnAccountCenter
                                      }
                                      onClick={(e) => returnChange(e)}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <hr className={styles.seperator}></hr>
                            <div
                              style={{ marginLeft: "2px" }}
                              className={styles.priceaccountbtn}
                            >
                              <div className={styles.priceaccountdesign}>
                                <div style={{ width: "280px", height: "25px" }}>
                                  <div style={{ position: "relative" }}>
                                    <div
                                      style={{
                                        float: "left",
                                        width: "60px",
                                        height: "20px",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <div>
                                        <img
                                          className={styles.BtnNew}
                                          onClick={(e) => {
                                            saveHandler(e);
                                          }}
                                          src={btnSave}
                                          id="saveButton"
                                          alt="Save"
                                        />
                                      </div>
                                    </div>
                                    {!appContext.user.isHotelUser ? (
                                      <div
                                        className={styles.field_Name}
                                        style={{
                                          float: "left",
                                          width: "130px",
                                          height: "20px",
                                          verticalAlign: "middle",
                                          marginTop: "1px",
                                        }}
                                      >
                                        <input
                                          type="checkbox"
                                          id="hassu.markComplete"
                                          name="hassu.markComplete"
                                          checked={
                                            contextType.state.accountCenterData
                                              ?.hotelAccSpecificData
                                              ?.markComplete != null
                                              ? stringToBoolean(
                                                  contextType.state
                                                    .accountCenterData
                                                    ?.hotelAccSpecificData
                                                    ?.markComplete
                                                )
                                              : false
                                          }
                                          value={
                                            contextType.state.accountCenterData
                                              ?.hotelAccSpecificData
                                              ?.markComplete != null
                                              ? contextType.state
                                                  .accountCenterData
                                                  ?.hotelAccSpecificData
                                                  ?.markComplete === Settings.y
                                                ? Settings.y
                                                : Settings.n
                                              : Settings.n
                                          }
                                          onChange={(e) =>
                                            contextType.checkBoxHandler(e)
                                          }
                                        />{" "}
                                        Mark as Complete{" "}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className={styles.view_print}>
                                    <a
                                      href="javascript:void(0);"
                                      className={styles.view_print_link}
                                      onClick={() => {
                                        setIsViewPrint(true);
                                        getViewPrintPeriodList();
                                      }}
                                    >
                                      <b>View/Print</b>
                                    </a>
                                    {isViewPrint ? (
                                      <CModal
                                        title={"view/print"}
                                        xPosition={-150}
                                        yPosition={-110}
                                        onClose={(e) => {
                                          setIsViewPrint(false);
                                        }}
                                        show={isViewPrint}
                                      >
                                        <div
                                          className={styles.view_print_modal}
                                        >
                                          <form>
                                            <div
                                              className={
                                                styles.view_print_modal_body
                                              }
                                            >
                                              <table>
                                                <tbody>
                                                  <tr>
                                                    {" "}
                                                    <td>
                                                      <div>
                                                        Select Pricing Year :{" "}
                                                        <select
                                                          id="finalPrintReport"
                                                          name="finalPrintReport"
                                                          autoFocus
                                                          defaultValue={
                                                            selectedViewYear
                                                          }
                                                          value={
                                                            selectedViewYear
                                                              ? selectedViewYear
                                                              : period
                                                          }
                                                          onChange={
                                                            handleChange
                                                          }
                                                        >
                                                          {contextType.state.periodList?.list?.map(
                                                            (item) => {
                                                              return (
                                                                <option
                                                                  key={
                                                                    item.period
                                                                  }
                                                                  value={
                                                                    item.period
                                                                  }
                                                                >
                                                                  {item.period}
                                                                </option>
                                                              );
                                                            }
                                                          )}
                                                        </select>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      colSpan={4}
                                                      align="center"
                                                    >
                                                      <br />
                                                      <img
                                                        src={submittBtn}
                                                        onClick={() => {
                                                          submitViewPrintAction();
                                                        }}
                                                      ></img>
                                                      &nbsp;
                                                      <img
                                                        src={cancelBtn}
                                                        onClick={() => {
                                                          setIsViewPrint(false);
                                                        }}
                                                      ></img>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </form>
                                        </div>
                                      </CModal>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className={styles.roompoolGroup}>
                                            <div
                                              style={{ float: "left" }}
                                              className={styles.poolGroup}
                                            >
                                              <table
                                                className={styles.roomPoolTable}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      colSpan={2}
                                                      className={
                                                        styles.pgoosStatusHeader
                                                      }
                                                      align="center"
                                                    >
                                                      Room Pool Group 1
                                                    </td>
                                                  </tr>
                                                  {contextType.state.pgoosData.map(
                                                    (i, index) => {
                                                      if (index < 2) {
                                                        return (
                                                          <tr
                                                            className={
                                                              styles.bdRight
                                                            }
                                                          >
                                                            <td
                                                              className={`${styles.pgoosstabledata} ${styles.field_Name}`}
                                                            >
                                                              {
                                                                contextType
                                                                  .state
                                                                  .pgoosData[
                                                                  index
                                                                ].rateprog
                                                              }
                                                            </td>
                                                            {contextType.state
                                                              .pgoosData[index]
                                                              .latestStatus ==
                                                              null &&
                                                              contextType.state
                                                                .pgoosData[
                                                                index
                                                              ].rateprog && (
                                                                <td
                                                                  className={`${styles.pgoosstablestatus}`}
                                                                >
                                                                  {"NA"}
                                                                </td>
                                                              )}
                                                            {contextType.state
                                                              .pgoosData[index]
                                                              .latestStatus !=
                                                              null &&
                                                              (statusDecode[
                                                                contextType
                                                                  .state
                                                                  .pgoosData[
                                                                  index
                                                                ].latestStatus
                                                                  .status
                                                              ] == "Error" ||
                                                                statusDecode[
                                                                  contextType
                                                                    .state
                                                                    .pgoosData[
                                                                    index
                                                                  ].latestStatus
                                                                    .status
                                                                ] != null) && (
                                                                <td
                                                                  className={
                                                                    statusDecode[
                                                                      contextType
                                                                        .state
                                                                        .pgoosData[
                                                                        index
                                                                      ]
                                                                        .latestStatus
                                                                        .status
                                                                    ] == "Error"
                                                                      ? `${styles.pgoosstablestatusError} ${styles.alignCenter}`
                                                                      : styles.alignCenter
                                                                  }
                                                                >
                                                                  {
                                                                    statusDecode[
                                                                      contextType
                                                                        .state
                                                                        .pgoosData[
                                                                        index
                                                                      ]
                                                                        .latestStatus
                                                                        .status
                                                                    ]
                                                                  }
                                                                </td>
                                                              )}
                                                            {contextType.state
                                                              .pgoosData[index]
                                                              .latestStatus !=
                                                              null &&
                                                              contextType.state
                                                                .pgoosData[
                                                                index
                                                              ].latestStatus
                                                                .status ==
                                                                null &&
                                                              contextType.state
                                                                .pgoosData[
                                                                index
                                                              ].rateprog !=
                                                                null && (
                                                                <td
                                                                  className={`${styles.pgoosstablestatus}`}
                                                                >
                                                                  NA
                                                                </td>
                                                              )}
                                                          </tr>
                                                        );
                                                      }
                                                    }
                                                  )}
                                                </tbody>
                                              </table>
                                            </div>
                                            {contextType.state.pgoosData
                                              .length > 2 &&
                                              contextType.state.maxroompools >=
                                                2 && (
                                                <div
                                                  style={{ float: "left" }}
                                                  className={styles.poolGroup}
                                                >
                                                  <table
                                                    className={
                                                      styles.roomPoolTable
                                                    }
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          colSpan={2}
                                                          className={
                                                            styles.pgoosStatusHeader
                                                          }
                                                          align="center"
                                                        >
                                                          Room Pool Group 2
                                                        </td>
                                                      </tr>
                                                      {contextType.state.pgoosData.map(
                                                        (i, index) => {
                                                          if (
                                                            index > 1 &&
                                                            index < 4
                                                          ) {
                                                            return (
                                                              <tr>
                                                                <td
                                                                  className={`${styles.pgoosstabledata} ${styles.field_Name}`}
                                                                >
                                                                  {
                                                                    contextType
                                                                      .state
                                                                      .pgoosData[
                                                                      index
                                                                    ].rateprog
                                                                  }
                                                                </td>

                                                                {contextType
                                                                  .state
                                                                  .pgoosData[
                                                                  index
                                                                ]
                                                                  .latestStatus ==
                                                                  null &&
                                                                  contextType
                                                                    .state
                                                                    .pgoosData[
                                                                    index
                                                                  ]
                                                                    .rateprog && (
                                                                    <td
                                                                      className={`${styles.pgoosstablestatus}`}
                                                                    >
                                                                      {"NA"}
                                                                    </td>
                                                                  )}
                                                                {contextType
                                                                  .state
                                                                  .pgoosData[
                                                                  index
                                                                ]
                                                                  .latestStatus !=
                                                                  null &&
                                                                  (statusDecode[
                                                                    contextType
                                                                      .state
                                                                      .pgoosData[
                                                                      index
                                                                    ]
                                                                      .latestStatus
                                                                      .status
                                                                  ] ==
                                                                    "Error" ||
                                                                    statusDecode[
                                                                      contextType
                                                                        .state
                                                                        .pgoosData[
                                                                        index
                                                                      ]
                                                                        .latestStatus
                                                                        .status
                                                                    ] !=
                                                                      null) && (
                                                                    <td
                                                                      className={
                                                                        statusDecode[
                                                                          contextType
                                                                            .state
                                                                            .pgoosData[
                                                                            index
                                                                          ]
                                                                            .latestStatus
                                                                            .status
                                                                        ] ==
                                                                        "Error"
                                                                          ? `${styles.pgoosstablestatusError} ${styles.alignCenter}`
                                                                          : styles.alignCenter
                                                                      }
                                                                    >
                                                                      {
                                                                        statusDecode[
                                                                          contextType
                                                                            .state
                                                                            .pgoosData[
                                                                            index
                                                                          ]
                                                                            .latestStatus
                                                                            .status
                                                                        ]
                                                                      }
                                                                    </td>
                                                                  )}
                                                                {contextType
                                                                  .state
                                                                  .pgoosData[
                                                                  index
                                                                ]
                                                                  .latestStatus !=
                                                                  null &&
                                                                  contextType
                                                                    .state
                                                                    .pgoosData[
                                                                    index
                                                                  ].latestStatus
                                                                    .status ==
                                                                    null &&
                                                                  contextType
                                                                    .state
                                                                    .pgoosData[
                                                                    index
                                                                  ].rateprog !=
                                                                    null && (
                                                                    <td
                                                                      className={`${styles.pgoosstablestatus}`}
                                                                    >
                                                                      NA
                                                                    </td>
                                                                  )}
                                                              </tr>
                                                            );
                                                          }
                                                        }
                                                      )}
                                                    </tbody>
                                                  </table>
                                                </div>
                                              )}
                                            {contextType.state.pgoosData
                                              .length > 4 &&
                                              contextType.state.maxroompools >=
                                                3 && (
                                                <div
                                                  style={{ float: "left" }}
                                                  className={styles.poolGroup}
                                                >
                                                  <table
                                                    className={
                                                      styles.roomPoolTable
                                                    }
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          colSpan={2}
                                                          className={
                                                            styles.pgoosStatusHeader
                                                          }
                                                          align="center"
                                                        >
                                                          Room Pool Group 3
                                                        </td>
                                                      </tr>
                                                      {contextType.state.pgoosData.map(
                                                        (i, index) => {
                                                          if (
                                                            index > 3 &&
                                                            index < 6
                                                          ) {
                                                            return (
                                                              <tr>
                                                                <td
                                                                  className={`${styles.pgoosstabledata} ${styles.field_Name}`}
                                                                >
                                                                  {
                                                                    contextType
                                                                      .state
                                                                      .pgoosData[
                                                                      index
                                                                    ].rateprog
                                                                  }
                                                                </td>

                                                                {contextType
                                                                  .state
                                                                  .pgoosData[
                                                                  index
                                                                ]
                                                                  .latestStatus ==
                                                                  null &&
                                                                  contextType
                                                                    .state
                                                                    .pgoosData[
                                                                    index
                                                                  ]
                                                                    .rateprog && (
                                                                    <td
                                                                      className={`${styles.pgoosstablestatus}`}
                                                                    >
                                                                      {"NA"}
                                                                    </td>
                                                                  )}
                                                                {contextType
                                                                  .state
                                                                  .pgoosData[
                                                                  index
                                                                ]
                                                                  .latestStatus !=
                                                                  null &&
                                                                  (statusDecode[
                                                                    contextType
                                                                      .state
                                                                      .pgoosData[
                                                                      index
                                                                    ]
                                                                      .latestStatus
                                                                      .status
                                                                  ] ==
                                                                    "Error" ||
                                                                    statusDecode[
                                                                      contextType
                                                                        .state
                                                                        .pgoosData[
                                                                        index
                                                                      ]
                                                                        .latestStatus
                                                                        .status
                                                                    ] !=
                                                                      null) && (
                                                                    <td
                                                                      className={
                                                                        statusDecode[
                                                                          contextType
                                                                            .state
                                                                            .pgoosData[
                                                                            index
                                                                          ]
                                                                            .latestStatus
                                                                            .status
                                                                        ] ==
                                                                        "Error"
                                                                          ? `${styles.pgoosstablestatusError} ${styles.alignCenter}`
                                                                          : styles.alignCenter
                                                                      }
                                                                    >
                                                                      {
                                                                        statusDecode[
                                                                          contextType
                                                                            .state
                                                                            .pgoosData[
                                                                            index
                                                                          ]
                                                                            .latestStatus
                                                                            .status
                                                                        ]
                                                                      }
                                                                    </td>
                                                                  )}
                                                                {contextType
                                                                  .state
                                                                  .pgoosData[
                                                                  index
                                                                ]
                                                                  .latestStatus !=
                                                                  null &&
                                                                  contextType
                                                                    .state
                                                                    .pgoosData[
                                                                    index
                                                                  ].latestStatus
                                                                    .status ==
                                                                    null &&
                                                                  contextType
                                                                    .state
                                                                    .pgoosData[
                                                                    index
                                                                  ].rateprog !=
                                                                    null && (
                                                                    <td
                                                                      className={`${styles.pgoosstablestatus}`}
                                                                    >
                                                                      NA
                                                                    </td>
                                                                  )}
                                                              </tr>
                                                            );
                                                          }
                                                        }
                                                      )}
                                                    </tbody>
                                                  </table>
                                                </div>
                                              )}
                                          </div>
                                        </td>
                                        <td valign="top">
                                          {" "}
                                          <a
                                            href="javascript:void(0);"
                                            onClick={() => {
                                              setRateLoadStatusPopup(true);
                                            }}
                                          >
                                            <b>
                                              Rate Load Status Detail
                                              <b />
                                            </b>
                                          </a>
                                          <b>
                                            <b> </b>
                                          </b>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div style={{ position: "relative" }}>
                                    <div
                                      className={styles.floatleft}
                                      style={{
                                        width: "150px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Marriott Global Lead
                                    </div>
                                    <div
                                      className={styles.floatleft}
                                      style={{ width: "150px" }}
                                    >
                                      {" "}
                                      {
                                        contextType.state.globalSalesHead
                                          ?.contactname
                                      }
                                    </div>
                                    <div
                                      className={styles.floatleft}
                                      style={{
                                        width: "32px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Email
                                    </div>
                                    <div
                                      className={styles.floatleft}
                                      style={{ width: "255px" }}
                                    >
                                      {
                                        contextType.state.globalSalesHead
                                          ?.contactemail
                                      }
                                    </div>
                                  </div>
                                </div>
                                {contextType.state.accountCenterData?.data
                                  .hotelAccountSpecific ? (
                                  <AccountCenterTabs
                                    data={
                                      contextType.state.accountCenterData?.data
                                    }
                                    state={contextType}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    );
                  }}
                </AccountCenterTabsContext.Consumer>
              </AccountCenterTabsContextProvider>
            </div>
          );
        }}
      </HotelPricingContext.Consumer>
      <style>{`
        .updateHotelContainer{
          background:"#ccc";
        }
        .updateHotelContainer .updateratesrules, .updateHotelContainer .updatepriceeliami, .updateHotelContainer .updatehotelpageOutline, .updateHotelContainer .updatestatusaccountpricing, .updateHotelContainer .updategroupsandmeeet, .updateHotelContainer .updatecpblackout, .updateHotelContainer .updateratenotesfacility{
          height:calc(100vh - 280px);
        }
        .updateHotelContainer .updatepriceeliami{
          height: calc(100vh - 280px);
          overflow: auto;
        }
        .updateHotelContainer .compilingbusinesscase{
          height: calc(100vh - 285px) !important;
          padding:0 5px;
        }
        .updateHotelContainer .updaterebidrates, .updateHotelContainer .updatehotelaccountquestion{
          height: calc(100vh - 290px) !important;
        }
        @media only screen and (min-width: 1920px) {
          .updateHotelContainer .updaterebidrates, .updateHotelContainer .updatehotelaccountquestion{
            height: calc(100vh - 295px) !important;
          }
        }
        @media only screen and (max-width: 795px) {
          .updateHotelContainer .updateratesrules, .updateHotelContainer .updatepriceeliami, .updateHotelContainer .updatehotelpageOutline, .updateHotelContainer .updatestatusaccountpricing, .updateHotelContainer .updategroupsandmeeet, .updateHotelContainer .updatecpblackout, .updateHotelContainer .updateratenotesfacility{
            height:calc(100vh - 280px);
          }
          .updateHotelContainer .updaterebidrates{
            height: calc(100vh - 285px) !important;
          }
          .updateHotelContainer .updatehotelaccountquestion{
            height: calc(100vh - 290px) !important;
          }
          .updateHotelContainer .compilingbusinesscase{
            height: calc(100vh - 285px) !important;
            padding:0 5px;
          }
          .page_body_container{
            min-height:calc(100vh - 89px) !important;
          }
        }

      `}</style>
    </Layout>
  );
}
export default PrintAccountContainer;
