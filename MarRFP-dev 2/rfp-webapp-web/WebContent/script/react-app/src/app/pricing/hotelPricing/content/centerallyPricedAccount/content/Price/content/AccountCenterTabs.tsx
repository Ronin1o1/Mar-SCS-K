import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./AccountCenterTab.css";
import Settings from "../static/Settings";
import AccountCenterTabsContext, {
  AccountCenterTabsContextProvider,
} from "../context/AccountCenterTabsContext";
import StatusAccountPricing from "./StatusAccountPricingContact/content/StatusAccountPricing";
import HotelSpecQuestionsTab from "./hotelAccountQuestionsTab/hotelAccountQuestionsTab";
import CTabList from "../../../../../../../common/components/CTabList";
import CSuspense from "../../../../../../../common/components/CSuspense";
import RatesRules from "./Rates&Rules/content/RatesRules";
import PriceEligibilityAmenity from "./PriceEligibilityAmenities/content/PriceEligibilityAmenity";
import RateNotesFacility from "./RateNotesFacility/content/RateNotesfacility";
import PriceRebid from "./PriceRebid/content/PriceRebid";
import CompellingBusinessCase from "./CompellingBusinessCase/content/CompellingBusinessCase";
import CpacBlackouts from "./CpacBlackouts/content/CpacBlackouts";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";
import RatesRulesContext from "./Rates&Rules/context/RatesRulesContextProvider";
import GroupsAndMeetings from "./GroupsAndMeetings/content/GroupsAndMeetings";
import classNames from "classnames";

let contextValue = null;
let tabList = [];

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function AccountCenterTabs(props) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const ratesandrulescontext = useContext(RatesRulesContext);
  const [tablist, setTabList] = useState([]);
  // const [activeTab, setActiveTab] = useState(props.activeTab);
  const [activeTab, setActiveTab] = useState("");
  const mounted = useRef();
  const prevState = usePrevious(contextValue);
  const prevAppContext = usePrevious(appContext);
  const [curstatus, setcurstatus] = useState("");
  const [isDeviceResized, setIsDeviceResized] = useState(false);

  const resize = () => {
    if (window.innerWidth < 800) {
      const el = document.getElementById(activeTab);
      el?.scrollIntoView();
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
    const accountData = props.data?.hotelAccountSpecific;
    tabList = [...Settings.tabList];
    appContext.setIsBtAndGroupAccountTabExist(false);
    appContext.setIsGroupsAndMeetingTabExist(false);
    if (accountData?.hotelAccountSpecificData.tabfacility_status === "C") {
      contextValue?.setFacilityStatus("C");
      appContext.setFacilityTick("C");
    } else {
      contextValue?.setFacilityStatus("");
      appContext.setFacilityTick("");
    }
    if (accountData?.hotelAccountSpecificData.tabblackout_status === "C") {
      appContext.setBlackoutTick("C");
      contextValue?.setBlackoutStatus("C");
    } else {
      appContext.setBlackoutTick("");
      contextValue?.setBlackoutStatus("");
    }
    if (accountData?.hotelAccountSpecificData.tabelig_status === "C") {
      appContext.setEligibilitiesTick("C");
      contextValue?.setEligibilityStatus("C");
    } else {
      appContext.setEligibilitiesTick("");
      contextValue?.setEligibilityStatus("");
    }
    if (accountData?.hotelAccountSpecificData.tabstatus_status === "C") {
      appContext.setPricingTick("C");
      contextValue.setPricingStatus("C");
    } else {
      appContext.setPricingTick("");
      contextValue.setPricingStatus("");
    }
    if (accountData?.hotelAccountSpecificData.tabquest_status === "C") {
      appContext.setAccSpecificTick("C");
      contextValue.setAccSpecificStatus("C");
    } else {
      appContext.accSpecificTick = "";
      appContext.setAccSpecificTick("");
      contextValue.setAccSpecificStatus("");
    }
    if (accountData?.hotelAccountSpecificData.tabgroup_status === "C") {
      appContext.setBtAccGrpTick("C");
    } else {
      appContext.btAccGrpTick = "";
      appContext.setBtAccGrpTick("");
    }
    if (accountData?.hotelAccountSpecificData.tabspecificquest_status === "C") {
      if (checkBtAccGroupTabStatus() == true) {
        appContext.setBtgTick("C");
        contextValue.setBtgStatus("C");
      } else {
        appContext.setBtgTick("");
        contextValue.setBtgStatus("");
      }
    } else {
      appContext.setBtgTick("");
      contextValue.setBtgStatus("");
    }

    if (accountData?.hotelAccountSpecificData.tabcompel_status === "C") {
      appContext.setCompelBisTick("C");
      contextValue.setCompelBisStatus("C");
    } else {
      appContext.setCompelBisTick("");
      contextValue.setCompelBisStatus("");
    }
    if (
      accountData?.hotelAccountSpecificData.tabrebid_status === "C" ||
      accountData?.hotelAccountSpecificData.rebidstatus === 2 ||
      accountData?.hotelAccountSpecificData.rebidstatus === 3
    ) {
      contextValue?.setRebidStatus("C");
      appContext?.setRebidTick("C");
    } else {
      contextValue?.setRebidStatus("");
      appContext?.setRebidTick("");
    }
    if (accountData?.hotelAccountSpecificData.tabrates_status) {
      contextValue &&
        contextValue?.setRatesRulesStatus &&
        contextValue &&
        contextValue?.setRatesRulesStatus(
          accountData?.hotelAccountSpecificData.tabrates_status
        );
      setcurstatus(accountData?.hotelAccountSpecificData.tabrates_status);
      appContext.setRateRulesTick(
        accountData?.hotelAccountSpecificData.tabrates_status
      );
    } else {
      contextValue &&
        contextValue?.setRatesRulesStatus &&
        contextValue &&
        contextValue?.setRatesRulesStatus("");
      appContext.setRateRulesTick("");
    }
    if (accountData?.hotelAccountSpecificData.tabelig_status) {
      contextValue &&
        contextValue?.setEligibilityStatus &&
        contextValue &&
        contextValue?.setEligibilityStatus(
          accountData?.hotelAccountSpecificData.tabelig_status
        );
      setcurstatus(accountData?.hotelAccountSpecificData.tabelig_status);
      appContext.setEligibilitiesTick(
        accountData?.hotelAccountSpecificData.tabelig_status
      );
    } else {
      contextValue &&
        contextValue?.setEligibilityStatus &&
        contextValue &&
        contextValue?.setEligibilityStatus("");
      appContext.setEligibilitiesTick("");
    }

    if (accountData?.hotelAccountSpecificData.tabgengroup_status === "C") {
      appContext.setGenGroupMeetingsTick("C");
      contextValue.setGenGroupMeetingsStatus("C");
    } else {
      appContext.setGenGroupMeetingsTick("");
      contextValue.setGenGroupMeetingsStatus("");
    }

    if (accountData?.hotelAccountSpecificData.showrebid === "Y") {
      tabList.splice(0, 0, {
        id: "rebidRequests",
        label: "Rebid\nRequests",
        width: "62px",
      });
      appContext.setActiveTab("rebidRequests");
      setActiveTab("rebidRequests");
      if (accountData?.hotelAccountSpecificData.rebidstatus3 !== null) {
        if (accountData?.hotelAccountSpecificData.rebidstatus3 == 2) {
          contextValue?.setIsRebidDeclined(true);
        } else {
          contextValue?.setIsRebidDeclined(false);
        }
      } else if (
        accountData?.hotelAccountSpecificData.rebidstatus3 == null &&
        accountData?.hotelAccountSpecificData.rebidstatus2 !== null
      ) {
        if (accountData?.hotelAccountSpecificData.rebidstatus2 == 2) {
          contextValue?.setIsRebidDeclined(true);
        } else {
          contextValue?.setIsRebidDeclined(false);
        }
      } else if (
        accountData?.hotelAccountSpecificData.rebidstatus3 == null &&
        accountData?.hotelAccountSpecificData.rebidstatus2 == null &&
        accountData?.hotelAccountSpecificData.rebidstatus !== null
      ) {
        if (accountData?.hotelAccountSpecificData.rebidstatus == 2) {
          contextValue?.setIsRebidDeclined(true);
        } else {
          contextValue?.setIsRebidDeclined(false);
        }
      } else {
        contextValue?.setIsRebidDeclined(false);
      }
    } else {
      appContext.setActiveTab("statusAccount");
      setActiveTab("statusAccount");
    }
    if (
      accountData?.hotelAccountSpecificData.hasaccountspecquests === "Y" ||
      (accountData?.hotelAccountSpecificData.groupmeetings === "Y" &&
        accountData?.hotelAccountSpecificData.hasgroupspecquests === "Y")
    ) {
      const index = tabList.map((object) => object.id).indexOf("blackouts");
      tabList.splice(index, 0, {
        id: "btAndGroupAccount",
        label: "BT & Group\nAccount Questions",
        width: "116px",
      });
      appContext.setIsBtAndGroupAccountTabExist(true);
    }
    if (
      accountData?.hotelAccountSpecificData.groupmeetings === "Y" &&
      accountData?.hotelAccountSpecificData.grpsmtgrespond === "Y"
    ) {
      const index = tabList.map((object) => object.id).indexOf("blackouts");
      tabList.splice(index, 0, {
        id: "groupsMeetings",
        label: "Groups &\n Meetings",
      });
      appContext.setIsGroupsAndMeetingTabExist(true);
    }
    setTabList(tabList);
    sessionStorage.setItem("TabList", JSON.stringify(tabList));
    sessionStorage.setItem("ClickedTabs", null);
    if (appContext.fromSave) {
      renderTabContent(appContext.isActiveTab);
      sessionStorage.setItem("ClickedTabs", appContext.isActiveTab);
      setActiveTabHandler(appContext.isActiveTab);
    }
    return () => {
      sessionStorage.setItem("ClickedTabs", null);
      sessionStorage.setItem("isValidASQ", null);
      sessionStorage.setItem("isValidAGM", null);
      sessionStorage.setItem("VisitedAccGroupMeet", null);
      contextValue.componentUnload();
    };
  }, []);

  const checkBtAccGroupTabStatus = () => {
    const hotelAccSpecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );
    const accountData = sessionStorage.getItem("accountSpecDetails")
      ? JSON.parse(sessionStorage.getItem("accountSpecDetails"))
      : null;
    const hasquestions = accountData?.hasquestions;
    const hasansweredquestions = accountData?.hasansweredquestions;
    let iscomplete = true;

    if (
      hotelAccSpecificData?.isLocked === "Y" &&
      hasquestions == "Y" &&
      hasansweredquestions == "N"
    ) {
      iscomplete = false;
    }
    return iscomplete;
  };

  function renderTabContent(tabId) {
    const accountData = props.data?.hotelAccountSpecific;

    if (tabId == "rebidRequests") {
      sessionStorage.setItem("isrebid", "true");
      if (sessionStorage.getItem("rebidStatus") == "3") {
        sessionStorage.setItem("tabratesStatusnew", "A");
      }
      return <PriceRebid />;
    } else if (tabId === "statusAccount") {
      return <StatusAccountPricing />;
    } else if (tabId === "rateRules") {
      sessionStorage.setItem("changedRates", "true");
      return <RatesRules />;
    } else if (tabId === "eligibilityAmenity") {
      sessionStorage.setItem("isrebid", "true");
      return <PriceEligibilityAmenity />;
    } else if (tabId === "CompellingBusiness") {
      sessionStorage.setItem("isrebid", "true");
      if (
        sessionStorage.getItem("bussinessCase") == "Y" &&
        sessionStorage.getItem("roomnight") == ""
      ) {
        sessionStorage.setItem("isrebid", "false");
        sessionStorage.setItem("tabratesStatusnew", "B");
      }
      return <CompellingBusinessCase />;
    } else if (tabId == "btAndGroupAccount") {
      if (appContext.user.role == "MFPUSER") {
        if (
          accountData.hotelAccountSpecificData.tabspecificquest_status != "C"
        ) {
          // alert(Settings.alerts.accountSpecQuestNotFilled);
        }
      }
      return <HotelSpecQuestionsTab />;
    } else if (tabId == "blackouts") {
      return <CpacBlackouts />;
    } else if (tabId == "rateNotes") {
      return <RateNotesFacility data={props.data} />;
    } else if (tabId == "groupsMeetings") {
      return <GroupsAndMeetings />;
    } else if (tabId == "accountGroups") {
      return null;
    } else if (tabId == "accountSpecific") {
      appContext.setAccSpecificTick("C");
      return null;
    } else {
      return null;
    }
  }

  useEffect(() => {
    return () => {
      setAccSpecificStatus();
    };
  }, [appContext.accSpecificTick == "C"]);

  const setAccSpecificStatus = () => {
    contextValue.setAccSpecificStatus("C");
  };

  const setRateRulesContextFlag = () => {
    if (
      (appContext.rateRulesTick === "C" &&
        prevAppContext?.rateRulesTick != appContext.rateRulesTick) ||
      (appContext.rateRulesTick === "R" &&
        prevAppContext?.rateRulesTick != appContext.rateRulesTick)
    ) {
      contextValue.setRatesRulesStatus(appContext.rateRulesTick);
    }
  };
  useEffect(() => {
    contextValue.setRatesRulesStatus(appContext?.rateRulesTick);
  }, [appContext?.rateRulesTick]);

  useEffect(() => {
    contextValue.setEligibilityStatus(appContext?.eligibilitiesTick);
  }, [appContext?.eligibilitiesTick]);
  useEffect(() => {
    contextValue.setBtgStatus(appContext?.btgTick);
  }, [appContext?.btgTick]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // setRateRulesContextFlag(); using a seperate useEffect to set Raterules tick
      if (
        (contextValue?.rebidStatus != "" &&
          prevState?.rebidStatus != contextValue?.rebidStatus) ||
        (appContext.rebidTick !== "" &&
          prevAppContext.rebidTick != appContext?.rebidTick) ||
        prevState?.facilityStatus != contextValue?.facilityStatus ||
        prevState?.blackoutStatus != contextValue?.blackoutStatus ||
        prevState?.eligibilityStatus != contextValue?.eligibilityStatus ||
        prevState?.pricingStatus != contextValue?.pricingStatus ||
        prevState?.btgStatus != contextValue?.btgStatus ||
        prevState?.accSpecificStatus != contextValue?.accSpecificStatus ||
        prevState?.compelBisStatus != contextValue?.compelBisStatus ||
        prevState?.ratesRulesStatus != contextValue?.ratesRulesStatus ||
        prevState?.genGroupMeetingsStatus !=
          contextValue?.genGroupMeetingsStatus
      ) {
        const tabs = [...tablist];
        tabs.forEach((tab) => {
          if (tab.id == "rebidRequests") {
            if (contextValue?.rebidStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue?.rebidStatus;
              //appContext.setFillRatesAndRulesFlag(true);
              const ratesRulesTab = tabs.find((tab) => tab.id === "rateRules");
              const eligibilityAmenityTab = tabs.find(
                (tab) => tab.id === "eligibilityAmenity"
              );
              ratesRulesTab.tabStatus = contextValue?.ratesRulesStatus;
              eligibilityAmenityTab.tabStatus = appContext.eligibilitiesTick;
            }
          } else if (tab.id == "rateNotes") {
            if (contextValue?.facilityStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue?.facilityStatus;
            }
          } else if (tab.id == "rateRules") {
            if (contextValue?.ratesRulesStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue?.ratesRulesStatus;
              if (appContext.eligibilitiesTick === "C") {
                const eligibilityAmenityTab = tabs.find(
                  (tab) => tab.id === "eligibilityAmenity"
                );
                eligibilityAmenityTab.tabStatus = appContext.eligibilitiesTick;
              }
            }
          } else if (tab.id == "blackouts") {
            if (contextValue?.blackoutStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue.blackoutStatus;
            }
          } else if (tab.id == "eligibilityAmenity") {
            if (contextValue?.eligibilityStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = appContext.eligibilitiesTick;
            }
          } else if (tab.id == "rebid") {
            if (contextValue?.rebidStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue.rebidStatus;
            }
          } else if (tab.id == "statusAccount") {
            if (contextValue?.pricingStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue?.pricingStatus;
            }
          } else if (tab.id == "btAndGroupAccount") {
            if (contextValue?.btgStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue?.btgStatus;
            }
          } else if (tab.id == "accountSpecific") {
            if (contextValue?.accSpecificStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue?.accSpecificStatus;
            }
          } else if (tab.id == "CompellingBusiness") {
            if (contextValue?.compelBisStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue?.compelBisStatus;
            }
          } else if (tab.id == "groupsMeetings") {
            if (contextValue?.genGroupMeetingsStatus == null) {
              if (tab.tabStatus) {
                delete tab.tabStatus;
              }
            } else {
              tab.tabStatus = contextValue?.genGroupMeetingsStatus;
            }
          }
        });
        setTabList(tabs);
      }
    }
  });

  function setActiveTabHandler(event) {
    appContext.setActiveTab(event);
    setActiveTab(event);
  }

  function swtichTabHandler(event) {
    const el = document.getElementById(event.target.id);
    el?.scrollIntoView();
    appContext.setActiveTab(event.target.id);
    const arr = contextValue.state.clickedTabs;
    sessionStorage.setItem("ClickedTabs", [...arr, event.target.id]);
    if (activeTab === "rateRules" && event.target.id !== "rateRules") {
      sessionStorage.setItem("rateRuleTabSwitch", "true");
    }
    if (activeTab === "rebidRequests" && event.target.id !== "rebidRequests") {
      sessionStorage.setItem("rebidTabSwitch", "true");
    }
    const tabs = [...tablist];
    if (appContext.errorMessageAlert.show) {
      event.preventDefault();
      appContext.setDisplayNavigationAlert(!appContext.displayNavigationAlert);
      appContext.setActiveTab(activeTab);
      sessionStorage.setItem("rateRuleTabSwitch", "false");
      sessionStorage.setItem("rebidTabSwitch", "false");
    } else if (
      appContext.noRedirect &&
      event.target.id !== "btAndGroupAccount" &&
      appContext.user.isHotelUser
    ) {
      appContext.setActiveTab("btAndGroupAccount");
      alert(Settings.emptryAlert);
    } else if (
      appContext.groupsAndMeetingError.show &&
      event.target.id !== "groupsMeetings" &&
      appContext.user.isHotelUser
    ) {
      event.preventDefault();
      appContext.setActiveTab("groupsMeetings");
      alert(appContext.groupsAndMeetingError.msg);
    } else {
      if (
        event.target.id !== "rebidRequests" &&
        contextValue.errorMessage !== ""
      ) {
        alert(contextValue.errorMessage);
        appContext.setActiveTab("rebidRequests");
        event.preventDefault();
        sessionStorage.setItem("rebidTabSwitch", "false");
      } else if (
        event.target.id !== "rebidRequests" &&
        contextValue.tabNavError !== ""
      ) {
        alert(contextValue.tabNavError);
        appContext.setActiveTab("rebidRequests");
        event.preventDefault();
        sessionStorage.setItem("rebidTabSwitch", "false");
      } else if (event.target.id !== "rateRules") {
        const reData = JSON.parse(localStorage.getItem("ratesData"));
        const hasdOrg = JSON.parse(localStorage.getItem("orginalRatesData"));
        const ratesObj = JSON.parse(localStorage.getItem("ratesData"));

        if (
          appContext.rateRulesValidationMsg !== "" ||
          appContext.rateRulesValidationdateMsg !== "" ||
          appContext.rateRulesValidationAccLockedMsg !== "" ||
          appContext.rateRulesValidationPercentMsg !== "" ||
          appContext.rateRulesValidAccDeleteMsg !== "" ||
          appContext.rateRulesanswerCancellation !== "" ||
          appContext.rateRulesStayTierMsg !== "" ||
          appContext.rateRulesLOSMsg !== "" ||
          appContext.accountLockedLowHighMsg !== "" ||
          appContext.rateRulesRejectionReasonMsg !== ""
        ) {
          if (appContext.rateRulesAllValidationMsg !== "") {
            alert(appContext.rateRulesAllValidationMsg);
          } else if (appContext.rateRulesRejectionReasonMsg !== "") {
            alert(appContext.rateRulesRejectionReasonMsg);
          }
        } else if (appContext.dateValidationMsg !== "") {
          alert(appContext.dateValidationMsg);
        } else if (
          appContext.oneTimeNavigationAlert.show &&
          !appContext.oneTimeNavigationAlert.navigate
        ) {
          event.preventDefault();
          if (appContext.oneTimeNavigationAlert.message !== "") {
            alert(appContext.oneTimeNavigationAlert.message);
          }
          appContext.setActiveTab(activeTab);
          sessionStorage.setItem("rateRuleTabSwitch", "false");
          appContext.setOneTimeNavigationAlert({
            show: false,
            message: "",
            navigate: false,
          });
        } else {
          if (appContext.navigateWithAlert !== "") {
            alert(appContext.navigateWithAlert);
            appContext.setNavigateWithAlert("");
          } else if (
            appContext.oneTimeNavigationAlert.show &&
            appContext.oneTimeNavigationAlert.navigate
          ) {
            if (appContext.oneTimeNavigationAlert.message !== "") {
              alert(appContext.oneTimeNavigationAlert.message);
            }
            appContext.setOneTimeNavigationAlert({
              show: false,
              message: "",
              navigate: false,
            });
          }
          setActiveTab(event.target.id);
          appContext.setActiveTab(event.target.id);
        }
      } else {
        arr.push(event.target.id);
        if (
          event.target.id === "rateNotes" ||
          event.target.id === "rateRules" ||
          event.target.id === "rebidRequests"
        ) {
          contextValue.setState({
            ...contextValue.state,
            clickedTabs: arr,
            activeTab: event.target.id,
          });

          setActiveTab(event.target.id);
          appContext.setActiveTab(event.target.id);
        } else {
          appContext.setActiveTab("");
          if (contextValue.state.clickedTabs.length > 0) {
            contextValue.state.clickedTabs.length > 0 &&
              contextValue.state.clickedTabs.map((eachClickedTab) => {
                tabs.length > 0 &&
                  tabs.map((eachTab) => {
                    if (eachClickedTab === "rateNotes") {
                      if (eachTab.id === eachClickedTab) {
                        eachTab.tabStatus = "C";
                      }
                      contextValue.setRebidAction("tabnavigation");
                    } else {
                      contextValue.setRebidAction("tabnavigation");
                    }
                  });
              });
          }
          contextValue.setState({
            ...contextValue.state,
            activeTab: event.target.id,
          });
          if (appContext.rateNotesValidationErr) {
            setActiveTab("rateRules");
            alert(appContext.rateNotesValidationMsg);
            appContext.setActiveTab("rateRules");
          } else {
            setActiveTab(event.target.id);
            appContext.setActiveTab(event.target.id);
          }
          setTabList(tabs);
        }
      }
    }
    if (event.target.id !== "rateRules" && activeTab === "rateRules") {
      appContext.setSwitchTabFlag(true);
    }
    if (event.target.id === "rateRules" && activeTab !== "rateRules") {
      sessionStorage.setItem("rateRuleTabSwitch", "false");
    }
    if (
      event.target.id === "btAndGroupAccount" &&
      activeTab != "btAndGroupAccount"
    ) {
      sessionStorage.setItem("changedQuestions", "false");
    }
    if (
      event.target.id == "eligibilityAmenity" &&
      activeTab != "eligibilityAmenity"
    ) {
      sessionStorage.setItem("changedAmenities", "false");
    }
    if (event.target.id !== "blackouts" && activeTab === "blackouts") {
      appContext.setSwitchBlackoutTabFlag(true);
    }
    if (
      event.target.id !== "eligibilityAmenity" &&
      activeTab === "eligibilityAmenity"
    ) {
      appContext.setSwitchEligTabFlag(true);
    }
    if (event.target.id == "rebidRequests" && activeTab !== "rebidRequests") {
      sessionStorage.setItem("rebidTabSwitch", "false");
    }
    if (event.target.id !== "rebidRequests" && activeTab === "rebidRequests") {
      appContext.setRebidTabSwitchFlag(true);
    }
  }
  const tabData = (e) => {
    console.log(e, "event");
  };

  return (
    <AccountCenterTabsContextProvider>
      <AccountCenterTabsContext.Consumer>
        {(statusaccountpricingContext) => {
          contextValue = statusaccountpricingContext;
          return (
            <>
              <div className={styles.pageOutterOutline}>
                <div
                  className={classNames(
                    styles.pageOutline,
                    styles.updatehotelpageOutline
                  )}
                >
                  <CTabList
                    tabs={tablist}
                    selectedTab={activeTab}
                    onClick={(e) => swtichTabHandler(e)}
                    showScroll={false}
                    componentName="priceTabs"
                    showTick={true}
                    isDeviceResized={isDeviceResized}
                    className={"cpricetabdes"}
                  />
                  <Suspense fallback={<CSuspense />}>
                    {renderTabContent(activeTab)}
                  </Suspense>
                </div>
              </div>
              <style>{`
              .cpricetabdes{
                  background-color: #f2f2f2;
                  border: 1px solid #ccc;
                  margin-top: 12px;
                  padding-top: 2px;
                  padding-left: 2px;
              }
              .tabListitems{
                display: inline-flex;
              }
              .cpacpricetabdesign{
                height:26px;
              }
              .tabListitems > span{
                  width:72px;
              }
              .tabListitems > span#statusAccount{
                width:112px;
              }
              .tabListitems > span#btAndGroupAccount{
                width:98px;
              }
              @media only screen and (max-width: 1000px) {
                .page_body_container {
                min-height: calc(100vh - 90px) !important;
                }
              }
              `}</style>
            </>
          );
        }}
      </AccountCenterTabsContext.Consumer>
    </AccountCenterTabsContextProvider>
  );
}
export default AccountCenterTabs;
