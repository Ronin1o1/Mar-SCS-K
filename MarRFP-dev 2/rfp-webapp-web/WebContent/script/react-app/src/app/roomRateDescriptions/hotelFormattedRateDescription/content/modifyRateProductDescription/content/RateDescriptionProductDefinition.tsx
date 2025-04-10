import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import API from "../service/API";
import Settings from "../static/Settings";
import ModifyRateDescriptionContext, {
  ModifyRateDescriptionContextProvider,
} from "../context/ModifyRateDescriptionContext";
import { Layout } from "../../../routing/Layout";
import HotelRateProductSelectContext, {
  HotelRateProductSelectContextProvider,
} from "../../../context/HotelRateProductSelectContext";
import btnPrevious from "../../../../../common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../../../common/assets/img/button/btnNext.gif";
import styles from "../content/ModifyRateDescription.css";
import { CLoader } from "../../../../../common/components/CLoader";
import { RateProductDefinition } from "./RateProductDefinition";

let contextType = null;
let parentcontextType = null;
let marshaCode;
let hotelName;
let productCode;
let productName;
let newProductName;
let screenid;
let brandCode;
let level;
let entryLevel;
let urlparams;

const RateDescriptionProductDefinition = () => {
  const history = useHistory();
  const urlParms = useLocation().search;
  const [pageMessage, setPageMessage] = useState("");
  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);
  productCode = new URLSearchParams(urlParms).get(Settings.queryId.productCode);
  productName = new URLSearchParams(urlParms).get(Settings.queryId.productName);
  brandCode = new URLSearchParams(urlParms).get(Settings.queryId.brandCode);
  level = new URLSearchParams(urlParms).get(Settings.queryId.level);
  entryLevel = new URLSearchParams(urlParms).get(Settings.queryId.entryLevel);
  screenid = new URLSearchParams(urlParms).get(Settings.queryId.screenid);
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  urlparams = {
    marshaCode: marshaCode,
    hotelName: hotelName,
    productCode: productCode,
    brandCode: brandCode,
    level: level,
    entryLevel: entryLevel,
  };
  useEffect(() => {
    const data = localStorage.getItem("definitionData")
      ? JSON.parse(localStorage.getItem("definitionData"))
      : null;

    if (
      screenid === "0000" ||
      screenid === undefined ||
      screenid == "undefined" ||
      screenid === null
    ) {
      setIsMakingRequest(true);
      contextType.setdefinitionData(data);
      contextType.setPageProductName(productName);
      newProductName = productName;
      setIsMakingRequest(false);
    } else {
      setIsMakingRequest(true);
      let queryparamData = null;
      brandCode = brandCode;
      productCode = productCode;
      productName = contextType?.state?.rateProductName
        ? contextType?.state?.rateProductName
        : productName;
      level = new URLSearchParams(urlParms).get(Settings.queryId.level);
      entryLevel = entryLevel;
      queryparamData =
        marshaCode &&
        productCode &&
        brandCode &&
        productCode &&
        productName &&
        level &&
        entryLevel &&
        screenid &&
        Settings.queryParam.marshaCode +
          marshaCode +
          Settings.queryParam.hotelName +
          hotelName +
          Settings.queryParam.brandCode +
          brandCode +
          Settings.queryParam.productCode +
          productCode +
          Settings.queryParam.productName +
          productName +
          Settings.queryParam.level +
          level +
          Settings.queryParam.entryLevel +
          entryLevel +
          Settings.queryParam.screenid +
          screenid;
      API.productDefinition(queryparamData).then((data) => {
        if (data !== null) {
          localStorage.setItem("definitionData", JSON.stringify(data));
          contextType?.setPageProductName(productName);
          productName = contextType?.state?.rateProductName;
          contextType.setdefinitionData(data);
          localStorage.setItem(
            "productMenu",
            JSON.stringify(data?.rateProductDataView?.rateProductMenu)
          );
          localStorage.setItem(
            "nextScreenid",
            data?.rateProductDataView?.nextMenuOption
          );
          localStorage.setItem(
            "prevScreenid",
            data?.rateProductDataView?.previousMenuOption
          );

          setIsMakingRequest(false);
        }
      });
    }
  }, [screenid]);
  useEffect(() => {
    urlparams = {
      marshaCode: marshaCode,
      hotelName: hotelName,
      productCode: productCode,
      brandCode: brandCode,
      level: level,
      entryLevel: entryLevel,
    };
    return () => {
      level = new URLSearchParams(urlParms).get(Settings.queryId.level);
      urlparams.level = level;
      contextType.saveRateProductDefinition(
        urlparams,
        contextType.state?.rateProductName
      );
    };
  }, []);
  const handleOnPrevNextClick = async (navPage) => {
    level = new URLSearchParams(urlParms).get(Settings.queryId.level);
    urlparams.level = level;
    if (contextType?.state?.rateProductName === "") {
      alert(`${Settings.alertMessage}`);
      screenid = "0000";
    } else {
      newProductName = contextType?.state?.rateProductName;
      const response = await contextType.saveRateProductDefinition(
        urlparams,
        contextType?.state?.rateProductName
      );
      let queryparamData = null;
      brandCode = brandCode;
      productCode = productCode;
      productName = contextType?.state?.rateProductName.trim()
        ? contextType?.state?.rateProductName
        : productName;
      level = response.level;
      entryLevel = entryLevel;
      localStorage.setItem("navPage", navPage);

      queryparamData =
        marshaCode &&
        productCode &&
        brandCode &&
        productCode &&
        productName &&
        level &&
        entryLevel &&
        screenid &&
        Settings.queryParam.marshaCode +
          marshaCode +
          Settings.queryParam.hotelName +
          hotelName +
          Settings.queryParam.brandCode +
          brandCode +
          Settings.queryParam.productCode +
          productCode +
          Settings.queryParam.productName +
          contextType?.state?.rateProductName.trim() +
          Settings.queryParam.level +
          level +
          Settings.queryParam.entryLevel +
          entryLevel +
          Settings.queryParam.screenid +
          navPage;
      setIsMakingRequest(true);
      API.productDefinition(queryparamData).then((data) => {
        if (data !== null) {
          localStorage.setItem("definitionData", JSON.stringify(data));
          contextType.setdefinitionData(data);
          localStorage.setItem(
            "productMenu",
            JSON.stringify(data?.rateProductDataView?.rateProductMenu)
          );
          localStorage.setItem(
            "nextScreenid",
            data?.rateProductDataView?.nextMenuOption
          );
          localStorage.setItem(
            "prevScreenid",
            data?.rateProductDataView?.previousMenuOption
          );
          history.push({
            pathname: `${Settings.productDefinition}/defineProduct`,
            search:
              "?marshaCode=" +
              marshaCode +
              "&hotelName=" +
              hotelName +
              "&brandCode=" +
              brandCode +
              "&productCode=" +
              productCode +
              "&productName=" +
              contextType?.state?.rateProductName.trim() +
              "&level=" +
              response.level +
              "&entryLevel=" +
              entryLevel +
              "&screenid=" +
              navPage,
            productData: data.rateProductDataView.rateProductMenu,
            screendata: data,
            screenid: navPage,
          });
          setIsMakingRequest(false);
        }
      });
    }
  };

  const getTitle = (val) => {
    const titleVal = val === undefined ? "0000" : val;
    const uniqArray = [];
    contextType.state.definitionList?.rateProductDataView?.rateProductMenu.forEach(
      (element) => {
        if (titleVal !== "0000") {
          if (element.screenid == titleVal) {
            uniqArray.push(element.title);
          }
        } else {
          uniqArray.push("");
        }
      }
    );
    return uniqArray[0];
  };

  const menuClicked = async (screenCheck) => {
    level = new URLSearchParams(urlParms).get(Settings.queryId.level);
    urlparams.level = level;
    if (contextType?.state?.rateProductName === "") {
      alert(`${Settings.alertMessage}`);
    } else {
      newProductName = contextType?.state?.rateProductName;
      contextType.saveRateProductDefinition(
        urlparams,
        contextType?.state?.rateProductName
      );
      let queryparamData = null;
      brandCode = brandCode;
      productCode = productCode;
      productName = contextType?.state?.rateProductName;
      level = level;
      entryLevel = entryLevel;
      screenid = screenCheck;
      queryparamData =
        marshaCode &&
        productCode &&
        brandCode &&
        productCode &&
        productName &&
        level &&
        entryLevel &&
        screenid &&
        Settings.queryParam.marshaCode +
          marshaCode +
          Settings.queryParam.hotelName +
          hotelName +
          Settings.queryParam.brandCode +
          brandCode +
          Settings.queryParam.productCode +
          productCode +
          Settings.queryParam.productName +
          productName +
          Settings.queryParam.level +
          level +
          Settings.queryParam.entryLevel +
          entryLevel +
          Settings.queryParam.screenid +
          screenid;
      setIsMakingRequest(true);
      API.productDefinition(queryparamData).then((data) => {
        setIsMakingRequest(false);
        if (data !== null) {
          contextType.setdefinitionData(data);
          localStorage.setItem(
            "productMenu",
            JSON.stringify(data.rateProductDataView.rateProductMenu)
          );
          localStorage.setItem(
            "nextScreenid",
            data?.rateProductDataView?.nextMenuOption
          );
          localStorage.setItem(
            "prevScreenid",
            data?.rateProductDataView?.previousMenuOption
          );
          history.push({
            pathname: `${Settings.productDefinition}/defineProduct`,
            search:
              "?marshaCode=" +
              marshaCode +
              "&hotelName=" +
              hotelName +
              "&brandCode=" +
              brandCode +
              "&productCode=" +
              productCode +
              "&productName=" +
              productName +
              "&level=" +
              level +
              "&entryLevel=" +
              entryLevel +
              "&screenid=" +
              screenCheck,
            productData: data.rateProductDataView.rateProductMenu,
            screendata: data,
            screenid: screenCheck,
          });
        }
      });
    }
  };

  const finishAndSave = async (e) => {
    level = new URLSearchParams(urlParms).get(Settings.queryId.level);
    urlparams.level = level;
    if (contextType?.state?.rateProductName === "") {
      alert(`${Settings.alertMessage}`);
    } else {
      newProductName = contextType?.state?.rateProductName;
      contextType.saveRateProductDefinition(
        urlparams,
        contextType?.state?.rateProductName
      );
      setPageMessage(
        `${Settings.pageMessageData} ${productCode} - ${contextType?.state?.rateProductName}.`
      );
    }
  };
  return (
    <HotelRateProductSelectContextProvider>
      <HotelRateProductSelectContext.Consumer>
        {(rateProductContext) => {
          parentcontextType = rateProductContext;
          return (
            <Layout ISChanged={menuClicked} IsFinished={finishAndSave}>
              <ModifyRateDescriptionContextProvider>
                <ModifyRateDescriptionContext.Consumer>
                  {(rateproductview) => {
                    contextType = rateproductview;
                    return (
                      <div className={styles.tableBody}>
                        {marshaCode} - {hotelName} -{" "}
                        {pageMessage === ""
                          ? Settings.label.ProductDefinitionLabel
                          : Settings.label.FinishDefinitionLabel}
                        : {productCode} -{" "}
                        {newProductName
                          ? newProductName
                          : contextType?.state?.rateProductName}{" "}
                        {pageMessage === "" && screenid !== "0000" ? "-" : ""}
                        {pageMessage === "" ? getTitle(screenid) : ""}
                        <div
                          className={
                            pageMessage === ""
                              ? styles.btnRow
                              : styles.hiddenField
                          }
                        >
                          <img
                            className={
                              screenid === "0000" ||
                              screenid == undefined ||
                              screenid == "undefined"
                                ? styles.hiddenField
                                : styles.previousMenu
                            }
                            onClick={(e) =>
                              handleOnPrevNextClick(
                                contextType.state.definitionList
                                  ?.rateProductDataView?.previousMenuOption
                                  ? contextType.state.definitionList
                                      ?.rateProductDataView?.previousMenuOption
                                  : localStorage.getItem("prevScreenid")
                              )
                            }
                            src={btnPrevious}
                          ></img>

                          <img
                            className={
                              screenid === "0219" ? styles.hiddenField : ""
                            }
                            onClick={(e) =>
                              handleOnPrevNextClick(
                                contextType.state.definitionList
                                  ?.rateProductDataView?.nextMenuOption
                                  ? contextType.state.definitionList
                                      ?.rateProductDataView?.nextMenuOption
                                  : localStorage.getItem("nextScreenid")
                              )
                            }
                            src={btnNext}
                          ></img>
                        </div>
                        <div className={styles.horizontalLine}></div>
                        <table
                          className={
                            pageMessage === ""
                              ? styles.tableWidth
                              : styles.hiddenField
                          }
                        >
                          {(isMakingRequest || contextType.isMakingRequest) && (
                            <tr>
                              <CLoader />
                            </tr>
                          )}
                          {screenid === "0000" || screenid === undefined ? (
                            <tr>
                              <td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {Settings.label.ProductNameLabel}
                                </td>
                                <td align="left">&nbsp;</td>
                                <td>
                                  <input
                                    type="text"
                                    id="productNameEntry"
                                    name="productNameEntry"
                                    maxLength={40}
                                    defaultValue={
                                      contextType?.state?.rateProductName
                                    }
                                    onKeyPress={(e) =>
                                      contextType.KorSafeCharsOnly(e)
                                    }
                                    onChange={(e) =>
                                      contextType.handleProductNameChange(
                                        e,
                                        contextType?.state?.rateProductName
                                      )
                                    }
                                  />
                                </td>
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <td className={styles.tablerTD}>
                                <div
                                  className={
                                    contextType?.state.definitionList
                                      ?.rateProductDataView
                                      ?.rateProductDefinitionList
                                      ?.rateProductDefinitionGroup.length > 0
                                      ? ""
                                      : styles.hiddenField
                                  }
                                >
                                  <RateProductDefinition
                                    data={
                                      contextType?.state
                                        ?.rateProductDefinitionGroup
                                    }
                                    contextData={
                                      contextType?.state?.definitionList
                                    }
                                    handleData={contextType}
                                    entryData={entryLevel}
                                  />
                                </div>
                              </td>
                            </tr>
                          )}
                        </table>
                        <p
                          className={
                            pageMessage !== ""
                              ? styles.successMessage
                              : styles.hiddenField
                          }
                        >
                          {pageMessage}
                        </p>
                      </div>
                    );
                  }}
                </ModifyRateDescriptionContext.Consumer>
              </ModifyRateDescriptionContextProvider>
            </Layout>
          );
        }}
      </HotelRateProductSelectContext.Consumer>
    </HotelRateProductSelectContextProvider>
  );
};

export default RateDescriptionProductDefinition;
