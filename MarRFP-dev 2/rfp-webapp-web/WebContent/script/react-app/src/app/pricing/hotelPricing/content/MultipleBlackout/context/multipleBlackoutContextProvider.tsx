import moment from "moment";
import React, { useContext, useState } from "react";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import Utils from "../../../../../common/utils/Utils";
import API from "../service/API";
import Settings from "../static/Settings";
import BlackoutSettings from "../static/Settings";
import CModal from "../../../../../common/components/CModal";
import _ from "lodash";

const MultipleBlackoutContext = React.createContext({});
export const MultipleBlackoutContextProvider = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  type blackoutRecordsType = {
    blackouts: any;
    offcycle: string;
    contractStartDate: string;
    contractEndDate: string;
    accounts: string;
    totalDays: string;
    changed: string;
    hotelaccountlist: any;
  }[];
  type blackoutsForPost = {
    blackoutList: {
      startdate: string;
      enddate: string;
      blackname: string;
    }[];
    changed: string;
    contractstart: string;
    contractend: string;
    hotelaccountlist: {
      hotel_accountinfoid: string;
    }[];
  };
  type allAccountsType = {
    rowIndex: string;
    accountIndex: string;
    accountName: string;
  }[];
  const [accountBlackoutGroup, setAccountBlackoutGroup] =
    useState<blackoutRecordsType>([]);
  const [activeRow, setActiveRow] = useState();
  const [allAccounts, setAllAccounts] = useState<allAccountsType>([]);
  const [blackoutParams, setBlackoutParams] = useState({
    marshaCode: "",
    hotelName: "",
    hotelrfpid: "",
    period: "",
    hotel_accountinfoid: "",
    startnum: "",
    searchtype: "",
  });
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [originalAccBlackoutGroup, setOriginalAccBlackoutGroup] = useState([]);
  const handleRowSelection = (i) => {
    setActiveRow(i);
  };

  const closeModal = () => {
    setShowModal(false);
    setAlertMessage("");
  };

  const [blackoutDateValidation, setBlackoutDateValidation] = useState(false);

  function setBlackoutsData(blackoutsData, maxBlackouts) {
    const accountBlackoutGroupArray = [];
    for (let i = 0; i < blackoutsData?.length; i++) {
      const blackoutsArray = setBlackoutsArray(blackoutsData[i], maxBlackouts);
      accountBlackoutGroupArray.push({
        blackouts: blackoutsArray,
        offcycle: blackoutsData[i].offcycle,
        contractStartDate: convertToMMDDYYYY(blackoutsData[i].contractstart),
        contractEndDate: convertToMMDDYYYY(blackoutsData[i].contractend),
        // accounts: getAccountsName(blackoutsData[i].hotelaccountlist),
        accounts: blackoutsData[i].hotelaccountlist,
        totalDays: blackoutsData[i].totalNumBlackoutDays,
        hotelaccountlist: blackoutsData[i].hotelaccountlist,
      });
      addRowindexAndAccount(i, blackoutsData[i].hotelaccountlist);
    }
    setAccountBlackoutGroup(accountBlackoutGroupArray);
    setOriginalAccBlackoutGroup(_.cloneDeep(accountBlackoutGroupArray));
    appContext.setIsDataUpdated(appContext.isDataUpdated + 1);
  }

  function getAccountsName(hotelaccountlist) {
    return hotelaccountlist.map((account) => account.accountname).join(", ");
  }

  function addRowindexAndAccount(index, accountList) {
    const tempAccounts = allAccounts;
    accountList.forEach((account, accountIndex) => {
      tempAccounts.push({
        rowIndex: index,
        accountIndex: accountIndex,
        accountName: account.accountname,
      });
    });
    setAllAccounts(tempAccounts);
  }
  function setBlackoutsArray(blackoutsData, maxBlackouts) {
    const blackouts = [];
    let allowedBlackouts = blackoutsData.blackoutList.length;
    if (blackoutParams.searchtype == "V" || appContext.user.isPASorAnySales) {
      allowedBlackouts = maxBlackouts;
    }
    for (let i = 1; i <= allowedBlackouts; i++) {
      switch (i) {
        case 1:
          blackouts.push({
            srNo: "1",
            startdate: convertToMMDDYYYY(blackoutsData.first_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.first_bd_enddate),
            name: blackoutsData.first_bd_blackname,
          });
          break;
        case 2:
          blackouts.push({
            srNo: "2",
            startdate: convertToMMDDYYYY(blackoutsData.second_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.second_bd_enddate),
            name: blackoutsData.second_bd_blackname,
          });
          break;
        case 3:
          blackouts.push({
            srNo: "3",
            startdate: convertToMMDDYYYY(blackoutsData.third_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.third_bd_enddate),
            name: blackoutsData.third_bd_blackname,
          });
          break;
        case 4:
          blackouts.push({
            srNo: "4",
            startdate: convertToMMDDYYYY(blackoutsData.fourth_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.fourth_bd_enddate),
            name: blackoutsData.fourth_bd_blackname,
          });
          break;
        case 5:
          blackouts.push({
            srNo: "5",
            startdate: convertToMMDDYYYY(blackoutsData.fifth_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.fifth_bd_enddate),
            name: blackoutsData.fifth_bd_blackname,
          });
          break;
        case 6:
          blackouts.push({
            srNo: "6",
            startdate: convertToMMDDYYYY(blackoutsData.sixth_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.sixth_bd_enddate),
            name: blackoutsData.sixth_bd_blackname,
          });
          break;
        case 7:
          blackouts.push({
            srNo: "7",
            startdate: convertToMMDDYYYY(blackoutsData.seventh_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.seventh_bd_enddate),
            name: blackoutsData.seventh_bd_blackname,
          });
          break;
        case 8:
          blackouts.push({
            srNo: "8",
            startdate: convertToMMDDYYYY(blackoutsData.eighth_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.eighth_bd_enddate),
            name: blackoutsData.eighth_bd_blackname,
          });
          break;
        case 9:
          blackouts.push({
            srNo: "9",
            startdate: convertToMMDDYYYY(blackoutsData.nineth_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.nineth_bd_enddate),
            name: blackoutsData.nineth_bd_blackname,
          });
          break;
        case 10:
          blackouts.push({
            srNo: "10",
            startdate: convertToMMDDYYYY(blackoutsData.tenth_bd_startdate),
            enddate: convertToMMDDYYYY(blackoutsData.tenth_bd_enddate),
            name: blackoutsData.tenth_bd_blackname,
          });
          break;
        default:
          break;
      }
    }
    return blackouts;
  }
  function convertToMMDDYYYY(date) {
    return !!date
      ? moment(date, BlackoutSettings.mmddyyyy, true).isValid() ||
        moment(date, BlackoutSettings.mmddyy, true).isValid() ||
        moment(date, BlackoutSettings.mdyy, true).isValid() ||
        moment(date, BlackoutSettings.mdyyyy, true).isValid() ||
        moment(date, BlackoutSettings.mdyyy, true).isValid() ||
        moment(date, BlackoutSettings.mmddyyy, true).isValid() ||
        moment(date, BlackoutSettings.mddyyy, true).isValid()
        ? moment(date, BlackoutSettings.mmddyy, true).isValid()
          ? Utils.setDatewithYYYY(date)
          : moment(date, BlackoutSettings.mdyy, true).isValid()
          ? Utils.setDatewithYYYY(date)
          : moment(date, BlackoutSettings.mdyyyy, true).isValid()
          ? Utils.setDatewithYYYY(date)
          : moment(date, BlackoutSettings.mdyyy, true).isValid()
          ? Utils.setDatewithYYYY(date)
          : moment(date, BlackoutSettings.mmddyyy, true).isValid()
          ? Utils.setDatewithYYYY(date)
          : moment(date, BlackoutSettings.mddyyy, true).isValid()
          ? Utils.setDatewithYYYY(date)
          : date
        : moment
            .utc(date)
            .tz(BlackoutSettings.timeZone)
            .format(BlackoutSettings.mmddyyyy)
      : "";
  }
  function validateNumberAndForwardSlash(event) {
    if (!((event.key >= 0 && event.key <= 9) || event.key == "/")) {
      event.preventDefault();
    }
  }

  function checkOnOrAfterOriginalDate(
    currentDate,
    totalBlackouts,
    property,
    blackoutIndex,
    index
  ) {
    switch (property) {
      case Settings.endDate:
        const strorigEndDate =
          originalAccBlackoutGroup[index]?.blackouts[blackoutIndex]?.enddate;
        if (currentDate != null) {
          if (!Utils.isOnOrAfterDate(strorigEndDate, currentDate)) {
            setAlertMessage(
              Settings.alertMessage.endDateOnOrBeforeOriginalDate +
                strorigEndDate +
                ")"
            );
            setShowModal(true);
            return false;
          }
        }
        break;
      case Settings.startDate:
        const strorigStartDate =
          originalAccBlackoutGroup[index]?.blackouts[blackoutIndex]?.startdate;
        if (currentDate != null && strorigStartDate != currentDate) {
          if (!Utils.isOnOrAfterDate(currentDate, strorigStartDate)) {
            setAlertMessage(
              Settings.alertMessage.startDateOnOrAfterOriginalDate +
                strorigStartDate +
                ")"
            );
            setShowModal(true);
            return false;
          }
        }
        break;
    }
    return true;
  }

  function validateDateFormat(
    event,
    contractStartDate,
    contractEndDate,
    index,
    dateNameStr,
    blackoutIndex
  ) {
    let dataValidity = true;
    let checkNumBlackouts = true;
    if (
      appContext?.user?.isPASorAnySales ||
      accountBlackoutGroup[index]?.hotelaccountlist[0]?.isLocked == "N"
    ) {
      checkNumBlackouts = false;
    }
    let checkOrigDates = false;

    let currentDate = event.target.value;
    if (!!currentDate) {
      dataValidity = isValidDate(currentDate);
      if (dataValidity) {
        currentDate = convertToMMDDYYYY(currentDate);
        dataValidity = isBeforeOrAfterContractDate(
          currentDate,
          contractStartDate,
          contractEndDate,
          dateNameStr
        );
      }

      if (dataValidity) {
        currentDate = convertToMMDDYYYY(currentDate);
        dataValidity = isEndDateOnOrBeforeStartDate(
          currentDate,
          index,
          dateNameStr,
          blackoutIndex
        );
      }

      if (dataValidity) {
        currentDate = convertToMMDDYYYY(currentDate);
        dataValidity = checkOverlapping(
          currentDate,
          accountBlackoutGroup[index].blackouts
        );
      }

      if (dataValidity) {
        currentDate = convertToMMDDYYYY(currentDate);
        dataValidity = checkBetween(
          currentDate,
          accountBlackoutGroup[index].blackouts,
          dateNameStr,
          blackoutIndex
        );
      }

      if (dataValidity && checkNumBlackouts) {
        currentDate = convertToMMDDYYYY(currentDate);
        dataValidity = checkOnOrAfterOriginalDate(
          currentDate,
          accountBlackoutGroup[index].blackouts,
          dateNameStr,
          blackoutIndex,
          index
        );
        if (!dataValidity) {
          checkOrigDates = true;
        }
      }

      if (dataValidity) {
        if (dateNameStr == Settings.startDate) {
          (
            document.querySelector(
              `#startDate_${index}_${blackoutIndex}`
            ) as HTMLInputElement
          ).value = convertToMMDDYYYY(currentDate);
        } else if (dateNameStr == Settings.endDate) {
          (
            document.querySelector(
              `#endDate_${index}_${blackoutIndex}`
            ) as HTMLInputElement
          ).value = convertToMMDDYYYY(currentDate);
        }
        const total = dateDiff(accountBlackoutGroup, index);
        accountBlackoutGroup[index].totalDays = total.toString();
        const element = document.querySelector(
          `input[name=TOTAL_BLACKOUTS_${index}]`
        ) as HTMLInputElement;
        if (element) element.value = total.toString();
        setAccountBlackoutGroup(accountBlackoutGroup);
      } else {
        if (checkOrigDates) {
          event.target.value =
            originalAccBlackoutGroup[index]?.blackouts[blackoutIndex][
              dateNameStr == Settings.endDate ? "enddate" : "startdate"
            ];
          addBlackouts(
            originalAccBlackoutGroup[index]?.blackouts[blackoutIndex][
              dateNameStr == Settings.endDate ? "enddate" : "startdate"
            ],
            index,
            blackoutIndex,
            dateNameStr
          );
        } else {
          event.target.value = "";
          addBlackouts("", index, blackoutIndex, dateNameStr);
        }
      }
    }
  }

  const isValidDate = (strDate: string, iValidYear?: number) => {
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
      /* alert(
        `${sError}${strDate} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      ); */
      setAlertMessage(
        `${sError}${strDate} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
      setShowModal(true);
      return false;
    }
    return true;
  };
  const isEndDateOnOrBeforeStartDate = (
    currentDate,
    accountIndex,
    property,
    blackoutIndex
  ) => {
    const startDate =
      accountBlackoutGroup[accountIndex]?.blackouts[blackoutIndex]?.startdate;
    const endDate =
      accountBlackoutGroup[accountIndex]?.blackouts[blackoutIndex]?.enddate;
    if (property === BlackoutSettings.endDate && startDate != null) {
      if (moment(currentDate).valueOf() < moment(startDate).valueOf()) {
        //alert(Settings.alertMessage.endDateOnAfterStartDate);
        setAlertMessage(Settings.alertMessage.endDateOnAfterStartDate);
        setShowModal(true);
        return false;
      }
    } else if (property === BlackoutSettings.startDate && endDate != null) {
      if (moment(currentDate).valueOf() > moment(endDate).valueOf()) {
        //alert(Settings.alertMessage.endDateOnAfterStartDate);
        setAlertMessage(Settings.alertMessage.endDateOnAfterStartDate);
        setShowModal(true);
        return false;
      }
    }
    return true;
  };

  const isBeforeOrAfterContractDate = (
    currentDate,
    contractStartDate,
    contractEndDate,
    dateNameStr
  ) => {
    if (
      dateNameStr == BlackoutSettings.startDate &&
      Utils.isOnOrBeforeDate(currentDate, contractStartDate)
    ) {
      setAlertMessage(
        BlackoutSettings.alertMessage.startDateOnOrAfter +
          " (" +
          contractEndDate +
          ")"
      );
      setShowModal(true);
      return false;
    } else if (
      dateNameStr == BlackoutSettings.startDate &&
      Utils.isOnOrAfterDate(currentDate, contractEndDate)
    ) {
      setAlertMessage(
        BlackoutSettings.alertMessage.startDateOnOrBefore +
          " (" +
          contractEndDate +
          ")"
      );
      setShowModal(true);
      return false;
    } else if (
      dateNameStr == BlackoutSettings.endDate &&
      Utils.isOnOrBeforeDate(currentDate, contractStartDate)
    ) {
      setAlertMessage(
        BlackoutSettings.alertMessage.endDateOnOrAfterStartDate +
          " (" +
          contractEndDate +
          ")"
      );
      setShowModal(true);
      return false;
    } else if (
      dateNameStr == BlackoutSettings.endDate &&
      Utils.isOnOrAfterDate(currentDate, contractEndDate)
    ) {
      setAlertMessage(
        BlackoutSettings.alertMessage.endDateOnOrAfter +
          " (" +
          contractEndDate +
          ")"
      );
      setShowModal(true);
      return false;
    } else {
      setAlertMessage("");
      setShowModal(false);
      return true;
    }
  };

  const checkBetween = (currentDate, blackouts, property, blackoutIndex) => {
    let loopCount = 0;
    const arr = blackouts;
    for (loopCount = 0; loopCount < arr.length; loopCount++) {
      if (
        arr[loopCount].startdate == null ||
        arr[loopCount].enddate == null ||
        (arr[loopCount].startdate != null && blackoutIndex == loopCount)
      ) {
        continue;
      } else if (property === BlackoutSettings.startDate) {
        if (
          moment(currentDate).valueOf() >=
            moment(arr[loopCount].startdate).valueOf() &&
          moment(currentDate).valueOf() <=
            moment(arr[loopCount].enddate).valueOf()
        ) {
          if (
            moment(arr[loopCount].startdate).valueOf() ==
              moment(arr[loopCount].enddate).valueOf() &&
            blackoutIndex == loopCount
          ) {
            return true;
          } else {
            const datename =
              property == BlackoutSettings.startDate
                ? BlackoutSettings.startDateWithSpace
                : BlackoutSettings.endDateWithSpace;
            /* alert(
              "The " + datename + BlackoutSettings.alertMessage.mustNotInBetween
            ); */
            setAlertMessage(
              "The " + datename + BlackoutSettings.alertMessage.mustNotInBetween
            );
            setShowModal(true);
            return false;
          }
        }
      } else if (property === BlackoutSettings.endDate) {
        if (
          moment(currentDate).valueOf() <=
            moment(arr[loopCount].startdate).valueOf() &&
          moment(currentDate).valueOf() <=
            moment(arr[loopCount].enddate).valueOf()
        ) {
          if (
            moment(arr[loopCount].startdate).valueOf() ==
              moment(arr[loopCount].enddate).valueOf() &&
            moment(currentDate).valueOf() !=
              moment(arr[loopCount].startdate).valueOf()
          ) {
            return true;
          } else if (
            moment(arr[loopCount].startdate).valueOf() ==
              moment(arr[loopCount].enddate).valueOf() &&
            blackoutIndex == loopCount
          ) {
            return true;
          } else if (
            moment(currentDate).valueOf() <
              moment(arr[loopCount].startdate).valueOf() &&
            moment(currentDate).valueOf() <
              moment(arr[loopCount].enddate).valueOf()
          ) {
            return true;
          } else {
            const datename =
              property == BlackoutSettings.startDate
                ? BlackoutSettings.startDateWithSpace
                : BlackoutSettings.endDateWithSpace;
            /* alert(
              "The " + datename + BlackoutSettings.alertMessage.mustNotInBetween
            ); */
            setAlertMessage(
              "The " + datename + BlackoutSettings.alertMessage.mustNotInBetween
            );
            setShowModal(true);
            return false;
          }
        } else if (
          moment(currentDate).valueOf() >=
            moment(arr[loopCount].startdate).valueOf() &&
          moment(currentDate).valueOf() <=
            moment(arr[loopCount].enddate).valueOf()
        ) {
          if (blackoutIndex == loopCount) return true;
          const datename =
            property == BlackoutSettings.startDate
              ? BlackoutSettings.startDateWithSpace
              : BlackoutSettings.endDateWithSpace;
          /* alert(
            "The " + datename + BlackoutSettings.alertMessage.mustNotInBetween
          ); */
          setAlertMessage(
            "The " + datename + BlackoutSettings.alertMessage.mustNotInBetween
          );
          setShowModal(true);
          return false;
        }
      }
    }
    return true;
  };

  const checkOverlapping = (currentDate, blackouts) => {
    let loopCount = 0;
    const arr = blackouts;
    if (currentDate.strStartdate == null) {
      return true;
    }
    for (loopCount = 0; loopCount < arr.length; loopCount++) {
      if (arr[loopCount].startdate == null || arr[loopCount].enddate == null) {
        continue;
      } else {
        if (
          (moment(currentDate).valueOf() <=
            moment(arr[loopCount].startdate).valueOf() &&
            moment(currentDate).valueOf() >=
              moment(arr[loopCount].enddate).valueOf()) ||
          (moment(currentDate).valueOf() >=
            moment(arr[loopCount].startdate).valueOf() &&
            moment(currentDate).valueOf() <=
              moment(arr[loopCount].enddate).valueOf())
        ) {
          //alert(Settings.alertMessage.dateOverlap);
          setAlertMessage(Settings.alertMessage.dateOverlap);
          setShowModal(true);
          return false;
        }
      }
    }
    return true;
  };

  function isDateOverlapping(currentDate, blackouts, dateNameStr) {
    let isDateBetween = true;
    blackouts.forEach((blackout) => {
      if (
        !isDraftRecord(blackout) &&
        moment(currentDate).isBetween(
          blackout.startdate,
          blackout.enddate,
          undefined,
          "[]"
        )
      ) {
        const datename =
          dateNameStr == BlackoutSettings.startDate
            ? BlackoutSettings.startDateWithSpace
            : BlackoutSettings.endDateWithSpace;
        /* alert(
          "The " + datename + BlackoutSettings.alertMessage.mustNotInBetween
        ); */
        setAlertMessage(
          "The " + datename + BlackoutSettings.alertMessage.mustNotInBetween
        );
        setShowModal(true);
        isDateBetween = false;
        return isDateBetween;
      }
    });
    return isDateBetween;
  }

  function isDraftRecord(blackout) {
    return !blackout.startdate || !blackout.enddate || !blackout.Name;
  }

  function addBlackouts(valueToUpdate, accountIndex, blackoutIndex, fieldName) {
    const updatedAccountBlackoutGroup = accountBlackoutGroup;
    if (fieldName == BlackoutSettings.startDate) {
      updatedAccountBlackoutGroup[accountIndex].blackouts[
        blackoutIndex
      ].startdate = convertToMMDDYYYY(valueToUpdate);
      updatedAccountBlackoutGroup[accountIndex].changed = "Y";
    } else if (fieldName == BlackoutSettings.endDate) {
      updatedAccountBlackoutGroup[accountIndex].blackouts[
        blackoutIndex
      ].enddate = convertToMMDDYYYY(valueToUpdate);
      updatedAccountBlackoutGroup[accountIndex].changed = "Y";
    } else if (fieldName == BlackoutSettings.name) {
      updatedAccountBlackoutGroup[accountIndex].blackouts[blackoutIndex].name =
        valueToUpdate;
      updatedAccountBlackoutGroup[accountIndex].changed = "Y";
    }
    setAccountBlackoutGroup(updatedAccountBlackoutGroup);
    validateFields();
  }
  const dateDiff = (updatedAccountBlackoutGroup, accountIndex) => {
    let loopCount = 0;
    let numberOfDays = 0;
    const arr = updatedAccountBlackoutGroup;

    for (
      loopCount = 0;
      loopCount < arr[accountIndex]?.blackouts.length;
      loopCount++
    ) {
      if (
        arr[accountIndex]?.blackouts[loopCount]?.enddate != null &&
        arr[accountIndex]?.blackouts[loopCount]?.enddate !== "" &&
        arr[accountIndex]?.blackouts[loopCount]?.startdate != null &&
        arr[accountIndex]?.blackouts[loopCount]?.startdate !== ""
      ) {
        const diffDays =
          moment(arr[accountIndex]?.blackouts[loopCount]?.enddate).diff(
            moment(arr[accountIndex]?.blackouts[loopCount]?.startdate),
            "days"
          ) + 1;
        numberOfDays += diffDays;
      } else {
        continue;
      }
    }
    return numberOfDays;
  };

  async function updateBlackouts(isSaveClicked = false) {
    const blackoutsPostData = buildBlackoutsDataForPost();
    const formatedData = Utils.createPostData({
      strAccountBlackoutGroup: JSON.stringify(blackoutsPostData),
    });
    setIsMakingRequest(true);
    setIsLoading(true);
    appContext.setCpacLoader(true);
    API.postMultipleBlackouts(formatedData).then(() => {
      if (isSaveClicked) window.location.reload();
    });
  }

  function buildBlackoutsDataForPost() {
    const changedAccounts = accountBlackoutGroup.filter(
      (blackoutGroup) => blackoutGroup.changed === "Y"
    );
    const postData: blackoutsForPost[] = [];
    changedAccounts.forEach((account) => {
      const blackoutForPost: blackoutsForPost = {
        blackoutList: [],
        changed: "",
        contractstart: "",
        contractend: "",
        hotelaccountlist: [],
      };
      const blackoutsToAdd = account.blackouts.filter(
        (blackout) => blackout.startdate && blackout.enddate && blackout.name
      );
      blackoutsToAdd.forEach((blackout) => {
        blackoutForPost.blackoutList.push({
          startdate: blackout.startdate,
          enddate: blackout.enddate,
          blackname: blackout.name,
        });
      });
      blackoutForPost.changed = account.changed;
      blackoutForPost.contractstart = account.contractStartDate;
      blackoutForPost.contractend = account.contractEndDate;
      blackoutForPost.hotelaccountlist = buildhotelaccountlist(
        account.hotelaccountlist
      );
      postData.push(blackoutForPost);
    });
    return postData;
  }

  function buildhotelaccountlist(hotelaccountlist) {
    const hotelAccountsList = [];
    hotelaccountlist.forEach((account) => {
      hotelAccountsList.push({
        hotel_accountinfoid: account.hotel_accountinfoid,
      });
    });
    return hotelAccountsList;
  }

  const validateFields = () => {
    let validation = true;
    for (let i = 0; i < accountBlackoutGroup.length; i++) {
      const data = accountBlackoutGroup[i].blackouts.filter(
        (d) =>
          (d.startdate != null && d.startdate != "") ||
          (d.enddate != null && d.enddate != "") ||
          (d.name != null && d.name != "")
      );
      if (data && data.length > 0) {
        for (let j = 0; j < accountBlackoutGroup[i].blackouts.length; j++) {
          if (
            !!accountBlackoutGroup[i].blackouts[j].startdate ||
            !!accountBlackoutGroup[i].blackouts[j].enddate ||
            !!accountBlackoutGroup[i].blackouts[j].name
          ) {
            if (accountBlackoutGroup[i].blackouts[j].startdate === "") {
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.alertMessage.enterStartDate,
                type: "custom",
              });
              validation = false;
              break;
            } else if (accountBlackoutGroup[i].blackouts[j].enddate === "") {
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.alertMessage.enterEndDate,
                type: "custom",
              });
              validation = false;
              break;
            } else if (accountBlackoutGroup[i].blackouts[j].name === "") {
              appContext.setErrorMessageAlert({
                show: true,
                message: Settings.alertMessage.enterBlackoutName,
                type: "custom",
              });
              validation = false;
              break;
            }
          }
          if (!validation) {
            return validation;
          } else {
            appContext.setErrorMessageAlert({
              show: false,
              message: "",
              type: "custom",
            });
          }
        }
      }
      if (!validation) {
        return validation;
      } else {
        appContext.setErrorMessageAlert({
          show: false,
          message: "",
          type: "custom",
        });
      }
    }
    return validation;
  };

  const componentUnload = () => {
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "browserAlert",
    });
  };
  const multipleBlackoutContext = {
    allAccounts,
    activeRow,
    accountBlackoutGroup,
    blackoutParams,
    setBlackoutsData,
    validateNumberAndForwardSlash,
    validateDateFormat,
    addBlackouts,
    handleRowSelection,
    updateBlackouts,
    setActiveRow,
    setBlackoutParams,
    setAccountBlackoutGroup,
    validateFields,
    isMakingRequest,
    setIsMakingRequest,
    convertToMMDDYYYY,
    isLoading,
    setIsLoading,
    setAlertMessage,
    setShowModal,
    componentUnload,
    blackoutDateValidation,
    setBlackoutDateValidation,
    setAllAccounts,
  };

  return (
    <MultipleBlackoutContext.Provider value={multipleBlackoutContext}>
      <CModal
        class={"alertmessage"}
        title={"Alert Message"}
        onClose={() => closeModal()}
        show={showModal}
        overlayHeight={Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        )}
        overlayTopPosition={"-79px"}
      >
        <div style={{ padding: "9px 12px" }}>{alertMessage}</div>
      </CModal>
      <style>
        {`
          .alertmessage{
            position:fixed;
            left: 42.48%;
            top: 46.3%;
          }`}{" "}
      </style>
      {props.children}
    </MultipleBlackoutContext.Provider>
  );
};
export const MultpleBlackoutContextConsumer = MultipleBlackoutContext.Consumer;
export default MultipleBlackoutContext;
