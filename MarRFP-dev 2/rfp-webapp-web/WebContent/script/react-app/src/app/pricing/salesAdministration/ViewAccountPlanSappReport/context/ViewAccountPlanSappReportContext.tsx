import React, { createContext, useState, useEffect } from "react";
import Settings from "../static/Settings";
import ViewAccountPlanSappReportApi from "../service/ViewAccountPlanSappReportApi";

//Creating Context
const ViewAccountPlanSappReportContext = createContext({});

//Context Provider component
export const ViewAccountPlanSappReportProvider = (props) => {
  //At the first time component mount load Periods
  useEffect(() => {
    loadPeriods();
  }, []);

  //Const declaration for selected data from ui
  const [appSelectedData, setSappSelectedData] = useState({
    year: null,
    accountrecid: null,
    accountName: null,
    accountStartIndex: 0,
    noAccounts: false,
    moduleid: null,
    modulename: null,
    noModules: false,
    isLoaded: false,
  });

  //const declaration for storing the screen data to be binded
  const [state, setState] = useState({
    year: [],
    account: [],
    module: [],
    isLoaded: false,
    validationMessage: null,
  });
  const [validateModal, setValidateModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [removeData, setRemoveData] = useState(false);

  //API call to get Year data
  const loadPeriods = () => {
    ViewAccountPlanSappReportApi.getPeriods().then((data) => {
      setState({ ...state, year: data.periodList });
      setSappSelectedData({
        ...appSelectedData,
        year: data.periodList[0].period,
      });
    });
  };

  //on click of Account img,Api call to get Account Data
  const onGetInitialSourceAccounts = () => {
    setSappSelectedData({
      ...appSelectedData,
      accountStartIndex: 0,
      noAccounts: false,
    });
    return ViewAccountPlanSappReportApi.getAccounts(
      appSelectedData.year,
      "*",
      0,
      19,
      "H"
    ).then((data) => {
      if (data.length === 0) {
        setSappSelectedData({
          ...appSelectedData,
          noAccounts: true,
        });
      } else {
        setState({ ...state, account: data });
      }
    });
  };

  //Api call to get next data for Account
  const onGetNextSourceAccounts = (event) => {
    const searchString = event.searchString;
    setSappSelectedData({
      ...appSelectedData,
      noAccounts: false,
      accountStartIndex: event.start,
    });
    return ViewAccountPlanSappReportApi.getAccounts(
      appSelectedData.year,
      searchString,
      event.start,
      event.end
    ).then((data) => {
      if (data.length > 0) {
        setState({ ...state, account: data });
      } else {
        setSappSelectedData({
          ...appSelectedData,
          noAccounts: true,
        });
      }
    });
  };

  //onSelecting the populated data for accounts, set the current Account selected data
  const onSourceAccountSelect = (event) => {
    setRemoveData(false);
    const { id } = event.target;
    const parms = {
      accountrecid: id,
    };
    ViewAccountPlanSappReportApi.getModules(parms).then((res) => {
      if (res.sappModuleList.length === 0) {
        setSappSelectedData({
          ...appSelectedData,
          noModules: true,
        });
      } else {
        res.sappModuleList.splice(0, 0, { moduleid: "", modulename: "*" });
        setState({ ...state, module: res.sappModuleList });
      }
    });
    return setSappSelectedData({
      ...appSelectedData,
      accountrecid: id,
      accountName: event.target.textContent,
    });
  };

  const onSourceAccountsChange = (event) => {
    setRemoveData(false);
    const searchString = event.searchString + "*";

    return ViewAccountPlanSappReportApi.getAccounts(
      appSelectedData.year,
      searchString,
      event.start,
      event.end
    ).then((data) => {
      if (data.length > 0) {
        setState({ ...state, account: data });
        const selectedAccount = state.account.find((data) => {
          //return
          data.name == searchString;
        });

        if (selectedAccount) {
          // If matching  account found, set save data
          setSappSelectedData({
            ...appSelectedData,
            accountrecid: selectedAccount.accountrecid,
            accountName: selectedAccount.name,
            accountStartIndex: event.start,
            noAccounts: false,
          });
        } else {
          // If no matching  account found, reset save data
          setSappSelectedData({
            ...appSelectedData,
            accountrecid: null,
            accountName: "",
            noAccounts: false,
          });
        }
      } else {
        setSappSelectedData({
          ...appSelectedData,
          noAccounts: true,
          accountrecid: null,
          accountName: searchString,
        });
      }
    });
  };

  //function to handle the submit to generate report
  const onSubmit = () => {
    if (appSelectedData.accountrecid == null) {
      setAlertMessage(Settings.validationMessage.account);
      setValidateModal(true);
      return false;
    } else if (
      appSelectedData.moduleid == null ||
      appSelectedData.moduleid == ""
    ) {
      setAlertMessage(Settings.validationMessage.module);
      setValidateModal(true);
      return false;
    }

    const url =
      window.location.origin +
      window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf("/")
      ) +
      "/hotelReports?&ReportName=" +
      "Account Plan(SAPP) Report" +
      "&AccountId=" +
      appSelectedData.accountrecid +
      "&AccountName=" +
      appSelectedData.accountName +
      "&Period=" +
      appSelectedData.year +
      "&ModuleID=" +
      appSelectedData.moduleid;
    const parms = Settings.popupParms;
    window.open(url, "_blank");
  };

  const showValidateMirror = () => {
    setValidateModal(!validateModal);
  };
  const onModuleChange = (e) => {
    setSappSelectedData({ ...appSelectedData, moduleid: e.target.value });
  };
  const onYearChange = (e) => {
    setSappSelectedData({ ...appSelectedData, year: e.target.value });
    setRemoveData(true);
  };
  //Declaration of Provider value
  const viewAccountContext = {
    appSelectedData,
    state,
    onGetInitialSourceAccounts,
    onGetNextSourceAccounts,
    onSourceAccountSelect,
    onSourceAccountsChange,
    onSubmit,
    validateModal,
    alertMessage,
    showValidateMirror,
    onModuleChange,
    onYearChange,
    removeData,
  };

  return (
    <ViewAccountPlanSappReportContext.Provider value={viewAccountContext}>
      {props.children}
    </ViewAccountPlanSappReportContext.Provider>
  );
};

export default ViewAccountPlanSappReportContext;
