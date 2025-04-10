import React, { useState } from "react";

import API from "../service/API";
import Settings from "../static/Settings";

const ViewRateDescriptionContext = React.createContext({});
export const ViewRateDescriptionContextProvider = (props) => {
  const [state, setState] = useState({
    inputmarshacode: "",
    hotelName: "",
    productSearchList: [],
    viewDescriptionList: [],
    viewDescriptionText: [],
    channelListObj: [],
    languageListObj: [],
    entryListObj: [],
    defaultChannelselect: [],
    apiParams: {},
    setProductName: "",
  });

  const setChannelListVal = (dataval) => {
    setState({
      ...state,
      channelListObj: dataval,
    });
  };

  const setLanguageListVal = (dataval) => {
    setState({
      ...state,
      languageListObj: dataval,
    });
  };

  const setEntryListVal = (dataval) => {
    setState({
      ...state,
      entryListObj: dataval,
    });
  };
  const setProductSearchList = (data) => {
    setState({
      ...state,
      productSearchList: data,
    });
  };

  const setStateParams = (marshaCode, hotelName) => {
    setState({ ...state, inputmarshacode: marshaCode, hotelName: hotelName });
  };

  const setApiParams = (obj) => {
    const params = {
      rpgmCode: obj.rateProgramCode,
      rpgmName: obj.rateProgramName,
      channelSelect: state.channelListObj.name,
      langSelect: state.languageListObj.code,
      entrySelect: state.entryListObj.name,
      strRatePlanAssignmentsSearch: JSON.stringify({
        startKey: 0,
        endKey: 0,
        startRatePlanCode: obj.startRatePlanCode,
        endRatePlanCode: obj.endRatePlanCode,
        searchCompleted: false,
      }),
      firstProduct: obj.firstProduct,
      startPage: "",
      endPage: "",
      curPage: "",
      formChg: "N",
      productCode: "",
      productName: "",
      managed: "",
      level: "",
      entryLevel: obj.entryLevel,
      marshaCode: obj.marshaCode,
      hotelName: obj.hotelName,
      brandCode: state.viewDescriptionList.brandCode,
      brandName: "",
      navPage: obj.navPage,
    };
    state.apiParams = params;
    setState({
      ...state,
      apiParams: state.apiParams,
    });
  };

  const setViewProductData = (data) => {
    setState({
      ...state,
      viewDescriptionList: data,
      channelListObj: data.channelList[17],
      languageListObj: data.languageList[0],
      entryListObj: data.entryList[0],
    });
  };

  const setProduct = (data) => {
    state.setProductName =
      data.ratePlanAssignmentDataList !== null
        ? data?.ratePlanAssignmentDataList[0].ratePlanCode
        : null;
    setState({
      ...state,
      setProductName: state.setProductName,
    });
  };
  const setRateDescription = (data) => {
    setState({
      ...state,
      viewDescriptionText: data.descriptionText,
    });
  };
  const KorSafeCharsOnly = (e) => {
    let charCode;
    if (window.event) charCode = e.charCode;
    else if (e.which) charCode = e.which;
    if (charCode == undefined) return true;
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
      e.preventDefault();
      return false;
    }
    return true;
  };
  const isValidProgramName = (strValue) => {
    const re = /^[a-zA-Z]/;
    return re.test(strValue);
  };

  const handleValidProgramName = (strValue) => {
    if (strValue !== "") {
      if (!isValidProgramName(strValue)) {
        alert(`${Settings.programNameAlert}`);
        return false;
      } else return true;
    }
  };
  const viewratedescriptionContext = {
    state,
    setState,
    setStateParams,
    setProductSearchList,
    setViewProductData,
    setRateDescription,
    setChannelListVal,
    setLanguageListVal,
    setEntryListVal,
    setApiParams,
    setProduct,
    KorSafeCharsOnly,
    isValidProgramName,
    handleValidProgramName,
  };

  return (
    <ViewRateDescriptionContext.Provider value={viewratedescriptionContext}>
      {props.children}
    </ViewRateDescriptionContext.Provider>
  );
};
export const ViewRateDescriptionContextConsumer =
  ViewRateDescriptionContext.Consumer;
export default ViewRateDescriptionContext;
