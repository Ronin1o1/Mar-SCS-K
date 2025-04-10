import React, { useState } from "react";
import Utils from "../../../admin/utils/Utils";
import Util from "../../../../common/utils/Utils";
import Settings from "../static/Settings";
import ObjectDestructure from "../../../../common/utils/ObjectDestructure";
import API from "../service/API";

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const PeriodaintenanceContext = React.createContext({});

export const PeriodMaintenanceContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    periodMaintenanceListData: {
      periodMaintenanceList: [
        {
          id: null,
          startdate: null,
          enddate: null,
          hotelsview: null,
          pricingperiodid: null,
          period: null,
          duedate: null,
          hasAccounts: null,
          shortDueDate: null,
          longDueDate: null,
          shortStartdate: null,
          shortEnddate: null,
        },
      ],
    },
    selectedPeriodYear: {
      id: null,
      startdate: null,
      enddate: null,
      hotelsview: null,
      pricingperiodid: null,
      period: null,
      duedate: null,
      hasAccounts: null,
      shortDueDate: null,
      longDueDate: null,
      shortStartdate: null,
      shortEnddate: null,
      newAddFlag: null,
      // periodduedate: null,
    },

    showModal: false,
    renderLoading: null,
    isAddButtonClicked: false,
    isEditButtonClicked: false,
    defaultAccountView: "",
  });

  //to handle initial null dates loading
  const initializeDates = () => {
    const periodMaintenanceList = {
      ...state.periodMaintenanceListData.periodMaintenanceList,
    };
    if (periodMaintenanceList != null) {
      if (periodMaintenanceList[0].duedate == null) {
        periodMaintenanceList[0].duedate = "";

        setState((prevState) => ({
          ...prevState,
          periodMaintenanceListData: {
            ...prevState.periodMaintenanceListData,
            periodMaintenanceList: periodMaintenanceList,
          },
        }));
      }
    }
  };

  const onChange = (event) => {
    const { type, id, value } = event.target;

    const selectedPeriodYear = { ...state.selectedPeriodYear };
    selectedPeriodYear[id] = value;
    setState({ ...state, selectedPeriodYear: selectedPeriodYear });
  };

  const validate = (event) => {
    const { id, value } = event.target;

    if (id === Settings.editPeriodMaintenance.formFields.date.id) {
      Util.checkDate(value);
    }
    const selectedPeriodYear = { ...state.selectedPeriodYear };
    selectedPeriodYear[id] = value;
    setState({ ...state, selectedPeriodYear: selectedPeriodYear });
  };

  const updatePeriodMaintenance = (data: any, closeModal?: boolean) => {
    if (data) {
      const periodMaintenanceListData = { ...state.periodMaintenanceListData };
      periodMaintenanceListData.periodMaintenanceList = data;

      setState({
        ...state,
        periodMaintenanceListData: periodMaintenanceListData,
        showModal: closeModal ? !state.showModal : state.showModal,
      });
    }
  };

  const showModal = (data) => {
    let selectedPeriodYear = { ...state.selectedPeriodYear };
    if (data && data.pricingperiodid) {
      selectedPeriodYear = data;
      setState({
        ...state,
        showModal: !state.showModal,
        selectedPeriodYear: selectedPeriodYear,
      });
    } else {
      setState({
        ...state,
        showModal: !state.showModal,
        selectedPeriodYear: {
          id: null,
          startdate: null,
          enddate: null,
          hotelsview: null,
          pricingperiodid: null,
          period: data,
          duedate: null,
          hasAccounts: null,
          shortDueDate: null,
          longDueDate: null,
          shortStartdate: null,
          shortEnddate: null,
          newAddFlag: false,
        },
      });
    }
  };
  const deletePeriod = (pricingperiodid: number) => {
    setIsLoading(true);
    API.deletePeriod(pricingperiodid).then((data) => {
      API.getPricingPeriod().then((data) => {
        const filteredArray = data.filter(function (value) {
          return value.dueDates.length > 0;
        });
        setIsLoading(false);
        const convertedData =
          ObjectDestructure.getConvertedJsonArray(filteredArray);
        Utils.addingFlagToJson(convertedData);
        updatePeriodMaintenance(convertedData);
      });
    });
  };

  const setShowModal = (closeModal?: boolean) => {
    setState({
      ...state,
      showModal: closeModal ? !state.showModal : state.showModal,
    });
  };

  const updatePeriod = () => {
    setShowModal(true);
    const selectedPeriodYear = { ...state.selectedPeriodYear };
    if (selectedPeriodYear.shortDueDate != null)
      selectedPeriodYear.shortDueDate = Util.setDatewithYYYY(
        selectedPeriodYear.shortDueDate
      );

    if (selectedPeriodYear.pricingperiodid === null) {
      selectedPeriodYear.pricingperiodid = 0;
    }
    setIsLoading(true);
    API.updatePeriod(selectedPeriodYear).then(() => {
      API.getPricingPeriod().then((data) => {
        const filteredArray = data.filter(function (value) {
          return value.dueDates.length > 0;
        });
        const convertedData =
          ObjectDestructure.getConvertedJsonArray(filteredArray);
        Utils.addingFlagToJson(convertedData);
        updatePeriodMaintenance(convertedData, true);
        setIsLoading(false);
      });
    });
  };
  const updateHotelView = (data, event) => {
    let updatedReqObj = {};
    const periodList = { ...state.periodMaintenanceListData };

    const selectedRow = data;
    const hotelsviewStatus = event.target.value;
    const updatedData = { ...selectedRow, hotelsview: hotelsviewStatus };

    const index = periodList.periodMaintenanceList.findIndex(
      (c) => c.pricingperiodid == updatedData.pricingperiodid
    );
    periodList.periodMaintenanceList[index] = updatedData;

    updatedReqObj = Utils.reqObjHotelView(periodList.periodMaintenanceList);
    setIsLoading(true);
    API.updateHotelView(updatedReqObj).then((data) => {
      API.getPricingPeriod().then((data) => {
        const convertedData = ObjectDestructure.getConvertedJsonArray(data);
        Utils.addingFlagToJson(convertedData);
        updatePeriodMaintenance(convertedData);
        setIsLoading(false);
      });
    });
  };

  const periodMaintenanceContext = {
    updatePeriodMaintenance,
    state,
    setState,
    onChange,
    showModal,
    deletePeriod,
    updatePeriod,
    validate,
    updateHotelView,
    initializeDates,
    isLoading,
    setIsLoading,
  };

  return (
    <PeriodaintenanceContext.Provider value={periodMaintenanceContext}>
      {props.children}
    </PeriodaintenanceContext.Provider>
  );
};

export const PeriodMntcContextConsumer = PeriodaintenanceContext.Consumer;
export default PeriodaintenanceContext;
