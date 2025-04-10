import React, { useState } from "react";
//@ts-ignore
import Settings from "../static/Settings";
//@ts-ignore
import Utils from "../../../../../../../common/utils/Utils";
//@ts-ignore
import Util from "../../../../../utils/Utils";
//@ts-ignore
import API from "../service/API";
import moment from "moment";

const ComplexityMatrixContext = React.createContext({});

export const ComplexityMatrixContextProvider = (props) => {
  const [isAlertMsg, setIsAlertMsg] = useState(false);
  const [state, setState] = useState({
    formChg: false,
    showScreenLoader: false,
    accountFromToData: {
      accountdata: {
        accountDetailGeneral: null,
        accountDropDowns: null,
        periodDetails: null,
        accountDetailCompMatrix: {
          accountid: null,
          accountname: null,
          accountpricingtype: null,
          accountrecid: null,
          accounttypedescription: null,
          duedate: null,
          groupmeetings: null,
          hotel_display: null,
          period: null,
          top_account: null,
          mergacqrename: null,
          addquestcomp: null,
          satrating: null,
          tacbonus: null,
          tacbonuscomments: null,
          rfpfilesent: [],
          totrfpfilesent: 0,
          renegsubmit: [],
          totrenegsubmit: 0,
          rateauditcomments: null,
          strAccountrecid: "",
        },
      },
    },
    accountCompDropDowns: {
      addQuestCompList: {
        data: [],
      },
      satRatingList: {
        data: [],
      },
      tacBonusList: {
        data: [],
      },
    },
    selectedAccountFromToData: {
      mergers: null,
      addendum: null,
      sales: null,
      account: null,
      totalAccount: null,
      substantiate: null,
      rfpFiles: null,
      renegotiation: null,
      totalRFP: null,
      totalRenegotiation: null,
      rateAudits: null,
      rfpfilesent: null,
      renegsubmit: null,
    },
    isComplete: false,
    onModalOpen: false,

    valuesRFP: [],
    valuesReg: [],
    arrREG: [],
    arrRFP: [],
    valuesRegNew: [],
    countRFP: 0,
    countReg: 0,
    countRegNew: 0,
    countRfpNew: 0,
    totalRFP: 0,
    counterArray: [],
    counterFlag: 0,
    counterFlagReg: 0,
    flag: true,
    flagReg: true,
    oldReg: false,
    changeFlag: false,
    changeFlagReg: false,
    flagbool: false,
    a: [],
    calendarValue: [],
    onShowCalendar: false,
    onShowCalendarReg: false,
    newvaluesReg: [],
    currentSelectedId: null,
    currentSelectedIdReg: null,

    currentSelectedIDNew: null,

    rfpCalendarInitialValue: null,
    onShowCalendarnewReg: false,
    onShowCalendarnewRfp: false,
    selectedRfpFilesSent: [],
    selectedRegBatchesSent: [],
  });

  const copyingRfpFilesSentArray = () => {
    if (
      state.accountFromToData.accountdata.accountDetailCompMatrix.rfpfilesent
        .length === 0
    ) {
      state.selectedRfpFilesSent.push({
        dateinfo: "",
      });
    } else {
      state.accountFromToData.accountdata.accountDetailCompMatrix.rfpfilesent.map(
        (rfpFilesSentItem) => {
          state.selectedRfpFilesSent.push({
            dateinfo: rfpFilesSentItem.shortDateinfo,
          });
        }
      );
    }
  };

  const setLoader = () => {
    setState({
      ...state,
      showScreenLoader: true,
    });
  };
  const resetLoader = () => {
    setState({
      ...state,
      showScreenLoader: false,
    });
  };
  const copyingRegBatchesArray = () => {
    if (
      state.accountFromToData.accountdata.accountDetailCompMatrix.renegsubmit
        .length === 0
    ) {
      state.selectedRegBatchesSent.push({
        dateinfo: "",
      });
    } else {
      state.accountFromToData.accountdata.accountDetailCompMatrix.renegsubmit.map(
        (regBatchesItem) => {
          state.selectedRegBatchesSent.push({
            dateinfo: regBatchesItem.shortDateinfo,
          });
        }
      );
    }
  };

  const onInputClick = (event) => {
    state.currentSelectedId = event.target.id;
    setState({ ...state, formChg: true, onShowCalendar: true });
  };

  const oncalendarChange = (event) => {
    state.rfpCalendarInitialValue = Utils.getShortDate(event.value);
    setState({ ...state, formChg: true, onShowCalendar: false });
  };

  const rfpCalendarChange = (event, i) => {
    if (event.value != null) {
      const convertedDate =
        event.value !== null && moment(event.value).isValid()
          ? moment(event.value).format("MM/DD/YYYY")
          : "";

      state.selectedRfpFilesSent[i].dateinfo = convertedDate;
    } else {
      state.selectedRfpFilesSent[i].dateinfo = "";
    }
    const rfpFilesSentItems = state.selectedRfpFilesSent.filter(
      (rfpItem) => rfpItem.dateinfo !== ""
    );
    const vCount = rfpFilesSentItems.length;

    state.accountFromToData.accountdata.accountDetailCompMatrix.totrfpfilesent =
      vCount;
    state.formChg = true;

    setState({
      ...state,
    });
  };

  const onDateBlurHandler = (event, i, property) => {
    const dateVal = event.target.value;
    state.formChg = true;
    let bError;

    if (dateVal == null || dateVal === "") {
      state[property][i].dateinfo = "";
      setState({
        ...state,
      });
      return false;
    }
    const dateValues = dateVal.split("/");
    if (dateValues.length != 3) {
      bError = true;
    }

    if (dateValues == null) return false;
    const dtYear = Number(dateValues[2]);
    const dtMonth = Number(dateValues[0]);
    const dtDay = Number(dateValues[1]);

    if (bError == true) {
      alert(
        `${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
      state[property][i].dateinfo = "";

      setState({
        ...state,
      });
    } else if (dtMonth < 1 || dtMonth > 12) {
      alert(
        `Invalid month (${dtMonth}). ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
    } else if (dtDay < 1 || dtDay > 31) {
      alert(
        `Invalid day ${dtDay}. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
    } else if (
      (dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) &&
      dtDay == 31
    ) {
      alert(
        `Day must be less than 30. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
      );
    } else if (dtMonth == 2) {
      const isleap =
        dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);

      if (dtDay > 28 && !isleap)
        alert(
          `Day must be less than 28. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
        );
      else if (dtDay > 29 && isleap)
        alert(
          `Day must be less than 29. ${dateVal} is not a valid date. Please enter the date in the format mm/dd/yyyy`
        );
    }
  };

  const rfpInputChange = (event, i) => {
    if (event.target.value.length <= 10 || event.target.value.length === 0) {
      state.selectedRfpFilesSent[i].dateinfo = event.target.value;
      const rfpFilesSentItems = state.selectedRfpFilesSent.filter(
        (rfpItem) => rfpItem.dateinfo !== ""
      );
      const vCount = rfpFilesSentItems.length;
      state.accountFromToData.accountdata.accountDetailCompMatrix.totrfpfilesent =
        vCount;
      state.formChg = true;
      setState({ ...state });
    }
  };

  const regBatchCalendarChange = (event, i) => {
    if (event.value != null) {
      const convertedDate =
        event.value !== null && moment(event.value).isValid()
          ? moment(event.value).format("MM/DD/YYYY")
          : "";
      state.selectedRegBatchesSent[i].dateinfo = convertedDate;
    } else {
      state.selectedRegBatchesSent[i].dateinfo = "";
    }
    const regBatchItems = state.selectedRegBatchesSent.filter(
      (regBatchItem) => regBatchItem.dateinfo !== ""
    );
    const vCount = regBatchItems && regBatchItems.length;

    state.accountFromToData.accountdata.accountDetailCompMatrix.totrenegsubmit =
      vCount;

    setState({
      ...state,
    });
  };

  const regInputChange = (event, i) => {
    if (event.target.value.length <= 10 || event.target.value.length === 0) {
      state.selectedRegBatchesSent[i].dateinfo = event.target.value;
      const regBatchesSentItems = state.selectedRegBatchesSent.filter(
        (regBatch) => regBatch.dateinfo !== ""
      );
      const vCount = regBatchesSentItems.length;
      state.accountFromToData.accountdata.accountDetailCompMatrix.totrenegsubmit =
        vCount;
      state.formChg = true;
      setState({ ...state });
    }
  };

  const rfpCalendarHide = (i) => {
    let validDate = true;
    state.formChg = true;
    validDate =
      state.selectedRfpFilesSent[i]?.dateinfo == undefined
        ? false
        : moment(state.selectedRfpFilesSent[i]?.dateinfo).isValid();

    if (!validDate) {
      state.selectedRfpFilesSent[i].dateinfo = "";
      const rfpFilesSentItems = state.selectedRfpFilesSent.filter(
        (rfpItem) => rfpItem.dateinfo !== ""
      );

      state.accountFromToData.accountdata.accountDetailCompMatrix.totrfpfilesent =
        rfpFilesSentItems?.length;
    } else {
      if (state.selectedRfpFilesSent[i]?.dateinfo !== "") {
        state.selectedRfpFilesSent[i].dateinfo = Utils.setDatewithYYYY(
          state.selectedRfpFilesSent[i]?.dateinfo
        );
      }
    }

    setState({
      ...state,
    });
  };

  const regBatchCalendarHide = (i) => {
    let validDate = true;
    state.formChg = true;
    validDate =
      state.selectedRegBatchesSent[i]?.dateinfo == undefined
        ? false
        : moment(state.selectedRegBatchesSent[i]?.dateinfo).isValid();

    if (!validDate) {
      state.selectedRegBatchesSent[i].dateinfo = "";
      const regBatchesSentItems = state.selectedRegBatchesSent.filter(
        (regBatch) => regBatch.dateinfo !== ""
      );

      state.accountFromToData.accountdata.accountDetailCompMatrix.totrenegsubmit =
        regBatchesSentItems?.length;
    } else {
      if (state.selectedRegBatchesSent[i]?.dateinfo !== "") {
        state.selectedRegBatchesSent[i].dateinfo = Utils.setDatewithYYYY(
          state.selectedRegBatchesSent[i]?.dateinfo
        );
      }
    }
    setState({
      ...state,
    });
  };
  /***********Adding new functions for API integration *************************************/
  //Adding new function  Calander add for new input fields
  const calendarChangeRegnew = (event, i) => {
    state.formChg = true;
    {
      const convertedDate = Utils.getShortDate(event.value);
      state.arrREG[state.currentSelectedIDNew] = convertedDate;

      const filtered = state.arrREG.filter(function (el) {
        return el != "";
      });
      state.accountFromToData.accountdata.accountDetailCompMatrix.totrenegsubmit =
        filtered.length;
      state.accountFromToData.accountdata.accountDetailCompMatrix.renegsubmit.push(
        {
          accountrecid:
            state.accountFromToData.accountdata.accountDetailCompMatrix
              .accountrecid,
          shortDateinfo: state.arrREG[i],
        }
      );

      setState({
        ...state,
        countRfpNew: filtered.length,
        onShowCalendarnewReg: false,
      });
    }
  };

  const onRfpFilesSentHandler = (event) => {
    state.formChg = true;
    state.arrRFP[0] = event.target.value;
    setState({
      ...state,
    });
  };

  //Adding new function  Calander add for new input fields
  const calendarChangeRfpnew = (event, i) => {
    state.formChg = true;
    {
      const convertedDate = Utils.getShortDate(event.value);
      state.arrRFP[state.currentSelectedIDNew] = convertedDate;

      const filtered = state.arrRFP.filter(function (el) {
        return el != "";
      });

      state.accountFromToData.accountdata.accountDetailCompMatrix.totrfpfilesent =
        filtered.length;

      state.accountFromToData.accountdata.accountDetailCompMatrix.rfpfilesent.push(
        {
          accountrecid:
            state.accountFromToData.accountdata.accountDetailCompMatrix
              .accountrecid,
          shortDateinfo: state.arrRFP[i],
        }
      );
      state.countRegNew = filtered.length;
      setState({
        ...state,
        onShowCalendarnewRfp: false,
      });
    }
  };

  /* Adding new input field for Calendar open */

  const onInputClickReg = (event) => {
    state.formChg = true;
    state.currentSelectedIDNew = event.target.id;
    state.onShowCalendarnewReg = true;
    setState({ ...state, onShowCalendarnewReg: true });
  };

  /* Adding new input field for Calendar open */

  const onInputClickRfp = (event) => {
    state.formChg = true;
    state.currentSelectedIDNew = event.target.id;
    state.onShowCalendarnewRfp = true;
    setState({ ...state, onShowCalendarnewRfp: true });
  };

  /********* Add Click new input field for Reg Batches****************/

  const addClicknew = () => {
    state.formChg = true;
    state.selectedRegBatchesSent.push({
      dateinfo: "",
    });
    setState({
      ...state,
    });
  };
  /********* Add Click new input field for Rfp files****************/

  const addClickNewRFP = () => {
    state.formChg = true;
    state.selectedRfpFilesSent.push({
      dateinfo: "",
    });
    setState({
      ...state,
    });
  };

  /************** Remove New Reg   ***********/
  const removeClickRegNew = (el, i) => {
    state.formChg = true;
    if (window.confirm(Settings.complexityMatrix.alertMessage.label)) {
      const selectedRegBatches = [...state.selectedRegBatchesSent];

      if (
        selectedRegBatches[i].dateinfo !== "" &&
        selectedRegBatches[i].dateinfo !== null &&
        state.accountFromToData.accountdata.accountDetailCompMatrix
          .totrenegsubmit > 0
      ) {
        state.accountFromToData.accountdata.accountDetailCompMatrix.totrenegsubmit =
          state.accountFromToData.accountdata.accountDetailCompMatrix
            .totrenegsubmit - 1;
      }
      selectedRegBatches.splice(i, 1);
      setState({ ...state, selectedRegBatchesSent: selectedRegBatches });
    }
  };

  /************** Remove New RFP   ***********/
  const removeClickRfpNew = (el, i) => {
    state.formChg = true;
    if (window.confirm(Settings.complexityMatrix.alertMessage.label)) {
      const selectedRfpFiles = [...state.selectedRfpFilesSent];

      if (
        selectedRfpFiles[i].dateinfo !== "" &&
        selectedRfpFiles[i].dateinfo !== null &&
        state.accountFromToData.accountdata.accountDetailCompMatrix
          .totrfpfilesent > 0
      ) {
        state.accountFromToData.accountdata.accountDetailCompMatrix.totrfpfilesent =
          state.accountFromToData.accountdata.accountDetailCompMatrix
            .totrfpfilesent - 1;
      }
      selectedRfpFiles.splice(i, 1);
      setState({ ...state, selectedRfpFilesSent: selectedRfpFiles });
    }
  };

  //When REG Calendar value changes and converting its data format
  const calendarChangeReg = (event) => {
    state.formChg = true;
    const convertedDate = Utils.getShortDate(event.value);
    state.valuesReg[state.currentSelectedIdReg] = convertedDate;

    const filteredreg = state.valuesReg.filter(function (el) {
      return el != "";
    });
    if (state.valuesReg[-1] !== "") {
      filteredreg.length = filteredreg.length + 1;
    }
    setState({
      ...state,
      countReg: filteredreg.length,
      onShowCalendarReg: false,
    });
  };

  const onInputChange = () => {
    state.formChg = true;
    state.currentSelectedId;
  };

  const onlinkExcelDownload = () => {
    API.getExcelLink();
  };
  // Function will help to check if Calendar value changed on same input field or another input field and change counter value
  const handleChange = (i, event) => {
    state.formChg = true;
    const valuesRFP = [...state.valuesRFP];
    valuesRFP[i] = { ...valuesRFP[i], key: event.target.value };
    setState({ ...state, valuesRFP: valuesRFP });
    const flag = false;
    const newvaluesRFP = valuesRFP.map((el) =>
      el.i === i
        ? {
            ...el,
            key: event.target.value,
          }
        : { el }
    );

    if (flag === false) {
      const countActualRFP = newvaluesRFP.map((objData, n) => {
        objData.i === n
          ? null
          : Object.keys(objData).forEach((key) => {
              if (objData[key] !== "") {
                if (state.flag) {
                  setState({
                    ...state,
                    countRFP: 1 + state.countRFP,
                    flag: false,
                  });
                } else {
                  setState({ ...state, countRFP: state.countRFP + 1 });
                }
              }
            });
      });
    }
  };

  //Run on clicking of input field
  const onInputClickREG = (event) => {
    state.formChg = true;
    state.currentSelectedIdReg = event.target.id;

    setState({ ...state, onShowCalendarReg: true });
  };

  const addClick = (i) => {
    state.formChg = true;
    setState({
      ...state,
      selectedRfpFilesSent: [...state.selectedRfpFilesSent, ""],
    });
  };

  const CalendarClosed = () => {
    state.formChg = true;
    state.onShowCalendar = false;
    state.onShowCalendarReg = false;
    setState({ ...state, onShowCalendar: false, onShowCalendarReg: false });
  };
  const addClickRenegotiation = () => {
    state.formChg = true;
    setState((prevState) => ({
      ...state,
      valuesReg: [...prevState.valuesReg, ""],
    }));
  };

  const setAccountData = (data: any) => {
    if (data) {
      if (data.accountDetailCompMatrix.mergacqrename === null)
        data.accountDetailCompMatrix.mergacqrename = "";
      if (data.accountDetailCompMatrix.tacbonuscomments === null)
        data.accountDetailCompMatrix.tacbonuscomments = "";
      if (data.accountDetailCompMatrix.rateauditcomments === null)
        data.accountDetailCompMatrix.rateauditcomments = "";
      state.accountFromToData.accountdata = data;
    }

    if (
      state.accountFromToData.accountdata.accountDetailCompMatrix
        .addquestcomp !== null
    )
      state.accountFromToData.accountdata.accountDetailCompMatrix.addquestcomp =
        String(
          state.accountFromToData.accountdata.accountDetailCompMatrix
            .addquestcomp
        );
    if (
      state.accountFromToData.accountdata.accountDetailCompMatrix.satrating !==
      null
    )
      state.accountFromToData.accountdata.accountDetailCompMatrix.satrating =
        String(
          state.accountFromToData.accountdata.accountDetailCompMatrix.satrating
        );
    if (
      state.accountFromToData.accountdata.accountDetailCompMatrix.tacbonus !==
      null
    )
      state.accountFromToData.accountdata.accountDetailCompMatrix.tacbonus =
        String(
          state.accountFromToData.accountdata.accountDetailCompMatrix.tacbonus
        );
  };

  const onChangeRfpFilesSent = (event) => {
    state.formChg = true;
    const date = moment(event.value).format("MM/DD/YYYY");
    let count = 0;
    state.accountFromToData.accountdata.accountDetailCompMatrix.rfpfilesent[0].dateinfo =
      date;
    state.accountFromToData.accountdata.accountDetailCompMatrix.totrfpfilesent =
      count++;
    setState({
      ...state,
    });
  };

  const onRateAuditCommentsChangeHandler = (event) => {
    state.formChg = true;
    state.accountFromToData.accountdata.accountDetailCompMatrix.rateauditcomments =
      event.target.value;
    setState({ ...state });
  };

  const onRateAuditCommentsBlurHandler = (event) => {
    state.formChg = true;
    state.accountFromToData.accountdata.accountDetailCompMatrix.rateauditcomments =
      event.target.value;
    if (
      state.accountFromToData.accountdata.accountDetailCompMatrix
        .rateauditcomments.length > Settings.complexityMatrix.maxLength
    ) {
      state.accountFromToData.accountdata.accountDetailCompMatrix.rateauditcomments =
        state.accountFromToData.accountdata.accountDetailCompMatrix.rateauditcomments.substr(
          0,
          Settings.complexityMatrix.maxLength - 1
        );
      setIsAlertMsg(true);
    }
    setState({
      ...state,
    });
  };

  const onMergacqrenameChangeHandler = (event) => {
    state.formChg = true;
    state.accountFromToData.accountdata.accountDetailCompMatrix.mergacqrename =
      event.target.value;
    setState({ ...state });
  };

  const onMergacqrenameBlurHandler = (event) => {
    state.formChg = true;
    state.accountFromToData.accountdata.accountDetailCompMatrix.mergacqrename =
      event.target.value;
    if (
      state.accountFromToData.accountdata.accountDetailCompMatrix.mergacqrename
        .length > Settings.complexityMatrix.maxLength
    ) {
      state.accountFromToData.accountdata.accountDetailCompMatrix.mergacqrename =
        state.accountFromToData.accountdata.accountDetailCompMatrix.mergacqrename.substr(
          0,
          Settings.complexityMatrix.maxLength - 1
        );
      setIsAlertMsg(true);
    }
    setState({
      ...state,
    });
  };

  const onTacbonusCommentsChangeHandler = (event) => {
    state.formChg = true;
    state.accountFromToData.accountdata.accountDetailCompMatrix.tacbonuscomments =
      event.target.value;
    setState({ ...state });
  };

  const onTacbonusCommentsBlurHandler = (event) => {
    state.formChg = true;
    state.accountFromToData.accountdata.accountDetailCompMatrix.tacbonuscomments =
      event.target.value;
    if (
      state.accountFromToData.accountdata.accountDetailCompMatrix
        .tacbonuscomments.length > Settings.complexityMatrix.maxLength
    ) {
      state.accountFromToData.accountdata.accountDetailCompMatrix.tacbonuscomments =
        state.accountFromToData.accountdata.accountDetailCompMatrix.tacbonuscomments.substr(
          0,
          Settings.complexityMatrix.maxLength - 1
        );
      setIsAlertMsg(true);
    }
    setState({
      ...state,
    });
  };

  const onChangeData = (ddn, event) => {
    state.formChg = true;
    state.accountFromToData.accountdata.accountDetailCompMatrix[ddn] =
      event.target.value;
    if (
      state.accountFromToData.accountdata.accountDetailCompMatrix[ddn] === ""
    ) {
      state.accountFromToData.accountdata.accountDetailCompMatrix[ddn] = null;
    }
    setState({ ...state, accountFromToData: state.accountFromToData });
  };

  const validate = (event) => {
    const { id, value } = event.target;
    if (value.length > 255) {
      let mergers = { ...state.selectedAccountFromToData.mergers };
      mergers = value.substring(0, 255);
      state.selectedAccountFromToData[id] = mergers;
    }

    if (id === Settings.complexityMatrix.merger.id) {
      Utils.checkMaxChar(value, 255);
    }

    setState({
      ...state,
      selectedAccountFromToData: state.selectedAccountFromToData,
    });
  };

  const modalOpen = () => {
    setState({
      ...state,
      onModalOpen: !state.onModalOpen,
    });
  };

  const autoSaveData = () => {
    const data = {
      ...state.accountFromToData.accountdata.accountDetailCompMatrix,
    };
    for (let i = state.selectedRfpFilesSent.length - 1; i >= 0; i--) {
      if (state.selectedRfpFilesSent[i].dateinfo == "") {
        state.selectedRfpFilesSent.splice(i, 1);
      }
    }
    for (let j = state.selectedRegBatchesSent.length - 1; j >= 0; j--) {
      if (state.selectedRegBatchesSent[j].dateinfo == "") {
        state.selectedRegBatchesSent.splice(j, 1);
      }
    }
    setState({ ...state });
    data.rfpfilesent = state.selectedRfpFilesSent;
    data.renegsubmit = state.selectedRegBatchesSent;
    Object.keys(data).map((key) => {
      if (typeof data[key] == "boolean") {
        if (data[key]) {
          data[key] = "Y";
        }
      }
    });
    const accountrecid =
      state.accountFromToData.accountdata.accountDetailCompMatrix.accountrecid;
    setLoader();
    API.updateComplexityMatrixData(data, accountrecid).then(() => {
      resetLoader();
      if (state.selectedRfpFilesSent.length === 0) {
        state.selectedRfpFilesSent.push({
          dateinfo: "",
        });
      }
      if (state.selectedRegBatchesSent.length === 0) {
        state.selectedRegBatchesSent.push({
          dateinfo: "",
        });
      }
    });
  };
  const complexityMatrixContext = {
    state,
    setState,
    validate,
    setAccountData,
    onChangeData,
    onlinkExcelDownload,
    modalOpen,
    onInputClick,
    handleChange,
    addClick,
    addClickRenegotiation,
    rfpCalendarChange,
    regBatchCalendarChange,
    rfpCalendarHide,
    regBatchCalendarHide,
    onInputChange,
    oncalendarChange,
    onInputClickREG,
    calendarChangeReg,
    autoSaveData,
    CalendarClosed,
    calendarChangeRegnew,
    onInputClickReg,
    addClicknew,
    removeClickRegNew,
    addClickNewRFP,
    removeClickRfpNew,
    calendarChangeRfpnew,
    onInputClickRfp,
    onRfpFilesSentHandler,
    onChangeRfpFilesSent,
    copyingRfpFilesSentArray,
    copyingRegBatchesArray,
    onRateAuditCommentsChangeHandler,
    onRateAuditCommentsBlurHandler,
    onMergacqrenameChangeHandler,
    onMergacqrenameBlurHandler,
    onTacbonusCommentsChangeHandler,
    onTacbonusCommentsBlurHandler,
    rfpInputChange,
    regInputChange,
    setIsAlertMsg,
    isAlertMsg,
    setLoader,
    resetLoader,
    onDateBlurHandler,
  };

  return (
    <ComplexityMatrixContext.Provider value={complexityMatrixContext}>
      {props.children}
    </ComplexityMatrixContext.Provider>
  );
};

export const ComplexityMatrixContextConsumer = ComplexityMatrixContext.Consumer;
export default ComplexityMatrixContext;
