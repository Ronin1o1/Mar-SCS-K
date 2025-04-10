import React, { useState, useEffect, Suspense, useContext } from "react";
import UpdateBtnImg from "../../../../../common/assets/img/btnUpdate.gif";
import NextBtnImg from "../../../../../common/assets/img/button/btnNext.gif";
import AddBtnImg from "../../../../../common/assets/img/button/btnAdd2.gif";
import RemoveUpIconImg from "../../../../../common/assets/img/button/btnRemove.gif";
import AddBtnDownImg from "../../../../../common/assets/img/button/btnAddDis.gif";
import RemoveImg from "../../../../../common/assets/img/button/btnRemoveTxt.gif";
import styles from "./RoomDescriptionView.css";
import API from "../service/API";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import RoomDescriptionContext, {
  RoomDescriptionContextProvider,
} from "../context/RoomDescriptionContext";
import Settings from "../static/Settings";
import CModal from "../../../../../common/components/CModal";
import CSuspense from "../../../../../common/components/CSuspense";
import { RDSettings } from "../../../Settings";
import CSelect from "../../../../../common/components/CSelect";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
const RoomDescriptionView = (): JSX.Element => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [roomOverviewStyle, setRoomOverviewStyle] = useState("bold");
  const [leftSideData, setLeftSideData] = useState([]);
  const [rightSideData, setRightSideData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [leftSideSelectData, setLeftSideSelectData] = useState([]);
  const [removeRightData, setremoveRightData] = useState(null);
  const [removeRightSubData, setRemoveSubData] = useState(null);
  const [checkbox, setcheckbox] = useState(false);
  const [multipeCheckBox, setMultipleCheckBox] = useState([]);
  const [arrowClass, setArrowClass] = useState("visible");
  const [updateOrder, setUpdateOrder] = useState([]);
  // this is for 302 redirection
  const [statusCode, setStatusCode] = useState(false);
  const [loader, setLoader] = useState(false);

  const [allstate, setallState] = useState({
    maxLines: null,
    maxColoums: null,
  });

  const history = useHistory();
  const params = useParams();

  const getAPIElements = () => {
    const strChannel = {
      number: parseInt(history.location.state.strChannel.number),
      name: history.location.state.strChannel?.name.trim(),
      code: history.location.state.strChannel.code,
    };

    const strEntry = {
      name: history.location.state.strEntry?.name,
      code: parseInt(history.location.state.strEntry.code),
    };

    const param = {
      strChannel: JSON.stringify(strChannel),
      strEntry: JSON.stringify(strEntry),
    };
    setLoader(true);
    API.availableElementRules(param).then((resp) => {
      setLoader(false);
      setallState({
        maxColoums: resp.displayRulesData.displayDimensions.maxColumns,
        maxLines: resp.displayRulesData.displayDimensions.maxLines,
      });
      contextType.setSelectedListType(
        resp.displayRulesData.displayDimensions.mode
      );
      populateRightData(resp.displayRulesData.displayproducts);
      populateLeftData(resp.rulesDataDictionary);
    });
  };

  useEffect(() => {
    if (history.location.state.stateView) {
      setallState({
        maxColoums: null,
        maxLines: null,
      });
      contextType.setSelectedListType("List");
      setRightSideData([]);
      validationCheck();
    } else {
      let arr;
      if (history.location.state.copyRule) {
        API.copyRoomsEntry(history.location.state.params).then((res) => {
          if (res === "success") {
            getAPIElements();
          } else if (res === null || res.copyRulesExist === false) {
            history.push({
              pathname: `/error`,
            });
          }
        });
      } else {
        getAPIElements();
      }
    }
    let assignSortingAttr;
    if (history.location.state.stateView) {
      contextType.viewLangCopy(history.location.state.dataSet).then((res) => {
        assignSortingAttr = res.rulesDataDictionary;
        populateLeftData(assignSortingAttr);
      });
    } else {
      if (history.location.state.copyRule) {
      } else {
        assignSortingAttr = history.location.state.res.rulesDataDictionary;
        populateLeftData(assignSortingAttr);
      }
    }
    return () => {
      saveDetails(false);
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    };
  }, []);

  const populateLeftData = (data) => {
    for (let i = data.length - 1; i >= 0; i--) {
      data[i]["sorting"] = false;
      data[i]["checked"] = false;
      if (data[i].elementGroups.length > 1) {
        for (let j = data[i].elementGroups.length - 1; j >= 0; j--) {
          data[i].elementGroups[j]["sorting"] = false;
          for (let k = 0; k < data[i].elementGroups[j].elements.length; k++) {
            data[i].elementGroups[j].elements[k]["sorting"] = false;
          }
        }
      } else {
        for (
          let j = data[i].elementGroups[0].elements.length - 1;
          j >= 0;
          j--
        ) {
          data[i].elementGroups[0].elements[j]["sorting"] = false;
        }
      }
    }

    setLeftSideData(data);
  };

  const populateRightData = (data) => {
    for (let i = data.length - 1; i >= 0; i--) {
      data[i]["sorting"] = false;
      for (let j = data[i].elementGroups[0].elements.length - 1; j >= 0; j--) {
        data[i].elementGroups[0].elements[j]["sorting"] = false;
      }
    }
    setRightSideData(data);
  };
  useEffect(() => {
    if (multipeCheckBox.length > 1) {
      setArrowClass("hidden");
    } else {
      setArrowClass("visible");
    }
  }, [multipeCheckBox]);

  // this is for updaterequest
  const handleSubmit = (event) => {
    if (allstate.maxLines == null || allstate.maxLines == "") {
      alert(Settings.alertMsgMaxLines);
      event.preventDefault();
    } else if (allstate.maxColoums == null || allstate.maxColoums == "") {
      alert(Settings.alertMsgMaxColumns);
      event.preventDefault();
    } else {
      saveDetails(true);
    }
  };

  // this is for the maxline and max coloum text boxes
  const handleNext = (event) => {
    if (allstate.maxLines == null || allstate.maxLines == "") {
      contextType.setState({
        ...contextType.state,
        //showModal: true,
        validationMessage: Settings.alertMsgMaxLines,
      });
      alert(Settings.alertMsgMaxLines);
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.alertMsgMaxLines,
        type: "browserAlert",
      });
      event.preventDefault();
    } else if (allstate.maxColoums == null || allstate.maxColoums == "") {
      contextType.setState({
        ...contextType.state,
        //showModal: true,
        validationMessage: Settings.alertMsgMaxColumns,
      });
      alert(Settings.alertMsgMaxColumns);
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.alertMsgMaxColumns,
        type: "browserAlert",
      });
      event.preventDefault();
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
      sessionStorage.removeItem("channelNames");
      sessionStorage.removeItem("listViewDatas");
      //Removed due to user effect return being called, making it duplicate API call
      //saveDetails(false);
      history.push({
        pathname: "/roomdefrules/RoomDescription",
      });
    }
  };
  useEffect(() => {
    if (contextType && contextType.selectedListType) {
      payloadJson();
    }
  }, [allstate, rightSideData, leftSideData]);
  const payloadJson = () => {
    const strChannel = history.location.state.strChannel;
    const strEntry = history.location.state.strEntry;

    const strDisplayDimensions = {
      maxLines: allstate.maxLines,
      maxColumns: allstate.maxColoums,
      mode: contextType.selectedListType,
    };
    const rightValues = {};
    let elementTypeCode;
    let elementGroupCode;
    let elementCodeList;
    let elementCode;
    const finalData = [];
    const arr = rightSideData;
    let sortOrder = 0;
    for (let i = 0; i < arr.length; i++) {
      elementTypeCode = arr[i].elementTypeCode;
      elementGroupCode = arr[i].elementGroups[0].elementGroupCode;
      for (let k = 0; k < arr[i].elementGroups.length; k++) {
        for (let j = 0; j < arr[i].elementGroups[k].elements.length; j++) {
          elementCodeList = arr[i].elementGroups[k].elements[j].elementCodeList;
          elementCode = arr[i].elementGroups[k].elements[j].elementCode;
          const data = {
            elementTypeCode: elementTypeCode,
            elementGroupCode: arr[i].elementGroups[k].elementGroupCode,
            elementCode: elementCode,
            elementCodeList: elementCodeList,
            sortOrder: sortOrder,
          };
          sortOrder++;
          rightValues[
            `${elementTypeCode}_${elementGroupCode}_${elementCodeList}_${elementCode}`
          ] = data;
        }
      }
    }

    finalData.push(rightValues);
    const params = {
      formChg: "N",
      strTheRules: JSON.stringify(rightValues),
      strDisplayDimension: JSON.stringify(strDisplayDimensions),
      strChannel: JSON.stringify(strChannel),
      strEntry: JSON.stringify(strEntry),
    };
    localStorage.setItem(
      "roomDescriptionData",
      JSON.stringify({ params: params })
    );
    return params;
  };

  const saveDetails = (updateData) => {
    const savedData = JSON.parse(localStorage.getItem("roomDescriptionData"));
    const params = savedData && savedData.params;
    if (params) {
      setLoader(true);
      API.upDataElementRules(params)
        .then((res) => {
          if (updateData) {
            getAPIElements();
          }
          localStorage.removeItem("roomDescriptionData");
        })
        .catch((error) => {
          setLoader(false);
          localStorage.removeItem("roomDescriptionData");
        });
    }
  };

  // input validation
  const checkValidity = (inputName, inputValue) => {
    switch (inputName) {
      case "maxLines":
        if (inputValue === "") {
          setallState({ ...allstate, [inputName]: null });
        }
        break;
      case "maxColoums":
        if (inputValue === "") {
          setallState({ ...allstate, [inputName]: null });
        }
        break;
      default:
        break;
    }
  };

  const handleOnChanges = (e) => {
    const { value, name } = e.target;
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      checkValidity(name, value);
      allstate[name] = value;
      setallState({ ...allstate, [name]: value });
      setTimeout(() => {
        validationCheck();
      }, 1000);
    } else {
      setallState({
        ...allstate,
        [name]: allstate[name] ? allstate[name] : "",
      });
    }
  };

  const validationCheck = () => {
    if (allstate.maxLines === null || allstate.maxLines === "") {
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.alertMsgMaxLines,
        type: "browserAlert",
      });
    } else if (allstate.maxColoums === null || allstate.maxColoums === "") {
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.alertMsgMaxColumns,
        type: "browserAlert",
      });
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    }
  };
  // left side data passing to right side
  const handelSwipeClick = (e) => {
    e.preventDefault();
    const rData = Object.assign([], rightSideData);
    const lData = Object.assign([], leftSideData);
    const lsData = Object.assign([], leftSideSelectData);
    const ids = new Set(
      rData.map((d) => {
        return d.elementTypeCode;
      })
    );
    let merged = rData;

    const filteredData = lsData.filter((d) => !ids.has(d.elementTypeCode));

    for (let i = 0; i < merged.length; i++) {
      const existingData = lsData.filter(
        (d) => merged[i].elementTypeCode === d.elementTypeCode
      );
      if (existingData.length > 0) {
        merged[i].elementGroups = existingData[0].elementGroups;
      }
    }
    merged = merged.concat(filteredData);
    setRightSideData(merged);
    const arr = lData;
    for (let k = arr.length - 1; k >= 0; k--) {
      arr[k].checked = false;
    }
    setLeftSideData(arr);
    setLeftSideSelectData([]);
  };

  function handleLeftSideCheckBox(data, index, checkbox) {
    const arr = Object.assign([], leftSideData);
    let lsSelectData = Object.assign([], leftSideSelectData);
    if (checkbox.target.checked === true) {
      const leftData = arr.filter(
        (item) => item.elementTypeCode + item.elementTypeName === data
      );
      for (var k = arr.length - 1; k >= 0; k--) {
        if (arr[k].elementTypeCode + arr[k].elementTypeName === data) {
          arr[k].checked = !false;
        }
      }

      lsSelectData = lsSelectData.concat(leftData[0]);
      setLeftSideSelectData(JSON.parse(JSON.stringify(lsSelectData)));
    } else {
      for (var k = arr.length - 1; k >= 0; k--) {
        if (arr[k].elementTypeCode + arr[k].elementTypeName === data) {
          arr[k].checked = false;
        }
      }

      const rData = lsSelectData.filter(
        (item) => item.elementTypeCode + item.elementTypeName !== data
      );
      for (var k = lsSelectData.length - 1; k >= 0; k--) {
        if (
          lsSelectData[k].elementTypeCode + lsSelectData[k].elementTypeName ===
          data
        ) {
          lsSelectData.splice(k, 1);
        }
      }
      setLeftSideSelectData(JSON.parse(JSON.stringify(lsSelectData)));
    }
    setLeftSideData(arr);
  }

  // Remove button
  function handleDeleteItems(e) {
    e.preventDefault();
    const tmp = multipeCheckBox;
    let newData = null;
    if (rightSideData) {
      newData = rightSideData;
      for (let i = newData.length - 1; i >= 0; i--) {
        if (
          tmp.indexOf(newData[i].elementTypeCode + newData[i].elementTypeName) >
          -1
        ) {
          newData.splice(i, 1);
          continue;
        }
        if (newData[i].elementGroups.length > 1) {
          for (var j = newData[i].elementGroups.length - 1; j >= 0; j--) {
            if (
              tmp.indexOf(
                newData[i].elementGroups[j].elementGroupCode +
                  newData[i].elementGroups[j].elementGroupName
              ) > -1
            ) {
              newData[i].elementGroups.splice(j, 1);
              continue;
            }
            for (
              let k = newData[i].elementGroups[j].elements.length - 1;
              k >= 0;
              k--
            ) {
              if (
                tmp.indexOf(
                  newData[i].elementGroups[j].elements[k].elementCode +
                    newData[i].elementGroups[j].elements[k].elementCodeName
                ) > -1
              ) {
                newData[i].elementGroups[j].elements.splice(k, 1);
                continue;
              }
            }
          }
        } else {
          for (
            var j = newData[i].elementGroups[0].elements.length - 1;
            j >= 0;
            j--
          ) {
            const removeId =
              newData[i].elementGroups[0].elements[j].elementCode +
              newData[i].elementGroups[0].elements[j].elementCodeName;
            if (tmp.indexOf(removeId) > -1) {
              newData[i].elementGroups[0].elements.splice(j, 1);
            }
          }
        }
      }
      setRightSideData([...newData]);
      setMultipleCheckBox([]);
      setUpdateOrder([]);
      return false;
    }
  }

  // handle change Update Order
  function handleChangeUpOrder(id, e) {
    const order = updateOrder;
    const tmp = multipeCheckBox;
    const arr = rightSideData;
    if (e.target.checked === true) {
      order.push(e.target.value);
      for (var i = arr.length - 1; i >= 0; i--) {
        if (
          arr[i].elementTypeCode + arr[i].elementTypeName ===
          e.target.value
        ) {
          arr[i].sorting = !false;
        }
      }

      tmp.push(e.target.value);
    } else {
      for (var i = arr.length - 1; i >= 0; i--) {
        if (
          arr[i].elementTypeCode + arr[i].elementTypeName ===
          e.target.value
        ) {
          arr[i].sorting = false;
        }
      }
      setRightSideData([...arr]);
      const index = tmp.indexOf(e.target.value);
      tmp.splice(index, 1);

      //order sorting remove element
      const index_order = order.indexOf(e.target.value);
      order.splice(index_order, 1);
    }
    setMultipleCheckBox([...multipeCheckBox]);
    setUpdateOrder([...order]);
  }

  // handle change Down Order
  function handleRightSideChildCheckBox(code, e) {
    const order = updateOrder;
    const arr = rightSideData;
    const tmp = multipeCheckBox;
    if (e.target.checked === true) {
      setremoveRightData(e);
      order.push(e.target.value);
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].elementGroups.length > 1) {
          for (var j = arr[i].elementGroups.length - 1; j >= 0; j--) {
            if (
              arr[i].elementGroups[j].elementGroupCode +
                arr[i].elementGroups[j].elementGroupName ===
              e.target.value
            ) {
              arr[i].elementGroups[j].sorting = !false;
            }

            for (let k = 0; k < arr[i].elementGroups[j].elements.length; k++) {
              if (
                arr[i].elementGroups[j].elements[k].elementCode +
                  arr[i].elementGroups[j].elements[k].elementCodeName ===
                e.target.value
              ) {
                arr[i].elementGroups[j].elements[k].sorting = !false;
              }
            }
          }
        } else {
          for (
            var j = arr[i].elementGroups[0].elements.length - 1;
            j >= 0;
            j--
          ) {
            if (
              arr[i].elementGroups[0].elements[j].elementCode +
                arr[i].elementGroups[0].elements[j].elementCodeName ===
              e.target.value
            ) {
              arr[i].elementGroups[0].elements[j].sorting = !false;
            }
          }
        }
      }
      tmp.push(e.target.value);
    } else {
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].elementGroups.length > 1) {
          for (var j = arr[i].elementGroups.length - 1; j >= 0; j--) {
            if (
              arr[i].elementGroups[j].elementGroupCode +
                arr[i].elementGroups[j].elementGroupName ===
              e.target.value
            ) {
              arr[i].elementGroups[j].sorting = false;
            }
            for (let k = 0; k < arr[i].elementGroups[j].elements.length; k++) {
              if (
                arr[i].elementGroups[j].elements[k].elementCode +
                  arr[i].elementGroups[j].elements[k].elementCodeName ===
                e.target.value
              ) {
                arr[i].elementGroups[j].elements[k].sorting = false;
              }
            }
          }
        } else {
          for (
            var j = arr[i].elementGroups[0].elements.length - 1;
            j >= 0;
            j--
          ) {
            if (
              arr[i].elementGroups[0].elements[j].elementCode +
                arr[i].elementGroups[0].elements[j].elementCodeName ===
              e.target.value
            ) {
              arr[i].elementGroups[0].elements[j].sorting = false;
            }
          }
        }
      }

      setRightSideData([...arr]);
      const index = tmp.indexOf(e.target.value);
      tmp.splice(index, 1);
      const index_order = order.indexOf(e.target.value);
      order.splice(index_order, 1);
    }
    if (multipeCheckBox.length > 1) {
      setArrowClass("hidden");
    } else {
      setArrowClass("visible");
    }
    setMultipleCheckBox([...tmp]);
    setUpdateOrder([...order]);
  }

  // Up Arrow button for Sorting
  function handleUpArrow(e) {
    e.preventDefault();
    if (rightSideData) {
      const arr = Object.assign([], rightSideData);
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].elementTypeCode + arr[i].elementTypeName ===
          updateOrder[0]
        ) {
          const parentIndex = arr.findIndex(
            (id) => id.elementTypeCode + id.elementTypeName === updateOrder[0]
          );
          const newIndex = parseInt(
            arr.findIndex(
              (id) => id.elementTypeCode + id.elementTypeName === updateOrder[0]
            ) - 1
          );
          if (parentIndex !== 0) {
            move(parentIndex, newIndex, arr);
          }
        }

        if (arr[i].elementGroups.length > 1) {
          for (var j = 0; j < arr[i].elementGroups.length; j++) {
            if (
              arr[i].elementGroups[j].elementGroupCode +
                arr[i].elementGroups[j].elementGroupName ===
              updateOrder[0]
            ) {
              const childIndex = arr[i].elementGroups.findIndex(
                (id) =>
                  id.elementGroupCode + id.elementGroupName === updateOrder[0]
              );
              const childNewIndex = parseInt(
                arr[i].elementGroups.findIndex(
                  (id) =>
                    id.elementGroupCode + id.elementGroupName === updateOrder[0]
                ) - 1
              );
              arr[i].elementGroups[j].sorting = !false;
              if (childIndex !== 0) {
                move(childIndex, childNewIndex, arr[i].elementGroups);
              }
            }
            // inner child sorting
            for (let k = 0; k < arr[i].elementGroups[j].elements.length; k++) {
              if (
                arr[i].elementGroups[j].elements[k].elementCode +
                  arr[i].elementGroups[j].elements[k].elementCodeName ===
                updateOrder[0]
              ) {
                const childIndex = arr[i].elementGroups[j].elements.findIndex(
                  (id) => id.elementCode + id.elementCodeName === updateOrder[0]
                );
                const childNewIndex = parseInt(
                  arr[i].elementGroups[j].elements.findIndex(
                    (id) =>
                      id.elementCode + id.elementCodeName === updateOrder[0]
                  ) - 1
                );
                arr[i].elementGroups[j].elements[k].sorting = !false;
                if (childIndex !== 0) {
                  move(
                    childIndex,
                    childNewIndex,
                    arr[i].elementGroups[j].elements
                  );
                }
              }
            }
          }
        } else {
          for (var j = 0; j < arr[i].elementGroups[0].elements.length; j++) {
            if (
              arr[i].elementGroups[0].elements[j].elementCode +
                arr[i].elementGroups[0].elements[j].elementCodeName ===
              updateOrder[0]
            ) {
              const childIndex = arr[i].elementGroups[0].elements.findIndex(
                (id) => id.elementCode + id.elementCodeName === updateOrder[0]
              );
              const childNewIndex = parseInt(
                arr[i].elementGroups[0].elements.findIndex(
                  (id) => id.elementCode + id.elementCodeName === updateOrder[0]
                ) - 1
              );
              arr[i].elementGroups[0].elements[j].sorting = !false;
              if (childIndex !== 0) {
                move(
                  childIndex,
                  childNewIndex,
                  arr[i].elementGroups[0].elements
                );
              }
            }
          }
        }
      }
      setRightSideData(arr);
    }
    return false;
  }

  function move(from, to, arr) {
    const newArr = arr;
    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);
    return newArr;
  }

  // Down Arrow button for Sorting
  function handleDownArrow(e) {
    e.preventDefault();
    if (rightSideData) {
      const arr = Object.assign([], rightSideData);
      const newArr = [];
      for (let i = arr.length - 1; i >= 0; i--) {
        if (
          arr[i].elementTypeCode + arr[i].elementTypeName ===
          updateOrder[0]
        ) {
          arr[i].sorting = !false;
          const parentIndex = arr.findIndex(
            (id) => id.elementTypeCode + id.elementTypeName === updateOrder[0]
          );
          const newIndex = parseInt(
            arr.findIndex(
              (id) => id.elementTypeCode + id.elementTypeName === updateOrder[0]
            ) + 1
          );
          move(parentIndex, newIndex, arr);
        }
        if (arr[i].elementGroups.length > 1) {
          for (var j = arr[i].elementGroups.length - 1; j >= 0; j--) {
            if (
              arr[i].elementGroups[j].elementGroupCode +
                arr[i].elementGroups[j].elementGroupName ===
              updateOrder[0]
            ) {
              const childIndex = arr[i].elementGroups.findIndex(
                (id) =>
                  id.elementGroupCode + id.elementGroupName === updateOrder[0]
              );
              const childNewIndex = parseInt(
                arr[i].elementGroups.findIndex(
                  (id) =>
                    id.elementGroupCode + id.elementGroupName === updateOrder[0]
                ) + 1
              );
              arr[i].elementGroups[j].sorting = !false;
              move(childIndex, childNewIndex, arr[i].elementGroups);
            }
            // inner child sorting

            for (
              let k = arr[i].elementGroups[j].elements.length - 1;
              k >= 0;
              k--
            ) {
              if (
                arr[i].elementGroups[j].elements[k].elementCode +
                  arr[i].elementGroups[j].elements[k].elementCodeName ===
                updateOrder[0]
              ) {
                const childIndex = arr[i].elementGroups[j].elements.findIndex(
                  (id) => id.elementCode + id.elementCodeName === updateOrder[0]
                );
                const childNewIndex = parseInt(
                  arr[i].elementGroups[j].elements.findIndex(
                    (id) =>
                      id.elementCode + id.elementCodeName === updateOrder[0]
                  ) + 1
                );
                arr[i].elementGroups[j].elements[k].sorting = !false;
                move(
                  childIndex,
                  childNewIndex,
                  arr[i].elementGroups[j].elements
                );
              }
            }
          }
        } else {
          for (
            var j = arr[i].elementGroups[0].elements.length - 1;
            j >= 0;
            j--
          ) {
            if (
              arr[i].elementGroups[0].elements[j].elementCode +
                arr[i].elementGroups[0].elements[j].elementCodeName ===
              updateOrder[0]
            ) {
              const childIndex = arr[i].elementGroups[0].elements.findIndex(
                (id) => id.elementCode + id.elementCodeName === updateOrder[0]
              );
              const childNewIndex = parseInt(
                arr[i].elementGroups[0].elements.findIndex(
                  (id) => id.elementCode + id.elementCodeName === updateOrder[0]
                ) + 1
              );
              arr[i].elementGroups[0].elements[j].sorting = !false;
              move(childIndex, childNewIndex, arr[i].elementGroups[0].elements);
            }
          }
        }
      }
      setRightSideData(arr);
    }
    return false;
  }
  function triggerEvent(element, eventName) {
    const event = new Event(eventName);
    element.dispatchEvent(event);
  }

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }
  const setSelectedListTypeOnChange = (e) => {
    contextType.setSelectedListType(e);
    setTimeout(() => {
      payloadJson();
    }, 1000);
  };
  return (
    <RoomDescriptionContextProvider>
      <RoomDescriptionContext.Consumer>
        {(roomdescriptioncontext) => {
          contextType = roomdescriptioncontext;
          return (
            <div>
              <div className={styles.titleBtn}>
                <span
                  className={`${styles.floatRight} ${styles.cursorPointer}`}
                >
                  <img tabIndex={0} onClick={handleSubmit} src={UpdateBtnImg} />
                  <img
                    className={styles.pl4}
                    tabIndex={0}
                    onClick={handleNext}
                    src={NextBtnImg}
                    alt={"nextbtn"}
                  />
                </span>
              </div>
              <div className={styles.clearBoth}>
                <div style={{ float: "left", marginTop: "69px" }}>
                  <table>
                    <tbody>
                      <tr>
                        <td className={styles.fieldName}>
                          {Settings.roomDescriptionTitles.title}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <form>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className={styles.tableBd}>
                                      <table
                                        className={styles.menuWdth100Height}
                                      >
                                        <tbody>
                                          {leftSideData.map((data, index) => (
                                            <tr key={index}>
                                              <tr className={styles.fieldName}>
                                                <td>
                                                  <input
                                                    type="checkbox"
                                                    checked={data.checked}
                                                    value={
                                                      data.elementTypeCode +
                                                      data.elementTypeName
                                                    }
                                                    key={index}
                                                    onChange={(checkbox) =>
                                                      handleLeftSideCheckBox(
                                                        data.elementTypeCode +
                                                          data.elementTypeName,
                                                        index,
                                                        checkbox
                                                      )
                                                    }
                                                  />{" "}
                                                  {data.elementTypeName}
                                                </td>
                                                <tr>
                                                  {data.elementGroups &&
                                                    data.elementGroups.map(
                                                      (item, i) => (
                                                        <tr
                                                          key={i}
                                                          className={
                                                            styles.subTitle
                                                          }
                                                        >
                                                          <td
                                                            className={
                                                              styles.fontItalic
                                                            }
                                                          >
                                                            {
                                                              item.elementGroupName
                                                            }
                                                          </td>
                                                          <tr>
                                                            {item.elements.map(
                                                              (item, i) => (
                                                                <td
                                                                  key={i}
                                                                  className={
                                                                    styles.subTitle2
                                                                  }
                                                                >
                                                                  {
                                                                    item.elementCodeName
                                                                  }
                                                                </td>
                                                              )
                                                            )}
                                                          </tr>
                                                        </tr>
                                                      )
                                                    )}
                                                </tr>
                                              </tr>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </form>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <form>
                    <table className={styles.menuHght100Height}>
                      <tbody>
                        <tr>
                          <td className={styles.arrowRight}>
                            <table className={styles.zeroHeight}>
                              <tbody>
                                <tr>
                                  <td className={styles.arrowRightheight}></td>
                                </tr>
                                <tr>
                                  <td>
                                    <img
                                      tabIndex={0}
                                      src={AddBtnImg}
                                      onClick={handelSwipeClick}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.arrowRightheight}></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td className={styles.arrowRightwidth}>
                            <table className={styles.zeroHeight}>
                              <tbody>
                                <tr>
                                  <td>
                                    <table className={styles.zeroHeight}>
                                      <tbody>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.roomDescriptionTitles
                                                .channel
                                            }
                                          </td>
                                          <td className={styles.field}></td>
                                          <td className={styles.field_Value}>
                                            {history.location.state.strChannel?.name?.trim()}
                                          </td>
                                          <td className={styles.enrty}></td>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.roomDescriptionTitles
                                                .entry
                                            }
                                          </td>
                                          <td className={styles.field}></td>
                                          <td className={styles.field_Value}>
                                            {
                                              history.location.state.strEntry
                                                ?.name
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.zero}>
                                    <table className={styles.zeroHeight}>
                                      <tbody>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.roomDescriptionTitles
                                                .maxnumberlines
                                            }
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              onChange={(e) =>
                                                handleOnChanges(e)
                                              }
                                              name="maxLines"
                                              value={allstate.maxLines}
                                              className={styles.maxLine}
                                            />
                                          </td>
                                          <td className={styles.maxnum}>
                                            <>&nbsp;</>
                                          </td>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.roomDescriptionTitles
                                                .maxnumbercol
                                            }
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              onChange={(e) =>
                                                handleOnChanges(e)
                                              }
                                              name="maxColoums"
                                              value={allstate.maxColoums}
                                              className={styles.maxColumns}
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.zero}>
                                    <table className={styles.zeroHeight}>
                                      <tbody>
                                        <tr>
                                          <td className={styles.fieldName}>
                                            {
                                              Settings.roomDescriptionTitles
                                                .mode
                                            }
                                          </td>
                                          <td>
                                            <CSelect
                                              name="type"
                                              id="type"
                                              ddnOptions={RDSettings.listType}
                                              keyField={"value"}
                                              valField={"value"}
                                              onChange={(event) => {
                                                setSelectedListTypeOnChange(
                                                  event.target.value
                                                );
                                              }}
                                              selectedValue={
                                                contextType.selectedListType
                                              }
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.roomTitles}>
                                    <>&nbsp;</>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={styles.fieldName}>
                                    {Settings.roomDescriptionTitles.rules}
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <table className={styles.zeroHeight}>
                                      <tr>
                                        <td>
                                          <div className={styles.rules}>
                                            <table
                                              className={
                                                styles.menuWdth100Height
                                              }
                                            >
                                              <tbody>
                                                <tr>
                                                  {rightSideData.map(
                                                    (data, index) => (
                                                      <tr
                                                        key={
                                                          data.elementTypeCode
                                                        }
                                                      >
                                                        <td
                                                          className={`${roomOverviewStyle} ${styles.bold}`}
                                                        >
                                                          <input
                                                            type="checkbox"
                                                            value={
                                                              data.elementTypeCode +
                                                              data.elementTypeName
                                                            }
                                                            id={
                                                              "checkBox" +
                                                              data.elementTypeCode
                                                            }
                                                            checked={
                                                              data.sorting
                                                            }
                                                            onChange={(
                                                              checkbox
                                                            ) =>
                                                              handleChangeUpOrder(
                                                                data.elementTypeCode,
                                                                checkbox
                                                              )
                                                            }
                                                            key={index}
                                                          />
                                                          {data.elementTypeName}
                                                          {data.elementGroups &&
                                                            data.elementGroups.map(
                                                              (item, i) => (
                                                                <tr
                                                                  key={i}
                                                                  className={
                                                                    styles.subTitle
                                                                  }
                                                                >
                                                                  <td>
                                                                    {item.elementGroupName.trim() && (
                                                                      <span
                                                                        className={
                                                                          styles.fontItalic
                                                                        }
                                                                      >
                                                                        <input
                                                                          type="checkbox"
                                                                          value={
                                                                            item.elementGroupCode +
                                                                            item.elementGroupName
                                                                          }
                                                                          checked={
                                                                            item.sorting
                                                                          }
                                                                          onChange={(
                                                                            checkbox
                                                                          ) => {
                                                                            handleRightSideChildCheckBox(
                                                                              item.elementGroupName,
                                                                              checkbox
                                                                            );
                                                                          }}
                                                                        />
                                                                        {
                                                                          item.elementGroupName
                                                                        }
                                                                      </span>
                                                                    )}
                                                                  </td>
                                                                  <tr>
                                                                    {item.elements.map(
                                                                      (
                                                                        item,
                                                                        i
                                                                      ) => (
                                                                        <td
                                                                          key={
                                                                            i
                                                                          }
                                                                          className={
                                                                            styles.subTitle2
                                                                          }
                                                                        >
                                                                          <input
                                                                            type="checkbox"
                                                                            checked={
                                                                              item.sorting
                                                                            }
                                                                            id={
                                                                              "checkBox" +
                                                                              item.elementCode
                                                                            }
                                                                            value={
                                                                              item.elementCode +
                                                                              item.elementCodeName
                                                                            }
                                                                            onChange={(
                                                                              event
                                                                            ) =>
                                                                              handleRightSideChildCheckBox(
                                                                                item.elementCode,
                                                                                event
                                                                              )
                                                                            }
                                                                          />
                                                                          {
                                                                            item.elementCodeName
                                                                          }
                                                                        </td>
                                                                      )
                                                                    )}
                                                                  </tr>
                                                                </tr>
                                                              )
                                                            )}
                                                        </td>
                                                      </tr>
                                                    )
                                                  )}
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table>
                              <tbody>
                                <tr>
                                  <td style={{ visibility: arrowClass }}>
                                    <img
                                      tabIndex={0}
                                      src={RemoveUpIconImg}
                                      className={styles.RemoveUpIcon}
                                      onClick={handleUpArrow}
                                    />
                                  </td>
                                  <td style={{ visibility: arrowClass }}>
                                    <img
                                      tabIndex={0}
                                      src={AddBtnDownImg}
                                      onClick={handleDownArrow}
                                    />
                                  </td>
                                  <td>
                                    <img
                                      tabIndex={0}
                                      src={RemoveImg}
                                      onClick={handleDeleteItems}
                                      className={styles.removeDataRoom}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                  <CModal
                    show={contextType.state.showModal}
                    onClose={contextType.onShowModal}
                    xPosition={Settings.modalXPosition}
                    yPosition={Settings.modalYPosition}
                  >
                    <Suspense fallback={<CSuspense />}>
                      <div className={styles.modalContent}>
                        {contextType.state.validationMessage}
                      </div>
                    </Suspense>
                  </CModal>
                </div>
              </div>
              {loader && <CLoader />}
            </div>
          );
        }}
      </RoomDescriptionContext.Consumer>
    </RoomDescriptionContextProvider>
  );
};

export default RoomDescriptionView;
