import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../content/masterFormattedTabs.css";
import Settings from "../settings/settings";

import MasterModifyRateDescriptionContext, {
  MasterModifyRateDescriptionContextProvider,
} from "../context/MasterModifyRateDescriptionContext";
import API from "../service/api";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import { CLoader } from "../../../common/components/CLoader";

let contextType = null;
let menuData;
let queryParam;
let stateData;
const masterFormattedTabs = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();

  useEffect(() => {
    const queryParam = {
      productCode: contextType.createProductState.productCode
        ? contextType.createProductState.productCode
        : props.productCode,
      level: props.entryLevel
        ? props.entryLevel
        : contextType.createProductState.entryLevel,
    };
    setIsLoading(true);
    API.getProductDetails(queryParam).then((data) => {
      setIsLoading(false);
      menuData = data.rateProductDataView.rateProductMenu;
      contextType.setCreateProductData(props, menuData, data);
    });
  }, []);

  const saveProductName = async (url) => {
    const data = await API.saveAndUpdateProductName(props.postData);
    props.queryParam.screenid = props.nextScreen;
    const data1 = await API.getProductDetails(props.queryParam);
    menuData = data1.rateProductDataView.rateProductMenu;
    contextType.setProductDetails(data, props, menuData, data1);
  };

  const handleSwitch = async (url, screenId) => {
    const search = `${Settings.queryParam.screenId}` + screenId;

    const searchDefine =
      `${Settings.queryParam.urlStringUptoProdCode}` +
      contextType.state.rateProductSearch.productCode +
      `${Settings.queryParam.urlStringProdName}` +
      contextType.state.rateProductSearch.productName +
      `${Settings.queryParam.urlStringLevel}` +
      `${Settings.queryParam.screenId}` +
      screenId;
    let finishId = "";
    stateData = {
      formChg: props?.screenData?.createProductState?.formChg,
      managed: props?.screenData?.createProductState.managed,
      entryLevel: props?.screenData?.createProductState.entryLevel,
      productCode: props?.screenData?.createProductState.productCode
        ? props?.screenData?.createProductState.productCode
        : props.productCode,
      productName: props?.screenData?.createProductState.productName
        ? props?.screenData?.createProductState.productName
        : props.productName,
      menuData: props?.screenData?.createProductState.menuData
        ? props?.screenData?.createProductState.menuData
        : props.menuData,
    };

    if (url == Settings.ModifyRateDescriptions) {
      if (sessionStorage.getItem("isMasterProductValidated") == "false") {
        history.push({
          pathname: `${Settings.routingUrl.modifyRateDescriptions}`,
        });
      } else {
        alert(Settings.alert.emptyProductName);
      }
    } else if (url == Settings.FinishSaveTab) {
      if (sessionStorage.getItem("isMasterProductValidated") == "false") {
        appContext.setFinishAndSaveEnabled(true);
        history.push({
          pathname: `${Settings.routingUrl.finishAndSave}`,
          state: stateData,
        });
      } else {
        alert(Settings.alert.emptyProductName);
      }
    } else if (url.trim() == `${Settings.createProduct}`) {
      props.menuData.filter((item) => {
        if (item.title.trim() == url.trim()) {
          finishId = item.screenid;
        }
      });
      const completeFinishAndSave =
        Settings.queryParam.finishAndSave + finishId;
      if (sessionStorage.getItem("isMasterProductValidated") == "false") {
        if (appContext.isFinishAndSaveEnabled) {
          history.push({
            pathname: "/rfp-webapp-web",
            search: completeFinishAndSave,
          });
        } else {
          saveProductName(url);
          history.push({
            pathname: `${Settings.routingUrl.createProduct}`,
            search: search,
            state: stateData,
          });
        }
      } else {
        alert(Settings.alert.emptyProductName);
      }
    } else {
      props.menuData.filter((item) => {
        if (item.title.trim() == url.trim()) {
          finishId = item.screenid;
        }
      });

      const completeFinishAndSave =
        Settings.queryParam.finishAndSave + finishId;

      if (sessionStorage.getItem("isMasterProductValidated") == "false") {
        if (appContext.isFinishAndSaveEnabled) {
          history.push({
            pathname: "/rfp-webapp-web",
            search: completeFinishAndSave,
          });
        } else {
          queryParam = {
            productCode: props?.screenData?.createProductState.productCode
              ? props?.screenData?.createProductState.productCode
              : props.productCode,
            level: props?.screenData?.createProductState.entryLevel,
            screenid: screenId,
          };
          setIsLoading(true);
          const data1 = await API.getProductDetails(queryParam);
          setIsLoading(false);
          menuData = data1.rateProductDataView.rateProductMenu;
          stateData = {
            formChg: props?.screenData?.createProductState?.formChg,
            managed: props?.screenData?.createProductState.managed,
            entryLevel: props?.screenData?.createProductState.entryLevel,
            productCode: props?.screenData?.createProductState.productCode
              ? props?.screenData?.createProductState.productCode
              : props.productCode,
            productName: props?.screenData?.createProductState.productName
              ? props?.screenData?.createProductState.productName
              : props.productName,
            menuData: props?.screenData?.createProductState.menuData
              ? props?.screenData?.createProductState.menuData
              : props.menuData,
            headerName: screenId,
          };
          history.push({
            pathname: Settings.routingUrl.defineProduct,
            search: searchDefine,
            state: stateData,
          });
        }
      } else {
        alert(Settings.alert.emptyProductName);
      }
    }
  };
  return (
    <MasterModifyRateDescriptionContextProvider>
      <MasterModifyRateDescriptionContext.Consumer>
        {(masterModifyRateDescriptionContext) => {
          contextType = masterModifyRateDescriptionContext;
          return isLoading ? (
            <CLoader></CLoader>
          ) : (
            <div>
              <div className={`${styles.subMenu} ${styles.subnav}`}>
                <ul className={`${styles.subnavigation} ${styles.navAlignTop}`}>
                  {history.location.pathname.match(
                    Settings.routingUrl.modifyRateDescriptions
                  ) ? (
                    <>
                      <li className={styles.sublistTitle}>
                        <a
                          href="javascript:void(0);"
                          className={styles.Tabsborder}
                          onClick={() =>
                            handleSwitch(
                              Settings.tabNames.ModifyRateDescription,
                              ""
                            )
                          }
                        >
                          {Settings.tabNames.ModifyRateDescription}
                          <span className={styles.arrowadm3}></span>
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={styles.sublistTitle}>
                        <a
                          href="javascript:void(0);"
                          className={styles.Tabsborder}
                          onClick={() =>
                            handleSwitch(
                              Settings.tabNames.ModifyRateDescription,
                              ""
                            )
                          }
                        >
                          {Settings.tabNames.ModifyRateDescription}
                          <span className={styles.arrowadm3}></span>
                        </a>
                      </li>
                      {history.location.pathname.includes(
                        Settings.tabNames.ModifyRateDescription
                      ) ||
                      history.location.pathname.includes(
                        Settings.tabNames.FinishSaveTab
                      ) ? (
                        ""
                      ) : (
                        <>
                          <li className={`${styles.subMenu}`}> </li>
                          <li className={styles.sublistTitle}>
                            <a
                              href="javascript:void(0);"
                              className={styles.Tabsborder1}
                              onClick={() =>
                                handleSwitch(Settings.createProduct, "")
                              }
                            >
                              {props.productCode + " - " + props.productName}
                              <span className={styles.arrowadm3}></span>
                            </a>
                            <ul
                              className={`${styles.sublist} ${styles.widthSize}`}
                            >
                              {props.menuData && props.menuData.length > 0
                                ? props.menuData.map((list) => (
                                    <li key={list.title}>
                                      <div>
                                        <a
                                          onClick={() =>
                                            handleSwitch(
                                              list.title,
                                              list.screenid
                                            )
                                          }
                                        >
                                          {list.title}
                                        </a>
                                      </div>
                                    </li>
                                  ))
                                : null}
                            </ul>
                          </li>
                          <li className={styles.sublistTitle}>
                            <a
                              href="javascript:void(0);"
                              className={styles.Tabsborder}
                              onClick={() =>
                                handleSwitch(
                                  Settings.tabNames.FinishSaveTab,
                                  ""
                                )
                              }
                            >
                              {Settings.tabNames.FinishSaveTab}
                              <span className={styles.arrowadm3}></span>
                            </a>
                          </li>
                        </>
                      )}
                    </>
                  )}
                </ul>
              </div>
            </div>
          );
        }}
      </MasterModifyRateDescriptionContext.Consumer>
    </MasterModifyRateDescriptionContextProvider>
  );
};

export default masterFormattedTabs;
