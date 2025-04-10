import React, { useState, useContext, useEffect } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";
//import StatusAccountPricingContext from "../../../../hotelPricing/content/centerallyPricedAccount/content/Price/content/StatusAccountPricingContact/context/StatusAccountPricingContext";
import GroupProfileApi from "../service/GroupProfileApi";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";
//import SappUtils from "../../../shared/Utils";

// Set state variables and function
const GroupProfileContext = React.createContext({});

export const GroupProfileContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const salescontext = useContext(SalesAdministartionContext);
  const [state, setState] = useState({
    Nextpath: Settings.route.NextPage,
    showScreenLoader: false,
    validateModal: false,
    message: "",
    accountinfoid: null,
    accthistgrpid: null,
    annl_mtg: null,
    annl_mtg_attend: null,
    annl_mtg_budget_affl: null,
    annl_mtg_budget_av: null,
    annl_mtg_budget_fb: null,
    annl_mtg_cncssn: null,
    annl_mtg_desc: null,
    annl_mtg_grp_clause: null,
    annl_mtg_grp_contract: null,
    annl_mtg_gsa: null,
    annl_mtg_leadtm: null,
    annl_mtg_loc: null,
    annl_mtg_next_open: null,
    annl_mtg_pkrooms: null,
    annl_mtg_rmbudget: null,
    annl_mtg_slip: null,
    annl_mtg_timeyear: null,
    annl_mtg_use_inter: null,
    annl_mtg_yrbk: null,
    genCncssn: null,
    lgeMtgGrpClause: null,
    lgeMtgGrpContract: null,
    lgeMtgLeadTm: null,
    lgeMtgMarGsa: null,
    lgeMtgMarPct: null,
    lgeMtgNonAnnual: null,
    lgeMtgPkFour: null,
    lgeMtgPkOne: null,
    lgeMtgPkThree: null,
    lgeMtgPkTwo: null,
    lgeMtgProfile: null,
    lge_mtg_concssn: null,
    lge_mtg_use_inter: null,
    pct_budget_av: null,
    pct_budget_other: null,
    pct_budgetaffl_fb: null,
    pct_mtg_plnrenroll: null,
    smlMtgLeadTm: null,
    sml_mar_gsa: null,
    sml_mtg_cncssn: null,
    sml_mtg_grp_clause: null,
    sml_mtg_grp_contract: null,
    sml_mtg_mar_pct: null,
    sml_mtg_pk_one: null,
    sml_mtg_pk_three: null,
    sml_mtg_pk_two: null,
    sml_mtg_use_inter: null,
    sml_mtg_use_inter_desc: null,
    spend_budget: null,
    ttl_annual_mtg: null,
    userRole: "",
    maxblackoutperiodslimit: null,
    alertMessageCheck: false,
    profileAlertCheck: false,
    lastUpdateDate: "",

    profileshareUpdate: {
      pct_budget_gstrm: null,
      pct_mar_share: null,
      pct_attr_contracts: null,
      pct_budget_fb: null,
    },
    onLoadprofileshareUpdate: {
      pct_budget_gstrm: null,
      pct_mar_share: null,
      pct_attr_contracts: null,
      pct_budget_fb: null,
    },
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const setValidationFunc = (messageVal: string) => {
    setState({
      ...state,
      message: messageVal,
      validateModal: true,
    });
  };
  const setLoadingProfileData = (dataval) => {
    let profileshareUpdate = { ...state.profileshareUpdate };
    let onLoadprofileshareUpdate = { ...state.onLoadprofileshareUpdate };

    profileshareUpdate = {
      pct_attr_contracts:
        dataval.pct_attr_contracts !== null ? dataval.pct_attr_contracts : "",
      pct_budget_fb:
        dataval.pct_budget_fb !== null ? dataval.pct_budget_fb : "",
      pct_budget_gstrm:
        dataval.pct_budget_gstrm !== null ? dataval.pct_budget_gstrm : "",
      pct_mar_share:
        dataval.pct_mar_share !== null ? dataval.pct_mar_share : "",
    };
    onLoadprofileshareUpdate = {
      pct_attr_contracts:
        dataval.pct_attr_contracts !== null ? dataval.pct_attr_contracts : "",
      pct_budget_fb:
        dataval.pct_budget_fb !== null ? dataval.pct_budget_fb : "",
      pct_budget_gstrm:
        dataval.pct_budget_gstrm !== null ? dataval.pct_budget_gstrm : "",
      pct_mar_share:
        dataval.pct_mar_share !== null ? dataval.pct_mar_share : "",
    };
    setState({
      ...state,
      accountinfoid: dataval.accountinfoid,
      accthistgrpid: dataval.accthistgrpid,
      annl_mtg: dataval.annl_mtg,
      annl_mtg_attend: dataval.annl_mtg_attend,
      annl_mtg_budget_affl: dataval.annl_mtg_budget_affl,
      annl_mtg_budget_av: dataval.annl_mtg_budget_av,
      annl_mtg_budget_fb: dataval.annl_mtg_budget_fb,
      annl_mtg_cncssn: dataval.annl_mtg_cncssn,
      annl_mtg_desc: dataval.annl_mtg_desc,
      annl_mtg_grp_clause: dataval.annl_mtg_grp_clause,
      annl_mtg_grp_contract: dataval.annl_mtg_grp_contract,
      annl_mtg_gsa: dataval.annl_mtg_gsa,
      annl_mtg_leadtm: dataval.annl_mtg_leadtm,
      annl_mtg_loc: dataval.annl_mtg_loc,
      annl_mtg_next_open: dataval.annl_mtg_next_open,
      annl_mtg_pkrooms: dataval.annl_mtg_pkrooms,
      annl_mtg_rmbudget: dataval.annl_mtg_rmbudget,
      annl_mtg_slip: dataval.annl_mtg_slip,
      annl_mtg_timeyear: dataval.annl_mtg_timeyear,
      annl_mtg_use_inter: dataval.annl_mtg_use_inter,
      annl_mtg_yrbk: dataval.annl_mtg_yrbk,
      genCncssn: dataval.genCncssn,
      lgeMtgGrpClause: dataval.lgeMtgGrpClause,
      lgeMtgGrpContract: dataval.lgeMtgGrpContract,
      lgeMtgLeadTm: dataval.lgeMtgLeadTm,
      lgeMtgMarGsa: dataval.lgeMtgMarGsa,
      lgeMtgMarPct: dataval.lgeMtgMarPct,
      lgeMtgNonAnnual: dataval.lgeMtgNonAnnual,
      lgeMtgPkFour: dataval.lgeMtgPkFour,
      lgeMtgPkOne: dataval.lgeMtgPkOne,
      lgeMtgPkThree: dataval.lgeMtgPkThree,
      lgeMtgPkTwo: dataval.lgeMtgPkTwo,
      lgeMtgProfile: dataval.lgeMtgProfile,
      lge_mtg_concssn: dataval.lge_mtg_concssn,
      lge_mtg_use_inter: dataval.lge_mtg_use_inter,
      pct_budget_av: dataval.pct_budget_av,
      pct_budget_other: dataval.pct_budget_other,
      pct_budgetaffl_fb: dataval.pct_budgetaffl_fb,
      pct_mtg_plnrenroll: dataval.pct_mtg_plnrenroll,
      smlMtgLeadTm: dataval.smlMtgLeadTm,
      sml_mar_gsa: dataval.sml_mar_gsa,
      sml_mtg_cncssn: dataval.sml_mtg_cncssn,
      sml_mtg_grp_clause: dataval.sml_mtg_grp_clause,
      sml_mtg_grp_contract: dataval.sml_mtg_grp_contract,
      sml_mtg_mar_pct: dataval.sml_mtg_mar_pct,
      sml_mtg_pk_one: dataval.sml_mtg_pk_one,
      sml_mtg_pk_three: dataval.sml_mtg_pk_three,
      sml_mtg_pk_two: dataval.sml_mtg_pk_two,
      sml_mtg_use_inter: dataval.sml_mtg_use_inter,
      sml_mtg_use_inter_desc: dataval.sml_mtg_use_inter_desc,
      spend_budget: dataval.spend_budget,
      ttl_annual_mtg: dataval.ttl_annual_mtg,
      profileshareUpdate: profileshareUpdate,
      onLoadprofileshareUpdate: onLoadprofileshareUpdate,
    });
  };

  const setInitialUserData = () => {
    setState({
      ...state,
      userRole: appContext.user.role,
    });
  };
  const checkUserValidation = () => {
    if (
      (state.sml_mtg_use_inter_desc !== null ||
        state.sml_mtg_use_inter_desc !== undefined) &&
      state.sml_mtg_use_inter_desc?.length > 255
    ) {
      setValidationFunc(Settings.GroupProfileDetails.IntermediaryServicesReq);

      return false;
    } else if (
      (state.sml_mtg_cncssn !== null || state.sml_mtg_cncssn !== undefined) &&
      state.sml_mtg_cncssn?.length > 1024
    ) {
      setValidationFunc(Settings.GroupProfileDetails.ConcessionsMeetingsReq);

      return false;
    } else if (
      (state.lge_mtg_concssn !== null || state.lge_mtg_concssn !== undefined) &&
      state.lge_mtg_concssn?.length > 1024
    ) {
      setValidationFunc(
        Settings.GroupProfileDetails.ConcessionsAnnualMeetingsReq
      );

      return false;
    } else if (
      (state.annl_mtg_desc !== null || state.annl_mtg_desc !== undefined) &&
      state.annl_mtg_desc?.length > 1024
    ) {
      setValidationFunc(Settings.GroupProfileDetails.AnnualMeetingProfileReq);

      return false;
    } else if (
      (state.annl_mtg_cncssn !== null || state.annl_mtg_cncssn !== undefined) &&
      state.annl_mtg_cncssn?.length > 1024
    ) {
      setValidationFunc(
        Settings.GroupProfileDetails.RequestGeneralConcessionsReq
      );

      return false;
    }

    return true;
  };

  const mandatoryTextFieldInputCheck = () => {
    if (
      (state.sml_mtg_use_inter_desc !== null ||
        state.sml_mtg_use_inter_desc !== undefined) &&
      state.sml_mtg_use_inter_desc?.length > 255
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.GroupProfileDetails.IntermediaryServicesReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.GroupProfileDetails.IntermediaryServicesReq,
        type: "custom",
      });
      return false;
    } else if (
      (state.sml_mtg_cncssn !== null || state.sml_mtg_cncssn !== undefined) &&
      state.sml_mtg_cncssn?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.GroupProfileDetails.ConcessionsMeetingsReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.GroupProfileDetails.ConcessionsMeetingsReq,
        type: "custom",
      });
      return false;
    } else if (
      (state.lge_mtg_concssn !== null || state.lge_mtg_concssn !== undefined) &&
      state.lge_mtg_concssn?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.GroupProfileDetails.ConcessionsAnnualMeetingsReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.GroupProfileDetails.ConcessionsAnnualMeetingsReq,
        type: "custom",
      });
      return false;
    } else if (
      (state.annl_mtg_desc !== null || state.annl_mtg_desc !== undefined) &&
      state.annl_mtg_desc?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.GroupProfileDetails.AnnualMeetingProfileReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.GroupProfileDetails.AnnualMeetingProfileReq,
        type: "custom",
      });
      return false;
    } else if (
      (state.annl_mtg_cncssn !== null || state.annl_mtg_cncssn !== undefined) &&
      state.annl_mtg_cncssn?.length > 1024
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.GroupProfileDetails.RequestGeneralConcessionsReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.GroupProfileDetails.RequestGeneralConcessionsReq,
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
  const ShowValidateModel = () => {
    setState({
      ...state,
      validateModal: !state.validateModal,
    });
  };

  useEffect(() => {
    if (appContext.navbarClicked) {
      setState({
        ...state,
        validateModal: false,
      });
    }
  }, [appContext.navbarClicked]);

  const setData = (list) => {
    setState({
      ...state,
    });
  };
  const updateValue = (id, year, accname) => {
    //annl_mtg_loc , annl_mtg_timeyear, annl_mtg_yrbk, annl_mtg_next_open,
    //annl_mtg_slip,annl_mtg_leadtm
    const selectedDatavalue = {
      accountinfoid: state.accountinfoid ? parseInt(state.accountinfoid) : null,
      accthistgrpid: state.accthistgrpid ? parseInt(state.accthistgrpid) : null,
      annl_mtg: state.annl_mtg ? state.annl_mtg : null,
      annl_mtg_attend:
        state.annl_mtg_attend !== null ? parseInt(state.annl_mtg_attend) : null,
      annl_mtg_budget_affl:
        state.annl_mtg_budget_affl !== null
          ? parseInt(state.annl_mtg_budget_affl)
          : null,
      annl_mtg_budget_av:
        state.annl_mtg_budget_av !== null
          ? parseInt(state.annl_mtg_budget_av)
          : null,
      annl_mtg_budget_fb:
        state.annl_mtg_budget_fb !== null
          ? parseInt(state.annl_mtg_budget_fb)
          : null,
      annl_mtg_cncssn: state.annl_mtg_cncssn ? state.annl_mtg_cncssn : null,
      annl_mtg_desc: state.annl_mtg_desc ? state.annl_mtg_desc : null,
      annl_mtg_grp_clause: state.annl_mtg_grp_clause
        ? state.annl_mtg_grp_clause
        : null,
      annl_mtg_grp_contract: state.annl_mtg_grp_contract
        ? state.annl_mtg_grp_contract
        : null,
      annl_mtg_gsa: state.annl_mtg_gsa ? state.annl_mtg_gsa : null,
      annl_mtg_leadtm: state.annl_mtg_leadtm ? state.annl_mtg_leadtm : null,
      annl_mtg_loc: state.annl_mtg_loc ? state.annl_mtg_loc : null,
      annl_mtg_next_open: state.annl_mtg_next_open
        ? state.annl_mtg_next_open
        : null,
      annl_mtg_pkrooms:
        state.annl_mtg_pkrooms !== null
          ? parseInt(state.annl_mtg_pkrooms)
          : null,
      annl_mtg_rmbudget:
        state.annl_mtg_rmbudget !== null
          ? parseInt(state.annl_mtg_rmbudget)
          : null,
      annl_mtg_slip: state.annl_mtg_slip ? state.annl_mtg_slip : null,
      annl_mtg_timeyear: state.annl_mtg_timeyear
        ? state.annl_mtg_timeyear
        : null,
      annl_mtg_use_inter: state.annl_mtg_use_inter
        ? state.annl_mtg_use_inter
        : null,
      annl_mtg_yrbk: state.annl_mtg_yrbk ? state.annl_mtg_yrbk : null,
      genCncssn: state.genCncssn !== null ? parseInt(state.genCncssn) : null,
      lgeMtgGrpClause:
        state.lgeMtgGrpClause !== null ? parseInt(state.lgeMtgGrpClause) : null,
      lgeMtgGrpContract:
        state.lgeMtgGrpContract !== null
          ? parseInt(state.lgeMtgGrpContract)
          : null,
      lgeMtgLeadTm:
        state.lgeMtgLeadTm !== null ? parseInt(state.lgeMtgLeadTm) : null,
      lgeMtgMarGsa:
        state.lgeMtgMarGsa !== null ? parseInt(state.lgeMtgMarGsa) : null,
      lgeMtgMarPct:
        state.lgeMtgMarPct !== null ? parseInt(state.lgeMtgMarPct) : null,
      lgeMtgNonAnnual:
        state.lgeMtgNonAnnual !== null ? parseInt(state.lgeMtgNonAnnual) : null,
      lgeMtgPkFour:
        state.lgeMtgPkFour !== null ? parseInt(state.lgeMtgPkFour) : null,
      lgeMtgPkOne:
        state.lgeMtgPkOne !== null ? parseInt(state.lgeMtgPkOne) : null,
      lgeMtgPkThree:
        state.lgeMtgPkThree !== null ? parseInt(state.lgeMtgPkThree) : null,
      lgeMtgPkTwo:
        state.lgeMtgPkTwo !== null ? parseInt(state.lgeMtgPkTwo) : null,
      lgeMtgProfile:
        state.lgeMtgProfile !== null ? parseInt(state.lgeMtgProfile) : null,
      lge_mtg_concssn: state.lge_mtg_concssn ? state.lge_mtg_concssn : null,
      lge_mtg_use_inter:
        state.lge_mtg_use_inter !== null
          ? parseInt(state.lge_mtg_use_inter)
          : null,
      pct_budget_av:
        state.pct_budget_av !== null ? parseInt(state.pct_budget_av) : null,
      pct_budget_other:
        state.pct_budget_other !== null
          ? parseInt(state.pct_budget_other)
          : null,
      pct_budgetaffl_fb:
        state.pct_budgetaffl_fb !== null
          ? parseInt(state.pct_budgetaffl_fb)
          : null,
      pct_mtg_plnrenroll:
        state.pct_mtg_plnrenroll !== null
          ? parseInt(state.pct_mtg_plnrenroll)
          : null,
      smlMtgLeadTm:
        state.smlMtgLeadTm !== null ? parseInt(state.smlMtgLeadTm) : null,
      sml_mar_gsa: state.sml_mar_gsa ? state.sml_mar_gsa : null,
      sml_mtg_cncssn: state.sml_mtg_cncssn ? state.sml_mtg_cncssn : null,
      sml_mtg_grp_clause:
        state.sml_mtg_grp_clause !== null
          ? parseInt(state.sml_mtg_grp_clause)
          : null,
      sml_mtg_grp_contract:
        state.sml_mtg_grp_contract !== null
          ? parseInt(state.sml_mtg_grp_contract)
          : null,
      sml_mtg_mar_pct:
        state.sml_mtg_mar_pct !== null ? parseInt(state.sml_mtg_mar_pct) : null,
      sml_mtg_pk_one:
        state.sml_mtg_pk_one !== null ? parseInt(state.sml_mtg_pk_one) : null,
      sml_mtg_pk_three:
        state.sml_mtg_pk_three !== null
          ? parseInt(state.sml_mtg_pk_three)
          : null,
      sml_mtg_pk_two:
        state.sml_mtg_pk_two !== null ? parseInt(state.sml_mtg_pk_two) : null,
      sml_mtg_use_inter:
        state.sml_mtg_use_inter !== null
          ? parseInt(state.sml_mtg_use_inter)
          : null,
      sml_mtg_use_inter_desc: state.sml_mtg_use_inter_desc
        ? state.sml_mtg_use_inter_desc
        : null,
      spend_budget:
        state.spend_budget !== null ? parseInt(state.spend_budget) : null,
      ttl_annual_mtg:
        state.ttl_annual_mtg !== null ? parseInt(state.ttl_annual_mtg) : null,
      pct_attr_contracts:
        state.profileshareUpdate.pct_attr_contracts !== null
          ? state.profileshareUpdate.pct_attr_contracts > 100
            ? parseInt(state.onLoadprofileshareUpdate.pct_attr_contracts)
            : parseInt(state.profileshareUpdate.pct_attr_contracts)
          : null,
      pct_budget_fb:
        state.profileshareUpdate.pct_budget_fb !== null
          ? state.profileshareUpdate.pct_budget_fb > 100
            ? parseInt(state.onLoadprofileshareUpdate.pct_budget_fb)
            : parseInt(state.profileshareUpdate.pct_budget_fb)
          : null,
      pct_budget_gstrm:
        state.profileshareUpdate.pct_budget_gstrm !== null
          ? state.profileshareUpdate.pct_budget_gstrm > 100
            ? parseInt(state.onLoadprofileshareUpdate.pct_budget_gstrm)
            : parseInt(state.profileshareUpdate.pct_budget_gstrm)
          : null,
      pct_mar_share:
        state.profileshareUpdate.pct_mar_share !== null
          ? state.profileshareUpdate.pct_mar_share > 100
            ? parseInt(state.onLoadprofileshareUpdate.pct_mar_share)
            : parseInt(state.profileshareUpdate.pct_mar_share)
          : null,
    };

    const params = {
      strAcctOverviewGrp: JSON.stringify(selectedDatavalue),
      formChg: "Y",
      period: year,
      accountrecid: id,
      accountname: accname,
    };
    const postData = Utils.createPostData(params);
    setLoader(true);
    GroupProfileApi.submitGroupProfileData(postData).then((data) => {
      setLoader(false);
      if (data === "success") {
        return true;
      }
    });
  };

  const mandatoryCheck = () => {
    mandatoryTextFieldInputCheck();
  };

  const groupProfileList = {
    state,
    setValidationFunc,
    ShowValidateModel,
    setData,
    setLoadingProfileData,
    updateValue,
    setInitialUserData,
    checkUserValidation,
    mandatoryTextFieldInputCheck,
    mandatoryCheck,
    setLoader,
  };

  return (
    <GroupProfileContext.Provider value={groupProfileList}>
      {props.children}
    </GroupProfileContext.Provider>
  );
};
export const accBTProfileListContextConsumer = GroupProfileContext.Consumer;
export default GroupProfileContext;
