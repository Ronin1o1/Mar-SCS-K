import React, { useState, useContext } from "react";
import GroupsIntermediariesApi from "../service/GroupsIntermediariesApi";
import { useLocation } from "react-router-dom";
import PageSettings from "../static/Settings";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

const GroupsIntermediariesContext = React.createContext({});

let period;
let accountrecid;
let accountName;

export const GroupsIntermediariesContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const salescontext = useContext(SalesAdministartionContext);
  const urlParms = useLocation().search;
  accountrecid = new URLSearchParams(urlParms).get("accountrecid");
  period = new URLSearchParams(urlParms).get("year");
  accountName = new URLSearchParams(urlParms).get("accountName");
  const [validationMessage, setValidationMessage] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [state, setState] = useState({
    showScreenLoader: false,
    groupDetail: null,
    lastUpdateDateValue: null,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  //API calls start
  const getGroupsintermediaries = () => {
    setLoader(true);
    GroupsIntermediariesApi.getGroupsintermediaries(
      accountrecid,
      accountName,
      period
    ).then((data) => {
      state.groupDetail = data.grpDetail;
      setState({
        ...state,
        showScreenLoader: false,
        groupDetail: state.groupDetail,
        lastUpdateDateValue: data.lastupdatedate,
      });
    });
  };
  const updateGroupsIntermediaries = () => {
    if (validation("update")) {
      const body = {
        strGrpDetail: state.groupDetail,
        formChg: "Y",
        period: period,
        accountrecid: accountrecid,
        accountname: accountName,
      };
      setLoader(true);
      GroupsIntermediariesApi.updateGroupsIntermediaries(body).then((data) => {
        setLoader(false);
        if (data === "success") {
          getGroupsintermediaries();
        }
      });
      return true;
    } else {
      return false;
    }
  };
  //End of API calls
  const closeValidationModal = () => {
    setShowValidationModal(false);
  };
  const handleCommonChange = (e, inputType, maxLength) => {
    const obj = state.groupDetail;
    obj[inputType] = e.target.value;
    validation("navigation");
    setState({ ...state, groupDetail: state.groupDetail });
  };
  const validation = (eventType) => {
    const stateData = state.groupDetail;
    if (stateData.fullservice !== null && stateData.fullservice.length > 1024) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.fullservice);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.fullservice
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.fullservice,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.contract !== null &&
      stateData.contract.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.contracting);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.contracting
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.contracting,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.site_select !== null &&
      stateData.site_select.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.siteselection);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.siteselection
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.siteselection,
          type: "custom",
        });
        return false;
      }
    } else if (stateData.housing !== null && stateData.housing.length > 1024) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.housing);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.housing
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.housing,
          type: "custom",
        });
        return false;
      }
    } else if (stateData.on_site !== null && stateData.on_site.length > 1024) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.onsite);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.onsite
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.onsite,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.research !== null &&
      stateData.research.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.research);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.research
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.research,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.inter_other !== null &&
      stateData.inter_other.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.other);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.other
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.other,
          type: "custom",
        });
        return false;
      }
    } else {
      if (eventType === "update") {
        return true;
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(false, "");
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "custom",
        });
        return true;
      }
    }
  };
  const mandatoryCheck = (inputType, maxLength) => {
    const obj = state.groupDetail;
    if (obj[inputType] !== null && obj[inputType].length > maxLength) {
      validation("navigation");
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

  const groupsIntermediariesContext = {
    state,
    setState,
    getGroupsintermediaries,
    handleCommonChange,
    updateGroupsIntermediaries,
    validationMessage,
    showValidationModal,
    closeValidationModal,
    mandatoryCheck,
    validation,
    setLoader,
  };

  return (
    <GroupsIntermediariesContext.Provider value={groupsIntermediariesContext}>
      {props.children}
    </GroupsIntermediariesContext.Provider>
  );
};

export const GroupsIntermediariesContextConsumer =
  GroupsIntermediariesContext.Consumer;
export default GroupsIntermediariesContext;
