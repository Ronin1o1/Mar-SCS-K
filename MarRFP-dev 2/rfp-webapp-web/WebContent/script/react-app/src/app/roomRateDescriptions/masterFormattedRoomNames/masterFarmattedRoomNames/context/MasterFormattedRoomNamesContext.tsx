import React, { useState } from "react";
import API from "../service/API";

const MasterFarmattedRoomNamesContext = React.createContext({});

export const MasterFarmattedRoomNamesContextProvider = (props) => {
  const [retrieveRoomPoolList, setRetrieveRoomPoolList] = useState([]);
  const [retrieveRoomPoolListLoader, setRetrieveRoomPoolListLoader] =
    useState(false);
  const [state, setState] = useState({
    formChg: "N",
    showHotelInstructions: null,
    RTND_ListCode: null,
    roomTypeNameDefinitionGroup: [],
    readOnly: null,
    typeLists: null,
    uomLists: null,
    dropSwitch: false,
    roomTypeNameDataView: null,
    roomNames: null,
    isFinishAndSave: false,
  });

  const getRoomNameData = (data, roomNames) => {
    let count = 0;
    if (data) {
      const hotelData = { ...state };
      /** set roomNames */
      hotelData.roomNames = roomNames;
      /**set details */
      hotelData.showHotelInstructions = data.showHotelInstructions;
      hotelData.readOnly = data.readOnly;
      hotelData.roomTypeNameDataView = data.roomTypeNameDataView;
      hotelData.RTND_ListCode =
        data.roomTypeNameDataView.roomTypeNameDefinitionList.RTND_ListCode;
      hotelData.typeLists = data.roomTypeNameDataView.typeLists;
      hotelData.uomLists = data.roomTypeNameDataView.uomLists;
      hotelData.roomTypeNameDefinitionGroup =
        data.roomTypeNameDataView.roomTypeNameDefinitionList.roomTypeNameDefinitionGroup;
      if (hotelData.roomTypeNameDefinitionGroup.length > 0) {
        hotelData.roomTypeNameDefinitionGroup[0].roomTypeNameDefinition.filter(
          function (item) {
            if (item.availabilityInd == "Y") {
              count++;
            }
            if (item.type && item.type.typeCode) {
              item.showConciergeValue = true;
            } else {
              item.showConciergeValue = false;
            }
            item.roomCheckCount = count % 2 == 0 ? false : true;
          }
        );
      }
      hotelData.formChg = "N";
      setState(hotelData);
    }
  };
  /**on select of yes Or NO  */
  const handleDropChange = (id, event) => {
    const roomTypeNameDefinitionList =
      state.roomTypeNameDataView.roomTypeNameDefinitionList;
    const maxOccurs = roomTypeNameDefinitionList.maxOccurs;
    const rtnd_ListName = roomTypeNameDefinitionList.rtnd_ListName;
    const roomTypeNameDefinitionSample = state.roomTypeNameDefinitionGroup[0];
    const selectedValues =
      roomTypeNameDefinitionSample.roomTypeNameDefinition.filter(
        (item) => item.availabilityInd == "Y"
      );
    if (
      event.target.value == "Y" &&
      selectedValues.length >= maxOccurs &&
      maxOccurs >= 0
    ) {
      alert("Only " + maxOccurs + " " + rtnd_ListName + "can be selected.");
    } else {
      roomTypeNameDefinitionSample.roomTypeNameDefinition.filter(function (
        item
      ) {
        if (id == item.rtnd_Code) {
          item.availabilityInd = event.target.value;
        }
        if (item.availabilityInd == "Y") {
          item.showConciergeValue = true;
        } else {
          item.showConciergeValue = false;
          if (item.type != null) item.type.typeCode = null;
        }

        if (
          (event.target.value == "" || event.target.value == "N") &&
          item.unitOfMeasure
        ) {
          item.unitOfMeasure.uom_Code = null;
        }

        if (event.target.value == "" && item.description?.text) {
          item.description.text[0].value = "";
        }
      });
    }

    setState({
      ...state,
      formChg: "Y",
      dropSwitch: true,
      roomTypeNameDefinitionGroup: [roomTypeNameDefinitionSample],
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
      alert(
        "At least " + minOccurs + " " + rtnd_ListName + "must be selected."
      );
      return validSelected;
    } else {
      validSelected = true;
      return validSelected;
    }
  };

  const changequantity = (id, event) => {
    const roomTypeNameDefinitionsamples = state.roomTypeNameDefinitionGroup;
    roomTypeNameDefinitionsamples.forEach((l) => {
      l.roomTypeNameDefinition.forEach((i) => {
        if (id == i.rtnd_Code) {
          i.quantity = event.target.value;
        }
      });
    });
    setState({
      ...state,
      formChg: "Y",
      roomTypeNameDefinitionGroup: roomTypeNameDefinitionsamples,
    });
  };

  const changeUnitOfMeasure = (id, event, uomList) => {
    const roomTypeNameDefinitionTest = state.roomTypeNameDefinitionGroup;
    roomTypeNameDefinitionTest.forEach((l) => {
      l.roomTypeNameDefinition.forEach((i) => {
        if (id == i.rtnd_Code) {
          i.unitOfMeasure.value = "Y";
          i.unitOfMeasure.uom_Code = event.target.value;
          uomList &&
            uomList.unitOfMeasure &&
            uomList.unitOfMeasure.forEach((k) => {
              if (event.target.value == k.uom_Code) {
                i.unitOfMeasure.uom_Type = k.uom_Type;
              }
            });
        }
      });
    });
    setState({
      ...state,
      formChg: "Y",
      roomTypeNameDefinitionGroup: roomTypeNameDefinitionTest,
    });
  };

  const changeTypeList = (id, event) => {
    const roomTypeNameDefinitionSamples = state.roomTypeNameDefinitionGroup;
    roomTypeNameDefinitionSamples.forEach((l) => {
      l.roomTypeNameDefinition.forEach((i) => {
        if (id == i.rtnd_Code) {
          i.type.value = "Y";
          i.type.typeCode = event.target.value;
          i.type.typeListName =
            state.typeLists[[`${event.target.value}`][0]]?.typeListName;
          state.typeLists[[`${event.target.value}`][0]]?.type.array.forEach(
            (k) => {
              if (k.typeCode == event.target.value) {
                i.type.typeName = k.typeName;
              }
            }
          );
        }
      });
    });
    setState({
      ...state,
      formChg: "Y",
      roomTypeNameDefinitionGroup: roomTypeNameDefinitionSamples,
    });
  };

  const getRetrieveRoomPoolList = () => {
    setRetrieveRoomPoolList([]);
    setRetrieveRoomPoolListLoader(true);
    API.getRetrieveRoomPoolList().then((data) => {
      setRetrieveRoomPoolList(data);
      setRetrieveRoomPoolListLoader(false);
    });
  };

  const saveRoomPoolDefinition = async () => {
    const data = state.roomTypeNameDefinitionGroup;
    let strRoomTypeNameDefinition = {};
    const serviceDetails = {
      formChg: state.formChg,
      roomPool: state.roomNames,
      marshaCode: "",
      hotelName: "",
    };

    data[0].roomTypeNameDefinition.filter(function (item) {
      Object.assign(strRoomTypeNameDefinition, {
        [item.rtnd_Name + "_" + item.rtnd_Code]: {
          availabilityInd: item.availabilityInd,
          mustComplete: item.mustComplete,
          quantity: item.quantity,
          typeCode:
            item.type && item.type.typeCode != "" ? item.type.typeCode : null,
          text:
            item.description && item.description.text
              ? item.description.text[0].value
              : "",
          UOM_Code:
            item.unitOfMeasure && item.unitOfMeasure.uom_Code
              ? item.unitOfMeasure.uom_Code == "0"
                ? "0   "
                : item.unitOfMeasure.uom_Code
              : null,
          typeListName: item.type ? item.type.typeListName : null,
          typeName: item.type ? item.type.typeName : null,
          value: item.type ? item.type.value : null,
          alternateText: item.alternateText,
          unitOfMeasure: item.unitOfMeasure,
          description: item.description,
          supplementaryData: item.supplementaryData,
          rtnd_GroupName: item.rtnd_GroupName,
          rtnd_GroupCode: item.rtnd_GroupCode,
          rtnd_CodeName: item.rtnd_CodeName.trim(),
          rtnd_ListCode: item.rtnd_ListCode,
          rtnd_ListName: item.rtnd_ListName,
          rtnd_Name: item.rtnd_Name,
          rtnd_Code: item.rtnd_Code,
        },
      });
    });

    strRoomTypeNameDefinition = JSON.stringify(strRoomTypeNameDefinition);
    await API.updateRoomServiceTypeData(
      serviceDetails,
      strRoomTypeNameDefinition
    ).then((res) => {
      if (res === "success") {
        return true;
      } else {
        return false;
      }
    });
  };
  const changeDescription = (id, event) => {
    const roomTypeNameDefinitionsamples = state.roomTypeNameDefinitionGroup;
    roomTypeNameDefinitionsamples.forEach((l) => {
      l.roomTypeNameDefinition.forEach((i) => {
        if (id == i.rtnd_Code) {
          i.description.text[0].value = event.target.value;
        }
      });
    });
    setState({
      ...state,
      formChg: "Y",
      roomTypeNameDefinitionGroup: roomTypeNameDefinitionsamples,
    });
  };
  const setRoomNames = (data) => {
    setState({ ...state, roomNames: data });
  };
  const msterFarmattedRoomNamesContext = {
    getRetrieveRoomPoolList,
    state,
    setState,
    retrieveRoomPoolList,
    retrieveRoomPoolListLoader,
    getRoomNameData,
    handleDropChange,
    changeTypeList,
    changequantity,
    changeDescription,
    changeUnitOfMeasure,
    saveRoomPoolDefinition,
    checkMinOccurs,
    setRoomNames,
  };

  return (
    <MasterFarmattedRoomNamesContext.Provider
      value={msterFarmattedRoomNamesContext}
    >
      {props.children}
    </MasterFarmattedRoomNamesContext.Provider>
  );
};

export const MasterFarmattedRoomNamesConsumer =
  MasterFarmattedRoomNamesContext.Consumer;
export default MasterFarmattedRoomNamesContext;
