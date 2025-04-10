import React, { useState } from "react";

import API from "../service/API";

const SelectHotelContext = React.createContext({});
export const SelectHotelContextProvider = (props) => {
  const [state, setState] = useState({
    formChg: "N",
    isReadOnly: null,
    productDescription: [],
    roomDefMenu: [],
    roomTypeNameDataView: [],
    productOptions: [],
    roomPool: "",
    inputmarshacode: "",
    hotelName: "",
    retrieveRoomPoolList: [],
    retrieveRoomPoolListLoader: true,
    retrieveRateProgramList: [],
    retrieveRateProgramListLoader: true,
    roomNames: "",
    finishData: null,
    newInd: false,
  });

  const getFinishRoomNameData = (data) => {
    const hotelData = { ...state };
    hotelData.finishData = data;
    setState(hotelData);
  };

  const getRoomNameData = (data, roomNames) => {
    const count = 0;
    if (data) {
      const hotelData = { ...state };
      hotelData.isReadOnly = data.isReadOnly;
      hotelData.roomDefMenu = data.RoomDefDataView.roomDefMenu;
      hotelData.productDescription =
        data.RoomDefDataView.productView.productDefinition;
      hotelData.productOptions =
        data.RoomDefDataView.productView.productOptions;
      hotelData.roomTypeNameDataView = data.RoomDefDataView;
      hotelData.finishData = null;
      setState(hotelData);
    }
  };
  const getRateProgramNameData = (data, roomNames) => {
    if (data) {
      const hotelData = { ...state };
      hotelData.isReadOnly = data.isReadOnly;
      hotelData.roomDefMenu = data.roomDefDataView.roomDefRateProgMenu;
      hotelData.productDescription =
        data.roomDefDataView.productView.productDefinition;
      hotelData.productOptions =
        data.roomDefDataView.productView.productOptions;
      hotelData.roomTypeNameDataView = data.roomDefDataView;

      setState(hotelData);
    }
  };

  const formChanged = (e) => {
    setState({
      ...state,
      formChg: "Y",
    });
  };

  const getSelectRoomPoolList = (data) => {
    setState({
      ...state,
      retrieveRoomPoolList: data,
      retrieveRoomPoolListLoader: false,
    });
  };
  const getSelectRateProgramList = (data) => {
    setState({
      ...state,
      retrieveRateProgramList: data.RateProgramList,
      retrieveRateProgramListLoader: false,
    });
  };

  const setStateParams = (roomPool, marshaCode, hotelName) => {
    setState({
      ...state,
      roomPool: roomPool,
      inputmarshacode: marshaCode,
      hotelName: hotelName,
    });
  };

  const selectHotelContext = {
    state,
    setState,
    getSelectRoomPoolList,
    getRoomNameData,
    setStateParams,
    formChanged,
    getSelectRateProgramList,
    getRateProgramNameData,
    getFinishRoomNameData,
  };

  return (
    <SelectHotelContext.Provider value={selectHotelContext}>
      {props.children}
    </SelectHotelContext.Provider>
  );
};
export const SelectHotelContextConsumer = SelectHotelContext.Consumer;
export default SelectHotelContext;
