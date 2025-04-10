import React, { useState, useEffect, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
import Utils from "../../../../../common/utils/Utils";
import pricingUtils from "../../../../hotelPricing/content/scpt/utils/Utils";
import FixedSeasonsAPI, { hotelAPIParams } from "../service/FixedSeasonsAPI";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import Settings from "../static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import { any } from "prop-types";
import { useHistory } from "react-router-dom";
import moment from "moment";

const FixedSeasonsContext = createContext({});

interface FixedSeasonsContextProps {
  children: JSX.Element;
}

export const FixedSeasonsContextProvider = (
  props: FixedSeasonsContextProps
): JSX.Element => {
  const urlParms = useLocation().search;
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const period = new URLSearchParams(urlParms).get("Period");
  const parentContextType = useContext(HotelPricingContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const hotelrfpid =
    new URLSearchParams(urlParms).get("Hotelrfpid") == 0 ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == "0" ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == null ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == undefined
      ? parentContextType?.selectedHotelRfpId
      : new URLSearchParams(urlParms).get("Hotelrfpid");
  const history = useHistory();

  const ruleOptions = [
    {
      rule_value: "",
      rule_key: "",
    },
    {
      rule_value: Settings.hotelRuleItems.ruleValues.yes,
      rule_key: "Y",
    },
    {
      rule_value: Settings.hotelRuleItems.ruleValues.no,
      rule_key: "N",
    },
  ];
  const [state, setState] = useState({
    marshaCode: marshaCode,
    hotelName: hotelName,
    hotelrfpid: hotelrfpid,
    period: period,
    hotelRFPFixedRates: {},
    userDetails: {},
    hotelRuleList: [
      {
        rule_name: Settings.hotelRuleItems.commissionable,
        options: [...ruleOptions],
        selectedRule: "",
        rule_id: 1,
      },
      {
        rule_name: Settings.hotelRuleItems.LRA,
        options: [...ruleOptions],
        selectedRule: "",
        rule_id: 2,
      },
    ],
    seasonEditable: false,
    numrateperroompool: 2,
    loseditable: false,
    brandextendedstay: "N",
    isbrandextendedstayLos: false,
    compareRates: true,
    tableWidth: "404",
    widthLOS: "0",
    widthrmpl: "196",
    maxSeason: 5,
    maxLOS: 4,
    seasonChg: "N",
    formChg: "N",
    losChg: "N",
    endPeriod: "12/31/" + period.toString(),
    startPeriod: "01/01/" + period.toString(),
    defaultRoomPoolList: [
      {
        seq: 1,
        required: "Y",
        room_pool: null,
        roomPoolList: [""],
      },
      {
        seq: 2,
        required: "N",
        room_pool: null,
        roomPoolList: [""],
      },
      {
        seq: 3,
        required: "N",
        room_pool: null,
        roomPoolList: [""],
      },
    ],
  });
  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formEdited, setFormEdited] = useState(false);
  const [losAlert, setLosAlert] = useState("");
  const [rateAlert, setRateAlert] = useState("");
  const [seasonAlert, setSeasonAlert] = useState("");
  const [initialValidation, setInitialValidation] = useState(false);
  const getHotelRFPFixedRates = async (param: hotelAPIParams) => {
    const res = await FixedSeasonsAPI.getHotelRFPFixedRates(param);

    return res;
  };

  const getUserDetails = async () => {
    const urs = sessionStorage.getItem("GETUSERDETAILS");
    if (urs) {
      return JSON.parse(urs);
    } else {
      const res = await FixedSeasonsAPI.getUserDetails();
      return res;
    }
  };

  const loadFixedRateContent = () => {
    const param = {
      marshaCode: state.marshaCode,
      hotelName: state.hotelName,
      hotelrfpid: state.hotelrfpid,
      period: state.period,
    };
    getHotelRFPFixedRates(param).then(async (res) => {
      const fixedRateRes = { ...res };
      let userDetails = { user: appContext?.user };
      if (!appContext?.user) {
        userDetails = await getUserDetails();
      }
      const stateObj = { ...state };

      const rateMap = Settings.rateMap;
      const roompoolList = Settings.roompoolList;

      if (
        fixedRateRes?.roompoollist?.length == 1 &&
        fixedRateRes?.roompoollist[0]?.roomPoolList?.length == 0
      ) {
        fixedRateRes.rateMap = rateMap;
        fixedRateRes.roompoollist = roompoolList;
      }
      if (fixedRateRes.SeasonList && fixedRateRes.SeasonList.length === 0) {
        fixedRateRes.SeasonList.push({
          rfpseasonid: null,
          hotelrfpid: null,
          seasonid: 1,
          startdate: state.startPeriod,
          enddate: state.endPeriod,
          isStartDateChanged: false,
          isEndDateChanged: false,
        });
      }

      if (fixedRateRes.LosList && fixedRateRes.LosList.length === 0) {
        fixedRateRes.LosList.push({
          rfplosid: null,
          hotelrfpid: null,
          lengthofstayid: 1,
          roomnightsfrom: 0,
          roomnightsto: 255,
          isRoomNightsFromChanged: false,
          isRoomNightsToChanged: false,
        });
      }

      if (fixedRateRes.roompoollist && fixedRateRes.roompoollist.length === 0) {
        fixedRateRes.roompoollist = [...state.defaultRoomPoolList];
      }

      fixedRateRes.SeasonList?.slice().forEach((season) => {
        season.losListMap = {};
        season.roompoollist = {};
        fixedRateRes.LosList.slice().forEach((los) => {
          season.losListMap[season.seasonid + "_" + los.lengthofstayid] = {
            ...los,
          };
          fixedRateRes.roompoollist.slice().forEach((roompool) => {
            fixedRateRes.lratypeList.slice().forEach((lra) => {
              fixedRateRes.roomtypeList.slice().forEach((rtype) => {
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
                let isRequired = false;
                if (lra.required === "Y" && roompool.required === "Y") {
                  isRequired = true;
                }
                // if (
                //   fixedRateRes.HotelRateMap[ratekey] &&
                //   fixedRateRes.HotelRateMap[ratekey]
                // ) {
                //   season.roompoollist[ratekey] = {
                //     ...fixedRateRes.HotelRateMap[ratekey],
                //   };
                //   season.roompoollist[ratekey].isRequired = isRequired;
                // } else {
                season.roompoollist[ratekey] = {
                  lengthofstayid: los[Settings.keys.lengthofstayid],
                  productid: lra.productid,
                  rate: "",
                  roompool: roompool.seq,
                  roomtypeid: rtype.roomtypeid,
                  seasonid: season.seasonid,
                  isRequired: isRequired,
                };
                // }
              });
            });
          });
        });
      });

      if (fixedRateRes?.hotelData?.isbrandextendedstay === "Y") {
        stateObj.numrateperroompool = 1;
        stateObj.tableWidth = "454";
        stateObj.widthLOS = "50";
        stateObj.widthrmpl = "112";
      }

      if (userDetails.user.isAnySalesUser) {
        stateObj.tableWidth = "843";
      }

      if (userDetails.user.isPASAdmin || userDetails.user.isHotelUser) {
        stateObj.seasonEditable = true;
        stateObj.tableWidth = "843";
        if (fixedRateRes.hotelData.isbrandextendedstay === "Y") {
          stateObj.loseditable = true;
          stateObj.tableWidth = "692";
          stateObj.widthLOS = "80";
          stateObj.widthrmpl = "112";
        } else {
          stateObj.widthrmpl = "204";
        }
      }

      if (userDetails.user.isPASAdmin) {
        stateObj.compareRates = false;
      }

      const hotelRules = [...state.hotelRuleList];
      const hotelRuleList = [...fixedRateRes[Settings.keys.ruleList]];
      hotelRuleList.forEach((hotel, index) => {
        if (
          hotel.rulevalue !== null &&
          hotel.rulevalue !== undefined &&
          hotel.rulevalue !== ""
        ) {
          const i = hotelRules[index].options.findIndex(
            (f) => f.rule_value === ""
          );
          hotelRules[index].selectedRule = hotel.rulevalue;
        }
      });

      setState({
        ...state,
        hotelRFPFixedRates: fixedRateRes,
        userDetails: userDetails.user,
        seasonEditable: stateObj.seasonEditable,
        numrateperroompool: stateObj.numrateperroompool,
        loseditable: stateObj.loseditable,
        compareRates: stateObj.compareRates,
        tableWidth: stateObj.tableWidth,
        widthLOS: stateObj.widthLOS,
        widthrmpl: stateObj.widthrmpl,
        maxSeason: fixedRateRes.MaxSeason,
        maxLOS: fixedRateRes.maxLOS,
        isbrandextendedstayLos:
          fixedRateRes.hotelData.isbrandextendedstay === "Y" ? true : false,
      });
      setShowScreenLoader(false);
      appContext.setCpacLoader(false);
      setInitialValidation(true);

      if (res?.menu) {
        parentContextType.setState({
          ...parentContextType.state,
          gridData: {
            ...parentContextType.state.gridData,
            list: {
              ...parentContextType.state.gridData.list,
              menu: res.menu,
            },
          },
        });
      }
    });
  };

  useEffect(() => {
    setShowScreenLoader(true);
    appContext.setCpacLoader(true);
    setTimeout(() => {
      if (
        (history?.location?.prevPath &&
          !history?.location?.prevPath?.includes("GroupsMeetings") &&
          !history?.location?.prevPath?.includes("Standards") &&
          !history?.location?.prevPath?.includes("PriceContact") &&
          !history?.location?.prevPath?.includes("DepthOfSale") &&
          !history?.location?.prevPath?.includes("Blackout") &&
          !history?.location?.prevPath?.includes("eligibilityAmenity")) ||
        history?.location?.prevPath == undefined ||
        history?.location?.prevPath == null ||
        history?.location?.prevPath == ""
      ) {
        loadFixedRateContent();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("PriceContact") &&
      parentContextType?.completionState?.PricingContact == "Y"
    ) {
      setTimeout(() => {
        loadFixedRateContent();
        parentContextType.setCompletionState({
          ...parentContextType.completionState,
          PricingContact: "N",
        });
      }, 1000);
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Standards") &&
      parentContextType?.completionState?.Standards == "Y"
    ) {
      setTimeout(() => {
        loadFixedRateContent();
        parentContextType.setCompletionState({
          ...parentContextType.completionState,
          Standards: "N",
        });
      }, 1000);
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("DepthOfSale") &&
      parentContextType?.completionState?.DepthOfSales == "Y"
    ) {
      setTimeout(() => {
        loadFixedRateContent();
        parentContextType.setCompletionState({
          ...parentContextType.completionState,
          DepthOfSales: "N",
        });
      }, 1000);
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Blackout") &&
      parentContextType?.completionState?.Blackout == "Y"
    ) {
      setTimeout(() => {
        loadFixedRateContent();
        parentContextType.setCompletionState({
          ...parentContextType.completionState,
          Blackout: "N",
        });
      }, 1000);
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("eligibilityAmenity") &&
      parentContextType?.completionState?.EligAmen == "Y"
    ) {
      setTimeout(() => {
        loadFixedRateContent();
        parentContextType.setCompletionState({
          ...parentContextType.completionState,
          EligAmen: "N",
        });
      }, 1000);
    }
  }, [
    parentContextType?.completionState?.PricingContact,
    parentContextType?.completionState?.EligAmen,
    parentContextType?.completionState?.Blackout,
    parentContextType?.completionState?.DepthOfSales,
    parentContextType?.completionState?.Standards,
  ]);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("GroupsMeetings") &&
      appContext?.groupMeetingUpdation
    ) {
      setTimeout(() => {
        loadFixedRateContent();
      }, 1000);

      if (appContext?.groupMeetingUpdation) {
        appContext?.setGroupMeetingUpdation(false);
      }
    }
  }, [appContext?.groupMeetingUpdation]);

  useEffect(() => {
    if (initialValidation == true) {
      validatePage();
    }
  }, [initialValidation]);

  const getSelectedRuleItem = (ruleId: string, hotelRuleItem) => {
    if (
      state.hotelRFPFixedRates[Settings.keys.ruleList] &&
      state.hotelRFPFixedRates[Settings.keys.ruleList] !== null &&
      state.hotelRFPFixedRates[Settings.keys.ruleList] !== undefined &&
      state.hotelRFPFixedRates[Settings.keys.ruleList].length > 0
    ) {
      const hoteRuleList = [
        ...state.hotelRFPFixedRates[Settings.keys.ruleList],
      ];
      const hotelRule = hoteRuleList.find((f) => f.ruleid === ruleId);
      return hotelRuleItem.options.find(
        (item) => item.rule_key === hotelRule.rulevalue
      ).rule_value;
    } else {
      return hotelRuleItem.options[0].rule_value;
    }
  };

  const selectChangeHandler = (event, ruleId) => {
    const hotelRules = [...state.hotelRuleList];
    const index = hotelRules.findIndex((f) => f.rule_id === ruleId);
    hotelRules[index].selectedRule =
      event.target.value === "Yes"
        ? "Y"
        : event.target.value === "No"
        ? "N"
        : "";
    setState({
      ...state,
      hotelRuleList: [...hotelRules],
      formChg: "Y",
    });
    setFormEdited(!formEdited);
  };

  const converToLongDate = (date) => {
    return moment(date).format("MMMM DD, YYYY");
  };

  const addseasonOnclick = (seasonIndex) => {
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const hotelSeasonList = [
      ...state.hotelRFPFixedRates[Settings.keys.seasonList],
    ];
    const endPeriod = state.endPeriod;
    hotelSeasonList.forEach((item, i) => {
      if (hotelSeasonList.length > 1) {
        if (!item.clickCount) {
          item.clickCount = 0;
        }
        if (i == hotelSeasonList.length - 1 && item.clickCount > 0) {
          item.clickCount = 0;
        }
      } else {
        item.clickCount = 0;
      }
      item.isStartDateChanged = false;
      item.isEndDateChanged = false;
    });
    let clickCount = hotelSeasonList[seasonIndex].clickCount
      ? hotelSeasonList[seasonIndex].clickCount
      : 0;
    clickCount++;
    hotelSeasonList[seasonIndex].clickCount = clickCount;
    if (hotelSeasonList.length >= state.maxSeason) {
      alert(
        Settings.alertMsg.maxSeason + state.maxSeason + Settings.keys.seasons
      );
      return;
    } else {
      const newSeasonId = hotelSeasonList[seasonIndex].seasonid + 1;
      let newSeasonEndDate = endPeriod;
      if (hotelSeasonList[seasonIndex].clickCount === 1) {
        newSeasonEndDate = endPeriod;
        if (hotelSeasonList[seasonIndex].enddate !== endPeriod) {
          newSeasonEndDate = "";
        }
      } else {
        newSeasonEndDate = "";
      }
      hotelSeasonList.splice(seasonIndex + 1, 0, {
        rfpseasonid: null,
        hotelrfpid: null,
        seasonid: newSeasonId,
        startdate: "",
        enddate: newSeasonEndDate,
        clickCount: 0,
        isStartDateChanged: false,
        isEndDateChanged: false,
        losListMap: {},
      });
      hotelSeasonList.forEach((item, index) => {
        item.seasonid = index + 1;
        if (index === seasonIndex + 1) {
          item.losListMap = {};
          item.roompoollist = {};
          Object.entries(hotelSeasonList[seasonIndex].losListMap).forEach(
            ([key, los], i) => {
              item.losListMap[
                item.seasonid + "_" + los[Settings.keys.lengthofstayid]
              ] = Object.assign({}, los);
              hotelRFPFixedRates[Settings.keys.roompoollist]
                .slice()
                .forEach((roompool) => {
                  hotelRFPFixedRates[Settings.keys.lratypeList]
                    .slice()
                    .forEach((lra) => {
                      hotelRFPFixedRates[Settings.keys.roomtypeList]
                        .slice()
                        .forEach((rtype) => {
                          const ratekey =
                            item.seasonid +
                            "_" +
                            los[Settings.keys.lengthofstayid] +
                            "_" +
                            roompool.seq +
                            "_" +
                            lra.productid +
                            "_" +
                            rtype.roomtypeid;
                          let isRequired = false;
                          if (
                            lra.required === "Y" &&
                            roompool.required === "Y"
                          ) {
                            isRequired = true;
                          }
                          item.roompoollist[ratekey] = {
                            lengthofstayid: los[Settings.keys.lengthofstayid],
                            productid: lra.productid,
                            rate: "",
                            roompool: roompool.seq,
                            roomtypeid: rtype.roomtypeid,
                            seasonid: item.seasonid,
                            isRequired: isRequired,
                          };
                        });
                    });
                });
            }
          );
        } else {
          Object.entries(item.losListMap).forEach(([key, value], i) => {
            const prevSeasonid = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(prevSeasonid);
            key = key.replace(regex, item.seasonid);
            item.losListMap[key] = value;
            if (item.losListMap[prevKey] && prevKey !== key) {
              delete item.losListMap[prevKey];
            }
          });
          Object.entries(item.roompoollist).forEach(([key, value], i) => {
            const prevSeasonid = key.split("_")[0];
            const prevKey = key;
            const regex = new RegExp(prevSeasonid);
            key = key.replace(regex, item.seasonid);
            item.roompoollist[key] = value;
            if (item.roompoollist[prevKey] && prevKey !== key) {
              delete item.roompoollist[prevKey];
            }
          });
        }
      });
      hotelRFPFixedRates[Settings.keys.seasonList] = hotelSeasonList;
      setState({
        ...state,
        hotelRFPFixedRates: { ...hotelRFPFixedRates },
        seasonChg: "Y",
        formChg: "Y",
      });
      setFormEdited(!formEdited);
    }
  };

  const delseasonOnclick = (index) => {
    let strStartDate;
    const nextSeason = index + 1;
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const hotelSeasonList = [
      ...state.hotelRFPFixedRates[Settings.keys.seasonList],
    ];
    if (confirm(Settings.alertMsg.deleteSeason)) {
      if (hotelSeasonList.length > 1) {
        if (
          (hotelSeasonList.length === 1 &&
            hotelSeasonList[hotelSeasonList.length - 1].startdate === "") ||
          index === 0
        ) {
          hotelSeasonList[0].startdate = Utils.setDatewithYYYY(
            state.startPeriod
          );
        }
        if (index != 0) {
          const endDate = hotelSeasonList[index - 1]?.enddate;
          if (endDate != "") {
            strStartDate = Utils.getNext(endDate);
            strStartDate = Utils.setDatewithYYYY(strStartDate);
          }
          hotelSeasonList.splice(index, 1);
          if (hotelSeasonList.length > index) {
            hotelSeasonList[index].startdate =
              endDate == state.endPeriod ? "" : strStartDate;
          }
        } else {
          strStartDate = hotelSeasonList[index + 1].enddate;
          hotelSeasonList.splice(nextSeason, 1);
          if (hotelSeasonList.length > index) {
            hotelSeasonList[index].enddate = strStartDate;
          }
        }
        hotelSeasonList[hotelSeasonList.length - 1].enddate =
          Utils.setDatewithYYYY(state.endPeriod);

        // hotelSeasonList[nextSeasonIndex].startdate = Utils.setDatewithYYYY(
        //   Utils.getNext(strEndDate)
        // );
        // for (let i = 0; i < hotelSeasonList.length + 1; i++) {
        //   if ((i = index)) {
        //     console.log(hotelSeasonList[i]);
        //     console.log("dta");
        //   }
        // }

        // hotelSeasonList.forEach((season, index) => {
        //   season.seasonid = index + 1;
        //   Object.entries(season.losListMap).forEach(([key, value], ind) => {
        //     const prevSeasonid = key.split("_")[0];
        //     const prevKey = key;
        //     const regex = new RegExp(prevSeasonid);
        //     key = key.replace(regex, season.seasonid);
        //     season.losListMap[key] = value;
        //     if (season.losListMap[prevKey] && prevKey !== key) {
        //       delete season.losListMap[prevKey];
        //     }
        //   });
        //   Object.entries(season.roompoollist).forEach(([key, value], i) => {
        //     const prevSeasonid = key.split("_")[0];
        //     const prevKey = key;
        //     const regex = new RegExp(prevSeasonid);
        //     key = key.replace(regex, season.seasonid);
        //     season.roompoollist[key] = value;
        //     if (season.roompoollist[prevKey] && prevKey !== key) {
        //       delete season.roompoollist[prevKey];
        //     }
        //   });
        // });
        hotelRFPFixedRates[Settings.keys.seasonList] = hotelSeasonList;
        setState({
          ...state,
          hotelRFPFixedRates: { ...hotelRFPFixedRates },
          seasonChg: "Y",
          formChg: "Y",
        });
        setFormEdited(!formEdited);
      } else {
        alert(Settings.alertMsg.atleasetOneSeason);
      }
    }
  };

  const addLosOnClick = (losIndex, seasonIndex) => {
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const hotelLosList = [...hotelRFPFixedRates[Settings.keys.losList]];
    const hotelLosListLength = hotelLosList.length;
    if (hotelLosListLength >= state.maxLOS) {
      alert(
        Settings.alertMsg.maxSeason + state.maxLOS + Settings.keys.losTiers
      );
      return;
    } else {
      const tempArray = [];
      for (let i = 0; i < hotelLosList.length + 1; i++) {
        if (i < hotelLosListLength && i != losIndex) {
          tempArray.push({
            ...hotelLosList[i],
            [Settings.keys.lengthofstayid]: i + 1,
            [Settings.keys.roomNightsFrom]:
              hotelLosList[i][Settings.keys.roomNightsFrom],
            [Settings.keys.roomNightsTo]:
              hotelLosList[i][Settings.keys.roomNightsTo],
          });
        }
        if (i == losIndex) {
          const prevTo = hotelLosList[i][Settings.keys.roomNightsTo];
          tempArray.push({
            ...hotelLosList[i],
            [Settings.keys.lengthofstayid]: i + 1,
            [Settings.keys.roomNightsTo]: "",
          });
          tempArray.push({
            ...hotelLosList[i],
            [Settings.keys.roomNightsFrom]: "",
            [Settings.keys.roomNightsTo]: prevTo,
          });
        }
      }
      if (hotelLosListLength > 0) {
        hotelLosList[hotelLosListLength - 1][Settings.keys.roomNightsTo] = 255;
        hotelLosList[0][Settings.keys.roomNightsFrom] = 1;
      }
      for (let i = 0; i < tempArray.length; i++) {
        tempArray[i][Settings.keys.lengthofstayid] = i + 1;
      }
      hotelRFPFixedRates[Settings.keys.losList] = [...tempArray];
      const prevLosKey = losIndex;
      if (hotelLosList[prevLosKey].roomnightsto < 255) {
        hotelLosList[prevLosKey].roomnightsto =
          hotelLosList[prevLosKey].roomnightsto;
      } else {
        hotelLosList[prevLosKey].roomnightsto = "";
      }
      if (hotelLosList[prevLosKey].roomnightsto == "") {
        hotelLosList[losIndex].roomnightsfrom = "";
      }
    }
    setState({
      ...state,
      hotelRFPFixedRates: { ...hotelRFPFixedRates },
      losChg: "Y",
      formChg: "Y",
    });
    setFormEdited(!formEdited);
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

  const delLosOnClick = (losindex, seasonIndex) => {
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    // const seasonList = [...state.hotelRFPFixedRates[Settings.keys.seasonList]];
    const hotelLosList = [...hotelRFPFixedRates[Settings.keys.losList]];
    //const hotelRoomPoolList = { ...seasonList[seasonIndex].roompoollist };
    if (confirm(Settings.alertMsg.deleteLosTiers)) {
      const hotelLosListLength = hotelLosList.length;
      if (hotelLosListLength > 1) {
        hotelLosList.splice(losindex, 1);
      }
    }
    const tempArr = [...hotelLosList];
    tempArr.map((data, index) => {
      const prevKey = index - 1;
      if (hotelLosList.length - 1 == index) {
        data[Settings.keys.roomNightsTo] = 255;
      }
      if (index != 0) {
        const prevData = hotelLosList[prevKey][Settings.keys.roomNightsTo];
        if (prevData == "") {
          data[Settings.keys.roomNightsFrom] = "";
        } else {
          data[Settings.keys.roomNightsFrom] =
            parseInt(hotelLosList[prevKey][Settings.keys.roomNightsTo]) + 1;
        }
      }
    });
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i][Settings.keys.lengthofstayid] = i + 1;
    }
    hotelRFPFixedRates[Settings.keys.losList] = [...tempArr];
    setState({
      ...state,
      hotelRFPFixedRates: { ...hotelRFPFixedRates },
      losChg: "Y",
      formChg: "Y",
    });
    setFormEdited(!formEdited);
  };

  const checkwithcontract = (strDate, strType) => {
    let bOK = true;
    let strErrorMsg = "";
    const obj = { bOK: false, strErrorMsg: "" };
    if (bOK) {
      const strContractEndDate = state.endPeriod;
      if (Utils.isOnOrBeforeDate(strContractEndDate, strDate)) {
        strErrorMsg =
          Settings.keys.the +
          strType +
          Settings.alertMsg.beforePeriodEndDate +
          strContractEndDate +
          Settings.keys.endBracket;
        bOK = false;
      }
    }
    // if (bOK) {
    //   const strContractEndDate = state.endPeriod;
    //   if (strContractEndDate == strDate) {
    //     strErrorMsg =
    //       Settings.keys.the +
    //       strType +
    //       Settings.alertMsg.beforePeriodEndDate +
    //       strContractEndDate +
    //       Settings.keys.endBracket;
    //     bOK = false;
    //   }
    // }

    if (bOK) {
      const strContractStartDate = state.startPeriod;
      if (Utils.isOnOrAfterDate(strContractStartDate, strDate)) {
        strErrorMsg =
          Settings.keys.the +
          strType +
          Settings.alertMsg.afterPeriodStartDate +
          strContractStartDate +
          Settings.keys.endBracket;
        bOK = false;
      }
    }
    obj.bOK = bOK;
    obj.strErrorMsg = strErrorMsg;
    setErrorMessage(strErrorMsg);
    setSeasonAlert(strErrorMsg);
    return obj;
  };

  const checkStart = (seasonItem, e, seasonIndex) => {
    let strStartDate;
    let iReturn;
    iReturn = false;
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const hotelSeasonList = [
      ...state.hotelRFPFixedRates[Settings.keys.seasonList],
    ];
    if (hotelSeasonList[seasonIndex].isStartDateChanged) {
      const currentSeasonIndex = hotelSeasonList.findIndex(
        (i) => i.seasonid === seasonItem.seasonid
      );
      const prevSeasonIndex = currentSeasonIndex - 1;
      strStartDate = e.target.value;
      if (Utils.isDate(strStartDate, "")) {
        const contractMsg = checkwithcontract(strStartDate, "start");
        if (contractMsg.bOK) {
          iReturn = true;
          strStartDate = Utils.setDatewithYYYY(strStartDate);
          hotelSeasonList[currentSeasonIndex].startdate = strStartDate;

          if (currentSeasonIndex != 0) {
            hotelSeasonList[prevSeasonIndex].enddate = Utils.setDatewithYYYY(
              Utils.getPrev(strStartDate)
            );
          }
          hotelRFPFixedRates[Settings.keys.seasonList] = [...hotelSeasonList];
          setState({
            ...state,
            hotelRFPFixedRates: { ...hotelRFPFixedRates },
            seasonChg: "Y",
            formChg: "Y",
          });
          setFormEdited(!formEdited);
        } else {
          alert(contractMsg.strErrorMsg);
        }
      } else {
        setState({
          ...state,
          hotelRFPFixedRates: { ...hotelRFPFixedRates },
          seasonChg: "Y",
          formChg: "Y",
        });
        setFormEdited(!formEdited);
      }
    }
    return iReturn;
  };

  const updateNext = (seasonItem, e, seasonIndex) => {
    let strEndDate;
    let iReturn;
    let strErrorMsg = "";
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const hotelSeasonList = [
      ...state.hotelRFPFixedRates[Settings.keys.seasonList],
    ];
    iReturn = false;
    const strStartDate = hotelSeasonList[seasonIndex].startdate;
    if (hotelSeasonList[seasonIndex].isEndDateChanged) {
      if (
        e.target.value !== "" &&
        e.target.value !== null &&
        e.target.value !== undefined
      ) {
        const currentSeasonIndex = hotelSeasonList.findIndex(
          (i) => i.seasonid === seasonItem.seasonid
        );
        const nextSeasonIndex = currentSeasonIndex + 1;
        strEndDate = e.target.value;

        if (Utils.isDate(strEndDate, "")) {
          const contractMsg = checkwithcontract(strEndDate, "end");
          if (contractMsg.bOK) {
            if (Utils.isValidDate(strStartDate, strEndDate)) {
              iReturn = true;
              strEndDate = Utils.setDatewithYYYY(strEndDate);
              hotelSeasonList[currentSeasonIndex].enddate = strEndDate;

              if (nextSeasonIndex < hotelSeasonList.length) {
                hotelSeasonList[nextSeasonIndex].startdate =
                  Utils.setDatewithYYYY(Utils.getNext(strEndDate));
              }
              hotelRFPFixedRates[Settings.keys.seasonList] = [
                ...hotelSeasonList,
              ];
              if (Utils.setDatewithYYYY(e.target.value) === state.endPeriod) {
                const seasonLength =
                  hotelRFPFixedRates[Settings.keys.seasonList].length - 1;
                hotelRFPFixedRates[Settings.keys.seasonList].splice(
                  seasonIndex + 1,
                  seasonLength
                );
              }
              setState({
                ...state,
                hotelRFPFixedRates: { ...hotelRFPFixedRates },
                seasonChg: "Y",
                formChg: "Y",
              });
              setFormEdited(!formEdited);
            }
          } else {
            alert(contractMsg.strErrorMsg);
          }
        } else {
          setState({
            ...state,
            hotelRFPFixedRates: { ...hotelRFPFixedRates },
            seasonChg: "Y",
            formChg: "Y",
          });
          setFormEdited(!formEdited);
        }
      } else {
        if (seasonIndex === 0 && e.target.value === "") {
          strErrorMsg = Settings.alertMsg.enterOneSeason;
          alert(strErrorMsg);
          hotelSeasonList[seasonIndex].enddate = state.endPeriod;
          hotelRFPFixedRates[Settings.keys.seasonList] = hotelSeasonList;
          setState({
            ...state,
            hotelRFPFixedRates: hotelRFPFixedRates,
            seasonChg: "Y",
            formChg: "Y",
          });
          setFormEdited(!formEdited);
        } else {
          hotelSeasonList[seasonIndex].enddate = "";
          hotelSeasonList[seasonIndex].startdate = "";
          hotelSeasonList[seasonIndex - 1].enddate = state.endPeriod;
          setState({
            ...state,
            hotelRFPFixedRates: hotelRFPFixedRates,
            seasonChg: "Y",
            formChg: "Y",
          });
          setFormEdited(!formEdited);
          const seasonKey = hotelSeasonList[seasonIndex].seasonid - 1;
          (
            document.getElementById(
              Settings.keys.hotelSeasonAttrId +
                `${seasonKey}` +
                Settings.keys.strEndDateAttrId
            ) as HTMLInputElement
          ).focus();
          (
            document.getElementById(
              Settings.keys.hotelSeasonAttrId +
                `${seasonKey}` +
                Settings.keys.strEndDateAttrId
            ) as HTMLInputElement
          ).select();
        }
      }
    }
    setErrorMessage(strErrorMsg);
    setSeasonAlert(strErrorMsg);
    return iReturn;
  };

  const onDateChangeHandler = (event, seasonIndex, key) => {
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const hotelSeasonList = [
      ...state.hotelRFPFixedRates[Settings.keys.seasonList],
    ];
    hotelSeasonList.forEach((item) => {
      if (key === Settings.keys.enddate) {
        item.isEndDateChanged = false;
      } else {
        item.isStartDateChanged = false;
      }
    });
    if (event.target.value !== hotelSeasonList[seasonIndex][key]) {
      hotelSeasonList[seasonIndex][key] = event.target.value;
      if (key === Settings.keys.enddate) {
        hotelSeasonList[seasonIndex].isEndDateChanged = true;
      } else {
        hotelSeasonList[seasonIndex].isStartDateChanged = true;
      }
      setState({
        ...state,
        hotelRFPFixedRates: hotelRFPFixedRates,
      });
    }
  };

  const DateNumberOnly_onkeypress = (e, seasonIndex, key) => {
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const hotelSeasonList = [
      ...state.hotelRFPFixedRates[Settings.keys.seasonList],
    ];
    if (e.charCode === 13) {
      hotelSeasonList[seasonIndex][key] = e.target.value;
      hotelRFPFixedRates[Settings.keys.seasonList] = hotelSeasonList;
      setState({ ...state, hotelRFPFixedRates: hotelRFPFixedRates });
    } else {
      Utils.DateNumberOnly_onkeypress(e);
    }
  };

  const getLastIndex = (arr) => {
    if (arr instanceof Object) {
      return Object.entries(arr).length - 1;
    } else {
      return arr.length - 1;
    }
  };

  const checkLosStart = (event, losIndex, seasonIndex) => {
    let iReturn;
    iReturn = false;
    let strErrMsg = "";
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const hotelLosList = [...hotelRFPFixedRates[Settings.keys.losList]];
    hotelLosList.map((item, index) => {
      if (index === losIndex) {
        if (item[Settings.keys.isRoomNightsFromChanged]) {
          if (event.target.value < 255 && event.target.value !== "") {
            iReturn = true;
          } else {
            strErrMsg = Settings.alertMsg.losLimit;
            alert(strErrMsg);
            iReturn = false;
          }
          const prevKey = losIndex - 1;
          if (prevKey !== -1) {
            hotelLosList[prevKey].roomnightsto = event.target.value
              ? parseInt(event.target.value) - 1
              : hotelLosList[prevKey].roomnightsto;
          }
          iReturn = true;
        }
      }
    });
    setState({
      ...state,
      hotelRFPFixedRates: { ...hotelRFPFixedRates },
      losChg: "Y",
      formChg: "Y",
    });
    setFormEdited(!formEdited);
    setErrorMessage(strErrMsg);
    setLosAlert(strErrMsg);
    return iReturn;
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

  const updateSeasonList = (hotelRFPFixedRates, seasonList, hotelLosList) => {
    seasonList.forEach((season) => {
      Object.entries(hotelLosList).forEach(([key, los], index) => {
        season.losListMap[
          season.seasonid + "_" + los[Settings.keys.lengthofstayid]
        ] = Object.assign({}, los);
      });
      if (lengthOf(season.losListMap) !== lengthOf(hotelLosList)) {
        const diffKey = findDifflLosKeyInSeason(
          hotelLosList,
          season.losListMap
        );
        diffKey.forEach((k) => {
          const diffLosKey = season.seasonid + "_" + k;
          if (season.losListMap.hasOwnProperty(diffLosKey)) {
            delete season.losListMap[diffLosKey];
          }
        });
      }
    });
    hotelRFPFixedRates[Settings.keys.seasonList] = [...seasonList];
    setState({
      ...state,
      hotelRFPFixedRates: { ...hotelRFPFixedRates },
      losChg: "Y",
      formChg: "Y",
    });
    setFormEdited(!formEdited);
  };

  const updateLosNext = (event, losKey) => {
    let iReturn;
    iReturn = false;
    let strErrMsg = "";
    const iTo = event.target.value;
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const hotelLosList = [...hotelRFPFixedRates[Settings.keys.losList]];
    const deleteLos = hotelLosList.length;
    const fromVal = hotelLosList[losKey].roomnightsfrom;
    const nextKey = losKey + 1;
    if (iTo == null || iTo == 0) {
      if (losKey === 0 && hotelLosList.length === 1) {
        strErrMsg = Settings.alertMsg.oneLosTierRequired;
        alert(strErrMsg);
        hotelLosList[losKey].roomnightsto = 255;
      }
      iReturn = true;
    } else if (iTo == fromVal) {
      strErrMsg = Settings.alertMsg.losToAfterLosFrom + nextKey;
      alert(strErrMsg);
      hotelLosList[nextKey].roomnightsfrom = "";
      iReturn = false;
    } else if (iTo > 255) {
      strErrMsg = Settings.alertMsg.losToLessThanEqual;
      alert(strErrMsg);
      setState({
        ...state,
        losChg: "Y",
        formChg: "Y",
      });
      setFormEdited(!formEdited);
    } else {
      if (iTo > hotelLosList[losKey].roomnightsfrom) {
        if (iTo == 255 && losKey !== hotelLosList.length - 1) {
          const firstLosKey = 0;
          hotelLosList[firstLosKey].roomnightsfrom = 1;
        } else if (losKey === hotelLosList.length - 1 && iTo != 255) {
          strErrMsg = Settings.alertMsg.losTierEnding;
          alert(strErrMsg);
          setState({
            ...state,
            losChg: "Y",
            formChg: "Y",
          });
          setFormEdited(!formEdited);
        } else {
          hotelLosList[losKey].roomnightsto = iTo;
          setState({
            ...state,
            losChg: "Y",
            formChg: "Y",
          });
          setFormEdited(!formEdited);
        }
      } else if (hotelLosList[losKey].roomnightsfrom > iTo) {
        strErrMsg = Settings.alertMsg.losFromGreaterThanLosTo;
        alert(strErrMsg);
        iReturn = false;
        setState({
          ...state,
          losChg: "Y",
          formChg: "Y",
        });
        setFormEdited(!formEdited);
      } else if (isNaN(iTo)) {
        setState({
          ...state,
          hotelRFPFixedRates: { ...hotelRFPFixedRates },
          losChg: "Y",
          formChg: "Y",
        });
        setFormEdited(!formEdited);
      }
      if (iTo == 255 && hotelLosList.length != losKey + 1) {
        const los = losKey + 1;
        hotelLosList.splice(los, deleteLos);
        for (let i = 0; i < hotelLosList.length; i++) {
          hotelLosList[i][Settings.keys.lengthofstayid] = i + 1;
        }
        hotelRFPFixedRates[Settings.keys.losList] = [...hotelLosList];
        setState({
          ...state,
          hotelRFPFixedRates: { ...hotelRFPFixedRates },
          losChg: "Y",
          formChg: "Y",
        });
        setFormEdited(!formEdited);
      } else {
        hotelLosList[nextKey].roomnightsfrom = isNaN(
          hotelLosList[losKey].roomnightsto
        )
          ? ""
          : parseInt(hotelLosList[losKey].roomnightsto) + 1;
        setState({
          ...state,
          hotelRFPFixedRates: { ...hotelRFPFixedRates },
          losChg: "Y",
          formChg: "Y",
        });
        setFormEdited(!formEdited);
      }
      setState({
        ...state,
        hotelRFPFixedRates: { ...hotelRFPFixedRates },
        losChg: "Y",
        formChg: "Y",
      });
    }
    setErrorMessage(strErrMsg);
    setLosAlert(strErrMsg);
    return iReturn;
  };

  const onLosChangeHandler = (event, losIndex, key) => {
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const losList = [...hotelRFPFixedRates[Settings.keys.losList]];
    const updateLos = losList[losIndex];
    if (key === Settings.keys.roomNightsFrom) {
      updateLos[Settings.keys.isRoomNightsFromChanged] = false;
    } else {
      updateLos[Settings.keys.isRoomNightsToChanged] = false;
    }
    if (event.target.value !== updateLos[key]) {
      updateLos[key] = event.target.value;
      if (key === Settings.keys.roomNightsFrom) {
        updateLos[Settings.keys.isRoomNightsFromChanged] = true;
      } else {
        updateLos[Settings.keys.isRoomNightsToChanged] = true;
      }
    }

    setState({
      ...state,
      hotelRFPFixedRates: { ...hotelRFPFixedRates },
    });
  };

  const numberAndFloatOnly = (val) => {
    return !isNaN(val);
  };

  const checkRates = (
    e,
    rateKey,
    bCheckrates,
    ratetype,
    bCompare,
    seasonIndex,
    losIndex,
    objRate
  ) => {
    const rateValue = e.target.value;
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const seasonList = [...hotelRFPFixedRates[Settings.keys.seasonList]];
    if (rateValue !== "" && numberAndFloatOnly(rateValue)) {
      seasonList[seasonIndex].roompoollist[rateKey].rate = rateValue;
    } else {
      if (rateValue == "") {
        seasonList[seasonIndex].roompoollist[rateKey].rate = rateValue;
      }
    }
    hotelRFPFixedRates[Settings.keys.seasonList] = [...seasonList];
    setState({
      ...state,
      hotelRFPFixedRates: hotelRFPFixedRates,
    });
  };

  const rateOnChange = (
    e,
    rateKey,
    bCheckrates,
    ratetype,
    bCompare,
    seasonIndex,
    losIndex,
    rateValue,
    objRate
  ) => {
    if (bCheckrates) {
      const strfieldadd = undefined;
      if (
        !rateCheck(
          e,
          rateKey,
          ratetype,
          bCompare,
          strfieldadd,
          rateValue,
          objRate,
          losIndex,
          seasonIndex,
          false
        ).bOK
      ) {
        setState({ ...state, formChg: "Y" });
        setFormEdited(!formEdited);
        return false;
      } else {
        setState({ ...state, formChg: "Y" });
        setFormEdited(!formEdited);
        return true;
      }
    } else {
      setState({ ...state, formChg: "Y" });
      setFormEdited(!formEdited);
      return true;
    }
  };

  const rateCheck = (
    e,
    rateKey,
    ratetype,
    bCompare,
    strfieldadd,
    rateValue,
    objRate,
    losIndex,
    seasonIndex,
    isValidating
  ) => {
    isValidating = isValidating ? isValidating : false;
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const seasonList = [...hotelRFPFixedRates[Settings.keys.seasonList]];
    const obj = { bOK: true, strErrorMsg: "" };
    const objRateChange = document.getElementById(objRate);
    const ratearray = rateKey.split("_");
    const rootid = ratearray[0] + "_" + ratearray[1] + "_" + ratearray[2];
    if (strfieldadd == undefined) strfieldadd = "";
    obj.bOK = true;

    if (obj.bOK) {
      if (rateValue !== "") {
        obj.strErrorMsg = pricingUtils.isValidRate(rateValue);
        if (obj.strErrorMsg != "") obj.bOK = false;
      }
    }
    if (!bCompare) {
      if (!obj.bOK) {
        if (!isValidating) {
          alert(obj.strErrorMsg);
          objRateChange.scrollIntoView(false);
        } else {
          setErrorMessage(obj.strErrorMsg);
          setRateAlert(obj.strErrorMsg);
          obj.bOK = false;
        }
      }

      return obj;
    }

    //if user role not equals to isPASadmin
    if (obj.bOK) {
      const iSeason = parseInt(ratearray[0]);
      const iLOS = parseInt(ratearray[1]);
      const iRP = parseInt(ratearray[2]);
      const iPR = parseInt(ratearray[3]);
      const iRT = parseInt(ratearray[4]);
      const objNumLos = lengthOf(seasonList[seasonIndex].losListMap);
      obj.strErrorMsg = Rate_check_prod_roomtype(
        rateValue,
        ratetype,
        rootid,
        iRT,
        iPR,
        iRP,
        strfieldadd,
        seasonIndex
      );
      if (obj.strErrorMsg != "") obj.bOK = false;

      if (obj.bOK) {
        obj.strErrorMsg = Rate_check_prod_roompool(
          rateValue,
          ratetype,
          ratearray[0] + "_" + ratearray[1],
          iRT,
          iPR,
          iRP,
          strfieldadd,
          seasonIndex
        );
        if (obj.strErrorMsg != "") obj.bOK = false;
      }
    }

    //if user role not equals to isPASadmin
    if (obj.bOK) {
      const currStayId = Object.entries(seasonList[seasonIndex].losListMap)[
        losIndex
      ][1][Settings.keys.lengthofstayid];
      const totalLos = lengthOf(seasonList[seasonIndex].losListMap);
      if (totalLos > 1) {
        Object.entries(seasonList[seasonIndex].losListMap).forEach(
          ([key, value]) => {
            if (
              currStayId > 1 &&
              value[Settings.keys.lengthofstayid] === currStayId - 1
            ) {
              const newKey =
                key +
                "_" +
                ratearray[2] +
                "_" +
                ratearray[3] +
                "_" +
                ratearray[4];
              const objCmpRate =
                seasonList[seasonIndex].roompoollist[newKey].rate;
              if (!compareRates(rateValue, objCmpRate, true, true)) {
                obj.strErrorMsg =
                  Settings.alertMsg.theLosTier +
                  currStayId +
                  Settings.alertMsg.rateLessThanEqualLos +
                  (currStayId - 1) +
                  Settings.alertMsg.rate;
                obj.bOK = false;
                return false;
              }
            } else if (value[Settings.keys.lengthofstayid] === currStayId + 1) {
              const newRateKey =
                key +
                "_" +
                ratearray[2] +
                "_" +
                ratearray[3] +
                "_" +
                ratearray[4];
              const objCmpRate =
                seasonList[seasonIndex].roompoollist[newRateKey].rate;
              if (!compareRates(rateValue, objCmpRate, false, true)) {
                obj.strErrorMsg =
                  Settings.alertMsg.theLosTier +
                  currStayId +
                  Settings.alertMsg.rateGreaterThanEqualLos +
                  (currStayId + 1) +
                  Settings.alertMsg.rate;
                obj.bOK = false;
                return false;
              }
            }
            return obj.bOK;
          }
        );
      }
    }

    if (!obj.bOK) {
      if (obj.strErrorMsg !== "") {
        if (!isValidating) {
          alert(obj.strErrorMsg);
          objRateChange.scrollIntoView(false);
        } else {
          setErrorMessage(obj.strErrorMsg);
          setRateAlert(obj.strErrorMsg);
          obj.bOK = false;
        }
      }
    }
    setErrorMessage(obj.strErrorMsg);
    setRateAlert(obj.strErrorMsg);
    return obj;
  };

  const Rate_check_prod_roompool = (
    objChangeRate,
    ratetype,
    rootid,
    iRT,
    iPR,
    iRP,
    strfieldadd,
    seasonIndex
  ) => {
    let bOK = true;
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const seasonList = [...hotelRFPFixedRates[Settings.keys.seasonList]];
    let strErrorMsg = "";
    const arrayRT = hotelRFPFixedRates[Settings.keys.roomtypeList].reduce(
      (acc, val, index) => {
        acc[val.roomtypeid] = val.roomtypedescription;
        return acc;
      },
      {}
    );
    let roomKey = "";
    let objCmpRate = null;
    //compare room type rates && only account for 2 room types
    if (bOK) {
      if (iRP > 1) {
        roomKey = rootid + "_" + (iRP - 1) + "_" + iPR + "_" + iRT;
        objCmpRate = seasonList[seasonIndex].roompoollist[roomKey].rate;
        if (
          objCmpRate != null &&
          !compareRates(objChangeRate, objCmpRate, false, true)
        ) {
          strErrorMsg =
            Settings.alertMsg.theRoomPool +
            iRP +
            " " +
            arrayRT[iRT] +
            Settings.alertMsg.rateGreaterThanRP +
            (iRP - 1) +
            " " +
            arrayRT[iRT] +
            Settings.alertMsg.rate;
          bOK = false;
        }
      }
    }
    if (bOK) {
      if (iRP < 3) {
        roomKey = rootid + "_" + (iRP + 1) + "_" + iPR + "_" + iRT;
        objCmpRate = seasonList[seasonIndex].roompoollist[roomKey].rate;
        if (
          objCmpRate != null &&
          !compareRates(objChangeRate, objCmpRate, true, true)
        ) {
          strErrorMsg =
            Settings.alertMsg.theRoomPool +
            iRP +
            " " +
            arrayRT[iRT] +
            Settings.alertMsg.rateLessThanRP +
            (iRP + 1) +
            " " +
            arrayRT[iRT] +
            Settings.alertMsg.rate;
          bOK = false;
        }
      }
    }
    if (bOK) return "";
    else return strErrorMsg;
  };

  const Rate_check_prod_roomtype = (
    objChangeRate,
    ratetype,
    rootid,
    iRT,
    iPR,
    iRP,
    strfieldadd,
    seasonIndex
  ) => {
    let bOK = true;
    const minRT =
      state.hotelRFPFixedRates[Settings.keys.roomtypeList][0].roomtypeid;
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    const seasonList = [...hotelRFPFixedRates[Settings.keys.seasonList]];
    let strErrorMsg = "";
    const arrayRT = hotelRFPFixedRates[Settings.keys.roomtypeList].reduce(
      (acc, val, index) => {
        acc[val.roomtypeid] = val.roomtypedescription;
        return acc;
      },
      {}
    );
    let objCmpRate = null;
    let roomKey = "";
    //compare room type rates && only account for 2 room types
    if (bOK) {
      if (iRT > minRT) {
        roomKey = rootid + "_" + iPR + "_" + (iRT - 1);
        objCmpRate = seasonList[seasonIndex].roompoollist[roomKey].rate;
        if (!compareRates(objChangeRate, objCmpRate, false, true)) {
          strErrorMsg =
            Settings.keys.the +
            arrayRT[iRT] +
            Settings.alertMsg.rateGreaterThanEqual +
            arrayRT[iRT - 1] +
            Settings.alertMsg.rate;
          bOK = false;
        }
      }
    }
    if (bOK) {
      if (iRT == minRT) {
        roomKey = rootid + "_" + iPR + "_" + (iRT + 1);
        if (seasonList[seasonIndex].roompoollist[roomKey]) {
          objCmpRate = seasonList[seasonIndex].roompoollist[roomKey].rate;
          if (!compareRates(objChangeRate, objCmpRate, true, true)) {
            strErrorMsg =
              Settings.keys.the +
              arrayRT[iRT] +
              Settings.alertMsg.rateLessThanEqual +
              arrayRT[iRT + 1] +
              Settings.alertMsg.rate;
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

  const checkConsecutiveDates = (seasonList) => {
    let bOK = true;
    let strMessage = "";
    let objPrevSS = null;
    let objPrevSE = null;
    for (let i = 0; i < seasonList.length; i++) {
      const contractMsgStart = checkwithcontract(
        seasonList[i].startdate,
        "start"
      );
      if (!contractMsgStart.bOK) {
        strMessage = contractMsgStart.strErrorMsg;
        bOK = false;
        break;
      }
      const contractMsgEnd = checkwithcontract(seasonList[i].enddate, "end");
      if (!contractMsgEnd.bOK) {
        strMessage = contractMsgEnd.strErrorMsg;
        bOK = false;
        break;
      }
      if (!Utils.isAfterDate(seasonList[i].enddate, seasonList[i].startdate)) {
        strMessage =
          Settings.alertMsg.seasonStartBeforeSeasonEnd + seasonList[i].seasonid;
        bOK = false;
        break;
      }
      if (objPrevSE != null) {
        if (!Utils.isAfterDate(seasonList[i].startdate, objPrevSE)) {
          strMessage =
            Settings.alertMsg.seasonEndDateForSeason +
            seasonList[i].seasonid +
            Settings.alertMsg.beforeNextSeasonStartDate;
          bOK = false;
          break;
        }
        if (Utils.calcNumDays(objPrevSE, seasonList[i].startdate) != 2) {
          strMessage =
            Settings.alertMsg.seasonStartDateforSeason +
            seasonList[i].seasonid +
            Settings.alertMsg.afterEndOfPrevSeason;
          bOK = false;
          break;
        }
      }
      objPrevSS = seasonList[i].startdate;
      objPrevSE = seasonList[i].enddate;
    }
    return { bOK: bOK, strMessage: strMessage };
  };

  const validateLOS = (losList) => {
    let bOK = true;
    const numLOS = losList.length;
    let prevTo = 0;
    let curFrom = 0;
    let curTo = 0;
    let strErrMsg = "";
    // losList.map((los, index) => {
    //   curTo = parseInt(los[Settings.keys.roomNightsTo]);
    //   curFrom = parseInt(los[Settings.keys.roomNightsFrom]);
    //   if (los[Settings.keys.lengthofstayid] === 1) {
    //     prevTo = 0;
    //     if (curFrom != 1) {
    //       bOK = false;
    //       strErrMsg = Settings.alertMsg.firstLosTier;
    //       break;
    //     }
    //   }
    // });
    for (const [key, values] of Object.entries(losList)) {
      const value = losList[key];
      curTo = parseInt(value[Settings.keys.roomNightsTo]);
      curFrom = parseInt(value[Settings.keys.roomNightsFrom]);
      const iLOS = value[Settings.keys.lengthofstayid];
      if (value[Settings.keys.lengthofstayid] === 1) {
        prevTo = 0;
        if (curFrom != 1) {
          bOK = false;
          strErrMsg = Settings.alertMsg.firstLosTier;
          break;
        }
      }
      if (curFrom == curTo || curFrom > curTo) {
        bOK = false;
        strErrMsg = Settings.alertMsg.losToAfterLosFrom + iLOS;
        break;
      }
      if (prevTo != 0 && curFrom - 1 != prevTo) {
        bOK = false;
        strErrMsg =
          Settings.alertMsg.losFromForTier +
          iLOS +
          Settings.alertMsg.greaterThanLosOfPrevTier;
        break;
      }
      if (iLOS == numLOS && curTo !== 255) {
        bOK = false;
        strErrMsg = Settings.alertMsg.lastLosTier;
        break;
      }
      prevTo = curTo;
    }
    return { bOK: bOK, strMessage: strErrMsg };
  };

  const validatePage = () => {
    const hotelRFPFixedRates = { ...state.hotelRFPFixedRates };
    let bOK = { bOK: true, strMessage: "" };

    const losEditable = state.loseditable;
    const seasonList = [...hotelRFPFixedRates[Settings.keys.seasonList]];
    const losList = [...hotelRFPFixedRates[Settings.keys.losList]];
    if (state.userDetails.isPASAdmin || state.userDetails.isHotelUser) {
      bOK = checkConsecutiveDates(seasonList);
      if (bOK.bOK && losEditable) {
        bOK = validateLOS(losList);
      }
    }
    if (bOK.strMessage !== "") {
      setErrorMessage(bOK.strMessage);
    }
    return bOK;
  };

  useEffect(() => {
    if (state.formChg == "Y") {
      validatePage();
    }
  }, [formEdited]);

  const updateHotelRFPFixedRates = () => {
    return new Promise((resolve, reject) => {
      if (!state.userDetails.isAnySalesUser) {
        const stateObj = { ...state };
        const num_los = lengthOf(
          stateObj.hotelRFPFixedRates[Settings.keys.seasonList][0].losListMap
        );
        const num_season =
          stateObj.hotelRFPFixedRates[Settings.keys.seasonList].length;
        const num_product = stateObj.hotelRFPFixedRates.lratypeList.length;
        const num_rt = stateObj.hotelRFPFixedRates.roomtypeList.length;
        const min_rt =
          stateObj.hotelRFPFixedRates.roomtypeList &&
          stateObj.hotelRFPFixedRates.roomtypeList.length > 0
            ? stateObj.hotelRFPFixedRates.roomtypeList[0].roomtypeid
            : 0;
        const num_rp = stateObj.hotelRFPFixedRates.roompoollist.length;
        const maxLOS = stateObj.hotelRFPFixedRates.maxLOS;
        const next_los = num_los;
        const formChg = stateObj.formChg;
        const seasonChg = stateObj.seasonChg;
        const losChg = stateObj.losChg;
        const hotelrfpid = stateObj.hotelrfpid;
        const marshaCode = stateObj.marshaCode;
        const period = stateObj.period;

        const strHotelruleList = stateObj.hotelRuleList.map((rules) => {
          return {
            rulevalue: rules.selectedRule,
            ruleid: rules.rule_id,
          };
        });

        const strHotelSeason = stateObj.hotelRFPFixedRates[
          Settings.keys.seasonList
        ]
          .map((seasons, index) => {
            return {
              startdate: seasons.startdate.toString(),
              enddate: seasons.enddate.toString(),
              seasonid: index + 1,
            };
          })
          .reduce((acc, value, index) => {
            acc[index + 1] = value;
            return acc;
          }, {});

        const strhotelrateMap = {};
        const strRtid = {};
        const strRATEREQ = {};
        const strLosList = {};

        stateObj.hotelRFPFixedRates[Settings.keys.seasonList].forEach(
          (season) => {
            Object.entries(season.roompoollist).forEach(([key, value], i) => {
              strhotelrateMap[key] = {
                rate: parseInt(value.rate),
              };
              strRtid[key] = value.roomtypeid;
              const objReq = value.isRequired;
              strRATEREQ[key] = objReq == true ? true : false;
            });
          }
        );
        const lostList = stateObj.hotelRFPFixedRates[Settings.keys.losList];
        Object.entries(lostList).map(([key, los]) => {
          los[Settings.keys.roomNightsFrom] = parseInt(
            los[Settings.keys.roomNightsFrom]
          );
          los[Settings.keys.roomNightsTo] = parseInt(
            los[Settings.keys.roomNightsTo]
          );
          delete los[Settings.keys.isRoomNightsToChanged];
          strLosList[key] = los;
        });
        const payload = {
          strHotelruleList: JSON.stringify(strHotelruleList),
          strHotelSeason: JSON.stringify(strHotelSeason),
          strhotelrateMap: JSON.stringify(strhotelrateMap),
          strRtid: JSON.stringify(strRtid),
          strRATEREQ: JSON.stringify(strRATEREQ),
          strLosList: JSON.stringify(strLosList),
          num_los: num_los,
          num_season: num_season,
          num_product: num_product,
          num_rt: num_rt,
          min_rt: min_rt,
          num_rp: num_rp,
          maxLOS: maxLOS,
          num_seasoninitial: num_season,
          next_los: next_los,
          formChg: formChg,
          seasonChg: seasonChg,
          losChg: losChg,
          hotelrfpid: hotelrfpid,
          marshaCode: marshaCode,
          period: period,
        };
        FixedSeasonsAPI.updateHotelRFPFixedRates(payload).then((res) => {
          appContext.setupdateAPIcallSuccess(true);
          resolve(res);
          parentContextType.setCompletionState({
            ...parentContextType.completionState,
            Seasons: "Y",
          });
        });
      }
    });
  };

  const fixedSeasonsContextValue = {
    state,
    setState,
    getSelectedRuleItem,
    selectChangeHandler,
    showScreenLoader,
    setShowScreenLoader,
    converToLongDate,
    addseasonOnclick,
    delseasonOnclick,
    addLosOnClick,
    delLosOnClick,
    checkStart,
    updateNext,
    DateNumberOnly_onkeypress,
    onDateChangeHandler,
    checkLosStart,
    onLosChangeHandler,
    updateLosNext,
    checkRates,
    rateOnChange,
    validatePage,
    updateHotelRFPFixedRates,
    setErrorMessage,
    errorMessage,
    formEdited,
    setFormEdited,
  };

  return (
    <FixedSeasonsContext.Provider value={fixedSeasonsContextValue}>
      {props.children}
    </FixedSeasonsContext.Provider>
  );
};

export const FixedSeasonsConsumer = FixedSeasonsContext.Consumer;
export default FixedSeasonsContext;
