import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import API from "../service/API";
import Settings from "../static/Settings";
import RoomUtills from "../content/RoomUtills";

const RoomDescriptionContext = React.createContext({});
export const RoomDescriptionContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [state, setState] = useState({
    data: {},
    selectedChannel: null,
    channelList: [],
    channelData: null,
    langListData: null,
    departureValue: false,
    dataItem: null,
    updateDataElem: null,
    queryParam: {},
    channelObj: null,
    nextUrl: "/",
    showTableLoader: false,
    langLoader: false,
    langData: null,
    copyPageData: {},
    coppyDataItem: null,
    entryData: null,
    copyEntryData: null,
  });
  const [channel, setChannel] = useState("");

  const setChannelData = (data: any) => {
    let channelObj = null;
    const listViewData = sessionStorage.getItem("listViewDatas");
    const channel = sessionStorage.getItem("channelNames");
    let values = null;
    /**MRFP-8077 - back button click */
    if (
      listViewData &&
      channel &&
      history.location.pathname != "/roomdeftext/copyText" &&
      history.location.pathname != "/roomdeftext/dataElements"
    ) {
      setChannel(channel);
      values = channel.split("_");
      channelObj = {
        channelCode: values[0],
        channelNumber: values[1],
        channelName: values[2],
      };
      sessionStorage.removeItem("channelNames");
      sessionStorage.removeItem("listViewDatas");
    }
    setState({
      ...state,
      channelData: data,
      langListData: listViewData ? JSON.parse(listViewData) : null,
      selectedChannel: channel ? channel : null,
      channelObj: channelObj,
    });
  };
  const setLangList = (data, selectedChannel) => {
    if (data && data.language) {
      let langListData = { ...state.langListData };
      langListData = data.language;
      const channelList = selectedChannel.split("_");
      const channelObj = {
        channelCode: channelList[0],
        channelNumber: channelList[1],
        channelName: channelList[2],
      };
      setState({
        ...state,
        langListData: langListData,
        selectedChannel: selectedChannel,
        channelObj: channelObj,
        langLoader: false,
      });
    }
  };
  const onSelect = (event) => {
    setChannel(event.target.value);
    const { value } = event.target;
    if (value === "select") {
      if (state.selectedChannel) {
        alert(Settings.popUp.channelAlert);
        setState({ ...state, selectedChannel: "", langListData: null });
      }
    } else if (value && value !== state.selectedChannel) {
      setState({ ...state, langLoader: true });
      getChanelLang(value.trim(), value);
    }
  };
  const getChanelLang = (param, channelName) => {
    API.getChannelLang(param).then((resp) => {
      sessionStorage.setItem("channelNames", channelName);
      sessionStorage.setItem("listViewDatas", JSON.stringify(resp.language));
      setLangList(resp, param);
    });
  };
  const deleteLang = (data) => {
    const splitData = data.split("_");
    const channels = state.selectedChannel
      ? state.selectedChannel.split("_")
      : "";
    const channelName =
      channels && channels.length > 0 && channels[channels.length - 1];

    if (
      confirm(
        Settings.popUp.deleteChanel + channelName + " / " + splitData[1] + "?"
      )
    ) {
      API.deleteChannelLang(data, state.selectedChannel).then((resp) => {
        API.getChannelLang(state.selectedChannel).then((resp) => {
          setLangList(resp, state.selectedChannel);
        });
      });
    }
  };
  const getCopyText = (code, lang, createNew, history, populated) => {
    const channelObject = state.channelObj;
    const req = {};
    const path = `?languageCode=${code}&languageName=${lang}
            &channelName=${channelObject.channelName}&channelCode=${channelObject.channelCode}&channelNumber=${channelObject.channelNumber}`;
    req["channelNumber"] = channelObject.channelNumber;
    req["channelName"] = channelObject.channelName;
    req["channelCode"] = channelObject.channelCode;
    req["languageCode"] = code;
    req["languageName"] = lang;
    state.queryParam = req;
    sessionStorage.setItem("channelNames", channel);
    sessionStorage.setItem("listViewDatas", JSON.stringify(state.langListData));
    if (populated === "Y") {
      API.getRoomDisplayAPI(req).then((resp) => {
        if (resp && resp.length > 0) {
          history.push("/roomdeftext/dataElements" + path);
        } else {
          history.push("/roomdeftext/copyText" + path);
        }
      });
    } else {
      history.push("/roomdeftext/copyText" + path);
    }
  };
  /** Data Elements */
  const getRoomDisplay = (req) => {
    setIsLoading(true);
    API.getRoomDisplayAPI(req).then((resp) => {
      setState({
        ...state,
        dataItem: resp,
        coppyDataItem: JSON.parse(JSON.stringify(resp)),
      });
      setIsLoading(false);
    });
  };

  const handleRadioChange = (event) => {
    const { value } = event && event.target;
    setState({ ...state, nextUrl: value });
  };
  const handleCopyDropDown = (event, dropDown) => {
    const { value } = event.target;
    const data = value && value.split("_");
    const copyPageData = { ...state.copyPageData };
    if (dropDown === "language") {
      copyPageData["languageCode"] = data[0];
      copyPageData["languageName"] = data[1];
      setState({ ...state, copyPageData: copyPageData });
      sessionStorage.setItem("copyTextLanguage", value);
    } else {
      copyPageData["channelCode"] = data[0];
      copyPageData["channelNumber"] = data[1];
      copyPageData["channelName"] = data[2];
      setState({ ...state, copyPageData: copyPageData });
      sessionStorage.setItem("copyTextChannel", value);
    }
  };

  const getParam = (name) => {
    return RoomUtills.setQueryParam(name);
  };
  const setParams = (path) => {
    let param = {
        languageCode: getParam("languageCode"),
        languageName: getParam("languageName"),
        channelName: getParam("channelName"),
        channelCode: getParam("channelCode"),
        channelNumber: getParam("channelNumber"),
      },
      langData = null;
    if (param.languageName.trim() !== "English") {
      langData = param.languageCode + "_" + param.languageName;
    }
    setState({ ...state, queryParam: param, langData: langData });
  };
  const updateOnComponentLeave = () => {
    const req = RoomUtills.dataReqBody(state.dataItem, state.coppyDataItem);
    API.updateRoomDisplayAPI(req, state.queryParam)
      .then((resp) => {})
      .catch((e) => {});
  };

  const updateRoomDisplay = (event, history) => {
    if (history?.location?.pathname !== Settings.url.roomDesc) {
      const { id } = event.target;
      let dataChanged = true;
      let createNew =
        state.queryParam && state.queryParam["createNew"] === "true";
      if (createNew) {
        dataChanged = RoomUtills.dataChange(
          state.dataItem,
          state.coppyDataItem
        );
      } else {
        const compareData = RoomUtills.dataChange(
          state.dataItem,
          state.coppyDataItem
        );
        createNew = !compareData;
        dataChanged = compareData;
      }

      if (dataChanged) {
        const req = RoomUtills.dataReqBody(state.dataItem, state.coppyDataItem);
        API.updateRoomDisplayAPI(req, state.queryParam).then((resp) => {
          if (resp && resp === "success") {
            if (id === "update") {
              getRoomDisplay(state.queryParam);
            } else if (id === "next") {
              history.push(
                "/roomdeftext/enterAmenity" + history.location.search
              );
            } else if (id === "autoSave") {
              history.push(
                history.location.search
                  ? history.location.pathname + history.location.search
                  : history.location.pathname
              );
            } else {
              history.push("/roomdeftext/roomDescription");
            }
          }
        });
      } else if (createNew) {
        if (id === "back") {
          if (confirm(Settings.popUp.emptyText)) {
            history.goBack();
          }
        } else if (id === "autoSave") {
          history.push(
            history.location.search
              ? history.location.pathname + history.location.search
              : history.location.pathname
          );
        } else {
          if (confirm(Settings.popUp.emptyText)) {
            history.push("/roomdeftext/roomDescription");
          }
        }
      } else if (id === "next" && state.dataItem && state.dataItem.length > 0) {
        history.push("/roomdeftext/enterAmenity" + history.location.search);
      } else {
        history.goBack();
      }
    }
  };

  const handleChange = (event) => {
    const { id, value } = event && event.target;
    const pos = id.split("_");
    const pos1 = parseInt(pos[0]),
      pos2 = parseInt(pos[1]),
      dataList = state.dataItem;
    if (value && value.indexOf("\n") >= 0) {
      event.preventDefault();
    } else {
      if (value && value.length > 500) {
        dataList[pos1].displayElement[pos2].displayText = value.slice(0, 500);
        setState({ ...state, dataItem: dataList });
        alert(Settings.popUp.charLength);
      } else {
        dataList[pos1].displayElement[pos2].displayText = value;
        setState({ ...state, dataItem: dataList });
      }
    }
  };
  /** Data Elements -- END */

  /** Enter Amenity -- START */
  const getAmenity = (req) => {
    setIsLoading(true);
    API.getAmenity(req).then((resp) => {
      setState({
        ...state,
        entryData: resp,
        copyEntryData: JSON.parse(JSON.stringify(resp)),
      });
      setIsLoading(false);
    });
  };
  const updateAmenityOnComponentLeave = () => {
    const req = RoomUtills.amenityReqBody(state.entryData, state.copyEntryData);
    API.updateAmenityAPI(req, state.queryParam)
      .then((resp) => {})
      .catch((e) => {});
  };
  const updateAmenity = (event, history) => {
    if (history?.location?.pathname === Settings.url.amenities) {
      const { id } = event.target;
      let createNew =
        state.queryParam && state.queryParam["createNew"] === "true";
      const dataChange = RoomUtills.checkAmenityDataChange(
        state.entryData,
        state.copyEntryData
      );
      if (!createNew) {
        createNew = !dataChange;
      }
      if (dataChange) {
        const req = RoomUtills.amenityReqBody(
          state.entryData,
          state.copyEntryData
        );
        API.updateAmenityAPI(req, state.queryParam)
          .then((resp) => {
            if (resp && resp === "success") {
              if (id === "update") {
                getAmenity(state.queryParam);
              } else if (id === "autoSave") {
                history.push(history.location.pathname);
              } else if (id === "back") {
                const url = Settings.url.dataElements + history.location.search;
                history.push(url);
              } else {
                sessionStorage.removeItem("channelNames");
                sessionStorage.removeItem("listViewDatas");
                history.push("/roomdeftext/roomDescription");
              }
            }
          })
          .catch((error) => {
            console.log("error ", error);
          });
      } else if (createNew) {
        if (id === "back") {
          confirm(Settings.popUp.emptyText)
            ? history.push(
                "/roomdeftext/dataElements" + history.location.search
              )
            : "";
        } else if (id === "autoSave") {
          history.push(history.location.pathname);
        } else {
          sessionStorage.removeItem("channelNames");
          sessionStorage.removeItem("listViewDatas");
          confirm(Settings.popUp.emptyText)
            ? history.push("/roomdeftext/roomDescription")
            : "";
        }
      } else if (
        id === "next" &&
        state.entryData &&
        !createNew &&
        state.entryData.brands
      ) {
        sessionStorage.removeItem("channelNames");
        sessionStorage.removeItem("listViewDatas");
        history.push("/roomdeftext/roomDescription");
      } else {
        history.goBack();
      }
    }
  };

  const handleAmenityChange = (event, type, pos1, pos2) => {
    let dataType = "brands",
      entryData = state.entryData;
    const { value } = event && event.target;
    if (type === "unitOfMeasure") {
      dataType = "unitsOfMeasure";
    } else if (type === "format") {
      dataType = "formats";
    }
    if (value && value.indexOf("\n") >= 0) {
      event.preventDefault();
    } else {
      if (value && value.length > 500) {
        entryData[dataType][pos1][type][pos2].value = value.slice(0, 500);
        setState({ ...state, entryData: entryData });
        alert(Settings.popUp.charLength);
      } else {
        entryData[dataType][pos1][type][pos2].value = value;
        setState({ ...state, entryData: entryData });
      }
    }
  };

  const copyRoomDetails = (req, history) => {
    const path = `?languageCode=${req.languageCode}&languageName=${req.languageName}&channelCode=${req.channelCode}&channelNumber=${req.channelNumber}&channelName=${req.channelName}`;
    API.copyIntoDisplayRooms(req).then((resp) => {
      if (resp == "success") {
        history.push(Settings.url.dataElements + path);
      }
    });
  };

  /** Enter Amenity -- END */
  const roomDescriptionContext = {
    state,
    setLangList,
    setChannelData,
    setState,
    onSelect,
    deleteLang,
    getCopyText,
    handleChange,
    getRoomDisplay,
    updateRoomDisplay,
    updateOnComponentLeave,
    updateAmenityOnComponentLeave,
    handleRadioChange,
    setParams,
    handleCopyDropDown,
    getAmenity,
    handleAmenityChange,
    updateAmenity,
    copyRoomDetails,
    isLoading,
    setIsLoading,
    channel,
  };

  return (
    <RoomDescriptionContext.Provider value={roomDescriptionContext}>
      {props.children}
    </RoomDescriptionContext.Provider>
  );
};
export const RoomDescriptionContextConsumer = RoomDescriptionContext.Consumer;
export default RoomDescriptionContext;
