/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import React, { useState, useContext, useRef, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import moment from "moment";
import API from "../service/CpacBlackoutsApi";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
import Settings from "../static/Settings";
import { isValid } from "date-fns";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import Utils from "../../../../../../../../../common/utils/Utils";
import _ from "lodash";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const CpacBlackoutsContext = React.createContext({});
export const CpacBlackoutsContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext = useContext(AccountCenterTabsContext);
  const history = useHistory();
  const [totalDays, setTotalDays] = useState(0);
  const [state, setState] = useState({
    acctBlackChg: "N",
    maxBlackouts: 0,
    numblackouts: 0,
    waiveblackouts: "N",
    checkNumBlackouts: false,
    strHotelBlackoutDatesList: [...Array(10)].map((_, idx) => ({
      blackoutid: idx + 1,
      strStartdate: "",
      strEnddate: "",
      blackname: "",
    })),
  });
  const [previousSelectedRow, setPreviousSelectedRow] = useState(-1);
  let defaultLongDateDisplay = [...Array(10)].map((_, idx) => ({
    blackoutid: idx + 1,
    strStartdate: "",
    strEnddate: "",
    blackname: "",
  }));
  const [longDateDisplay, setLongDateDisplay] = useState(
    defaultLongDateDisplay
  );
  const [dateSeparatorKey, setDateSeparatorKey] = useState("-");
  const prevLongDateDisplay = usePrevious(longDateDisplay);
  const [originalBlackoutsDates, setOriginalBlackoutDates] = useState([]);

  let urlParms = useLocation().search;
  const hotel_accountinfoid = new URLSearchParams(urlParms).get(
    Settings.hotel_accountinfoid
  );
  const hotelId = new URLSearchParams(urlParms).get(Settings.hotelId);
  const period = new URLSearchParams(urlParms).get(Settings.Period);
  const periodstart = `${Settings.periodstart}${period}`;
  const periodend = `${Settings.periodend}${period}`;

  const accountInfoId = new URLSearchParams(urlParms).get(
    Settings.accountInfoId
  );

  const [blackoutContractDates, setBlackoutContractDates] = useState(null);
  const [changedDateFields, setChangedDateFields] = useState({
    fieldName: "",
    idx: 0,
    validationCheck: false,
  });
  const blackoutStateRef = useRef();
  blackoutStateRef.current = state;

  const setContractDates = (data) => {
    if (
      data &&
      data.accountBlackoutGroup &&
      data.accountBlackoutGroup.length &&
      data.accountBlackoutGroup.find((x) =>
        x.hotel_accountinfoarray.includes(parseInt(accountInfoId))
      )
    ) {
      setBlackoutContractDates({
        ...data.accountBlackoutGroup.find((x) =>
          x.hotel_accountinfoarray.includes(parseInt(accountInfoId))
        ),
      });
    }
  };

  const blackoutData = (res, initialLoad) => {
    initialLoad = initialLoad ? initialLoad : false;
    let strBlackoutList = initialLoad
      ? [...Array(res.numblackouts ? res.numblackouts : 10)].map((_, idx) => ({
          blackoutid: idx + 1,
          strStartdate: "",
          strEnddate: "",
          blackname: "",
        }))
      : _.cloneDeep(state.strHotelBlackoutDatesList);
    let blackoutData = res.blackoutdates.hotelBlackoutDate;
    blackoutData &&
      blackoutData.length > 0 &&
      blackoutData.map((data, index) => {
        strBlackoutList[index][Settings.blackoutid] = data.blackoutid;
        strBlackoutList[index][Settings.strStartdate] = data.shortStartdate;
        strBlackoutList[index][Settings.strEnddate] = data.shortEnddate;
        strBlackoutList[index][Settings.blackname] = data.blackname;
      });

    if (blackoutData.length !== strBlackoutList.length) {
      strBlackoutList.filter((value) => {
        if (
          !blackoutData.some((item) => item.blackoutid === value.blackoutid)
        ) {
          value[Settings.strStartdate] = "";
          value[Settings.strEnddate] = "";
          value[Settings.blackname] = "";
        }
      });
    }
    state.strHotelBlackoutDatesList = [...strBlackoutList];
    state.maxBlackouts = res?.maxblackouts;
    setState({
      ...state,
      strHotelBlackoutDatesList: state.strHotelBlackoutDatesList,
      maxBlackouts: state.maxBlackouts,
      numblackouts: blackoutData.length,
      waiveblackouts: res.waiveblackouts,
      checkNumBlackouts: res.checkNumBlackouts,
      acctBlackChg: "N",
    });
    let longDateDisplayArr = _.cloneDeep(strBlackoutList);
    setLongDateDisplay([...longDateDisplayArr]);
    setOriginalBlackoutDates(_.cloneDeep(state.strHotelBlackoutDatesList));
    setDateSeparatorKey("-");

    const total = dateDiff(strBlackoutList);
    setTotalDays(total);
    setTotalNumBlackoutDaysBackup(total)
  };

  interface Blackout {
    blackoutid: number;
    startdate: string;
    enddate: string;
    blackname: string;
  }

  useEffect(() => {
    sessionStorage.setItem(
      "blackoutDataAccCenter",
      JSON.stringify(state.strHotelBlackoutDatesList)
    );
  }, [state.strHotelBlackoutDatesList]);

  useEffect(() => {
    if (totalDays) {
      sessionStorage.setItem("totalDays", totalDays.toString());
    }
  }, [totalDays]);

  useEffect(() => {
    sessionStorage.setItem("blackoutCPACWaiveBlackout", state.waiveblackouts);
  }, [state.waiveblackouts]);

  const updateBlackoutData = () => {
    return new Promise((resolve, reject) => {
      const stateData = blackoutStateRef.current
        ? { ...blackoutStateRef.current }
        : { ...state };
      let strBlackoutList: Blackout[] = [];
      if(stateData.maxBlackouts == undefined || stateData.maxBlackouts == null || stateData.maxBlackouts == "") {
        stateData.maxBlackouts = state.maxBlackouts;
      }
      let data = JSON.parse(sessionStorage.getItem("blackoutDataAccCenter"));
      let waiveBlackoutData = sessionStorage.getItem(
        "blackoutCPACWaiveBlackout"
      );
      if (
        sessionStorage.getItem("ClickedTabs") == "null" ||
        sessionStorage.getItem("ClickedTabs") == "blackouts"
      ) {
        waiveBlackoutData =
          waiveBlackoutData !== undefined && waiveBlackoutData !== null
            ? waiveBlackoutData === "X"
              ? "Y"
              : waiveBlackoutData
            : state.waiveblackouts === "X"
            ? "Y"
            : state.waiveblackouts;
      } else {
        waiveBlackoutData =
          waiveBlackoutData !== undefined && waiveBlackoutData !== null
            ? waiveBlackoutData
            : state.waiveblackouts;
      }
      data &&
        data.length > 0 &&
        data.forEach((blackout) => {
          blackout.strEnddate = blackout.strEnddate ? blackout.strEnddate : "";
          blackout.strStartdate = blackout.strStartdate
            ? blackout.strStartdate
            : "";
          const startDateValid = checkIsValidDate(blackout.strStartdate);
          const endDateValid = checkIsValidDate(blackout.strEnddate);
          if (startDateValid && endDateValid) {
            let blackoutData: Blackout = {
              blackoutid: null,
              startdate: null,
              enddate: null,
              blackname: null,
            };
            blackoutData.blackoutid = blackout.blackoutid;
            blackoutData.blackname = blackout.blackname;
            blackoutData.startdate =
              blackout.strStartdate === ""
                ? null
                : moment(blackout.strStartdate).format(
                    Settings.shortDateFormat
                  );
            blackoutData.enddate =
              blackout.strEnddate === ""
                ? null
                : moment(blackout.strEnddate).format(Settings.shortDateFormat);
            strBlackoutList.push(blackoutData);
          } else {
            let blackoutData: Blackout = {
              blackoutid: null,
              startdate: null,
              enddate: null,
              blackname: null,
            };
            blackoutData.blackoutid = blackout.blackoutid;
            blackoutData.blackname = blackout.blackname;
            blackoutData.startdate =
              blackout.strStartdate === "" ? null : blackout.strStartdate;
            blackoutData.enddate =
              blackout.strEnddate === "" ? null : blackout.strEnddate;
            strBlackoutList.push(blackoutData);
          }
        });
      if(strBlackoutList?.length > 0) {
        API.postBlackoutData(
          stateData,
          totalDays,
          hotel_accountinfoid,
          waiveBlackoutData,
          strBlackoutList,
        ).then((res) => {
          resolve(res);
        });
      } else if(strBlackoutList?.length == 0 && stateData?.acctBlackChg == "Y") {
        API.postBlackoutData(
          stateData,
          totalDays,
          hotel_accountinfoid,
          waiveBlackoutData
        ).then((res) => {
          resolve(res);
        });
      } else {
        resolve("completed");
      }
    });
  };

  let strHotelBlackoutDates = {
    blackoutid: undefined,
    strStartdate: undefined,
    strEnddate: undefined,
    blackname: "",
  };

  let strLongDateDisplay = {
    blackoutid: undefined,
    strStartdate: undefined,
    strEnddate: undefined,
    blackname: "",
  };

  const dateChangeHandler = (index, property, e) => {
    const re = Settings.dateFormat;

    if (e.target.value === "" || re.test(e.target.value)) {
      let arr = state.strHotelBlackoutDatesList;
      switch (property) {
        case Settings.strStartdate:
          arr[index].strStartdate = e.target.value;
          break;
        case Settings.strEnddate:
          arr[index].strEnddate = e.target.value;
          break;
      }

      setState({
        ...state,
        strHotelBlackoutDatesList: [...arr],
        acctBlackChg: "Y",
      });

      setChangedDateFields({
        ...changedDateFields,
        fieldName: property,
        idx: index,
        validationCheck: true,
      });

      checkReason();
      setBlackoutDataBackup([...arr]);
    }
  };

  //adding backup of blackout state data for tab switch event
  const setBlackoutDataBackup = (arr) => {
    let totalAPIData = sessionStorage.getItem("totalCPACBlackoutAPIData")? JSON.parse(sessionStorage.getItem("totalCPACBlackoutAPIData")) : null;
    if(totalAPIData && totalAPIData != null) {
      let newArr = arr.map((item) => {
        return {
          shortStartdate: item[Settings.strStartdate],
          shortEnddate: item[Settings.strEnddate],
          blackoutid: item[Settings.blackoutid],
          blackname: item[Settings.blackname]
        }
      })
      totalAPIData.blackoutdates.hotelBlackoutDate = [...newArr];
      sessionStorage.setItem("totalCPACBlackoutAPIData", JSON.stringify(totalAPIData));
    }
  }

  const setTotalNumBlackoutDaysBackup = (days) => {
    let totalAPIData = sessionStorage.getItem("totalCPACBlackoutAPIData")? JSON.parse(sessionStorage.getItem("totalCPACBlackoutAPIData")) : null;
    if(totalAPIData && totalAPIData != null) {
      totalAPIData.blackoutdates.totalNumBlackoutDays = days;
      sessionStorage.setItem("totalCPACBlackoutAPIData", JSON.stringify(totalAPIData));
    }
  }

  const setWaiveBlackoutBackup = (waiveBlackout) => {
    let totalAPIData = sessionStorage.getItem("totalCPACBlackoutAPIData")? JSON.parse(sessionStorage.getItem("totalCPACBlackoutAPIData")) : null;
    if(totalAPIData && totalAPIData != null) {
      totalAPIData.waiveblackouts = waiveBlackout;
      sessionStorage.setItem("totalCPACBlackoutAPIData", JSON.stringify(totalAPIData));
    }
  }

  const checkReason = () => {
    let arr = [...state.strHotelBlackoutDatesList];
    let bOK = true;
    for (let index = 0; index < arr.length; index++) {
      if (
        ((arr[index].strEnddate !== "" && arr[index].strEnddate !== null) ||
          (arr[index].strStartdate !== "" &&
            arr[index].strStartdate !== null)) &&
        (arr[index].blackname == "" || arr[index].blackname == null) &&
        appContext?.user?.isHotelUser
      ) {
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.alertMessage.enterBlackoutName,
          type: "browserAlert",
        });
        bOK = false;
        break;
      }
    }
    if (bOK) {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };

  const validateDate = (strDate: string, iValidYear?: number) => {
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
      alert(
        `${sError}${strDate} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
      return false;
    }
    return true;
  };

  const checkIsValidDate = (strDate) => {
    let bError = false;

    if (strDate != "") {
      const datearray = strDate?.split("/");
      if (datearray.length != 3) bError = true;
    }
    return !bError;
  };

  const dateValidationHandler = (index, property, e) => {
    let arr = state.strHotelBlackoutDatesList;
    checkEmptyDate(property, e, arr, index);
    let longDateDisplayArr = _.cloneDeep(longDateDisplay);
    const validDate = validateDate(e.target.value, parseInt(period));
    if (validDate) {
      switch (property) {
        case Settings.strStartdate:
          arr[index].strStartdate =
            e.target.value !== "" &&
            e.target.value !== undefined &&
            e.target.value !== null
              ? Utils.setDatewithYYYY(e.target.value)
              : e.target.value;
          longDateDisplayArr[index].strStartdate =
            e.target.value !== "" &&
            e.target.value !== undefined &&
            e.target.value !== null
              ? Utils.setDatewithYYYY(e.target.value)
              : e.target.value;
          strHotelBlackoutDates = {
            ...arr[index],
            strStartdate:
              e.target.value !== "" &&
              e.target.value !== undefined &&
              e.target.value !== null
                ? Utils.setDatewithYYYY(e.target.value)
                : e.target.value,
          };
          strLongDateDisplay = {
            ...longDateDisplayArr[index],
            strStartdate:
              e.target.value !== "" &&
              e.target.value !== undefined &&
              e.target.value !== null
                ? Utils.setDatewithYYYY(e.target.value)
                : e.target.value,
          };
          break;
        case Settings.strEnddate:
          arr[index].strEnddate =
            e.target.value !== "" &&
            e.target.value !== undefined &&
            e.target.value !== null
              ? Utils.setDatewithYYYY(e.target.value)
              : e.target.value;
          longDateDisplayArr[index].strEnddate =
            e.target.value !== "" &&
            e.target.value !== undefined &&
            e.target.value !== null
              ? Utils.setDatewithYYYY(e.target.value)
              : e.target.value;
          strHotelBlackoutDates = {
            ...arr[index],
            strEnddate:
              e.target.value !== "" &&
              e.target.value !== undefined &&
              e.target.value !== null
                ? Utils.setDatewithYYYY(e.target.value)
                : e.target.value,
          };
          strLongDateDisplay = {
            ...longDateDisplayArr[index],
            strEnddate:
              e.target.value !== "" &&
              e.target.value !== undefined &&
              e.target.value !== null
                ? Utils.setDatewithYYYY(e.target.value)
                : e.target.value,
          };
          break;
      }
      const res = validations(index, property);
      arr = res.arr;
      longDateDisplayArr = res.longDateDisplayArr;
      setState({
        ...state,
        strHotelBlackoutDatesList: [...arr],
      });
      setLongDateDisplay([...longDateDisplayArr]);
      const total = dateDiff(arr);
      setTotalDays(total);
      setBlackoutDataBackup([...arr]);
      setTotalNumBlackoutDaysBackup(total);
    } else {
      const strDateValid = isValid(e.target.value);
      if (strDateValid) {
        if (property === "strStartdate") {
          arr[index].strStartdate = e.target.value;
          strHotelBlackoutDates = {
            ...arr[index],
            strStartdate: e.target.value,
          };
        } else if (property === "strEnddate") {
          arr[index].strEnddate = e.target.value;
          strHotelBlackoutDates = {
            ...arr[index],
            strEnddate: e.target.value,
          };
        }
      } else {
        if (property === "strStartdate") {
          arr[index].strStartdate = null;
          strHotelBlackoutDates = {
            ...arr[index],
            strStartdate: null,
          };
        } else if (property === "strEnddate") {
          const isValid = checkIsValidDate(e.target.value);
          arr[index].strEnddate = isValid ? null : e.target.value;
          strHotelBlackoutDates = {
            ...arr[index],
            strEnddate: isValid ? null : e.target.value,
          };
        }
      }
      setState({
        ...state,
        strHotelBlackoutDatesList: [...arr],
      });
      setBlackoutDataBackup([...arr]);
    }

    if (
      originalBlackoutsDates[index][property] == arr[index][property] &&
      dateSeparatorKey == "-"
    ) {
      setDateSeparatorKey("-");
    } else {
      setDateSeparatorKey("to");
    }
    setPreviousSelectedRow(index);
    checkReason();
  };

  const checkEmptyDate = (property, e, arr, index) => {
    if (property === "strStartdate") {
      arr[index].strStartdate = null;
      strHotelBlackoutDates = {
        ...arr[index],
        strStartdate: null,
      };
      if (
        appContext.user.isHotelUser &&
        (e.target.value == "" || e.target.value == "") &&
        arr[index].strEnddate !== null &&
        arr[index].strEnddate !== ""
      ) {
        if (
          changedDateFields &&
          changedDateFields.fieldName == property &&
          changedDateFields.idx == index &&
          changedDateFields.validationCheck == true
        ) {
          setChangedDateFields({
            ...changedDateFields,
            validationCheck: false,
          });
        }
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.alertMessage.enterStartDate,
          type: "browserAlert",
        });
      } else {
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    } else if (property === "strEnddate") {
      strHotelBlackoutDates = {
        ...arr[index],
        strEnddate: null,
      };
      if (
        appContext.user.isHotelUser &&
        (e.target.value == "" || e.target.value == "") &&
        arr[index].strStartdate !== null &&
        arr[index].strStartdate !== ""
      ) {
        if (
          changedDateFields &&
          changedDateFields.fieldName == property &&
          changedDateFields.idx == index &&
          changedDateFields.validationCheck == true
        ) {
          setChangedDateFields({
            ...changedDateFields,
            validationCheck: false,
          });
        }
        appContext.setErrorMessageAlert({
          show: true,
          message: Settings.alertMessage.enterEndDate,
          type: "browserAlert",
        });
      } else {
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "browserAlert",
        });
      }
    }
  };
  const dateDiff = (blackoutArr?) => {
    blackoutArr = blackoutArr ? blackoutArr : state.strHotelBlackoutDatesList;
    let loopCount = 0;
    let numberOfDays = 0;
    const arr = state.strHotelBlackoutDatesList;

    for (loopCount = 0; loopCount < arr.length; loopCount++) {
      if (
        arr[loopCount].strEnddate != null &&
        arr[loopCount].strEnddate !== "" &&
        arr[loopCount].strStartdate != null &&
        arr[loopCount].strStartdate !== ""
      ) {
        numberOfDays +=
          moment(arr[loopCount].strEnddate).diff(
            moment(arr[loopCount].strStartdate),
            "days"
          ) + 1;
      } else {
        continue;
      }
    }
    maxBlackoutCheck(blackoutArr, numberOfDays);

    return numberOfDays;
  };

  const maxBlackoutCheck = (blackoutArr, numberOfDays, waiveBlackout?) => {
    waiveBlackout = waiveBlackout ? waiveBlackout : state.waiveblackouts;
    if (waiveBlackout == "N" && numberOfDays > state.maxBlackouts) {
      appContext.hotelPricingBlackoutmsg = `Warning!! You have entered ${numberOfDays} blackout days.\n\nThe total number of blackout days for this account must be less than or equal to ${state.maxBlackouts}.`;
      appContext.setHotelPricingBlackoutmsg(appContext.hotelPricingBlackoutmsg);
    } else {
      appContext.hotelPricingBlackoutmsg = "";
      appContext.setHotelPricingBlackoutmsg(appContext.hotelPricingBlackoutmsg);
    }

    if (!appContext?.user?.isPASAdmin && !appContext?.user?.isReadOnly) {
      const hotelSpecificInfo = JSON.parse(
        localStorage.getItem("hotelAccountSpecificData")
      );

      if (blackoutArr.length > 0) {
        let numblackoutperiods = blackoutArr.filter(
          (f) => !!f.strStartdate && !!f.strEnddate
        );
        if (waiveBlackout == "N" &&
          (hotelSpecificInfo?.maxblackoutperiod != 0 &&
            hotelSpecificInfo?.maxblackoutperiod != null) &&
          numblackoutperiods.length > hotelSpecificInfo?.maxblackoutperiod
        ) {
          appContext?.setMaxBlackoutPeriodAlert(
            `Warning!!  You have entered ${numblackoutperiods.length}  blackout periods.\n\nThe total number of blackout periods for this account must be less than or equal to  ${hotelSpecificInfo?.maxblackoutperiod}.`
          );
        } else {
          appContext?.setMaxBlackoutPeriodAlert("");
        }
      } else {
        appContext?.setMaxBlackoutPeriodAlert("");
      }
    } else {
      appContext?.setMaxBlackoutPeriodAlert("");
    }
  }

  const emptyDateOrBlackoutNameValidate = (index) => {
    let arr = state.strHotelBlackoutDatesList;
    if (index !== previousSelectedRow) {
      if (
        previousSelectedRow > -1 &&
        arr[previousSelectedRow].strStartdate !== "" &&
        arr[previousSelectedRow].strStartdate !== undefined &&
        arr[previousSelectedRow].strStartdate !== null &&
        arr[previousSelectedRow].strEnddate === ""
      ) {
        alert(Settings.alertMessage.enterEndDate);
        document
          .getElementById(
            `hotelBlackoutDatesList[${previousSelectedRow}].strEnddate`
          )
          .focus();
      } else if (
        previousSelectedRow > -1 &&
        arr[previousSelectedRow].strEnddate !== "" &&
        arr[previousSelectedRow].strEnddate !== undefined &&
        arr[previousSelectedRow].strEnddate !== null &&
        arr[previousSelectedRow].strStartdate === ""
      ) {
        alert(Settings.alertMessage.enterStartDate);
        document
          .getElementById(
            `hotelBlackoutDatesList[${previousSelectedRow}].strStartdate`
          )
          .focus();
      }
    }
  };

  const isValidDate = (property) => {
    const startDate = strHotelBlackoutDates.strStartdate;
    const endDate = strHotelBlackoutDates.strEnddate;
    if (
      (property === Settings.strEnddate && startDate != null) ||
      (property === Settings.strStartdate && endDate != null)
    ) {
      if (moment(endDate).valueOf() < moment(startDate).valueOf()) {
        alert(Settings.alertMessage.endDateOnAfterStartDate);
        return false;
      }
    }
    return true;
  };

  const checkBetween = (property) => {
    let loopCount = 0;
    let arr = state.strHotelBlackoutDatesList;
    for (loopCount = 0; loopCount < arr.length; loopCount++) {
      if (
        strHotelBlackoutDates.blackoutid - 1 === loopCount ||
        arr[loopCount].strStartdate == null ||
        arr[loopCount].strEnddate == null
      ) {
        continue;
      } else {
        if (property === Settings.strStartdate) {
          if (
            moment(strHotelBlackoutDates.strStartdate).valueOf() >=
              moment(arr[loopCount].strStartdate).valueOf() &&
            moment(strHotelBlackoutDates.strStartdate).valueOf() <=
              moment(arr[loopCount].strEnddate).valueOf()
          ) {
            alert(Settings.alertMessage.startDateMustNotBetween);
            return false;
          }
        } else if (property === "strEnddate") {
          if (
            moment(strHotelBlackoutDates.strEnddate).valueOf() >=
              moment(arr[loopCount].strStartdate).valueOf() &&
            moment(strHotelBlackoutDates.strEnddate).valueOf() <=
              moment(arr[loopCount].strEnddate).valueOf()
          ) {
            alert(Settings.alertMessage.endDateMustNotBetween);
            return false;
          }
        }
      }
    }
    return true;
  };

  const checkOverlapping = () => {
    let loopCount = 0;
    let arr = state.strHotelBlackoutDatesList;
    if (
      strHotelBlackoutDates.strStartdate == null ||
      strHotelBlackoutDates.strEnddate == null
    ) {
      return true;
    }
    for (loopCount = 0; loopCount < arr.length; loopCount++) {
      if (
        strHotelBlackoutDates.blackoutid - 1 === loopCount ||
        arr[loopCount].strStartdate == null ||
        arr[loopCount].strEnddate == null
      ) {
        continue;
      } else {
        if (
          (moment(strHotelBlackoutDates.strStartdate).valueOf() >=
            moment(arr[loopCount].strStartdate).valueOf() &&
            moment(strHotelBlackoutDates.strEnddate).valueOf() <=
              moment(arr[loopCount].strEnddate).valueOf()) ||
          (moment(strHotelBlackoutDates.strStartdate).valueOf() <=
            moment(arr[loopCount].strStartdate).valueOf() &&
            moment(strHotelBlackoutDates.strEnddate).valueOf() >=
              moment(arr[loopCount].strEnddate).valueOf())
        ) {
          alert(Settings.alertMessage.dateOverlap);
          strHotelBlackoutDates = {
            ...strHotelBlackoutDates,
            strEnddate: undefined,
            strStartdate: undefined,
          };
          return false;
        }
      }
    }
    return true;
  };

  const commonDates = (d) => {
    let cStartDate = blackoutContractDates?.contractstartstr
      ? new Date(blackoutContractDates?.contractstartstr).setHours(0, 0, 0, 0)
      : new Date(periodstart).setHours(0, 0, 0, 0);
    let cEndDate = blackoutContractDates?.contractendstr
      ? new Date(blackoutContractDates?.contractendstr).setHours(0, 0, 0, 0)
      : new Date(periodend).setHours(0, 0, 0, 0);
    let sDate = new Date(d).setHours(0, 0, 0, 0);

    return { cStartDate, cEndDate, sDate };
  };

  const startDateValidation = (strDate) => {
    const { cStartDate, cEndDate, sDate } = commonDates(strDate);
    if (sDate < cStartDate) {
      alert(
        `${Settings.alertMessage.startDateOnOrAfter} (${moment(
          cStartDate
        ).format(Settings.shortDateFormat)})`
      );
      return false;
    }

    if (sDate > cEndDate) {
      alert(
        `${Settings.alertMessage.startDateOnOrBefore} (${moment(
          cEndDate
        ).format(Settings.shortDateFormat)})`
      );
      return false;
    }

    return true;
  };

  const endDateValidation = (endDate) => {
    const { cStartDate, cEndDate, sDate } = commonDates(endDate);

    if (sDate > cEndDate || sDate < cStartDate) {
      alert(
        `${Settings.alertMessage.endDateOnOrAfter} (${moment(cEndDate).format(
          Settings.shortDateFormat
        )})`
      );
      return false;
    }

    return true;
  };

  const periodParam = (property) => {
    switch (property) {
      case Settings.strEnddate:
        if (strHotelBlackoutDates.strEnddate != null) {
          return endDateValidation(strHotelBlackoutDates.strEnddate);
        }
        break;
      case Settings.strStartdate:
        if (strHotelBlackoutDates.strStartdate != null) {
          return startDateValidation(strHotelBlackoutDates.strStartdate);
        }
        break;
    }
    return true;
  };

  const checkOnOrAfterOriginalDate = (property, index) => {
    switch (property) {
      case Settings.strEnddate:
        let strorigEndDate = originalBlackoutsDates[index]?.strEnddate;
        if (strHotelBlackoutDates.strEnddate != null) {
          if (
            !Utils.isOnOrAfterDate(
              strorigEndDate,
              strHotelBlackoutDates.strEnddate
            )
          ) {
            if (
              changedDateFields &&
              changedDateFields.fieldName == property &&
              changedDateFields.idx == index &&
              changedDateFields.validationCheck == true
            ) {
              alert(
                Settings.alertMessage.endDateOnOrBeforeOriginalDate +
                  strorigEndDate +
                  ")"
              );
              setChangedDateFields({
                ...changedDateFields,
                validationCheck: false,
              });
            }
            return false;
          }
        }
        break;
      case Settings.strStartdate:
        let strorigStartDate = originalBlackoutsDates[index]?.strStartdate;
        if (
          strHotelBlackoutDates.strStartdate != null &&
          strorigStartDate != strHotelBlackoutDates.strStartdate
        ) {
          if (
            !Utils.isOnOrAfterDate(
              strHotelBlackoutDates.strStartdate,
              strorigStartDate
            )
          ) {
            if (
              changedDateFields &&
              changedDateFields.fieldName == property &&
              changedDateFields.idx == index &&
              changedDateFields.validationCheck == true
            ) {
              alert(
                Settings.alertMessage.startDateOnOrAfterOriginalDate +
                  strorigStartDate +
                  ")"
              );
              setChangedDateFields({
                ...changedDateFields,
                validationCheck: false,
              });
            }
            return false;
          }
        }
        break;
    }
    return true;
  };

  const validations = (index, property) => {
    let arr = state.strHotelBlackoutDatesList;
    let longDateDisplayArr = _.cloneDeep(longDateDisplay);
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let dataValidity: boolean = true;
    let checkOrigDates = false;

    dataValidity = periodParam(property);
    if (dataValidity) {
      dataValidity = isValidDate(property);
    }
    if (dataValidity) {
      dataValidity = checkBetween(property);
    }
    if (dataValidity) {
      dataValidity = checkOverlapping();
    }
    if (dataValidity && state.checkNumBlackouts) {
      dataValidity = checkOnOrAfterOriginalDate(property, index);
      if (!dataValidity) {
        checkOrigDates = true;
      }
    }

    if (dataValidity) {
      arr[index] = strHotelBlackoutDates;
      longDateDisplayArr[index] = strLongDateDisplay;
    } else {
      if (property === Settings.strStartdate) {
        if (checkOrigDates) {
          arr[index] = {
            ...strHotelBlackoutDates,
            strStartdate: originalBlackoutsDates[index]?.strStartdate,
          };
        } else {
          arr[index] = { ...strHotelBlackoutDates, strStartdate: undefined };
        }
        longDateDisplayArr[index] = {
          ...strLongDateDisplay,
          strStartdate: prevLongDateDisplay[index]?.strStartdate,
        };
      } else if (property === Settings.strEnddate) {
        if (checkOrigDates) {
          arr[index] = {
            ...strHotelBlackoutDates,
            strEnddate: originalBlackoutsDates[index]?.strEnddate,
          };
        } else {
          arr[index] = { ...strHotelBlackoutDates, strEnddate: undefined };
        }
        longDateDisplayArr[index] = {
          ...strLongDateDisplay,
          strEnddate: prevLongDateDisplay[index]?.strEnddate,
        };
      }
    }

    strHotelBlackoutDates = {
      blackoutid: undefined,
      strStartdate: undefined,
      strEnddate: undefined,
      blackname: "",
    };
    strLongDateDisplay = {
      blackoutid: undefined,
      strStartdate: undefined,
      strEnddate: undefined,
      blackname: "",
    };
    return { arr: arr, longDateDisplayArr: longDateDisplayArr };
  };

  const nameHandler = (index, e) => {
    let arr = state.strHotelBlackoutDatesList;
    let longDateDisplayArr = longDateDisplay;

    strHotelBlackoutDates = {
      ...arr[index],
      blackname: e.target.value,
    };
    strLongDateDisplay = {
      ...longDateDisplayArr[index],
      blackname: e.target.value,
    };

    arr[index] = strHotelBlackoutDates;
    arr[index].blackname = e.target.value;
    longDateDisplayArr[index] = strLongDateDisplay;
    setState({
      ...state,
      strHotelBlackoutDatesList: [...arr],
      acctBlackChg: "Y",
    });
    setLongDateDisplay([...longDateDisplayArr]);
    checkReason();
    setBlackoutDataBackup([...arr]);
  };

  const updateWaiveBlackoutsHandler = (e) => {
    let updatedWaiveBlackouts = e.target.value === "N" ? "Y" : "N";
    if (updatedWaiveBlackouts == "Y") {
      updatedWaiveBlackouts = "X";
    }
    //Adding back up of black out data if waive blackout is checked
    if (e.target.checked) {
      const blackOutdataBackup = JSON.stringify(
        state.strHotelBlackoutDatesList
      );
      sessionStorage.setItem("blackOutdataBackup", blackOutdataBackup);
      sessionStorage.setItem("totalDays", totalDays.toString());
      sessionStorage.setItem(
        "longDateDisplay",
        JSON.stringify(longDateDisplay)
      );
      setState({
        ...state,
        waiveblackouts: updatedWaiveBlackouts,
        acctBlackChg: "Y",
      });
      setWaiveBlackoutBackup(updatedWaiveBlackouts);
      maxBlackoutCheck(state.strHotelBlackoutDatesList, totalDays,updatedWaiveBlackouts);
    } else {
      const blackOutdataBackup = JSON.parse(
        sessionStorage.getItem("blackOutdataBackup")
      );
      let sessionTotalDays = sessionStorage.getItem("totalDays");
      const totalDaysNew =
        sessionTotalDays !== null &&
        sessionTotalDays !== "" &&
        sessionTotalDays !== undefined
          ? parseInt(sessionStorage.getItem("totalDays"))
          : totalDays;
      const longDateDataBackup = sessionStorage.getItem("longDateDisplay") ? JSON.parse(
        sessionStorage.getItem("longDateDisplay")
      ) : longDateDisplay;
      setState({
        ...state,
        strHotelBlackoutDatesList: blackOutdataBackup
          ? blackOutdataBackup
          : state.strHotelBlackoutDatesList,
        waiveblackouts: updatedWaiveBlackouts,
        acctBlackChg: "Y",
      });
      setTotalDays(totalDaysNew);
      setTotalNumBlackoutDaysBackup(totalDaysNew);
      setLongDateDisplay(
        longDateDataBackup ? longDateDataBackup : longDateDisplay
      );
      setWaiveBlackoutBackup(updatedWaiveBlackouts);
      const strHotelBlackoutDatesListCopy =  blackOutdataBackup
      ? blackOutdataBackup
      : state.strHotelBlackoutDatesList
      maxBlackoutCheck(strHotelBlackoutDatesListCopy, totalDaysNew, updatedWaiveBlackouts);
    }
  };

  const onBlurName = (e) => {
    checkReason();
  };

  const cpacBlackoutsContext = {
    state,
    setState,
    totalDays,
    setTotalDays,
    dateDiff,
    nameHandler,
    dateChangeHandler,
    updateBlackoutData,
    blackoutData,
    dateValidationHandler,
    updateWaiveBlackoutsHandler,
    emptyDateOrBlackoutNameValidate,
    validateDate,
    longDateDisplay,
    setLongDateDisplay,
    checkIsValidDate,
    dateSeparatorKey,
    setDateSeparatorKey,
    blackoutContractDates,
    setBlackoutContractDates,
    setContractDates,
    onBlurName,
  };
  return (
    <CpacBlackoutsContext.Provider value={cpacBlackoutsContext}>
      {props.children}
    </CpacBlackoutsContext.Provider>
  );
};
export const CpacBlackoutsContextConsumer = CpacBlackoutsContext.Consumer;
export default CpacBlackoutsContext;
