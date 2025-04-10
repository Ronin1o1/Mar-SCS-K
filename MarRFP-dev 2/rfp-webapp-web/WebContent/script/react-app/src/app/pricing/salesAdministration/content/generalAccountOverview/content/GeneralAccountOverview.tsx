import React, { useEffect, useState, useContext } from "react";
import CModal from "../../../../../common/components/CModal";
import styles from "./GeneralAccountOverview.css";
import Settings from "../static/Settings";
import { useLocation } from "react-router-dom";
import GeneralAccountOverviewContext, {
  GeneralAccountOverviewContextProvider,
} from "../context/GenralAccountOverviewContext";
import GeneralAccountOverviewApi from "../service/GeneralAccountOverviewAPI";
import Utils from "../../../../../common/utils/Utils";
import { isObject } from "lodash";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
import { Layout } from "../../../routing/Layout";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";

let contextType = null;

const GeneralAccountOverview = (): JSX.Element => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [isClickHereOpen, setIsClickHereOpen] = useState(false);
  const [lastUpdateDateValue, setlastUpdateDateValue] = useState("");
  const [lastUpdateDateValueonUpdate, setlastUpdateDateValueonUpdate] =
    useState("");

  const urlParms = useLocation().search;
  const queryParams = new URLSearchParams(urlParms);
  const RecID = queryParams.get("accountrecid");
  const yearSel = queryParams.get("year");
  const accname = new URLSearchParams(urlParms).get("accountName");

  useEffect(() => {
    contextType.setLoader(true);
    contextType.getUserDetails();
    GeneralAccountOverviewApi.getAccountOverview({
      year: yearSel,
      accountrecid: RecID,
    })
      .then((data) => {
        let contactObj;
        contactObj = data.teamLeader;
        if (data.userRef.length > 0) {
          data.userRef.unshift({ name: null, eid: null });
          if (contactObj !== null) {
            for (let i = 0; i < data.userRef.length; i++) {
              if (data.userRef[i].name === contactObj.name) {
                contactObj.name =
                  data.userRef[i].name + "%" + data.userRef[i].eid;
                break;
              } else {
                if (data.userRef.length === i + 1) {
                  contactObj.eid = "";
                  contactObj.name = "";
                }
              }
            }
          }
        } else {
          data.userRef = [];
          data.userRef.unshift({ name: "", eid: null });
        }
        let contactObj2;
        contactObj2 = data.teamLeader2;
        if (data.userRef.length > 0) {
          // data.userRef.unshift({ name: null, eid: null });
          if (contactObj2 !== null) {
            for (let i = 0; i < data.userRef.length; i++) {
              if (data.userRef[i].name === contactObj2.name) {
                contactObj2.name =
                  data.userRef[i].name + "%" + data.userRef[i].eid;
                break;
              } else {
                if (data.userRef.length === i + 1) {
                  contactObj2.eid = "";
                  contactObj2.name = "";
                }
              }
            }
          }
        } else {
          data.userRef = [];
          data.userRef.unshift({ name: "", eid: null });
        }
        contextType.setAccountOverviewData(data);
        setlastUpdateDateValue(data.lastupdatedate);
        contextType.setLoader(false);
        contextType.validation("navigation", data);
      })
      .catch((error) => {
        contextType.setLoader(false);
      });
    return () => {
      UpdateGeneralOverviewData();
    };
  }, []);

  useEffect(() => {
    if (appContext.navbarClicked) {
      contextType.setShowValidationMOdal(false);
    }
  }, [appContext.navbarClicked]);

  const changestate = (e, contactType) => {
    const updateList = contextType.accountOverviewData;
    if (isObject(updateList.contactType)) {
      if (e.target.value) {
        updateList.hdq.state = e.target.value;
      }
    } else {
      updateList[contactType].state = e.target.value;
    }
    if (contactType == "hdq") {
      if (updateList?.hdq?.state != "") {
        updateList.hdq.country = "US";
      }
    }

    if (contactType == "hdqadr") {
      if (updateList?.hdqadr?.state != "") {
        updateList.hdqadr.country = "US";
      }
    }

    contextType.setData(updateList);
  };

  const changecountry = (e, contactType) => {
    let confFlag = false;
    const updateList = contextType.accountOverviewData;
    if (isObject(updateList.contactType)) {
      if (e.target.value) {
        updateList.hdq.country = e.target.value;
      }
    } else {
      updateList[contactType].country = e.target.value;
    }
    if (contactType == "hdq") {
      if (updateList?.hdq?.country != "US") {
        confFlag = false;
        if (updateList?.hdq?.state != "" && updateList?.hdq?.state != null) {
          confFlag = confirm(Settings.message.CountryChange);
        } else {
          contextType.setData(updateList);
        }

        if (confFlag) {
          updateList.hdq.state = "";
        } else {
          if (updateList.hdq.state != null && updateList.hdq.state != "") {
            updateList.hdq.country = "US";
          }
        }
      }
    }

    if (contactType == "hdqadr") {
      if (updateList?.hdqadr?.country != "US") {
        confFlag = false;
        if (
          updateList?.hdqadr?.state != "" &&
          updateList?.hdqadr?.state != null
        ) {
          confFlag = confirm(Settings.message.CountryChange);
        }
        if (confFlag) {
          updateList.hdqadr.state = "";
        } else {
          if (updateList.hdq.state != null && updateList.hdq.state != "") {
            updateList.hdq.country = "US";
          }
        }
      }
    }
    contextType.setData(updateList);
  };

  const handleInputValidation = (e, field, index = 0) => {
    const splitAccessor = field.split(".");
    const updateList = contextType.accountOverviewData;
    const re = Settings.commonContent.numberRegex;
    const re_phone_number = Settings.commonContent.re_phone_number;
    if (splitAccessor.length == 2) {
      if (index != 0) {
        if (splitAccessor[1] === "rev") {
          if (e.target.value === "" || re.test(e.target.value)) {
            const revNumber = e.target.value === "" ? null : e.target.value;
            updateList[splitAccessor[0]][index][splitAccessor[1]] = revNumber;
          } else {
            if (
              contextType?.accountOverviewData[splitAccessor[0]][index][
                splitAccessor[1]
              ] === null
            ) {
              updateList[splitAccessor[0]][index][splitAccessor[1]] = "";
            } else {
              updateList[splitAccessor[0]][index][splitAccessor[1]] =
                contextType?.accountOverviewData[splitAccessor[0]][index][
                  splitAccessor[1]
                ];
            }
          }
        } else {
          updateList[splitAccessor[0]][index][splitAccessor[1]] =
            e.target.value;
        }
      } else {
        if (updateList[splitAccessor[0]] === null) {
          updateList[splitAccessor[0]] = {};
        }
        if (
          splitAccessor[1] == "formattedMarSpendRev" ||
          splitAccessor[1] === "glb_employee" ||
          splitAccessor[1] === "num_glb_traveler" ||
          splitAccessor[1] === "num_assn_members" ||
          splitAccessor[1] === "rev" ||
          splitAccessor[1] === "rev_conv_mtgs" ||
          splitAccessor[1] === "annual_trvl_expense" ||
          splitAccessor[1] === "formattedMarRoomRev" ||
          splitAccessor[1] === "formattedHotelSpendRev"
        ) {
          if (e.target.value === "" || re.test(e.target.value)) {
            updateList[splitAccessor[0]][splitAccessor[1]] = e.target.value;
          } else {
            if (
              contextType?.accountOverviewData[splitAccessor[0]][
                splitAccessor[1]
              ] === null
            ) {
              updateList[splitAccessor[0]][splitAccessor[1]] = "";
            } else {
              updateList[splitAccessor[0]][splitAccessor[1]] =
                contextType?.accountOverviewData[splitAccessor[0]][
                  splitAccessor[1]
                ];
            }
          }
        } else if (splitAccessor[1] === "phone") {
          if (e.target.value === "" || re_phone_number.test(e.target.value)) {
            updateList[splitAccessor[0]][splitAccessor[1]] =
              e.target.value === "" ? null : e.target.value;
          } else {
            updateList[splitAccessor[0]][splitAccessor[1]] =
              updateList[splitAccessor[0]][splitAccessor[1]];
          }
        } else {
          updateList[splitAccessor[0]][splitAccessor[1]] = e.target.value;
        }
      }
    }
    contextType.setData(updateList);
  };
  const percent_onchange = (field, fieldname, index) => {
    handleInputValidation(field, fieldname, index);
  };
  const handlePercentBlur = (e, field, index) => {
    const splitAccessor = field.split(".");
    const updateList = contextType.accountOverviewData;
    const indexInc = index + 1;

    const obj = updateList[splitAccessor[0]];

    if (obj[indexInc].share_percent < 0 || obj[indexInc].share_percent > 100) {
      contextType.setValidationMessage(Settings.validation.AlertMessage);
      contextType.setShowValidationMOdal(true);
    }
  };

  const handlePctCompetitorMap = (e, field, index) => {
    const splitAccessor = field.split(".");
    const updateList = contextType.accountOverviewData;
    const indexInc = index + 1;
    const keyName = splitAccessor[1];
    const obj = updateList[splitAccessor[0]];
    const re = Settings.commonContent.numberRegex;
    if (!obj[indexInc]) {
      obj[indexInc] = {
        suppliername: null,
        share_percent: null,
        seqid: indexInc,
      };
      if (keyName === "suppliername") {
        obj[indexInc].suppliername = e.target.value;
      } else if (keyName === "share_percent") {
        if (e.target.value === "" || re.test(e.target.value)) {
          const perNumber =
            e.target.value === "" ? null : parseInt(e.target.value);
          obj[indexInc].share_percent = perNumber;
        } else {
          obj[indexInc].share_percent =
            contextType?.accountOverviewData?.pctCompetitorMap[indexInc]
              ?.share_percent === null
              ? ""
              : contextType?.accountOverviewData?.pctCompetitorMap[indexInc]
                  ?.share_percent;
        }
      }
    } else {
      if (keyName === "suppliername") {
        obj[indexInc].suppliername = e.target.value;
      } else if (keyName === "share_percent") {
        if (e.target.value === "" || re.test(e.target.value)) {
          const perNumber =
            e.target.value === "" ? null : parseInt(e.target.value);
          obj[indexInc].share_percent = perNumber;
        } else {
          obj[indexInc].share_percent =
            contextType?.accountOverviewData?.pctCompetitorMap[indexInc]
              ?.share_percent === null
              ? ""
              : contextType?.accountOverviewData?.pctCompetitorMap[indexInc]
                  ?.share_percent;
        }
      }
    }
    contextType.setData({ ...updateList });
  };
  const UpdateGeneralOverviewData = () => {
    return contextType.updateValue(RecID, yearSel, accname);
  };
  const nextBtnClickGAO = () => {
    if (contextType.validation("update", contextType.accountOverviewData)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Layout
      IsDataUpdate={UpdateGeneralOverviewData}
      getlastUpdateDate={lastUpdateDateValue}
      onUpdateValue={lastUpdateDateValueonUpdate}
      nextBtnClick={() => nextBtnClickGAO()}
    >
      <GeneralAccountOverviewContextProvider>
        <GeneralAccountOverviewContext.Consumer>
          {(accountContext) => {
            contextType = accountContext;
            return (
              <div className={styles.accountoverview}>
                {/*// Page Content //*/}
                {contextType.state.showScreenLoader ? (
                  <img
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "45%",
                    }}
                    src={screenLoader}
                  />
                ) : (
                  <table className={styles.mainTableContainer}>
                    <tbody>
                      <tr>
                        <td valign="top">
                          <div
                            id="overlayscreen"
                            className={styles.OverlayScreenGeneral}
                          >
                            <div className={styles.overlayDiv}>
                              <img src={screenLoader} />
                            </div>
                          </div>
                          <form
                            name="thisForm"
                            id="thisForm"
                            method="post"
                            autoComplete="off"
                          >
                            <table className="full-height" style={{borderCollapse: "collapse"}}>
                              <tbody>
                                <tr>
                                  <td style={{ verticalAlign: "top" }}>
                                    <table style={{ width: "800px" }}>
                                      <tbody>
                                        <tr>
                                          <td
                                            colSpan={2}
                                            className={styles.nowrapCell}
                                          >
                                            <i>
                                              <font color="Red">
                                                <b>
                                                  {
                                                    Settings
                                                      .generalAccountOverviewDetails
                                                      .RequiredField
                                                  }
                                                </b>
                                              </font>
                                            </i>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={styles.Field_Value}
                                            colSpan={2}
                                          >
                                            <b>
                                              {
                                                Settings
                                                  .generalAccountOverviewDetails
                                                  .AccountSegment
                                              }{" "}
                                            </b>
                                            {
                                              contextType.accountOverviewData
                                                ?.accountOverview
                                                ?.accounttypedescription
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan={2}>&nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={
                                              styles.InstructionHeader +
                                              " " +
                                              styles.nowrapCell
                                            }
                                          >
                                            {
                                              Settings
                                                .generalAccountOverviewDetails
                                                .AccountHdqInfo
                                            }
                                          </td>
                                          <td>&nbsp;</td>
                                          <td
                                            className={styles.InstructionHeader}
                                            style={{
                                              textAlign: "left",
                                              verticalAlign: "middle",
                                            }}
                                            title={
                                              Settings
                                                .generalAccountOverviewDetails
                                                .AccountLeaderTooltip
                                            }
                                          >
                                            <br />
                                            {
                                              Settings
                                                .generalAccountOverviewDetails
                                                .AcountLeader
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              textAlign: "left",
                                              verticalAlign: "top",
                                            }}
                                          >
                                            <table
                                              className={
                                                styles.menuWdth100Height
                                              }
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.instructions +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <a href="javascript:void(0);"
                                                      onClick={() =>
                                                        setIsClickHereOpen(true)
                                                      }
                                                      title="View HDQ Info"
                                                    >
                                                      <b>
                                                        <i>
                                                          {
                                                            Settings
                                                              .generalAccountOverviewDetails
                                                              .ClickHere
                                                          }{" "}
                                                        </i>
                                                      </b>{" "}
                                                    </a>
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .MoreInfo
                                                    }
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    colSpan={2}
                                                    className={
                                                      styles.InstructionHeader +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                    title={
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .AccountAddressToolTip
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .AccountAddress
                                                    }
                                                    &nbsp;&nbsp;&nbsp;
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                    width={180}
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .Address
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdq.address"
                                                      id="hdq.address"
                                                      style={{
                                                        height: "18px",
                                                        width: "355px",
                                                      }}
                                                      maxLength={255}
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdq?.address
                                                      }
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdq.address"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .City
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdq.city"
                                                      id="hdq.city"
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdq?.city
                                                      }
                                                      size={20}
                                                      maxLength={40}
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdq.city"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .State
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <select
                                                      name="hdq.state"
                                                      id="hdq.state"
                                                      size={1}
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdq?.state
                                                      }
                                                      onChange={(e) =>
                                                        changestate(e, "hdq")
                                                      }
                                                    >
                                                      <option value=""></option>
                                                      {contextType.accountOverviewData !==
                                                        null &&
                                                        contextType.accountOverviewData?.stateRef.map(
                                                          (state) => {
                                                            return (
                                                              <option
                                                                key={
                                                                  state.state
                                                                }
                                                                value={
                                                                  state.state
                                                                }
                                                              >
                                                                {
                                                                  state.statename
                                                                }
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                    </select>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .Province
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdq.province"
                                                      id="hdq.province"
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdq?.province
                                                      }
                                                      style={{
                                                        height: "18px",
                                                        width: "300px",
                                                      }}
                                                      maxLength={40}
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdq.province"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .Country_Region
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <select
                                                      name="hdq.country"
                                                      id="hdq.country"
                                                      size={1}
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdq?.country
                                                      }
                                                      onChange={(e) =>
                                                        changecountry(e, "hdq")
                                                      }
                                                    >
                                                      <option value=""></option>
                                                      {contextType.accountOverviewData !==
                                                        null &&
                                                        contextType.accountOverviewData?.countryRef?.map(
                                                          (country) => {
                                                            return (
                                                              <option
                                                                key={
                                                                  country.country
                                                                }
                                                                value={
                                                                  country.country
                                                                }
                                                              >
                                                                {
                                                                  country.countryname
                                                                }
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                    </select>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .ZIP_Postal
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdq.zip"
                                                      id="hdq.zip"
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdq?.zip
                                                      }
                                                      size={15}
                                                      maxLength={20}
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdq.zip"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .Phone
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdq.phone"
                                                      id="hdq.phone"
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdq?.phone === null
                                                          ? ""
                                                          : contextType
                                                              .accountOverviewData
                                                              ?.hdq?.phone
                                                      }
                                                      size={15}
                                                      maxLength={25}
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdq.phone"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table
                                              className={
                                                styles.menuWdth100Height
                                              }
                                            >
                                              <tbody>
                                                <tr>
                                                  <td>&nbsp;</td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    colSpan={2}
                                                    className={
                                                      styles.InstructionHeader +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                    title={
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .AccountMailingAddTooltip
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .AccountMailingAddress
                                                    }
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                    width={180}
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .Address
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdqadr.address"
                                                      id="hdqadr.address"
                                                      style={{
                                                        height: "18px",
                                                        width: "355px",
                                                      }}
                                                      maxLength={255}
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdqadr?.address
                                                      }
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdqadr.address"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                    width={174}
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .City
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdqadr.city"
                                                      size={20}
                                                      maxLength={40}
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdqadr?.city
                                                      }
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdqadr.city"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .State
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <select
                                                      name="hdqadr.state"
                                                      id="hdqadr.state"
                                                      size={1}
                                                      onChange={(e) =>
                                                        changestate(e, "hdqadr")
                                                      }
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdqadr?.state
                                                      }
                                                    >
                                                      <option value=""></option>

                                                      {contextType.accountOverviewData !==
                                                        null &&
                                                        contextType.accountOverviewData?.stateRef.map(
                                                          (state) => {
                                                            return (
                                                              <option
                                                                key={
                                                                  state.state
                                                                }
                                                                value={
                                                                  state.state
                                                                }
                                                              >
                                                                {
                                                                  state.statename
                                                                }
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                    </select>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name
                                                    }
                                                    width={174}
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .Province
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdqadr.province"
                                                      style={{
                                                        height: "18px",
                                                        width: "300px",
                                                      }}
                                                      maxLength={40}
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdqadr?.province
                                                      }
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdqadr.province"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .Country_Region
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <select
                                                      name="hdqadr.country"
                                                      id="hdqadr.country"
                                                      size={1}
                                                      onChange={(e) =>
                                                        changecountry(
                                                          e,
                                                          "hdqadr"
                                                        )
                                                      }
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdqadr?.country
                                                      }
                                                    >
                                                      <option value=""></option>
                                                      {contextType.accountOverviewData !==
                                                        null &&
                                                        contextType.accountOverviewData?.countryRef?.map(
                                                          (country) => {
                                                            return (
                                                              <option
                                                                key={
                                                                  country.country
                                                                }
                                                                value={
                                                                  country.country
                                                                }
                                                              >
                                                                {
                                                                  country.countryname
                                                                }
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                    </select>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                    style={{ width: "174px" }}
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .ZIP_Postal
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdqadr.zip"
                                                      id="hdqadr.zip"
                                                      size={15}
                                                      maxLength={20}
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdqadr?.zip
                                                      }
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdqadr.zip"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={
                                                      styles.field_Name +
                                                      " " +
                                                      styles.nowrapCell
                                                    }
                                                    style={{ width: 174 }}
                                                  >
                                                    {
                                                      Settings
                                                        .generalAccountOverviewDetails
                                                        .Phone
                                                    }
                                                  </td>
                                                  <td
                                                    className={
                                                      styles.nowrapCell
                                                    }
                                                  >
                                                    <input
                                                      type="text"
                                                      name="hdqadr.phone"
                                                      size={15}
                                                      maxLength={25}
                                                      value={
                                                        contextType
                                                          .accountOverviewData
                                                          ?.hdqadr?.phone ===
                                                        null
                                                          ? ""
                                                          : contextType
                                                              .accountOverviewData
                                                              ?.hdqadr?.phone
                                                      }
                                                      onChange={(e) => {
                                                        handleInputValidation(
                                                          e,
                                                          "hdqadr.phone"
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <p
                                              className={styles.tableParagraph}
                                            >
                                              <table
                                                className={styles.zeroHeight}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      colSpan={2}
                                                      className={
                                                        styles.InstructionHeader +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AccountInformation
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{ width: "174px" }}
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .ChairmanExecutive
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.chairman_ceo"
                                                        id="accountOverview.chairman_ceo"
                                                        size={20}
                                                        maxLength={99}
                                                        value={
                                                          contextType
                                                            .accountOverviewData
                                                            ?.accountOverview
                                                            ?.chairman_ceo
                                                        }
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.chairman_ceo"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{ width: "30%" }}
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AccountAcronymTooltip
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AccountAcronym
                                                      }{" "}
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.accountacronym"
                                                        id="accountOverview.accountacronym"
                                                        value={
                                                          contextType
                                                            .accountOverviewData
                                                            ?.accountOverview
                                                            ?.accountacronym
                                                        }
                                                        size={20}
                                                        maxLength={19}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.accountacronym"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{
                                                        width: "30%",
                                                        height: "23px",
                                                      }}
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AccountWebsiteURLTooltip
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AccountWebsiteURL
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.url"
                                                        id="accountOverview.url"
                                                        value={
                                                          contextType
                                                            .accountOverviewData
                                                            ?.accountOverview
                                                            ?.url
                                                        }
                                                        style={{
                                                          height: "18px",
                                                          width: "300px",
                                                        }}
                                                        maxLength={100}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.url"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AccountNYCSymbolTooltip
                                                      }
                                                      width="30%"
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AccountNYCSymbol
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.nyse_symbol"
                                                        id="accountOverview.nyse_symbol"
                                                        value={
                                                          contextType
                                                            .accountOverviewData
                                                            ?.accountOverview
                                                            ?.nyse_symbol
                                                        }
                                                        size={20}
                                                        maxLength={9}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.nyse_symbol"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{
                                                        width: "30%",
                                                        height: "22px",
                                                      }}
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .ClaritasID
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      {
                                                        contextType
                                                          .accountOverviewData
                                                          ?.accountOverview
                                                          ?.ultimatebusinessid
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{ width: "30%" }}
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AssociationTypeTooltip
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AssociationType
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <select
                                                        name="accountOverview.association_type"
                                                        id="accountOverview.association_type"
                                                        size={1}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.association_type"
                                                          );
                                                        }}
                                                        value={
                                                          contextType
                                                            .accountOverviewData
                                                            ?.accountOverview
                                                            ?.association_type
                                                        }
                                                      >
                                                        <option value=""></option>
                                                        {contextType.accountOverviewData?.assnRef?.map(
                                                          (list) => {
                                                            return (
                                                              <option
                                                                key={
                                                                  list.listId
                                                                }
                                                                value={
                                                                  list.listId
                                                                }
                                                                selected={
                                                                  contextType
                                                                    .accountOverviewData
                                                                    ?.accountOverview
                                                                    ?.association_type
                                                                }
                                                              >
                                                                {list.listName}
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                      </select>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>&nbsp;</td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </p>
                                          </td>
                                          <td>&nbsp;</td>
                                          <td width={440} valign="top">
                                            <p
                                              className={styles.tableParagraph}
                                            >
                                              <table
                                                className={
                                                  styles.menuWdth100Height
                                                }
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td width={60} nowrap>
                                                      <font color="red">
                                                        <b>
                                                          {
                                                            Settings
                                                              .generalAccountOverviewDetails
                                                              .Name
                                                          }
                                                        </b>
                                                      </font>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <select
                                                        name="teamLeader.name"
                                                        id="teamLeader.name"
                                                        size={1}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "teamLeader.name"
                                                          );
                                                        }}
                                                        onBlur={() =>
                                                          contextType.mandatoryCheck()
                                                        }
                                                      >
                                                        {contextType?.accountOverviewData?.userRef?.map(
                                                          (user, index) => {
                                                            return (
                                                              <option
                                                                key={index}
                                                                value={`${user.name}%${user.eid}`}
                                                                selected={
                                                                  `${user.name}%${user.eid}` ==
                                                                  contextType
                                                                    ?.accountOverviewData
                                                                    ?.teamLeader
                                                                    ?.name
                                                                    ? true
                                                                    : false
                                                                }
                                                              >
                                                                {user.name}
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                      </select>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <font color="red">
                                                        <b>
                                                          {
                                                            Settings
                                                              .generalAccountOverviewDetails
                                                              .Title
                                                          }{" "}
                                                        </b>
                                                      </font>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="teamLeader.title"
                                                        id="teamLeader.title"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.teamLeader?.title
                                                        }
                                                        style={{
                                                          height: "18px",
                                                          width: "300px",
                                                        }}
                                                        maxLength={40}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "teamLeader.title"
                                                          );
                                                        }}
                                                        onBlur={() =>
                                                          contextType.mandatoryCheck()
                                                        }
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <font color="red">
                                                        <b>
                                                          {
                                                            Settings
                                                              .generalAccountOverviewDetails
                                                              .Phone
                                                          }
                                                        </b>
                                                      </font>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="teamLeader.phone"
                                                        id="teamLeader.phone"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.teamLeader
                                                            ?.phone === null
                                                            ? ""
                                                            : contextType
                                                                ?.accountOverviewData
                                                                ?.teamLeader
                                                                ?.phone
                                                        }
                                                        size={15}
                                                        maxLength={25}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "teamLeader.phone"
                                                          );
                                                        }}
                                                        onBlur={() =>
                                                          contextType.mandatoryCheck()
                                                        }
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <font color="red">
                                                        <b>
                                                          {
                                                            Settings
                                                              .generalAccountOverviewDetails
                                                              .Email
                                                          }{" "}
                                                        </b>
                                                      </font>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="teamLeader.email"
                                                        id="teamLeader.email"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.teamLeader?.email
                                                        }
                                                        style={{
                                                          height: "18px",
                                                          width: "300px",
                                                        }}
                                                        maxLength={255}
                                                        onBlur={(e) => {
                                                          contextType.checkEmail(
                                                            e.target.value
                                                          );
                                                          contextType.mandatoryCheck();
                                                        }}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "teamLeader.email"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </p>
                                            <p
                                              className={styles.tableParagraph}
                                            >
                                              <table
                                                className={
                                                  styles.menuWdth100Height
                                                }
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.InstructionHeader
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .SharedAccountLeaderToolTip
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .SharedAccountLeader
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table
                                                className={
                                                  styles.menuWdth100Height
                                                }
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                      width={60}
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .Name
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <select
                                                        name="teamLeader2.name"
                                                        id="teamLeader2.name"
                                                        size={1}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "teamLeader2.name"
                                                          );
                                                        }}
                                                      >
                                                        {contextType?.accountOverviewData?.userRef?.map(
                                                          (user, index) => {
                                                            return (
                                                              <option
                                                                key={index}
                                                                value={`${user.name}%${user.eid}`}
                                                                selected={
                                                                  `${user.name}%${user.eid}` ==
                                                                  contextType
                                                                    ?.accountOverviewData
                                                                    ?.teamLeader2
                                                                    ?.name
                                                                    ? true
                                                                    : false
                                                                }
                                                              >
                                                                {user.name}
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                      </select>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .Title
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="teamLeader2.title"
                                                        id="teamLeader2.title"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.teamLeader2?.title
                                                        }
                                                        style={{
                                                          height: "18px",
                                                          width: "300px",
                                                        }}
                                                        maxLength={40}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "teamLeader2.title"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .Phone
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="teamLeader2.phone"
                                                        id="teamLeader2.phone"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.teamLeader2
                                                            ?.phone === null
                                                            ? ""
                                                            : contextType
                                                                ?.accountOverviewData
                                                                ?.teamLeader2
                                                                ?.phone
                                                        }
                                                        size={15}
                                                        maxLength={25}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "teamLeader2.phone"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .Email
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="teamLeader2.email"
                                                        id="teamLeader2.email"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.teamLeader2?.email
                                                        }
                                                        style={{
                                                          height: "18px",
                                                          width: "300px",
                                                        }}
                                                        maxLength={255}
                                                        onBlur={(e) => {
                                                          contextType.checkEmail(
                                                            e.target.value
                                                          );
                                                          contextType.mandatoryCheck();
                                                        }}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "teamLeader2.email"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table
                                                className={
                                                  styles.menuWdth100Height
                                                }
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td>&nbsp;</td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      colSpan={2}
                                                      className={
                                                        styles.InstructionHeader
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .CorpInfo
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table
                                                className={
                                                  styles.menuWdth100Height
                                                }
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .TotalGlobalEmployeeTooltip
                                                      }
                                                      width="30%"
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .TotalGlobalEmployee
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.glb_employee"
                                                        id="accountOverview.glb_employee"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.accountOverview
                                                            ?.glb_employee
                                                        }
                                                        size={20}
                                                        maxLength={12}
                                                        onKeyPress={
                                                          Utils.WholeNumberOnly_onkeypress
                                                        }
                                                        className={
                                                          styles.Field_Number
                                                        }
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.glb_employee"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{ width: "30%" }}
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .TotalGlobalTravellerTooltip
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .TotalGlobalTraveller
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.num_glb_traveler"
                                                        id="accountOverview.num_glb_traveler"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.accountOverview
                                                            ?.num_glb_traveler
                                                        }
                                                        size={20}
                                                        maxLength={12}
                                                        onKeyPress={
                                                          Utils.WholeNumberOnly_onkeypress
                                                        }
                                                        className={
                                                          styles.Field_Number
                                                        }
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.num_glb_traveler"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{ width: "30%" }}
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .TotalAssociationMembersToolTip
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .TotalAssociationMembers
                                                      }{" "}
                                                      &nbsp;
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.num_assn_members"
                                                        id="accountOverview.num_assn_members"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.accountOverview
                                                            ?.num_assn_members
                                                        }
                                                        size={20}
                                                        maxLength={12}
                                                        onKeyPress={
                                                          Utils.WholeNumberOnly_onkeypress
                                                        }
                                                        className={
                                                          styles.Field_Number
                                                        }
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.num_assn_members"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{ width: "30%" }}
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AnnualAccountRevenueToolTip
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AnnualAccountRevenue
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.rev"
                                                        id="accountOverview.rev"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.accountOverview
                                                            ?.rev
                                                        }
                                                        size={20}
                                                        maxLength={12}
                                                        onKeyPress={
                                                          Utils.WholeNumberOnly_onkeypress
                                                        }
                                                        className={
                                                          styles.Field_Number
                                                        }
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.rev"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      width="40%"
                                                    >
                                                      USD
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{ width: "30%" }}
                                                      className={
                                                        styles.field_Name
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .TotalRevenueToolTip
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .TotalRevenue
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.rev_conv_mtgs"
                                                        id="accountOverview.rev_conv_mtgs"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.accountOverview
                                                            ?.rev_conv_mtgs
                                                        }
                                                        size={20}
                                                        maxLength={12}
                                                        onKeyPress={
                                                          Utils.WholeNumberOnly_onkeypress
                                                        }
                                                        className={
                                                          styles.Field_Number
                                                        }
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.rev_conv_mtgs"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      width="40%"
                                                    >
                                                      USD
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{ width: "30%" }}
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      title={
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AnnualLodgingSpendTooltip
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .AnnualLodgingSpend
                                                      }
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      <input
                                                        type="text"
                                                        name="accountOverview.annual_trvl_expense"
                                                        id="accountOverview.annual_trvl_expense"
                                                        value={
                                                          contextType
                                                            ?.accountOverviewData
                                                            ?.accountOverview
                                                            ?.annual_trvl_expense
                                                        }
                                                        size={20}
                                                        maxLength={12}
                                                        onKeyPress={
                                                          Utils.WholeNumberOnly_onkeypress
                                                        }
                                                        className={
                                                          styles.Field_Number
                                                        }
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "accountOverview.annual_trvl_expense"
                                                          );
                                                        }}
                                                      />
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      width="40%"
                                                    >
                                                      USD
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table
                                                className={
                                                  styles.menuWdth100Height
                                                }
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td>&nbsp;</td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      colSpan={3}
                                                      className={
                                                        styles.InstructionHeader +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .FinancialTracking
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      className={
                                                        styles.field_Name +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                    >
                                                      {
                                                        Settings
                                                          .generalAccountOverviewDetails
                                                          .MarriottTacking
                                                      }
                                                    </td>
                                                    <td>&nbsp;</td>
                                                    <td
                                                      style={{ width: "40%", textAlign: "center" }}
                                                      className={
                                                        styles.field_Value +
                                                        " " +
                                                        styles.nowrapCell
                                                      }
                                                      align="left"
                                                    >
                                                      <select
                                                        name="genHistAcct.mar_tracking"
                                                        size={1}
                                                        onChange={(e) => {
                                                          handleInputValidation(
                                                            e,
                                                            "genHistAcct.mar_tracking"
                                                          );
                                                        }}
                                                        tabIndex={12}
                                                      >
                                                        <option />
                                                        <option
                                                          value="Y"
                                                          selected={
                                                            contextType
                                                              ?.accountOverviewData
                                                              ?.genHistAcct
                                                              ?.mar_tracking ==
                                                            "Y"
                                                              ? true
                                                              : false
                                                          }
                                                        >
                                                          Yes
                                                        </option>
                                                        <option
                                                          value="N"
                                                          selected={
                                                            contextType
                                                              ?.accountOverviewData
                                                              ?.genHistAcct
                                                              ?.mar_tracking ==
                                                            "N"
                                                              ? true
                                                              : false
                                                          }
                                                        >
                                                          No
                                                        </option>
                                                      </select>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table
                                                className={
                                                  styles.menuWdth100Height
                                                }
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td>
                                                      <table>
                                                        <tbody>
                                                          <tr>
                                                            <td>
                                                              <table
                                                                className={
                                                                  styles.zeroHeight
                                                                }
                                                              >
                                                                <tbody>
                                                                  <tr>
                                                                    <td
                                                                      style={{
                                                                        height:
                                                                          "30px",
                                                                      }}
                                                                      colSpan={
                                                                        3
                                                                      }
                                                                    >
                                                                      <b>
                                                                        {
                                                                          Settings
                                                                            .generalAccountOverviewDetails
                                                                            .TotalMarriottGlobalSpend
                                                                        }
                                                                      </b>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style={{
                                                                        width:
                                                                          "150px",
                                                                      }}
                                                                      className={
                                                                        styles.field_Name +
                                                                        " " +
                                                                        styles.nowrapCell
                                                                      }
                                                                    >
                                                                      {
                                                                        Settings
                                                                          .generalAccountOverviewDetails
                                                                          .Region
                                                                      }
                                                                    </td>
                                                                    <td
                                                                      className={
                                                                        styles.field_Name +
                                                                        " " +
                                                                        styles.nowrapCell
                                                                      }
                                                                    >
                                                                      {
                                                                        Settings
                                                                          .generalAccountOverviewDetails
                                                                          .RevenueUSD
                                                                      }
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      colSpan={
                                                                        3
                                                                      }
                                                                      style={{
                                                                        height:
                                                                          "2px",
                                                                        width:
                                                                          "100px",
                                                                      }}
                                                                      className={
                                                                        styles.InstructionHeader +
                                                                        " " +
                                                                        styles.nowrapCell
                                                                      }
                                                                    />
                                                                  </tr>
                                                                  {contextType?.accountOverviewData?.rgnActualSpend?.map(
                                                                    (
                                                                      rgnActSpendItem,
                                                                      index
                                                                    ) => {
                                                                      return (
                                                                        <tr
                                                                          key={
                                                                            rgnActSpendItem.regionname +
                                                                            index
                                                                          }
                                                                        >
                                                                          <td
                                                                            className={
                                                                              styles.nowrapCell
                                                                            }
                                                                            width={
                                                                              150
                                                                            }
                                                                            title={
                                                                              rgnActSpendItem.regionname ==
                                                                              "Central"
                                                                                ? "Central US region"
                                                                                : rgnActSpendItem.regionname ==
                                                                                  "Eastern"
                                                                                ? "Eastern US region"
                                                                                : rgnActSpendItem.regionname ==
                                                                                  "Western"
                                                                                ? "Western US region"
                                                                                : ""
                                                                            }
                                                                          >
                                                                            {
                                                                              rgnActSpendItem.regionname
                                                                            }
                                                                          </td>
                                                                          <td
                                                                            className={
                                                                              styles.nowrapCell
                                                                            }
                                                                          >
                                                                            <input
                                                                              type="text"
                                                                              tabIndex={
                                                                                14
                                                                              }
                                                                              name={`rgnActualSpendMap['${rgnActSpendItem.regionid}'].strRev`}
                                                                              id={`rgnActualSpendMap['${rgnActSpendItem.regionid}'].strRev`}
                                                                              value={
                                                                                contextType
                                                                                  ?.accountOverviewData
                                                                                  ?.rgnActualSpendMap[
                                                                                  rgnActSpendItem
                                                                                    ?.regionid
                                                                                ]
                                                                                  ?.rev
                                                                              }
                                                                              size={
                                                                                15
                                                                              }
                                                                              maxLength={
                                                                                12
                                                                              }
                                                                              onKeyPress={
                                                                                Utils.WholeNumberOnly_onkeypress
                                                                              }
                                                                              style={{
                                                                                textAlign:
                                                                                  "right",
                                                                              }}
                                                                              onChange={(
                                                                                e
                                                                              ) => {
                                                                                handleInputValidation(
                                                                                  e,
                                                                                  `rgnActualSpendMap.rev`,
                                                                                  rgnActSpendItem.regionid
                                                                                );
                                                                              }}
                                                                            />
                                                                          </td>
                                                                        </tr>
                                                                      );
                                                                    }
                                                                  )}

                                                                  <tr>
                                                                    <td
                                                                      colSpan={
                                                                        3
                                                                      }
                                                                      style={{
                                                                        height:
                                                                          "2px",
                                                                        width:
                                                                          "100px",
                                                                      }}
                                                                      className={
                                                                        styles.InstructionHeader
                                                                      }
                                                                    />
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      className={
                                                                        styles.field_Name +
                                                                        " " +
                                                                        styles.nowrapCell
                                                                      }
                                                                      width={
                                                                        150
                                                                      }
                                                                    >
                                                                      {
                                                                        Settings
                                                                          .generalAccountOverviewDetails
                                                                          .TotalMarriott
                                                                      }
                                                                    </td>
                                                                    <td
                                                                      className={
                                                                        styles.nowrapCell
                                                                      }
                                                                    >
                                                                      <input
                                                                        type="text"
                                                                        tabIndex={
                                                                          16
                                                                        }
                                                                        name="genHistAcct.strMarRoomRev"
                                                                        id="genHistAcct.strMarRoomRev"
                                                                        value={
                                                                          contextType
                                                                            ?.accountOverviewData
                                                                            ?.genHistAcct
                                                                            ?.formattedMarRoomRev
                                                                        }
                                                                        size={
                                                                          15
                                                                        }
                                                                        maxLength={
                                                                          38
                                                                        }
                                                                        onKeyPress={
                                                                          Utils.WholeNumberOnly_onkeypress
                                                                        }
                                                                        style={{
                                                                          textAlign:
                                                                            "right",
                                                                        }}
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          handleInputValidation(
                                                                            e,
                                                                            "genHistAcct.formattedMarRoomRev"
                                                                          );
                                                                        }}
                                                                      />
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      className={
                                                                        styles.field_Name +
                                                                        " " +
                                                                        styles.nowrapCell
                                                                      }
                                                                      width={
                                                                        150
                                                                      }
                                                                    >
                                                                      {
                                                                        Settings
                                                                          .generalAccountOverviewDetails
                                                                          .TotalGrpHotelSpend
                                                                      }
                                                                    </td>
                                                                    <td
                                                                      className={
                                                                        styles.nowrapCell
                                                                      }
                                                                    >
                                                                      <input
                                                                        type="text"
                                                                        tabIndex={
                                                                          16
                                                                        }
                                                                        name="genHistAcct.formattedHotelSpendRev"
                                                                        id="genHistAcct.formattedHotelSpendRev"
                                                                        value={
                                                                          contextType
                                                                            ?.accountOverviewData
                                                                            ?.genHistAcct
                                                                            ?.formattedHotelSpendRev
                                                                        }
                                                                        size={
                                                                          15
                                                                        }
                                                                        maxLength={
                                                                          38
                                                                        }
                                                                        onKeyPress={
                                                                          Utils.WholeNumberOnly_onkeypress
                                                                        }
                                                                        style={{
                                                                          textAlign:
                                                                            "right",
                                                                        }}
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          handleInputValidation(
                                                                            e,
                                                                            "genHistAcct.formattedHotelSpendRev"
                                                                          );
                                                                        }}
                                                                      />
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      className={
                                                                        styles.field_Name +
                                                                        " " +
                                                                        styles.nowrapCell
                                                                      }
                                                                      width={
                                                                        150
                                                                      }
                                                                    >
                                                                      {
                                                                        Settings
                                                                          .generalAccountOverviewDetails
                                                                          .MIShare
                                                                      }
                                                                    </td>
                                                                    <td
                                                                      className={
                                                                        styles.nowrapCell
                                                                      }
                                                                    >
                                                                      <input
                                                                        type="text"
                                                                        tabIndex={
                                                                          16
                                                                        }
                                                                        name="genHistAcct.formattedMarSpendRev"
                                                                        id="genHistAcct.formattedMarSpendRev"
                                                                        value={
                                                                          contextType
                                                                            ?.accountOverviewData
                                                                            ?.genHistAcct
                                                                            ?.formattedMarSpendRev
                                                                        }
                                                                        size={
                                                                          15
                                                                        }
                                                                        maxLength={
                                                                          40
                                                                        }
                                                                        style={{
                                                                          textAlign:
                                                                            "right",
                                                                        }}
                                                                        onChange={(
                                                                          e
                                                                        ) => {
                                                                          percent_onchange(
                                                                            e,
                                                                            "genHistAcct.formattedMarSpendRev",
                                                                            0
                                                                          );
                                                                        }}
                                                                        onBlur={(
                                                                          e
                                                                        ) => {
                                                                          contextType.checkNumLength(
                                                                            e
                                                                              .target
                                                                              .value
                                                                          );
                                                                          contextType.mandatoryCheck();
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
                                                    </td>
                                                  </tr>
                                                  <tr
                                                    style={{ height: "20px" }}
                                                  >
                                                    <td />
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table>
                                                        <tbody>
                                                          <tr>
                                                            <td>
                                                              <table
                                                                className={
                                                                  styles.zeroHeight
                                                                }
                                                              >
                                                                <tbody>
                                                                  <tr>
                                                                    <td
                                                                      style={{
                                                                        height:
                                                                          "30px",
                                                                      }}
                                                                      colSpan={
                                                                        3
                                                                      }
                                                                    >
                                                                      <b>
                                                                        {
                                                                          Settings
                                                                            .generalAccountOverviewDetails
                                                                            .CompleteBelowData
                                                                        }
                                                                      </b>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      style={{
                                                                        width:
                                                                          "150px",
                                                                      }}
                                                                      title={
                                                                        Settings
                                                                          .generalAccountOverviewDetails
                                                                          .SupplierNameTooltip
                                                                      }
                                                                      className={
                                                                        styles.field_Name +
                                                                        " " +
                                                                        styles.nowrapCell
                                                                      }
                                                                    >
                                                                      {
                                                                        Settings
                                                                          .generalAccountOverviewDetails
                                                                          .SupplierName
                                                                      }
                                                                    </td>
                                                                    <td
                                                                      title={
                                                                        Settings
                                                                          .generalAccountOverviewDetails
                                                                          .ShareTooltip
                                                                      }
                                                                      className={
                                                                        styles.field_Name +
                                                                        " " +
                                                                        styles.nowrapCell
                                                                      }
                                                                      width={
                                                                        100
                                                                      }
                                                                    >
                                                                      {
                                                                        Settings
                                                                          .generalAccountOverviewDetails
                                                                          .Share
                                                                      }
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td
                                                                      colSpan={
                                                                        3
                                                                      }
                                                                      style={{
                                                                        height:
                                                                          "2px",
                                                                        width:
                                                                          "100px",
                                                                      }}
                                                                      className={
                                                                        styles.InstructionHeader +
                                                                        " " +
                                                                        styles.nowrapCell
                                                                      }
                                                                    />
                                                                  </tr>
                                                                  {Array.from(
                                                                    Array(
                                                                      contextType
                                                                        ?.accountOverviewData
                                                                        ?.maxCompetitor
                                                                    ),
                                                                    (e, i) => {
                                                                      return (
                                                                        <tr>
                                                                          <td
                                                                            className={
                                                                              styles.nowrapCell
                                                                            }
                                                                            width={
                                                                              150
                                                                            }
                                                                          >
                                                                            <input
                                                                              type="text"
                                                                              id={`pctCompetitorMap['${
                                                                                i +
                                                                                1
                                                                              }'].suppliername`}
                                                                              name={`pctCompetitorMap['${
                                                                                i +
                                                                                1
                                                                              }'].suppliername`}
                                                                              value={
                                                                                contextType
                                                                                  ?.accountOverviewData
                                                                                  ?.pctCompetitorMap[
                                                                                  i +
                                                                                    1
                                                                                ]
                                                                                  ?.suppliername
                                                                              }
                                                                              size={
                                                                                20
                                                                              }
                                                                              maxLength={
                                                                                50
                                                                              }
                                                                              onChange={(
                                                                                e
                                                                              ) => {
                                                                                handlePctCompetitorMap(
                                                                                  e,
                                                                                  `pctCompetitorMap.suppliername`,
                                                                                  i
                                                                                );
                                                                              }}
                                                                            />
                                                                          </td>
                                                                          <td
                                                                            className={
                                                                              styles.nowrapCell
                                                                            }
                                                                          >
                                                                            <input
                                                                              type="text"
                                                                              tabIndex={
                                                                                16
                                                                              }
                                                                              id={`pctCompetitorMap['${
                                                                                i +
                                                                                1
                                                                              }'].share_percent`}
                                                                              name={`pctCompetitorMap['${
                                                                                i +
                                                                                1
                                                                              }'].share_percent`}
                                                                              value={
                                                                                contextType
                                                                                  ?.accountOverviewData
                                                                                  ?.pctCompetitorMap[
                                                                                  i +
                                                                                    1
                                                                                ]
                                                                                  ?.share_percent
                                                                              }
                                                                              size={
                                                                                4
                                                                              }
                                                                              maxLength={
                                                                                3
                                                                              }
                                                                              onKeyPress={
                                                                                Utils.WholeNumberOnly_onkeypress
                                                                              }
                                                                              className={
                                                                                styles.Field_Number
                                                                              }
                                                                              onChange={(
                                                                                e
                                                                              ) => {
                                                                                handlePctCompetitorMap(
                                                                                  e,
                                                                                  `pctCompetitorMap.share_percent`,
                                                                                  i
                                                                                );
                                                                              }}
                                                                              onBlur={(
                                                                                e
                                                                              ) => {
                                                                                contextType.checkNumLength(
                                                                                  e
                                                                                    .target
                                                                                    .value
                                                                                );
                                                                                contextType.mandatoryCheck();
                                                                                handlePercentBlur(
                                                                                  e,
                                                                                  `pctCompetitorMap.share_percent`,
                                                                                  i
                                                                                );
                                                                              }}
                                                                            />
                                                                          </td>
                                                                        </tr>
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
                                                </tbody>
                                              </table>
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </form>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {isClickHereOpen ? (
                  <CModal
                    title={Settings.generalAccountOverviewDetails.HeaderInfo}
                    xPosition={-200}
                    yPosition={-100}
                    onClose={() => setIsClickHereOpen(false)}
                    show={isClickHereOpen}
                  >
                    <div className={styles.dijitDialogPaneContent}>
                      <div className={styles.popupContent} gutters="false">
                        <div region="top">
                          <table className={styles.fullheight}>
                            <tbody>
                              <tr>
                                <td className={styles.Field_Value}>
                                  <ul>
                                    <li>
                                      Enter the headquarters address and phone
                                      number for the account that you are
                                      pricing.
                                    </li>
                                  </ul>
                                  <ul>
                                    <li>
                                      If this information is not available from
                                      your account contact please refer to the
                                      company's web site or Hoovers.com (which
                                      contains free information for most
                                      companies).
                                    </li>
                                  </ul>
                                  <ul>
                                    <li>
                                      If you are pricing the subsidiary of a
                                      larger company and the larger company is
                                      not priced itself or priced through
                                      different rate programs, please enter the
                                      address for the subsidiary in the account
                                      overview.
                                    </li>
                                  </ul>
                                  <ul>
                                    <li>
                                      If you are setting up multiple accounts
                                      for the same company- for example- you are
                                      setting up individual accounts for the
                                      divisions of GM, but pricing is driven
                                      through the parent company, please enter
                                      the parent company's address information
                                      in the account overview screens for each
                                      of the divisions.
                                    </li>
                                  </ul>
                                  <ul>
                                    <li>
                                      And finally, if you are pricing a joint
                                      venture or a cooperative, which is not an
                                      actual company, please leave the address
                                      information on the overview screen blank.
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CModal>
                ) : null}
                {contextType.showValidationModal && (
                  <>
                    <CModal
                      title={
                        Settings.generalAccountOverviewDetails.modalHeading
                      }
                      onClose={() => contextType.closeModal()}
                      show={contextType.showValidationModal}
                      class={"errormessage"}
                      overlayHeight={Math.max(
                        document.body.scrollHeight,
                        document.body.offsetHeight,
                        document.documentElement.clientHeight,
                        document.documentElement.scrollHeight,
                        document.documentElement.offsetHeight
                      )}
                      overlayTopPosition={"-79px"}
                    >
                      <div className={styles.validationModal}>
                        {contextType.validationMessage}
                      </div>
                    </CModal>
                    <style>{`
                    .errormessage{
                      position:fixed;    
                      left: 42vw;
                      top: 46.5vh;
                    }
                  `}</style>
                  </>
                )}
              </div>
            );
          }}
        </GeneralAccountOverviewContext.Consumer>
      </GeneralAccountOverviewContextProvider>
      <style>{`
        .container{
          min-width:930px;
        }
      `}</style>
    </Layout>
  );
};

export default GeneralAccountOverview;
