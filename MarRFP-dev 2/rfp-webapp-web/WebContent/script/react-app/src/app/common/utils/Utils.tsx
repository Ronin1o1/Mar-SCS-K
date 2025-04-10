import { startOfToday } from "date-fns";
import moment from "moment";

const numMilliSecperDay = 86400000;
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

function ConvertStrToDate(strDate) {
  //convert the string date into a date object
  let imonth, iday, iyear;
  let theDate;
  const dateArray2 = strDate?.split("/");
  imonth = parseInt(dateArray2[0], 10) - 1;
  iday = parseInt(dateArray2[1], 10);
  iyear = parseInt(dateArray2[2], 10);
  if (iyear < 100) {
    if (iyear > 90) iyear += 1900;
    else iyear += 2000;
  }
  theDate = new Date(iyear, imonth, iday);
  return theDate;
}

const Utils = {
  clearCookie: (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
  getCookie: (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length > 1)
      return decodeURIComponent(parts.pop().split(";").shift());
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  clearCookieCode: () => {
    console.log("in clear cookie");

    document.cookie = "CODE" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  },
  isDate: (strDate: string, iValidYear?: number) => {
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
      alert(
        `${sError}${strDate} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
      return false;
    }
    return true;
  },
  convertStrToDate: (strDate: string) => {
    //convert the string date into a date object
    const dateArray = strDate?.split("/");
    if (dateArray && dateArray.length > 0) {
      const imonth = parseInt(dateArray[0], 10) - 1;
      const iday = parseInt(dateArray[1], 10);
      let iyear = parseInt(dateArray[2], 10);
      if (iyear < 100) {
        if (iyear > 90) iyear += 1900;
        else iyear += 2000;
      }
      const theDate = new Date(iyear, imonth, iday);
      return theDate;
    } else {
      return null;
    }
  },
  calcNumDays: (strStart: string, strEnd: string) => {
    //calculate the number of days including the start and end day
    let idays = 0;

    if (strEnd == null || strEnd == "") return idays;
    else if (strStart == null || strStart == "") return idays;
    const endDate = Utils.convertStrToDate(strEnd);
    const startDate = Utils.convertStrToDate(strStart);
    const iMilliSec = endDate.getTime() - startDate.getTime();
    //Round to account for daylight savings time.  We don't care about partial days
    idays = Math.round(iMilliSec / numMilliSecperDay);
    return idays + 1;
  },
  checkDate: (strDate: string) => {
    if (Utils.isDate(strDate)) return true;
    return false;
  },
  checkExpireDate: (expireDate: string, startDate: string) => {
    if (Utils.checkDate(expireDate)) {
      if (startDate != "") {
        const numdays = Utils.calcNumDays(startDate, expireDate);
        if (numdays > 90) {
          alert(
            "The message expiration date must be within 90 days of the message date."
          );
          return false;
        } else return true;
      } else return true;
    }

    return false;
  },
  checkMaxChar: (value: string, maxChar: number) => {
    let len = value.length;

    if (event.type === "keypress") {
      len = len + 1;
    }
    if (len > maxChar) {
      alert(`You are allowed to enter up to ${maxChar} characters.`);
      event.preventDefault();
      return false;
    }
    return true;
  },
  isDateNumber: (val: string) => {
    const res = val.match(/^[\d\/]+$/);
    if (res == null) {
      return false;
    }
    return true;
  },
  calc: (num) => {
    if (num <= 22) {
      return parseInt(num);
    } else {
      const number = num.toString();
      let curr = 0;
      for (let i = 0; i < number.length; i++) {
        curr += parseInt(number.charAt(i));
      }
      return curr;
    }
  },
  getDate: (strDate: any) => {
    const dateArray = strDate.split(" ");
    const month_name = dateArray[0];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let strMnth;
    let iyear = parseInt(dateArray[2]);
    if (iyear < 100) {
      if (iyear > 90) iyear += 1900;
      else iyear += 2000;
    }

    const month_num = months.indexOf(month_name) + 1;
    if (month_num < 10) {
      strMnth = "0" + month_num;
    } else {
      strMnth = month_num;
    }
    const mydate = strMnth + "/" + dateArray[1].replace(",", "") + "/" + iyear;

    return mydate;
  },
  getLongDate: (strDate: any) => {
    const dateArray = strDate.split(" ");
    let date;
    if (dateArray.length > 3) {
      date = dateArray[0] + " " + dateArray[1] + "    " + dateArray[2];
    } else {
      date = strDate;
    }

    return date;
  },
  getShortDate: (strDate: any) => {
    const newDate = new Date(strDate);
    let month;
    let date;
    const dd = newDate.getDate();
    if (dd < 10) {
      date = "0" + dd;
    } else {
      date = dd;
    }

    const mm = newDate.getMonth() + 1;
    if (mm < 10) {
      month = "0" + mm;
    } else {
      month = mm;
    }
    const year = newDate.getFullYear();

    const shortDate = month + "/" + date + "/" + year;
    return shortDate;
  },

  getFormattedDate: (strDate: any) => {
    const date = strDate.replace(/[^\x00-\x7F]/g, "");
    const parts = date.split("/");

    let month_num = parts[0];

    const months = [
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let iyear = parseInt(parts[2]);
    if (iyear < 100) {
      if (iyear > 90) iyear += 1900;
      else iyear += 2000;
    }
    month_num = parseInt(month_num);
    month_num = month_num - 1;
    const selectedMonthName = months[month_num];
    /** in L3 site all page the date would be single digit only,
     *  as part of defect# 5757 fixed this issue */
    const mydate =
      selectedMonthName + " " + parseInt(parts[1]) + "," + " " + iyear;
    return mydate;
  },
  dateConversionToLocale: (date) => {
    const unixTimestamp = parseInt(date);
    const dateObject = new Date(unixTimestamp);
    let formattedDt = dateObject.toLocaleString("en-US", {
      timeZoneName: "short",
    }); //2019-12-9 10:30:15
    formattedDt = formattedDt.split(" ")[0];
    formattedDt = Utils.getFormattedDate(formattedDt);
    return formattedDt;
  },
  getCurrentDate: () => {
    const today = new Date();
    let strDt;
    let strDate;
    let strMnth;
    const dd = today.getDate();

    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      strDate = "0" + dd;
    } else {
      strDate = dd;
    }

    if (mm < 10) {
      strMnth = "0" + mm;
    } else {
      strMnth = mm;
    }
    strDt = strMnth + "/" + strDate + "/" + yyyy;
    return strDt;
  },
  fnkychars_onkeypress: (e, max_len) => {
    const charCode = e.charCode ? e.charCode : null;

    if (charCode == undefined) return true;

    const data = e.target.value;
    let len = data.length;
    if (e.type === "keypress") {
      len = len + 1;
    }
    if (
      !(
        charCode == 32 ||
        charCode == 34 ||
        (charCode > 38 && charCode < 60) ||
        (data > -1 && charCode > 62 && charCode < 65) ||
        (charCode > 64 && charCode < 91) ||
        (data > -1 && charCode > 90 && charCode < 97) ||
        (charCode > 96 && charCode < 124) ||
        charCode == 125
      )
    ) {
      e.preventDefault();
      return false;
    }

    if (len > max_len) {
      alert(`You are allowed to enter up to ${max_len} characters.`);
      e.preventDefault();
      return false;
    }
    return true;
  },
  checklenchar_onpaste_quest: (event, maxChars) => {
    let data = event.target.value;
    data = data + event.clipboardData.getData("Text");

    const totalDataLen = data.length;
    if (totalDataLen > maxChars) {
      alert(`You are allowed to enter up to ${maxChars} characters.`);
      event.preventDefault();
      return false;
    }
    return true;
  },
  DateNumberOnly_onkeypress: (e) => {
    const charCode = e.charCode ? e.charCode : null;

    if (!(charCode > 46 && charCode < 58 && charCode != 8)) {
      e.preventDefault();
    }
  },
  DateNumberOnly: (e) => {
    const charCode = e.charCode ? e.charCode : null;

    if (!(charCode > 46 && charCode < 58 && charCode != 8)) {
      e.preventDefault();
    }
  },

  EmailSafeCharsOnly_onkeypress: (e) => {
    const charCode = e.charCode ? e.charCode : null;
    if (charCode === 32) {
      e.preventDefault();
      return false;
    }
    return true;
  },

  NumberOnly_onkeypressPhone: (e, componentName) => {
    const charCode = e.charCode ? e.charCode : null;
    if (
      !(
        (charCode > 47 && charCode < 58) ||
        charCode === 45 ||
        charCode === 46 ||
        charCode === 8 ||
        charCode === 0 ||
        charCode === 13
      )
    ) {
      e.preventDefault();
    }
    if (charCode === 46) {
      return e.preventDefault();
    }
    return true;
  },
  NumberOnly_onkeypress: (e, componentName) => {
    const charCode = e.charCode ? e.charCode : null;
    if (
      !(
        (charCode > 47 && charCode < 58) ||
        charCode === 46 ||
        charCode === 8 ||
        charCode === 0 ||
        charCode === 13
      )
    ) {
      e.preventDefault();
    }
    if (charCode === 46) {
      const re = /[.]{1,}/;
      const iNumber = re.exec(e.target.value);
      if (
        componentName !== "priceContact" &&
        iNumber === null &&
        charCode === 46
      )
        return e.preventDefault();
      if (iNumber != null && charCode === 46) return e.preventDefault();
    }
    return true;
  },
  NumberAndFloatOnly_onkeypress: (e) => {
    const charCode = e.charCode ? e.charCode : null;
    if (
      !(
        (charCode > 47 && charCode < 58) ||
        charCode === 46 ||
        charCode === 8 ||
        charCode === 0 ||
        charCode === 13
      )
    ) {
      e.preventDefault();
    }
  },

  NumberAndSingleFloatOnly_onkeypress: (e) => {
    const charCode = e.charCode ? e.charCode : null;
    const txt = e.target.value;
    if (charCode == 46) {
      //Check if the text already contains the . character
      if (txt.indexOf(".") === -1) {
        return true;
      } else {
        e.preventDefault();
      }
    } else if (
      !(
        (charCode > 47 && charCode < 58) ||
        charCode === 8 ||
        charCode === 0 ||
        charCode === 13
      )
    ) {
      e.preventDefault();
    }
  },
  isNumber(strValue) {
    let re = /[,]/;
    const strNumber = strValue?.replace(re, "");
    let iNumber: any = parseFloat(strNumber);
    if (iNumber === NaN) return false;
    re = /D+/;
    iNumber = re.exec(strNumber);
    if (iNumber != null) return false;
    re = /[.]{2,}/;
    iNumber = re.exec(strNumber);
    if (iNumber != null) return false;
    re = /[.]\d{3,}/;
    iNumber = re.exec(strNumber);
    if (iNumber != null) return false;
    return true;
  },

  AmountNumberOnly_onkeypress: (e) => {
    const charCode = e.charCode ? e.charCode : null;
    if (
      !((charCode > 47 && charCode < 58) || charCode === 46 || charCode === 8)
    ) {
      return e.preventDefault();
    }
    if (charCode === 46) {
      const re = /[.]{1,}/;
      const iNumber = re.exec(e.target.value);
      if ([...e.target.value].filter((x) => x === ".").length > 0)
        return e.preventDefault();
      if (iNumber != null && charCode === 46) return false;
    }
    return true;
  },
  input_field_validation: (event) => {
    event.charCode == 8 || event.charCode == 0 || event.charCode == 13
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
    return true;
  },

  IsAlphaNumeric: (e) => {
    const specialKeys = [];
    specialKeys.push(8); //Backspace
    specialKeys.push(9); //Tab
    specialKeys.push(46); //Delete
    specialKeys.push(36); //Home
    specialKeys.push(35); //End
    specialKeys.push(37); //Left
    specialKeys.push(39); //Right
    const keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    const ret =
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 65 && keyCode <= 90) ||
      keyCode == 32 ||
      (keyCode >= 97 && keyCode <= 122) ||
      (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode) ||
      e.charCode == 45;

    if (ret) {
      return ret;
    } else {
      e.preventDefault();
      return ret;
    }
  },

  removeMarshaCharacters: (strValue) => {
    const strNewValue = strValue.replace(/[\+%<>_=`~\*/|]/g, "");
    return strNewValue;
  },
  text_onclick: (event, max_len) => {
    const stringobj = event.target.value;
    if (stringobj.length > max_len) {
      alert(`You are allowed to enter up to ${max_len} characters.`);
      event.preventDefault();
      return false;
    }
    return true;
  },
  checklen_onkeypress: (e, max_len) => {
    let len = e.target.value.length;

    if (e.type === "keypress") {
      len = len + 1;
    }
    const charCode = e.charCode ? e.charCode : null;

    if (charCode == undefined) return true;

    if (charCode == 13) {
      e.preventDefault();
    } else if (charCode > 13) {
      if (len > max_len) {
        alert(`You are allowed to enter up to ${max_len} characters.`);
        e.preventDefault();
        return false;
      }
    }

    return true;
  },

  marshaSafeCharsOnly: (e) => {
    let charCode;
    if (window.event) charCode = e.keyCode;
    else if (e.which) charCode = e.which;
    if (charCode == undefined) return true;
    if (
      charCode == 37 ||
      charCode == 60 ||
      charCode == 95 ||
      charCode == 43 ||
      charCode == 62 ||
      charCode == 61 ||
      charCode == 96 ||
      charCode == 126 ||
      charCode == 42 ||
      charCode == 47 ||
      charCode == 124
    ) {
      return false;
    }
    return true;
  },
  setDatewithYYYY: (strDate: any) => {
    let dateArray, iyear;
    let strMonth, strDay, strTemp;
    dateArray = strDate.split("/");
    const imonth = parseInt(dateArray[0], 10);
    const iday = parseInt(dateArray[1], 10);
    iyear = parseInt(dateArray[2], 10);
    if (iyear < 100) {
      if (iyear > 90) iyear += 1900;
      else iyear += 2000;
    }

    strTemp = String(imonth);
    if (strTemp.length == 1) strMonth = "0" + strTemp;
    else strMonth = strTemp;

    strTemp = String(iday);
    if (strTemp.length == 1) strDay = "0" + strTemp;
    else strDay = strTemp;
    return strMonth + "/" + strDay + "/" + String(iyear);
  },
  isAfterDate: (strDate: any, strDateCheck: any) => {
    const theDate = Utils.convertStrToDate(strDate);

    const theDatecheck = Utils.convertStrToDate(strDateCheck);

    if (theDatecheck.getTime() > theDate.getTime()) {
      return false;
    }

    return true;
  },
  isBeforeDate: (strDate: any, strDateCheck: any) => {
    const theDate = Utils.convertStrToDate(strDate);

    const theDatecheck = Utils.convertStrToDate(strDateCheck);

    if (theDatecheck.getTime() < theDate.getTime()) {
      return false;
    }

    return true;
  },
  isValidRange: (strValue, minNumber, maxNumber) => {
    let iNumber;
    iNumber = Utils.ConvertToNumber(strValue);
    if (iNumber < minNumber || iNumber > maxNumber) return false;
    return true;
  },
  ConvertToNumber: (strValue) => {
    //convert a string to a number
    let iNumber;
    const re = "/[,]/";
    iNumber = parseFloat(strValue?.toString().replace(re, ""));
    return iNumber;
  },
  isValidDate: (strStart: any, strEnd: any) => {
    let startDate, endDate;

    endDate = Utils.convertStrToDate(strEnd);
    startDate = Utils.convertStrToDate(strStart);
    if (startDate.getTime() > endDate.getTime()) {
      alert("The end date must be after the start date.");
      return false;
    }

    return true;
  },

  getBaseAPIURI: () => {
    if (!apiURL) {
      return window.location.href.substring(
        0,
        window.location.href.indexOf(apiContext) + apiContext.length
      );
    }
    return apiURL;
  },

  getAPIURI: (method: string) => {
    return `${Utils.getBaseAPIURI()}${method}`;
  },
  createPostData: (params: Object) => {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");
  },

  navigateToUrl: (url: string) => {
    const baseIndex = window.location.href.indexOf(apiContext);
    const redirect_url = `${window.location.href.substring(
      0,
      baseIndex
    )}${apiContext}${url}`;

    window.location.replace(redirect_url);
  },

  sortData: (dataObject: any) => {
    dataObject.sort(function (a, b) {
      const textA = a.accountname ? a.accountname.toUpperCase() : "";
      const textB = b.accountname ? b.accountname.toUpperCase() : "";
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  },

  getElementTye: (id: string) => {
    return document.getElementById(id) as HTMLInputElement;
  },

  getDefaultDate: (days) => {
    const cal = new Date();

    for (let i = 0; i < days; i++) {
      cal.setDate(cal.getDate() + 1);

      if (new Date().getDay() == 6) {
        cal.setDate(cal.getDate() + 2);
      } else if (new Date().getDay() == 7) {
        cal.setDate(cal.getDate() + 1);
      }
    }
    return new Date(cal.getTime());
  },
  replaceWildForFilename: (origString) => {
    let newString = null;
    newString = origString.replace(/[" "&/\\~!@#$%^*+|'<>?,.]/g, "");

    return newString;
  },
  stringToBoolean: (stringVal) => {
    switch (stringVal) {
      case "Y":
        return true;
      case "N":
        return false;
      case null:
        return false;
      default:
        return false;
    }
  },
  formatDate2Digit: (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  },

  isOnOrBeforeDate(strDate, strDatecheck) {
    //is the date is greater than l to the checkdate

    const theDate = ConvertStrToDate(strDate);
    const theDatecheck = ConvertStrToDate(strDatecheck);

    if (theDatecheck.getTime() <= theDate.getTime()) {
      return false;
    }

    return true;
  },
  isOnOrAfterDate(strDate, strDatecheck) {
    //is the date is greater than or equal to the checkdate

    const theDate = ConvertStrToDate(strDate);
    const theDatecheck = ConvertStrToDate(strDatecheck);

    if (theDatecheck.getTime() >= theDate.getTime()) {
      return false;
    }

    return true;
  },

  getNext(strDate) {
    let datearray, imonth, iday, iyear;
    const dateArray = strDate.split("/");
    imonth = parseInt(dateArray[0], 10) - 1;
    iday = parseInt(dateArray[1], 10);
    iyear = parseInt(dateArray[2], 10);
    if (iyear < 100) {
      if (iyear > 90) iyear += 1900;
      else iyear += 2000;
    }
    const nextDate = new Date(iyear, imonth, iday);
    nextDate.setDate(nextDate.getDate() + 1);
    iyear = nextDate.getFullYear();
    if (iyear < 100) {
      if (iyear > 90) iyear += 1900;
      else iyear += 2000;
    }
    return (
      nextDate.getMonth() +
      1 +
      "/" +
      nextDate.getDate() +
      "/" +
      nextDate.getFullYear()
    );
  },

  getPrev(strDate) {
    let datearray, imonth, iday, iyear;
    const dateArray = strDate.split("/");
    imonth = parseInt(dateArray[0], 10) - 1;
    iday = parseInt(dateArray[1], 10);
    iyear = parseInt(dateArray[2], 10);
    if (iyear < 100) {
      if (iyear > 90) iyear += 1900;
      else iyear += 2000;
    }
    const nextDate = new Date(iyear, imonth, iday);
    nextDate.setDate(nextDate.getDate() - 1);
    iyear = nextDate.getFullYear();
    if (iyear < 100) {
      if (iyear > 90) iyear += 1900;
      else iyear += 2000;
    }
    return (
      nextDate.getMonth() +
      1 +
      "/" +
      nextDate.getDate() +
      "/" +
      nextDate.getFullYear()
    );
  },

  // isValidRange(strValue, minNumber, maxNumber) {
  //   let iNumber;
  //   iNumber = strValue;
  //   console.debug("iNumberiNumber", iNumber, minNumber);
  //   if (iNumber < minNumber || iNumber > maxNumber) return false;
  //   return true;
  // },
  getUrlParms: (urlParms) => {
    const param = {
      marshaCode: new URLSearchParams(urlParms).get("MarshaCode"),
      hotelName: new URLSearchParams(urlParms).get("HotelName"),
      period: new URLSearchParams(urlParms).get("Period"),
      hotelrfpid: new URLSearchParams(urlParms).get("hotelrfpid"),
    };
    return param;
  },

  percent_onchange: (e) => {
    if (e.target.value > 100 || e.target.value < 0) {
      alert("Please enter a value between 0 and 100");
      return false;
    }
    return true;
  },

  WholeNumberOnly_onkeypress: (e) => {
    let charCode;
    if (window.event) charCode = e.keyCode;
    else if (e.which) charCode = e.which;
    if (charCode == undefined) return true;
    if (!(charCode > 47 && charCode < 58)) {
      return false;
    }
    return true;
  },

  KorSafeCharsOnly_onkeypress: (e) => {
    let charCode;
    if (window.event) charCode = e.keyCode;
    else if (e.which) charCode = e.which;
    if (charCode == undefined) return true;
    //%+_`~|* CR
    if (
      charCode == 37 ||
      charCode == 95 ||
      charCode == 43 ||
      charCode == 96 ||
      charCode == 126 ||
      charCode == 42 ||
      charCode == 124 ||
      charCode == 13
    ) {
      return false;
    }
    return true;
  },
  getTodayDate: () => {
    return startOfToday();
  },
  toFixed(x) {
    if (Math.abs(x) < 1.0) {
      const e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      let e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  },
  percentWithDecimal: (PercentValue) => {
    let percentDiscount = PercentValue;
    if (percentDiscount >= 0) {
      percentDiscount = percentDiscount && Number(percentDiscount).toFixed(2);
      if (Number.isInteger(Number(percentDiscount))) {
        PercentValue = Number(percentDiscount).toFixed(1);
      } else {
        const decimals = percentDiscount && percentDiscount.split(".")[1];
        if (decimals) {
          const str = Array.from(decimals);
          if (str[1] === "0") {
            PercentValue = Number(percentDiscount).toFixed(1);
          } else {
            PercentValue = Number(PercentValue).toFixed(2);
          }
        }
      }
    }
    return PercentValue;
  },

  getTimezoneIdependentCurrentDate: () => {
    const date = new Date();
    const dt = moment.utc(date).tz("America/New_York").format();
    const parts = dt?.split("-");
    const newStartDate = new Date(
      parseInt(parts[0]),
      parseInt(parts[1]) - 1,
      parseInt(parts[2])
    );
    return moment(newStartDate).format("MMMM DD, YYYY");
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  deleteAllCookies: () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    return false;
  },
};

export default Utils;
