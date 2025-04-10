import React, { useEffect, useState } from "react";

import Settings from "../settings/settings";
import MasterModifyRateDescriptionContext, {
  MasterModifyRateDescriptionContextProvider,
} from "../context/MasterModifyRateDescriptionContext";
import styles from "./createProduct.css";
import API from "../service/api";
import MasterFormattedTabs from "./masterFormattedTabs";
import CommonHeaders from "../common/commonHeaders";
import { CLoader } from "../../../common/components/CLoader";

let contextType = null;
let menuData, postData, queryParam;
let nextScreenId = "";
let productCode = "",
  productName = "";

const createProduct = (props) => {
  const [isMakingRequest, setIsMakingRequest] = useState(false);

  if (props.location.state) {
    productCode = props.location.state.productCode;
    productName = props.location.state.productName.trim();
  }

  useEffect(() => {
    queryParam = {
      productCode: productCode,
      level: contextType.createProductState.entryLevel
        ? contextType.createProductState.entryLevel
        : Settings.defaultLevel,
      screenid: Settings.pageNo.createProdscreenId,
    };
    postData = {
      formChg: contextType.createProductState.formChg,
      productName: contextType.createProductState.productName
        ? contextType.createProductState.productName
        : productName,
      productCode: contextType.createProductState.productCode
        ? contextType.createProductState.productCode
        : productCode,
      managed: contextType.createProductState.managed
        ? contextType.createProductState.managed
        : "",
      level: contextType.createProductState.entryLevel
        ? contextType.createProductState.entryLevel
        : `${Settings.defaultLevel}`,
      entryLevel: contextType.createProductState.entryLevel
        ? contextType.createProductState.entryLevel
        : `${Settings.defaultLevel}`,
    };
    setIsMakingRequest(true);
    API.getProductDetails(queryParam).then((data) => {
      setIsMakingRequest(false);
      menuData = data.rateProductDataView.rateProductMenu;
      nextScreenId = data.rateProductDataView.nextMenuOption;
      contextType.setCreateProductData(props, menuData, data);
    });
  }, []);

  return (
    <MasterModifyRateDescriptionContextProvider>
      <MasterModifyRateDescriptionContext.Consumer>
        {(masterModifyRateDescriptionContext) => {
          contextType = masterModifyRateDescriptionContext;
          return (
            <React.Fragment>
              <div>
                <div>
                  <MasterFormattedTabs
                    productCode={productCode}
                    productName={productName}
                    menuData={menuData}
                    screenData={contextType}
                  />
                  <CommonHeaders
                    productCode={productCode}
                    productName={productName}
                    postData={postData}
                    screenid={Settings.pageNo.createProdscreenId}
                    queryParam={queryParam}
                    nextScreen={nextScreenId}
                    screenTitle={contextType.createProductState.title}
                    screenData={contextType}
                  />
                </div>
                <div>
                  <table className={styles.menuHght100Height}>
                    <tbody>
                      <tr>
                        {(isMakingRequest || contextType.isMakingRequest) && (
                          <div className={styles.loaderImg}>
                            <CLoader />
                          </div>
                        )}
                        <td className={styles.productNameAlign}>
                          {Settings.labels.productName}
                        </td>
                        <td
                          align="left"
                          noWrap="nowrap"
                          className={styles.width2}
                        >
                          &nbsp;
                        </td>
                        <td>
                          <input
                            type="text"
                            id="productNameEntry"
                            name="productNameEntry"
                            className={styles.width1}
                            size={40}
                            maxLength={40}
                            value={
                              contextType != null
                                ? contextType.createProductState.productName
                                : ""
                            }
                            onChange={(e) => {
                              contextType.setProductName(e);
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </MasterModifyRateDescriptionContext.Consumer>
    </MasterModifyRateDescriptionContextProvider>
  );
};
export default createProduct;
