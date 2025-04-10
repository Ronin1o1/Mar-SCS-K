import moment from "moment";
import React, { useState } from "react";
import ObjectDestructure from "../../../../common/utils/ObjectDestructure";
import Util from "../../../../common/utils/Utils";
import Utils from "../../../admin/utils/Utils";
import API from "../service/API";

import Settings from "../static/Settings";

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const CBCPeriodMaintenanceContext = React.createContext({});

export const CBCPeriodMaintenanceContextProvider = (props) => {
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
    },
    showModal: false,
    renderLoading: null,
    isAddButtonClicked: false,
    isEditButtonClicked: false,
    isDataLoaded: false,
    isError: false,
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
      data.map((d) => {
        if (typeof d.shortDueDate === "undefined") {
          d.shortDueDate = "";
        }
        if (typeof d.longDueDate === "undefined" && d.duedate) {
          d.longDueDate = moment(d.duedate).format("MMMM DD, YYYY");
          if (d.longDueDate === "December 31, 9999") d.longDueDate = "TBD";
          if (d.longDueDate === "January 01, 9999")
            d.longDueDate = "CBC Collection";
          if (d.longDueDate === "January 31, 9999")
            d.longDueDate = "No CBC’s Accepted";
        }
      });

      periodMaintenanceListData.periodMaintenanceList = data;

      setState({
        ...state,
        periodMaintenanceListData: periodMaintenanceListData,
        showModal: closeModal ? !state.showModal : state.showModal,
        isDataLoaded: true,
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
    API.deleteDueDate(pricingperiodid).then((data) => {
      API.getCBCPeriodMntcList().then((data) => {
        const filteredArray = data.filter(function (value) {
          return value.dueDates.length > 0;
        });
        const convertedData =
          ObjectDestructure.getConvertedJsonArray(filteredArray);
        Utils.addingFlagToJson(convertedData);
        updatePeriodMaintenance(convertedData);
        setIsLoading(false);
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

    if (selectedPeriodYear.duedate != null) {
      selectedPeriodYear.duedate = Util.setDatewithYYYY(
        selectedPeriodYear.duedate
      );
    }

    if (selectedPeriodYear.pricingperiodid == null) {
      selectedPeriodYear.pricingperiodid = 0;
    }
    setIsLoading(true);
    API.updateDueDate(selectedPeriodYear).then(() => {
      window.location.reload();
      //Removed below call as page is getting reloaded, it wont get executed.
      /* API.getCBCPeriodMntcList().then((data) => {
        const filteredArray = data.filter(function (value) {
          return value.dueDates.length > 0;
        });
        const convertedData =
          ObjectDestructure.getConvertedJsonArray(filteredArray);
        Utils.addingFlagToJson(convertedData);
        updatePeriodMaintenance(convertedData, true);
        setIsLoading(false);
      }); */
    });
  };
  const setError = () => {
    setState({
      ...state,
      isError: true,
      isDataLoaded: true,
    });
  };
  const cbcperiodMaintenanceContext = {
    updatePeriodMaintenance,
    state,
    setState,
    onChange,
    showModal,
    deletePeriod,
    updatePeriod,
    validate,
    initializeDates,
    setError,
    isLoading,
    setIsLoading,
  };

  return (
    <CBCPeriodMaintenanceContext.Provider value={cbcperiodMaintenanceContext}>
      {props.children}
    </CBCPeriodMaintenanceContext.Provider>
  );
};

export const CBCPeriodMntcContextConsumer =
  CBCPeriodMaintenanceContext.Consumer;
export default CBCPeriodMaintenanceContext;
