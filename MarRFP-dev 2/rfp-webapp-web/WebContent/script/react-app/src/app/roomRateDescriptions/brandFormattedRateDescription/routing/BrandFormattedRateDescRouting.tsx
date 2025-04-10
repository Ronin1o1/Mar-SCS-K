import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import btnPrevious from "../../../common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../common/assets/img/button/btnNext.gif";
import BrandFormattedRateTabs from "../content/BrandFormattedRateTabs";
import Settings from "../static/Settings";
import BrandFormattedRateContext from "../context/BrandFormattedRateContext";
import API from "../service/API";
import styles from "./BrandFormattedRateDescRouting.css";

let brandCode;
let brandName;
let productCode;
let productName;
let level;
let entryLevel;
let screenid;
let nextMenu;
let prevMenu;
let rateProductMenu;
let contextType = null;
let menuData;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GlobalHeader = (props) => {
  const history = useHistory();
  const urlParms = useLocation().search;
  brandCode = new URLSearchParams(urlParms).get(Settings.queryId.brandCode);
  brandName = new URLSearchParams(urlParms).get(Settings.queryId.brandName);
  productCode = new URLSearchParams(urlParms).get(Settings.queryId.productCode);
  productName = props.productName
    ? props.productName
    : new URLSearchParams(urlParms).get(Settings.queryId.productName);
  level = new URLSearchParams(urlParms).get(Settings.queryId.level);
  entryLevel = new URLSearchParams(urlParms).get(Settings.queryId.entryLevel);
  screenid = history.location?.screenId
    ? history.location?.screenId
    : new URLSearchParams(urlParms).get(Settings.queryId.screenid)
    ? new URLSearchParams(urlParms).get(Settings.queryId.screenid)
    : props.screenId
    ? props.screenId
    : history.location?.screenId;
  rateProductMenu = history.location?.rateProductMenu;
  nextMenu = history.location?.nextMenu;
  prevMenu = history.location?.prevMenu;

  const getParams = (screenid): string => {
    return (
      Settings.queryParam.brandCode +
      brandCode?.trim() +
      Settings.queryParam.brandName +
      brandName?.trim() +
      Settings.queryParam.productCode +
      productCode?.trim() +
      Settings.queryParam.productName +
      productName?.trim() +
      Settings.queryParam.level +
      level +
      Settings.queryParam.entryLevel +
      Settings.defaultLevel +
      Settings.queryParam.screenId +
      screenid
    );
  };

  const handleOnClick = async (e) => {
    if (contextType?.createProductState?.productName === "") {
      alert(`${Settings.alerts.validProductName}`);
      screenid = "0000";
    } else {
      const postData = { ...contextType.createProductState };
      postData.brandCode = brandCode;
      postData.level = level;
      contextType.setCreateProductState(postData);
      if (screenid == Settings.pageNo.createProdScreenId) {
        contextType.setIsMakingRequest(true);
        API.updateRateProductData(postData, null).then((res) => {
          level = res.level;
          const queryParamData = getParams(e);
          API.productDefinition(queryParamData).then((data) => {
            contextType.setIsMakingRequest(false);
            let productDetails = { ...contextType.createProductState };
            productDetails.level = data.level;
            if (data != null) {
              contextType.setProductDetails(res, props, rateProductMenu, data);
              localStorage.setItem(
                "rateProductMenu",
                JSON.stringify(data.rateProductDataView.rateProductMenu)
              );
              localStorage.setItem(
                "nextMenu",
                data?.rateProductDataView?.nextMenuOption
              );
              localStorage.setItem(
                "prevMenu",
                data?.rateProductDataView?.previousMenuOption
              );
              level = data.level;
              productDetails = {
                productCode: productCode,
                productName: productName,
              };
              history.push({
                pathname: `${Settings.routingUrl.defineProductParentRoute}/defineProduct`,
                search: getParams(e),
                rateProductMenu: rateProductMenu,
                nextMenu: data?.rateProductDataView?.nextMenuOption,
                prevMenu: data?.rateProductDataView?.previousMenuOption,
                resdata: JSON.stringify(data),
                isSaved: (screenid =
                  "0000" || screenid == undefined || screenid == "undefined"
                    ? false
                    : true),
              });
              menuData = data.rateProductDataView.rateProductMenu;
              contextType.setCreateProductData(productDetails, menuData, data);
            }
          });
        });
      } else {
        const isValid = contextType.checkMinOccurs();
        if (isValid) {
          postData.brandCode = brandCode;
          postData.level = level;
          contextType.setCreateProductState(postData);
          const result = await contextType.saveProductDescription(postData);
          if (result) {
            level = result.level;
          }
          const queryParamData = getParams(e);
          contextType.setIsMakingRequest(true);
          API.productDefinition(queryParamData).then((data) => {
            contextType.setIsMakingRequest(false);
            const productDetails = { ...contextType.createProductState };
            productDetails.level = data.level;
            if (data != null) {
              contextType.setProductDetails(
                productDetails,
                props,
                rateProductMenu,
                data
              );
              localStorage.setItem(
                "rateProductMenu",
                JSON.stringify(data.rateProductDataView.rateProductMenu)
              );
              localStorage.setItem(
                "nextMenu",
                data?.rateProductDataView?.nextMenuOption
              );
              localStorage.setItem(
                "prevMenu",
                data?.rateProductDataView?.previousMenuOption
              );
              level = data.level;
              history.push({
                pathname: `${Settings.routingUrl.defineProductParentRoute}/defineProduct`,
                search: getParams(e),
                rateProductMenu: rateProductMenu,
                nextMenu: data?.rateProductDataView?.nextMenuOption,
                prevMenu: data?.rateProductDataView?.previousMenuOption,
                isSaved: true,
              });
              contextType.setCreateProductData(productDetails, menuData, data);
              contextType.setDescriptionData(data);
              contextType.setCommonBindingData(data);
            }
          });
        }
      }
    }
  };

  const finishAndSave = async () => {
    const postData = { ...contextType.createProductState };
    postData.brandCode = brandCode;
    postData.level = level;
    if (screenid == Settings.pageNo.createProdScreenId) {
      contextType.setIsMakingRequest(true);
      API.updateRateProductData(postData, null);
      contextType.setIsMakingRequest(false);
    } else {
      const isValid = contextType.checkMinOccurs("finishSave");
      if (isValid) {
        const isSaved = contextType.saveProductDescription(postData);
        if (isSaved) {
          const params =
            Settings.queryParam.brandCode +
            brandCode +
            Settings.queryParam.brandName +
            brandName +
            Settings.queryParam.productCode +
            productCode +
            Settings.queryParam.productName +
            productName +
            Settings.queryParam.screenId +
            screenid;
          history.push({
            pathname: `${Settings.routingUrl.defineProductParentRoute}/defineProduct`,
            search: params,
            rateProductMenu: rateProductMenu,
            isFinishAndSave: true,
          });
        }
      }
    }
  };
  const getCommonHeader = (): string => {
    return `${Settings.headers.roomRateDescription} ${
      Settings.headers.brand
    }${" "}`;
  };

  const getScreenHeader = (): string => {
    let header = "";
    brandName = new URLSearchParams(urlParms).get(Settings.queryId.brandName);
    if (history.location.pathname.match(Settings.routingUrl.selectBrand)) {
      header += ` ${getCommonHeader()} ${Settings.headers.brandSelection}`;
    } else if (
      history.location.pathname.match(Settings.routingUrl.modifyRateDesc)
    ) {
      header += `${brandName}: ${getCommonHeader()} ${
        Settings.headers.modifyRateDesc
      }`;
    } else if (
      (history.location.pathname.match(Settings.routingUrl.defineProduct) &&
        screenid == "0000") ||
      screenid == ""
    ) {
      header += `${brandName}: ${getCommonHeader()}
        ${Settings.headers.defineProduct}
        ${productCode}${" - "}
        ${props.productName}`;
    } else if (
      history.location.pathname.match(Settings.routingUrl.defineProduct) &&
      screenid &&
      screenid != "" &&
      screenid != "0000" &&
      !contextType.isFinishAndSave
    ) {
      header += `${brandName}: ${getCommonHeader()}
        ${Settings.headers.defineProduct}
        ${productCode}${" - "}
        ${props.productName}`;
      screenid = props.screenId ? props.screenId : history.location?.screenId;
      if (
        screenid != "" &&
        screenid != "0000" &&
        contextType.createProductState.title != null &&
        contextType.createProductState.title != ""
      ) {
        header += " - " + contextType.createProductState.title;
      }
    }

    return header;
  };
  const renderNavButtons = (): JSX.Element => {
    let element;
    if (nextMenu == null || nextMenu == undefined) {
      nextMenu = history.location?.nextMenu
        ? history.location?.nextMenu
        : localStorage.getItem("nextMenu");
    }
    if (prevMenu == null || prevMenu == undefined) {
      prevMenu = history.location?.prevMenu
        ? history.location?.prevMenu
        : localStorage.getItem("prevMenu");
    }
    if (history.location.pathname.match(Settings.routingUrl.defineProduct)) {
      element = (
        <div className={styles.leftDiv}>
          {prevMenu && screenid != "0000" && (
            <img
              onClick={(e) => handleOnClick(prevMenu)}
              src={btnPrevious}
            ></img>
          )}{" "}
          {"  "}
          {nextMenu &&
            new URLSearchParams(urlParms).get(Settings.queryId.screenid) !=
              "0219" && (
              <img onClick={(e) => handleOnClick(nextMenu)} src={btnNext}></img>
            )}
        </div>
      );
    }
    return element;
  };
  return (
    <BrandFormattedRateContext.Consumer>
      {(brandFormattedRateContext) => {
        contextType = brandFormattedRateContext;
        return (
          <div>
            <BrandFormattedRateTabs
              menu={
                props.rateProductMenu
                  ? props.rateProductMenu
                  : rateProductMenu
                  ? rateProductMenu
                  : JSON.parse(localStorage.getItem("rateProductMenu"))
              }
              onFinishAndSave={finishAndSave}
              handleOnClick={handleOnClick}
              productName={props.productName ? props.productName : productName}
            />
            <div
              className={
                history.location.pathname.match(
                  Settings.routingUrl.defineProduct
                ) || contextType.isFinishAndSave
                  ? styles.tableBody
                  : styles.tableBodyHeight
              }
            >
              {contextType.isFinishAndSave
                ? `${brandName}: ${getCommonHeader()}
                ${Settings.headers.finishProduct}
                ${productCode}${" - "}
                ${props.productName}`
                : getScreenHeader()}
            </div>
            {contextType.isFinishAndSave ? (
              <div className={styles.leftDiv}>
                <img src={btnNext}></img>
              </div>
            ) : (
              renderNavButtons()
            )}
            <div className={styles.horizontalLine}></div>
          </div>
        );
      }}
    </BrandFormattedRateContext.Consumer>
  );
};
