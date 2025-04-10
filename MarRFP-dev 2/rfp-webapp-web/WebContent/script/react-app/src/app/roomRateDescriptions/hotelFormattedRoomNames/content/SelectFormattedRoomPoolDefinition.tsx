import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./SelectFormattedRoomPoolDefinition.css";
import API from "../service/API";
import SelectHotelContext from "../context/SelectHotelContext";
import { Layout } from "../routing/Layout";
import Settings from "../static/Settings";

let contextType = null;
let showStatus = false;
let showText = false;
let showQuantity = false;
let roomPool;
let screenid;
let marshaCode;
let hotelName;

const validateText = (e) => {
  const regex = new RegExp(/[%+_`~|*]/g);
  if (regex.test(e.target.value)) {
    return false;
  } else {
    return true;
  }
};

const SelectFormatedRoomPoolDefinition = (): JSX.Element => {
  const history = useHistory();
  const urlParms = useLocation().search;
  roomPool = new URLSearchParams(urlParms).get(Settings.queryId.roomPool);
  screenid = new URLSearchParams(urlParms).get(Settings.queryId.screenid);
  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);

  useEffect(() => {
    let query = null;
    roomPool = roomPool ? roomPool : history.location.data;
    contextType.setStateParams(roomPool, marshaCode, hotelName);
    query =
      marshaCode &&
      hotelName &&
      roomPool &&
      Settings.queryParam.marshaCode +
        marshaCode +
        Settings.queryParam.roomPool +
        roomPool +
        Settings.queryParam.hotelName +
        hotelName;
    if (screenid && screenid != "") {
      query += Settings.queryParam.screenId + screenid;
    }

    API.getRoomNameDefine(query).then((data) => {
      contextType.setState({
        ...contextType.state,
        formChg: "N",
        isRoomPoolDetails: true,
      });
      contextType.getRoomNameData(data, roomPool);
    });
  }, [roomPool, screenid]);

  useEffect(() => {
    return () => {
      const isValid = contextType.checkMinOccurs();
      if (isValid) {
        contextType.saveRoomPoolDefinition();
      }
    };
  }, []);

  const getSelectedTypeLists = (roomTypeNameDefinitionData) => {
    return (
      <table>
        <tbody>
          {showStatus == true &&
            roomTypeNameDefinitionData.availabilityInd === "Y" && (
              <tr>
                <td>
                  {roomTypeNameDefinitionData.unitOfMeasure != null &&
                    roomTypeNameDefinitionData.unitOfMeasure.uom_List !=
                      null && (
                      <td
                        className={
                          (styles.selectOption, styles.fieldNoOfBedroomsTd)
                        }
                      >
                        <b>
                          {
                            contextType.state.uomLists[
                              roomTypeNameDefinitionData.unitOfMeasure.uom_List
                            ].uom_Type
                          }
                          :
                        </b>
                        {!contextType.state.readOnly ? (
                          <select
                            className={styles.selectDropDown}
                            onChange={(e) =>
                              contextType.changeUnitOfMeasure(
                                roomTypeNameDefinitionData.rtnd_Code,
                                e,
                                contextType.state.uomLists[
                                  roomTypeNameDefinitionData.unitOfMeasure
                                    .uom_List
                                ]
                              )
                            }
                          >
                            <option value={0}></option>
                            {contextType.state.uomLists &&
                              contextType.state.uomLists[
                                roomTypeNameDefinitionData.unitOfMeasure
                                  .uom_List
                              ]["unitOfMeasure"].map((n, i) => (
                                <option
                                  key={i}
                                  value={n.uom_Code}
                                  selected={
                                    n.uom_Code ==
                                    roomTypeNameDefinitionData.unitOfMeasure
                                      .uom_Code
                                      ? true
                                      : false
                                  }
                                >
                                  {n.uom_Name}
                                </option>
                              ))}
                          </select>
                        ) : (
                          <span className={styles.spanTd}>
                            {contextType.state.uomLists &&
                              contextType.state.uomLists[
                                roomTypeNameDefinitionData.unitOfMeasure
                                  .uom_List
                              ]["unitOfMeasure"].filter(
                                (uom) =>
                                  uom.uom_Code ==
                                  roomTypeNameDefinitionData.unitOfMeasure
                                    .uom_Code
                              )[0]?.uom_Name}
                          </span>
                        )}
                      </td>
                    )}
                </td>
                {roomTypeNameDefinitionData.type != null &&
                  roomTypeNameDefinitionData.type.typeListCode != null && (
                    <td
                      className={
                        (styles.selectOption, styles.fieldTd, styles.typeList)
                      }
                    >
                      {showStatus == true &&
                        roomTypeNameDefinitionData.availabilityInd === "Y" && (
                          <b>
                            {roomTypeNameDefinitionData.type &&
                              roomTypeNameDefinitionData.type.typeListCode !=
                                null &&
                              contextType.state.typeLists[
                                roomTypeNameDefinitionData.type.typeListCode
                              ].typeListName}
                            :
                          </b>
                        )}
                      {!contextType.state.readOnly ? (
                        <select
                          className={styles.selectDropDown}
                          onChange={(e) =>
                            contextType.changeTypeList(
                              roomTypeNameDefinitionData.rtnd_Code,
                              e
                            )
                          }
                        >
                          <option value="" />
                          {contextType.state.typeLists[
                            roomTypeNameDefinitionData.type.typeListCode
                          ].type != null &&
                            contextType.state.typeLists[
                              roomTypeNameDefinitionData.type.typeListCode
                            ].type.map((m, i) => (
                              <option
                                key={i}
                                value={m.typeCode}
                                selected={
                                  m.typeCode ==
                                  roomTypeNameDefinitionData.type.typeCode
                                    ? true
                                    : false
                                }
                              >
                                {m.typeName}
                              </option>
                            ))}
                        </select>
                      ) : (
                        <span className={styles.spanTd}>
                          {contextType.state.typeLists[
                            roomTypeNameDefinitionData.type.typeListCode
                          ].type.length > 0 &&
                            contextType.state.typeLists[
                              roomTypeNameDefinitionData.type.typeListCode
                            ].type.filter(
                              (t) =>
                                t.typeCode ==
                                roomTypeNameDefinitionData.type.typeCode
                            ).length > 0 &&
                            contextType.state.typeLists[
                              roomTypeNameDefinitionData.type.typeListCode
                            ].type.filter(
                              (t) =>
                                t.typeCode ==
                                roomTypeNameDefinitionData.type.typeCode
                            )[0].typeName}
                        </span>
                      )}
                    </td>
                  )}
              </tr>
            )}
          {showText == true &&
            roomTypeNameDefinitionData.description != null &&
            roomTypeNameDefinitionData.availabilityInd === "Y" && (
              <tr>
                <td>
                  {contextType.state.readOnly == false &&
                  !contextType.state.readOnly ? (
                    <input
                      className={styles.inputDescription}
                      value={
                        (roomTypeNameDefinitionData.description &&
                          roomTypeNameDefinitionData.description.text &&
                          roomTypeNameDefinitionData.description.text[0]
                            .value) ||
                        undefined
                      }
                      maxLength={
                        roomTypeNameDefinitionData.description &&
                        roomTypeNameDefinitionData.description.text &&
                        roomTypeNameDefinitionData.description.text[0].maxLength
                      }
                      onChange={(e) => {
                        if (validateText(e)) {
                          contextType.changeDescription(
                            roomTypeNameDefinitionData.rtnd_Code,
                            e
                          );
                        } else {
                          e.target.value = "";
                        }
                      }}
                    />
                  ) : (
                    roomTypeNameDefinitionData.description.text[0].value
                  )}
                </td>
              </tr>
            )}
        </tbody>
      </table>
    );
  };

  const selectDropdown = (optionData) => {
    return (
      <select
        className={styles.selectDropDown}
        value={optionData.availabilityInd}
        onChange={(e) => contextType.handleDropChange(optionData.rtnd_Code, e)}
      >
        <option value=""></option>
        <option
          value="Y"
          selected={optionData.availabilityInd === "Y" ? true : false}
        >
          Yes
        </option>
        <option
          value="N"
          selected={optionData.availabilityInd === "N" ? true : false}
        >
          No
        </option>
      </select>
    );
  };

  return (
    <Layout>
      <SelectHotelContext.Consumer>
        {(roomPoolContext) => {
          contextType = roomPoolContext;
          return (
            <div className={styles.roomPoolDefBodyContainer}>
              <form>
                <table className={styles.fullheight}>
                  <tbody>
                    {contextType.state.showHotelInstructions && (
                      <tr className={styles.verticalAlign}>
                        {contextType.state.RTND_ListCode &&
                          contextType.state.RTND_ListCode ==
                            Settings.screenId.RoomName && (
                            <td className={styles.instructions}>
                              {Settings.optionalFieldStmt} <br />
                              <br />
                              <span className={styles.colorRed}>
                                {Settings.doNotRepeatStmt}
                                <br />
                                {Settings.doNotEnterSubjective}
                              </span>
                            </td>
                          )}
                        {contextType.state.RTND_ListCode &&
                          contextType.state.RTND_ListCode ==
                            Settings.screenId.ServiceType && (
                            <td className={styles.instructions}>
                              {Settings.serviceTypeMsg.conciergeLevel}
                              <br />
                              {Settings.serviceTypeMsg.nonConciergeLevel}
                            </td>
                          )}
                        {contextType.state.RTND_ListCode &&
                          contextType.state.RTND_ListCode ==
                            Settings.screenId.LandmarkView && (
                            <td className={styles.instructions}>
                              {Settings.landMarkMsg.landmarkInput}
                            </td>
                          )}
                      </tr>
                    )}
                    <tr>
                      <td className={styles.height5}></td>
                    </tr>
                    <tr>
                      <td className={styles.tablerTD}>
                        <table className={styles.field_Value}>
                          {contextType.state.roomTypeNameDefinitionGroup
                            .length > 0 &&
                            contextType.state.roomTypeNameDefinitionGroup.map(
                              (i) => {
                                return i.roomTypeNameDefinition.map(
                                  (roomTypeNameDefinitionData, i) => {
                                    if (
                                      roomTypeNameDefinitionData.supplementaryData !=
                                      null
                                    ) {
                                      roomTypeNameDefinitionData.supplementaryData.forEach(
                                        (k) => {
                                          if (k.path == "../@AvailabilityInd") {
                                            showStatus = true;
                                          }
                                          if (k.path == "../Text/text()") {
                                            showText = true;
                                          }
                                          if (k.path == "../@Quantity") {
                                            showQuantity = true;
                                          }
                                        }
                                      );
                                    }
                                    return (
                                      <tr
                                        key={i}
                                        className={styles.verticalAlignMiddle}
                                      >
                                        <td>
                                          {showStatus == false &&
                                            roomTypeNameDefinitionData.unitOfMeasure ==
                                              null &&
                                            showQuantity == true &&
                                            (contextType.state.readOnly ==
                                            false ? (
                                              <input
                                                className={styles.width30}
                                                value={
                                                  roomTypeNameDefinitionData.quantity
                                                }
                                                onChange={(e) =>
                                                  contextType.changequantity(
                                                    roomTypeNameDefinitionData.rtnd_Code,
                                                    e
                                                  )
                                                }
                                              />
                                            ) : (
                                              roomTypeNameDefinitionData.quantity
                                            ))}
                                        </td>

                                        <td className={styles.selectDropDownTD}>
                                          {showStatus == true &&
                                          contextType.state.readOnly
                                            ? roomTypeNameDefinitionData.availabilityInd ==
                                              "Y"
                                              ? "Yes"
                                              : roomTypeNameDefinitionData.availabilityInd ==
                                                "N"
                                              ? "No"
                                              : roomTypeNameDefinitionData.availabilityInd
                                            : selectDropdown(
                                                roomTypeNameDefinitionData
                                              )}
                                        </td>
                                        {showStatus == true && (
                                          <td className={styles.fieldTd}>
                                            {
                                              roomTypeNameDefinitionData.rtnd_CodeName
                                            }
                                          </td>
                                        )}
                                        <td>
                                          {getSelectedTypeLists(
                                            roomTypeNameDefinitionData
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  }
                                );
                              }
                            )}
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          );
        }}
      </SelectHotelContext.Consumer>
    </Layout>
  );
};

export default SelectFormatedRoomPoolDefinition;
