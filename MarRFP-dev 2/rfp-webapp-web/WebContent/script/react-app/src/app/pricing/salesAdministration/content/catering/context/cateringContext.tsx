import React, { useState, useContext, useEffect } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import Settings from "../static/Settings";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";
import Utils from "../../../../../common/utils/Utils";
import CateringAPI from "../service/cateringAPI";

// Set state variables and function
const CateringContext = React.createContext({});

export const CateringContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const salescontext = useContext(SalesAdministartionContext);
  const [state, setState] = useState({
    Nextpath: Settings.route.NextPage,
    showScreenLoader: false,
    validateModal: false,
    userRole: "",
    message: "",
    revStreamId: null,
    lastUpdateDate: "",
    catering: {
      accthistcatid: null,
      accountinfoid: null,
      revstreamid: null,
      est_ttl_spnd: null,
      est_ttl_spnd_pct_lstyr: null,
      lead_us_mkts: null,
      est_non_us_bus: null,
      non_us_bus_chng_lstyr: null,
      lead_non_us_mkts: null,
      rev: null,
      rev_chng_lstyr: null,
      ttl_rev_pct: null,
      mar_lcl_rev: null,
      mar_lcl_rev_chng_lstyr: null,
      ttl_projections: null,
      ttl_proj_rev_pct: null,
      lead_mkts: null,
      act_pln_event: null,
      holiday_parties: null,
      holiday_party_details: null,
      telepresence_caps: null,
      ext_avg_len_stay: null,
      ext_est_ttl_spend_nxtyr: null,
      ext_est_source: null,
      ext_pct_ttl_rev: null,
      ext_ttl_room_nts: null,
      ext_mar_pct_ttl_roomnts: null,
      ext_ind_pct_ttl_roomnts: null,
      ext_requirements: null,
      ext_pricingvehicle: null,
      ext_preferredrate: null,
      ext_prefer_relocprovider: null,
      ext_desc_relocprovider: null,
      volume: null,
      eventCom: null,
      eventComVol: null,
    },
    revStreamDescription: {
      acctstr_id: null,
      accountinfoid: null,
      revstreamid: null,
      org_buying_struct: null,
      solutions: null,
      policies: null,
      pref_brand: null,
      competitors_bybrand: null,
      online_solut_util: null,
      pref_air_partners: null,
      pref_car_rental: null,
      pref_hotel: null,
      relocat_intermediary: null,
      adopt_rate_bkg_tool: null,
      onl_bkg_tool: null,
      inter_strategy: null,
      bkg_agent: null,
      mtg_types: null,
      mtg_size: null,
      mtg_freq: null,
    },
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const setLoadingData = (data) => {
    let cloneObj = { ...state.catering };
    cloneObj = Object.assign({}, data.catering);
    let descObj = { ...state.revStreamDescription };
    descObj = Object.assign({}, data.revStreamDescription);
    setState({
      ...state,
      catering: cloneObj,
      revStreamDescription: descObj,
      revStreamId: data.revStreamId,
    });
  };

  const setInitialUserData = () => {
    setState({
      ...state,
      userRole: appContext.user.role,
    });
  };

  const setData = (list) => {
    setState({
      ...state,
    });
  };

  const setValidationFunc = (messageVal: string) => {
    setState({
      ...state,
      message: messageVal,
      validateModal: true,
    });
  };

  const ShowValidateModel = () => {
    setState({
      ...state,
      validateModal: !state.validateModal,
    });
  };

  const checkUpdateValidation = () => {
    if (
      (state.revStreamDescription.org_buying_struct !== null ||
        state.revStreamDescription.org_buying_struct !== undefined) &&
      state.revStreamDescription.org_buying_struct?.length > 1024
    ) {
      setValidationFunc(Settings.CateringDetails.orgTextArea);
      return false;
    } else if (
      (state.revStreamDescription.mtg_types !== null ||
        state.revStreamDescription.mtg_types !== undefined) &&
      state.revStreamDescription.mtg_types?.length > 300
    ) {
      setValidationFunc(Settings.CateringDetails.avgMeetingsTextArea);
      return false;
    } else if (
      (state.revStreamDescription.policies !== null ||
        state.revStreamDescription.policies !== undefined) &&
      state.revStreamDescription.policies?.length > 1024
    ) {
      setValidationFunc(Settings.CateringDetails.policiesTextArea);
      return false;
    } else if (
      (state.revStreamDescription.pref_brand !== null ||
        state.revStreamDescription.pref_brand !== undefined) &&
      state.revStreamDescription.pref_brand?.length > 1024
    ) {
      setValidationFunc(Settings.CateringDetails.prefMarriottTextArea);
      return false;
    } else if (
      (state.revStreamDescription.competitors_bybrand !== null ||
        state.revStreamDescription.competitors_bybrand !== undefined) &&
      state.revStreamDescription.competitors_bybrand?.length > 1024
    ) {
      setValidationFunc(Settings.CateringDetails.topCompetitorsTextArea);
      return false;
    } else if (
      state.catering.ttl_rev_pct < 0 ||
      state.catering.ttl_rev_pct > 100
    ) {
      setValidationFunc(Settings.CateringDetails.totalRevenue_alert);
      return false;
    } else if (
      state.catering.ttl_proj_rev_pct < 0 ||
      state.catering.ttl_proj_rev_pct > 100
    ) {
      setValidationFunc(Settings.CateringDetails.totalRevenue_alert);
      return false;
    } else if (
      (state.catering.holiday_party_details !== null ||
        state.catering.holiday_party_details !== undefined) &&
      state.catering.holiday_party_details?.length > 1024
    ) {
      setValidationFunc(Settings.CateringDetails.holidayDetailsTextArea);
      return false;
    }
    return true;
  };

  const mandatoryTextFieldInputCheck = () => {
    if (
      (state.revStreamDescription.org_buying_struct !== null ||
        state.revStreamDescription.org_buying_struct !== undefined) &&
      state.revStreamDescription.org_buying_struct?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(true, Settings.CateringDetails.orgTextArea);
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.CateringDetails.orgTextArea,
        type: "custom",
      });
      return false;
    } else if (
      (state.revStreamDescription.mtg_types !== null ||
        state.revStreamDescription.mtg_types !== undefined) &&
      state.revStreamDescription.mtg_types?.length > 300
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.CateringDetails.avgMeetingsTextArea
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.CateringDetails.avgMeetingsTextArea,
        type: "custom",
      });
      return false;
    } else if (
      (state.revStreamDescription.policies !== null ||
        state.revStreamDescription.policies !== undefined) &&
      state.revStreamDescription.policies?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.CateringDetails.policiesTextArea
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.CateringDetails.policiesTextArea,
        type: "custom",
      });
      return false;
    } else if (
      (state.revStreamDescription.pref_brand !== null ||
        state.revStreamDescription.pref_brand !== undefined) &&
      state.revStreamDescription.pref_brand?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.CateringDetails.prefMarriottTextArea
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.CateringDetails.prefMarriottTextArea,
        type: "custom",
      });
      return false;
    } else if (
      (state.revStreamDescription.competitors_bybrand !== null ||
        state.revStreamDescription.competitors_bybrand !== undefined) &&
      state.revStreamDescription.competitors_bybrand?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.CateringDetails.topCompetitorsTextArea
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.CateringDetails.topCompetitorsTextArea,
        type: "custom",
      });
      return false;
    } else if (
      (state.catering.holiday_party_details !== null ||
        state.catering.holiday_party_details !== undefined) &&
      state.catering.holiday_party_details?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.CateringDetails.holidayDetailsTextArea
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.CateringDetails.holidayDetailsTextArea,
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
    return true;
  };

  useEffect(() => {
    if (appContext.navbarClicked) {
      setState({
        ...state,
        validateModal: false,
      });
    }
  }, [appContext.navbarClicked]);

  const updateValue = (id, year, accname) => {
    const selectedCateringValues = {
      est_ttl_spnd:
        typeof state.catering.est_ttl_spnd === "string"
          ? parseInt(state.catering.est_ttl_spnd)
          : state.catering.est_ttl_spnd,
      est_ttl_spnd_pct_lstyr:
        typeof state.catering.est_ttl_spnd_pct_lstyr === "string"
          ? parseInt(state.catering.est_ttl_spnd_pct_lstyr)
          : state.catering.est_ttl_spnd_pct_lstyr,
      lead_us_mkts: state.catering.lead_us_mkts
        ? state.catering.lead_us_mkts
        : null,
      est_non_us_bus:
        typeof state.catering.est_non_us_bus === "string"
          ? parseInt(state.catering.est_non_us_bus)
          : state.catering.est_non_us_bus,
      non_us_bus_chng_lstyr:
        typeof state.catering.non_us_bus_chng_lstyr === "string"
          ? parseInt(state.catering.non_us_bus_chng_lstyr)
          : state.catering.non_us_bus_chng_lstyr,
      lead_non_us_mkts: state.catering.lead_non_us_mkts
        ? state.catering.lead_non_us_mkts
        : null,
      rev:
        typeof state.catering.rev === "string"
          ? parseInt(state.catering.rev)
          : state.catering.rev,
      rev_chng_lstyr:
        typeof state.catering.rev_chng_lstyr === "string"
          ? parseInt(state.catering.rev_chng_lstyr)
          : state.catering.rev_chng_lstyr,
      ttl_rev_pct:
        typeof state.catering.ttl_rev_pct === "string"
          ? parseInt(state.catering.ttl_rev_pct)
          : state.catering.ttl_rev_pct,
      mar_lcl_rev:
        typeof state.catering.mar_lcl_rev === "string"
          ? parseInt(state.catering.mar_lcl_rev)
          : state.catering.mar_lcl_rev,
      mar_lcl_rev_chng_lstyr:
        typeof state.catering.mar_lcl_rev_chng_lstyr === "string"
          ? parseInt(state.catering.mar_lcl_rev_chng_lstyr)
          : state.catering.mar_lcl_rev_chng_lstyr,
      ttl_projections:
        typeof state.catering.ttl_projections === "string"
          ? parseInt(state.catering.ttl_projections)
          : state.catering.ttl_projections,
      ttl_proj_rev_pct:
        typeof state.catering.ttl_proj_rev_pct === "string"
          ? parseInt(state.catering.ttl_proj_rev_pct)
          : state.catering.ttl_proj_rev_pct,
      lead_mkts: state.catering.lead_mkts ? state.catering.lead_mkts : null,
      act_pln_event: state.catering.act_pln_event
        ? state.catering.act_pln_event
        : null,
      holiday_parties: state.catering.holiday_parties
        ? state.catering.holiday_parties
        : null,
      holiday_party_details: state.catering.holiday_party_details
        ? state.catering.holiday_party_details
        : null,
      telepresence_caps: state.catering.telepresence_caps
        ? state.catering.telepresence_caps
        : null,
    };

    const selectedRevStreamDesc = {
      org_buying_struct: state.revStreamDescription.org_buying_struct
        ? state.revStreamDescription.org_buying_struct
        : null,
      bkg_agent: state.revStreamDescription.bkg_agent
        ? state.revStreamDescription.bkg_agent
        : null,
      mtg_types: state.revStreamDescription.mtg_types
        ? state.revStreamDescription.mtg_types
        : null,
      mtg_size:
        typeof state.revStreamDescription.mtg_size === "string"
          ? parseInt(state.revStreamDescription.mtg_size)
          : state.revStreamDescription.mtg_size,
      mtg_freq: state.revStreamDescription.mtg_freq
        ? state.revStreamDescription.mtg_freq
        : null,
      policies: state.revStreamDescription.policies
        ? state.revStreamDescription.policies
        : null,
      pref_brand: state.revStreamDescription.pref_brand
        ? state.revStreamDescription.pref_brand
        : null,
      competitors_bybrand: state.revStreamDescription.competitors_bybrand
        ? state.revStreamDescription.competitors_bybrand
        : null,
    };

    const params = {
      strCatering: JSON.stringify(selectedCateringValues),
      strRevStreamDescription: JSON.stringify(selectedRevStreamDesc),
      formChg: "Y",
      period: year,
      accountrecid: id,
      accountname: accname,
    };
    const postData = Utils.createPostData(params);
    setLoader(true);
    CateringAPI.submitData(postData).then((data) => {
      setLoader(false);
      if (data === "success") {
        // window.location.reload();
        CateringAPI.getData(id, year, accname).then((data) => {
          setLoadingData(data);
          setState({
            ...state,
            lastUpdateDate: data.lastUpdate,
          });
        });
      }
    });
  };

  const numberRangeValidation = () => {
    if (state.catering.ttl_rev_pct > 100 || state.catering.ttl_rev_pct < 0) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.CateringDetails.totalRevenue_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.CateringDetails.totalRevenue_alert,
        type: "custom",
      });
      return false;
    } else if (
      state.catering.ttl_proj_rev_pct > 100 ||
      state.catering.ttl_proj_rev_pct < 0
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.CateringDetails.totalRevenue_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.CateringDetails.totalRevenue_alert,
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

  const mandatoryCheck = () => {
    const check1 = mandatoryTextFieldInputCheck();
    if (check1) {
      numberRangeValidation();
    }
  };

  const cateringList = {
    state,
    setState,
    setInitialUserData,
    setLoadingData,
    setData,
    updateValue,
    setValidationFunc,
    ShowValidateModel,
    mandatoryTextFieldInputCheck,
    checkUpdateValidation,
    numberRangeValidation,
    mandatoryCheck,
    setLoader,
  };

  return (
    <CateringContext.Provider value={cateringList}>
      {props.children}
    </CateringContext.Provider>
  );
};
export const cateringContextConsumer = CateringContext.Consumer;
export default CateringContext;
