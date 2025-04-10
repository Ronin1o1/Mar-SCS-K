import React, { useState, useContext } from "react";
import moment from "moment";
import API from "../service/API";
import { useLocation } from "react-router-dom";
import Settings from "../static/Settings";

import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import Utils from "../../../../../common/utils/Utils";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const BlackoutContext = React.createContext({});

export const BlackoutContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext: any = useContext(HotelPricingContext);
  const [state, setState] = useState({
    formChg: "N",
    maxBlackouts: 0,
    generalReadOnly: false,
    numblackouts: 0,
    strHotelBlackoutDatesList: [...Array(10)].map((_, idx) => ({
      blackoutid: idx + 1,
      startdate: null,
      enddate: null,
      blackname: "",
    })),

    periodstart: null,
    periodend: null,
  });

  const [totalDays, setTotalDays] = useState(0);

  const urlParms = useLocation().search;

  const period = new URLSearchParams(urlParms).get("Period");

  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const hotelrfpid =
    new URLSearchParams(urlParms).get("Hotelrfpid") == 0 ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == "0" ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == null ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == undefined
      ? parentContext?.selectedHotelRfpId
      : new URLSearchParams(urlParms).get("Hotelrfpid");
  const blackoutStateRef = React.useRef();
  blackoutStateRef.current = state;

  const blackoutData = (res, initialLoad?: boolean) => {
    initialLoad = initialLoad ? initialLoad : false;
    const strBlackoutList = initialLoad
      ? [...Array(res.max_blackouts ? res.max_blackouts : 10)].map(
          (_, idx) => ({
            blackoutid: idx + 1,
            startdate: null,
            enddate: null,
            blackname: "",
          })
        )
      : [...state.strHotelBlackoutDatesList];

    if (res.HotelBlackoutDatesList.length > 0) {
      res.HotelBlackoutDatesList.map((data, index) => {
        strBlackoutList[index]["blackoutid"] = data.blackoutid;
        strBlackoutList[index]["startdate"] = data.shortStartdate;
        strBlackoutList[index]["enddate"] = data.shortEnddate;
        strBlackoutList[index]["blackname"] = data.blackname;
      });
    }
    const startPeriodDate = `${Settings.periodstart}${period}`;
    const endPeriodDate = `${Settings.periodend}${period}`;
    setState({
      ...state,
      strHotelBlackoutDatesList: strBlackoutList,
      maxBlackouts: res.TotalNumBlackoutDays,
      generalReadOnly: res.GeneralReadOnly,
      numblackouts: res.HotelBlackoutDatesList.length,
      periodstart: startPeriodDate,
      periodend: endPeriodDate,
    });

    setTotalDays(res.TotalNumBlackoutDays);
    if (res.TotalNumBlackoutDays > 30) {
      alert(
        `Warning!! You have entered ${res.TotalNumBlackoutDays} blackout day.\n\nIf you intend to price some accounts, the total number of blackout days must be less than or equal to 30.`
      );
    }
  };
  const updateBlackoutData = () => {
    const stateData = { ...blackoutStateRef?.current };
    const strBlackoutList = [
      ...blackoutStateRef?.current?.strHotelBlackoutDatesList,
    ];

    strBlackoutList.map((data) => {
      data.startdate =
        data.startdate === "" ||
        data.startdate === null ||
        data.startdate === undefined
          ? null
          : (data["startdate"] = moment(data.startdate).format("MM/DD/YYYY"));
      data.enddate =
        data.enddate === "" ||
        data.enddate === null ||
        data.enddate === undefined
          ? null
          : (data["enddate"] = moment(data.enddate).format("MM/DD/YYYY"));
    });

    API.postBlackoutData(
      strBlackoutList,
      stateData,
      totalDays,
      hotelrfpid,
      marshaCode,
      period
    ).then((resp) => {
      //update hotel pricing context
      parentContext.setCompletionState({
        ...parentContext.completionState,
        Blackout: "Y",
      });
    });
  };

  let strHotelBlackoutDates = {
    blackoutid: undefined,
    startdate: undefined,
    enddate: undefined,
    blackname: "",
    // minDateCalendar2: undefined,
  };

  const dateChangeHandler = (index, property, e) => {
    let arr = state.strHotelBlackoutDatesList;
    const date = moment(e.value).format("MM/DD/YYYY");
    if (property === "startdate") {
      if (e.value === null) {
        appContext.setStartDateAlert(true);
      } else {
        appContext.setStartDateAlert(false);
      }
      strHotelBlackoutDates = {
        ...arr[index],
        startdate: date,
      };
    } else if (property === "enddate") {
      if (e.value === null) {
        appContext.setEndDateAlert(true);
      } else {
        appContext.setEndDateAlert(false);
      }
      strHotelBlackoutDates = {
        ...arr[index],
        enddate: date,
      };
    }

    arr = validations(index, property);
    state.strHotelBlackoutDatesList = arr;
    setState({
      ...state,
      strHotelBlackoutDatesList: state.strHotelBlackoutDatesList,
    });

    const total = dateDiff();
    setTotalDays(total);

    let validation = true;
    for (let j = 0; j < state.strHotelBlackoutDatesList.length; j++) {
      if (
        !!state.strHotelBlackoutDatesList[j].startdate ||
        !!state.strHotelBlackoutDatesList[j].enddate ||
        !!state.strHotelBlackoutDatesList[j].blackname
      ) {
        if (
          !!state.strHotelBlackoutDatesList[j].startdate &&
          !state.strHotelBlackoutDatesList[j].enddate
        ) {
          parentContext.setAlertData(true, Settings.RequiredEndDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredEndDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredEndDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !state.strHotelBlackoutDatesList[j].startdate &&
          !!state.strHotelBlackoutDatesList[j].enddate
        ) {
          parentContext.setAlertData(true, Settings.RequiredStartDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredStartDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredStartDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !!state.strHotelBlackoutDatesList[j].startdate &&
          !!state.strHotelBlackoutDatesList[j].enddate &&
          !state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredReason);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredReason;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredReason,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !state.strHotelBlackoutDatesList[j].startdate &&
          !state.strHotelBlackoutDatesList[j].enddate &&
          !!state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredStartDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredStartDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredStartDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !!state.strHotelBlackoutDatesList[j].startdate &&
          !state.strHotelBlackoutDatesList[j].enddate &&
          !!state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredEndDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredEndDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredEndDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !state.strHotelBlackoutDatesList[j].startdate &&
          !!state.strHotelBlackoutDatesList[j].enddate &&
          !!state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredStartDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredStartDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredStartDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        }
      }
    }
    if (validation) {
      parentContext.setAlertData(false, "");
      appContext.blackoutAlertMsgFlag = false;
      appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
      appContext.blackoutAlertMsg = "";
      appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
      appContext.setStartDateAlert(false);
      appContext.setEndDateAlert(false);
    }
    return validation;
  };

  const setData = (list) => {
    state.strHotelBlackoutDatesList = list;
    setState({
      ...state,
      strHotelBlackoutDatesList: state.strHotelBlackoutDatesList,
    });
  };

  const convertToMMDDYYYY = (date) => {
    return !!date ? moment(date).format(Settings.mmddyyyy) : "";
  };

  const validateDate = (index, property, e) => {
    let arr = state.strHotelBlackoutDatesList;

    const validDate = Utils.isDate(e.target.value, parseInt(period));
    if (validDate) {
      if (property === "startdate") {
        strHotelBlackoutDates = {
          ...arr[index],
          startdate: convertToMMDDYYYY(e.target.value),
        };
      } else if (property === "enddate") {
        strHotelBlackoutDates = {
          ...arr[index],
          enddate: convertToMMDDYYYY(e.target.value),
        };
      }
    } else {
      e.target.value = null;
      if (property === "startdate") {
        strHotelBlackoutDates = {
          ...arr[index],
          startdate: null,
        };
      } else if (property === "enddate") {
        strHotelBlackoutDates = {
          ...arr[index],
          enddate: null,
        };
      }
    }
    arr = validations(index, property);
    state.strHotelBlackoutDatesList = arr;
    setState({
      ...state,
      strHotelBlackoutDatesList: state.strHotelBlackoutDatesList,
    });

    const total = dateDiff();
    setTotalDays(total);

    let validation = true;
    for (let j = 0; j < state.strHotelBlackoutDatesList.length; j++) {
      if (
        !!state.strHotelBlackoutDatesList[j].startdate ||
        !!state.strHotelBlackoutDatesList[j].enddate ||
        !!state.strHotelBlackoutDatesList[j].blackname
      ) {
        if (
          !!state.strHotelBlackoutDatesList[j].startdate &&
          !state.strHotelBlackoutDatesList[j].enddate
        ) {
          parentContext.setAlertData(true, Settings.RequiredEndDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredEndDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredEndDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !state.strHotelBlackoutDatesList[j].startdate &&
          !!state.strHotelBlackoutDatesList[j].enddate
        ) {
          parentContext.setAlertData(true, Settings.RequiredStartDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredStartDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredStartDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !!state.strHotelBlackoutDatesList[j].startdate &&
          !!state.strHotelBlackoutDatesList[j].enddate &&
          !state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredReason);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredReason;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredReason,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !state.strHotelBlackoutDatesList[j].startdate &&
          !state.strHotelBlackoutDatesList[j].enddate &&
          !!state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredStartDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredStartDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredStartDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !!state.strHotelBlackoutDatesList[j].startdate &&
          !state.strHotelBlackoutDatesList[j].enddate &&
          !!state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredEndDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredEndDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredEndDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !state.strHotelBlackoutDatesList[j].startdate &&
          !!state.strHotelBlackoutDatesList[j].enddate &&
          !!state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredStartDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredStartDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredStartDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        }
      }
    }
    if (validation) {
      parentContext.setAlertData(false, "");
      appContext.blackoutAlertMsgFlag = false;
      appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
      appContext.blackoutAlertMsg = "";
      appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
      appContext.setStartDateAlert(false);
      appContext.setEndDateAlert(false);
    }
    return validation;
  };
  const dateDiff = () => {
    let loopCount = 0;
    let numberOfDays = 0;
    const arr = [...state.strHotelBlackoutDatesList];

    for (loopCount = 0; loopCount < arr.length; loopCount++) {
      if (
        arr[loopCount].enddate != null &&
        arr[loopCount].enddate !== "" &&
        arr[loopCount].startdate != null &&
        arr[loopCount].startdate !== ""
      ) {
        numberOfDays +=
          moment(arr[loopCount].enddate).diff(
            moment(arr[loopCount].startdate),
            "days"
          ) + 1;
      } else {
        continue;
      }
    }

    if (numberOfDays > 30) {
      alert(
        `Warning!! You have entered ${numberOfDays} blackout day.\n\nIf you intend to price some accounts, the total number of blackout days must be less than or equal to 30.`
      );
    }
    return numberOfDays;
  };

  const isValidDate = (property) => {
    const startDate = strHotelBlackoutDates.startdate;
    const endDate = strHotelBlackoutDates.enddate;
    if (startDate != null) {
      if (moment(endDate).valueOf() < moment(startDate).valueOf()) {
        alert("The end date must be after the start date.");
        return false;
      }
    }
    return true;
  };

  const checkBetween = (property) => {
    let loopCount = 0;
    const arr = [...state.strHotelBlackoutDatesList];
    for (loopCount = 0; loopCount < arr.length; loopCount++) {
      if (
        strHotelBlackoutDates.blackoutid - 1 === loopCount ||
        arr[loopCount].startdate == null ||
        arr[loopCount].enddate == null
      ) {
        continue;
      } else {
        if (property === "startdate") {
          if (
            moment(strHotelBlackoutDates.startdate).valueOf() >=
              moment(arr[loopCount].startdate).valueOf() &&
            moment(strHotelBlackoutDates.startdate).valueOf() <=
              moment(arr[loopCount].enddate).valueOf()
          ) {
            alert("The start date must not be between any blackout dates.");
            return false;
          }
        } else if (property === "enddate") {
          if (
            moment(strHotelBlackoutDates.enddate).valueOf() >=
              moment(arr[loopCount].startdate).valueOf() &&
            moment(strHotelBlackoutDates.enddate).valueOf() <=
              moment(arr[loopCount].enddate).valueOf()
          ) {
            alert("The end date must not be between any blackout dates.");
            return false;
          }
        }
      }
    }
    return true;
  };

  const checkOverlapping = () => {
    let loopCount = 0;
    const arr = [...state.strHotelBlackoutDatesList];
    if (
      strHotelBlackoutDates.startdate == null ||
      strHotelBlackoutDates.enddate == null
    ) {
      return true;
    }
    for (loopCount = 0; loopCount < arr.length; loopCount++) {
      if (
        strHotelBlackoutDates.blackoutid - 1 === loopCount ||
        arr[loopCount].startdate == null ||
        arr[loopCount].enddate == null
      ) {
        continue;
      } else {
        if (
          (moment(strHotelBlackoutDates.startdate).valueOf() >=
            moment(arr[loopCount].startdate).valueOf() &&
            moment(strHotelBlackoutDates.enddate).valueOf() <=
              moment(arr[loopCount].enddate).valueOf()) ||
          (moment(strHotelBlackoutDates.startdate).valueOf() <=
            moment(arr[loopCount].startdate).valueOf() &&
            moment(strHotelBlackoutDates.enddate).valueOf() >=
              moment(arr[loopCount].enddate).valueOf())
        ) {
          alert(
            "The blackout dates must not overlap any other blackout dates."
          );
          strHotelBlackoutDates = {
            ...strHotelBlackoutDates,
            enddate: undefined,
            startdate: undefined,
          };
          return false;
        }
      }
    }
    return true;
  };

  const periodParam = (property) => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);

    if (property === "enddate") {
      if (
        strHotelBlackoutDates.enddate != null &&
        moment(strHotelBlackoutDates.enddate).valueOf() >
          moment([
            parseInt(
              urlParams.get("period") ?? (moment().year() + 1).toString()
            ),
          ])
            .endOf("year")
            .valueOf()
      ) {
        alert(
          `The end date must be on or before period date. (${moment([
            parseInt(
              urlParams.get("period") ?? (moment().year() + 1).toString()
            ),
          ])
            .endOf("year")
            .format("MM/DD/YYYY")})`
        );
        return false;
      }
    } else if (property === "startdate") {
      if (
        strHotelBlackoutDates.startdate != null &&
        moment(strHotelBlackoutDates.startdate).valueOf() >
          moment([
            parseInt(
              urlParams.get("period") ?? (moment().year() + 1).toString()
            ),
          ])
            .endOf("year")
            .valueOf()
      ) {
        alert(
          `Invalid year (${moment(strHotelBlackoutDates.startdate).format(
            "YYYY"
          )}). (${moment(strHotelBlackoutDates.startdate).format(
            "MM/DD/YYYY"
          )}) is not a valid date. Please enter the date in the format mm/dd/yyyy`
        );
        return false;
      }
    }
    return true;
  };

  const validations = (index, property) => {
    const arr = state.strHotelBlackoutDatesList;
    let dataValidity = true;

    if (dataValidity) {
      dataValidity = isValidDate(property);
    }

    if (dataValidity) {
      dataValidity = checkBetween(property);
    }

    if (dataValidity) {
      dataValidity = checkOverlapping();
    }

    if (dataValidity) {
      dataValidity = periodParam(property);
    }

    if (dataValidity) {
      arr[index] = strHotelBlackoutDates;
    } else {
      if (property === "startdate") {
        arr[index] = { ...strHotelBlackoutDates, startdate: undefined };
      } else if (property === "enddate") {
        arr[index] = { ...strHotelBlackoutDates, enddate: undefined };
      }
    }

    strHotelBlackoutDates = {
      blackoutid: undefined,
      startdate: undefined,
      enddate: undefined,
      blackname: "",
      // minDateCalendar2: undefined,
    };
    return arr;
  };

  const nameHandler = (index, e) => {
    const arr = state.strHotelBlackoutDatesList;

    strHotelBlackoutDates = {
      ...arr[index],
      blackname: e.target.value,
    };

    arr[index] = strHotelBlackoutDates;
    state.strHotelBlackoutDatesList = arr;
    state.formChg = "Y";
    setState({
      ...state,
      strHotelBlackoutDatesList: state.strHotelBlackoutDatesList,
      formChg: state.formChg,
    });
    let validation = true;
    for (let j = 0; j < state.strHotelBlackoutDatesList.length; j++) {
      if (
        !!state.strHotelBlackoutDatesList[j].startdate ||
        !!state.strHotelBlackoutDatesList[j].enddate ||
        !!state.strHotelBlackoutDatesList[j].blackname
      ) {
        if (
          !!state.strHotelBlackoutDatesList[j].startdate &&
          !state.strHotelBlackoutDatesList[j].enddate
        ) {
          parentContext.setAlertData(true, Settings.RequiredEndDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredEndDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredEndDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !state.strHotelBlackoutDatesList[j].startdate &&
          !!state.strHotelBlackoutDatesList[j].enddate
        ) {
          parentContext.setAlertData(true, Settings.RequiredStartDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredStartDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredStartDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !!state.strHotelBlackoutDatesList[j].startdate &&
          !!state.strHotelBlackoutDatesList[j].enddate &&
          !state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredReason);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredReason;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredReason,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !state.strHotelBlackoutDatesList[j].startdate &&
          !state.strHotelBlackoutDatesList[j].enddate &&
          !!state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredStartDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredStartDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredStartDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !!state.strHotelBlackoutDatesList[j].startdate &&
          !state.strHotelBlackoutDatesList[j].enddate &&
          !!state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredEndDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredEndDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredEndDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        } else if (
          !state.strHotelBlackoutDatesList[j].startdate &&
          !!state.strHotelBlackoutDatesList[j].enddate &&
          !!state.strHotelBlackoutDatesList[j].blackname
        ) {
          parentContext.setAlertData(true, Settings.RequiredStartDate);
          appContext.blackoutAlertMsgFlag = true;
          appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
          appContext.blackoutAlertMsg = Settings.RequiredStartDate;
          appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
          appContext.setErrorMessageAlert({
            show: true,
            message: Settings.RequiredStartDate,
            type: "browserAlert",
          });
          validation = false;
          break;
        }
      }
    }
    if (validation) {
      parentContext.setAlertData(false, "");
      appContext.blackoutAlertMsgFlag = false;
      appContext.setBlackoutAlertMsgFlag(appContext.blackoutAlertMsgFlag);
      appContext.blackoutAlertMsg = "";
      appContext.setBlackoutAlertMsg(appContext.blackoutAlertMsg);
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
      appContext.setStartDateAlert(false);
      appContext.setEndDateAlert(false);
    }
    return validation;
  };

  const blackoutContext = {
    state,
    setState,
    totalDays,
    setTotalDays,
    dateDiff,
    nameHandler,
    dateChangeHandler,
    updateBlackoutData,
    blackoutData,
    validateDate,
    setData,
  };

  return (
    <BlackoutContext.Provider value={blackoutContext}>
      {props.children}
    </BlackoutContext.Provider>
  );
};

export const BlackoutContextConsumer = BlackoutContext.Consumer;
export default BlackoutContext;
