import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Settings from "../static/Settings";
import API from "../service/API";
import BrandFormattedRateContext from "../context/BrandFormattedRateContext";
import styles from "./BrandFormattedRateTabs.css";

let brandCode;
let brandName;
let productCode;
let productName;
let level;
let entryLevel;
let screenid;
let contextType = null;

const BrandFormattedRateTabs = (props) => {
  const history = useHistory();
  contextType = useContext(BrandFormattedRateContext);
  const urlParms = useLocation().search;
  const productMenu = history.location.rateProductMenu
    ? history.location.rateProductMenu
    : JSON.parse(localStorage.getItem("rateProductMenu"));
  brandCode = new URLSearchParams(urlParms).get(Settings.queryId.brandCode);
  brandName = new URLSearchParams(urlParms).get(Settings.queryId.brandName);
  productCode = new URLSearchParams(urlParms).get(Settings.queryId.productCode);
  productName = new URLSearchParams(urlParms).get(Settings.queryId.productName);
  level = new URLSearchParams(urlParms).get(Settings.queryId.level);
  entryLevel = new URLSearchParams(urlParms).get(Settings.queryId.entryLevel);
  screenid = new URLSearchParams(urlParms).get(Settings.queryId.screenid);

  const handleSwitch = (url, screenId = "") => {
    if (url == Settings.selectBrand) {
      contextType.setIsFinishAndSave(false);
      save(screenid);
      history.push({
        pathname: `${Settings.routingUrl.parentRoute}/select`,
      });
    } else if (url == Settings.modifyRateDesc) {
      contextType.setIsFinishAndSave(false);
      save(screenid);
      history.push({
        pathname: `${Settings.routingUrl.parentRoute}${Settings.routingUrl.modifyRateDesc}`,
        search: `brandCode= ${brandCode} &brandName= ${brandName} &level=Brand`,
        isModifyDescLinkClicked: true,
      });
    } else if (url == Settings.defineProduct) {
      props.handleOnClick(screenId);
    } else if (url == Settings.finishProduct) {
      contextType.setIsFinishAndSave(true);
      props.onFinishAndSave();
    }
  };

  const save = (screenid) => {
    if (contextType?.createProductState?.productName === "") {
      alert(`${Settings.alerts.validProductName}`);
      screenid = "0000";
    } else {
      const postData = { ...contextType.createProductState };
      postData.brandCode = brandCode.trim();
      postData.level = history?.location?.isSaved
        ? Settings.defaultLevel
        : postData.level;
      postData.entryLevel = Settings.defaultLevel;
      if (screenid == Settings.pageNo.createProdScreenId) {
        API.updateRateProductData(postData, null);
      } else {
        const isValid = contextType.checkMinOccurs();
        if (isValid) {
          contextType.saveProductDescription();
        }
      }
    }
  };

  return (
    <BrandFormattedRateContext.Consumer>
      {(brandFormattedRateContext) => {
        contextType = brandFormattedRateContext;
        return (
          <div className={`${styles.subMenu} ${styles.subnav}`}>
            <ul
              className={[
                styles.subnavigation,
                styles.subnavigationBorder,
              ].join(" ")}
            >
              <li
                className={[styles.sublistTitle, styles.borderLeft].join(" ")}
              >
                <a
                  href="javascript:void(0);"
                  onClick={() => handleSwitch(Settings.selectBrand)}
                >
                  {Settings.tabNames.selectBrandTab}
                </a>
              </li>
              {!history.location.pathname.includes(
                Settings.routingUrl.selectBrand
              ) && (
                <li className={styles.sublistTitle}>
                  <a
                    href="javascript:void(0);"
                    onClick={() => handleSwitch(Settings.modifyRateDesc)}
                  >
                    {Settings.tabNames.modifyRateDescTab}
                  </a>
                </li>
              )}
              {(history.location.pathname.match(
                Settings.routingUrl.defineProduct
              ) ||
                history.location.pathname.includes(
                  Settings.routingUrl.finishProduct
                )) && (
                <li className={(styles.sublistTitle, styles.widthAuto)}>
                  <a
                    href="javascript:void(0);"
                    onClick={(e) =>
                      contextType.state.isFinishAndSave
                        ? e.preventDefault()
                        : handleSwitch(Settings.tabNames.defineProduct)
                    }
                  >
                    {productCode} -{" "}
                    {props.productName ? props.productName : productName}
                  </a>
                  <ul className={(styles.subnavigation, styles.submenuList)}>
                    {productMenu && productMenu.length > 0
                      ? productMenu.map((item, index) => (
                          <li key={index} className={styles.sublistTitle}>
                            <div className={styles.subListEmptySpace}></div>
                            <a
                              onClick={(e) =>
                                contextType.state.isFinishAndSave
                                  ? e.preventDefault()
                                  : handleSwitch(
                                      Settings.defineProduct,
                                      item.screenid
                                    )
                              }
                            >
                              {item.title}
                            </a>
                          </li>
                        ))
                      : null}
                  </ul>
                </li>
              )}
              {(history.location.pathname.match(
                Settings.routingUrl.defineProduct
              ) ||
                history.location.pathname.includes(
                  Settings.routingUrl.finishProduct
                )) && (
                <li className={styles.sublistTitle}>
                  <a
                    href="javascript:void(0);"
                    onClick={(e) =>
                      contextType.state.isFinishAndSave
                        ? e.preventDefault()
                        : handleSwitch(Settings.finishProduct)
                    }
                  >
                    {Settings.tabNames.finishSaveTab}
                  </a>
                </li>
              )}
            </ul>
          </div>
        );
      }}
    </BrandFormattedRateContext.Consumer>
  );
};

export default BrandFormattedRateTabs;
