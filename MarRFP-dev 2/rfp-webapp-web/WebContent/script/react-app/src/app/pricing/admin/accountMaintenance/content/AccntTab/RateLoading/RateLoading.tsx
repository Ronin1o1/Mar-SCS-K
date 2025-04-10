import React, { Component, Suspense } from "react";
import API from "./service/API";
import Settings from "./static/Settings";
import RateLoadingContext from "./context/RateLoadingContext";
import CSuspense from "./../../../../../../common/components/CSuspense";
import styles from "./RateLoading.css";
import "./RateLoading.css";
import CDataTable from "./../../../../../../common/components/CDataTable";
import CSelect from "./../../../../../../common/components/CSelect";
import CModal from "./../../../../../../common/components/CModal";
import AccountListContext from "../../../context/AccountListContext";
import UpdateBtnImg from "./../../../../../../common/assets/img/button/btnUpdate.gif";
import RemoveBtnImg from "./../../../../../../common/assets/img/button/btnRemoveTxt.gif";
import RateOfferLookupModal from "./RateOfferLookupModal";
import Util from "../../../../../../common/utils/Utils";
import CCalendar from "../../../../../../common/components/CCalendar";
import screenLoader from "../../../../../../common/assets/img/screenloader.gif";
import "primeicons/primeicons.css";

let contextType = null;
let parentContextType = null;
let accountRecId = null;
let period = null;
let sappAdmin = null;

export default class RateLoading extends Component {
  container = React.createRef();
  toolTipRef;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    accountRecId = parentContextType.state.accountListData.selectedAccount
      .accountrecid
      ? parentContextType.state.accountListData.selectedAccount.accountrecid
      : sessionStorage.getItem("accountsDataRecId");
    period = parentContextType.state.accountListData.selectedAccount.period
      ? parentContextType.state.accountListData.selectedAccount.period
      : sessionStorage.getItem("accountsDataPeriod");
    sappAdmin =
      parentContextType?.state?.roleDetails?.role === "MFPAPADM" ? true : false;
    contextType.setLoader();
    API.getRateLoadingData(accountRecId, period).then((data) => {
      contextType.setRateLoadingListData(data);
      contextType.resetLoader();
    });
  }
  componentWillUnmount = () => {
    if (contextType.state.formChg) {
      contextType.autoSave();
    }
  };
  checkboxSelection(data) {
    return data == "Y" ? true : false;
  }

  disabledSelection(data) {
    return data == "Y" ? false : true;
  }

  linkcanprice = (rowData) => {
    return (
      <>
        <div>
          <input
            type="checkbox"
            id={rowData.affiliationid}
            onChange={(e) =>
              contextType.onChangeFeildValue(rowData, "checkbox", e)
            }
            checked={this.checkboxSelection(rowData.canprice)}
          />
        </div>
      </>
    );
  };

  linkParticipateGpp = (rowData) => {
    return (
      <div>
        <input
          type="checkbox"
          id={rowData.affiliationid}
          onChange={(e) =>
            contextType.onChangeFeildValue(rowData, "gpp_value", e)
          }
          checked={this.checkboxSelection(rowData.gpp_value)}
          disabled={this.disabledSelection(rowData.gpp_optional_brand)}
        />
      </div>
    );
  };

  linkCurrentRoomPool = (rowData) => {
    return (
      <>
        <div>
          <CSelect
            id={"dropdown" + rowData.affiliationid}
            ddnOptions={Settings.rateLoading.formFields.rpgList}
            keyField={
              Settings.rateLoading.formFields.accountViewableoptions.key
            }
            valField={
              Settings.rateLoading.formFields.accountViewableoptions.value
            }
            onChange={(e) =>
              contextType.onChangeFeildValue(rowData, "select", e)
            }
            selectedValue={String(rowData.currentroompool)}
          />
        </div>
      </>
    );
  };

  linkInput = (rowData) => {
    return (
      <div>
        {rowData.showToolTips && (
          <div
            id={contextType.tooltipId}
            className={styles.tooltipContainer}
            style={{
              marginLeft: "-20vw",
              marginTop: -2,
            }}
          >
            {Settings.rateLoading.floatDefaultPercentAlertMsg1}
          </div>
        )}
        <input
          id={rowData.affiliationid}
          maxLength={3}
          onChange={(e) => contextType.onChangeFeildValue(rowData, "input", e)}
          onClick={(e) =>
            contextType.onFloatDefaultClickHandler(rowData, "input", e)
          }
          onBlur={(e) =>
            contextType.onFloatDefaultBlurHandler(rowData, "input", e)
          }
          className={
            rowData.showWarningIcon
              ? styles.fieldWidthBackground
              : styles.fieldWidth40
          }
          value={rowData.default_percent !== null ? rowData.default_percent : 0}
        />
      </div>
    );
  };

  onChangeHandler = () => {};

  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          parentContextType = accountListContext;
          return (
            <RateLoadingContext.Consumer>
              {(RateLoadingContext) => {
                contextType = RateLoadingContext;
                const columns = [
                  {
                    field:
                      Settings.rateLoading.tableColumns.affiliationname.field,
                    header:
                      Settings.rateLoading.tableColumns.affiliationname.header,
                    sortable: true,
                  },
                  {
                    field: Settings.rateLoading.tableColumns.servicetype.field,
                    header:
                      Settings.rateLoading.tableColumns.servicetype.header,
                    sortable: true,
                  },
                  {
                    field: Settings.rateLoading.tableColumns.canprice.field,
                    header: Settings.rateLoading.tableColumns.canprice.header,
                    body: this.linkcanprice,
                    style: { textAlign: "center" },
                    sortable: true,
                  },
                  {
                    field:
                      Settings.rateLoading.tableColumns.currentroompool.field,
                    header:
                      Settings.rateLoading.tableColumns.currentroompool.header,
                    body: this.linkCurrentRoomPool,
                    style: { textAlign: "center" },
                    sortable: true,
                  },
                  {
                    field:
                      Settings.rateLoading.tableColumns.participateGPP.field,
                    header:
                      Settings.rateLoading.tableColumns.participateGPP.header,
                    body: this.linkParticipateGpp,
                    style:
                      contextType.state.rateLoadingData.aer_account === "Y"
                        ? { textAlign: "center", display: "table-cell" }
                        : { display: "none" },
                    sortable: true,
                  },
                  {
                    field:
                      Settings.rateLoading.tableColumns.default_percent.field,
                    header:
                      Settings.rateLoading.tableColumns.default_percent.header,
                    body: this.linkInput,
                    style:
                      contextType.state.rateLoadingData.accountAllowFloatVP ===
                      "Y"
                        ? { textAlign: "center", display: "table-cell" }
                        : { display: "none" },
                    sortable: true,
                  },
                ];
                return (
                  <>
                    {contextType.state.showScreenLoader ? (
                      <div id="loading" className={styles.accountTabLoader}>
                        <div>
                          <img src={screenLoader}></img>
                        </div>
                      </div>
                    ) : null}
                    <React.Fragment>
                      <div className={styles.containerDiv}>
                        {contextType.state.showToolTips && (
                          <div
                            id={contextType.tooltipId}
                            className={styles.tooltipContainer}
                            style={{
                              left: contextType.tooltipCoordinates.x,
                              top: contextType.tooltipCoordinates.y,
                            }}
                          >
                            {Settings.rateLoading.floatDefaultPercentAlertMsg1}
                          </div>
                        )}
                        <table className={styles.tableWidth}>
                          <tbody>
                            <tr>
                              <td
                                className={[
                                  styles.fieldName,
                                  styles.fieldWidth200,
                                ].join(" ")}
                              >
                                {
                                  Settings.rateLoading.formFields
                                    .accountAllowsFloatVP.name
                                }
                              </td>
                              {sappAdmin ? (
                                <td>
                                  {contextType.state.rateLoadingData
                                    .accountAllowFloatVP === "Y"
                                    ? Settings.sappAdmin.Yes
                                    : Settings.sappAdmin.No}
                                </td>
                              ) : (
                                <td>
                                  <CSelect
                                    id={
                                      Settings.rateLoading.formFields
                                        .accountAllowsFloatVP.id
                                    }
                                    keyField={
                                      Settings.rateLoading.formFields
                                        .accountAllowsFloatVP.key
                                    }
                                    valField={
                                      Settings.rateLoading.formFields
                                        .accountAllowsFloatVP.value
                                    }
                                    selectedValue={
                                      contextType.state.rateLoadingData
                                        .accountAllowFloatVP
                                    }
                                    ddnOptions={Settings.rateLoading.yesNoList}
                                    onChange={
                                      contextType.onAccountAllowsFloatVPChangeHandler
                                    }
                                  />
                                </td>
                              )}
                            </tr>
                            {contextType.state.rateLoadingData
                              .accountAllowFloatVP ===
                            Settings.rateLoading.yes ? (
                              <React.Fragment>
                                <tr id="trfltd">
                                  <td
                                    className={[
                                      styles.fieldWidth200,
                                      styles.fieldName,
                                    ].join(" ")}
                                  >
                                    {
                                      Settings.rateLoading.formFields
                                        .floatVPProductEnabled.name
                                    }
                                  </td>
                                  {sappAdmin ? (
                                    <td>
                                      {contextType.state.rateLoadingData
                                        .allow_floatnociel === "Y"
                                        ? Settings.sappAdmin.Yes
                                        : Settings.sappAdmin.No}
                                    </td>
                                  ) : (
                                    <td>
                                      <CSelect
                                        id={
                                          Settings.rateLoading.formFields
                                            .floatVPProductEnabled.id
                                        }
                                        keyField={
                                          Settings.rateLoading.formFields
                                            .floatVPProductEnabled.key
                                        }
                                        valField={
                                          Settings.rateLoading.formFields
                                            .floatVPProductEnabled.value
                                        }
                                        selectedValue={
                                          contextType.state.rateLoadingData
                                            .allow_floatnociel
                                        }
                                        ddnOptions={
                                          Settings.rateLoading.yesNoList
                                        }
                                        onChange={
                                          contextType.onFloatVPProductEnabledChangeHandler
                                        }
                                      />
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <td colSpan={2}></td>
                                </tr>
                                <tr id="trfltd1">
                                  <td
                                    className={[
                                      styles.fieldWidth200,
                                      styles.fieldName,
                                    ].join(" ")}
                                  >
                                    {
                                      Settings.rateLoading.formFields
                                        .hotelCanPriceFloatVP.name
                                    }
                                  </td>
                                  {sappAdmin ? (
                                    <td>
                                      {contextType.state.rateLoadingData
                                        .allowHotelcanPriceFloatVP === "Y"
                                        ? Settings.sappAdmin.Yes
                                        : Settings.sappAdmin.No}
                                    </td>
                                  ) : (
                                    <td>
                                      <CSelect
                                        id={
                                          Settings.rateLoading.formFields
                                            .hotelCanPriceFloatVP.id
                                        }
                                        keyField={
                                          Settings.rateLoading.formFields
                                            .hotelCanPriceFloatVP.key
                                        }
                                        valField={
                                          Settings.rateLoading.formFields
                                            .hotelCanPriceFloatVP.value
                                        }
                                        selectedValue={
                                          contextType.state.rateLoadingData
                                            .allowHotelcanPriceFloatVP
                                        }
                                        ddnOptions={
                                          Settings.rateLoading.yesNoList
                                        }
                                        onChange={
                                          contextType.onHotelCanPriceFloatVPChangeHandler
                                        }
                                      />
                                    </td>
                                  )}
                                </tr>
                              </React.Fragment>
                            ) : (
                              ""
                            )}
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td
                                className={[
                                  styles.fieldWidth200,
                                  styles.fieldName,
                                ].join(" ")}
                              >
                                {
                                  Settings.rateLoading.formFields
                                    .hotelsCanModifyRates.name
                                }
                              </td>
                              {sappAdmin ? (
                                <td>
                                  {contextType.state.rateLoadingData
                                    .allow_modifications === "Y"
                                    ? Settings.sappAdmin.Yes
                                    : Settings.sappAdmin.No}
                                </td>
                              ) : (
                                <td>
                                  <CSelect
                                    id={
                                      Settings.rateLoading.formFields
                                        .hotelsCanModifyRates.id
                                    }
                                    keyField={
                                      Settings.rateLoading.formFields
                                        .hotelsCanModifyRates.key
                                    }
                                    valField={
                                      Settings.rateLoading.formFields
                                        .hotelsCanModifyRates.value
                                    }
                                    selectedValue={
                                      contextType.state.rateLoadingData
                                        .allow_modifications
                                    }
                                    ddnOptions={Settings.rateLoading.yesNoList}
                                    onChange={
                                      contextType.onHotelCanModifyOrRateOfferUpdateHandler
                                    }
                                  />
                                </td>
                              )}
                              <CModal
                                title={
                                  contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .updateBtnId ||
                                  contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .gppUpdateBtnId
                                    ? Settings.rateLoading.rateOfferLookUpModal
                                        .rateOfferModalTitle
                                    : Settings.rateLoading.formFields.modal
                                        .modalTitle
                                }
                                className={styles.outerLine}
                                show={contextType.state.showModal}
                                onClose={contextType.showModal}
                                closeImgTitle={
                                  contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .updateBtnId ||
                                  contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .gppUpdateBtnId
                                    ? "Cancel"
                                    : "OK - Close Message Box"
                                }
                                xPosition={
                                  contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .updateBtnId ||
                                  contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .gppUpdateBtnId
                                    ? Settings.rateLoading.formFields.modal
                                        .rateModalXPosition
                                    : window.innerWidth > 900
                                    ? -390
                                    : -260
                                }
                                yPosition={
                                  contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .updateBtnId ||
                                  contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .gppUpdateBtnId
                                    ? Settings.rateLoading.formFields.modal
                                        .rateModalYPosition
                                    : Settings.rateLoading.formFields.modal
                                        .modalYPosition
                                }
                              >
                                <Suspense fallback={<CSuspense />}>
                                  {contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .updateBtnId ||
                                  contextType.state.modalId ===
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .gppUpdateBtnId ? (
                                    <RateOfferLookupModal />
                                  ) : (
                                    <div
                                      className={`${styles.msgModal} textNormal`}
                                    >
                                      {contextType.state.rateLoadingData
                                        .allow_qmodifications !== null &&
                                        contextType.state.modalId ===
                                          Settings.rateLoading.formFields
                                            .hotelsCanModifyQuestions.id &&
                                        contextType.state.rateLoadingData
                                          .allow_qmodifications === "Y" && (
                                          <div
                                            className={`${styles.msgModal} textNormal`}
                                          >
                                            {
                                              Settings.rateLoading.formFields
                                                .questionModal.modalMessage
                                            }
                                          </div>
                                        )}
                                      {contextType.state.rateLoadingData
                                        .allow_modifications !== null &&
                                        contextType.state.modalId ===
                                          Settings.rateLoading.formFields
                                            .hotelsCanModifyRates.id &&
                                        contextType.state.rateLoadingData
                                          .allow_modifications === "Y" && (
                                          <div
                                            className={`${styles.msgModal} textNormal`}
                                          >
                                            {
                                              Settings.rateLoading.formFields
                                                .modal.modalMessage
                                            }
                                          </div>
                                        )}
                                    </div>
                                  )}
                                </Suspense>
                              </CModal>
                            </tr>
                            {contextType.state.rateLoadingData
                              .allow_modifications ===
                            Settings.rateLoading.yes ? (
                              <tr>
                                <td colSpan={2}>
                                  <div
                                    id={
                                      Settings.rateLoading.formFields
                                        .outerIdForStartAndEndDate
                                    }
                                    className={styles.divFlexDisplay}
                                  >
                                    <span
                                      className={[
                                        styles.fieldName,
                                        styles.dateMargins,
                                      ].join(" ")}
                                    >
                                      {
                                        Settings.rateLoading.formFields
                                          .startDate.name
                                      }
                                    </span>
                                    <span
                                      className={styles.calendarMargin}
                                      title={
                                        Settings.rateLoading.formFields.title
                                      }
                                    >
                                      <CCalendar
                                        id={
                                          Settings.rateLoading.formFields
                                            .startDate.calId
                                        }
                                        inputId={
                                          Settings.rateLoading.formFields
                                            .startDate.id
                                        }
                                        value={
                                          contextType.state.rateLoadingData
                                            .shortStartmoddate === undefined
                                            ? ""
                                            : Util.convertStrToDate(
                                                contextType.state
                                                  .rateLoadingData
                                                  .shortStartmoddate
                                              )
                                        }
                                        onChange={
                                          contextType.onRatesChangeCalendar
                                        }
                                        onInput={
                                          contextType.onRatesInputHandler
                                        }
                                        onHide={
                                          contextType.onRatesStartDateHideHandler
                                        }
                                        onBlur={(e) =>
                                          contextType.onQuestionsBlurHandler(
                                            e,
                                            "shortStartmoddate"
                                          )
                                        }
                                        hasCustomMonth={true}
                                      />
                                    </span>
                                    <span
                                      className={[
                                        styles.fieldName,
                                        styles.dateMargins,
                                        styles.calendarMargin,
                                      ].join(" ")}
                                    >
                                      {
                                        Settings.rateLoading.formFields.endDate
                                          .name
                                      }
                                    </span>
                                    <span
                                      className={styles.calendarMargin}
                                      title={
                                        Settings.rateLoading.formFields.title
                                      }
                                    >
                                      <CCalendar
                                        id={
                                          Settings.rateLoading.formFields
                                            .endDate.calId
                                        }
                                        inputId={
                                          Settings.rateLoading.formFields
                                            .endDate.id
                                        }
                                        value={
                                          contextType.state.rateLoadingData
                                            .shortEndmoddate === undefined
                                            ? ""
                                            : Util.convertStrToDate(
                                                contextType.state
                                                  .rateLoadingData
                                                  .shortEndmoddate
                                              )
                                        }
                                        onChange={
                                          contextType.onRatesChangeCalendar
                                        }
                                        onInput={
                                          contextType.onRatesInputHandler
                                        }
                                        onHide={
                                          contextType.onRatesEndDateHideHandler
                                        }
                                        onBlur={(e) =>
                                          contextType.onQuestionsBlurHandler(
                                            e,
                                            "shortEndmoddate"
                                          )
                                        }
                                        hasCustomMonth={true}
                                      />
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              ""
                            )}
                            <CModal
                              title={
                                Settings.rateLoading.formFields.modal.modalTitle
                              }
                              show={contextType.state.showDateModal}
                              onClose={contextType.showDateModal}
                              xPosition={
                                Settings.rateLoading.formFields.modal
                                  .modalXPosition
                              }
                              yPosition={
                                Settings.rateLoading.formFields.modal
                                  .modalYPosition
                              }
                            >
                              <Suspense fallback={<CSuspense />}>
                                <div className={styles.modalMessage}>
                                  {contextType.state.dateMsg}
                                </div>
                              </Suspense>
                            </CModal>
                            <tr>
                              <td
                                className={[
                                  styles.fieldWidth200,
                                  styles.fieldName,
                                ].join(" ")}
                              >
                                {
                                  Settings.rateLoading.formFields
                                    .hotelsCanModifyQuestions.name
                                }
                              </td>
                              {sappAdmin ? (
                                <td>
                                  {contextType.state.rateLoadingData
                                    .allow_qmodifications === "Y"
                                    ? Settings.sappAdmin.Yes
                                    : Settings.sappAdmin.No}
                                </td>
                              ) : (
                                <td>
                                  <CSelect
                                    id={
                                      Settings.rateLoading.formFields
                                        .hotelsCanModifyQuestions.id
                                    }
                                    keyField={
                                      Settings.rateLoading.formFields
                                        .hotelsCanModifyQuestions.key
                                    }
                                    valField={
                                      Settings.rateLoading.formFields
                                        .hotelsCanModifyQuestions.value
                                    }
                                    selectedValue={
                                      contextType.state.rateLoadingData
                                        .allow_qmodifications
                                    }
                                    ddnOptions={Settings.rateLoading.yesNoList}
                                    onChange={
                                      contextType.onHotelCanModifyOrRateOfferUpdateHandler
                                    }
                                  />
                                </td>
                              )}
                            </tr>
                            {contextType.state.rateLoadingData
                              .allow_qmodifications ===
                            Settings.rateLoading.yes ? (
                              <tr>
                                <td colSpan={2}>
                                  <div
                                    id={
                                      Settings.rateLoading.formFields
                                        .outerIdForQuesStartAndEndDate
                                    }
                                    className={styles.divFlexDisplay}
                                  >
                                    <span
                                      className={[
                                        styles.fieldName,
                                        styles.dateMargins,
                                      ].join(" ")}
                                    >
                                      {
                                        Settings.rateLoading.formFields
                                          .qStartDate.name
                                      }
                                    </span>
                                    <span
                                      className={styles.calendarMargin}
                                      title={
                                        Settings.rateLoading.formFields.title
                                      }
                                    >
                                      <CCalendar
                                        id={
                                          Settings.rateLoading.formFields
                                            .qStartDate.calId
                                        }
                                        inputId={
                                          Settings.rateLoading.formFields
                                            .qStartDate.id
                                        }
                                        value={
                                          contextType.state.rateLoadingData
                                            .shortStartqmoddate === undefined
                                            ? ""
                                            : Util.convertStrToDate(
                                                contextType.state
                                                  .rateLoadingData
                                                  .shortStartqmoddate
                                              )
                                        }
                                        onChange={
                                          contextType.onQuestionsChangeCalendar
                                        }
                                        onInput={
                                          contextType.onQuestionsInputHandler
                                        }
                                        onHide={
                                          contextType.onQuestionsStartDateHideHandler
                                        }
                                        onBlur={(e) =>
                                          contextType.onQuestionsBlurHandler(
                                            e,
                                            "shortStartqmoddate"
                                          )
                                        }
                                        hasCustomMonth={true}
                                      />
                                    </span>

                                    <span
                                      className={[
                                        styles.fieldName,
                                        styles.dateMargins,
                                        styles.calendarMargin,
                                      ].join(" ")}
                                    >
                                      {
                                        Settings.rateLoading.formFields.qEndDate
                                          .name
                                      }
                                    </span>
                                    <span
                                      className={styles.calendarMargin}
                                      title={
                                        Settings.rateLoading.formFields.title
                                      }
                                    >
                                      <CCalendar
                                        id={
                                          Settings.rateLoading.formFields
                                            .qEndDate.calId
                                        }
                                        inputId={
                                          Settings.rateLoading.formFields
                                            .qEndDate.id
                                        }
                                        value={
                                          contextType.state.rateLoadingData
                                            .shortEndqmoddate === undefined
                                            ? ""
                                            : Util.convertStrToDate(
                                                contextType.state
                                                  .rateLoadingData
                                                  .shortEndqmoddate
                                              )
                                        }
                                        onChange={
                                          contextType.onQuestionsChangeCalendar
                                        }
                                        onHide={
                                          contextType.onQuestionsEndDateHideHandler
                                        }
                                        onInput={
                                          contextType.onQuestionsInputHandler
                                        }
                                        onBlur={(e) =>
                                          contextType.onQuestionsBlurHandler(
                                            e,
                                            "shortEndqmoddate"
                                          )
                                        }
                                        hasCustomMonth={true}
                                      />
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              ""
                            )}
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td
                                className={[
                                  styles.fieldWidth200,
                                  styles.fieldName,
                                ].join(" ")}
                              >
                                {
                                  Settings.rateLoading.formFields.clusterCode
                                    .name
                                }
                              </td>
                              {sappAdmin ? (
                                <td>
                                  {
                                    contextType.state.rateLoadingData
                                      .clustercode == null
                                      ? ""
                                      : contextType.state.rateLoadingData
                                          .clustercode
                                  }
                                </td>
                              ) : (
                                <td>
                                  <input
                                    id={
                                      Settings.rateLoading.formFields
                                        .clusterCode.id
                                    }
                                    type="text"
                                    maxLength={10}
                                    size={10}
                                    value={
                                      contextType.state.rateLoadingData
                                      .clustercode == null
                                      ? ""
                                      : contextType.state.rateLoadingData
                                          .clustercode
                                    }
                                    onChange={contextType.onClusterCodeChange}
                                  />
                                </td>
                              )}
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>

                            <tr>
                              <td colSpan={2}>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td
                                        colSpan={4}
                                        className={[
                                          styles.fieldWidth350,
                                          styles.fieldName,
                                        ].join(" ")}
                                      >
                                        {
                                          Settings.rateLoading.formFields
                                            .rateOfferAndRatePrograms
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={4}>
                                        <>&nbsp;</>
                                      </td>
                                    </tr>
                                    <tr className={styles.fieldHeight25}>
                                      <td
                                        colSpan={1}
                                        className={[
                                          styles.fieldWidth200New,
                                          styles.fieldName,
                                        ].join(" ")}
                                      >
                                        {
                                          Settings.rateLoading.formFields
                                            .rateOffers.name
                                        }
                                      </td>
                                      <td colSpan={3}>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .rateOffers.id
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .rateprograms[0].rateOfferName
                                          }
                                        </span>
                                      </td>
                                    </tr>
                                    <tr className={styles.fieldHeight16}>
                                      <td
                                        colSpan={4}
                                        className={styles.fieldName}
                                      >
                                        {
                                          Settings.rateLoading.formFields
                                            .ratePrograms.name
                                        }
                                      </td>
                                    </tr>
                                    <tr className={styles.fieldHeight16}>
                                      <td className={styles.roomPoolsContainer}>
                                        {
                                          Settings.rateLoading.formFields
                                            .roomPoolGroup1.name
                                        }
                                      </td>
                                      <td className={styles.fieldWidth50}>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup1.id1
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .rateprograms[0].rateProg
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup1.id2
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .rateprograms[1].rateProg
                                          }
                                        </span>
                                      </td>
                                    </tr>
                                    <tr className={styles.fieldHeight16}>
                                      <td className={styles.roomPoolsContainer}>
                                        {
                                          Settings.rateLoading.formFields
                                            .roomPoolGroup2.name
                                        }
                                      </td>
                                      <td>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup2.id1
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .rateprograms[2].rateProg
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup2.id2
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .rateprograms[3].rateProg
                                          }
                                        </span>
                                      </td>
                                    </tr>
                                    <tr className={styles.fieldHeight16}>
                                      <td className={styles.roomPoolsContainer}>
                                        {
                                          Settings.rateLoading.formFields
                                            .roomPoolGroup3.name
                                        }
                                      </td>
                                      <td>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup3.id1
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .rateprograms[4].rateProg
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup3.id2
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .rateprograms[5].rateProg
                                          }
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} className={styles.btnUpdate}>
                                <>&nbsp;</>
                                <>&nbsp;</>
                                <img
                                  id={
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .updateBtnId
                                  }
                                  className={sappAdmin ? styles.btnEvents : ""}
                                  onClick={(e) => {
                                    if (!sappAdmin) {
                                      contextType.onHotelCanModifyOrRateOfferUpdateHandler(
                                        e
                                      );
                                    }
                                  }}
                                  src={UpdateBtnImg}
                                />
                                <>&nbsp;</>
                                <>&nbsp;</>
                                <>&nbsp;</>
                                <>&nbsp;</>
                                <img
                                  id={
                                    Settings.rateLoading.rateOfferLookUpModal
                                      .removeBtnId
                                  }
                                  className={
                                    sappAdmin
                                      ? `${styles.btnEvents} ${styles.btnDelete}`
                                      : styles.btnDelete
                                  }
                                  onClick={(e) => {
                                    if (!sappAdmin) {
                                      contextType.onRemoveRateOfferAndRateProgramsHandler(
                                        e
                                      );
                                    }
                                  }}
                                  src={RemoveBtnImg}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>

                            <tr
                              className={
                                contextType.state.rateLoadingData
                                  .aer_account === Settings.rateLoading.yes
                                  ? styles.divShowDisplay
                                  : styles.divHideDisplay
                              }
                            >
                              <td colSpan={2}>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td
                                        colSpan={4}
                                        className={[
                                          styles.fieldWidth350,
                                          styles.fieldName,
                                        ].join(" ")}
                                      >
                                        {
                                          Settings.rateLoading.formFields
                                            .gppRateOfferAndRatePrograms
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={4}>
                                        <>&nbsp;</>
                                      </td>
                                    </tr>
                                    <tr className={styles.fieldHeight25}>
                                      <td
                                        colSpan={1}
                                        className={[
                                          styles.fieldWidth200New,
                                          styles.fieldName,
                                        ].join(" ")}
                                      >
                                        {
                                          Settings.rateLoading.formFields
                                            .rateOffers.name
                                        }
                                      </td>
                                      <td colSpan={3}>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .rateOffers.gppId
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .aerrateprograms[0].rateOfferName
                                          }
                                        </span>
                                      </td>
                                    </tr>
                                    <tr className={styles.fieldHeight16}>
                                      <td
                                        colSpan={4}
                                        className={styles.fieldName}
                                      >
                                        {
                                          Settings.rateLoading.formFields
                                            .ratePrograms.name
                                        }
                                      </td>
                                    </tr>
                                    <tr className={styles.fieldHeight16}>
                                      <td className={styles.roomPoolsContainer}>
                                        {
                                          Settings.rateLoading.formFields
                                            .roomPoolGroup1.name
                                        }
                                      </td>
                                      <td className={styles.fieldWidth50}>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup1.gpId1
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .aerrateprograms[0].rateProg
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        {" "}
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup1.gpId2
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .aerrateprograms[1].rateProg
                                          }
                                        </span>
                                      </td>
                                    </tr>
                                    <tr className={styles.fieldHeight16}>
                                      <td className={styles.roomPoolsContainer}>
                                        {
                                          Settings.rateLoading.formFields
                                            .roomPoolGroup2.name
                                        }
                                      </td>
                                      <td>
                                        {" "}
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup2.gpId1
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .aerrateprograms[2].rateProg
                                          }
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          id={
                                            Settings.rateLoading.formFields
                                              .roomPoolGroup2.gpId2
                                          }
                                        >
                                          {
                                            contextType.state.rateLoadingData
                                              .aerrateprograms[3].rateProg
                                          }
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        colSpan={3}
                                        className={styles.btnUpdate}
                                      >
                                        <>&nbsp;</>
                                        <>&nbsp;</>
                                        <img
                                          id={
                                            Settings.rateLoading
                                              .rateOfferLookUpModal
                                              .gppUpdateBtnId
                                          }
                                          className={
                                            sappAdmin ? styles.btnEvents : ""
                                          }
                                          src={UpdateBtnImg}
                                          onClick={(e) => {
                                            if (!sappAdmin) {
                                              contextType.onHotelCanModifyOrRateOfferUpdateHandler(
                                                e
                                              );
                                            }
                                          }}
                                        />
                                        <>&nbsp;</>
                                        <>&nbsp;</>
                                        <>&nbsp;</>
                                        <>&nbsp;</>
                                        <img
                                          id={
                                            Settings.rateLoading
                                              .rateOfferLookUpModal
                                              .gppRemoveBtnId
                                          }
                                          className={
                                            sappAdmin
                                              ? `${styles.btnEvents} ${styles.btnRemove}`
                                              : styles.btnRemove
                                          }
                                          onClick={(e) => {
                                            if (!sappAdmin) {
                                              contextType.onRemoveRateOfferAndRateProgramsHandler(
                                                e
                                              );
                                            }
                                          }}
                                          src={RemoveBtnImg}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>

                            <tr className={styles.fieldHeight25}>
                              <td className={styles.fieldName}>
                                {
                                  Settings.rateLoading.formFields
                                    .analysisReportOut.name
                                }
                              </td>
                              <td>
                                <CSelect
                                  id={
                                    Settings.rateLoading.formFields
                                      .analysisReportOut.id
                                  }
                                  keyField={
                                    Settings.rateLoading.formFields
                                      .analysisReportOut.key
                                  }
                                  valField={
                                    Settings.rateLoading.formFields
                                      .analysisReportOut.value
                                  }
                                  ddnOptions={Settings.rateLoading.yesNoList}
                                  selectedValue={
                                    contextType.state.rateLoadingData
                                      .analysisreportout
                                  }
                                  onChange={contextType.onAnalysisReportHandler}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td
                                className={[
                                  styles.textAreaAlign,
                                  styles.wrapCell,
                                  styles.fieldName,
                                ].join(" ")}
                              >
                                {
                                  Settings.rateLoading.formFields
                                    .internalPASNotes.name
                                }
                              </td>
                              <td>
                                <textarea
                                  cols={60}
                                  id={
                                    Settings.rateLoading.formFields
                                      .internalPASNotes.id
                                  }
                                  rows={11}
                                  className={styles.textAreaPASNotes}
                                  value={
                                    contextType.state.rateLoadingData
                                      .internalpasnotes == null
                                      ? ""
                                      : contextType.state.rateLoadingData
                                          .internalpasnotes
                                  }
                                  onKeyPress={(e) =>
                                    Util.checklen_onkeypress(e, 255)
                                  }
                                  onChange={
                                    contextType.onInternalPASNotesChangeHandler
                                  }
                                  onBlur={
                                    contextType.onInternalPASNotesBlurHandler
                                  }
                                ></textarea>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table>
                          <tbody>
                            <tr className={styles.fieldHeight25}>
                              <td className={styles.fieldName}>
                                {
                                  Settings.rateLoading.formFields
                                    .thirdPartyLogin.name
                                }
                              </td>
                              {sappAdmin ? (
                                <td>
                                  {contextType.state.rateLoadingData
                                      .set_id == null
                                      ? ""
                                      : contextType.state.rateLoadingData
                                          .set_id}
                                  
                                </td>
                              ) : (
                                <td>
                                  <input
                                    id={
                                      Settings.rateLoading.formFields
                                        .thirdPartyLogin.id
                                    }
                                    type="text"
                                    maxLength={75}
                                    size={57}
                                    value={
                                      contextType.state.rateLoadingData
                                      .set_id == null
                                      ? ""
                                      : contextType.state.rateLoadingData
                                          .set_id 
                                    }
                                    onChange={
                                      contextType.onThirdPartyLoginHandler
                                    }
                                  />
                                </td>
                              )}
                            </tr>
                            <tr className={styles.fieldHeight25}>
                              <td className={styles.fieldName}>
                                {
                                  Settings.rateLoading.formFields
                                    .thirdPartyPassword.name
                                }
                              </td>
                              {sappAdmin ? (
                                <td>
                                  {  
                                    contextType.state.rateLoadingData
                                      .rate_plan_id == null
                                      ? ""
                                      : contextType.state.rateLoadingData
                                          .rate_plan_id
                                  }
                                </td>
                              ) : (
                                <td>
                                  <input
                                    id={
                                      Settings.rateLoading.formFields
                                        .thirdPartyPassword.id
                                    }
                                    type="text"
                                    maxLength={20}
                                    size={30}
                                    value={
                                      contextType.state.rateLoadingData
                                      .rate_plan_id == null
                                      ? ""
                                      : contextType.state.rateLoadingData
                                          .rate_plan_id    
                                    }
                                    onChange={
                                      contextType.onThirdPartyPasswordHandler
                                    }
                                  />
                                </td>
                              )}
                            </tr>
                            <tr>
                              <td>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <>&nbsp;</>
                              </td>
                            </tr>
                            <tr>
                              <td className={styles.fieldName}>
                                {
                                  Settings.rateLoading.formFields
                                    .rateLoadInstructionsSubmittedToGDS.name
                                }
                              </td>

                              {sappAdmin ? (
                                <td>
                                  {contextType.state.rateLoadingData
                                    .rateLoadInstructionsGDS === "Y"
                                    ? Settings.sappAdmin.Yes
                                    : Settings.sappAdmin.No}
                                </td>
                              ) : (
                                <td>
                                  <CSelect
                                    id={
                                      Settings.rateLoading.formFields
                                        .rateLoadInstructionsSubmittedToGDS.id
                                    }
                                    keyField={
                                      Settings.rateLoading.formFields
                                        .rateLoadInstructionsSubmittedToGDS.key
                                    }
                                    valField={
                                      Settings.rateLoading.formFields
                                        .rateLoadInstructionsSubmittedToGDS
                                        .value
                                    }
                                    ddnOptions={Settings.rateLoading.yesNoList}
                                    selectedValue={
                                      contextType.state.rateLoadingData
                                        .rateLoadInstructionsGDS
                                    }
                                    onChange={
                                      contextType.onRateLoadINstructionsHandler
                                    }
                                  />
                                </td>
                              )}
                            </tr>
                            <tr>
                              <td
                                className={[
                                  styles.textAreaAlign,
                                  styles.wrapCell,
                                  styles.fieldName,
                                ].join(" ")}
                              >
                                {
                                  Settings.rateLoading.formFields
                                    .rateLoadingNotes.name
                                }
                              </td>
                              <td>
                                <textarea
                                  cols={60}
                                  id={
                                    Settings.rateLoading.formFields
                                      .rateLoadingNotes.id
                                  }
                                  rows={10}
                                  className={styles.textAreaRateNotes}
                                  value={
                                    contextType.state.rateLoadingData
                                      .rateLoadingNotes == null
                                      ? ""
                                      : contextType.state.rateLoadingData
                                          .rateLoadingNotes
                                  }
                                  onKeyPress={(e) =>
                                    Util.checklen_onkeypress(e, 255)
                                  }
                                  onChange={
                                    contextType.onRateLoadingNotesChangeHandler
                                  }
                                  onBlur={
                                    contextType.onRateLoadingNotesBlurHandler
                                  }
                                ></textarea>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <CModal
                        title={Settings.rateLoading.formFields.modal.modalTitle}
                        show={contextType.state.showRpgmModal}
                        styles={{ zIndex: 1005 }}
                        onClose={contextType.showRpgmModal}
                        xPosition={
                          contextType.state.hasRpForModal
                            ? Settings.rateLoading.formFields.modal
                                .rpgm1ModalXPosition
                            : Settings.rateLoading.formFields.modal
                                .rpgm2ModalXPosition
                        }
                        yPosition={
                          Settings.rateLoading.formFields.modal
                            .rpgmModalYPosition
                        }
                      >
                        <Suspense fallback={<CSuspense />}>
                          <div className={styles.modalMessage}>
                            {contextType.state.hasRpForModal
                              ? Settings.rateLoading.formFields.modal
                                  .modalMessageString1 +
                                contextType.state.preRequisite +
                                Settings.rateLoading.formFields.modal
                                  .modalMessageString2 +
                                contextType.state.current
                              : Settings.rateLoading.formFields.modal
                                  .modalMessage2}
                          </div>
                        </Suspense>
                      </CModal>

                      {
                        <div className={styles.dataTableDiv}>
                          <CDataTable
                            id="gridTableViewRate"
                            columns={columns}
                            value={contextType.state.rateLoadingData.brands}
                            sortField={
                              Settings.rateLoading.tableColumns.affiliationname
                                .field
                            }
                            sortOrder={1}
                          />
                          <style>
                            {`
                                .p-datatable-scrollable-body{
                                  overflow-y: auto !important;
                                  overflow-x:hidden !important;
                                  height: calc(100vh - 230px)
                                }
                                .p-datatable .p-datatable-tbody > tr:nth-child(even) {
                                  height: 27.3333px !important;
                                  border: 2px solid #c5c5c5 !important ;
                                }
                                .p-datatable .p-datatable-tbody > tr:nth-child(odd) {
                                  height: 27.3333px !important;
                                  border: 2px solid #c5c5c5 !important ;
                                }
                                .p-datatable .p-datatable-tbody > tr > td {
                                  border-color: #ddd !important;
                                }`}
                          </style>
                        </div>
                      }
                      <CModal
                        title={Settings.rateLoading.formFields.modal.modalTitle}
                        closeImgTitle={Settings.rateLoading.closeMessageBox}
                        show={contextType.state.floatDefPerModal}
                        onClose={contextType.floatDefPerModal}
                        xPosition={
                          Settings.rateLoading.formFields.modal
                            .rpgm1ModalXPosition
                        }
                        yPosition={
                          Settings.rateLoading.formFields.modal
                            .rpgmModalYPosition
                        }
                      >
                        <Suspense fallback={<CSuspense />}>
                          <div className={styles.modalMessage}>
                            {Settings.rateLoading.floatDefaultPercentAlertMsg2}
                          </div>
                        </Suspense>
                      </CModal>
                      {contextType.state.showRpgmModal && (
                        <div className={styles.errorBg}></div>
                      )}
                      <style>
                        {`
                          @media only screen and (min-width: 940px) {
                            .textNormal {
                              white-space: nowrap !important;
                            }
                          }
                          .p-datepicker{
                            padding : 0px !important;
                            border-radius : 3px;
                          }
                          .p-datepicker-inline {
                            flex-direction: column;
                            position: absolute;
                          }
                          .p-datepicker-header{
                            background: #e9e9e9 !important;
                            border-radius: 3px !important;
                            padding: 0px !important
                          }
                          .p-datepicker-group{
                            padding: 3px !important;
                          }
                          .p-datepicker-month{
                            height: 20px;
                            margin-right: 0px !important;
                          }
                          .p-datepicker table{
                            font-size: 11px;
                            margin: 0px !important;
                            border-collapse: unset !important;
                          }
                          .p-datepicker table td {
                            padding: 0px !important;
                          }
                          .p-datepicker table td span{
                            border: 1px solid #c5c5c5 !important;
                            justify-content: flex-end !important;
                            border-radius : 0px !important;
                            width: 1.7rem !important;
                            height: 1.2rem !important;
                            padding 3px !important;                          
                          }
                          .p-datepicker table td.p-datepicker-today > span{
                            background: #fffa90;
                          }
                          .p-disabled{
                            display: none !important;
                          }
                          .p-inputtext{
                            width: 75px !important;
                            height: 15px;
                            border-radius: 2px !important;
                            font-size: 11px !important;
                            padding: 0px;
                          }
                          .p-datepicker .p-datepicker-header .p-datepicker-prev:focus,
                          .p-datepicker .p-datepicker-header .p-datepicker-next:focus{
                            box-shadow: none !important;
                          }
                          .p-datepicker .p-datepicker-header .p-datepicker-prev:enabled:hover,
                          .p-datepicker .p-datepicker-header .p-datepicker-next:enabled:hover{
                            color: #e9e9e9 !important;
                          }
                          .p-datepicker .p-datepicker-header .p-datepicker-title select:focus{
                            box-shadow: none !important;
                            border-color: #000000 !important;
                          }
                          .pi-chevron-left:before{
                            content: "\\e928";
                            background: #000000;
                            border-color: transparent !important;
                            border-radius: 50%;
                          }
                          .pi-chevron-right:before{
                            content: "\\e92a";
                            background: #000000;
                            border-color: transparent !important;
                          border-radius: 50%;
                          }
                          .p-column-title{
                            position : absolute;
                          }
                          .p-datatable .p-sortable-column.p-highlight .p-sortable-column-icon{
                            float: right;
                            font-size : 10px
                          }
                          .pi-sort-alt:before {
                           content: "";
                          }
                        .pi-sort-amount-up-alt:before {
                            color: #000;
                            content: "\\25B2";
                        }
                        .pi-sort-amount-down:before {
                            content: "\\25BC";
                          color: #000;
                        }
                        `}
                      </style>
                    </React.Fragment>
                  </>
                );
              }}
            </RateLoadingContext.Consumer>
          );
        }}
      </AccountListContext.Consumer>
    );
  }
}
