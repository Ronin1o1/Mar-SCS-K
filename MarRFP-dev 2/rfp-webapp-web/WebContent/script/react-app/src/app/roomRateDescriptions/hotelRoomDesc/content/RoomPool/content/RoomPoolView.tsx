import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styles from "./RoomPoolView.css";
import API from "../service/API";
import SelectHotelContext from "../context/SelectHotelContext";
import Settings from "../static/Settings";
import TabViewPanel from "./TabViewPanel";
import btnPrevious from "../../../../../common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../../../common/assets/img/button/btnNext.gif";
import revisit from "../../../../../common/assets/img/revisit.gif";
import Utils from "../../../../../../../src/app/common/utils/Utils";
//import { AreaFilter } from "../../../../../common/components/filter/AreaFilter";
//import RateProgramContext from "../../RateProgram/context/RateProgramContext";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
let showStatus = false;
let showText = false;
let showQuantity = false;
let foundAmenities = false;

let foundRooms = false;
let prevRoomNumber = 0;
let currentRoomNumber;
let fieldName = null;
let roomPool;
let screenid;
let marshaCode;
let hotelName;
let bypasscheck = false;
let mainMap = [];

const RoomPoolView = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [isAmenities, setAmenities] = useState(false);
  const history = useHistory();
  const urlParms = useLocation().search;
  const [isMakingRequest, setIsMakingRequest] = useState(false);

  const { path } = useRouteMatch();
  roomPool = new URLSearchParams(urlParms).get(Settings.queryId.roomPool);
  screenid = new URLSearchParams(urlParms).get(Settings.queryId.screenid);
  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);
  screenid = new URLSearchParams(urlParms).get(Settings.queryId.screenid);
  if (props.location.state) {
    screenid =
      screenid !== null && screenid !== "null"
        ? screenid
        : sessionStorage.getItem("screenid") !== null &&
          sessionStorage.getItem("screenid") !== undefined
        ? sessionStorage.getItem("screenid")
        : 1;
  }
  const paramsupdate = {
    roomPool: roomPool,
    newInd: contextType?.state?.newInd,
    marshaCode: marshaCode,
    hotelName: hotelName,
    rateProgram: props.location.rateProgram
      ? props.location.rateProgram
      : sessionStorage.getItem("rateProgram"),
    screenid: screenid !== null ? screenid : 1,
  };
  useEffect(() => {
    return () => {
      sessionStorage.setItem("screenid", null);
      sessionStorage.setItem("rateProgram", null);
      contextType.state.formChg = "N";
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
    };
  }, []);
  useEffect(() => {
    // let query = null;
    // roomPool = roomPool ? roomPool : history.location.data;
    contextType.setStateParams(roomPool, marshaCode, hotelName);
    contextType.state.formChg = "N";

    const params = {
      roomPool: roomPool,
      newInd: contextType?.state?.newInd,
      marshaCode: marshaCode,
      hotelName: hotelName,
      screenid: screenid !== null && screenid !== "null" ? screenid : 1,
      rateProgram: props.location.rateProgram
        ? props.location.rateProgram
        : sessionStorage.getItem("rateProgram"),
    };
    if (props.location.state) {
      setIsMakingRequest(true);
      API.getRateProgramView(params).then((data) => {
        setIsMakingRequest(false);
        contextType.setState({ ...contextType.state, isRoomPoolDetails: true });
        contextType.getRateProgramNameData(data, roomPool);
      });
      sessionStorage.setItem("rateProgram", params.rateProgram);
    } else {
      setIsMakingRequest(true);
      API.getRoomPoolView(params).then((data) => {
        setIsMakingRequest(false);
        contextType.setState({ ...contextType.state, isRoomPoolDetails: true });
        contextType.getRoomNameData(data, roomPool);
      });
    }
  }, [roomPool, screenid]);

  const updateAPIcall = (prm) => {
    mainMap = mainMap.reduce(function (result, item) {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      if (!Number(result[key].quantity)) {
        result[key].quantity = 0;
        return result;
      } else {
        return result;
      }
    }, {});
    paramsupdate.mainMap = mainMap;
    setIsMakingRequest(true);
    contextType.setState({
      ...contextType.state,
      newInd: false,
      formChg: "N",
    });
    API.updateRoomPool(paramsupdate, contextType.state.formChg).then((data) => {
      contextType.state.newInd = false;
      contextType.setState({
        ...contextType.state,
        newInd: false,
        formChg: "N",
        isRoomPoolDetails: true,
      });
      if (prm) {
        history.push({
          pathname: `${path + Settings.routingUrl.defineRoomName}`,
          search: prm,
        });
      }
      setIsMakingRequest(false);
    });
  };

  const updateAPIcall2 = () => {
    if (finalCheck("", "")) {
      mainMap = mainMap.reduce(function (result, item) {
        const key = Object.keys(item)[0];
        result[key] = item[key];
        if (!Number(result[key].quantity)) {
          result[key].quantity = 0;
          return result;
        } else {
          return result;
        }
      }, {});
      paramsupdate.mainMap = mainMap;
      setIsMakingRequest(true);
      API.updateRoomPool(paramsupdate).then((data) => {
        contextType.state.newInd = false;
        setIsMakingRequest(false);
        contextType.setState({
          ...contextType.state,
          newInd: false,
          formChg: "N",
          isRoomPoolDetails: true,
        });
        const params = {
          roomPool: roomPool,
          newInd: contextType?.state?.newInd,
          marshaCode: marshaCode,
          hotelName: hotelName,
          screenid: screenid ? screenid : 3,
          rateProgram: props.location.rateProgram,
        };
        if (props.location.state) {
          setIsMakingRequest(true);
          API.getRateProgramView(params).then((data) => {
            setIsMakingRequest(false);
            contextType.setState({
              ...contextType.state,
              isRoomPoolDetails: true,
            });
            contextType.getRateProgramNameData(data, roomPool);
          });
        } else {
          setIsMakingRequest(true);
          API.getRoomPoolView(params).then((data) => {
            setIsMakingRequest(false);
            contextType.setState({
              ...contextType.state,
              isRoomPoolDetails: true,
            });
            contextType.getRoomNameData(data, roomPool);
          });
        }
      });
    }
  };
  const updateProgramAPIcall = () => {
    const strRoomTypeNameDefinition = {};
    const columnList = [];
    mainMap = mainMap.reduce(function (result, item) {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      if (!Number(result[key].quantity)) {
        result[key].quantity = 0;
        return result;
      } else {
        return result;
      }
    }, {});
    paramsupdate.mainMap = mainMap;
    setIsMakingRequest(true);
    API.updateRoomProgram(paramsupdate).then((data) => {
      setIsMakingRequest(false);
      contextType.setState({ ...contextType.state, isRoomPoolDetails: true });
      // contextType.getRoomNameData(data, roomPool);
    });
  };

  const creatHiddenDiv = (productDescription) => {
    return (
      <div
        style={{
          display: "none",
        }}
        id={"div_" + fieldName}
      >
        <table className="menuWdith100-Height">
          <tr>
            <td>
              {productDescription.showQuantity &&
              (productDescription.showAvailability ||
                productDescription.unitOfMeasure != null) ? (
                <>
                  {productDescription.editQuantity &&
                  contextType.state.isReadOnly != true ? (
                    <>
                      <input
                        title={Settings.textTitle}
                        name={"roomDefDefinition['" + fieldName + "'].quantity"}
                        id={"roomDefDefinition['" + fieldName + "'].quantity"}
                        className={styles.width30}
                        defaultValue={productDescription.quantity}
                        onKeyPress={Utils.NumberOnly_onkeypress}
                        onChange={(e) => contextType.formChanged(e)}
                      />
                    </>
                  ) : (
                    productDescription.quantity
                  )}
                </>
              ) : null}
            </td>
            <td>
              {productDescription.unitOfMeasure != null && (
                <>
                  {productDescription.editUOM &&
                  !contextType.state.isReadOnly ? (
                    selectDropdownUOM(productDescription)
                  ) : (
                    <>
                      {productDescription.unitOfMeasure != null &&
                        productDescription.unitOfMeasure.uom_Name != null && (
                          <>{productDescription.unitOfMeasure.uom_Name}</>
                        )}
                    </>
                  )}
                </>
              )}
            </td>
            <td>
              {productDescription.format != null && (
                <>
                  {productDescription.editFormat &&
                  !contextType.state.isReadOnly ? (
                    selectDropdownFormat(productDescription)
                  ) : (
                    <>
                      {productDescription.format != null &&
                        productDescription.format.formatName != null && (
                          <>
                            <b>{productDescription.format.formatType}:</b>
                            {productDescription.format.formatName}
                          </>
                        )}
                    </>
                  )}
                </>
              )}
            </td>
            <td>
              {productDescription.brand != null && (
                <>
                  {productDescription.editBrand &&
                  !contextType.state.isReadOnly ? (
                    selectDropdownBrand(productDescription)
                  ) : (
                    <>
                      {productDescription.brand != null &&
                        productDescription.brand.brandName != null && (
                          <>
                            <b>{productDescription.brand.brandType}:</b>
                            {productDescription.brand.brandName}
                          </>
                        )}
                    </>
                  )}
                </>
              )}
            </td>
            <td>
              {productDescription.showText && (
                <>{showTextTD(productDescription)}</>
              )}
            </td>
          </tr>
        </table>
      </div>
    );
  };
  const selectDropdownUOM = (optionData) => {
    const uom = optionData.unitOfMeasure;
    const uomListKey = uom.uom_List;
    const uomList = contextType.state.roomTypeNameDataView.uomLists[uomListKey];

    return (
      <>
        <select
          name={"roomDefDefinition['" + fieldName + "'].UOM_Code"}
          id={"roomDefDefinition['" + fieldName + "'].UOM_Code"}
          className={styles.selectDropDown}
          onChange={(e) => contextType.formChanged(e)}
        >
          {
            <option
              value="  "
              selected={uom.uom_Code == "  " ? true : false}
            ></option>
          }
          {uomList.unitOfMeasure.map((uomItem) => {
            return (
              <option
                key={uomItem.uom_Code + "***" + uomItem.uom_Name}
                value={uomItem.uom_Code + "***" + uomItem.uom_Name}
                selected={
                  uomItem.uom_Code.trim() == uom.uom_Code?.trim() ? true : false
                }
              >
                {uomItem.uom_Name}
              </option>
            );
          })}
        </select>
      </>
    );
  };
  const showTextTD = (optionData, showTextBox = false) => {
    let theText = "";
    let theCount = "";

    if (optionData.description != null) {
      optionData.description.text.forEach((textItem) => {
        if (textItem.language === "en" && textItem.value != null) {
          theText = textItem.value;
        } else {
          theCount = textItem.count;
        }
      });
    }

    if (
      optionData.editText &&
      !contextType.state.isReadOnly &&
      !props.location.state
    ) {
      return (
        <>
          &nbsp;
          <input
            style={{ width: "196px" }}
            name={"roomDefDefinition['" + fieldName + "'].text"}
            id={"roomDefDefinition['" + fieldName + "'].text"}
            defaultValue={"" || theText}
            maxLength={100}
            onKeyPress={(event) => Utils.KorSafeCharsOnly_onkeypress(event)}
            onChange={(e) => contextType.formChanged(e)}
          />
        </>
      );
    } else if (
      optionData.editText &&
      !contextType.state.isReadOnly &&
      showTextBox
    ) {
      return (
        <>
          &nbsp;
          <input
            style={{ width: "196px" }}
            name={"roomDefDefinition['" + fieldName + "'].text"}
            id={"roomDefDefinition['" + fieldName + "'].text"}
            defaultValue={"" || theText}
            maxLength={100}
            onKeyPress={(event) => Utils.KorSafeCharsOnly_onkeypress(event)}
            onChange={(e) => contextType.formChanged(e)}
          />
        </>
      );
    } else {
      return theText;
    }
  };

  const showTextTDnextLine = (optionData) => {
    let theText = "";
    let theCount = null;
    optionData.description.text.forEach((textItem) => {
      if (textItem.language === "en" && textItem.value != null) {
        theText = textItem.value;
      } else {
        theCount = textItem.count;
      }
    });
    if (theCount > 1) {
      return (
        <div>
          <span className="lblTrans"> Translation </span>
          <div>
            <div className="Field_Value" style={{ width: "300px" }}>
              {optionData.description.text.map((textItem) => {
                {
                  textItem.language === "en" && textItem.value != null && (
                    <>
                      <p style={{ color: "blue" }}>
                        {" "}
                        <i>{textItem.language}</i>
                      </p>
                      &nbsp; {textItem.value} <br />)
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>
      );
    }
  };
  const selectDropdownBrand = (optionData) => {
    const brand = optionData.brand;
    const brandListKey = brand.brandList;

    const brandList =
      contextType.state.roomTypeNameDataView.brandLists[brandListKey];
    return (
      <>
        <b>{brandList.brandType}:</b>
        <select
          className={styles.selectDropDown}
          name={"roomDefDefinition['" + fieldName + "'].brandCode"}
          id={"roomDefDefinition['" + fieldName + "'].brandCode"}
          onChange={(e) => contextType.formChanged(e)}
        >
          <option
            value="  "
            selected={brand.brandCode === "  " ? true : false}
          ></option>
          {brandList.brand.map((brandItem) => {
            return (
              <option
                key={brandItem.brandCode + "***" + brandItem.brandName}
                value={brandItem.brandCode + "***" + brandItem.brandName}
                selected={
                  brandItem.brandCode === brand.brandCode ? true : false
                }
              >
                {brandItem.brandName}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  const roomUpdate = () => {
    bypasscheck = false;
    contextType.state.formChg = "Y";

    const objFmt = document.getElementById(
      "roomDefDefinition['MRBE_0003'].formatCode"
    );
    if (objFmt != null) {
      if (objFmt.selectedIndex == 0) objFmt.selectedIndex = 1;
    }
    if (contextType.state.formChg == "N" && objFmt.selectedIndex != 1) {
      objFmt.selectedIndex = 1;
      alert("Please wait while the screen refreshes.");
      updateAPIcall2();
    } else if (contextType.state.formChg != "N") {
      alert("Please wait while the screen refreshes.");
      updateAPIcall2();
    }
  };
  const roomUpdateForN = () => {
    bypasscheck = false;

    contextType.state.formChg = "N";

    const objFmt = document.getElementById(
      "roomDefDefinition['MRBE_0003'].formatCode"
    );
    if (objFmt != null) {
      if (objFmt.selectedIndex == 0) objFmt.selectedIndex = 1;
    }
    if (contextType.state.formChg == "N" && objFmt.selectedIndex != 1) {
      objFmt.selectedIndex = 1;
      alert("Please wait while the screen refreshes.");
      updateAPIcall2();
    }
  };
  const showRest = (optionData) => {
    contextType.state.formChg = "Y";
    let fieldName;
    if (optionData.showRoomNumber) {
      fieldName =
        optionData.elementCodeList.replace(" ", "Z") +
        "_" +
        optionData.elementCode +
        "_" +
        optionData.roomNumber;
    } else {
      fieldName =
        optionData.elementCodeList.replace(" ", "Z") +
        "_" +
        optionData.elementCode;
    }
    let bUpdateRoom = false;
    const objAvail = document.getElementById(
      "roomDefDefinition['" + fieldName + "'].availabilityInd"
    );

    const objDiv = document.getElementById("div_" + fieldName);

    if (objAvail.value == "Y" || objAvail.value == "S") {
      if (objDiv) {
        objDiv.style.display = "block";
      }
      if (fieldName == "MRBE_0003") {
        objAvail.value == "Y" ? (contextType.state.formChg = "Y") : null;
        const objFmt = document.getElementById(
          "roomDefDefinition['" + fieldName + "'].formatCode"
        );
        if (typeof objFmt == "object") {
          if (objFmt.selectedIndex == 0) objFmt.selectedIndex = 1;
        }
      }
    } else {
      const id = "roomDefDefinition[" + "'" + fieldName + "'" + "].quantity";
      const objQty = document.getElementById(id);
      if (objQty != null) {
        objQty.value = 0;
      }
      const objFmt = document.getElementById(
        "roomDefDefinition['" + fieldName + "'].formatCode"
      );
      if (objFmt != null) {
        if (fieldName == "MRBE_0003") {
          if (objFmt.selectedIndex != 1) {
            objFmt.selectedIndex = 1;
            bUpdateRoom = true;
          }
        } else objFmt.selectedIndex = 0;
      }
      const objBrd = document.getElementById(
        "roomDefDefinition['" + fieldName + "'].brandCode"
      );
      if (objBrd != null) {
        objBrd.selectedIndex = 0;
      }
      const objUom = document.getElementById(
        "roomDefDefinition['" + fieldName + "'].UOM_Code"
      );
      if (objUom != null) {
        objUom.selectedIndex = 0;
      }
      if (fieldName == "MRBE_0003") {
        objAvail.value == "N" ? (contextType.state.formChg = "N") : null;

        roomUpdateForN();
      }
      objDiv.style.display = "none";
    }

    if (bUpdateRoom) roomUpdate();
    setBedTypeAlert("", event);
  };

  const finalCheck = (msg, event) => {
    mainMap = [];

    const bedsOK = new Array(1);
    const somebeds = new Array(1);
    let bOK;
    let elCode;
    let elCode2;
    bOK = true;
    let click_navigate;
    let otherBedsOK = false;
    if (!contextType.state.isReadOnly) {
      if (screenid == "3") {
        bedsOK[0] = "false";
        somebeds[0] = 0;
        otherBedsOK = false;
      }

      if (msg != "") {
        alert(msg);
        return false;
      }

      if (!bypasscheck && bOK) {
        let eleName;
        let eleName2;
        let availVal;
        let previous_cd;

        let columnList = [];
        const inputs = document.getElementById("thisForm").elements;

        for (let iField = 0; iField < inputs.length; iField++) {
          eleName = document.thisForm.elements[iField].name;

          elCode = eleName.split(".");

          elCode2 = eleName.split("'");

          if (previous_cd == null) {
            previous_cd = elCode2[1];
          }
          if (previous_cd != null && previous_cd != elCode2[1]) {
            const jsonPair = {};

            columnList = columnList.reduce(function (result, item) {
              const key = Object.keys(item)[0];
              result[key] = item[key];
              return result;
            }, {});
            jsonPair[previous_cd] = columnList;

            mainMap.push(jsonPair);

            columnList = [];
            previous_cd = elCode2[1];
          }

          const jsonPair = {};
          jsonPair[elCode[1]] = document.thisForm.elements[iField].value;
          columnList.push(jsonPair);

          if (eleName.search(".mustComplete") > 0) {
            if (document.thisForm.elements[iField].value == "true") {
              elCode = eleName.substring(5);

              const objAvail = document.getElementById(
                "roomDefDefinition['" + elCode[1] + "'].availabilityInd"
              );

              if (objAvail != null) availVal = objAvail.value;
              else availVal = "Y";

              if (availVal.trim() == "") {
                bOK = false;
                alert(
                  "Please pick a Yes/No  for " +
                    document.thisForm.elements[iField].id
                );
                return bOK;
              }
            }
          }
          if (screenid == "3" && !props.location.state) {
            if (eleName.length >= 44) {
              const thename = document.thisForm.elements[iField].name.substr(
                19,
                4
              );
              if (
                document.thisForm.elements[iField].name.substr(19, 9) ==
                  "RMAZ_0102" ||
                (document.thisForm.elements[iField].name.search("GRIZ_") > 0 &&
                  document.thisForm.elements[iField].name.search(
                    "availabilityInd"
                  ) > 0)
              ) {
                if (
                  document.thisForm.elements[iField].value == "Y" ||
                  document.thisForm.elements[iField].value == "S"
                ) {
                  let theRoom = document.thisForm.elements[iField].name.substr(
                    29,
                    1
                  );
                  const theBedType = document.thisForm.elements[
                    iField
                  ].name.substr(19, 9);
                  theRoom--;
                  if (theBedType == "RMAZ_0102" || theBedType == "GRIZ_9000") {
                    otherBedsOK = true;
                  }
                  if (bedsOK[theRoom] != "true" && somebeds[theRoom] < 2) {
                    if (document.thisForm.elements[iField].value == "Y")
                      somebeds[theRoom] = 2;
                    else if (document.thisForm.elements[iField].value == "S")
                      somebeds[theRoom]++;
                    if (somebeds[theRoom] >= 2) bedsOK[theRoom] = "true";
                  }
                }
              }
            }
          }
          if (!bOK) return bOK;
        }
        if (inputs.length > 0) {
          const jsonPair = {};
          columnList = columnList.reduce(function (result, item) {
            const key = Object.keys(item)[0];
            result[key] = item[key];
            return result;
          }, {});
          jsonPair[elCode2[1]] = columnList;

          mainMap.push(jsonPair);
        }
        if (screenid == "3" && !props.location.state) {
          let bedCount = 0;
          if (bOK) {
            for (let i = 0; i < 1; i++) {
              if (bedsOK[i] == "false") {
                // alert(
                //   "In bedroom " +
                //     (i + 1) +
                //     ", you must answer Yes to at least one bedtype or Some to at least two bedtypes"
                // );
                bOK = false;
                bedCount = i;
                break;
              }
            }
          }

          if (!bOK) {
            if (otherBedsOK == false) {
              alert(
                "In bedroom " +
                  (bedCount + 1) +
                  ", you must answer Yes to at least one bedtype or Some to at least two bedtypes"
              );
            } else if (otherBedsOK == true) {
              bOK = true;
            }
          }
        }
      }
      if (bOK) click_navigate = true;
      return bOK;
    } else {
      bOK = true;
      return bOK;
    }
  };

  const setBedTypeAlert = (msg, event) => {
    mainMap = [];

    const bedsOK = new Array(1);
    const somebeds = new Array(1);
    let bOK;
    let elCode;
    let elCode2;
    bOK = true;
    let click_navigate;
    let otherBedsOK = false;
    if (!contextType.state.isReadOnly) {
      if (screenid == "3") {
        bedsOK[0] = "false";
        somebeds[0] = 0;
        otherBedsOK = false;
      }

      if (msg != "") {
        alert(msg);
        return false;
      }

      if (!bypasscheck && bOK) {
        let eleName;
        let eleName2;
        let availVal;
        let previous_cd;

        let columnList = [];
        const inputs = document.getElementById("thisForm").elements;

        for (let iField = 0; iField < inputs.length; iField++) {
          eleName = document.thisForm.elements[iField].name;

          elCode = eleName.split(".");

          elCode2 = eleName.split("'");

          if (previous_cd == null) {
            previous_cd = elCode2[1];
          }
          if (previous_cd != null && previous_cd != elCode2[1]) {
            const jsonPair = {};

            columnList = columnList.reduce(function (result, item) {
              const key = Object.keys(item)[0];
              result[key] = item[key];
              return result;
            }, {});
            jsonPair[previous_cd] = columnList;

            mainMap.push(jsonPair);

            columnList = [];
            previous_cd = elCode2[1];
          }

          const jsonPair = {};
          jsonPair[elCode[1]] = document.thisForm.elements[iField].value;
          columnList.push(jsonPair);

          if (eleName.search(".mustComplete") > 0) {
            if (document.thisForm.elements[iField].value == "true") {
              elCode = eleName.substring(5);

              const objAvail = document.getElementById(
                "roomDefDefinition['" + elCode[1] + "'].availabilityInd"
              );

              if (objAvail != null) availVal = objAvail.value;
              else availVal = "Y";

              if (availVal.trim() == "") {
                bOK = false;
                alert(
                  "Please pick a Yes/No  for " +
                    document.thisForm.elements[iField].id
                );
                return bOK;
              }
            }
          }
          if (screenid == "3") {
            if (eleName.length >= 44) {
              const thename = document.thisForm.elements[iField].name.substr(
                19,
                4
              );
              if (
                document.thisForm.elements[iField].name.substr(19, 9) ==
                  "RMAZ_0102" ||
                (document.thisForm.elements[iField].name.search("GRIZ_") > 0 &&
                  document.thisForm.elements[iField].name.search(
                    "availabilityInd"
                  ) > 0)
              ) {
                if (
                  document.thisForm.elements[iField].value == "Y" ||
                  document.thisForm.elements[iField].value == "S"
                ) {
                  let theRoom = document.thisForm.elements[iField].name.substr(
                    29,
                    1
                  );
                  const theBedType = document.thisForm.elements[
                    iField
                  ].name.substr(19, 9);
                  theRoom--;
                  if (theBedType == "RMAZ_0102" || theBedType == "GRIZ_9000") {
                    otherBedsOK = true;
                  }
                  if (bedsOK[theRoom] != "true" && somebeds[theRoom] < 2) {
                    if (document.thisForm.elements[iField].value == "Y")
                      somebeds[theRoom] = 2;
                    else if (document.thisForm.elements[iField].value == "S")
                      somebeds[theRoom]++;
                    if (somebeds[theRoom] >= 2) bedsOK[theRoom] = "true";
                  }
                }
              }
            }
          }
          if (!bOK) return bOK;
        }
        if (inputs.length > 0) {
          const jsonPair = {};
          columnList = columnList.reduce(function (result, item) {
            const key = Object.keys(item)[0];
            result[key] = item[key];
            return result;
          }, {});
          jsonPair[elCode2[1]] = columnList;

          mainMap.push(jsonPair);
        }
        if (screenid == "3") {
          let bedCount = 0;
          if (bOK) {
            for (let i = 0; i < 1; i++) {
              if (bedsOK[i] == "false") {
                // alert(
                //   "In bedroom " +
                //     (i + 1) +
                //     ", you must answer Yes to at least one bedtype or Some to at least two bedtypes"
                // );
                bOK = false;
                bedCount = i;
                break;
              }
            }
          }

          if (!bOK) {
            if (otherBedsOK == false) {
              const alertMsg =
                Settings.alert.roomPoolViewAlert1 +
                (bedCount + 1) +
                Settings.alert.roomPoolViewAlert2;
              appContext.setErrorMessageAlert({
                show: true,
                message: alertMsg,
                type: "browserAlert",
              });
            } else if (otherBedsOK == true) {
              bOK = true;
              appContext.setErrorMessageAlert({
                show: false,
                message: "",
                type: "browserAlert",
              });
            }
          }
        }
      }
      if (bOK) click_navigate = true;
      return bOK;
    } else {
      bOK = true;
      return bOK;
    }
  };

  const selectDropdownFormat = (optionData) => {
    const format = optionData.format;
    const formatListKey = format.formatList;

    const formatList =
      contextType.state.roomTypeNameDataView.formatLists[formatListKey];

    if (fieldName == "MRBE_0003") {
      return (
        <>
          <b>{formatList.formatType}:</b>
          <select
            name={"roomDefDefinition['" + fieldName + "'].formatCode"}
            id={"roomDefDefinition['" + fieldName + "'].formatCode"}
            className={styles.selectDropDown}
            onChange={(e) => roomUpdate()}
          >
            <option
              value="  "
              selected={format.formatCode === "  " ? true : false}
            ></option>
            {formatList.format.map((formatItem) => {
              return (
                <>
                  <option
                    value={
                      formatItem.formatCode + "***" + formatItem.formatName
                    }
                    selected={
                      formatItem.formatCode === format.formatCode ? true : false
                    }
                  >
                    {formatItem.formatName}
                  </option>
                </>
              );
            })}
          </select>
        </>
      );
    } else {
      return (
        <>
          <b>{formatList.formatType}:</b>
          <select
            name={"roomDefDefinition['" + fieldName + "'].formatCode"}
            id={"roomDefDefinition['" + fieldName + "'].formatCode"}
            className={styles.selectDropDown}
            onChange={(e) => contextType.formChanged(e)}
          >
            <option
              value="  "
              selected={format.formatCode === "  " ? true : false}
            ></option>
            {formatList.format.map((formatItem) => {
              return (
                <>
                  <option
                    value={
                      formatItem.formatCode + "***" + formatItem.formatName
                    }
                    selected={
                      formatItem.formatCode === format.formatCode ? true : false
                    }
                  >
                    {formatItem.formatName}
                  </option>
                </>
              );
            })}
          </select>
        </>
      );
    }
  };
  const selectDropdown = (optionData) => {
    return (
      <select
        className={styles.selectDropDown}
        name={"roomDefDefinition['" + fieldName + "'].availabilityInd"}
        id={"roomDefDefinition['" + fieldName + "'].availabilityInd"}
        //value={optionData.availabilityInd}
        onChange={(e) => showRest(optionData)}
      >
        <option value=""></option>
        <option
          value="Y"
          selected={optionData.availabilityInd === "Y" ? true : false}
        >
          Yes
        </option>
        {optionData.dropDownType == "YS" && (
          <option
            value="S"
            selected={optionData.availabilityInd === "S" ? true : false}
          >
            Some
          </option>
        )}
        <option
          value="N"
          selected={optionData.availabilityInd === "N" ? true : false}
        >
          No
        </option>
      </select>
    );
  };

  const getAmenities = (addOnAmenityInd) => {
    if (foundAmenities && addOnAmenityInd == "false") {
      foundAmenities = false;
      return (
        <>
          <tr>
            <td>&nbsp;</td>{" "}
          </tr>
          <tr>
            <td
              colSpan={6}
              style={{
                height: "13.33px",
                backgroundColor: "#eff0ec",
                fontSize: "11px",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
              className="InstructionHeader"
            >
              Other Amenities
            </td>
          </tr>
        </>
      );
    } else if (!foundAmenities && addOnAmenityInd == "true") {
      foundAmenities = true;

      return (
        <>
          <tr>
            <td>&nbsp;</td>{" "}
          </tr>
          <tr>
            <td
              colSpan={6}
              style={{
                height: "13.33px",
                backgroundColor: "#eff0ec",
                fontSize: "11px",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
              className="InstructionHeader"
            >
              Add On Amenities{" "}
            </td>
          </tr>
        </>
      );
    } else {
      return "";
    }
  };

  const getRoomNumber = (showRoomNumber) => {
    prevRoomNumber = 0;
    if (!foundRooms && showRoomNumber) {
      foundRooms = true;
      return (
        <>
          <tr>
            <td>&nbsp; </td>{" "}
          </tr>
          <tr>
            <td
              colSpan={6}
              style={{
                height: "13.33px",
                backgroundColor: "#eff0ec",
                fontSize: "11px",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
              className="InstructionHeader"
            >
              {" "}
              Bed Types
            </td>
          </tr>
        </>
      );
    } else if (foundRooms && !showRoomNumber) {
      foundRooms = false;
      return (
        <>
          <tr>
            <td>&nbsp;</td>{" "}
          </tr>
          <tr>
            <td
              colSpan={6}
              style={{
                height: "13.33px",
                backgroundColor: "#eff0ec",
                fontSize: "11px",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
              className="InstructionHeader"
            >
              Other Bed Types
            </td>
          </tr>
        </>
      );
    } else {
      return "";
    }
  };

  const getCurrentRoomTd = () => {
    return (
      <>
        {" "}
        <tr>
          <td style={{ height: "15px" }}>&nbsp;</td>{" "}
        </tr>
      </>
    );
  };

  const getCurrentRoom = (optionData) => {
    const currentRoomNum = optionData.roomNumber;
    if (currentRoomNum != prevRoomNumber) {
      prevRoomNumber = currentRoomNum;

      // if (currentRoomNum != "1") {
      //   return (
      //     <>
      //       <tr>
      //         <td style={{ width: "10px", height: "30px" }}>test&nbsp;</td>
      //       </tr>
      //     </>
      //   );
      // }
      return (
        <>
          <tr>
            {" "}
            <td></td>
            <td
              colSpan={5}
              className="fieldName"
              id={currentRoomNum}
              style={{
                borderBottom: "darkblue 1px ridge",
                valign: "left",
                fontWeight: "bold",
                fontFamily: "Arial",
                fontSize: 11,
              }}
            >
              Bedroom {currentRoomNum}
            </td>
          </tr>
        </>
      );
    }
  };

  const handleOnClickProgram = async (e) => {
    if (finalCheck("", e)) {
      if (props.location.state) {
        sessionStorage.setItem("screenid", e);
      }
      const params = {
        roomPool: roomPool,
        newInd: contextType?.state?.newInd,
        marshaCode: marshaCode,
        hotelName: hotelName,
        screenid: e,
        rateProgram: props.location.rateProgram,
      };
      updateProgramAPIcall();
      setIsMakingRequest(true);
      API.getRateProgramView(params).then((data) => {
        setIsMakingRequest(false);
        contextType.setState({
          ...contextType.state,
          isRoomPoolDetails: true,
        });
        contextType.getRateProgramNameData(data, roomPool);
      });
    }
  };
  const handleOnClick = async (e) => {
    if (finalCheck("", e)) {
      const prm =
        Settings.queryParam.marshaCode +
        contextType.state.inputmarshacode +
        Settings.queryParam.roomPool +
        contextType.state.roomPool +
        Settings.queryParam.hotelName +
        contextType.state.hotelName +
        Settings.queryParam.screenId +
        e;
      updateAPIcall(prm);
    }
  };

  const handleOnNextPrevious = async (e) => {
    if (props.location.state) {
      handleOnClickProgram(e);
    } else {
      handleOnClick(e);
    }
  };

  const handleFinishAndSave = async (e) => {
    if (finalCheck("", e)) {
      const prm =
        Settings.queryParam.marshaCode +
        contextType.state.inputmarshacode +
        Settings.queryParam.roomPool +
        contextType.state.roomPool +
        Settings.queryParam.hotelName +
        contextType.state.hotelName +
        Settings.queryParam.screenId +
        e;
      updateAPIcall(null);
      API.getFinishRoomPoolView(prm).then((data) => {
        history.push({
          pathname: Settings.routingUrl.finishProductPath,
          search: prm,
        });
      });
    }
  };

  return (
    <SelectHotelContext.Consumer>
      {(roomPoolContext) => {
        contextType = roomPoolContext;
        return (
          <div>
            {props.location.state ? (
              <TabViewPanel
                moduleName="RoomDescription"
                componentName="viewRateProgram"
                conditional="on"
                programName={
                  props.location.rateProgram
                    ? props.location.rateProgram
                    : sessionStorage.getItem("rateProgram")
                }
                poolName={roomPool}
                screenList={contextType.state.roomDefMenu}
                onNavigation={handleOnClick}
                onNavigationProgram={handleOnClickProgram}
                onFinishAndSave={handleFinishAndSave}
              ></TabViewPanel>
            ) : (
              <TabViewPanel
                moduleName="RoomDescription"
                componentName="selectHotelComponent"
                conditional="on"
                poolName={roomPool}
                screenList={contextType.state.roomDefMenu}
                onNavigation={handleOnClick}
                onFinishAndSave={handleFinishAndSave}
                onNavigationProgram={handleOnClickProgram}
                finalCheck={finalCheck}
              ></TabViewPanel>
            )}

            <div className={styles.tableBody2}>
              <span className={styles.tableBody1}>
                {" "}
                {marshaCode} - {hotelName}:{" "}
              </span>
              <span
                className={
                  props.location.state ? styles.hiddenLabel : styles.tableBody1
                }
              >
                {" "}
                {Settings.label.HotelRoomPoolOverview}
              </span>
              <span
                className={
                  props.location.state ? styles.tableBody1 : styles.hiddenLabel
                }
              >
                {" "}
                {Settings.label.HotelRateProgramOverview}
              </span>
              <span className={styles.tableBody1}> {roomPool} - </span>
              <span
                className={
                  props.location.state ? styles.tableBody1 : styles.hiddenLabel
                }
              >
                {paramsupdate.rateProgram} -
              </span>{" "}
              <span className={styles.tableBody1}>
                {contextType?.state?.productDescription[0]?.elementTypeName}
              </span>
            </div>
            <div className={styles.tableBody}>
              {history.location.pathname.match(
                Settings.routingUrl.defineRoomName
              ) ? (
                <div className={styles.leftDiv}>
                  {contextType.state.roomTypeNameDataView
                    ?.previousMenuOption && (
                    <img
                      onClick={(e) =>
                        handleOnNextPrevious(
                          contextType.state.roomTypeNameDataView
                            ?.previousMenuOption
                        )
                      }
                      src={btnPrevious}
                    ></img>
                  )}{" "}
                  {"  "}
                  {contextType.state.roomTypeNameDataView?.nextMenuOption && (
                    <img
                      onClick={(e) =>
                        handleOnNextPrevious(
                          contextType.state.roomTypeNameDataView?.nextMenuOption
                        )
                      }
                      src={btnNext}
                    ></img>
                  )}
                </div>
              ) : (
                <div className={styles.leftDiv}>
                  {contextType.state.roomTypeNameDataView
                    ?.previousMenuOption && (
                    <img
                      onClick={(e) =>
                        handleOnNextPrevious(
                          contextType.state.roomTypeNameDataView
                            ?.previousMenuOption
                        )
                      }
                      src={btnPrevious}
                    ></img>
                  )}{" "}
                  {"  "}
                  {contextType.state.roomTypeNameDataView?.nextMenuOption && (
                    <img
                      onClick={(e) =>
                        handleOnNextPrevious(
                          contextType.state.roomTypeNameDataView?.nextMenuOption
                        )
                      }
                      src={btnNext}
                    ></img>
                  )}
                </div>
              )}
              <div className={styles.horizontalLine}></div>
              {isMakingRequest && (
                <div className={styles.loaderImg}>
                  <CLoader />
                </div>
              )}
              <form
                id="thisForm"
                name="thisForm"
                method="post"
                autoComplete="off"
              >
                <table className={styles.viewTableHeight}>
                  <tbody>
                    <tr className={styles.viewTableRow}>
                      <td className={styles.viewTableColumn}>
                        <table className={styles.innerViewTable}>
                          <tbody>
                            <tr>
                              <td
                                colSpan={6}
                                className={styles.innerViewInstructionHeader}
                                align="left"
                              >
                                <span
                                  className={
                                    props.location.state
                                      ? styles.hiddenLabel
                                      : ""
                                  }
                                  style={{
                                    fontSize: "11px",
                                    fontStyle: "italic",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {Settings.label.PropertyName}
                                </span>{" "}
                                <span
                                  className={
                                    props.location.state
                                      ? ""
                                      : styles.hiddenLabel
                                  }
                                >
                                  {roomPool}
                                </span>{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table
                                  style={{ width: "100%", marginLeft: "-2px" }}
                                  className="zero-Height"
                                >
                                  <tbody>
                                    {contextType.state.productOptions.length >
                                      0 &&
                                      contextType.state.productOptions.map(
                                        (productOptions, i) => {
                                          return (
                                            <>
                                              {productOptions.elementGroupName !=
                                                null &&
                                                productOptions.elementGroupName !=
                                                  "" &&
                                                productOptions.elementGroupName.trim() !=
                                                  "" && (
                                                  <>
                                                    <tr>
                                                      <td
                                                        colSpan={6}
                                                        style={{
                                                          lineHeight: "11px",
                                                          backgroundColor:
                                                            "#eff0ec",
                                                          fontSize: "11px",
                                                          fontStyle: "italic",
                                                          fontWeight: "bold",
                                                        }}
                                                        className="InstructionHeader"
                                                      >
                                                        {
                                                          productOptions.elementGroupName
                                                        }
                                                      </td>
                                                      <td></td>
                                                    </tr>
                                                  </>
                                                )}

                                              {productOptions.productDescription.map(
                                                (productDescription, i) => {
                                                  return (
                                                    <>
                                                      {props.location.state &&
                                                        !foundAmenities &&
                                                        productDescription.addOnAmenityInd ==
                                                          "true" &&
                                                        screenid == 3 &&
                                                        getAmenities(
                                                          productDescription.addOnAmenityInd
                                                        )}
                                                      {props.location.state &&
                                                        foundAmenities &&
                                                        productDescription.addOnAmenityInd ==
                                                          "false" &&
                                                        screenid == 3 &&
                                                        getAmenities(
                                                          productDescription.addOnAmenityInd
                                                        )}
                                                      {props.location.state &&
                                                        !foundRooms &&
                                                        productDescription.showRoomNumber &&
                                                        getRoomNumber(
                                                          productDescription.showRoomNumber
                                                        )}
                                                      {props.location.state &&
                                                        foundRooms &&
                                                        !productDescription.showRoomNumber &&
                                                        getRoomNumber(
                                                          productDescription.showRoomNumber
                                                        )}
                                                      {props.location.state &&
                                                        foundRooms &&
                                                        getCurrentRoom(
                                                          productDescription
                                                        )}
                                                      <tr>
                                                        <td
                                                          style={{
                                                            width: "10 px",
                                                            height: 30,
                                                          }}
                                                        >
                                                          &nbsp;
                                                        </td>
                                                        <td
                                                          style={{
                                                            width: 30,
                                                            height: 30,
                                                            fontWeight: 250,
                                                          }}
                                                          align="left"
                                                        >
                                                          {productDescription.showAvailability
                                                            ? productDescription.longAvailabilityInd
                                                            : props.location
                                                                .state
                                                            ? productDescription.showQuantity ==
                                                                true &&
                                                              productDescription.unitOfMeasure ==
                                                                null &&
                                                              productDescription.quantity
                                                            : (productDescription.marshaOriginatedInd ==
                                                                "false" ||
                                                                productDescription.marshaOriginatedInd ==
                                                                  false) &&
                                                              productDescription.showQuantity ==
                                                                true &&
                                                              productDescription.unitOfMeasure ==
                                                                null &&
                                                              productDescription.quantity}
                                                        </td>
                                                        <td
                                                          style={{
                                                            width: "10 px",
                                                            height: 30,
                                                          }}
                                                        >
                                                          &nbsp;
                                                        </td>
                                                        <td
                                                          className="fieldName"
                                                          style={{
                                                            height: 30,
                                                            fontWeight: "bold",
                                                            fontFamily: "Arial",
                                                            fontSize: 11,
                                                          }}
                                                          title={
                                                            productDescription.marshaOriginatedInd ==
                                                            "false"
                                                              ? Settings.title
                                                              : ""
                                                          }
                                                        >
                                                          {
                                                            productDescription.elementCodeName
                                                          }
                                                        </td>
                                                        <td>
                                                          {(productDescription.marshaOriginatedInd ==
                                                            false ||
                                                            productDescription.marshaOriginatedInd ==
                                                              "false" ||
                                                            props.location
                                                              .state) &&
                                                            productDescription.availabilityInd !==
                                                              "N" && (
                                                              <table className="menuWdth100-Height">
                                                                <tr>
                                                                  <td
                                                                    className={
                                                                      styles.fontNormal
                                                                    }
                                                                  >
                                                                    {productDescription.showQuantity &&
                                                                    (productDescription.showAvailability ||
                                                                      productDescription.unitOfMeasure !=
                                                                        null) &&
                                                                    productDescription.elementCodeList?.trim() !=
                                                                      "GRI"
                                                                      ? productDescription?.quantity?.toString()
                                                                      : null}
                                                                  </td>
                                                                  <td
                                                                    className={
                                                                      styles.fontNormal
                                                                    }
                                                                  >
                                                                    {productDescription.unitOfMeasure !==
                                                                      null &&
                                                                    productDescription
                                                                      .unitOfMeasure
                                                                      .uom_Name !==
                                                                      null ? (
                                                                      <>
                                                                        {
                                                                          productDescription
                                                                            .unitOfMeasure
                                                                            .uom_Name
                                                                        }
                                                                      </>
                                                                    ) : null}
                                                                  </td>
                                                                  <td
                                                                    className={`${styles.fontNormal} ${styles.pl10}`}
                                                                  >
                                                                    {productDescription.format !=
                                                                      null &&
                                                                    productDescription
                                                                      .format
                                                                      .formatName !=
                                                                      null ? (
                                                                      <>
                                                                        <b>
                                                                          {
                                                                            productDescription
                                                                              .format
                                                                              .formatType
                                                                          }{" "}
                                                                          :
                                                                        </b>
                                                                        {
                                                                          productDescription
                                                                            .format
                                                                            .formatName
                                                                        }
                                                                      </>
                                                                    ) : null}
                                                                  </td>
                                                                  <td
                                                                    className={
                                                                      styles.fontNormal
                                                                    }
                                                                  >
                                                                    {productDescription.brand !=
                                                                      null &&
                                                                    productDescription
                                                                      .brand
                                                                      .brandName !=
                                                                      null ? (
                                                                      <>
                                                                        <b>
                                                                          {
                                                                            productDescription
                                                                              .brand
                                                                              .brandType
                                                                          }{" "}
                                                                          :
                                                                        </b>
                                                                        {
                                                                          productDescription
                                                                            .brand
                                                                            .brandName
                                                                        }
                                                                      </>
                                                                    ) : null}
                                                                  </td>
                                                                  <td
                                                                    className={
                                                                      styles.fontNormal
                                                                    }
                                                                  >
                                                                    {productDescription.description !==
                                                                      null &&
                                                                    productDescription
                                                                      .description
                                                                      .text !==
                                                                      null ? (
                                                                      <>
                                                                        {showTextTD(
                                                                          productDescription
                                                                        )}
                                                                      </>
                                                                    ) : null}
                                                                  </td>
                                                                </tr>
                                                              </table>
                                                            )}
                                                        </td>
                                                      </tr>
                                                    </>
                                                  );
                                                }
                                              )}
                                            </>
                                          );
                                        }
                                      )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td valign="top">
                        <table className={styles.rightViewTable}>
                          <tbody>
                            <tr>
                              <td className={styles.innerViewInstructionHeader}>
                                <span
                                  className={
                                    props.location.state
                                      ? styles.hiddenLabel
                                      : ""
                                  }
                                  style={{
                                    fontSize: "11px",
                                    fontStyle: "italic",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {roomPool}
                                </span>{" "}
                                <span
                                  className={
                                    props.location.state
                                      ? ""
                                      : styles.hiddenLabel
                                  }
                                >
                                  {props.location.rateProgram
                                    ? props.location.rateProgram
                                    : sessionStorage.getItem("rateProgram")}
                                </span>{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table
                                  className="zero-Height"
                                  style={{ width: "100%", marginLeft: "-2px" }}
                                >
                                  <tbody>
                                    {contextType.state.productDescription
                                      .length > 0 &&
                                      contextType.state.productDescription.map(
                                        (productOptions, i) => {
                                          return (
                                            <>
                                              {productOptions.elementGroupName !=
                                                null &&
                                                productOptions.elementGroupName !=
                                                  "" &&
                                                productOptions.elementGroupName.trim() !=
                                                  "" && (
                                                  <>
                                                    <tr>
                                                      <td
                                                        colSpan={6}
                                                        style={{
                                                          lineHeight: "11px",
                                                          backgroundColor:
                                                            "#eff0ec",
                                                          fontSize: "11px",
                                                          fontStyle: "italic",
                                                          fontWeight: "bold",
                                                        }}
                                                        className="InstructionHeader"
                                                      >
                                                        {
                                                          productOptions.elementGroupName
                                                        }
                                                      </td>
                                                      <td></td>
                                                    </tr>
                                                  </>
                                                )}

                                              {productOptions.productDescription.map(
                                                (productDescription, i) => {
                                                  if (
                                                    productDescription.showRoomNumber
                                                  ) {
                                                    fieldName =
                                                      productDescription.elementCodeList.replace(
                                                        " ",
                                                        "Z"
                                                      ) +
                                                      "_" +
                                                      productDescription.elementCode +
                                                      "_" +
                                                      productDescription.roomNumber;
                                                  } else {
                                                    fieldName =
                                                      productDescription.elementCodeList.replace(
                                                        " ",
                                                        "Z"
                                                      ) +
                                                      "_" +
                                                      productDescription.elementCode;
                                                  }

                                                  if (
                                                    productDescription.supplementaryData !=
                                                    null
                                                  ) {
                                                    productDescription.supplementaryData.forEach(
                                                      (k) => {
                                                        if (
                                                          k.path ==
                                                          "../@AvailabilityInd"
                                                        ) {
                                                          showStatus = true;
                                                        }
                                                        if (
                                                          k.path ==
                                                          "../Text/text()"
                                                        ) {
                                                          showText = true;
                                                        }
                                                        if (
                                                          k.path ==
                                                          "../@Quantity"
                                                        ) {
                                                          showQuantity = true;
                                                        }
                                                      }
                                                    );
                                                  }
                                                  return (
                                                    <>
                                                      {!foundAmenities &&
                                                        productDescription.addOnAmenityInd ==
                                                          "true" &&
                                                        screenid == 3 &&
                                                        getAmenities(
                                                          productDescription.addOnAmenityInd
                                                        )}
                                                      {foundAmenities &&
                                                        productDescription.addOnAmenityInd ==
                                                          "false" &&
                                                        screenid == 3 &&
                                                        getAmenities(
                                                          productDescription.addOnAmenityInd
                                                        )}
                                                      {!foundRooms &&
                                                        productDescription.showRoomNumber &&
                                                        getRoomNumber(
                                                          productDescription.showRoomNumber
                                                        )}
                                                      {foundRooms &&
                                                        !productDescription.showRoomNumber &&
                                                        getRoomNumber(
                                                          productDescription.showRoomNumber
                                                        )}
                                                      {foundRooms &&
                                                        getCurrentRoom(
                                                          productDescription
                                                        )}
                                                      <tr>
                                                        <td
                                                          style={{
                                                            width: "10 px",
                                                            height: 30,
                                                          }}
                                                        >
                                                          &nbsp;
                                                        </td>
                                                        {productDescription.show && (
                                                          <>
                                                            <td
                                                              style={{
                                                                width: 20,
                                                                height: 30,
                                                              }}
                                                            >
                                                              {productDescription.syncAlert && (
                                                                <img
                                                                  src={revisit}
                                                                />
                                                              )}
                                                            </td>

                                                            <td
                                                              style={{
                                                                width: 30,
                                                                height: 30,
                                                                fontWeight: 250,
                                                              }}
                                                              align="left"
                                                            >
                                                              {productDescription.showAvailability ? (
                                                                <>
                                                                  {productDescription.show ==
                                                                    false &&
                                                                    null}
                                                                  {contextType
                                                                    .state
                                                                    .isReadOnly ||
                                                                  productDescription.dropDownType ==
                                                                    null ||
                                                                  productDescription.dropDownType ==
                                                                    "" ? (
                                                                    <>
                                                                      {productDescription.availabilityInd ==
                                                                        "N" &&
                                                                      productDescription.calloutInd !=
                                                                        null &&
                                                                      productDescription.calloutInd ==
                                                                        "N"
                                                                        ? null
                                                                        : productDescription.longAvailabilityInd}
                                                                    </>
                                                                  ) : (
                                                                    selectDropdown(
                                                                      productDescription
                                                                    )
                                                                  )}
                                                                </>
                                                              ) : (
                                                                <>
                                                                  {productDescription.showQuantity &&
                                                                  productDescription.unitOfMeasure ==
                                                                    null ? (
                                                                    <>
                                                                      {productDescription.editQuantity &&
                                                                      contextType
                                                                        .state
                                                                        .isReadOnly ==
                                                                        false ? (
                                                                        <input
                                                                          title={
                                                                            Settings.textTitle
                                                                          }
                                                                          name={
                                                                            "roomDefDefinition['" +
                                                                            fieldName +
                                                                            "'].quantity"
                                                                          }
                                                                          id={
                                                                            "roomDefDefinition['" +
                                                                            fieldName +
                                                                            "'].quantity"
                                                                          }
                                                                          className={
                                                                            styles.width30
                                                                          }
                                                                          defaultValue={
                                                                            productDescription.quantity
                                                                          }
                                                                          onKeyPress={
                                                                            Utils.NumberOnly_onkeypress
                                                                          }
                                                                          onChange={(
                                                                            e
                                                                          ) =>
                                                                            contextType.formChanged(
                                                                              e
                                                                            )
                                                                          }
                                                                        />
                                                                      ) : (
                                                                        productDescription.quantity
                                                                      )}
                                                                    </>
                                                                  ) : null}
                                                                </>
                                                              )}
                                                            </td>
                                                            <td
                                                              style={{
                                                                width: "10 px",
                                                                height: 30,
                                                              }}
                                                            >
                                                              &nbsp;
                                                            </td>
                                                            <td
                                                              align="left"
                                                              style={{
                                                                height: 30,
                                                                fontWeight:
                                                                  "bold",
                                                                fontFamily:
                                                                  "Arial",
                                                                fontSize: 11,
                                                              }}
                                                              title={
                                                                productDescription.marshaOriginatedInd ==
                                                                "false"
                                                                  ? Settings.title
                                                                  : ""
                                                              }
                                                              className="fieldName"
                                                            >
                                                              {
                                                                productDescription.elementCodeName
                                                              }
                                                              <input
                                                                type="hidden"
                                                                id={
                                                                  "roomDefDefinition['" +
                                                                  fieldName +
                                                                  "'].mustComplete"
                                                                }
                                                                name={
                                                                  "roomDefDefinition['" +
                                                                  fieldName +
                                                                  "'].mustComplete"
                                                                }
                                                                value={
                                                                  productDescription.mustComplete
                                                                }
                                                              />
                                                              {productDescription.showRoomNumber && (
                                                                <input
                                                                  type="hidden"
                                                                  id={
                                                                    "roomDefDefinition['" +
                                                                    fieldName +
                                                                    "'].roomNumber"
                                                                  }
                                                                  name={
                                                                    "roomDefDefinition['" +
                                                                    fieldName +
                                                                    "'].roomNumber"
                                                                  }
                                                                  value={
                                                                    productDescription.roomNumber
                                                                  }
                                                                />
                                                              )}
                                                              {productDescription.availabilityInd ==
                                                                "N" &&
                                                                productDescription.calloutInd !=
                                                                  null &&
                                                                productDescription.calloutInd ==
                                                                  "N" && (
                                                                  <>
                                                                    &nbsp; is
                                                                    not
                                                                    available
                                                                  </>
                                                                )}
                                                            </td>
                                                            <td>
                                                              {productDescription.showAvailability &&
                                                              productDescription.availabilityInd ==
                                                                "N" ? (
                                                                creatHiddenDiv(
                                                                  productDescription
                                                                )
                                                              ) : (
                                                                <div
                                                                  style={{
                                                                    display:
                                                                      "block",
                                                                  }}
                                                                  id={
                                                                    "div_" +
                                                                    fieldName
                                                                  }
                                                                >
                                                                  <table className="menuWdith100-Height">
                                                                    <tr>
                                                                      <td
                                                                        className={
                                                                          styles.fontNormal
                                                                        }
                                                                      >
                                                                        {productDescription.showQuantity &&
                                                                        (productDescription.showAvailability ||
                                                                          productDescription.unitOfMeasure !=
                                                                            null) ? (
                                                                          <>
                                                                            {productDescription.editQuantity &&
                                                                            contextType
                                                                              .state
                                                                              .isReadOnly !=
                                                                              true ? (
                                                                              <>
                                                                                <input
                                                                                  title={
                                                                                    Settings.textTitle
                                                                                  }
                                                                                  name={
                                                                                    "roomDefDefinition['" +
                                                                                    fieldName +
                                                                                    "'].quantity"
                                                                                  }
                                                                                  id={
                                                                                    "roomDefDefinition['" +
                                                                                    fieldName +
                                                                                    "'].quantity"
                                                                                  }
                                                                                  className={
                                                                                    styles.width30
                                                                                  }
                                                                                  defaultValue={
                                                                                    productDescription.quantity
                                                                                  }
                                                                                  onKeyPress={
                                                                                    Utils.NumberOnly_onkeypress
                                                                                  }
                                                                                  onChange={(
                                                                                    e
                                                                                  ) =>
                                                                                    contextType.formChanged(
                                                                                      e
                                                                                    )
                                                                                  }
                                                                                />
                                                                              </>
                                                                            ) : (
                                                                              productDescription.quantity
                                                                            )}
                                                                          </>
                                                                        ) : null}
                                                                      </td>
                                                                      <td
                                                                        className={
                                                                          styles.fontNormal
                                                                        }
                                                                      >
                                                                        {productDescription.unitOfMeasure !=
                                                                          null && (
                                                                          <>
                                                                            {productDescription.editUOM &&
                                                                            !contextType
                                                                              .state
                                                                              .isReadOnly &&
                                                                            !props
                                                                              .location
                                                                              .state ? (
                                                                              selectDropdownUOM(
                                                                                productDescription
                                                                              )
                                                                            ) : (
                                                                              <>
                                                                                {productDescription.unitOfMeasure !=
                                                                                  null &&
                                                                                  productDescription
                                                                                    .unitOfMeasure
                                                                                    .uom_Name !=
                                                                                    null && (
                                                                                    <>
                                                                                      {
                                                                                        productDescription
                                                                                          .unitOfMeasure
                                                                                          .uom_Name
                                                                                      }
                                                                                    </>
                                                                                  )}
                                                                              </>
                                                                            )}
                                                                          </>
                                                                        )}
                                                                      </td>
                                                                      <td
                                                                        className={`${styles.fontNormal} ${styles.pl10}`}
                                                                      >
                                                                        {productDescription.format !=
                                                                          null && (
                                                                          <>
                                                                            {productDescription.editFormat &&
                                                                            !contextType
                                                                              .state
                                                                              .isReadOnly &&
                                                                            !props
                                                                              .location
                                                                              .state ? (
                                                                              selectDropdownFormat(
                                                                                productDescription
                                                                              )
                                                                            ) : (
                                                                              <>
                                                                                {productDescription.format !=
                                                                                  null &&
                                                                                  productDescription
                                                                                    .format
                                                                                    .formatName !=
                                                                                    null && (
                                                                                    <>
                                                                                      <b>
                                                                                        {
                                                                                          productDescription
                                                                                            .format
                                                                                            .formatType
                                                                                        }

                                                                                        :
                                                                                      </b>
                                                                                      {
                                                                                        productDescription
                                                                                          .format
                                                                                          .formatName
                                                                                      }
                                                                                    </>
                                                                                  )}
                                                                              </>
                                                                            )}
                                                                          </>
                                                                        )}
                                                                      </td>
                                                                      <td
                                                                        className={
                                                                          styles.fontNormal
                                                                        }
                                                                      >
                                                                        {productDescription.brand !=
                                                                          null && (
                                                                          <>
                                                                            {productDescription.editBrand &&
                                                                            !contextType
                                                                              .state
                                                                              .isReadOnly &&
                                                                            !props
                                                                              .location
                                                                              .state ? (
                                                                              selectDropdownBrand(
                                                                                productDescription
                                                                              )
                                                                            ) : (
                                                                              <>
                                                                                {productDescription.brand !=
                                                                                  null &&
                                                                                  productDescription
                                                                                    .brand
                                                                                    .brandName !=
                                                                                    null && (
                                                                                    <>
                                                                                      <b>
                                                                                        {
                                                                                          productDescription
                                                                                            .brand
                                                                                            .brandType
                                                                                        }

                                                                                        :
                                                                                      </b>
                                                                                      {
                                                                                        productDescription
                                                                                          .brand
                                                                                          .brandName
                                                                                      }
                                                                                    </>
                                                                                  )}
                                                                              </>
                                                                            )}
                                                                          </>
                                                                        )}
                                                                      </td>
                                                                      <td
                                                                        className={
                                                                          styles.fontNormal
                                                                        }
                                                                      >
                                                                        {productDescription.showText && (
                                                                          <>
                                                                            {showTextTD(
                                                                              productDescription,
                                                                              true
                                                                            )}
                                                                          </>
                                                                        )}
                                                                      </td>
                                                                    </tr>
                                                                  </table>
                                                                </div>
                                                              )}
                                                            </td>
                                                          </>
                                                        )}
                                                      </tr>
                                                    </>
                                                  );
                                                }
                                              )}
                                            </>
                                          );
                                        }
                                      )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        );
      }}
    </SelectHotelContext.Consumer>
  );
};

export default RoomPoolView;
