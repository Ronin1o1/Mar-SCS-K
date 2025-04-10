import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Settings from "../static/Settings";
import UserAPI, { IUser } from "../services/GetUser";
import Utils from "../utils/Utils";
import CPACAPI from "../../pricing/hotelPricing/content/centerallyPricedAccount/service/API";
import API from "../../homepage/home/service/API";
const ApplicationContext = React.createContext({});

interface IApplicationContextProviderProps {
  children;
}

export interface ErrorMessageAlert {
  show: boolean;
  message: string;
  type: "custom" | "browserAlert" | "confirmAlert";
  isMultipleAlert?: boolean;
  multipleAlertList?: Array<string>;
}

export interface OneTimeNavigationAlert {
  show: boolean;
  message: string;
  navigate: boolean;
}

export interface SalesUserSearchCriteria {
  userSearchCriteria: {
    searchBy: string;
    filterString: string;
    userRole: string;
    orderby: number;
    strPage: {
      page: number;
      maxpagelen: number;
    };
    r_1: string;
  };
}

export const ApplicationContextProvider = (
  props: IApplicationContextProviderProps
): JSX.Element => {
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [renewModalOpen, setRenewModalOpen] = useState(false);
  const [alertMessageConfirmationClick, setAlertMessageConfirmationClick] =
    useState(false);
  const [confirmURL, setConfirmURL] = useState(null);
  const [fromSave, setFromSave] = useState(false);
  const [user, setUser] = useState(undefined);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isNoBidAlert, setNoBidAlert] = useState(false);
  const [isUpdateAdminAlert, setIsUpdateAdminAlert] = useState(false);
  const [isUpdateAccountAlert, setIsUpdateAccountAlert] = useState(false);
  const [duplicateAccountErrorMessages, setDuplicateAccountErrorMessages] =
    useState([]);
  const [isUpdateAdminEmailAlert, setIsUpdateAdminEmailAlert] = useState(false);
  const [isUpdateSales, setUpdateSalesAlert] = useState(false);
  const [isUpdateLimitedSales, setUpdateLSAlert] = useState(false);
  const [isUpdateEmailSales, setUpdateEmailSalesAlert] = useState(false);
  const [isUpdateHotelUser, setUpdateHUAlert] = useState(false);
  const [isUpdateHotelEmailUser, setUpdateHEAlert] = useState(false);

  const [isCommonValidAlert, setCommonValidAlert] = useState(false);
  const [isPricingEmailValidAlert, setPricingEmailValidAlert] = useState(false);
  const [isStartDateAlert, setStartDateAlert] = useState(false);
  const [isEndDateAlert, setEndDateAlert] = useState(false);
  const [isDOSAlert, setDOSAlert] = useState(false);
  const [isPASSelected, setPASSelected] = useState(false);
  const [isGPPSelected, setGPPSelected] = useState(false);
  const [isStandardAlert, setStandardAlert] = useState(false);
  const [isStandardAlertMsg, setStandardAlertMsg] = useState("");
  const [isSamePoolSelected, setSamePoolSelected] = useState(false);
  const [saveBTGClicked, setSaveBTGClicked] = useState(false);
  const [noRedirect, setNoRedirect] = useState(false);
  const [isPricingContactIndex, setPricingContactIndex] = useState();
  const [homePageAccSelectHotel, setHomePageAccSelectHotel] = useState({
    name: "",
    marshacode: "",
    startIndex: 0,
  });
  const [retainActiveTab, setRetainActiveTab] = useState(false);
  const [isFinishAndSaveEnabled, setFinishAndSaveEnabled] = useState(false);
  const [isProductValidated, setProductValidated] = useState(false);
  const [isSecondayEmailValid, setSecondayEmailValid] = useState(false);
  const [ratesRulesStatus, setRatesRulesStatus] = useState("");
  const [ratesRulesAndEligibilityTick, setRatesRulesAndEligibilityTick] =
    useState("");
  const [isAllFieldValue, setAllFieldValue] = useState("");
  const [pricingContactFixed, setPricingContactFixed] = useState(false);
  const [isActiveTab, setActiveTab] = useState("");
  const [, setCookies] = useCookies(["MARFPAUTH", "CODE", "LOGGEDINUSER"]);
  const [blackoutTick, setBlackoutTick] = useState("");
  const [eligibilitiesTick, setEligibilitiesTick] = useState("");
  const [btgTick, setBtgTick] = useState("");
  const [pricingTick, setPricingTick] = useState("");
  const [accSpecificTick, setAccSpecificTick] = useState("");
  const [compelBisTick, setCompelBisTick] = useState("");
  const [rateRulesTick, setRateRulesTick] = useState("");
  const [facilityTick, setFacilityTick] = useState("");
  const [rebidTick, setRebidTick] = useState("");
  const [genGroupMeetingsTick, setGenGroupMeetingsTick] = useState("");
  const [dateValidationMsg, setDateValidationMsg] = useState("");
  const [updateMultipleHotelRequest, setStoreRequestPayload] = useState("");
  const [saveStatusAccountClicked, setSaveStatusAccountClicked] =
    useState(false);

  const [saveGroupMeetingClicked, setSaveGroupMeetingClicked] = useState(false);
  const [saveRebidRequestsClicked, setSaveRebidRequestsClicked] =
    useState(false);
  const [saveRateNotesClicked, setRateNotesClicked] = useState(false);
  const [updateAPIcallSuccess, setupdateAPIcallSuccess] = useState(false);
  const [rateRulesValidationErr, setRateRulesValidationErr] = useState(false);
  const [rateRulesValidationMsg, setRateRulesValidationMsg] = useState("");
  const [isStartDateEmpty, setStartDateEmpty] = useState(false);
  const [isEndDateEmpty, setEndDateEmpty] = useState(false);
  const [rateRulesValidationdateMsg, setRateRulesValidationdateMsg] =
    useState("");
  const [rateRulesValidationAccLockedMsg, setRateRulesValidationAccLockedMsg] =
    useState("");
  const [rateRulesValidationPercentMsg, setRateRulesValidationPercentMsg] =
    useState("");
  const [rateRulesValidAccDeleteMsg, setRateRulesValidAccDeleteMsg] =
    useState("");
  const [rateRulesanswerCancellation, setRateRulesanswerCancellation] =
    useState("");
  const [rateRulesAccRejectionMsg, setRateRulesAccRejectionMsg] = useState("");
  const [rateRulesLOSMsg, setRateRulesLOSMsg] = useState("");
  const [rateRulesStayTierMsg, setRateRulesStayTierMsg] = useState("");
  const [showSubnavbarMenus, SetShowSubnavbarMenus] = useState(true);
  const [pgoosGridRowHighlight, setpgoosGridRowHighlight] = useState(true);
  const [pgoosFilterRowHighlight, setpgoosFilterRowHighlight] = useState(true);
  const [activeGridRowIndexTableOne, setActiveGridRowIndexTableOne] =
    useState(null);
  const [activeGridRowIndexTableTwo, setActiveGridRowIndexTableTwo] =
    useState(null);
  const [isRpgonerponeSelected, setRpgonerponeSelected] = useState(false);
  const [isRpgonerptwoSelected, setRpgonerptwoSelected] = useState(false);
  const [isRpgtworponeSelected, setRpgtworponeSelected] = useState(false);
  const [isRpgtworptwoSelected, setRpgtworptwoSelected] = useState(false);
  const [isRpgthreerponeSelected, setRpgthreerponeSelected] = useState(false);
  const [isRpgthreerptwoSelected, setRpgthreerptwoSelected] = useState(false);
  const [isRtrpgonerponeSelected, setRtrpgonerponeSelected] = useState(false);
  const [isRtrpgonerptwoSelected, setRtrpgonerptwoSelected] = useState(false);
  const [isRtrpgtworponeSelected, setRtrpgtworponeSelected] = useState(false);
  const [isRtrpgtworptwoSelected, setRtrpgtworptwoSelected] = useState(false);
  const [isRtrpgthreerponeSelected, setRtrpgthreerponeSelected] =
    useState(false);
  const [isRtrpgthreerptwoSelected, setRtrpgthreerptwoSelected] =
    useState(false);
  const [isRponerpgoneMustAlsoSelected, setRponerpgoneMustAlsoSelected] =
    useState(false);
  const [isRponerpgtwoMustAlsoSelected, setRponerpgtwoMustAlsoSelected] =
    useState(false);
  const [isRponerpgoneMustSelected, setRponerpgoneMustSelected] =
    useState(false);
  const [isRponerpgthreeMustAlsoSelected, setRponerpgthreeMustAlsoSelected] =
    useState(false);
  const [accStatus, setAccStatus] = useState(null);
  const [cognosURL, setCognosURL] = useState(null);
  const [validEmail, setValidEmail] = useState(false);
  const [accountProfileCheckbox, setAccountProfileCheckbox] = useState(false);
  const [rateRulesAllValidationMsg, setRateRulesAllValidationMsg] =
    useState("");
  const [accountLockedLowHighMsg, setAccountLockedLowHighMsg] = useState("");
  const [rateRulesRejectionReasonMsg, setRulesRejectionReasonMsg] =
    useState("");
  const defaultErrorAlert: ErrorMessageAlert = {
    show: false,
    message: "",
    type: "browserAlert",
    isMultipleAlert: false,
    multipleAlertList: [],
  };
  const defaultOneTimeNavigationAlert: OneTimeNavigationAlert = {
    show: false,
    message: "",
    navigate: false,
  };
  const [errorMessageAlert, setErrorMessageAlert] = useState(defaultErrorAlert);
  const [displayNavigationAlert, setDisplayNavigationAlert] = useState(false);
  const [navbarClicked, setNavbarClicked] = useState(false);
  const [preventNavigationOnce, setPreventNavigationOnce] = useState(false);
  const [alreadyAssigned, setAlreadyAssigned] = useState(false);
  const [onetimeAlert, setOnetimeAlert] = useState(defaultErrorAlert);
  const [isMbeMandatoryFields, setIsMbeMandatoryFields] = useState(false);
  const [mbeMandatoryAlert, setMbeMandatoryAlert] = useState("");
  const [navigateWithAlert, setNavigateWithAlert] = useState("");
  const [navigateWithAlertFlag, setNavigateWithAlertFlag] = useState(false);
  const [oneTimeNavigationAlert, setOneTimeNavigationAlert] = useState(
    defaultOneTimeNavigationAlert
  );
  const [saveCompelStatusClicked, setSaveCompelStatusClicked] = useState(false);
  const [saveBlackoutStatusClicked, setSaveBlackoutStatusClicked] =
    useState(false);
  const [saveEligibilityStatusClicked, setSaveEligibilityStatusClicked] =
    useState(false);
  const [umMountCPAC, setumMountCPAC] = useState(false);
  const [isUpdateHotelMandatoryFields, setIsUpdateHotelMandatoryFields] =
    useState(false);
  const [updateHotelMandatoryAlert, setUpdateHotelMandatoryAlert] =
    useState("");
  const [tabNameGrpMeet, setTabNameGrpMeet] = useState("");
  const [savePricingStatusClicked, setSavePricingStatusClicked] =
    useState(false);
  const [saveMeetingStatusClicked, setSaveMeetingStatusClicked] =
    useState(false);
  const [savePaymentStatusClicked, setSavePaymentStatusClicked] =
    useState(false);

  const [rebidStatus, setRebidStatus] = useState("");
  const [rateRulesLoader, setRateRulesLoader] = useState(false);
  const [cpacLoader, setCpacLoader] = useState(false);
  const [raterulesSaveClicked, setRateRulesSaveClicked] = useState(false);
  const [rateruleData, setRateRulesData] = useState("");
  const [isMarkAsCompleteChecked, setIsMarkAsCompleteChecked] = useState(false);
  const [activeRowPortfolio, setactiveRowPortfolio] = useState(null);
  const [switchTabFlag, setSwitchTabFlag] = useState(false);
  const [prevRowPortfolio, setPrevRowPortfolio] = useState(-1);
  const [prevGridRowIndexTableOne, setPrevGridRowIndexTableOne] = useState(-1);
  const [prevGridRowIndexTableTwo, setPrevGridRowIndexTableTwo] = useState(-1);
  const [markAsCompleteErrorAlert, setMarkAsCompleteErrorAlert] =
    useState(defaultErrorAlert);
  const [tableRefresh, setTableRefersh] = useState(false);
  const [grpMeetingsPrevSelect, setGrpMeetingsPrevSelect] = useState("");

  const [blackoutAlertMsgFlag, setBlackoutAlertMsgFlag] = useState(false);
  const [blackoutAlertMsg, setBlackoutAlertMsg] = useState(null);
  const [pgoosPropRefresh, setPgoosPropRefresh] = useState(false);
  const [groupMeetingUpdation, setGroupMeetingUpdation] = useState(false);
  const [updatedPricingData, setUpdatedPricingData] = useState(false);
  const [isPrintAccountContainerPage, setIsPrintAccountContainerPage] =
    useState(false);
  const [isPrintAccountContainerAlert, setIsPrintAccountContainerAlert] =
    useState(false);
  const [printAccountContainerAlert, setPrintAccountContainerAlert] =
    useState("");
  const [hotelPricingBlackoutmsg, setHotelPricingBlackoutmsg] = useState("");
  const [maxBlackoutmsg, setMaxBlackoutMsg] = useState("");
  const [maxBlackoutFlag, setMaxBlackoutFlag] = useState(false);
  const [totalmaxBlackouts, setTotalMaxBlackouts] = useState(false);
  const [groupsAndMeetingError, setGroupsAndMeetingError] = useState({
    show: false,
    msg: "",
  });
  const [hotelPricingUrlDetails, setHotelPricingUrlDetails] = useState({});
  const [priceRebidScreenFlags, setPriceRebidScreenFlags] = useState({
    rebidTab: "",
    eligAmenityTab: "",
    ratesRulesTab: "",
    BtQuestionTab: "",
  });
  const [btAccGrpTick, setBtAccGrpTick] = useState("");
  const [isDataUpdated, setIsDataUpdated] = useState(0);
  const [haveCode, setHaveCode] = useState(false);
  const [isUpdatingRules, setIsUpdatingRules] = useState(false);
  const [isPercentDiscountSaved, setIsPercentDiscountSaved] = useState(false);
  const [rulesPageIsSaving, setRulesPageIsSaving] = useState(false);
  const [appSessionTimedOut, setAppSessionTimedOut] = useState(false);
  const [maxBlackoutPeriodAlert, setMaxBlackoutPeriodAlert] = useState("");
  const [portfolioAcceptanceQuickSelect, setportfolioAcceptanceQuickSelect] =
    useState(false);
  const [switchBlackoutTabFlag, setSwitchBlackoutTabFlag] = useState(false);
  const [prevClickedTime, setPrevClickedTime] = useState(new Date());
  const [currentClickedTime, setCurrentClickedTime] = useState(new Date());
  const [accSpecScreenAccountStatus, setAccSpecScreenAccountStatus] =
    useState(null);
  const [switchEligTabFlag, setSwitchEligTabFlag] = useState(false);
  const [rebidTabSwitchFlag, setRebidTabSwitchFlag] = useState(false);
  const [btAccSpecAllDataFilled, setBtAccSpecAllDataFilled] = useState(false);
  const [btAccGrpMeetAllDataFilled, setBtAccGrpMeetAllDataFilled] =
    useState(false);
  const [homePageDragNoSelectStyle, setHomePageDragNoSelectStyle] =
    useState(false);

  const url = window.location.href;
  const isLocal = url
    .split("/")
    .filter((word) => word.indexOf("localhost") > -1);

  const changeHaveCode = useCallback(
    (value) => {
      setHaveCode(value);
    },
    [haveCode]
  );

  const checkForParameter = (paramName) => {
    const url = window.location.search;

    if (url.indexOf(paramName) > -1) {
      return true;
    } else {
      return false;
    }
  };
  const navigatetoURL = (url) => {
    window.location.replace(
      window.location.href.replace("/accountmaintenance/accountEdit", url)
    );
  };

  // const paramsCode = checkForParameter("code");
  // const cookieCode = Utils.getCookie("CODE");
  // const campassport = Utils.getCookie("cam_passport");

  useEffect(() => {
    API.getCongnosUrl().then((data) => {
      setCognosURL(data);
    });

    if (!Utils.getCookie("LOGGEDINUSER")) {
      setCookies("LOGGEDINUSER", "true");
      localStorage.removeItem("REQUEST_PAYLOAD");
    }
  }, []);

  //const redirect_url = "";
  /// for reports
  const redirectToReportsLogin = async () => {
    const data = await API.getMessageList();
    window.location.replace(data.cam_passport_url);
  };

  const getParamValue = (paramName) => {
    const url = window.location.search.substring(1); //get rid of "?" in querystring

    const qArray = url.split("&"); //get key-value pairs
    for (let i = 0; i < qArray.length; i++) {
      const pArr = qArray[i].split("="); //split key and value
      if (pArr[0] == paramName) return pArr[1]; //return value
    }
  };

  // if (!isLocal.length) {
  //   if (paramsCode && !cookieCode) {
  //     setCookies("CODE", getParamValue("code"));
  //     changeHaveCode(true);
  //   } else if (!paramsCode && !cookieCode) {
  //     redirectToReportsLogin().then((url) => {
  //       window.location.replace(url);
  //     });
  //   }
  // }

  useEffect(() => {
    if (umMountCPAC) {
      updateAndPublish();
      if (!isUpdatingRules) {
        setumMountCPAC(false);
      }
    }
  }, [umMountCPAC, isUpdatingRules]);

  const updateAndPublish = () => {
    let ratesRulesFlag = rateRulesTick;
    let eligibilityFlag = eligibilitiesTick;
    if (ratesRulesAndEligibilityTick === "R") {
      ratesRulesFlag = "R";
      eligibilityFlag = "R";
      setRateRulesTick("");
    }
    const hotelspecificDataPublish = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );
    const bodyParams = {
      hotel_accountinfoid: hotelspecificDataPublish?.hotel_accountinfoid,

      strHassu: {
        hotelid: hotelspecificDataPublish?.hotelid,
        hotelrfpid: hotelspecificDataPublish?.hotelrfpid,
        hotel_accountinfoid: hotelspecificDataPublish?.hotel_accountinfoid,
        accountrecid: hotelspecificDataPublish?.accountrecid,
        tabstatus_status: pricingTick,
        tabelig_status: eligibilityFlag,
        tabcompel_status: compelBisTick,
        tabrebid_status: rebidTick,
        tabgroup_status: btAccGrpTick,
        tabblackout_status: blackoutTick,
        tabfacility_status: facilityTick,
        tabquest_status: accSpecificTick,
        tabgengroup_status: genGroupMeetingsTick,
        tabspecificquest_status: btgTick,
        tabrates_status: ratesRulesFlag,
      },
    };
    if (isMarkAsCompleteChecked) {
      bodyParams.strHassu.markComplete = "Y";
    }
    bodyParams.strHassu = JSON.stringify(bodyParams.strHassu);
    if (!isUpdatingRules) {
      CPACAPI.updatePublish(bodyParams)
        .then((data) => {})
        .catch((error) => {});
    }
  };

  const [maxLength1024ValidationAlert, setMaxLength1024ValidationAlert] =
    useState(false);
  const [extendedStayNeedsMaxLengthAlert, setExtendedStayNeedsMaxLengthAlert] =
    useState(false);
  const [orgStructureMaxLengthAlert, setOrgStructureMaxLengthAlert] =
    useState(false);
  const [
    extendedStaySolutionsMaxLengthAlert,
    setExtendedStaySolutionsMaxLengthAlert,
  ] = useState(false);
  const [accountPoliciesMaxLengthAlert, setAccountPoliciesMaxLengthAlert] =
    useState(false);
  const [
    prefrredMarriottBrandsMaxLengthAlert,
    setPrefrredMarriottBrandsMaxLengthAlert,
  ] = useState(false);
  const [topExtStayMaxLengthAlert, setTopExtStayMaxLengthAlert] =
    useState(false);
  const [totRevenueRangeAlert, setTotRevenueRangeAlert] = useState(false);
  const [totRmNtsAlert, setTotRmNtsAlert] = useState(false);
  const [totExtRmNtsAlert, setTotExtRmNtsAlert] = useState(false);
  const [adoptionRateAlert, setAdoptionRateAlert] = useState(false);
  const [
    grpIntermediariesFullServiceAlert,
    setGrpIntermediariesFullServiceAlert,
  ] = useState(false);
  const [
    grpIntermediariesContractingAlert,
    setGrpIntermediariesContractingAlert,
  ] = useState(false);
  const [
    grpIntermediariesSiteSelectionAlert,
    setGrpIntermediariesSiteSelectionAlert,
  ] = useState(false);
  const [grpIntermediariesHousingAlert, setGrpIntermediariesHousingAlert] =
    useState(false);
  const [grpIntermediariesOnsiteAlert, setGrpIntermediariesOnsiteAlert] =
    useState(false);
  const [grpIntermediariesResearchAlert, setGrpIntermediariesResearchAlert] =
    useState(false);
  const [grpIntermediariesOtherAlert, setGrpIntermediariesOtherAlert] =
    useState(false);
  const [acctPerspectiveOverViewAlert, setAcctPerspectiveOverViewAlert] =
    useState(false);
  const [
    acctPerspectiveOutlookPerspectiveAlert,
    setAcctPerspectiveOutlookPerspectiveAlert,
  ] = useState(false);
  const [acctPerspectiveDivisionsAlert, setAcctPerspectiveDivisionsAlert] =
    useState(false);
  const [acctPerspectiveStrategyAlert, setAcctPerspectiveStrategyAlert] =
    useState(false);
  const [
    acctPerspectiveVulnerabilitiesAlert,
    setAcctPerspectiveVulnerabilitiesAlert,
  ] = useState(false);
  const [btOverviewByBrandAlert, setBtOverviewByBrandAlert] = useState(false);
  const [
    btOverviewBuyingDecisionsLengthAlert,
    setBtOverviewBuyingDecisionsLengthAlert,
  ] = useState(false);
  const [isBtAndGroupAccountTabExist, setIsBtAndGroupAccountTabExist] =
    useState(false);
  const [isGroupsAndMeetingTabExist, setIsGroupsAndMeetingTabExist] =
    useState(false);
  const [isGroupsAndMeetingFlag, setIsGroupsAndMeetingFlag] = useState(false);
  useEffect(() => {
    if (Utils.getCookie("CODE") || isLocal.length) {
      
      UserAPI.getUser().then((response) => {
        setUser(response as IUser);
        sessionStorage.setItem("GETUSERDETAILS", JSON.stringify(response));
      });
    }
  }, []);

  const defaultSalerUserSearch: SalesUserSearchCriteria = {
    userSearchCriteria: {
      searchBy: "ALL",
      filterString: "",
      userRole: "MFPSALES",
      orderby: 1,
      strPage: {
        page: 1,
        maxpagelen: 20,
      },
      r_1: "ALL",
    },
  };
  const [salesUserSearch, setSalesUserSearch] = useState(
    defaultSalerUserSearch
  );

  const applicationContext: IApplicationContext = {
    alertMessageConfirmationClick,
    setAlertMessageConfirmationClick,
    haveCode,
    setHaveCode,
    confirmURL,
    setConfirmURL,
    fromSave,
    setFromSave,
    user,
    isInProgress,
    setIsInProgress,
    isNoBidAlert,
    updateMultipleHotelRequest,
    setNoBidAlert,
    setStoreRequestPayload,
    isUpdateAdminAlert,
    setIsUpdateAdminAlert,
    isUpdateAccountAlert,
    setIsUpdateAccountAlert,
    duplicateAccountErrorMessages,
    setDuplicateAccountErrorMessages,
    isUpdateAdminEmailAlert,
    setIsUpdateAdminEmailAlert,
    isCommonValidAlert,
    setCommonValidAlert,
    isPricingEmailValidAlert,
    setPricingEmailValidAlert,
    isStartDateAlert,
    setStartDateAlert,
    isEndDateAlert,
    setEndDateAlert,
    isPricingContactIndex,
    setPricingContactIndex,
    isDOSAlert,
    setDOSAlert,
    isUpdateSales,
    setUpdateSalesAlert,
    isUpdateLimitedSales,
    isUpdateEmailSales,
    setUpdateEmailSalesAlert,
    setUpdateLSAlert,
    isUpdateHotelUser,
    setUpdateHUAlert,
    isUpdateHotelEmailUser,
    setUpdateHEAlert,
    setUser,
    homePageAccSelectHotel,
    setHomePageAccSelectHotel,
    retainActiveTab,
    setRetainActiveTab,
    isPASSelected,
    setPASSelected,
    isGPPSelected,
    isStandardAlert,
    isStandardAlertMsg,
    setGPPSelected,
    setStandardAlert,
    setStandardAlertMsg,
    isSamePoolSelected,
    setSamePoolSelected,
    isFinishAndSaveEnabled,
    setFinishAndSaveEnabled,
    isProductValidated,
    setProductValidated,
    isAllFieldValue,
    setAllFieldValue,
    setPricingContactFixed,
    pricingContactFixed,
    isSecondayEmailValid,
    setSecondayEmailValid,
    maxLength1024ValidationAlert,
    setMaxLength1024ValidationAlert,
    isActiveTab,
    setActiveTab,
    extendedStayNeedsMaxLengthAlert,
    setExtendedStayNeedsMaxLengthAlert,
    orgStructureMaxLengthAlert,
    setOrgStructureMaxLengthAlert,
    accountPoliciesMaxLengthAlert,
    setAccountPoliciesMaxLengthAlert,
    extendedStaySolutionsMaxLengthAlert,
    setExtendedStaySolutionsMaxLengthAlert,
    prefrredMarriottBrandsMaxLengthAlert,
    setPrefrredMarriottBrandsMaxLengthAlert,
    topExtStayMaxLengthAlert,
    setTopExtStayMaxLengthAlert,
    totRevenueRangeAlert,
    setTotRevenueRangeAlert,
    totRmNtsAlert,
    setTotRmNtsAlert,
    totExtRmNtsAlert,
    setTotExtRmNtsAlert,
    adoptionRateAlert,
    setAdoptionRateAlert,
    grpIntermediariesFullServiceAlert,
    setGrpIntermediariesFullServiceAlert,
    grpIntermediariesContractingAlert,
    setGrpIntermediariesContractingAlert,
    grpIntermediariesSiteSelectionAlert,
    setGrpIntermediariesSiteSelectionAlert,
    grpIntermediariesHousingAlert,
    setGrpIntermediariesHousingAlert,
    grpIntermediariesOnsiteAlert,
    setGrpIntermediariesOnsiteAlert,
    grpIntermediariesResearchAlert,
    setGrpIntermediariesResearchAlert,
    grpIntermediariesOtherAlert,
    setGrpIntermediariesOtherAlert,
    acctPerspectiveOverViewAlert,
    setAcctPerspectiveOverViewAlert,
    acctPerspectiveOutlookPerspectiveAlert,
    setAcctPerspectiveOutlookPerspectiveAlert,
    acctPerspectiveDivisionsAlert,
    setAcctPerspectiveDivisionsAlert,
    acctPerspectiveStrategyAlert,
    setAcctPerspectiveStrategyAlert,
    acctPerspectiveVulnerabilitiesAlert,
    setAcctPerspectiveVulnerabilitiesAlert,
    btOverviewByBrandAlert,
    setBtOverviewByBrandAlert,
    btOverviewBuyingDecisionsLengthAlert,
    setBtOverviewBuyingDecisionsLengthAlert,
    ratesRulesStatus,
    setRatesRulesStatus,
    ratesRulesAndEligibilityTick,
    setRatesRulesAndEligibilityTick,
    saveStatusAccountClicked,
    setSaveStatusAccountClicked,
    saveGroupMeetingClicked,
    setSaveGroupMeetingClicked,
    blackoutTick,
    setBlackoutTick,
    rebidTick,
    setRebidTick,
    saveRateNotesClicked,
    setRateNotesClicked,
    updateAPIcallSuccess,
    setupdateAPIcallSuccess,
    eligibilitiesTick,
    setEligibilitiesTick,
    btgTick,
    setBtgTick,
    pricingTick,
    setPricingTick,
    accSpecificTick,
    setAccSpecificTick,
    compelBisTick,
    setCompelBisTick,
    rateRulesTick,
    setRateRulesTick,
    facilityTick,
    setFacilityTick,
    genGroupMeetingsTick,
    setGenGroupMeetingsTick,
    saveRebidRequestsClicked,
    setSaveRebidRequestsClicked,
    rateRulesValidationErr,
    setRateRulesValidationErr,
    rateRulesValidationMsg,
    setRateRulesValidationMsg,
    rateRulesValidationdateMsg,
    setRateRulesValidationdateMsg,
    rateRulesValidationPercentMsg,
    setRateRulesValidationPercentMsg,
    rateRulesValidationAccLockedMsg,
    setRateRulesValidationAccLockedMsg,
    rateRulesValidAccDeleteMsg,
    setRateRulesValidAccDeleteMsg,
    rateRulesAccRejectionMsg,
    setRateRulesAccRejectionMsg,
    rateRulesanswerCancellation,
    setRateRulesanswerCancellation,
    rateRulesLOSMsg,
    setRateRulesLOSMsg,
    rateRulesStayTierMsg,
    setRateRulesStayTierMsg,
    showSubnavbarMenus,
    SetShowSubnavbarMenus,
    pgoosGridRowHighlight,
    setpgoosGridRowHighlight,
    pgoosFilterRowHighlight,
    setpgoosFilterRowHighlight,
    activeGridRowIndexTableOne,
    setActiveGridRowIndexTableOne,
    activeGridRowIndexTableTwo,
    setActiveGridRowIndexTableTwo,
    isRpgtworptwoSelected,
    setRpgtworptwoSelected,
    isRpgonerponeSelected,
    setRpgonerponeSelected,
    isRpgonerptwoSelected,
    setRpgonerptwoSelected,
    isRpgtworponeSelected,
    setRpgtworponeSelected,
    isRpgthreerponeSelected,
    setRpgthreerponeSelected,
    isRpgthreerptwoSelected,
    setRpgthreerptwoSelected,
    isRtrpgonerponeSelected,
    setRtrpgonerponeSelected,
    isRtrpgonerptwoSelected,
    setRtrpgonerptwoSelected,
    isRtrpgtworponeSelected,
    setRtrpgtworponeSelected,
    isRtrpgtworptwoSelected,
    setRtrpgtworptwoSelected,
    isRtrpgthreerponeSelected,
    setRtrpgthreerponeSelected,
    isRtrpgthreerptwoSelected,
    setRtrpgthreerptwoSelected,
    isRponerpgoneMustAlsoSelected,
    setRponerpgoneMustAlsoSelected,
    isRponerpgtwoMustAlsoSelected,
    setRponerpgtwoMustAlsoSelected,
    isRponerpgoneMustSelected,
    setRponerpgoneMustSelected,
    isRponerpgthreeMustAlsoSelected,
    setRponerpgthreeMustAlsoSelected,
    saveBTGClicked,
    setSaveBTGClicked,
    noRedirect,
    setNoRedirect,
    cognosURL,
    setCognosURL,
    validEmail,
    setValidEmail,
    accStatus,
    setAccStatus,
    dateValidationMsg,
    setDateValidationMsg,
    isStartDateEmpty,
    setStartDateEmpty,
    isEndDateEmpty,
    setEndDateEmpty,
    accountProfileCheckbox,
    setAccountProfileCheckbox,
    rateRulesAllValidationMsg,
    setRateRulesAllValidationMsg,
    accountLockedLowHighMsg,
    setAccountLockedLowHighMsg,
    rateRulesRejectionReasonMsg,
    setRulesRejectionReasonMsg,
    errorMessageAlert,
    setErrorMessageAlert,
    displayNavigationAlert,
    setDisplayNavigationAlert,
    navbarClicked,
    setNavbarClicked,
    preventNavigationOnce,
    setPreventNavigationOnce,
    alreadyAssigned,
    setAlreadyAssigned,
    onetimeAlert,
    setOnetimeAlert,
    isMbeMandatoryFields,
    setIsMbeMandatoryFields,
    mbeMandatoryAlert,
    setMbeMandatoryAlert,
    navigateWithAlert,
    setNavigateWithAlert,
    navigateWithAlertFlag,
    setNavigateWithAlertFlag,
    salesUserSearch,
    setSalesUserSearch,
    oneTimeNavigationAlert,
    setOneTimeNavigationAlert,
    saveCompelStatusClicked,
    setSaveCompelStatusClicked,
    saveBlackoutStatusClicked,
    setSaveBlackoutStatusClicked,
    saveEligibilityStatusClicked,
    setSaveEligibilityStatusClicked,
    umMountCPAC,
    setumMountCPAC,
    redirectToReportsLogin,
    isUpdateHotelMandatoryFields,
    setIsUpdateHotelMandatoryFields,
    updateHotelMandatoryAlert,
    setUpdateHotelMandatoryAlert,
    tabNameGrpMeet,
    setTabNameGrpMeet,
    savePricingStatusClicked,
    setSavePricingStatusClicked,
    saveMeetingStatusClicked,
    setSaveMeetingStatusClicked,
    savePaymentStatusClicked,
    setSavePaymentStatusClicked,
    rebidStatus,
    setRebidStatus,
    rateRulesLoader,
    setRateRulesLoader,
    cpacLoader,
    setCpacLoader,
    raterulesSaveClicked,
    setRateRulesSaveClicked,
    rateruleData,
    setRateRulesData,
    isMarkAsCompleteChecked,
    setIsMarkAsCompleteChecked,
    isBtAndGroupAccountTabExist,
    setIsBtAndGroupAccountTabExist,
    isGroupsAndMeetingTabExist,
    setIsGroupsAndMeetingTabExist,
    isGroupsAndMeetingFlag,
    setIsGroupsAndMeetingFlag,
    activeRowPortfolio,
    setactiveRowPortfolio,
    switchTabFlag,
    setSwitchTabFlag,
    grpMeetingsPrevSelect,
    setGrpMeetingsPrevSelect,
    prevRowPortfolio,
    setPrevRowPortfolio,
    prevGridRowIndexTableOne,
    setPrevGridRowIndexTableOne,
    prevGridRowIndexTableTwo,
    setPrevGridRowIndexTableTwo,
    markAsCompleteErrorAlert,
    setMarkAsCompleteErrorAlert,
    tableRefresh,
    setTableRefersh,
    blackoutAlertMsgFlag,
    setBlackoutAlertMsgFlag,
    blackoutAlertMsg,
    setBlackoutAlertMsg,
    pgoosPropRefresh,
    setPgoosPropRefresh,
    groupMeetingUpdation,
    setGroupMeetingUpdation,
    isPrintAccountContainerPage,
    setIsPrintAccountContainerPage,
    isPrintAccountContainerAlert,
    setIsPrintAccountContainerAlert,
    printAccountContainerAlert,
    setPrintAccountContainerAlert,
    updatedPricingData,
    setUpdatedPricingData,
    navigatetoURL,
    groupsAndMeetingError,
    setGroupsAndMeetingError,
    hotelPricingUrlDetails,
    setHotelPricingUrlDetails,
    hotelPricingBlackoutmsg,
    setHotelPricingBlackoutmsg,
    maxBlackoutmsg,
    setMaxBlackoutMsg,
    maxBlackoutFlag,
    setMaxBlackoutFlag,
    totalmaxBlackouts,
    setTotalMaxBlackouts,
    priceRebidScreenFlags,
    setPriceRebidScreenFlags,
    btAccGrpTick,
    setBtAccGrpTick,
    isDataUpdated,
    setIsDataUpdated,
    setIsUpdatingRules,
    isPercentDiscountSaved,
    setIsPercentDiscountSaved,
    rulesPageIsSaving,
    setRulesPageIsSaving,
    appSessionTimedOut,
    setAppSessionTimedOut,
    timeoutModalOpen,
    setTimeoutModalOpen,
    renewModalOpen,
    setRenewModalOpen,
    maxBlackoutPeriodAlert,
    setMaxBlackoutPeriodAlert,
    portfolioAcceptanceQuickSelect,
    setportfolioAcceptanceQuickSelect,
    switchBlackoutTabFlag,
    setSwitchBlackoutTabFlag,
    prevClickedTime,
    setPrevClickedTime,
    currentClickedTime,
    setCurrentClickedTime,
    accSpecScreenAccountStatus,
    setAccSpecScreenAccountStatus,
    switchEligTabFlag,
    setSwitchEligTabFlag,
    rebidTabSwitchFlag,
    setRebidTabSwitchFlag,
    btAccSpecAllDataFilled,
    setBtAccSpecAllDataFilled,
    btAccGrpMeetAllDataFilled,
    setBtAccGrpMeetAllDataFilled,
    homePageDragNoSelectStyle,
    setHomePageDragNoSelectStyle,
  };

  return (
    <ApplicationContext.Provider value={applicationContext}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;
export const ApplicationContextConsumer = ApplicationContext.Consumer;
export interface IApplicationContext {
  alertMessageConfirmationClick?: boolean;
  setAlertMessageConfirmationClick?: (boolean) => void;
  haveCode?: boolean;
  setHaveCode?: (boolean) => void;
  confirmURL?: string;
  setConfirmURL?: (string) => any;
  fromSave?: boolean;
  setFromSave?: (boolean) => void;
  user?: IUser;
  setUser?: () => void;
  isInProgress?: boolean;
  setIsInProgress?: (boolean) => void;
  isNoBidAlert?: boolean;
  updateMultipleHotelRequest?: string;
  setNoBidAlert?: () => void;
  setStoreRequestPayload?: (request) => void;
  isUpdateAdminAlert?: boolean;
  setIsUpdateAdminAlert?: (boolean) => void;
  isUpdateAccountAlert?: boolean;
  setIsUpdateAccountAlert?: (boolean) => void;
  duplicateAccountErrorMessages?: any;
  setDuplicateAccountErrorMessages?: (any) => void;
  isUpdateAdminEmailAlert?: boolean;
  setIsUpdateAdminEmailAlert?: (boolean) => void;
  isCommonValidAlert?: boolean;
  setCommonValidAlert?: (boolean) => void;
  isPricingEmailValidAlert?: boolean;
  setPricingEmailValidAlert?: (boolean) => void;
  isPricingContactIndex?: number;
  setPricingContactIndex?: (number) => void;
  isStartDateAlert?: boolean;
  setStartDateAlert?: (boolean) => void;
  isEndDateAlert?: boolean;
  setEndDateAlert?: (boolean) => void;
  isDOSAlert?: boolean;
  setDOSAlert?: (boolean) => void;
  isUpdateSales?: boolean;
  setUpdateSalesAlert?: (boolean) => void;
  isUpdateEmailSales?: boolean;
  setUpdateEmailSalesAlert?: (boolean) => void;
  isUpdateLimitedSales?: boolean;
  setUpdateLSAlert?: (boolean) => void;
  isUpdateHotelUser?: boolean;
  setUpdateHUAlert?: (boolean) => void;
  isUpdateHotelEmailUser?: boolean;
  setUpdateHEAlert?: (boolean) => void;
  isPASSelected?: boolean;
  setPASSelected?: (boolean) => void;
  isGPPSelected?: boolean;
  setGPPSelected?: (boolean) => void;
  isStandardAlert?: boolean;
  setStandardAlert?: (boolean) => void;
  setStandardAlertMsg?: (msg) => void;
  isSamePoolSelected?: boolean;
  setSamePoolSelected?: (boolean) => void;
  isFinishAndSaveEnabled?: boolean;
  setFinishAndSaveEnabled?: (boolean) => void;
  isProductValidated?: boolean;
  setProductValidated?: (boolean) => void;
  isAllFieldValue?: boolean;
  setAllFieldValue?: (boolean) => void;
  pricingContactFixed?: boolean;
  setPricingContactFixed?: (boolean) => void;
  isSecondayEmailValid?: boolean;
  setSecondayEmailValid?: (boolean) => void;
  setRetainActiveTab?: (boolean) => void;
  maxLength1024ValidationAlert?: boolean;
  setMaxLength1024ValidationAlert?: (boolean) => void;
  isActiveTab?: string;
  setActiveTab?: (string) => any;
  extendedStayNeedsMaxLengthAlert?: boolean;
  setExtendedStayNeedsMaxLengthAlert?: (boolean) => void;
  orgStructureMaxLengthAlert?: boolean;
  setOrgStructureMaxLengthAlert?: (boolean) => void;
  accountPoliciesMaxLengthAlert?: boolean;
  setAccountPoliciesMaxLengthAlert?: (boolean) => void;
  extendedStaySolutionsMaxLengthAlert?: boolean;
  setExtendedStaySolutionsMaxLengthAlert?: (boolean) => void;
  prefrredMarriottBrandsMaxLengthAlert?: boolean;
  setPrefrredMarriottBrandsMaxLengthAlert?: (boolean) => void;
  topExtStayMaxLengthAlert?: boolean;
  setTopExtStayMaxLengthAlert?: (boolean) => void;
  totRevenueRangeAlert?: boolean;
  setTotRevenueRangeAlert?: (boolean) => void;
  totRmNtsAlert?: boolean;
  setTotRmNtsAlert?: (boolean) => void;
  totExtRmNtsAlert?: boolean;
  setTotExtRmNtsAlert?: (boolean) => void;
  adoptionRateAlert?: boolean;
  setAdoptionRateAlert?: (boolean) => void;
  grpIntermediariesFullServiceAlert?: boolean;
  setGrpIntermediariesFullServiceAlert?: (boolean) => void;
  grpIntermediariesContractingAlert?: boolean;
  setGrpIntermediariesContractingAlert?: (boolean) => void;
  grpIntermediariesSiteSelectionAlert?: boolean;
  setGrpIntermediariesSiteSelectionAlert?: (boolean) => void;
  grpIntermediariesHousingAlert?: boolean;
  setGrpIntermediariesHousingAlert?: (boolean) => void;
  grpIntermediariesOnsiteAlert?: boolean;
  setGrpIntermediariesOnsiteAlert?: (boolean) => void;
  grpIntermediariesResearchAlert?: boolean;
  setGrpIntermediariesResearchAlert?: (boolean) => void;
  grpIntermediariesOtherAlert?: boolean;
  setGrpIntermediariesOtherAlert?: (boolean) => void;
  acctPerspectiveOverViewAlert?: boolean;
  setAcctPerspectiveOverViewAlert?: (boolean) => void;
  acctPerspectiveOutlookPerspectiveAlert?: boolean;
  setAcctPerspectiveOutlookPerspectiveAlert?: (boolean) => void;
  acctPerspectiveDivisionsAlert?: boolean;
  setAcctPerspectiveDivisionsAlert?: (boolean) => void;
  acctPerspectiveStrategyAlert?: boolean;
  setAcctPerspectiveStrategyAlert?: (boolean) => void;
  acctPerspectiveVulnerabilitiesAlert?: boolean;
  setAcctPerspectiveVulnerabilitiesAlert?: (boolean) => void;
  btOverviewByBrandAlert?: boolean;
  setBtOverviewByBrandAlert?: (boolean) => void;
  btOverviewBuyingDecisionsLengthAlert?: boolean;
  setBtOverviewBuyingDecisionsLengthAlert?: (boolean) => void;
  ratesRulesStatus?: string;
  setRatesRulesStatus?: (string) => any;
  ratesRulesAndEligibilityTick?: string;
  setRatesRulesAndEligibilityTick?: (string) => any;
  saveStatusAccountClicked?: boolean;
  setSaveStatusAccountClicked?: (boolean) => void;
  saveGroupMeetingClicked?: boolean;
  setSaveGroupMeetingClicked?: (boolean) => void;
  blackoutTick?: string;
  setBlackoutTick?: (string) => any;
  rebidTick?: string;
  setRebidTick?: (string) => any;
  dateValidationMsg?: string;
  setDateValidationMsg?: (string) => any;
  rateRulesValidationMsg?: string;
  setRateRulesValidationMsg?: (string) => any;
  saveRateNotesClicked?: boolean;
  setRateNotesClicked?: (boolean) => void;
  updateAPIcallSuccess?: boolean;
  setupdateAPIcallSuccess?: (boolean) => void;
  eligibilitiesTick?: string;
  setEligibilitiesTick?: (string) => any;
  btgTick?: string;
  setBtgTick?: (string) => any;
  pricingTick?: string;
  setPricingTick?: (string) => any;
  accSpecificTick?: string;
  setAccSpecificTick?: (string) => any;
  compelBisTick?: string;
  setCompelBisTick?: (string) => any;
  rateRulesTick?: string;
  setRateRulesTick?: (string) => any;
  facilityTick?: string;
  setFacilityTick?: (string) => any;
  genGroupMeetingsTick?: string;
  setGenGroupMeetingsTick?: (string) => any;
  saveRebidRequestsClicked?: boolean;
  setSaveRebidRequestsClicked?: (boolean) => void;
  rateRulesValidationErr?: boolean;
  setRateRulesValidationErr?: (boolean) => void;
  rateRulesValidationdateMsg?: string;
  setRateRulesValidationdateMsg?: (string) => void;
  rateRulesValidationPercentMsg?: string;
  setRateRulesValidationPercentMsg?: (string) => void;
  rateRulesValidationAccLockedMsg?: string;
  setRateRulesValidationAccLockedMsg?: (string) => void;
  rateRulesValidAccDeleteMsg?: string;
  setrateRulesValidAccDeleteMsg?: (string) => void;
  rateRulesAccRejectionMsg?: string;
  setRateRulesAccRejectionMsg?: (string) => void;
  rateRulesanswerCancellation?: string;
  setRateRulesanswerCancellation?: (string) => void;
  rateRulesLOSMsg?: string;
  setRateRulesLOSMsg?: (string) => void;
  rateRulesStayTierMsg?: string;
  setRateRulesStayTierMsg?: (string) => void;
  showSubnavbarMenus?: boolean;
  SetShowSubnavbarMenus?: (boolean) => void;
  pgoosGridRowHighlight?: boolean;
  setpgoosGridRowHighlight?: (boolean) => void;
  pgoosFilterRowHighlight?: boolean;
  setpgoosFilterRowHighlight?: (boolean) => void;
  activeGridRowIndexTableOne?: string;
  setActiveGridRowIndexTableOne?: (string) => void;
  activeGridRowIndexTableTwo?: string;
  setActiveGridRowIndexTableTwo?: (string) => void;
  isRpgonerponeSelected?: boolean;
  setRpgonerponeSelected?: (boolean) => void;
  isRpgonerptwoSelected?: boolean;
  setRpgonerptwoSelected?: (boolean) => void;
  isRpgtworponeSelected?: boolean;
  setRpgtworponeSelected?: (boolean) => void;
  isRpgtworptwoSelected?: boolean;
  setRpgtworptwoSelected?: (boolean) => void;
  isRpgthreerponeSelected?: boolean;
  setRpgthreerponeSelected?: (boolean) => void;
  isRpgthreerptwoSelected?: boolean;
  setRpgthreerptwoSelected?: (boolean) => void;
  isRtrpgonerponeSelected?: boolean;
  setRtrpgonerponeSelected?: (boolean) => void;
  isRtrpgonerptwoSelected?: boolean;
  setRtrpgonerptwoSelected?: (boolean) => void;
  isRtrpgtworponeSelected?: boolean;
  setRtrpgtworponeSelected?: (boolean) => void;
  isRtrpgtworptwoSelected?: boolean;
  setRtrpgtworptwoSelected?: (boolean) => void;
  isRtrpgthreerponeSelected?: boolean;
  setRtrpgthreerponeSelected?: (boolean) => void;
  isRtrpgthreerptwoSelected?: boolean;
  setRtrpgthreerptwoSelected?: (boolean) => void;
  isRponerpgoneMustAlsoSelected?: boolean;
  setRponerpgoneMustAlsoSelected?: (boolean) => void;
  isRponerpgtwoMustAlsoSelected?: boolean;
  setRponerpgtwoMustAlsoSelected?: (boolean) => void;
  isRponerpgoneMustSelected?: boolean;
  setRponerpgoneMustSelected?: (boolean) => void;
  isRponerpgthreeMustAlsoSelected?: boolean;
  setRponerpgthreeMustAlsoSelected?: (boolean) => void;
  isStartDateEmpty?: boolean;
  setStartDateEmpty?: (boolean) => void;
  isEndDateEmpty?: boolean;
  setEndDateEmpty?: (boolean) => void;
  saveBTGClicked?: boolean;
  setSaveBTGClicked?: (boolean) => void;
  noRedirect?: boolean;
  setNoRedirect?: (boolean) => void;
  cognosURL?: string;
  setCognosURL?: (string) => any;
  validEmail?: boolean;
  setValidEmail?: (boolean) => void;
  accStatus?: string;
  setAccStatus?: (string) => any;
  accountProfileCheckbox?: boolean;
  setAccountProfileCheckbox?: (boolean) => void;
  rateRulesAllValidationMsg?: string;
  setRateRulesAllValidationMsg?: (string) => any;
  accountLockedLowHighMsg?: string;
  setAccountLockedLowHighMsg?: (string) => any;
  rateRulesRejectionReasonMsg?: string;
  setRulesRejectionReasonMsg?: (string) => any;
  errorMessageAlert?: ErrorMessageAlert;
  setErrorMessageAlert?: (ErrorMessageAlert) => void;
  displayNavigationAlert?: boolean;
  setDisplayNavigationAlert?: (boolean) => void;
  navbarClicked?: boolean;
  setNavbarClicked?: (boolean) => void;
  preventNavigationOnce?: boolean;
  alreadyAssigned?: boolean;
  setPreventNavigationOnce?: (boolean) => void;
  setAlreadyAssigned?: (boolean) => void;
  onetimeAlert?: ErrorMessageAlert;
  setOnetimeAlert?: (ErrorMessageAlert) => void;
  isMbeMandatoryFields?: boolean;
  setIsMbeMandatoryFields?: (boolean) => void;
  mbeMandatoryAlert?: string;
  setMbeMandatoryAlert?: (string) => void;
  navigateWithAlert?: string;
  setNavigateWithAlert?: (string) => any;
  navigateWithAlertFlag?: boolean;
  setNavigateWithAlertFlag?: (boolean) => void;
  salesUserSearch?: SalesUserSearchCriteria;
  setSalesUserSearch?: (SalesUserSearchCriteria) => void;
  oneTimeNavigationAlert?: OneTimeNavigationAlert;
  setOneTimeNavigationAlert?: (OneTimeNavigationAlert) => void;
  saveCompelStatusClicked?: boolean;
  setSaveCompelStatusClicked?: (boolean) => void;
  saveBlackoutStatusClicked?: boolean;
  setSaveBlackoutStatusClicked?: (boolean) => void;
  saveEligibilityStatusClicked?: boolean;
  setSaveEligibilityStatusClicked?: (boolean) => void;
  umMountCPAC?: boolean;
  setumMountCPAC?: (boolean) => void;
  redirectToReportsLogin?: () => void;
  isUpdateHotelMandatoryFields?: boolean;
  setIsUpdateHotelMandatoryFields?: (boolean) => void;
  updateHotelMandatoryAlert?: string;
  setUpdateHotelMandatoryAlert?: (string) => void;
  tabNameGrpMeet?: string;
  setTabNameGrpMeet?: (string) => void;
  savePricingStatusClicked?: boolean;
  setSavePricingStatusClicked?: (boolean) => void;
  saveMeetingStatusClicked?: boolean;
  setSaveMeetingStatusClicked?: (boolean) => void;
  savePaymentStatusClicked?: boolean;
  setSavePaymentStatusClicked?: (boolean) => void;
  rebidStatus?: string;
  setRebidStatus?: (string) => void;
  rateRulesLoader?: boolean;
  setRateRulesLoader?: (boolean) => void;
  cpacLoader?: boolean;
  setCpacLoader?: (boolean) => void;
  raterulesSaveClicked?: boolean;
  setRateRulesSaveClicked?: (boolean) => void;
  rateruleData;
  setRateRulesData;
  isMarkAsCompleteChecked?: boolean;
  setIsMarkAsCompleteChecked?: (boolean) => void;
  isBtAndGroupAccountTabExist?: boolean;
  setIsBtAndGroupAccountTabExist?: (boolean) => void;
  isGroupsAndMeetingTabExist?: boolean;
  setIsGroupsAndMeetingTabExist?: (boolean) => void;
  isGroupsAndMeetingFlag?: boolean;
  setIsGroupsAndMeetingFlag?: (boolean) => void;
  activeRowPortfolio?: string;
  setactiveRowPortfolio?: (string) => void;
  switchTabFlag?: boolean;
  setSwitchTabFlag?: (boolean) => void;
  prevRowPortfolio?: string;
  setPrevRowPortfolio?: (string) => void;
  prevGridRowIndexTableOne?: string;
  setPrevGridRowIndexTableOne?: (string) => void;
  prevGridRowIndexTableTwo?: string;
  setPrevGridRowIndexTableTwo?: (string) => void;
  markAsCompleteErrorAlert?: ErrorMessageAlert;
  setMarkAsCompleteErrorAlert?: (ErrorMessageAlert) => void;
  tableRefresh?: boolean;
  setTableRefersh?: (boolean) => void;
  grpMeetingsPrevSelect?: string;
  setGrpMeetingsPrevSelect?: (string) => void;
  blackoutAlertMsgFlag?: boolean;
  setBlackoutAlertMsgFlag?: (boolean) => void;
  blackoutAlertMsg?: string;
  setBlackoutAlertMsg?: (string) => void;
  pgoosPropRefresh?: boolean;
  setPgoosPropRefresh?: (boolean) => void;
  groupMeetingUpdation?: boolean;
  setGroupMeetingUpdation?: (boolean) => void;
  isPrintAccountContainerPage?: boolean;
  setIsPrintAccountContainerPage?: (boolean) => void;
  isPrintAccountContainerAlert?: boolean;
  setIsPrintAccountContainerAlert?: (boolean) => void;
  printAccountContainerAlert?: string;
  setPrintAccountContainerAlert?: (string) => void;
  navigatetoURL;
  groupsAndMeetingError;
  setGroupsAndMeetingError;
  updatedPricingData?: boolean;
  setUpdatedPricingData?: (boolean) => void;
  hotelPricingUrlDetails;
  setHotelPricingUrlDetails;
  hotelPricingBlackoutmsg?: string;
  setHotelPricingBlackoutmsg?: (string) => void;
  maxBlackoutmsg?: string;
  setMaxBlackoutMsg?: (string) => void;
  maxBlackoutFlag?: boolean;
  setMaxBlackoutFlag?: (boolean) => void;
  totalmaxBlackouts?: boolean;
  setTotalMaxBlackouts?: (boolean) => void;
  priceRebidScreenFlags;
  setPriceRebidScreenFlags;
  btAccGrpTick?: string;
  setBtAccGrpTick?: (string) => void;
  isDataUpdated?: number;
  setIsDataUpdated?: (number) => void;
  appSessionTimedOut?: boolean;
  setAppSessionTimedOut?: (boolean) => void;
  timeoutModalOpen?: boolean;
  setTimeoutModalOpen?: (boolean) => void;
  renewModalOpen?: boolean;
  setRenewModalOpen?: (boolean) => void;
  maxBlackoutPeriodAlert?: string;
  setMaxBlackoutPeriodAlert?: (string) => void;
  portfolioAcceptanceQuickSelect?: boolean;
  setportfolioAcceptanceQuickSelect?: (boolean) => void;
  isStandardAlertMsg?: boolean;
  switchBlackoutTabFlag?: boolean;
  setSwitchBlackoutTabFlag?: (boolean) => void;
  prevClickedTime;
  setPrevClickedTime?: (any) => void;
  currentClickedTime;
  setCurrentClickedTime: (any) => void;
  accSpecScreenAccountStatus?: string;
  setAccSpecScreenAccountStatus?: (string) => void;
  switchEligTabFlag?: boolean;
  setSwitchEligTabFlag?: (boolean) => void;
  rebidTabSwitchFlag?: boolean;
  setRebidTabSwitchFlag?: (boolean) => void;
  btAccSpecAllDataFilled?: boolean;
  setBtAccSpecAllDataFilled?: (boolean) => void;
  btAccGrpMeetAllDataFilled?: boolean;
  setBtAccGrpMeetAllDataFilled?: (boolean) => void;
  homePageDragNoSelectStyle?: boolean;
  setHomePageDragNoSelectStyle?: (boolean) => void;
}
