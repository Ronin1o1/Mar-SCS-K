import React, { useState, useContext } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";
import ExtendedStayAPI from "../service/extendedStayAPI";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";

// Set state variables and function
const ExtendedStayContext = React.createContext({});

export const ExtendedStayContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const salescontext: any = useContext(SalesAdministartionContext);
  const [state, setState] = useState({
    Nextpath: Settings.route.NextPage,
    showScreenLoader: false,
    validateModal: false,
    message: "",
    userRole: "",
    lastUpdateDate: "",
    revStreamId: null,
    extendedstay: {
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
    let cloneObj = { ...state.extendedstay };
    cloneObj = Object.assign({}, data.extendedstay);
    let descObj = { ...state.revStreamDescription };
    descObj = Object.assign({}, data.revStreamDescription);
    setState({
      ...state,
      extendedstay: cloneObj,
      revStreamDescription: descObj,
      revStreamId: data.revStreamId,
    });
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
  const ShowValidateModel = () => {
    setState({
      ...state,
      validateModal: !state.validateModal,
    });
  };

  const checkUsermandatoryValidation = () => {
    if (
      (state.extendedstay.ext_requirements !== null ||
        state.extendedstay.ext_requirements !== undefined) &&
      state.extendedstay.ext_requirements?.length > 1024
    ) {
      setValidationFunc(Settings.extendedStayDetails.ext_requirements_alert);
      return false;
    } else if (
      (state.revStreamDescription.inter_strategy !== null ||
        state.revStreamDescription.inter_strategy !== undefined) &&
      state.revStreamDescription.inter_strategy?.length > 1024
    ) {
      setValidationFunc(Settings.extendedStayDetails.inter_strategy_alert);
      return false;
    } else if (
      (state.revStreamDescription.org_buying_struct !== null ||
        state.revStreamDescription.org_buying_struct !== undefined) &&
      state.revStreamDescription.org_buying_struct?.length > 1024
    ) {
      setValidationFunc(Settings.extendedStayDetails.org_buying_struct_alert);
      return false;
    } else if (
      (state.revStreamDescription.solutions !== null ||
        state.revStreamDescription.solutions !== undefined) &&
      state.revStreamDescription.solutions?.length > 1024
    ) {
      setValidationFunc(Settings.extendedStayDetails.solutions_alert);
      return false;
    } else if (
      (state.revStreamDescription.pref_brand !== null ||
        state.revStreamDescription.pref_brand !== undefined) &&
      state.revStreamDescription.pref_brand?.length > 1024
    ) {
      setValidationFunc(Settings.extendedStayDetails.pref_brand_alert);
      return false;
    } else if (
      (state.revStreamDescription.policies !== null ||
        state.revStreamDescription.policies !== undefined) &&
      state.revStreamDescription.policies?.length > 1024
    ) {
      setValidationFunc(Settings.extendedStayDetails.policies_alert);
      return false;
    } else if (
      (state.revStreamDescription.competitors_bybrand !== null ||
        state.revStreamDescription.competitors_bybrand !== undefined) &&
      state.revStreamDescription.competitors_bybrand?.length > 1024
    ) {
      setValidationFunc(Settings.extendedStayDetails.competitors_bybrand_alert);
      return false;
    } else if (
      state.extendedstay.ext_pct_ttl_rev > 100 ||
      state.extendedstay.ext_pct_ttl_rev < 0
    ) {
      setValidationFunc(Settings.extendedStayDetails.totalRevenue_alert);
      return false;
    } else if (
      state.extendedstay.ext_mar_pct_ttl_roomnts > 100 ||
      state.extendedstay.ext_mar_pct_ttl_roomnts < 0
    ) {
      setValidationFunc(Settings.extendedStayDetails.total_rmnts_alert);
      return false;
    } else if (
      state.extendedstay.ext_ind_pct_ttl_roomnts > 100 ||
      state.extendedstay.ext_ind_pct_ttl_roomnts < 0
    ) {
      setValidationFunc(Settings.extendedStayDetails.totalExt_rmnts_alert);
      return false;
    } else if (
      state.revStreamDescription.adopt_rate_bkg_tool > 100 ||
      state.revStreamDescription.adopt_rate_bkg_tool < 0
    ) {
      setValidationFunc(Settings.extendedStayDetails.adoptionRate_alert);
      return false;
    } else if (
      (state.extendedstay.ext_desc_relocprovider !== null ||
        state.extendedstay.ext_desc_relocprovider !== undefined) &&
      state.extendedstay.ext_desc_relocprovider?.length > 1024
    ) {
      setValidationFunc(Settings.extendedStayDetails.relocationProvider_alert);
      return false;
    } else {
      return true;
    }
  };
  const checkValidationOnNavigation = () => {
    if (
      (state.extendedstay.ext_requirements !== null ||
        state.extendedstay.ext_requirements !== undefined) &&
      state.extendedstay.ext_requirements?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.extendedStayDetails.ext_requirements_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.ext_requirements_alert,
        type: "custom",
      });
      return false;
    } else if (
      (state.revStreamDescription.inter_strategy !== null ||
        state.revStreamDescription.inter_strategy !== undefined) &&
      state.revStreamDescription.inter_strategy?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.extendedStayDetails.inter_strategy_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.inter_strategy_alert,
        type: "custom",
      });
      return false;
    } else if (
      (state.revStreamDescription.org_buying_struct !== null ||
        state.revStreamDescription.org_buying_struct !== undefined) &&
      state.revStreamDescription.org_buying_struct?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.extendedStayDetails.org_buying_struct_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.org_buying_struct_alert,
        type: "custom",
      });
      return false;
    } else if (
      (state.revStreamDescription.solutions !== null ||
        state.revStreamDescription.solutions !== undefined) &&
      state.revStreamDescription.solutions?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.extendedStayDetails.solutions_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.solutions_alert,
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
        Settings.extendedStayDetails.pref_brand_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.pref_brand_alert,
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
        Settings.extendedStayDetails.policies_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.policies_alert,
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
        Settings.extendedStayDetails.competitors_bybrand_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.competitors_bybrand_alert,
        type: "custom",
      });
      return false;
    } else if (
      (state.extendedstay.ext_desc_relocprovider !== null ||
        state.extendedstay.ext_desc_relocprovider !== undefined) &&
      state.extendedstay.ext_desc_relocprovider?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.extendedStayDetails.relocationProvider_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.relocationProvider_alert,
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

  const adoptratebkgtoolValidation = () => {
    if (
      state.revStreamDescription.adopt_rate_bkg_tool > 100 ||
      state.revStreamDescription.adopt_rate_bkg_tool < 0
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.extendedStayDetails.adoptionRate_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.adoptionRate_alert,
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
  const rangeValidation = () => {
    if (
      state.extendedstay.ext_pct_ttl_rev > 100 ||
      state.extendedstay.ext_pct_ttl_rev < 0
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.extendedStayDetails.totalRevenue_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.totalRevenue_alert,
        type: "custom",
      });
      return false;
    } else if (
      state.extendedstay.ext_mar_pct_ttl_roomnts > 100 ||
      state.extendedstay.ext_mar_pct_ttl_roomnts < 0
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.extendedStayDetails.total_rmnts_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.total_rmnts_alert,
        type: "custom",
      });
      return false;
    } else if (
      state.extendedstay.ext_ind_pct_ttl_roomnts > 100 ||
      state.extendedstay.ext_ind_pct_ttl_roomnts < 0
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.extendedStayDetails.totalExt_rmnts_alert
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.extendedStayDetails.totalExt_rmnts_alert,
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
  const updateValue = (id, year, accname) => {
    const selectedExtendedStayvalue = {
      accthistcatid: state.extendedstay.accthistcatid
        ? state.extendedstay.accthistcatid
        : null,
      accountinfoid: state.extendedstay.accountinfoid
        ? state.extendedstay.accountinfoid
        : null,
      revstreamid: state.revStreamId ? state.revStreamId : null,
      est_ttl_spnd:
        state.extendedstay.est_ttl_spnd !== null
          ? parseInt(state.extendedstay.est_ttl_spnd)
          : null,
      est_ttl_spnd_pct_lstyr:
        state.extendedstay.est_ttl_spnd_pct_lstyr !== null
          ? parseInt(state.extendedstay.est_ttl_spnd_pct_lstyr)
          : null,
      lead_us_mkts:
        state.extendedstay.lead_us_mkts !== null
          ? parseInt(state.extendedstay.lead_us_mkts)
          : null,
      est_non_us_bus:
        state.extendedstay.est_non_us_bus !== null
          ? parseInt(state.extendedstay.est_non_us_bus)
          : null,
      non_us_bus_chng_lstyr:
        state.extendedstay.non_us_bus_chng_lstyr !== null
          ? parseInt(state.extendedstay.non_us_bus_chng_lstyr)
          : null,
      lead_non_us_mkts:
        state.extendedstay.lead_non_us_mkts !== null
          ? parseInt(state.extendedstay.lead_non_us_mkts)
          : null,
      rev:
        state.extendedstay.rev !== null
          ? parseInt(state.extendedstay.rev)
          : null,
      rev_chng_lstyr:
        state.extendedstay.rev_chng_lstyr !== null
          ? parseInt(state.extendedstay.rev_chng_lstyr)
          : null,
      ttl_rev_pct:
        state.extendedstay.ttl_rev_pct !== null
          ? parseInt(state.extendedstay.ttl_rev_pct)
          : null,
      mar_lcl_rev:
        state.extendedstay.mar_lcl_rev !== null
          ? parseInt(state.extendedstay.mar_lcl_rev)
          : null,
      mar_lcl_rev_chng_lstyr:
        state.extendedstay.mar_lcl_rev_chng_lstyr !== null
          ? parseInt(state.extendedstay.mar_lcl_rev_chng_lstyr)
          : null,
      ttl_projections:
        state.extendedstay.ttl_projections !== null
          ? parseInt(state.extendedstay.ttl_projections)
          : null,
      ttl_proj_rev_pct:
        state.extendedstay.ttl_proj_rev_pct !== null
          ? parseInt(state.extendedstay.ttl_proj_rev_pct)
          : null,
      lead_mkts: null,
      act_pln_event: null,
      holiday_parties: null,
      holiday_party_details: null,
      telepresence_caps: null,
      ext_avg_len_stay:
        state.extendedstay.ext_avg_len_stay !== null
          ? parseInt(state.extendedstay.ext_avg_len_stay)
          : null,
      ext_est_ttl_spend_nxtyr:
        state.extendedstay.ext_est_ttl_spend_nxtyr !== null
          ? parseInt(state.extendedstay.ext_est_ttl_spend_nxtyr)
          : null,
      ext_est_source: null,
      ext_pct_ttl_rev:
        state.extendedstay.ext_pct_ttl_rev !== null
          ? parseInt(state.extendedstay.ext_pct_ttl_rev)
          : null,
      ext_ttl_room_nts:
        state.extendedstay.ext_ttl_room_nts !== null
          ? parseInt(state.extendedstay.ext_ttl_room_nts)
          : null,
      ext_mar_pct_ttl_roomnts:
        state.extendedstay.ext_mar_pct_ttl_roomnts !== null
          ? parseInt(state.extendedstay.ext_mar_pct_ttl_roomnts)
          : null,
      ext_ind_pct_ttl_roomnts:
        state.extendedstay.ext_ind_pct_ttl_roomnts !== null
          ? parseInt(state.extendedstay.ext_ind_pct_ttl_roomnts)
          : null,
      ext_requirements: state.extendedstay.ext_requirements
        ? state.extendedstay.ext_requirements
        : null,
      ext_pricingvehicle: state.extendedstay.ext_pricingvehicle
        ? state.extendedstay.ext_pricingvehicle
        : null,
      ext_preferredrate: state.extendedstay.ext_preferredrate
        ? state.extendedstay.ext_preferredrate
        : null,
      ext_prefer_relocprovider: state.extendedstay.ext_prefer_relocprovider
        ? state.extendedstay.ext_prefer_relocprovider
        : null,
      ext_desc_relocprovider: state.extendedstay.ext_desc_relocprovider
        ? state.extendedstay.ext_desc_relocprovider
        : null,
      volume: null,
      eventCom: null,
      eventComVol: null,
    };
    const selectedRevStreamDescvalue = {
      acctstr_id: state.revStreamDescription.acctstr_id
        ? state.revStreamDescription.acctstr_id
        : null,
      accountinfoid: state.revStreamDescription.accountinfoid
        ? state.revStreamDescription.accountinfoid
        : null,
      revstreamid: state.revStreamId ? state.revStreamId : null,
      org_buying_struct: state.revStreamDescription.org_buying_struct
        ? state.revStreamDescription.org_buying_struct
        : null,
      solutions: state.revStreamDescription.solutions
        ? state.revStreamDescription.solutions
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
      online_solut_util: null,
      pref_air_partners: null,
      pref_car_rental: null,
      pref_hotel: null,
      relocat_intermediary: state.revStreamDescription.relocat_intermediary
        ? state.revStreamDescription.relocat_intermediary
        : null,
      adopt_rate_bkg_tool:
        state.revStreamDescription.adopt_rate_bkg_tool !== null
          ? parseInt(state.revStreamDescription.adopt_rate_bkg_tool)
          : null,
      onl_bkg_tool: state.revStreamDescription.onl_bkg_tool
        ? state.revStreamDescription.onl_bkg_tool
        : null,
      inter_strategy: state.revStreamDescription.inter_strategy
        ? state.revStreamDescription.inter_strategy
        : null,
      bkg_agent: null,
      mtg_types: null,
      mtg_size: null,
      mtg_freq: null,
    };

    const params = {
      strExtendedstay: JSON.stringify(selectedExtendedStayvalue),
      strRevStreamDescription: JSON.stringify(selectedRevStreamDescvalue),
      formChg: "Y",
      period: year,
      accountrecid: id,
      accountname: accname,
    };
    const postData = Utils.createPostData(params);
    setLoader(true);
    ExtendedStayAPI.submitData(postData).then((data) => {
      setLoader(false);
      if (data === "success") {
        // window.location.reload();
        ExtendedStayAPI.getData(id, year, accname).then((datar) => {
          setLoadingData(datar);
          setState({
            ...state,
            lastUpdateDate: datar.lastUpdate,
          });
        });
      }
    });
  };

  const extendedStayList = {
    state,
    setState,
    setInitialUserData,
    setLoadingData,
    setData,
    setValidationFunc,
    ShowValidateModel,
    updateValue,
    checkUsermandatoryValidation,
    checkValidationOnNavigation,
    rangeValidation,
    adoptratebkgtoolValidation,
    setLoader,
  };

  return (
    <ExtendedStayContext.Provider value={extendedStayList}>
      {props.children}
    </ExtendedStayContext.Provider>
  );
};
export const extendedStayContextConsumer = ExtendedStayContext.Consumer;
export default ExtendedStayContext;
