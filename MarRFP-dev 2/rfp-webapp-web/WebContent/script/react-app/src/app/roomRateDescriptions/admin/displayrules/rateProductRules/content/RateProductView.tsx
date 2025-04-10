import React, { useState, useEffect, Suspense, useContext } from "react";
import UpdateBtnImg from "../../../../../common/assets/img/btnUpdate.gif";
import NextBtnImg from "../../../../../common/assets/img/button/btnNext.gif";
import AddBtnImg from "../../../../../common/assets/img/button/btnAdd2.gif";
import RemoveUpIconImg from "../../../../../common/assets/img/button/btnRemove.gif";
import AddBtnDownImg from "../../../../../common/assets/img/button/btnAddDis.gif";
import RemoveImg from "../../../../../common/assets/img/button/btnRemoveTxt.gif";
import styles from "./RateProductView.css";
import API from "../service/API";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import RateProductContext, {
  RateProductContextProvider,
} from "../context/RateProductContext";
import Settings from "../static/Settings";
import CModal from "../../../../../common/components/CModal";
import CSuspense from "../../../../../common/components/CSuspense";
import CPageTitle from "../../../../../common/components/CPageTitle";
import CSelect from "../../../../../common/components/CSelect";
import { RDSettings } from "../../../Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import { CLoader } from "../../../../../common/components/CLoader";
import classNames from "classnames";

let contextType = null;
const RateProductView = (): JSX.Element => {
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
  const [loader, setLoader] = useState(false);

  // this is for 302 redirection
  const [statusCode, setStatusCode] = useState(false);

  const [allstate, setallState] = useState({
    maxLines: null,
    maxColoums: null,
  });

  const history = useHistory();
  const params = useParams();
  const getAPIElements = () => {
    const strChannel = history.location.state.strChannel;
    const strEntry = history.location.state.strEntry;
    const param = {
      strChannel: JSON.stringify(strChannel),
      strEntry: JSON.stringify(strEntry),
      bCreateNew: true,
    };
    setLoader(true);
    API.availableElementRules(param)
      .then((res) => {
        setLoader(false);
        if (res.displayRulesData === null) {
          setallState({
            maxColoums: null,
            maxLines: null,
          });
          contextType.setSelectedListType("List");
          setRightSideData([]);
          validationCheck();
        } else {
          setallState({
            maxColoums: res.displayRulesData.displayDimensions.maxColumns,
            maxLines: res.displayRulesData.displayDimensions.maxLines,
          });
          contextType.setSelectedListType(
            res.displayRulesData.displayDimensions.mode
          );
          const arr = res.displayRulesData.displayproducts;
          for (let i = arr.length - 1; i >= 0; i--) {
            arr[i]["sorting"] = false;
            if (arr[i].elementTypeName === null) {
              arr.splice(i, 1);
              continue;
            }
            for (
              let eleGroup = 0;
              arr[i].elementGroups.length > eleGroup;
              eleGroup++
            ) {
              for (
                let j = arr[i].elementGroups[eleGroup].elements.length - 1;
                j >= 0;
                j--
              ) {
                arr[i].elementGroups[eleGroup].elements[j]["sorting"] = false;
              }
            }
          }
          setRightSideData(arr);
        }
        const assignSortingAttr = res.rulesDataDictionary;
        for (let i = assignSortingAttr.length - 1; i >= 0; i--) {
          assignSortingAttr[i]["sorting"] = false;
          assignSortingAttr[i]["checked"] = false;
          if (assignSortingAttr[i].elementGroups.length > 1) {
            for (
              var j = assignSortingAttr[i].elementGroups.length - 1;
              j >= 0;
              j--
            ) {
              assignSortingAttr[i].elementGroups[j]["sorting"] = false;
              for (
                let k = 0;
                k < assignSortingAttr[i].elementGroups[j].elements.length;
                k++
              ) {
                assignSortingAttr[i].elementGroups[j].elements[k]["sorting"] =
                  false;
              }
            }
          } else {
            for (
              var j = assignSortingAttr[i].elementGroups[0].elements.length - 1;
              j >= 0;
              j--
            ) {
              assignSortingAttr[i].elementGroups[0].elements[j]["sorting"] =
                false;
            }
          }
        }
        setLeftSideData(assignSortingAttr);
      })
      .catch((reason) => {
        if (reason.response!.status === 400) {
          // Handle 400
        } else if (reason.response!.status === 302) {
          // Handle else
          setStatusCode(true);
          history.push({
            pathname: "/rateproductrules/CopyRules",
            state: history.location.state.channelValue,
            dataview: history.location.state.dataview,
          });
        } else {
          // Handle else
        }
      });
  };
  useEffect(() => {
    if (history?.location?.state?.copyRule) {
      if (history?.location?.state?.params) {
        API.copyRoomsEntry(history?.location?.state?.params).then((res) => {
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
    } else {
      getAPIElements();
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

  const setSelectedListTypeOnChange = (e) => {
    contextType.setSelectedListType(e);
    setTimeout(() => {
      payloadJson();
    }, 1000);
  };

  useEffect(() => {
    if (multipeCheckBox.length > 1) {
      setArrowClass("hidden");
    } else {
      setArrowClass("visible");
    }
  }, [multipeCheckBox]);

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

      for (
        let eleGroups = 0;
        eleGroups < arr[i].elementGroups.length;
        eleGroups++
      ) {
        for (
          let j = 0;
          j < arr[i].elementGroups[eleGroups].elements.length;
          j++
        ) {
          elementGroupCode = arr[i].elementGroups[eleGroups].elementGroupCode;
          elementCodeList =
            arr[i].elementGroups[eleGroups].elements[j] !== undefined
              ? arr[i].elementGroups[eleGroups].elements[j].elementCodeList
              : "";
          elementCode = arr[i].elementGroups[eleGroups].elements[j].elementCode;
          const data = {
            elementTypeCode: elementTypeCode,
            elementGroupCode: elementGroupCode,
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
      "rateProductViewData",
      JSON.stringify({ params: params })
    );
    return params;
  };

  const saveDetails = (updateData) => {
    const savedData = JSON.parse(localStorage.getItem("rateProductViewData"));
    const params = savedData && savedData.params;
    if (params) {
      API.upDataElementRules(params)
        .then((res) => {
          if (updateData) {
            getAPIElements();
          }
        })
        .catch((error) => {});
    }
  };

  // this is for updaterequest
  const handleSubmit = () => {
    if (allstate.maxLines == null || allstate.maxLines == "") {
      alert(Settings.modalContent);

      event.preventDefault();
    } else if (allstate.maxColoums == null || allstate.maxColoums == "") {
      alert(Settings.modalContent1);

      event.preventDefault();
    } else {
      saveDetails(true);
    }
  };

  // this is for the maxline and max coloum text boxes
  const handleNext = () => {
    if (allstate.maxLines == null || allstate.maxLines == "") {
      contextType.setState({
        ...contextType.state,
        //showModal: true,
        validationMessage: Settings.modalContent,
      });
      alert(Settings.modalContent);
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.modalContent,
        type: "browserAlert",
      });
      return false;
    } else if (allstate.maxColoums == null || allstate.maxColoums == "") {
      contextType.setState({
        ...contextType.state,
        //showModal: true,
        validationMessage: Settings.modalContent1,
      });
      alert(Settings.modalContent1);
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.modalContent1,
        type: "browserAlert",
      });
      return false;
    } else {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
      sessionStorage.removeItem("channelNames");
      sessionStorage.removeItem("listViewDatas");
      //saveDetails(false);
      history.push({
        pathname: "/rateproductrules/RateProduct",
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
        message: Settings.modalContent,
        type: "browserAlert",
      });
    } else if (allstate.maxColoums === null || allstate.maxColoums === "") {
      appContext.setErrorMessageAlert({
        show: true,
        message: Settings.modalContent1,
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

  return (
    <>
      <RateProductContextProvider>
        <RateProductContext.Consumer>
          {(rateProductContext) => {
            contextType = rateProductContext;
            return (
              <div>
                {loader && <CLoader />}
                <div style={{ height: "94vh" }}>
                  <CPageTitle
                    title={Settings.productViewPage.pageTitle}
                  ></CPageTitle>
                  <table className={styles.dataBtn}>
                    <tbody>
                      <tr>
                        <td className={styles.btntext}>
                          <img
                            tabIndex={0}
                            onClick={handleSubmit}
                            src={UpdateBtnImg}
                          />
                        </td>
                        <td className={styles.btntext}>
                          <p onClick={handleNext}>
                            <img
                              tabIndex={0}
                              src={NextBtnImg}
                              alt={"nextbtn"}
                            />
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className={styles.availableElementsDiv}>
                    <table>
                      <tbody>
                        <tr>
                          <td className={styles.fieldName}>
                            {Settings.rateProductTitles.title}
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
                                                <tr
                                                  className={classNames(
                                                    styles.fieldName,
                                                    styles.firstrowcard
                                                  )}
                                                >
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
                                                                styles.leftheaddata
                                                              }
                                                            >
                                                              {
                                                                item.elementGroupName
                                                              }
                                                            </td>
                                                            <tr
                                                              className={
                                                                styles.productdata
                                                              }
                                                            >
                                                              {item.elements.map(
                                                                (item, i) => (
                                                                  <td
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
                  <div style={{ float: "left" }}>
                    <form>
                      <table className={styles.menuHght100Height}>
                        <tbody>
                          <tr>
                            <td style={{ width: "50px" }}>
                              <table
                                className={`${styles.zeroHeight} ${styles.marginLeftAddButton}`}
                              >
                                <tbody>
                                  <tr>
                                    <td style={{ height: "50%" }}></td>
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
                                    <td style={{ height: "50%" }}></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td style={{ width: "380px" }}>
                              <table className={styles.zeroHeight}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <table className={styles.zeroHeight}>
                                        <tbody>
                                          <tr>
                                            <td className={styles.fieldName}>
                                              {
                                                Settings.rateProductTitles
                                                  .channel
                                              }
                                            </td>
                                            <td style={{ width: "5px" }}></td>
                                            <td className={styles.field_Value}>
                                              {history.location.state.strChannel?.name?.trim()}
                                            </td>
                                            <td style={{ width: "15px" }}></td>
                                            <td className={styles.fieldName}>
                                              {Settings.rateProductTitles.entry}
                                              :
                                            </td>
                                            <td style={{ width: "5px" }}></td>
                                            <td className={styles.field_Value}>
                                              {history.location.state.strEntry?.name?.trim()}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ height: "25px" }}>
                                      <table className={styles.zeroHeight}>
                                        <tbody>
                                          <tr>
                                            <td
                                              className={styles.fieldName}
                                              style={{ marginRight: "3px" }}
                                            >
                                              {
                                                Settings.rateProductTitles
                                                  .maxnumberlines
                                              }
                                              :
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
                                            <td style={{ width: "20px" }}>
                                              <>&nbsp;</>
                                            </td>
                                            <td
                                              className={styles.fieldName}
                                              style={{ marginRight: "3px" }}
                                            >
                                              {
                                                Settings.rateProductTitles
                                                  .maxnumbercol
                                              }
                                              :
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
                                    <td style={{ height: "25px" }}>
                                      <table className={styles.zeroHeight}>
                                        <tbody>
                                          <tr>
                                            <td className={styles.fieldName}>
                                              {Settings.rateProductTitles.mode}:
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
                                    <td style={{ height: "20px" }}>
                                      <>&nbsp;</>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      className={styles.fieldName}
                                      style={{ marginBottom: "5px" }}
                                    >
                                      {Settings.rateProductTitles.rules}
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
                                                          className={
                                                            styles.productdata
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
                                                            {
                                                              data.elementTypeName
                                                            }
                                                            {data.elementGroups &&
                                                              data.elementGroups.map(
                                                                (item, i) => (
                                                                  <tr
                                                                    className={
                                                                      styles.subTitle3
                                                                    }
                                                                  >
                                                                    <td>
                                                                      {item.elementGroupName.trim() && (
                                                                        <span>
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
                                                                          <span
                                                                            style={{
                                                                              fontStyle:
                                                                                "italic",
                                                                            }}
                                                                          >
                                                                            &nbsp;
                                                                            {
                                                                              item.elementGroupName
                                                                            }
                                                                          </span>
                                                                        </span>
                                                                      )}
                                                                    </td>
                                                                    <tr
                                                                      className={
                                                                        styles.productdata
                                                                      }
                                                                    >
                                                                      {item.elements.map(
                                                                        (
                                                                          item,
                                                                          i
                                                                        ) => (
                                                                          <td
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
                                        style={{ marginLeft: "95px" }}
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
                                        style={{
                                          marginLeft: "35px",
                                          marginTop: "-11px",
                                        }}
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
                      title="Alert Message"
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
              </div>
            );
          }}
        </RateProductContext.Consumer>
      </RateProductContextProvider>
    </>
  );
};

export default RateProductView;
