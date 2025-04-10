import React, { useState, useContext } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";
//import ExtendedStayAPI from "../service/extendedStayAPI";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";
import AccountPerspectiveAPI from "../service/accountPerspectiveAPI";

// Set state variables and function
const AccountPerspectiveContext = React.createContext({});

export const AccountPerspectiveContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const salescontext: any = useContext(SalesAdministartionContext);
  const [state, setState] = useState({
    Nextpath: Settings.route.NextPage,
    showScreenLoader: false,
    validateModal: false,
    message: "",
    userRole: "",
    lastUpdateDate: "",
    acctPerspective: {
      accountinfotext_id: null,
      accountinfoid: null,
      solutionstext: null,
      mar_acctstrategy_obj: "",
      mar_vulnerabilities: "",
      acct_acctindtrends: "",
      divisions: "",
      subsidiaries: null,
      intermediaries: null,
      healthtext: "",
    },
    subsidiaries: null,
    subsidiariesMap: null,
    maxSubsidiaries: null,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const setInitialUserData = () => {
    setState({
      ...state,
      userRole: appContext.user.role,
    });
  };

  const setLoadingData = (data) => {
    const arr = data.subsidiaries;
    for (let i = data.subsidiaries.length; i < data.maxSubsidiaries; i++) {
      const obj = {
        recid: null,
        accountinfoid: null,
        divname: null,
      };

      arr.push(obj);
    }
    let cloneObj = { ...state.acctPerspective };
    cloneObj = Object.assign({}, data.acctPerspective);
    setState({
      ...state,
      acctPerspective: cloneObj,
      subsidiaries: arr,
      subsidiariesMap: data.subsidiariesMap,
      maxSubsidiaries: data.maxSubsidiaries,
    });
  };
  const setValidationFunc = (messageVal: string) => {
    setState({
      ...state,
      message: messageVal,
      validateModal: true,
    });
  };

  const checkUsermandatoryValidation = () => {
    if (
      (state.acctPerspective.healthtext !== null ||
        state.acctPerspective.healthtext !== undefined) &&
      state.acctPerspective.healthtext?.length > 1024
    ) {
      setValidationFunc(Settings.accPerspectiveAlerts.healthtext_alert);
      return false;
    } else if (
      (state.acctPerspective.acct_acctindtrends !== null ||
        state.acctPerspective.acct_acctindtrends !== undefined) &&
      state.acctPerspective.acct_acctindtrends?.length > 2000
    ) {
      setValidationFunc(Settings.accPerspectiveAlerts.acct_acctindtrends_alert);
      return false;
    } else if (
      (state.acctPerspective.divisions !== null ||
        state.acctPerspective.divisions !== undefined) &&
      state.acctPerspective.divisions?.length > 2000
    ) {
      setValidationFunc(Settings.accPerspectiveAlerts.divisions_alert);
      return false;
    } else if (
      (state.acctPerspective.mar_acctstrategy_obj !== null ||
        state.acctPerspective.mar_acctstrategy_obj !== undefined) &&
      state.acctPerspective.mar_acctstrategy_obj?.length > 2000
    ) {
      setValidationFunc(
        Settings.accPerspectiveAlerts.mar_acctstrategy_obj_alert
      );
      return false;
    } else if (
      (state.acctPerspective.mar_vulnerabilities !== null ||
        state.acctPerspective.mar_vulnerabilities !== undefined) &&
      state.acctPerspective.mar_vulnerabilities?.length > 1500
    ) {
      setValidationFunc(
        Settings.accPerspectiveAlerts.mar_vulnerabilities_alert
      );
      return false;
    } else {
      return true;
    }
  };
  const checkValidationOnNavigation = () => {
    if (
      (state.acctPerspective.healthtext !== null ||
        state.acctPerspective.healthtext !== undefined) &&
      state.acctPerspective.healthtext?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accPerspectiveAlerts.healthtext_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accPerspectiveAlerts.healthtext_alert,
        type: "custom",
      });
      return false;
    } else if (
      (state.acctPerspective.acct_acctindtrends !== null ||
        state.acctPerspective.acct_acctindtrends !== undefined) &&
      state.acctPerspective.acct_acctindtrends?.length > 2000
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accPerspectiveAlerts.acct_acctindtrends_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accPerspectiveAlerts.acct_acctindtrends_alert,
        type: "custom",
      });
      return false;
    } else if (
      (state.acctPerspective.divisions !== null ||
        state.acctPerspective.divisions !== undefined) &&
      state.acctPerspective.divisions?.length > 2000
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accPerspectiveAlerts.divisions_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accPerspectiveAlerts.divisions_alert,
        type: "custom",
      });
      return false;
    } else if (
      (state.acctPerspective.mar_acctstrategy_obj !== null ||
        state.acctPerspective.mar_acctstrategy_obj !== undefined) &&
      state.acctPerspective.mar_acctstrategy_obj?.length > 2000
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accPerspectiveAlerts.mar_acctstrategy_obj_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accPerspectiveAlerts.mar_acctstrategy_obj_alert,
        type: "custom",
      });
      return false;
    } else if (
      (state.acctPerspective.mar_vulnerabilities !== null ||
        state.acctPerspective.mar_vulnerabilities !== undefined) &&
      state.acctPerspective.mar_vulnerabilities?.length > 1500
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accPerspectiveAlerts.mar_vulnerabilities_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accPerspectiveAlerts.mar_vulnerabilities_alert,
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
  const setData = (list) => {
    setState({
      ...state,
    });
  };
  const ShowValidateModel = () => {
    setState({
      ...state,
      validateModal: !state.validateModal,
    });
  };
  const updateValue = (id, year, accname) => {
    const obj = {};
    state.subsidiaries.forEach((element, index) => {
      Object.assign(obj, {
        [index + 1]: {
          divname: element.divname,
          recid: element.recid,
          accountinfoid: element.accountinfoid,
        },
      });
      return obj;
    });
    const params = {
      strAcctPerspective: JSON.stringify(state.acctPerspective),
      strSubsidiariesMap: JSON.stringify(obj),
      formChg: "Y",
      period: year,
      accountrecid: id,
      accountname: accname,
    };
    const postData = Utils.createPostData(params);
    AccountPerspectiveAPI.submitData(postData).then((data) => {
      if (data === "success") {
        return true;
      }
    });
  };
  const accountPerspectiveList = {
    state,
    setState,
    setInitialUserData,
    setLoadingData,
    setData,
    checkUsermandatoryValidation,
    checkValidationOnNavigation,
    updateValue,
    ShowValidateModel,
    setLoader,
  };

  return (
    <AccountPerspectiveContext.Provider value={accountPerspectiveList}>
      {props.children}
    </AccountPerspectiveContext.Provider>
  );
};
export const AccountPerspectiveContextConsumer =
  AccountPerspectiveContext.Consumer;
export default AccountPerspectiveContext;
