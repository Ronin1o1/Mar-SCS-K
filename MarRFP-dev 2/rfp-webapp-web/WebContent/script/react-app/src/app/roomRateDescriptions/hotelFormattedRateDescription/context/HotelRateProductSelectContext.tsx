import React, { useState } from "react";

//import API from "../service/API";

const HotelRateProductSelectContext = React.createContext({});
export const HotelRateProductSelectContextProvider = (props) => {
  const [state, setState] = useState({
    hotelList: [],
    inputmarshacode: "",
    hotelName: "",
    contactEmail: null,
    showLoading: true,
    brandName: "",
    retrieveRoomPoolList: [],
    retrieveRoomPoolListLoader: true,
    isRoomPoolDetails: false,
    roomPool: "",
    showHotelInstructions: null,
    RTND_ListCode: null,
    roomTypeNameDefinitionGroup: [],
    readOnly: null,
    typeLists: null,
    uomLists: null,
    dropSwitch: false,
    roomTypeNameDataView: null,
    roomNames: null,
    roomTypeNameMenu: [],
    productSearchList: [],
    viewDescriptionList: [],
    namePage: "",
    productMenuData: [],
    rateProductNameMenu: "",
    productNewName: "",
    checkAlert: false,
    selectedMarshaCode: "",
  });

  const getHotelList = (data) => {
    setState({
      ...state,
      hotelList: data.hotelList,
      contactEmail: data.contactEmail,
      showLoading: false,
    });
  };

  const setProductMenuData = (data) => {
    setState({
      ...state,
      productMenuData: data,
    });
  };
  const setBrandName = (name) => {
    setState({
      ...state,
      brandName: name,
    });
  };
  const setName = (value) => {
    state.namePage = value;
    setState({
      ...state,
      namePage: state.namePage,
    });
  };
  const setProductSearchList = (data) => {
    setState({
      ...state,
      productSearchList: data,
    });
  };

  const setNewProductName = (value) => {
    state.productNewName = value;
    setState({
      ...state,
      productNewName: state.productNewName,
      checkAlert: state.checkAlert,
    });
  };
  const setMandatoryAlert = (validCheck) => {
    state.checkAlert = validCheck;
    setState({
      ...state,
      checkAlert: state.checkAlert,
    });
  };
  const handleChangeProperty = (e) => {
    const value = state.hotelList.filter(function (item) {
      return item.marshaCode == e.target.value;
    });
    setState({
      ...state,
      inputmarshacode: value[0].marshaCode,
      hotelName: value[0].hotelName,
    });
  };

  const setMarshaOnBlur = (marshaCode, hotelName) => {
    setState({
      ...state,
      inputmarshacode: marshaCode,
      hotelName: hotelName,
    });
  };

  const handleHotelChange = (event) => {
    setState({
      ...state,
      inputmarshacode: event.target.value,
    });
    //on change of marsha code, select the property on property drop down.
    handleChangeProperty(event);
  };

  const handleMarshaChange = (event) => {
    setState({
      ...state,
      selectedMarshaCode: event.target.value,
    });
  };

  const clearData = () => {
    setState({
      ...state,
      inputmarshacode: "",
      selectedMarshaCode: "",
    });
  };

  const setStateParams = (marshaCode, hotelName) => {
    setState({ ...state, inputmarshacode: marshaCode, hotelName: hotelName });
  };

  const setViewProductData = (data) => {
    setState({
      ...state,
      viewDescriptionList: data,
    });
  };

  /**check minimum selected   */
  const checkMinOccurs = () => {
    let validSelected = true;
    const roomTypeNameDefinitionList =
      state.roomTypeNameDataView.roomTypeNameDefinitionList;
    const minOccurs = roomTypeNameDefinitionList.minOccurs;
    const rtnd_ListName = roomTypeNameDefinitionList.rtnd_ListName;
    const roomTypeNameDefinitionSample = state.roomTypeNameDefinitionGroup[0];
    const selectedValues =
      roomTypeNameDefinitionSample.roomTypeNameDefinition.filter(
        (item) => item.availabilityInd == "Y"
      );
    if (selectedValues.length < minOccurs && minOccurs >= 0) {
      validSelected = false;
      alert(`At least ${minOccurs} ${rtnd_ListName} must be selected.`);
      return validSelected;
    } else {
      validSelected = true;
      return validSelected;
    }
  };

  const hotelRateProductSelectContext = {
    state,
    setState,
    getHotelList,
    handleHotelChange,
    handleChangeProperty,
    clearData,
    setStateParams,
    checkMinOccurs,
    setProductSearchList,
    setViewProductData,
    setName,
    setProductMenuData,
    setNewProductName,
    setBrandName,
    setMandatoryAlert,
    setMarshaOnBlur,
    handleMarshaChange,
  };

  return (
    <HotelRateProductSelectContext.Provider
      value={hotelRateProductSelectContext}
    >
      {props.children}
    </HotelRateProductSelectContext.Provider>
  );
};
export const HotelRateProductSelectContextConsumer =
  HotelRateProductSelectContext.Consumer;
export default HotelRateProductSelectContext;
