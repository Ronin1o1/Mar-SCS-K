import React, {
  Component,
  Suspense,
  useEffect,
  useContext,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import EditAccountHeader from "./EditAccountHeader";
import AccountListContext from "../context/AccountListContext";
import styles from "./EditAccount.css";
import CTabList from "../../../../common/components/CTabList";
import Settings from "../static/Settings";
import CSuspense from "../../../../common/components/CSuspense";
import SpecificQuestionsContext from "./AccntTab/Questions/context/SpecificQuestionsContext";
import GroupMeetingsContext from "./AccntTab/GroupMeetings/context/GroupMeetingsContext";
import RFPSettingsContext from "./AccntTab/RFPSettings/context/RFPSettingsContext";
import ComplexityMatrixContext from "./AccntTab/ComplexityMatrix/context/ComplexityMatrixContext";
import RateLoadingContext from "./AccntTab/RateLoading/context/RateLoadingContext";
import CriticalFieldsContext from "./AccntTab/CriticalFields/context/CriticalFieldsContext";
import McadlookupContext from "./AccntTab/MCADLookup/context/McadlookupContext";
//import Interceptors from "../../../../common/components/Interceptors";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../common/components/ApplicationContext";
const CriticalFields = React.lazy(
  () => import("./AccntTab/CriticalFields/CriticalFields")
);
const RateLoading = React.lazy(
  () => import("./AccntTab/RateLoading/RateLoading")
);
const RFPSettings = React.lazy(
  () => import("./AccntTab/RFPSettings/RFPSettings")
);
const ComplexityMatrix = React.lazy(
  () => import("./AccntTab/ComplexityMatrix/ComplexityMatrix")
);
const MCADLookup = React.lazy(() => import("./AccntTab/MCADLookup/LookupMcad"));
const Questions = React.lazy(
  () => import("./AccntTab/Questions/QuestionsSpecific")
);
const GroupMeetings = React.lazy(
  () => import("./AccntTab/GroupMeetings/GroupMeetings")
);

let contextType = null;
let rfpContextType = null;
let questionsContextType = null;
let grpMeetingsContextType = null;
let complexMatrixContext = null;
let lookupContext = null;
let criticalFieldsContextType = null;
let rateLoadingContextType = null;

export default function EditAccount() {
  const [isDeviceResized, setIsDeviceResized] = useState(false);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const localData = JSON.parse(
    sessionStorage.getItem("isCopyFromExistingAccount")
  );
  const urlParms = useLocation().search;
  const isNew = new URLSearchParams(urlParms).get("isNew");
  const accountRecId =
    isNew && localData === false
      ? 0
      : sessionStorage.getItem("accountsDataRecId");

  const resize = () => {
    if (window.innerWidth < 1258) {
      const el = document.getElementById(contextType?.state?.activeTab);
      el?.scrollIntoView(true);
      setIsDeviceResized(true);
    } else {
      setIsDeviceResized(false);
    }
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    if (
      contextType?.state?.isCopyFromExistingAccount == true &&
      localData === false
    ) {
      contextType.setState({
        ...contextType.state,
        isCopyFromExistingAccount: false,
      });
    }
  }, [contextType?.state?.isCopyFromExistingAccount]);
  const renderTabContent = (tabId) => {
    if (tabId === "criticalFields") {
      return <CriticalFields />;
    } else if (
      tabId === "rateLoading" &&
      !appContext.isStartDateEmpty &&
      !appContext.isEndDateEmpty
    )
      return <RateLoading />;
    else if (
      tabId === "rfpSettings" &&
      !appContext.isStartDateEmpty &&
      !appContext.isEndDateEmpty
    )
      return <RFPSettings />;
    else if (
      tabId === "complexityMatrix" &&
      !appContext.isStartDateEmpty &&
      !appContext.isEndDateEmpty
    )
      return <ComplexityMatrix />;
    else if (
      tabId === "mcadLookup" &&
      !appContext.isStartDateEmpty &&
      !appContext.isEndDateEmpty
    )
      return <MCADLookup />;
    else if (
      tabId === "questions" &&
      !appContext.isStartDateEmpty &&
      !appContext.isEndDateEmpty
    )
      return <Questions />;
    else if (
      tabId === "groupMeetings" &&
      !appContext.isStartDateEmpty &&
      !appContext.isEndDateEmpty
    )
      return <GroupMeetings />;
    else {
      contextType.retainCriticalFieldsTabState();
      return <CriticalFields />;
    }
  };

  const renderCriticalFieldsTabContent = (tabId) => {
    if (tabId === "criticalFields") return <CriticalFields />;
  };
  const swtichTabHandler = (event) => {
    const el = document.getElementById(event.target.id);
    el?.scrollIntoView();
    contextType.setClicked(true);
    const prevActiveTab = contextType.state.activeTab;

    if (prevActiveTab === Settings.accountEdit.tabs[5].id) {
      if (questionsContextType.state.formChgStatus) {
        const result = questionsContextType.unmountSaveHandler();
        if (result) contextType.switchTab(event);
      } else {
        const result = questionsContextType.unmountHandler();
        if (result) contextType.switchTab(event);
      }
    } else if (prevActiveTab === Settings.accountEdit.tabs[6].id) {
      if (grpMeetingsContextType.state.formChgStatus) {
        const result = grpMeetingsContextType.unmountSaveHandler();
        if (result) contextType.switchTab(event);
      } else {
        const result = grpMeetingsContextType.unmountHandler();
        if (result) contextType.switchTab(event);
      }
    } else if (prevActiveTab === Settings.accountEdit.tabs[2].id) {
      if (rfpContextType.state.formChg) {
        const result = rfpContextType.autoSaveData();
      }
      contextType.switchTab(event);
    } else if (prevActiveTab === Settings.accountEdit.tabs[3].id) {
      if (complexMatrixContext.state.formChg) {
        const result = complexMatrixContext.autoSaveData();
      }
      contextType.switchTab(event);
    } else if (prevActiveTab === Settings.accountEdit.tabs[4].id) {
      if (lookupContext.state.formChgStatus) {
        const result = lookupContext.autoSaveData(() => {
          contextType.switchTab(event);
        });
      } else {
        contextType.switchTab(event);
      }
    } else if (prevActiveTab === Settings.accountEdit.tabs[1].id) {
      criticalFieldsContextType.state.formChg = false;
      rfpContextType.state.formChg = false;
      complexMatrixContext.state.formChg = false;
      questionsContextType.state.formChgStatus = false;
      if (rateLoadingContextType.validationCheck()) {
        if (rateLoadingContextType.state.formChg) {
          rateLoadingContextType.autoSave(() => {
            contextType.switchTab(event);
          });
        } else {
          contextType.switchTab(event);
        }
      }
    } else if (prevActiveTab === Settings.accountEdit.tabs[0].id) {
      rateLoadingContextType.state.formChg = false;
      rfpContextType.state.formChg = false;
      complexMatrixContext.state.formChg = false;
      questionsContextType.state.formChgStatus = false;
      if (criticalFieldsContextType.validationCheck()) {
        if (criticalFieldsContextType.warningCheck()) {
          if (criticalFieldsContextType.state.formChg) {
            criticalFieldsContextType.onAutoSaveData(() => {
              contextType.switchTab(event);
            });
          } else {
            contextType.switchTab(event);
          }
        }
      }
    } else {
      contextType.switchTab(event);
    }
    criticalFieldsContextType.state.formChg = false;
    rfpContextType.state.formChg = false;
    rateLoadingContextType.state.formChg = false;
    complexMatrixContext.state.formChg = false;
    questionsContextType.state.formChgStatus = false;
    grpMeetingsContextType.state.formChgStatus = false;
    complexMatrixContext.state.formChg = false;
    lookupContext.state.formChgStatus = false;
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
                                                    <div
                                                      className={
                                                        styles.MainContainer
                                                      }
                                                    >
                                                      <div
                                                        className={
                                                          styles.editContainerMain
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            "editContainer"
                                                          }
                                                        >
                                                          <EditAccountHeader />
                                                          {/* <Interceptors
                                                            spinnerFlag={true}
                                                          /> */}
                                                          {!accountRecId &&
                                                          contextType.state
                                                            .isCopyFromExistingAccount ===
                                                            false ? (
                                                            <React.Fragment>
                                                              <CTabList
                                                                tabs={
                                                                  Settings
                                                                    .accountEdit
                                                                    .copyAccountTabs
                                                                }
                                                                selectedTab={
                                                                  contextType
                                                                    .state
                                                                    .activeTab
                                                                }
                                                                componentName={
                                                                  "accountMaintanance"
                                                                }
                                                                showScroll={
                                                                  false
                                                                }
                                                                isDeviceResized={
                                                                  isDeviceResized
                                                                }
                                                              />
                                                              <hr
                                                                className={
                                                                  styles.horLine
                                                                }
                                                              />
                                                            </React.Fragment>
                                                          ) : criticalFieldsContextType
                                                              .state
                                                              .criticalFieldsData
                                                              .criticalFieldAccountDetails
                                                              .accountDetailGeneral
                                                              .groupmeetings ===
                                                            Settings.yes
                                                              .label ? (
                                                            <CTabList
                                                              componentName={
                                                                "accountMaintanance"
                                                              }
                                                              tabs={
                                                                Settings
                                                                  .accountEdit
                                                                  .tabs
                                                              }
                                                              selectedTab={
                                                                contextType
                                                                  .state
                                                                  .activeTab
                                                              }
                                                              onClick={(e) =>
                                                                swtichTabHandler(
                                                                  e
                                                                )
                                                              }
                                                              numberOfTabs={
                                                                Settings
                                                                  .accountEdit
                                                                  .tabs.length
                                                              }
                                                              isDeviceResized={
                                                                isDeviceResized
                                                              }
                                                            />
                                                          ) : (
                                                            <CTabList
                                                              componentName={
                                                                "accountMaintanance"
                                                              }
                                                              tabs={
                                                                Settings
                                                                  .accountEdit
                                                                  .tabList
                                                              }
                                                              selectedTab={
                                                                contextType
                                                                  .state
                                                                  .activeTab
                                                              }
                                                              showScroll={
                                                                criticalFieldsContextType
                                                                  .state
                                                                  .criticalFieldsData
                                                                  .criticalFieldAccountDetails
                                                                  .accountDetailGeneral
                                                                  .groupmeetings ===
                                                                Settings.yes
                                                                  .label
                                                                  ? true
                                                                  : false
                                                              }
                                                              onClick={(e) =>
                                                                swtichTabHandler(
                                                                  e
                                                                )
                                                              }
                                                              isDeviceResized={
                                                                isDeviceResized
                                                              }
                                                            />
                                                          )}

                                                          <div
                                                            className={
                                                              styles.content
                                                            }
                                                          >
                                                            <Suspense
                                                              fallback={
                                                                <CSuspense />
                                                              }
                                                            >
                                                              {!accountRecId &&
                                                              contextType.state
                                                                .isCopyFromExistingAccount ===
                                                                false
                                                                ? renderCriticalFieldsTabContent(
                                                                    contextType
                                                                      .state
                                                                      .activeTab
                                                                  )
                                                                : renderTabContent(
                                                                    contextType
                                                                      .state
                                                                      .activeTab
                                                                  )}
                                                            </Suspense>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <style>{`
                                                        @media only screen and (min-width: 1920px){
                                                          .page_body_container {
                                                          height: calc(100vh - 91px);
                                                          }
                                                        }
                                                        @media only screen and (max-width: 1200px){
                                                          .footerwidget {
                                                            position:fixed;
                                                          }
                                                        }
                                                        .editContainer .tabListitems{
                                                          display: contents;
                                                        }
                                                      `}</style>
                                                    </div>
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
