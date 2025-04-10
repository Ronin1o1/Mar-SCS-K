import React, { useState } from "react";

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const RateLoadingContext = React.createContext({});

export const RateLoadingContextProvider = (props) => {
  const [state, setState] = useState({
    RateLoadingData: {
      rateLoadingList: [
        {
          affiliationid: null,
          affiliationname: null,
          servicetype: null,
          canprice: null,
          currentroompool: null,
          default_percent: null,
        },
      ],
    },
    selectedRateLoad: {
      affiliationid: null,
      affiliationname: null,
      servicetype: null,
      canprice: null,
      currentroompool: null,
      default_percent: null,
    },
    showModal: false,
    renderLoading: null,
    isAddButtonClicked: false,
    isEditButtonClicked: false,
  });

  const setRateLoadingListData = (data: any, closeModal?: boolean) => {
    if (data) {
      const RateLoadingData = { ...state.RateLoadingData };
      RateLoadingData.rateLoadingList = data;

      setState({
        ...state,
        RateLoadingData: RateLoadingData,
        showModal: closeModal ? !state.showModal : state.showModal,
      });
    }
  };

  const showModal = () => {
    setState({
      ...state,
      showModal: !state.showModal,
    });
  };

  const onChangeFeildValue = (rowData, field, event) => {
    const selectedRateLoad = { ...state.RateLoadingData };
    const index = selectedRateLoad.rateLoadingList.findIndex(
      (element) => element.affiliationid == rowData.affiliationid
    );

    if (field == "checkbox") {
      const { checked } = event.target;
      if (checked == false) {
        selectedRateLoad.rateLoadingList[index].canprice = "N";
      } else {
        selectedRateLoad.rateLoadingList[index].canprice = "Y";
      }
    } else if (field == "select") {
      const { value } = event;
      selectedRateLoad.rateLoadingList[index].currentroompool = value;
    } else if (field == "input") {
      const { value } = event.target;
      selectedRateLoad.rateLoadingList[index].default_percent = parseInt(value);
    }

    setState({ ...state, RateLoadingData: selectedRateLoad });
  };

  const rateLoadingContext = {
    state,
    setState,
    setRateLoadingListData,
    showModal,
    onChangeFeildValue,
  };

  return (
    <RateLoadingContext.Provider value={rateLoadingContext}>
      {props.children}
    </RateLoadingContext.Provider>
  );
};

export const RateLoadingConsumer = RateLoadingContext.Consumer;
export default RateLoadingContext;
