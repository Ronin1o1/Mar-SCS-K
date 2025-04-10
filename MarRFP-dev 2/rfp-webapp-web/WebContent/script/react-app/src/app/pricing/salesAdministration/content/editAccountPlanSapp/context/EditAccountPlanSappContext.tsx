import React, { useState } from "react";
import Settings from "../static/Settings";
import EditAccountPlanSappApi from "../service/EditAccountPlanSappApi";
import { useHistory } from "react-router-dom";
const EditAccountPlanSappContext = React.createContext({});

export const EditAccountPlanSappContextProvider = (props) => {
  const history = useHistory();

  const [state, setState] = useState({
    year: [],
    account: [],
    isLoaded: false,
    validationMessage: null,
  });

  const [isMounted, setIsMounted] = useState(false);
  const [linkedMsg, setLinkedMsg] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [sappSelectedData, setSappSelectedData] = useState({
    year: null,
    accountrecid: null,
    accountName: null,
    accountStartIndex: 0,
    noAccounts: false,
    isLoaded: false,
  });
  const [removeData, setRemoveData] = useState(false);
  const onYearChange = (e) => {
    setSappSelectedData({
      ...sappSelectedData,
      year: e.target.value,
      accountrecid: null,
      accountName: null,
    });
    setRemoveData(true);
  };
  const onAccountKeyPress = (e) => {
    setRemoveData(false);
  };

  const getAccounts = (start: number, searchText: string) => {
    EditAccountPlanSappApi.getAccounts(
      sappSelectedData.year,
      searchText,
      start,
      start + 19
    ).then((data) => {
      if (data.length === 0) {
        setSappSelectedData({
          ...sappSelectedData,
          noAccounts: true,
        });
        setState({ ...state, account: data });
      } else {
        setState({ ...state, account: data });
      }
    });
  };

  const onSourceAccountSelect = (event) => {
    setRemoveData(false);
    const { id } = event.target;

    return setSappSelectedData({
      ...sappSelectedData,
      accountrecid: id,
      accountName: event.target.textContent,
    });
  };

  const onSourceAccountsChange = (event) => {
    setRemoveData(false);
    const searchString = event.searchString + "*";
    setSappSelectedData({
      ...sappSelectedData,
      accountStartIndex: 0,
    });
    return EditAccountPlanSappApi.getAccounts(
      sappSelectedData.year,
      searchString,
      0,
      20
    ).then((data) => {
      // if (data.length > 0) {
      setState({ ...state, account: data });
      const selectedAccount = state.account.find((data) => {
        //return
        data.name == searchString;
      });

      if (selectedAccount) {
        // If matching  account found, set save data
        setSappSelectedData({
          ...sappSelectedData,
          accountrecid: selectedAccount.accountrecid,
          accountName: selectedAccount.name,
          accountStartIndex: 0,
          noAccounts: false,
        });
      } else {
        // If no matching  account found, reset save data
        setSappSelectedData({
          ...sappSelectedData,
          accountrecid: null,
          accountName: "",
          accountStartIndex: 0,
          noAccounts: false,
        });
      }
      return data;
    });
  };

  const onGetInitialSourceAccounts = () => {
    setSappSelectedData({
      ...sappSelectedData,
      accountStartIndex: 0,
      noAccounts: false,
    });
    return EditAccountPlanSappApi.getAccounts(
      sappSelectedData.year,
      "*",
      0,
      19
    ).then((data) => {
      if (data.length === 0) {
        setSappSelectedData({
          ...sappSelectedData,
          noAccounts: true,
        });
      } else {
        setState({ ...state, account: data });
      }
      return data;
    });
  };
  const onGetNextSourceAccounts = (event) => {
    let searchString: string = event.searchString;
    searchString =
      searchString && !searchString.includes("*")
        ? searchString + "*"
        : searchString;
    setSappSelectedData({
      ...sappSelectedData,
      noAccounts: false,
      accountStartIndex: event.start,
    });
    return EditAccountPlanSappApi.getAccounts(
      sappSelectedData.year,
      searchString,
      event.start,
      event.end
    ).then((data) => {
      setState({ ...state, account: data });
      return data;
    });
  };

  const onHandleSubmit = () => {
    if (
      sappSelectedData.accountrecid === "" ||
      sappSelectedData.accountrecid === null
    ) {
      state.validationMessage = Settings.accountSappDetails.validAccount;
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setState({ ...state, validationMessage: null });
    sessionStorage.setItem("sappAccountName", sappSelectedData?.accountName);
    history.push({
      pathname: "/editaccountplansapp/acctoverview",
      search:
        "?accountrecid=" +
        sappSelectedData.accountrecid +
        "&year=" +
        sappSelectedData.year +
        "&accountName=" +
        encodeURIComponent(sappSelectedData?.accountName),
    });
  };

  const accountContext = {
    state,
    setState,
    sappSelectedData,
    setSappSelectedData,
    isValid,
    setIsValid,
    isMounted,
    setIsMounted,
    onYearChange,
    getAccounts,
    onHandleSubmit,
    onGetInitialSourceAccounts,
    onGetNextSourceAccounts,
    onSourceAccountSelect,
    onSourceAccountsChange,
    linkedMsg,
    setLinkedMsg,
    removeData,
    onAccountKeyPress,
  };

  return (
    <EditAccountPlanSappContext.Provider value={accountContext}>
      {props.children}
    </EditAccountPlanSappContext.Provider>
  );
};

export const SappAccountContextConsumer = EditAccountPlanSappContext.Consumer;
export default EditAccountPlanSappContext;
