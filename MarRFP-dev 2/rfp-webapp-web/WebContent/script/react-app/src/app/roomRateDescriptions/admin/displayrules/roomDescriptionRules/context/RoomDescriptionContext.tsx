import React, { useState } from "react";

import API from "../service/API";

const RoomDescriptionContext = React.createContext({});
export const RoomDescriptionContextProvider = (props) => {
  const [state, setState] = useState({
    selectedChannel: null,
    selectedChannelValue: null,
    selectedChannelValues: null,

    roomData: [
      {
        name: null,
        code: null,
        __equalsCalc: null,
        __hashCodeCalc: false,
      },
    ],
    entry: null,
    available: null,
    rules: null,
    data: {},
    copyData: null,
    selectRool: null,
    langLoader: false,
    showAccountLegend: false,
    showAccountOverview: false,
    showModal: false,
    validationMessage: "",
    selectChannelCode: null,
    selectChannelCodeName: null,
  });
  const [createNewRules, setCreateNewRules] = useState(true);
  const [selectedListType, setSelectedListType] = useState("List");
  const [channel, setChannel] = useState("");
  const [storeData, setStoreData] = useState({});
  const divstatus = (data) => {
    setState(data.state.value);
  };
  const setChannels = (data) => {
    const listViewData = sessionStorage.getItem("listViewDatas");
    const channel = sessionStorage.getItem("channelNames");
    let values = null;
    /**MRFP-7939 - back button click */
    if (listViewData && channel) {
      setChannel(channel);
      values = channel.split("_");
      sessionStorage.removeItem("channelNames");
      sessionStorage.removeItem("listViewDatas");
    }
    setState({
      ...state,
      roomData: data.channels.channel,
      selectedChannelValue: "test",
      entry: listViewData ? JSON.parse(listViewData) : null,
      selectedChannel: values ? values[2] : null,
      selectChannelCode: values ? values[1] : null,
      selectChannelCodeName: values ? values[0] : null,
    });
  };

  const copyChannels = (data) => {
    setState({
      ...state,
      copyData: data.channelList.channels.channel,
      selectRool: state.selectedChannelValue,
    });
  };

  const onSelect = (option, event) => {
    const selectedValues = event.target.value;
    setChannel(event.target.value);
    const values = selectedValues.split("_");

    setState({
      ...state,
      langLoader: true,
    });

    getRoomEntry(values[0], values);
  };

  const getRoomEntry = (param, values) => {
    API.roomentries(param).then((data) => {
      setStoreData(data);
      setState({
        ...state,
        entry: data.entries.entry,
        selectedChannel: values[2],
        selectChannelCode: values[1],
        selectChannelCodeName: values[0],
      });
    });
  };

  // this is for CModel
  const onCopyRules = () => {
    const displayModal = !state.showModal;
    setState({
      ...state,
      showModal: displayModal,
    });
  };

  const onShowModal = () => {
    setState({
      ...state,
      showModal: !state.showModal,
    });
  };

  const deleteLang = (data) => {
    API.deleteChannelLang(data, state.selectedChannel).then((resp) => {
      return resp;
    });
  };

  const viewLangCopy = (data) => {
    data.bCreateNew = true;
    return API.availableElementRules(data);
  };

  const viewLang = (data, history) => {
    const strChannel = {
      number: parseInt(state.selectChannelCode),
      name: state.selectedChannel.trim(),
      code: state.selectChannelCodeName,
    };
    const strEntry = { name: data.name, code: parseInt(data.code) };
    const strChannelUpdate = {
      number: state.selectChannelCode,
      name: state.selectedChannel.trim(),
      code: state.selectChannelCodeName,
    };

    const strEntryUpdate = { name: data.name, code: data.code };
    const param = {
      strChannel: JSON.stringify(strChannel),
      strEntry: JSON.stringify(strEntry),
    };

    API.availableElementRules(param).then((resp) => {
      sessionStorage.setItem("channelNames", channel);
      sessionStorage.setItem("listViewDatas", JSON.stringify(state.entry));
      setStoreData(strChannelUpdate);
      if (resp == "copyTheRules") {
        history.push({
          pathname: "/roomdefrules/CopyRules",

          state: {
            channelValue: state.selectedChannel,
            dataview: data.name,
            dataSet: param,
            strChannel: strChannelUpdate,
            strEntry: strEntryUpdate,
          },
        });
      } else {
        history.push({
          pathname: "/roomdefrules/RoomDescriptionView",
          state: {
            channelValue: state.selectedChannel,
            dataview: data.name,
            res: resp,
            strChannel: strChannelUpdate,
            strEntry: strEntryUpdate,
          },
        });
      }
    });
  };

  const roomdescriptioncontext = {
    state,
    setState,
    onSelect,
    divstatus,
    setChannels,
    deleteLang,
    viewLang,
    copyChannels,
    onCopyRules,
    onShowModal,
    viewLangCopy,
    createNewRules,
    setCreateNewRules,
    selectedListType,
    setSelectedListType,
    setChannel,
    channel,
    storeData,
    setStoreData,
  };

  return (
    <RoomDescriptionContext.Provider value={roomdescriptioncontext}>
      {props.children}
    </RoomDescriptionContext.Provider>
  );
};
export const RoomDescriptionContextConsumer = RoomDescriptionContext.Consumer;
export default RoomDescriptionContext;
