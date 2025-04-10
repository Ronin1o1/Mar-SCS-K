import React, { useState } from "react";
import Utils from "../../../../common/utils/Utils";
import API from "../service/API";
import Settings from "../static/Settings";
const SappAccountContext = React.createContext({});

export const SappAccountContextProvider = (props) => {
  const [state, setState] = useState({
    accountFrom: [],
    accountTo: [],
    fromYear: [],
    toYear: [],
    isLoaded: false,
    validationMessage: null,
  });

  const [isMounted, setIsMounted] = useState(false);
  const [removeFromData, setRemoveFromData] = useState(false);
  const [removeToData, setRemoveToData] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [sappSelectedData, setSappSelectedData] = useState({
    fromPeriod: null,
    fromAccountrecid: null,
    fromAccountName: null,
    fromAccountStartIndex: 0,
    noFromAccounts: false,
    toPeriod: null,
    toAccountrecid: null,
    toAccountName: null,
    toAccountStartIndex: 0,
    noToAccounts: false,
  });

  const onFromPeriodChange = (e) => {
    setSappSelectedData({ ...sappSelectedData, fromPeriod: e.target.value });
    setRemoveFromData(true);
  };

  const onToPeriodChange = (e) => {
    setSappSelectedData({ ...sappSelectedData, toPeriod: e.target.value });
    setRemoveToData(true);
  };

  // Handle source drop down events

  const onGetSourceAccounts = (start, searchText) => {
    API.getSourceAccounts(
      sappSelectedData.fromPeriod,
      searchText,
      start,
      start + 19
    ).then((data) => {
      setState({ ...state, accountFrom: data });
    });
  };

  const onGetInitialSourceAccounts = () => {
    setSappSelectedData({
      ...sappSelectedData,
      fromAccountStartIndex: 0,
      noFromAccounts: false,
    });

    return API.getSourceAccounts(sappSelectedData.fromPeriod, "", 0, 19).then(
      (data) => {
        if (data.length === 0) {
          setSappSelectedData({
            ...sappSelectedData,
            noFromAccounts: true,
          });
        } else {
          setState({ ...state, accountFrom: data });
        }
      }
    );
  };

  const onGetNextSourceAccounts = (event) => {
    const searchString = event.searchString;
    setSappSelectedData({
      ...sappSelectedData,
      noFromAccounts: false,
      fromAccountStartIndex: event.start,
    });

    return API.getSourceAccounts(
      sappSelectedData.fromPeriod,
      searchString,
      event.start,
      event.end
    ).then((data) => {
      if (data.length > 0) {
        setState({ ...state, accountFrom: data });
      } else {
        setSappSelectedData({
          ...sappSelectedData,
          noFromAccounts: true,
        });
      }
    });
  };

  const onSourceAccountSelect = (event) => {
    const { id } = event.target;
    setRemoveFromData(false);
    return setSappSelectedData({
      ...sappSelectedData,
      fromAccountrecid: id,
      fromAccountName: event.target.textContent,
    });
  };

  const onSourceAccountsChange = (event) => {
    const searchString = event.searchString;
    setRemoveFromData(false);
    return API.getSourceAccounts(
      sappSelectedData.fromPeriod,
      searchString,
      event.start,
      event.end
    ).then((data) => {
      if (data.length > 0) {
        setState({ ...state, accountFrom: data });
        const selectedAccount = state.accountFrom.find((data) => {
          //return
          data.name == searchString;
        });

        if (selectedAccount) {
          // If matching  account found, set save data
          setSappSelectedData({
            ...sappSelectedData,
            fromAccountrecid: selectedAccount.accountrecid,
            fromAccountName: selectedAccount.name,
            fromAccountStartIndex: event.start,
            noFromAccounts: false,
          });
        } else {
          // If no matching  account found, reset save data
          setSappSelectedData({
            ...sappSelectedData,
            fromAccountrecid: null,
            fromAccountName: "",
            noFromAccounts: false,
          });
        }
      } else {
        //setState({ ...state, accountFrom: [] });
        setSappSelectedData({
          ...sappSelectedData,
          noFromAccounts: true,
          fromAccountrecid: null,
          fromAccountName: searchString,
        });
      }
    });
  };

  // Handle Target drop down events

  const onGetTargetAccounts = (start, searchText) => {
    API.getTargetAccounts(
      sappSelectedData.toPeriod,
      searchText,
      start,
      start + 19
    ).then((data) => {
      setState({ ...state, accountTo: data });
    });
  };

  const onGetInitialTargetAccounts = () => {
    setSappSelectedData({
      ...sappSelectedData,
      toAccountStartIndex: 0,
      noToAccounts: false,
    });
    return API.getTargetAccounts(sappSelectedData.toPeriod, "", 0, 19).then(
      (data) => {
        if (data.length === 0) {
          setSappSelectedData({
            ...sappSelectedData,
            noToAccounts: true,
          });
        } else {
          setState({ ...state, accountTo: data });
        }
      }
    );
  };

  const onTargetAccountSelect = (event) => {
    const { id } = event.target;
    setRemoveToData(false);
    return setSappSelectedData({
      ...sappSelectedData,
      toAccountrecid: id,
      toAccountName: event.target.textContent,
    });
  };

  const onGetNextTargetAccounts = (event) => {
    const searchString = event.searchString;
    setSappSelectedData({
      ...sappSelectedData,
      noToAccounts: false,
      toAccountStartIndex: event.start,
    });

    return API.getTargetAccounts(
      sappSelectedData.toPeriod,
      searchString,
      event.start,
      event.end
    ).then((data) => {
      if (data.length > 0) {
        setState({ ...state, accountTo: data });
      } else {
        setSappSelectedData({
          ...sappSelectedData,
          noToAccounts: true,
        });
      }
    });
  };

  const onTargetAccountsChange = (event) => {
    const searchString = event.searchString;
    setRemoveToData(false);
    setSappSelectedData({ ...sappSelectedData, toAccountStartIndex: 0 });
    return API.getTargetAccounts(
      sappSelectedData.toPeriod,
      searchString,
      event.start,
      event.end
    ).then((data) => {
      if (data.length > 0) {
        setState({ ...state, accountTo: data });
        setSappSelectedData({
          ...sappSelectedData,
          toAccountName: searchString,
        });
        const selectedAccount = state.accountTo.find((data) => {
          return data.name == searchString;
        });
        if (selectedAccount) {
          // If matching BT account found, set save data
          setSappSelectedData({
            ...sappSelectedData,
            toAccountrecid: selectedAccount.accountrecid,
            toAccountName: selectedAccount.name,
          });
        } else {
          // If no matching account found, reset save data
          setSappSelectedData({
            ...sappSelectedData,
            toAccountrecid: null,
            toAccountName: "",
            noToAccounts: false,
          });
        }
        setState({ ...state, accountTo: data });
      } else {
        //setState({ ...state, accountTo: [] });
        setSappSelectedData({
          ...sappSelectedData,
          noToAccounts: true,
          toAccountrecid: null,
          toAccountName: searchString,
        });
      }
    });
  };

  const onCopyAccount = () => {
    if (
      sappSelectedData.fromAccountrecid === "" ||
      sappSelectedData.fromAccountrecid === null
    ) {
      state.validationMessage = Settings.accountSappDetails.validFromAccount;
      setIsValid(false);
      return;
    }
    if (
      sappSelectedData.toAccountrecid === "" ||
      sappSelectedData.toAccountrecid === null
    ) {
      state.validationMessage = Settings.accountSappDetails.validToAccount;
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setState({ ...state, validationMessage: null });
    API.copySAPPData(sappSelectedData).then((data) => {
      Utils.navigateToUrl(Settings.accountSappDetails.nextUrl);
    });
  };

  const handleModalClose = () => {
    setIsValid(true);
  };
  const accountContext = {
    state,
    setState,
    sappSelectedData,
    setSappSelectedData,
    isValid,
    setIsValid,
    onGetTargetAccounts,
    onGetSourceAccounts,
    onTargetAccountSelect,
    onSourceAccountSelect,
    onFromPeriodChange,
    onToPeriodChange,
    onGetNextSourceAccounts,
    onGetNextTargetAccounts,
    onSourceAccountsChange,
    onTargetAccountsChange,
    onGetInitialSourceAccounts,
    onGetInitialTargetAccounts,
    onCopyAccount,
    handleModalClose,
    isMounted,
    setIsMounted,
    removeFromData,
    removeToData
  };

  return (
    <SappAccountContext.Provider value={accountContext}>
      {props.children}
    </SappAccountContext.Provider>
  );
};

export const SappAccountContextConsumer = SappAccountContext.Consumer;
export default SappAccountContext;
