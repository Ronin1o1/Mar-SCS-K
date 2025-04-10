import React, { useState } from "react";

const ReportContext = React.createContext({});
export const ReportContextProvider = (props) => {
  const [state, setState] = useState({
    header: true,
    showQuickSelect: false,
    showScreenLoader: false,
    hotelList: {
      list: [{}],
    },
    topTravelList: {
      list: [{}],
    },
    selectedHotelList: {
      list: [{}],
    },
  });

  const urlDetails = { ...state };

  const setGridDataList = (data) => {
    if (data) {
      const hotelList = { ...state.hotelList };
      hotelList.list = data;
      setState({
        ...state,
        hotelList: hotelList,
      });
    }
  };
  const setTopTravelData = (data) => {
    if (data) {
      const topTraveldata = { ...state.hotelList };
      topTraveldata.list = data;
      setState({
        ...state,
        topTravelList: topTraveldata,
      });
    }
  };
  const setSelectedIds = (data) => {
    if (data) {
      const hotelList = { ...state.hotelList };
      hotelList.list = data;
      setState({
        ...state,
        selectedHotelList: hotelList,
      });
    }
  };
  const deselect = () => {
    const list = { ...state.hotelList };
    list.list.map((res) => {
      res["isChecked"] = false;
    });
    setState({
      ...state,
      hotelList: list,
    });
  };
  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const setQuickSelectList = (marshaList) => {
    const list = JSON.parse(JSON.stringify(state.hotelList));
    if (marshaList.length) {
      marshaList.split(",").map((name) => {
        list.list.map((res: any) => {
          if (res.marshaCode === name.toUpperCase()) {
            res.isChecked = true;
          }
        });
      });
      setState({
        ...state,
        hotelList: list,
      });
    }
  };
  const setQuickSelect = () => {
    setState({
      ...state,
      showQuickSelect: !state.showQuickSelect,
    });
  };
  const pricingContext = {
    state,
    setState,
    setGridDataList,
    setLoader,
    deselect,
    setQuickSelectList,
    setQuickSelect,
    setSelectedIds,
    setTopTravelData,
  };

  return (
    <ReportContext.Provider value={pricingContext}>
      {props.children}
    </ReportContext.Provider>
  );
};
export const ReportContextConsumer = ReportContext.Consumer;
export default ReportContext;
