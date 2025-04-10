import React, { useContext, useEffect, useRef } from "react";
import { useLocation, useHistory, Prompt } from "react-router-dom";
import styles from "../content/PriceRebid.css";
import API from "../service/API";
import PriceRebidContext, {
  PriceRebidContextProvider,
} from "../context/PriceRebidContext";
import classnames from "classnames";
import Settings from "../static/Settings";
import Utils from "../../../../../../../../../common/utils/Utils";
import CSelect from "../../../../../../../../../common/components/CSelect";
import AccountCenterTabsContext from "../../../context/AccountCenterTabsContext";
//import CPACAPI from "../../../../../../../../hotelPricing/content/centerallyPricedAccount/service/API";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../../../common/components/ApplicationContext";
import { CLoader } from "../../../../../../../../../common/components/CLoader";
let contextType = null;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function PriceRebid() {
  const parentContext = useContext(AccountCenterTabsContext);
  const urlParms = useLocation().search;
  const accountInfoId = new URLSearchParams(urlParms).get("AccountInfoId");
  const hotelId = new URLSearchParams(urlParms).get("HotelId");
  const hotelrfpid = new URLSearchParams(urlParms).get("Hotelrfpid");
  const history = useHistory();
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const prevAppContext = usePrevious(appContext);
  const mounted = useRef();

  const updateRebid = (action?: string) => {
    appContext.setRebidStatus(contextType.rebidCheckStatus);
    const hotelAccSpecificData = JSON.parse(
      localStorage.getItem("hotelAccountSpecificData")
    );
    if (
      contextType.rebidCheckStatus == "complete" ||
      contextType.rebidCheckStatus == "continue" ||
      contextType.rebidCheckStatus == "failed"
    ) {
      contextType.updateRebit().then((res) => {
        if (res == "success") {
          API.getRebidData(accountInfoId).then((data) => {
            if (data != "error") {
              if (
                data.hasRebidViewInfo?.rebidstatusidedit == 2 ||
                data.hasRebidViewInfo?.rebidstatusidedit == "2"
              ) {
                parentContext.setIsRebidDeclined(true);
              } else {
                parentContext.setIsRebidDeclined(false);
              }
              if (action && action == "save") {
                parentContext.setRebidAction("tabnavigation");
              }
              if (contextType.rebidCheckStatus == "complete") {
                parentContext.setRebidStatus("C");
                appContext.setRebidTick("C");
                appContext.setPriceRebidScreenFlags({
                  rebidTab: "C",
                  eligAmenityTab: "",
                  ratesRulesTab: "",
                });
              } else if (
                contextType.rebidCheckStatus == "continue" ||
                contextType.rebidCheckStatus == "failed"
              ) {
                parentContext.setRebidStatus(null);
                appContext.setRebidTick("");
                appContext.setPriceRebidScreenFlags({
                  rebidTab: "",
                  eligAmenityTab: "",
                  ratesRulesTab: "",
                });
              }
              let prevRebidStatus =
                contextType.isFormChanged == "Y" &&
                appContext.markAsCompleteErrorAlert.show
                  ? sessionStorage.getItem("initialRebidStatus")
                  : contextType.prevRebidStatus;

              if (
                contextType.state.roleDetails?.isAnySalesUser ||
                contextType.state.roleDetails?.isLimitedSalesUser ||
                contextType.state.roleDetails?.isHotelUser
              ) {
                if (
                  data.hasRebidViewInfo?.rebidstatusidedit == 3 &&
                  prevRebidStatus &&
                  (prevRebidStatus !== 3 || prevRebidStatus == "3")
                ) {
                  prevRebidStatus = data.hasRebidViewInfo?.rebidstatusidedit;
                  parentContext.ratesRulesStatus = "R";
                  parentContext.setRatesRulesStatus(
                    parentContext.ratesRulesStatus
                  );
                  appContext.rateRulesTick = "R";
                  appContext.setRateRulesTick(appContext.rateRulesTick);
                  parentContext.setEligibilityStatus("R");
                  appContext.setEligibilitiesTick("R");
                  if (hotelAccSpecificData?.allow_qmodify === "Y") {
                    appContext.btgTick = "R";
                    appContext.setBtgTick(appContext.btgTick);
                    parentContext.btgStatus = "R";
                    parentContext.setBtgStatus(parentContext.btgStatus);
                  }

                  if (
                    action &&
                    action == "save" &&
                    !appContext.markAsCompleteErrorAlert.show &&
                    !appContext?.user?.isHotelUser
                  ) {
                    sessionStorage.setItem(
                      "priceRebidTabData",
                      JSON.stringify(data)
                    );
                    sessionStorage.setItem(
                      "initialRebidStatus",
                      data.hasRebidViewInfo?.rebidstatusidedit
                    );
                    contextType.setRebidData(data);
                    parentContext.setRebidAction("tabnavigation");
                  }
                } else {
                  if (
                    action &&
                    action == "save" &&
                    !appContext.markAsCompleteErrorAlert.show
                  ) {
                    sessionStorage.setItem(
                      "priceRebidTabData",
                      JSON.stringify(data)
                    );
                    sessionStorage.setItem(
                      "initialRebidStatus",
                      data.hasRebidViewInfo?.rebidstatusidedit
                    );
                    contextType.setRebidData(data);
                    parentContext.setRebidAction("tabnavigation");
                  }
                }
              } else {
                if (
                  action &&
                  action == "save" &&
                  !appContext.markAsCompleteErrorAlert.show
                ) {
                  sessionStorage.setItem(
                    "priceRebidTabData",
                    JSON.stringify(data)
                  );
                  sessionStorage.setItem(
                    "initialRebidStatus",
                    data.hasRebidViewInfo?.rebidstatusidedit
                  );
                  contextType.setRebidData(data);
                  parentContext.setRebidAction("tabnavigation");
                }
              }
            }
          });
        }
      });
    } else {
      parentContext.setRebidStatus(null);
      appContext.setRebidTick("");
      appContext.setPriceRebidScreenFlags({
        rebidTab: "",
        eligAmenityTab: "",
        ratesRulesTab: "",
      });
    }
  };

  useEffect(() => {
    const prevStatus = document.getElementById(
      `hotelAccountSpecificRebid[${contextType.state.rebid?.hotel_accountinfoid}].rebidstatus`
    ).value;
    contextType.setPrevRebidStatus(prevStatus);
    const unlisten = history.listen((location) => {
      parentContext?.setRebidAction("save");
    });
    sessionStorage.setItem("prevRebidStatus", null);
    if (!appContext?.rebidTabSwitchFlag) {
      API.getRebidData(accountInfoId).then((data) => {
        if (data != "error") {
          sessionStorage.setItem("priceRebidTabData", JSON.stringify(data));
          contextType.setRebidData(data);
          contextType.setInitialValidation(true);
        }
      });
    } else {
      const data1 = sessionStorage.getItem("priceRebidTabData")
        ? JSON.parse(sessionStorage.getItem("priceRebidTabData"))
        : null;
      if (data1) {
        contextType.setRebidData(data1);
        contextType.setInitialValidation(true);
      } else {
        API.getRebidData(accountInfoId).then((data) => {
          if (data != "error") {
            sessionStorage.setItem("priceRebidTabData", JSON.stringify(data));
            contextType.setRebidData(data);
            contextType.setInitialValidation(true);
          }
        });
      }
      appContext.setRebidTabSwitchFlag(false);
    }
    return () => {
      if (contextType.isFormChanged == "Y") {
        if (history.action !== "POP") {
          updateRebid();
          if (sessionStorage.getItem("rebidTabSwitch") == "true") {
            sessionStorage.setItem("rebidTabSwitch", "false");
          }
        } else {
          if (sessionStorage.getItem("rebidTabSwitch") == "true") {
            updateRebid();
            sessionStorage.setItem("rebidTabSwitch", "false");
          }
        }
      }
      unlisten();
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (
        appContext.isActiveTab === "rebidRequests" &&
        prevAppContext?.saveRebidRequestsClicked !==
          appContext?.saveRebidRequestsClicked &&
        appContext?.saveRebidRequestsClicked == true
      ) {
        if (parentContext.errorMessage !== "") {
          alert(parentContext.errorMessage);
        } else {
          parentContext?.setRebidAction("save");
          updateRebid("save");
        }
        appContext?.setSaveRebidRequestsClicked(false);
      }
    }
  });

  return (
    <PriceRebidContextProvider>
      <PriceRebidContext.Consumer>
        {(priceRebidContext) => {
          contextType = priceRebidContext;
          return (
            <>
              <Prompt
                when={parentContext.errorMessage !== ""}
                message={(location, action) => {
                  if (parentContext.errorMessage !== "") {
                    alert(parentContext.errorMessage);
                  }
                  return false;
                }}
              />
              {contextType.state.showLoader ? <CLoader></CLoader> : ""}
              <div
                style={{
                  overflow: "auto",
                  padding: "5px",
                  borderLeft: "1px solid #ccc",
                }}
                className={classnames(
                  "updaterebidrates",
                  styles.rebidnotesheight
                )}
              >
                {contextType?.state?.rebid ? (
                  <form
                    id={Settings.rebid.formId}
                    name={Settings.rebid.formName}
                  >
                    {contextType.state.rebid?.hasRebidViewInfo?.rebidRound >
                      1 && (
                      <div style={{ width: "100%" }}>
                        <div className={styles.rebid1}>
                          <div
                            className={classnames(
                              styles.fieldName,
                              styles.floatleft,
                              styles.width95
                            )}
                          >
                            {Settings.rebidRound1}
                          </div>
                          <div
                            className={classnames(
                              styles.fieldValue,
                              styles.floatleft,
                              styles.width120
                            )}
                          >
                            {contextType.state.rebid.rebidstatus_desc}
                          </div>
                          <div
                            className={classnames(
                              styles.fieldName,
                              styles.floatleft,
                              styles.width75
                            )}
                          >
                            {Settings.headers.rebidNotes}
                          </div>
                          <div
                            className={classnames(
                              styles.fieldValue,
                              styles.floatleft,
                              styles.width200
                            )}
                          >
                            {contextType.state.rebid?.rebid_notes}
                          </div>
                        </div>
                        <div className={styles.clear}>
                          <div
                            className={classnames(
                              styles.fieldName,
                              styles.floatleft,
                              styles.width95
                            )}
                          >
                            {Settings.headers.rebidDueDate}
                          </div>
                          <div
                            className={classnames(
                              styles.fieldValue,
                              styles.floatleft,
                              styles.width100
                            )}
                          >
                            {contextType.state.rebid?.rebid_due === null ||
                            contextType.state.rebid?.rebid_due === undefined ? (
                              ""
                            ) : (
                              <div>
                                {contextType.getFormattedDate(
                                  contextType.state.rebid?.rebid_due
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className={styles.clear}>
                          <table
                            cellSpacing={0}
                            cellPadding={0}
                            className={styles.borderZero}
                          >
                            <tr>
                              <td className={classnames(styles.fieldName)}>
                                {Settings.lastUpdated}
                              </td>
                              <td className={styles.width5}></td>
                              <td className={classnames(styles.fieldValue)}>
                                {contextType.state.rebid.last_updatedrebid1 ===
                                  null ||
                                contextType.state.rebid.last_updatedrebid1 ===
                                  undefined
                                  ? ""
                                  : contextType.getFormattedDate(
                                      contextType.state.rebid.last_updatedrebid1
                                    )}
                              </td>
                              {contextType.state.roleDetails?.role ===
                                Settings.isPASAdmin ||
                              contextType.state.roleDetails?.role ===
                                Settings.isSalesUser ? (
                                <div>
                                  <td className={styles.width15}> </td>
                                  <td className={styles.fieldName}>
                                    {Settings.by}
                                  </td>
                                  <td className={styles.width5}></td>
                                  <td className={styles.fieldValue}>
                                    {
                                      contextType.state.rebid
                                        .lastupdaterebid1eid
                                    }
                                  </td>
                                  <td className={styles.width15}> </td>
                                  <td className={styles.fieldName}>
                                    {Settings.email}
                                  </td>
                                  <td className={styles.width5}></td>
                                  <td className={styles.fieldValue}>
                                    {
                                      contextType.state.rebid
                                        .lastupdaterebid1email
                                    }
                                  </td>
                                </div>
                              ) : (
                                ""
                              )}
                            </tr>
                          </table>
                        </div>
                      </div>
                    )}

                    {contextType.state.rebid?.hasRebidViewInfo?.rebidRound >
                      2 && (
                      <div
                        className={classnames(
                          styles.clear,
                          styles.paddingTop10
                        )}
                        style={{ paddingTop: "10px" }}
                      >
                        <div className={styles.rebid1}>
                          <div
                            className={classnames(
                              styles.fieldName,
                              styles.floatleft,
                              styles.width95
                            )}
                          >
                            {Settings.rebidRound2}
                          </div>
                          <div
                            className={classnames(
                              styles.fieldValue,
                              styles.floatleft,
                              styles.width120
                            )}
                          >
                            {contextType.state.rebid.rebidstatus_desc2}
                          </div>
                          <div
                            className={classnames(
                              styles.fieldName,
                              styles.floatleft,
                              styles.width75
                            )}
                          >
                            {Settings.headers.rebidNotes}
                          </div>
                          <div
                            className={classnames(
                              styles.fieldValue,
                              styles.floatleft,
                              styles.width200
                            )}
                          >
                            {contextType.state.rebid.rebid_notes2}
                          </div>
                        </div>
                        <div className={styles.clear}>
                          <div
                            className={classnames(
                              styles.fieldName,
                              styles.floatleft,
                              styles.width95
                            )}
                          >
                            {Settings.headers.rebidDueDate}
                          </div>
                          <div
                            className={classnames(
                              styles.fieldValue,
                              styles.floatleft,
                              styles.width100
                            )}
                          >
                            {contextType.state.rebid.rebid_due2 === null ||
                            contextType.state.rebid.rebid_due2 === undefined
                              ? ""
                              : contextType.getFormattedDate(
                                  contextType.state.rebid.rebid_due2
                                )}
                          </div>
                        </div>

                        <div className={styles.clear}>
                          <table
                            cellSpacing={0}
                            cellPadding={0}
                            className={styles.borderZero}
                          >
                            <tr>
                              <td className={classnames(styles.fieldName)}>
                                {Settings.lastUpdated}
                              </td>
                              <td className={styles.width5}></td>
                              <td className={classnames(styles.fieldValue)}>
                                {contextType.state.rebid.last_updatedrebid2 ===
                                  null ||
                                contextType.state.rebid.last_updatedrebid2 ===
                                  undefined
                                  ? ""
                                  : contextType.getFormattedDate(
                                      contextType.state.rebid.last_updatedrebid2
                                    )}
                              </td>
                              {contextType.state.roleDetails?.role ===
                                Settings.isPASAdmin ||
                              contextType.state.roleDetails?.role ===
                                Settings.isSalesUser ? (
                                <div>
                                  <td className={styles.width15}> </td>
                                  <td className={styles.fieldName}>
                                    {Settings.by}
                                  </td>
                                  <td className={styles.width5}></td>
                                  <td className={styles.fieldValue}>
                                    {
                                      contextType.state.rebid
                                        .lastupdaterebid2eid
                                    }
                                  </td>
                                  <td className={styles.width15}> </td>
                                  <td className={styles.fieldName}>
                                    {Settings.email}
                                  </td>
                                  <td className={styles.width5}></td>
                                  <td className={styles.fieldValue}>
                                    {
                                      contextType.state.rebid
                                        .lastupdaterebid2email
                                    }
                                  </td>
                                </div>
                              ) : (
                                ""
                              )}
                            </tr>
                          </table>
                        </div>
                      </div>
                    )}

                    <div id={Settings.alertdiv} className={styles.alertdiv}>
                      {!contextType.state.hideText && (
                        <div
                          className={classnames(
                            styles.fieldValue,
                            styles.hideTextDiv
                          )}
                        >
                          <span className={styles.fieldName}>
                            {Settings.alert}&nbsp;
                          </span>
                          {Settings.heading1}
                          <span className={styles.fieldName}>
                            {Settings.MUST}
                          </span>{" "}
                          {Settings.heading2} &amp; {Settings.rules} &amp;
                          {Settings.heading3}
                          <span className={styles.fieldName}>
                            {Settings.internal}
                          </span>{" "}
                          {Settings.heading4}
                        </div>
                      )}

                      <div
                        className={classnames(styles.fieldName, styles.width50)}
                      >
                        {`${Settings.round} ${contextType.state.rebid?.hasRebidViewInfo?.rebidRound}`}
                        <input
                          type="hidden"
                          name={`hotelAccountSpecificRebid[${contextType.state.rebid.hotel_accountinfoid}].rebidRound`}
                          id={`hotelAccountSpecificRebid[${contextType.state.rebid.hotel_accountinfoid}].rebidRound`}
                          value="1"
                        />
                      </div>

                      <div
                        className={classnames(styles.lastUpdated, styles.h42)}
                      >
                        {contextType.state.rebid?.hasRebidViewInfo
                          ?.rebidRound === 1 && (
                          <div className={classnames(styles.lastUpdated)}>
                            <table
                              cellSpacing={0}
                              cellPadding={0}
                              className={styles.borderZero}
                            >
                              <tbody>
                                <tr>
                                  <td className={styles.fieldName}>
                                    {Settings.lastUpdated}
                                  </td>
                                  <td className={styles.width5}></td>
                                  <td className={styles.fieldValue}>
                                    {contextType.state.rebid
                                      ?.last_updatedrebid1 === null ||
                                    contextType.state.rebid
                                      ?.last_updatedrebid1 === undefined ? (
                                      ""
                                    ) : (
                                      <span>
                                        {contextType.getFormattedDate(
                                          contextType.state.rebid
                                            ?.last_updatedrebid1
                                        )}
                                      </span>
                                    )}
                                  </td>
                                  {contextType.state.roleDetails?.role ===
                                    Settings.isPASAdmin ||
                                  contextType.state.roleDetails?.role ===
                                    Settings.isSalesUser ? (
                                    <div>
                                      <td className={styles.width15}> </td>
                                      <td className={styles.fieldName}>
                                        {Settings.by}
                                      </td>
                                      <td className={styles.width5}></td>
                                      <td className={styles.fieldValue}>
                                        {
                                          contextType.state.rebid
                                            ?.lastupdaterebid1eid
                                        }
                                      </td>
                                      <td className={styles.width15}> </td>
                                      <td className={styles.fieldName}>
                                        {Settings.email}
                                      </td>
                                      <td className={styles.width5}></td>
                                      <td className={styles.fieldValue}>
                                        {
                                          contextType.state.rebid
                                            ?.lastupdaterebid1email
                                        }
                                      </td>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {contextType.state.rebid?.hasRebidViewInfo
                          ?.rebidRound === 2 && (
                          <div className={classnames(styles.lastUpdated)}>
                            <table
                              cellSpacing={0}
                              cellPadding={0}
                              className={styles.borderZero}
                            >
                              <tbody>
                                <tr>
                                  <td className={styles.fieldName}>
                                    {Settings.lastUpdated}
                                  </td>
                                  <td className={styles.width5}></td>
                                  <td className={styles.fieldValue}>
                                    {contextType.state.rebid
                                      .last_updatedrebid2 === null ||
                                    contextType.state.rebid
                                      .last_updatedrebid2 === undefined ? (
                                      ""
                                    ) : (
                                      <span>
                                        {contextType.getFormattedDate(
                                          contextType.state.rebid
                                            .last_updatedrebid2
                                        )}
                                      </span>
                                    )}
                                  </td>
                                  {contextType.state.roleDetails?.role ===
                                    Settings.isPASAdmin ||
                                  contextType.state.roleDetails?.role ===
                                    Settings.isSalesUser ? (
                                    <div>
                                      <td className={styles.width15}> </td>
                                      <td className={styles.fieldName}>
                                        {Settings.by}
                                      </td>
                                      <td className={styles.width5}></td>
                                      <td className={styles.fieldValue}>
                                        {
                                          contextType.state.rebid
                                            .lastupdaterebid2eid
                                        }
                                      </td>
                                      <td className={styles.width15}> </td>
                                      <td className={styles.fieldName}>
                                        {Settings.email}
                                      </td>
                                      <td className={styles.width5}></td>
                                      <td className={styles.fieldValue}>
                                        {
                                          contextType.state.rebid
                                            .lastupdaterebid2email
                                        }
                                      </td>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {contextType.state.rebid?.hasRebidViewInfo
                          ?.rebidRound === 3 && (
                          <div className={classnames(styles.lastUpdated)}>
                            <table
                              cellSpacing={0}
                              cellPadding={0}
                              className={styles.borderZero}
                            >
                              <tbody>
                                <tr>
                                  <td className={styles.fieldName}>
                                    {Settings.lastUpdated}
                                  </td>
                                  <td className={styles.width5}></td>
                                  <td className={styles.fieldValue}>
                                    {contextType.state.rebid
                                      .last_updatedrebid3 === null ||
                                    contextType.state.rebid
                                      .last_updatedrebid3 === undefined
                                      ? ""
                                      : contextType.getFormattedDate(
                                          contextType.state.rebid
                                            .last_updatedrebid3
                                        )}
                                  </td>
                                  {contextType.state.roleDetails?.role ===
                                    Settings.isPASAdmin ||
                                  contextType.state.roleDetails?.role ===
                                    Settings.isSalesUser ? (
                                    <div>
                                      <td className={styles.width15}> </td>
                                      <td className={styles.fieldName}>
                                        {Settings.by}
                                      </td>
                                      <td className={styles.width5}></td>
                                      <td className={styles.fieldValue}>
                                        {
                                          contextType.state.rebid
                                            .lastupdaterebid3eid
                                        }
                                      </td>
                                      <td className={styles.width15}> </td>
                                      <td className={styles.fieldName}>
                                        {Settings.email}
                                      </td>
                                      <td className={styles.width5}></td>
                                      <td className={styles.fieldValue}>
                                        {
                                          contextType.state.rebid
                                            .lastupdaterebid3email
                                        }
                                      </td>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      <div className={styles.rebidStatusDiv}>
                        <div
                          className={classnames(
                            styles.fieldName,
                            styles.floatleft,
                            styles.width95
                          )}
                        >
                          {Settings.headers.rebidStatus.label}
                        </div>
                        <div
                          className={classnames(
                            styles.fieldValue,
                            styles.floatleft,
                            styles.width120
                          )}
                        >
                          <CSelect
                            id={`hotelAccountSpecificRebid[${contextType.state.rebid?.hotel_accountinfoid}].rebidstatus`}
                            name={`hotelAccountSpecificRebid[${contextType.state.rebid?.hotel_accountinfoid}].rebidstatus`}
                            selectedValue={
                              contextType.state.rebid?.hasRebidViewInfo
                                ?.rebidstatusidedit
                            }
                            ddnOptions={
                              contextType.state.rebid?.hasRebidViewInfo
                                ?.rebidStatusList
                            }
                            onChange={(e) => contextType.rebidOnChange(e)}
                            keyField={Settings.rebidStatus.id}
                            valField={Settings.rebidStatus.value}
                          />
                        </div>

                        <div
                          className={classnames(
                            styles.fieldName,
                            styles.floatleft,
                            styles.width75
                          )}
                        >
                          {Settings.headers.rebidNotes}
                        </div>
                        <div
                          className={classnames(
                            styles.fieldValue,
                            styles.floatleft,
                            styles.width200
                          )}
                        >
                          <textarea
                            cols={100}
                            rows={2}
                            className={styles.rebidNotes}
                            id={`hotelAccountSpecificRebid[${contextType.state.rebid.hotel_accountinfoid}].rebid_notes`}
                            name={`hotelAccountSpecificRebid[${contextType.state.rebid.hotel_accountinfoid}].rebid_notes`}
                            onKeyPress={(e) =>
                              Utils.checklen_onkeypress(e, 255)
                            }
                            value={
                              contextType.state.rebid?.hasRebidViewInfo
                                ?.rebidNotesedit === null
                                ? ""
                                : contextType.state.rebid?.hasRebidViewInfo
                                    ?.rebidNotesedit
                            }
                            onChange={(e) =>
                              contextType.text_onclickrebid(e, 255)
                            }
                            onBlur={(e) => contextType.text_onKeyPress(e, 255)}
                          ></textarea>
                        </div>
                      </div>

                      <div className={styles.dueDate}>
                        <div
                          className={classnames(
                            styles.fieldName,
                            styles.floatleft,
                            styles.width95
                          )}
                        >
                          {Settings.headers.rebidDueDate}
                        </div>
                        <div
                          className={
                            contextType.state.rebid?.hasRebidViewInfo
                              ?.rebidpastdue
                              ? classnames(
                                  styles.fieldValue,
                                  styles.floatleft,
                                  styles.width100,
                                  styles.pastDate
                                )
                              : classnames(
                                  styles.fieldValue,
                                  styles.floatleft,
                                  styles.width100
                                )
                          }
                        >
                          {contextType.state.rebid?.hasRebidViewInfo
                            ?.rebidDueDateedit === null ||
                          contextType.state.rebid?.hasRebidViewInfo
                            ?.rebidDueDateedit === undefined ? (
                            ""
                          ) : (
                            <div>
                              {contextType.getFormattedDate(
                                contextType.state.rebid?.hasRebidViewInfo
                                  ?.rebidDueDateedit
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        }}
      </PriceRebidContext.Consumer>
    </PriceRebidContextProvider>
  );
}
