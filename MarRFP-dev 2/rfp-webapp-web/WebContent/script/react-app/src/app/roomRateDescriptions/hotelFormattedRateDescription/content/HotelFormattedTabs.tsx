import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import styles from "./HotelFormattedTabs.css";
import Settings from "../static/Settings";
import HotelRateProductSelectContext, {
  HotelRateProductSelectContextProvider,
} from "../context/HotelRateProductSelectContext";
//import API from "../service/API";
import screenLoader from "../../../common/assets/img/screenloader.gif";
import { ReportsWindow } from "../../../pricing/hotelPricing/content/Reports/content/ReportsTitleWindow";
import CIFrame from "../../../common/components/CIFrame";
let marshaCode;
let hotelName;
let productCode;
let productName;
let level;
let brandCode;
let entryLevel;
let screenid;
let contextType = null;

function HotelFormattedTabs(props) {
  const history = useHistory();
  const urlParms = useLocation().search;
  const [showScreenLoader, setshowScreenLoader] = useState(false);
  const [showPrintReport, setShowPrintReport] = useState(false);
  const [url, setUrl] = useState("");
  const productMenu = history.location.productData
    ? history.location.productData
    : history.location.productMenu
    ? history.location.productMenu
    : contextType?.state?.productMenuData
    ? contextType?.state?.productMenuData
    : localStorage.getItem("productMenu") != "undefined"
    ? JSON.parse(localStorage.getItem("productMenu"))
    : "";
  //const contextType = useContext(HotelRateProductSelectContext);

  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);
  productCode = new URLSearchParams(urlParms).get(Settings.queryId.productCode);
  productName = new URLSearchParams(urlParms).get(Settings.queryId.productName);
  level = new URLSearchParams(urlParms).get(Settings.queryId.level);
  entryLevel = new URLSearchParams(urlParms).get(Settings.queryId.entryLevel);
  brandCode = new URLSearchParams(urlParms).get(Settings.queryId.brandCode);
  screenid = history.location?.screenid;
  const handleSwitch = (url, screenId = "") => {
    if (contextType.state.checkAlert === true) {
      if (contextType.state.productNewName === "") {
        alert(`${Settings.alert.alertMessage}`);
      } else {
        if (url == Settings.SelectHotel) {
          history.push({
            pathname: `${Settings.parentRoute}/select`,
          });
        } else if (url == Settings.ViewDescription) {
          history.push({
            pathname: `${Settings.viewparentRoute}/viewDescription`,
            search: `?marshaCode=${marshaCode}&hotelName=${hotelName}`,
          });
        } else if (url == Settings.ModifyRateDescription) {
          history.push({
            pathname: `${Settings.modifyRateparentRoute}/searchAction`,
            search: `?marshaCode=${marshaCode}&hotelName=${hotelName}`,
          });
        }
      }
    } else {
      if (url == Settings.SelectHotel) {
        history.push({
          pathname: `${Settings.parentRoute}/select`,
        });
      } else if (url == Settings.ViewDescription) {
        history.push({
          pathname: `${Settings.viewparentRoute}/viewDescription`,
          search: `?marshaCode=${marshaCode}&hotelName=${hotelName}`,
        });
      } else if (url == Settings.ModifyRateDescription) {
        history.push({
          pathname: `${Settings.modifyRateparentRoute}/searchAction`,
          search: `?marshaCode=${marshaCode}&hotelName=${hotelName}`,
        });
      }
    }
    if (url === Settings.tabNames.PrintAssignments) {
      openPrintAssignmentReport();
    }
  };
  const openPrintAssignmentReport = () => {
    const branchCode = contextType.state.brandName;
    const locUrl = location.href;
    let path;
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
      "Rate Product" +
      "&MarshaCode=" +
      marshaCode +
      "&HotelName=" +
      hotelName +
      "&BranchCode=" +
      branchCode;

    window.open(url, "_blank");
  };
  const displayPoolMenu = (screenList) => {
    screenList =
      screenList && screenList.length > 0
        ? screenList
        : JSON.parse(localStorage.getItem("productMenu"));

    return (
      screenList &&
      screenList.length > 0 &&
      screenList.map((tabView) => {
        return (
          <li key={tabView.title} style={{ width: "100px" }}>
            <a
              href="javascript:void(0);"
              onClick={() => props.onClick(tabView.screenid)}
            >
              {tabView.title}
            </a>
          </li>
        );
      })
    );
  };

  return (
    <HotelRateProductSelectContext.Consumer>
      {(rateProductContext) => {
        contextType = rateProductContext;
        return (
          <div className={`${styles.subMenu} ${styles.subnav}`}>
            {showScreenLoader ? (
              <img className={styles.loaderImg} src={screenLoader}></img>
            ) : (
              ""
            )}
            <ul className={styles.subnavigation}>
              <li
                onClick={() => handleSwitch(Settings.SelectHotel)}
                className={styles.sublistTitle}
              >
                <a href="javascript:void(0);">
                  {Settings.tabNames.SelectHotelTab}
                </a>
              </li>
              {!history.location.pathname.includes(
                Settings.routingUrl.select
              ) ? (
                <span>
                  <li className={styles.sublistTitle}>
                    <a
                      href="javascript:void(0);"
                      onClick={() => handleSwitch(Settings.ViewDescription)}
                    >
                      {Settings.tabNames.ViewRateDescription}
                    </a>
                  </li>
                  <li className={styles.sublistTitle}>
                    <a
                      href="javascript:void(0);"
                      onClick={() =>
                        handleSwitch(Settings.ModifyRateDescription)
                      }
                    >
                      {Settings.tabNames.ModifyRateDescription}
                    </a>
                  </li>
                  {history.location.pathname.includes(
                    Settings.routingUrl.productDefinition
                  ) ? (
                    <li className={styles.sublistTitle}>
                      <a
                        href="javascript:void(0);"
                        onClick={() =>
                          handleSwitch(Settings.ModifyRateDescription)
                        }
                      >
                        {productCode} - {productName}
                      </a>

                      <ul className={styles.sublist} style={{ width: "100px" }}>
                        {displayPoolMenu(productMenu)}
                      </ul>
                    </li>
                  ) : (
                    ""
                  )}
                  {history.location.pathname.includes(
                    Settings.routingUrl.productDefinition
                  ) ? (
                    <li className={styles.sublistTitle}>
                      <a
                        href="javascript:void(0);"
                        onClick={(e) => props.finishSave(e)}
                      >
                        {Settings.tabNames.FinishAndSave}
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  <li className={styles.sublistTitle}>
                    <a
                      href="javascript:void(0);"
                      onClick={() =>
                        handleSwitch(Settings.tabNames.PrintAssignments)
                      }
                    >
                      {Settings.tabNames.PrintAssignments}
                    </a>
                  </li>
                </span>
              ) : (
                ""
              )}
            </ul>
            {showPrintReport ? (
              <ReportsWindow
                closeWindowPortal={true}
                title={"Rate Product"}
                popup={true}
              >
                <CIFrame
                  src={url}
                  componentName={"viewReort"}
                  // hiddenSrc={contextType.state.hiddenUrl}
                  width="100%"
                  height="400px"
                ></CIFrame>
              </ReportsWindow>
            ) : (
              ""
            )}
          </div>
        );
      }}
    </HotelRateProductSelectContext.Consumer>
  );
}

export default HotelFormattedTabs;
