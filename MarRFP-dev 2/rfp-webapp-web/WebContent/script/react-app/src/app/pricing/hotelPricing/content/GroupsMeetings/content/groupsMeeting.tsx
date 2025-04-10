import React, { Suspense, useContext, useEffect, useState } from "react";
import styles from "./groupsMeeting.css";
import { useLocation } from "react-router-dom";

import HotelContext, {
  HotelContextProvider,
} from "../context/groupMeetingContextProvider";
import screenLoader from "../../../../../common/assets/img/screenloader.gif";
import btnSave from "../../../../../common/assets/img/btnSave.gif";

import CSelect from "../../../../../common/components/CSelect";
import CTabList from "../../../../../common/components/CTabList";
import CSuspense from "../../../../../common/components/CSuspense";

import "core-js/stable";
import "regenerator-runtime/runtime";
import Settings from "../static/Settings";
import API from "../service/API";
import { Layout } from "../../../routing/Layout";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../common/components/ApplicationContext";
import HotelPricingContext from "../../../context/hotelPricingContextProvider";
import { useHistory } from "react-router-dom";

const GroupPricing = React.lazy(
  () =>
    import(
      /* webpackChunkName: "/pricing/hotelPricing/GroupsMeetings/pricing.hotelPricing.GroupsMeetings.groupPricing" */ "../Tabs/groupPricing/groupPricing"
    )
);
const Meeting = React.lazy(
  () =>
    import(
      /* webpackChunkName: "/pricing/hotelPricing/GroupsMeetings/pricing.hotelPricing.GroupsMeetings.meeting" */ "../Tabs/meeting/meeting"
    )
);
const GroupsMeetingsPayment = React.lazy(
  () =>
    import(
      /* webpackChunkName: "/pricing/hotelPricing/GroupsMeetings/pricing.hotelPricing.GroupsMeetings.groupsMeetingsPayment" */ "../Tabs/groupsMeetingsPayment/groupsMeetingsPayment"
    )
);

let contextType = null;

function groupsMeeting() {
  const urlParms = useLocation().search;
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const parentContextType = useContext(HotelPricingContext);
  const marshaCode = new URLSearchParams(urlParms).get("MarshaCode");
  const hotelName = new URLSearchParams(urlParms).get("HotelName");
  const period = new URLSearchParams(urlParms).get("Period");
  const [isLoading, setIsLoading] = useState(false);
  const hotelrfpid =
    new URLSearchParams(urlParms).get("Hotelrfpid") == 0 ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == "0" ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == null ||
    new URLSearchParams(urlParms).get("Hotelrfpid") == undefined
      ? parentContextType?.selectedHotelRfpId
      : new URLSearchParams(urlParms).get("Hotelrfpid");
  const history = useHistory();

  function renderTabContent(tabId) {
    if (tabId === "groupPricing") {
      contextType.state.currtab = "tabGrpPrice";
      return <GroupPricing />;
    } else if (tabId == "meeting") {
      contextType.state.currtab = "tabMtgPrice";
      return <Meeting />;
    } else if (tabId === "groupsMeetingsPayment") {
      contextType.state.currtab = "tabPayment";
      return <GroupsMeetingsPayment />;
    }
    return <GroupPricing />;
  }

  function swtichTabHandler(event) {
    const prevActiveTab = contextType.state.activeTab;

    if (prevActiveTab === Settings.groupMeetingsList.tabs.tablist[0].id) {
      appContext.setTabNameGrpMeet("grpPrice");
      if (appContext?.user?.isHotelUser && appContext.errorMessageAlert.show) {
        if (
          event.target.id == "meeting" &&
          (appContext.errorMessageAlert.message ==
            Settings.alerts.meeting_field_required ||
            appContext.errorMessageAlert.message ==
              Settings.alerts.payment_field_required)
        ) {
          appContext.setErrorMessageAlert({
            show: false,
            message: "",
            type: "browserAlert",
          });
          contextType.switchTab(event);
        } else if (
          event.target.id == "groupsMeetingsPayment" &&
          (appContext.errorMessageAlert.message ==
            Settings.alerts.payment_field_required ||
            appContext.errorMessageAlert.message ==
              Settings.alerts.meeting_field_required)
        ) {
          appContext.setErrorMessageAlert({
            show: false,
            message: "",
            type: "browserAlert",
          });
          contextType.switchTab(event);
        } else {
          alert(appContext.errorMessageAlert.message);
        }
      } else {
        contextType.switchTab(event);
      }
    } else if (
      prevActiveTab === Settings.groupMeetingsList.tabs.tablist[1].id
    ) {
      appContext.setTabNameGrpMeet("grpMeeting");
      if (appContext?.user?.isHotelUser && appContext.errorMessageAlert.show) {
        if (
          event.target.id == "groupsMeetingsPayment" &&
          appContext.errorMessageAlert.message ==
            Settings.alerts.payment_field_required
        ) {
          contextType.switchTab(event);
        } else if (
          event.target.id == "groupsMeetingsPayment" &&
          appContext.errorMessageAlert.message ==
            Settings.alerts.meeting_field_required
        ) {
          alert(appContext.errorMessageAlert.message);
        } else if (
          event.target.id == "groupPricing" &&
          sessionStorage.getItem("UpdateMeetingGrpFlag") === "C"
        ) {
          contextType.switchTab(event);
        } else {
          alert(appContext.errorMessageAlert.message);
        }
      } else {
        contextType.switchTab(event);
      }
    } else if (
      prevActiveTab === Settings.groupMeetingsList.tabs.tablist[2].id
    ) {
      appContext.setTabNameGrpMeet("grpPayment");
      if (appContext?.user?.isHotelUser && appContext.errorMessageAlert.show) {
        if (
          event.target.id == "groupPricing" &&
          sessionStorage.getItem("UpdatePaymentGrpFlag") == "C" &&
          appContext.errorMessageAlert.message ==
            Settings.alerts.payment_field_required
        ) {
          contextType.switchTab(event);
        } else if (
          event.target.id == "meeting" &&
          sessionStorage.getItem("UpdatePaymentGrpFlag") == "C" &&
          appContext.errorMessageAlert.message ==
            Settings.alerts.payment_field_required
        ) {
          contextType.switchTab(event);
        } else {
          alert(appContext.errorMessageAlert.message);
        }
      } else {
        contextType.switchTab(event);
      }
    } else {
      contextType.switchTab(event);
      appContext.setTabNameGrpMeet("");
    }
  }

  const fetchGroupsAndMeetingData = () => {
    const param = {
      marshaCode: marshaCode,
      hotelName: hotelName,
      hotelrfpid: hotelrfpid,
      period: period,
    };
    contextType.setMasterData({
      ...contextType.masterData,
      marshaCode: param.marshaCode,
      hotelName: param.hotelName,
      period: param.period,
      hotelrfpid: param.hotelrfpid,
    });
    API.getHotelRFPGrpsAndMeetings(param).then((data) => {
      contextType.setGroupsAndMeetingData(data);
      if (data.menu) {
        parentContextType.setState({
          ...parentContextType.state,
          gridData: {
            ...parentContextType.state.gridData,
            list: {
              ...parentContextType.state.gridData.list,
              menu: data.menu,
            },
          },
        });
      }
      setIsLoading(false);
      appContext.setCpacLoader(false);
    });

    contextType.getTablist();
  };

  useEffect(() => {
    setIsLoading(true);
    appContext.setCpacLoader(true);
    if (
      (history?.location?.prevPath &&
        !history?.location?.prevPath?.includes("Blackout") &&
        !history?.location?.prevPath?.includes("Standards") &&
        !history?.location?.prevPath?.includes("PriceContact") &&
        !history?.location?.prevPath?.includes("Seasons") &&
        !history?.location?.prevPath?.includes("DepthOfSale") &&
        !history?.location?.prevPath?.includes("eligibilityAmenity")) ||
      history?.location?.prevPath == undefined ||
      history?.location?.prevPath == null ||
      history?.location?.prevPath == ""
    ) {
      fetchGroupsAndMeetingData();
    }
    return () => {
      appContext.setErrorMessageAlert({
        show: false,
        message: "",
        type: "browserAlert",
      });
      contextType.saveGroupsAndMeeting(event, false);
      contextType.componentUnload();
    };
  }, []);

  useEffect(() => {
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("PriceContact") &&
      parentContextType?.completionState?.PricingContact == "Y"
    ) {
      fetchGroupsAndMeetingData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        PricingContact: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Standards") &&
      parentContextType?.completionState?.Standards == "Y"
    ) {
      fetchGroupsAndMeetingData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Standards: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Seasons") &&
      parentContextType?.completionState?.Seasons == "Y"
    ) {
      fetchGroupsAndMeetingData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Seasons: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("DepthOfSale") &&
      parentContextType?.completionState?.DepthOfSales == "Y"
    ) {
      fetchGroupsAndMeetingData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        DepthOfSales: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("Blackout") &&
      parentContextType?.completionState?.Blackout == "Y"
    ) {
      fetchGroupsAndMeetingData();
      parentContextType.setCompletionState({
        ...parentContextType.completionState,
        Blackout: "N",
      });
    }
    if (
      history?.location?.prevPath &&
      history?.location?.prevPath?.includes("eligibilityAmenity") &&
      parentContextType?.completionState?.EligAmen == "Y"
    ) {
      setTimeout(() => {
        fetchGroupsAndMeetingData();
        parentContextType.setCompletionState({
          ...parentContextType.completionState,
          EligAmen: "N",
        });
      }, 500);
    }
  }, [
    parentContextType?.completionState?.PricingContact,
    parentContextType?.completionState?.Blackout,
    parentContextType?.completionState?.Standards,
    parentContextType?.completionState?.Seasons,
    parentContextType?.completionState?.DepthOfSales,
    parentContextType?.completionState?.EligAmen,
  ]);

  return (
    <Layout>
      <HotelContextProvider>
        <HotelContext.Consumer>
          {(CenterallyPricedAccount) => {
            contextType = CenterallyPricedAccount;
            return (
              <div className={styles.groupsandmettings}>
                {contextType.state.showScreenLoader || isLoading ? (
                  <img
                    style={{ position: "absolute", top: "50%", left: "50%" }}
                    src={screenLoader}
                  />
                ) : (
                  <div className={styles.groupsandmeercntent}>
                    <div>
                      <p className={styles.instructions}>
                        {Settings.instructions.details}
                      </p>
                      <p className={styles.instructions}>
                        {Settings.instructions.sub_details_one}
                        <span className={styles.underlineText}>
                          {Settings.instructions.sub_details_highest}
                        </span>
                        {Settings.instructions.sub_details_two}
                        <span className={styles.underlineText}>
                          {Settings.instructions.sub_details_starting_point}
                        </span>
                        {Settings.instructions.sub_details_three}
                        <span className={styles.italicText}>
                          {Settings.instructions.note}
                        </span>
                      </p>
                      <p className={styles.strongTitle}>
                        <span>{Settings.instructions.header}</span>
                      </p>
                      <p className={styles.instructions}>
                        {Settings.instructions.sub_header}
                      </p>
                      <button className={styles.pointerClass}>
                        <img
                          src={btnSave}
                          tabIndex={0}
                          onClick={(e) =>
                            contextType.saveGroupsAndMeeting(e, true)
                          }
                        />
                      </button>
                    </div>
                    <div>
                      <p
                        style={{ display: "flex" }}
                        className={`${styles.dropdownlabel}`}
                      >
                        <div
                          data-tip
                          data-for={
                            Settings.tooltipMessages.groupMeetingResponsesid
                          }
                        >
                          <span>{Settings.instructions.drop_down_title}</span>
                          {(appContext.user.role == "MFPSALES" ||
                            appContext.user.role == "MFPFSALE") &&
                            contextType.state.isDisabledGrpCon &&
                            !contextType.state.groupMeetingData.list
                              .offer_in_bt_rfp_text && (
                              <span className={styles.groupAns}>NO</span>
                            )}
                        </div>
                        <div>
                          {contextType.state.isDisabledGrpCon ? (
                            <label className={styles.normalText}>
                              {
                                contextType.state.groupMeetingData.list
                                  .offer_in_bt_rfp_text
                              }
                            </label>
                          ) : (
                            <CSelect
                              id={
                                Settings.groupMeetingsList.filter.formFields
                                  .groupMeetingOption.id
                              }
                              selectedValue={
                                contextType.state.groupMeetingData.list
                                  .offer_in_bt_rfp
                              }
                              ddnOptions={
                                Settings.groupMeetingsList.filter
                                  .groupMeetingOptions
                              }
                              onChange={(e) => {
                                contextType.handleDropdownChange(e);
                              }}
                              keyField={
                                Settings.groupMeetingsList.filter.formFields
                                  .groupMeetingOption.keyField
                              }
                              valField={
                                Settings.groupMeetingsList.filter.formFields
                                  .groupMeetingOption.valField
                              }
                            />
                          )}
                        </div>
                      </p>
                    </div>
                    <div className={styles.tabdesign}>
                      {contextType.state.showTab ||
                      contextType.state.groupMeetingData.list.grpsmtgrespond ===
                        "Y" ? (
                        <React.Fragment>
                          <CTabList
                            tabs={contextType.getTablist()}
                            selectedTab={contextType.state.activeTab}
                            onClick={(e) => swtichTabHandler(e)}
                            showTick={true}
                            componentName={"groupsMeeting"}
                            showScroll={false}
                          />
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <div className={styles.tabdesignsetting}>
                        {contextType.state.showTab ||
                        contextType.state.groupMeetingData.list
                          .grpsmtgrespond === "Y" ? (
                          <Suspense fallback={<CSuspense />}>
                            {renderTabContent(contextType.state.activeTab)}
                          </Suspense>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <style>
                  {`
                  .place-right {
                    margin-left: 0 !important;
                  }
                  @media only screen and (max-width: 1400px){
                    .page_body_container {
                        min-height: calc(100vh - 106px) !important;
                    }
                  }
                  @media only screen and (max-width: 1050px){
                    .footerwidget{
                      position:fixed;
                    }
                   }
                  `}
                </style>
              </div>
            );
          }}
        </HotelContext.Consumer>
      </HotelContextProvider>
    </Layout>
  );
}

export default groupsMeeting;
