import React, { useContext, useState } from "react";
import API from "../service/API";
import moment from "moment";
import Settings from "../static/Settings";
import Utils from "../../../../../common/utils/Utils";
import { useLocation } from "react-router-dom";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import { range } from "lodash";

const DepthofsaleAccountContext = React.createContext({});
export const DeapthofsaleContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [currentSeasonAPI, setCurrentSeasonAPI] = useState(1);
  const [depthOfSalesDataAPI, setDepthOfSalesDataAPI] = useState(false);
  const [seasonIdForValidation, setSeasonIdForValidation] = useState(1);
  const [controlLoop, setControlLoop] = useState(false);
  const [enVolrmaxChange, setEnVolrmaxChange] = useState(false);
  const [volrmaxChange, setVolrmaxChange] = useState(false);
  const [firstMaxRowPlus, setFirstMaxRowPlus] = useState(false);
  const [firstMaxRowPlusStandard, setFirstMaxRowPlusStandard] = useState(false);
  const [standardcontrolLoop, setStandardcontrolLoop] = useState(false);
  const [onChangeEnTrigger, setOnChangeEnTrigger] = useState(false);
  const [onChangeTrigger, setOnChangeTrigger] = useState(false);
  const [maxDOSFromAPI, setMaxDOSFromAPI] = useState(null);
  const [state, setState] = useState({
    depthOfSales: {
      hotelData: {
        marshaCode: null,
        hotelName: null,
        hotelid: null,
        country: null,
        affiliationid: null,
        franch_flag: null,
        isbrandextendedstay: null,
        isbrandritzcarlton: null,
        isbrandedition: null,
        address1: null,
        address2: null,
        citycountryzip: null,
        main_phone_incl: null,
        exclude_aer: null,
        breakinrates: null,
        servicetype: null,
        isbrandluxur: null,
        isLOSBrand: null,
        isInternational: null,
        marshaCodeAndName: null,
      },
      GeneralReadOnly: null,
      enhancedDOSCompleted: null,
      maxDOS: null,
      currency: null,
      salesDepth: {
        salesdepthid: null,
        hotelrfpid: null,
        peaknsun: null,
        peaknmon: null,
        peakntue: null,
        peaknwed: null,
        peaknthu: null,
        peaknfri: null,
        peaknsat: null,
        isenhanced: null,
        last_updatedate: null,
        currencycode: null,
        currencyname: null,
        salesdepth_en_season: {
          salesdepth_en_season_id: null,
          salesdepthid: null,
          seasonid: null,
          startdate: null,
          enddate: null,
          totalnumseasons: null,
          longStartdate: null,
          longEnddate: null,
        },
        salesdepth_en_loslist: [
          {
            salesdepth_en_los_id: null,
            salesdepthid: null,
            losid: null,
            roomnightsfrom: null,
            roomnightsto: null,
            losChar: null,
          },
        ],
        salesdepth_en_ranges: [],
        salesdepth_ranges: [],
        bt_price_strategy: null,
        prevyear_retailadr: null,
        anticipate_inc_retail_pct: null,
        hasLOSTiers: null,
        totalSeasons: null,
        peakDays: null,
        formattedLast_updatedate: null,
        numberLOSTiers: null,
      },
      menu: {
        pricingmenuList: [
          {
            statusid: null,
            screenid: null,
            screenname: null,
            screensequence: null,
            actionstruts: null,
            message: null,
          },
        ],
        reportPeriods: [
          {
            period: null,
            startdate: null,
            enddate: null,
            hotelsview: null,
            dueDates: null,
            shortEnddate: null,
            shortStartdate: null,
          },
        ],
        nextScreen: null,
        previousScreen: null,
        blockPricingScreens: null,
        mainMenuMessage: null,
      },
      currentItem: null,
    },
    switched: "N",
    formChg: "Y",
    period: null,
    isStandatard: true,
    showModal: false,
    doslevel: "N",
    currentSeason: 1,
    origseason: 1,
    initialSalesDepthRage: [],

    initialEnSalesDepthRange: [],
    enhancedsalesDepthList: [],
    isDataLoaded: false,
    salesDepthList: [],
    roleDetails: {
      eid: null,
      role: null,
      fullName: null,
      email: null,
    },
  });

  const urlParms = useLocation().search;
  const periodFromUrl = new URLSearchParams(urlParms).get("Period");
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const period = new URLSearchParams(urlParms).get("Period");
  const parentContext = useContext(HotelPricingContext);
  const hotelrfpid =
    new URLSearchParams(urlParms).get("Hotelrfpid") == 0 ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == "0" ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == null ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == undefined
      ? parentContext?.selectedHotelRfpId
      : new URLSearchParams(urlParms).get("Hotelrfpid");

  const setDepthData = (data, periodData?: any) => {
    const final_salesdepth_en_rates = [];
    for (let i = 0; i < data?.salesDepth?.numberLOSTiers; i++) {
      final_salesdepth_en_rates.push({
        ratemin: "",
        ratemax: "",
        losid: i + 1,
      });
    }
    const period = periodFromUrl;
    const obj_en = {
      volrmin: "",
      volrmax: "",
      salesdepth_en_rates: final_salesdepth_en_rates,
      comments: "",
      readOnly: false,
      tabIndex: 0,
    };
    const depthData = { ...state.depthOfSales };

    const en_ranges = data.salesDepth.salesdepth_en_ranges;
    if (en_ranges !== null) {
      for (let i = en_ranges.length; i < maxDOSFromAPI; i++) {
        en_ranges.push({ ...obj_en });
      }
    }
    const obj = {
      volrmin: "",
      volrmax: "",
      ratermin: "",
      ratermax: "",
      comments: "",
      readOnly: true,
      tabIndex: 0,
    };

    const ranges = data.salesDepth.salesdepth_ranges;
    if (ranges !== null) {
      for (let i = ranges.length; i < maxDOSFromAPI; i++) {
        ranges.push({ ...obj });
      }
    }
    depthData.salesDepth = data.salesDepth;
    depthData.salesDepth.salesdepth_en_ranges = getEnhancedSalesDepthRangeData(
      data.salesDepth.salesdepth_en_ranges
    );
    depthData.hotelData = data.hotelDetailData;
    depthData.GeneralReadOnly = data.generalReadOnly;
    depthData.enhancedDOSCompleted = data.enhancedDOSCompleted;
    depthData.maxDOS = maxDOSFromAPI;
    depthData.currency = data.currencyused;
    depthData.salesDepth.salesdepth_ranges = getSalesDepthRangeData(
      data.salesDepth.salesdepth_ranges
    );
    depthData.menu = data.menu;
    depthData.currentItem = data.currentItem;
    if (data.salesDepth.isenhanced === "Y") {
      state.isStandatard = false;
      state.doslevel = "Y";
    } else {
      state.isStandatard = true;
      state.doslevel = "N";
    }
    state.depthOfSales.salesDepth.isenhanced = data.salesDepth.isenhanced;
    const origSeason =
      data.salesDepth?.salesdepth_en_season !== null
        ? data.salesDepth?.salesdepth_en_season?.seasonid
        : state.origseason;

    const roleObj = parentContext.state.userDetails.list;
    state.switched = "N";

    setState({
      ...state,
      depthOfSales: depthData,
      isDataLoaded: true,
      roleDetails: roleObj,
      period: period,
      origseason: origSeason,
    });
  };
  const getFormattedDate = (date) => {
    return moment(date).format("MMMM dd, yyyy");
  };
  const setInitialEnSalesDepthRangeData = (resp) => {
    const arr = [];
    const final_salesdepth_en_rates = [];
    for (let i = 0; i < resp?.salesDepth?.numberLOSTiers; i++) {
      final_salesdepth_en_rates.push({
        ratemin: "",
        ratemax: "",
        losid: i + 1,
      });
    }
    const initialSalesDepthRage = [];
    const standardObj = {
      volrmin: "",
      volrmax: "",
      ratermin: "",
      ratermax: "",
      comments: "",
      readOnly: true,
      tabIndex: 0,
    };
    const arrObj = {
      volrmin: "",
      volrmax: "",
      salesdepth_en_rates: final_salesdepth_en_rates,
      comments: "",
      readOnly: false,
      tabIndex: 0,
    };
    const salesdepthObj = final_salesdepth_en_rates;
    for (let i = 0; i < maxDOSFromAPI; i++) {
      if (i == 0) {
        arrObj.readOnly = true;
        arrObj.tabIndex = -1;
        standardObj.tabIndex = -1;
      } else {
        arrObj.readOnly = false;
        arrObj.tabIndex = 0;
      }
      arrObj.salesdepth_en_rates = [...salesdepthObj];
      arr.push({ ...arrObj });
      initialSalesDepthRage.push({ ...standardObj });
    }
    setState({
      ...state,
      initialEnSalesDepthRange: [...arr],
      initialSalesDepthRage: [...initialSalesDepthRage],
    });
  };
  const getSalesDepthRangeData = (listData) => {
    const initialList = [...state.initialSalesDepthRage];
    const newArray = [];
    if (listData !== null && listData.length > 0) {
      listData.map((dataObj, index) => {
        const data = { ...dataObj };
        const json = {};
        if (index === 0) {
          if (data.volrmin === "") {
            json["volrmin"] = 0;
          } else {
            json["volrmin"] = data.volrmin;
          }
          if (data.volrmax === "") {
            json["volrmax"] = "+";
          } else {
            json["volrmax"] = data.volrmax;
          }
        } else {
          json["volrmin"] = data.volrmin;
          json["volrmax"] = data.volrmax;
        }
        json["ratermin"] = data.ratermin ? convertToDecimal(data.ratermin) : "";

        json["ratermax"] =
          data.ratermax && data.ratermax != "+"
            ? convertToDecimal(data.ratermax)
            : "";
        json["comments"] =
          index === 0 ? Settings.depthOfSales.comment : data.comments;
        if (
          listData[index].volrmin === null ||
          listData[index].volrmin === ""
        ) {
          json["readOnly"] = true;
        } else {
          json["readOnly"] = false;
        }
        newArray.push({ ...json });
      });
    } else {
      initialList[0].volrmin = "0";
      initialList[0].volrmax = "+";
      initialList[0].ratermin = "";
      initialList[0].ratermax = "";
      initialList[0].comments = Settings.depthOfSales.comment;
    }
    if (newArray.length > 0) {
      newArray.map((data, i) => {
        initialList[i] = data;
      });
    }
    validation_check_standard(initialList);
    return initialList;
  };

  const getEnhancedSalesDepthRangeData = (rangeList) => {
    const initialList = [...state.initialEnSalesDepthRange];
    const stateSalesDepthData = { ...state.depthOfSales.salesDepth };
    if (stateSalesDepthData.salesdepth_en_ranges.length == 0) {
      stateSalesDepthData.salesdepth_en_ranges = initialList;
    }

    if (
      rangeList !== null &&
      rangeList.length > 0 &&
      stateSalesDepthData.salesdepth_en_ranges.length > 0
    ) {
      rangeList.map((rangeData, index) => {
        if (index <= stateSalesDepthData.salesdepth_en_ranges.length - 1) {
          const vol_max = rangeData.volrmax;
          const vol_max_next_index = index + 1;
          stateSalesDepthData.salesdepth_en_ranges[index].volrmin =
            rangeData.volrmin;
          stateSalesDepthData.salesdepth_en_ranges[index].volrmax =
            rangeData.volrmax;
          if (
            rangeData.volrmax === "" ||
            rangeData.volrmax === Settings.enhancedDOS.volrMaxLimit
          ) {
            stateSalesDepthData.salesdepth_en_ranges[index].volrmax = "+";
            if (index === 0)
              stateSalesDepthData.salesdepth_en_ranges[index].volrmin = 0;
          } else if (
            vol_max_next_index < stateSalesDepthData.salesdepth_en_ranges.length
          ) {
            stateSalesDepthData.salesdepth_en_ranges[
              vol_max_next_index
            ].volrmin = vol_max + 1;
          }
          if (rangeData.salesdepth_en_rates.length > 0) {
            rangeData.salesdepth_en_rates.map(
              (eachSalesdepthenrates, enratesIndex) => {
                eachSalesdepthenrates.ratemin == 0
                  ? (eachSalesdepthenrates.ratemin = "")
                  : eachSalesdepthenrates.ratemin;
                const minObj = {
                  ...stateSalesDepthData.salesdepth_en_ranges[index]
                    .salesdepth_en_rates[enratesIndex],
                };
                minObj.ratemin = eachSalesdepthenrates.ratemin
                  ? convertToDecimal(eachSalesdepthenrates.ratemin)
                  : "";

                eachSalesdepthenrates.ratemax === 0.0
                  ? (eachSalesdepthenrates.ratemax = "")
                  : eachSalesdepthenrates.ratemax;
                minObj.ratemax = eachSalesdepthenrates.ratemax
                  ? convertToDecimal(eachSalesdepthenrates.ratemax)
                  : "";
                stateSalesDepthData.salesdepth_en_ranges[
                  index
                ].salesdepth_en_rates[enratesIndex] = { ...minObj };
              }
            );
          }
          stateSalesDepthData.salesdepth_en_ranges[index].comments =
            index === 0 ? Settings.depthOfSales.comment : rangeData.comments;
        }
      });
    } else {
      initialList[0].volrmin = "0";
      initialList[0].volrmax = "+";
      initialList[0].comments = Settings.depthOfSales.comment;
      stateSalesDepthData.salesdepth_en_ranges = initialList;
    }
    let objMaxVal;
    const maxRows = maxDOSFromAPI;
    const maxInfinityNum = 999999;
    for (let iRow = 0; iRow < maxRows; iRow++) {
      objMaxVal = stateSalesDepthData.salesdepth_en_ranges[`${iRow}`].volrmax;
      if (
        objMaxVal == "+" ||
        objMaxVal == "" ||
        parseFloat(objMaxVal) === maxInfinityNum
      ) {
        iLockRowEnhanced(iRow);
        if (objMaxVal === "+") {
          if (iRow !== 0)
            stateSalesDepthData.salesdepth_en_ranges[`${iRow}`].readOnly =
              false;
        }
      } else {
        if (iRow !== 0)
          stateSalesDepthData.salesdepth_en_ranges[`${iRow}`].readOnly = false;
      }
    }
    validation_check("normal");
    return stateSalesDepthData.salesdepth_en_ranges;
  };

  const calcADR = () => {
    const stateData = { ...state };
    const period = state.period;
    if (parseFloat(period) < Settings.depthOfSales.period) {
      stateData.formChg = "Y";
      const prevADR = stateData.depthOfSales.salesDepth.prevyear_retailadr;
      const antInc =
        stateData.depthOfSales.salesDepth.anticipate_inc_retail_pct;
      const currRetailADR = document.getElementById("retailadr");
      if (prevADR == "" || antInc == "") {
        currRetailADR.innerHTML = "";
        return true;
      } else {
        const prevADRFloat = parseFloat(prevADR);
        const antincFloat = parseFloat(antInc);
        const currADR = prevADR * (1 + antincFloat / 100.0);
        currRetailADR.innerHTML = currADR.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        });
        //currRetailADR.innerHTML=Math.number.format(currADR, {	    pattern: "#,###.00"	  });
      }
    }
    return true;
  };

  const window_onload = () => {
    let keepEmpty = false;
    const objMax1 = document.getElementById(
      "salesDepth.salesdepth_ranges[0].volrmax"
    );
    let objMax1Val =
      state.depthOfSales.salesDepth?.salesdepth_ranges[0].volrmax;
    if (objMax1Val === "") keepEmpty = true;
    update_vol(0, "c");
    if (keepEmpty) objMax1Val = "";
    objMax1.focus();
  };

  const window_onload_enhanced = () => {
    let keepEmpty = false;
    const objMax1 = document.getElementById(
      "salesDepth.salesdepth_en_ranges[0].volrmax"
    );
    let objMax1Val =
      state.depthOfSales.salesDepth?.salesdepth_en_ranges[0].volrmax;
    if (objMax1Val === "") keepEmpty = true;
    // update_volEnhanced(0, "c");
    if (keepEmpty) objMax1Val = "";
    objMax1.focus();
  };

  const enhancedDataConversion = (stateSalesDepthData) => {
    stateSalesDepthData?.salesdepth_en_ranges.map((rangeData, index) => {
      stateSalesDepthData.salesdepth_en_ranges[index].volrmin =
        parseFloatOrEmpty(rangeData?.volrmin);
      stateSalesDepthData.salesdepth_en_ranges[index].volrmax =
        rangeData.volrmax === "+"
          ? rangeData.volrmax
          : parseFloatOrEmpty(rangeData.volrmax);
      stateSalesDepthData.salesdepth_en_ranges[
        index
      ].salesdepth_en_rates[0].ratemin = parseFloatOrEmpty(
        rangeData.salesdepth_en_rates[0].ratemin
      );
      stateSalesDepthData.salesdepth_en_ranges[
        index
      ].salesdepth_en_rates[0].ratemax = parseFloatOrEmpty(
        rangeData.salesdepth_en_rates[0].ratemax
      );
      if (
        stateSalesDepthData.salesdepth_en_ranges[index].salesdepth_en_rates
          .length > 1
      ) {
        stateSalesDepthData.salesdepth_en_ranges[
          index
        ].salesdepth_en_rates[1].ratemin = parseFloatOrEmpty(
          rangeData.salesdepth_en_rates[1].ratemin
        );
        stateSalesDepthData.salesdepth_en_ranges[
          index
        ].salesdepth_en_rates[1].ratemax = parseFloatOrEmpty(
          rangeData.salesdepth_en_rates[1].ratemax
        );
      }
      if (
        stateSalesDepthData.salesdepth_en_ranges[index].salesdepth_en_rates
          .length > 2
      ) {
        stateSalesDepthData.salesdepth_en_ranges[
          index
        ].salesdepth_en_rates[2].ratemin = parseFloatOrEmpty(
          rangeData.salesdepth_en_rates[2].ratemin
        );
        stateSalesDepthData.salesdepth_en_ranges[
          index
        ].salesdepth_en_rates[2].ratemax = parseFloatOrEmpty(
          rangeData.salesdepth_en_rates[2].ratemax
        );
      }
      if (
        stateSalesDepthData.salesdepth_en_ranges[index].salesdepth_en_rates
          .length > 3
      ) {
        stateSalesDepthData.salesdepth_en_ranges[
          index
        ].salesdepth_en_rates[3].ratemin = parseFloatOrEmpty(
          rangeData.salesdepth_en_rates[3].ratemin
        );
        stateSalesDepthData.salesdepth_en_ranges[
          index
        ].salesdepth_en_rates[3].ratemax = parseFloatOrEmpty(
          rangeData.salesdepth_en_rates[3].ratemax
        );
      }
    });

    return stateSalesDepthData;
  };
  const convertToDecimal = (rateValue) => {
    return Number(rateValue).toFixed(2);
  };
  const parseFloatOrEmpty = (rateValue) => {
    if (rateValue == "+") {
      return rateValue;
    } else {
      return rateValue === "" ? null : parseFloat(rateValue);
    }
  };
  const standardDataConversion = (salesDepthData) => {
    salesDepthData?.salesdepth_ranges?.map((data, index) => {
      salesDepthData.salesdepth_ranges[index]["volrmin"] = parseFloatOrEmpty(
        data.volrmin
      );
      salesDepthData.salesdepth_ranges[index]["volrmax"] = parseFloatOrEmpty(
        data.volrmax
      );
      salesDepthData.salesdepth_ranges[index]["ratermin"] = parseFloatOrEmpty(
        data.ratermin
      );
      salesDepthData.salesdepth_ranges[index]["ratermax"] = parseFloatOrEmpty(
        data.ratermax
      );
    });

    return salesDepthData;
  };

  const switchSeason = (seasonId) => {
    setSeasonIdForValidation(seasonId);
    if (validation_check("switchseason")) {
      const prevState = { ...state };
      prevState.currentSeason = seasonId;
      setCurrentSeasonAPI(seasonId);
      prevState.switched = "N";
      setState(prevState);
      const salesDepthData = standardDataConversion(
        state.depthOfSales.salesDepth
      );
      const enhancedSalesDepthData = enhancedDataConversion(
        state.depthOfSales.salesDepth
      );
      salesDepthData.salesdepth_en_ranges =
        enhancedSalesDepthData.salesdepth_en_ranges;
      const first_row_max = document.getElementById(
        "salesDepth.salesdepth_en_ranges[0].volrmax"
      );
      first_row_max?.focus();
      UpdateHotelSalesDepth(prevState, periodFromUrl, salesDepthData, seasonId);
    } else if (appContext.errorMessageAlert.show) {
      appContext.setDisplayNavigationAlert(!appContext.displayNavigationAlert);
    }
  };

  const switchType = (e) => {
    setFirstMaxRowPlus(false);
    setFirstMaxRowPlusStandard(false);
    let isEnhanced = "Y";
    if (e.target.value === "Y") isEnhanced = "N";
    else isEnhanced = "Y";
    const dosLevelVal = e.target.value;
    state.doslevel = dosLevelVal;
    const verifySwitch = confirm(`${Settings.depthOfSales.dialogAlert}`);
    if (verifySwitch) {
      state.switched = "Y";
      state.formChg = "Y";
      state.depthOfSales.salesDepth.isenhanced = isEnhanced;
      setState({
        ...state,
        switched: state.switched,
        formChg: state.formChg,
        doslevel: state.doslevel,
      });

      const salesDepthData = standardDataConversion(
        state.depthOfSales.salesDepth
      );
      const enhancedSalesDepthData = enhancedDataConversion(
        state.depthOfSales.salesDepth
      );
      salesDepthData.salesdepth_en_ranges =
        enhancedSalesDepthData.salesdepth_en_ranges;

      UpdateHotelSalesDepth(
        state,
        periodFromUrl,
        salesDepthData,
        state.currentSeason
      );
    } else {
      // thisForm.doslevel(0).checked = true;
      // thisForm.doslevel(0).focus();
    }
  };

  const UpdateHotelSalesDepth = (
    state,
    periodFromUrl,
    salesDepthData,
    seasonId
  ) => {
    API.updateHotelRFPDepthOfSalesEnhanced(state, periodFromUrl, salesDepthData)
      .then((data) => {
        getHotelDos(seasonId);
      })
      .catch((error) => {});
  };

  const getHotelDos = (seasonId) => {
    setFirstMaxRowPlus(false);
    API.gethoteldos(marshaCode, hotelName, hotelrfpid, period, seasonId).then(
      (res) => {
        if (res?.salesDepth?.salesdepth_en_ranges?.length > 0) {
          setDepthOfSalesDataAPI(true);
          if (res?.salesDepth?.salesdepth_en_ranges[0]?.volrmax === 999999) {
            setFirstMaxRowPlus(true);
          }
        } else {
          setFirstMaxRowPlus(false);
        }
        if (res?.salesDepth?.salesdepth_ranges?.length > 0) {
          if (res?.salesDepth?.salesdepth_ranges[0]?.volrmax === 999999) {
            setFirstMaxRowPlusStandard(true);
          }
        } else {
          setFirstMaxRowPlusStandard(false);
        }
        setMaxDOSFromAPI(res.maxDOS);
        setInitialEnSalesDepthRangeData(res);
        setDepthData(res);
        setEnVolrmaxChange(false);
      }
    );
  };

  const UpdateDepthOfSales = (state, periodFromUrl, salesDepthData) => {
    state.currentSeason = currentSeasonAPI;
    API.updateHotelRFPDepthOfSalesEnhanced(state, periodFromUrl, salesDepthData)
      .then((data) => {
        parentContext.setCompletionState({
          ...parentContext.completionState,
          DepthOfSales: "Y",
        });
      })
      .catch((error) => {});
  };

  const handleChange = (e, i) => {
    setOnChangeTrigger(true);
    if (e.target.value == "") {
      appContext.setDOSAlert(true);
    } else {
      appContext.setDOSAlert(false);
    }
    const { id, value } = e.target;
    const salesDepthData = { ...state.depthOfSales.salesDepth };

    if (id.split(".")[2] === Settings.depthOfSales.volrmax) {
      salesDepthData.salesdepth_ranges[i].volrmax =
        i === maxDOSFromAPI - 1 ? "+" : value;
    }
    if (id.split(".")[2] === Settings.depthOfSales.ratermin) {
      salesDepthData.salesdepth_ranges[i].ratermin = value;
    }
    if (id.split(".")[2] === Settings.depthOfSales.ratermax) {
      salesDepthData.salesdepth_ranges[i].ratermax = value;
    }
    setState({
      ...state,
      depthOfSales: { ...state.depthOfSales, salesDepth: salesDepthData },
    });
    validation_check_standard();
  };

  const onChangeEnhancedHandler = (e, i) => {
    const salesDepthData = { ...state.depthOfSales.salesDepth };
    setOnChangeEnTrigger(true);
    setControlLoop(false);
    if (e.target.value == "") {
      appContext.setDOSAlert(true);
    } else {
      appContext.setDOSAlert(false);
    }
    const id = e.target.id;
    const value = e.target.value;
    const selectedId = e.target.id;
    const rateIndex = parseFloat(
      selectedId.substring(
        selectedId.lastIndexOf("[") + 1,
        selectedId.lastIndexOf("]")
      )
    );
    const ranges = [];
    state.depthOfSales.salesDepth.salesdepth_en_ranges.forEach((data) => {
      const rates = [];
      data.salesdepth_en_rates.forEach((dataVal) => {
        rates.push({ ...dataVal });
      });
      const dataObj = { ...data };
      dataObj.salesdepth_en_rates = [...rates];
      ranges.push({ ...dataObj });
    });
    salesDepthData.salesdepth_en_ranges = [...ranges];

    if (id.split(".")[2] === Settings.depthOfSales.volrmax) {
      salesDepthData.salesdepth_en_ranges[i].volrmax =
        i === maxDOSFromAPI - 1 ? "+" : value;
    }
    if (id.split(".")[3] === Settings.depthOfSales.ratemin && rateIndex === 0) {
      salesDepthData.salesdepth_en_ranges[
        `${i}`
      ].salesdepth_en_rates[0].ratemin = value;
    }
    if (id.split(".")[3] === Settings.depthOfSales.ratemax && rateIndex === 0) {
      salesDepthData.salesdepth_en_ranges[
        `${i}`
      ].salesdepth_en_rates[0].ratemax = value;
    }
    if (id.split(".")[3] === Settings.depthOfSales.ratemin && rateIndex === 1) {
      salesDepthData.salesdepth_en_ranges[
        `${i}`
      ].salesdepth_en_rates[1].ratemin = value;
    }
    if (id.split(".")[3] === Settings.depthOfSales.ratemax && rateIndex === 1) {
      salesDepthData.salesdepth_en_ranges[
        `${i}`
      ].salesdepth_en_rates[1].ratemax = value;
    }
    if (id.split(".")[3] === Settings.depthOfSales.ratemin && rateIndex === 2) {
      salesDepthData.salesdepth_en_ranges[
        `${i}`
      ].salesdepth_en_rates[2].ratemin = parseInt(value);
    }
    if (id.split(".")[3] === Settings.depthOfSales.ratemax && rateIndex === 2) {
      salesDepthData.salesdepth_en_ranges[
        `${i}`
      ].salesdepth_en_rates[2].ratemax = value;
    }
    if (id.split(".")[3] === Settings.depthOfSales.ratemin && rateIndex === 3) {
      const obj =
        salesDepthData.salesdepth_en_ranges[`${i}`].salesdepth_en_rates[3]
          .ratemin;
      salesDepthData.salesdepth_en_ranges[
        `${i}`
      ].salesdepth_en_rates[3].ratemin = parseInt(value);
    }
    if (id.split(".")[3] === Settings.depthOfSales.ratemax && rateIndex === 3) {
      salesDepthData.salesdepth_en_ranges[
        `${i}`
      ].salesdepth_en_rates[3].ratemax = parseInt(value);
    }
    setState({
      ...state,
      depthOfSales: { ...state.depthOfSales, salesDepth: salesDepthData },
    });
    validation_check("normal");
  };

  const text_onclick = (e, max_len) => {
    const val = e.target.value;

    state.formChg = "Y";

    if (e.target.id === Settings.depthOfSales.bt_price_strategy) {
      setState({
        ...state,
        depthOfSales: {
          ...state.depthOfSales,
          salesDepth: {
            ...state.depthOfSales.salesDepth,
            bt_price_strategy: val,
          },
        },
      });
    } else {
      const selectedId = e.target.id;
      const index = parseFloat(
        selectedId.substring(
          selectedId.indexOf("[") + 1,
          selectedId.lastIndexOf("]")
        )
      );

      setState((prevState) => {
        prevState.depthOfSales.salesDepth.salesdepth_ranges[index].comments =
          e.target.value;
        return { ...prevState };
      });
    }

    return true;
  };

  const text_onBlur = (e, max_len) => {
    let val = e.target.value;

    state.formChg = "Y";
    if (val.length > max_len) {
      alert("You are allowed to enter up to " + max_len + " characters.");
      val = val.substr(0, max_len - 1);
    }

    if (e.target.id === Settings.depthOfSales.bt_price_strategy) {
      setState({
        ...state,
        depthOfSales: {
          ...state.depthOfSales,
          salesDepth: {
            ...state.depthOfSales.salesDepth,
            bt_price_strategy: val,
          },
        },
      });
    } else {
      const selectedId = e.target.id;
      const index = parseFloat(
        selectedId.substring(
          selectedId.indexOf("[") + 1,
          selectedId.lastIndexOf("]")
        )
      );

      setState((prevState) => {
        prevState.depthOfSales.salesDepth.salesdepth_ranges[index].comments =
          val;
        return { ...prevState };
      });
    }

    return true;
  };
  const textEnhanced_onclick = (e, max_len) => {
    const val = e.target.value;

    state.formChg = "Y";

    if (e.target.id === Settings.depthOfSales.bt_price_strategy) {
      setState({
        ...state,
        depthOfSales: {
          ...state.depthOfSales,
          salesDepth: {
            ...state.depthOfSales.salesDepth,
            bt_price_strategy: val,
          },
        },
      });
    } else {
      const salesDepthData = { ...state.depthOfSales.salesDepth };
      const selectedId = e.target.id;
      const index = parseFloat(
        selectedId.substring(
          selectedId.indexOf("[") + 1,
          selectedId.lastIndexOf("]")
        )
      );
      salesDepthData.salesdepth_en_ranges[index].comments = val.replaceAll(
        " ",
        "+"
      );

      setState({
        ...state,
        depthOfSales: { ...state.depthOfSales, salesDepth: salesDepthData },
      });
    }

    return true;
  };

  const textEnhanced_onblur = (e, max_len) => {
    let val = e.target.value;

    state.formChg = "Y";
    if (val.length > max_len) {
      alert("You are allowed to enter up to " + max_len + " characters.");
      val = val.substr(0, max_len - 1);
    }

    if (e.target.id === Settings.depthOfSales.bt_price_strategy) {
      setState({
        ...state,
        depthOfSales: {
          ...state.depthOfSales,
          salesDepth: {
            ...state.depthOfSales.salesDepth,
            bt_price_strategy: val,
          },
        },
      });
    } else {
      const salesDepthData = { ...state.depthOfSales.salesDepth };
      const selectedId = e.target.id;
      const index = parseFloat(
        selectedId.substring(
          selectedId.indexOf("[") + 1,
          selectedId.lastIndexOf("]")
        )
      );
      salesDepthData.salesdepth_en_ranges[index].comments = val.replaceAll(
        " ",
        "+"
      );

      setState({
        ...state,
        depthOfSales: { ...state.depthOfSales, salesDepth: salesDepthData },
      });
    }

    return true;
  };

  const btAcctStrategy_popup = () => {
    setState({ ...state, showModal: !state.showModal });
  };

  const hasChanged = () => {
    let bChg;
    let volrmin;
    let volrmax;
    let strRatermin;
    let strRatermax;
    let objMin;
    let objMinVal;
    let objMax;
    let objMaxVal;
    let objratermin;
    let objraterminVal;
    let objratermax;
    let objratermaxVal;
    bChg = false;
    let objMax1;
    let objMax1Val;
    const maxRows = maxDOSFromAPI !== null ? maxDOSFromAPI : 6;
    for (let iRow = 2; iRow < maxRows; iRow++) {
      objMin = document.getElementById(
        "salesDepth.salesdepth_ranges[" + iRow + "].volrmin"
      );
      objMinVal = state.depthOfSales.salesDepth.salesdepth_ranges[iRow].volrmin;
      objMax = document.getElementById(
        "salesDepth.salesdepth_ranges[" + iRow + "].volrmax"
      );
      objMaxVal = state.depthOfSales.salesDepth.salesdepth_ranges[iRow].volrmax;
      objratermin = document.getElementById(
        "salesDepth.salesdepth_ranges[" + iRow + "].ratemin"
      );
      objraterminVal =
        state.depthOfSales.salesDepth.salesdepth_ranges[iRow].ratermin;
      objratermax = document.getElementById(
        "salesDepth.salesdepth_ranges[" + iRow + "].ratemax"
      );
      objratermaxVal =
        state.depthOfSales.salesDepth.salesdepth_ranges[iRow].ratermax;
      if (!bChg) {
        if (objMinVal !== "") {
          if (objMaxVal === "") {
            bChg = true;
            objMax.select();
          } else if (objraterminVal === "" && !objratermin.readOnly) {
            bChg = true;
            objratermin.select();
          } else if (objratermaxVal === "" && !objratermax.readOnly) {
            bChg = true;
            objratermax.select();
          }
        }
      }
    }
    if (!bChg) {
      objMax1 = document.getElementById(
        "salesDepth.salesdepth_ranges[0].volrmax"
      );
      objMax1Val = state.depthOfSales.salesDepth.salesdepth_ranges[0].volrmax;
      if (objMax1Val === "") {
        objMax1.select();
        bChg = true;
      }
    }
    return bChg;
  };
  const pad_with_zeros = (rounded_value, decimal_places) => {
    let value_string = rounded_value.toString();
    const decimal_location = value_string.indexOf(".");
    let decimal_part_length = 0;
    if (decimal_location == -1) {
      decimal_part_length = 0;
      value_string += decimal_places > 0 ? "." : "";
    } else {
      decimal_part_length = value_string.length - decimal_location - 1;
    }
    const pad_total = decimal_places - decimal_part_length;
    if (pad_total > 0) {
      for (let counter = 1; counter <= pad_total; counter++)
        value_string += "0";
    }
    return value_string;
  };

  const update_rate = (current, maxRows, iRow, colKey) => {
    let iCheck = true;
    const minNumber = 10;

    const maxNumber = 99999999;
    const salesDepthData = { ...state.depthOfSales.salesDepth };
    const objraterminPrev = document.getElementById(
      `salesDepth.salesdepth_ranges${parseFloat(iRow) - 1}.ratemin`
    );
    const objraterminPrevVal =
      salesDepthData.salesdepth_ranges[iRow - 1].ratermin;
    const objratermaxPrev = document.getElementById(
      `salesDepth.salesdepth_ranges${parseFloat(iRow) - 1}.ratemax`
    );
    const objratermaxPrevVal =
      salesDepthData.salesdepth_ranges[iRow - 1].ratermax;
    const objratermin = document.getElementById(
      `salesDepth.salesdepth_ranges${parseFloat(iRow)}.ratemin`
    );
    let objraterminVal = salesDepthData.salesdepth_ranges[iRow].ratermin;
    const objratermax = document.getElementById(
      `salesDepth.salesdepth_ranges${parseFloat(iRow)}.ratemax`
    );
    let objratermaxVal = salesDepthData.salesdepth_ranges[iRow].ratermax;
    const objvolrmax = document.getElementById(
      `salesDepth.salesdepth_ranges[${parseFloat(iRow)}].volrmax`
    );

    if (
      objraterminVal !== null &&
      objraterminVal !== "" &&
      objraterminVal !== " "
    ) {
      objraterminVal = pad_with_zeros(objraterminVal, 2);
    }

    if (
      objratermaxVal !== null &&
      objratermaxVal !== "" &&
      objratermaxVal !== " "
    ) {
      objratermaxVal = pad_with_zeros(objratermaxVal, 2);
    }
    if (
      objraterminVal !== null &&
      objraterminVal !== "" &&
      objraterminVal !== " "
    ) {
      if (!Utils.isValidRange(objraterminVal, minNumber, maxNumber)) {
        alert(
          "You must enter a value between " +
            minNumber +
            " and " +
            maxNumber +
            " for Rate Range Min. on row " +
            parseFloat(iRow + 1) +
            "."
        );
        objraterminVal = "";
        //objratermin.focus();
        salesDepthData.salesdepth_ranges[iRow].ratermin = objraterminVal;
        // objratermin.select();
        iCheck = false;
        if (iRow !== 1) {
          parentContext.setAlertData(
            true,
            "You must enter a value between " +
              minNumber +
              " and " +
              maxNumber +
              " for Rate Range Min. on row " +
              parseFloat(iRow + 1) +
              "."
          );
        }
        return false;
      }
    }
    if (
      objratermaxVal !== null &&
      objratermaxVal !== "" &&
      objratermaxVal !== " "
    ) {
      if (!Utils.isValidRange(objratermaxVal, minNumber, maxNumber)) {
        alert(
          "You must enter a value between " +
            minNumber +
            " and " +
            maxNumber +
            " forRate Range Max. on row " +
            parseFloat(iRow + 1) +
            "."
        );
        objratermaxVal = "";
        //objratermax.focus();
        salesDepthData.salesdepth_ranges[iRow].ratermax = objratermaxVal;
        //  objratermax.select();
        iCheck = false;
        if (iRow !== 1) {
          parentContext.setAlertData(
            true,
            "You must enter a value between " +
              minNumber +
              " and " +
              maxNumber +
              " forRate Range Max. on row " +
              parseFloat(iRow + 1) +
              "."
          );
        }
        return false;
      }
    }
    if (1 < parseFloat(iRow) && parseFloat(iRow) <= parseFloat(maxRows)) {
      if (colKey === "c") {
        if (iCheck) {
          if (current >= iRow) {
            if (objraterminVal === "") {
              alert(
                "Rate Range Min. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              //objratermin.focus();
              // objratermin.select();
              iCheck = false;
              if (iRow !== 1) {
                parentContext.setAlertData(
                  true,
                  "Rate Range Min. on row " +
                    parseFloat(iRow + 1) +
                    " must be filled prior to continuing."
                );
              }
              return false;
            }
          }
        }
        if (iCheck) {
          if (current >= iRow) {
            if (objratermaxVal === "") {
              alert(
                "Rate Range Max. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              //objratermax.focus();
              //  objratermax.select();
              iCheck = false;
              if (iRow !== 1) {
                parentContext.setAlertData(
                  true,
                  "Rate Range Max. on row " +
                    parseFloat(iRow + 1) +
                    " must be filled prior to continuing."
                );
              }
              return false;
            }
          }
        }
      }

      if (iCheck) {
        if (objraterminVal.indexOf(".") >= 0) {
          if (objraterminVal.length - objraterminVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            objratermin.focus();
            //    objratermin.select();
            iCheck = false;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Please enter no more than 2 decimal positions"
              );
            }
            return false;
          }
        }
      }

      if (iCheck) {
        if (objratermaxVal.indexOf(".") >= 0) {
          if (objratermaxVal.length - objratermaxVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            iCheck = false;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Please enter no more than 2 decimal positions"
              );
            }
            return false;
          }
        }
      }

      if (iCheck) {
        if (
          objraterminVal !== "" &&
          (objraterminPrevVal === "" || objratermaxPrevVal === "")
        ) {
          if (objraterminPrevVal == "") {
            alert(
              "Please enter values for Rate Range Min. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            setControlLoop(true);
            objraterminVal = "";
            salesDepthData.salesdepth_ranges[iRow].ratermin = objraterminVal;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Please enter values for Rate Range Min. on row " +
                  parseFloat(iRow) +
                  " prior to continuing."
              );
            }
          } else {
            alert(
              "Please enter values for Rate Range Max. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            objraterminVal = "";
            salesDepthData.salesdepth_ranges[iRow].ratermin = objraterminVal;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Please enter values for Rate Range Max. on row " +
                  parseFloat(iRow) +
                  " prior to continuing."
              );
            }
          }
          iCheck = false;
          return false;
        }
      }
      if (iCheck) {
        if (
          objratermaxVal !== "" &&
          (objraterminPrevVal === "" || objratermaxPrevVal === "")
        ) {
          if (objraterminPrevVal === "") {
            alert(
              "Please enter values for Rate Range Min. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            setControlLoop(true);
            objratermaxVal = "";
            salesDepthData.salesdepth_ranges[iRow].ratermax = objratermaxVal;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Please enter values for Rate Range Min. on row " +
                  parseFloat(iRow) +
                  " prior to continuing."
              );
            }
          } else {
            alert(
              "Please enter values for Rate Range Max. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            objratermaxVal = "";
            salesDepthData.salesdepth_ranges[iRow].ratermax = objratermaxVal;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Please enter values for Rate Range Max. on row " +
                  parseFloat(iRow) +
                  " prior to continuing."
              );
            }
          }
          iCheck = false;
          return false;
        }
      }
      if (iCheck) {
        if (parseFloat(objraterminVal) >= parseFloat(objratermaxVal)) {
          if (colKey === "a") {
            alert(
              "Rate Range Min. on row " +
                parseFloat(iRow + 1) +
                "  must be less than Rate Range Max."
            );
            objraterminVal = "";
            salesDepthData.salesdepth_ranges[iRow].ratermin = objraterminVal;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Rate Range Min. on row " +
                  parseFloat(iRow + 1) +
                  "  must be less than Rate Range Max."
              );
            }
          } else {
            alert(
              "Rate Range Max. on row " +
                parseFloat(iRow + 1) +
                " must be greater than Rate Range Min."
            );
            objratermaxVal = "";
            salesDepthData.salesdepth_ranges[iRow].ratermax = objratermaxVal;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Rate Range Max. on row " +
                  parseFloat(iRow + 1) +
                  " must be greater than Rate Range Min."
              );
            }
          }
          iCheck = false;
          return false;
        }
      }
      if (iCheck) {
        if (parseFloat(objraterminVal) >= parseFloat(objraterminPrevVal)) {
          alert(
            "Rate Range Min. on row " +
              parseFloat(iRow + 1) +
              " must be less than Rate Range Min. on row " +
              parseFloat(iRow) +
              " "
          );
          objraterminVal = "";
          salesDepthData.salesdepth_ranges[iRow].ratermin = objraterminVal;
          if (iRow !== 1) {
            parentContext.setAlertData(
              true,
              "Rate Range Min. on row " +
                parseFloat(iRow + 1) +
                " must be less than Rate Range Min. on row " +
                parseFloat(iRow) +
                " "
            );
          }
          iCheck = false;
          return false;
        }
      }
      if (iCheck) {
        if (parseFloat(objratermaxVal) >= parseFloat(objratermaxPrevVal)) {
          alert(
            "Rate Range Max. on row " +
              parseFloat(iRow + 1) +
              " must be less than Rate Range Max. on row " +
              parseFloat(iRow) +
              " "
          );
          objratermaxVal = "";
          salesDepthData.salesdepth_ranges[iRow].ratermax = objratermaxVal;
          if (iRow !== 1) {
            parentContext.setAlertData(
              true,
              "Rate Range Max. on row " +
                parseFloat(iRow + 1) +
                " must be less than Rate Range Max. on row " +
                parseFloat(iRow) +
                " "
            );
          }
          iCheck = false;
          return false;
        }
      }
    } else if (parseFloat(iRow) === 1) {
      if (colKey === "c") {
        if (iCheck) {
          if (current >= iRow) {
            if (objraterminVal === "") {
              alert(
                "Rate Range Min. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              if (iRow !== 1) {
                parentContext.setAlertData(
                  true,
                  "Rate Range Min. on row " +
                    parseFloat(iRow + 1) +
                    " must be filled prior to continuing."
                );
              }
              iCheck = false;
              return false;
            }
          }
        }

        if (iCheck) {
          if (current >= iRow) {
            if (objratermaxVal === "") {
              alert(
                "Rate Range Max. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              if (iRow !== 1) {
                parentContext.setAlertData(
                  true,
                  "Rate Range Max. on row " +
                    parseFloat(iRow + 1) +
                    " must be filled prior to continuing."
                );
              }
              iCheck = false;
              return false;
            }
          }
        }
      }

      if (iCheck) {
        if (objraterminVal.indexOf(".") >= 0) {
          if (objraterminVal.length - objraterminVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Please enter no more than 2 decimal positions"
              );
            }
            iCheck = false;
            return false;
          }
        }
      }
      if (iCheck) {
        if (objratermaxVal.indexOf(".") >= 0) {
          if (objratermaxVal.length - objratermaxVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Please enter no more than 2 decimal positions"
              );
            }
            iCheck = false;
            return false;
          }
        }
      }

      if (iCheck) {
        if (parseFloat(objraterminVal) >= parseFloat(objratermaxVal)) {
          if (colKey == "a") {
            alert(
              "Rate Range Min. on row " +
                parseFloat(iRow + 1) +
                "  must be less than Rate Range Max."
            );
            objraterminVal = "";
            salesDepthData.salesdepth_ranges[iRow].ratermin = objraterminVal;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Rate Range Min. on row " +
                  parseFloat(iRow + 1) +
                  "  must be less than Rate Range Max."
              );
            }
          } else {
            alert(
              "Rate Range Max. on row " +
                parseFloat(iRow + 1) +
                " must be greater than Rate Range Min."
            );
            objratermaxVal = "";
            salesDepthData.salesdepth_ranges[iRow].ratermax = objratermaxVal;
            if (iRow !== 1) {
              parentContext.setAlertData(
                true,
                "Rate Range Max. on row " +
                  parseFloat(iRow + 1) +
                  " must be greater than Rate Range Min."
              );
            }
          }
          iCheck = false;
          return false;
        }
      }
    }
    const salesDepthWithDecimalRates =
      convertDepthRangesToDecimal(salesDepthData);
    setState({
      ...state,
      depthOfSales: {
        ...state.depthOfSales,
        salesDepth: salesDepthWithDecimalRates,
      },
    });
    parentContext.setAlertData(false, "");
    if (iCheck == true) {
      setStandardcontrolLoop(false);
    } else if (iCheck == false) {
      setStandardcontrolLoop(true);
    }
    return iCheck;
  };

  const iLockRow = (current) => {
    const salesDepthData = { ...state.depthOfSales.salesDepth };

    const iiRow = current + 1;
    const selectedRowData = salesDepthData.salesdepth_ranges[iiRow];

    selectedRowData.volrmin = "";
    selectedRowData.volrmax = "";
    selectedRowData.readOnly = true;
    selectedRowData.ratermin = "";
    selectedRowData.ratermax = "";
    selectedRowData.comments = "";
    state.depthOfSales.salesDepth.salesdepth_ranges[iiRow] = {
      ...selectedRowData,
    };
    validation_check_standard();
    setState({ ...state });
  };

  function iUnlockRow(current) {
    const salesDepthData = { ...state.depthOfSales.salesDepth };

    const iiRow = current + 1;
    const selectedRowData = salesDepthData.salesdepth_ranges[iiRow];
    selectedRowData.readOnly = false;
    selectedRowData.volrmax = "+";
    state.depthOfSales.salesDepth.salesdepth_ranges[iiRow] = {
      ...selectedRowData,
    };
    setState({ ...state });
  }

  const update_vol = (current, colKey) => {
    setOnChangeTrigger(false);
    const salesDepthData = { ...state.depthOfSales.salesDepth };
    let iReturn = true;
    const iCheck = true;
    const iLock = false;
    const iUnlock = true;
    const maxRows = maxDOSFromAPI !== null ? maxDOSFromAPI : 6;
    const maxInfinityNum = 999999;
    const maxInfinity = "+";
    let objMin;
    let objMinVal;
    let objMax;
    let objMaxVal;
    let objMinCurrent;
    let objMinCurrentVal;
    let objMinNext;
    let objMinNextVal;
    let objMaxNext;
    let objMaxNextVal;
    let objNextFocus;
    let objNextFocusVal;
    let objMaxPrev;
    let objMaxPrevVal;
    let iCheck_return;

    for (let iRow = 0; iRow < maxRows; iRow++) {
      objMin = document.getElementById(
        "salesDepth.salesdepth_ranges[" + iRow + "].volrmin"
      );
      objMinVal = salesDepthData.salesdepth_ranges[iRow].volrmin;
      objMax = document.getElementById(
        "salesDepth.salesdepth_ranges[" + iRow + "].volrmax"
      );
      objMaxVal = salesDepthData.salesdepth_ranges[iRow].volrmax;
      if (objMinVal !== "") {
        if (iReturn) {
          objMinCurrent = document.getElementById(
            "salesDepth.salesdepth_ranges[" + current + "].volrmin"
          );
          objMinCurrentVal = salesDepthData.salesdepth_ranges[current].volrmin;
          if (
            iRow !== 0 &&
            (colKey === "c" || colKey === "a" || colKey === "b")
          ) {
            if (current === maxRows - 1) {
              if (standardcontrolLoop !== true) {
                iCheck_return = update_rate(maxRows, maxRows, iRow, colKey);
              }
              if (iCheck_return == false) {
                break;
              }
              current -= 0;
            } else {
              if (standardcontrolLoop !== true) {
                iCheck_return = update_rate(current, maxRows, iRow, colKey);
              }
              if (iCheck_return == false) {
                break;
              }
            }
            iReturn = iCheck;
          } else {
            if (current === maxRows - 1) {
              current -= 0;
            }
          }
        }

        if (iRow === 0) {
          objMinNext = document.getElementById(
            "salesDepth.salesdepth_ranges[" + iRow + 1 + "].volrmin"
          );
          objMinNextVal = salesDepthData.salesdepth_ranges[iRow + 1].volrmin;
          objMaxNext = document.getElementById(
            "salesDepth.salesdepth_ranges[" + iRow + 1 + "].volrmax"
          );
          objMaxNextVal = salesDepthData.salesdepth_ranges[iRow + 1].volrmax;
          objNextFocus = document.getElementById(
            "salesDepth.salesdepth_ranges[1].volrmax"
          );

          objNextFocusVal = salesDepthData.salesdepth_ranges[1].volrmax;
          if (parseFloat(objMinVal) !== 0) {
            objMinVal = 0;
            salesDepthData.salesdepth_ranges[iRow].volrmin = objMinVal;
          }
          if (objMaxVal === "") {
            if (objMinNextVal !== "") {
              if (
                parseFloat(objMaxVal) === parseFloat(objMinNextVal) ||
                parseFloat(objMaxVal) + 1 != parseFloat(objMinNextVal)
              ) {
                objMax.select();
                if (
                  confirm(
                    "This value will affect the rows below. Do you wish to continue?"
                  )
                ) {
                  objMinNextVal = parseInt(objMaxVal) + 1;
                  salesDepthData.salesdepth_ranges[iRow + 1].volrmin =
                    objMinNextVal;
                  objMaxNextVal = maxInfinity;
                  salesDepthData.salesdepth_ranges[iRow + 1].volrmax =
                    objMaxNextVal;
                  if (colKey === "d") {
                    iUnlockRow(current);
                  }
                } else {
                  objMaxVal = parseInt(objMinNextVal) - 1;
                  salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
                  objMax.select();
                  iReturn = false;
                }
              } else {
                objMinNextVal = parseInt(objMaxVal) + 1;
                salesDepthData.salesdepth_ranges[iRow + 1].volrmin =
                  objMinNextVal;
              }
            } else {
              objMaxVal = maxInfinity;
              salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
            }
          }
          if (iReturn) {
            if (objMinNextVal !== "") {
              if (
                objMaxVal === maxInfinity ||
                parseFloat(objMaxVal) === maxInfinityNum ||
                parseFloat(objMaxVal) === parseFloat(objMinNextVal) ||
                parseFloat(objMaxVal) + 1 !== parseFloat(objMinNextVal)
              ) {
                if (
                  objMaxVal === maxInfinity ||
                  parseFloat(objMaxVal) === maxInfinityNum ||
                  parseFloat(objMaxVal) + 1 >= parseFloat(objMaxNextVal)
                ) {
                  objMax.select();
                  if (
                    confirm(
                      "This value will affect the rows below. Do you wish to continue?"
                    )
                  ) {
                    objMinNextVal = parseInt(objMaxVal) + 1;
                    salesDepthData.salesdepth_ranges[iRow + 1].volrmin =
                      objMinNextVal;
                    objNextFocus = document.getElementById(
                      "salesDepth.salesdepth_ranges[0].volrmax"
                    );
                    objNextFocusVal =
                      state.depthOfSales.salesDepth.salesdepth_ranges[0]
                        .volrmax;
                    objMax.select();
                  } else {
                    objMaxVal = parseInt(objMinNextVal) - 1;
                    salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
                    objMax.select();
                    iReturn = false;
                  }
                } else {
                  objMinNextVal = parseInt(objMaxVal) + 1;
                  salesDepthData.salesdepth_ranges[iRow + 1].volrmin =
                    objMinNextVal;
                }
              }
            } else {
              if (
                objMaxVal !== maxInfinity &&
                parseFloat(objMaxVal) !== maxInfinityNum
              ) {
                objMinNextVal = parseInt(objMaxVal) + 1;
                salesDepthData.salesdepth_ranges[iRow + 1].volrmin =
                  objMinNextVal;
                objMaxNextVal = maxInfinity;
                salesDepthData.salesdepth_ranges[iRow + 1].volrmax =
                  objMaxNextVal;
                if (colKey === "d") {
                  iUnlockRow(current);
                }
              }
            }
          }
          if (
            objMaxVal === "" ||
            objMaxVal === maxInfinity ||
            parseFloat(objMaxVal) === maxInfinityNum
          ) {
            objMaxVal = maxInfinity;
            objMinNextVal = "";
            objMaxNextVal = "";
            salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
            salesDepthData.salesdepth_ranges[iRow + 1].volrmin = objMinNextVal;
            salesDepthData.salesdepth_ranges[iRow + 1].volrmax = objMaxNextVal;
            iLockRow(current);
          }
          //				if (iReturn && colKey == "d"){
          //					obj_onfocus(objNextFocus);
          //				}
        } else if (iRow === maxRows - 1) {
          objMin = document.getElementById(
            "salesDepth.salesdepth_ranges[" + iRow + "].volrmin"
          );
          objMinVal = salesDepthData.salesdepth_ranges[iRow].volrmin;
          objMax = document.getElementById(
            "salesDepth.salesdepth_ranges[" + iRow + "].volrmax"
          );
          objMaxVal = salesDepthData.salesdepth_ranges[iRow].volrmax;
          salesDepthData.salesdepth_ranges[iRow].tabIndex = "-1";
          objMax.tabIndex = "-1";
          objMax.style.backgroundColor = "silver";
          objMax.onKeyPress = "";
          objMax.onChange = "";
          objMax.onFocus = "";
          objMax.readOnly = true;
          //salesDepthData.salesdepth_ranges[iRow].readOnly = true;
          if (iReturn) {
            if (objMinVal != "") {
              objMaxVal = maxInfinity;
              salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
            } else {
              objMaxVal = "";
              salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
            }
          }
        } else if (0 < iRow && iRow < maxRows - 1) {
          objMin = document.getElementById(
            "salesDepth.salesdepth_ranges[" + iRow + "].volrmin"
          );
          objMinVal = salesDepthData.salesdepth_ranges[iRow].volrmin;
          objMax = document.getElementById(
            "salesDepth.salesdepth_ranges[" + iRow + "].volrmax"
          );
          objMaxVal = salesDepthData.salesdepth_ranges[iRow].volrmax;
          objMinNext = document.getElementById(
            "salesDepth.salesdepth_ranges[" + iRow + 1 + "].volrmin"
          );
          objMinNextVal = salesDepthData.salesdepth_ranges[iRow + 1].volrmin;
          objMaxNext = document.getElementById(
            `salesDepth.salesdepth_ranges[${iRow + 1}].volrmax`
          );
          objMaxNextVal = salesDepthData.salesdepth_ranges[iRow + 1].volrmax;
          objMaxPrev = document.getElementById(
            `salesDepth.salesdepth_ranges[${iRow - 1}].volrmax`
          );
          objMaxPrevVal = salesDepthData.salesdepth_ranges[iRow - 1].volrmax;
          if (iReturn) {
            if (objMinVal === "" && objMaxVal === "") {
              iLockRow(iRow);
            } else if (objMinVal !== "" && objMaxVal === "") {
              objMaxVal = maxInfinity;
              salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
            } else if (objMinVal !== "" && objMaxVal !== "") {
              if (parseFloat(objMinVal) >= parseFloat(objMaxVal)) {
                if (iRow > current) {
                  iLockRow(iRow);
                } else {
                  objMax.select();
                  alert("This value must be greater than Volume Range Min.");
                  iReturn = false;
                  if (objMinNextVal !== "") {
                    objMaxVal = parseFloat(objMinNextVal) - 1;
                    salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
                  } else {
                    objMaxVal = maxInfinity;
                    salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
                    iLockRow(iRow);
                  }
                  objMax.select();
                }
              } else if (
                ((objMaxVal === maxInfinity ||
                  parseFloat(objMaxVal) === maxInfinityNum) &&
                  current === iRow &&
                  colKey === "d" &&
                  objMinNextVal !== "") ||
                parseFloat(objMaxVal) >= parseFloat(objMinNextVal)
              ) {
                if (
                  ((objMaxVal === maxInfinity ||
                    parseFloat(objMaxVal) === maxInfinityNum) &&
                    current === iRow &&
                    colKey === "d" &&
                    objMinNextVal !== "") ||
                  parseFloat(objMaxVal) + 1 >= parseFloat(objMaxNextVal)
                ) {
                  objMax.select();
                  if (
                    confirm(
                      "This value will affect the rows below. Do you wish to continue?"
                    )
                  ) {
                    objMinNextVal = parseInt(objMaxVal) + 1;
                    salesDepthData.salesdepth_ranges[iRow + 1].volrmin =
                      objMinNextVal;
                    if (parseFloat(objMaxVal) === maxInfinityNum) {
                      objMaxVal = maxInfinity;
                      salesDepthData.salesdepth_ranges[iRow].volrmax =
                        objMaxVal;
                    }
                    objMax.select();
                  } else {
                    objMaxVal = parseInt(objMinNextVal) - 1;
                    salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
                    objMax.select();
                    iReturn = false;
                  }
                } else {
                  objMinNextVal = parseInt(objMaxVal) + 1;
                  salesDepthData.salesdepth_ranges[iRow + 1].volrmin =
                    objMinNextVal;
                }
              } else {
                objMinNextVal = parseInt(objMaxVal) + 1;
                salesDepthData.salesdepth_ranges[iRow + 1].volrmin =
                  objMinNextVal;
                if (colKey === "d") {
                  iUnlockRow(current);
                }
              }
            }
            if (parseFloat(objMaxVal) <= parseFloat(objMinVal)) {
              objMaxVal = maxInfinity;
              salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
              iLockRow(iRow);
            }
            if (
              objMaxVal === maxInfinity ||
              parseFloat(objMaxVal) === maxInfinityNum
            ) {
              objMaxVal = maxInfinity;
              salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
              iLockRow(iRow);
            }
          } else {
            if (objMinVal === "" && objMaxVal === "") {
              iLockRow(iRow);
            }
          }
          if (
            objMaxVal === maxInfinity ||
            parseFloat(objMaxVal) === maxInfinityNum
          ) {
            objMaxVal = maxInfinity;
            salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
            iLockRow(iRow);
          }
          if (
            objMaxPrevVal === maxInfinity ||
            parseFloat(objMaxPrevVal) === maxInfinityNum
          ) {
            iReturn = false;
            objMinVal = "";
            objMaxVal = "";
            salesDepthData.salesdepth_ranges[iRow].volrmin = objMinVal;
            salesDepthData.salesdepth_ranges[iRow].volrmax = objMaxVal;
            objMaxPrev.focus();
            objMaxPrev.select();
            iLockRow(current);
          }
        }
        if (iReturn) {
          state.formChg = "Y";
        }
      } else {
        if (iRow === 0) {
          iLockRow(current);
        } else if (0 < iRow && iRow < maxRows - 1) {
          iLockRow(iRow);
        }
      }
    }
    if (iReturn !== iCheck) {
      iReturn = false;
    }
    const ranges = convertDepthRangesToDecimal(salesDepthData);
    setState({
      ...state,
      depthOfSales: { ...state.depthOfSales, salesDepth: ranges },
    });
    validation_check_standard();
    return iReturn;
  };

  const convertDepthRangesToDecimal = (selectedRow) => {
    const rates = selectedRow.salesdepth_ranges;
    const convertedRates = [];
    rates.forEach((rate) => {
      rate.ratermin = rate.ratermin ? convertToDecimal(rate.ratermin) : "";
      rate.ratermax = rate.ratermax ? convertToDecimal(rate.ratermax) : "";
      convertedRates.push(rate);
    });
    selectedRow.salesdepth_ranges = convertedRates;
    return selectedRow;
  };

  const DOS_onkeypress = (event) => {
    let charCode;
    let thefield;
    let iNumber;
    if (window.event) charCode = event.charCode;
    else if (event.which) charCode = event.which;
    if (charCode == undefined) return true;
    let bOK = true;
    bOK = NumberOnly_onkeypress(event);
    if (!bOK) {
      if (charCode === 43) {
        const re = /^[+]$/;
        iNumber = re.exec(event.target.value);
        if (iNumber != null && charCode == 43) return event.preventDefault();
      } else return event.preventDefault();
    }
    if (bOK) {
      if (charCode != 43) {
        event.target.value = event.target.value.replace("+", "");
      }
    }
    return true;
  };
  const NumberOnly_onkeypress = (e) => {
    const charCode = e.charCode ? e.charCode : null;
    if (
      !((charCode > 47 && charCode < 58) || charCode === 46 || charCode === 8)
    ) {
      return false;
    }
    if (charCode === 46) {
      const re = /[.]{1,}/;
      const iNumber = re.exec(e.target.value);
      if ([...e.target.value].filter((x) => x === ".").length > 0)
        return e.preventDefault();
      if (iNumber != null && charCode === 46) return false;
    }
    return true;
  };
  const iLockRowEnhanced = (current) => {
    const salesDepthData = { ...state.depthOfSales.salesDepth };
    const iiRow = current + 1;
    const initialList = [...state.initialEnSalesDepthRange];
    if (salesDepthData.salesdepth_en_ranges.length == 0) {
      salesDepthData.salesdepth_en_ranges = initialList;
    }
    const selectedRowData = salesDepthData.salesdepth_en_ranges[iiRow];
    if (selectedRowData !== undefined) {
      if (
        salesDepthData.salesdepth_en_ranges[current].volrmax == "" ||
        salesDepthData.salesdepth_en_ranges[current].volrmax == "+"
      ) {
        selectedRowData.salesdepth_en_rates.map((en_rates, enratesIndex) => {
          en_rates.ratemin = "";
          selectedRowData.readOnly = true;
          en_rates.ratemax = "";
        });
        selectedRowData.volrmin = "";
        selectedRowData.volrmax = "";
        selectedRowData.readOnly = true;
        selectedRowData.comments = "";
      }

      salesDepthData.salesdepth_en_ranges[iiRow] = selectedRowData;
    }
    validation_check("normal");
    setState({ ...state });
  };
  const iUnlockRowEnhanced = (current) => {
    const salesDepthData = { ...state.depthOfSales.salesDepth };
    const iiRow = current + 1;

    const selectedRowData = salesDepthData.salesdepth_en_ranges[iiRow];
    const current_rowdata = salesDepthData.salesdepth_en_ranges[current];
    if (current_rowdata.volrmax !== "") {
      selectedRowData.readOnly = false;
      if (salesDepthData.numberLOSTiers > 1) {
        selectedRowData.readOnly = false;
      }
      if (salesDepthData.numberLOSTiers > 2) {
        selectedRowData.readOnly = false;
      }

      if (salesDepthData.numberLOSTiers > 3) {
        selectedRowData.readOnly = false;
      }
      //	selectedRowData.comments = "";
      //	objComments.style.backgroundColor = "silver";
      selectedRowData.readOnly = false;
      // selectedRowData.volrmax = "+";
    }
    state.depthOfSales.salesDepth.salesdepth_en_ranges[iiRow] = selectedRowData;
    setState({ ...state });
  };

  const update_rate_los = (current, maxRows, iRow, colKey, current_los) => {
    let iCheck = true;
    const minNumber = 10;

    const maxNumber = 99999999;
    let prevCurrent_los;
    let objRateMinLOSPrev;
    let objRateMaxLOSPrev;
    let objRateMinLOSPrevVal;
    let objRateMaxLOSPrevVal;
    let objRateMinLOS1;
    let objRateMaxLOS1;
    const salesDepthData = { ...state.depthOfSales.salesDepth };
    const selectedRowData = salesDepthData.salesdepth_en_ranges[iRow];
    const prevRowData = salesDepthData.salesdepth_en_ranges[iRow - 1];
    const currentRowData = salesDepthData.salesdepth_en_ranges[current];

    const objRateMinPrev = document.getElementById(
      `salesDepth.salesdepth_en_range${
        parseFloat(iRow) - 1
      }.salesdepth_en_rates${current_los}.ratemin`
    );
    const objRateMinPrevVal =
      prevRowData.salesdepth_en_rates[`${current_los}`].ratemin;
    const objRateMaxPrev = document.getElementById(
      `salesDepth.salesdepth_en_range${
        parseFloat(iRow) - 1
      }.salesdepth_en_rates${current_los}.ratemax`
    );
    const objRateMaxPrevVal =
      prevRowData.salesdepth_en_rates[`${current_los}`].ratemax;
    let objRateMin = document.getElementById(
      `salesDepth.salesdepth_en_range${parseFloat(
        iRow
      )}.salesdepth_en_rates${current_los}.ratemin`
    );
    let objRateMinVal =
      selectedRowData.salesdepth_en_rates[`${current_los}`].ratemin;
    let objRateMax = document.getElementById(
      `salesDepth.salesdepth_en_range${parseFloat(
        iRow
      )}.salesdepth_en_rates${current_los}.ratemax`
    );
    let objRateMaxVal =
      selectedRowData.salesdepth_en_rates[`${current_los}`].ratemax;
    const objRateMinCurrent = document.getElementById(
      `salesDepth.salesdepth_en_range${parseFloat(
        current
      )}.salesdepth_en_rates${current_los}.ratemin`
    );
    let objRateMinCurrentVal =
      currentRowData.salesdepth_en_rates[`${current_los}`].ratemin;
    const objRateMaxCurrent = document.getElementById(
      `salesDepth.salesdepth_en_range${parseFloat(
        current
      )}.salesdepth_en_rates${current_los}.ratemax`
    );
    let objRateMaxCurrentVal =
      currentRowData.salesdepth_en_rates[`${current_los}`].ratemax;

    if (objRateMinVal != null && objRateMinVal != "" && objRateMinVal != " ") {
      objRateMinVal = pad_with_zeros(objRateMinVal, 2);
    }
    if (objRateMaxVal != null && objRateMaxVal != "" && objRateMaxVal != " ") {
      objRateMaxVal = pad_with_zeros(objRateMaxVal, 2);
    }
    //
    if (objRateMinVal != null && objRateMinVal != "" && objRateMinVal != " ") {
      if (!Utils.isValidRange(objRateMinVal, minNumber, maxNumber)) {
        alert(
          "You must enter a value between " +
            minNumber +
            " and " +
            maxNumber +
            " for  " +
            parseFloat(iRow + 1) +
            "."
        );
        objRateMinVal = "";
        selectedRowData.salesdepth_en_rates[`${current_los}`].ratemin = {
          ...objRateMinVal,
        };
        objRateMin.focus();
        //	objRateMin.select();
        iCheck = false;
      }
    }

    if (objRateMaxVal != null && objRateMaxVal != "" && objRateMaxVal != " ") {
      if (!Utils.isValidRange(objRateMaxVal, minNumber, maxNumber)) {
        alert(
          "You must enter a value between " +
            minNumber +
            " and " +
            maxNumber +
            " forRate Range Max. on row " +
            parseFloat(iRow + 1) +
            "."
        );
        objRateMaxVal = "";
        selectedRowData.salesdepth_en_rates[`${current_los}`].ratemax =
          objRateMaxVal;
        objRateMax.focus();
        //	objRateMax.select();
        iCheck = false;
      }
    }
    //
    if (1 < parseFloat(iRow) && parseFloat(iRow) <= parseFloat(maxRows)) {
      if (colKey === "c") {
        if (iCheck) {
          if (current >= iRow) {
            if (objRateMinVal === "") {
              alert(
                "Rate Range Min. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              objRateMin.focus();
              //	objRateMin.select();
              iCheck = false;
            }
          }
        }
        if (iCheck) {
          if (current >= iRow) {
            if (objRateMaxVal === "") {
              alert(
                "Rate Range Max. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              objRateMax.focus();
              //	objRateMax.select();
              iCheck = false;
            }
          }
        }
      }

      if (iCheck) {
        if (objRateMinVal?.indexOf(".") >= 0) {
          if (objRateMinVal.length - objRateMinVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            objRateMin.focus();
            //	objRateMin.select();
            iCheck = false;
          }
        }
      }
      //
      if (iCheck) {
        if (objRateMaxVal?.indexOf(".") >= 0) {
          if (objRateMaxVal.length - objRateMaxVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            objRateMax.focus();
            //		objRateMax.select();
            iCheck = false;
          }
        }
      }

      if (iCheck) {
        if (
          objRateMinVal != "" &&
          (objRateMinPrevVal === "" || objRateMaxPrevVal === "")
        ) {
          if (objRateMinPrevVal === "") {
            alert(
              "Please enter values for Rate Range Min. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            setControlLoop(true);
            objRateMinVal = "";
            selectedRowData.salesdepth_en_rates[`${current_los}`].ratemin =
              objRateMinVal;
            objRateMinPrev.focus();
            //	objRateMinPrev.select();
          } else {
            alert(
              "Please enter values for Rate Range Max. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            objRateMinVal = "";
            selectedRowData.salesdepth_en_rates[`${current_los}`].ratemin =
              objRateMinVal;
            objRateMaxPrev.focus();
            //			objRateMaxPrev.select();
          }
          iCheck = false;
        }
      }
      if (iCheck) {
        if (
          objRateMaxVal !== "" &&
          (objRateMinPrevVal === "" || objRateMaxPrevVal === "")
        ) {
          if (objRateMinPrevVal === "") {
            alert(
              "Please enter values for Rate Range Min. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            setControlLoop(true);
            objRateMaxVal = "";
            selectedRowData.salesdepth_en_rates[`${current_los}`].ratemax =
              objRateMaxVal;
            objRateMinPrev.focus();
            //	objRateMinPrev.select();
          } else {
            alert(
              "Please enter values for Rate Range Max. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            objRateMaxVal = "";
            selectedRowData.salesdepth_en_rates[`${current_los}`].ratemax =
              objRateMaxVal;
            objRateMaxPrev.focus();
            //	objRateMaxPrev.select();
          }
          iCheck = false;
        }
      }
      if (iCheck) {
        if (parseFloat(objRateMinVal) >= parseFloat(objRateMaxVal)) {
          if (colKey === "a") {
            alert(
              "Rate Range Min. on row " +
                parseFloat(iRow + 1) +
                "  must be less than Rate Range Max."
            );
            objRateMinVal = "";
            selectedRowData.salesdepth_en_rates[`${current_los}`].ratemin =
              objRateMinVal;
            objRateMin.focus();
            //	objRateMin.select();
          } else {
            alert(
              "Rate Range Max. on row " +
                parseFloat(iRow + 1) +
                " must be greater than Rate Range Min."
            );
            objRateMaxVal = "";
            selectedRowData.salesdepth_en_rates[`${current_los}`].ratemax =
              objRateMaxVal;
            objRateMax.focus();
            //		objRateMax.select();
          }
          iCheck = false;
        }
      }
      if (iCheck) {
        if (parseFloat(objRateMinVal) >= parseFloat(objRateMinPrevVal)) {
          alert(
            "Rate Range Min. on row " +
              parseFloat(iRow + 1) +
              " must be less than Rate Range Min. on row " +
              parseFloat(iRow) +
              " "
          );
          objRateMinVal = "";
          selectedRowData.salesdepth_en_rates[`${current_los}`].ratemin =
            objRateMinVal;
          objRateMin.focus();
          //	objRateMin.select();
          iCheck = false;
        }
      }
      if (iCheck) {
        if (parseFloat(objRateMaxVal) >= parseFloat(objRateMaxPrevVal)) {
          alert(
            "Rate Range Max. on row " +
              parseFloat(iRow + 1) +
              " must be less than Rate Range Max. on row " +
              parseFloat(iRow) +
              " "
          );
          objRateMaxVal = "";
          selectedRowData.salesdepth_en_rates[`${current_los}`].ratemax =
            objRateMaxVal;
          objRateMax.focus();
          //		objRateMax.select();
          iCheck = false;
        }
      }
      if (iCheck) {
        if (current_los === 0) {
          objRateMinLOSPrev = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemin"
          );
          objRateMinLOSPrevVal =
            currentRowData.salesdepth_en_rates[`${current_los}`].ratemin;
          objRateMaxLOSPrev = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemax"
          );
          objRateMaxLOSPrevVal =
            currentRowData.salesdepth_en_rates[`${current_los}`].ratemax;
          objRateMinLOS1 = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemin"
          );
          objRateMaxLOS1 = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemax"
          );
        } else {
          objRateMinLOS1 = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemin"
          );
          objRateMaxLOS1 = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemax"
          );
          prevCurrent_los = current_los - 1;
          objRateMinLOSPrevVal =
            currentRowData.salesdepth_en_rates[`${prevCurrent_los}`].ratemin;
          objRateMinLOSPrev = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              prevCurrent_los +
              "].ratemin"
          );
          objRateMaxLOSPrevVal =
            currentRowData.salesdepth_en_rates[`${prevCurrent_los}`].ratemax;
          objRateMaxLOSPrev = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              prevCurrent_los +
              "].ratemax"
          );
        }
        if (iCheck && objRateMinLOSPrevVal === "") {
          alert(
            "LOS Tier " +
              String.fromCharCode(65) +
              " Rate Range Min. on row " +
              current +
              " is a required field. Please enter a value for it before continuing."
          );
          setControlLoop(true);
          objRateMinCurrentVal = "";
          objRateMaxCurrentVal = "";
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemin =
            objRateMinCurrentVal;
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
            objRateMaxCurrentVal;
          objRateMinLOSPrev.focus();
          objRateMinLOSPrev.select();
          iCheck = false;
        }
        if (iCheck && objRateMaxLOSPrevVal === "") {
          alert(
            "LOS Tier " +
              String.fromCharCode(65) +
              " Rate Range Max. on row " +
              parseFloat(current + 1) +
              " is a required field. Please enter a value for it before continuing."
          );
          setControlLoop(true);
          objRateMinCurrentVal = "";
          objRateMaxCurrentVal = "";
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemin =
            objRateMinCurrentVal;
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
            objRateMaxCurrentVal;
          objRateMaxLOSPrev.focus();
          objRateMaxLOSPrev.select();
          iCheck = false;
        }
        if (iCheck && objRateMinCurrentVal === "") {
          alert(
            "LOS Tier " +
              String.fromCharCode(65 + current_los) +
              " Rate Range Min. on row " +
              parseFloat(current + 1) +
              " is a required field. Please enter a value for it before continuing."
          );
          setControlLoop(true);
          objRateMinCurrentVal = "";
          objRateMaxCurrentVal = "";
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemin =
            objRateMinCurrentVal;
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
            objRateMaxCurrentVal;
          objRateMinCurrent.focus();
          //	objRateMinCurrent.select();
          iCheck = false;
        }
        if (
          iCheck &&
          parseFloat(objRateMinCurrentVal) > parseFloat(objRateMinLOSPrevVal)
        ) {
          alert(
            "LOS Tier " +
              String.fromCharCode(65 + current_los) +
              " Rate Range Min. on row " +
              parseFloat(current + 1) +
              " \nmust be less than or equal to \nLOS Tier " +
              String.fromCharCode(65 + current_los - 1) +
              " Rate Range Min. on row " +
              parseFloat(current + 1) +
              "."
          );
          setControlLoop(true);
          objRateMinCurrentVal = "";
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemin =
            objRateMinCurrentVal;
          objRateMinCurrent.focus();
          //		objRateMinCurrent.select();
          iCheck = false;
        }
        if (iCheck && objRateMaxCurrentVal !== "") {
          if (
            iCheck &&
            parseFloat(objRateMaxCurrentVal) > parseFloat(objRateMaxLOSPrevVal)
          ) {
            alert(
              "LOS Tier " +
                String.fromCharCode(65 + current_los) +
                " Rate Range Max. on row " +
                parseFloat(current + 1) +
                " \nmust be less than or equal to \nLOS Tier " +
                String.fromCharCode(65 + current_los - 1) +
                " Rate Range Max. on row " +
                parseFloat(current + 1) +
                "."
            );
            setControlLoop(true);
            objRateMaxCurrentVal = "";
            currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
              objRateMaxCurrentVal;
            objRateMaxCurrent.focus();
            //	objRateMaxCurrent.select();
            iCheck = false;
          }
          if (
            iCheck &&
            parseFloat(objRateMaxCurrentVal) < parseFloat(objRateMinCurrentVal)
          ) {
            alert(
              "LOS Tier " +
                String.fromCharCode(65 + current_los) +
                " Rate Range Max. on row " +
                parseFloat(current + 1) +
                " \nmust be less than or equal to \nLOS Tier " +
                String.fromCharCode(65 + current_los - 1) +
                " Rate Range Max. on row " +
                parseFloat(current + 1) +
                "."
            );
            setControlLoop(true);
            objRateMaxCurrentVal = "";
            currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
              objRateMaxCurrentVal;
            objRateMaxCurrent.focus();
            //	objRateMaxCurrent.select();
            iCheck = false;
          }
        }
      }
    } else if (parseFloat(iRow) === 1) {
      if (colKey === "c") {
        objRateMin = document.getElementById(
          "salesDepth.salesdepth_en_ranges[" +
            iRow +
            "].salesdepth_en_rates[" +
            current_los +
            "].ratemin"
        );
        objRateMinVal =
          selectedRowData.salesdepth_en_rates[`${current_los}`].ratemin;
        objRateMax = document.getElementById(
          "salesDepth.salesdepth_en_ranges[" +
            iRow +
            "].salesdepth_en_rates[" +
            current_los +
            "].ratemax"
        );
        objRateMaxVal =
          selectedRowData.salesdepth_en_rates[`${current_los}`].ratemin;
        if (iCheck) {
          if (current >= iRow) {
            if (objRateMinVal === "") {
              alert(
                "Rate Range Min. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              objRateMin.focus();
              //		objRateMin.select();
              iCheck = false;
            }
          }
        }

        if (iCheck) {
          if (current >= iRow) {
            if (objRateMaxVal === "") {
              alert(
                "Rate Range Max. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              objRateMax.focus();
              //	objRateMax.select();
              iCheck = false;
            }
          }
        }
      }

      if (iCheck) {
        if (objRateMinVal?.indexOf(".") >= 0) {
          if (objRateMinVal.length - objRateMinVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            objRateMin.focus();
            //	objRateMin.select();
            iCheck = false;
          }
        }
      }
      if (iCheck) {
        if (objRateMaxVal?.indexOf(".") >= 0) {
          if (objRateMaxVal.length - objRateMaxVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            objRateMax.focus();
            //		objRateMax.select();
            iCheck = false;
          }
        }
      }

      if (iCheck) {
        if (parseFloat(objRateMinVal) >= parseFloat(objRateMaxVal)) {
          if (colKey === "a") {
            alert(
              "Rate Range Min. on row " +
                parseFloat(iRow + 1) +
                "  must be less than Rate Range Max."
            );
            objRateMinVal = "";
            selectedRowData.salesdepth_en_rates[`${current_los}`].ratemin =
              objRateMinVal;
            objRateMin.focus();
            //	objRateMin.select();
          } else {
            alert(
              "Rate Range Max. on row " +
                parseFloat(iRow + 1) +
                " must be greater than Rate Range Min."
            );
            objRateMaxVal = "";
            selectedRowData.salesdepth_en_rates[`${current_los}`].ratemax =
              objRateMaxVal;
            objRateMax.focus();
            //	objRateMax.select();
          }
          iCheck = false;
        }
      }
      if (iCheck) {
        if (current_los === 0) {
          objRateMinLOSPrev = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemin"
          );
          objRateMinLOSPrevVal =
            currentRowData.salesdepth_en_rates[`${current_los}`].ratemin;
          objRateMaxLOSPrev = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemax"
          );
          objRateMaxLOSPrevVal =
            currentRowData.salesdepth_en_rates[`${current_los}`].ratemax;
          objRateMinLOS1 = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemin"
          );
          objRateMaxLOS1 = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemax"
          );
        } else {
          objRateMinLOS1 = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemin"
          );
          objRateMaxLOS1 = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              current_los +
              "].ratemax"
          );
          prevCurrent_los = current_los - 1;
          objRateMinLOSPrevVal =
            currentRowData.salesdepth_en_rates[`${prevCurrent_los}`].ratemin;
          objRateMinLOSPrev = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              prevCurrent_los +
              "].ratemin"
          );
          objRateMaxLOSPrevVal =
            currentRowData.salesdepth_en_rates[`${prevCurrent_los}`].ratemax;
          objRateMaxLOSPrev = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" +
              current +
              "].salesdepth_en_rates[" +
              prevCurrent_los +
              "].ratemax"
          );
        }
        if (
          iCheck &&
          objRateMinLOSPrev !== null &&
          objRateMinLOSPrevVal === ""
        ) {
          alert(
            "LOS Tier " +
              String.fromCharCode(65) +
              " Rate Range Min. on row " +
              parseFloat(current + 1) +
              " is a required field. Please enter a value for it before continuing."
          );
          setControlLoop(true);
          objRateMinCurrentVal = "";
          objRateMaxCurrentVal = "";
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemin =
            objRateMinCurrentVal;
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
            objRateMaxCurrentVal;
          objRateMinLOSPrev.focus();
          objRateMinLOSPrev.select();
          iCheck = false;
        }
        if (
          iCheck &&
          objRateMaxLOSPrev !== null &&
          objRateMaxLOSPrevVal === ""
        ) {
          alert(
            "LOS Tier " +
              String.fromCharCode(65) +
              " Rate Range Max. on row " +
              parseFloat(current + 1) +
              " is a required field. Please enter a value for it before continuing."
          );
          setControlLoop(true);
          objRateMinCurrentVal = "";
          objRateMaxCurrentVal = "";
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemin =
            objRateMinCurrentVal;
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
            objRateMaxCurrentVal;
          objRateMaxLOSPrev.focus();
          objRateMaxLOSPrev.select();
          iCheck = false;
        }
        if (iCheck && objRateMinCurrentVal === "") {
          alert(
            "LOS Tier " +
              String.fromCharCode(65 + current_los) +
              " Rate Range Min. on row " +
              parseFloat(current + 1) +
              " is a required field. Please enter a value for it before continuing."
          );
          setControlLoop(true);
          objRateMinCurrentVal = "";
          objRateMaxCurrentVal = "";
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemin =
            objRateMinCurrentVal;
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
            objRateMaxCurrentVal;
          objRateMinCurrent.focus();
          //	objRateMinCurrent.select();
          iCheck = false;
        }
        if (
          iCheck &&
          objRateMinLOSPrev != null &&
          parseFloat(objRateMinCurrentVal) > parseFloat(objRateMinLOSPrevVal)
        ) {
          alert(
            "LOS Tier " +
              String.fromCharCode(65 + current_los) +
              " Rate Range Min. on row " +
              parseFloat(current + 1) +
              " \nmust be less than or equal to \nLOS Tier " +
              String.fromCharCode(65 + current_los - 1) +
              " Rate Range Min. on row " +
              parseFloat(current + 1) +
              "."
          );
          setControlLoop(true);
          objRateMinCurrentVal = "";
          currentRowData.salesdepth_en_rates[`${current_los}`].ratemin =
            objRateMinCurrentVal;
          objRateMinCurrent.focus();
          //	objRateMinCurrent.select();
          iCheck = false;
        }
        if (iCheck && objRateMaxCurrentVal != "") {
          if (
            iCheck &&
            objRateMinLOSPrev != null &&
            parseFloat(objRateMaxCurrentVal) > parseFloat(objRateMaxLOSPrevVal)
          ) {
            alert(
              "LOS Tier " +
                String.fromCharCode(65 + current_los) +
                " Rate Range Max. on row " +
                parseFloat(current + 1) +
                " \nmust be less than or equal to \nLOS Tier " +
                String.fromCharCode(65 + current_los - 1) +
                " Rate Range Max. on row " +
                parseFloat(current + 1) +
                "."
            );
            setControlLoop(true);
            objRateMaxCurrentVal = "";
            currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
              objRateMaxCurrentVal;
            objRateMaxCurrent.focus();
            //	objRateMaxCurrent.select();
            iCheck = false;
          }
          if (
            iCheck &&
            parseFloat(objRateMaxCurrentVal) < parseFloat(objRateMinCurrentVal)
          ) {
            alert(
              "LOS Tier " +
                String.fromCharCode(65 + current_los) +
                " Rate Range Max. on row " +
                parseFloat(current + 1) +
                " \nmust be greater than or equal to \nLOS Tier " +
                String.fromCharCode(65 + current_los) +
                " Rate Range Min. on row " +
                parseFloat(current + 1) +
                "."
            );
            setControlLoop(true);
            objRateMaxCurrentVal = "";
            currentRowData.salesdepth_en_rates[`${current_los}`].ratemax =
              objRateMaxCurrentVal;
            objRateMaxCurrent.focus();
            //	objRateMaxCurrent.select();
            iCheck = false;
          }
        }
      }
    }

    salesDepthData.salesdepth_en_ranges[iRow] =
      convertEnRatesToDecimal(selectedRowData);
    salesDepthData.salesdepth_en_ranges[iRow - 1] = prevRowData;
    salesDepthData.salesdepth_en_ranges[current] = currentRowData;
    setState({
      ...state,
      depthOfSales: { ...state.depthOfSales, salesDepth: salesDepthData },
    });
    return iCheck;
  };

  const update_rateEnhanced = (current, maxRows, iRow, colKey) => {
    const minNumber = 10;

    const maxNumber = 99999999;
    let iCheck = true;
    const salesDepthData = { ...state.depthOfSales.salesDepth };
    const selectedRowData = salesDepthData.salesdepth_en_ranges[iRow];
    const prevRowData = salesDepthData.salesdepth_en_ranges[iRow - 1];
    const objRateMinPrev = document.getElementById(
      `salesDepth.salesdepth_en_ranges[${
        parseFloat(iRow) - 1
      }].salesdepth_en_rates[0].ratemin`
    );
    const objRateMinPrevVal = prevRowData.salesdepth_en_rates[0].ratemin;
    const objRateMaxPrev = document.getElementById(
      `salesDepth.salesdepth_en_ranges[${
        parseFloat(iRow) - 1
      }].salesdepth_en_rates[0].ratemax`
    );
    const objRateMaxPrevVal = prevRowData.salesdepth_en_rates[0].ratemax;
    const objRateMin = document.getElementById(
      `salesDepth.salesdepth_en_ranges[${parseFloat(
        iRow
      )}].salesdepth_en_rates[0].ratemin`
    );
    let objRateMinVal = selectedRowData.salesdepth_en_rates[0].ratemin;
    const objRateMax = document.getElementById(
      `salesDepth.salesdepth_en_ranges[${parseFloat(
        iRow
      )}].salesdepth_en_rates[0].ratemax`
    );
    let objRateMaxVal = selectedRowData.salesdepth_en_rates[0].ratemax;

    if (objRateMinVal != null && objRateMinVal != "" && objRateMinVal != " ") {
      objRateMinVal = pad_with_zeros(objRateMinVal, 2);
    }
    if (objRateMaxVal != null && objRateMaxVal != "" && objRateMaxVal != " ") {
      objRateMaxVal = pad_with_zeros(objRateMaxVal, 2);
    }

    if (objRateMinVal != null && objRateMinVal != "" && objRateMinVal != " ") {
      if (!Utils.isValidRange(objRateMinVal, minNumber, maxNumber)) {
        alert(
          "You must enter a value between " +
            minNumber +
            " and " +
            maxNumber +
            " for  " +
            iRow +
            "."
        );
        objRateMinVal = "";
        selectedRowData.salesdepth_en_rates[0].ratemin = objRateMinVal;
        objRateMin.focus();
        //	objRateMin.select();
        iCheck = false;
      }
    }

    if (objRateMaxVal != null && objRateMaxVal != "" && objRateMaxVal != " ") {
      if (!Utils.isValidRange(objRateMaxVal, minNumber, maxNumber)) {
        alert(
          "You must enter a value between " +
            minNumber +
            " and " +
            maxNumber +
            " forRate Range Max. on row " +
            iRow +
            "."
        );
        objRateMaxVal = "";
        selectedRowData.salesdepth_en_rates[0].ratemax = objRateMaxVal;
        objRateMax.focus();
        //		objRateMax.select();
        iCheck = false;
      }
    }
    if (1 < parseFloat(iRow) && parseFloat(iRow) < parseFloat(maxRows)) {
      if (colKey === "c") {
        if (iCheck) {
          if (current >= iRow) {
            if (objRateMinVal === "") {
              alert(
                " " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              objRateMin.focus();
              //		objRateMin.select();
              iCheck = false;
            }
          }
        }
        if (iCheck) {
          if (current >= iRow) {
            if (objRateMaxVal === "") {
              alert(
                "Rate Range Max. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              objRateMax.focus();
              //	objRateMax.select();
              iCheck = false;
            }
          }
        }
      }

      if (iCheck) {
        if (objRateMinVal.indexOf(".") >= 0) {
          if (objRateMinVal.length - objRateMinVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            objRateMin.focus();
            //	objRateMin.select();
            iCheck = false;
          }
        }
      }
      //
      if (iCheck) {
        if (objRateMaxVal.indexOf(".") >= 0) {
          if (objRateMaxVal.length - objRateMaxVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            objRateMax.focus();
            //	objRateMax.select();
            iCheck = false;
          }
        }
      }

      if (iCheck) {
        if (
          objRateMinVal != "" &&
          (objRateMinPrevVal === "" || objRateMaxPrevVal === "")
        ) {
          if (objRateMinPrevVal == "") {
            alert(
              "Please enter values for  " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            setControlLoop(true);
            objRateMinVal = "";
            selectedRowData.salesdepth_en_rates[0].ratemin = objRateMinVal;
            objRateMinPrev.focus();
            //	objRateMinPrev.select();
          } else {
            alert(
              "Please enter values for Rate Range Max. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            setControlLoop(true);
            objRateMinVal = "";
            selectedRowData.salesdepth_en_rates[0].ratemin = objRateMinVal;
            objRateMaxPrev.focus();
            //	objRateMaxPrev.select();
          }
          iCheck = false;
        }
      }
      if (iCheck) {
        if (
          objRateMaxVal != "" &&
          (objRateMinPrevVal === "" || objRateMaxPrevVal === "")
        ) {
          if (objRateMinPrevVal === "") {
            alert(
              "Please enter values for  " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            objRateMaxVal = "";
            selectedRowData.salesdepth_en_rates[0].ratemax = objRateMaxVal;
            objRateMinPrev.focus();
            //	objRateMinPrev.select();
          } else {
            alert(
              "Please enter values for Rate Range Max. on row " +
                parseFloat(iRow) +
                " prior to continuing."
            );
            objRateMaxVal = "";
            selectedRowData.salesdepth_en_rates[0].ratemax = objRateMaxVal;
            objRateMaxPrev.focus();
            //objRateMaxPrev.select();
          }
          iCheck = false;
        }
      }
      if (iCheck) {
        if (parseFloat(objRateMinVal) >= parseFloat(objRateMaxVal)) {
          if (colKey === "a") {
            alert(
              " " + parseFloat(iRow + 1) + "  must be less than Rate Range Max."
            );
            objRateMinVal = "";
            selectedRowData.salesdepth_en_rates[0].ratemin = objRateMinVal;
            objRateMin.focus();
            //	objRateMin.select();
          } else {
            alert(
              "Rate Range Max. on row " +
                parseFloat(iRow + 1) +
                " must be greater than Rate Range Min."
            );
            objRateMaxVal = "";
            selectedRowData.salesdepth_en_rates[0].ratemax = objRateMaxVal;
            objRateMax.focus();
            //	objRateMax.select();
          }
          iCheck = false;
        }
      }
      if (iCheck) {
        if (parseFloat(objRateMinVal) >= parseFloat(objRateMinPrevVal)) {
          alert(
            "Rate Range Min. on row " +
              parseFloat(iRow + 1) +
              " must be less than Rate Range Min. on row " +
              parseFloat(iRow) +
              " "
          );
          objRateMinVal = "";
          objRateMinVal = "";
          selectedRowData.salesdepth_en_rates[0].ratemin = objRateMinVal;
          objRateMin.focus();
          //  objRateMin.select();
          iCheck = false;
        }
      }
      if (iCheck) {
        if (parseFloat(objRateMaxVal) >= parseFloat(objRateMaxPrevVal)) {
          alert(
            "Rate Range Max. on row " +
              parseFloat(iRow + 1) +
              " must be less than Rate Range Max. on row " +
              parseFloat(iRow) +
              " "
          );
          objRateMaxVal = "";
          selectedRowData.salesdepth_en_rates[0].ratemax = objRateMaxVal;
          objRateMax.focus();
          setControlLoop(true);
          //	objRateMax.select();
          iCheck = false;
        }
      }
    } else if (parseFloat(iRow) === 1) {
      if (colKey === "c") {
        if (iCheck) {
          if (current >= iRow) {
            if (objRateMinVal === "") {
              alert(
                " " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              objRateMin.focus();
              //	objRateMin.select();
              iCheck = false;
            }
          }
        }

        if (iCheck) {
          if (current >= iRow) {
            if (objRateMaxVal === "") {
              alert(
                "Rate Range Max. on row " +
                  parseFloat(iRow + 1) +
                  " must be filled prior to continuing."
              );
              objRateMax.focus();
              //	objRateMax.select();
              iCheck = false;
            }
          }
        }
      }

      if (iCheck) {
        if (objRateMinVal.indexOf(".") >= 0) {
          if (objRateMinVal.length - objRateMinVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            objRateMin.focus();
            //	objRateMin.select();
            iCheck = false;
          }
        }
      }
      if (iCheck) {
        if (objRateMaxVal.indexOf(".") >= 0) {
          if (objRateMaxVal.length - objRateMaxVal.indexOf(".") > 3) {
            alert("Please enter no more than 2 decimal positions");
            objRateMax.focus();
            //	objRateMax.select();
            iCheck = false;
          }
        }
      }

      if (iCheck) {
        if (parseFloat(objRateMinVal) >= parseFloat(objRateMaxVal)) {
          if (colKey === "a") {
            alert(
              " " + parseFloat(iRow + 1) + "  must be less than Rate Range Max."
            );
            objRateMinVal = "";
            selectedRowData.salesdepth_en_rates[0].ratemin = objRateMinVal;
            objRateMin.focus();
            //	objRateMin.select();
          } else {
            alert(
              "Rate Range Max. on row " +
                parseFloat(iRow + 1) +
                " must be greater than Rate Range Min."
            );
            objRateMaxVal = "";
            selectedRowData.salesdepth_en_rates[0].ratemax = objRateMaxVal;
            objRateMax.focus();
            //	objRateMax.select();
          }
          iCheck = false;
        }
      }
    }

    salesDepthData.salesdepth_en_ranges[iRow] =
      convertEnRatesToDecimal(selectedRowData);
    salesDepthData.salesdepth_en_ranges[iRow - 1] = prevRowData;
    setState({
      ...state,
      depthOfSales: { ...state.depthOfSales, salesDepth: salesDepthData },
    });
    if (iCheck == true) {
      setControlLoop(false);
    } else if (iCheck == false) {
      setControlLoop(true);
    }
    return iCheck;
  };

  const convertEnRatesToDecimal = (selectedRow) => {
    const rates = selectedRow.salesdepth_en_rates;
    const convertedRates = [];
    rates.forEach((rate) => {
      rate.ratemin = rate.ratemin ? convertToDecimal(rate.ratemin) : "";
      rate.ratemax = rate.ratemax ? convertToDecimal(rate.ratemax) : "";
      convertedRates.push({ ...rate });
    });
    selectedRow.salesdepth_en_rates = convertedRates;
    return selectedRow;
  };

  const update_vol_los = (current, colKey, current_los) => {
    setOnChangeEnTrigger(false);
    let iReturn = true;
    const iCheck = true;
    const iLock = false;
    const iUnlock = true;
    const maxRows = maxDOSFromAPI !== null ? maxDOSFromAPI : 6;
    const maxInfinityNum = 999999;
    const maxInfinity = "+";
    const losCurrentVal = current;
    let objMin;
    let objMinVal;
    let objMax;
    let objMaxVal;
    let objMinCurrent;
    let objMinCurrentVal;
    let objMinNext;
    let objMinNextVal;
    let objMaxNext;
    let objMaxNextVal;
    let objMaxPrev;
    let objMaxPrevVal;
    let iCheck_return;

    const selectedRowData = { ...state.depthOfSales.salesDepth };
    for (let iRow = 0; iRow < maxRows; iRow++) {
      objMin = document.getElementById(
        "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmin"
      );
      objMinVal = selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmin;
      objMax = document.getElementById(
        "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmax"
      );
      objMaxVal = selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax;
      if (objMinVal != "") {
        if (iReturn) {
          objMinCurrent = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + current + "].volrmin"
          );
          objMinCurrentVal =
            selectedRowData.salesdepth_en_ranges[`${current}`].volrmin;
          if (
            iRow !== 0 &&
            (colKey === "c" || colKey === "a" || colKey === "b")
          ) {
            if (current == maxRows - 1) {
              iCheck_return = update_rate_los(
                losCurrentVal,
                maxRows,
                iRow,
                colKey,
                current_los
              );
              if (iCheck_return == false) {
                break;
              }
              current -= 1;
            } else {
              iCheck_return = update_rate_los(
                losCurrentVal,
                maxRows,
                iRow,
                colKey,
                current_los
              );
              if (iCheck_return == false) {
                break;
              }
            }
            iReturn = iCheck;
          } else {
            if (current === maxRows - 1) {
              current -= 1;
            }
          }
        }
        if (iRow == 0) {
          objMinNext = document.getElementById(
            `salesDepth.salesdepth_en_ranges[parseFloat(${iRow + 1})].volrmin`
          );
          objMinNextVal =
            selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin;
          objMaxNext = document.getElementById(
            `salesDepth.salesdepth_en_ranges[parseFloat(${iRow + 1})].volrmax`
          );
          objMaxNextVal =
            selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmax;
          if (parseFloat(objMinVal) != 0) {
            objMinVal = 0;
            selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmin = objMinVal;
          }
          if (objMaxVal === "") {
            if (objMinNextVal !== "") {
              if (
                parseFloat(objMaxVal) === parseFloat(objMinNextVal) ||
                parseFloat(objMaxVal) + 1 != parseFloat(objMinNextVal)
              ) {
                objMax.select();
                if (
                  confirm(
                    "This value will affect the rows below. Do you wish to continue?"
                  )
                ) {
                  objMinNextVal = parseFloat(objMax.value) + 1;
                  objMaxNextVal = maxInfinity;
                  selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin =
                    objMinNextVal;
                  selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmax =
                    objMaxNextVal;
                  if (colKey === "d") {
                    iUnlockRowEnhanced(current);
                  }
                } else {
                  objMaxVal = parseFloat(objMinNextVal) - 1;
                  selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                    objMaxVal;
                  objMax.select();
                  iReturn = false;
                }
              } else {
                objMinNextVal = parseFloat(objMaxVal) + 1;
                selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin =
                  objMinNextVal;
              }
            } else {
              objMaxVal = maxInfinity;
              selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                objMaxVal;
            }
          }
          if (iReturn) {
            if (objMinNextVal != "") {
              if (
                objMaxVal === maxInfinity ||
                parseFloat(objMaxVal) === maxInfinityNum ||
                parseFloat(objMaxVal) === parseFloat(objMinNextVal) ||
                parseFloat(objMax.value) + 1 != parseFloat(objMinNextVal)
              ) {
                if (
                  objMaxVal === maxInfinity ||
                  parseFloat(objMaxVal) === maxInfinityNum ||
                  parseFloat(objMaxVal) + 1 >= parseFloat(objMaxNextVal)
                ) {
                  objMax.select();
                  if (
                    confirm(
                      "This value will affect the rows below. Do you wish to continue?"
                    )
                  ) {
                    objMinNextVal = parseFloat(objMaxVal) + 1;
                    selectedRowData.salesdepth_en_ranges[
                      `${iRow + 1}`
                    ].volrmin = objMinNextVal;
                    objMax.select();
                  } else {
                    objMaxVal = parseFloat(objMinNextVal) - 1;
                    selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                      objMaxVal;
                    objMax.select();
                    iReturn = false;
                  }
                } else {
                  objMinNextVal = parseFloat(objMaxVal) + 1;
                  selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin =
                    objMinNextVal;
                }
              }
            } else {
              if (
                objMaxVal != maxInfinity &&
                parseFloat(objMaxVal) != maxInfinityNum
              ) {
                objMinNextVal = parseFloat(objMaxVal) + 1;
                objMaxNextVal = maxInfinity;
                selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin =
                  objMinNextVal;
                selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmax =
                  objMaxNextVal;
                if (colKey === "d") {
                  iUnlockRowEnhanced(current);
                }
              }
            }
          }
          if (
            objMaxVal === "" ||
            objMaxVal === maxInfinity ||
            parseFloat(objMaxVal) === maxInfinityNum
          ) {
            objMaxVal = maxInfinity;
            objMinNextVal = "";
            objMaxNextVal = "";
            selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin =
              objMinNextVal;
            selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmax =
              objMaxNextVal;
            iLockRowEnhanced(current);
          }
        } else if (iRow === maxRows - 1) {
          objMin = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmin"
          );
          objMinVal = selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmin;
          objMax = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmax"
          );
          objMaxVal = selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax;

          //   objMax.tabIndex = "-1";
          //  objMax.style.backgroundColor = "silver";
          objMax.onKeyPress = "";
          objMax.onChange = "";
          objMax.onFocus = "";
          //   objMax.readOnly = true;
          if (iReturn) {
            if (objMinVal != "") {
              objMaxVal = maxInfinity;
              selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                objMaxVal;
            } else {
              objMaxVal = "";
              selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                objMaxVal;
            }
          }
        } else if (0 < iRow && iRow < maxRows - 1) {
          objMin = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmin"
          );
          objMinVal = selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmin;
          objMax = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmax"
          );
          objMaxVal = selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax;
          objMinNext = document.getElementById(
            `salesDepth.salesdepth_en_ranges[parseFloat${iRow + 1}].volrmin`
          );
          objMinNextVal =
            selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin;
          objMaxNext = document.getElementById(
            `salesDepth.salesdepth_en_ranges[parseFloat${iRow + 1}].volrmax`
          );
          objMaxNextVal =
            selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmax;
          objMaxPrev = document.getElementById(
            `salesDepth.salesdepth_en_ranges[parseFloat${iRow - 1}].volrmax`
          );
          objMaxPrevVal =
            selectedRowData.salesdepth_en_ranges[`${iRow - 1}`].volrmax;
          if (iReturn) {
            if (objMinVal === "" && objMaxVal === "") {
              iLockRowEnhanced(iRow);
            } else if (objMinVal != "" && objMaxVal === "") {
              objMaxVal = maxInfinity;
              selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                objMaxVal;
            } else if (objMinVal != "" && objMaxVal != "") {
              if (parseFloat(objMinVal) >= parseFloat(objMaxVal)) {
                if (iRow > current) {
                  iLockRowEnhanced(iRow);
                } else {
                  objMax.select();
                  alert("This value must be greater than Volume Range Min.");
                  iReturn = false;
                  if (objMinNextVal != "") {
                    objMaxVal = parseFloat(objMinNextVal) - 1;
                    selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                      objMaxVal;
                  } else {
                    objMaxVal = maxInfinity;
                    selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                      objMaxVal;
                    iLockRowEnhanced(iRow);
                  }
                  objMax.select();
                }
              } else if (
                ((objMaxVal === maxInfinity ||
                  parseFloat(objMaxVal) === maxInfinityNum) &&
                  current === iRow &&
                  colKey === "d" &&
                  objMinNextVal != "") ||
                parseFloat(objMaxVal) >= parseFloat(objMinNextVal)
              ) {
                if (
                  ((objMaxVal === maxInfinity ||
                    parseFloat(objMaxVal) === maxInfinityNum) &&
                    current === iRow &&
                    colKey === "d" &&
                    objMinNextVal != "") ||
                  parseFloat(objMaxVal) + 1 >= parseFloat(objMaxNextVal)
                ) {
                  objMax.select();
                  if (
                    confirm(
                      "This value will affect the rows below. Do you wish to continue?"
                    )
                  ) {
                    objMinNextVal = parseFloat(objMaxVal) + 1;
                    if (parseFloat(objMaxVal) === maxInfinityNum) {
                      objMaxVal = maxInfinity;
                      selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                        objMaxVal;
                    }
                    objMax.select();
                  } else {
                    objMaxVal = parseFloat(objMinNextVal) - 1;
                    selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                      objMaxVal;
                    objMax.select();
                    iReturn = false;
                  }
                } else {
                  objMinNextVal = parseFloat(objMaxVal) + 1;
                  selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin =
                    objMinNextVal;
                }
              } else {
                objMinNextVal = parseFloat(objMaxVal) + 1;
                selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin =
                  objMinNextVal;
                if (colKey === "d") {
                  iUnlockRowEnhanced(current);
                }
              }
            }
            if (parseFloat(objMaxVal) <= parseFloat(objMinVal)) {
              objMaxVal = maxInfinity;
              selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                objMaxVal;
              iLockRowEnhanced(iRow);
            }
            if (
              objMaxVal === maxInfinity ||
              parseFloat(objMaxVal) === maxInfinityNum
            ) {
              objMaxVal = maxInfinity;
              selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax =
                objMaxVal;
              iLockRowEnhanced(iRow);
            }
          } else {
            if (objMinVal == "" && objMaxVal === "") {
              iLockRowEnhanced(iRow);
            }
          }
          if (
            objMaxVal === maxInfinity ||
            parseFloat(objMaxVal) === maxInfinityNum
          ) {
            objMaxVal = maxInfinity;
            selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax = objMaxVal;
            iLockRowEnhanced(iRow);
          }
          if (
            objMaxPrevVal === maxInfinity ||
            parseFloat(objMaxPrevVal) === maxInfinityNum
          ) {
            iReturn = false;
            objMinVal = "";
            objMaxVal = "";
            selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmin = objMinVal;
            selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax = objMaxVal;
            objMaxPrev.focus();
            objMaxPrev.select();
            iLockRowEnhanced(current);
          }
        }
        if (iReturn) {
          state.formChg = "Y";
        }
      } else {
        if (iRow == 0) {
          iLockRowEnhanced(current);
        } else if (0 < iRow && iRow < maxRows - 1) {
          iLockRowEnhanced(iRow);
        }
      }
    }
    if (iReturn != iCheck) {
      iReturn = false;
    }
    setState({
      ...state,
      depthOfSales: { ...state.depthOfSales, salesDepth: selectedRowData },
    });
    return iReturn;
  };
  const update_volEnhanced = (current, colKey) => {
    setOnChangeEnTrigger(false);
    let iReturn = true;
    const iCheck = true;
    const iLock = false;
    const iUnlock = true;
    const maxRows = maxDOSFromAPI !== null ? maxDOSFromAPI : 6;
    const maxInfinityNum = 999999;
    const maxInfinity = "+";
    let objMin;
    let objMinVal;
    let objMax;
    let objMaxVal;
    let objMinCurrent;
    let objMinCurrentVal;
    let objMinNext;
    let objMinNextVal;
    let objMaxNext;
    let objMaxNextVal;
    let objMaxPrev;
    let objMaxPrevVal;
    let iCheck_return;
    const selectedRowData = { ...state.depthOfSales.salesDepth };
    for (let iRow = 0; iRow < maxRows; iRow++) {
      objMin = document.getElementById(
        "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmin"
      );
      objMinVal = selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmin;
      objMax = document.getElementById(
        "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmax"
      );
      objMaxVal = selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax;
      if (objMinVal !== "") {
        if (iReturn) {
          objMinCurrent = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + current + "].volrmin"
          );
          objMinCurrentVal =
            selectedRowData.salesdepth_en_ranges[`${current}`].volrmin;
          if (
            iRow != 0 &&
            (colKey === "c" || colKey === "a" || colKey === "b")
          ) {
            if (current === maxRows - 1) {
              if (controlLoop !== true) {
                iCheck_return = update_rateEnhanced(
                  maxRows,
                  maxRows,
                  iRow,
                  colKey
                );
              }
              if (iCheck_return == false) {
                break;
              }
              current -= 0;
            } else {
              if (controlLoop !== true) {
                iCheck_return = update_rateEnhanced(
                  current,
                  maxRows,
                  iRow,
                  colKey
                );
              }
              if (iCheck_return == false) {
                break;
              }
            }
            iReturn = iCheck;
          } else {
            if (current == maxRows - 1) {
              current -= 0;
            }
          }
        }

        if (iRow == 0) {
          objMinNext = document.getElementById(
            `salesDepth.salesdepth_en_ranges[${iRow + 1}].volrmin`
          );
          objMinNextVal =
            selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin;
          objMaxNext = document.getElementById(
            `salesDepth.salesdepth_en_ranges[${iRow + 1}].volrmax`
          );
          objMaxNextVal =
            selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmax;
          if (parseFloat(objMinVal) != 0) {
            objMinVal = 0;
          }
          if (objMaxVal === "") {
            if (objMinNextVal != "") {
              if (
                parseFloat(objMaxVal) === parseFloat(objMinNextVal) ||
                parseFloat(objMaxVal) + 1 != parseFloat(objMinNextVal)
              ) {
                objMax.select();
                if (
                  confirm(
                    "This value will affect the rows below. Do you wish to continue?"
                  )
                ) {
                  objMinNextVal = parseFloat(objMaxVal) + 1;
                  objMaxNextVal = maxInfinity;
                  if (colKey === "d") {
                    iUnlockRowEnhanced(current);
                  }
                } else {
                  objMaxVal = parseFloat(objMinNextVal) - 1;
                  objMax.select();
                  iReturn = false;
                }
              } else {
                objMinNextVal = parseFloat(objMaxVal) + 1;
              }
            } else {
              objMaxVal = maxInfinity;
            }
          }
          if (iReturn) {
            if (objMinNextVal != "") {
              if (
                objMaxVal === maxInfinity ||
                parseFloat(objMaxVal) === maxInfinityNum ||
                parseFloat(objMaxVal) === parseFloat(objMinNextVal) ||
                parseFloat(objMaxVal) + 1 != parseFloat(objMinNextVal)
              ) {
                if (
                  objMaxVal === maxInfinity ||
                  parseFloat(objMaxVal) === maxInfinityNum ||
                  parseFloat(objMaxVal) + 1 >= parseFloat(objMaxNextVal)
                ) {
                  objMax.select();
                  if (enVolrmaxChange) {
                    if (
                      confirm(
                        "This value will affect the rows below. Do you wish to continue?"
                      )
                    ) {
                      objMinNextVal = parseFloat(objMaxVal) + 1;
                      objMax.select();
                    } else {
                      objMaxVal = parseFloat(objMinNextVal) - 1;
                      objMax.select();
                      iReturn = false;
                    }
                  }
                } else {
                  objMinNextVal = parseInt(objMaxVal) + 1;
                }
              }
            } else {
              if (
                objMax.value != maxInfinity &&
                parseFloat(objMaxVal) != maxInfinityNum
              ) {
                objMinNextVal = parseInt(objMaxVal) + 1;
                objMaxNextVal = maxInfinity;
                if (colKey === "d") {
                  iUnlockRowEnhanced(current);
                }
              }
            }
          }
          if (
            objMaxVal === "" ||
            objMaxVal === maxInfinity ||
            parseFloat(objMaxVal) === maxInfinityNum
          ) {
            objMaxVal = maxInfinity;
            objMinNextVal = "";
            objMaxNextVal = "";
            iLockRowEnhanced(current);
          }
        } else if (iRow == maxRows - 1) {
          objMin = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmin"
          );
          objMinVal = selectedRowData.salesdepth_en_ranges[iRow].volrmin;
          objMax = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmax"
          );
          objMaxVal = selectedRowData.salesdepth_en_ranges[iRow].volrmax;

          objMax.tabIndex = "-1";
          objMax.style.backgroundColor = "silver";
          objMax.onKeyPress = "";
          objMax.onChange = "";
          objMax.onFocus = "";
          objMax.readOnly = true;
          if (iReturn) {
            if (objMinVal != "" && !isNaN(objMinVal)) {
              objMaxVal = maxInfinity;
            } else {
              objMinVal = "";
              objMaxVal = "";
            }
          }
        } else if (iRow > 0 && iRow < maxRows - 1) {
          objMin = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmin"
          );
          objMinVal = selectedRowData.salesdepth_en_ranges[iRow].volrmin;

          objMax = document.getElementById(
            "salesDepth.salesdepth_en_ranges[" + iRow + "].volrmax"
          );
          objMaxVal = selectedRowData.salesdepth_en_ranges[iRow].volrmax;

          objMinNext = document.getElementById(
            `salesDepth.salesdepth_en_ranges[${iRow + 1}].volrmin`
          );
          objMinNextVal =
            selectedRowData.salesdepth_en_ranges[iRow + 1].volrmin;

          objMaxNext = document.getElementById(
            `salesDepth.salesdepth_en_ranges[${iRow + 1}].volrmax`
          );
          objMaxNextVal =
            selectedRowData.salesdepth_en_ranges[iRow + 1].volrmax;

          objMaxPrev = document.getElementById(
            `salesDepth.salesdepth_en_ranges[${iRow - 1}].volrmax`
          );
          objMaxPrevVal =
            selectedRowData.salesdepth_en_ranges[iRow - 1].volrmax;

          if (iReturn) {
            if (objMinVal === "" && objMaxVal === "") {
              iLockRow(iRow);
            } else if (
              objMinVal != "" &&
              objMaxVal === "" &&
              !isNaN(objMinVal)
            ) {
              objMaxVal = maxInfinity;
            } else if (objMinVal != "" && objMaxVal != "") {
              if (parseFloat(objMinVal) >= parseFloat(objMaxVal)) {
                if (iRow > current) {
                  iLockRow(iRow);
                } else {
                  objMax.select();
                  alert("This value must be greater than Volume Range Min.");
                  iReturn = false;
                  if (objMinNextVal != "") {
                    objMaxVal = parseInt(objMinNextVal) - 1;
                  } else {
                    objMaxVal = maxInfinity;
                    iLockRowEnhanced(iRow);
                  }
                  objMax.select();
                }
              } else if (
                ((objMaxVal === maxInfinity ||
                  parseFloat(objMaxVal) === maxInfinityNum) &&
                  current === iRow &&
                  colKey === "d" &&
                  objMinNextVal != "") ||
                parseFloat(objMaxVal) >= parseFloat(objMinNextVal)
              ) {
                if (
                  ((objMaxVal == maxInfinity ||
                    parseFloat(objMaxVal) == maxInfinityNum) &&
                    current === iRow &&
                    colKey === "d" &&
                    objMinNextVal != "") ||
                  parseFloat(objMaxVal) + 1 >= parseFloat(objMaxNextVal)
                ) {
                  objMax.select();
                  if (
                    confirm(
                      "This value will affect the rows below. Do you wish to continue?"
                    )
                  ) {
                    objMinNextVal = parseInt(objMaxVal) + 1;
                    if (parseFloat(objMaxVal) === maxInfinityNum) {
                      objMaxVal = maxInfinity;
                    }
                    objMax.select();
                  } else {
                    objMaxVal = parseInt(objMinNextVal) - 1;
                    objMax.select();
                    iReturn = false;
                  }
                } else {
                  objMinNextVal = parseInt(objMaxVal) + 1;
                }
              } else {
                objMinNextVal = parseInt(objMaxVal) + 1;
                if (colKey === "d") {
                  iUnlockRowEnhanced(current);
                }
              }
            }
            if (parseFloat(objMaxVal) <= parseFloat(objMinVal)) {
              objMaxVal = maxInfinity;
              iLockRowEnhanced(iRow);
            }
            if (
              objMaxVal === maxInfinity ||
              parseFloat(objMaxVal) === maxInfinityNum
            ) {
              objMaxVal = maxInfinity;
              iLockRowEnhanced(iRow);
            }
          } else {
            if (objMinVal == "" && objMaxVal == "") {
              iLockRowEnhanced(iRow);
            }
          }
          if (
            objMaxVal === maxInfinity ||
            parseFloat(objMaxVal) === maxInfinityNum
          ) {
            objMaxVal = maxInfinity;
            iLockRowEnhanced(iRow);
          }
          if (
            objMaxPrevVal === maxInfinity ||
            parseFloat(objMaxPrevVal) === maxInfinityNum ||
            objMaxPrevVal === ""
          ) {
            iReturn = false;
            objMinVal = "";
            objMaxVal = "";
            objMinNextVal = "";
            objMaxNextVal = "";
            //objMaxPrev.focus();
            //objMaxPrev.select();
            iLockRowEnhanced(iRow);
          }
        }
        if (iReturn) {
          state.formChg = "Y";
        }
      } else {
        if (iRow == 0) {
          iLockRowEnhanced(current);
        } else if (0 < iRow && iRow < maxRows - 1) {
          iLockRowEnhanced(iRow);
        }
      }

      selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmin = objMinVal;
      selectedRowData.salesdepth_en_ranges[`${iRow}`].volrmax = objMaxVal;
      if (objMaxVal === "+" || objMaxVal === "") {
        objMinNextVal = "";
        objMaxNextVal = "";
      } else {
        objMinNextVal = objMinNextVal;
        objMaxNextVal = objMaxNextVal;
      }
      if (iRow + 1 < maxRows) {
        selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmin =
          objMinNextVal;
        selectedRowData.salesdepth_en_ranges[`${iRow + 1}`].volrmax =
          objMaxNextVal;
      }
    }
    if (iReturn != iCheck) {
      iReturn = false;
    }
    setState({
      ...state,
      depthOfSales: { ...state.depthOfSales, salesDepth: selectedRowData },
    });
    return iReturn;
  };

  const validation_check = (type) => {
    const stateSalesDepthData = { ...state.depthOfSales.salesDepth };
    const rangeList = stateSalesDepthData.salesdepth_en_ranges;
    const lastRangeIndex = rangeList.length - 1;
    const lastnumberLOSTiers = stateSalesDepthData.numberLOSTiers - 1;
    if (appContext.user.isSalesUser || appContext.user.isLimitedSalesUser) {
      return true;
    } else {
      if (
        rangeList !== null &&
        rangeList.length > 0 &&
        rangeList !== undefined
      ) {
        for (let i = 0; i < rangeList.length; i++) {
          const first_row_max = document.getElementById(
            "salesDepth.salesdepth_en_ranges[0].volrmax"
          );
          const rangeData = rangeList[i];
          if (rangeData.readOnly === false) {
            for (let j = 0; j < stateSalesDepthData.numberLOSTiers; j++) {
              if (
                rangeData.salesdepth_en_rates[j].ratemin === "" ||
                rangeData.salesdepth_en_rates[j].ratemax === ""
              ) {
                if (i !== 0) {
                  appContext.setErrorMessageAlert({
                    show: true,
                    message: Settings.depthOfSales.rangeAlert,
                    type: "browserAlert",
                  });
                  if (i === 0) {
                    //commented the below line for 8223 point 2
                    // first_row_max?.focus();
                  }
                  return false;
                }
              } else if (i !== 0) {
                //remove the alert when all data filled
                if (
                  rangeData.salesdepth_en_rates[j].ratemin !== "" &&
                  rangeData.salesdepth_en_rates[j].ratemax !== ""
                ) {
                  appContext.setErrorMessageAlert({
                    show: false,
                    message: "",
                    type: "browserAlert",
                  });
                  return true;
                }
                //Season alert when fill all data
                if (
                  appContext.user.isHotelUser &&
                  state?.depthOfSales?.enhancedDOSCompleted == false
                ) {
                  if (stateSalesDepthData?.totalSeasons > 1) {
                    if (
                      type === "switchseason" ||
                      stateSalesDepthData?.totalSeasons ===
                        seasonIdForValidation
                    ) {
                      appContext.setErrorMessageAlert({
                        show: false,
                        message: "",
                        type: "browserAlert",
                      });
                      return true;
                    } else {
                      appContext.setErrorMessageAlert({
                        show: true,
                        message: Settings.depthOfSales.seasonsAlert,
                        type: "browserAlert",
                      });
                      return false;
                    }
                  }
                }
              } else {
                if (i === lastRangeIndex && j === lastnumberLOSTiers) {
                  appContext.setErrorMessageAlert({
                    show: false,
                    message: "",
                    type: "browserAlert",
                  });
                  appContext.setDOSAlert(false);
                  setControlLoop(false);
                  return true;
                }
              }
            }
          } else {
            if (i !== 0) {
              if (
                appContext.user.isHotelUser &&
                state?.depthOfSales?.enhancedDOSCompleted == false
              ) {
                if (stateSalesDepthData?.totalSeasons > 1) {
                  if (
                    type === "switchseason" ||
                    stateSalesDepthData?.totalSeasons === seasonIdForValidation
                  ) {
                    appContext.setErrorMessageAlert({
                      show: false,
                      message: "",
                      type: "browserAlert",
                    });
                    return true;
                  } else {
                    appContext.setErrorMessageAlert({
                      show: true,
                      message: Settings.depthOfSales.seasonsAlert,
                      type: "browserAlert",
                    });
                    return false;
                  }
                }
              } else {
                appContext.setErrorMessageAlert({
                  show: false,
                  message: "",
                  type: "browserAlert",
                });
              }
              appContext.setDOSAlert(false);
              setControlLoop(false);
              return true;
            } else if (
              appContext.user.isHotelUser &&
              i === 0 &&
              firstMaxRowPlus == false &&
              (rangeData.volrmax == "+" ||
                rangeData.volrmax == "" ||
                rangeData.volrmax == 999999) &&
              !enVolrmaxChange
            ) {
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.depthOfSales.rangeAlert,
                type: "browserAlert",
              });
              if (i === 0) {
                //commented the below line for 8223 point 2
                // first_row_max?.focus();
              }
              return false;
            } else if (
              appContext.user.isHotelUser &&
              i === 0 &&
              rangeData.volrmax == "+" &&
              enVolrmaxChange == true
            ) {
              if (
                appContext.user.isHotelUser &&
                state?.depthOfSales?.enhancedDOSCompleted === false
              ) {
                if (stateSalesDepthData?.totalSeasons > 1) {
                  if (
                    type === "switchseason" ||
                    stateSalesDepthData?.totalSeasons === seasonIdForValidation
                  ) {
                    appContext.setErrorMessageAlert({
                      show: false,
                      message: "",
                      type: "browserAlert",
                    });
                    return true;
                  } else {
                    appContext.setErrorMessageAlert({
                      show: true,
                      message: Settings.depthOfSales.seasonsAlert,
                      type: "browserAlert",
                    });
                    return false;
                  }
                }
              } else {
                appContext.setErrorMessageAlert({
                  show: false,
                  message: "",
                  type: "browserAlert",
                });
              }
              appContext.setDOSAlert(false);
              return true;
            }
          }
        }
      }
    }
  };
  const validation_check_standard = (initialListFromApi) => {
    const stateSalesDepthData = { ...state.depthOfSales.salesDepth };
    let rangeList;
    rangeList = stateSalesDepthData.salesdepth_ranges;
    const initialList = [...state.initialSalesDepthRage];
    if (rangeList?.length == 0) {
      if (
        initialListFromApi !== undefined &&
        initialListFromApi?.length > 0 &&
        initialListFromApi !== null
      ) {
        rangeList = initialListFromApi;
      } else {
        rangeList = initialList;
      }
    }
    if (appContext.user.isSalesUser || appContext.user.isLimitedSalesUser) {
      return true;
    } else {
      if (
        rangeList !== null &&
        rangeList.length > 0 &&
        rangeList !== undefined
      ) {
        const lastRangeIndex = rangeList.length - 1;
        for (let i = 0; i < rangeList.length; i++) {
          const first_row_max = document.getElementById(
            "salesDepth.salesdepth_ranges[0].volrmax"
          );
          const rangeData = rangeList[i];
          if (rangeData.readOnly === false) {
            if (rangeData.ratermin == "" || rangeData.ratermax == "") {
              if (i !== 0 && i !== 1) {
                appContext.setErrorMessageAlert({
                  show: true,
                  message: Settings.depthOfSales.rangeAlert,
                  type: "browserAlert",
                });
                return false;
              } else if (
                appContext.user.isHotelUser &&
                i === 0 &&
                firstMaxRowPlusStandard === false &&
                (rangeData.volrmax == "+" ||
                  rangeData.volrmax == "" ||
                  rangeData.volrmax == 999999) &&
                !volrmaxChange
              ) {
                appContext.setErrorMessageAlert({
                  show: true,
                  message: Settings.depthOfSales.rangeAlert,
                  type: "browserAlert",
                });
                first_row_max?.focus();
                return false;
              } else if (
                appContext.user.isHotelUser &&
                i === 0 &&
                rangeData.volrmax == "+" &&
                volrmaxChange == true
              ) {
                appContext.setErrorMessageAlert({
                  show: false,
                  message: "",
                  type: "browserAlert",
                });
                appContext.setDOSAlert(false);
                return true;
              }
            } else {
              if (i === lastRangeIndex) {
                appContext.setErrorMessageAlert({
                  show: false,
                  message: "",
                  type: "browserAlert",
                });
                appContext.setDOSAlert(false);
                return true;
              }
            }
          } else {
            if (i !== 0) {
              appContext.setErrorMessageAlert({
                show: false,
                message: "",
                type: "browserAlert",
              });
              appContext.setDOSAlert(false);
              return true;
            } else if (
              appContext.user.isHotelUser &&
              i === 0 &&
              firstMaxRowPlusStandard === false &&
              (rangeData.volrmax == "+" ||
                rangeData.volrmax == "" ||
                rangeData.volrmax == 999999) &&
              !volrmaxChange
            ) {
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.depthOfSales.rangeAlert,
                type: "browserAlert",
              });
              first_row_max?.focus();
              return false;
            } else if (
              appContext.user.isHotelUser &&
              i === 0 &&
              rangeData.volrmax == "+" &&
              volrmaxChange == true
            ) {
              appContext.setErrorMessageAlert({
                show: false,
                message: "",
                type: "browserAlert",
              });
              appContext.setDOSAlert(false);
              return true;
            }
          }
        }
      }
    }
  };

  const componentUnload = () => {
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "browserAlert",
    });
    appContext.setDOSAlert(false);
  };
  const depthofsaleAccountContext = {
    state,
    setState,
    setDepthData,
    getFormattedDate,
    calcADR,
    switchType,
    switchSeason,
    text_onclick,
    textEnhanced_onclick,
    btAcctStrategy_popup,
    getSalesDepthRangeData,
    getEnhancedSalesDepthRangeData,
    window_onload,
    hasChanged,
    update_vol,
    pad_with_zeros,
    update_rate,
    iLockRow,
    iUnlockRow,
    DOS_onkeypress,
    iLockRowEnhanced,
    iUnlockRowEnhanced,
    update_rate_los,
    update_rateEnhanced,
    update_vol_los,
    update_volEnhanced,
    handleChange,
    onChangeEnhancedHandler,
    standardDataConversion,
    enhancedDataConversion,
    UpdateHotelSalesDepth,
    window_onload_enhanced,
    UpdateDepthOfSales,
    NumberOnly_onkeypress,
    getHotelDos,
    validation_check,
    validation_check_standard,
    onChangeEnTrigger,
    onChangeTrigger,
    maxDOSFromAPI,
    setMaxDOSFromAPI,
    componentUnload,
    setInitialEnSalesDepthRangeData,
    text_onBlur,
    textEnhanced_onblur,
    enVolrmaxChange,
    setEnVolrmaxChange,
    volrmaxChange,
    setVolrmaxChange,
    firstMaxRowPlus,
    setFirstMaxRowPlus,
    firstMaxRowPlusStandard,
    setFirstMaxRowPlusStandard,
    depthOfSalesDataAPI,
    setDepthOfSalesDataAPI,
  };

  return (
    <DepthofsaleAccountContext.Provider value={depthofsaleAccountContext}>
      {props.children}
    </DepthofsaleAccountContext.Provider>
  );
};
export const DepthofsaleAccountContextConsumer =
  DepthofsaleAccountContext.Consumer;
export default DepthofsaleAccountContext;
