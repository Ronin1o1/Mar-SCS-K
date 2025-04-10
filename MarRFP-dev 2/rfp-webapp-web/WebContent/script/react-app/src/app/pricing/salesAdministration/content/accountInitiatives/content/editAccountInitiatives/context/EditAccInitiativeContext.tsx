import React, { useState, useEffect } from "react";
import Settings from "../static/Settings";
import EditAccountInitiativesApi from "../service/EditAccountInitiativesAPI";

const EditAccInitiativesContext = React.createContext({});

interface EditAccInitiativeStates {
  periodList;
  acctInitiative;
  revenueStream: string;
  listOfRevStream;
  formChange: string;
  getEditAccInitiativeRes;
}

interface EditAccInitiativeContextProps {
  children: JSX.Element;
  initiativeData;
  closeModal: (formChg?: string) => void;
}

export const EditAccInitiativesContextProvider = (
  props: EditAccInitiativeContextProps
): JSX.Element => {
  const [state, setState] = useState<EditAccInitiativeStates>({
    periodList: [],
    acctInitiative: {},
    revenueStream: null,
    listOfRevStream: [],
    formChange: "N",
    getEditAccInitiativeRes: {},
  });
  const [showAlert, setShowLoader] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const getEditInitiative = () => {
    setShowLoader(true);
    setAlertMsg(Settings.alert.loading);
    const payload = {
      initiative_name: props.initiativeData.initiative_name,
      seqId: props.initiativeData.seqId,
      action: Settings.editAccInitiativeActionParam,
      accountrecid: props.initiativeData.accountrecid,
      period: props.initiativeData.period,
      revStreamId: props.initiativeData.revStreamId,
    };
    EditAccountInitiativesApi.getEditInitiatives(payload).then((res) => {
      const revStream = res.listRevStream.find(
        (r) => r.refId === res.acctInitiative.revstreamid
      ).listName;
      if (res.acctInitiative.initiative_name === null) {
        res.acctInitiative.initiative_name =
          props.initiativeData.initiative_name;
      }
      setShowLoader(false);
      setAlertMsg("");
      const periodList = [...res.periodList];
      if (res.acctInitiative.init_date === null) {
        periodList.unshift({ period: "" });
      }
      setState({
        ...state,
        getEditAccInitiativeRes: res,
        periodList: periodList,
        acctInitiative: res.acctInitiative,
        revenueStream: revStream,
        listOfRevStream: res.listRevStream,
      });
    });
  };

  useEffect(() => {
    getEditInitiative();
  }, []);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>, key: string) => {
    const values = { ...state.acctInitiative };
    Object.keys(values).forEach((k) => {
      if (k === key) {
        values[k] = e.currentTarget.value;
      }
    });
    setState({ ...state, acctInitiative: values, formChange: "Y" });
  };

  const changeTextAreaHandler = (
    e: React.FormEvent<HTMLInputElement>,
    key: string
  ) => {
    const values = { ...state.acctInitiative };
    Object.keys(values).forEach((k) => {
      if (k === key) {
        if (
          (e.nativeEvent as InputEvent).inputType === "insertText" &&
          e.currentTarget.value.length <= 1024
        ) {
          values[k] = e.currentTarget.value;
          setState({ ...state, acctInitiative: values, formChange: "Y" });
        } else if (
          (e.nativeEvent as InputEvent).inputType === "insertFromPaste"
        ) {
          values[k] = e.currentTarget.value;
          setState({ ...state, acctInitiative: values, formChange: "Y" });
        } else if (
          (e.nativeEvent as InputEvent).inputType === "deleteContentBackward" ||
          (e.nativeEvent as InputEvent).inputType === "deleteByCut" ||
          (e.nativeEvent as InputEvent).inputType === "historyUndo" ||
          (e.nativeEvent as InputEvent).inputType === "historyRedo"
        ) {
          values[k] = e.currentTarget.value;
          setState({ ...state, acctInitiative: values, formChange: "Y" });
        }
      }
    });
  };

  const selectChangeHandler = (e, key: string) => {
    const values = { ...state.acctInitiative };
    Object.keys(values).forEach((k) => {
      if (k === key) {
        values[k] = e.target.value;
      }
    });
    setState({ ...state, acctInitiative: values, formChange: "Y" });
  };

  const validateAction = (actionName: string) => {
    if (
      state.acctInitiative.initiative_name === null ||
      state.acctInitiative.initiative_name === "" ||
      state.acctInitiative.initiative_name === undefined
    ) {
      setIsAlert(true);
      setAlertMsg(Settings.alert.initiativeNameBlankAlert);
      (
        document.getElementById(
          "acctInitiative.initiative_name"
        ) as HTMLInputElement
      ).focus();
    } else if (
      state.acctInitiative.action !== null &&
      state.acctInitiative.action.length > 1024
    ) {
      setIsAlert(true);
      setAlertMsg(
        `'` +
          Settings.fieldLabels.initiativeAction +
          `'` +
          " " +
          Settings.alert.charExceedingAlertOnUpdate
      );
      (
        document.getElementById("acctInitiative.action") as HTMLInputElement
      ).focus();
    } else if (
      state.acctInitiative.objective !== null &&
      state.acctInitiative.objective.length > 1024
    ) {
      setIsAlert(true);
      setAlertMsg(
        `'` +
          Settings.fieldLabels.objective +
          `'` +
          " " +
          Settings.alert.charExceedingAlertOnUpdate
      );
      (
        document.getElementById("acctInitiative.objective") as HTMLInputElement
      ).focus();
    } else if (
      state.acctInitiative.exec_plan !== null &&
      state.acctInitiative.exec_plan.length > 1024
    ) {
      setIsAlert(true);
      setAlertMsg(
        `'` +
          Settings.fieldLabels.executionPlan +
          `'` +
          " " +
          Settings.alert.charExceedingAlertOnUpdate
      );
      (
        document.getElementById("acctInitiative.exec_plan") as HTMLInputElement
      ).focus();
    } else if (
      state.acctInitiative.results !== null &&
      state.acctInitiative.results.length > 1024
    ) {
      setIsAlert(true);
      setAlertMsg(
        `'` +
          Settings.fieldLabels.resultsLearnings +
          `'` +
          " " +
          Settings.alert.charExceedingAlertOnUpdate
      );
      (
        document.getElementById("acctInitiative.results") as HTMLInputElement
      ).focus();
    } else if (
      state.acctInitiative.comments !== null &&
      state.acctInitiative.comments.length > 1024
    ) {
      setIsAlert(true);
      setAlertMsg(
        `'` +
          Settings.fieldLabels.additionalComments +
          `'` +
          " " +
          Settings.alert.charExceedingAlertOnUpdate
      );
      (
        document.getElementById("acctInitiative.comments") as HTMLInputElement
      ).focus();
    } else {
      setIsAlert(false);
      setAlertMsg("");
      if (actionName === "update") {
        updateAccInitiative();
      } else if (actionName === "delete") {
        deleteAccInitiative();
      }
    }
  };

  const updateAccInitiative = () => {
    const params = {
      initiative_name: props.initiativeData.initiative_name,
      seqId: props.initiativeData.seqId,
      action: Settings.editAccInitiativeActionParam,
      accountrecid: props.initiativeData.accountrecid,
      period: props.initiativeData.period,
      revStreamId: props.initiativeData.revStreamId,
    };
    const body = {
      strAcctInitiative: JSON.stringify({ ...state.acctInitiative }),
      buyinglocid: state.acctInitiative.buyinglocid,
      maxAcctPlanTasks: state.getEditAccInitiativeRes.maxAcctPlanTasks,
    };

    EditAccountInitiativesApi.updateAccInitiatives(params, body).then((res) => {
      if (res === "success") {
        props.closeModal("Y");
      }
    });
  };

  const deleteAccInitiative = () => {
    const params = {
      initiative_name: props.initiativeData.initiative_name,
      seqId: props.initiativeData.seqId,
      action: Settings.editAccInitiativeActionParam,
      accountrecid: props.initiativeData.accountrecid,
      period: props.initiativeData.period,
      revStreamId: props.initiativeData.revStreamId,
    };
    const body = {
      strAcctInitiative: JSON.stringify({ ...state.acctInitiative }),
      buyinglocid: state.acctInitiative.buyinglocid,
      maxAcctPlanTasks: state.getEditAccInitiativeRes.maxAcctPlanTasks,
    };

    if (
      state.acctInitiative.acctinitiativeid !== null &&
      state.acctInitiative.acctinitiativeid !== "" &&
      state.acctInitiative.acctinitiativeid !== undefined
    ) {
      EditAccountInitiativesApi.deleteAccInitiatives(params, body).then(
        (res) => {
          if (res === "success") {
            props.closeModal("Y");
          }
        }
      );
    }
  };

  const editAccountInitiativesContext = {
    state,
    setState,
    showAlert,
    setShowLoader,
    changeHandler,
    updateAccInitiative,
    selectChangeHandler,
    deleteAccInitiative,
    alertMsg,
    setAlertMsg,
    validateAction,
    isAlert,
    setIsAlert,
    changeTextAreaHandler,
  };

  return (
    <EditAccInitiativesContext.Provider value={editAccountInitiativesContext}>
      {props.children}
    </EditAccInitiativesContext.Provider>
  );
};

export const EditAccInitiativesConsumer = EditAccInitiativesContext.Consumer;
export default EditAccInitiativesContext;
