import React, { useEffect, useContext } from "react";
import DeleteBtnImg from "../../../../../../common/assets/img/btnDelete.gif";
import BookingCostImg from "../../../../../../common/assets/img/bt_booking_cost.png";
import styles from "./CriticalFields.css";
import Settings from "./static/Settings";
import API from "./service/API";
import accountAPI from "../../../service/API";
import Utils from "../../../../../../common/utils/Utils";
import CSelect from "../../../../../../common/components/CSelect";
import CriticalFieldsContext from "./context/CriticalFieldsContext";
import AccountListContext from "../../../context/AccountListContext";
import CCalendar from "../../../../../../common/components/CCalendar";
import { useHistory, useLocation } from "react-router-dom";
import screenLoader from "../../../../../../common/assets/img/screenloader.gif";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../common/components/ApplicationContext";
//import { CLoader } from "../../../../../../common/components/CLoader";
let contextType = null;
let parentContextType = null;
let accountRecId = null;
let period = null;

export default function CriticalFields() {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const urlParms = useLocation().search;
  const isNew = new URLSearchParams(urlParms).get("isNew");
  useEffect(() => {
    const currPeriod = JSON.parse(
      sessionStorage.getItem("localAccountListData")
    );
    if (parentContextType.state.accountListData.selectedAccount.accountrecid) {
      sessionStorage.setItem(
        "accountsDataRecId",
        parentContextType.state.accountListData.selectedAccount.accountrecid
      );
    }
    console.log("recid", sessionStorage.getItem("accountsDataRecId"));
    accountRecId = parentContextType.state.accountListData.selectedAccount
      .accountrecid
      ? parentContextType.state.accountListData.selectedAccount.accountrecid
      : sessionStorage.getItem("accountsDataRecId");
    period = parentContextType.state.accountListData.selectedAccount.period
      ? parentContextType.state.accountListData.selectedAccount.period
      : sessionStorage.getItem("accountsDataPeriod");
    contextType.setLoader();
    if (!parentContextType.state.isCopyFromExistingAccount && isNew) {
      accountRecId = 0;
      contextType.OnChangevalidationCheck();
    }

    if (period == null) {
      period = currPeriod?.period;
    }

    API.getCriticalFields(accountRecId, period).then((data) => {
      if (
        (data.accountDetailGeneral !== null &&
          data.accountDetailGeneral.nosquatter === null) ||
        data.accountDetailGeneral.nosquatter === ""
      ) {
        data.accountDetailGeneral.nosquatter = "N";
      }
      contextType.setCriticalFieldsData(data);
      sessionStorage.setItem(
        "accountsDataRecId",
        data.accountDetailGeneral.accountrecid
      );
      sessionStorage.setItem("accountsDataPeriod", data.periodDetails.period);
      sessionStorage.setItem(
        "accountsDataName",
        data.accountDetailGeneral.accountname
      );
      if (data.shortContractend !== "") {
        appContext.setEndDateEmpty(false);
      } else {
        appContext.setEndDateEmpty(true);
      }
      if (data.shortContractstart !== "") {
        appContext.setStartDateEmpty(false);
      } else {
        appContext.setStartDateEmpty(true);
      }
      contextType.resetLoader();
      contextType.warningCheckDueDate();
    });
    return () => {
      if (contextType.state.formChg) {
        contextType.onAutoSaveData();
      }
      if (!appContext?.user) {
        accountAPI.getUserDetails().then((data) => {
          parentContextType.state.roleDetails.eid = data.user.eid;
          parentContextType.state.roleDetails.email = data.user.email;
          parentContextType.state.roleDetails.fullName = data.user.fullName;
          parentContextType.state.roleDetails.role = data.user.role;
          contextType.resetLoader();
        });
      } else {
        parentContextType.state.roleDetails.eid = appContext?.user.eid;
        parentContextType.state.roleDetails.email = appContext?.user.email;
        parentContextType.state.roleDetails.fullName =
          appContext?.user.fullName;
        parentContextType.state.roleDetails.role = appContext?.user.role;
        contextType.resetLoader();
      }
      parentContextType.state.isCopyFromExistingAccount = true;
      sessionStorage.setItem("isCopyFromExistingAccount", "true");
      contextType.componentUnload();
      contextType.resetLoader();
    };
  }, []);

  const onDeleteBtnImgClickHandler = () => {
    API.deleteAccount(accountRecId).then(() => {
      history.push(
        `/accountmaintenance/${Settings.criticalFieldsTab.accountListPath}`
      );
    });
  };

  return (
    <AccountListContext.Consumer>
      {(accountListContext) => {
        parentContextType = accountListContext;
        return (
          <CriticalFieldsContext.Consumer>
            {(criticalFieldsContext) => {
              contextType = criticalFieldsContext;
              return (
                <>
                  {contextType.state.showScreenLoader ? (
                    <div id="loading" className={styles.accountTabLoader}>
                      <div>
                        <img src={screenLoader}></img>
                      </div>
                    </div>
                  ) : null}
                  <table className={styles.mainTable}>
                    <tbody>
                      <tr>
                        <td className={styles.deleteBtn}>
                          {contextType.state.criticalFieldsData
                            .criticalFieldAccountDetails.accountDetailGeneral
                            .hasRecs ===
                            Settings.criticalFieldsTab.labels.yes ||
                          !parentContextType.state.isCopyFromExistingAccount ? (
                            ""
                          ) : (
                            <img
                              src={DeleteBtnImg}
                              alt={
                                Settings.criticalFieldsTab.labels.altBtnDelete
                              }
                              onClick={onDeleteBtnImgClickHandler}
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ display: "block" }}>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .accountName.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            <span
                                              className={styles.fieldNameSapp}
                                            >
                                              {
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accountname
                                              }
                                            </span>
                                          ) : (
                                            <input
                                              id={
                                                Settings.criticalFieldsTab
                                                  .labels.accountName.id
                                              }
                                              value={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accountname
                                              }
                                              className={styles.inputText}
                                              maxLength={
                                                Settings.criticalFieldsTab
                                                  .labels.maxLength
                                              }
                                              onChange={
                                                contextType.onAccountNameChangeHandler
                                              }
                                              onBlur={contextType.acc_onchange}
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .marshaAcountName.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            <span
                                              className={styles.fieldNameSapp}
                                            >
                                              {
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .rpgm_accountname
                                              }
                                            </span>
                                          ) : (
                                            <input
                                              id={
                                                Settings.criticalFieldsTab
                                                  .labels.marshaAcountName.id
                                              }
                                              value={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .rpgm_accountname
                                              }
                                              className={styles.inputText}
                                              maxLength={
                                                Settings.criticalFieldsTab
                                                  .labels.maxLength
                                              }
                                              onChange={
                                                contextType.onAccountNameChangeHandler
                                              }
                                              onKeyPress={(event) =>
                                                Utils.marshaSafeCharsOnly(event)
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .accountPricingType.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountPricingTypeList.map(
                                              (item) => {
                                                if (
                                                  item.accountpricingtype ===
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .accountpricingtype
                                                ) {
                                                  return (
                                                    <span
                                                      className={
                                                        styles.fieldNameSapp
                                                      }
                                                    >
                                                      {item.accountpricing}
                                                    </span>
                                                  );
                                                }
                                              }
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.accountpricingtype"
                                              className={styles.selectBox}
                                              onChange={
                                                contextType.onAccountPricingTypeChangeHandler
                                              }
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.accountPricingType.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.accountPricingType
                                                  .value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accountpricingtype
                                              }
                                              ddnOptions={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDropDowns
                                                  .accountPricingTypeList
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .segment.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountSegmentList.map(
                                              (item) => {
                                                if (
                                                  item.accounttype ===
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .accounttype
                                                ) {
                                                  return (
                                                    <span
                                                      className={
                                                        styles.fieldNameSapp
                                                      }
                                                    >
                                                      {
                                                        item.accounttypedescription
                                                      }
                                                    </span>
                                                  );
                                                }
                                              }
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.accounttype"
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.segment.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.segment.value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accounttype
                                              }
                                              className={styles.selectBox}
                                              onChange={
                                                contextType.onSegmentChangeHandler
                                              }
                                              ddnOptions={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDropDowns
                                                  .accountSegmentList
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .hotelViewerShip.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .account_hotel_view === "S" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Only Solicited Hotels
                                              </span>
                                            ) : contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .account_hotel_view === "A" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                All Hotels
                                              </span>
                                            ) : (
                                              " "
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.account_hotel_view"
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.hotelViewerShip.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.hotelViewerShip.value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .account_hotel_view
                                              }
                                              onChange={
                                                contextType.onHotelViewChangeHandler
                                              }
                                              ddnOptions={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDropDowns
                                                  .accountHotelViewList
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          <div>
                                            {
                                              Settings.criticalFieldsTab.labels
                                                .btBookingCost.name
                                            }
                                            <img src={BookingCostImg} />
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            id={
                                              Settings.criticalFieldsTab.labels
                                                .btBookingCost.btReadId
                                            }
                                            className={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .hotel_display ===
                                              Settings.criticalFieldsTab.labels
                                                .yes
                                                ? styles.divShowDisplay
                                                : styles.divHideDisplay
                                            }
                                          >
                                            <label>
                                              {contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .bt_booking_cost ===
                                              Settings.criticalFieldsTab.labels
                                                .yes
                                                ? Settings.criticalFieldsTab
                                                    .labels.yesDesc
                                                : Settings.criticalFieldsTab
                                                    .labels.noDesc}
                                            </label>
                                          </div>
                                          <div
                                            id={
                                              Settings.criticalFieldsTab.labels
                                                .btBookingCost.btSelectId
                                            }
                                            className={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .hotel_display ===
                                              Settings.criticalFieldsTab.labels
                                                .no
                                                ? styles.divShowDisplay
                                                : styles.divHideDisplay
                                            }
                                          >
                                            {appContext.user.role ==
                                              "MFPAPADM" &&
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .accountpricingtype !== "P" &&
                                            (!isNew ||
                                              parentContextType.state
                                                .isCopyFromExistingAccount) ? (
                                              ""
                                            ) : (
                                              <CSelect
                                                id={
                                                  Settings.criticalFieldsTab
                                                    .labels.btBookingCost.id
                                                }
                                                keyField={
                                                  Settings.criticalFieldsTab
                                                    .labels.btBookingCost.key
                                                }
                                                valField={
                                                  Settings.criticalFieldsTab
                                                    .labels.btBookingCost.value
                                                }
                                                selectedValue={
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .bt_booking_cost
                                                }
                                                className={styles.selectBox48}
                                                onChange={
                                                  contextType.onbtBookingCostChangeHandler
                                                }
                                                ddnOptions={
                                                  Settings.criticalFieldsTab
                                                    .btBookingYesNoList
                                                }
                                              />
                                            )}
                                          </div>
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
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .accountPricingCycle.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountPricingCycleList.map(
                                              (item) => {
                                                if (
                                                  item.accountpricingcycleid ===
                                                  Number(
                                                    contextType.state
                                                      .criticalFieldsData
                                                      .criticalFieldAccountDetails
                                                      .accountDetailGeneral
                                                      .accountpricingcycleid
                                                  )
                                                ) {
                                                  return (
                                                    <span
                                                      className={
                                                        styles.fieldNameSapp
                                                      }
                                                    >
                                                      {
                                                        item.accountpricingcycleid
                                                      }
                                                    </span>
                                                  );
                                                }
                                              }
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.accountpricingcycleid"
                                              className={styles.selectBox115}
                                              onChange={
                                                contextType.onPricingCycleChangeHandler
                                              }
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.accountPricingCycle
                                                  .key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.accountPricingCycle
                                                  .value
                                              }
                                              selectedValue={Number(
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accountpricingcycleid
                                              )}
                                              ddnOptions={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDropDowns
                                                  .accountPricingCycleList
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .offCycleLogic.name
                                          }
                                        </td>
                                        <td>
                                          {(appContext.user.role ==
                                            "MFPAPADM" &&
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .accountpricingtype !== "P" &&
                                            (!isNew ||
                                              parentContextType.state
                                                .isCopyFromExistingAccount)) ||
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .offcycleaccountcanchange ===
                                            "N" ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral.offcycle ==
                                            "N" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                No
                                              </span>
                                            ) : (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Yes
                                              </span>
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.offcycle"
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.offCycleLogic.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.offCycleLogic.value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral.offcycle
                                              }
                                              className={styles.selectBox48}
                                              onChange={
                                                contextType.onOffCycleChangeHandler
                                              }
                                              ddnOptions={
                                                Settings.criticalFieldsTab
                                                  .yesNoList
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td colSpan={2}>
                                          <table>
                                            <tbody>
                                              <tr>
                                                <td
                                                  className={styles.fieldName}
                                                >
                                                  {
                                                    Settings.criticalFieldsTab
                                                      .labels.startDate.name
                                                  }
                                                </td>
                                                {(appContext.user.role ==
                                                  "MFPAPADM" &&
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .accountpricingtype !==
                                                    "P" &&
                                                  (!isNew ||
                                                    parentContextType.state
                                                      .isCopyFromExistingAccount)) ||
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .offcycleaccountcanchange ===
                                                  "N" ? (
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .shortContractstart
                                                ) : (
                                                  <div
                                                    className={
                                                      styles.startDateCalendar
                                                    }
                                                    title={
                                                      Settings.criticalFieldsTab
                                                        .title
                                                    }
                                                  >
                                                    <CCalendar
                                                      id={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.startDate
                                                          .calId
                                                      }
                                                      inputId={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.startDate.id
                                                      }
                                                      value={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .shortContractstart ===
                                                        undefined
                                                          ? ""
                                                          : Utils.convertStrToDate(
                                                              contextType.state
                                                                .criticalFieldsData
                                                                .criticalFieldAccountDetails
                                                                .shortContractstart
                                                            )
                                                      }
                                                      onHide={
                                                        contextType.onStartDateHideHandler
                                                      }
                                                      onInput={
                                                        contextType.onStartDateInputHandler
                                                      }
                                                      onChange={(e) =>
                                                        contextType.onChangeCalendar(
                                                          e
                                                        )
                                                      }
                                                      disabled={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDetailGeneral
                                                          .offcycle ===
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.no
                                                          ? true
                                                          : false
                                                      }
                                                      onBlur={(e) =>
                                                        contextType.onDateBlurHandler(
                                                          e,
                                                          "shortContractstart"
                                                        )
                                                      }
                                                      hasCustomMonth={true}
                                                    />
                                                    <style>{`
                                                    .p-disabled, .p-component:disabled {
                                                      opacity:0.9;                                      
                                                      border-color: rgba(118, 118, 118, 0.3)rgba(118, 118, 118, 0.3);
                                                      background-color: rgba(239, 239, 239, 0.3);
                                                      color: rgb(84, 84, 84);
                                                    }
                                                    `}</style>
                                                  </div>
                                                )}

                                                <td
                                                  className={[
                                                    styles.fieldName,
                                                    styles.endDateMargin,
                                                  ].join(" ")}
                                                >
                                                  {
                                                    Settings.criticalFieldsTab
                                                      .labels.endDate.name
                                                  }
                                                </td>
                                                {(appContext.user.role ==
                                                  "MFPAPADM" &&
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .accountpricingtype !==
                                                    "P" &&
                                                  (!isNew ||
                                                    parentContextType.state
                                                      .isCopyFromExistingAccount)) ||
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .offcycleaccountcanchange ===
                                                  "N" ? (
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .shortContractend
                                                ) : (
                                                  <div
                                                    className={
                                                      styles.endDateCalendar
                                                    }
                                                    title={
                                                      Settings.criticalFieldsTab
                                                        .title
                                                    }
                                                  >
                                                    <CCalendar
                                                      id={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.endDate.calId
                                                      }
                                                      inputId={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.endDate.id
                                                      }
                                                      onChange={
                                                        contextType.onChangeCalendar
                                                      }
                                                      value={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .shortContractend ===
                                                        undefined
                                                          ? ""
                                                          : Utils.convertStrToDate(
                                                              contextType.state
                                                                .criticalFieldsData
                                                                .criticalFieldAccountDetails
                                                                .shortContractend
                                                            )
                                                      }
                                                      onHide={
                                                        contextType.onEndDateHideHandler
                                                      }
                                                      onInput={
                                                        contextType.onEndDateInputHandler
                                                      }
                                                      disabled={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDetailGeneral
                                                          .offcycle ===
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.no
                                                          ? true
                                                          : false
                                                      }
                                                      onBlur={(e) =>
                                                        contextType.onDateBlurHandler(
                                                          e,
                                                          "shortContractend"
                                                        )
                                                      }
                                                      hasCustomMonth={true}
                                                    />
                                                    <style>{`
                                                  .p-disabled, .p-component:disabled {
                                                    opacity:0.9;                                      
                                                    border-color: rgba(118, 118, 118, 0.3)rgba(118, 118, 118, 0.3);
                                                    background-color: rgba(239, 239, 239, 0.3);
                                                    color: rgb(84, 84, 84);
                                                  }
                                                `}</style>
                                                  </div>
                                                )}
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .maxSeasons.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            <span
                                              className={styles.fieldNameSapp}
                                            >
                                              {
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .offcycle_numseasons
                                              }
                                            </span>
                                          ) : (
                                            <input
                                              type="text"
                                              id="accountDetailGeneral.offcycle_numseasons"
                                              disabled={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .offcycle ===
                                                Settings.criticalFieldsTab
                                                  .labels.no
                                                  ? true
                                                  : false
                                              }
                                              defaultValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .offcycle_numseasons
                                              }
                                              value={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .offcycle_numseasons
                                              }
                                              className={styles.inputText20}
                                              maxLength={1}
                                              onKeyPress={null}
                                              onChange={(e) =>
                                                contextType.onMaxSeasonsChangeHandler(
                                                  e
                                                )
                                              }
                                              onBlur={
                                                contextType.onMaxSeasonsBlurHandler
                                              }
                                            />
                                          )}
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
                                        <td
                                          className={[
                                            styles.fieldName,
                                            styles.policyLabel,
                                          ].join(" ")}
                                        >
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .accountCancellationPolicy.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.alternateCancPolicyList.map(
                                              (item) => {
                                                if (
                                                  item.altcancelpolicyid ===
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .altcancelpolicyid
                                                ) {
                                                  return (
                                                    <span
                                                      className={
                                                        styles.fieldNameSapp
                                                      }
                                                    >
                                                      {item.altcancelpolicy}
                                                    </span>
                                                  );
                                                }
                                              }
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.altcancelpolicyid"
                                              onChange={
                                                contextType.onAltCanPolicyChangehandler
                                              }
                                              className={styles.selectBox115}
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels
                                                  .accountCancellationPolicy.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels
                                                  .accountCancellationPolicy
                                                  .value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .altcancelpolicyid
                                              }
                                              ddnOptions={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDropDowns
                                                  .alternateCancPolicyList
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr
                                        className={[
                                          styles.fieldName,
                                          styles.divHideDisplay,
                                        ].join(" ")}
                                      >
                                        <td id="canoption">
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .cancellationOption.name
                                          }
                                        </td>
                                        <td>
                                          <div id="div_canoption">
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {/*TODO 
                                                            <CSelect
                                                              id="accountDetailGeneral.altcancelpolicyoptionid"
                                                              onChange={
                                                                this.onChangeHandler
                                                              }
                                                              className={
                                                                styles.selectBox140
                                                              }
                                                              keyField={
                                                                Settings.criticalFieldsTab
                                                                  .labels.cancellationOption
                                                                  .key
                                                              }
                                                              valField={
                                                                Settings.criticalFieldsTab
                                                                  .labels.cancellationOption
                                                                  .value
                                                              }
                                                              selectedValue={
                                                                contextType.state
                                                                  .criticalFieldsData
                                                                  .criticalFieldAccountDetails
                                                                  .accountDetailGeneral
                                                                  .altcancelpolicyoptionid
                                                              }
                                                              ddnOptions={
                                                                contextType.state
                                                                  .criticalFieldsData
                                                                  .criticalFieldAccountDetails
                                                                  .accountDropDowns
                                                                  .alternateCancPolicyOptionList
                                                          }
                                                        />
                                                        */}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr
                                        className={[
                                          styles.fieldName,
                                          styles.divHideDisplay,
                                        ].join(" ")}
                                      >
                                        <td id="cantime">
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .cancellationTime.name
                                          }
                                        </td>
                                        <td>
                                          <div id="div_canctime">
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {/*TODO
                                                         <CSelect
                                                          id="accountDetailGeneral.altcancelpolicytimeid"
                                                          onChange={
                                                            this.onChangeHandler
                                                          }
                                                          className={
                                                            styles.selectBox140
                                                          }
                                                          keyField={
                                                            Settings.criticalFieldsTab
                                                              .labels.cancellationTime
                                                              .key
                                                          }
                                                          valField={
                                                            Settings.criticalFieldsTab
                                                              .labels.cancellationTime
                                                              .value
                                                          }
                                                          selectedValue={
                                                            contextType.state
                                                              .criticalFieldsData
                                                              .criticalFieldAccountDetails
                                                              .accountDetailGeneral
                                                              .altcancelpolicytimeid
                                                          }
                                                          ddnOptions={
                                                            contextType.state
                                                              .criticalFieldsData
                                                              .criticalFieldAccountDetails
                                                              .accountDropDowns
                                                              .alternateCancPolicyTimeList
                                                          }
                                                        /> */}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr
                                        className={
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .altcancelpolicyid ===
                                            Settings.criticalFieldsTab.labels
                                              .accountCancellationPolicy
                                              .policy2 ||
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .altcancelpolicyid ===
                                            Settings.criticalFieldsTab.labels
                                              .accountCancellationPolicy.policy3
                                            ? styles.policyNotesLabel
                                            : styles.divHideDisplay
                                        }
                                      >
                                        <td
                                          id={
                                            Settings.criticalFieldsTab.labels
                                              .accountCancellationPolicy.id1
                                          }
                                          className={[styles.fieldName].join(
                                            " "
                                          )}
                                        >
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .accountCancellationPolicyNotes
                                              .name
                                          }
                                        </td>
                                        <td>
                                          <div
                                            id={
                                              Settings.criticalFieldsTab.labels
                                                .accountCancellationPolicy.id1
                                            }
                                          >
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <textarea
                                                      cols={60}
                                                      id="accountDetailGeneral.altcancelpolicynotes"
                                                      rows={10}
                                                      onKeyPress={(e) =>
                                                        Utils.checklen_onkeypress(
                                                          e,
                                                          Settings
                                                            .criticalFieldsTab
                                                            .labels
                                                            .accountCancellationPolicyNotes
                                                            .max_length
                                                        )
                                                      }
                                                      className={
                                                        styles.policyNotesTextArea
                                                      }
                                                      value={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDetailGeneral
                                                          .altcancelpolicynotes
                                                      }
                                                      onChange={
                                                        contextType.onAltCanPolicyNotesChangeHandler
                                                      }
                                                      onBlur={
                                                        contextType.onAltCanPolicyNotesBlurHandler
                                                      }
                                                    ></textarea>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
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
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .enhancedPGOOS.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .allowEnhanced === "N" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                No
                                              </span>
                                            ) : (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Yes
                                              </span>
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.allowEnhanced"
                                              className={styles.selectBox48}
                                              onChange={
                                                contextType.onEnhancedPGOOSChangeHandler
                                              }
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.enhancedPGOOS.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.enhancedPGOOS.value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .allowEnhanced
                                              }
                                              ddnOptions={
                                                Settings.criticalFieldsTab
                                                  .yesNoList
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan={2}>
                                          <div
                                            id="divEnhancedDiscount"
                                            className={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .allowEnhanced ===
                                              Settings.criticalFieldsTab.labels
                                                .yes
                                                ? styles.divShowDisplay
                                                : styles.divHideDisplay
                                            }
                                          >
                                            <table>
                                              <tbody>
                                                <tr
                                                  className={
                                                    styles.fieldHeight25
                                                  }
                                                >
                                                  <td
                                                    className={[
                                                      styles.labelSpace,
                                                      styles.fieldName,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.criticalFieldsTab
                                                        .labels.enhancedDiscount
                                                    }
                                                  </td>
                                                  <td>
                                                    <input
                                                      id="accountDetailGeneral.enhancedDiscount"
                                                      value={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDetailGeneral
                                                          .enhancedDiscount
                                                      }
                                                      className={
                                                        styles.inputText20
                                                      }
                                                      maxLength={3}
                                                      size={100}
                                                      onChange={
                                                        contextType.onEnhancedDiscountChangeHandler
                                                      }
                                                      onBlur={
                                                        contextType.onEnhancedDiscountBlurHandler
                                                      }
                                                    />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <div
                                            id="divEnhancedDiscountGpp"
                                            className={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .allowEnhanced ===
                                                Settings.criticalFieldsTab
                                                  .labels.yes &&
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .aer_account ===
                                                Settings.criticalFieldsTab
                                                  .labels.yes
                                                ? styles.divShowDisplay
                                                : styles.divHideDisplay
                                            }
                                          >
                                            <table>
                                              <tbody>
                                                <tr
                                                  className={
                                                    styles.fieldHeight25
                                                  }
                                                >
                                                  <td
                                                    className={[
                                                      styles.labelSpace,
                                                      styles.fieldName,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.criticalFieldsTab
                                                        .labels
                                                        .gppEnhancedDiscount
                                                    }
                                                  </td>
                                                  <td>
                                                    <input
                                                      id="accountDetailGeneral.enhancedDiscountGpp"
                                                      value={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDetailGeneral
                                                          .enhancedDiscountGpp
                                                      }
                                                      className={
                                                        styles.inputText20
                                                      }
                                                      maxLength={3}
                                                      size={100}
                                                      onChange={
                                                        contextType.onGppEnhancedDiscountChangeHandler
                                                      }
                                                      onBlur={
                                                        contextType.onGppEnhancedDiscountBlurHandler
                                                      }
                                                    />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
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

                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .gppAccount.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .aer_account === "N" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                No
                                              </span>
                                            ) : (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Yes
                                              </span>
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.aer_account"
                                              className={styles.selectBox48}
                                              onChange={
                                                contextType.onGppAccountChangeHandler
                                              }
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.gppAccount.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.gppAccount.value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .aer_account
                                              }
                                              ddnOptions={
                                                Settings.criticalFieldsTab
                                                  .yesNoList
                                              }
                                              isDisabled={
                                                (contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accountpricingtype ===
                                                  Settings.criticalFieldsTab
                                                    .labels.accountPricingType
                                                    .typeL ||
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .accountpricingtype ===
                                                    Settings.criticalFieldsTab
                                                      .labels.accountPricingType
                                                      .typeP) &&
                                                contextType.state
                                                  .criticalFieldsData.retCode
                                                  ? true
                                                  : false
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan={2}>
                                          <div
                                            className={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .accountpricingtype ===
                                                Settings.criticalFieldsTab
                                                  .labels.accountPricingType
                                                  .typeL ||
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .accountpricingtype ===
                                                Settings.criticalFieldsTab
                                                  .labels.accountPricingType
                                                  .typeP ||
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .aer_account ===
                                                Settings.criticalFieldsTab
                                                  .labels.no
                                                ? styles.divHideDisplay
                                                : styles.divShowDisplay
                                            }
                                          >
                                            <table>
                                              <tbody>
                                                <tr
                                                  className={[
                                                    styles.fieldHeight25,
                                                  ].join(" ")}
                                                >
                                                  <td
                                                    className={[
                                                      styles.labelSpace,
                                                      styles.fieldName,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.criticalFieldsTab
                                                        .labels.gppPercent.name
                                                    }
                                                  </td>
                                                  <td>
                                                    <CSelect
                                                      id="accountDetailGeneral.default_percent"
                                                      className={
                                                        styles.selectBox41
                                                      }
                                                      onChange={
                                                        contextType.onGppPercentChangeHandler
                                                      }
                                                      keyField={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.gppPercent.key
                                                      }
                                                      valField={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.gppPercent
                                                          .value
                                                      }
                                                      selectedValue={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDetailGeneral
                                                          .default_percent
                                                      }
                                                      ddnOptions={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDropDowns
                                                          .allowableAerPercentsList
                                                      }
                                                    />
                                                  </td>
                                                </tr>
                                                <tr
                                                  className={[
                                                    styles.fieldHeight25,
                                                  ].join(" ")}
                                                >
                                                  <td
                                                    className={[
                                                      styles.labelSpace,
                                                      styles.fieldName,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.criticalFieldsTab
                                                        .labels
                                                        .discountFirstTierOnly
                                                        .name
                                                    }
                                                  </td>
                                                  <td>
                                                    {appContext.user.role ==
                                                      "MFPAPADM" &&
                                                    contextType.state
                                                      .criticalFieldsData
                                                      .criticalFieldAccountDetails
                                                      .accountDetailGeneral
                                                      .accountpricingtype !==
                                                      "P" &&
                                                    (!isNew ||
                                                      parentContextType.state
                                                        .isCopyFromExistingAccount) ? (
                                                      contextType.state
                                                        .criticalFieldsData
                                                        .criticalFieldAccountDetails
                                                        .accountDetailGeneral
                                                        .discfirsttieronly ===
                                                      "N" ? (
                                                        <span
                                                          className={
                                                            styles.fieldNameSapp
                                                          }
                                                        >
                                                          No
                                                        </span>
                                                      ) : (
                                                        <span
                                                          className={
                                                            styles.fieldNameSapp
                                                          }
                                                        >
                                                          Yes
                                                        </span>
                                                      )
                                                    ) : (
                                                      <CSelect
                                                        id="accountDetailGeneral.discfirsttieronly"
                                                        className={
                                                          styles.selectBox48
                                                        }
                                                        onChange={(e)=>contextType.onDiscTierChangeHandler(e)}
                                                        keyField={
                                                          Settings
                                                            .criticalFieldsTab
                                                            .labels
                                                            .discountFirstTierOnly
                                                            .key
                                                        }
                                                        valField={
                                                          Settings
                                                            .criticalFieldsTab
                                                            .labels
                                                            .discountFirstTierOnly
                                                            .value
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .criticalFieldsData
                                                            .criticalFieldAccountDetails
                                                            .accountDetailGeneral
                                                            .discfirsttieronly
                                                        }
                                                        ddnOptions={
                                                          Settings
                                                            .criticalFieldsTab
                                                            .yesNoList
                                                        }
                                                      />
                                                    )}
                                                  </td>
                                                </tr>
                                                <tr
                                                  className={[
                                                    styles.fieldHeight25,
                                                  ].join(" ")}
                                                >
                                                  <td
                                                    className={[
                                                      styles.labelSpace,
                                                      styles.fieldName,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.criticalFieldsTab
                                                        .labels
                                                        .gppMarshaAcountName
                                                        .name
                                                    }
                                                  </td>
                                                  <td>
                                                    <input
                                                      id={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels
                                                          .gppMarshaAcountName
                                                          .id
                                                      }
                                                      value={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDetailGeneral
                                                          .aer_accountname
                                                      }
                                                      className={
                                                        styles.inputText
                                                      }
                                                      maxLength={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.maxLength
                                                      }
                                                      onChange={
                                                        contextType.onAccountNameChangeHandler
                                                      }
                                                      onKeyPress={(event) =>
                                                        Utils.marshaSafeCharsOnly(
                                                          event
                                                        )
                                                      }
                                                    />
                                                  </td>
                                                </tr>
                                                <tr
                                                  className={[
                                                    styles.fieldHeight25,
                                                  ].join(" ")}
                                                >
                                                  <td
                                                    className={[
                                                      styles.labelSpace,
                                                      styles.fieldName,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.criticalFieldsTab
                                                        .labels
                                                        .gppLOIAgreementOnFile
                                                        .name
                                                    }
                                                  </td>
                                                  <td>
                                                    {appContext.user.role ==
                                                      "MFPAPADM" &&
                                                    contextType.state
                                                      .criticalFieldsData
                                                      .criticalFieldAccountDetails
                                                      .accountDetailGeneral
                                                      .accountpricingtype !==
                                                      "P" &&
                                                    (!isNew ||
                                                      parentContextType.state
                                                        .isCopyFromExistingAccount) ? (
                                                      contextType.state
                                                        .criticalFieldsData
                                                        .criticalFieldAccountDetails
                                                        .accountDetailGeneral
                                                        .gpploiagreementonfile ===
                                                      "N" ? (
                                                        <span
                                                          className={
                                                            styles.fieldNameSapp
                                                          }
                                                        >
                                                          No
                                                        </span>
                                                      ) : (
                                                        <span
                                                          className={
                                                            styles.fieldNameSapp
                                                          }
                                                        >
                                                          Yes
                                                        </span>
                                                      )
                                                    ) : (
                                                      <CSelect
                                                        id="accountDetailGeneral.gpploiagreementonfile"
                                                        className={
                                                          styles.selectBox48
                                                        }
                                                        onChange={
                                                          contextType.onGppLOIChangeHandler
                                                        }
                                                        keyField={
                                                          Settings
                                                            .criticalFieldsTab
                                                            .labels
                                                            .gppLOIAgreementOnFile
                                                            .key
                                                        }
                                                        valField={
                                                          Settings
                                                            .criticalFieldsTab
                                                            .labels
                                                            .gppLOIAgreementOnFile
                                                            .value
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .criticalFieldsData
                                                            .criticalFieldAccountDetails
                                                            .accountDetailGeneral
                                                            .gpploiagreementonfile
                                                        }
                                                        ddnOptions={
                                                          Settings
                                                            .criticalFieldsTab
                                                            .yesNoList
                                                        }
                                                      />
                                                    )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
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
                                            Settings.criticalFieldsTab.labels
                                              .governmentAccount.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .gov_account === "N" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                No
                                              </span>
                                            ) : (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Yes
                                              </span>
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.gov_account"
                                              className={styles.selectBox48}
                                              onChange={
                                                contextType.onGovtAccountChangeHandler
                                              }
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.governmentAccount.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.governmentAccount
                                                  .value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .gov_account
                                              }
                                              ddnOptions={
                                                Settings.criticalFieldsTab
                                                  .yesNoList
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan={2}>
                                          <div
                                            id="gov_acname"
                                            className={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .gov_account ===
                                              Settings.criticalFieldsTab.labels
                                                .yes
                                                ? styles.divShowDisplay
                                                : styles.divHideDisplay
                                            }
                                          >
                                            <table>
                                              <tbody>
                                                <tr
                                                  className={
                                                    styles.fieldHeight25
                                                  }
                                                >
                                                  <td
                                                    className={[
                                                      styles.labelSpace,
                                                      styles.fieldName,
                                                    ].join(" ")}
                                                  >
                                                    {
                                                      Settings.criticalFieldsTab
                                                        .labels
                                                        .perDiemAdjustmentsAllowed
                                                        .name
                                                    }
                                                  </td>
                                                  <td>
                                                    {appContext.user.role ==
                                                      "MFPAPADM" &&
                                                    contextType.state
                                                      .criticalFieldsData
                                                      .criticalFieldAccountDetails
                                                      .accountDetailGeneral
                                                      .accountpricingtype !==
                                                      "P" &&
                                                    (!isNew ||
                                                      parentContextType.state
                                                        .isCopyFromExistingAccount) ? (
                                                      contextType.state
                                                        .criticalFieldsData
                                                        .criticalFieldAccountDetails
                                                        .accountDetailGeneral
                                                        .perdiemadjustmentsallowed ===
                                                      "N" ? (
                                                        <span
                                                          className={
                                                            styles.fieldNameSapp
                                                          }
                                                        >
                                                          No
                                                        </span>
                                                      ) : (
                                                        <span
                                                          className={
                                                            styles.fieldNameSapp
                                                          }
                                                        >
                                                          Yes
                                                        </span>
                                                      )
                                                    ) : (
                                                      <CSelect
                                                        id="accountDetailGeneral.perdiemadjustmentsallowed"
                                                        className={
                                                          styles.selectBox48
                                                        }
                                                        onChange={
                                                          contextType.onPerDiemChangeHandler
                                                        }
                                                        keyField={
                                                          Settings
                                                            .criticalFieldsTab
                                                            .labels
                                                            .perDiemAdjustmentsAllowed
                                                            .key
                                                        }
                                                        valField={
                                                          Settings
                                                            .criticalFieldsTab
                                                            .labels
                                                            .perDiemAdjustmentsAllowed
                                                            .value
                                                        }
                                                        selectedValue={
                                                          contextType.state
                                                            .criticalFieldsData
                                                            .criticalFieldAccountDetails
                                                            .accountDetailGeneral
                                                            .perdiemadjustmentsallowed
                                                        }
                                                        ddnOptions={
                                                          Settings
                                                            .criticalFieldsTab
                                                            .yesNoList
                                                        }
                                                      />
                                                    )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight30}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .groupsAndMeetings.name
                                          }
                                        </td>
                                        <td>
                                          {(appContext.user.role ==
                                            "MFPAPADM" &&
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .accountpricingtype !== "P" &&
                                            (!isNew ||
                                              parentContextType.state
                                                .isCopyFromExistingAccount)) ||
                                          (contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .groupmeetings === "Y" &&
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .weblocked === "Y") ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .groupmeetings === "N" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                No
                                              </span>
                                            ) : (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Yes
                                              </span>
                                            )
                                          ) : (
                                            <CSelect
                                              id={
                                                Settings.criticalFieldsTab
                                                  .labels.groupsAndMeetings.id
                                              }
                                              className={styles.selectBox48}
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.groupsAndMeetings.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.groupsAndMeetings
                                                  .value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .groupmeetings
                                              }
                                              onChange={
                                                contextType.onGroupsAndMeetingChangeHandler
                                              }
                                              ddnOptions={
                                                Settings.criticalFieldsTab
                                                  .yesNoList
                                              }
                                              isDisabled={
                                                (contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accountpricingtype ===
                                                  Settings.criticalFieldsTab
                                                    .labels.accountPricingType
                                                    .typeL ||
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .accountpricingtype ===
                                                    Settings.criticalFieldsTab
                                                      .labels.accountPricingType
                                                      .typeP) &&
                                                contextType.state
                                                  .criticalFieldsData.retCode
                                                  ? true
                                                  : false
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight20}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .noSquatter.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .nosquatter === "Y" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Full
                                              </span>
                                            ) : contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .nosquatter === "M" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Modified
                                              </span>
                                            ) : (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                No
                                              </span>
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.nosquatter"
                                              className={styles.selectBox65}
                                              onChange={
                                                contextType.onSquatterChangeHandler
                                              }
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.noSquatter.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.noSquatter.value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .nosquatter
                                              }
                                              ddnOptions={
                                                Settings.criticalFieldsTab
                                                  .noSquatterList
                                              }
                                              isDisabled={
                                                (contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accountpricingtype ===
                                                  Settings.criticalFieldsTab
                                                    .labels.accountPricingType
                                                    .typeL ||
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .accountpricingtype ===
                                                    Settings.criticalFieldsTab
                                                      .labels.accountPricingType
                                                      .typeP) &&
                                                contextType.state
                                                  .criticalFieldsData.retCode
                                                  ? true
                                                  : false
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className={styles.fieldName}>
                                          {(appContext.user.role ==
                                            "MFPAPADM" &&
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .accountpricingtype !== "P" &&
                                            (!isNew ||
                                              parentContextType.state
                                                .isCopyFromExistingAccount)) ||
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .hasportfolio === "Y" ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .commdef_acct === "Y" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                x
                                              </span>
                                            ) : (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                no
                                              </span>
                                            )
                                          ) : (
                                            <input
                                              type="checkbox"
                                              id={
                                                Settings.criticalFieldsTab
                                                  .labels
                                                  .commissionabilityException.id
                                              }
                                              value={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .commdef_acct
                                              }
                                              checked={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .commdef_acct ===
                                                Settings.criticalFieldsTab
                                                  .labels.yes
                                                  ? true
                                                  : false
                                              }
                                              onClick={
                                                contextType.onCommissionabiltyExceptionHandler
                                              }
                                            />
                                          )}

                                          {
                                            Settings.criticalFieldsTab.labels
                                              .commissionabilityException.name
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div
                                            id="divCommission"
                                            className={styles.divVisibility}
                                          >
                                            {
                                              Settings.criticalFieldsTab.labels
                                                .commissionabilityDefault
                                            }{" "}
                                            <b>
                                              <input
                                                type="text"
                                                readOnly={true}
                                                id="accountDetailGeneral.commdef_tier"
                                                value={
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .commdef_tier
                                                }
                                                className={[
                                                  styles.inputTextHiddenBorder,
                                                  styles.inputText10,
                                                ].join("")}
                                              />
                                            </b>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight20}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .rollover.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .acctwifipolicyid === "R" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Replatform
                                              </span>
                                            ) : contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .acctwifipolicyid === "O" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Rollover
                                              </span>
                                            ) : contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .accountDetailGeneral
                                                .acctwifipolicyid === "T" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Traditional
                                              </span>
                                            ) : (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Not Applicable
                                              </span>
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.acctwifipolicyid"
                                              className={styles.selectBox99}
                                              onChange={
                                                contextType.onRolloverChangeHandler
                                              }
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.rollover.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.rollover.value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .acctwifipolicyid
                                              }
                                              ddnOptions={
                                                Settings.criticalFieldsTab
                                                  .rollOverList
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td className={styles.tableColumn2}>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .accountViewable.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData
                                              .criticalFieldAccountDetails
                                              .accountDetailGeneral
                                              .hotel_display === "N" ? (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                No
                                              </span>
                                            ) : (
                                              <span
                                                className={styles.fieldNameSapp}
                                              >
                                                Yes
                                              </span>
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.hotel_display"
                                              className={styles.selectBox48}
                                              onChange={
                                                contextType.onAccountViewableChangeHandler
                                              }
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.accountViewable.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.accountViewable.value
                                              }
                                              selectedValue={
                                                contextType?.state
                                                  ?.criticalFieldsData
                                                  ?.criticalFieldAccountDetails
                                                  ?.accountDetailGeneral
                                                  ?.hotel_display
                                              }
                                              ddnOptions={
                                                Settings.criticalFieldsTab
                                                  .yesNoList
                                              }
                                              isDisabled={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accountpricingtype ===
                                                  Settings.criticalFieldsTab
                                                    .labels.accountPricingType
                                                    .typeP &&
                                                contextType.state
                                                  .criticalFieldsData.retCode
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .dateViewable
                                          }
                                        </td>
                                        <td>
                                          {contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .hotel_display_date != null ? (
                                            <input
                                              type="text"
                                              readOnly={true}
                                              id="accountDetailGeneral.hotel_display_date"
                                              value={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .hotel_display_date
                                              }
                                              className={
                                                styles.inputTextHiddenBorder
                                              }
                                            />
                                          ) : null}
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
                                            Settings.criticalFieldsTab.labels
                                              .cbcDueDate
                                          }
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            readOnly={true}
                                            id="accountDetailGeneral.cbcduedate"
                                            value={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .longDate
                                            }
                                            className={
                                              styles.inputTextHiddenBorder
                                            }
                                          />
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .reminderDate.name
                                          }
                                        </td>

                                        <div
                                          className={styles.rfpDatesMargin}
                                          title={
                                            Settings.criticalFieldsTab.title
                                          }
                                        >
                                          <CCalendar
                                            id={
                                              Settings.criticalFieldsTab.labels
                                                .reminderDate.calId
                                            }
                                            inputId={
                                              Settings.criticalFieldsTab.labels
                                                .reminderDate.id
                                            }
                                            value={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .shortRemindersdate ===
                                              undefined
                                                ? ""
                                                : Utils.convertStrToDate(
                                                    contextType.state
                                                      .criticalFieldsData
                                                      .criticalFieldAccountDetails
                                                      .shortRemindersdate
                                                  )
                                            }
                                            onChange={
                                              contextType.onReminderDateChangeHandler
                                            }
                                            onHide={
                                              contextType.onReminderDateHideHandler
                                            }
                                            onInput={
                                              contextType.onReminderDateInputHandler
                                            }
                                            onBlur={(e) =>
                                              contextType.onDateBlurHandler(
                                                e,
                                                "shortRemindersdate"
                                              )
                                            }
                                            hasCustomMonth={true}
                                          />
                                        </div>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .marrfpDueDate.name
                                          }
                                        </td>
                                        <td>
                                          {appContext.user.role == "MFPAPADM" &&
                                          contextType.state.criticalFieldsData
                                            .criticalFieldAccountDetails
                                            .accountDetailGeneral
                                            .accountpricingtype !== "P" &&
                                          (!isNew ||
                                            parentContextType.state
                                              .isCopyFromExistingAccount) ? (
                                            contextType.state.criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.pricingPeriodList.map(
                                              (item) => {
                                                if (
                                                  item.pricingperiodid ===
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .pricingperiodid
                                                ) {
                                                  return (
                                                    <span
                                                      className={
                                                        styles.fieldNameSapp
                                                      }
                                                    >
                                                      {item.longDueDate}
                                                    </span>
                                                  );
                                                }
                                              }
                                            )
                                          ) : (
                                            <CSelect
                                              id="accountDetailGeneral.pricingperiodid"
                                              className={styles.selectBox115}
                                              onChange={
                                                contextType.onMarRFPDueDateChangeHandler
                                              }
                                              keyField={
                                                Settings.criticalFieldsTab
                                                  .labels.marrfpDueDate.key
                                              }
                                              valField={
                                                Settings.criticalFieldsTab
                                                  .labels.marrfpDueDate.value
                                              }
                                              selectedValue={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .pricingperiodid
                                              }
                                              ddnOptions={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDropDowns
                                                  .pricingPeriodList
                                              }
                                              isDisabled={
                                                contextType.state
                                                  .criticalFieldsData
                                                  .criticalFieldAccountDetails
                                                  .accountDetailGeneral
                                                  .accountpricingtype ===
                                                  Settings.criticalFieldsTab
                                                    .labels.accountPricingType
                                                    .typeP &&
                                                contextType.state
                                                  .criticalFieldsData.retCode
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .rfpFullDate.name
                                          }
                                        </td>

                                        <div
                                          className={styles.rfpDatesMargin}
                                          title={
                                            Settings.criticalFieldsTab.title
                                          }
                                        >
                                          <CCalendar
                                            id={
                                              Settings.criticalFieldsTab.labels
                                                .rfpFullDate.calId
                                            }
                                            inputId={
                                              Settings.criticalFieldsTab.labels
                                                .rfpFullDate.id
                                            }
                                            value={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .shortRfppulldate === undefined
                                                ? ""
                                                : Utils.convertStrToDate(
                                                    contextType.state
                                                      .criticalFieldsData
                                                      .criticalFieldAccountDetails
                                                      .shortRfppulldate
                                                  )
                                            }
                                            onChange={
                                              contextType.onRfpFullDateChangeHandler
                                            }
                                            onHide={
                                              contextType.onRfpFullDateHideHandler
                                            }
                                            onInput={
                                              contextType.onRfpFullDateInputHandler
                                            }
                                            onBlur={(e) =>
                                              contextType.onDateBlurHandler(
                                                e,
                                                "shortRfppulldate"
                                              )
                                            }
                                            hasCustomMonth={true}
                                          />
                                        </div>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .pasSubmissionDate.name
                                          }
                                        </td>

                                        <div
                                          className={styles.rfpDatesMargin}
                                          title={
                                            Settings.criticalFieldsTab.title
                                          }
                                        >
                                          <CCalendar
                                            id={
                                              Settings.criticalFieldsTab.labels
                                                .pasSubmissionDate.calId
                                            }
                                            inputId={
                                              Settings.criticalFieldsTab.labels
                                                .pasSubmissionDate.id
                                            }
                                            value={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .shortPassubmissiondate ===
                                              undefined
                                                ? ""
                                                : Utils.convertStrToDate(
                                                    contextType.state
                                                      .criticalFieldsData
                                                      .criticalFieldAccountDetails
                                                      .shortPassubmissiondate
                                                  )
                                            }
                                            onChange={
                                              contextType.onPasSubmissionDateChangeHandler
                                            }
                                            onHide={
                                              contextType.onPasSubmissionDateHideHandler
                                            }
                                            onInput={
                                              contextType.onPasSubDateInputHandler
                                            }
                                            onBlur={(e) =>
                                              contextType.onDateBlurHandler(
                                                e,
                                                "shortPassubmissiondate"
                                              )
                                            }
                                            hasCustomMonth={true}
                                          />
                                        </div>
                                      </tr>
                                      <tr className={styles.fieldHeight25}>
                                        <td className={styles.fieldName}>
                                          {
                                            Settings.criticalFieldsTab.labels
                                              .clientDueDate.name
                                          }
                                        </td>

                                        <div
                                          className={styles.rfpDatesMargin}
                                          title={
                                            Settings.criticalFieldsTab.title
                                          }
                                        >
                                          <CCalendar
                                            id={
                                              Settings.criticalFieldsTab.labels
                                                .clientDueDate.calId
                                            }
                                            inputId={
                                              Settings.criticalFieldsTab.labels
                                                .clientDueDate.id
                                            }
                                            value={
                                              contextType.state
                                                .criticalFieldsData
                                                .criticalFieldAccountDetails
                                                .shortClientduedate ===
                                              undefined
                                                ? ""
                                                : Utils.convertStrToDate(
                                                    contextType.state
                                                      .criticalFieldsData
                                                      .criticalFieldAccountDetails
                                                      .shortClientduedate
                                                  )
                                            }
                                            onChange={
                                              contextType.onClientDueDateChangeHandler
                                            }
                                            onHide={
                                              contextType.onClientDueDateHideHandler
                                            }
                                            onInput={
                                              contextType.onClientDueDateInputHandler
                                            }
                                            onBlur={(e) =>
                                              contextType.onDateBlurHandler(
                                                e,
                                                "shortClientduedate"
                                              )
                                            }
                                            hasCustomMonth={true}
                                          />
                                        </div>
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
                                      {contextType.state.criticalFieldsData
                                        .isDataLoaded &&
                                        contextType.state.criticalFieldsData.criticalFieldAccountDetails.accountDetailGeneral.accountThirdPartyRegion.map(
                                          (thirdPartyItem, index) => {
                                            return (
                                              <tr
                                                className={styles.fieldHeight25}
                                                key={index}
                                              >
                                                <td
                                                  className={styles.fieldName}
                                                >
                                                  {`${thirdPartyItem.account_thirdpartyregion} ${Settings.criticalFieldsTab.labels.rfp.name}`}
                                                </td>
                                                <td>
                                                  {appContext.user.role ==
                                                    "MFPAPADM" &&
                                                  contextType.state
                                                    .criticalFieldsData
                                                    .criticalFieldAccountDetails
                                                    .accountDetailGeneral
                                                    .accountpricingtype !==
                                                    "P" &&
                                                  (!isNew ||
                                                    parentContextType.state
                                                      .isCopyFromExistingAccount) ? (
                                                    contextType.state.criticalFieldsData.criticalFieldAccountDetails.accountDropDowns.accountThirdPartyList.map(
                                                      (item) => {
                                                        if (
                                                          item.account_thirdparty_ref_id ===
                                                          thirdPartyItem.account_thirdparty_ref_id
                                                        ) {
                                                          return (
                                                            <span
                                                              className={
                                                                styles.fieldNameSapp
                                                              }
                                                            >
                                                              {
                                                                item.accountthirdparty
                                                              }
                                                            </span>
                                                          );
                                                        }
                                                      }
                                                    )
                                                  ) : (
                                                    <CSelect
                                                      id={`accountDetailGeneral.accountThirdPartyRegion[${index}].account_thirdparty_ref_id`}
                                                      className={
                                                        styles.selectBox118
                                                      }
                                                      onChange={
                                                        contextType.onAccountThirdPartyRegionChangeHandler
                                                      }
                                                      keyField={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.rfp.key
                                                      }
                                                      selectedValue={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDetailGeneral
                                                          .accountThirdPartyRegion[
                                                          index
                                                        ]
                                                          .account_thirdparty_ref_id
                                                      }
                                                      valField={
                                                        Settings
                                                          .criticalFieldsTab
                                                          .labels.rfp.value
                                                      }
                                                      ddnOptions={
                                                        contextType.state
                                                          .criticalFieldsData
                                                          .criticalFieldAccountDetails
                                                          .accountDropDowns
                                                          .accountThirdPartyList
                                                      }
                                                    />
                                                  )}
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
                    <style>
                      {`
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
                        `}
                    </style>
                  </table>
                </>
              );
            }}
          </CriticalFieldsContext.Consumer>
        );
      }}
    </AccountListContext.Consumer>
  );
}
