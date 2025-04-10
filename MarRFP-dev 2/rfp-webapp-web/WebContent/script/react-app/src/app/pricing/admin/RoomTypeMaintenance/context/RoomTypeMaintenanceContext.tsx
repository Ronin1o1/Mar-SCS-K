import React, { useState } from "react";
//import Utils from "../../../../common/utils/Utils";
import API from "../service/API";

const RoomTypeMaintenanceContext = React.createContext({});
export const RoomTypeMaintenanceContextProvider = (props) => {
  const [state, setState] = useState({
    showScreenLoader: false,
    roomTypeMaintenanceListData: {
      roomTypeMaintenanceList: [
        {
          roomtypeid: null,
          roomtype: null,
          roomtype_view: null,
        },
      ],
    },
    selectedRoomType: {
      roomtypeid: null,
      roomtype: null,
      roomtype_view: null,
    },
    showModal: false,
    renderLoading: null,
    isAddButtonClicked: false,
    isEditButtonClicked: false,
    showValidateRoomType: false,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };

  const setRoomTypeListData = (data: any, closeModal?: boolean) => {
    const roomTypeMaintenanceListData = {
      ...state.roomTypeMaintenanceListData,
    };
    roomTypeMaintenanceListData.roomTypeMaintenanceList = data;

    setState({
      ...state,
      roomTypeMaintenanceListData: roomTypeMaintenanceListData,
      showModal: closeModal ? !state.showModal : state.showModal,
    });
  };

  const closeShowValidateRoomType = (closeModal?: boolean) => {
    setState({
      ...state,
      showScreenLoader: false,
      showValidateRoomType: closeModal
        ? !state.showValidateRoomType
        : state.showValidateRoomType,
    });
  };

  const setshowModal = (closeModal?: boolean) => {
    setState({
      ...state,
      showModal: closeModal ? !state.showModal : state.showModal,
    });
  };
  const updateRoomTypeMaintenance = (closeModal?: boolean) => {
    state.showScreenLoader = true;
    setshowModal(true);
    const mntcData = { ...state.selectedRoomType };
    const data = {
      roomtype: mntcData.roomtype,
      roomtype_view: mntcData.roomtype_view,
      promo_roomtypeid: mntcData.roomtypeid,
    };

    data.roomtype != ""
      ? API.updateRoomTypeList(data).then((resp) => {
          API.getRoomTyMntcList().then((resp) => {
            setRoomTypeListData(resp, true);
          });
        })
      : data.roomtype == ""
      ? closeShowValidateRoomType(true)
      : "";
    state.showScreenLoader = false;
  };

  const onChange = (event) => {
    const roomtype = { ...state.selectedRoomType };
    roomtype.roomtype_view = event.target?.value;
    setState({ ...state, selectedRoomType: roomtype });
  };

  const onChangeInput = (event) => {
    const roomtype = { ...state.selectedRoomType };
    roomtype["roomtype"] = event.target.value;
    setState({ ...state, selectedRoomType: roomtype });
  };

  const showModal = (data, closeModal?: boolean) => {
    let roomtype = { ...state.selectedRoomType };

    data
      ? (roomtype = {
          roomtypeid: data.promo_roomtypeid,
          roomtype: data.roomtype,
          roomtype_view: data.roomtype_view,
        })
      : (roomtype = {
          roomtypeid: 0,
          roomtype: "",
          roomtype_view: "Y",
        });

    setState({
      ...state,
      selectedRoomType: roomtype,
      showModal: closeModal ? state.showModal : !state.showModal,
    });
  };

  const deleteRoomType = (roomtypeid: number) => {
    API.deleteRoomTyeById(roomtypeid).then((data) => {
      API.getRoomTyMntcList().then((data) => {
        setRoomTypeListData(data);
      });
    });
  };

  const roomTypeMaintenanceContext = {
    state,
    setState,
    showModal,
    onChange,
    onChangeInput,
    deleteRoomType,
    setRoomTypeListData,
    updateRoomTypeMaintenance,
    closeShowValidateRoomType,
    setLoader,
  };

  return (
    <RoomTypeMaintenanceContext.Provider value={roomTypeMaintenanceContext}>
      {props.children}
    </RoomTypeMaintenanceContext.Provider>
  );
};

export const RoomTypeMntcContextConsumer = RoomTypeMaintenanceContext.Consumer;
export default RoomTypeMaintenanceContext;
