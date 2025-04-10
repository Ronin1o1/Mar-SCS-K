import React, { Suspense, useContext } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ToggleButton } from "primereact/togglebutton";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import CTabList from "../../../common/components/CTabList";
import CSuspense from "../../../common/components/CSuspense";
import HomeContext from "../context/HomeContext";
import Settings from "../static/settings";
import API from "../service/API";
import AccountStatusRequest from "./AccountStatusRequest";
import HotelSelect from "./HotelSelect";
import styles from "./Home.css";

const AccountStatus = React.forwardRef((props, ref) => {
  const homeContext = useContext(HomeContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const fetchData = (e) => {
    homeContext.setIsLoading(true);
    homeContext.setActiveTab(e.target.id);
    API.getTabRequest(e.target.id, homeContext.SelectHotel.marshacode).then(
      (data) => {
        homeContext.setRequestDetails(data);
        homeContext.setIsLoading(false);
      }
    );
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case "cbcRequests":
        return (
          <AccountStatusRequest
            noRecordsMessage={Settings.noCbcRequestsMessage}
            tabTitle={Settings.cbcRequestsTitle}
            tabId={homeContext.activeTab}
          />
        );
      case "pricingRequests":
        return (
          <AccountStatusRequest
            noRecordsMessage={Settings.noPricingRequestsMessage}
            tabTitle={Settings.pricingRequestsTitle}
            tabId={homeContext.activeTab}
          />
        );
      case "accountStatus":
        return (
          <AccountStatusRequest
            noRecordsMessage={Settings.noAccountStatusMessage}
            tabTitle={Settings.accountStatusTitle}
            tabId={homeContext.activeTab}
          />
        );
      case "rebidRequests":
        return (
          <AccountStatusRequest
            noRecordsMessage={Settings.noRebidRequestsMessage}
            tabTitle={Settings.rebidRequestsTitle}
            tabId={homeContext.activeTab}
          />
        );
    }
    return "";
  };

  return appContext.user.isPASAdmin || appContext.user.isHotelUser ? (
    <Accordion
      activeIndex={0}
      expandIcon={`${styles.customCaret} ${styles.rightCaret}`}
      collapseIcon={`${styles.customCaret} ${styles.downCaret}`}
    >
      <AccordionTab
        header={
          <div
            ref={ref}
            data-handler-id={props.handlerId}
            style={{ cursor: "move" }}
          >
            <ToggleButton
              checked={homeContext.checkedAccount}
              onChange={(e) => homeContext.setCheckedAccount(e.value)}
              onLabel={Settings.accountStatusChanges}
              offLabel={Settings.accountStatusChanges}
              className={styles.paneltoggle}
            />
          </div>
        }
        headerClassName={`${styles.dijitTitlePaneTitle} ${styles.dijitTitlePaneAccount} ${styles.cursorMove}`}
      >
        <div
          className={`${styles.dijitTitlePaneContentOuter}`}
          data-dojo-attach-point="hideNode"
          role="presentation"
        >
          <div
            className={`${styles.dijitReset}`}
            data-dojo-attach-point="wipeNode"
            role="presentation"
          >
            <div
              className={`${styles.dijitTitlePaneContentInner}`}
              data-dojo-attach-point="containerNode"
              role="region"
              id="dijit_TitlePane_2_pane"
              aria-labelledby="dijit_TitlePane_2_titleBarNode"
              aria-hidden="false"
            >
              <div
                data-dojo-type="dijit.layout.LayoutContainer"
                id="lc"
                className={`${styles.dijitLayoutContainer} ${styles.accountHeader}`}
              >
                <input
                  type="hidden"
                  id="userPrefs.marshaCode"
                  name="userPrefs.marshaCode"
                  defaultValue={0}
                />
                <div
                  data-dojo-type="dijit.layout.ContentPane"
                  id="contentpane_hotel"
                >
                  <HotelSelect token={Settings.hotel} id={"card_1"} />
                </div>
                <div
                  data-dojo-type="dijit.layout.ContentPane"
                  id="contentpane_tabs"
                  className={`${styles.dijitContentPane} ${styles.accountTab} ${styles.dijitContentPaneSingleChild}`}
                >
                  <div
                    className={`${styles.dijitTabContainer} ${styles.accountTabContainer} ${styles.dijitLayoutContainer}`}
                    id="topTabs1"
                  >
                    <CTabList
                      tabs={Settings.tabList}
                      selectedTab={homeContext.activeTab}
                      onClick={(e) => fetchData(e)}
                      showScroll={false}
                      componentName="accountStatusTabs"
                      className={styles.tabStyle}
                    />
                    <Suspense fallback={<CSuspense />}>
                      {renderTabContent(homeContext.activeTab)}
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  ) : null;
});

AccountStatus.displayName = "AccountStatus";
export default AccountStatus;
