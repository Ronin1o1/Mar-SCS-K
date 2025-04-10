import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import API from "../service/API";
import Utils from "../../../../../../../common/utils/Utils";
import PageSettings from "../static/Settings";
import EditBuyingOfficeContext from "./EditBuyingOfficeContext";

const EditInitiativeModalContext = React.createContext({});
export const EditInitiativeModalContextProvider = (props) => {
  const urlParms = useLocation().search;
  const [strAcctInitiative, setStrAcctInitiative] = useState({});
  const [editInitiativeLoader, setEditInitiativeLoader] = useState(true);
  const [validationMessage, setValidationMessage] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const accountrecid = new URLSearchParams(urlParms).get("accountrecid");
  const period = new URLSearchParams(urlParms).get("year");
  const editBuyingOfficeContext = useContext(EditBuyingOfficeContext);

  const handleCommonChange = (e, inputType, index) => {
    if (index !== null && index !== undefined) {
      const obj = strAcctInitiative.acctInitiative.acctTasks[index];
      obj[inputType] = e.target.value;
    } else {
      strAcctInitiative.acctInitiative[inputType] = e.target.value;
    }
    setStrAcctInitiative({
      ...strAcctInitiative,
      strAcctInitiative: strAcctInitiative,
    });
  };
  const handleCheckDateFormate = (inputDate) => {
    Utils.checkDate(inputDate);
  };
  //API calls
  const getEditInitiative = (editInitiativeData, revStreamId, buyinglocid) => {
    setEditInitiativeLoader(true);
    API.getEditInitiative(
      editInitiativeData.initiative_name,
      editInitiativeData.seqid,
      "BuyingLocations",
      buyinglocid,
      accountrecid,
      period,
      revStreamId
    ).then((data) => {
      data.periodList.length > 0 && data.periodList.unshift({});
      if (data.acctInitiative.initiative_name === null) {
        data.acctInitiative.initiative_name =
          editInitiativeData.initiative_name;
      }
      if (data.acctInitiative.acctTasks === null) {
        data.acctInitiative.acctTasks = [
          {
            id: 0,
            responsible: null,
            taskDesc: null,
            begindate: null,
            enddate: null,
            seqid: 0,
          },
        ];
      }
      for (
        let i = data.acctInitiative.acctTasks.length;
        i < data.maxAcctPlanTasks;
        i++
      ) {
        data.acctInitiative.acctTasks.push({
          id: i,
          responsible: null,
          taskDesc: null,
          begindate: null,
          enddate: null,
          seqid: i,
        });
      }
      setStrAcctInitiative(data);
      setEditInitiativeLoader(false);
    });
  };
  const createBodyForUpdateAndDelete = (strContacts) => {
    if (
      strContacts.acctInitiative.acctTasks !== null &&
      strContacts.acctInitiative.acctTasks.length > 0
    ) {
      strContacts.acctInitiative.acctTasks.map((eachTask) => {
        if (
          eachTask.begindate !== null &&
          Utils.checkDate(eachTask.begindate)
        ) {
          eachTask.begindate = eachTask.begindate;
        } else {
          eachTask.begindate = null;
        }
        if (eachTask.enddate !== null && Utils.checkDate(eachTask.enddate)) {
          eachTask.enddate = eachTask.enddate;
        } else {
          eachTask.enddate = null;
        }
      });
    }
    const strContactsBody = {
      acctTasks: strContacts.acctInitiative.acctTasks,
      initiative_name: strContacts.acctInitiative.initiative_name,
      plan_tm_lead: strContacts.acctInitiative.plan_tm_lead,
      init_date: strContacts.acctInitiative.init_date,
      action: strContacts.acctInitiative.action,
      objective: strContacts.acctInitiative.objective,
      exec_plan: strContacts.acctInitiative.exec_plan,
      results: strContacts.acctInitiative.results,
      comments: strContacts.acctInitiative.comments,
      revstreamid: strContacts.acctInitiative.revstreamid,
      seqid: strContacts.seqId,
      buyinglocid: strContacts.acctInitiative.buyinglocid,
      acctinitiativeid: strContacts.acctInitiative.acctinitiativeid,
      accountinfoid: strContacts.acctInitiative.accountinfoid,
    };
    return strContactsBody;
  };
  const updateEditInitiative = (props) => {
    const params = {
      accountrecid: accountrecid,
      period: period,
      maxAcctPlanTasks: strAcctInitiative.maxAcctPlanTasks,
      revStreamId: strAcctInitiative.acctInitiative.revstreamid,
    };
    const body = createBodyForUpdateAndDelete(strAcctInitiative);
    if (validation(strAcctInitiative)) {
      API.updateEditInitiative(body, params).then((data) => {
        props.closeModal();
        editBuyingOfficeContext.getEditLocation();
      });
    }
  };
  const deleteEditInitiative = (props) => {
    if (window.confirm(PageSettings.commontext.deleteWarning)) {
      const params = {
        accountrecid: accountrecid,
        period: period,
        maxAcctPlanTasks: strAcctInitiative.maxAcctPlanTasks,
        revStreamId: strAcctInitiative.revStreamId,
      };
      const body = createBodyForUpdateAndDelete(strAcctInitiative);
      API.deleteEditInitiative(body, params).then((data) => {
        props.closeModal();
        editBuyingOfficeContext.getEditLocation();
      });
    }
  };
  const validation = (strContacts) => {
    const stateData = strContacts.acctInitiative;
    if (
      stateData.initiative_name === "" ||
      stateData.initiative_name === null
    ) {
      setValidationMessage(PageSettings.validationMessages.initiativeName);
      setShowValidationModal(true);
    } else if (stateData.action !== null && stateData.action.length > 1024) {
      setValidationMessage(PageSettings.validationMessages.action);
      setShowValidationModal(true);
    } else if (
      stateData.objective !== null &&
      stateData.objective.length > 1024
    ) {
      setValidationMessage(PageSettings.validationMessages.objective);
      setShowValidationModal(true);
    } else if (
      stateData.exec_plan !== null &&
      stateData.exec_plan.length > 1024
    ) {
      setValidationMessage(PageSettings.validationMessages.execPlan);
      setShowValidationModal(true);
    } else if (stateData.results !== null && stateData.results.length > 1024) {
      setValidationMessage(PageSettings.validationMessages.results);
      setShowValidationModal(true);
    } else if (
      stateData.comments !== null &&
      stateData.comments.length > 1024
    ) {
      setValidationMessage(PageSettings.validationMessages.comments);
      setShowValidationModal(true);
    } else {
      return true;
    }
  };
  const closeValidationModal = () => {
    setShowValidationModal(false);
  };
  //End of API calls
  const pricingContext = {
    getEditInitiative,
    editInitiativeLoader,
    updateEditInitiative,
    strAcctInitiative,
    setStrAcctInitiative,
    handleCommonChange,
    deleteEditInitiative,
    handleCheckDateFormate,
    validation,
    validationMessage,
    showValidationModal,
    closeValidationModal,
  };

  return (
    <EditInitiativeModalContext.Provider value={pricingContext}>
      {props.children}
    </EditInitiativeModalContext.Provider>
  );
};
export const EditInitiativeModalContextConsumer =
  EditInitiativeModalContext.Consumer;
export default EditInitiativeModalContext;
