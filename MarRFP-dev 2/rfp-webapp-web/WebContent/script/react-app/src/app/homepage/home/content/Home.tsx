/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import moment from "moment";
import { DndProvider } from "react-dnd";
import "primereact/resources/primereact.css";
import { ToggleButton } from "primereact/togglebutton";
import { Accordion, AccordionTab } from "primereact/accordion";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import deleteSign from "../../../common/assets/img/deleteSign.gif";
import Settings from "../static/settings";
import API from "../service/API";
import HomeContext, { IHomeContext } from "../context/HomeContext";
import styles from "./Home.css";
import { Container } from "./Container";
import Utils from "../../../common/utils/Utils";

export const Home = () => {
  const [checkedMessage, setCheckedMessage] = useState(false);
  const [message, setMessage] = useState([]);
  const [SystemMessageData, setSystemMessageData] = useState([]);

  const appContext: IApplicationContext = useContext(ApplicationContext);
  const homeContext: IHomeContext = useContext(HomeContext);
  const history = useHistory();

  const isLocal = window.location.href
    .split("/")
    .filter((word) => word.indexOf("localhost") > -1);

  useEffect(() => {
    const msgClass = document.getElementsByClassName("p-button-label");
    if (msgClass[0] && msgClass[0]?.innerText == "Messages") {
      msgClass[0].style.cursor = "pointer";
    }
    appContext.setHomePageDragNoSelectStyle(false);
    return () => {
      appContext.setHomePageDragNoSelectStyle(false);
      let data = sessionStorage.getItem("homeUserPrefs");
      if (data && data !== undefined && data !== "undefined" && data !== null) {
        data = JSON.parse(data);
      }
      let selectedHotel = sessionStorage.getItem("homeSelectedHotel");
      if (
        selectedHotel &&
        selectedHotel !== undefined &&
        selectedHotel !== null &&
        selectedHotel !== "undefined"
      ) {
        selectedHotel = JSON.parse(selectedHotel);
      }
      const eid =
        homeContext && homeContext.userPrefs && homeContext.userPrefs.eid
          ? homeContext.userPrefs.eid
          : data?.eid;
      const marshaCode =
        selectedHotel && selectedHotel.marshacode
          ? selectedHotel?.marshacode
          : data?.marshaCode;
      const userPrefs = {
        eid: eid,
        marshaCode: marshaCode,
      };
      const payload = {
        strUserPrefs: JSON.stringify(userPrefs),
      };
      API.updateHomePref(payload);
    };
  }, []);

  useEffect(() => {
    try {
      if (appContext.user && !appContext.user.agreedtoTerms) {
        redirectToTNC();
      } else {
        if (appContext.user && appContext.user.updateContactInfo) {
          redirectToUserContactInfo();
        }
      }
      cognosCheck();
      if (Utils.getCookie("CODE") || isLocal.length) {
        API.getMessageList().then((data) => {
          sessionStorage.setItem("CAM_PASSPORT_URL", data.cam_passport_url);
          setMessage(data.pricingInfo);
          setSystemMessageData(data.generalInfo);
          const prefs = data.userPrefs;
          homeContext.setSelectHotel({
            ...homeContext.SelectHotel,
            marshacode: data.userPrefs.marshaCode,
          });
          homeContext.setUserPrefs(prefs);
          if (appContext.user.showPricing === "Y") {
            if (appContext.user.isPASAdmin || appContext.user.isHotelUser) {
              homeContext.getHotelList(prefs);
            }
          }
        });
      } else {
        console.log("no cookie");
      }
    } catch (err) {
      console.log("ERROR==", err);
    }
  }, [appContext.user, history?.location?.state?.refreshTime]);

  const cognosCheck = () => {
    // cognos

    let url = location.href;
    const routenameCookie = sessionStorage.getItem("ROUTENAME");

    const isLocal = url
      .split("/")
      .filter((word) => word.indexOf("localhost") > -1);
    if (!isLocal.length) {
      if (routenameCookie == "requestspecialreports") {
        url =
          location.href
            .substring(0, location.href.indexOf("/home"))
            .split(".com")[1] + "/requestspecialreports";

        history.push("/requestspecialreports");
      } else if (routenameCookie == "viewreports") {
        url =
          location.href
            .substring(0, location.href.indexOf("/home"))
            .split(".com")[1] + "/viewreports";

        history.push("/viewreports");
      } else if (routenameCookie == "generalviewreports") {
        url =
          location.href
            .substring(0, location.href.indexOf("/home"))
            .split(".com")[1] + "/generalviewreports";

        history.push("/generalviewreports");
      } else if (routenameCookie == "garequestspecialreports") {
        url =
          location.href
            .substring(0, location.href.indexOf("/home"))
            .split(".com")[1] + "/garequestspecialreports";

        history.push("/garequestspecialreports");
      } else if (routenameCookie == "requestediereport") {
        url =
          location.href
            .substring(0, location.href.indexOf("/home"))
            .split(".com")[1] + "/requestediereport";

        history.push("/requestediereport");
      } else if (routenameCookie == "requestreports") {
        url =
          location.href
            .substring(0, location.href.indexOf("/home"))
            .split(".com")[1] + "/requestreports";

        history.push("/requestreports");
      } else if (routenameCookie == "viewediereports") {
        url =
          location.href
            .substring(0, location.href.indexOf("/home"))
            .split(".com")[1] + "/viewediereports";

        history.push("/viewediereports");
      }
    }

    // cognos ends
  };
  const redirectToTNC = () => {
    history.push({
      pathname: Settings.path.terms,
    });
    // document.location.reload();
  };

  const redirectToUserContactInfo = () => {
    if (appContext.user.role == "MFPADMIN") {
      history.push({
        pathname: Settings.path.updatecontactinfo,
      });
    } else if (
      appContext.user.role == "MFPFSALE" ||
      appContext.user.role == "MFPSALES" ||
      appContext.user.role == "MFPUSER"
    ) {
      history.push({
        pathname: Settings.path.salesupdatecontactinfo,
      });
    }
  };

  const deleteMessage = (infoid) => {
    API.deleteNews(infoid).then((data) => {
      API.getMessageList().then((data) => {
        setMessage(data.pricingInfo);
      });
    });
  };

  return (
    <>
      <div
        className="dijitContentPane dijitBorderContainerNoGutter-child dijitBorderContainerNoGutter-dijitContentPane dijitBorderContainerNoGutterPane dijitAlignTop"
        id="dijit_layout_ContentPane_0"
      >
        <span>
          <b>&nbsp;&nbsp;&nbsp;{Settings.welcomeMessage}</b>
        </span>
      </div>
      <div className={styles.homepagecontainer}>
        <div
          className={`${styles.homeMessage} ${styles.dijitContentPane} ${styles.dijitBorderContainerNoGutterPane} ${styles.dijitAlignLeft}`}
          id="dijit_layout_ContentPane_1"
        >
          {SystemMessageData && SystemMessageData.length > 0 && (
            <>
              <div
                className={`${styles.systemmessage} ${styles.dijitTitlePane}`}
                id="dijit_TitlePane_0"
              >
                <div
                  className={`${styles.dijitTitlePaneTitle} ${styles.dijitTitlePaneTitleFixedOpen}`}
                  data-dojo-attach-point="titleBarNode"
                  id="dijit_TitlePane_0_titleBarNode"
                >
                  <div data-dojo-attach-point="focusNode" role="heading">
                    <span
                      data-dojo-attach-point="arrowNode"
                      className={`${styles.dijitArrowNode}`}
                      role="presentation"
                    />
                    <span
                      data-dojo-attach-point="arrowNodeInner"
                      className={`${styles.dijitArrowNodeInner}`}
                    >
                      -
                    </span>
                    <span
                      data-dojo-attach-point="titleNode"
                      className={styles.dijitTitlePaneTextNode}
                      style={{ userSelect: "none" }}
                    >
                      {Settings.homeInfo.systemMessage}
                    </span>
                  </div>
                </div>
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
                      id="dijit_TitlePane_0_pane"
                      aria-labelledby="dijit_TitlePane_0_titleBarNode"
                      aria-hidden="false"
                    >
                      <div className={`${styles.systemMessageheader}`}>
                        {SystemMessageData &&
                          SystemMessageData.map((i) => {
                            return (
                              <div
                                className={`${styles.systemMessagehead}`}
                                style={
                                  appContext.homePageDragNoSelectStyle
                                    ? {
                                        userSelect: "none",
                                        msUserSelect: "none",
                                        MozUserSelect: "none",
                                        cursor: "text",
                                      }
                                    : null
                                }
                              >
                                <span
                                  className={`${styles.systemMessageTitle}`}
                                >
                                  Updated{" "}
                                  {moment(i.infodate).format("MMM D, YYYY")}
                                </span>
                                <div
                                  className={`${styles.systemMessageNumber}`}
                                >
                                  {i.infotitle}
                                </div>
                                {i.infomsg}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <Accordion
            activeIndex={0}
            expandIcon={`${styles.customCaret} ${styles.rightCaret}`}
            collapseIcon={`${styles.customCaret} ${styles.downCaret}`}
          >
            <AccordionTab
              header={
                <>
                  <ToggleButton
                    checked={checkedMessage}
                    onChange={(e) => setCheckedMessage(e.value)}
                    onLabel={Settings.messages}
                    offLabel={Settings.messages}
                    className={styles.paneltoggle}
                  />
                </>
              }
              headerClassName={`${styles.dijitTitlePaneTitle} ${styles.dijitTitlePane}`}
            >
              <div
                className={`${styles.dijitTitlePaneContentOuterMessage}`}
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
                    id="dijit_TitlePane_1_pane"
                    aria-labelledby="dijit_TitlePane_1_titleBarNode"
                    aria-hidden="false"
                  >
                    <div className={`${styles.messageInnerSection}`}>
                      {message && message.length > 0 ? (
                        message.map((i) => {
                          return (
                            <div
                              className={`${styles.messageDataSection}`}
                              id="msg_info_22656"
                              style={
                                appContext.homePageDragNoSelectStyle
                                  ? {
                                      userSelect: "none",
                                      msUserSelect: "none",
                                      MozUserSelect: "none",
                                      cursor: "text",
                                    }
                                  : null
                              }
                            >
                              <div
                                className={`${styles.messageDataInnerSection}`}
                              >
                                <span
                                  className={styles.messageDataTitleSection}
                                >
                                  Updated{" "}
                                  {moment(i.infodate).format("MMM D, YYYY")}{" "}
                                </span>
                                <span
                                  className={
                                    styles.messageDataDescriptionSection
                                  }
                                >
                                  {i.infotype}
                                </span>
                                <a
                                  className={`${styles.messageDataDelete}`}
                                  id="delete"
                                  onClick={() => deleteMessage(i.infoid)}
                                >
                                  <img src={deleteSign} />
                                </a>
                              </div>
                              <div className={`${styles.messageDataDesc}`}>
                                {i.infotitle}
                              </div>
                              {i.infomsg}
                            </div>
                          );
                        })
                      ) : (
                        <span
                          style={
                            appContext.homePageDragNoSelectStyle
                              ? {
                                  userSelect: "none",
                                  msUserSelect: "none",
                                  MozUserSelect: "none",
                                  cursor: "text",
                                }
                              : null
                          }
                        >
                          No Messages.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
        <div
          className={`${styles.dijitContentPane} ${styles.dijitBorderContainerNoGutterPane} ${styles.accountSection}`}
        >
          <div
            id="dojox_layout_GridContainer_0"
            className={`${styles.gridContainer} ${styles.gridContainerhead} ${styles.dijitLayoutContainer}`}
            tabIndex={0}
          >
            <div id="homeContainer">
              <table
                className={`${styles.gridContainerTable} ${styles.gridContainerTableHead}`}
                cellSpacing={0}
                cellPadding={0}
              >
                <tbody>
                  <tr>
                    <td
                      className={`${styles.gridContainerZone} ${styles.gridContainerZoneSection}`}
                      id="dojox_layout_GridContainer_0_dz0"
                    >
                      {appContext.user &&
                      appContext.user.isPricingUser &&
                      appContext.user.isPricingUser ? (
                        appContext.user.showPricing == "Y" ? (
                          <DndProvider backend={HTML5Backend}>
                            <Container />
                          </DndProvider>
                        ) : (
                          <div className={styles.btPricing}>
                            {Settings.btPricingMessage}
                          </div>
                        )
                      ) : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.overflowProperty}></div>
          </div>
          <style>{`
          .p-accordion-header .p-accordion-header-text{
            width: 100%;
          }
          .p-togglebutton{
            background: transparent !important;
            border-color: transparent !important;
            border: 0 !important;
            color: #fff !important;
            font-weight: bold;
            padding: 0 !important;
          }
          .p-accordion .p-accordion-content{
            padding: 0 !important;
            border: 0 !important;  
          }
          .p-datatable .p-datatable-scrollable-body .p-datatable-tbody tr:nth-child(odd){
            background-color: transparent;
            border-bottom: 1px solid #EBEADB !important;
          }
          .p-datatable-scrollable-body{
            border-right: 1px solid #ebeadb !important;
          }
          .p-button:focus {
            outline: 0 none;
            outline-offset: 0;
            box-shadow:none;
        }
        .p-accordion .p-accordion-header:not(.p-disabled) .p-accordion-header-link:focus {
            outline: 0 none;
            outline-offset: 0;
            box-shadow: none;
        }
        .p-button-label {
       cursor: move;
           }
        `}</style>
        </div>
      </div>
    </>
  );
};
