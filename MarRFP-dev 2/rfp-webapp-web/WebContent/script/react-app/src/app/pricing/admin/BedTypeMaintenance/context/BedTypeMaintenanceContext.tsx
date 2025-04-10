import React, { useState } from "react";
import API from "../service/API";

const BedTypeMaintenanceContext = React.createContext({});

export const BedTypeMaintenanceContextProvider = (props) => {
  const [state, setState] = useState({
    showScreenLoader: false,
    bedTypeMaintenanceListData: {
      bedTypeMaintenanceList: [
        {
          bedtypeid: null,
          bedtype: null,
          bedtype_view: null,
        },
      ],
    },
    selectedBedType: {
      bedtypeid: null,
      bedtype: null,
      bedtype_view: null,
    },
    showModal: false,
    renderLoading: null,
    isAddButtonClicked: false,
    isEditButtonClicked: false,
    showValidateBedType: false,
  });

  const setBedTypeListData = (data: any, closeModal?: boolean) => {
    const bedTypeMaintenanceListData = { ...state.bedTypeMaintenanceListData };

    bedTypeMaintenanceListData.bedTypeMaintenanceList = data;
    setState({
      ...state,
      bedTypeMaintenanceListData: bedTypeMaintenanceListData,
      showModal: closeModal ? !state.showModal : state.showModal,
    });
  };

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const setShowModal = (closeModal?: boolean) => {
    setState({
      ...state,
      showModal: closeModal ? !state.showModal : state.showModal,
    });
  };

  const updateBedTypeMaintenance = (closeModal?: boolean) => {
    state.showScreenLoader = true;
    setShowModal(true);
    const mntcData = { ...state.selectedBedType };

    const data = {
      bedtype: mntcData.bedtype,
      bedtype_view: mntcData.bedtype_view,
      bedtypeid: mntcData.bedtypeid,
    };

    data.bedtype
      ? API.updateBedType(data).then((resp) => {
          setShowModal(true);

          API.getBedTypeMntcList().then((resp) => {
            state.showScreenLoader = false;
            setBedTypeListData(resp, true);
          });
        })
      : data.bedtype == ""
      ? closeShowValidateBedType(true)
      : "";
  };

  const closeShowValidateBedType = (closeModal?: boolean) => {
    setState({
      ...state,
      showScreenLoader: false,
      showValidateBedType: closeModal
        ? !state.showValidateBedType
        : state.showValidateBedType,
    });
  };

  const onChange = (event) => {
    const data = { ...state.selectedBedType };
    data.bedtype_view = event.target?.value;
    setState({ ...state, selectedBedType: data });
  };

  const onChangeInput = (event) => {
    const data = { ...state.selectedBedType };
    data.bedtype = event.target.value;
    setState({ ...state, selectedBedType: data });
  };

  const deleteBedType = (bedtypeid: number) => {
    API.deleteBedTypeById(bedtypeid).then((data) => {
      API.getBedTypeMntcList().then((data) => {
        setBedTypeListData(data);
      });
    });
  };

  const showModal = (data) => {
    let bedtype = { ...state.selectedBedType };

    data
      ? (bedtype = {
          bedtypeid: data.bedtypeid,
          bedtype_view: data.bedtype_view,
          bedtype: data.bedtype,
        })
      : (bedtype = {
          bedtypeid: 0,
          bedtype_view: "Y",
          bedtype: "",
        });

    setState({
      ...state,
      selectedBedType: bedtype,
      showModal: !state.showModal,
    });
  };

  const bedTypeMaintenanceContext = {
    state,
    setState,
    setBedTypeListData,
    onChange,
    onChangeInput,
    showModal,
    updateBedTypeMaintenance,
    deleteBedType,
    closeShowValidateBedType,
    setLoader,
  };

  return (
    <BedTypeMaintenanceContext.Provider value={bedTypeMaintenanceContext}>
      {props.children}
    </BedTypeMaintenanceContext.Provider>
  );
};

export const BedTypeMntcContextConsumer = BedTypeMaintenanceContext.Consumer;
export default BedTypeMaintenanceContext;
