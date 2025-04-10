import React, { useState, useContext } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";
import AccBTProfileListApi from "../service/AccBtProfileListApi";
import SalesAdministartionContext from "../../../context/salesAdministartionContextProvider";
// Set state variables and function
const AccBTProfileListContext = React.createContext({});

export const AccBTProfileListContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const salescontext = useContext(SalesAdministartionContext);
  const [state, setState] = useState({
    Nextpath: Settings.route.NextPage,
    showScreenLoader: false,
    validateModal: false,
    message: "",
    GPPAccount: "",
    defaultPercent: "",
    RequireComissable: null, //requirecomm
    RequireLRA: null, //requirelra
    MktPotentialRev: null, //formattedEstTtlSpend
    MktPotentialRmNts: null, //formattedEstTtlRmNextyr
    MarriottBTRev: null, //formattedRev
    MarriottBTRmNts: null, //formattedMarTtlRoomNts
    EstimatedMIShare: null, //formattedPctTtlrmntsMar
    ActDirectoryList: null, //listrate
    AcrDirectoryExtended: null, //sep_stay
    HotelPreferredPrgm: null, //formattedNumHotelbid
    MarriottPreferredPrgm: null, //formattedNumAccptdhotels
    PreferredPrgmShare: null, //formattedDirectorysharePct
    MarriottMembers: "", //formattedMarRewardsMmbrs
    ClusterCode: "", //company_internal_code
    DiscountFixedCorprateRate: "", //formattedMaxDiscOffFixed
    BlackoutDaysAllowed: null, //formattedMaxBlackout
    BlackoutPeriodAllowed: null, //max_blackout_period
    CompaniesRFP: "", //co_includedrfp
    PricingMethods: "", //pricingvehicle
    brandSegList: [],
    agenciesMapList: [],
    agenciesMapListOnload: null,
    agenciesMapListOnloadtwo: null,
    agenciesMapListOnloadthree: null,
    agenciesMapListOnloadfour: null,
    selectedSegList: [],
    userRole: "",
    maxblackoutperiodslimit: null,
    alertMessageCheck: false,
    lastupdateDate: "",
    segmentlist: [],
    onloadPreferredPrgmShare: null,
    onloadMarriottMembers: null,
    onloadDiscountFixedCorprateRate: null,
    onloadEstimatedMIShare: null,
    checkBoxLength: false,
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
    const emptySelection = [];

    setState({
      ...state,
      segmentlist: emptySelection,
    });

    const result = dataval.brandsList.filter(
      (o1) =>
        !dataval.selbrands.some((o2) => o1.affiliationid === o2.affiliationid)
    );
    const selectedBrandList = dataval.brandsList.map((obj) => {
      dataval.selbrands.map((obj1) => {
        if (obj1.affiliationid === obj.affiliationid) {
          return {
            ...obj,
            affiliationname: obj.affiliationname,
            affiliationstatus: "Y",
          };
        }
      });
      return obj;
    });
    const arr3 = [...selectedBrandList, ...result];
    const checkdupArr = arr3.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });

    if (
      appContext.user.role == "MFPSALES" ||
      appContext.user.role == "MFPFSALE"
    ) {
      if (dataval.selbrands.length === 0) {
        appContext.accountProfileCheckbox = true;
      } else {
        appContext.accountProfileCheckbox = false;
      }
    }
    setState({
      ...state,
      GPPAccount: dataval.btProfile.aer_account,
      defaultPercent: dataval.btProfile.default_percent,
      RequireComissable: dataval.btProfile.requirecomm,
      RequireLRA: dataval.btProfile.requirelra,
      MktPotentialRev: dataval.btProfile.formattedEstTtlSpend,
      MktPotentialRmNts: dataval.btProfile.formattedEstTtlRmNextyr,
      MarriottBTRev: dataval.btProfile.formattedRev,
      MarriottBTRmNts: dataval.btProfile.formattedMarTtlRoomNts,
      EstimatedMIShare: dataval.btProfile.formattedPctTtlrmntsMar,
      ActDirectoryList: dataval.btProfile.listrate,
      AcrDirectoryExtended: dataval.btProfile.sep_stay,
      HotelPreferredPrgm: dataval.btProfile.formattedNumHotelbid,
      MarriottPreferredPrgm: dataval.btProfile.formattedNumAccptdhotels,
      PreferredPrgmShare: dataval.btProfile.formattedDirectorysharePct,
      MarriottMembers: dataval.btProfile.formattedMarRewardsMmbrs,
      ClusterCode: dataval.btProfile.company_internal_code,
      DiscountFixedCorprateRate: dataval.btProfile.formattedMaxDiscOffFixed,
      BlackoutDaysAllowed: dataval?.btProfile?.formattedMaxBlackout,
      BlackoutPeriodAllowed: dataval?.btProfile?.max_blackout_period,
      CompaniesRFP: dataval.btProfile.co_includedrfp,
      PricingMethods: dataval.btProfile.pricingvehicle,
      brandSegList: checkdupArr,
      agenciesMapList: dataval.agenciesMap,
      maxblackoutperiodslimit: dataval.maxblackoutperiods_limit,
      onloadPreferredPrgmShare: dataval.btProfile.formattedDirectorysharePct,
      onloadMarriottMembers: dataval.btProfile.formattedMarRewardsMmbrs,
      onloadDiscountFixedCorprateRate:
        dataval.btProfile.formattedMaxDiscOffFixed,
      onloadEstimatedMIShare: dataval.btProfile.formattedPctTtlrmntsMar,
      agenciesMapListOnload: dataval.agenciesMap[1].agencybooking,
      agenciesMapListOnloadtwo: dataval.agenciesMap[2].agencybooking,
      agenciesMapListOnloadthree: dataval.agenciesMap[3].agencybooking,
      agenciesMapListOnloadfour: dataval.agenciesMap[4].agencybooking,
    });
  };

  const setInitialUserData = () => {
    setState({
      ...state,
      userRole: appContext.user.role,
    });
  };
  const handleCheckBoxes = (checked, id, name) => {
    const checkedval = checked === true ? "Y" : null;
    let newArr = [];
    newArr = state.brandSegList.map((obj) => {
      if (obj.affiliationid === id) {
        return { ...obj, affiliationstatus: checkedval };
      }

      return obj;
    });
    const validateSelectionList = [];
    const selectedBrand = newArr.map((obj) => {
      if (obj.affiliationstatus === "Y") {
        validateSelectionList.push(obj.affiliationid);
      }
    });
    setState({
      ...state,
      brandSegList: newArr,
      segmentlist: newArr,
      selectedSegList: validateSelectionList,
    });

    const arr = validateSelectionList.filter(function (
      item,
      index,
      inputArray
    ) {
      return inputArray.indexOf(item) == index;
    });

    if (state.userRole == "MFPSALES" || state.userRole == "MFPFSALE") {
      if (arr.length === 0) {
        appContext.accountProfileCheckbox = true;
        salescontext.setAlertMsgfunc(
          true,
          Settings.accountBTProfileDetails.BrandSegRequired
        );
      } else {
        appContext.accountProfileCheckbox = false;
        salescontext.setAlertMsgfunc(false, "");
      }
      mandatoryCheck(newArr);
    }
  };

  const ShowValidateModel = () => {
    setState({
      ...state,
      validateModal: !state.validateModal,
    });
  };
  const setData = (list) => {
    setState({
      ...state,
    });
  };
  const mandatoryCheck = (brandSegL) => {
    const maxperiodLImit = state.maxblackoutperiodslimit;
    if (state.RequireComissable === null) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.RequirecomReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.RequirecomReq,
        type: "custom",
      });
      return false;
    } else if (state.RequireLRA === null) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.RequireLrareq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.RequireLrareq,
        type: "custom",
      });
      return false;
    } else if (state.MktPotentialRev === null || state.MktPotentialRev === "") {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.MrktPtnReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.MrktPtnReq,
        type: "custom",
      });
      return false;
    } else if (
      state.MktPotentialRmNts === null ||
      state.MktPotentialRmNts === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.MrktPtnRmNtsReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.MrktPtnRmNtsReq,
        type: "custom",
      });
      return false;
    } else if (
      state.HotelPreferredPrgm === null ||
      state.HotelPreferredPrgm === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.PrefPrgm
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.PrefPrgm,
        type: "custom",
      });
      return false;
    } else if (
      state.DiscountFixedCorprateRate === null ||
      state.DiscountFixedCorprateRate === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.CorpDiscountReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.CorpDiscountReq,
        type: "custom",
      });
      return false;
    } else if (
      state.BlackoutDaysAllowed === null ||
      state.BlackoutDaysAllowed === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.blackOutdaysReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.blackOutdaysReq,
        type: "custom",
      });
      return false;
    } else if (state.BlackoutDaysAllowed === "0") {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.blackoutDaysRangeMessage
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.blackoutDaysRangeMessage,
        type: "custom",
      });
      return false;
    } else if (state.BlackoutPeriodAllowed > state.maxblackoutperiodslimit) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.daysAllowed + maxperiodLImit
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.daysAllowed + maxperiodLImit,
        type: "custom",
      });
      return false;
    } else if (
      state.agenciesMapList[1].agencyname === null ||
      state.agenciesMapList[1].agencyname === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.TravelAgency1req
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.TravelAgency1req,
        type: "custom",
      });
      return false;
    } else if (
      state.agenciesMapList[1].agencybooking === null ||
      state.agenciesMapList[1].agencybooking === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.perBookingReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.perBookingReq,
        type: "custom",
      });
      return false;
    } else if (
      state.agenciesMapList[1].agencygds === null ||
      state.agenciesMapList[1].agencygds === ""
    ) {
      salescontext.setAlertMsgfunc(
        true,
        Settings.accountBTProfileDetails.GDSReq
      );
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.accountBTProfileDetails.GDSReq,
        type: "custom",
      });
      return false;
    } else if (
      state.brandSegList.filter((item) => item.affiliationstatus == "Y")
        .length === 0 ||
      (brandSegL &&
        brandSegL.filter((item) => item.affiliationstatus == "Y").length === 0)
    ) {
      const showAlert =
        brandSegL &&
        brandSegL.filter((item) => item.affiliationstatus == "Y").length > 0
          ? false
          : true;
      if (showAlert) {
        salescontext.setAlertMsgfunc(
          true,
          Settings.accountBTProfileDetails.BrandSegRequired
        );
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.accountBTProfileDetails.BrandSegRequired,
          type: "custom",
        });
        return false;
      }
    }
    salescontext.setAlertMsgfunc(false, "");
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "custom",
    });
    return true;
  };
  const checkUserValidation = () => {
    const validateSelectionList = [];
    const selectedBrand = state.brandSegList.map((obj) => {
      if (obj.affiliationstatus === "Y") {
        validateSelectionList.push(obj.affiliationid);
      }
      return obj;
    });
    setState({
      ...state,
      selectedSegList: validateSelectionList,
    });
    const arr = validateSelectionList.filter(function (
      item,
      index,
      inputArray
    ) {
      return inputArray.indexOf(item) == index;
    });
    const maxperiodLImit = state.maxblackoutperiodslimit;
    if (state.RequireComissable === null) {
      setValidationFunc(Settings.accountBTProfileDetails.RequirecomReq);

      return false;
    } else if (state.RequireLRA === null) {
      setValidationFunc(Settings.accountBTProfileDetails.RequireLrareq);

      return false;
    } else if (state.MktPotentialRev === null || state.MktPotentialRev === "") {
      setValidationFunc(Settings.accountBTProfileDetails.MrktPtnReq);

      return false;
    } else if (
      state.MktPotentialRmNts === null ||
      state.MktPotentialRmNts === ""
    ) {
      setValidationFunc(Settings.accountBTProfileDetails.MrktPtnRmNtsReq);

      return false;
    } else if (
      state.HotelPreferredPrgm === null ||
      state.HotelPreferredPrgm === ""
    ) {
      setValidationFunc(Settings.accountBTProfileDetails.PrefPrgm);

      return false;
    } else if (
      state.DiscountFixedCorprateRate === null ||
      state.DiscountFixedCorprateRate === ""
    ) {
      setValidationFunc(Settings.accountBTProfileDetails.CorpDiscountReq);

      return false;
    } else if (
      state.BlackoutDaysAllowed === null ||
      state.BlackoutDaysAllowed === ""
    ) {
      setValidationFunc(Settings.accountBTProfileDetails.blackOutdaysReq);

      return false;
    } else if (state.BlackoutDaysAllowed === "0") {
      setValidationFunc(
        Settings.accountBTProfileDetails.blackoutDaysRangeMessage
      );

      return false;
    } else if (state.BlackoutPeriodAllowed > state.maxblackoutperiodslimit) {
      setValidationFunc(
        Settings.accountBTProfileDetails.daysAllowed + maxperiodLImit
      );

      return false;
    } else if (arr.length === 0) {
      setValidationFunc(Settings.accountBTProfileDetails.BrandSegRequired);

      return false;
    } else if (
      state.agenciesMapList[1].agencyname === null ||
      state.agenciesMapList[1].agencyname === ""
    ) {
      setValidationFunc(Settings.accountBTProfileDetails.TravelAgency1req);

      return false;
    } else if (
      state.agenciesMapList[1].agencybooking === null ||
      state.agenciesMapList[1].agencybooking === ""
    ) {
      setValidationFunc(Settings.accountBTProfileDetails.perBookingReq);

      return false;
    } else if (
      state.agenciesMapList[1].agencygds === null ||
      state.agenciesMapList[1].agencygds === ""
    ) {
      setValidationFunc(Settings.accountBTProfileDetails.GDSReq);

      return false;
    }
    return true;
  };
  const updateValue = (id, year, accname) => {
    const updateSelectionList = [];
    let arr = [];
    const selectedBrand = state.brandSegList.map((obj) => {
      if (obj.affiliationstatus === "Y") {
        updateSelectionList.push(obj.affiliationid);
      }
      return obj;
    });
    setState({
      ...state,
      selectedSegList: updateSelectionList,
    });
    arr = updateSelectionList.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });

    if (state.agenciesMapList[1].agencybooking !== null) {
      if (state.agenciesMapList[1].agencybooking > 100) {
        state.agenciesMapList[1].agencybooking = state.agenciesMapListOnload;
      }
    }
    if (state.agenciesMapList[2].agencybooking !== null) {
      if (state.agenciesMapList[2].agencybooking > 100) {
        state.agenciesMapList[2].agencybooking = state.agenciesMapListOnloadtwo;
      }
    }
    if (state.agenciesMapList[3].agencybooking !== null) {
      if (state.agenciesMapList[3].agencybooking > 100) {
        state.agenciesMapList[3].agencybooking =
          state.agenciesMapListOnloadthree;
      }
    }
    if (state.agenciesMapList[4].agencybooking !== null) {
      if (state.agenciesMapList[4].agencybooking > 100) {
        state.agenciesMapList[4].agencybooking =
          state.agenciesMapListOnloadfour;
      }
    }
    setState({
      ...state,
      agenciesMapList: state.agenciesMapList,
    });
    const selectedDatavalue = {
      requirecomm: state.RequireComissable ? state.RequireComissable : null,
      requirelra: state.RequireLRA ? state.RequireLRA : null,
      est_ttl_spend: state.MktPotentialRev
        ? parseInt(state.MktPotentialRev)
        : null,
      est_ttl_rm_nextyr: state.MktPotentialRmNts
        ? parseInt(state.MktPotentialRmNts)
        : null,
      rev: state.MarriottBTRev ? parseInt(state.MarriottBTRev) : null,
      mar_ttl_room_nts: state.MarriottBTRmNts
        ? parseInt(state.MarriottBTRmNts)
        : null,
      pct_ttlrmnts_mar:
        state.EstimatedMIShare !== null
          ? parseInt(state.EstimatedMIShare) > 100
            ? parseInt(state.onloadEstimatedMIShare)
            : parseInt(state.EstimatedMIShare)
          : null,
      listrate: state.ActDirectoryList ? state.ActDirectoryList : null,
      sep_stay: state.AcrDirectoryExtended ? state.AcrDirectoryExtended : null,
      num_hotelbid: state.HotelPreferredPrgm
        ? parseInt(state.HotelPreferredPrgm)
        : null,
      num_accptdhotels: state.MarriottPreferredPrgm
        ? parseInt(state.MarriottPreferredPrgm)
        : null,
      directoryshare_pct:
        state.PreferredPrgmShare !== null
          ? state.PreferredPrgmShare > 100
            ? parseInt(state.onloadPreferredPrgmShare)
            : parseInt(state.PreferredPrgmShare)
          : null,

      mar_rewards_mmbrs:
        state.MarriottMembers !== null
          ? parseInt(state.MarriottMembers) > 100
            ? parseInt(state.onloadMarriottMembers)
            : parseInt(state.MarriottMembers)
          : null,
      max_disc_off_fixed:
        state.DiscountFixedCorprateRate !== null
          ? parseInt(state.DiscountFixedCorprateRate) > 100
            ? parseInt(state.onloadDiscountFixedCorprateRate)
            : parseInt(state.DiscountFixedCorprateRate)
          : null,
      max_blackout:
        state.BlackoutDaysAllowed && state.BlackoutDaysAllowed != 0
          ? parseInt(state.BlackoutDaysAllowed)
          : null,
      max_blackout_period:
        state.BlackoutPeriodAllowed && state.BlackoutPeriodAllowed != 0
          ? parseInt(state.BlackoutPeriodAllowed)
          : null,
      co_includedrfp: state.CompaniesRFP ? state.CompaniesRFP : null,
      pricingvehicle: state.PricingMethods ? state.PricingMethods : null,
    };

    const params = {
      strBtProfile: JSON.stringify(selectedDatavalue),
      strSelectedAffiliationList: arr.length !== 0 ? JSON.stringify(arr) : null, //["792", "797", "791", "37", "796", "799", "62", "803", "794", "147", "136", "795", "182", "183", "802", "304", "184", "227"]
      strAgenciesMap: JSON.stringify(state.agenciesMapList), //{"1":{"agencyname":"American+Express+","agencybooking":70,"agencygds":"Sabre+and+Apollo","agencytypeid":1,"accountinfo_agencyid":298895,"sequence":1},"2":{"agencyname":"CWT","agencybooking":10,"agencygds":"Sabre+and+Apollo","agencytypeid":2,"accountinfo_agencyid":298896,"sequence":2},"3":{"agencyname":"HRS","agencybooking":20,"agencygds":"Sabre+and+Apollo","agencytypeid":3,"accountinfo_agencyid":298897,"sequence":3}}
      formChg: "Y",
      period: year,
      accountrecid: id,
      accountname: accname,
      maxblackoutperiods_limit: state.maxblackoutperiodslimit,
    };
    const postData = Utils.createPostData(params);

    AccBTProfileListApi.submitData(postData).then((data) => {
      setLoader(true);

      // window.location.reload();
      if (data === "success") {
        return true;
      }
    });
  };
  const accBTProfileList = {
    state,
    setState,
    setValidationFunc,
    ShowValidateModel,
    setData,
    setLoadingProfileData,
    handleCheckBoxes,
    updateValue,
    setInitialUserData,
    checkUserValidation,
    mandatoryCheck,
    setLoader,
  };

  return (
    <AccBTProfileListContext.Provider value={accBTProfileList}>
      {props.children}
    </AccBTProfileListContext.Provider>
  );
};
export const accBTProfileListContextConsumer = AccBTProfileListContext.Consumer;
export default AccBTProfileListContext;
