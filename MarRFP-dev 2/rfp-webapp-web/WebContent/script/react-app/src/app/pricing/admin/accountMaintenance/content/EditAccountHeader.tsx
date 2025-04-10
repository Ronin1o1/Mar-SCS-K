import React, { useContext } from "react";
import AccountListContext from "../context/AccountListContext";
import Settings from "../static/Settings";
import styles from "./EditAccountHeader.css";
import SaveBtnImg from "../../../../common/assets/img/btnSave.gif";
import LaunchBtnImg from "../../../../common/assets/img/btnLaunchRecapEmail.gif";
import RFPEmailLaunch from "./RFPEmailLaunch/RFPEmailLaunch";
import RFPSettingsContext from "./AccntTab/RFPSettings/context/RFPSettingsContext";
import SpecificQuestionsContext from "./AccntTab/Questions/context/SpecificQuestionsContext";
import GroupMeetingsContext from "./AccntTab/GroupMeetings/context/GroupMeetingsContext";
import ComplexityMatrixContext from "./AccntTab/ComplexityMatrix/context/ComplexityMatrixContext";
import McadlookupContext from "./AccntTab/MCADLookup/context/McadlookupContext";
import CriticalFieldsContext from "./AccntTab/CriticalFields/context/CriticalFieldsContext";
import RateLoadingContext from "./AccntTab/RateLoading/context/RateLoadingContext";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";

let contextType = null;
let rfpContextType = null;
let questionsContextType = null;
let grpMeetingsContextType = null;
let complexMatrixContext = null;
let lookupContext = null;
let criticalFieldsContextType = null;
let rateLoadingContextType = null;

export default function EditAccountHeader() {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const navigateToAccountList = () => {
    history.push(`/accountmaintenance/${Settings.accountList.accountListPath}`);
  };

  const accountRecId = sessionStorage.getItem("accountsDataRecId");

  const renderContext = (tabId, event) => {
    if (tabId === Settings.accountEdit.tabs[0].id) {
      if (criticalFieldsContextType.validationCheck()) {
        if (criticalFieldsContextType.warningCheck()) {
          if (event.target.id !== "returnToAccountMaintLink") {
            if (appContext.isStartDateEmpty || appContext.isEndDateEmpty) {
              event.preventDefault();
            } else {
              if (criticalFieldsContextType.state.formChg) {
                criticalFieldsContextType.onAutoSaveData(() => {});
              }
            }
          } else {
            if (!contextType.state.isCopyFromExistingAccount && !accountRecId) {
              if (criticalFieldsContextType.state.formChg) {
                criticalFieldsContextType.onAutoSaveData(() => {});
              }
            } else {
              if (criticalFieldsContextType.state.formChg) {
                criticalFieldsContextType.onAutoSaveData(() => {
                  navigateToAccountList();
                });
              } else {
                navigateToAccountList();
              }
            }
          }
        }
      }
    }
    if (tabId === Settings.accountEdit.tabs[1].id) {
      if (rateLoadingContextType.validationCheck()) {
        if (rateLoadingContextType.state.formChg) {
          event.target.id !== "returnToAccountMaintLink"
            ? rateLoadingContextType.autoSave(() => {})
            : rateLoadingContextType.autoSave(() => {
                navigateToAccountList();
              });
        } else {
          event.target.id === "returnToAccountMaintLink"
            ? navigateToAccountList()
            : null;
        }
      }
    }
    if (tabId === Settings.accountEdit.tabs[2].id) {
      if (rfpContextType.state.formChg) {
        if (event.target.id !== "returnToAccountMaintLink")
          rfpContextType.autoSaveData();
        else {
          rfpContextType.autoSaveData();
          navigateToAccountList();
        }
      } else {
        if (event.target.id === "returnToAccountMaintLink") {
          navigateToAccountList();
        }
      }
    }
    if (tabId === Settings.accountEdit.tabs[3].id) {
      if (complexMatrixContext.state.formChg) {
        if (event.target.id !== "returnToAccountMaintLink") {
          complexMatrixContext.autoSaveData();
        } else {
          //Below line has been commented as it was saving the data twice in the DB by calling same API in ComponentDidUnmout of complexityMatrix
          //complexMatrixContext.autoSaveData();
          navigateToAccountList();
        }
      } else {
        if (event.target.id === "returnToAccountMaintLink") {
          navigateToAccountList();
        }
      }
    }
    if (tabId === Settings.accountEdit.tabs[4].id) {
      if (event.target.id !== "returnToAccountMaintLink")
        lookupContext.autoSaveData(() => {
          lookupContext.refreshMacdData();
        });
      else {
        lookupContext.autoSaveData(() => {
          navigateToAccountList();
        });
      }
    }

    if (tabId === Settings.accountEdit.tabs[5].id) {
      if (event.target.id !== "returnToAccountMaintLink")
        questionsContextType.autoSaveData();
      else {
        const result = questionsContextType.unmountSaveHandler();
        if (result) navigateToAccountList();
      }
    }
    if (tabId === Settings.accountEdit.tabs[6].id) {
      if (event.target.id !== "returnToAccountMaintLink")
        grpMeetingsContextType.autoSaveData();
      else {
        const result = grpMeetingsContextType.unmountSaveHandler();
        if (result) navigateToAccountList();
      }
    }
  };

  return (
    <AccountListContext.Consumer>
      {(accountListContext) => {
        contextType = accountListContext;
        return (
          <RFPSettingsContext.Consumer>
            {(rfpStettingsContext) => {
              rfpContextType = rfpStettingsContext;
              return (
                <SpecificQuestionsContext.Consumer>
                  {(questionsContext) => {
                    questionsContextType = questionsContext;
                    return (
                      <GroupMeetingsContext.Consumer>
                        {(grpquestionsContext) => {
                          grpMeetingsContextType = grpquestionsContext;
                          return (
                            <ComplexityMatrixContext.Consumer>
                              {(complexitycontext) => {
                                complexMatrixContext = complexitycontext;

                                return (
                                  <McadlookupContext.Consumer>
                                    {(McadlookupContext) => {
                                      lookupContext = McadlookupContext;
                                      return (
                                        <CriticalFieldsContext.Consumer>
                                          {(criticalFieldsContext) => {
                                            criticalFieldsContextType =
                                              criticalFieldsContext;
                                            return (
                                              <RateLoadingContext.Consumer>
                                                {(RateLoadingContext) => {
                                                  rateLoadingContextType =
                                                    RateLoadingContext;
                                                  return (
                                                    <React.Fragment>
                                                      <table
                                                        className={
                                                          styles.tableWidth
                                                        }
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              className={
                                                                styles.headerTitle
                                                              }
                                                            >
                                                              {
                                                                Settings
                                                                  .accountEdit
                                                                  .pageTitle
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr
                                                            className={
                                                              styles.bgDarkBlue
                                                            }
                                                          >
                                                            <td
                                                              className={
                                                                styles.tdHeight2
                                                              }
                                                            ></td>
                                                          </tr>
                                                          <tr
                                                            className={
                                                              styles.tdHeight10
                                                            }
                                                          >
                                                            <td></td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <div
                                                        className={
                                                          styles.infoheader
                                                        }
                                                      >
                                                        <span
                                                          className={
                                                            styles.control
                                                          }
                                                        >
                                                          <b>
                                                            {
                                                              Settings
                                                                .headerLabels
                                                                .period
                                                            }
                                                          </b>
                                                          {contextType.state
                                                            .accountListData
                                                            .selectedAccount
                                                            .period
                                                            ? contextType.state
                                                                .accountListData
                                                                .selectedAccount
                                                                .period
                                                            : sessionStorage.getItem(
                                                                "accountsDataPeriod"
                                                              )}
                                                        </span>
                                                        <span
                                                          className={
                                                            styles.control
                                                          }
                                                          style={{
                                                            paddingLeft: "3px",
                                                          }}
                                                        >
                                                          <b>
                                                            {
                                                              Settings
                                                                .headerLabels
                                                                .accountName
                                                            }
                                                          </b>
                                                          <span id="accountname">
                                                            {" "}
                                                            {contextType.state
                                                              .isCopyFromExistingAccount
                                                              ? criticalFieldsContextType
                                                                  .state
                                                                  .criticalFieldsData
                                                                  .newAccountName !==
                                                                ""
                                                                ? criticalFieldsContextType
                                                                    .state
                                                                    .criticalFieldsData
                                                                    .newAccountName
                                                                : contextType
                                                                    .state
                                                                    .accountListData
                                                                    .selectedAccount
                                                                    .accountName ===
                                                                  null
                                                                ? sessionStorage.getItem(
                                                                    "accountsDataName"
                                                                  )
                                                                : contextType
                                                                    .state
                                                                    .accountListData
                                                                    .selectedAccount
                                                                    .accountName
                                                              : accountRecId
                                                              ? sessionStorage.getItem(
                                                                  "accountsDataName"
                                                                )
                                                                ? sessionStorage.getItem(
                                                                    "accountsDataName"
                                                                  )
                                                                : criticalFieldsContextType
                                                                    .state
                                                                    .criticalFieldsData
                                                                    .newAccountName
                                                              : criticalFieldsContextType
                                                                  .state
                                                                  .criticalFieldsData
                                                                  .newAccountName}
                                                          </span>
                                                        </span>
                                                        <span
                                                          className={
                                                            styles.controls
                                                          }
                                                        >
                                                          <img
                                                            id="saveButton"
                                                            src={SaveBtnImg}
                                                            onClick={(e) =>
                                                              renderContext(
                                                                contextType
                                                                  .state
                                                                  .activeTab,
                                                                e
                                                              )
                                                            }
                                                            alt=""
                                                          />
                                                          <a
                                                            className={
                                                              styles.control
                                                            }
                                                            style={{
                                                              padding:
                                                                "0 1.4px",
                                                            }}
                                                            id="returnToAccountMaintLink"
                                                            href="javascript:void(null);"
                                                            onClick={(e) =>
                                                              renderContext(
                                                                contextType
                                                                  .state
                                                                  .activeTab,
                                                                e
                                                              )
                                                            }
                                                          >
                                                            {
                                                              Settings
                                                                .headerLabels
                                                                .returnLinkLabel
                                                            }
                                                          </a>

                                                          <img
                                                            className={
                                                              contextType.state
                                                                .isCopyFromExistingAccount
                                                                ? styles.control
                                                                : styles.divHideDisplay
                                                            }
                                                            id="rfpLaunchRecapEmailButton"
                                                            src={LaunchBtnImg}
                                                            alt=""
                                                            onClick={() =>
                                                              contextType.modalOpen()
                                                            }
                                                          />
                                                          {contextType.state
                                                            .onModalOpen ? (
                                                            <RFPEmailLaunch />
                                                          ) : null}
                                                        </span>
                                                      </div>
                                                    </React.Fragment>
                                                  );
                                                }}
                                              </RateLoadingContext.Consumer>
                                            );
                                          }}
                                        </CriticalFieldsContext.Consumer>
                                      );
                                    }}
                                  </McadlookupContext.Consumer>
                                );
                              }}
                            </ComplexityMatrixContext.Consumer>
                          );
                        }}
                      </GroupMeetingsContext.Consumer>
                    );
                  }}
                </SpecificQuestionsContext.Consumer>
              );
            }}
          </RFPSettingsContext.Consumer>
        );
      }}
    </AccountListContext.Consumer>
  );
}
