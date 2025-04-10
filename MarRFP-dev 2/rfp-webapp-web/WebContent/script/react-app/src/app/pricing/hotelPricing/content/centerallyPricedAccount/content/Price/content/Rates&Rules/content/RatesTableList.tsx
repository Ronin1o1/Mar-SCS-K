import React, {
  useState,
  Fragment,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./RatesRules.css";
import moment from "moment";
import { isEmpty } from "lodash";
import _ from "lodash";
import copySeasonbtn from "../../../../../../../../../common/assets/img/button/btnCopySeasons.gif";
import { CRemovalReasonModal } from "../../../../../../../../../common/components/CRemovalReason";
import CPreviousCancellation from "../../../../../../../../../common/components/CPreviousCancellation";
import RatesRulesContext from "../context/RatesRulesContextProvider";
import Utils from "../../../../../../../../../common/utils/Utils";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import Settings from "../static/Settings";
import RatesAPI from "../service/API";

const convertArrayToObject = (array) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      ...item,
    };
  }, initialValue);
};

export function RatesTableList(props) {
  const [tableRows, setTableRows] = useState({} as any);
  const [showModal, setShowModal] = useState(false);
  const [dateChangeEdit, setdateChangeEdit] = useState(false);
  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);
  const [curstatus, setcurstatus] = useState("");
  const closeModal = () => setShowModal(false);
  const handleCloseRejectModal = () => setShowRejectReasonModal(false);
  const mountedHasdRef = useRef<any>();
  const history = useHistory();
  const urlParms = useLocation().search;
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const accountInfoid = new URLSearchParams(urlParms).get("AccountInfoId");
  const hotelName =
    new URLSearchParams(urlParms).get("hotelName") !== null
      ? new URLSearchParams(urlParms).get("hotelName")
      : history?.location?.hotelName;
  const hotelId =
    new URLSearchParams(urlParms).get("hotelrfpid") !== null
      ? new URLSearchParams(urlParms).get("hotelrfpid")
      : history?.location?.Hotelrfpid;
  const period = new URLSearchParams(urlParms).get("Period");
  const HotelIdData = new URLSearchParams(urlParms).get("HotelId");

  const [dynamicRows, setDynamicRows] = useState<any>([]);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext = useContext(AccountCenterTabsContext);
  const [changedAccRates, setChangedAccRates] = useState({
    sq: "",
    fieldName: "",
    idx: 0,
    validationCheck: false,
  });
  const [changedSeason, setChangedSeason] = useState({
    idx: 0,
    validationCheck: false,
    type: "",
    seasonId: 0,
  });
  const [changedLos, setChangedLos] = useState({
    idx: 0,
    validationCheck: false,
    losIndex: null,
    type: "",
  });

  const [removeReasonCurrentIndex, setRemoveReasonCurrentIndex] = useState({
    key: "",
    pgoosIndex: "",
    poolType: "",
    removalreasonid: "",
  });
  const [currentRejectReason, setcurrentRejectReason] = useState({
    key: "",
  });
  const [iIndex, setIIndex] = useState(0);
  const [losDisable, setLosDisable] = useState(false);
  const contextType = useContext(RatesRulesContext);
  const [isValidDate, setIsValidDate] = useState(true);
  const [initialValidation, setInitialValidation] = useState(false);
  const [newKey, setNewKey] = useState(Date.now());
  const [localTickState, setLocalTickState] = useState("");
  const [localRateEligTickState, setLocalRateEligTickState] = useState("");
  const [localBtAccTickState, setLocalBtAccTickState] = useState("");
  const localTickRef = React.useRef();
  localTickRef.current = localTickState;
  const localRateEligTickRef = React.useRef();
  localRateEligTickRef.current = localRateEligTickState;
  const localBtAccTickRef = React.useRef();
  localBtAccTickRef.current = localBtAccTickState;

  const hasd = tableRows?.hotelAccountSpecific?.hotelAccountSpecificData;
  //const hasvi = tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo;
  const hotel_accountinfoid = !props.isBTGroupPage
    ? hasd?.hotel_accountinfoid
    : props?.ratesData?.hotel_accountinfoid;
  parentContext?.setAltCxlPolicyTimeId &&
    parentContext?.setAltCxlPolicyTimeId(hasd?.altcxlpolicytimeid);
  // const setQueryParam = (name) => {
  //   const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  //     results = regex.exec(window.location.href);
  //   return results && results[2] ? decodeURI(results[2]) : '';
  // }
  const setRemoveReasonCurrentIndexOnChange = (data) => {
    setRemoveReasonCurrentIndex(data);
  };
  React.useEffect(() => {
    if (parentContext?.ratesRulesStatus) {
      setLocalTickState(parentContext?.ratesRulesStatus);
    }
  }, [parentContext?.ratesRulesStatus]);
  useEffect(() => {
    setLocalRateEligTickState(parentContext?.eligibilityStatus);
  }, [parentContext?.eligibilityStatus]);

  useEffect(() => {
    setLocalBtAccTickState(parentContext?.btgStatus);
  }, [parentContext?.btgStatus]);
  React.useEffect(() => {
    contextType?.getRemovalReason();
    contextType?.getRejectReason();
    return () => {
      //To avoid update call on browser back button
      if (history.action !== "POP") {
        unmountMethod();
        if (sessionStorage.getItem("rateRuleTabSwitch") == "true") {
          sessionStorage.setItem("rateRuleTabSwitch", "false");
        }
      } else {
        if (sessionStorage.getItem("rateRuleTabSwitch") == "true") {
          unmountMethod();
          sessionStorage.setItem("rateRuleTabSwitch", "false");
        }
        contextType.componentUnload();
      }
    };
  }, []);

  const unmountMethod = () => {
    if (props.isBTGroupPage) {
      const btRatesData = [];
      for (let step = 0; step < props.allHotelRatesLength; step++) {
        const btLocalData = localStorage.getItem(
          "ratesData_" + hotel_accountinfoid
        );
        const btData =
          btLocalData != undefined &&
          btLocalData != "undefined" &&
          btLocalData !== null
            ? JSON.parse(btLocalData)
            : undefined;
        if (btData) {
          btRatesData.push({ [btData.hotel_accountinfoid]: btData });
        }
      }
      //contextType.btRatesupdateRates(btRatesData, props.updateBTURL);
    } else {
      const reData = JSON.parse(localStorage.getItem("ratesData"));
      const dynamicRowItems = JSON.parse(
        localStorage.getItem("ratesDynamicRows")
      );
      const accountUpdateLOS = {};
      const accountUpdateSeason = {};
      const accountSeasonSave = {};
      const accountUpdateRates = {};
      const accountUpdateFixedRates = {};

      const emptySeasonIndexCheck = dynamicRowItems
        .map((f, i) => {
          if (
            f.accountSeason.startdate == "" ||
            f.accountSeason.enddate == ""
          ) {
            return i;
          }
        })
        .filter((field) => !!field);

      if (emptySeasonIndexCheck.length > 0) {
        emptySeasonIndexCheck.forEach((idx) => {
          dynamicRowItems.splice(idx, 1);
        });
      }

      dynamicRowItems.slice().forEach((item, index) => {
        item.accountSeason.seasonid = index + 1;
        item.accountSeason.name = item.accountSeason.seasonid.toString();
        Object.assign(accountUpdateSeason, {
          [item.accountSeason.seasonid]: {
            ...item.accountSeason,
          },
        });

        Object.entries(item.accountLOS).forEach(([key, los], losIndex) => {
          const seasonKey = key.split("_")[0];
          const prevKey = key;
          const regex = new RegExp(seasonKey);
          key = key.replace(regex, item.accountSeason.seasonid.toString());
          item.accountLOS[key] = los;
          if (item.accountLOS[prevKey] && prevKey !== key) {
            delete item.accountLOS[prevKey];
          }
          if (item.accountLOS[key].hasOwnProperty("isRoomNightsFromChanged")) {
            delete item.accountLOS[key].isRoomNightsFromChanged;
          }
          if (item.accountLOS[key].hasOwnProperty("isRoomNightsToChanged")) {
            delete item.accountLOS[key].isRoomNightsToChanged;
          }
        });
        Object.assign(accountUpdateLOS, {
          ...item.accountLOS,
        });
        Object.entries(item.accountRates).forEach(
          ([key, accRates], accRatesIndex) => {
            const seasonKey = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(seasonKey);
            key = key.replace(regex, item.accountSeason.seasonid.toString());
            item.accountRates[key] = accRates;
            item.accountRates[key].seasonid = item.accountSeason.seasonid;
            if (item.accountRates[prevKey] && prevKey !== key) {
              delete item.accountRates[prevKey];
            }
            if (item.accountRates[key].rate == "") {
              item.accountRates[key].rate = null;
            }
            if (item.accountRates[key].required) {
              delete item.accountRates[key].required;
            }
          }
        );
        Object.assign(accountUpdateRates, {
          ...item.accountRates,
        });
        Object.entries(item.fixedRates).forEach(
          ([key, fixdRates], fixdRatesIndex) => {
            const seasonKey = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(seasonKey);
            key = key.replace(regex, item.accountSeason.seasonid.toString());
            item.fixedRates[key] = fixdRates;
            item.fixedRates[key].seasonid = item.accountSeason.seasonid;
            if (item.fixedRates[prevKey] && prevKey !== key) {
              delete item.fixedRates[prevKey];
            }
            if (item.fixedRates[key].rate == "") {
              item.fixedRates[key].rate = null;
            }
          }
        );
        Object.assign(accountUpdateFixedRates, {
          ...item.fixedRates,
        });
      });
      const accountRatesUpdate = localStorage.getItem("ratesDataAccountRates")
        ? JSON.parse(localStorage.getItem("ratesDataAccountRates"))
        : reData.accountRates;
      const fixedRatesUpdate = localStorage.getItem("ratesDatafixedRates")
        ? JSON.parse(localStorage.getItem("ratesDatafixedRates"))
        : reData.fixedRates;
      reData.accountSeason = accountUpdateSeason;
      reData.accountLOS = accountUpdateLOS;
      reData.accountRates = accountUpdateRates;
      reData.fixedRates = accountUpdateFixedRates;

      const mountedHasd = mountedHasdRef?.current
        ? mountedHasdRef?.current?.hotelAccountSpecific
            ?.hotelAccountSpecificData
        : {};

      updateRates(
        reData,
        reData?.hotel_accountinfoid,
        mountedHasd,
        appContext?.user
      );
      localStorage.removeItem("ratesDataAccountRates");
      localStorage.removeItem("ratesDatafixedRates");

      const param = {
        marshaCode: marshaCode,
        hotelName:
          history.location.accountSpecDetail != null
            ? history.location.accountSpecDetail.hotelname
            : hotelName || history.location.HotelName,
        hotelrfpid:
          history.location.Hotelrfpid != null
            ? history.location.Hotelrfpid
            : hotelId,
        period: period,
        hotel_accountinfoid: accountInfoid,
      };
    }
  };
  React.useEffect(() => {
    if (appContext.rateruleData) {
      const requestData = {
        ...contextType.ratesRequestPayload[hotel_accountinfoid],
        hotelAccountSpecificFacility: {
          rm_nights:
            appContext.rateruleData.hotelAccountSpecific
              ?.hotelAccountSpecificData?.rm_nights,
        },
      };

      contextType.setRatesRequestPayload({
        [hotel_accountinfoid]: requestData,
      });

      setNewKey(Date.now());

      setTableRows(appContext.rateruleData);
      const accountStatus =
        appContext.rateruleData.hotelAccountSpecific?.hotelAccountSpecificData
          ?.accountStatus;
      if (accountStatus == "" || accountStatus == "S") {
        setLosDisable(true);
      }

      mountedHasdRef.current = appContext.rateruleData;
      const tRowData =
        appContext.rateruleData?.hotelAccountSpecific?.hotelAccountSpecificData;
      const hasvid =
        appContext.rateruleData?.hotelAccountSpecific
          ?.hotelAccountSpecificViewInfo;

      const accountSeasonCloned = tRowData?.accountSeason?.slice();
      let dynamicSeasons = [];
      if (accountSeasonCloned) {
        dynamicSeasons = accountSeasonCloned?.map((season, index) => {
          season.accountLOS = {};
          season.fixedRates = {};
          season.accountRates = {};
          season.roompoolflags = [{ hotelAccountSpecificPGOOSData: [] }];
          season.accountSeason = {
            startdate: season.startdate
              ? moment
                  .utc(season.startdate)
                  .tz(Settings.labels.timeZone)
                  .format("MM/DD/YYYY") == "Invalid date"
                ? season.startdate
                : !props.isBTGroupPage
                ? moment(season.startdate, "MM/DD/YYYY", true).isValid() ||
                  moment(season.startdate, "M/D/YYYY", true).isValid()
                  ? season.startdate
                  : moment
                      .utc(season.startdate)
                      .tz(Settings.labels.timeZone)
                      .format("MM/DD/YYYY")
                : season.startdate
              : "",
            enddate: season.enddate
              ? moment
                  .utc(season.enddate)
                  .tz(Settings.labels.timeZone)
                  .format("MM/DD/YYYY") == "Invalid date"
                ? season.enddate
                : !props.isBTGroupPage
                ? moment(season.enddate, "MM/DD/YYYY", true).isValid() ||
                  moment(season.enddate, "M/D/YYYY", true).isValid()
                  ? season.enddate
                  : moment
                      .utc(season.enddate)
                      .tz(Settings.labels.timeZone)
                      .format("MM/DD/YYYY")
                : season.enddate
              : "",
            hotelrfpid: season.hotelrfpid,
            rfpseasonid: season.rfpseasonid,
            roomNights: season.roomNights,
            seasonid: season.seasonid,
          };
          tRowData?.accountLOS?.slice().forEach((los, losItemIndex) => {
            season.accountLOS[
              season.accountSeason.seasonid + "_" + los.lengthofstayid
            ] = {
              ...los,
            };

            tRowData?.roompoollist
              ?.slice()
              .forEach((roompool, roompoolItemIndex) => {
                tRowData?.lranlratype
                  ?.slice()
                  .forEach((lra, lratypeItemIndex) => {
                    tRowData?.roomtypelist
                      ?.slice()
                      .forEach((rtype, roomtypeItemndex) => {
                        const ratekey =
                          season.seasonid +
                          "_" +
                          los.lengthofstayid +
                          "_" +
                          roompool.seq +
                          "_" +
                          lra.productid +
                          "_" +
                          rtype.roomtypeid;
                        let isRequired = "N";
                        if (lra.required === "Y" && roompool.required === "Y") {
                          isRequired = "Y";
                        }
                        if (
                          tRowData?.accountRates !== null &&
                          tRowData?.accountRates[ratekey]
                        ) {
                          season.accountRates[ratekey] = {
                            ...tRowData?.accountRates[ratekey],
                          };
                          season.accountRates[ratekey].required = isRequired;
                        } else {
                          season.accountRates[ratekey] = {
                            formattedRate: "",
                            required: isRequired,
                            lengthofstayid: los[Settings.keys.lengthofstayid],
                            productid: lra.productid,
                            rate: "",
                            roompool: roompool.seq,
                            roomtypeid: rtype.roomtypeid,
                            seasonid: season.accountSeason.seasonid,
                          };
                        }
                        [];

                        // if (lra.productid == 1 || lra.productid == "1") {
                        //   if (tRowData?.fixedRates[ratekey]) {
                        //     season.fixedRates[ratekey] = {
                        //       ...tRowData?.fixedRates[ratekey],
                        //     };
                        //   } else {
                        //     season.fixedRates[ratekey] = {
                        //       productid: lra.productid,
                        //       rate: "",
                        //       roomtypeid: rtype.roomtypeid,
                        //       formattedRate: "",
                        //       lengthofstayid: los[Settings.keys.lengthofstayid],
                        //       roompool: roompool.seq,
                        //       seasonid: season.accountSeason.seasonid,
                        //     };
                        //   }
                        // }
                      });
                  });
              });
          });
          return season;
        });
      }
      setDynamicRows([...dynamicSeasons]);
    }
  }, [appContext.rateruleData]);

  React.useEffect(() => {
    setTableRows(props.ratesData);
    const accountStatus =
      props.ratesData.hotelAccountSpecific?.hotelAccountSpecificData
        ?.accountStatus;
    if (accountStatus == "" || accountStatus == "S") {
      setLosDisable(true);
    }

    mountedHasdRef.current = props.ratesData;
    const tRowData =
      props.ratesData?.hotelAccountSpecific?.hotelAccountSpecificData;
    const hasvid =
      props.ratesData?.hotelAccountSpecific?.hotelAccountSpecificViewInfo;

    const accountSeasonCloned = tRowData?.accountSeason?.slice();
    let dynamicSeasons = [];
    if (accountSeasonCloned) {
      dynamicSeasons = accountSeasonCloned?.map((season, index) => {
        season.accountLOS = {};
        season.fixedRates = {};
        season.accountRates = {};
        season.roompoolflags = [{ hotelAccountSpecificPGOOSData: [] }];
        season.accountSeason = {
          startdate: season.startdate
            ? moment
                .utc(season.startdate)
                .tz(Settings.labels.timeZone)
                .format("MM/DD/YYYY") == "Invalid date"
              ? season.startdate
              : !props.isBTGroupPage
              ? moment(season.startdate, "MM/DD/YYYY", true).isValid() ||
                moment(season.startdate, "M/D/YYYY", true).isValid()
                ? season.startdate
                : moment
                    .utc(season.startdate)
                    .tz(Settings.labels.timeZone)
                    .format("MM/DD/YYYY")
              : season.startdate
            : "",
          enddate: season.enddate
            ? moment
                .utc(season.enddate)
                .tz(Settings.labels.timeZone)
                .format("MM/DD/YYYY") == "Invalid date"
              ? season.enddate
              : !props.isBTGroupPage
              ? moment(season.enddate, "MM/DD/YYYY", true).isValid() ||
                moment(season.enddate, "M/D/YYYY", true).isValid()
                ? season.enddate
                : moment
                    .utc(season.enddate)
                    .tz(Settings.labels.timeZone)
                    .format("MM/DD/YYYY")
              : season.enddate
            : "",
          hotelrfpid: season.hotelrfpid,
          rfpseasonid: season.rfpseasonid,
          roomNights: season.roomNights,
          seasonid: season.seasonid,
        };
        tRowData?.accountLOS?.slice().forEach((los, losItemIndex) => {
          season.accountLOS[season.seasonid + "_" + los.lengthofstayid] = {
            ...los,
          };

          tRowData?.roompoollist
            ?.slice()
            .forEach((roompool, roompoolItemIndex) => {
              tRowData?.lranlratype
                ?.slice()
                .forEach((lra, lratypeItemIndex) => {
                  tRowData?.roomtypelist
                    ?.slice()
                    .forEach((rtype, roomtypeItemndex) => {
                      const ratekey =
                        season.seasonid +
                        "_" +
                        los.lengthofstayid +
                        "_" +
                        roompool.seq +
                        "_" +
                        lra.productid +
                        "_" +
                        rtype.roomtypeid;
                      let isRequired = "N";
                      if (lra.required === "Y" && roompool.required === "Y") {
                        isRequired = "Y";
                      }
                      if (
                        tRowData?.accountRates !== null &&
                        tRowData?.accountRates[ratekey]
                      ) {
                        season.accountRates[ratekey] = {
                          ...tRowData?.accountRates[ratekey],
                        };
                        season.accountRates[ratekey].required = isRequired;
                      } else {
                        season.accountRates[ratekey] = {
                          formattedRate: "",
                          required: isRequired,
                          lengthofstayid: los[Settings.keys.lengthofstayid],
                          productid: lra.productid,
                          rate: "",
                          roompool: roompool.seq,
                          roomtypeid: rtype.roomtypeid,
                          seasonid: season.accountSeason.seasonid,
                        };
                      }

                      // if (lra.productid == 1 || lra.productid == "1") {
                      //   if (tRowData?.fixedRates[ratekey]) {
                      //     season.fixedRates[ratekey] = {
                      //       ...tRowData?.fixedRates[ratekey],
                      //     };
                      //   } else {
                      //     season.fixedRates[ratekey] = {
                      //       productid: lra.productid,
                      //       rate: "",
                      //       roomtypeid: rtype.roomtypeid,
                      //       formattedRate: "",
                      //       lengthofstayid: los[Settings.keys.lengthofstayid],
                      //       roompool: roompool.seq,
                      //       seasonid: season.accountSeason.seasonid,
                      //     };
                      //   }
                      // }
                    });
                });
            });
        });
        return season;
      });
    }
    setDynamicRows([...dynamicSeasons]);
  }, [props.ratesData]);

  React.useEffect(() => {
    const rates = {};
    const sessions = {};
    const defaultAccountLos = {};
    const fixedRates = {};

    const tData = tableRows.hotelAccountSpecific?.hotelAccountSpecificData;
    const hasvi = tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo;
    const hotel_accountinfoid = props.isBTGroupPage
      ? props.ratesData?.hotel_accountinfoid
      : tData?.hotel_accountinfoid;

    if (props.isBTGroupPage && hotel_accountinfoid) {
      localStorage.setItem(
        "ratesDynamicRows_" + hotel_accountinfoid,
        JSON.stringify(dynamicRows)
      );
    } else {
      localStorage.setItem("ratesDynamicRows", JSON.stringify(dynamicRows));
      const accountLatestSeason = [];
      const accountLatestLOS = [];
      const accountLatestFixedRates = {};
      const accountLatestRates = {};
      dynamicRows.slice().forEach((item, index) => {
        item.accountSeason.seasonid = index + 1;
        item.accountSeason.name = item.accountSeason.seasonid.toString();
        accountLatestSeason.push(item.accountSeason);
        if (index === 0) {
          Object.entries(item.accountLOS).forEach(([key, value], i) => {
            accountLatestLOS.push(value);
          });
        }

        Object.assign(accountLatestRates, {
          ...item.accountRates,
        });

        Object.assign(accountLatestFixedRates, {
          ...item.fixedRates,
        });
      });
      const mergeData = JSON.parse(sessionStorage.getItem("getRatesdata"));
      mergeData.hotelAccountSpecific.hotelAccountSpecificData.accountLOS =
        accountLatestLOS;
      mergeData.hotelAccountSpecific.hotelAccountSpecificData.accountRates =
        accountLatestRates;
      mergeData.hotelAccountSpecific.hotelAccountSpecificData.accountSeason =
        accountLatestSeason;
      mergeData.hotelAccountSpecific.hotelAccountSpecificData.fixedRates = "";
      sessionStorage.setItem("getRatesdata", JSON.stringify(mergeData));
    }

    const temp: any[] = [];
    dynamicRows.map((rowItem, index) => {
      Object.entries(rowItem?.accountRates).forEach(([key, value]) => {
        Object.assign(rates, {
          [key]: value,
        });
        temp.push({
          [key]: value,
        });
      });

      // Object.entries(rowItem?.accountRates).forEach(([key, value]) => {
      //   value["idx"] >= 0
      //     ? console.log(
      //         "ss",
      //         Object.assign(rates, {
      //           [key]: value,
      //         }),
      //         temp.push({
      //           [key]: value,
      //         })
      //       )
      //     : console.log("no");
      // });

      Object.entries(rowItem?.fixedRates).forEach(([key, value]) => {
        value["idx"] >= 0
          ? console.log(
              "ss",
              Object.assign(fixedRates, {
                [key]: value,
              }),
              temp.push({
                [key]: value,
              })
            )
          : console.log("no");
      });

      Object.assign(defaultAccountLos, { ...rowItem?.accountLOS });
      const accountSes = {
        [index + 1]: rowItem?.accountSeason,
      };
      Object.assign(sessions, accountSes);
    });

    const mergedArray: any = {
      ...contextType.ratesRequestPayload[hotel_accountinfoid]?.accountSeason,
      ...sessions,
    };

    const sessMarray = [];
    for (const key in mergedArray) {
      sessMarray.push(Object.assign(mergedArray[key], { name: key }));
    }
    const sessionAccnoutLos = {};
    const existsData = defaultAccountLos["1_1"];
    sessMarray?.map((sessionItem) => {
      Object.assign(sessionAccnoutLos, {
        [sessionItem?.seasonid + "_" + existsData?.lengthofstayid]: {
          hotelrfpid: null,
          lengthofstayid:
            (existsData?.lengthofstayid && existsData?.lengthofstayid == "") ||
            existsData?.lengthofstayid == null
              ? 1
              : existsData?.lengthofstayid,
          rfplosid: existsData?.rfplosid,
          roomnightsfrom: existsData?.roomnightsfrom,
          roomnightsto: existsData?.roomnightsto,
        },
      });
    });
    const getLocalStoreData: any = JSON.parse(
      localStorage.getItem("ratesData")
    );
    const requestData = {
      ...contextType.ratesRequestPayload[hotel_accountinfoid],
      accountRates: isEmpty(rates)
        ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData?.accountRates
        : {
            ...contextType.ratesRequestPayload[hotel_accountinfoid]
              ?.accountRates,
            ...rates,
          },
      accountSeason: {
        ...sessions,
      },
      accountLOS:
        hasvi?.rategridLOSwidth > 0
          ? {
              ...contextType.ratesRequestPayload[hotel_accountinfoid]
                ?.accountLOS,
              ...tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.accountLOS,
            }
          : tData?.ratetype_selected === 18 || tData?.ratetype_selected === 20
          ? {}
          : sessionAccnoutLos,
      compareRates: tData?.compareRates,
      accountRules:
        getLocalStoreData?.accountRules?.length > 0
          ? getLocalStoreData?.accountRules
          : tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.accountRules,
      fixedRates: isEmpty(fixedRates)
        ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData?.fixedRates
        : {
            ...contextType.ratesRequestPayload[hotel_accountinfoid]?.fixedRates,
            ...fixedRates,
          },

      hotelAccountSpecificFacility: {
        rm_nights:
          contextType.ratesRequestPayload[hotel_accountinfoid]
            ?.hotelAccountSpecificFacility?.rm_nights || hasd?.rm_nights,
      },
      percentdiscount:
        contextType.ratesRequestPayload[hotel_accountinfoid]?.percentdiscount ||
        tData?.percentdiscount,
      rebid_due: tData?.rebid_due,
      rebid_notes: tData?.rebid_notes,
      rebidstatus: tData?.rebidstatus,
      waiveblackouts: tData?.waiveblackouts,
      markComplete: tData?.markComplete,
      rebidRound: tData?.rebidRound,
      salesContact: tData?.salesContact,
      isLocked: tData?.isLocked,
      ratetype_selected: tData?.ratetype_selected,
      offcycle: tData?.offcycle,
      accountpricingtype: tData?.accountpricingtype,
      hotelid: tData?.hotelid,
      hotelrfpid: tData?.hotelrfpid,
      hotel_accountinfoid: tData?.hotel_accountinfoid,
      accountrecid: tData?.accountrecid,
      extendcancelpolicy: tData?.tData?.accountrecid,
      altcxlpolicytimeid:
        tableRows?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.altcxlpolicytimeid,
      rollover: tData?.rollover,
      waiveearlycharge:
        contextType.ratesRequestPayload[hotel_accountinfoid]
          ?.waiveearlycharge || tData?.waiveearlycharge,
      roompoolflags: tableRows?.hotelAccountSpecific?.hotelAccountSpecificData
        ?.roompooldetails || [{ hotelAccountSpecificPGOOSData: [] }],
      altcancelpolicyoptionid:
        tableRows?.hotelAccountSpecific?.hotelAccountSpecificData
          ?.altcancelpolicyoptionid,
      hotelAccountSpecificAccountFlags: {
        amenities_exempt:
          hasd?.hotelAccountSpecificAccountFlags?.amenities_exempt,
      },
      showcopyButton: contextType?.showcopyButton,
    };
    if (!props.isBTGroupPage) {
      contextType.setRatesRequestPayload({
        [hotel_accountinfoid]: requestData,
      });
      setInitialValidation(true);
    }

    if (props.isBTGroupPage && hotel_accountinfoid) {
      localStorage.setItem(
        "ratesData_" + hotel_accountinfoid,
        JSON.stringify(requestData)
      );

      const btData = requestData;
      if (btData && hotel_accountinfoid) {
        let index = 0;
        if (props.btMergeData?.length > 0) {
          for (let i = 0; i < props.btMergeData.length; i++) {
            const item = props.btMergeData[i];
            if (item) {
              const key = Object.keys(item);
              if (key[0] == hotel_accountinfoid) {
                index = i;
                break;
              } else {
                index = -1;
              }
            } else {
              index = -1;
            }
          }
          if (index == -1) {
            props.btMergeData.push({ [hotel_accountinfoid]: btData });
          } else {
            props.btMergeData[index][hotel_accountinfoid] = btData;
          }
        } else {
          props.btMergeData.push({ [hotel_accountinfoid]: btData });
        }
      }

      // if (props.allHotelRatesLength === props.btMergeData?.length) {
      contextType.setRatesRequestPayload({
        ...convertArrayToObject(props.btMergeData),
      });
      // }
    } else {
      if (tableRows?.hotelAccountSpecific?.hotelAccountSpecificData) {
        localStorage.setItem(
          "ratesData",
          JSON.stringify(
            tableRows.hotelAccountSpecific.hotelAccountSpecificData
          )
        );
        //add parent context variable
      } else {
        localStorage.setItem("ratesData", JSON.stringify(requestData));
      }
    }
  }, [
    dynamicRows,
    tableRows.hotelAccountSpecific?.hotelAccountSpecificData?.accountLOS,
    contextType.ratesRequestPayload[hotel_accountinfoid]?.altcxlpolicytimeid,
  ]);

  React.useEffect(() => {
    if (!props.isBTGroupPage) {
      const mergeData = JSON.parse(sessionStorage.getItem("getRatesdata"));
      mergeData.hotelAccountSpecific.hotelAccountSpecificData.showcopyButton =
        contextType?.showcopyButton;
      sessionStorage.setItem("getRatesdata", JSON.stringify(mergeData));
    }
  }, [contextType?.showcopyButton]);

  React.useEffect(() => {
    if (props.isBTGroupPage && hotel_accountinfoid) {
      localStorage.setItem(
        "ratesData_" + hotel_accountinfoid,
        JSON.stringify(contextType.ratesRequestPayload[hotel_accountinfoid])
      );
    } else {
      localStorage.setItem(
        "ratesData",
        JSON.stringify(
          contextType.ratesRequestPayload[hotel_accountinfoid] ||
            contextType.ratesRequestPayload
        )
      );

      const reData =
        contextType.ratesRequestPayload[hotel_accountinfoid] ||
        contextType.ratesRequestPayload;

      const mergeData1 = JSON.parse(sessionStorage.getItem("getRatesdata"));
      Object.entries(
        mergeData1?.hotelAccountSpecific?.hotelAccountSpecificData
      ).forEach(([key, value], index) => {
        if (
          key !== "accountLOS" &&
          key !== "accountSeason" &&
          key !== "accountRates" &&
          key !== "fixedRates" &&
          key != "showcopyButton"
        ) {
          if (reData?.hasOwnProperty(key)) {
            mergeData1.hotelAccountSpecific.hotelAccountSpecificData[key] =
              reData[key];
            if (
              key == "hotelAccountSpecificFacility" &&
              mergeData1?.hotelAccountSpecific?.hotelAccountSpecificData?.hasOwnProperty(
                "rm_nights"
              )
            ) {
              mergeData1.hotelAccountSpecific.hotelAccountSpecificData.rm_nights =
                reData[key]?.rm_nights && reData[key]?.rm_nights;
            }
          } else if (key == "roompooldetails" && reData?.roompoolflags) {
            mergeData1.hotelAccountSpecific.hotelAccountSpecificData[key] =
              reData?.roompoolflags;
          }
        }
      });
      sessionStorage.setItem("getRatesdata", JSON.stringify(mergeData1));
    }
  }, [contextType.ratesRequestPayload[hotel_accountinfoid]]);

  React.useEffect(() => {
    if (initialValidation) {
      validatePage();
      setInitialValidation(false);
    }
  }, [initialValidation]);

  const handleAddRows = (seasonIndex) => {
    const totalRowData =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.accountSeason;
    const accRowData =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData;
    const maxSeasons =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo?.maxSeasons;
    dynamicRows.forEach((item, i) => {
      if (dynamicRows.length > 1) {
        if (!item.clickCount) {
          item.clickCount = 0;
        }
        if (i == dynamicRows.length - 1 && item.clickCount > 0) {
          item.clickCount = 0;
        }
      } else {
        item.clickCount = 0;
      }
    });
    let clickCount = dynamicRows[seasonIndex].clickCount
      ? dynamicRows[seasonIndex].clickCount
      : 0;
    clickCount++;
    dynamicRows[seasonIndex].clickCount = clickCount;
    if (dynamicRows.length >= maxSeasons) {
      alert("You may enter a maximum of " + maxSeasons + ".");
    } else {
      const newSeasonId = dynamicRows[seasonIndex].accountSeason.seasonid + 1;
      let newSeasonEndDate =
        moment(
          tableRows.hotelAccountSpecific?.hotelAccountSpecificData?.contractend,
          "MM/DD/YYYY",
          true
        ).isValid() ||
        moment(
          tableRows.hotelAccountSpecific?.hotelAccountSpecificData?.contractend,
          "M/D/YYYY",
          true
        ).isValid()
          ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend
          : moment
              .utc(
                tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                  ?.contractend
              )
              .tz(Settings.labels.timeZone)
              .format("MM/DD/YYYY");
      if (dynamicRows[seasonIndex].clickCount === 1) {
        newSeasonEndDate =
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "MM/DD/YYYY",
            true
          ).isValid() ||
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "M/D/YYYY",
            true
          ).isValid()
            ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractend
            : moment
                .utc(
                  tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                    ?.contractend
                )
                .tz(Settings.labels.timeZone)
                .format("MM/DD/YYYY");
        const cntrctEnd =
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "MM/DD/YYYY",
            true
          ).isValid() ||
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "M/D/YYYY",
            true
          ).isValid()
            ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractend
            : moment
                .utc(
                  tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                    ?.contractend
                )
                .tz(Settings.labels.timeZone)
                .format("MM/DD/YYYY");
        if (dynamicRows[seasonIndex].accountSeason.enddate !== cntrctEnd) {
          newSeasonEndDate = "";
        }
      } else {
        newSeasonEndDate = "";
      }
      const item = {
        accountRates: {},
        fixedRates: {},
        clickCount: 0,
        accountSeason: {
          enddate: newSeasonEndDate,
          hotelrfpid: null,
          name: newSeasonId,
          rfpseasonid: null,
          roomNights: null,
          seasonid: newSeasonId,
          startdate: "",
        },
        accountLOS: {},
        roompoolflags: [{ hotelAccountSpecificPGOOSData: [] }],
      };
      dynamicRows.splice(seasonIndex + 1, 0, item);
      if (dynamicRows.length > 0) {
        setIIndex(iIndex + 1);
      }
      dynamicRows.forEach((item, index) => {
        item.accountSeason.seasonid = index + 1;
        if (index === seasonIndex + 1) {
          item.accountLOS = {};
          item.accountRates = {};
          item.fixedRates = {};
          Object.entries(dynamicRows[seasonIndex]["accountLOS"]).forEach(
            ([key, los], i) => {
              item.accountLOS[
                item.accountSeason.seasonid +
                  "_" +
                  los[Settings.keys.lengthofstayid]
              ] = Object.assign({}, los);
              accRowData[Settings.keys.roompoollist]
                .slice()
                .forEach((roompool) => {
                  accRowData[Settings.keys.lranlratype]
                    .slice()
                    .forEach((lra) => {
                      accRowData["roomtypelist"].slice().forEach((rtype) => {
                        const ratekey =
                          item.accountSeason.seasonid +
                          "_" +
                          los[Settings.keys.lengthofstayid] +
                          "_" +
                          roompool.seq +
                          "_" +
                          lra.productid +
                          "_" +
                          rtype.roomtypeid;
                        let isRequired = false;
                        if (lra.required === "Y" && roompool.required === "Y") {
                          isRequired = true;
                        }
                        item.accountRates[ratekey] = {
                          formattedRate: "",
                          required: isRequired ? "Y" : "N",
                          lengthofstayid: los[Settings.keys.lengthofstayid],
                          productid: lra.productid,
                          rate: "",
                          roompool: roompool.seq,
                          roomtypeid: rtype.roomtypeid,
                          seasonid: item.accountSeason.seasonid,
                        };
                        item.fixedRates[ratekey] = {
                          productid: lra.productid,
                          rate: "",
                          roomtypeid: rtype.roomtypeid,
                          formattedRate: "",
                          lengthofstayid: los[Settings.keys.lengthofstayid],
                          roompool: roompool.seq,
                          seasonid: item.accountSeason.seasonid,
                        };
                      });
                    });
                });
            }
          );
        } else {
          Object.entries(item.accountLOS).forEach(([key, value], i) => {
            const prevSeasonid = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(prevSeasonid);
            key = key.replace(regex, item.accountSeason.seasonid);
            item.accountLOS[key] = value;
            if (item.accountLOS[prevKey] && prevKey !== key) {
              delete item.accountLOS[prevKey];
            }
          });
          Object.entries(item.accountRates).forEach(([key, value], i) => {
            const prevSeasonid = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(prevSeasonid);
            key = key.replace(regex, item.accountSeason.seasonid);
            item.accountRates[key] = value;
            item.accountRates[key].seasonid = item.accountSeason.seasonid;
            if (item.accountRates[prevKey] && prevKey !== key) {
              delete item.accountRates[prevKey];
            }
          });
          Object.entries(item.fixedRates).forEach(([key, value], i) => {
            const prevSeasonid = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(prevSeasonid);
            key = key.replace(regex, item.accountSeason.seasonid);
            item.fixedRates[key] = value;
            if (item.fixedRates[key]?.seasonid) {
              item.fixedRates[key].seasonid = item.accountSeason.seasonid;
            }
            if (item.fixedRates[prevKey] && prevKey !== key) {
              delete item.fixedRates[prevKey];
            }
          });
        }
      });
      const temp = [...dynamicRows];
      setDynamicRows([...temp]);
    }
  };

  const handleRemoveRows = (index) => {
    const dynamicTableRows = [...dynamicRows];
    if (confirm(Settings.alerts.deleteSeason)) {
      if (dynamicTableRows.length > 1) {
        const prevIndexEndDate =
          index !== 0
            ? dynamicTableRows[index - 1].accountSeason.enddate
            : dynamicTableRows[index + 1].accountSeason.enddate;
        dynamicTableRows.splice(index, 1);
        dynamicTableRows[dynamicTableRows.length - 1].accountSeason.enddate =
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "MM/DD/YYYY",
            true
          ).isValid() ||
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "M/D/YYYY",
            true
          ).isValid()
            ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractend
            : moment
                .utc(
                  tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                    ?.contractend
                )
                .tz(Settings.labels.timeZone)
                .format("MM/DD/YYYY");
        dynamicTableRows[dynamicTableRows.length - 1].enddate =
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "MM/DD/YYYY",
            true
          ).isValid() ||
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "M/D/YYYY",
            true
          ).isValid()
            ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractend
            : moment
                .utc(
                  tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                    ?.contractend
                )
                .tz(Settings.labels.timeZone)
                .format("MM/DD/YYYY");
        if (index && dynamicTableRows[index]) {
          dynamicTableRows[index].accountSeason.startdate =
            Utils.getNext(prevIndexEndDate);
          dynamicTableRows[index].startdate = Utils.getNext(prevIndexEndDate);
        }
        if (
          (dynamicTableRows.length === 1 &&
            dynamicTableRows[dynamicTableRows.length - 1].accountSeason
              .startdate === "") ||
          index === 0
        ) {
          dynamicTableRows[0].accountSeason.startdate =
            moment(
              tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractstart,
              "MM/DD/YYYY",
              true
            ).isValid() ||
            moment(
              tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractstart,
              "M/D/YYYY",
              true
            ).isValid()
              ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                  ?.contractstart
              : moment
                  .utc(
                    tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                      ?.contractstart
                  )
                  .tz(Settings.labels.timeZone)
                  .format("MM/DD/YYYY");
          dynamicTableRows[0].startdate =
            moment(
              tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractstart,
              "MM/DD/YYYY",
              true
            ).isValid() ||
            moment(
              tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractstart,
              "M/D/YYYY",
              true
            ).isValid()
              ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                  ?.contractstart
              : moment
                  .utc(
                    tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                      ?.contractstart
                  )
                  .tz(Settings.labels.timeZone)
                  .format("MM/DD/YYYY");
        }
        dynamicTableRows.forEach((season, index) => {
          season.seasonid = index + 1;
          Object.entries(season?.accountLOS).forEach(([key, value], ind) => {
            const prevSeasonid = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(prevSeasonid);
            key = key.replace(regex, season.seasonid);
            season.accountLOS[key] = value;
            if (season.accountLOS[prevKey] && prevKey !== key) {
              delete season.accountLOS[prevKey];
            }
          });
          Object.entries(season?.accountRates).forEach(([key, value], i) => {
            const prevSeasonid = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(prevSeasonid);
            key = key.replace(regex, season.seasonid);
            season.accountRates[key] = value;
            season.accountRates[key].seasonid = season.seasonid;
            if (season.accountRates[prevKey] && prevKey !== key) {
              delete season.accountRates[prevKey];
            }
          });
          Object.entries(season?.fixedRates).forEach(([key, value], i) => {
            const prevSeasonid = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(prevSeasonid);
            key = key.replace(regex, season.seasonid);
            season.fixedRates[key] = value;
            season.fixedRates[key].seasonid = season.seasonid;
            if (season.fixedRates[prevKey] && prevKey !== key) {
              delete season.fixedRates[prevKey];
            }
          });
        });

        setDynamicRows([...dynamicTableRows]);
        if (!props.isBTGroupPage) {
          const dataCheck = JSON.parse(
            localStorage.getItem("ratesTableValidData")
          );
          dataCheck.seasonChg = "Y";
          localStorage.setItem(
            "ratesTableValidData",
            JSON.stringify(dataCheck)
          );
        }
      } else {
        alert(Settings.alerts.atleasetOneSeason);
      }
    }
  };

  const addLosOnClick = (losIndex, seasonIndex) => {
    const dynamicTableRows = [...dynamicRows];
    const hotelLosList = { ...dynamicTableRows[seasonIndex].accountLOS };
    const accRowData =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData;
    const hotelLosListLength = Object.entries(hotelLosList).length;
    const maxLOS =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo?.maxLOS;
    if (hotelLosListLength >= maxLOS) {
      alert(Settings.alerts.maxSeason + maxLOS + Settings.keys.losTiers);
      return;
    } else {
      const item = Object.entries(hotelLosList)[losIndex][1];
      let newStayId = item[Settings.keys.lengthofstayid] + 1;
      const stayIdToBeAdded = item[Settings.keys.lengthofstayid] + 1;
      const prevTo = item[Settings.keys.roomNightsTo];
      let newFrom = "";
      let newTo = "";

      if (prevTo == 255 || prevTo == "") {
        newFrom = "";
      } else if (prevTo < 255 && prevTo !== "") {
        newFrom = prevTo + 1;
        newTo = "";
      }
      item[Settings.keys.roomNightsTo] = prevTo;
      let losKey =
        dynamicTableRows[seasonIndex].accountSeason.seasonid + "_" + newStayId;
      while (hotelLosList.hasOwnProperty(losKey)) {
        const tempObj = Object.assign({}, hotelLosList[losKey]);
        hotelLosList[losKey] = {
          rfplosid: null,
          hotelrfpid: null,
          lengthofstayid: newStayId,
          roomnightsfrom: newFrom,
          roomnightsto: newTo,
          isRoomNightsFromChanged: false,
          isRoomNightsToChanged: false,
        };
        newFrom = tempObj.roomnightsfrom;
        if (newTo === "") {
          newFrom = "";
        }
        newTo = tempObj.roomnightsto;
        tempObj.lengthofstayid = parseInt(newStayId) + 1;
        newStayId++;
        losKey =
          dynamicTableRows[seasonIndex].accountSeason.seasonid +
          "_" +
          newStayId;
      }
      if (!hotelLosList.hasOwnProperty(losKey)) {
        const newTo = "255";
        hotelLosList[losKey] = {
          rfplosid: null,
          hotelrfpid: null,
          lengthofstayid: newStayId,
          roomnightsfrom: newFrom,
          roomnightsto: newTo,
          isRoomNightsFromChanged: false,
          isRoomNightsToChanged: false,
        };
        const prevLosKey =
          dynamicTableRows[seasonIndex].accountSeason.seasonid +
          "_" +
          (parseInt(losKey.split("_")[1]) - 1).toString();
        if (hotelLosList[prevLosKey].roomnightsto < 255) {
          hotelLosList[prevLosKey].roomnightsto =
            hotelLosList[prevLosKey].roomnightsto;
        } else {
          hotelLosList[prevLosKey].roomnightsto = "";
        }
        if (hotelLosList[prevLosKey].roomnightsto == "") {
          hotelLosList[losKey].roomnightsfrom = "";
        }
        if (newStayId !== Object.entries(hotelLosList).length) {
          hotelLosList[losKey].roomnightsto = "";
        }
      }
      dynamicTableRows.forEach((item) => {
        item.accountLOS = {};
        Object.entries(hotelLosList).forEach(([key, los]) => {
          item.accountLOS[
            item.accountSeason.seasonid +
              "_" +
              los[Settings.keys.lengthofstayid]
          ] = Object.assign({}, los);

          if (los[Settings.keys.lengthofstayid] === stayIdToBeAdded) {
            accRowData[Settings.keys.roompoollist]
              .slice()
              .forEach((roompool) => {
                accRowData[Settings.keys.lranlratype].slice().forEach((lra) => {
                  accRowData["roomtypelist"].slice().forEach((rtype) => {
                    let ratekey =
                      item.accountSeason.seasonid +
                      "_" +
                      los[Settings.keys.lengthofstayid] +
                      "_" +
                      roompool.seq +
                      "_" +
                      lra.productid +
                      "_" +
                      rtype.roomtypeid;
                    let isRequired = false;
                    let newLosId = los[Settings.keys.lengthofstayid];
                    if (lra.required === "Y" && roompool.required === "Y") {
                      isRequired = true;
                    }
                    let newFormatteRate = "";
                    let newRate = "";
                    let newRequired = isRequired ? "Y" : "N";
                    let newProductId = lra.productid;
                    let newRoompool = roompool.seq;
                    let newRoomTypeid = rtype.roomtypeid;
                    let newSeasonId = item.accountSeason.seasonid;

                    while (item.accountRates[ratekey]) {
                      const tempRateObj = Object.assign(
                        {},
                        { ...item.accountRates[ratekey] }
                      );
                      if (lra.required === "Y" && roompool.required === "Y") {
                        isRequired = true;
                      }
                      item.accountRates[ratekey] = {
                        formattedRate: newFormatteRate,
                        required: newRequired,
                        lengthofstayid: parseInt(newLosId),
                        productid: newProductId,
                        rate: newRate,
                        roompool: newRoompool,
                        roomtypeid: newRoomTypeid,
                        seasonid: newSeasonId,
                      };
                      tempRateObj.lengthofstayid = parseInt(newLosId) + 1;
                      newFormatteRate = tempRateObj.formattedRate;
                      newRequired = tempRateObj.required;
                      newProductId = tempRateObj.productid;
                      newRate = tempRateObj.rate;
                      newRoompool = tempRateObj.roompool;
                      newRoomTypeid = tempRateObj.roomtypeid;
                      newSeasonId = tempRateObj.seasonid;
                      newLosId++;
                      ratekey =
                        item.accountSeason.seasonid +
                        "_" +
                        newLosId +
                        "_" +
                        roompool.seq +
                        "_" +
                        lra.productid +
                        "_" +
                        rtype.roomtypeid;
                    }
                    if (!item.accountRates[ratekey]) {
                      if (lra.required === "Y" && roompool.required === "Y") {
                        isRequired = true;
                      }
                      item.accountRates[ratekey] = {
                        formattedRate: newFormatteRate,
                        required: newRequired,
                        lengthofstayid: parseInt(newLosId),
                        productid: newProductId,
                        rate: newRate,
                        roompool: newRoompool,
                        roomtypeid: newRoomTypeid,
                        seasonid: newSeasonId,
                      };
                    }

                    if (lra.productid == "1" || lra.productid == 1) {
                      let fixedRateKey =
                        item.accountSeason.seasonid +
                        "_" +
                        los[Settings.keys.lengthofstayid] +
                        "_" +
                        roompool.seq +
                        "_" +
                        lra.productid +
                        "_" +
                        rtype.roomtypeid;

                      let newProuctIdforFR = lra.productid;
                      let newRateforFR = "";
                      let newRoomtypeifForFR = rtype.roomtypeid;
                      let newLosIdforFR = los[Settings.keys.lengthofstayid];
                      let newFormattedRateforFR = "";
                      let newSeasonIdForFR = item.accountSeason.seasonid;
                      let newRoompoolForFR = roompool.seq;

                      while (item.fixedRates[fixedRateKey]) {
                        const tempFixedRateObj = Object.assign(
                          {},
                          { ...item.fixedRates[fixedRateKey] }
                        );

                        item.fixedRates[fixedRateKey] = {
                          productid: newProuctIdforFR,
                          rate: newRateforFR,
                          roomtypeid: newRoomtypeifForFR,
                          formattedRate: newFormattedRateforFR,
                          lengthofstayid: parseInt(newLosIdforFR),
                          roompool: newRoompoolForFR,
                          seasonid: newSeasonIdForFR,
                        };
                        tempFixedRateObj.lengthofstayid =
                          parseInt(newLosIdforFR) + 1;
                        newProuctIdforFR = tempFixedRateObj.productid;
                        newRateforFR = tempFixedRateObj.rate;
                        newRoomtypeifForFR = tempFixedRateObj.roomtypeid;
                        newFormattedRateforFR = tempFixedRateObj.formattedRate;
                        newRoompoolForFR = tempFixedRateObj.roompool;
                        newSeasonIdForFR = tempFixedRateObj.seasonid;

                        newLosIdforFR++;
                        fixedRateKey =
                          item.accountSeason.seasonid +
                          "_" +
                          newLosIdforFR +
                          "_" +
                          roompool.seq +
                          "_" +
                          lra.productid +
                          "_" +
                          rtype.roomtypeid;
                      }
                      if (!item.fixedRates[fixedRateKey]) {
                        item.fixedRates[fixedRateKey] = {
                          productid: newProuctIdforFR,
                          rate: newRateforFR,
                          roomtypeid: newRoomtypeifForFR,
                          formattedRate: newFormattedRateforFR,
                          lengthofstayid: parseInt(newLosIdforFR),
                          roompool: newRoompoolForFR,
                          seasonid: newSeasonIdForFR,
                        };
                      }
                    }
                  });
                });
              });
          }
        });
      });

      setDynamicRows([...dynamicTableRows]);
    }
  };

  const handleLOSAddRows = () => {
    const los =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.accountLOS;
    if (los.length >= 4) {
      alert("You may enter a maximum of 4 length of stay tiers.");
    } else {
      const losRow = {
        rfplosid: null,
        hotelrfpid: null,
        lengthofstayid: 1,
        roomnightsfrom: null,
        roomnightsto: 255,
      };
      const updatedList = los?.map((item) => {
        if (parseInt(item.roomnightsto) === 255) {
          return { ...item, roomnightsto: "" };
        }
        return item; // else return unmodified item
      });
      losRow.lengthofstayid =
        updatedList[updatedList.length - 1].lengthofstayid + 1;
      const insertRow = updatedList?.concat(losRow);
      setTableRows({
        ...tableRows,
        hotelAccountSpecific: {
          ...tableRows.hotelAccountSpecific,
          hotelAccountSpecificData: {
            ...tableRows.hotelAccountSpecific.hotelAccountSpecificData,
            accountLOS: insertRow,
          },
        },
      });
    }
  };

  const delRoomPoolForLos = (hotelRoomPoolList, losKey, stayId) => {
    Object.entries(hotelRoomPoolList).forEach(([key, value], rpIndex) => {
      const splitKey = key.split("_");
      const losSplittedKey = losKey.split("_");
      const nextRpKey =
        splitKey[0] +
        "_" +
        (parseInt(splitKey[1]) + 1) +
        "_" +
        splitKey[2] +
        "_" +
        splitKey[3] +
        "_" +
        splitKey[4];
      if (splitKey[1] == losSplittedKey[1]) {
        delete hotelRoomPoolList[key];
        if (hotelRoomPoolList[nextRpKey]) {
          hotelRoomPoolList[key] = Object.assign(
            {},
            hotelRoomPoolList[nextRpKey]
          );
          if (stayId !== null) {
            hotelRoomPoolList[key][Settings.keys.lengthofstayid] = stayId;
          }
        }
      }
    });
    return hotelRoomPoolList;
  };

  const delLosOnClick = (index, seasonIndex) => {
    const dynamicTableRows = [...dynamicRows];
    const hotelLosList = { ...dynamicTableRows[seasonIndex].accountLOS };
    const accRowData =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData;

    let accountRatesList = { ...dynamicTableRows[seasonIndex].accountRates };
    let fixedRatesList = { ...dynamicTableRows[seasonIndex].fixedRates };
    if (confirm(Settings.alerts.deleteLosTiers)) {
      const hotelLosListLength = Object.entries(hotelLosList).length;
      if (hotelLosListLength > 1) {
        let losKey = Object.entries(hotelLosList)[index][0];
        let stayId = parseInt(losKey.split("_")[1]);
        const seasonid = parseInt(losKey.split("_")[0]);
        if (hotelLosListLength > 1) {
          let counter = hotelLosListLength - stayId;
          while (counter > 0) {
            const nextKey = seasonid + "_" + (stayId + 1).toString();
            let prevKey = "";
            if (stayId !== 0) {
              prevKey = seasonid + "_" + (stayId - 1).toString();
            }
            delete hotelLosList[losKey];
            dynamicTableRows.forEach((season, index) => {
              const splittedKey = losKey.split("_");
              const seasonLosKey = season.seasonid + "_" + splittedKey[1];
              if (index !== seasonIndex) {
                season.accountRates = delRoomPoolForLos(
                  season.accountRates,
                  seasonLosKey,
                  stayId
                );
                season.fixedRates = delRoomPoolForLos(
                  season.fixedRates,
                  seasonLosKey,
                  stayId
                );
              } else {
                accountRatesList = delRoomPoolForLos(
                  accountRatesList,
                  seasonLosKey,
                  stayId
                );
                fixedRatesList = delRoomPoolForLos(
                  fixedRatesList,
                  seasonLosKey,
                  stayId
                );
              }
            });
            hotelLosList[losKey] = Object.assign({}, hotelLosList[nextKey]);
            hotelLosList[losKey][Settings.keys.lengthofstayid] = stayId;
            if (hotelLosList[prevKey][Settings.keys.roomNightsTo] < 255) {
              hotelLosList[losKey][Settings.keys.roomNightsFrom] =
                typeof hotelLosList[prevKey][Settings.keys.roomNightsTo] ==
                "string"
                  ? parseInt(
                      hotelLosList[prevKey][Settings.keys.roomNightsTo]
                    ) + 1
                  : hotelLosList[prevKey][Settings.keys.roomNightsTo] + 1;
            }
            losKey = nextKey;
            stayId++;
            counter--;
          }
          const lastKey = seasonid + "_" + Object.entries(hotelLosList).length;
          const prevOfLastKey =
            seasonid +
            "_" +
            (Object.entries(hotelLosList).length - 1).toString();
          if (index === Object.entries(hotelLosList).length - 1) {
            hotelLosList[prevOfLastKey][Settings.keys.roomNightsTo] = 255;
          }
          delete hotelLosList[lastKey];
          dynamicTableRows.forEach((season, index) => {
            const splitLastKey = lastKey.split("_");
            const seasonLastKey =
              season.accountSeason.seasonid + "_" + splitLastKey[1];
            if (index !== seasonIndex) {
              season.accountRates = delRoomPoolForLos(
                season.accountRates,
                seasonLastKey,
                null
              );
              season.fixedRates = delRoomPoolForLos(
                season.fixedRates,
                seasonLastKey,
                null
              );
            } else {
              accountRatesList = delRoomPoolForLos(
                accountRatesList,
                seasonLastKey,
                null
              );
              fixedRatesList = delRoomPoolForLos(
                fixedRatesList,
                seasonLastKey,
                null
              );
            }
          });
          dynamicTableRows[seasonIndex].accountLOS = Object.assign(
            {},
            hotelLosList
          );
          dynamicTableRows[seasonIndex].accountRates = Object.assign(
            {},
            accountRatesList
          );
          dynamicTableRows[seasonIndex].fixedRates = Object.assign(
            {},
            fixedRatesList
          );
        }

        dynamicTableRows.forEach((season, index) => {
          if (index !== seasonIndex) {
            season.accountLOS = {};
            Object.entries(hotelLosList).forEach(([key, los], i) => {
              if (season.accountSeason.seasonid === dynamicTableRows.length) {
                if (
                  los[Settings.keys.lengthofstayid] ==
                  Object.entries(hotelLosList).length
                ) {
                  if (los[Settings.keys.roomNightsTo] == 255) {
                    season.accountLOS[
                      season.accountSeason.seasonid +
                        "_" +
                        los[Settings.keys.lengthofstayid]
                    ] = Object.assign({}, los);
                    season.accountLOS[
                      season.accountSeason.seasonid +
                        "_" +
                        los[Settings.keys.lengthofstayid]
                    ][Settings.keys.roomNightsTo] = 255;
                  }
                } else {
                  season.accountLOS[
                    season.accountSeason.seasonid +
                      "_" +
                      los[Settings.keys.lengthofstayid]
                  ] = Object.assign({}, los);
                }
              } else {
                season.accountLOS[
                  season.accountSeason.seasonid +
                    "_" +
                    los[Settings.keys.lengthofstayid]
                ] = Object.assign({}, los);
              }
            });
          }
        });

        setDynamicRows([...dynamicTableRows]);
        if (!props.isBTGroupPage) {
          const dataCheck = JSON.parse(
            localStorage.getItem("ratesTableValidData")
          );
          dataCheck.losChg = "Y";
          localStorage.setItem(
            "ratesTableValidData",
            JSON.stringify(dataCheck)
          );
        }
      }
    }
  };

  const handleLOSRemoveRows = (idx) => {
    appContext.rateRulesStayTierMsg = "";
    if (
      window.confirm(
        "Are you sure you want to delete this LOS Tier?\n\nPress OK to delete the LOS Tier.\nPress Cancel to leave the LOS Tier."
      )
    ) {
      if (
        tableRows.hotelAccountSpecific.hotelAccountSpecificData.accountLOS
          ?.length === 1
      ) {
        if (appContext.user.isHotelUser) {
          appContext.rateRulesStayTierMsg = "true";
          appContext.rateRulesAllValidationMsg =
            "You must have at least one length of stay tier.";
        } else {
          appContext.rateRulesStayTierMsg = "";
          appContext.rateRulesAllValidationMsg = "";
        }
        alert("You must have at least one length of stay tier.");
      } else {
        const temp = [
          ...tableRows.hotelAccountSpecific.hotelAccountSpecificData.accountLOS,
        ];
        const losId = temp[idx].lengthofstayid;
        let tempAccountRow =
          tableRows.hotelAccountSpecific.hotelAccountSpecificData.accountRates;
        let tempFixedRow =
          tableRows.hotelAccountSpecific.hotelAccountSpecificData.fixedRates;
        tempAccountRow = Object.keys(tempAccountRow).reduce((r, k) => {
          if (tempAccountRow[k].lengthofstayid != losId)
            r[k] = Object.assign({}, tempAccountRow[k]);
          return r;
        }, {});
        tempFixedRow = Object.keys(tempFixedRow).reduce((r, k) => {
          if (tempFixedRow[k].lengthofstayid != losId)
            r[k] = Object.assign({}, tempFixedRow[k]);
          return r;
        }, {});
        temp.splice(idx, 1);
        const lastObject = temp[temp.length - 1];
        lastObject.roomnightsto = 255;
        temp[temp.length - 1] = lastObject;

        setTableRows({
          ...tableRows,
          hotelAccountSpecific: {
            ...tableRows.hotelAccountSpecific,
            hotelAccountSpecificData: {
              ...tableRows.hotelAccountSpecific.hotelAccountSpecificData,
              accountLOS: temp,
              fixedRates: tempFixedRow,
              accountRates: tempAccountRow,
            },
          },
        });

        contextType.setRatesRequestPayload({
          ...contextType.ratesRequestPayload,
          [hotel_accountinfoid]: {
            ...contextType.ratesRequestPayload[hotel_accountinfoid],
            accountLOS: temp,
          },
        });
        localStorage.setItem(
          "ratesDataAccountRates",
          JSON.stringify(tempAccountRow)
        );
        localStorage.setItem(
          "ratesDatafixedRates",
          JSON.stringify(tempFixedRow)
        );
      }
    }
  };

  const updateRates = async (
    requestData,
    hotel_accountinfoid,
    hasd: any = {},
    users: any = {}
  ) => {
    let ratesStatus = "";
    const isValidDataBeforeSaveCheck = JSON.parse(
      localStorage.getItem("ratesTableValidData")
    );
    const isRedirect = requestData?.roompoolflags?.map((item) => {
      item.hotelAccountSpecificPGOOSData?.map((innerData) => {
        if (innerData?.pgoos === "N" && !innerData?.removalreasonid) {
        }
      });
    });
    if (
      (users?.isPASAdmin || users.isSalesUser) &&
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

    if (
      isRedirect?.length === 0 ||
      (isRedirect?.length > 0 && !isRedirect[0])
    ) {
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
          localTickRef.current == "R" &&
          isValidDataBeforeSaveCheck?.accRateChg == "N" &&
          isValidDataBeforeSaveCheck?.altCxlPolicyChg == "N" &&
          isValidDataBeforeSaveCheck?.percentageChg == "N"
        ) {
          ratesStatus = "R";
          parentContext?.setRatesRulesStatus("R");
          appContext.rateRulesTick = "R";
          appContext.setRateRulesTick(appContext.rateRulesTick);

          if (localRateEligTickRef.current === "R") {
            parentContext.eligibilityStatus = "R";
            parentContext?.setEligibilityStatus(
              parentContext.eligibilityStatus
            );
            appContext.eligibilitiesTick = "R";
            appContext.setEligibilitiesTick(appContext.eligibilitiesTick);
          }

          if (
            (hotelspecificData?.hasaccountspecquests === "Y" ||
              (hotelspecificData?.groupmeetings === "Y" &&
                hotelspecificData?.hasgroupspecquests === "Y")) &&
            hotelspecificData?.allow_qmodify == "Y" &&
            localBtAccTickRef.current === "R"
          ) {
            parentContext.btgStatus = "R";
            parentContext?.setBtgStatus(parentContext.btgStatus);
            appContext.btgTick = "R";
            appContext.setBtgTick(appContext.btgTick);
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
            if (localTickRef.current == "R") {
              ratesStatus = "R";
              parentContext?.setRatesRulesStatus("R");
              appContext.rateRulesTick = "R";
              appContext.setRateRulesTick(appContext.rateRulesTick);
            }
          } else {
            if (localRateEligTickRef.current === "R") {
              appContext.eligibilitiesTick = "C";
              appContext.setEligibilitiesTick(appContext.eligibilitiesTick);
              parentContext.eligibilityStatus = "C";
              parentContext?.setEligibilityStatus(
                parentContext.eligibilityStatus
              );
            }
            if (
              hotelspecificData?.showrebid === "Y" &&
              (hotelspecificData?.hasaccountspecquests === "Y" ||
                (hotelspecificData?.groupmeetings === "Y" &&
                  hotelspecificData?.hasgroupspecquests === "Y")) &&
              hotelspecificData?.allow_qmodify == "Y" &&
              localBtAccTickRef.current === "R"
            ) {
              parentContext.btgStatus = "C";
              parentContext?.setBtgStatus(parentContext.btgStatus);
              appContext.btgTick = "C";
              appContext.setBtgTick(appContext.btgTick);
            }
            ratesStatus = "C";
            parentContext?.setRatesRulesStatus("C");
            appContext.rateRulesTick = "C";
            appContext.setRateRulesTick(appContext.rateRulesTick);
          }
        }
      } else {
        ratesStatus = "";
        parentContext?.setRatesRulesStatus("");
        appContext.setRateRulesTick("");
      }

      let calcstatus = "";

      const newStatus = sessionStorage.getItem("tabratesStatusnew");
      const changedRates = sessionStorage.getItem("changedRates");
      const changedAmenities = sessionStorage.getItem("changedAmenities");
      const changedQuestions = sessionStorage.getItem("changedQuestions");
      const isrebid = sessionStorage.getItem("isrebid");

      if (curstatus !== null && curstatus !== "") {
        if (curstatus != "C" && newStatus != "C" && curstatus != newStatus) {
          calcstatus = "A";
        }
      } else {
        if (curstatus != null && curstatus != "") {
          if (curstatus != "C" && newStatus != "C" && curstatus != newStatus) {
            calcstatus = "A";
          }
        } else if (newStatus == "C" && curstatus == "A") {
          if (isrebid == "true") {
            if (
              changedRates == "true" ||
              changedAmenities == "true" ||
              changedQuestions == "true"
            )
              calcstatus = "C";
            else if (changedAmenities == "true" || changedQuestions == "true")
              calcstatus = "B";
            else calcstatus = "A";
          } else calcstatus = "T";
        } else if (newStatus == "C" && curstatus == "T") {
          if (!changedRates) calcstatus = "B";
          else calcstatus = "A";
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
      } else if (
        isValidDataBeforeSaveCheck.seasonChg == "N" &&
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
        isValidDataBeforeSaveCheck.productOfferChanged &&
        isValidDataBeforeSaveCheck.seasonChg == "N" &&
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
      }

      const data = {
        strHasd: JSON.stringify({ [hotel_accountinfoid]: requestData }),
        hotel_accountinfoid,
      };

      if (shouldUpdatePage) {
        appContext.setIsUpdatingRules(true);
        await RatesAPI.updateRatesandRules(data)
          .then((data) => {
            appContext.setIsUpdatingRules(false);
            const param = {
              marshaCode: marshaCode,
              hotelName:
                history.location.accountSpecDetail != null
                  ? history.location.accountSpecDetail.hotelname
                  : hotelName || history.location.HotelName,
              hotelrfpid:
                history.location.Hotelrfpid != null
                  ? history.location.Hotelrfpid
                  : hotelId,
              period: period,
              hotel_accountinfoid: accountInfoid,
            };
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
            // contextType.setPageLoader(false);
          })
          .catch(() => {
            // contextType.setPageLoader(false);
          });
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

  const handleBlurRoomNightSto = (event, idx) => {
    appContext.rateRulesLOSMsg = "";
    const los =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.accountLOS;

    const nextKey = idx + 1;
    const sto = event.target.value;
    const temp = [...los];

    if (parseInt(sto) > 255) {
      if (appContext.user.isHotelUser) {
        appContext.rateRulesLOSMsg = "true";
        appContext.rateRulesAllValidationMsg =
          "The LOS to must be less than or equal to 255";
      } else {
        appContext.rateRulesLOSMsg = "";
        appContext.rateRulesAllValidationMsg = "";
      }
      alert("The LOS to must be less than or equal to 255");
      return false;
    }
    if (parseInt(sto) == null || parseInt(sto) == 0) {
      if (idx === 0) {
        alert("You must enter a least one length of stay tier");
        temp[idx].roomnightsto = 255;
      }
    }

    if (parseInt(sto) === 255) {
      for (let i = idx + 1; i < 5; i++) {
        temp.splice(i, 1);
      }
    }
    if (parseInt(sto) < 255) {
      temp[nextKey].roomnightsfrom = parseInt(sto) + 1;
    }
    setTableRows({
      ...tableRows,
      hotelAccountSpecific: {
        ...tableRows.hotelAccountSpecific,
        hotelAccountSpecificData: {
          ...tableRows.hotelAccountSpecific.hotelAccountSpecificData,
          accountLOS: temp,
        },
      },
    });
  };
  const handleChangeRoomnightSto = (event, idx) => {
    const los =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.accountLOS;
    const sto = event.target.value;

    const temp = [...los];
    if (parseInt(sto) === 255) {
      for (let i = idx + 1; i < 5; i++) {
        temp.splice(i, 1);
      }
    }
    temp[idx].roomnightsto = sto;
    setTableRows({
      ...tableRows,
      hotelAccountSpecific: {
        ...tableRows.hotelAccountSpecific,
        hotelAccountSpecificData: {
          ...tableRows.hotelAccountSpecific.hotelAccountSpecificData,
          accountLOS: temp,
        },
      },
    });
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
  };

  const onLosChangeHandler = (event, losIndex, key, seasonIndex) => {
    const dynamicTableRows = [...dynamicRows];
    const hotelLosList = { ...dynamicTableRows[seasonIndex].accountLOS };
    Object.entries(hotelLosList).forEach(([keys, item], index) => {
      if (key === Settings.keys.roomNightsFrom) {
        item[Settings.keys.isRoomNightsFromChanged] = false;
      } else {
        item[Settings.keys.isRoomNightsToChanged] = false;
      }
      if (index === losIndex) {
        if (event.target.value !== item[key]) {
          item[key] = event.target.value;
          if (key === Settings.keys.roomNightsFrom) {
            item[Settings.keys.isRoomNightsFromChanged] = true;
          } else {
            item[Settings.keys.isRoomNightsToChanged] = true;
          }
          dynamicTableRows[seasonIndex].accountLOS[keys] = item;
          setDynamicRows([...dynamicTableRows]);
        }
      }
    });
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.losChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
    setChangedLos({
      ...changedLos,
      idx: seasonIndex,
      validationCheck: true,
      type: key,
      losIndex: losIndex,
    });
  };

  const updateSeasonList = (seasonList, hotelLosList) => {
    seasonList.forEach((season) => {
      Object.entries(hotelLosList).forEach(([key, los], index) => {
        season.accountLOS[
          season.accountSeason.seasonid +
            "_" +
            los[Settings.keys.lengthofstayid]
        ] = Object.assign({}, los);
      });
      if (lengthOf(season.accountLOS) !== lengthOf(hotelLosList)) {
        const diffKey = findDifflLosKeyInSeason(
          hotelLosList,
          season.accountLOS
        );
        diffKey.forEach((k) => {
          const diffLosKey = season.accountSeason.seasonid + "_" + k;
          if (season.accountLOS.hasOwnProperty(diffLosKey)) {
            delete season.accountLOS[diffLosKey];
          }
        });
      }
    });
    setDynamicRows([...seasonList]);
  };

  const updateLosNext = (event, losKey, losIndex, seasonIndex, seasonKey) => {
    let iReturn;
    iReturn = false;
    let strErrMsg = "";
    const iTo = event.target.value;
    const dynamicTableRows = [...dynamicRows];
    const hotelLosList = { ...dynamicTableRows[seasonIndex].accountLOS };
    if (hotelLosList[losKey].isRoomNightsToChanged) {
      const toField = typeof iTo == "string" ? parseInt(iTo) : iTo;
      if (toField == null || toField == 0) {
        if (losIndex === 0) {
          if (
            changedLos.idx == seasonIndex &&
            changedLos.losIndex == losIndex &&
            changedLos.type == Settings.keys.roomNightsTo &&
            changedLos.validationCheck == true
          ) {
            strErrMsg = Settings.alerts.oneLosTierRequired;
            alert(strErrMsg);
            hotelLosList[losKey].roomnightsto = 255;
            if (!props.isBTGroupPage) {
              const dataCheck = JSON.parse(
                localStorage.getItem("ratesTableValidData")
              );
              dataCheck.isLOSValid = true;
              dataCheck.losChg = "Y";
              localStorage.setItem(
                "ratesTableValidData",
                JSON.stringify(dataCheck)
              );
            }
            setChangedLos({
              ...changedLos,
              validationCheck: false,
            });
          }
        }
        updateSeasonList(dynamicTableRows, hotelLosList);
        iReturn = true;
      } else if (iTo > 255) {
        if (
          changedLos.idx == seasonIndex &&
          changedLos.losIndex == losIndex &&
          changedLos.type == Settings.keys.roomNightsTo &&
          changedLos.validationCheck == true
        ) {
          strErrMsg = Settings.alerts.losToLessThanEqual;
          alert(strErrMsg);
          if (!props.isBTGroupPage) {
            const dataCheck = JSON.parse(
              localStorage.getItem("ratesTableValidData")
            );
            dataCheck.isLOSValid = false;
            dataCheck.losChg = "Y";
            localStorage.setItem(
              "ratesTableValidData",
              JSON.stringify(dataCheck)
            );
          }
          setChangedLos({
            ...changedLos,
            validationCheck: false,
          });
        }
      } else {
        if (iTo > hotelLosList[losKey].roomnightsfrom) {
          if (
            iTo == 255 &&
            losIndex !== Object.entries(hotelLosList).length - 1
          ) {
            const firstLosKey = seasonKey + "_" + 1;
            hotelLosList[firstLosKey].roomnightsfrom = 1;
            let rowsToBeDeleted =
              Object.entries(hotelLosList).length - 1 - losIndex;
            let currentStayId = hotelLosList[losKey].lengthofstayid + 1;
            let currLosKey = seasonKey + "_" + currentStayId;
            while (rowsToBeDeleted !== 0) {
              delete hotelLosList[currLosKey];
              dynamicTableRows.forEach((season, index) => {
                const splittedKey = currLosKey.split("_");
                const seasonLosKey =
                  season.accountSeason.seasonid + "_" + splittedKey[1];
                Object.entries(season.accountRates).forEach(
                  ([key, value], ind) => {
                    const k = key.split("_");
                    const newRpKey = k[0] + "_" + k[1];
                    if (newRpKey === seasonLosKey) {
                      delete season.accountRates[key];
                    }
                  }
                );
                Object.entries(season.fixedRates).forEach(
                  ([key, value], ind) => {
                    const k = key.split("_");
                    const newRpKey = k[0] + "_" + k[1];
                    if (newRpKey === seasonLosKey) {
                      delete season.fixedRates[key];
                    }
                  }
                );
              });
              currentStayId++;
              currLosKey = seasonKey + "_" + currentStayId;
              rowsToBeDeleted--;
            }
            dynamicTableRows[seasonIndex].accountLOS = { ...hotelLosList };
            if (!props.isBTGroupPage) {
              const dataCheck = JSON.parse(
                localStorage.getItem("ratesTableValidData")
              );
              dataCheck.isLOSValid = true;
              dataCheck.losChg = "Y";
              localStorage.setItem(
                "ratesTableValidData",
                JSON.stringify(dataCheck)
              );
            }
            updateSeasonList(dynamicTableRows, hotelLosList);
          } else if (
            losIndex === Object.entries(hotelLosList).length - 1 &&
            iTo != 255
          ) {
            if (
              changedLos.idx == seasonIndex &&
              changedLos.losIndex == losIndex &&
              changedLos.type == Settings.keys.roomNightsTo &&
              changedLos.validationCheck == true
            ) {
              strErrMsg = Settings.alerts.losTierEnding;
              alert(strErrMsg);
              if (!props.isBTGroupPage) {
                const dataCheck = JSON.parse(
                  localStorage.getItem("ratesTableValidData")
                );
                dataCheck.isLOSValid = false;
                dataCheck.losChg = "Y";
                localStorage.setItem(
                  "ratesTableValidData",
                  JSON.stringify(dataCheck)
                );
              }
              setChangedLos({
                ...changedLos,
                validationCheck: false,
              });
            }
          } else {
            hotelLosList[losKey].roomnightsto = parseInt(iTo);
            const nextKey =
              seasonKey +
              "_" +
              (parseInt(hotelLosList[losKey].lengthofstayid) + 1).toString();
            if (
              hotelLosList[losKey].lengthofstayid + 1 <=
              lengthOf(hotelLosList)
            ) {
              hotelLosList[nextKey].roomnightsfrom = parseInt(iTo) + 1;
            }
            if (!props.isBTGroupPage) {
              const dataCheck = JSON.parse(
                localStorage.getItem("ratesTableValidData")
              );
              dataCheck.isLOSValid = true;
              dataCheck.losChg = "Y";
              localStorage.setItem(
                "ratesTableValidData",
                JSON.stringify(dataCheck)
              );
            }
            updateSeasonList(dynamicTableRows, hotelLosList);
          }
        } else if (hotelLosList[losKey].roomnightsfrom > iTo) {
          if (
            changedLos.idx == seasonIndex &&
            changedLos.losIndex == losIndex &&
            changedLos.type == Settings.keys.roomNightsTo &&
            changedLos.validationCheck == true
          ) {
            strErrMsg = Settings.alerts.losFromGreaterThanLosTo;
            alert(strErrMsg);
            hotelLosList[losKey].roomnightsto =
              hotelLosList[losKey].roomnightsfrom + 1;
            if (!props.isBTGroupPage) {
              const dataCheck = JSON.parse(
                localStorage.getItem("ratesTableValidData")
              );
              dataCheck.isLOSValid = false;
              dataCheck.losChg = "Y";
              localStorage.setItem(
                "ratesTableValidData",
                JSON.stringify(dataCheck)
              );
            }
            setChangedLos({
              ...changedLos,
              validationCheck: false,
            });
            updateSeasonList(dynamicTableRows, hotelLosList);
            iReturn = false;
          }
        } else if (isNaN(iTo)) {
          if (!props.isBTGroupPage) {
            const dataCheck = JSON.parse(
              localStorage.getItem("ratesTableValidData")
            );
            dataCheck.isLOSValid = false;
            dataCheck.losChg = "Y";
            localStorage.setItem(
              "ratesTableValidData",
              JSON.stringify(dataCheck)
            );
          }
        }
      }
    }
    return iReturn;
  };

  const checkLosStart = (event, losIndex, seasonIndex) => {
    let iReturn;
    iReturn = false;
    let strErrMsg = "";
    const dynamicTableRows = [...dynamicRows];
    const hotelLosList = { ...dynamicTableRows[seasonIndex]?.accountLOS };
    Object.entries(hotelLosList).forEach(([keys, item], index) => {
      if (index === losIndex) {
        if (item[Settings.keys.isRoomNightsFromChanged]) {
          if (event.target.value < 255 && event.target.value !== "") {
            iReturn = true;
          } else {
            if (
              changedLos.idx == seasonIndex &&
              changedLos.losIndex == losIndex &&
              changedLos.type == Settings.keys.roomNightsFrom &&
              changedLos.validationCheck == true
            ) {
              strErrMsg = Settings.alerts.losLimit;
              alert(strErrMsg);
              iReturn = false;
              if (!props.isBTGroupPage) {
                const dataCheck = JSON.parse(
                  localStorage.getItem("ratesTableValidData")
                );
                dataCheck.isLOSValid = false;
                dataCheck.losChg = "Y";
                localStorage.setItem(
                  "ratesTableValidData",
                  JSON.stringify(dataCheck)
                );
              }
              setChangedLos({
                ...changedLos,
                validationCheck: false,
              });
            }
          }

          if (iReturn) {
            dynamicTableRows.forEach((season, i) => {
              const losKey =
                season.accountSeason.seasonid + "_" + keys.split("_")[1];
              if (!isNaN(parseInt(event.target.value))) {
                season.accountLOS[losKey][Settings.keys.roomNightsFrom] =
                  parseInt(event.target.value);
                const prevIndex = item[Settings.keys.lengthofstayid] - 1;
                if (prevIndex !== 0) {
                  const prevLosKey =
                    season.accountSeason.seasonid + "_" + prevIndex;
                  season.accountLOS[prevLosKey].roomnightsto =
                    parseInt(event.target.value) - 1;
                }
                if (dynamicTableRows.length !== i) {
                  if (index === 0 && dynamicTableRows.length > 1) {
                    if (i - 1 !== -1) {
                      const prevSeason = dynamicTableRows[i - 1];
                      Object.entries(prevSeason.accountLOS)[
                        getLastIndex(prevSeason.accountLOS)
                      ][1][Settings.keys.roomNightsTo] =
                        parseInt(event.target.value) - 1;
                    }
                  }
                }
              } else if (isNaN(parseInt(event.target.value))) {
                // setState({
                //   ...state,
                //   losChg: "Y",
                //   formChg: "Y",
                // });
                // setFormEdited(!formEdited);
              }
            });
            iReturn = true;
            if (!props.isBTGroupPage) {
              const dataCheck = JSON.parse(
                localStorage.getItem("ratesTableValidData")
              );
              dataCheck.isLOSValid = true;
              dataCheck.losChg = "Y";
              localStorage.setItem(
                "ratesTableValidData",
                JSON.stringify(dataCheck)
              );
            }
          }
        }
      }
    });
    setDynamicRows([...dynamicTableRows]);
    return iReturn;
  };

  const getLastIndex = (arr) => {
    if (arr instanceof Object) {
      return Object.entries(arr).length - 1;
    } else {
      return arr.length - 1;
    }
  };

  const lengthOf = (obj) => {
    return Object.entries(obj).length;
  };

  const findDifflLosKeyInSeason = (obj1, obj2) => {
    let obj1Keys = Object.keys(obj1);
    let obj2Keys = Object.keys(obj2);
    obj1Keys = obj1Keys.map((key) => {
      return key.split("_")[1];
    });
    obj2Keys = obj2Keys.map((key) => {
      return key.split("_")[1];
    });
    const diff = obj2Keys.filter((value) => !obj1Keys.includes(value));
    return diff;
  };

  const handleChangeRoomnightFrom = (event, idx) => {
    const los =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.accountLOS;
    const sto = event.target.value;

    const temp = [...los];

    temp[idx].roomnightsfrom = sto;
    setTableRows({
      ...tableRows,
      hotelAccountSpecific: {
        ...tableRows.hotelAccountSpecific,
        hotelAccountSpecificData: {
          ...tableRows.hotelAccountSpecific.hotelAccountSpecificData,
          accountLOS: temp,
        },
      },
    });
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
  };
  const handleBlurRoomNightFrom = (event, idx) => {
    const los =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.accountLOS;
    const prevKey = idx - 1;
    const sFrom = event.target.value;
    if (parseInt(sFrom) > 255) {
      if (appContext.user.isHotelUser) {
        appContext.rateRulesLOSMsg = "true";
        appContext.rateRulesAllValidationMsg =
          "The LOS from must be less than 255";
      } else {
        appContext.rateRulesLOSMsg = "";
        appContext.rateRulesAllValidationMsg = "";
      }
      alert("The LOS from must be less than 255");
      return false;
    }
    const temp = [...los];
    if (parseInt(sFrom) < 255) {
      temp[prevKey].roomnightsto = parseInt(sFrom) - 1;
    }
    temp[idx].roomnightsfrom = sFrom;
    setTableRows({
      ...tableRows,
      hotelAccountSpecific: {
        ...tableRows.hotelAccountSpecific,
        hotelAccountSpecificData: {
          ...tableRows.hotelAccountSpecific.hotelAccountSpecificData,
          accountLOS: temp,
        },
      },
    });
  };
  const handleOnBlurTest = () => {
    console.debug(
      "blur test",
      contextType.ratesRequestPayload[hotel_accountinfoid]
    );
  };
  const handleChangeSessionStrStartdate = (event, idx, seasonid, mainIndex) => {
    const tRowData = tableRows?.hotelAccountSpecific?.hotelAccountSpecificData;
    const currentValues: any = dynamicRows[mainIndex].accountSeason || [];
    if (!dateChangeEdit) {
      setdateChangeEdit(true);
    }
    const updateItem = {
      ...currentValues,
      startdate: event.target.value,
    };
    dynamicRows[mainIndex].accountSeason = updateItem;
    setDynamicRows([...dynamicRows]);
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.seasonChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
    setChangedSeason({
      ...changedSeason,
      idx: mainIndex,
      validationCheck: true,
      type: "start",
      seasonId: seasonid,
    });
  };

  const handleChangeSessionStrEnddate = (event, idx, seasonid) => {
    const currentValues: any = dynamicRows[idx].accountSeason || [];
    if (!dateChangeEdit) {
      setdateChangeEdit(true);
    }
    const updateItem = {
      ...currentValues,
      enddate: event.target.value,
    };
    dynamicRows[idx].accountSeason = updateItem;
    setDynamicRows([...dynamicRows]);
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.seasonChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
    setChangedSeason({
      ...changedSeason,
      idx: idx,
      validationCheck: true,
      type: "end",
      seasonId: seasonid,
    });
  };

  const isFloat = (number) => {
    return /[\.]/.test(String(number));
  };

  const handleAccountsBlur = (idx, key, fieldName) => {
    const currentAccount = dynamicRows[idx].accountRates[key];
    const previousValue = isFloat(currentAccount?.formattedRate)
      ? parseFloat(currentAccount?.formattedRate)
      : parseInt(currentAccount?.formattedRate);
    const currentFixedRates = dynamicRows[idx].fixedRates[key];
    const tableData = tableRows.hotelAccountSpecific?.hotelAccountSpecificData;
    const hasvi = tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo;
    let minNumber = 15;
    const maxNumber = 99999999;
    const currentRateValidation = currentAccount?.rate;
    if (contextType?.showcopyButton && currentRateValidation != "") {
      contextType.setshowcopyButton(false);
    }
    if (tableData?.accountStatus) {
      if (
        tableData?.accountStatus == "A" ||
        tableData?.accountStatus == "D" ||
        tableData?.accountStatus == "L"
      ) {
        minNumber = 15;
      }
    }
    if (
      (currentAccount?.rate && !Utils.isNumber(String(currentAccount?.rate))) ||
      (currentFixedRates?.rate &&
        !Utils.isNumber(String(currentFixedRates?.rate)))
    ) {
      if (
        changedAccRates &&
        changedAccRates.fieldName == fieldName &&
        changedAccRates.idx == idx &&
        changedAccRates.sq == key &&
        changedAccRates.validationCheck == true
      ) {
        alert("You must enter a valid number.");
        setChangedAccRates({
          ...changedAccRates,
          validationCheck: false,
        });
        return false;
      }
    }

    if (
      !Utils.isValidRange(
        parseFloat(currentAccount?.rate),
        minNumber,
        maxNumber
      ) ||
      !Utils.isValidRange(
        parseFloat(currentFixedRates?.rate),
        minNumber,
        maxNumber
      )
    ) {
      if (
        changedAccRates &&
        changedAccRates.fieldName == fieldName &&
        changedAccRates.idx == idx &&
        changedAccRates.sq == key &&
        changedAccRates.validationCheck == true
      ) {
        alert(
          "You must enter a value between " + minNumber + " and " + maxNumber
        );
        setChangedAccRates({
          ...changedAccRates,
          validationCheck: false,
        });
        return false;
      }
    }

    const typedRate = isFloat(currentAccount?.rate)
      ? parseFloat(currentAccount?.rate)
      : parseInt(currentAccount?.rate);

    if (
      ((appContext?.user?.isHotelUser && hasvi.comparerates == "true") ||
        (appContext?.user?.isLimitedSalesUser &&
          hasvi.limitedSalesRate == "true")) &&
      typedRate > previousValue &&
      tableData.isLocked === "Y"
    ) {
      appContext.accountLockedLowHighMsg = "true";
      appContext.rateRulesAllValidationMsg =
        Settings.alerts.accountLockedLowHigh;
      if (
        changedAccRates &&
        changedAccRates.fieldName == fieldName &&
        changedAccRates.idx == idx &&
        changedAccRates.sq == key &&
        changedAccRates.validationCheck == true
      ) {
        alert(Settings.alerts.accountLockedLowHigh);
        dynamicRows[idx].accountRates[key].rate = previousValue;
        setChangedAccRates({
          ...changedAccRates,
          validationCheck: false,
        });
        setDynamicRows([...dynamicRows]);
      }
    } else {
      appContext.accountLockedLowHighMsg = "";
      appContext.rateRulesAllValidationMsg = "";
      if (appContext?.user?.isHotelUser && hasvi.comparerates == "true") {
        if (
          tableData?.ratetype_selected != 18 &&
          tableData?.ratetype_selected != 20 &&
          !hasvi?.ratesReadOnly
        ) {
          const bOK = rateCheck(dynamicRows, idx, key, fieldName);
          if (!bOK.bOK && bOK.strErrorMsg !== "") {
            if (
              changedAccRates &&
              changedAccRates.fieldName == fieldName &&
              changedAccRates.idx == idx &&
              changedAccRates.sq == key &&
              changedAccRates.validationCheck == true &&
              ((appContext?.user?.isHotelUser &&
                hasvi.comparerates == "true") ||
                (appContext?.user?.isLimitedSalesUser &&
                  hasvi.limitedSalesRate == "true"))
            ) {
              alert(bOK.strErrorMsg);
              setChangedAccRates({
                ...changedAccRates,
                validationCheck: false,
              });
              return false;
            }
          }
        }
      }
    }
  };

  const rateCheck = (dynamicRows, idx, key, fieldName) => {
    let rateValue = dynamicRows[idx][fieldName][key]?.rate;
    rateValue =
      typeof rateValue == "string"
        ? isFloat(rateValue)
          ? parseFloat(rateValue)
          : parseInt(rateValue)
        : rateValue;
    const obj = { bOK: true, strErrorMsg: "" };
    const ratearray = key.split("_");
    const rootid = ratearray[0] + "_" + ratearray[1] + "_" + ratearray[2];
    const iSeason = parseInt(ratearray[0]);
    const iLOS = parseInt(ratearray[1]);
    const iRP = parseInt(ratearray[2]);
    const iPR = parseInt(ratearray[3]);
    const iRT = parseInt(ratearray[4]);
    const hasvi = tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo;
    if (
      ((appContext?.user?.isHotelUser && hasvi.comparerates == "true") ||
        (appContext?.user?.isLimitedSalesUser &&
          hasvi.limitedSalesRate == "true")) &&
      !parentContext.isRebidDeclined
    ) {
      obj.strErrorMsg = Rate_check_prod_roomtype(
        rateValue,
        rootid,
        iRT,
        iPR,
        iRP,
        idx,
        fieldName
      );
      if (obj.strErrorMsg != "") obj.bOK = false;

      if (obj.bOK) {
        obj.strErrorMsg = Rate_check_prod_roompool(
          rateValue,
          ratearray[0] + "_" + ratearray[1],
          iRT,
          iPR,
          iRP,
          idx,
          fieldName
        );
        if (obj.strErrorMsg != "") obj.bOK = false;
      }
    }

    if (
      ((appContext?.user?.isHotelUser && hasvi.comparerates == "true") ||
        (appContext?.user?.isLimitedSalesUser &&
          hasvi.limitedSalesRate == "true")) &&
      !parentContext.isRebidDeclined
    ) {
      if (obj.bOK) {
        const currStayId = typeof iLOS == "string" ? parseInt(iLOS) : iLOS;
        const totalLos = Object.entries(dynamicRows[idx]?.accountLOS).length;
        if (totalLos > 1) {
          Object.entries(dynamicRows[idx]?.accountLOS).forEach(
            ([key, value]) => {
              if (currStayId > 1 && value?.lengthofstayid === currStayId - 1) {
                const newKey =
                  key +
                  "_" +
                  ratearray[2] +
                  "_" +
                  ratearray[3] +
                  "_" +
                  ratearray[4];
                const objCmpRate = dynamicRows[idx][fieldName][newKey]?.rate;
                if (!compareRates(rateValue, objCmpRate, true, true)) {
                  obj.strErrorMsg =
                    "The LOS Tier " +
                    currStayId +
                    " rate must be less than or equal to the LOS Tier " +
                    (currStayId - 1) +
                    " rate";
                  obj.bOK = false;
                  return false;
                }
              } else if (value?.lengthofstayid === currStayId + 1) {
                const newRateKey =
                  key +
                  "_" +
                  ratearray[2] +
                  "_" +
                  ratearray[3] +
                  "_" +
                  ratearray[4];
                const objCmpRate1 =
                  dynamicRows[idx][fieldName][newRateKey]?.rate;
                if (!compareRates(rateValue, objCmpRate1, false, true)) {
                  obj.strErrorMsg =
                    "The LOS Tier " +
                    currStayId +
                    " rate must be greater than or equal to the LOS Tier " +
                    (currStayId + 1) +
                    " rate";
                  obj.bOK = false;
                  return false;
                }
              }
              return obj.bOK;
            }
          );
        }
      }
    }

    return obj;
  };

  const Rate_check_prod_roompool = (
    objChangeRate,
    rootid,
    iRT,
    iPR,
    iRP,
    seasonIndex,
    fieldName
  ) => {
    let bOK = true;
    const tRowData =
      props.ratesData?.hotelAccountSpecific?.hotelAccountSpecificData;
    const seasonList = [...dynamicRows];
    let strErrorMsg = "";
    const arrayRT = tRowData?.roomtypelist?.reduce((acc, val, index) => {
      acc[val.roomtypeid] = val.roomtypedescription;
      return acc;
    }, {});
    const arrayPR = tRowData?.lranlratype?.reduce((acc, val, index) => {
      acc[val.productid - 1] = val.productdescription;
      return acc;
    }, {});
    let roomKey = "";
    let objCmpRate = null;
    //compare room type rates && only account for 2 room types
    if (bOK) {
      if (iRP > 1) {
        roomKey = rootid + "_" + (iRP - 1) + "_" + iPR + "_" + iRT;
        objCmpRate = seasonList[seasonIndex][fieldName][roomKey]?.rate;
        if (
          objCmpRate != null &&
          !compareRates(objChangeRate, objCmpRate, false, true)
        ) {
          strErrorMsg =
            "The  Room pool " +
            iRP +
            " " +
            arrayPR[iPR - 1] +
            " " +
            arrayRT[iRT] +
            " rate must be greater than or equal to the  Room pool " +
            (iRP - 1) +
            " " +
            arrayPR[iPR - 1] +
            " " +
            arrayRT[iRT] +
            " rate";
          bOK = false;
        }
      }
    }
    if (bOK) {
      if (iRP < 3) {
        roomKey = rootid + "_" + (iRP + 1) + "_" + iPR + "_" + iRT;
        objCmpRate = seasonList[seasonIndex][fieldName][roomKey]?.rate;
        if (
          objCmpRate != null &&
          !compareRates(objChangeRate, objCmpRate, true, true)
        ) {
          strErrorMsg =
            "The  Room pool " +
            iRP +
            " " +
            arrayPR[iPR - 1] +
            " " +
            arrayRT[iRT] +
            " rate must be less  than or equal to the  Room pool " +
            (iRP + 1) +
            " " +
            arrayPR[iPR - 1] +
            " " +
            arrayRT[iRT] +
            " rate";
          bOK = false;
        }
      }
    }
    if (bOK) return "";
    else return strErrorMsg;
  };

  const Rate_check_prod_roomtype = (
    objChangeRate,
    rootid,
    iRT,
    iPR,
    iRP,
    seasonIndex,
    fieldName
  ) => {
    let bOK = true;
    const tRowData =
      props.ratesData?.hotelAccountSpecific?.hotelAccountSpecificData;
    const seasonList = [...dynamicRows];
    let strErrorMsg = "";
    const arrayRT = tRowData?.roomtypelist?.reduce((acc, val, index) => {
      acc[val.roomtypeid] = val.roomtypedescription;
      return acc;
    }, {});
    const arrayPR = tRowData?.lranlratype?.reduce((acc, val, index) => {
      acc[val.productid - 1] = val.productdescription;
      return acc;
    }, {});
    const minRT = tRowData?.roomtypelist[0]?.roomtypeid;
    let objCmpRate = null;
    let roomKey = "";
    const bCompare =
      props.ratesData?.hotelAccountSpecific?.hotelAccountSpecificViewInfo
        ?.comparerates;
    //compare room type rates && only account for 2 room types
    if (bOK) {
      if (iRT > minRT) {
        roomKey = rootid + "_" + iPR + "_" + (iRT - 1);
        objCmpRate = seasonList[seasonIndex][fieldName][roomKey]?.rate;
        if (!compareRates(objChangeRate, objCmpRate, false, true)) {
          strErrorMsg =
            "The " +
            arrayRT[iRT] +
            " rate must be greater than or equal to the " +
            arrayRT[iRT - 1] +
            " rate";
          bOK = false;
        }
      }
    }
    if (bOK) {
      if (iRT == minRT) {
        roomKey = rootid + "_" + iPR + "_" + (iRT + 1);
        if (seasonList[seasonIndex][fieldName][roomKey]) {
          objCmpRate = seasonList[seasonIndex][fieldName][roomKey]?.rate;
          if (!compareRates(objChangeRate, objCmpRate, true, true)) {
            strErrorMsg =
              "The " +
              arrayRT[iRT] +
              " rate must be less than or equal the " +
              arrayRT[iRT + 1] +
              " rate";
            bOK = false;
          }
        } else {
          bOK = true;
        }
      }
    }

    //compare lra vs nlra rates && only account for these 2
    if (bOK && (bCompare == true || bCompare == "true")) {
      if (iPR == 1) {
        roomKey = rootid + "_" + (iPR + 1) + "_" + iRT;
        if (seasonList[seasonIndex][fieldName][roomKey]) {
          objCmpRate = seasonList[seasonIndex][fieldName][roomKey]?.rate;
          if (!compareRates(objChangeRate, objCmpRate, false, false)) {
            strErrorMsg =
              "The " +
              arrayPR[iPR - 1] +
              " rate must be greater than the " +
              arrayPR[iPR] +
              " rate";
            bOK = false;
          }
        } else {
          bOK = true;
        }
      }
    }

    if (bOK && bCompare) {
      if (iPR == 2) {
        roomKey = rootid + "_" + (iPR - 1) + "_" + iRT;
        if (seasonList[seasonIndex][fieldName][roomKey]) {
          objCmpRate = seasonList[seasonIndex][fieldName][roomKey]?.rate;
          if (!compareRates(objChangeRate, objCmpRate, true, false)) {
            strErrorMsg =
              "The " +
              arrayPR[iPR - 1] +
              " rate must be less than the " +
              arrayPR[iPR - 2] +
              " rate";
            bOK = false;
          }
        } else {
          bOK = true;
        }
      }
    }
    if (bOK) return "";
    else return strErrorMsg;
  };

  const compareRates = (objRate, objCmpRate, cmpHigher, cmpEqual) => {
    let bOK;
    let iRate, iCmpRate;

    bOK = true;
    if (objCmpRate != null) {
      iRate = Utils.ConvertToNumber(objRate);
      iCmpRate = Utils.ConvertToNumber(objCmpRate);
      if (
        (cmpHigher && iRate > iCmpRate) ||
        (!cmpHigher && iRate < iCmpRate) ||
        (!cmpEqual && iRate == iCmpRate)
      )
        bOK = false;
    }
    return bOK;
  };

  const handleChangeAccountRates = (value, key, accountRates, idx) => {
    appContext.rateRulesValidAccDeleteMsg = "";
    let flag = false;
    /*   const currentValues: any = contextType.ratesRequestPayload[hotel_accountinfoid]?.accountRates[key] || [];
    contextType.setRatesRequestPayload({
      ...contextType.ratesRequestPayload[hotel_accountinfoid],
      accountRates: {
        ...contextType.ratesRequestPayload[hotel_accountinfoid]?.accountRates,
        [key]: {
          ...currentValues,
          rate: value,
          roomtypeid: accountRates?.roomtypeid || "",
          productid: accountRates?.productid || "",
          idx,
        },
      },
    }); */

    console.debug("key.spe", key?.split("_"));
    const keySplit = key?.split("_");

    const updateTime = {
      rate: value || null,
      roomtypeid: accountRates?.roomtypeid || keySplit[4] || null,
      productid: accountRates?.productid || keySplit[3] || null,
      seasonid: accountRates?.seasonid || keySplit[0] || null,
      lengthofstayid: accountRates?.lengthofstayid || keySplit[1] || 1,
      roompool: accountRates?.roompool,
      idx,
      formattedRate: accountRates?.formattedRate,
    };
    dynamicRows[idx].accountRates[key] = updateTime;
    setDynamicRows([...dynamicRows]);
    const currentAccountOnChange = updateTime?.rate;

    if (
      appContext?.user?.isHotelUser &&
      hasd?.isSelected &&
      hasd?.isSelected === "Y" &&
      currentAccountOnChange === null &&
      updateTime?.formattedRate !== null &&
      updateTime?.formattedRate !== ""
    ) {
      if (updateTime?.roompool != 1) {
        appContext.rateRulesValidAccDeleteMsg = "true";
        appContext.rateRulesAllValidationMsg =
          Settings.alerts.accountRatesDelete;
        alert(Settings.alerts.accountRatesDelete);
        flag = true;
        dynamicRows[idx].accountRates[key].rate =
          typeof updateTime?.formattedRate == "string"
            ? isFloat(updateTime?.formattedRate)
              ? parseFloat(updateTime?.formattedRate)
              : parseInt(updateTime?.formattedRate)
            : updateTime?.formattedRate;
        setDynamicRows([...dynamicRows]);
      }
    } else {
      appContext.rateRulesValidAccDeleteMsg = "";
      appContext.rateRulesAllValidationMsg = "";
      flag = false;
    }
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.accRateChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
    if (!flag) {
      setChangedAccRates({
        ...changedAccRates,
        sq: key,
        fieldName: "accountRates",
        idx: idx,
        validationCheck: true,
      });
    }
  };

  const handleChangeFixedRates = (value, key, fixedRate, idx) => {
    const keySplit = key?.split("_");

    const updateTime = {
      rate: value || null,
      roomtypeid: fixedRate?.roomtypeid || keySplit[4] || null,
      productid: fixedRate?.productid || keySplit[3] || null,
      seasonid: fixedRate?.seasonid || keySplit[0] || null,
      lengthofstayid: fixedRate?.lengthofstayid || keySplit[1] || 1,
      roompool: fixedRate?.roompool,
      idx,
    };
    dynamicRows[idx].fixedRates[key] = updateTime;
    setDynamicRows([...dynamicRows]);
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.fixedRateChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
    setChangedAccRates({
      ...changedAccRates,
      sq: key,
      fieldName: "fixedRates",
      idx: idx,
      validationCheck: true,
    });
  };

  const handleChangeRoomFlagsLRA = (event, key) => {
    contextType.ratesRequestPayload[hotel_accountinfoid].roompoolflags[
      key - 1
    ] = {
      ...contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
        key - 1
      ],
      lra: event.target.value,
      hotelAccountSpecificPGOOSData:
        contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
          key - 1
        ]?.hotelAccountSpecificPGOOSData || [],
    };

    contextType.setRatesRequestPayload({
      ...contextType.ratesRequestPayload,
      [hotel_accountinfoid]: {
        ...contextType.ratesRequestPayload[hotel_accountinfoid],
        roompoolflags:
          contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags,
      },
    });
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.roomFlagsLRAChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
  };

  const handleChangeRoomFlagsAccepted = (event, key, hoteInfoId) => {
    if (hoteInfoId === hotel_accountinfoid) {
      const currentValues: any =
        contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
          key - 1
        ] || [];
      const isNotNo = event.target.value === "Y" || event.target.value === "P";
      contextType.ratesRequestPayload[hotel_accountinfoid].roompoolflags[
        key - 1
      ] = {
        ...currentValues,
        accepted: event.target.value,
        // rejectreasonid: isNotNo ? null : parseInt(contextType.ratesRequestPayload?.roompoolflags[key-1
        // ]?.rejectreasonid),
        rejectreasonid: isNotNo
          ? null
          : contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
              key - 1
            ]?.rejectreasonid,
        rejectionreason: isNotNo
          ? ""
          : contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
              key - 1
            ]?.rejectionreason,
        hotelAccountSpecificPGOOSData:
          contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
            key - 1
          ]?.hotelAccountSpecificPGOOSData || [],
      };

      if (
        appContext?.user?.isSalesUser ||
        appContext?.user?.isLimitedSalesUser ||
        appContext?.user?.isHotelUser
      ) {
        if (!isNotNo) {
          appContext.rateRulesRejectionReasonMsg = `Please select a rejection reason for room pool ${key}`;
        } else {
          appContext.rateRulesRejectionReasonMsg = "";
        }
      } else {
        appContext.rateRulesRejectionReasonMsg = "";
      }

      contextType.setRatesRequestPayload({
        ...contextType.ratesRequestPayload,
        [hotel_accountinfoid]: {
          ...contextType.ratesRequestPayload[hotel_accountinfoid],
          roompoolflags:
            contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags,
        },
      });
      if (!props.isBTGroupPage) {
        const dataCheck = JSON.parse(
          localStorage.getItem("ratesTableValidData")
        );
        dataCheck.roomFlagsAcceptedChg = "Y";
        localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
      }
      contextType.setIsFormChanged("Y");
      contextType.setFormEdited(!contextType.formEdited);
    }
  };

  const handleChangeRejectReason = (reason) => {
    const key = Number(currentRejectReason?.key);
    const currentValues: any =
      contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
        key
      ] || [];

    contextType.ratesRequestPayload[hotel_accountinfoid].roompoolflags[key] = {
      ...contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
        key
      ],
      rejectreasonid: reason?.removalReasonId,
      rejectionreason: reason?.removalReason,
    };
    if (
      appContext?.user?.isLimitedSalesUser ||
      appContext?.user?.isHotelUser ||
      appContext?.user?.isSalesUser
    ) {
      if (reason?.removalReason === "No Reason Provided.") {
        appContext.rateRulesRejectionReasonMsg = `Please select a rejection reason for room pool ${
          key + 1
        }`;
      } else {
        appContext.rateRulesRejectionReasonMsg = "";
      }
    } else {
      appContext.rateRulesRejectionReasonMsg = "";
    }
    contextType.setRatesRequestPayload({
      ...contextType.ratesRequestPayload,
      [hotel_accountinfoid]: {
        ...contextType.ratesRequestPayload[hotel_accountinfoid],
        roompoolflags:
          contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags,
      },
    });
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);

    setShowRejectReasonModal(false);
  };

  const handleChangeRoomFlagsPGOOSData = (event, key, pgoosIndex) => {
    if (
      removeReasonCurrentIndex.removalreasonid == null ||
      removeReasonCurrentIndex.removalreasonid == ""
    ) {
      const currentValues: any =
        contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
          key - 1
        ]?.hotelAccountSpecificPGOOSData || [];
      const pgoosValuesIndex = currentValues.findIndex(
        (poogs) => poogs.roomPoolSequence === pgoosIndex
      );

      const requestData = {
        pgoos: event.target.checked ? "Y" : "N",
        removalreasonid: null,
        removalreason: null,
      };

      if (pgoosValuesIndex !== -1) {
        contextType.ratesRequestPayload[hotel_accountinfoid].roompoolflags[
          key - 1
        ].hotelAccountSpecificPGOOSData[pgoosValuesIndex] = {
          ...contextType.ratesRequestPayload[hotel_accountinfoid]
            ?.roompoolflags[key - 1].hotelAccountSpecificPGOOSData[
            pgoosValuesIndex
          ],
          ...requestData,
        };
      } else {
        if (
          contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
            key - 1
          ]?.hotelAccountSpecificPGOOSData
        ) {
          contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
            key - 1
          ].hotelAccountSpecificPGOOSData.push(requestData);
        } else {
          contextType.ratesRequestPayload[hotel_accountinfoid].roompoolflags[
            key - 1
          ] = {
            hotelAccountSpecificPGOOSData: [requestData],
          };
        }
      }
    }
    contextType.setRatesRequestPayload({
      ...contextType.ratesRequestPayload,
      [hotel_accountinfoid]: {
        ...contextType.ratesRequestPayload[hotel_accountinfoid],
        roompoolflags:
          contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags,
      },
    });
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.roomFlagsPGOOSDataChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);

    // contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags;
  };

  const handleSaveUpdateReason = (removeReasonOption) => {
    const key = Number(removeReasonCurrentIndex.key);
    const pgoosIndex = removeReasonCurrentIndex.pgoosIndex;
    const poolType = removeReasonCurrentIndex.poolType;
    const currentValues: any =
      contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
        key - 1
      ]?.hotelAccountSpecificPGOOSData || [];

    const pgoosValuesIndex = currentValues.findIndex(
      (poogs) => poogs.roomPoolSequence === pgoosIndex
    );

    contextType.ratesRequestPayload[hotel_accountinfoid].roompoolflags[
      key - 1
    ].hotelAccountSpecificPGOOSData[pgoosValuesIndex] = {
      ...contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
        key - 1
      ].hotelAccountSpecificPGOOSData[pgoosValuesIndex],
      removalreasonid: removeReasonOption.removalReasonId,
      removalreason: removeReasonOption.removalReason,
    };

    contextType.setRatesRequestPayload({
      ...contextType.ratesRequestPayload,
      [hotel_accountinfoid]: {
        ...contextType.ratesRequestPayload[hotel_accountinfoid],
        roompoolflags:
          contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags,
      },
    });
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
    closeModal();
  };

  useEffect(() => {
    if (contextType?.isFormChanged == "Y") {
      const bOK = validatePage();
      if (bOK && props.isBTGroupPage) {
        alertOnRemovalReason();
      }

      if (!props.isBTGroupPage) {
        const tempArray = _.cloneDeep(
          contextType?.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags
        );

        tempArray?.forEach((element) => {
          if (element.lra == null) {
            element.lra = "Y";
          }
        });

        contextType.setRatesRequestPayload({
          ...contextType.ratesRequestPayload,
          [hotel_accountinfoid]: {
            ...contextType.ratesRequestPayload[hotel_accountinfoid],
            roompoolflags: tempArray,
          },
        });
      }
    }
  }, [contextType?.formEdited]);

  const checkYearFormat = (dateValue) => {
    let errMsg = "";
    let bOK = true;
    if (dateValue == null || dateValue == "" || dateValue == "undefined") {
      bOK = false;
    } else if (dateValue != "") {
      const s1 = dateValue.split("/");
      if (s1[2] < 100) {
        let errorMsg = "You have entered an invalid year - " + s1[2] + ". ";
        if (s1[2].length < 4)
          errorMsg += "The year must be entered with four digits.";
        errMsg = errorMsg;
        bOK = false;
      }
    }
    return { bOK: bOK, strErrorMsg: errMsg };
  };

  const checkConsecutiveDates = (seasonList) => {
    let bOK = true;
    let strMessage = "";
    let objPrevSS = null;
    let objPrevSE = null;
    for (let i = 0; i < seasonList.length; i++) {
      const checkStartYearFormat = checkYearFormat(seasonList[i].startdate);
      if (seasonList[i].startdate && !checkStartYearFormat.bOK) {
        bOK = false;
        strMessage = checkStartYearFormat.strErrorMsg;
        break;
      }

      const checkEndYearFormat = checkYearFormat(seasonList[i].enddate);
      if (seasonList[i].enddate && !checkEndYearFormat.bOK) {
        bOK = false;
        strMessage = checkEndYearFormat.strErrorMsg;
        break;
      }

      if (
        seasonList[i].startdate &&
        seasonList[i].enddate &&
        !Utils.isAfterDate(seasonList[i].enddate, seasonList[i].startdate)
      ) {
        strMessage =
          Settings.alerts.seasonStartBeforeSeasonEnd + seasonList[i].seasonid;
        bOK = false;
        break;
      }

      if (objPrevSE != null) {
        if (
          seasonList[i].startdate &&
          seasonList[i].enddate &&
          objPrevSE &&
          !Utils.isAfterDate(seasonList[i].startdate, objPrevSE)
        ) {
          strMessage =
            Settings.alerts.seasonEndDateForSeason +
            seasonList[i].seasonid +
            Settings.alerts.beforeNextSeasonStartDate;
          bOK = false;
          break;
        }
      }
      objPrevSS = seasonList[i].startdate;
      objPrevSE = seasonList[i].enddate;
    }
    return { bOK: bOK, strErrorMsg: strMessage };
  };

  const validatePage = () => {
    let bOK = { bOK: true, strErrorMsg: "" };
    let isValidDataBeforeSaveCheck = localStorage.getItem(
      "ratesTableValidData"
    );
    if (isValidDataBeforeSaveCheck) {
      isValidDataBeforeSaveCheck = JSON.parse(isValidDataBeforeSaveCheck);
    }
    const hasvi = tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo;
    const hasdOrg = props.isBTGroupPage
      ? JSON.parse(localStorage.getItem("orginalAllRatesData"))
      : JSON.parse(localStorage.getItem("orginalRatesData"));
    const requestHasd = !props.isBTGroupPage
      ? hasdOrg?.hotelAccountSpecific?.hotelAccountSpecificData
      : hasdOrg?.allHotelRates?.find(
          (f) => f?.hotel_accountinfoid == props?.ratesData?.hotel_accountinfoid
        )?.hotelAccountSpecific?.hotelAccountSpecificData;
    const btRatesData = localStorage.getItem(
      `ratesData_${props?.ratesData?.hotel_accountinfoid}`
    );
    let requestData;
    if (!props.isBTGroupPage) {
      requestData = JSON.parse(localStorage.getItem("ratesData"));
    } else {
      if (
        btRatesData &&
        btRatesData !== undefined &&
        btRatesData !== null &&
        btRatesData !== "undefined"
      ) {
        requestData = JSON.parse(
          localStorage.getItem(
            `ratesData_${props?.ratesData?.hotel_accountinfoid}`
          )
        );
      } else {
        requestData = undefined;
      }
    }
    const isAccountLocked = requestHasd?.isLocked === "Y";
    const minNumber = 15;
    const maxNumber = 99999999;

    const percentDiscount =
      contextType?.ratesRequestPayload[hotel_accountinfoid]?.percentdiscount;
    const prevPercentDiscount = Number(requestHasd?.percentdiscount);
    const rm_nights =
      contextType?.ratesRequestPayload[hotel_accountinfoid]
        ?.hotelAccountSpecificFacility?.rm_nights;

    if (bOK.bOK) {
      if (
        appContext?.user?.isLimitedSalesUser ||
        appContext?.user?.isHotelUser
      ) {
        if (!parentContext.isRebidDeclined) {
          if (
            requestHasd?.altcancelpolicyid === 2 ||
            requestHasd?.altcancelpolicyid === 3
          ) {
            if (requestData?.altcancelpolicyoptionid === 2) {
              if (requestData?.altcxlpolicytimeid === 0) {
                appContext.setErrorMessageAlert({
                  show: true,
                  message: Settings.alerts.answerCancellation,
                  type: "browserAlert",
                });
                bOK.bOK = false;
              }
            } else {
              if (requestData?.extendcancelpolicy === 0) {
                appContext.setErrorMessageAlert({
                  show: true,
                  message: Settings.alerts.answerCancellation,
                  type: "browserAlert",
                });
                bOK.bOK = false;
              }
            }
          }
        }
      }
    }

    if (bOK.bOK) {
      if (
        appContext?.user?.hasLimitedHotels &&
        (parseInt(requestHasd?.ratetype_selected) === 18 ||
          parseInt(requestHasd?.ratetype_selected) === 20)
      ) {
        if (percentDiscount) {
          if (
            (appContext?.user.isHotelUser ||
              appContext?.user.isLimitedSalesUser) &&
            requestHasd?.isLocked === "Y"
          ) {
            if (Number(percentDiscount) < prevPercentDiscount) {
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.alerts.accountPercen,
                type: "browserAlert",
              });
              bOK.bOK = false;
            }
          }
        }

        if (bOK.bOK) {
          if (!percentDiscount) {
            if (
              appContext?.user.isHotelUser ||
              appContext?.user.isLimitedSalesUser
            ) {
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.alerts.emptyPercent,
                type: "browserAlert",
              });
              bOK.bOK = false;
            }
          } else {
            if (requestHasd?.aer_account !== "Y") {
              if (
                Number(percentDiscount) === 0 ||
                Number(percentDiscount) === 0.0
              ) {
                if (
                  appContext?.user.isHotelUser ||
                  appContext?.user.isLimitedSalesUser
                ) {
                  appContext.setErrorMessageAlert({
                    show: true,
                    message: Settings.alerts.minumuOnePer,
                    type: "browserAlert",
                  });
                  bOK.bOK = false;
                }
              }
            }
          }
        }

        if (bOK.bOK) {
          if (
            appContext?.user?.isLimitedSalesUser ||
            appContext?.user?.isHotelUser
          ) {
            if (
              percentDiscount < requestHasd?.minpercent ||
              percentDiscount > 100
            ) {
              const msg =
              "The percent discount must be between " +
                requestHasd?.minpercent +
                " and 100.";
              appContext.setErrorMessageAlert({
                show: true,
                message: msg,
                type: "browserAlert",
              });
              bOK.bOK = false;
            }
          }
        }
      }

      if (bOK.bOK) {
        if (appContext?.user?.isSalesUser || appContext?.user?.isAdminRole) {
          if (percentDiscount > 100) {
            appContext.setOneTimeNavigationAlert({
              show: true,
              message: "The percent discount cannot be more than 100.",
              navigate: true,
            });
            bOK.bOK = false;
          }
        }
      }
    }

    if (bOK.bOK) {
      if (
        contextType?.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags
      ) {
        bOK.bOK = validateRejectReason();
        if (bOK.bOK && !props.isBTGroupPage && appContext?.user?.isPASAdmin) {
          bOK.bOK = validatePGOOSRemovalReason();
        }
      }
    }

    if (bOK.bOK) {
      const arrayRThasrates = [];
      const arrayRThasemptyrates = [];

      for (let i = 0; i < 4; i++) {
        arrayRThasrates[i] = [];
        arrayRThasemptyrates[i] = [];
        for (let j = 0; j < 3; j++) {
          arrayRThasrates[i][j] = [];
          arrayRThasemptyrates[i][j] = [];
          for (let k = 0; k < 4; k++) {
            arrayRThasrates[i][j][k] = [];
            arrayRThasemptyrates[i][j][k] = [];
          }
        }
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 4; k++) {
            arrayRThasrates[i][j][k] = "false";
            arrayRThasemptyrates[i][j][k] = "false";
          }
        }
      }

      const seasonList = dynamicRows.map((row, i) => {
        return row.accountSeason;
      });

      if (bOK.bOK) {
        if (
          (appContext?.user?.isAdminRole && hasvi?.seasonsEditable) ||
          (appContext?.user?.isSalesUser && hasvi?.seasonsEditable)
        ) {
          bOK = checkConsecutiveDates(seasonList);

          if (!bOK.bOK && bOK.strErrorMsg !== "") {
            if (bOK.strErrorMsg.includes("You have entered an invalid year")) {
              appContext.setErrorMessageAlert({
                show: true,
                message: bOK.strErrorMsg,
                type: "browserAlert",
              });
              bOK.bOK = false;
            } else {
              appContext.setOneTimeNavigationAlert({
                show: true,
                message: bOK.strErrorMsg,
                navigate: true,
              });
              bOK.bOK = false;
            }
          }
        } else if (
          (appContext?.user?.isLimitedSalesUser ||
            appContext?.user?.isHotelUser) &&
          hasvi?.seasonsEditable
        ) {
          bOK = checkConsecutiveDates(seasonList);

          if (!bOK.bOK && bOK.strErrorMsg !== "") {
            appContext.setErrorMessageAlert({
              show: true,
              message: bOK.strErrorMsg,
              type: "browserAlert",
            });
            bOK.bOK = false;
          }
        }
      }

      dynamicRows.slice().forEach((row, idx) => {
        if (bOK.bOK) {
          const rates = [];

          Object.entries(row?.accountRates).forEach(([key, value]) => {
            rates.push(value);
          });

          for (const [key, value] of Object.entries(row?.accountRates)) {
            const rateData: any = value;
            const ratearray = key.split("_");

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

            ratearray[2] =
              ratearray[2] == "null" ||
              ratearray[2] == null ||
              ratearray[2] == undefined ||
              ratearray[2] == ""
                ? "0"
                : ratearray[2];

            if (bOK.bOK) {
              if (
                rateData?.rate == "" ||
                rateData?.rate == null ||
                rateData?.rate == undefined
              ) {
                if (
                  ((appContext?.user?.isHotelUser &&
                    hasvi.comparerates == "true") ||
                    (appContext?.user?.isLimitedSalesUser &&
                      hasvi.limitedSalesRate == "true")) &&
                  !parentContext.isRebidDeclined
                ) {
                  if (getRoompool && isLarnType && getRoompoolItem) {
                    if (
                      productId === isLarnType[0]?.productid &&
                      (appContext?.user?.isLimitedSalesUser ||
                        appContext?.user?.isHotelUser) &&
                      isLarnType[0]?.required === "Y" &&
                      getRoompoolItem[0]?.required === "Y" &&
                      (getRoompool[0]?.lra === "Y" ||
                        getRoompool[0]?.lra === "N") &&
                      requestHasd?.ratetype_selected != 20
                    ) {
                      const isEmptyLRA = rateData?.rate;
                      if (rateData?.roompool === 1 && !isEmptyLRA) {
                        appContext.setErrorMessageAlert({
                          show: true,
                          message:
                            "You must fill in all required LRA rate fields for room pool " +
                            rateData?.roompool,
                          type: "browserAlert",
                        });
                        bOK.bOK = false;
                        break;
                      }
                      if (rateData?.roompool === 2 && !isEmptyLRA) {
                        appContext.setErrorMessageAlert({
                          show: true,
                          message:
                            "You must fill in all required LRA rate fields for room pool " +
                            rateData?.roompool,
                          type: "browserAlert",
                        });
                        bOK.bOK = false;
                        break;
                      }
                      if (rateData?.roompool === 3 && !isEmptyLRA) {
                        appContext.setErrorMessageAlert({
                          show: true,
                          message:
                            "You must fill in all required LRA rate fields for room pool " +
                            rateData?.roompool,
                          type: "browserAlert",
                        });
                        bOK.bOK = false;
                        break;
                      }
                    }

                    if (bOK.bOK) {
                      if (
                        requestHasd?.ratetype_selected != null &&
                        requestHasd?.ratetype_selected.value != 20 &&
                        isLarnType[0]?.productid == 1
                      ) {
                        const nlraid =
                          ratearray[0] +
                          "_" +
                          ratearray[1] +
                          "_" +
                          ratearray[2] +
                          "_2_" +
                          ratearray[4];
                        const nlrarate = row?.accountRates[nlraid]?.rate;
                        if (
                          nlrarate != "" &&
                          nlrarate != null &&
                          nlrarate != undefined
                        ) {
                          appContext.setErrorMessageAlert({
                            show: true,
                            message:
                              "You must fill in the LRA rate fields for any room types with NLRA rates.",
                            type: "browserAlert",
                          });
                          bOK.bOK = false;
                          break;
                        }
                      }
                    }

                    if (bOK.bOK) {
                      if (
                        productId === isLarnType[0]?.productid &&
                        (appContext?.user?.isLimitedSalesUser ||
                          appContext?.user?.isHotelUser) &&
                        isLarnType[0]?.required === "N" &&
                        getRoompool[0]?.lra === "N" &&
                        getRoompoolItem[0]?.required === "Y" &&
                        requestHasd?.ratetype_selected != 20
                      ) {
                        const isEmptyNLRA = rateData?.rate;
                        if (rateData?.roompool === 1 && !isEmptyNLRA) {
                          appContext.setErrorMessageAlert({
                            show: true,
                            message:
                              "You must fill in all required NLRA rate fields for room pool " +
                              rateData?.roompool,
                            type: "browserAlert",
                          });
                          bOK.bOK = false;
                          break;
                        }
                        if (rateData?.roompool === 2 && !isEmptyNLRA) {
                          appContext.setErrorMessageAlert({
                            show: true,
                            message:
                              "You must fill in all required NLRA rate fields for room pool " +
                              rateData?.roompool,
                            type: "browserAlert",
                          });
                          bOK.bOK = false;
                          break;
                        }
                        if (rateData?.roompool === 3 && !isEmptyNLRA) {
                          appContext.setErrorMessageAlert({
                            show: true,
                            message:
                              "You must fill in all required NLRA rate fields for room pool " +
                              rateData?.roompool,
                            type: "browserAlert",
                          });
                          bOK.bOK = false;
                          break;
                        }
                      }
                    }

                    if (
                      rateData?.rate == "" ||
                      rateData?.rate == null ||
                      rateData?.rate == undefined
                    ) {
                      arrayRThasemptyrates[parseInt(ratearray[2])][
                        parseInt(ratearray[3])
                      ][parseInt(ratearray[4])] = "true";
                    }
                  }
                }
              } else {
                if (bOK.bOK) {
                  const accountRateData: any = value;
                  if (accountRateData?.rate !== "" && !!accountRateData?.rate) {
                    if (bOK.bOK) {
                      if (
                        accountRateData?.rate &&
                        !Utils.isNumber(String(accountRateData?.rate))
                      ) {
                        if (
                          appContext?.user?.isHotelUser ||
                          appContext?.user?.isLimitedSalesUser
                        ) {
                          appContext.setErrorMessageAlert({
                            show: true,
                            message: "You must enter a valid number.",
                            type: "browserAlert",
                          });
                          bOK.bOK = false;
                          break;
                        } else if (
                          appContext?.user?.isAdminRole ||
                          appContext?.user?.isSalesUser
                        ) {
                          if (
                            (accountRateData?.roompool === 1 &&
                              accountRateData?.productid == "1" &&
                              accountRateData?.roomtypeid == 1 &&
                              !isAccountLocked) ||
                            isAccountLocked
                          ) {
                            appContext.setOneTimeNavigationAlert({
                              show: true,
                              message: "You must enter a valid number.",
                              navigate: true,
                            });
                            bOK.bOK = false;
                            break;
                          }
                        }
                      }
                    }

                    if (bOK.bOK) {
                      if (
                        !Utils.isValidRange(
                          parseFloat(accountRateData?.rate),
                          minNumber,
                          maxNumber
                        )
                      ) {
                        if (
                          appContext?.user?.isHotelUser ||
                          appContext?.user?.isLimitedSalesUser
                        ) {
                          if (
                            requestHasd?.ratetype_selected != null &&
                            requestHasd?.ratetype_selected != 20
                          ) {
                            appContext.setErrorMessageAlert({
                              show: true,
                              message:
                                "You must enter a value between " +
                                minNumber +
                                " and " +
                                maxNumber,
                              type: "browserAlert",
                            });
                            bOK.bOK = false;
                            break;
                          }
                        } else if (
                          appContext?.user?.isAdminRole ||
                          appContext?.user?.isSalesUser
                        ) {
                          if (
                            requestHasd?.ratetype_selected != null &&
                            requestHasd?.ratetype_selected != 20 &&
                            accountRateData?.roompool === 1 &&
                            accountRateData?.productid == "1" &&
                            accountRateData?.roomtypeid == 1 &&
                            !isAccountLocked
                          ) {
                            appContext.setOneTimeNavigationAlert({
                              show: true,
                              message:
                                "You must enter a value between " +
                                minNumber +
                                " and " +
                                maxNumber,
                              navigate: true,
                            });
                            bOK.bOK = false;
                            break;
                          } else if (
                            requestHasd?.ratetype_selected != null &&
                            requestHasd?.ratetype_selected != 20 &&
                            isAccountLocked
                          ) {
                            appContext.setOneTimeNavigationAlert({
                              show: true,
                              message:
                                "You must enter a value between " +
                                minNumber +
                                " and " +
                                maxNumber,
                              navigate: true,
                            });
                            bOK.bOK = false;
                            break;
                          }
                        }
                      }
                    }

                    if (bOK.bOK) {
                      if (
                        requestHasd?.ratetype_selected != null &&
                        requestHasd?.ratetype_selected != 20 &&
                        requestHasd?.ratetype_selected != 18 &&
                        !hasvi.ratesReadOnly
                      ) {
                        bOK = rateCheck(dynamicRows, idx, key, "accountRates");

                        if (!bOK.bOK && bOK.strErrorMsg !== "") {
                          appContext.setErrorMessageAlert({
                            show: true,
                            message: bOK.strErrorMsg,
                            type: "browserAlert",
                          });
                          bOK.bOK = false;
                          break;
                        } else {
                          arrayRThasrates[parseInt(ratearray[2])][
                            parseInt(ratearray[3])
                          ][parseInt(ratearray[4])] = "true";
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });

      if (bOK.bOK) {
        if (appContext?.user?.isHotelUser) {
          for (let m = 0; m < 4; m++) {
            for (let n = 0; n < 3; n++) {
              for (let p = 0; p < 4; p++) {
                if (
                  bOK.bOK &&
                  arrayRThasrates[m][n][p] == "true" &&
                  arrayRThasemptyrates[m][n][p] == "true"
                ) {
                  appContext.setErrorMessageAlert({
                    show: true,
                    message: "You must fill in all required rate fields",
                    type: "browserAlert",
                  });
                  bOK.bOK = false;
                  break;
                }
              }
            }
          }
        }
      }
    }

    if (bOK.bOK && !props.isBTGroupPage) {
      const dynamicRowsCopy = _.cloneDeep(dynamicRows);
      const accountUpdateSeason = {};
      const accountUpdateLOS = {};
      const accountUpdateRates = {};
      const accountUpdateFixedRates = {};
      dynamicRowsCopy.slice().forEach((item, index) => {
        item.accountSeason.seasonid = index + 1;
        item.accountSeason.name = item.accountSeason.seasonid.toString();
        Object.assign(accountUpdateSeason, {
          [item.accountSeason.seasonid]: {
            ...item.accountSeason,
          },
        });
        Object.entries(item.accountLOS).forEach(([key, los], losIndex) => {
          const seasonKey = key.split("_")[0];
          const prevKey = key;
          const regex = new RegExp(seasonKey);
          key = key.replace(regex, item.accountSeason.seasonid.toString());
          item.accountLOS[key] = los;
          if (item.accountLOS[prevKey] && prevKey !== key) {
            delete item.accountLOS[prevKey];
          }
          if (item.accountLOS[key].hasOwnProperty("isRoomNightsFromChanged")) {
            delete item.accountLOS[key].isRoomNightsFromChanged;
          }
          if (item.accountLOS[key].hasOwnProperty("isRoomNightsToChanged")) {
            delete item.accountLOS[key].isRoomNightsToChanged;
          }
        });
        Object.assign(accountUpdateLOS, {
          ...item.accountLOS,
        });
        Object.entries(item.accountRates).forEach(
          ([key, accRates], accRatesIndex) => {
            const seasonKey = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(seasonKey);
            key = key.replace(regex, item.accountSeason.seasonid.toString());
            item.accountRates[key] = accRates;
            item.accountRates[key].seasonid = item.accountSeason.seasonid;
            if (item.accountRates[prevKey] && prevKey !== key) {
              delete item.accountRates[prevKey];
            }
            if (item.accountRates[key].rate == "") {
              item.accountRates[key].rate = null;
            }
            if (item.accountRates[key].required) {
              delete item.accountRates[key].required;
            }
          }
        );
        Object.assign(accountUpdateRates, {
          ...item.accountRates,
        });
        Object.entries(item.fixedRates).forEach(
          ([key, fixdRates], fixdRatesIndex) => {
            const seasonKey = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(seasonKey);
            key = key.replace(regex, item.accountSeason.seasonid.toString());
            item.fixedRates[key] = fixdRates;
            item.fixedRates[key].seasonid = item.accountSeason.seasonid;
            if (item.fixedRates[prevKey] && prevKey !== key) {
              delete item.fixedRates[prevKey];
            }
            if (item.fixedRates[key].rate == "") {
              item.fixedRates[key].rate = null;
            }
          }
        );
        Object.assign(accountUpdateFixedRates, {
          ...item.fixedRates,
        });
      });

      const requestData_1 = {
        accountSeason: accountUpdateSeason,
        accountLOS: accountUpdateLOS,
        accountRates: accountUpdateRates,
        fixedRates: accountUpdateFixedRates,
        roompoolflags: requestHasd?.roompooldetails,
      };

      const ratesObj = requestData_1.accountRates;
      const ratesArr = [];
      Object.keys(ratesObj).map((keys) => {
        if (ratesObj[keys].productid === "1") {
          ratesArr.push(ratesObj[keys].rate);
        }
      });
      const isValidRate = validateIfRatesAreValid(ratesObj, requestData_1);
      const isSelectedRateTypeGPP =
        requestData.ratetype_selected === 18 ? true : false;
      const isFloatAccAndDiscountExist =
        requestData.ratetype_selected === 20 &&
        requestData.percentdiscount !== "";
      if (
        (isValidRate ||
          isSelectedRateTypeGPP ||
          parentContext?.ratesRulesStatus == "C" ||
          isFloatAccAndDiscountExist) &&
        ((appContext.isMarkAsCompleteChecked &&
          (appContext?.user?.isAdminRole ||
            appContext?.user?.isLimitedSalesUser ||
            appContext?.user?.isSalesUser)) ||
          appContext?.user?.isHotelUser)
      ) {
        const hotelspecificData = JSON.parse(
          localStorage.getItem("hotelAccountSpecificData")
        );
        let status;
        if (
          hotelspecificData?.showrebid === "Y" &&
          (appContext.user.isHotelUser ||
            appContext.user.isLimitedSalesUser ||
            (appContext?.user?.isSalesUser &&
              appContext.isMarkAsCompleteChecked)) &&
          appContext.rateRulesTick == "R" &&
          isValidDataBeforeSaveCheck?.accRateChg == "N" &&
          isValidDataBeforeSaveCheck?.altCxlPolicyChg == "N" &&
          isValidDataBeforeSaveCheck?.percentageChg == "N"
        ) {
          status = parentContext.validateDetailsOnMarkAsCompleteChange(
            hotelspecificData,
            "",
            "R"
          );
        } else {
          if (
            hotelspecificData?.showrebid === "Y" &&
            (appContext.user.isHotelUser ||
              appContext.user.isLimitedSalesUser ||
              (appContext?.user?.isSalesUser &&
                appContext.isMarkAsCompleteChecked)) &&
            appContext.rateRulesTick == "R" &&
            (isValidDataBeforeSaveCheck?.accRateChg == "Y" ||
              isValidDataBeforeSaveCheck?.altCxlPolicyChg == "Y" ||
              isValidDataBeforeSaveCheck?.percentageChg == "Y")
          ) {
            appContext.setPriceRebidScreenFlags({
              rebidTab: appContext.priceRebidScreenFlags.rebidTab,
              ratesRulesTab: "C",
              eligAmenityTab: "C",
              BtQuestionTab: hotelspecificData?.allow_qmodify == "Y" ? "C" : "",
            });
            status = parentContext.validateDetailsOnMarkAsCompleteChange(
              hotelspecificData,
              "",
              "C",
              "C"
            );
          } else {
            const business_case = sessionStorage.getItem("bussinessCase");
            const prevbussinessCase =
              sessionStorage.getItem("prevbussinessCase");
            if (
              appContext?.user?.isHotelUser &&
              business_case == "Y" &&
              prevbussinessCase != business_case &&
              (rm_nights == null || rm_nights == "")
            ) {
              status = parentContext.validateDetailsOnMarkAsCompleteChange(
                hotelspecificData,
                "",
                "R"
              );
            } else {
              status = parentContext.validateDetailsOnMarkAsCompleteChange(
                hotelspecificData,
                "",
                "C"
              );
            }
          }
        }
        if (!status.bOK) {
          appContext.setMarkAsCompleteErrorAlert({
            show: true,
            message: status.msg,
            type: "browserAlert",
          });
        } else {
          appContext.setMarkAsCompleteErrorAlert({
            show: false,
            message: "",
            type: "browserAlert",
          });
        }
      }
    }
    if (bOK.bOK) {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
      appContext.setOneTimeNavigationAlert({
        show: false,
        message: "",
        navigate: false,
      });
    }
    return bOK.bOK;
  };

  const alertOnRemovalReason = () => {
    let alertMsg = null;
    let isRedirect = true;

    const ratesRequestPayload = contextType?.ratesRequestPayload
      ? contextType?.ratesRequestPayload
      : null;

    for (const key in ratesRequestPayload) {
      ratesRequestPayload[key]?.roompoolflags?.map((item) => {
        item.hotelAccountSpecificPGOOSData?.map((innerData, i) => {
          if (
            innerData?.pgoos === "N" &&
            (innerData?.removalreason === "" ||
              innerData?.removalreason == null ||
              innerData?.removalreason === "No Reason Provided.")
          ) {
            alertMsg =
              "Please select a removal reason for Room Pool Group " +
              innerData?.roomClassSequence +
              " and Room Pool Sequence " +
              Number(i + 1);
            isRedirect = false;
            return false;
          }
        });
      });
    }
    if (!isRedirect && alertMsg) {
      appContext.setErrorMessageAlert({
        show: true,
        message: alertMsg,
        type: "browserAlert",
      });
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };
  const validatePGOOSRemovalReason = () => {
    const roompool =
      contextType?.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags;
    let bOK = true;
    if (!!roompool) {
      for (let index = 0; index < roompool?.length; index++) {
        const item = roompool[index];
        if (
          item?.hotelAccountSpecificPGOOSData &&
          item?.hotelAccountSpecificPGOOSData?.length > 0 &&
          bOK
        ) {
          for (
            let i = 0;
            i < item?.hotelAccountSpecificPGOOSData?.length;
            i++
          ) {
            const data = item?.hotelAccountSpecificPGOOSData[i];
            if (
              data.pgoos == "N" &&
              (data.removalreason == "" ||
                data.removalreason == null ||
                data.removalreason == "No Reason Provided.")
            ) {
              bOK = false;
              appContext.setErrorMessageAlert({
                show: true,
                message:
                  "Please select a removal reason for room pool group " +
                  data?.roomClassSequence +
                  " and room pool sequence " +
                  data?.roomPoolSequence,
                type: "browserAlert",
              });
              break;
            }
          }
        }
      }
    }
    if (bOK) {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
    return bOK;
  };

  const validateRejectReason = () => {
    const roompool =
      contextType?.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags;
    let bOK = true;
    if (!!roompool && roompool.length > 0) {
      roompool.slice().forEach((room, id) => {
        const accepted = room?.accepted;
        const rejectReason = room?.rejectionreason;
        if (
          appContext?.user?.isLimitedSalesUser ||
          appContext?.user?.isSalesUser
        ) {
          if (
            accepted == "N" &&
            (rejectReason == "" ||
              rejectReason == null ||
              rejectReason == "No Reason Provided." ||
              rejectReason == "No reason given")
          ) {
            appContext.setErrorMessageAlert({
              show: true,
              message: `Please select a rejection reason for room pool ${
                id + 1
              }`,
              type: "browserAlert",
            });
            bOK = false;
          }
        }
      });
    }
    if (bOK) {
      roompool.slice().forEach((room, id) => {
        const rejectReason = room?.rejectionreason;
        if (
          rejectReason == "" ||
          rejectReason == null ||
          rejectReason == "No Reason Provided." ||
          rejectReason == "No reason given"
        ) {
          room.hotelAccountSpecificPGOOSData?.map((innerData) => {
            if (
              innerData?.pgoos === "N" &&
              (innerData?.removalreason === "" || !innerData?.removalreason)
            ) {
              return false;
            }
          });
        }
      });
      if (bOK) {
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    }
    return bOK;
  };

  const handleBlurStartDateValidate = (
    StartDate,
    seasonid,
    mainIndex,
    endDate
  ) => {
    if (contextType?.showcopyButton && StartDate != "" && dateChangeEdit) {
      contextType.setshowcopyButton(false);
    }
    const tRowData = tableRows?.hotelAccountSpecific?.hotelAccountSpecificData;
    const contractStartDate =
      moment(
        tableRows.hotelAccountSpecific?.hotelAccountSpecificData?.contractstart,
        "MM/DD/YYYY",
        true
      ).isValid() ||
      moment(
        tableRows.hotelAccountSpecific?.hotelAccountSpecificData?.contractstart,
        "M/D/YYYY",
        true
      ).isValid()
        ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData
            ?.contractstart
        : moment
            .utc(
              tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractstart
            )
            .tz(Settings.labels.timeZone)
            .format("MM/DD/YYYY");
    if (StartDate) {
      if (
        changedSeason.idx == mainIndex &&
        changedSeason.type == "start" &&
        changedSeason.seasonId == seasonid &&
        changedSeason.validationCheck
      ) {
        const validDate = appContext.user.isHotelUser
          ? contextType.ValidateDate(StartDate)
          : Utils.isDate(StartDate);
        if (!validDate) {
          const currentValues: any = dynamicRows[mainIndex].accountSeason || [];

          const updateItem = {
            ...currentValues,
            startdate: appContext.user.isHotelUser ? StartDate : StartDate,
            seasonid,
          };
          dynamicRows[mainIndex].accountSeason = updateItem;
          setIsValidDate(false);
          if (!props.isBTGroupPage) {
            const dataCheck = JSON.parse(
              localStorage.getItem("ratesTableValidData")
            );
            dataCheck.isDateValid = false;
            dataCheck.seasonChg = "Y";
            localStorage.setItem(
              "ratesTableValidData",
              JSON.stringify(dataCheck)
            );
          }
          setChangedSeason({
            ...changedSeason,
            validationCheck: false,
          });
          setDynamicRows([...dynamicRows]);
        } else {
          setIsValidDate(true);
          if (!props.isBTGroupPage) {
            const dataCheck = JSON.parse(
              localStorage.getItem("ratesTableValidData")
            );
            dataCheck.isDateValid = true;
            dataCheck.seasonChg = "Y";
            const checkStartYearFormat = checkYearFormat(StartDate);
            if (StartDate && !checkStartYearFormat.bOK) {
              alert(checkStartYearFormat.strErrorMsg);
              dataCheck.isDateValid = false;
            } else if (Utils.isOnOrBeforeDate(endDate, StartDate)) {
              alert(
                "The start date must be on or before the contract end date. ( " +
                  endDate +
                  ")"
              );
              dataCheck.isDateValid = false;
            } else if (Utils.isOnOrAfterDate(contractStartDate, StartDate)) {
              alert(
                "The start date must be on or after the contract start date. ( " +
                  contractStartDate +
                  ")"
              );
              dataCheck.isDateValid = false;
            } else {
              const prevEndDateValue =
                dynamicRows[mainIndex - 1].accountSeason || [];

              // if (Utils.isOnOrBeforeDate(StartDate, prevEndDateValue?.strEnddate)) {
              const modifiedEndDate = Utils.getPrev(StartDate);

              const updateItem = {
                ...prevEndDateValue,
                enddate: modifiedEndDate,
              };
              dynamicRows[mainIndex - 1].accountSeason = updateItem;
              setDynamicRows([...dynamicRows]);
            }
            setChangedSeason({
              ...changedSeason,
              validationCheck: false,
            });
            localStorage.setItem(
              "ratesTableValidData",
              JSON.stringify(dataCheck)
            );
          } else {
            const checkStartYearFormat = checkYearFormat(StartDate);
            if (StartDate && !checkStartYearFormat.bOK) {
              alert(checkStartYearFormat.strErrorMsg);
            } else if (Utils.isOnOrBeforeDate(endDate, StartDate)) {
              alert(
                "The start date must be on or before the contract end date. ( " +
                  endDate +
                  ")"
              );
            } else if (Utils.isOnOrAfterDate(contractStartDate, StartDate)) {
              alert(
                "The start date must be on or after the contract start date. ( " +
                  contractStartDate +
                  ")"
              );
            } else {
              const prevEndDateValue =
                dynamicRows[mainIndex - 1].accountSeason || [];

              const modifiedEndDate = Utils.getPrev(StartDate);

              const updateItem = {
                ...prevEndDateValue,
                enddate: modifiedEndDate,
              };
              dynamicRows[mainIndex - 1].accountSeason = updateItem;
              setDynamicRows([...dynamicRows]);
            }
            setChangedSeason({
              ...changedSeason,
              validationCheck: false,
            });
          }
        }
      }
    }
  };

  const handleBlurEndDateValidate = (
    StartDate,
    seasonid,
    mainIndex,
    endDate
  ) => {
    if (contextType?.showcopyButton && endDate != "" && dateChangeEdit) {
      contextType.setshowcopyButton(false);
    }
    if (endDate) {
      if (
        changedSeason.idx == mainIndex &&
        changedSeason.type == "end" &&
        changedSeason.seasonId == seasonid &&
        changedSeason.validationCheck
      ) {
        const tRowData =
          tableRows?.hotelAccountSpecific?.hotelAccountSpecificData;
        const contarctEndDate =
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "MM/DD/YYYY",
            true
          ).isValid() ||
          moment(
            tableRows.hotelAccountSpecific?.hotelAccountSpecificData
              ?.contractend,
            "M/D/YYYY",
            true
          ).isValid()
            ? tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                ?.contractend
            : moment
                .utc(
                  tableRows.hotelAccountSpecific?.hotelAccountSpecificData
                    ?.contractend
                )
                .tz(Settings.labels.timeZone)
                .format("MM/DD/YYYY");
        const validDate = appContext.user.isHotelUser
          ? contextType.ValidateDate(endDate)
          : Utils.isDate(endDate);
        if (!validDate) {
          const currentValues: any = dynamicRows[mainIndex].accountSeason || [];

          const updateItem = {
            ...currentValues,
            enddate: appContext.user.isHotelUser ? endDate : endDate,
            seasonid,
          };
          dynamicRows[mainIndex].accountSeason = updateItem;
          setIsValidDate(false);
          if (!props.isBTGroupPage) {
            const dataCheck = JSON.parse(
              localStorage.getItem("ratesTableValidData")
            );
            dataCheck.isDateValid = false;
            dataCheck.seasonChg = "Y";
            localStorage.setItem(
              "ratesTableValidData",
              JSON.stringify(dataCheck)
            );
          }
          setChangedSeason({
            ...changedSeason,
            validationCheck: false,
          });
          setDynamicRows([...dynamicRows]);
        } else {
          setIsValidDate(true);
          if (!props.isBTGroupPage) {
            const dataCheck = JSON.parse(
              localStorage.getItem("ratesTableValidData")
            );
            dataCheck.isDateValid = true;
            dataCheck.seasonChg = "Y";
            const checkStartYearFormat = checkYearFormat(endDate);
            if (endDate && !checkStartYearFormat.bOK) {
              alert(checkStartYearFormat.strErrorMsg);
              dataCheck.isDateValid = false;
            } else if (Utils.isOnOrAfterDate(endDate, contarctEndDate)) {
              alert(
                "The end date must be on or before the contract end date. ( " +
                  contarctEndDate +
                  ")"
              );
              dataCheck.isDateValid = false;
            } else if (Utils.isOnOrAfterDate(StartDate, endDate)) {
              alert(
                "The end date must be on or after the contract start date. ( " +
                  StartDate +
                  ")"
              );
              dataCheck.isDateValid = false;
            } else {
              const prevStartDateValue =
                dynamicRows[mainIndex + 1].accountSeason || [];

              // if (Utils.isOnOrBeforeDate(StartDate, prevEndDateValue?.strEnddate)) {
              const modifiedEndDate = Utils.getNext(endDate);

              const updateItem = {
                ...prevStartDateValue,
                startdate: modifiedEndDate,
                seasonid: prevStartDateValue?.name,
              };
              dynamicRows[mainIndex + 1].accountSeason = updateItem;
              setDynamicRows([...dynamicRows]);
              //
            }
            setChangedSeason({
              ...changedSeason,
              validationCheck: false,
            });
            localStorage.setItem(
              "ratesTableValidData",
              JSON.stringify(dataCheck)
            );
          } else {
            const checkStartYearFormat = checkYearFormat(endDate);
            if (endDate && !checkStartYearFormat.bOK) {
              alert(checkStartYearFormat.strErrorMsg);
            } else if (Utils.isOnOrAfterDate(endDate, contarctEndDate)) {
              alert(
                "The end date must be on or before the contract end date. ( " +
                  contarctEndDate +
                  ")"
              );
            } else if (Utils.isOnOrAfterDate(StartDate, endDate)) {
              alert(
                "The end date must be on or after the contract start date. ( " +
                  StartDate +
                  ")"
              );
            } else {
              const prevStartDateValue =
                dynamicRows[mainIndex + 1].accountSeason || [];

              const modifiedEndDate = Utils.getNext(endDate);

              const updateItem = {
                ...prevStartDateValue,
                startdate: modifiedEndDate,
                seasonid: prevStartDateValue?.name,
              };
              dynamicRows[mainIndex + 1].accountSeason = updateItem;
              setDynamicRows([...dynamicRows]);
            }
            setChangedSeason({
              ...changedSeason,
              validationCheck: false,
            });
          }
        }
      }
    }
  };

  const handleChangeAltcxlpolicytimeid = (hasd, user, event) => {
    const hasAlert = checkRuleCancellation(hasd, user, event);
    const currCancel = hasAlert
      ? parseInt(hasd.altcxlpolicytimeid)
      : event.target.value === ""
      ? 0
      : parseInt(event.target.value);
    contextType.setRatesRequestPayload({
      ...contextType.ratesRequestPayload,
      [hotel_accountinfoid]: {
        ...contextType.ratesRequestPayload[hotel_accountinfoid],
        altcxlpolicytimeid: currCancel,
      },
    });
    parentContext?.setAltCxlPolicyTimeId &&
      parentContext?.setAltCxlPolicyTimeId(currCancel);
    if (event.target.value !== "") {
      appContext.setRateRulesValidationErr(false);
      appContext.setRateRulesValidationMsg("");
    }
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.altCxlPolicyChg = hasAlert ? "N" : "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
  };

  const checkRuleCancellation = (hasd, user, event): boolean => {
    appContext.rateRulesValidationAccLockedMsg = "";
    let hasAlert = false;
    let prevCancelOrder, currCancelOrder, htlstdcxltimeidorder;
    const htlstdcxltimeid = hasd.htlstdcxltime;
    htlstdcxltimeidorder = hasd?.cxlorderlist?.filter(
      (c) => c.altcancelpolicytimeid === htlstdcxltimeid
    )[0]?.cxlorder;
    const prevCancel = hasd.altcxlpolicytimeid;
    if (prevCancel != 0) {
      const order = hasd.cxlorderlist.filter(
        (c) => c.altcancelpolicytimeid === prevCancel
      )[0].cxlorder;
      prevCancelOrder = order && parseInt(order);
    } else {
      prevCancelOrder = 0;
    }
    const currCancel =
      typeof event.target.value == "string"
        ? parseInt(event.target.value)
        : event.target.value;
    if (isNaN(currCancel)) {
      currCancelOrder = 0;
    } else if (currCancel == 0) {
      currCancelOrder = 0;
    } else {
      const currOrder =
        typeof event.target.value == "string"
          ? parseInt(event.target.value)
          : event.target.value;
      currCancelOrder = hasd.cxlorderlist.filter(
        (c) => c.altcancelpolicytimeid === currOrder
      )[0].cxlorder;
    }
    const isSelected = hasd?.isSelected && hasd.isSelected;
    const rateCxl = "N";
    let changedRates = true;
    if (htlstdcxltimeid != 0) {
      if (htlstdcxltimeidorder < currCancelOrder) {
        if (user?.isLimitedSalesUser || user?.isHotelUser) {
          if (rateCxl == "N") {
            changedRates = false;
          }
          if (prevCancel != 0) {
            document.getElementById(
              "hasd[140349897].altcxlpolicytimeid"
            ).value = prevCancel;
            if (!props.isBTGroupPage) {
              const dataCheck = JSON.parse(
                localStorage.getItem("ratesTableValidData")
              );
              dataCheck.altCxlPolicyChg = "N";
              localStorage.setItem(
                "ratesTableValidData",
                JSON.stringify(dataCheck)
              );
            }
          } else {
            document.getElementById(
              "hasd[140349897].altcxlpolicytimeid"
            ).value = 0;
          }
          appContext.rateRulesValidationAccLockedMsg = "true";
          alert(Settings.alerts.cancellationExceed);
          appContext.rateRulesAllValidationMsg =
            Settings.alerts.cancellationExceed;
          hasAlert = true;
        } else {
          appContext.rateRulesValidationAccLockedMsg = "";
          appContext.rateRulesAllValidationMsg = "";
        }
      } else {
        if (prevCancel != 0) {
          if (isSelected == "Y") {
            if (user?.isLimitedSalesUser || user?.isHotelUser) {
              if (prevCancelOrder < currCancelOrder) {
                appContext.rateRulesValidationAccLockedMsg = "true";
                alert(Settings.alerts.accountLocked);
                appContext.rateRulesAllValidationMsg =
                  Settings.alerts.accountLocked;
                hasAlert = true;
                document.getElementById(
                  "hasd[140349897].altcxlpolicytimeid"
                ).value = prevCancel;
                if (!props.isBTGroupPage) {
                  const dataCheck = JSON.parse(
                    localStorage.getItem("ratesTableValidData")
                  );
                  dataCheck.altCxlPolicyChg = "N";
                  localStorage.setItem(
                    "ratesTableValidData",
                    JSON.stringify(dataCheck)
                  );
                }
                if (rateCxl == "N") {
                  changedRates = false;
                }
              } else if (prevCancel == currCancel) {
                if (rateCxl == "N") {
                  changedRates = false;
                }
                appContext.rateRulesValidationAccLockedMsg = "true";
                appContext.rateRulesAllValidationMsg = "";
              }
            }
          }
        }
      }
    } else {
      if (prevCancel != 0) {
        if (isSelected == "Y") {
          if (user?.isLimitedSalesUser || user?.isHotelUser) {
            if (prevCancelOrder < currCancelOrder) {
              appContext.rateRulesValidationAccLockedMsg = "true";
              alert(Settings.alerts.accountLocked);
              appContext.rateRulesAllValidationMsg =
                Settings.alerts.accountLocked;
              hasAlert = true;
              document.getElementById(
                "hasd[140349897].altcxlpolicytimeid"
              ).value = prevCancel;
              if (!props.isBTGroupPage) {
                const dataCheck = JSON.parse(
                  localStorage.getItem("ratesTableValidData")
                );
                dataCheck.altCxlPolicyChg = "N";
                localStorage.setItem(
                  "ratesTableValidData",
                  JSON.stringify(dataCheck)
                );
              }
              if (rateCxl == "N") {
                changedRates = false;
              }
            } else if (prevCancel == currCancel) {
              if (rateCxl == "N") {
                changedRates = false;
              }
              appContext.rateRulesValidationAccLockedMsg = "";
              appContext.rateRulesAllValidationMsg = "";
            }
          }
        }
      }
    }
    return hasAlert;
  };

  const handleChangRm_nights = (event) => {
    contextType.setRatesRequestPayload({
      ...contextType.ratesRequestPayload,
      [hotel_accountinfoid]: {
        ...contextType.ratesRequestPayload[hotel_accountinfoid],
        hotelAccountSpecificFacility: {
          ...contextType.ratesRequestPayload[hotel_accountinfoid]
            ?.hotelAccountSpecificFacility,
          rm_nights:
            event.target.value === "" || event.target.value % 1 != 0
              ? null
              : event.target.value,
        },
      },
    });
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.rmNightsChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
      sessionStorage.setItem(
        "roomnight",
        event.target.value === "" || event.target.value % 1 != 0
          ? null
          : event.target.value
      );
    }
    contextType.setIsFormChanged("Y");
    contextType.setFormEdited(!contextType.formEdited);
  };

  const handleChangeWaiveEarlyCharge = (event) => {
    const isWaived = event.target.checked;
    if (
      isWaived === false &&
      hasd?.isSelected &&
      hasd?.isSelected === "Y" &&
      appContext?.user?.hasLimitedHotels
    ) {
      alert("You cannot flip value to No when hotel is in portfolio.");
      contextType.setRatesRequestPayload({
        ...contextType.ratesRequestPayload,
        [hotel_accountinfoid]: {
          ...contextType.ratesRequestPayload[hotel_accountinfoid],
          waiveearlycharge: "Y",
        },
      });
    } else {
      contextType.setRatesRequestPayload({
        ...contextType.ratesRequestPayload,
        [hotel_accountinfoid]: {
          ...contextType.ratesRequestPayload[hotel_accountinfoid],
          waiveearlycharge: event.target.checked ? "Y" : "N",
        },
      });
    }
    if (!props.isBTGroupPage) {
      const dataCheck = JSON.parse(localStorage.getItem("ratesTableValidData"));
      dataCheck.waiveEarlyChg = "Y";
      localStorage.setItem("ratesTableValidData", JSON.stringify(dataCheck));
    }
  };

  const handleGetRejectLink = (roomtypeItemndex) => {
    const isNo =
      contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags &&
      contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
        roomtypeItemndex
      ]?.accepted === "N";
    if (isNo) {
      if (
        !contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
          roomtypeItemndex
        ]?.rejectionreason
      ) {
        return "No Reason Provided.";
      } else {
        return contextType.ratesRequestPayload[hotel_accountinfoid]
          ?.roompoolflags[roomtypeItemndex]?.rejectionreason;
      }
    }
  };

  const handleGetRoomPoolPgoogsLink = (roomtypeItemndex, pIndx) => {
    const currentPoogsData =
      (contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags &&
        contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
          roomtypeItemndex
        ]?.hotelAccountSpecificPGOOSData?.filter(
          (poogs) => poogs.roomPoolSequence === pIndx
        )) ||
      [];
    const isNo = currentPoogsData[0]?.pgoos === "N";
    const removalreason = currentPoogsData[0]?.removalreason;
    if (isNo && currentPoogsData.length > 0) {
      if (removalreason) {
        return removalreason;
      } else {
        return "No Reason Provided.";
      }
    }

    return "";
  };
  const handleGetConditionalRows = (idx, dynamicItem) => {
    const lastIndex = dynamicRows.length - 1;
    const hasvi = tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo;
    const accountStatusValue =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.accountStatus;

    const seasonItem = dynamicItem?.accountSeason;
    const seasonKey = seasonItem.seasonid;
    const tRowData = tableRows?.hotelAccountSpecific?.hotelAccountSpecificData;
    return Object.entries(dynamicItem?.accountLOS).map(
      ([losKey, losItem], losItemIndex) => {
        return (
          <Fragment>
            <tr className={styles.gridRow}>
              {!hasvi.seasonsEditable && hasvi.rategridLOSwidth === 0 && (
                <td
                  rowSpan={3}
                  className="gridCell"
                  style={{ width: "20px", padding: "0px" }}
                >
                  <div style={{ width: "20px", height: "1em" }} />
                </td>
              )}
              {hasvi.seasonsEditable && (
                <td style={{ width: 20, padding: 0 }} className="gridCell">
                  {losItemIndex === 0 && (
                    <div className={styles.insertAdd}>
                      <label
                        className="AddDelRow"
                        title="Insert Season"
                        onClick={() => handleAddRows(idx)}
                      >
                        +
                      </label>
                      <label
                        className="AddDelRow"
                        title="Delete Season"
                        onClick={() => {
                          handleRemoveRows(idx);
                        }}
                      >
                        -
                      </label>
                    </div>
                  )}
                </td>
              )}

              <td style={{ width: "240px", borderBottom: "1px solid #ebeadb" }}>
                <div
                  style={
                    tableRows?.hotelAccountSpecific?.hotelAccountSpecificData
                      ?.roompoollist?.length > 2 || hasvi.losEditable
                      ? { width: "241px" }
                      : { width: "240px" }
                  }
                >
                  {losItemIndex === 0 && (
                    <>
                      {appContext?.user?.isHotelUser &&
                      (accountStatusValue == "L" ||
                        accountStatusValue == "D" ||
                        accountStatusValue == "A") ? (
                        `${moment(seasonItem.startdate).format(
                          "MMMM DD, YYYY"
                        )} to ${moment(seasonItem.enddate).format(
                          "MMMM DD, YYYY"
                        )}`
                      ) : (
                        <>
                          {hasvi.seasonsEditable ? (
                            <>
                              <input
                                style={{ width: 90, height: 22 }}
                                className={
                                  idx === 0 || parentContext.isRebidDeclined
                                    ? styles.disabled
                                    : ""
                                }
                                value={
                                  !isEmpty(dynamicItem?.accountSeason)
                                    ? dynamicItem?.accountSeason?.startdate
                                    : ""
                                }
                                onChange={(event) =>
                                  handleChangeSessionStrStartdate(
                                    event,
                                    idx + 2,
                                    seasonItem.seasonid,
                                    idx
                                  )
                                }
                                disabled={
                                  idx === 0 || parentContext.isRebidDeclined
                                }
                                onBlur={() =>
                                  handleBlurStartDateValidate(
                                    !isEmpty(dynamicItem?.accountSeason)
                                      ? dynamicItem?.accountSeason?.startdate
                                      : "",
                                    seasonItem.seasonid,
                                    idx,
                                    dynamicRows[dynamicRows?.length - 1]
                                      ?.accountSeason.enddate
                                      ? dynamicRows[dynamicRows?.length - 1]
                                          ?.accountSeason.enddate
                                      : ""
                                  )
                                }
                              />{" "}
                              <input
                                className={
                                  lastIndex === idx ||
                                  parentContext.isRebidDeclined
                                    ? styles.disabled
                                    : ""
                                }
                                value={
                                  lastIndex === idx
                                    ? dynamicRows[dynamicRows?.length - 1]
                                        ?.accountSeason
                                      ? dynamicRows[dynamicRows?.length - 1]
                                          ?.accountSeason.enddate
                                      : ""
                                    : !isEmpty(dynamicItem?.accountSeason)
                                    ? dynamicItem?.accountSeason?.enddate
                                    : ""
                                    ? !isEmpty(dynamicItem?.accountSeason)
                                      ? dynamicItem?.accountSeason?.enddate
                                      : ""
                                    : ""
                                }
                                onChange={(event) =>
                                  handleChangeSessionStrEnddate(
                                    event,
                                    idx,
                                    seasonItem.seasonid
                                  )
                                }
                                style={{ width: 90, height: 22 }}
                                disabled={
                                  lastIndex === idx ||
                                  parentContext.isRebidDeclined
                                }
                                onBlur={() =>
                                  handleBlurEndDateValidate(
                                    dynamicRows[0]?.accountSeason
                                      ? dynamicRows[0]?.accountSeason?.startdate
                                      : "",
                                    seasonItem.seasonid,
                                    idx,
                                    !isEmpty(dynamicItem?.accountSeason)
                                      ? dynamicItem?.accountSeason?.enddate
                                      : ""
                                  )
                                }
                              />
                            </>
                          ) : (
                            `${moment(seasonItem.startdate).format(
                              "MMMM DD, YYYY"
                            )} to ${moment(seasonItem.enddate).format(
                              "MMMM DD, YYYY"
                            )}`
                          )}
                        </>
                      )}{" "}
                    </>
                  )}
                </div>
              </td>

              {hasvi.rategridLOSwidth > 0 && (
                <>
                  {hasvi.losEditable && (
                    <td
                      className={`gridCell ${styles.wd20} ${styles.p0} ${styles.borderLeft}`}
                    >
                      <div className={styles.wd20}>
                        <label
                          className="AddDelRow"
                          title="Insert Season"
                          onClick={() => addLosOnClick(losItemIndex, idx)}
                        >
                          +
                        </label>
                        <label
                          className={
                            losItemIndex === 0 ? styles.noDisplay : "AddDelRow"
                          }
                          title="Delete Season"
                          onClick={() => delLosOnClick(losItemIndex, idx)}
                        >
                          -
                        </label>
                      </div>
                    </td>
                  )}
                  <td
                    style={{ width: hasvi.rategridLOSwidth }}
                    className={`${styles.gridCellLOS}`}
                  >
                    <div className={styles.inputDate}>
                      {!hasvi.losEditable ? (
                        dynamicItem?.accountLOS[losKey]?.roomnightsfrom
                      ) : (
                        <input
                          type={hasvi.losInputType}
                          value={
                            dynamicItem?.accountLOS[losKey]?.roomnightsfrom
                          }
                          maxLength={3}
                          style={{ width: 25 }}
                          disabled={
                            losItemIndex === 0 || parentContext.isRebidDeclined
                          }
                          onChange={(event) =>
                            onLosChangeHandler(
                              event,
                              losItemIndex,
                              "roomnightsfrom",
                              idx
                            )
                          }
                          onBlur={(event) => {
                            return checkLosStart(event, losItemIndex, idx);
                          }}
                        />
                      )}
                      -{" "}
                      {!hasvi.losEditable ? (
                        dynamicItem?.accountLOS[losKey]?.roomnightsto
                      ) : (
                        <input
                          type={hasvi.losInputType}
                          value={dynamicItem?.accountLOS[losKey]?.roomnightsto}
                          maxLength={3}
                          style={{ width: 25 }}
                          onChange={(event) =>
                            onLosChangeHandler(
                              event,
                              losItemIndex,
                              "roomnightsto",
                              idx
                            )
                          }
                          onBlur={(event) => {
                            return updateLosNext(
                              event,
                              losKey,
                              losItemIndex,
                              idx,
                              seasonKey
                            );
                          }}
                          disabled={parentContext.isRebidDeclined}
                        />
                      )}
                    </div>
                  </td>
                </>
              )}
              {/* {tRowData?.roompoollist.map((roompoolItem, roompoolItemIndex) => {
                return (
                  <Fragment>
                    <td
                      key={roompoolItemIndex}
                      className={`${styles.loopType} ${
                        roompoolItemIndex === 0
                          ? styles.gridHeaderLeft
                          : styles.gridHeaderLeftLight
                      } ${styles.wd196} ${styles.p0} ${styles.borderBottom}`}
                    >
                      <div className={styles.wd196}>
                        {tRowData?.roomtypelist.map(
                          (roomtypeItem, roomtypeItemndex) => {
                            const sq = `${idx + 1}_${losItem.lengthofstayid}_${
                              roompoolItem.seq
                            }_1_${roomtypeItem.roomtypeid}`;
                            return (
                              <div
                                key={roomtypeItemndex}
                                style={{
                                  width: "98px",
                                  float: "left",
                                  textAlign: "right",
                                }}
                                className="gridCellNumber"
                              >
                                {hasvi?.fixedEditable ? (
                                  <input
                                    type="text"
                                    onKeyPress={
                                      Utils.NumberAndFloatOnly_onkeypress
                                    }
                                    title="Type only digits and decimal seperator, if any"
                                    value={
                                      dynamicItem.fixedRates[sq]
                                        ? dynamicItem?.fixedRates[sq].rate
                                        : ""
                                    }
                                    onChange={(event) =>
                                      handleChangeFixedRates(
                                        event.target.value,
                                        sq,
                                        dynamicItem?.fixedRates[sq],
                                        idx
                                      )
                                    }
                                    onBlur={() => handleAccountsBlur(
                                      idx,
                                      sq,
                                      "fixedRates"
                                    )}
                                    style={{ width: 90 }}
                                    disabled={parentContext.isRebidDeclined}
                                  />
                                ) : (
                                  <span
                                    style={{
                                      textAlign: "right",
                                      float: "right",
                                    }}
                                  >
                                    {
                                      // Commented the idx condition for fixing the defect, If it affects any other code changes or we need it in future we can uncomment the below line
                                      // idx === 0 &&
                                      props.isBTGroupPage
                                        ? dynamicItem?.fixedRates[sq]?.rate
                                        : dynamicItem?.fixedRates[sq]
                                            ?.formattedRate
                                    }
                                  </span>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </td>
                  </Fragment>
                );
              })} */}
              {tRowData?.roompoollist.map((roompoolItem, roompoolItemIndex) => {
                return (
                  <Fragment>
                    {tRowData?.lranlratype.map(
                      (lratypeItem, lratypeItemIndex) => {
                        return (
                          <td
                            style={
                              (tRowData?.roompoollist?.length - 1 ===
                                roompoolItemIndex &&
                                tRowData?.lranlratype?.length - 1 ===
                                  lratypeItemIndex) ||
                              (tableRows?.hotelAccountSpecific
                                ?.hotelAccountSpecificData?.roompoollist
                                ?.length <= 2 &&
                                tRowData?.roomtypelist.length <= 1)
                                ? { padding: "0.5px" }
                                : {}
                            }
                            className={`${styles.loopType} ${
                              lratypeItemIndex === 0 ? styles.p0 : styles.p1
                            } ${
                              lratypeItemIndex === 0
                                ? styles.gridHeaderLeft
                                : styles.gridHeaderLeftLight
                            } ${styles.borderBTLRA} ${
                              tableRows?.hotelAccountSpecific
                                ?.hotelAccountSpecificData?.roomtypelist
                                ?.length <= 1
                                ? styles.width143
                                : styles.width196
                            }`}
                            key={roompoolItemIndex}
                          >
                            <div
                              className={
                                tableRows?.hotelAccountSpecific
                                  ?.hotelAccountSpecificData?.roomtypelist
                                  ?.length <= 1
                                  ? styles.width143
                                  : styles.width96
                              }
                            >
                              {tRowData?.roomtypelist.map(
                                (roomtypeItem, roomtypeItemndex) => {
                                  const sq = `${idx + 1}_${
                                    losItem.lengthofstayid
                                  }_${roompoolItem.seq}_${
                                    lratypeItem.productid
                                  }_${roomtypeItem.roomtypeid}`;

                                  const rowSq = `${seasonItem.seasonid}_${losItem.lengthofstayid}_${roompoolItem.seq}_${lratypeItem.productid}_${roomtypeItem.roomtypeid}`;
                                  const tData =
                                    tableRows.hotelAccountSpecific
                                      ?.hotelAccountSpecificData;
                                  const ratekey =
                                    seasonKey +
                                    "_" +
                                    losItem[Settings.keys.lengthofstayid] +
                                    "_" +
                                    roompoolItem.seq +
                                    "_" +
                                    lratypeItem.productid +
                                    "_" +
                                    roomtypeItem.roomtypeid;
                                  return (
                                    <div
                                      key={roomtypeItemndex}
                                      style={{
                                        width: "98px",
                                        float: "left",
                                        textAlign: "right",
                                      }}
                                      className={`gridCellNumber ${
                                        lratypeItemIndex === 0
                                          ? styles.gridHeaderLeft
                                          : styles.gridHeaderLeftLight
                                      }`}
                                    >
                                      {tData?.ratetype_selected === 18 ? (
                                        dynamicItem?.accountRates[sq]?.rate
                                      ) : tData?.ratetype_selected ==
                                        20 ? null : !hasvi?.ratesReadOnly ? (
                                        <input
                                          onKeyPress={
                                            Utils.NumberAndFloatOnly_onkeypress
                                          }
                                          type="text"
                                          className={styles.rateEntry}
                                          name={sq}
                                          value={
                                            dynamicItem.accountRates[sq]
                                              ? dynamicItem?.accountRates[sq]
                                                  .rate
                                              : ""
                                          }
                                          onChange={(event) =>
                                            handleChangeAccountRates(
                                              event.target.value,
                                              sq,
                                              dynamicItem?.accountRates[sq],
                                              idx
                                            )
                                          }
                                          onBlur={() =>
                                            handleAccountsBlur(
                                              idx,
                                              sq,
                                              "accountRates"
                                            )
                                          }
                                          title="Type only digits and decimal seperator, if any"
                                          disabled={
                                            parentContext.isRebidDeclined
                                          }
                                        />
                                      ) : (
                                        <span
                                          style={{
                                            textAlign: "right",
                                            float: "right",
                                          }}
                                        >
                                          {
                                            // Commented the idx condition for fixing the defect, If it affects any other code changes or we need it in future we can uncomment the below line
                                            // idx === 0 &&
                                            props.isBTGroupPage
                                              ? dynamicItem?.accountRates[sq]
                                                  ?.rate
                                              : dynamicItem?.accountRates[sq]
                                                  ?.formattedRate
                                          }
                                        </span>
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </td>
                        );
                      }
                    )}
                  </Fragment>
                );
              })}
            </tr>
          </Fragment>
        );
      }
    );
  };

  const tableDynamicRows = () => {
    const tRowData = tableRows?.hotelAccountSpecific?.hotelAccountSpecificData;
    const roomtypelist =
      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData.roomtypelist;
    if (tRowData) {
      return (
        dynamicRows.length > 0 &&
        dynamicRows.map((item, index) => {
          return (
            <table
              className={`S3qLIbnqazcUDhpD1pwI- ${
                parentContext.isRebidDeclined ? styles.rowDisable : ""
              }`}
              cellPadding={0}
              cellSpacing={0}
              id="gridTableView_118044230"
              style={{ height: "25px" }}
            >
              <tbody>{handleGetConditionalRows(index, item)}</tbody>
            </table>
          );
        })
      );
    }
  };
  const handleCopySeasons = (rfpid, ratetype, acctype, hotel_accountinfoid) => {
    const params = {
      hotel_accountinfoid: hotel_accountinfoid,
      newratetype_selected: ratetype,
      hotelrfpid: rfpid,
      accounttype: acctype,
    };
    if (contextType.showcopyButton) {
      contextType.setshowcopyButton(false);
    }
    contextType.handleCopySeasonsData(
      params,
      rfpid,
      ratetype,
      acctype,
      hotel_accountinfoid
    );
  };
  let isDefaultSeason = false;
  hasd?.accountSeason.map((season) => {
    return season.seasonid == 1
      ? (isDefaultSeason = true)
      : (isDefaultSeason = false);
  });

  return (
    <>
      <CRemovalReasonModal
        removalReason={contextType.removalReason}
        closeModal={closeModal}
        showModal={showModal}
        handleSaveUpdateReason={handleSaveUpdateReason}
        selectedItem={removeReasonCurrentIndex?.removalreasonid}
      />

      <CRemovalReasonModal
        removalReason={contextType.rejectReason}
        closeModal={handleCloseRejectModal}
        showModal={showRejectReasonModal}
        handleSaveUpdateReason={handleChangeRejectReason}
        selectedItem={
          contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags &&
          contextType.ratesRequestPayload[hotel_accountinfoid]?.roompoolflags[
            currentRejectReason?.key
          ]?.rejectreasonid
        }
        isRejectReasonModal={true}
      />
      <div className={styles.raterListContainer}>
        <div
          className={
            tableRows?.hotelAccountSpecific?.hotelAccountSpecificData
              ?.roompoollist?.length > 1
              ? styles.rateListWrap
              : styles.rateListOnepool
          }
        >
          {contextType?.showcopyButton &&
          tableRows?.hotelAccountSpecific?.hotelAccountSpecificData
            ?.accountSeason[0]?.rfpseasonid == 1 &&
          !props.isBTGroupPage &&
          hasd?.isSelected != "Y" &&
          hasd?.accountpricingcycleid == 1 &&
          hasd?.maxseasons >= hasd?.numGeneralSeason &&
          hasd?.ratetype_selected != 20 &&
          hasd?.ratetype_selected == hasd?.ratetypeid &&
          isDefaultSeason ? (
            <a
              onClick={() => {
                handleCopySeasons(
                  hasd?.hotelrfpid,
                  hasd?.ratetype_selected,
                  hasd?.accounttype,
                  hasd?.hotel_accountinfoid
                );
              }}
            >
              <img src={copySeasonbtn} alt="button" />
            </a>
          ) : null}
          <tr>
            <table
              style={{
                height: "32px",
                border: "none",
                backgroundColor: "#FFFFFF",
                marginBottom: "1px",
              }}
              id="gridTableHeader_118044230"
              cellSpacing={0}
              cellPadding={0}
            >
              <tbody>
                <tr>
                  {tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo
                    ?.seasonsEditable && (
                    <th style={{ width: "20px" }} rowSpan={3}>
                      <div style={{ width: "20px", height: "1em" }} />
                    </th>
                  )}
                  <th
                    className={styles.topTh}
                    rowSpan={3}
                    style={{ width: "240px" }}
                  >
                    <div style={{ width: "240px" }}>{/* Seasons */}</div>
                  </th>
                  {tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo
                    ?.losEditable && <th className={styles.wd20}></th>}
                  <th
                    className={styles.topThEmpty}
                    style={
                      tableRows?.hotelAccountSpecific
                        ?.hotelAccountSpecificViewInfo?.rategridLOSwidth > 0
                        ? { width: "82px" }
                        : {
                            width: `${
                              tableRows?.hotelAccountSpecific
                                ?.hotelAccountSpecificViewInfo?.seasonsEditable
                                ? "1px"
                                : "21px"
                            }`,
                          }
                    }
                    rowSpan={3}
                  ></th>
                  {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roompoollist.map(
                    (roomtypeItem, roomtypeItemndex) => {
                      return (
                        <th
                          style={{
                            border: "1px solid #FFFFFF",
                            width:
                              tableRows?.hotelAccountSpecific
                                ?.hotelAccountSpecificData?.roompoollist
                                ?.length -
                                1 ===
                              roomtypeItemndex
                                ? tableRows?.hotelAccountSpecific
                                    ?.hotelAccountSpecificData?.roomtypelist
                                    ?.length <= 1
                                  ? "286px"
                                  : "392px"
                                : tableRows?.hotelAccountSpecific
                                    ?.hotelAccountSpecificData?.roomtypelist
                                    ?.length <= 1
                                ? "286px"
                                : "396px",
                            minWidth:
                              tableRows?.hotelAccountSpecific
                                ?.hotelAccountSpecificData?.roompoollist
                                ?.length -
                                1 ===
                              roomtypeItemndex
                                ? tableRows?.hotelAccountSpecific
                                    ?.hotelAccountSpecificData?.roomtypelist
                                    ?.length <= 1
                                  ? "286px"
                                  : "392px"
                                : tableRows?.hotelAccountSpecific
                                    ?.hotelAccountSpecificData?.roomtypelist
                                    ?.length <= 1
                                ? "286px"
                                : "396px",
                            marginRight:
                              tableRows?.hotelAccountSpecific
                                ?.hotelAccountSpecificData?.roompoollist
                                ?.length -
                                1 ===
                              roomtypeItemndex
                                ? "0"
                                : "1px",
                          }}
                          colSpan={2}
                        >
                          <table
                            className={
                              tableRows?.hotelAccountSpecific
                                ?.hotelAccountSpecificData?.roomtypelist
                                ?.length <= 1
                                ? styles.widthTb286
                                : styles.widthTb392
                            }
                            cellSpacing={0}
                            cellPadding={0}
                          >
                            <tbody>
                              <tr
                                style={
                                  !appContext?.user?.isHotelUser &&
                                  tableRows?.hotelAccountSpecific
                                    ?.hotelAccountSpecificData?.roomtypelist
                                    ?.length <= 1
                                    ? { display: "block" }
                                    : {}
                                }
                              >
                                <td
                                  className={styles.field_Name}
                                  style={{ width: "60px" }}
                                >
                                  LRA?
                                </td>
                                {!appContext?.user?.isPASorAnySales ||
                                appContext?.user?.isReadOnly ? (
                                  <span>
                                    {contextType.ratesRequestPayload[
                                      hotel_accountinfoid
                                    ]?.roompoolflags[roomtypeItemndex]?.lra ===
                                    "Y"
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                ) : (
                                  <td
                                    className={
                                      tableRows?.hotelAccountSpecific
                                        ?.hotelAccountSpecificData?.roomtypelist
                                        ?.length <= 1
                                        ? styles.pl40
                                        : ""
                                    }
                                    colSpan={2}
                                  >
                                    <select
                                      name="hasd[118044230].roompoolflags[1].lra"
                                      id="hasd[118044230].roompoolflags[1].lra"
                                      value={
                                        contextType.ratesRequestPayload[
                                          hotel_accountinfoid
                                        ]?.roompoolflags &&
                                        contextType.ratesRequestPayload[
                                          hotel_accountinfoid
                                        ]?.roompoolflags[roomtypeItemndex]?.lra
                                      }
                                      onChange={(event) =>
                                        handleChangeRoomFlagsLRA(
                                          event,
                                          roomtypeItemndex + 1
                                        )
                                      }
                                    >
                                      <option value="Y">Yes</option>
                                      <option value="N">No</option>
                                    </select>
                                  </td>
                                )}
                              </tr>
                              <tr
                                style={
                                  !appContext?.user?.isHotelUser &&
                                  tableRows?.hotelAccountSpecific
                                    ?.hotelAccountSpecificData?.roomtypelist
                                    ?.length <= 1
                                    ? { display: "block" }
                                    : {}
                                }
                              >
                                <td
                                  className={styles.field_Name}
                                  style={{ width: "60px" }}
                                >
                                  Accepted
                                </td>
                                {(!appContext?.user?.isPASorAnySales &&
                                  hasd?.roompooldetails[roomtypeItemndex]
                                    ?.isSelected &&
                                  hasd?.roompooldetails[roomtypeItemndex]
                                    ?.isSelected === "Y") ||
                                appContext?.user?.isReadOnly ? (
                                  <span>
                                    {contextType.ratesRequestPayload[
                                      hotel_accountinfoid
                                    ]?.roompoolflags[roomtypeItemndex]
                                      ?.accepted === "Y"
                                      ? "Yes"
                                      : contextType.ratesRequestPayload[
                                          hotel_accountinfoid
                                        ]?.roompoolflags[roomtypeItemndex]
                                          ?.accepted === "N"
                                      ? "No"
                                      : contextType.ratesRequestPayload[
                                          hotel_accountinfoid
                                        ]?.roompoolflags[roomtypeItemndex]
                                          ?.accepted === "P"
                                      ? "Pending"
                                      : ""}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {appContext?.user?.isPASorAnySales &&
                                hasd?.roompooldetails[roomtypeItemndex]
                                  ?.isSelected &&
                                hasd?.roompooldetails[roomtypeItemndex]
                                  ?.isSelected === "Y" ? (
                                  <td
                                    className={
                                      tableRows?.hotelAccountSpecific
                                        ?.hotelAccountSpecificData?.roomtypelist
                                        ?.length <= 1
                                        ? styles.pl40
                                        : ""
                                    }
                                    colSpan={2}
                                  >
                                    {contextType.ratesRequestPayload[
                                      hotel_accountinfoid
                                    ]?.roompoolflags &&
                                    contextType.ratesRequestPayload[
                                      hotel_accountinfoid
                                    ]?.roompoolflags[roomtypeItemndex]
                                      ?.accepted !== null ? (
                                      <select
                                        value={
                                          contextType.ratesRequestPayload[
                                            hotel_accountinfoid
                                          ]?.roompoolflags
                                            ? contextType.ratesRequestPayload[
                                                hotel_accountinfoid
                                              ]?.roompoolflags[roomtypeItemndex]
                                                ?.accepted
                                            : ""
                                        }
                                        onChange={(event) =>
                                          handleChangeRoomFlagsAccepted(
                                            event,
                                            roomtypeItemndex + 1,
                                            hotel_accountinfoid
                                          )
                                        }
                                      >
                                        <option value="Y">Yes</option>
                                        <option value="N">No</option>
                                        <option value="P">Pending</option>
                                      </select>
                                    ) : null}
                                  </td>
                                ) : (
                                  ""
                                )}
                              </tr>
                              <tr
                                style={
                                  !appContext?.user?.isHotelUser &&
                                  tableRows?.hotelAccountSpecific
                                    ?.hotelAccountSpecificData?.roomtypelist
                                    ?.length <= 1
                                    ? { display: "block" }
                                    : {}
                                }
                              >
                                <td
                                  className={styles.field_Name}
                                  style={{ width: "20px" }}
                                >
                                  <div
                                    className="Field_Name floatleft"
                                    style={{ width: "100px" }}
                                  >
                                    Rejection Reason
                                  </div>
                                </td>
                                {appContext?.user?.isPASorAnySales &&
                                hasd?.roompooldetails[roomtypeItemndex]
                                  ?.isSelected &&
                                hasd?.roompooldetails[roomtypeItemndex]
                                  ?.isSelected === "Y" ? (
                                  <td colSpan={2}>
                                    <a
                                      href="javascript:void(0);"
                                      id="removalreason_118044230_1_2"
                                      style={{
                                        fontSize: "8pt",
                                        fontWeight: "normal",
                                        color: "rgb(0, 60, 130)",
                                        height: "18px",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setShowRejectReasonModal(true);
                                        setcurrentRejectReason({
                                          key: roomtypeItemndex,
                                        });
                                      }}
                                    >
                                      {handleGetRejectLink(roomtypeItemndex)}
                                    </a>
                                  </td>
                                ) : !appContext?.user?.isPASorAnySales ||
                                  appContext?.user?.isReadOnly ? (
                                  hasd?.roompooldetails[roomtypeItemndex]
                                    ?.rejectionreason
                                ) : (
                                  <span></span>
                                )}
                              </tr>
                              {appContext?.user?.isPASAdmin ||
                              appContext?.user?.isSalesUser ? (
                                <tr
                                  style={
                                    !appContext?.user?.isHotelUser &&
                                    tableRows?.hotelAccountSpecific
                                      ?.hotelAccountSpecificData?.roomtypelist
                                      ?.length <= 1
                                      ? { display: "block" }
                                      : {}
                                  }
                                >
                                  <td
                                    className={`${styles.field_Name} ${
                                      styles.pogosize
                                    } ${
                                      tableRows?.hotelAccountSpecific
                                        ?.hotelAccountSpecificData?.roomtypelist
                                        ?.length <= 1
                                        ? styles.noSpace
                                        : ""
                                    }`}
                                  >
                                    Room Pool
                                  </td>
                                  {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roompoollist[
                                    roomtypeItemndex
                                  ]?.roomPoolList.map((item, index) => {
                                    return (
                                      <td
                                        className={`${styles.field_Name} ${
                                          tableRows?.hotelAccountSpecific
                                            ?.hotelAccountSpecificData
                                            ?.roomtypelist?.length <= 1
                                            ? index === 0
                                              ? styles.pl44
                                              : ""
                                            : ""
                                        }`}
                                        style={
                                          tableRows?.hotelAccountSpecific
                                            ?.hotelAccountSpecificData
                                            ?.roomtypelist?.length <= 1
                                            ? {
                                                width:
                                                  "calc((280px - 100px) / 2)",
                                                maxWidth:
                                                  "calc((280px - 100px) / 2)",
                                              }
                                            : {
                                                width:
                                                  "calc((390px - 100px) / 2)",
                                                maxWidth:
                                                  "calc((390px - 100px) / 2)",
                                              }
                                        }
                                      >
                                        {item}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ) : (
                                <tr
                                  style={
                                    !appContext?.user?.isHotelUser &&
                                    tableRows?.hotelAccountSpecific
                                      ?.hotelAccountSpecificData?.roomtypelist
                                      ?.length <= 1
                                      ? { display: "block" }
                                      : {}
                                  }
                                ></tr>
                              )}
                              <tr
                                className={
                                  appContext?.user?.isPASAdmin ||
                                  appContext?.user?.isSalesUser
                                    ? !appContext?.user?.isHotelUser &&
                                      tableRows?.hotelAccountSpecific
                                        ?.hotelAccountSpecificData?.roomtypelist
                                        ?.length <= 1
                                      ? styles.dispBlock
                                      : ""
                                    : styles.noDisplay
                                }
                              >
                                {appContext?.user?.isPASAdmin ||
                                appContext?.user?.isSalesUser ? (
                                  <td
                                    className={`${styles.field_Name} ${styles.pogosize}`}
                                  >
                                    Pgoos
                                  </td>
                                ) : (
                                  ""
                                )}
                                {!appContext?.user?.isHotelUser &&
                                  tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roompooldetails[
                                    roomtypeItemndex
                                  ]?.hotelAccountSpecificPGOOSData?.map(
                                    (pgData, pgoosIndex) => {
                                      return appContext?.user?.isAnySalesUser ||
                                        (appContext?.user?.isSalesUser &&
                                          !appContext?.user?.isPASAdmin) ? (
                                        <td
                                          className={styles.Field_Value}
                                          style={
                                            tableRows?.hotelAccountSpecific
                                              ?.hotelAccountSpecificData
                                              ?.roomtypelist?.length <= 1
                                              ? {
                                                  width:
                                                    "calc((280px - 100px) / 2)",
                                                  maxWidth:
                                                    "calc((280px - 100px) / 2)",
                                                  paddingLeft: "0 !important",
                                                }
                                              : {
                                                  width:
                                                    "calc((390px - 100px) / 2)",
                                                  maxWidth:
                                                    "calc((390px - 100px) / 2)",
                                                }
                                          }
                                        >
                                          {pgData?.pgoos === "Y" ? "Yes" : "No"}
                                        </td>
                                      ) : (
                                        <td
                                          className={`${styles.Field_Value}  ${
                                            tableRows?.hotelAccountSpecific
                                              ?.hotelAccountSpecificData
                                              ?.roomtypelist?.length <= 1
                                              ? pgoosIndex
                                                ? ""
                                                : styles.pl63
                                              : ""
                                          }`}
                                          style={
                                            tableRows?.hotelAccountSpecific
                                              ?.hotelAccountSpecificData
                                              ?.roomtypelist?.length <= 1
                                              ? {
                                                  width:
                                                    "calc((280px - 100px) / 2)",
                                                  maxWidth:
                                                    "calc((280px - 100px) / 2)",
                                                }
                                              : {
                                                  width:
                                                    "calc((390px - 100px) / 2)",
                                                  maxWidth:
                                                    "calc((390px - 100px) / 2)",
                                                }
                                          }
                                        >
                                          <input
                                            type="checkbox"
                                            defaultChecked={
                                              pgData?.pgoos === "Y"
                                            }
                                            onChange={(event) =>
                                              handleChangeRoomFlagsPGOOSData(
                                                event,
                                                roomtypeItemndex + 1,
                                                pgoosIndex + 1
                                              )
                                            }
                                            disabled={
                                              !appContext?.user?.isPASAdmin &&
                                              parentContext.isRebidDeclined
                                            }
                                          />
                                        </td>
                                      );
                                    }
                                  )}
                              </tr>
                              <tr
                                style={
                                  !appContext?.user?.isHotelUser &&
                                  tableRows?.hotelAccountSpecific
                                    ?.hotelAccountSpecificData?.roomtypelist
                                    ?.length <= 1
                                    ? { display: "block" }
                                    : {}
                                }
                              >
                                {appContext?.user?.isPASAdmin ||
                                appContext?.user?.isSalesUser ? (
                                  <td
                                    className={`${styles.field_Name} ${styles.pogosize}`}
                                  >
                                    Removal Reason
                                  </td>
                                ) : (
                                  ""
                                )}
                                {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roompooldetails[
                                  roomtypeItemndex
                                ]?.hotelAccountSpecificPGOOSData?.map(
                                  (pgData, pgoosIndex) => {
                                    const poolType =
                                      tableRows?.hotelAccountSpecific
                                        ?.hotelAccountSpecificData
                                        ?.roompoollist[roomtypeItemndex]
                                        ?.roomPoolList[0];
                                    const pIndex = pgoosIndex + 1;
                                    const currentPoogsData =
                                      (contextType.ratesRequestPayload[
                                        hotel_accountinfoid
                                      ]?.roompoolflags &&
                                        contextType.ratesRequestPayload[
                                          hotel_accountinfoid
                                        ]?.roompoolflags[
                                          roomtypeItemndex
                                        ]?.hotelAccountSpecificPGOOSData?.filter(
                                          (poogs) =>
                                            poogs.roomPoolSequence === pIndex
                                        )) ||
                                      [];
                                    const removalResId =
                                      currentPoogsData[0]?.removalreasonid;

                                    return (
                                      <>
                                        {appContext?.user?.isPASAdmin ||
                                        appContext?.user?.isSalesUser ? (
                                          <td
                                            className={styles.Field_Value}
                                            style={
                                              tableRows?.hotelAccountSpecific
                                                ?.hotelAccountSpecificData
                                                ?.roomtypelist?.length <= 1
                                                ? {
                                                    width:
                                                      "calc((280px - 100px) / 2)",
                                                    maxWidth:
                                                      "calc((280px - 100px) / 2)",
                                                  }
                                                : {
                                                    width:
                                                      "calc((390px - 100px) / 2)",
                                                    maxWidth:
                                                      "calc((390px - 100px) / 2)",
                                                  }
                                            }
                                          >
                                            <div
                                              id="rrdiv_118044230"
                                              style={
                                                tableRows?.hotelAccountSpecific
                                                  ?.hotelAccountSpecificData
                                                  ?.roomtypelist?.length <= 1
                                                  ? {
                                                      width:
                                                        "calc((280px - 100px) / 2)",
                                                      maxWidth:
                                                        "calc((280px - 100px) / 2)",
                                                    }
                                                  : {
                                                      width:
                                                        "calc((390px - 100px)/2 - 6px)",
                                                      maxWidth:
                                                        "calc((390px - 100px)/2 - 6px)",
                                                      paddingRight: "5px",
                                                      wordBreak: "normal",
                                                    }
                                              }
                                            >
                                              <a
                                                href="javascript:void(0);"
                                                id="removalreason_118044230_1_2"
                                                className={
                                                  !appContext?.user?.isSalesUser
                                                    ? styles.showReasonLink
                                                    : styles.DisableReasonLink
                                                }
                                                onClick={() => {
                                                  setRemoveReasonCurrentIndex({
                                                    key: roomtypeItemndex + 1,
                                                    pgoosIndex: pgoosIndex + 1,
                                                    poolType,
                                                    removalreasonid:
                                                      removalResId,
                                                  });
                                                  setShowModal(true);
                                                }}
                                              >
                                                {handleGetRoomPoolPgoogsLink(
                                                  roomtypeItemndex,
                                                  pIndex
                                                )}
                                              </a>
                                            </div>
                                          </td>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    );
                                  }
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </th>
                      );
                    }
                  )}
                </tr>
              </tbody>
            </table>
          </tr>
          <tr>
            <table
              style={{ height: "32px" }}
              className="gridRowTable"
              id="gridTableHeader_118044230"
              cellSpacing={0}
              cellPadding={0}
            >
              <tbody className={styles.thBackground}>
                <tr>
                  {(tableRows?.hotelAccountSpecific
                    ?.hotelAccountSpecificViewInfo?.rategridLOSwidth === 0 ||
                    tableRows?.hotelAccountSpecific
                      ?.hotelAccountSpecificViewInfo?.seasonsEditable) && (
                    <th
                      rowSpan={3}
                      className={`gridCell ${styles.wd20} ${styles.p0}`}
                    >
                      <div className={styles.columHead1} />
                    </th>
                  )}
                  <th
                    rowSpan={3}
                    className={`gridCell ${styles.sesaonColHead}`}
                  >
                    <div className={styles.seasonCol}>Seasons</div>
                  </th>
                  {tableRows?.hotelAccountSpecific?.hotelAccountSpecificViewInfo
                    ?.rategridLOSwidth > 0 && (
                    <>
                      {" "}
                      {tableRows?.hotelAccountSpecific
                        ?.hotelAccountSpecificViewInfo?.losEditable && (
                        <th
                          rowSpan={3}
                          className={`gridCell ${styles.wd20} ${styles.p0} ${styles.borderLeft}`}
                        >
                          <div className={`${styles.wd20} ${styles.p0}`}></div>
                        </th>
                      )}
                      <th
                        style={{
                          width:
                            tableRows?.hotelAccountSpecific
                              ?.hotelAccountSpecificViewInfo?.rategridLOSwidth,
                          padding: "0px",
                        }}
                        rowSpan={3}
                        className={`${styles.gridCell}`}
                      >
                        <div
                          style={{
                            paddingBottom: 0,
                            width: "79px",
                          }}
                        >
                          LOS
                        </div>
                      </th>
                    </>
                  )}

                  {/* <th
                    style={{
                      background: "none repeat scroll 0 0 #D6D7CE",
                      padding: "0px",
                      textAlign: "center",
                      verticalAlign: "bottom",
                      width: "588px",
                      maxWidth: "588px",
                    }}
                    colSpan={
                      tableRows?.hotelAccountSpecific?.hotelAccountSpecificData
                        ?.roompoollist?.length
                    }
                    className={`${styles.gridCell} ${styles.gridHeaderLeft} `}
                  >
                    <div style={{ background: "#D6D7CE" }}>Fixed Rates</div>
                  </th> */}

                  {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roompoollist.map(
                    (roompoolItem, roompoolItemItemndex) => {
                      return (
                        <th
                          className={`${styles.p0} ${styles.gridCell} ${
                            roompoolItemItemndex === 0
                              ? styles.gridHeaderLeft
                              : styles.gridHeaderLeft
                          } ${
                            tableRows?.hotelAccountSpecific
                              ?.hotelAccountSpecificData?.roomtypelist
                              ?.length <= 1
                              ? styles.width282
                              : styles.width392
                          }`}
                          colSpan={2}
                        >
                          <div
                            className={`${styles.textCenter} ${
                              tableRows?.hotelAccountSpecific
                                ?.hotelAccountSpecificData?.roomtypelist
                                ?.length <= 1
                                ? styles.width282
                                : styles.width392
                            }`}
                          >
                            Room Pool Group {roompoolItem.seq} -{" "}
                            {roompoolItem.roomPoolList?.join(" / ")}
                          </div>
                        </th>
                      );
                    }
                  )}
                </tr>
                <tr>
                  {/* {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roompoollist.map(
                    (roompoolItem, roompoolItemItemndex) => {
                      return (
                        <th
                          style={{
                            width: "196px",
                            maxWidth: "196px",
                            padding: "0px",
                          }}
                          className={`${styles.gridCell} ${
                            roompoolItemItemndex === 0
                              ? styles.gridHeaderLeft
                              : styles.gridHeaderLeftLight
                          } `}
                        >
                          <div style={{ width: "196px", maxWidth: "196px" }}>
                            Room Pool Group {roompoolItem.seq} -{" "}
                            {roompoolItem.roomPoolList?.join("/")}
                          </div>
                        </th>
                      );
                    }
                  )} */}

                  {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roompoollist.map(
                    (roompoolItem, roompoolItemItemndex) => {
                      return (
                        <Fragment>
                          {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.lranlratype.map(
                            (lratypeItem, lratypeItemIndex) => {
                              return (
                                <th
                                  className={`${styles.p0} ${styles.gridCell} ${
                                    lratypeItemIndex === 0
                                      ? styles.gridHeaderLeft
                                      : styles.gridHeaderLeftLight
                                  } ${
                                    tableRows?.hotelAccountSpecific
                                      ?.hotelAccountSpecificData?.roomtypelist
                                      ?.length <= 1
                                      ? styles.width143
                                      : styles.width196
                                  }`}
                                >
                                  <div
                                    className={
                                      tableRows?.hotelAccountSpecific
                                        ?.hotelAccountSpecificData?.roomtypelist
                                        ?.length <= 1
                                        ? styles.width143
                                        : styles.width196
                                    }
                                  >
                                    {lratypeItem.productdescription}
                                  </div>
                                </th>
                              );
                            }
                          )}
                        </Fragment>
                      );
                    }
                  )}
                </tr>
                <tr>
                  {/* {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roompoollist.map(
                    (roompoolItem, roompoolItemItemndex) => {
                      return (
                        <Fragment>
                          <th
                            style={{
                              width: "196px",
                              maxWidth: "196px",
                              padding: "0px",
                            }}
                            className={`${styles.gridCell} ${
                              roompoolItemItemndex === 0
                                ? styles.gridHeaderLeft
                                : styles.gridHeaderLeftLight
                            } `}
                          >
                            {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roomtypelist.map(
                              (roomtypeItem, roomtypeItemIndex) => {
                                return (
                                  <div style={{ width: "95px", float: "left" }}>
                                    <span
                                      className={
                                        tableRows?.hotelAccountSpecific
                                          ?.hotelAccountSpecificData?.isLOSBrand
                                          ? styles.noDisplay
                                          : ""
                                      }
                                    >
                                      {" "}
                                      {roomtypeItem.roomtypedescription}
                                    </span>
                                  </div>
                                );
                              }
                            )}
                          </th>
                        </Fragment>
                      );
                    }
                  )} */}
                  {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData
                    ?.roomtypelist?.length > 1 &&
                    tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roompoollist.map(
                      (roompoolItem, roompoolItemItemndex) => {
                        return (
                          <Fragment>
                            {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.lranlratype.map(
                              (lratypeItem, lratypeItemIndex) => {
                                return (
                                  <th
                                    className={` ${styles.p0} ${
                                      styles.gridCell
                                    } ${
                                      lratypeItemIndex === 0
                                        ? styles.gridHeaderLeft
                                        : styles.gridHeaderLeftLight
                                    } ${
                                      tableRows?.hotelAccountSpecific
                                        ?.hotelAccountSpecificData?.roomtypelist
                                        ?.length <= 1
                                        ? styles.width143
                                        : styles.width196
                                    }`}
                                  >
                                    {tableRows?.hotelAccountSpecific?.hotelAccountSpecificData?.roomtypelist.map(
                                      (roomtypeItem, roomtypeItemIndex) => {
                                        return roomtypeItem.roomtypeid != 3 ? (
                                          <div
                                            className={
                                              tableRows?.hotelAccountSpecific
                                                ?.hotelAccountSpecificData
                                                ?.roomtypelist?.length <= 1
                                                ? styles.widthLRA71
                                                : styles.widthLRA95
                                            }
                                          >
                                            <span
                                              className={
                                                tableRows?.hotelAccountSpecific
                                                  ?.hotelAccountSpecificData
                                                  ?.isLOSBrand
                                                  ? styles.noDisplay
                                                  : ""
                                              }
                                            >
                                              {" "}
                                              {roomtypeItem.roomtypedescription}
                                            </span>
                                          </div>
                                        ) : null;
                                      }
                                    )}
                                  </th>
                                );
                              }
                            )}
                          </Fragment>
                        );
                      }
                    )}
                </tr>
              </tbody>
            </table>
            <tr style={{ display: "block", marginLeft: 0 }}>
              <div
                style={{ width: "100%", float: "left" }}
                className={styles.gridview}
                id="gridView_140349897"
              >
                <table
                  style={{ height: "25px" }}
                  className={styles.gridRowTable}
                  cellPadding={0}
                  cellSpacing={0}
                  id={`gridTableView_${hotel_accountinfoid}`}
                >
                  {tableDynamicRows()}
                </table>
              </div>
            </tr>
          </tr>
        </div>
      </div>
      <table>
        {!props.isHideBottom && (
          <>
            <tr>
              <table>
                <tr style={{ height: "20px" }} />
                <tr>
                  <td className={styles.field_Name}>Early Departure Charge</td>
                </tr>
                <tr style={{ height: "3px" }} />
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td className={styles.field_value}>
                    {hasd?.earlychargeresponse === "Y" ? (
                      <>
                        Will you waive the Early Departure Charge for this
                        account?
                        <>&nbsp;</>
                        <>&nbsp;</>
                        {appContext?.user?.hasLimitedHotels &&
                        hasd?.isSelected &&
                        hasd?.isSelected === "Y" &&
                        hasd?.waiveearlycharge === "Y" ? (
                          <input
                            style={{ verticalAlign: "bottom" }}
                            type="checkbox"
                            name="hasd[140349898].waiveearlycharge"
                            id="hasd[140349898].waiveearlycharge"
                            onChange={handleChangeWaiveEarlyCharge}
                            checked={true}
                            className={
                              parentContext.isRebidDeclined
                                ? styles.disabled
                                : ""
                            }
                            disabled={parentContext.isRebidDeclined}
                          />
                        ) : (
                          <input
                            style={{ verticalAlign: "bottom" }}
                            type="checkbox"
                            name="hasd[140349898].waiveearlycharge"
                            id="hasd[140349898].waiveearlycharge"
                            onChange={handleChangeWaiveEarlyCharge}
                            checked={
                              contextType?.ratesRequestPayload[
                                hotel_accountinfoid
                              ]?.waiveearlycharge === "Y"
                            }
                            className={
                              parentContext.isRebidDeclined
                                ? styles.disabled
                                : ""
                            }
                            disabled={parentContext.isRebidDeclined}
                          />
                        )}
                      </>
                    ) : (
                      <tr>
                        <td>No Early Departure Charge Applies</td>
                      </tr>
                    )}
                  </td>
                </tr>

                <tr style={{ height: "15px" }} />
              </table>
            </tr>

            {(hasd?.altcancelpolicyid === 2 ||
              hasd?.altcancelpolicyid === 3) && (
              <>
                {hasd?.altcancelpolicyoptionid === 2 ? (
                  <tr>
                    <div>
                      <table>
                        <tr style={{ height: "10px" }} />
                        <tr>
                          <td
                            colSpan={2}
                            className={styles.field_Name}
                            style={{ width: "900px" }}
                          >
                            This account is looking for an alternate
                            cancellation policy. The answer below has been
                            defaulted to the hotel’s standard cancellation
                            policy. Please read notes below for specific account
                            requirements and select the most appropriate
                            cancellation policy for this account.
                          </td>
                          <td
                            className={styles.field_Name}
                            style={{ verticalAlign: "center" }}
                          >
                            <span
                              className={styles.ratesLink}
                              onClick={() => {
                                contextType.getQuickauditviewcancel();
                                contextType.setShowCancelModal(true);
                              }}
                            >
                              Previous Cancellation
                            </span>

                            <CPreviousCancellation
                              showModal={contextType.showCancelModal}
                              closeModal={() =>
                                contextType.setShowCancelModal(false)
                              }
                              quickauditviewcancelData={
                                contextType?.quickauditviewcancelData
                              }
                              loader={contextType.quickauditviewcancelLoader}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <>&nbsp;</>
                          </td>
                        </tr>

                        {hasd?.altcancelpolicynotes !== null &&
                          hasd?.altcancelpolicynotes !== "" && (
                            <div>
                              <tr>
                                <td
                                  colSpan={2}
                                  className={styles.field_Name}
                                  style={{ verticalAlign: "top" }}
                                >
                                  Alternate cancellation policy notes:
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div
                                    className={styles.field_Value}
                                    style={{
                                      height: "auto",
                                      width: "890px",
                                      paddingTop: "3px",
                                    }}
                                  >
                                    {hasd?.altcancelpolicynotes}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <>&nbsp;</>
                                </td>
                              </tr>
                            </div>
                          )}

                        <tr>
                          <td colSpan={3} className={styles.field_Name}>
                            {Settings.labels.cancellation}
                            <>&nbsp;</>
                            <>&nbsp;</>
                            <select
                              id="hasd[140349897].altcxlpolicytimeid"
                              name="hasd[140349897].altcxlpolicytimeid"
                              style={{ width: "310px" }}
                              className={
                                parentContext.isRebidDeclined
                                  ? styles.rowDisable
                                  : ""
                              }
                              onChange={(e) =>
                                handleChangeAltcxlpolicytimeid(
                                  hasd,
                                  appContext?.user,
                                  e
                                )
                              }
                              disabled={parentContext.isRebidDeclined}
                            >
                              <option value="" />

                              {hasd?.altcxlpolicyoptionlist?.map(
                                (cancellationpolicytimeItem, index) => {
                                  return (
                                    <option
                                      selected={
                                        cancellationpolicytimeItem?.altcancelpolicytimeid ===
                                        hasd?.altcxlpolicytimeid
                                      }
                                      value={
                                        cancellationpolicytimeItem?.altcancelpolicytimeid
                                      }
                                    >
                                      {
                                        cancellationpolicytimeItem?.altcancelpolicytime
                                      }
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </td>
                        </tr>
                      </table>
                      <>&nbsp;</>
                    </div>
                  </tr>
                ) : (
                  <table>
                    <tr style={{ height: 10 }}></tr>
                    {hasd.altcancelpolicyid == 2 && (
                      <>
                        <tr>
                          <td
                            colSpan={2}
                            className={` ${styles.field_Name} ${styles.nowrapCell} `}
                            style={{ width: "890px" }}
                          >
                            This account mandates a {hasd.altcancelpolicytime}{" "}
                            same day cancellation policy. Failing to agree to
                            this mandate will prevent your property from being
                            accepted into this program.
                          </td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        {hasd.altcancelpolicynotes !== null &&
                          hasd.altcancelpolicynotes !== "" && (
                            <>
                              <tr>
                                <td
                                  colSpan={2}
                                  className={` ${styles.field_Name} ${styles.nowrapCell} `}
                                  style={{ verticalAlign: "top" }}
                                >
                                  Alternate cancellation policy notes:
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div
                                    className={styles.Field_Value}
                                    style={{
                                      height: "auto",
                                      width: "890px",
                                      paddingTop: "3px",
                                    }}
                                  >
                                    {hasd.altcancelpolicynotes}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>&nbsp;</td>
                              </tr>
                            </>
                          )}
                      </>
                    )}
                    {hasd.altcancelpolicyid === 3 && (
                      <>
                        <tr>
                          <td
                            colSpan={2}
                            className={` ${styles.field_Name} ${styles.nowrapCell} `}
                            style={{ width: "890px" }}
                          >
                            This account is requesting a{" "}
                            {hasd.altcancelpolicytime} same day cancellation
                            policy.
                          </td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        {hasd.altcancelpolicynotes !== null &&
                          hasd.altcancelpolicynotes !== "" && (
                            <>
                              <tr>
                                <td
                                  colSpan={2}
                                  className={` ${styles.field_Name} ${styles.nowrapCell} `}
                                  style={{ verticalAlign: "top" }}
                                >
                                  Alternate cancellation policy notes:
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div
                                    className={styles.Field_Value}
                                    style={{
                                      height: "auto",
                                      width: "890px",
                                      paddingTop: "3px",
                                    }}
                                  >
                                    {hasd.altcancelpolicynotes}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>&nbsp;</td>
                              </tr>
                            </>
                          )}
                        <tr>
                          <td
                            colSpan={3}
                            className={` ${styles.field_Name} ${styles.nowrapCell} `}
                          >
                            Do you agree to extend this cancellation policy and
                            to update necessary property systems once
                            accepted?&nbsp;&nbsp;
                            {/* 855 to 869  accountab */}
                          </td>
                        </tr>
                      </>
                    )}
                  </table>
                )}
                {}
              </>
            )}

            <tr>
              <table>
                <tr />
                <tr>
                  <td>
                    <div
                      className={styles.field_Name}
                      style={{ width: "450px" }}
                    >
                      Please indicate the number of room nights produced from
                      Jan 1 through Jun 30:
                    </div>
                  </td>
                  <td>
                    <div className={styles.field_Value}>
                      <input
                        key={newKey}
                        onKeyPress={Utils.AmountNumberOnly_onkeypress}
                        style={{ width: "93px" }}
                        className={`styles.FieldNumber ${
                          parentContext.isRebidDeclined ? styles.rowDisable : ""
                        }`}
                        value={
                          contextType?.ratesRequestPayload[hotel_accountinfoid]
                            ?.hotelAccountSpecificFacility?.rm_nights
                        }
                        maxLength={8}
                        onChange={handleChangRm_nights}
                        disabled={parentContext.isRebidDeclined}
                      />
                    </div>
                  </td>
                </tr>
              </table>
            </tr>
          </>
        )}
      </table>
    </>
  );
}
