import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageSettings from "../static/Settings";
import GroupsOverviewApi from "../service/GroupsOverviewApi";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

const GroupsOverviewContext = React.createContext({});

let period;
let accountrecid;
let accountName;

export const GroupsOverviewContextProvider = (props) => {
  const salescontext = useContext(SalesAdministartionContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const urlParms = useLocation().search;
  accountrecid = new URLSearchParams(urlParms).get("accountrecid");
  period = new URLSearchParams(urlParms).get("year");
  accountName = new URLSearchParams(urlParms).get("accountName");
  const [state, setState] = useState({
    grpDetailProfile: null,
    lastUpdateDateValue: null,
    showScreenLoader: false,
  });
  const [validationMessage, setValidationMessage] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);

  //API calls start
  const getGroupsOverview = () => {
    GroupsOverviewApi.getGroupsOverview(accountrecid, accountName, period).then(
      (data) => {
        state.grpDetailProfile = data.grpDetailProfile;
        setState({
          ...state,
          showScreenLoader: false,
          grpDetailProfile: state.grpDetailProfile,
          lastUpdateDateValue: data.lastupdatedate,
        });
      }
    );
  };

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const updateGroupsOverview = () => {
    if (validation("update")) {
      const body = {
        strGrpDetailProfile: state.grpDetailProfile,
        formChg: "Y",
        period: period,
        accountrecid: accountrecid,
        accountname: accountName,
      };
      setLoader(true);
      GroupsOverviewApi.updateGroupsOverview(body).then((data) => {
        setLoader(false);
        // window.location.reload();
        getGroupsOverview();
      });
      return true;
    } else {
      return false;
    }
  };
  //API calls end
  const handleCommonChange = (event, inputType, maxLength) => {
    const obj = state.grpDetailProfile;
    obj[inputType] = event.target.value;
    mandatoryCheck(inputType, maxLength);
    setState({ ...state, grpDetailProfile: state.grpDetailProfile });
    checkOnFormEdit();
  };
  const validation = (eventType) => {
    const stateData = state.grpDetailProfile;
    if (
      stateData.num_mar_incl_prog !== null &&
      stateData.num_mar_incl_prog.length > 255
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.otherPreferred);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.otherPreferred
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.otherPreferred,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.competitor !== null &&
      stateData.competitor.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.topGroup);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.topGroup
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.topGroup,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.prefer_criteria !== null &&
      stateData.prefer_criteria.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.description);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.description
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.description,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.onl_registration !== null &&
      stateData.onl_registration.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.describeRfpTool);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.describeRfpTool
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.describeRfpTool,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.struct_sml_mtg !== null &&
      stateData.struct_sml_mtg.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.smallMeetings);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.smallMeetings
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.smallMeetings,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.struct_lge_mtg !== null &&
      stateData.struct_lge_mtg.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.largeMeetings);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.largeMeetings
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.largeMeetings,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.struct_annl_mtg !== null &&
      stateData.struct_annl_mtg.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.annualMeetings);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.annualMeetings
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.annualMeetings,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.solutions !== null &&
      stateData.solutions.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.groupSolutions);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.groupSolutions
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.groupSolutions,
          type: "custom",
        });
        return false;
      }
    } else if (
      stateData.other_group_info !== null &&
      stateData.other_group_info.length > 1024
    ) {
      if (eventType === "update") {
        setValidationMessage(PageSettings.validationMessages.otherGroupInfo);
        setShowValidationModal(true);
      } else if (eventType === "navigation") {
        salescontext.setAlertMsgfunc(
          true,
          PageSettings.validationMessages.otherGroupInfo
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: PageSettings.validationMessages.otherGroupInfo,
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
  const closeValidationModal = () => {
    setShowValidationModal(false);
  };

  useEffect(() => {
    if (appContext.navbarClicked) {
      setShowValidationModal(false);
    }
  }, [appContext.navbarClicked]);

  const mandatoryCheck = (inputType, maxLength) => {
    const obj = state.grpDetailProfile;
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

  const checkOnFormEdit = () => {
    validation("navigation");
  };

  const groupsOverviewContext = {
    state,
    setState,
    getGroupsOverview,
    handleCommonChange,
    updateGroupsOverview,
    validationMessage,
    showValidationModal,
    closeValidationModal,
    mandatoryCheck,
    validation,
    setLoader,
  };

  return (
    <GroupsOverviewContext.Provider value={groupsOverviewContext}>
      {props.children}
    </GroupsOverviewContext.Provider>
  );
};

export const GroupsOverviewContextConsumer = GroupsOverviewContext.Consumer;
export default GroupsOverviewContext;
