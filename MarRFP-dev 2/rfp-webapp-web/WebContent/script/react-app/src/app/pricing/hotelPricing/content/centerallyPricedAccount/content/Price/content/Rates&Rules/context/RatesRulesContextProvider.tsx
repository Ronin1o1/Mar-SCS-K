import moment from "moment";
import React, { useContext, useState } from "react";
import Utils from "../../../../../../../../../common/utils/Utils";
import API from "../service/API";
import Settings from "../static/Settings";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
//import CPACAPI from "../../../../../../../../hotelPricing/content/centerallyPricedAccount/service/API";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const RatesRulesContext = React.createContext({});

export const RatesRulesContextProvider = (props): JSX.Element => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext = useContext(AccountCenterTabsContext);
  const [state, setState] = useState({
    /* data: {
      los: false,
      cur: "",
      publishConfirmRequired: false,
      allowableLOSIntervals: null,
      rateOffers: null,
      allowStayPatternPricing: false,
    }, */
    data: {},
    showPreviousCancellation: false,
    showNoReasonProvided: false,
    showNoReasonProvided1: false,
    showRemovalReason: false,
  });
  const [ratesRequestPayload, setRatesRequestPayload] = useState({
    accountRates: {},
    accountSeason: {},
    accountLOS: [],
    roompoolflags: [{ hotelAccountSpecificPGOOSData: [] }],
    accountRules: [],
    fixedRates: {},
    hotelAccountSpecificAccountFlags: {},

    compareRates: {},
    hotelAccountSpecificFacility: {
      rm_nights: 0,
      boolStringIsLocked: "false",
    },
    percentdiscount: 0.0,
    rebid_due: "",
    rebid_notes: "",
    rebidstatus: 0,
    waiveblackouts: "",
    markComplete: "",
    rebidRound: 0,
    salesContact: "",
    isLocked: "",
    ratetype_selected: 0,
    offcycle: "",
    accountpricingtype: "",
    hotelid: 0,
    hotelrfpid: 0,
    hotel_accountinfoid: 0,
    accountrecid: 0,
    extendcancelpolicy: "",
    altcancelpolicyoptionid: 0,
    altcxlpolicytimeid: 1,
    rollover: "",
    waiveearlycharge: "",
  });
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [removalReason, setRemovalReason] = useState([]);
  const [rejectReason, setRejectReason] = useState([]);
  const [ratesData, setRatesData] = useState<any>({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showcopyButton, setshowcopyButton] = useState(true);
  const [previousRulesData, setPreviousRulesData] = useState({});
  const [previousRulesLoader, setPreviousRulesLoader] = useState(false);

  const [quickauditviewcancelData, setDuickauditviewcancelData] = useState({});
  const [quickauditviewcancelLoader, setQuickauditviewcancelLoader] =
    useState(false);

  const [showRatesModal, setShowRatesModal] = useState(false);

  const [previousRatesData, setPreviousRatesData] = useState({});
  const [previousRatesDataLoader, setPreviousRatesDataLoader] = useState(false);
  const [productOffered, setProductOffered] = useState([]);
  const [formEdited, setFormEdited] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState("N");

  const setQueryParam = (name) => {
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    return results && results[2] ? decodeURI(results[2]) : "";
  };

  const [accountInfoId, setAccountInfoId] = useState(
    setQueryParam("AccountInfoId")
  );
  const [marshaCode, setMarshaCode] = useState(setQueryParam("MarshaCode"));
  const [hotelId, setHotelId] = useState(setQueryParam("HotelId"));
  const [pageLoader, setPageLoader] = useState(true);
  const [rateRulesTick, setRateRulesTick] = useState("");
  const [initialValidation, setInitialValidation] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (
      history.location.pathname.search(
        Settings.routeName.printAccountContainer
      ) !== -1
    ) {
      getRatesData();
    }
  }, []);

  const showPreviousCancellation = (data) => {
    setState({
      ...state,
      showPreviousCancellation: !state.showPreviousCancellation,
    });
  };

  const showNoReasonProvided = (data) => {
    setState({
      ...state,
      showNoReasonProvided: !state.showNoReasonProvided,
    });
  };
  const showNoReasonProvided1 = (data) => {
    setState({
      ...state,
      showNoReasonProvided1: !state.showNoReasonProvided1,
    });
  };
  const showRemovalReason = (data) => {
    setState({
      ...state,
      showRemovalReason: !state.showRemovalReason,
    });
  };

  const getRatesData = (hotel_accountinfoid = accountInfoId) => {
    appContext.rateRulesanswerCancellation = "";
    setRatesData({});
    setPageLoader(true);

    if (!appContext.switchTabFlag) {
      API.getRates(hotel_accountinfoid || accountInfoId).then((data) => {
        if (data != "error") {
          appContext.setAccSpecScreenAccountStatus(
            data?.hotelAccountSpecific?.hotelAccountSpecificData?.accountStatus
          );
          if (
            data?.hotelAccountSpecific?.hotelAccountSpecificData
              .percentdiscount == "0"
          ) {
            data.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
              (0.0).toFixed(1);
          }
          const hasd = data?.hotelAccountSpecific?.hotelAccountSpecificData;
          let percentDiscount =
            data?.hotelAccountSpecific?.hotelAccountSpecificData
              .percentdiscount;
          if (percentDiscount) {
            percentDiscount =
              percentDiscount && Number(percentDiscount).toFixed(2);
            if (Number.isInteger(Number(percentDiscount))) {
              data.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                Number(percentDiscount).toFixed(1);
            } else {
              const decimals = percentDiscount && percentDiscount.split(".")[1];
              if (decimals) {
                const str = Array.from(decimals);
                if (str[1] === "0") {
                  data.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                    Number(percentDiscount).toFixed(1);
                } else {
                  data.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                    Number(
                      data.hotelAccountSpecific.hotelAccountSpecificData
                        .percentdiscount
                    ).toFixed(2);
                }
              }
            }
          }
          appContext.rateruleData = data;
          appContext.setRateRulesData(appContext.rateruleData);
          sessionStorage.setItem("getRatesdata", JSON.stringify(data));
          setRatesData(data);
          const dataCheck1 = JSON.parse(
            localStorage.getItem("ratesTableValidData")
          );
          const ratesTableValidData = {
            isDateValid: true,
            isLOSValid: true,
            isFixedRateValid: true,
            isAccountRateValid: true,
            seasonChg: "N",
            losChg: "N",
            fixedRateChg: "N",
            accRateChg: "N",
            rmNightsChg: "N",
            altCxlPolicyChg: "N",
            waiveEarlyChg: "N",
            roomFlagsPGOOSDataChg: "N",
            roomFlagsAcceptedChg: "N",
            roomFlagsLRAChg: "N",
            amenitiesExemptChg: "N",
            rulesChg: "N",
            percentageChg: "N",
            productOfferChanged: dataCheck1?.productOfferChanged || false,
          };
          localStorage.setItem(
            "ratesTableValidData",
            JSON.stringify(ratesTableValidData)
          );
          localStorage.setItem("orginalRatesData", JSON.stringify(data));
          setPageLoader(false);
          appContext.setRulesPageIsSaving(false);
        }
      });
    } else {
      const NewData = JSON.parse(sessionStorage.getItem("getRatesdata"));
      const showcopyBtn =
        NewData?.hotelAccountSpecific?.hotelAccountSpecificData?.showcopyButton;
      setshowcopyButton(showcopyBtn);
      if (
        NewData?.hotelAccountSpecific?.hotelAccountSpecificData
          .percentdiscount == "0"
      ) {
        NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
          (0.0).toFixed(1);
      }
      const hasd = NewData?.hotelAccountSpecific?.hotelAccountSpecificData;
      let percentDiscount =
        NewData?.hotelAccountSpecific?.hotelAccountSpecificData.percentdiscount;
      if (percentDiscount) {
        percentDiscount = percentDiscount && Number(percentDiscount).toFixed(2);
        if (Number.isInteger(Number(percentDiscount))) {
          NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
            Number(percentDiscount).toFixed(1);
        } else {
          const decimals = percentDiscount && percentDiscount.split(".")[1];
          if (decimals) {
            const str = Array.from(decimals);
            if (str[1] === "0") {
              NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                Number(percentDiscount).toFixed(1);
            } else {
              NewData.hotelAccountSpecific.hotelAccountSpecificData.percentdiscount =
                Number(
                  NewData.hotelAccountSpecific.hotelAccountSpecificData
                    .percentdiscount
                ).toFixed(2);
            }
          }
        }
      }
      appContext.rateruleData = NewData;
      appContext.setRateRulesData(appContext.rateruleData);
      sessionStorage.setItem("getRatesdata", JSON.stringify(NewData));
      setRatesData(NewData);
      appContext.setSwitchTabFlag(false);
      localStorage.setItem("orginalRatesData", JSON.stringify(NewData));
      setPageLoader(false);
      appContext.setRulesPageIsSaving(false);
    }
  };
  const getRemovalReason = () => {
    setRemovalReason([]);
    API.getRemovalReason().then((data) => {
      setRemovalReason(data);
    });
  };
  const getRejectReason = () => {
    setRejectReason([]);
    API.getRejectReason().then((data) => {
      setRejectReason(data);
    });
  };

  const getPreviousRulesData = (hotel_accountinfoid = "") => {
    setPreviousRulesData({});
    setPreviousRulesLoader(true);
    API.getPreviousRules(
      hotel_accountinfoid || accountInfoId,
      marshaCode,
      hotelId
    ).then((data) => {
      setPreviousRulesData(data);
      setPreviousRulesLoader(false);
    });
  };

  const getQuickauditviewcancel = (hotel_accountinfoid = "") => {
    setQuickauditviewcancelLoader(true);
    setDuickauditviewcancelData({});
    API.getQuickauditviewcancelData(
      hotel_accountinfoid || accountInfoId,
      marshaCode,
      hotelId
    )
      .then((data) => {
        setQuickauditviewcancelLoader(false);
        setDuickauditviewcancelData(data);
      })
      .catch((error) => "");
  };

  const getPreviousRatesData = (hotel_accountinfoid = "") => {
    setPreviousRatesData({});
    setPreviousRulesLoader(true);
    API.getPreviousData(
      hotel_accountinfoid || accountInfoId,
      marshaCode,
      hotelId
    ).then((data) => {
      setPreviousRatesData(data);
      setPreviousRatesDataLoader(false);
    });
  };

  const handleValidateInput = (requestData, requestHasd, users) => {
    appContext.rateRulesValidationMsg = "";
    const minNumber = 15;
    const maxNumber = 99999999;
    let isAlertRendered = false;
    let lraRateCheckSingle;
    let lraFormattedRateCheckSingle;
    let lraRateCheckDouble;
    let lraFormattedRateCheckDouble;
    let nlraRateCheckSingle;
    let nlraFormattedRateCheckSingle;
    let nlraRateCheckDouble;
    let nlraFormattedRateCheckDouble;
    let isEmptyNLRA;
    let isEmptyLRA;
    let lradoubleCheck1;
    let lraformatteddoubleCheck1;
    let lradoubleCheck2;
    let lraformatteddoubleCheck2;
    let lradoubleCheck3;
    let lraformatteddoubleCheck3;
    const rates = [];
    if (
      requestData?.accountRates &&
      requestData?.accountRates !== null &&
      !_.isEmpty(requestData?.accountRates)
    ) {
      Object.entries(requestData?.accountRates).forEach(([key, value]) => {
        rates.push(value);
      });
      Object.entries(requestData?.accountRates).forEach(([key, value]) => {
        const rateData: any = value;

        const keySplit = key?.split("_");
        const productId: any = keySplit[3];

        const getRoompool = requestHasd?.roompooldetails?.filter(
          (el) => el.roompool === rateData?.roompool
        );
        const isLarnType = requestHasd?.lranlratype?.filter(
          (el) => el.productid === productId
        );
        const getRoompoolItem = requestHasd?.roompoollist?.filter(
          (el) => el.seq === rateData?.roompool
        );

        if (
          productId === isLarnType[0]?.productid &&
          (users?.isLimitedSalesUser || users?.isHotelUser) &&
          isLarnType[0]?.required === "Y" &&
          getRoompool[0]?.lra === "Y" &&
          getRoompoolItem[0]?.required === "Y" &&
          requestHasd?.ratetype_selected != 20
        ) {
          const isEmptyLRA = rateData?.rate;
          if (rateData?.roompool === 1 && !isEmptyLRA && !isAlertRendered) {
            appContext.rateRulesValidationMsg = "true";
            alert(
              "You must fill in all required LRA rate fields for room pool " +
                rateData?.roompool
            );
            isAlertRendered = true;
            return false;
          }
          if (rateData?.roompool === 2 && !isEmptyLRA && !isAlertRendered) {
            appContext.rateRulesValidationMsg = "true";
            alert(
              "You must fill in all required LRA rate fields for room pool " +
                rateData?.roompool
            );
            isAlertRendered = true;
            return false;
          }
          if (rateData?.roompool === 3 && !isEmptyLRA && !isAlertRendered) {
            appContext.rateRulesValidationMsg = "true";
            alert(
              "You must fill in all required LRA rate fields for room pool " +
                rateData?.roompool
            );
            isAlertRendered = true;
            return false;
          }
        }

        if (appContext?.user?.isAnySalesUser) {
          JSON.parse(localStorage.getItem("ratesData"))?.roompoolflags?.map(
            (item) => {
              if (
                item?.accepted === "N" &&
                item?.rejectreasonid == "1" &&
                !isAlertRendered
              ) {
                appContext.rateRulesRejectionReasonMsg = `Please select a rejection reason for room pool ${item.roompool}`;

                isAlertRendered = true;
                return false;
              }
            }
          );
        } else {
          JSON.parse(localStorage.getItem("ratesData"))?.roompoolflags?.map(
            (item) => {
              item.hotelAccountSpecificPGOOSData?.map((innerData) => {
                if (
                  innerData?.pgoos === "N" &&
                  !innerData?.removalreasonid &&
                  !isAlertRendered
                ) {
                  appContext.rateRulesValidationMsg = "true";
                  alert(
                    "Please select a removal reason for room pool group " +
                      innerData?.roomClassSequence +
                      " and room pool sequence " +
                      innerData?.roomPoolSequence
                  );
                  isAlertRendered = true;
                  return false;
                }
              });
            }
          );
        }

        if (rateData?.roomtypeid == 1 && rateData?.productid == 1) {
          lraRateCheckSingle =
            typeof rateData?.rate == "string"
              ? parseInt(rateData?.rate)
              : rateData?.rate;
          lraFormattedRateCheckSingle =
            typeof rateData?.formattedRate == "string"
              ? parseInt(rateData?.formattedRate)
              : rateData?.formattedRate;
        }
        if (rateData?.roomtypeid == 2 && rateData?.productid == 1) {
          lraRateCheckDouble =
            typeof rateData?.rate == "string"
              ? parseInt(rateData?.rate)
              : rateData?.rate;
          lraFormattedRateCheckDouble =
            typeof rateData?.formattedRate == "string"
              ? parseInt(rateData?.formattedRate)
              : rateData?.formattedRate;
        }
        if (rateData?.roomtypeid == 1 && rateData?.productid == 2) {
          nlraRateCheckSingle =
            typeof rateData?.rate == "string"
              ? parseInt(rateData?.rate)
              : rateData?.rate;
          nlraFormattedRateCheckSingle =
            typeof rateData?.formattedRate == "string"
              ? parseInt(rateData?.formattedRate)
              : rateData?.formattedRate;
        }
        if (rateData?.roomtypeid == 2 && rateData?.productid == 2) {
          nlraRateCheckDouble =
            typeof rateData?.rate == "string"
              ? parseInt(rateData?.rate)
              : rateData?.rate;
          nlraFormattedRateCheckDouble =
            typeof rateData?.formattedRate == "string"
              ? parseInt(rateData?.formattedRate)
              : rateData?.formattedRate;
        }
        if (
          rateData?.roompool === 1 &&
          rateData?.roomtypeid == 2 &&
          rateData?.productid == 1
        ) {
          lradoubleCheck1 =
            typeof rateData?.rate == "string"
              ? parseInt(rateData?.rate)
              : rateData?.rate;
          lraformatteddoubleCheck1 =
            typeof rateData?.formattedRate == "string"
              ? parseInt(rateData?.formattedRate)
              : rateData?.formattedRate;
        }
        if (
          rateData?.roompool === 2 &&
          rateData?.roomtypeid == 2 &&
          rateData?.productid == 1
        ) {
          lradoubleCheck2 =
            typeof rateData?.rate == "string"
              ? parseInt(rateData?.rate)
              : rateData?.rate;
          lraformatteddoubleCheck2 =
            typeof rateData?.formattedRate == "string"
              ? parseInt(rateData?.formattedRate)
              : rateData?.formattedRate;
        }
        if (
          rateData?.roompool === 3 &&
          rateData?.roomtypeid == 2 &&
          rateData?.productid == 1
        ) {
          lradoubleCheck3 =
            typeof rateData?.rate == "string"
              ? parseInt(rateData?.rate)
              : rateData?.rate;
          lraformatteddoubleCheck3 =
            typeof rateData?.formattedRate == "string"
              ? parseInt(rateData?.formattedRate)
              : rateData?.formattedRate;
        }
        if (
          (users?.isLimitedSalesUser || users?.isHotelUser) &&
          !isAlertRendered &&
          rateData?.rate !== "" &&
          (rateData?.roompool === 1 ||
            rateData?.roompool === 2 ||
            rateData?.roompool === 3) &&
          (lraRateCheckSingle > lraFormattedRateCheckSingle ||
            nlraRateCheckSingle > nlraFormattedRateCheckSingle) &&
          (lraRateCheckSingle > lraRateCheckDouble ||
            nlraRateCheckSingle > nlraRateCheckDouble)
        ) {
          appContext.rateRulesValidationMsg = "true";
          alert(Settings.alerts.singleRateLessThanDoubleRate);
          isAlertRendered = true;
          return false;
        }

        if (
          (users?.isLimitedSalesUser || users?.isHotelUser) &&
          !isAlertRendered &&
          appContext.accountLockedLowHighMsg == "" &&
          !isEmptyLRA &&
          lradoubleCheck1 !== undefined &&
          lradoubleCheck2 !== undefined &&
          parseInt(lradoubleCheck1) > parseInt(lradoubleCheck2)
        ) {
          appContext.rateRulesValidationMsg = "true";
          alert(Settings.alerts.lralessThanpool1);
          isAlertRendered = true;
          return false;
        }

        if (
          (users?.isLimitedSalesUser || users?.isHotelUser) &&
          !isAlertRendered &&
          appContext.accountLockedLowHighMsg == "" &&
          !isEmptyLRA &&
          lradoubleCheck2 !== undefined &&
          lradoubleCheck3 !== undefined &&
          parseInt(lradoubleCheck2) > parseInt(lradoubleCheck3)
        ) {
          appContext.rateRulesValidationMsg = "true";
          alert(Settings.alerts.lralessThanpool2);
          isAlertRendered = true;
          return false;
        }
        if (
          (users?.isLimitedSalesUser || users?.isHotelUser) &&
          !isAlertRendered &&
          appContext.accountLockedLowHighMsg == "" &&
          !isEmptyLRA &&
          lradoubleCheck1 !== undefined &&
          lradoubleCheck3 !== undefined &&
          parseInt(lradoubleCheck1) > parseInt(lradoubleCheck3)
        ) {
          appContext.rateRulesValidationMsg = "true";
          alert(Settings.alerts.lralessThanpool3);
          isAlertRendered = true;
          return false;
        }

        if (
          (users?.isLimitedSalesUser || users?.isHotelUser) &&
          !isAlertRendered &&
          (!isEmptyLRA || !isEmptyNLRA) &&
          (rateData?.roompool === 1 ||
            rateData?.roompool === 2 ||
            rateData?.roompool === 3) &&
          (lraRateCheckDouble < lraFormattedRateCheckDouble ||
            nlraRateCheckDouble < nlraFormattedRateCheckDouble) &&
          (lraRateCheckDouble < lraRateCheckSingle ||
            nlraRateCheckDouble < nlraRateCheckSingle)
        ) {
          appContext.rateRulesValidationMsg = "true";
          alert(Settings.alerts.doubleRateGreaterThanSingleRate);
          isAlertRendered = true;
          return false;
        }

        if (
          requestHasd?.ratetype_selected != null &&
          requestHasd?.ratetype_selected != 20 &&
          productId == isLarnType[0]?.productid &&
          (users?.isLimitedSalesUser || users?.isHotelUser)
        ) {
          const isEmptyLRA = rateData?.rate;
          if (!isEmptyLRA && !isAlertRendered) {
            const larnType = requestHasd?.lranlratype?.filter(
              (el) => el.required === "N"
            );
            if (rates && rates.length > 0 && larnType && larnType.length > 0) {
              const nlraDetail = rates?.filter(
                (r) =>
                  r.productid == larnType[0].productid &&
                  r.roompool == rateData?.roompool &&
                  r.rate != null
              );
              if (nlraDetail && nlraDetail.length > 0 && nlraDetail) {
                //alert(Settings.alerts.lraRequiredIfNraIsNotNull);
                isAlertRendered = true;
                return true;
              }
            }
          }
        }

        if (
          productId === isLarnType[0]?.productid &&
          (users?.isLimitedSalesUser || users?.isHotelUser) &&
          isLarnType[0]?.required === "N" &&
          getRoompoolItem[0]?.required === "Y" &&
          getRoompool[0]?.lra === "N" &&
          requestHasd?.ratetype_selected != 20
        ) {
          const isEmptyNLRA = rateData?.rate;
          if (rateData?.roompool === 1 && !isEmptyNLRA && !isAlertRendered) {
            appContext.rateRulesValidationMsg = "true";
            alert(
              "You must fill in all required NLRA rate fields for room pool " +
                rateData?.roompool
            );
            isAlertRendered = true;
            return false;
          }
          if (rateData?.roompool === 2 && !isEmptyNLRA && !isAlertRendered) {
            appContext.rateRulesValidationMsg = "true";
            alert(
              "You must fill in all required NLRA rate fields for room pool " +
                rateData?.roompool
            );
            isAlertRendered = true;
            return false;
          }
          if (rateData?.roompool === 3 && !isEmptyNLRA && !isAlertRendered) {
            appContext.rateRulesValidationMsg = "true";
            alert(
              "You must fill in all required NLRA rate fields for room pool " +
                rateData?.roompool
            );
            isAlertRendered = true;
            return false;
          }
        }

        if (
          rateData?.rate &&
          !Utils.isNumber(String(rateData?.rate)) &&
          !isAlertRendered
        ) {
          if (users?.isHotelUser) {
            appContext.rateRulesValidationMsg = "true";
          } else {
            appContext.rateRulesValidationMsg = "";
          }
          if (users?.isAdminRole || users?.isSalesUser) {
            if (
              requestHasd?.isLocked == "Y" ||
              (rateData?.roompool === 1 &&
                rateData?.productid == "1" &&
                rateData?.roomtypeid == 1 &&
                requestHasd?.isLocked !== "Y")
            ) {
              if (!appContext.oneTimeNavigationAlert.show) {
                alert("You must enter a valid number.");
                isAlertRendered = true;
              }
            }
          } else {
            alert("You must enter a valid number.");
            isAlertRendered = true;
          }
          return false;
        }

        if (
          !Utils.isValidRange(parseFloat(rateData?.rate), minNumber, maxNumber)
        ) {
          if (users?.isHotelUser) {
            appContext.rateRulesValidationMsg = "true";
          } else {
            appContext.rateRulesValidationMsg = "";
          }
          if (
            requestHasd?.ratetype_selected != null &&
            requestHasd?.ratetype_selected != 20 &&
            !isAlertRendered
          ) {
            if (users?.isAdminRole || users?.isSalesUser) {
              if (
                requestHasd?.isLocked == "Y" ||
                (rateData?.roompool === 1 &&
                  rateData?.productid == "1" &&
                  rateData?.roomtypeid == 1 &&
                  requestHasd?.isLocked !== "Y")
              ) {
                if (!appContext.oneTimeNavigationAlert.show) {
                  alert(
                    "You must enter a value between " +
                      minNumber +
                      " and " +
                      maxNumber
                  );
                  isAlertRendered = true;
                }
              }
            } else {
              if (!(users?.isAdminRole || users?.isSalesUser)) {
                alert(
                  "You must enter a value between " +
                    minNumber +
                    " and " +
                    maxNumber
                );
                isAlertRendered = true;
              }
            }
            return false;
          }
        }
      });
    }
  };

  const handleDateValidation = (requestData) => {
    if (!appContext?.user?.isAdminRole && !appContext?.user?.isSalesUser) {
      appContext.rateRulesValidationdateMsg = "";
      const storeData = JSON.parse(localStorage.getItem("orginalRatesData"));
      const hasd =
        ratesData?.hotelAccountSpecific?.hotelAccountSpecificData ||
        storeData?.hotelAccountSpecific?.hotelAccountSpecificData;
      if (requestData?.accountSeason) {
        Object.entries(requestData?.accountSeason).forEach(([key, value]) => {
          const accountSeason: any = value;
          const endDate = accountSeason?.enddate;
          const startDate = accountSeason?.startdate;
          const contarctEndDate = moment(
            hasd?.accountSeason[hasd?.accountSeason?.length - 1]?.enddate
          )?.format("MM/DD/YYYY");
          const contractStartDate = moment(
            hasd?.accountSeason[0]?.startdate
          ).format("MM/DD/YYYY");
          if (
            !Utils.isBeforeDate(
              accountSeason?.startdate,
              accountSeason?.enddate
            ) &&
            requestData.offcycle != "Y"
          ) {
            if (!appContext?.user.isHotelUser) {
              appContext.rateRulesValidationdateMsg = "true";
            } else {
              appContext.rateRulesValidationdateMsg = "";
            }

            alert(
              "The season start date must be before the season end date for season " +
                accountSeason?.seasonid
            );
            return false;
          } else if (Utils.isOnOrAfterDate(endDate, contarctEndDate)) {
            if (!appContext?.user.isHotelUser) {
              appContext.rateRulesValidationdateMsg = "true";
            } else {
              appContext.rateRulesValidationdateMsg = "";
            }
            alert(
              "The end date must be on or before the contract end date. ( " +
                contarctEndDate +
                ") for season " +
                accountSeason?.seasonid
            );
            return false;
          } else if (Utils.isOnOrAfterDate(startDate, endDate)) {
            if (startDate !== "") {
              if (!appContext?.user.isHotelUser) {
                appContext.rateRulesValidationdateMsg = "true";
              } else {
                appContext.rateRulesValidationdateMsg = "";
              }
              alert(
                "The end date must be on or after the contract start date. ( " +
                  startDate +
                  ") for season " +
                  accountSeason?.seasonid
              );
              return false;
            }
          } else if (Utils.isOnOrBeforeDate(endDate, startDate)) {
            if (!appContext?.user.isHotelUser) {
              appContext.rateRulesValidationdateMsg = "true";
            } else {
              appContext.rateRulesValidationdateMsg = "";
            }
            alert(
              "The start date must be on or before the contract end date. ( " +
                endDate +
                ") for season " +
                accountSeason?.seasonid
            );
            return false;
          } else if (Utils.isOnOrAfterDate(contractStartDate, startDate)) {
            if (!appContext?.user.isHotelUser) {
              appContext.rateRulesValidationdateMsg = "true";
            } else {
              appContext.rateRulesValidationdateMsg = "";
            }
            alert(
              "The start date must be on or after the contract start date. ( " +
                contractStartDate +
                ") for season " +
                accountSeason?.seasonid
            );
            return false;
          }
        });
      }
    }
  };

  const updateRates = async (
    requestData,
    hotel_accountinfoid,
    hasd: any = {},
    users: any = {}
  ) => {
    appContext.setRulesPageIsSaving(true);
    const ratesStatus = "";
    const isValidDataBeforeSaveCheck = JSON.parse(
      localStorage.getItem("ratesTableValidData")
    );
    const isRedirect = requestData?.roompoolflags?.map((item) => {
      item.hotelAccountSpecificPGOOSData?.map((innerData) => {
        if (
          innerData?.pgoos === "N" &&
          !innerData?.removalreasonid &&
          users?.isAdminUser
        ) {
          alert(
            "Please select a removal reason for room pool group " +
              innerData?.roomClassSequence +
              " and room pool sequence " +
              innerData?.roomPoolSequence
          );
          return false;
        }
      });
    });
    if (
      users?.isAdminUser &&
      (!requestData?.percentdiscount || requestData?.percentdiscount == "")
    ) {
      requestData.percentdiscount = 0;
    }
    if (
      users?.hasLimitedHotels &&
      (parseInt(hasd?.ratetype_selected) === 18 ||
        parseInt(hasd?.ratetype_selected) === 20)
    ) {
      if (!requestData?.percentdiscount) {
        alert("The percent discount cannot be empty.");
      }
      if (hasd?.aer_account !== "Y") {
        if (parseInt(requestData?.percentdiscount) === 0) {
          alert("The percent discount must be minimum of 1%.");
        }
      }
    }

    if (isRedirect?.length === 0 || !isRedirect[0]) {
      // setPageLoader(true);
      const ratesObj = requestData.accountRates;
      const ratesArr = [];
      Object.keys(ratesObj).map((keys) => {
        if (ratesObj[keys].productid === "1") {
          ratesArr.push(ratesObj[keys].rate);
        }
      });

      const isValidRate = validateIfRatesAreValid(ratesObj, requestData);

      const isSelectedRateTypeGPP =
        requestData.ratetype_selected === 18 ? true : false;
      const isFloatAccAndDiscountExist =
        requestData.ratetype_selected === 20 &&
        requestData.percentdiscount !== "";

      if (
        isValidRate ||
        isSelectedRateTypeGPP ||
        parentContext?.ratesRulesStatus === "C" ||
        isFloatAccAndDiscountExist
      ) {
        const hotelspecificData = JSON.parse(
          localStorage.getItem("hotelAccountSpecificData")
        );
        if (
          hotelspecificData?.showrebid === "Y" &&
          (appContext.user.isHotelUser ||
            appContext.user.isLimitedSalesUser ||
            appContext?.user?.isSalesUser) &&
          parentContext?.ratesRulesStatus == "R" &&
          isValidDataBeforeSaveCheck?.accRateChg == "N" &&
          isValidDataBeforeSaveCheck?.altCxlPolicyChg == "N" &&
          isValidDataBeforeSaveCheck?.percentageChg == "N"
        ) {
          setRateRulesTick("R");
          appContext.rateRulesTick = "R";
          appContext.setRateRulesTick(appContext.rateRulesTick);
          if (parentContext?.hasOwnProperty("setRatesRulesStatus")) {
            parentContext?.setRatesRulesStatus("R");
          }

          if (appContext.eligibilitiesTick === "R") {
            appContext.setEligibilitiesTick("R");
            if (parentContext?.hasOwnProperty("setEligibilityStatus")) {
              parentContext?.setEligibilityStatus("R");
            }
          }

          if (
            (hotelspecificData?.hasaccountspecquests === "Y" ||
              (hotelspecificData?.groupmeetings === "Y" &&
                hotelspecificData?.hasgroupspecquests === "Y")) &&
            hotelspecificData?.allow_qmodify == "Y" &&
            appContext?.btgTick === "R"
          ) {
            appContext.btgTick = "R";
            appContext.setBtgTick(appContext.btgTick);
            if (parentContext?.hasOwnProperty("setBtgStatus")) {
              parentContext?.setBtgStatus("R");
            }
          }
        } else {
          const business_case = sessionStorage.getItem("bussinessCase");
          const prevbussinessCase = sessionStorage.getItem("prevbussinessCase");
          if (
            appContext?.user?.isHotelUser &&
            business_case == "Y" &&
            prevbussinessCase != business_case &&
            (requestData.hotelAccountSpecificFacility?.rm_nights == null ||
              requestData.hotelAccountSpecificFacility?.rm_nights == "")
          ) {
            if (parentContext?.ratesRulesStatus == "R") {
              appContext.rateRulesTick = "R";
              appContext.setRateRulesTick(appContext.rateRulesTick);
              if (parentContext?.hasOwnProperty("setRatesRulesStatus")) {
                parentContext?.setRatesRulesStatus("R");
              }
            }
          } else {
            if (appContext.eligibilitiesTick === "R") {
              appContext.setEligibilitiesTick("C");
              if (parentContext?.hasOwnProperty("setEligibilityStatus")) {
                parentContext?.setEligibilityStatus("C");
              }
            }
            if (
              hotelspecificData?.showrebid === "Y" &&
              (hotelspecificData?.hasaccountspecquests === "Y" ||
                (hotelspecificData?.groupmeetings === "Y" &&
                  hotelspecificData?.hasgroupspecquests === "Y")) &&
              hotelspecificData?.allow_qmodify == "Y" &&
              appContext?.btgTick === "R"
            ) {
              appContext.btgTick = "C";
              appContext.setBtgTick(appContext.btgTick);
              if (parentContext?.hasOwnProperty("setBtgStatus")) {
                parentContext?.setBtgStatus("C");
              }
            }
            setRateRulesTick("C");
            appContext.rateRulesTick = "C";
            appContext.setRateRulesTick(appContext.rateRulesTick);
            if (parentContext?.hasOwnProperty("setRatesRulesStatus")) {
              parentContext?.setRatesRulesStatus("C");
            }
          }
        }
      } else {
        setRateRulesTick("");
        appContext.setRateRulesTick("");
        if (parentContext?.hasOwnProperty("setRatesRulesStatus")) {
          parentContext?.setRatesRulesStatus("");
        }
      }

      let shouldUpdatePage = true;

      if (
        !isValidDataBeforeSaveCheck.isDateValid &&
        isValidDataBeforeSaveCheck.seasonChg == "Y" &&
        isValidDataBeforeSaveCheck.losChg == "N" &&
        isValidDataBeforeSaveCheck.fixedRateChg == "N" &&
        isValidDataBeforeSaveCheck.accRateChg == "N" &&
        isValidDataBeforeSaveCheck.rmNightsChg == "N" &&
        isValidDataBeforeSaveCheck.altCxlPolicyChg == "N" &&
        isValidDataBeforeSaveCheck.waiveEarlyChg == "N" &&
        isValidDataBeforeSaveCheck.roomFlagsPGOOSDataChg == "N" &&
        isValidDataBeforeSaveCheck.roomFlagsAcceptedChg == "N" &&
        isValidDataBeforeSaveCheck.roomFlagsLRAChg == "N" &&
        isValidDataBeforeSaveCheck.amenitiesExemptChg == "N" &&
        isValidDataBeforeSaveCheck.rulesChg == "N" &&
        isValidDataBeforeSaveCheck.percentageChg == "N"
      ) {
        shouldUpdatePage = false;
      } else if (
        !isValidDataBeforeSaveCheck.isLOSValid &&
        isValidDataBeforeSaveCheck.seasonChg == "N" &&
        isValidDataBeforeSaveCheck.losChg == "Y" &&
        isValidDataBeforeSaveCheck.fixedRateChg == "N" &&
        isValidDataBeforeSaveCheck.accRateChg == "N" &&
        isValidDataBeforeSaveCheck.rmNightsChg == "N" &&
        isValidDataBeforeSaveCheck.altCxlPolicyChg == "N" &&
        isValidDataBeforeSaveCheck.waiveEarlyChg == "N" &&
        isValidDataBeforeSaveCheck.roomFlagsPGOOSDataChg == "N" &&
        isValidDataBeforeSaveCheck.roomFlagsAcceptedChg == "N" &&
        isValidDataBeforeSaveCheck.roomFlagsLRAChg == "N" &&
        isValidDataBeforeSaveCheck.amenitiesExemptChg == "N" &&
        isValidDataBeforeSaveCheck.rulesChg == "N" &&
        isValidDataBeforeSaveCheck.percentageChg == "N"
      ) {
        shouldUpdatePage = false;
      } else if (
        !isValidDataBeforeSaveCheck.isLOSValid &&
        !isValidDataBeforeSaveCheck.isDateValid &&
        isValidDataBeforeSaveCheck.seasonChg == "Y" &&
        isValidDataBeforeSaveCheck.losChg == "Y" &&
        isValidDataBeforeSaveCheck.fixedRateChg == "N" &&
        isValidDataBeforeSaveCheck.accRateChg == "N" &&
        isValidDataBeforeSaveCheck.rmNightsChg == "N" &&
        isValidDataBeforeSaveCheck.altCxlPolicyChg == "N" &&
        isValidDataBeforeSaveCheck.waiveEarlyChg == "N" &&
        isValidDataBeforeSaveCheck.roomFlagsPGOOSDataChg == "N" &&
        isValidDataBeforeSaveCheck.roomFlagsAcceptedChg == "N" &&
        isValidDataBeforeSaveCheck.roomFlagsLRAChg == "N" &&
        isValidDataBeforeSaveCheck.amenitiesExemptChg == "N" &&
        isValidDataBeforeSaveCheck.rulesChg == "N" &&
        isValidDataBeforeSaveCheck.percentageChg == "N"
      ) {
        shouldUpdatePage = false;
      }
      const data = {
        strHasd: JSON.stringify({ [hotel_accountinfoid]: requestData }),
        hotel_accountinfoid,
      };
      if (shouldUpdatePage) {
        // setPageLoader(true);
        appContext.setIsPercentDiscountSaved(true);
        API.updateRatesandRules(data)
          .then((data) => {
            // setPageLoader(false);
            const hotelspecificData = JSON.parse(
              localStorage.getItem("hotelAccountSpecificData")
            );
            if (
              hotelspecificData?.showrebid === "Y" &&
              (appContext.user.isHotelUser ||
                appContext.user.isLimitedSalesUser ||
                appContext?.user?.isSalesUser) &&
              (isValidDataBeforeSaveCheck?.accRateChg == "Y" ||
                isValidDataBeforeSaveCheck?.altCxlPolicyChg == "Y" ||
                isValidDataBeforeSaveCheck?.percentageChg == "Y")
            ) {
              isValidDataBeforeSaveCheck.accRateChg = "N";
              isValidDataBeforeSaveCheck.altCxlPolicyChg = "N";
              isValidDataBeforeSaveCheck.percentageChg = "N";
              localStorage.setItem(
                "ratesTableValidData",
                JSON.stringify(isValidDataBeforeSaveCheck)
              );
            }
            getRatesData(hotel_accountinfoid);
          })
          .catch(() => {
            // setPageLoader(false);
          });
      } else {
        // setPageLoader(false);
        getRatesData(hotel_accountinfoid);
      }
    }
  };

  const validateIfRatesAreValid = (ratesObj, reData) => {
    const ratesLRAArrPoolWise = [];
    let isValidRate;
    const noOfRoomPools = reData.roompoolflags.length;
    const noOfLos = Object.entries(reData.accountLOS).length;
    const noOfSeasons = Object.entries(reData.accountSeason).length;
    if (
      (reData && noOfRoomPools && noOfSeasons && ratesObj) ||
      (reData && noOfRoomPools && noOfLos && ratesObj)
    ) {
      if (isRoomTypeThree(ratesObj)) {
        for (let j = 1; j <= noOfRoomPools; j++) {
          const ratesLRAArrSessionWise = [];
          for (let i = 1; i <= noOfLos; i++) {
            const newKey = [];
            newKey.push(1);
            newKey.push(i);
            newKey.push(j);
            newKey.push(1);
            newKey.push(3);
            const key = newKey.join("_");
            ratesLRAArrSessionWise.push(ratesObj[key]?.rate);
          }
          ratesLRAArrPoolWise.push(ratesLRAArrSessionWise);
        }
      } else {
        for (let j = 1; j <= noOfRoomPools; j++) {
          const ratesLRAArrSessionWise = [];
          for (let i = 1; i <= noOfSeasons; i++) {
            const newKey1 = [];
            newKey1.push(i);
            newKey1.push(1);
            newKey1.push(j);
            newKey1.push(1);
            newKey1.push(1);
            const key1 = newKey1.join("_");
            ratesLRAArrSessionWise.push(ratesObj[key1]?.rate);
            const newKey2 = [];
            newKey2.push(i);
            newKey2.push(1);
            newKey2.push(j);
            newKey2.push(1);
            newKey2.push(2);
            const key2 = newKey2.join("_");
            ratesLRAArrSessionWise.push(ratesObj[key2]?.rate);
          }
          ratesLRAArrPoolWise.push(ratesLRAArrSessionWise);
        }
      }
      const ratesCondition = (strValue) => strValue !== null;
      ratesLRAArrPoolWise.forEach((ratesLRASubArr) => {
        isValidRate =
          (ratesLRASubArr.length > 0 && ratesLRASubArr.every(ratesCondition)) ||
          isValidRate
            ? true
            : false;
      });
      return isValidRate;
    }
    return false;
  };

  const isRoomTypeThree = (ratesObj) => {
    return Object.keys(ratesObj).every((key) => ratesObj[key].roomtypeid === 3);
  };

  const ValidateDate = (strDate: string, iValidYear?: number) => {
    //is the date a valid date. format is mm/dd/yy or mm/dd/yyyy.
    let bError = false,
      sError;

    if (strDate != "") {
      const datearray = strDate?.split("/");
      if (datearray.length != 3) bError = true;

      const imonth = parseInt(datearray[0], 10);
      const iday = parseInt(datearray[1], 10);
      let iyear = parseInt(datearray[2], 10);

      if (isNaN(imonth) || isNaN(iday) || isNaN(iyear)) {
        if (typeof strDate != "undefined") {
          if (strDate != "") {
            sError = "";
            bError = true;
          }
        }
      } else {
        if (iyear < 100) iyear += 2000;
        if (imonth < 1 || imonth > 12) {
          sError = `Invalid month (${String(imonth)}). `;
          bError = true;
        }
        if (iday < 1 || iday > 31) {
          sError = `Invalid day ${String(iday)}. `;
          bError = true;
        }
        if (iValidYear) {
          if (iyear != iValidYear) {
            sError = `Invalid year ('${String(iyear)}'). `;
            bError = true;
          }
        }
        if (
          (imonth == 4 || imonth == 6 || imonth == 9 || imonth == 11) &&
          iday > 30
        ) {
          sError = "Day must be less than 30. ";
          bError = true;
        }
        if (imonth == 2 && ((iyear % 4 > 0 && iday > 28) || iday > 29)) {
          sError = "Day must be less than ";
          if (iyear % 4 > 0) sError += "28";
          else sError += "29";
          sError += ". ";
          bError = true;
        }
      }
    }
    if (bError) {
      appContext.rateRulesValidationErr = true;
      appContext.dateValidationMsg = `${sError}${strDate} is not a valid date. Please enter the date in the format mm/dd/yyyy`;
      alert(
        `${sError}${strDate} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
      return false;
    }
    appContext.dateValidationMsg = "";
    return true;
  };
  const handleCopySeasonsData = (
    params,
    rfpid,
    ratetype,
    acctype,
    hotel_accountinfoid
  ) => {
    setState({
      ...state,
      showNoReasonProvided: !state.showNoReasonProvided,
    });
    const dataCheck = JSON.parse(localStorage.getItem("ratesData"));
    dataCheck.ratetype_selected = ratetype;
    localStorage.setItem("ratesData", JSON.stringify(dataCheck));
    const dataCheck1 = JSON.parse(localStorage.getItem("ratesTableValidData"));
    dataCheck1.productOfferChanged = true;
    localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck1));
    API.updateCopySeasons(params, rfpid, ratetype, acctype, hotel_accountinfoid)
      .then(() => {
        API.updateProduct(accountInfoId, ratetype);
      })
      .then((data) => {
        getRatesData();
      });
  };
  const updateProductData = (rateType) => {
    const dataCheck = JSON.parse(localStorage.getItem("ratesData"));

    dataCheck.ratetype_selected = rateType;

    localStorage.setItem("ratesData", JSON.stringify(dataCheck));
    const dataCheck1 = JSON.parse(localStorage.getItem("ratesTableValidData"));
    dataCheck1.productOfferChanged = true;
    localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck1));
    API.updateProduct(accountInfoId, rateType).then((data) => {
      getRatesData();
    });
    if (!showcopyButton && rateType != 20) {
      setshowcopyButton(true);
    }
  };
  const copyGovAction = (hotel_accountinfoid, govCopyRates) => {
    API.copyGovAction(hotel_accountinfoid, govCopyRates).then((data) => {
      getRatesData();
    });
  };

  const componentUnload = () => {
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "browserAlert",
    });
  };

  const rateProgramContext = {
    state,
    setState,
    showPreviousCancellation,
    showNoReasonProvided,
    showNoReasonProvided1,
    showRemovalReason,
    getRatesData,
    ratesData,
    getRemovalReason,
    getRejectReason,
    removalReason,
    rejectReason,
    setShowRulesModal,
    showRulesModal,
    getPreviousRulesData,
    previousRulesData,
    previousRulesLoader,
    getQuickauditviewcancel,
    quickauditviewcancelLoader,
    quickauditviewcancelData,
    getPreviousRatesData,
    previousRatesData,
    previousRatesDataLoader,
    showRatesModal,
    setShowRatesModal,
    updateRates,
    showCancelModal,
    setShowCancelModal,
    pageLoader,
    updateProductData,
    ratesRequestPayload,
    setRatesRequestPayload,
    productOffered,
    setProductOffered,
    copyGovAction,
    setRatesData,
    handleValidateInput,
    handleDateValidation,
    handleCopySeasonsData,
    setPageLoader,
    ValidateDate,
    formEdited,
    setFormEdited,
    isFormChanged,
    setIsFormChanged,
    initialValidation,
    showcopyButton,
    setshowcopyButton,
    setInitialValidation,
    rateRulesTick,
    setRateRulesTick,
    componentUnload,
  };

  return (
    <RatesRulesContext.Provider value={rateProgramContext}>
      {props.children}
    </RatesRulesContext.Provider>
  );
};
export const RateProgramContextConsumer = RatesRulesContext.Consumer;
export default RatesRulesContext;
