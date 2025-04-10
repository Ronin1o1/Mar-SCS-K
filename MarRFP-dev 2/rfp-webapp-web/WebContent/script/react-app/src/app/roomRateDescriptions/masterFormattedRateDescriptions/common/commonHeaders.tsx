import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import MasterModifyRateDescriptionContext, {
  MasterModifyRateDescriptionContextProvider,
} from "../context/MasterModifyRateDescriptionContext";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";

import styles from "../content/createProduct.css";
import btnPrevious from "../../../../app/common/assets/img/button/btnPrevious.gif";
import btnNext from "../../../../app/common/assets/img/button/btnNext.gif";
import API from "../service/api";
import Settings from "../settings/settings";
import { CLoader } from "../../../common/components/CLoader";

let contextType = null;
let menuData;
let stateData;
const commonHeaders = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const [hide, setHide] = useState(false);
  const [isClicked, setClicked] = useState(true);

  useEffect(() => {
    const search =
      `${Settings.queryParam.urlStringUptoProdCode}` +
      props.productCode +
      `${Settings.queryParam.urlStringProdName}` +
      props.productName +
      `${Settings.queryParam.urlStringLevel}` +
      `${Settings.queryParam.screenId}` +
      props.screenid;
    if (props.screenid == Settings.pageNo.createProdscreenId) {
      setHide(true);
    } else {
      setHide(false);
    }
  });

  const validateProductName = (prodName) => {
    if (prodName == "" || prodName == undefined || prodName.length == 0) {
      appContext.setProductValidated(true);
      sessionStorage.setItem("isMasterProductValidated", "true");
      alert(Settings.alert.validProductName);
      return false;
    } else {
      appContext.setProductValidated(false);
      sessionStorage.setItem("isMasterProductValidated", "false");
      return true;
    }
  };

  async function handleNext() {
    let data;
    let nextScreenValue;
    setClicked(false);
    if (props.screenid == Settings.pageNo.createProdscreenId) {
      const postData = {
        formChg: props.postData?.formChg,
        productName: props.screenData.createProductState.productName,
        productCode: props.postData?.productCode,
        managed: props.postData?.managed,
        level: props.postData?.level,
        entryLevel: props.postData?.entryLevel,
      };
      contextType.setIsMakingRequest(true);
      data = await API.saveAndUpdateProductName(postData);
      contextType.setIsMakingRequest(false);
    }
    props.queryParam.screenid = props.nextScreen;
    contextType.setIsMakingRequest(true);
    const data1 = await API.getProductDetails(props.queryParam);
    contextType.setIsMakingRequest(false);
    menuData = data1.rateProductDataView.rateProductMenu;
    const search =
      `${Settings.queryParam.urlStringUptoProdCode}` +
      props.productCode +
      `${Settings.queryParam.urlStringProdName}` +
      props.productName +
      `${Settings.queryParam.urlStringLevel}` +
      `${Settings.queryParam.screenId}` +
      props.nextScreen;
    if (props.screenid == Settings.pageNo.createProdscreenId) {
      contextType.setProductDetails(data, props, menuData, data1);
    } else {
      contextType.setProductDetails(null, props, menuData, data1);
    }

    if (props.prevScreen == undefined) {
      nextScreenValue = props.nextScreen;
    } else {
      props.screenData.createProductState.menuData.map(function (
        value,
        index,
        elements
      ) {
        if (
          value.screenid == props.screenid &&
          value.title.trim() == props.screenTitle
        ) {
          nextScreenValue = elements[index + 1].screenid;
        }
      });
    }

    stateData = {
      formChg: contextType.createProductState.formChg,
      managed: contextType.createProductState.managed,
      entryLevel: contextType.createProductState.entryLevel
        ? contextType.createProductState.entryLevel
        : Settings.defaultLevel,
      productCode: contextType.createProductState.productCode,
      productName: contextType.createProductState.productName,
      menuData: contextType.createProductState.menuData,
      headerName: nextScreenValue,
    };

    if (validateProductName(props.screenData.createProductState.productName)) {
      history.push({
        pathname: Settings.routingUrl.defineProduct,
        search: search,
        state: stateData,
      });
      setClicked(true);
    }
  }

  async function handlePrev() {
    let prevScreenValue;
    if (props.prevScreen == "") {
      props.screenData.createProductState.menuData.map(function (
        value,
        index,
        elements
      ) {
        if (
          value.screenid == props.screenid &&
          value.title.trim() == props.screenTitle
        ) {
          prevScreenValue = elements[index - 1].screenid;
        }
      });
    } else {
      prevScreenValue = props.prevScreen;
    }
    props.queryParam.screenid = prevScreenValue;
    contextType.setIsMakingRequest(true);
    const data1 = await API.getProductDetails(props.queryParam);
    contextType.setIsMakingRequest(false);
    menuData = data1.rateProductDataView.rateProductMenu;
    const search = `${Settings.queryParam.screenId}` + prevScreenValue;
    const searchDefine =
      `${Settings.queryParam.urlStringUptoProdCode}` +
      props.productCode +
      `${Settings.queryParam.urlStringProdName}` +
      props.productName +
      `${Settings.queryParam.urlStringLevel}` +
      `${Settings.queryParam.screenId}` +
      prevScreenValue;
    contextType.setProductDetails(null, props, menuData, data1);
    stateData = {
      formChg: contextType.createProductState.formChg,
      managed: contextType.createProductState.managed,
      entryLevel: contextType.createProductState.entryLevel
        ? contextType.createProductState.entryLevel
        : Settings.defaultLevel,
      productCode: contextType.createProductState.productCode,
      productName: contextType.createProductState.productName,
      menuData: contextType.createProductState.menuData,
      headerName: prevScreenValue,
    };

    if (props.queryParam.screenid == Settings.pageNo.createProdscreenId) {
      history.push({
        pathname: `${Settings.routingUrl.createProduct}`,
        search: search,
        state: stateData,
      });
    } else {
      history.push({
        pathname: Settings.routingUrl.defineProduct,
        search: searchDefine,
        state: stateData,
      });
    }
  }

  return (
    <MasterModifyRateDescriptionContextProvider>
      <MasterModifyRateDescriptionContext.Consumer>
        {(masterModifyRateDescriptionContext) => {
          contextType = masterModifyRateDescriptionContext;
          return (
            <div>
              {contextType?.isMakingRequest ? <CLoader /> : null}
              <div>
                <table>
                  <tbody>
                    <tr className={styles.lineHeight}>
                      <td>
                        <b className={styles.boldHeader}>
                          {Settings.labels.pageTitle}
                          {": "}
                          {props.productCode ? props.productCode : ""}
                          {"-"}
                          {props.productName ? props.productName : ""}
                          {props.screenTitle ? " - " : null}
                          {props.screenTitle}
                        </b>{" "}
                      </td>
                    </tr>
                    <tr style={{ lineHeight: "7px" }}>
                      <table>
                        <tr>
                          {props.screenid !=
                          Settings.pageNo.createProdscreenId ? (
                            <td>
                              <p onClick={() => handlePrev()}>
                                <img
                                  className={styles.prevAlign}
                                  src={btnPrevious}
                                  alt={"prevbtn"}
                                />
                              </p>
                            </td>
                          ) : (
                            <td colSpan={2} className={styles.paddingRight}>
                              &nbsp;
                            </td>
                          )}
                          {props.screenid !=
                          Settings.pageNo.rateRulesScreenId ? (
                            <td>
                              <p
                                onClick={() => (isClicked ? handleNext() : "")}
                              >
                                <img
                                  className={styles.nextAlign}
                                  src={btnNext}
                                  alt={"nextbtn"}
                                />
                              </p>
                            </td>
                          ) : (
                            <td>{""}</td>
                          )}
                        </tr>
                      </table>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className={
                  props.screenid == Settings.pageNo.createProdscreenId
                    ? styles.topAlign
                    : styles.horizontalLine
                }
              ></div>
            </div>
          );
        }}
      </MasterModifyRateDescriptionContext.Consumer>
    </MasterModifyRateDescriptionContextProvider>
  );
};

export default commonHeaders;
