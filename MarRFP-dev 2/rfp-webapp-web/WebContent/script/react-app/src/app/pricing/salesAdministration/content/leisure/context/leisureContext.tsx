import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Settings from "../static/Settings";
import LeisureAPI from "../service/leisureAPI";
import Utils from "../../../../../common/utils/Utils";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

// Set state variables and function
const LeisureContext = React.createContext({});

let period;
let accountrecid;
let accountName;

export const LeisureContextProvider = (props) => {
  const urlParms = useLocation().search;
  const salescontext: any = useContext(SalesAdministartionContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  accountrecid = new URLSearchParams(urlParms).get("accountrecid");
  period = new URLSearchParams(urlParms).get("year");
  accountName = new URLSearchParams(urlParms).get("accountName");
  const [validationMessage, setValidationMessage] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [state, setState] = useState({
    leisureDetails: null,
    lastUpdateDateValue: null,
    showScreenLoader: false,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const getData = () => {
    state.showScreenLoader = true;
    LeisureAPI.getData(accountrecid, accountName, period).then((data) => {
      state.leisureDetails = data.leisure;
      setState({
        ...state,
        showScreenLoader: false,
        leisureDetails: state.leisureDetails,
        lastUpdateDateValue: data.lastupdatedate,
      });
    });
  };
  const submitData = () => {
    let isValid = false;
    if (validation()) {
      const body = {
        strLeisure: JSON.stringify(state.leisureDetails),
        formChg: "Y",
        period: period,
        accountrecid: accountrecid,
        accountname: accountName,
      };
      isValid = true;
      const postData = Utils.createPostData(body);
      setLoader(true);
      LeisureAPI.submitData(postData).then((data) => {
        setLoader(false);
        if (data === "success") {
          // window.location.reload();
          getData();
        }
      });
    }
    return isValid;
  };

  const closeValidationModal = () => {
    setShowValidationModal(false);
  };
  const handleCommonChange = (e, inputType) => {
    const obj = state.leisureDetails;
    obj[inputType] = e.target.value;
    const validData = lengthCheck();
    if (validData) {
      setState({ ...state, leisureDetails: state.leisureDetails });
    }
  };

  useEffect(() => {
    if (appContext.navbarClicked) {
      setShowValidationModal(false);
    }
  }, [appContext.navbarClicked]);

  const lengthCheck = () => {
    const stateData = state.leisureDetails;
    if (stateData.stOverview !== null && stateData.stOverview.length > 1024) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.validationMessages.stOverview
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.validationMessages.stOverview,
        type: "custom",
      });
      return false;
    } else if (
      stateData.marketing !== null &&
      stateData.marketing.length > 3072
    ) {
      salescontext.setAlertMsgfunc(true, Settings.validationMessages.marketing);
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.validationMessages.marketing,
        type: "custom",
      });
      return false;
    } else if (
      stateData.strengths !== null &&
      stateData.strengths.length > 1024
    ) {
      salescontext.setAlertMsgfunc(true, Settings.validationMessages.strengths);
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.validationMessages.strengths,
        type: "custom",
      });
      return false;
    } else if (
      stateData.leisureSegment !== null &&
      stateData.leisureSegment.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.validationMessages.leisureSegment
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.validationMessages.leisureSegment,
        type: "custom",
      });
      return false;
    } else if (
      stateData.onwardDistribution !== null &&
      stateData.onwardDistribution.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.validationMessages.onwardDistribution
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.validationMessages.onwardDistribution,
        type: "custom",
      });
      return false;
    } else if (
      stateData.contracting !== null &&
      stateData.contracting.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.validationMessages.contracting
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.validationMessages.contracting,
        type: "custom",
      });
      return false;
    } else {
      salescontext.setAlertMsgfunc(false, "");
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "custom",
      });
      return true;
    }
  };

  const validation = () => {
    const stateData = state.leisureDetails;
    if (stateData.stOverview !== null && stateData.stOverview.length > 1024) {
      setValidationMessage(Settings.validationMessages.stOverview);
      setShowValidationModal(true);
    } else if (
      stateData.marketing !== null &&
      stateData.marketing.length > 3072
    ) {
      setValidationMessage(Settings.validationMessages.marketing);
      setShowValidationModal(true);
    } else if (
      stateData.strengths !== null &&
      stateData.strengths.length > 1024
    ) {
      setValidationMessage(Settings.validationMessages.strengths);
      setShowValidationModal(true);
    } else if (
      stateData.leisureSegment !== null &&
      stateData.leisureSegment.length > 1024
    ) {
      setValidationMessage(Settings.validationMessages.leisureSegment);
      setShowValidationModal(true);
    } else if (
      stateData.onwardDistribution !== null &&
      stateData.onwardDistribution.length > 1024
    ) {
      setValidationMessage(Settings.validationMessages.onwardDistribution);
      setShowValidationModal(true);
    } else if (
      stateData.contracting !== null &&
      stateData.contracting.length > 1024
    ) {
      setValidationMessage(Settings.validationMessages.contracting);
      setShowValidationModal(true);
    } else {
      return true;
    }
  };

  const leisureList = {
    state,
    setState,
    getData,
    handleCommonChange,
    submitData,
    validationMessage,
    showValidationModal,
    closeValidationModal,
    lengthCheck,
    setLoader,
  };

  return (
    <LeisureContext.Provider value={leisureList}>
      {props.children}
    </LeisureContext.Provider>
  );
};
export const LeisureContextConsumer = LeisureContext.Consumer;
export default LeisureContext;
