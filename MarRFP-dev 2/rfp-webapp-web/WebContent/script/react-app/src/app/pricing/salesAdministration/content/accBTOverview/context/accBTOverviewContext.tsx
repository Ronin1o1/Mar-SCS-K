import React, { useState, useContext } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";
import accBTOverviewApi from "../service/accBTOverviewApi";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";
// Set state variables and function
const accBTOverviewContext = React.createContext({});

export const AccBTOverviewContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const salescontext = useContext(SalesAdministartionContext);
  const [state, setState] = useState({
    Nextpath: Settings.route.NextPage,
    showScreenLoader: false,
    validateModal: false,
    message: "",
    lastupdateDate: "",
    acctOverviewBTReqs: {
      adopt_rate_bkg_tool: null,
    },
    pricingPeriodList: [],
    alertMessageCheck: false,
    cbc: "",
    userRole: "",
    formChg: "N",
    relocat_intermediary: null,
    competitors_bybrand: null,
    pref_air_partners: null,
    pref_car_rental: null,
    pref_hotel: null,
    requiretext: null,
    requesttext: null,
    notestext_existinghotel: null,
    notestext_preopeninghotel: null,
    org_buying_struct: null,
    reservationstext: null,
    policies: null,
    solutions: null,
    inter_strategy: null,
    online_solut_util: null,
    onl_bkg_tool: null,
    adopt_rate_bkg_tool: null,
    btOnly: null,
    lastupdate_bt_overview: null,
    cbc_softduedate: null,
    roomtypetext: null,
    shortCbc_softduedate: null,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const resetData = () => {
    const data = { ...state };
    data.acctOverviewBTReqs.adopt_rate_bkg_tool = {};
    setState(data);
  };

  const setLoadingOverViewData = (data) => {
    let acctOverviewBTReqs = { ...state.acctOverviewBTReqs };
    acctOverviewBTReqs = {
      adopt_rate_bkg_tool:
        data.acctOverviewBTReqs.adopt_rate_bkg_tool !== null
          ? data.acctOverviewBTReqs.adopt_rate_bkg_tool
          : "",
    };

    if (
      data.acctOverviewBTReqs.shortCbc_softduedate === "" ||
      data.acctOverviewBTReqs.shortCbc_softduedate === null
    ) {
      setState({
        ...state,
        acctOverviewBTReqs: data.acctOverviewBTReqs,
        pricingPeriodList: data.pricingPeriodList,
        cbc:
          data?.pricingPeriodList.length > 0
            ? data?.pricingPeriodList[0]?.shortDueDate
            : "",
        relocat_intermediary: data.acctOverviewBTReqs.relocat_intermediary,
        competitors_bybrand: data.acctOverviewBTReqs.competitors_bybrand,
        pref_air_partners: data.acctOverviewBTReqs.pref_air_partners,
        pref_car_rental: data.acctOverviewBTReqs.pref_car_rental,
        pref_hotel: data.acctOverviewBTReqs.pref_hotel,
        requiretext: data.acctOverviewBTReqs.requiretext,
        requesttext: data.acctOverviewBTReqs.requesttext,
        notestext_existinghotel:
          data.acctOverviewBTReqs.notestext_existinghotel,
        notestext_preopeninghotel:
          data.acctOverviewBTReqs.notestext_preopeninghotel,
        org_buying_struct: data.acctOverviewBTReqs.org_buying_struct,
        reservationstext: data.acctOverviewBTReqs.reservationstext,
        policies: data.acctOverviewBTReqs.policies,
        solutions: data.acctOverviewBTReqs.solutions,
        inter_strategy: data.acctOverviewBTReqs.inter_strategy,
        online_solut_util: data.acctOverviewBTReqs.online_solut_util,
        onl_bkg_tool: data.acctOverviewBTReqs.onl_bkg_tool,
        adopt_rate_bkg_tool:
          data.acctOverviewBTReqs.adopt_rate_bkg_tool !== null
            ? data.acctOverviewBTReqs.adopt_rate_bkg_tool
            : "",
        btOnly: data.acctOverviewBTReqs.btOnly,
        lastupdate_bt_overview: data.acctOverviewBTReqs.lastupdate_bt_overview,
        cbc_softduedate: data.acctOverviewBTReqs.cbc_softduedate,
        roomtypetext: data.acctOverviewBTReqs.roomtypetext,
        shortCbc_softduedate:
          data?.pricingPeriodList.length > 0
            ? data?.pricingPeriodList[0]?.shortDueDate
            : "",
      });
    } else {
      setState({
        ...state,
        acctOverviewBTReqs: data.acctOverviewBTReqs,
        pricingPeriodList: data.pricingPeriodList,
        cbc: data.acctOverviewBTReqs.shortCbc_softduedate,
        relocat_intermediary: data.acctOverviewBTReqs.relocat_intermediary,
        competitors_bybrand: data.acctOverviewBTReqs.competitors_bybrand,
        pref_air_partners: data.acctOverviewBTReqs.pref_air_partners,
        pref_car_rental: data.acctOverviewBTReqs.pref_car_rental,
        pref_hotel: data.acctOverviewBTReqs.pref_hotel,
        requiretext: data.acctOverviewBTReqs.requiretext,
        requesttext: data.acctOverviewBTReqs.requesttext,
        notestext_existinghotel:
          data.acctOverviewBTReqs.notestext_existinghotel,
        notestext_preopeninghotel:
          data.acctOverviewBTReqs.notestext_preopeninghotel,
        org_buying_struct: data.acctOverviewBTReqs.org_buying_struct,
        reservationstext: data.acctOverviewBTReqs.reservationstext,
        policies: data.acctOverviewBTReqs.policies,
        solutions: data.acctOverviewBTReqs.solutions,
        inter_strategy: data.acctOverviewBTReqs.inter_strategy,
        online_solut_util: data.acctOverviewBTReqs.online_solut_util,
        onl_bkg_tool: data.acctOverviewBTReqs.onl_bkg_tool,
        adopt_rate_bkg_tool:
          data.acctOverviewBTReqs.adopt_rate_bkg_tool !== null
            ? data.acctOverviewBTReqs.adopt_rate_bkg_tool
            : "",
        btOnly: data.acctOverviewBTReqs.btOnly,
        lastupdate_bt_overview: data.acctOverviewBTReqs.lastupdate_bt_overview,
        cbc_softduedate: data.acctOverviewBTReqs.cbc_softduedate,
        roomtypetext: data.acctOverviewBTReqs.roomtypetext,
        shortCbc_softduedate: data.acctOverviewBTReqs.shortCbc_softduedate,
      });
    }
  };
  const setData = (list) => {
    setState({
      ...state,
    });
  };

  const setInitialUserData = () => {
    setState({
      ...state,
      userRole: appContext.user.role,
    });
  };
  const setValidationFunc = (messageVal: string) => {
    setState({
      ...state,
      message: messageVal,
      validateModal: true,
    });
  };

  const rule_onchange = (e) => {
    setState({
      ...state,
      formChg: "Y",
    });
  };

  const date_onChange = () => {};
  const ShowValidateModel = () => {
    setState({
      ...state,
      validateModal: !state.validateModal,
    });
  };

  const checkUserValidation = () => {
    if (state.org_buying_struct === null || state.org_buying_struct === "") {
      setValidationFunc(
        Settings.accountBTOverviewDetails.org_buying_struct_require
      );
      return false;
    } else if (
      state.reservationstext === null ||
      state.reservationstext === ""
    ) {
      setValidationFunc(
        Settings.accountBTOverviewDetails.reservationstext_require
      );
      return false;
    } else if (state.requiretext === null || state.requiretext === "") {
      setValidationFunc(Settings.accountBTOverviewDetails.requiretext_require);
      return false;
    } else if (
      state.shortCbc_softduedate === null ||
      state.shortCbc_softduedate === ""
    ) {
      setValidationFunc(Settings.accountBTOverviewDetails.dueDate_require);
      return false;
    } else if (
      state.notestext_existinghotel === null ||
      state.notestext_existinghotel === ""
    ) {
      setValidationFunc(
        Settings.accountBTOverviewDetails.notestext_existinghotel_require
      );
      return false;
    } else if (
      state.notestext_preopeninghotel === null ||
      state.notestext_preopeninghotel === ""
    ) {
      setValidationFunc(
        Settings.accountBTOverviewDetails.notestext_preopeninghotel_require
      );
      return false;
    } else if (
      state.competitors_bybrand !== null &&
      state.competitors_bybrand !== "" &&
      state.competitors_bybrand?.length > 1024
    ) {
      setValidationFunc(Settings.accountBTOverviewDetails.by_brandlength);
      // appContext.setBtOverviewByBrandAlert(true); // Commenting because appContext errorMessage will cover the scenario. otherwise two alerts will be displayed
      return false;
    } else if (
      state.org_buying_struct !== null &&
      state.org_buying_struct !== "" &&
      state.org_buying_struct?.length > 1024
    ) {
      setValidationFunc(
        Settings.accountBTOverviewDetails.org_buying_structlength
      );
      // appContext.setBtOverviewBuyingDecisionsLengthAlert(true);
      return false;
    } else if (
      state.policies !== null &&
      state.policies !== "" &&
      state.policies?.length > 1024
    ) {
      setValidationFunc(Settings.accountBTOverviewDetails.policieslength);
      return false;
    } else if (
      state.reservationstext !== null &&
      state.reservationstext !== "" &&
      state.reservationstext?.length > 1250
    ) {
      setValidationFunc(
        Settings.accountBTOverviewDetails.reservationstextlength
      );
      return false;
    } else if (
      state.requiretext !== null &&
      state.requiretext !== "" &&
      state.requiretext?.length > 1250
    ) {
      setValidationFunc(Settings.accountBTOverviewDetails.requiretextlength);
      return false;
    } else if (
      state.requesttext !== null &&
      state.requesttext !== "" &&
      state.requesttext?.length > 1250
    ) {
      setValidationFunc(Settings.accountBTOverviewDetails.requesttextlength);
      return false;
    } else if (
      state.notestext_existinghotel !== null &&
      state.notestext_existinghotel !== "" &&
      state.notestext_existinghotel?.length > 1500
    ) {
      setValidationFunc(
        Settings.accountBTOverviewDetails.notestext_existinghotellength
      );
      return false;
    } else if (
      state.notestext_preopeninghotel !== null &&
      state.notestext_preopeninghotel !== "" &&
      state.notestext_preopeninghotel?.length > 1500
    ) {
      setValidationFunc(
        Settings.accountBTOverviewDetails.notestext_preopeninghotellength
      );
      return false;
    } else if (
      state.roomtypetext !== null &&
      state.roomtypetext !== "" &&
      state.roomtypetext?.length > 1000
    ) {
      setValidationFunc(Settings.accountBTOverviewDetails.roomtypetextlength);
      return false;
    }
    appContext.setBtOverviewByBrandAlert(false);
    appContext.setBtOverviewBuyingDecisionsLengthAlert(false);
    return true;
  };

  const updateValue = (id, year, accname) => {
    const updateSelectionList = [];

    const selectedDatavalue = {
      relocat_intermediary: state.relocat_intermediary,
      competitors_bybrand: state.competitors_bybrand,
      pref_air_partners: state.pref_air_partners,
      pref_car_rental: state.pref_car_rental,
      pref_hotel: state.pref_hotel,
      requiretext: state.requiretext,
      requesttext: state.requesttext,
      notestext_existinghotel: state.notestext_existinghotel,
      notestext_preopeninghotel: state.notestext_preopeninghotel,
      org_buying_struct: state.org_buying_struct,
      reservationstext: state.reservationstext,
      policies: state.policies,
      solutions: state.solutions,
      inter_strategy: state.inter_strategy,
      online_solut_util: state.online_solut_util,
      onl_bkg_tool: state.onl_bkg_tool,
      adopt_rate_bkg_tool: state.adopt_rate_bkg_tool
        ? state.adopt_rate_bkg_tool > 100
          ? parseInt(state.acctOverviewBTReqs.adopt_rate_bkg_tool)
          : parseInt(state.adopt_rate_bkg_tool)
        : null,
      btOnly: state.btOnly,
      roomtypetext: state.roomtypetext,
      shortCbc_softduedate: state.shortCbc_softduedate,
      cbc_softduedate: state.shortCbc_softduedate,
    };

    const params = {
      strAcctOverviewBTReqse: JSON.stringify(selectedDatavalue),
      formChg: "Y",
      period: year,
      accountrecid: id,
      accountname: accname,
    };
    let res = false;
    const postData = Utils.createPostData(params);
    accBTOverviewApi.submitData(postData).then((data) => {
      if (data === "success") {
        res = true;
        return res;
      }
    });
  };

  const mandatoryCheck = (e?, fieldName?) => {
    const org_buying_struct = state.org_buying_struct;
    if (state.org_buying_struct === null || state.org_buying_struct === "") {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.org_buying_struct_require
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.org_buying_struct_require,
        type: "custom",
      });
      return false;
    } else if (
      state.reservationstext === null ||
      state.reservationstext === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.reservationstext_require
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.reservationstext_require,
        type: "custom",
      });
      return false;
    } else if (state.requiretext === null || state.requiretext === "") {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.requiretext_require
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.requiretext_require,
        type: "custom",
      });
      return false;
    } else if (
      state.shortCbc_softduedate === null ||
      state.shortCbc_softduedate === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.dueDate_require
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.dueDate_require,
        type: "custom",
      });
      return false;
    } else if (
      state.notestext_existinghotel === null ||
      state.notestext_existinghotel === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.notestext_existinghotel_require
      );
      appContext.setErrorMessageAlert({
        show: true,
        message:
          Settings.accountBTOverviewDetails.notestext_existinghotel_require,
        type: "custom",
      });
      return false;
    } else if (
      state.notestext_preopeninghotel === null ||
      state.notestext_preopeninghotel === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.notestext_preopeninghotel_require
      );
      appContext.setErrorMessageAlert({
        show: true,
        message:
          Settings.accountBTOverviewDetails.notestext_preopeninghotel_require,
        type: "custom",
      });
      return false;
    } else if (
      state.competitors_bybrand !== null &&
      state.competitors_bybrand !== "" &&
      state.competitors_bybrand?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.by_brandlength
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.by_brandlength,
        type: "custom",
      });
      // appContext.setBtOverviewByBrandAlert(true);
      return false;
    } else if (
      state.org_buying_struct !== null &&
      state.org_buying_struct !== "" &&
      state.org_buying_struct?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.org_buying_structlength
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.org_buying_structlength,
        type: "custom",
      });
      // appContext.setBtOverviewBuyingDecisionsLengthAlert(true);
      return false;
    } else if (
      state.policies !== null &&
      state.policies !== "" &&
      state.policies?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.policieslength
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.policieslength,
        type: "custom",
      });
      return false;
    } else if (
      state.reservationstext !== null &&
      state.reservationstext !== "" &&
      state.reservationstext?.length > 1250
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.reservationstextlength
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.reservationstextlength,
        type: "custom",
      });
      return false;
    } else if (
      state.requiretext !== null &&
      state.requiretext !== "" &&
      state.requiretext?.length > 1250
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.requiretextlength
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.requiretextlength,
        type: "custom",
      });
      return false;
    } else if (
      state.requesttext !== null &&
      state.requesttext !== "" &&
      state.requesttext?.length > 1250
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.requesttextlength
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.requesttextlength,
        type: "custom",
      });
      return false;
    } else if (
      state.notestext_existinghotel !== null &&
      state.notestext_existinghotel !== "" &&
      state.notestext_existinghotel?.length > 1500
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.notestext_existinghotellength
      );
      appContext.setErrorMessageAlert({
        show: true,
        message:
          Settings.accountBTOverviewDetails.notestext_existinghotellength,
        type: "custom",
      });
      return false;
    } else if (
      state.notestext_preopeninghotel !== null &&
      state.notestext_preopeninghotel !== "" &&
      state.notestext_preopeninghotel?.length > 1500
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.notestext_preopeninghotellength
      );
      appContext.setErrorMessageAlert({
        show: true,
        message:
          Settings.accountBTOverviewDetails.notestext_preopeninghotellength,
        type: "custom",
      });
      return false;
    } else if (
      state.roomtypetext !== null &&
      state.roomtypetext !== "" &&
      state.roomtypetext?.length > 1000
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTOverviewDetails.roomtypetextlength
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTOverviewDetails.roomtypetextlength,
        type: "custom",
      });
      return false;
    }
    salescontext.setAlertMsgfunc(false, "");
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "custom",
    });
    // appContext.setBtOverviewByBrandAlert(false);
    // appContext.setBtOverviewBuyingDecisionsLengthAlert(false);
    return true;
  };

  const accBTOverview = {
    state,
    setState,
    checkUserValidation,
    ShowValidateModel,
    setInitialUserData,
    setLoadingOverViewData,
    rule_onchange,
    updateValue,
    setValidationFunc,
    date_onChange,
    setData,
    mandatoryCheck,
    resetData,
    setLoader,
  };

  return (
    <accBTOverviewContext.Provider value={accBTOverview}>
      {props.children}
    </accBTOverviewContext.Provider>
  );
};
export const accBTOverviewContextConsumer = accBTOverviewContext.Consumer;
export default accBTOverviewContext;
