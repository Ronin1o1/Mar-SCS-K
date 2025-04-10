/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from "react";
import styles from "./salesAdminRouting.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import API from "../service/API";
import Settings from "../static/Settings";
import screenLoader from "../../../common/assets/img/screenloader.gif";
import { CSaveAndNext } from "../../../common/components/CSaveAndNext";
import { useLocation } from "react-router-dom";
import btnUpdate from "../../../common/assets/img/btnUpdate.gif";
import btnDelete from "../../../common/assets/img/btnDelete.gif";
import btnPrevious from "../../../common/assets/img/button/btnPrevious.gif";

import SalesAdministartionContext, {
  SalesAdministartionContextProvider,
} from "../context/salesAdministartionContextProvider";
import { TabName } from "./TabName";
import CModal from "../../../common/components/CModal";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import { ReportsWindow } from "../../hotelPricing/content/Reports/content/ReportsTitleWindow";
import CIFrame from "../../../common/components/CIFrame";

let contextType = null;
const childcontextType = null;
let period;
let accountrecid;
let urlName;
let accountName;
let initialName;
let routes = [];
let TabNameValue;

export function GlobalHeader(props) {
  const history = useHistory();
  const [queryString, setQueryString] = useState("");
  const [event, setevent] = useState(null);
  const [modalShow, setmodalShow] = useState(null);

  const urlParms = useLocation().search;
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [showPrintReport, setShowPrintReport] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [url, setUrl] = useState("");

  urlName = useLocation().pathname;
  TabNameValue = urlName.substring(21, urlName.length);

  accountrecid = new URLSearchParams(urlParms).get("accountrecid");
  period = new URLSearchParams(urlParms).get("year");
  initialName = new URLSearchParams(urlParms).get("accountName");
  accountName = sessionStorage.getItem("sappAccountName");
  const query = `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`;
  routes = [
    {
      path: "SelectAccount",
      name: "SelectAccount",
    },
    {
      path: "editaccountplansapp",
      name: "editaccountplansapp",

      children: [
        {
          path: "acctoverview",
          name: "acctoverview",
          queryString: query,
        },
        {
          path: "marriottteamMember",
          name: "marriottteamMember",
          queryString: query,
        },
        {
          path: "accountPerspective",
          name: "accountPerspective",
          queryString: query,
        },
        {
          path: "buyingOfficeLocation",
          name: "buyingOfficeLocation",
          queryString: query,
        },
        {
          path: "accBtProfileList",
          name: "accBtProfileList",
          queryString: query,
        },
        {
          path: "accBTOverview",
          name: "accBTOverview",
          queryString: query,
        },
        {
          path: "cityMarkets",
          name: "cityMarkets",
          queryString: query,
        },
        {
          path: "groupProfile",
          name: "groupProfile",
          queryString: query,
        },
        {
          path: "groupsOverview",
          name: "groupsOverview",
          queryString: query,
        },
        {
          path: "groupsIntermediaries",
          name: "groupsIntermediaries",
          queryString: query,
        },
        {
          path: "catering",
          name: "catering",
          queryString: query,
        },
        {
          path: "extendedStay",
          name: "extendedStay",
          queryString: query,
        },
        {
          path: "leisure",
          name: "leisure",
          queryString: query,
        },
        {
          path: "accountInitiatives",
          name: "accountInitiatives",
          queryString: query,
        },
      ],
    },
    {
      path: "reports",
      name: "reports",
      queryString: query,
    },
  ];

  useEffect(() => {
    if (appContext?.user) {
      contextType.getUserDetails(appContext?.user);
    } else {
      getUserDetailsdata();
    }
  }, []);

  function getUserDetailsdata() {
    const urs = sessionStorage.getItem("GETUSERDETAILS");
    if (urs) {
      contextType.getUserDetails(JSON.parse(urs));
    } else {
      API.getUserDetails()
        .then((data) => {
          contextType.getUserDetails(data);
        })
        .catch(() => {});
    }
  }

  const onReport = (tabName, paccount) => {
    let apiUrl = Settings.api.getReportUrl;
    apiUrl = apiUrl + "?paccount=" + paccount.accountrecid;
    if (tabName === Settings.accountTabs.reportTabs.printBTAccount) {
      apiUrl = apiUrl + "&pmarketinfo='N'";
    } else if (
      tabName === Settings.accountTabs.reportTabs.printBTAccountwithMarket1
    ) {
      apiUrl = apiUrl + "&pmarketinfo='Y'";
    }
    let headerName;
    if (tabName === Settings.accountTabs.reportTabs.printBTAccount) {
      headerName = "Print BT Account Plan Overview";
    } else if (
      tabName === Settings.accountTabs.reportTabs.printBTAccountwithMarket1
    ) {
      headerName = "Print BT Account Plan Overview w/Market";
    }
    let path;
    const locUrl = location.href;
    const isLocal = locUrl
      .split("/")
      .filter((word) => word.indexOf("localhost") > -1);
    if (!isLocal.length) {
      path =
        "/" +
        window.location.pathname.split("/")[1] +
        "/" +
        window.location.pathname.split("/")[2];
    } else {
      path = "";
    }

    const url =
      window.location.origin +
      path +
      "/hotelReports?&ReportName=" +
      headerName +
      "&apiUrl=" +
      apiUrl +
      "&Accountrecid=" +
      paccount.accountrecid;
    const parms = Settings.popupParms;
    window.open(url, "_blank");
  };

  const onMenuClick = (menuname) => {
    if (contextType.state.alertMsgflag) {
      document.getElementById("title")
        ? null
        : setmodalShow(contextType.state.alertMsgflag);
    } else if (appContext.maxLength1024ValidationAlert) {
      alert(Settings.alertMsgs.maxLength1024ValidationAlert);
    } else if (appContext.extendedStayNeedsMaxLengthAlert) {
      alert(Settings.alertMsgs.extendedStayNeedsMaxLengthAlert);
    } else if (appContext.orgStructureMaxLengthAlert) {
      alert(Settings.alertMsgs.orgStructureMaxLengthAlert);
    } else if (appContext.extendedStaySolutionsMaxLengthAlert) {
      alert(Settings.alertMsgs.extendedStaySolutionsMaxLengthAlert);
    } else if (appContext.accountPoliciesMaxLengthAlert) {
      alert(Settings.alertMsgs.accountPoliciesMaxLengthAlert);
    } else if (appContext.prefrredMarriottBrandsMaxLengthAlert) {
      alert(Settings.alertMsgs.prefrredMarriottBrandsMaxLengthAlert);
    } else if (appContext.topExtStayMaxLengthAlert) {
      alert(Settings.alertMsgs.topExtStayMaxLengthAlert);
    } else if (appContext.totRevenueRangeAlert) {
      alert(Settings.alertMsgs.totRevenueRangeAlert);
    } else if (!appContext.onetimeAlert.show) {
      if (menuname === "BusinessTransientProfile") {
        history.push({
          pathname: `${Settings.parentRoute}/accBtProfileList`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "BusinessTransientOverview") {
        history.push({
          pathname: `${Settings.parentRoute}/accBTOverview`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "GroupProfile") {
        history.push({
          pathname: `${Settings.parentRoute}/groupProfile`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "MarriottTeamMember") {
        history.push({
          pathname: `${Settings.parentRoute}/marriottteamMember`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "CityMarkets") {
        history.push({
          pathname: `${Settings.parentRoute}/cityMarkets`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "GroupsIntermediaries") {
        history.push({
          pathname: `${Settings.parentRoute}/groupsIntermediaries`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "ExtendedStay") {
        history.push({
          pathname: `${Settings.parentRoute}/extendedStay`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "GroupsOverview") {
        history.push({
          pathname: `${Settings.parentRoute}/groupsOverview`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "AccountInitiatives") {
        history.push({
          pathname: `${Settings.parentRoute}/accountInitiatives`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "BuyingOfficeLoc") {
        history.push({
          pathname: `${Settings.parentRoute}/buyingOfficeLocation`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "AccountPerspective") {
        history.push({
          pathname: `${Settings.parentRoute}/accountPerspective`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "Leisure") {
        history.push({
          pathname: `${Settings.parentRoute}/leisure`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "catering") {
        history.push({
          pathname: `${Settings.parentRoute}/catering`,
          search: `?&accountrecid=${accountrecid}&year=${period}&accountName=${accountName}`,
        });
      } else if (menuname === "SelectAnAccount") {
        history.push({
          pathname: `${Settings.parentRoute}/editaccountplansapp`,
        });
      } else if (menuname === "editaccountplansapp") {
        history.push({
          pathname: `${Settings.parentRoute}/editaccountplansapp`,
        });
      } else if (menuname === "acctOverview") {
        history.push({
          pathname: `${Settings.parentRoute}/acctoverview`,
          search:
            "?&accountrecid=" +
            accountrecid +
            "&year=" +
            period +
            "&accountName=" +
            accountName,
        });
      }
    }
  };
  const setModalClose = () => {
    setmodalShow(false);
  };

  return (
    <SalesAdministartionContext.Consumer>
      {(SalesAdministartionContext) => {
        contextType = SalesAdministartionContext;
        return (
          <div>
            <CModal
              title="Alert Message"
              onClose={setModalClose}
              show={modalShow}
              closeImgTitle={"OK - Close Message Box"}
              class="alertmessage"
              overlayHeight={Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
              )}
            >
              <div className={styles.modalView}>
                {contextType?.state?.alertMsg}
              </div>
            </CModal>
            {contextType?.state?.showScreenLoader ? (
              <img
                style={{ position: "absolute", top: "55%", left: "45%" }}
                src={screenLoader}
              />
            ) : (
              <div>
                <div className={`${styles.subMenu} ${styles.subnav}`}>
                  <ul className={styles.subnavigation}></ul>
                  <ul className={styles.subnavigation}>
                    <li className={styles.sublistHeader}>
                      <Link
                        tabIndex={-1}
                        onClick={() => {
                          onMenuClick("editaccountplansapp");
                        }}
                      >
                        {" "}
                        <a
                          className={styles.menuPadding}
                          style={{ marginRight: "-10px" }}
                          onClick={() => {
                            onMenuClick("SelectAnAccount");
                          }}
                        >
                          {Settings.accountTabs.selectAccount}
                        </a>
                      </Link>
                    </li>
                    <li
                      className={[
                        styles.sublistHeader,
                        styles.largeMenuWidth,
                      ].join(" ")}
                    >
                      <a
                        className={styles.menuPadding}
                        style={{ marginRight: "-10px" }}
                      >
                        {Settings.accountTabs.sapAcctPlanProfile}
                      </a>
                      <ul className={styles.sublist} style={{ width: "180px" }}>
                        <li>
                          <a onClick={() => onMenuClick("acctOverview")}>
                            {
                              Settings.accountTabs.sapAcctPlanProfileTabs
                                .generalAccOverview
                            }
                          </a>
                          <span className={styles.arrowadm1}>&#9658;</span>
                          <ul>
                            <li>
                              <a onClick={() => onMenuClick("acctOverview")}>
                                {" "}
                                {Settings.accountTabs.gnlAccOverViewTab.profile}
                              </a>
                            </li>
                            <li
                              onClick={() => {
                                onMenuClick("MarriottTeamMember");
                              }}
                            >
                              <a>
                                {Settings.accountTabs.gnlAccOverViewTab.team}
                              </a>
                            </li>
                            <li
                              onClick={() => {
                                onMenuClick("AccountPerspective");
                              }}
                            >
                              <a>
                                {" "}
                                {Settings.accountTabs.gnlAccOverViewTab.account}
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li
                          onClick={() => {
                            onMenuClick("BuyingOfficeLoc");
                          }}
                        >
                          <a>
                            {" "}
                            {
                              Settings.accountTabs.sapAcctPlanProfileTabs
                                .buyoffLoc
                            }
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              onMenuClick("BusinessTransientProfile");
                            }}
                          >
                            {" "}
                            {
                              Settings.accountTabs.sapAcctPlanProfileTabs
                                .BTbusinessTransiet
                            }
                          </a>
                          <span className={styles.arrowadm2}>&#9658;</span>
                          <ul>
                            <li
                              onClick={() => {
                                onMenuClick("BusinessTransientProfile");
                              }}
                            >
                              <a> {Settings.accountTabs.busTransTab.profile}</a>
                            </li>
                            <li
                              onClick={() => {
                                onMenuClick("BusinessTransientOverview");
                              }}
                            >
                              <a>
                                {" "}
                                {Settings.accountTabs.busTransTab.overview}
                              </a>
                            </li>
                            <li onClick={() => onMenuClick("CityMarkets")}>
                              <a> {Settings.accountTabs.busTransTab.city}</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              onMenuClick("GroupProfile");
                            }}
                          >
                            {" "}
                            {Settings.accountTabs.sapAcctPlanProfileTabs.groups}
                          </a>
                          <span className={styles.arrowadm3}>&#9658;</span>
                          <ul>
                            <li
                              onClick={() => {
                                onMenuClick("GroupProfile");
                              }}
                            >
                              <a> {Settings.accountTabs.groupsTab.profile}</a>
                            </li>
                            <li
                              onClick={() => {
                                onMenuClick("GroupsOverview");
                              }}
                            >
                              <a> {Settings.accountTabs.groupsTab.overview}</a>
                            </li>
                            <li
                              onClick={() => {
                                onMenuClick("GroupsIntermediaries");
                              }}
                            >
                              <a> {Settings.accountTabs.groupsTab.intermed}</a>
                            </li>
                          </ul>
                        </li>
                        <li
                          onClick={() => {
                            onMenuClick("catering");
                          }}
                        >
                          <a>
                            {" "}
                            {
                              Settings.accountTabs.sapAcctPlanProfileTabs
                                .catering
                            }
                          </a>
                        </li>
                        <li
                          onClick={() => {
                            onMenuClick("ExtendedStay");
                          }}
                        >
                          <a>
                            {" "}
                            {
                              Settings.accountTabs.sapAcctPlanProfileTabs
                                .extendedStay
                            }
                          </a>
                        </li>
                        <li
                          onClick={() => {
                            onMenuClick("Leisure");
                          }}
                        >
                          <a>
                            {" "}
                            {
                              Settings.accountTabs.sapAcctPlanProfileTabs
                                .leisure
                            }
                          </a>
                        </li>                  
                        <li onClick={() => onMenuClick("AccountInitiatives")}>
                          <a>
                            {" "}
                            {
                              Settings.accountTabs.sapAcctPlanProfileTabs
                                .accountInitiatives
                            }
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className={styles.sublistHeader}>
                      <a
                        className={styles.menuPadding}
                        style={{ marginRight: "-10px" }}
                      >
                        {Settings.accountTabs.reports}
                      </a>
                      <ul className={styles.sublist} style={{ width: "180px" }}>
                        <li
                          className={styles.reportLinks}
                          onClick={() => {
                            onReport(
                              Settings.accountTabs.reportTabs.printBTAccount,
                              { accountrecid }
                            );
                          }}
                        >
                          <a>
                            {Settings.accountTabs.reportTabs.printBTAccount}
                          </a>
                        </li>
                        <li
                          className={styles.reportLinks}
                          onClick={() => {
                            onReport(
                              Settings.accountTabs.reportTabs
                                .printBTAccountwithMarket1,
                              { accountrecid }
                            );
                          }}
                        >
                          <a>
                            {" "}
                            {
                              Settings.accountTabs.reportTabs
                                .printBTAccountwithMarket
                            }
                            <br></br>
                            {
                              Settings.accountTabs.reportTabs
                                .printBTAccountwithMarket1
                            }
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div id="hotelPricingHeaderSection">
                  <div className={styles.Header}>
                    {/* {
                        contextType?.state?.gridData?.list?.hotelData
                          ?.marshaCodeAndName
                      }{" "} */}
                    <TabName url={urlName} />: {accountName}{" "}
                    {props.editBuyingOfficeLocation && (
                      <span
                        className={styles.field_Value}
                        style={{ marginLeft: "95px" }}
                      >
                        <b>{Settings.header.Period}</b>
                        {period}{" "}
                      </span>
                    )}
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        {!props.editBuyingOfficeLocation ? (
                          <>
                            <td
                              className={styles.field_Value}
                              style={{ width: "80px" }}
                            >
                              <b>{Settings.header.Period}</b>
                              {period}{" "}
                            </td>
                            <td style={{ width: "50px" }} />
                            <td
                              className={styles.field_Value}
                              style={{ width: "298px" }}
                            >
                              <b>{Settings.header.lastUpdateLabel} </b>
                              {props.setnewDate}
                            </td>
                          </>
                        ) : (
                          <td style={{ width: "265px" }}></td>
                        )}
                        <td>
                          {routes.length ? (
                            <CSaveAndNext
                              routes={routes}
                              profilealert={contextType.state.alertMsgflag}
                              profileAlertmsg={contextType.state.alertMsg}
                              IsAcctContactsUpdate={props.IsAcctContactsUpdate}
                              ShowPreviousButton={props.ShowPreviousButton}
                              UpdateGeneralAcctOverview={
                                props.UpdateGeneralAcctOverview
                              }
                              nextBtnClick={props.nextBtnClick}
                            />
                          ) : (
                            ""
                          )}

                          {props.ShowPreviousButton && (
                            <a
                              href="javascript:void(0);"
                              className={`${styles.textDecorNone} ${styles.prevBtn}`}
                            >
                              <img
                                id="previous"
                                src={btnPrevious}
                                onClick={() => props.PrevButtonClick()}
                              />{" "}
                            </a>
                          )}
                          <a
                            className={`${styles.updatebtn} ${styles.textDecorNone}`}
                          >
                            <img
                              id="update"
                              src={btnUpdate}
                              onClick={(e) => props.setevent(e, TabNameValue)}
                            />{" "}
                          </a>
                          {props.ShowDeleteButton && (
                            <a
                              href="javascript:void(0);"
                              className={`${styles.deletebtn} ${styles.textDecorNone}`}
                            >
                              <img
                                id="delete"
                                src={btnDelete}
                                onClick={() => props.IsAcctContactsDelete()}
                              />{" "}
                            </a>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr className={styles.seperator}></hr>
                </div>
              </div>
            )}
            <style>{`
            .alertmessage{
              position:fixed;
              left: 42vw;
              top: 46.5vh;
            }`}</style>
          </div>
        );
      }}
    </SalesAdministartionContext.Consumer>
  );
}
