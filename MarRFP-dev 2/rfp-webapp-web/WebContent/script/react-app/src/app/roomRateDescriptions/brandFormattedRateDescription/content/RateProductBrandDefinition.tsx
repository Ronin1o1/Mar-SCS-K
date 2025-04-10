import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import Utils from "../../../common/utils/Utils";
import BrandFormattedRateContext, {
  BrandFormattedRateContextProvider,
} from "../context/BrandFormattedRateContext";
import { Layout } from "../routing/Layout";
import API from "../service/API";
import Settings from "../static/Settings";
import { ProductDefinition } from "../common/ProductDefinition";
import styles from "./RateProductBrandDefinition.css";
import { CLoader } from "../../../common/components/CLoader";

interface IRateProductBrandDefinition {
  data: any;
}

let contextType = null;
let menuData,
  queryParam,
  productCode,
  productName,
  brandCode,
  brandName,
  screenid,
  level,
  entryLevel;

const RateProductBrandDefinition = (): JSX.Element => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const urlParms = useLocation().search;
  const [isMakingRequest, setIsMakingRequest] = useState(false);

  brandCode = new URLSearchParams(urlParms).get("brandCode")
    ? new URLSearchParams(urlParms).get("brandCode")
    : contextType.brandCode;
  brandName = new URLSearchParams(urlParms).get("brandName")
    ? new URLSearchParams(urlParms).get("brandName")
    : contextType.brandName;
  productCode = new URLSearchParams(urlParms).get("productCode");
  productName = new URLSearchParams(urlParms).get("productName");
  screenid = new URLSearchParams(urlParms).get("screenid");
  level = new URLSearchParams(urlParms).get(Settings.queryId.level);
  entryLevel = new URLSearchParams(urlParms).get(Settings.queryId.entryLevel);
  useEffect(() => {
    contextType.setBrandCode(brandCode);
    contextType.setBrandName(brandName);
    const productDetails = {
      productCode: productCode,
      productName: productName,
    };
    if (!contextType.isFinishAndSave) {
      if (screenid === undefined || screenid === "" || screenid === "0000") {
        const data = history.location?.screendata;
        if (data != null) {
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

          menuData = data.rateProductDataView.rateProductMenu;
          contextType.setCreateProductData(productDetails, menuData, data);
        } else if (
          contextType.createProductState &&
          contextType.createProductState.productName == null
        ) {
          const queryParamData = getParams(screenid);
          API.productDefinition(queryParamData).then((data) => {
            contextType.setIsMakingRequest(false);
            let productDetails = { ...contextType.createProductState };
            productDetails.level = data.level;
            if (data != null) {
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

              menuData = data.rateProductDataView.rateProductMenu;
              contextType.setCreateProductData(productDetails, menuData, data);
            }
          });
        }
      } else {
        queryParam = getParams(screenid);
        const data = history.location.resdata
          ? JSON.parse(history?.location?.resdata)
          : null;
        if (data != null && data != undefined) {
          level = data.level;
          menuData = data.rateProductDataView.rateProductMenu;
          contextType.setCreateProductData(productDetails, menuData, data);
          contextType.setDescriptionData(data);
          contextType.setCommonBindingData(data);
        } else {
          if (
            contextType.commonDataBindState &&
            contextType.commonDataBindState.rateProductDataView &&
            contextType.commonDataBindState.rateProductDataView.length == 0
          ) {
            setIsMakingRequest(true);
            API.productDefinition(queryParam).then((data) => {
              setIsMakingRequest(false);
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
              menuData = data.rateProductDataView.rateProductMenu;
              contextType.setCreateProductData(productDetails, menuData, data);
              contextType.setDescriptionData(data);
              contextType.setCommonBindingData(data);
            });
          }
        }
      }
    }
  }, [screenid]);

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

  return (
    <BrandFormattedRateContextProvider>
      <BrandFormattedRateContext.Consumer>
        {(brandFormattedRateContext) => {
          contextType = brandFormattedRateContext;
          return (
            <Layout
              context={contextType}
              productName={
                contextType.createProductState.productName
                  ? contextType.createProductState.productName
                  : productName
              }
              screenId={screenid}
              rateProductMenu={menuData}
            >
              <div className={styles.tableBody}>
                <table className={styles.tableWidth}>
                  {(isMakingRequest || contextType.isMakingRequest) && (
                    <div>
                      <CLoader />
                    </div>
                  )}
                  {contextType.isFinishAndSave ? (
                    <div>
                      <table className={styles.tableCls}>
                        <tbody>
                          <tr>
                            <td valign="top">
                              <form id="thisForm" name="thisForm" method="post">
                                <table
                                  width="600"
                                  align="left"
                                  className={styles.zeroHeight}
                                >
                                  <tbody>
                                    <tr>
                                      <td className={styles.width}>&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td
                                        className={styles.header}
                                        align="center"
                                      >
                                        {Settings.labels.successMessage}
                                        {
                                          contextType.createProductState
                                            .productCode
                                        }
                                        -
                                        {
                                          contextType.createProductState
                                            .productName
                                        }
                                        .
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </form>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : screenid === "" ||
                    screenid === "0000" ||
                    screenid === undefined ? (
                    <tr>
                      <td>
                        <td>{Settings.labels.productName}</td>
                        <td align="left">&nbsp;</td>
                        <td>
                          <input
                            type="text"
                            id="productNameEntry"
                            name="productNameEntry"
                            size={40}
                            maxLength={40}
                            className={styles.inputDescription}
                            defaultValue={
                              contextType?.createProductState?.productName
                                ? contextType?.createProductState?.productName
                                : productName
                            }
                            onKeyPress={(e) => contextType?.KorSafeCharsOnly(e)}
                            onChange={(e) => contextType?.setProductName(e)}
                          />
                        </td>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td className={styles.tablerTD}>
                        <div>
                          <ProductDefinition
                            data={contextType}
                            handleModifiableChange={
                              contextType.handleModifiableChangeInput
                            }
                            handleShowRest={contextType.handleShowRestInput}
                            handleNumberChange={Utils.NumberOnly_onkeypress}
                            handleShowUOM={contextType.handleShowUOMInput}
                            handleShowType={contextType.handleShowTypeInput}
                            handleShowBrand={contextType.handleShowBrandInput}
                            handleForSafeNumberChange={
                              Utils.KorSafeCharsOnly_onkeypress
                            }
                            handleDescriptionData={
                              contextType.setDescriptionText
                            }
                            handleModifiableRadioChange={
                              contextType.setModifiableChange
                            }
                            handleSelectAll_Click={contextType.onSelectAll}
                            handleUnSelectall_Click={contextType.onUnSelectAll}
                            handleUnBlankAll_Click={contextType.onBlankAll}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </table>
              </div>
            </Layout>
          );
        }}
      </BrandFormattedRateContext.Consumer>
    </BrandFormattedRateContextProvider>
  );
};

export default RateProductBrandDefinition;
