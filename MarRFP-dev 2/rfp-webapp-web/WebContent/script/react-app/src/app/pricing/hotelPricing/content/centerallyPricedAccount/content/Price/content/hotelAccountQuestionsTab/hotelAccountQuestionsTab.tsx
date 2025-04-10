import React, { Suspense, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./hotelAccountQuestionsTab.css";
import Settings from "./Settings";
import CTabList from "../../../../../../../../common/components/CTabList";
import CSuspense from "../../../../../../../../common/components/CSuspense";
import HotelAccountQuestionsContext, {
  HotelAccountQuestionsContextProvider,
} from "./hotelAccountQuestionsContext";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../common/components/ApplicationContext";
import AccountCenterTabsContext from "../../context/AccountCenterTabsContext";

const AccSpecQuesTab = React.lazy(
  () =>
    import(
      /* webpackChunkName: "/pricing/hotelPricing/centerallyPricedAccount/Price/hotelAccountQuestionsTab/pricing.hotelPricing.centerallyPricedAccount.Price.hotelAccountQuestionsTab.accSpecQuest" */ "./Tabs/accSpecQuest"
    )
);

const AccGroupMeet = React.lazy(
  () =>
    import(
      /* webpackChunkName: "/pricing/hotelPricing/centerallyPricedAccount/Price/hotelAccountQuestionsTab/pricing.hotelPricing.centerallyPricedAccount.Price.hotelAccountQuestionsTab.accGroupMeet" */ "./Tabs/accGroupMeet"
    )
);

let contextValue = null;

function HotelAccountQuestionsTab(props) {
  const urlParms = useLocation().search;
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContext = useContext(AccountCenterTabsContext);
  const hotel_accountinfoid = new URLSearchParams(urlParms).get(
    "AccountInfoId"
  );
  let accSpecData = localStorage.getItem("hotelAccountSpecificData");
  if (accSpecData) {
    accSpecData = JSON.parse(accSpecData);
  }

  const renderTabContent = (tabId) => {
    if (tabId === "btQuestTabs") {
      return <AccSpecQuesTab />;
    } else if (tabId === "accQuestTab") {
      return <AccGroupMeet />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    contextValue.getTabList(hotel_accountinfoid);
  }, [hotel_accountinfoid]);

  useEffect(() => {
    return () => {
      contextValue.checkMainBtgroupTab();
    };
  }, []);

  function swtichTabHandler(event) {
    contextValue.switchTab(event);
  }

  useEffect(() => {
    if (
      (appContext.isActiveTab === "btAndGroupAccount" &&
        contextValue.state.activeTab === "btQuestTabs" &&
        appContext.saveBTGClicked) ||
      (appContext.isActiveTab === "btAndGroupAccount" &&
        contextValue.state.activeTab === "accQuestTab" &&
        appContext.saveBTGClicked)
    ) {
      contextValue.checkMainBtgroupTab();
      if (
        !appContext.noRedirect &&
        appContext.markAsCompleteErrorAlert.show &&
        appContext?.user?.isHotelUser
      ) {
        if (appContext.markAsCompleteErrorAlert.message !== "") {
          alert(appContext.markAsCompleteErrorAlert.message);
        }
      }
      appContext.setSaveBTGClicked(false);
    }
  }, [appContext.saveBTGClicked]);

  return (
    <HotelAccountQuestionsContextProvider>
      <HotelAccountQuestionsContext.Consumer>
        {(hotelAccQuestContext) => {
          contextValue = hotelAccQuestContext;
          return (
            <div className={styles.pageOutterOutline}>
              <div
                className={`${
                  styles.pageOutline
                } ${"updatehotelaccountquestion"}`}
              >
                {contextValue.quest && !contextValue.meet && (
                  <CTabList
                    tabs={Settings.tabListBT.map((t) => {
                      if (
                        appContext?.accSpecificTick != "" &&
                        appContext?.accSpecificTick != null
                      ) {
                        t.tabStatus = appContext?.accSpecificTick;
                      } else {
                        delete t.tabStatus;
                      }
                      return t;
                    })}
                    selectedTab={contextValue.state.activeTab}
                    onClick={(e) => swtichTabHandler(e)}
                    componentName="btQuestions"
                    showScroll={false}
                    showTick={true}
                  />
                )}

                {contextValue.meet && !contextValue.quest && (
                  <CTabList
                    tabs={Settings.tabListGroup.map((t) => {
                      if (
                        appContext?.btAccGrpTick != "" &&
                        appContext?.btAccGrpTick != null
                      ) {
                        t.tabStatus = appContext?.btAccGrpTick;
                      } else {
                        delete t.tabStatus;
                      }
                      return t;
                    })}
                    selectedTab={contextValue.state.activeTab}
                    onClick={(e) => swtichTabHandler(e)}
                    componentName="btQuestions"
                    showScroll={false}
                    showTick={true}
                  />
                )}

                {contextValue.quest && contextValue.meet && (
                  <CTabList
                    tabs={Settings.tabListAll.map((t) => {
                      if (t.id == "accQuestTab") {
                        if (
                          appContext?.btAccGrpTick != "" &&
                          appContext?.btAccGrpTick != null
                        ) {
                          t.tabStatus = appContext?.btAccGrpTick;
                        } else {
                          delete t.tabStatus;
                        }
                      }
                      if (t.id == "btQuestTabs") {
                        if (
                          appContext?.accSpecificTick != "" &&
                          appContext?.accSpecificTick != null
                        ) {
                          t.tabStatus = appContext?.accSpecificTick;
                        } else {
                          delete t.tabStatus;
                        }
                      }
                      return t;
                    })}
                    selectedTab={contextValue.state.activeTab}
                    onClick={(e) => swtichTabHandler(e)}
                    componentName="btQuestions"
                    showScroll={false}
                    showTick={true}
                  />
                )}

                <Suspense fallback={<CSuspense />}>
                  {renderTabContent(contextValue.state.activeTab)}
                </Suspense>
              </div>
            </div>
          );
        }}
      </HotelAccountQuestionsContext.Consumer>
    </HotelAccountQuestionsContextProvider>
  );
}

export default HotelAccountQuestionsTab;
